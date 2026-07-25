import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  let allData = [];
  let from = 0;
  let step = 1000;
  while (true) {
    const { data } = await supabase.from('questions').select('created_at').range(from, from + step - 1);
    if (data.length === 0) break;
    allData = allData.concat(data);
    from += step;
  }
  
  let olderThan24 = 0;
  let newerThan24 = 0;
  const now = new Date();
  
  allData.forEach(q => {
    if ((now - new Date(q.created_at)) < 24 * 60 * 60 * 1000) {
        newerThan24++;
    } else {
        olderThan24++;
    }
  });
  console.log(`Total physically in DB: ${allData.length}`);
  console.log(`Added before today: ${olderThan24}`);
  console.log(`Added today (Set 3): ${newerThan24}`);
}

run();
