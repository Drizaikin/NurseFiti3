import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const admin = createAdminClient();
    const { title, message, target_role, action_url, admin_user_id } = await req.json();
    if (!title?.trim() || !message?.trim()) return NextResponse.json({ error: 'Title and message required.' }, { status: 400 });
    if (!admin_user_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await admin.from('profiles').select('role').eq('id', admin_user_id).single() as any;
    if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    let query = admin.from('profiles').select('id') as any;
    if (target_role === 'student') query = query.eq('role', 'student');
    else if (target_role === 'tutor') query = query.eq('role', 'tutor');
    else query = query.in('role', ['student', 'tutor']);

    const { data: users, error: usersErr } = await query;
    if (usersErr) throw usersErr;
    if (!users?.length) return NextResponse.json({ sent: 0 });

    const notifications = users.map((u: { id: string }) => ({
      user_id: u.id,
      type: 'admin_broadcast',
      title: title.trim(),
      body: message.trim(),
      action_url: action_url ?? null,
      is_broadcast: true,
      target_role: target_role ?? null,
    }));

    const { error: notifErr } = await admin.from('notifications').insert(notifications as any);
    if (notifErr) throw notifErr;

    return NextResponse.json({ sent: notifications.length });
  } catch (err) {
    console.error('[admin/broadcast]', err);
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 });
  }
}
