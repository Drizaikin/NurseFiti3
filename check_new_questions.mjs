import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
