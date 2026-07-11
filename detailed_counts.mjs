import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';
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
