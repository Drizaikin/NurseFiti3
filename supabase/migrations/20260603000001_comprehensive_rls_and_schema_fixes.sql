-- =============================================================================
-- Migration: Comprehensive RLS policies + schema fixes
-- Fixes all data-flow bugs identified across the full platform audit.
-- =============================================================================

-- ── 1. student_profiles: missing INSERT policy ────────────────────────────────
-- The signup route uses the admin client so this is not strictly needed there,
-- but guards against any direct-client onboarding paths.
DROP POLICY IF EXISTS "Students can insert own profile" ON student_profiles;
CREATE POLICY "Students can insert own profile"
  ON student_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── 2. session_reviews: missing policies ─────────────────────────────────────
-- Students need to INSERT reviews and the tutor needs to SELECT them.
DROP POLICY IF EXISTS "Students can insert reviews" ON session_reviews;
CREATE POLICY "Students can insert reviews"
  ON session_reviews FOR INSERT
  WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Anyone can view published reviews" ON session_reviews;
CREATE POLICY "Anyone can view published reviews"
  ON session_reviews FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Students can view own reviews" ON session_reviews;
CREATE POLICY "Students can view own reviews"
  ON session_reviews FOR SELECT
  USING (auth.uid() = student_id);

-- ── 3. sessions: students need to UPDATE their own sessions (cancel) ──────────
DROP POLICY IF EXISTS "Students can update own sessions" ON sessions;
CREATE POLICY "Students can update own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- ── 4. sessions: students need to INSERT (book a session) ────────────────────
-- Already exists as "Students can create sessions" in 20260519000002_enable_rls.sql
-- but add IF NOT EXISTS guard via DROP/CREATE pattern.
DROP POLICY IF EXISTS "Students can create sessions" ON sessions;
CREATE POLICY "Students can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- ── 5. tutor_availability: INSERT policy needed when adding slots ─────────────
-- Already covered by "Tutors can manage own availability" FOR ALL,
-- but confirm it exists.
DROP POLICY IF EXISTS "Tutors can manage own availability" ON tutor_availability;
CREATE POLICY "Tutors can manage own availability"
  ON tutor_availability FOR ALL
  USING (auth.uid() = tutor_id)
  WITH CHECK (auth.uid() = tutor_id);

-- ── 6. notifications: INSERT policy for admin/service role ───────────────────
-- Admin verify-tutor route uses admin client (bypasses RLS) so insert works.
-- Add service role policy as belt-and-suspenders.
DROP POLICY IF EXISTS "Service role manages notifications" ON notifications;
CREATE POLICY "Service role manages notifications"
  ON notifications FOR ALL
  USING (auth.role() = 'service_role');

-- ── 7. profiles: all authenticated users can read any profile ────────────────
-- This is needed because:
--   • Tutor bookings page fetches reviewer profiles
--   • Student bookings page fetches tutor profiles
--   • Admin data route uses admin client (already bypasses RLS)
-- The existing policy only allows users to read THEIR OWN profile,
-- causing 406 errors when fetching other users' names/avatars.
DROP POLICY IF EXISTS "Authenticated users can view any profile" ON profiles;
CREATE POLICY "Authenticated users can view any profile"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');

-- ── 8. student_profiles: authenticated users can read others' (for tutors) ───
-- Tutors reading student profiles (cadre, xp, level) for student detail panel.
DROP POLICY IF EXISTS "Authenticated users can view student profiles" ON student_profiles;
CREATE POLICY "Authenticated users can view student profiles"
  ON student_profiles FOR SELECT
  USING (auth.role() = 'authenticated');

-- ── 9. tutor_profiles: make sure the "Tutors can update own profile" policy ──
-- was not shadowed by the new "Tutors can view own profile" in the previous
-- migration — re-declare cleanly.
DROP POLICY IF EXISTS "Tutors can update own profile" ON tutor_profiles;
CREATE POLICY "Tutors can update own profile"
  ON tutor_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── 10. Add whatsapp_number column to tutor_profiles if missing ───────────────
ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- ── 11. Add specialties column to tutor_profiles if missing ──────────────────
ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS specialties TEXT[] DEFAULT '{}';

-- ── 12. Ensure plan_tier default is set correctly ─────────────────────────────
ALTER TABLE student_profiles
  ALTER COLUMN plan_tier SET DEFAULT 'free';

-- ── 13. payments: INSERT policy so the initialize route (admin client) works ──
-- The intasend/initialize route already uses the admin client, so INSERT is fine.
-- But add a service_role policy for completeness.
DROP POLICY IF EXISTS "Service role manages payments" ON payments;
CREATE POLICY "Service role manages payments"
  ON payments FOR ALL
  USING (auth.role() = 'service_role');
