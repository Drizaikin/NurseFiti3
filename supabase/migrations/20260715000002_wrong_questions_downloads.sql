-- =============================================================================
-- Migration: Wrong Questions Downloads Tracking
-- Description: Tracks which wrong questions a user has already downloaded
--              so the platform can isolate "new" wrong questions.
-- Date: 2026-07-15
-- =============================================================================

CREATE TABLE downloaded_wrong_questions (
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  downloaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- The composite primary key acts as our unique constraint.
  -- A student can only have a specific question marked as downloaded ONCE.
  PRIMARY KEY (student_id, question_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE downloaded_wrong_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Students can view their own downloaded records
CREATE POLICY "Students can view their own downloaded wrong questions"
ON downloaded_wrong_questions
FOR SELECT
USING (auth.uid() = student_id);

-- Policy: Students can insert their own downloaded records
CREATE POLICY "Students can insert their own downloaded wrong questions"
ON downloaded_wrong_questions
FOR INSERT
WITH CHECK (auth.uid() = student_id);

-- Create an index on student_id for fast lookups when generating "new" downloads
CREATE INDEX idx_downloaded_wrong_questions_student ON downloaded_wrong_questions(student_id);
