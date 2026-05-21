import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { studentSignupSchema } from '@/lib/validations/auth';

/**
 * Inline admin client — service role, bypasses RLS.
 */
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// Health check — visit /api/auth/signup in browser to confirm route is reachable
export async function GET() {
  return NextResponse.json({
    ok: true,
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse & validate body ──────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const validation = studentSignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Normalise phone: 07xx → +254xx
    const phone = data.phone.startsWith('0')
      ? '+254' + data.phone.slice(1)
      : data.phone;

    const supabase = getAdminClient();

    // ── 2. Check for duplicate email ──────────────────────────────────────
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

    // ── 3. Create Supabase auth user ──────────────────────────────────────
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: false,          // require email verification
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

    // ── 4. Create public profile row ──────────────────────────────────────
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      role: 'student',
      full_name: data.fullName,
      email: data.email,
      phone: phone,
    });

    if (profileError) {
      console.error('Profile insert error:', profileError);
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      return NextResponse.json(
        { error: 'Failed to create user profile. Please try again.' },
        { status: 500 }
      );
    }

    // ── 5. Create student profile row ─────────────────────────────────────
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
      await supabase.from('profiles').delete().eq('id', userId).catch(() => {});
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
      return NextResponse.json(
        { error: 'Failed to create student profile. Please try again.' },
        { status: 500 }
      );
    }

    // ── 6. Send verification email via Supabase ───────────────────────────
    // Generate a magic link / OTP so the user gets a verification email
    await supabase.auth.admin.generateLink({
      type: 'signup',
      email: data.email,
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    }).catch((e) => {
      // Non-fatal — user can request resend from login page
      console.warn('Could not send verification email:', e);
    });

    return NextResponse.json({
      success: true,
      message: 'Account created! Please check your email to verify your account.',
    });

  } catch (error: unknown) {
    console.error('Unexpected signup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
