-- =============================================================================
-- Migration: RLS policies for tutor_profiles
-- Tutors need to be able to SELECT and UPDATE their own row.
-- =============================================================================

ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;

-- Tutors can read their own profile
DROP POLICY IF EXISTS "Tutors can view own profile" ON tutor_profiles;
CREATE POLICY "Tutors can view own profile"
  ON tutor_profiles FOR SELECT
  USING (auth.uid() = id);

-- Tutors can update their own profile
DROP POLICY IF EXISTS "Tutors can update own profile" ON tutor_profiles;
CREATE POLICY "Tutors can update own profile"
  ON tutor_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Students/public can view verified tutor profiles (for the tutor directory)
DROP POLICY IF EXISTS "Public can view verified tutors" ON tutor_profiles;
CREATE POLICY "Public can view verified tutors"
  ON tutor_profiles FOR SELECT
  USING (verification_status = 'verified');

-- Service role (admin API) bypasses RLS
DROP POLICY IF EXISTS "Service role manages tutor profiles" ON tutor_profiles;
CREATE POLICY "Service role manages tutor profiles"
  ON tutor_profiles FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================================================
-- Also relax the NOT NULL constraints that block partial profile completion
-- (tutor signs up with 2 steps, completes profile later)
-- =============================================================================

-- cadres_taught was NOT NULL — make it nullable with empty array default
ALTER TABLE tutor_profiles
  ALTER COLUMN cadres_taught DROP NOT NULL,
  ALTER COLUMN cadres_taught SET DEFAULT '{}';

-- rate_per_hour was NOT NULL — make it nullable
ALTER TABLE tutor_profiles
  ALTER COLUMN rate_per_hour DROP NOT NULL;
