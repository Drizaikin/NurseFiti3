/**
 * POST /api/admin/manage-account
 *
 * Admin-only endpoint to lock or permanently delete a user account.
 *
 * Body:
 *   userId  — UUID of the user to act on
 *   action  — 'lock' | 'unlock' | 'delete'
 *
 * Lock/unlock: sets a `is_locked` flag on the profiles row and bans/unbans
 *              the user in Supabase Auth (ban_duration = '876600h' ≈ 100 years for lock).
 * Delete:      removes the auth user (cascades to profile rows via FK).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  userId: z.string().uuid(),
  action: z.enum(['lock', 'unlock', 'delete']),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const admin = createAdminClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Role check — must be admin
    const { data: callerProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!callerProfile || (callerProfile as { role: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
    }

    const { userId, action } = parsed.data;

    // Prevent admin from acting on their own account
    if (userId === user.id) {
      return NextResponse.json({ error: 'You cannot modify your own account' }, { status: 400 });
    }

    if (action === 'delete') {
      // The profiles table has REFERENCES auth.users without ON DELETE CASCADE.
      // We must delete ALL rows that reference profiles before deleting the profile row,
      // and ALL rows that reference those child tables before them.
      // The exact order matters — deepest children first.

      // ── Tier 3: rows that reference sessions ────────────────────────────
      await (admin as any).from('session_reviews').delete().eq('student_id', userId);
      await (admin as any).from('session_reviews').delete().eq('tutor_id', userId);
      await (admin as any).from('session_notes').delete().eq('tutor_id', userId);
      await (admin as any).from('session_notes').delete().eq('student_id', userId);

      // ── Tier 3: rows that reference study_groups ────────────────────────
      await (admin as any).from('group_members').delete().eq('student_id', userId);

      // ── Tier 3: rows that reference community/tutor messages ────────────
      // message_reactions references both community_messages and tutor_messages
      // Delete reactions first, then the messages
      await (admin as any).from('message_reactions').delete().eq('user_id', userId);
      await (admin as any).from('tutor_messages').delete().eq('author_id', userId);
      await (admin as any).from('community_messages').delete().eq('author_id', userId);

      // ── Tier 3: notification reads ───────────────────────────────────────
      await (admin as any).from('notification_reads').delete().eq('user_id', userId);

      // ── Tier 3: feedback helpful votes ──────────────────────────────────
      await (admin as any).from('feedback_helpful').delete().eq('user_id', userId);

      // ── Tier 2: rows that directly reference profiles ───────────────────
      await (admin as any).from('student_answers').delete().eq('student_id', userId);
      await (admin as any).from('mock_exam_results').delete().eq('student_id', userId);
      await (admin as any).from('flashcard_progress').delete().eq('student_id', userId);
      await (admin as any).from('student_badges').delete().eq('student_id', userId);
      await (admin as any).from('revision_plans').delete().eq('student_id', userId);
      await (admin as any).from('tutor_availability').delete().eq('tutor_id', userId);
      await (admin as any).from('tutor_payouts').delete().eq('tutor_id', userId);
      await (admin as any).from('payments').delete().eq('user_id', userId);
      await (admin as any).from('notifications').delete().eq('user_id', userId);
      await (admin as any).from('study_notes').delete().eq('contributor_id', userId);
      await (admin as any).from('flagged_questions').delete().eq('student_id', userId);
      await (admin as any).from('practice_sessions').delete().eq('student_id', userId);
      await (admin as any).from('app_feedback').delete().eq('user_id', userId);
      await (admin as any).from('question_uploads').delete().eq('student_id', userId);
      // sessions reference both student_id and tutor_id
      await (admin as any).from('sessions').delete().eq('student_id', userId);
      await (admin as any).from('sessions').delete().eq('tutor_id', userId);
      // study_groups created by this user
      await (admin as any).from('study_groups').delete().eq('creator_id', userId);

      // ── Tier 1: child profiles ───────────────────────────────────────────
      await (admin as any).from('student_profiles').delete().eq('id', userId);
      await (admin as any).from('tutor_profiles').delete().eq('id', userId);

      // ── Tier 0: the profiles row itself ──────────────────────────────────
      const { error: profileDeleteError } = await (admin as any)
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileDeleteError) {
        console.error('[manage-account] profile delete error:', profileDeleteError);
        return NextResponse.json(
          { error: `Failed to delete account: ${profileDeleteError.message}` },
          { status: 500 }
        );
      }

      // ── Auth user (no FK blocker remains) ────────────────────────────────
      const { error: authDeleteError } = await admin.auth.admin.deleteUser(userId);
      if (authDeleteError) {
        console.error('[manage-account] deleteUser error:', authDeleteError);
        return NextResponse.json({ error: `Failed to delete account: ${authDeleteError.message}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, action: 'deleted' });
    }

    if (action === 'lock') {
      // Ban in Supabase Auth (effectively blocks all future logins/token refreshes)
      const { error: banError } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: '876600h', // ~100 years
      });
      if (banError) {
        console.error('[manage-account] ban error:', banError);
        return NextResponse.json({ error: `Failed to lock account: ${banError.message}` }, { status: 500 });
      }
      // Also flag in profiles so the UI can reflect the state
      await (admin as any).from('profiles').update({ is_locked: true }).eq('id', userId);
      return NextResponse.json({ success: true, action: 'locked' });
    }

    if (action === 'unlock') {
      const { error: unbanError } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: 'none',
      });
      if (unbanError) {
        console.error('[manage-account] unban error:', unbanError);
        return NextResponse.json({ error: `Failed to unlock account: ${unbanError.message}` }, { status: 500 });
      }
      await (admin as any).from('profiles').update({ is_locked: false }).eq('id', userId);
      return NextResponse.json({ success: true, action: 'unlocked' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    console.error('[manage-account]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
