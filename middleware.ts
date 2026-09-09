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

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: { headers: req.headers } });

  const { pathname } = req.nextUrl;

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
  if (pathname.startsWith('/api/')) return res;

  // ── Admin routes: handle before everything else ───────────────────────────
  // Redirect unauthenticated visitors to the landing page (not /login) so the
  // existence of an admin panel is not revealed. Authenticated non-admins are
  // sent to their own dashboard.
  if (pathname.startsWith('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return req.cookies.get(name)?.value; },
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

    // No session → send silently to landing page
    if (!session) {
      return withPrivateRobots(NextResponse.redirect(new URL('/', req.url)));
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    // No profile or not admin → redirect to their own space
    if (!profile || profile.role !== 'admin') {
      const dest =
        profile?.role === 'student' ? '/dashboard' :
        profile?.role === 'tutor'   ? '/tutor-dashboard' :
        '/';
      return withPrivateRobots(NextResponse.redirect(new URL(dest, req.url)));
    }

    // Confirmed admin — allow through, block search engines from indexing admin pages
    const adminRes = NextResponse.next({ request: { headers: req.headers } });
    adminRes.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return withPrivateRobots(adminRes);
  }

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

  if (isPublicRoute) return isNoindexPublicRoute ? withPrivateRobots(res) : withDeploymentRobots(res);

  // Let unknown public URLs reach Next.js so they return a real 404 instead of
  // being disguised as login redirects. Only known app areas require auth.
  const protectedRoutes = [
    '/dashboard', '/practice', '/mock-exam', '/flashcards',
    '/analytics', '/achievements', '/groups', '/revision-plan',
    '/bookings', '/settings', '/onboarding', '/tutors',
    '/tutor-dashboard', '/tutor-schedule', '/tutor-students',
    '/tutor-studio', '/tutor-earnings', '/tutor-reviews', '/tutor-profile',
    '/tutor-pending', '/tutor-complete-profile', '/tutor-community',
  ];

  if (!protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return withDeploymentRobots(res);
  }

  // ── All other protected routes — require session ──────────────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
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

  if (!session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return withPrivateRobots(NextResponse.redirect(redirectUrl));
  }

  // ── Role-based routing ────────────────────────────────────────────────────
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    return withPrivateRobots(NextResponse.redirect(new URL('/login', req.url)));
  }

  // Student routes
  const studentRoutes = [
    '/dashboard', '/practice', '/mock-exam', '/flashcards',
    '/analytics', '/achievements', '/groups', '/revision-plan',
    '/bookings', '/settings', '/onboarding', '/tutors',
  ];
  const isStudentRoute = studentRoutes.some((r) => pathname.startsWith(r));

  if (isStudentRoute && profile.role !== 'student') {
    return withPrivateRobots(NextResponse.redirect(
      new URL(
        profile.role === 'tutor'  ? '/tutor-dashboard' :
        profile.role === 'admin'  ? '/admin' :
        '/login',
        req.url
      )
    ));
  }

  // Tutor routes
  const tutorRoutes = [
    '/tutor-dashboard', '/tutor-schedule', '/tutor-students',
    '/tutor-studio', '/tutor-earnings', '/tutor-reviews', '/tutor-profile',
    '/tutor-pending', '/tutor-complete-profile', '/tutor-community',
  ];
  const isTutorRoute = tutorRoutes.some((r) => pathname.startsWith(r));

  if (isTutorRoute && profile.role !== 'tutor') {
    return withPrivateRobots(NextResponse.redirect(
      new URL(
        profile.role === 'student' ? '/dashboard' :
        profile.role === 'admin'   ? '/admin' :
        '/login',
        req.url
      )
    ));
  }

  // Tutor verification check
  if (isTutorRoute && profile.role === 'tutor') {
    // Allow pending/complete-profile pages through without further checks
    if (
      pathname === '/tutor-pending' ||
      pathname.startsWith('/tutor-complete-profile')
    ) return withPrivateRobots(res);

    // Single query — get both status and docs in one round trip
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
      return withPrivateRobots(NextResponse.redirect(new URL('/login?error=account_rejected', req.url)));
    }
    // verification_status === 'verified' → allow through
  }

  return withPrivateRobots(res);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)',
  ],
};
