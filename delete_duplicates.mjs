import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  let allData = [];
  let from = 0;
  let step = 1000;
  while (true) {
    const { data } = await supabase.from('questions').select('id, stem, cadre, created_at').range(from, from + step - 1);
    if (data.length === 0) break;
    allData = allData.concat(data);
    from += step;
  }
  
  const normalizedMap = {};
  let deletedCount = 0;

  for (const q of allData) {
    const normStem = q.stem.replace(/\s+/g, '').toLowerCase();
    const normKey = `${q.cadre}:::${normStem}`;
    
    if (normalizedMap[normKey]) {
        console.log(`DELETING DUPLICATE: [${q.cadre}] ID:${q.id} -> ${q.stem.substring(0, 50)}...`);
        await supabase.from('questions').delete().eq('id', q.id);
        deletedCount++;
    } else {
        normalizedMap[normKey] = q;
    }
  }

  console.log(`Deleted ${deletedCount} duplicate questions.`);
}

run();
