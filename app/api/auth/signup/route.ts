import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { studentSignupSchema } from '@/lib/validations/auth';

/**
 * Admin client using service role key — bypasses RLS.
 * Only used server-side in this route handler.
 */
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel dashboard.');
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Health check — GET /api/auth/signup confirms the route is reachable
export async function GET() {
  return NextResponse.json({
    ok: true,
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Validate env vars first — crash early with JSON, not HTML ──────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // ── 2. Parse & validate body ──────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const validation = studentSignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Please check your form — some fields are invalid.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Normalise phone: 07xx → +254xx
    const phone = data.phone.startsWith('0')
      ? '+254' + data.phone.slice(1)
      : data.phone;

    const supabase = getAdminClient();

    // ── 3. Check for duplicate email ──────────────────────────────────────
    const { data: existing } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', data.email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in instead.' },
        { status: 409 }
      );
    }

    // ── 4. Create Supabase auth user ──────────────────────────────────────
    // email_confirm: true — skip email verification for now so users can log in immediately.
    // Change to false and add email sending if you want email verification.
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        full_name: data.fullName,
        role: 'student',
      },
    });

    if (authError || !authData.user) {
      console.error('Auth createUser error:', authError);
      return NextResponse.json(
        { error: authError?.message ?? 'Failed to create account. Please try again.' },
        { status: 400 }
      );
    }

    const userId = authData.user.id;

    // ── 5. Create public profile row ──────────────────────────────────────
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      role: 'student',
      full_name: data.fullName,
      email: data.email,
      phone: phone,
    });

    if (profileError) {
      console.error('Profile insert error:', profileError);
      // Clean up auth user so the email isn't stuck
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: 'Failed to create user profile. Please try again.' },
        { status: 500 }
      );
    }

    // ── 6. Create student profile row ─────────────────────────────────────
    const { error: studentError } = await supabase.from('student_profiles').insert({
      id: userId,
      cadre: data.cadre,
      specialty: data.specialty ?? null,
      institution: data.institution,
      exam_date: data.examDate,
      exam_cycle: data.examCycle,
      xp: 0,
      level: 1,
      streak_count: 0,
      plan_tier: 'free',
    });

    if (studentError) {
      console.error('Student profile insert error:', studentError);
      // Clean up both rows
      await supabase.from('profiles').delete().eq('id', userId);
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: 'Failed to create student profile. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now log in.',
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Unexpected signup error:', message);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
