import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data } = await supabase.from('questions').select('id, cadre, paper, created_at, status');
  console.log(`Total questions pulled from remote: ${data.length}`);
  
  let olderThan24 = 0;
  let newerThan24 = 0;
  const now = new Date();
  
  data.forEach(q => {
    if ((now - new Date(q.created_at)) < 24 * 60 * 60 * 1000) {
        newerThan24++;
    } else {
        olderThan24++;
    }
  });
  console.log(`Questions added before today: ${olderThan24}`);
  console.log(`Questions added today (last 24h): ${newerThan24}`);
}

run();
