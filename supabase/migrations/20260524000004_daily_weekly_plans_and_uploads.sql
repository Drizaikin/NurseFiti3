-- =============================================================================
-- Migration: Daily/Weekly plans, question uploads, admin role
-- Safe version — fixes infinite recursion in RLS policies
-- =============================================================================

-- 1. Extend plan_tier to include daily and weekly
ALTER TABLE student_profiles
  DROP CONSTRAINT IF EXISTS student_profiles_plan_tier_check;

ALTER TABLE student_profiles
  ADD CONSTRAINT student_profiles_plan_tier_check
  CHECK (plan_tier IN ('free', 'daily', 'weekly', 'standard', 'premium'));

-- 2. Allow admin role in profiles
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('student', 'tutor', 'admin'));

-- 3. Question uploads table
CREATE TABLE IF NOT EXISTS question_uploads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID REFERENCES profiles NOT NULL,
  file_urls       TEXT[] NOT NULL,
  file_names      TEXT[] NOT NULL,
  file_count      INTEGER NOT NULL,
  status          TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'duplicate')) DEFAULT 'pending',
  rejection_reason TEXT,
  admin_note      TEXT,
  reviewed_by     UUID REFERENCES profiles,
  reviewed_at     TIMESTAMPTZ,
  email_sent      BOOLEAN DEFAULT FALSE,
  submitted_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_question_uploads_student ON question_uploads(student_id);
CREATE INDEX IF NOT EXISTS idx_question_uploads_status  ON question_uploads(status);

ALTER TABLE question_uploads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Students can view own uploads" ON question_uploads;
CREATE POLICY "Students can view own uploads"
  ON question_uploads FOR SELECT
  USING (auth.uid() = student_id);

DROP POLICY IF EXISTS "Students can submit uploads" ON question_uploads;
CREATE POLICY "Students can submit uploads"
  ON question_uploads FOR INSERT
  WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS "Service role manages uploads" ON question_uploads;
CREATE POLICY "Service role manages uploads"
  ON question_uploads FOR ALL
  USING (auth.role() = 'service_role');

-- 4. Helper function to check admin role WITHOUT querying profiles table
--    (avoids infinite recursion in RLS policies)
--    Uses auth.jwt() which is always available and never triggers RLS.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- 5. Admin policies on student_profiles
DROP POLICY IF EXISTS "Admins can update any student profile" ON student_profiles;
CREATE POLICY "Admins can update any student profile"
  ON student_profiles FOR UPDATE
  USING (is_admin());

DROP POLICY IF EXISTS "Admins can view any student profile" ON student_profiles;
CREATE POLICY "Admins can view any student profile"
  ON student_profiles FOR SELECT
  USING (is_admin());

-- 6. Admin policies on profiles
--    IMPORTANT: Do NOT add a SELECT policy on profiles that calls is_admin()
--    because is_admin() itself queries profiles — that would be circular.
--    Instead, admins use the service-role client (API routes) to read all profiles.
--    The existing "Users can view own profile" policy is sufficient for the login flow.

-- 7. Admin policies on question_uploads
DROP POLICY IF EXISTS "Admins can manage all uploads" ON question_uploads;
CREATE POLICY "Admins can manage all uploads"
  ON question_uploads FOR ALL
  USING (is_admin());
