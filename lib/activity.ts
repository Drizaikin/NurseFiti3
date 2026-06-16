/**
 * Activity tracking — fire-and-forget helpers.
 * Called client-side to record login events and page visits.
 * Uses the regular Supabase client; RLS allows users to insert their own rows.
 * Failures are silently ignored so tracking never breaks the UI.
 */

import { createClient } from '@/lib/supabase/client';

let loginRecordedThisSession = false;

/**
 * Record a login event for the current user.
 * Safe to call multiple times — only records once per browser session
 * by using a module-level flag.
 */
export async function recordLogin(userId: string, role: string): Promise<void> {
  if (loginRecordedThisSession) return;
  loginRecordedThisSession = true;
  try {
    const supabase = createClient();
    await (supabase as any)
      .from('user_logins')
      .insert({ user_id: userId, role });
  } catch {
    // Silently ignore — tracking must never break the app
  }
}

/**
 * Record a page visit for the current user.
 * @param userId  - authenticated user's UUID
 * @param role    - 'student' | 'tutor' | 'admin'
 * @param pageSlug - the page identifier, e.g. 'dashboard', 'practice', 'mock-exam'
 */
export async function recordPageVisit(
  userId: string,
  role: string,
  pageSlug: string
): Promise<void> {
  try {
    const supabase = createClient();
    await (supabase as any)
      .from('page_visits')
      .insert({ user_id: userId, role, page_slug: pageSlug });
  } catch {
    // Silently ignore
  }
}
