/**
 * POST /api/admin/review-question
 *
 * Admin-only. Approve or reject a tutor-submitted MCQ.
 *
 * Body:
 *   questionId — UUID of the question
 *   action     — 'approve' | 'reject'
 *   reason     — optional rejection reason
 *
 * On approval:
 *   - Sets question.status = 'approved'
 *   - Awards +50 XP to the contributor
 *   - Sends a notification to the contributor
 *
 * On rejection:
 *   - Sets question.status = 'rejected'
 *   - Sends a notification to the contributor with the reason
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  questionId: z.string().uuid(),
  action:     z.enum(['approve', 'reject']),
  reason:     z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || (profile as any).role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = bodySchema.safeParse(await req.json());
    if (!body.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

    const { questionId, action, reason } = body.data;
    const admin = createAdminClient();

    // Get the question to find contributor
    const { data: question } = await (admin as any)
      .from('questions')
      .select('contributor_id, topic, unit, cadre')
      .eq('id', questionId)
      .maybeSingle();

    // Update question status
    await (admin as any)
      .from('questions')
      .update({ status: action === 'approve' ? 'approved' : 'rejected' })
      .eq('id', questionId);

    // Award XP and notify contributor if there is one
    if (question?.contributor_id) {
      const contributorId = question.contributor_id as string;

      if (action === 'approve') {
        // Award +50 XP
        const { data: sp } = await (admin as any)
          .from('tutor_profiles')
          .select('id')
          .eq('id', contributorId)
          .maybeSingle();

        // Check if contributor is a student (uploads questions for unlock)
        const { data: studentProfile } = await (admin as any)
          .from('student_profiles')
          .select('xp, level')
          .eq('id', contributorId)
          .maybeSingle();

        if (studentProfile) {
          const newXP = (studentProfile.xp ?? 0) + 50;
          await (admin as any)
            .from('student_profiles')
            .update({ xp: newXP, level: Math.floor(newXP / 100) + 1 })
            .eq('id', contributorId);
        }

        await admin.from('notifications').insert({
          user_id:    contributorId,
          type:       'question_approved',
          title:      'Your MCQ was approved! 🎉',
          body:       `Your question on "${question.topic}" (${question.unit} · ${question.cadre}) has been approved and is now live in the question bank. +50 XP earned.`,
          action_url: '/tutor-studio',
        });
      } else {
        await admin.from('notifications').insert({
          user_id:    contributorId,
          type:       'question_rejected',
          title:      'MCQ needs revision',
          body:       `Your question on "${question.topic}" was not approved. ${reason ? `Reason: ${reason}` : 'Please review and resubmit.'}`,
          action_url: '/tutor-studio',
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/review-question]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
