import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
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

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow public routes
  if (isPublicRoute) {
    return res;
  }

  // Redirect to login if not authenticated
  if (!session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    // Profile not found, redirect to login
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Student routes
  const studentRoutes = [
    '/dashboard',
    '/practice',
    '/mock-exam',
    '/flashcards',
    '/analytics',
    '/achievements',
    '/groups',
    '/revision-plan',
    '/bookings',
    '/settings',
  ];

  const isStudentRoute = studentRoutes.some(route => pathname.startsWith(route));

  if (isStudentRoute && profile.role !== 'student') {
    // Redirect tutors trying to access student routes
    if (profile.role === 'tutor') {
      return NextResponse.redirect(new URL('/tutor-dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Tutor routes
  const tutorRoutes = [
    '/tutor-dashboard',
    '/tutor-schedule',
    '/tutor-students',
    '/tutor-studio',
    '/tutor-earnings',
    '/tutor-reviews',
    '/tutor-profile',
  ];

  const isTutorRoute = tutorRoutes.some(route => pathname.startsWith(route));

  if (isTutorRoute && profile.role !== 'tutor') {
    // Redirect students trying to access tutor routes
    if (profile.role === 'student') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check tutor verification status for tutor routes
  if (isTutorRoute && profile.role === 'tutor') {
    const { data: tutorProfile } = await supabase
      .from('tutor_profiles')
      .select('verification_status')
      .eq('id', session.user.id)
      .single();

    // Allow access to pending page
    if (pathname === '/tutor-pending') {
      return res;
    }

    // Redirect pending tutors to pending page
    if (tutorProfile?.verification_status === 'pending') {
      return NextResponse.redirect(new URL('/tutor-pending', req.url));
    }

    // Redirect rejected tutors to login
    if (tutorProfile?.verification_status === 'rejected') {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/login?error=account_rejected', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
