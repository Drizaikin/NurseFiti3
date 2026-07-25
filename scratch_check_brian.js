const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id')
    .ilike('full_name', '%brian kuria%');
    
  if (error) {
    console.error('Error fetching profiles:', error);
    return;
  }
  
  if (profiles && profiles.length > 0) {
    const userId = profiles[0].id;
    
    // Fetch ALL answers for timeline and total count
    let allAnswers = [];
    let page = 0;
    const pageSize = 1000;
    
    while (true) {
      const { data, error: caError } = await supabase
        .from('student_answers')
        .select('is_correct, answered_at, mode')
        .eq('student_id', userId)
        .order('answered_at', { ascending: true })
        .range(page * pageSize, (page + 1) * pageSize - 1);
        
      if (caError) {
        console.error('Error fetching answers:', caError);
        break;
      }
      
      allAnswers = allAnswers.concat(data);
      if (data.length < pageSize) break;
      page++;
    }
    
    console.log('Total questions answered (correct + wrong):', allAnswers.length);
    
    let correct = 0;
    let wrong = 0;
    const modeCounts = {};

    allAnswers.forEach(a => {
        if (a.is_correct) correct++;
        else wrong++;
        
        modeCounts[a.mode] = (modeCounts[a.mode] || 0) + 1;
    });
    
    console.log(`Breakdown: ${correct} Correct, ${wrong} Wrong`);
    console.log('Mode breakdown (Total):', modeCounts);
    
    if (allAnswers.length > 0) {
      const firstDate = new Date(allAnswers[0].answered_at);
      const lastDate = new Date(allAnswers[allAnswers.length - 1].answered_at);
      
      console.log('First question answered at:', firstDate.toISOString());
      console.log('Last question answered at:', lastDate.toISOString());
      
      // Breakdown by month/year
      const timeline = {};
      allAnswers.forEach(a => {
        const d = new Date(a.answered_at);
        const monthYear = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        timeline[monthYear] = (timeline[monthYear] || 0) + 1;
      });
      console.log('Questions answered per month:', timeline);
    }
  }
}

run();
