import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const access = await requireAdmin();
    if ('response' in access) return access.response;
    const { user, admin } = access;
    const payload = await req.json();
    const body = typeof payload.body === 'string' ? payload.body.trim() : '';
    const community = payload.community === 'tutor' ? 'tutor' : payload.community === 'student' ? 'student' : null;
    const groupId = typeof payload.group_id === 'string' && payload.group_id ? payload.group_id : null;

    if (!body) return NextResponse.json({ error: 'Body required.' }, { status: 400 });
    if (body.length > 2000) return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
    if (!community) return NextResponse.json({ error: 'A valid community is required.' }, { status: 400 });

    if (community === 'tutor') {
      const { data, error } = await admin.from('tutor_messages').insert({ author_id: user.id, body, is_admin_post: true }).select().single();
      if (error) throw error;
      return NextResponse.json({ message: data });
    }

    if (!groupId) return NextResponse.json({ error: 'A study group is required for student-community posts.' }, { status: 400 });
    const { data: group, error: groupError } = await admin.from('study_groups').select('id').eq('id', groupId).maybeSingle();
    if (groupError) throw groupError;
    if (!group) return NextResponse.json({ error: 'Study group not found.' }, { status: 404 });
    const { data, error } = await admin.from('community_messages').insert({ author_id: user.id, group_id: groupId, body, is_admin_post: true }).select().single();
    if (error) throw error;
    return NextResponse.json({ message: data });
  } catch (err) {
    console.error('[admin/community-post]', err);
    return NextResponse.json({ error: 'Failed to post.' }, { status: 500 });
  }
}
