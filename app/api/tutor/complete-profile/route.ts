/**
 * POST /api/tutor/complete-profile
 *
 * Updates a tutor's profile with the completed fields from the 3-step
 * complete-profile flow (Specialization, Documents, Payment).
 *
 * Uses the admin client to bypass RLS — the RLS policy for tutor self-update
 * may not be in place on all environments.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const phoneRegex = /^(\+254|0)(7\d{8}|1\d{8})$/;

const bodySchema = z.object({
  cadresTaught:             z.array(z.string()).min(1, 'Select at least one cadre'),
  specialties:              z.array(z.string()).optional().default([]),
  bio:                      z.string().min(200, 'Bio must be at least 200 characters').max(400),
  sessionRate:              z.number().min(500).max(10000),
  mpesaNumber:              z.string().regex(phoneRegex, 'Invalid M-Pesa number'),
  whatsappNumber:           z.string().regex(phoneRegex, 'Invalid WhatsApp number'),
  nckCertificateUrl:        z.string().min(1),
  academicQualificationUrl: z.string().min(1),
  nationalIdUrl:            z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    // Auth check with the user-session client
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate body
    const rawBody = await req.json();
    const body = bodySchema.safeParse(rawBody);
    if (!body.success) {
      return NextResponse.json(
        { error: body.error.errors[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const {
      cadresTaught, specialties, bio, sessionRate,
      mpesaNumber, whatsappNumber,
      nckCertificateUrl, academicQualificationUrl, nationalIdUrl,
    } = body.data;

    // Use admin client to update — bypasses RLS entirely
    const admin = createAdminClient();

    const payload = {
      cadres_taught:              cadresTaught,
      specialties:                specialties ?? [],
      bio,
      rate_per_hour:              sessionRate,
      mpesa_number:               mpesaNumber,
      whatsapp_number:            whatsappNumber,
      nck_certificate_url:        nckCertificateUrl,
      academic_qualification_url: academicQualificationUrl,
      national_id_url:            nationalIdUrl,
    };

    // First check the row exists
    const { data: existing, error: checkError } = await admin
      .from('tutor_profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error('[tutor/complete-profile] row check error:', JSON.stringify(checkError));
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    let dbError: { message: string } | null = null;

    if (existing) {
      // Row exists — update only the completion fields
      const { error } = await admin
        .from('tutor_profiles')
        .update(payload)
        .eq('id', user.id);
      dbError = error;
    } else {
      // Row missing — signup failed to create it. Fetch what we can from profiles
      // and build a minimal valid row to insert alongside the completion fields.
      console.warn('[tutor/complete-profile] no existing row for user', user.id, '— building from profiles');

      const { data: profileData } = await admin
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .maybeSingle() as any;

      // We need nck_reg_number to satisfy NOT NULL — use a placeholder if we have no data.
      // The admin can correct it in the tutor management page once the row exists.
      const { error } = await admin
        .from('tutor_profiles')
        .insert({
          id: user.id,
          // Required columns with safe fallbacks
          nck_reg_number:      'PENDING-' + user.id.slice(0, 8).toUpperCase(),
          professional_title:  profileData?.full_name ?? 'Tutor',
          years_experience:    0,
          current_employer:    'Not provided',
          verification_status: 'pending',
          ...payload,
        });
      dbError = error;
    }

    if (dbError) {
      console.error('[tutor/complete-profile] write error:', JSON.stringify(dbError));
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[tutor/complete-profile]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Server error' },
      { status: 500 }
    );
  }
}
