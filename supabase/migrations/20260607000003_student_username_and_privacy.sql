-- =============================================================================
-- Migration: Student username, display name, and privacy settings
-- =============================================================================
-- Adds three new columns to student_profiles:
--   username        — unique handle chosen by student, shown in community
--   display_name    — what other students see instead of full_name
--   hide_real_name  — if true, full_name is hidden from other students
-- =============================================================================

-- ── Add columns ───────────────────────────────────────────────────────────────
ALTER TABLE student_profiles
  ADD COLUMN IF NOT EXISTS username        TEXT,
  ADD COLUMN IF NOT EXISTS display_name   TEXT,
  ADD COLUMN IF NOT EXISTS hide_real_name BOOLEAN DEFAULT FALSE;

-- ── Unique constraint on username (case-insensitive) ─────────────────────────
-- Only apply when username is not null
CREATE UNIQUE INDEX IF NOT EXISTS idx_student_profiles_username_unique
  ON student_profiles (LOWER(username))
  WHERE username IS NOT NULL;

-- ── Tour version column (needed for Phase C — add here to avoid another migration) ─
ALTER TABLE student_profiles
  ADD COLUMN IF NOT EXISTS tour_version INTEGER DEFAULT 0;

ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS tour_version INTEGER DEFAULT 0;

-- ── Comment ───────────────────────────────────────────────────────────────────
COMMENT ON COLUMN student_profiles.username        IS 'Student-chosen unique handle (e.g. @nurseamina). Used in community display.';
COMMENT ON COLUMN student_profiles.display_name   IS 'Name shown to other students. Defaults to full_name if not set.';
COMMENT ON COLUMN student_profiles.hide_real_name IS 'If true, full_name is hidden from fellow students; display_name or username shown instead.';
COMMENT ON COLUMN student_profiles.tour_version   IS 'Tracks which feature tour version this student has seen. Increment CURRENT_TOUR_VERSION to re-trigger tour for new features.';
COMMENT ON COLUMN tutor_profiles.tour_version     IS 'Same as student_profiles.tour_version for tutors.';
