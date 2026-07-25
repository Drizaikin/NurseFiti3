import { NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function requireAdmin() {
  const supabase = createRouteClient();
  const admin = createAdminClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return { response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) } as const;
  }
  const { data: profile } = await admin.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || (profile as { role: string }).role !== 'admin') {
    return { response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) } as const;
  }
  return { user, admin } as const;
}
