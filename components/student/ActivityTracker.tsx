'use client';

/**
 * ActivityTracker — mounts once inside the student layout.
 * Records:
 *   1. Login event (once per session)
 *   2. Page visit on every route change
 *
 * Uses Next.js usePathname so it re-fires when the user navigates.
 * Renders nothing — purely a side-effect component.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { recordLogin, recordPageVisit } from '@/lib/activity';

// Map route pathnames to readable page slugs for admin reporting
function slugFromPathname(pathname: string): string {
  // Strip leading slash and take the last meaningful segment
  const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (segments.length === 0) return 'home';
  // Use the last segment (handles nested routes like /tutors/[id])
  return segments[segments.length - 1] ?? segments[0] ?? 'unknown';
}

export function ActivityTracker() {
  const pathname = usePathname();
  const supabase = createClient();

  // On mount: record login once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || !user) return;
      const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (cancelled || !profile) return;
      await recordLogin(user.id, profile.role);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On every pathname change: record page visit
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || !user) return;
      const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (cancelled || !profile) return;
      const slug = slugFromPathname(pathname);
      await recordPageVisit(user.id, profile.role, slug);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
