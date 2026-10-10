import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

function withDeploymentRobots(response: NextResponse) {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return response;
}

function withPrivateRobots(response: NextResponse) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return withDeploymentRobots(response);
}

/**
 * Build a lightweight Supabase SSR client for middleware.
 * getSession() reads from the JWT cookie — no network call.
 * A DB query is only made when role cannot be resolved from cookies.
 */
function makeSupabaseClient(req: NextRequest, res: { current: NextResponse }) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({ name, value, ...options });
          res.current = NextResponse.next({ request: { headers: req.headers } });
          res.current.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({ name, value: '', ...options });
          res.current = NextResponse.next({ request: { headers: req.headers } });
          res.current.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export async function middleware(req: NextRequest) {
  const res = { current: NextResponse.next({ request: { headers: req.headers } }) };

  const { pathname } = req.nextUrl;

  // ── Canonical redirect (no DB call needed) ────────────────────────────────
  const forwardedHost = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  const hostname = forwardedHost?.split(':')[0].toLowerCase();
  const forwardedProtocol = req.headers.get('x-forwarded-proto');
  if (hostname === 'nursefiti.co.ke' || (hostname === 'www.nursefiti.co.ke' && forwardedProtocol === 'http')) {
    const canonicalUrl = req.nextUrl.clone();
    canonicalUrl.protocol = 'https:';
    canonicalUrl.hostname = 'www.nursefiti.co.ke';
    canonicalUrl.port = '';
    return NextResponse.redirect(canonicalUrl, 308);
  }

  // ── Never intercept API routes ────────────────────────────────────────────
  if (pathname.startsWith('/api/')) return res.current;

  // ── Public routes — no auth required ─────────────────────────────────────
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/signup-tutor',
    '/forgot-password',
    '/reset-password',
    '/about',
    '/pricing',
    '/practice-questions',
    '/mock-exams',
    '/nck-flashcards',
    '/revision-plans',
    '/tutoring',
    '/nursing-students',
    '/blog',
    '/help',
    '/terms',
    '/privacy',
    '/tutor-agreement',
    '/auth/callback',
    '/sponsor',
    '/revision-plan/share',
    '/scholarships',
    '/sitemap.xml',
    '/robots.txt',
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const noindexPublicRoutes = [
    '/login', '/signup', '/signup-tutor', '/forgot-password', '/reset-password',
    '/auth/callback', '/sponsor', '/scholarships', '/revision-plan/share',
  ];
  const isNoindexPublicRoute = noindexPublicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) {
    return isNoindexPublicRoute
      ? withPrivateRobots(res.current)
      : withDeploymentRobots(res.current);
  }

  // Let unknown public URLs through to Next.js so they return a real 404
  const protectedRoutes = [
    '/dashboard', '/practice', '/mock-exam', '/flashcards',
    '/analytics', '/achievements', '/groups', '/revision-plan',
    '/bookings', '/settings', '/onboarding', '/tutors',
    '/tutor-dashboard', '/tutor-schedule', '/tutor-students',
    '/tutor-studio', '/tutor-earnings', '/tutor-reviews', '/tutor-profile',
    '/tutor-pending', '/tutor-complete-profile', '/tutor-community',
    '/mnemonics', '/hd-materials',
    '/admin',
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return withDeploymentRobots(res.current);
  }

  // ── All protected routes: verify session (JWT read — no network call) ─────
  const supabase = makeSupabaseClient(req, res);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    if (pathname.startsWith('/admin')) {
      // Don't reveal the admin panel exists — redirect to landing page
      return withPrivateRobots(NextResponse.redirect(new URL('/', req.url)));
    }
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return withPrivateRobots(NextResponse.redirect(redirectUrl));
  }

  // ── Role resolution: read from cookie first (fast path), DB fallback ──────
  // The login page writes a `nf_role` cookie after a successful sign-in.
  // This avoids a DB query on most protected page requests.
  //
  // SECURITY: Admin routes always verify role from the DB — never trust
  // a cookie alone for admin access. For student/tutor routes the cookie
  // is used for speed; a forged cookie cannot grant higher privileges
  // because the session still belongs to that user and RLS enforces access.
  let role = req.cookies.get('nf_role')?.value as string | undefined;

  const isAdminPath = pathname.startsWith('/admin');

  if (!role || isAdminPath) {
    // Always do a DB check for admin paths; fallback for missing cookie.
    const { data: profileData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profileData) {
      await supabase.auth.signOut();
      return withPrivateRobots(NextResponse.redirect(new URL('/login', req.url)));
    }

    role = (profileData as { role: string }).role;

    if (!req.cookies.get('nf_role')) {
      // Stamp the role cookie so subsequent non-admin requests skip the DB query.
      // Non-httpOnly so the login/logout JS can also clear it.
      res.current.cookies.set('nf_role', role, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours max
      });
    }
  }

  // ── Admin routes ──────────────────────────────────────────────────────────
  if (isAdminPath) {
    if (role !== 'admin') {
      const dest =
        role === 'student' ? '/dashboard' :
        role === 'tutor'   ? '/tutor-dashboard' :
        '/';
      return withPrivateRobots(NextResponse.redirect(new URL(dest, req.url)));
    }
    const adminRes = NextResponse.next({ request: { headers: req.headers } });
    adminRes.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return withPrivateRobots(adminRes);
  }

  // ── Student routes ────────────────────────────────────────────────────────
  const studentRoutes = [
    '/dashboard', '/practice', '/mock-exam', '/flashcards',
    '/analytics', '/achievements', '/groups', '/revision-plan',
    '/bookings', '/settings', '/onboarding', '/tutors',
    '/mnemonics', '/hd-materials',
  ];
  const isStudentRoute = studentRoutes.some((r) => pathname === r || pathname.startsWith(r + '/'));

  if (isStudentRoute && role !== 'student') {
    return withPrivateRobots(NextResponse.redirect(
      new URL(
        role === 'tutor'  ? '/tutor-dashboard' :
        role === 'admin'  ? '/admin' :
        '/login',
        req.url
      )
    ));
  }

  // ── Tutor routes ──────────────────────────────────────────────────────────
  const tutorRoutes = [
    '/tutor-dashboard', '/tutor-schedule', '/tutor-students',
    '/tutor-studio', '/tutor-earnings', '/tutor-reviews', '/tutor-profile',
    '/tutor-pending', '/tutor-complete-profile', '/tutor-community',
  ];
  const isTutorRoute = tutorRoutes.some((r) => pathname === r || pathname.startsWith(r + '/'));

  if (isTutorRoute && role !== 'tutor') {
    return withPrivateRobots(NextResponse.redirect(
      new URL(
        role === 'student' ? '/dashboard' :
        role === 'admin'   ? '/admin' :
        '/login',
        req.url
      )
    ));
  }

  // ── Tutor verification check ──────────────────────────────────────────────
  if (isTutorRoute && role === 'tutor') {
    // Allow pending/complete-profile pages through without further checks
    if (
      pathname === '/tutor-pending' ||
      pathname.startsWith('/tutor-complete-profile')
    ) return withPrivateRobots(res.current);

    // Single DB query: status + docs in one round trip
    const { data: tutorProfile } = await supabase
      .from('tutor_profiles')
      .select('verification_status, nck_certificate_url')
      .eq('id', session.user.id)
      .single();

    if (!tutorProfile || tutorProfile?.verification_status === 'pending') {
      if (!tutorProfile?.nck_certificate_url) {
        return withPrivateRobots(NextResponse.redirect(new URL('/tutor-complete-profile', req.url)));
      }
      return withPrivateRobots(NextResponse.redirect(new URL('/tutor-pending', req.url)));
    }
    if (tutorProfile?.verification_status === 'rejected') {
      await supabase.auth.signOut();
      res.current.cookies.set('nf_role', '', { path: '/', httpOnly: false, maxAge: 0 });
      return withPrivateRobots(NextResponse.redirect(new URL('/login?error=account_rejected', req.url)));
    }
    // verification_status === 'verified' → allow through
  }

  return withPrivateRobots(res.current);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)',
  ],
};
