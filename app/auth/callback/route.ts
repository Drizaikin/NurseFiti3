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
        .single();

      if (profile?.role === 'student') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (profile?.role === 'tutor') {
        const { data: tutorProfile } = await supabase
          .from('tutor_profiles')
          .select('verification_status')
          .eq('id', session.user.id)
          .single();

        return NextResponse.redirect(
          new URL(
            tutorProfile?.verification_status === 'verified' ? '/tutor-dashboard' : '/tutor-pending',
            req.url
          )
        );
      }
    }
  }

  return NextResponse.redirect(new URL('/login', req.url));
}
