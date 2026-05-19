import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { studentSignupSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = studentSignupSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', data.email)
      .single();
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: 'student',
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    
    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }
    
    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      );
    }
    
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        role: 'student',
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
      });
    
    if (profileError) {
      console.error('Profile error:', profileError);
      // Try to clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }
    
    // Create student profile
    const { error: studentProfileError } = await supabase
      .from('student_profiles')
      .insert({
        id: authData.user.id,
        cadre: data.cadre,
        specialty: data.specialty || null,
        institution: data.institution,
        exam_date: data.examDate,
        exam_cycle: data.examCycle,
        xp: 0,
        level: 1,
        streak_count: 0,
        plan_tier: 'free',
      });
    
    if (studentProfileError) {
      console.error('Student profile error:', studentProfileError);
      // Clean up
      await supabase.from('profiles').delete().eq('id', authData.user.id);
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'Failed to create student profile' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      userId: authData.user.id,
    });
    
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
