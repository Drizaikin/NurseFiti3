import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Exchange code for session
    await supabase.auth.exchangeCodeForSession(code);
    
    // Get user profile to determine redirect
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (profile?.role === 'student') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } else if (profile?.role === 'tutor') {
        const { data: tutorProfile } = await supabase
          .from('tutor_profiles')
          .select('verification_status')
          .eq('id', session.user.id)
          .single();
        
        if (tutorProfile?.verification_status === 'verified') {
          return NextResponse.redirect(new URL('/tutor-dashboard', req.url));
        } else {
          return NextResponse.redirect(new URL('/tutor-pending', req.url));
        }
      }
    }
  }

  // Redirect to login if something went wrong
  return NextResponse.redirect(new URL('/login', req.url));
}
