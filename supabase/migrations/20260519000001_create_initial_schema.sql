-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'tutor', 'admin')) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student_profiles table
CREATE TABLE student_profiles (
  id UUID REFERENCES profiles PRIMARY KEY,
  cadre TEXT CHECK (cadre IN ('KRCHN', 'BScN', 'Higher Diploma')) NOT NULL,
  specialty TEXT,
  institution TEXT,
  exam_date DATE NOT NULL,
  exam_cycle TEXT CHECK (exam_cycle IN ('May', 'August', 'November')) NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  last_study_date DATE,
  plan_tier TEXT CHECK (plan_tier IN ('free', 'standard', 'premium')) DEFAULT 'free',
  plan_expires_at TIMESTAMPTZ
);

-- Create tutor_profiles table
CREATE TABLE tutor_profiles (
  id UUID REFERENCES profiles PRIMARY KEY,
  nck_reg_number TEXT UNIQUE NOT NULL,
  professional_title TEXT NOT NULL,
  bio TEXT,
  years_experience INTEGER NOT NULL,
  cadres_taught TEXT[] NOT NULL,
  specialties TEXT[],
  rate_per_hour INTEGER NOT NULL,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  verification_tier TEXT CHECK (verification_tier IN ('standard', 'gold')),
  whatsapp_number TEXT,
  total_students INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  average_rating NUMERIC(3,2) DEFAULT 0,
  pass_rate NUMERIC(5,2) DEFAULT 0,
  is_accepting_bookings BOOLEAN DEFAULT TRUE,
  session_platform TEXT[] DEFAULT ARRAY['Zoom', 'Google Meet', 'WhatsApp'],
  allow_instant_booking BOOLEAN DEFAULT TRUE,
  allow_group_sessions BOOLEAN DEFAULT FALSE,
  buffer_minutes INTEGER DEFAULT 30
);

-- Create questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cadre TEXT NOT NULL,
  unit TEXT NOT NULL,
  topic TEXT NOT NULL,
  stem TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT CHECK (correct_option IN ('A','B','C','D')) NOT NULL,
  rationale TEXT NOT NULL,
  rationale_a TEXT,
  rationale_b TEXT,
  rationale_c TEXT,
  rationale_d TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  contributor_id UUID REFERENCES profiles,
  status TEXT CHECK (status IN ('pending_review', 'approved', 'rejected', 'needs_revision')) DEFAULT 'approved',
  exam_year INTEGER,
  paper TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for questions
CREATE INDEX idx_questions_cadre_unit ON questions(cadre, unit);
CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_contributor ON questions(contributor_id);

-- Create student_answers table
CREATE TABLE student_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  question_id UUID REFERENCES questions NOT NULL,
  selected_option TEXT CHECK (selected_option IN ('A','B','C','D')) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INTEGER,
  mode TEXT CHECK (mode IN ('practice', 'mock_exam', 'weak_drill')) NOT NULL,
  session_id UUID,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for student_answers
CREATE INDEX idx_answers_student ON student_answers(student_id);
CREATE INDEX idx_answers_question ON student_answers(question_id);
CREATE INDEX idx_answers_student_question ON student_answers(student_id, question_id);
CREATE INDEX idx_answers_answered_at ON student_answers(answered_at);

-- Create mock_exam_results table
CREATE TABLE mock_exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  cadre TEXT NOT NULL,
  paper TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  score_percentage NUMERIC(5,2) NOT NULL,
  time_used_minutes INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_mock_exam_student ON mock_exam_results(student_id);
CREATE INDEX idx_mock_exam_completed ON mock_exam_results(completed_at);

-- Create flashcard_decks table
CREATE TABLE flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cadre TEXT NOT NULL,
  unit TEXT NOT NULL,
  card_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create flashcards table
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID REFERENCES flashcard_decks NOT NULL,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  back_highlight TEXT,
  cadre TEXT NOT NULL,
  unit TEXT NOT NULL,
  contributor_id UUID REFERENCES profiles,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_flashcards_deck ON flashcards(deck_id);

-- Create flashcard_progress table (SRS)
CREATE TABLE flashcard_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  card_id UUID REFERENCES flashcards NOT NULL,
  ease_factor NUMERIC DEFAULT 2.5,
  interval_days INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  rating TEXT CHECK (rating IN ('again', 'hard', 'good', 'easy')),
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  last_reviewed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, card_id)
);

