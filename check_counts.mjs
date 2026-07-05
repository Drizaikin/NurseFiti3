import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const cadres = ['KRCHN', 'BScN'];
  const papers = ['Paper I', 'Paper II'];

  for (const cadre of cadres) {
    console.log(`--- ${cadre} ---`);
    for (const paper of papers) {
      const { count } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('cadre', cadre)
        .eq('paper', paper)
        .eq('status', 'approved');
      console.log(`${paper}: ${count} approved questions`);
    }
  }
}

check();
