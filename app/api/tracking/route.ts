import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Only track authenticated users
    if (!session) {
      return NextResponse.json({ success: true, ignored: true });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('Tracking bypassed: SUPABASE_SERVICE_ROLE_KEY is not set in environment.');
      return NextResponse.json({ success: true, ignored: true });
    }

    const adminClient = createAdminClient();
    
    // Insert view bypassing RLS for performance
    await adminClient.from('page_views').insert({
      user_id: session.user.id,
      path: path,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Fail silently so we don't break the client app
    console.error('Tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
