-- Phase 4: Booking System — add missing columns for full booking flow

-- Add join_link to sessions (video call URL provided by tutor)
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS join_link TEXT;

-- Add reviewed column if not present
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS reviewed BOOLEAN DEFAULT FALSE;

-- Add student_note and tutor_note if not present
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS student_note TEXT,
  ADD COLUMN IF NOT EXISTS tutor_note TEXT;

-- session_reviews table (post-session ratings)
CREATE TABLE IF NOT EXISTS session_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions NOT NULL UNIQUE,
  student_id UUID REFERENCES profiles NOT NULL,
  tutor_id UUID REFERENCES profiles NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  review_text TEXT,
  keywords TEXT[],
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_session ON session_reviews(session_id);
CREATE INDEX IF NOT EXISTS idx_reviews_tutor ON session_reviews(tutor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_student ON session_reviews(student_id);

ALTER TABLE session_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can insert own reviews"
  ON session_reviews FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view own reviews"
  ON session_reviews FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view their reviews"
  ON session_reviews FOR SELECT
  USING (auth.uid() = tutor_id);

CREATE POLICY "Published reviews visible to authenticated users"
  ON session_reviews FOR SELECT
  USING (is_published = TRUE AND auth.role() = 'authenticated');

-- Ensure tutor_profiles has a public-facing policy for the directory
-- (may already exist from initial migration, using IF NOT EXISTS pattern)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'tutor_profiles'
      AND policyname = 'Authenticated users can view verified tutors'
  ) THEN
    CREATE POLICY "Authenticated users can view verified tutors"
      ON tutor_profiles FOR SELECT
      USING (verification_status = 'verified' AND auth.role() = 'authenticated');
  END IF;
END $$;

-- Index for tutor directory queries
CREATE INDEX IF NOT EXISTS idx_tutor_profiles_verified ON tutor_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_tutor_profiles_rating ON tutor_profiles(average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_tutor_profiles_rate ON tutor_profiles(rate_per_hour);
