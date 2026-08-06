import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createAdminClient } from '../lib/supabase/admin';

async function check() {
  const supabase = createAdminClient();
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('role', 'admin');
    
  if (error) {
    console.error('Error fetching admins:', error);
    return;
  }
  
  console.log('Admins in DB:', profiles);

  const { data: userProfile, error: userError } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('email', 'docotyanga@gmail.com');
  console.log('Docotyanga profile:', userProfile);
}

check();
