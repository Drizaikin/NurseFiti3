-- Add current_employer to tutor_profiles (collected during signup)
ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS current_employer TEXT;

-- Add mpesa_number to tutor_profiles (for payout)
ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS mpesa_number TEXT;

-- Add document URL columns to tutor_profiles
ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS nck_certificate_url TEXT,
  ADD COLUMN IF NOT EXISTS academic_qualification_url TEXT,
  ADD COLUMN IF NOT EXISTS national_id_url TEXT;

-- Add rejection_reason to tutor_profiles (used in tutor-pending page)
ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Add flagged_questions table (used in practice page)
CREATE TABLE IF NOT EXISTS flagged_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  question_id UUID REFERENCES questions NOT NULL,
  flagged_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_flagged_questions_student ON flagged_questions(student_id);

ALTER TABLE flagged_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage own flagged questions"
  ON flagged_questions FOR ALL
  USING (auth.uid() = student_id);

-- Add session_notes table (used in tutor/students page)
CREATE TABLE IF NOT EXISTS session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES profiles NOT NULL,
  student_id UUID REFERENCES profiles NOT NULL,
  note_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_notes_tutor ON session_notes(tutor_id);
CREATE INDEX IF NOT EXISTS idx_session_notes_student ON session_notes(student_id);

ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can manage own session notes"
  ON session_notes FOR ALL
  USING (auth.uid() = tutor_id);

-- Add units table (used by revision plan generator)
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cadre TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  nck_weight NUMERIC(5,2) DEFAULT 1.0,
  tier INTEGER CHECK (tier IN (1, 2, 3)) DEFAULT 2,
  is_examinable BOOLEAN DEFAULT TRUE,
  question_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cadre, name)
);

CREATE INDEX IF NOT EXISTS idx_units_cadre ON units(cadre);

ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view units"
  ON units FOR SELECT
  USING (auth.role() = 'authenticated');

-- Add practice_sessions table (for grouping practice answers)
CREATE TABLE IF NOT EXISTS practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  cadre TEXT NOT NULL,
  unit TEXT,
  mode TEXT CHECK (mode IN ('practice', 'mock_exam', 'weak_drill')) NOT NULL,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_practice_sessions_student ON practice_sessions(student_id);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage own practice sessions"
  ON practice_sessions FOR ALL
  USING (auth.uid() = student_id);
