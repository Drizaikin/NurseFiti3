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
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
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
    const supabase = createRouteClient();
    const adminSupabase = createAdminClient();

    // Auth check — must be logged in
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Role check — must be admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden — admin access required' }, { status: 403 });
    }

    // Validate body
    const body = bodySchema.safeParse(await req.json());
    if (!body.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: body.error.flatten() },
        { status: 400 }
      );
    }

    const { studentId, tier, durationDays, uploadId, note } = body.data;

    // Calculate expiry
    let expiresAt: string | null = null;
    if (tier !== 'free' && durationDays > 0) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + durationDays);
      expiresAt = expiry.toISOString();
    }

    // Update student plan
    const { error: updateError } = await adminSupabase
      .from('student_profiles')
      .update({ plan_tier: tier, plan_expires_at: expiresAt })
      .eq('id', studentId);

    if (updateError) {
      console.error('[admin/set-plan] Update error:', updateError);
      return NextResponse.json({ error: 'Failed to update student plan' }, { status: 500 });
    }

    // If an upload was associated, mark it as approved
    if (uploadId) {
      await adminSupabase
        .from('question_uploads')
        .update({
          status: 'approved',
          admin_note: note ?? null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', uploadId);
    }

    // Log the action
    console.log(`[admin/set-plan] Admin ${user.id} set student ${studentId} to ${tier} (${durationDays} days)`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/set-plan]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Server error' },
      { status: 500 }
    );
  }
}
