import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({ name, value, ...options });
          res = NextResponse.next({ request: { headers: req.headers } });
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({ name, value: '', ...options });
          res = NextResponse.next({ request: { headers: req.headers } });
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  // Public routes — no auth required
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/signup-tutor',
    '/forgot-password',
    '/reset-password',
    '/about',
    '/pricing',
    '/blog',
    '/tutors',
    '/help',
    '/terms',
    '/privacy',
    '/auth/callback',
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) return res;

  // Redirect unauthenticated users to login
  if (!session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Get user role from profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Student routes
  const studentRoutes = [
    '/dashboard', '/practice', '/mock-exam', '/flashcards',
    '/analytics', '/achievements', '/groups', '/revision-plan',
    '/bookings', '/settings', '/onboarding',
  ];
  const isStudentRoute = studentRoutes.some((r) => pathname.startsWith(r));

  if (isStudentRoute && profile.role !== 'student') {
    return NextResponse.redirect(
      new URL(profile.role === 'tutor' ? '/tutor-dashboard' : '/login', req.url)
    );
  }

  // Tutor routes
  const tutorRoutes = [
    '/tutor-dashboard', '/tutor-schedule', '/tutor-students',
    '/tutor-studio', '/tutor-earnings', '/tutor-reviews', '/tutor-profile',
  ];
  const isTutorRoute = tutorRoutes.some((r) => pathname.startsWith(r));

  if (isTutorRoute && profile.role !== 'tutor') {
    return NextResponse.redirect(
      new URL(profile.role === 'student' ? '/dashboard' : '/login', req.url)
    );
  }

  // Check tutor verification for tutor routes
  if (isTutorRoute && profile.role === 'tutor') {
    if (pathname === '/tutor-pending') return res;

    const { data: tutorProfile } = await supabase
      .from('tutor_profiles')
      .select('verification_status')
      .eq('id', session.user.id)
      .single();

    if (tutorProfile?.verification_status === 'pending') {
      return NextResponse.redirect(new URL('/tutor-pending', req.url));
    }
    if (tutorProfile?.verification_status === 'rejected') {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/login?error=account_rejected', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
