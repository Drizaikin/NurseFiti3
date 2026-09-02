import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const access = await requireAdmin();
    if ('response' in access) return access.response;
    const { admin } = access;
    const body = await req.json();
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const targetRole = body.target_role === 'student' || body.target_role === 'tutor' ? body.target_role : null;
    const actionUrl = typeof body.action_url === 'string' && body.action_url.startsWith('/') ? body.action_url : null;

    if (!title || !message) return NextResponse.json({ error: 'Title and message required.' }, { status: 400 });
    if (title.length > 160 || message.length > 2000) return NextResponse.json({ error: 'Broadcast content is too long.' }, { status: 400 });

    let query = admin.from('profiles').select('id');
    if (targetRole) query = query.eq('role', targetRole);
    else query = query.in('role', ['student', 'tutor']);

    const { data: users, error: usersErr } = await query;
    if (usersErr) throw usersErr;
    if (!users?.length) return NextResponse.json({ sent: 0 });

    const notifications = users.map((user: { id: string }) => ({
      user_id: user.id,
      type: 'admin_broadcast',
      title,
      body: message,
      action_url: actionUrl,
      is_broadcast: true,
      target_role: targetRole,
    }));
    const { error: notifErr } = await admin.from('notifications').insert(notifications);
    if (notifErr) throw notifErr;
    return NextResponse.json({ sent: notifications.length });
  } catch (err) {
    console.error('[admin/broadcast]', err);
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 });
  }
}
