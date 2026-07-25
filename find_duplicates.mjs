import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  let allData = [];
  let from = 0;
  let step = 1000;
  while (true) {
    const { data } = await supabase.from('questions').select('id, stem, cadre').range(from, from + step - 1);
    if (data.length === 0) break;
    allData = allData.concat(data);
    from += step;
  }
  
  const exactMatchMap = {};
  const normalizedMap = {};
  let exactDupes = 0;
  let normDupes = 0;

  allData.forEach(q => {
    // Exact match (including cadre)
    const exactKey = `${q.cadre}:::${q.stem}`;
    if (exactMatchMap[exactKey]) {
        exactDupes++;
        console.log(`EXACT DUPE: [${q.cadre}] ${q.stem.substring(0, 50)}...`);
    }
    exactMatchMap[exactKey] = true;

    // Normalized match (ignore whitespace and case, within same cadre)
    const normStem = q.stem.replace(/\s+/g, '').toLowerCase();
    const normKey = `${q.cadre}:::${normStem}`;
    if (normalizedMap[normKey]) {
        normDupes++;
        console.log(`NORM DUPE: [${q.cadre}] ID:${q.id} -> ${q.stem.substring(0, 80)}`);
    }
    normalizedMap[normKey] = true;
  });

  console.log(`Total questions analyzed: ${allData.length}`);
  console.log(`Exact duplicates (same stem & cadre): ${exactDupes}`);
  console.log(`Normalized duplicates (spacing/case diffs, same cadre): ${normDupes}`);
}

run();
