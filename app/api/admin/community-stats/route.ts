import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = createAdminClient();
    const [studentMsgs, tutorMsgs, groups, broadcasts] = await Promise.all([
      admin.from('community_messages').select('id, group_id, is_admin_post, likes_count, created_at', { count: 'exact' }).order('created_at', { ascending: false }).limit(50) as any,
      admin.from('tutor_messages').select('id, is_admin_post, likes_count, created_at', { count: 'exact' }).order('created_at', { ascending: false }).limit(50) as any,
      admin.from('study_groups').select('id, name, cadre, member_count').order('member_count', { ascending: false }) as any,
      admin.from('notifications').select('id, title, body, created_at, read_count, target_role').eq('is_broadcast', true).order('created_at', { ascending: false }).limit(20) as any,
    ]);
    return NextResponse.json({
      studentMessageCount: studentMsgs.count ?? 0,
      tutorMessageCount: tutorMsgs.count ?? 0,
      recentStudentMessages: studentMsgs.data ?? [],
      recentTutorMessages: tutorMsgs.data ?? [],
      groups: groups.data ?? [],
      broadcasts: broadcasts.data ?? [],
    });
  } catch (err) {
    console.error('[admin/community-stats]', err);
    return NextResponse.json({ error: 'Failed.' }, { status: 500 });
  }
}
