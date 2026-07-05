import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const userId = '0412a184-f34f-4826-add2-00b6af4eb121';
  const { data, error } = await supabase.from('student_answers').select('is_correct, time_taken_seconds, answered_at').eq('student_id', userId).order('answered_at', { ascending: true });
  console.log("Error:", error);
  console.log("Data count:", data?.length);
}

check();
