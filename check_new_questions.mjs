import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data } = await supabase.from('questions')
    .select('status')
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  const statusCounts = {};
  for (const q of data) {
    statusCounts[q.status] = (statusCounts[q.status] || 0) + 1;
  }
  console.log('Status breakdown:', statusCounts);
}
run();
