/**
 * POST /api/admin/verify-tutor
 *
 * Admin-only. Approve or reject a tutor's verification.
 *
 * Body:
 *   tutorId — UUID
 *   status  — 'verified' | 'rejected'
 *   tier    — 'standard' | 'gold' (only for verified)
 *   reason  — rejection reason (only for rejected)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const bodySchema = z.object({
  tutorId: z.string().uuid(),
  status:  z.enum(['verified', 'rejected']),
  tier:    z.enum(['standard', 'gold']).optional(),
  reason:  z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = bodySchema.safeParse(await req.json());
    if (!body.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

    const { tutorId, status, tier, reason } = body.data;
    const admin = createAdminClient();

    await admin
      .from('tutor_profiles')
      .update({
        verification_status: status,
        verification_tier:   status === 'verified' ? (tier ?? 'standard') : null,
        rejection_reason:    status === 'rejected' ? (reason ?? null) : null,
      })
      .eq('id', tutorId);

    // Notify the tutor
    await admin.from('notifications').insert({
      user_id:    tutorId,
      type:       status === 'verified' ? 'tutor_verified' : 'tutor_rejected',
      title:      status === 'verified' ? 'Application Approved 🎉' : 'Application Update',
      body:       status === 'verified'
        ? 'Your tutor application has been approved. You can now accept bookings.'
        : `Your tutor application was not approved. Reason: ${reason ?? 'See admin email for details.'}`,
      action_url: status === 'verified' ? '/tutor-dashboard' : '/tutor-pending',
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/verify-tutor]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
