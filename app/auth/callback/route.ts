import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type'); // 'recovery' for password reset

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? requestUrl.origin;

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // If the code is expired or invalid, redirect them back to forgot password
      return NextResponse.redirect(new URL('/forgot-password?error=invalid_link', siteUrl));
    }

    // Password reset flow — send to the reset-password page
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/reset-password', siteUrl));
    }

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      const profileData = profile as { role: string } | null;

      if (profileData?.role === 'student') {
        return NextResponse.redirect(new URL('/dashboard', siteUrl));
      }
      if (profileData?.role === 'tutor') {
        return NextResponse.redirect(new URL('/tutor-dashboard', siteUrl));
      }
      if (profileData?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', siteUrl));
      }
    }
  }

  return NextResponse.redirect(new URL('/login', siteUrl));
}