CREATE INDEX idx_flashcard_progress_student ON flashcard_progress(student_id);
CREATE INDEX idx_flashcard_progress_next_review ON flashcard_progress(next_review_at);

-- Create tutor_availability table
CREATE TABLE tutor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES profiles NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(tutor_id, day_of_week, start_time)
);

CREATE INDEX idx_availability_tutor ON tutor_availability(tutor_id);
CREATE INDEX idx_availability_day ON tutor_availability(day_of_week);

-- Create sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  tutor_id UUID REFERENCES profiles NOT NULL,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  cadre TEXT NOT NULL,
  topic TEXT,
  platform TEXT CHECK (platform IN ('Zoom', 'Google Meet', 'WhatsApp')) NOT NULL,
  join_link TEXT,
  student_note TEXT,
  tutor_note TEXT,
  duration_minutes INTEGER NOT NULL,
  rate_per_hour INTEGER NOT NULL,
  gross_amount INTEGER NOT NULL,
  platform_fee INTEGER NOT NULL,
  net_amount INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending_approval', 'confirmed', 'completed', 'cancelled', 'no_show')) DEFAULT 'confirmed',
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')) DEFAULT 'pending',
  mpesa_transaction_id TEXT,
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  reviewed BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_sessions_student ON sessions(student_id);
CREATE INDEX idx_sessions_tutor ON sessions(tutor_id);
CREATE INDEX idx_sessions_date ON sessions(session_date);
CREATE INDEX idx_sessions_status ON sessions(status);

-- Create session_reviews table
CREATE TABLE session_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions UNIQUE NOT NULL,
  student_id UUID REFERENCES profiles NOT NULL,
  tutor_id UUID REFERENCES profiles NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  review_text TEXT,
  keywords TEXT[],
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_tutor ON session_reviews(tutor_id);
CREATE INDEX idx_reviews_session ON session_reviews(session_id);

-- Create study_groups table
CREATE TABLE study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cadre TEXT NOT NULL,
  exam_cycle TEXT NOT NULL,
  privacy TEXT CHECK (privacy IN ('open', 'invite_only')) DEFAULT 'open',
  creator_id UUID REFERENCES profiles NOT NULL,
  member_count INTEGER DEFAULT 1,
  max_members INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_groups_cadre ON study_groups(cadre);
CREATE INDEX idx_groups_creator ON study_groups(creator_id);

-- Create group_members table
CREATE TABLE group_members (
  group_id UUID REFERENCES study_groups NOT NULL,
  student_id UUID REFERENCES profiles NOT NULL,
  role TEXT CHECK (role IN ('member', 'admin')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (group_id, student_id)
);

CREATE INDEX idx_group_members_student ON group_members(student_id);

-- Create revision_plans table
CREATE TABLE revision_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  cadre TEXT NOT NULL,
  exam_date DATE NOT NULL,
  days_available INTEGER NOT NULL,
  study_hours_weekday INTEGER NOT NULL,
  study_hours_weekend INTEGER NOT NULL,
  work_school_status TEXT NOT NULL,
  plan_html TEXT NOT NULL,
  plan_data JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  payment_ref TEXT,
  share_token TEXT UNIQUE
);

CREATE INDEX idx_revision_plans_student ON revision_plans(student_id);
CREATE INDEX idx_revision_plans_share_token ON revision_plans(share_token);

-- Create student_badges table
CREATE TABLE student_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, badge_id)
);

CREATE INDEX idx_badges_student ON student_badges(student_id);

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_created ON notifications(created_at);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles NOT NULL,
  type TEXT CHECK (type IN ('plan_subscription', 'revision_plan', 'session_booking')) NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'KES',
  mpesa_phone TEXT NOT NULL,
  mpesa_receipt TEXT,
  mpesa_checkout_request_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  reference_id UUID,
  initiated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_checkout_request ON payments(mpesa_checkout_request_id);

-- Create study_notes table (tutor contributions)
CREATE TABLE study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES profiles NOT NULL,
  cadre TEXT NOT NULL,
  unit TEXT NOT NULL,
  title TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending_review', 'approved', 'needs_revision', 'rejected')) DEFAULT 'pending_review',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_notes_contributor ON study_notes(contributor_id);
CREATE INDEX idx_study_notes_status ON study_notes(status);
CREATE INDEX idx_study_notes_cadre_unit ON study_notes(cadre, unit);
