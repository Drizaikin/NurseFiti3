/**
 * POST /api/tutor/update-rating
 *
 * Recalculates and saves the average rating for a tutor after a new review.
 * Called from the student bookings page after submitting a session review.
 * Uses the admin client to bypass RLS — students cannot write to tutor_profiles.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  tutorId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = bodySchema.safeParse(await req.json());
    if (!body.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { tutorId } = body.data;
    const admin = createAdminClient();

    // Fetch all published reviews for this tutor
    const { data: reviews, error: reviewsError } = await (admin as any)
      .from('session_reviews')
      .select('rating')
      .eq('tutor_id', tutorId)
      .eq('is_published', true);

    if (reviewsError) {
      return NextResponse.json({ error: reviewsError.message }, { status: 500 });
    }

    if (!reviews || reviews.length === 0) {
      return NextResponse.json({ success: true, average_rating: 0 });
    }

    const avg = (reviews as Array<{ rating: number }>).reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const rounded = Math.round(avg * 100) / 100;

    const { error: updateError } = await (admin as any)
      .from('tutor_profiles')
      .update({ average_rating: rounded })
      .eq('id', tutorId);

    if (updateError) {
      console.error('[tutor/update-rating]', JSON.stringify(updateError));
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, average_rating: rounded });
  } catch (err) {
    console.error('[tutor/update-rating]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
