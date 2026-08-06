/**
 * FINAL DISTRIBUTION REPORT GENERATOR
 * Produces: every unit → all topics → question count, per cadre
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.download' });
const fs = require('fs');

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchAll() {
  const PAGE = 1000;
  let all = [], from = 0;
  while (true) {
    const { data } = await sb.from('questions')
      .select('id, unit, topic, cadre, paper, status')
      .range(from, from + PAGE - 1);
    if (!data || data.length === 0) break;
    all = all.concat(data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

async function run() {
  const data = await fetchAll();
  console.log(`Total questions: ${data.length}\n`);

  // Build unit → topic → cadre tree
  const tree = {};
  data.forEach(q => {
    const u = q.unit || 'UNASSIGNED';
    const t = q.topic || 'Unlabelled';
    if (!tree[u]) tree[u] = { total: 0, bscn: 0, krchn: 0, topics: {} };
    tree[u].total++;
    if (q.cadre === 'BScN') tree[u].bscn++;
    else if (q.cadre === 'KRCHN') tree[u].krchn++;
    if (!tree[u].topics[t]) tree[u].topics[t] = { total: 0, bscn: 0, krchn: 0 };
    tree[u].topics[t].total++;
    if (q.cadre === 'BScN') tree[u].topics[t].bscn++;
    else tree[u].topics[t].krchn++;
  });

  // Print
  let report = '';
  report += `NURSEFITI QUESTION BANK — FINAL UNIT/TOPIC DISTRIBUTION REPORT\n`;
  report += `Generated: ${new Date().toISOString()}\n`;
  report += `Total questions: ${data.length}\n`;
  report += `${'='.repeat(80)}\n\n`;

  const unitOrder = Object.entries(tree).sort((a, b) => b[1].total - a[1].total);
  let grandTotal = 0;

  unitOrder.forEach(([unit, us]) => {
    grandTotal += us.total;
    report += `\n▶ ${unit}\n`;
    report += `  Total: ${us.total} | BScN: ${us.bscn} | KRCHN: ${us.krchn}\n`;
    report += `  ${'─'.repeat(70)}\n`;
    Object.entries(us.topics)
      .sort((a, b) => b[1].total - a[1].total)
      .forEach(([topic, ts]) => {
        report += `  ${ts.total.toString().padStart(4)}  ${topic}  (BScN:${ts.bscn} KRCHN:${ts.krchn})\n`;
      });
  });

  report += `\n${'='.repeat(80)}\n`;
  report += `GRAND TOTAL: ${grandTotal} questions across ${unitOrder.length} units\n`;

  console.log(report);
  fs.writeFileSync('scripts/final_distribution_report.txt', report);
  console.log('Saved to scripts/final_distribution_report.txt');

  // Also produce a clean JSON summary for the artifact
  const summary = unitOrder.map(([unit, us]) => ({
    unit,
    total: us.total, bscn: us.bscn, krchn: us.krchn,
    topicCount: Object.keys(us.topics).length,
    topics: Object.entries(us.topics)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([topic, ts]) => ({ topic, total: ts.total, bscn: ts.bscn, krchn: ts.krchn }))
  }));
  fs.writeFileSync('scripts/final_distribution_summary.json', JSON.stringify(summary, null, 2));
}

run().catch(console.error);
