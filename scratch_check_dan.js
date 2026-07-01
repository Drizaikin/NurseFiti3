const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
}

const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabase = createClient(urlMatch[1].trim(), keyMatch[1].trim());

async function run() {
  const { data: users, error: uErr } = await supabase.from('profiles').select('id, full_name');
  if (uErr) { console.error("User error:", uErr); return; }
  
  console.log("Found users:", users.map(u => u.full_name));
}
run();
