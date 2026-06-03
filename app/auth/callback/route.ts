import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      const profileData = profile as { role: string } | null;

      if (profileData?.role === 'student') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (profileData?.role === 'tutor') {
        const { data: tutorProfile } = await supabase
          .from('tutor_profiles')
          .select('verification_status')
          .eq('id', session.user.id)
          .maybeSingle();

        const tutorData = tutorProfile as { verification_status: string } | null;

        return NextResponse.redirect(
          new URL('/tutor-dashboard', req.url)
        );
      }

      if (profileData?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }
  }

  return NextResponse.redirect(new URL('/login', req.url));
}
