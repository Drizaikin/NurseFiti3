import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EXAM_CONFIGS = {
  'KRCHN-Paper1': { cadre: 'KRCHN', paper: 'Paper I', totalQuestions: 100 },
  'KRCHN-Paper2': { cadre: 'KRCHN', paper: 'Paper II', totalQuestions: 100 },
  'BScN-Paper1':  { cadre: 'BScN',  paper: 'Paper I', totalQuestions: 100 },
  'BScN-Paper2':  { cadre: 'BScN',  paper: 'Paper II', totalQuestions: 100 },
};

async function checkUI() {
  const userId = '0412a184-f34f-4826-add2-00b6af4eb121'; // Dan

  console.log("Mock Exam UI Tracker Simulation (for user Dan):\n");

  for (const [key, config] of Object.entries(EXAM_CONFIGS)) {
    const { count: totalQ } = await supabase.from('questions')
      .select('id', { count: 'exact', head: true })
      .eq('cadre', config.cadre).eq('paper', config.paper).eq('status', 'approved');

    const { data: seenData } = await supabase.from('student_answers')
      .select('question_id')
      .eq('student_id', userId)
      .eq('mode', 'mock_exam')
      .eq('paper', config.paper);

    const uniqueSeen = new Set(seenData?.map(d => d.question_id) ?? []).size;
    const total = totalQ ?? 0;
    const setSize = config.totalQuestions;

    const totalSets = Math.floor(total / setSize);
    const completedSets = Math.floor(uniqueSeen / setSize);

    console.log(`--- ${config.cadre} ${config.paper} ---`);
    console.log(`Total Approved Questions: ${total}`);
    console.log(`Unique Seen by Dan: ${uniqueSeen}`);
    console.log(`UI displays: "Unique Mock Sets Completed: ${completedSets} of ${totalSets}"\n`);
  }
}

checkUI();
