import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const admin = createAdminClient();
    const { body, community, group_id, admin_user_id } = await req.json();
    if (!body?.trim()) return NextResponse.json({ error: 'Body required.' }, { status: 400 });
    if (!admin_user_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await admin.from('profiles').select('role').eq('id', admin_user_id).single() as any;
    if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    if (community === 'tutor') {
      const { data, error } = await admin.from('tutor_messages').insert({ author_id: admin_user_id, body: body.trim(), is_admin_post: true } as any).select().single();
      if (error) throw error;
      return NextResponse.json({ message: data });
    } else {
      if (!group_id) return NextResponse.json({ error: 'group_id required.' }, { status: 400 });
      const { data, error } = await admin.from('community_messages').insert({ author_id: admin_user_id, group_id, body: body.trim(), is_admin_post: true } as any).select().single();
      if (error) throw error;
      return NextResponse.json({ message: data });
    }
  } catch (err) {
    console.error('[admin/community-post]', err);
    return NextResponse.json({ error: 'Failed to post.' }, { status: 500 });
  }
}
