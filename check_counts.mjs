import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const cadres = ['KRCHN', 'BScN'];
  const papers = ['Paper I', 'Paper II'];

  for (const cadre of cadres) {
    console.log(`--- ${cadre} ---`);
    for (const paper of papers) {
      const { count: approvedCount } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('cadre', cadre)
        .eq('paper', paper)
        .eq('status', 'approved');
      const { count: totalCount } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('cadre', cadre)
        .eq('paper', paper);
      console.log(`${paper}: ${totalCount} total (${approvedCount} approved)`);
    }
  }
}

check();
