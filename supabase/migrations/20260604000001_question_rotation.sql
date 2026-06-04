-- =============================================================================
-- Migration: Question rotation support
-- Adds a denormalized `unit` column to student_answers so the app can
-- efficiently query "which question IDs has this student already answered
-- in a given unit?" without a JOIN.
-- Also adds a `paper` column for mock exam cycle tracking.
-- =============================================================================

ALTER TABLE student_answers
  ADD COLUMN IF NOT EXISTS unit TEXT,
  ADD COLUMN IF NOT EXISTS paper TEXT;

-- Index for fast per-student, per-unit rotation lookups
CREATE INDEX IF NOT EXISTS idx_answers_student_unit
  ON student_answers (student_id, unit)
  WHERE mode = 'practice';

-- Index for fast per-student, per-paper mock exam rotation lookups
CREATE INDEX IF NOT EXISTS idx_answers_student_paper
  ON student_answers (student_id, paper)
  WHERE mode = 'mock_exam';
