/**
 * POST /api/tutor/update-profile
 *
 * Saves tutor's editable profile fields (bio, cadres, rate, etc.)
 * from the tutor-profile edit page.
 *
 * Uses the admin client so this works regardless of the RLS state.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  full_name:            z.string().min(2).max(100),
  professional_title:   z.string().min(2).max(200),
  bio:                  z.string().min(200, 'Bio must be at least 200 characters').max(1000),
  whatsapp_number:      z.string().max(20).optional().nullable(),
  years_experience:     z.number().min(0).max(60),
  cadres_taught:        z.array(z.string()).min(1, 'Select at least one cadre'),
  specialties:          z.array(z.string()).optional().default([]),
  rate_per_hour:        z.number().min(500).max(10000),
  session_platform:     z.array(z.string()).optional().default(['Zoom', 'Google Meet', 'WhatsApp']),
  is_accepting_bookings: z.boolean().optional().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await req.json();
    const body = bodySchema.safeParse(rawBody);
    if (!body.success) {
      return NextResponse.json(
        { error: body.error.errors[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const { full_name, ...tutorFields } = body.data;

    const admin = createAdminClient();

    // Update both tables in parallel
    const [profileErr, tutorErr] = await Promise.all([
      (admin as any).from('profiles').update({ full_name }).eq('id', user.id).then((r: any) => r.error),
      (admin as any).from('tutor_profiles').update(tutorFields).eq('id', user.id).then((r: any) => r.error),
    ]);

    if (profileErr) {
      console.error('[tutor/update-profile] profiles error:', JSON.stringify(profileErr));
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }
    if (tutorErr) {
      console.error('[tutor/update-profile] tutor_profiles error:', JSON.stringify(tutorErr));
      return NextResponse.json({ error: tutorErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[tutor/update-profile]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Server error' },
      { status: 500 }
    );
  }
}
