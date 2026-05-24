/**
 * POST /api/admin/reject-upload
 *
 * Admin-only endpoint to reject a question upload submission.
 *
 * Body:
 *   uploadId        — UUID of the question_uploads record
 *   reason          — rejection reason shown to student
 *   isDuplicate     — boolean, marks as 'duplicate' status instead of 'rejected'
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const bodySchema = z.object({
  uploadId:    z.string().uuid(),
  reason:      z.string().min(5).max(500),
  isDuplicate: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const adminSupabase = createAdminClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = bodySchema.safeParse(await req.json());
    if (!body.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { uploadId, reason, isDuplicate } = body.data;

    await adminSupabase
      .from('question_uploads')
      .update({
        status: isDuplicate ? 'duplicate' : 'rejected',
        rejection_reason: reason,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', uploadId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/reject-upload]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
