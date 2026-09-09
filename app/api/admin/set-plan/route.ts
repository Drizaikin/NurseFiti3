/**
 * POST /api/admin/set-plan
 *
 * Admin-only endpoint to manually set a student's plan tier.
 * Used from the admin dashboard to upgrade students who submitted question uploads.
 *
 * Body:
 *   studentId  — UUID of the student
 *   tier       — 'free' | 'daily' | 'weekly' | 'standard' | 'premium'
 *   durationDays — how many days the plan should last (0 = permanent/free)
 *   uploadId   — optional: question_uploads.id to mark as approved
 *   note       — optional admin note
 *
 * Returns:
 *   { success: true }
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { formatEmailDate, getFirstName, sendPastPaperApprovalEmail } from '@/lib/email';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  studentId:   z.string().uuid(),
  tier:        z.enum(['free', 'daily', 'weekly', 'standard', 'premium']),
  durationDays: z.number().int().min(0),
  uploadId:    z.string().uuid().optional(),
  note:        z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const access = await requireAdmin();
    if ('response' in access) return access.response;
    const { user, admin: adminSupabase } = access;
    const body = bodySchema.safeParse(await req.json());
    if (!body.success) return NextResponse.json({ error: 'Invalid request', details: body.error.flatten() }, { status: 400 });

    const { studentId, tier, durationDays, uploadId, note } = body.data;
    const activatedAt = new Date();
    const expiresAt = tier !== 'free' && durationDays > 0
      ? new Date(activatedAt.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString()
      : null;

    let upload: { id: string; status: string; email_sent: boolean | null } | null = null;
    if (uploadId) {
      const { data, error } = await adminSupabase.from('question_uploads').select('id, status, email_sent').eq('id', uploadId).eq('student_id', studentId).maybeSingle();
      if (error) throw error;
      if (!data) return NextResponse.json({ error: 'Past-paper upload not found for this student.' }, { status: 404 });
      upload = data as typeof upload;
      if (upload.status !== 'pending' && !(upload.status === 'approved' && !upload.email_sent)) {
        return NextResponse.json({ error: 'This upload has already been reviewed.' }, { status: 409 });
      }
    }

    if (!upload || upload.status === 'pending') {
      const { error: updateError } = await adminSupabase.from('student_profiles').update({ plan_tier: tier, plan_expires_at: expiresAt }).eq('id', studentId);
      if (updateError) throw updateError;
      if (uploadId) {
        const { error: uploadError } = await adminSupabase.from('question_uploads').update({ status: 'approved', admin_note: note ?? null, reviewed_by: user.id, reviewed_at: activatedAt.toISOString() }).eq('id', uploadId).eq('status', 'pending');
        if (uploadError) throw uploadError;
      }
    }

    let emailSent = false;
    if (uploadId && (!upload || !upload.email_sent)) {
      const [{ data: profile, error: profileError }, { data: activePlan, error: planError }] = await Promise.all([
        adminSupabase.from('profiles').select('full_name, email').eq('id', studentId).maybeSingle(),
        adminSupabase.from('student_profiles').select('plan_tier, plan_expires_at').eq('id', studentId).maybeSingle(),
      ]);
      if (profileError || planError) throw profileError ?? planError;
      if (!activePlan) return NextResponse.json({ error: 'Student plan could not be confirmed.' }, { status: 500 });
      const activeTier = activePlan.plan_tier as string;
      const activeExpiry = activePlan.plan_expires_at as string | null;
      if (activeTier !== 'free' && activeExpiry) {
        const result = await sendPastPaperApprovalEmail({
          to: profile?.email,
          firstName: getFirstName(profile?.full_name),
          planName: activeTier === 'daily' ? 'Exam Boost Daily' : `${activeTier.charAt(0).toUpperCase()}${activeTier.slice(1)} Plan`,
          startDate: formatEmailDate(activatedAt),
          endDate: formatEmailDate(activeExpiry),
        });
        if (result.sent) {
          const { error: emailFlagError } = await adminSupabase.from('question_uploads').update({ email_sent: true }).eq('id', uploadId).eq('email_sent', false);
          if (emailFlagError) throw emailFlagError;
          emailSent = true;
        } else {
          console.error('[admin/set-plan] Approval email was not sent:', result.reason);
        }
      }
    }
    return NextResponse.json({ success: true, emailSent });
  } catch (err) {
    console.error('[admin/set-plan]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
