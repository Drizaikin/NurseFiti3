const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.download' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  const { data, error } = await supabase
    .from('questions')
    .select('unit, topic, stem');

  if (error) {
    console.error(error);
    return;
  }

  const unitCounts = {};
  data.forEach(q => {
    const u = (q.unit || 'NULL').toLowerCase().trim();
    unitCounts[u] = (unitCounts[u] || 0) + 1;
  });

  console.log("UNIT COUNTS:");
  Object.entries(unitCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([unit, count]) => {
      if (unit.includes('critical') || unit.includes('micro') || count < 20) {
        console.log(`${unit}: ${count}`);
      }
    });

  // Find questions that might be critical care but have a different unit
  console.log("\nPossible Critical Care Questions mapped to other units:");
  const ccKeywords = ['microbiology', 'bacteria', 'virus', 'infection', 'pathogen', 'fungi']
  const ccMatches = data.filter(q => {
    const text = (q.stem + ' ' + (q.topic||'')).toLowerCase();
    return ccKeywords.some(k => text.includes(k)) && !(q.unit || '').toLowerCase().includes('critical');
  });

  console.log(`Found ${ccMatches.length} questions containing CC keywords but not in Critical Care unit.`);
  ccMatches.slice(0, 10).forEach(q => {
    console.log(`- Unit: ${q.unit} | Topic: ${q.topic} | Stem: ${q.stem.substring(0, 50)}...`);
  });
}

run();
