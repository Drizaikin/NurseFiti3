'use client';

/**
 * ActivityTracker — mounts once inside the student/tutor layout.
 * Records:
 *   1. Login event (once per session)
 *   2. Page visit on every route change
 *
 * Uses Next.js usePathname so it re-fires when the user navigates.
 * Renders nothing — purely a side-effect component.
 *
 * Performance: user id + role are resolved once and cached in module scope
 * so subsequent page navigations do NOT re-query the profiles table.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { recordLogin, recordPageVisit } from '@/lib/activity';

// Map route pathnames to readable page slugs for admin reporting
function slugFromPathname(pathname: string): string {
  const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (segments.length === 0) return 'home';
  return segments[segments.length - 1] ?? segments[0] ?? 'unknown';
}

// Module-level cache: resolved once per browser session, shared across all
// ActivityTracker instances (student + tutor layouts never coexist).
let cachedUserId: string | null = null;
let cachedRole: string | null = null;

async function resolveUserIdentity(): Promise<{ userId: string; role: string } | null> {
  try {
    const supabase = createClient();
    // getSession() reads from the local cookie — no network call
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // No active session — clear any stale cache
      cachedUserId = null;
      cachedRole = null;
      return null;
    }
    // Return cache only if it belongs to the current session's user
    if (cachedUserId === session.user.id && cachedRole) {
      return { userId: cachedUserId, role: cachedRole };
    }
    // Cache miss or different user — fetch from DB
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    if (!profile) return null;
    cachedUserId = session.user.id;
    cachedRole = profile.role;
    return { userId: session.user.id, role: profile.role };
  } catch {
    return null;
  }
}

/** Clear the module-level cache on sign-out so a subsequent login works correctly. */
export function clearActivityCache(): void {
  cachedUserId = null;
  cachedRole = null;
}

export function ActivityTracker() {
  const pathname = usePathname();
  // Track whether login has been recorded in this component's lifetime
  const loginRecorded = useRef(false);

  // On mount: record login once (fire-and-forget, non-blocking)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (loginRecorded.current) return;
      const identity = await resolveUserIdentity();
      if (cancelled || !identity) return;
      loginRecorded.current = true;
      await recordLogin(identity.userId, identity.role);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On every pathname change: record page visit (fire-and-forget, non-blocking)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const identity = await resolveUserIdentity();
      if (cancelled || !identity) return;
      await recordPageVisit(identity.userId, identity.role, slugFromPathname(pathname));
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
