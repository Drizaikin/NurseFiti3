-- Enable Row Level Security on all tables

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_notes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Student profiles policies
CREATE POLICY "Students can view own profile"
  ON student_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON student_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tutor profiles policies
CREATE POLICY "Tutors can view own profile"
  ON tutor_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Tutors can update own profile"
  ON tutor_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Students can view verified tutors"
  ON tutor_profiles FOR SELECT
  USING (verification_status = 'verified');

-- Questions policies
CREATE POLICY "Authenticated users can view approved questions"
  ON questions FOR SELECT
  USING (auth.role() = 'authenticated' AND status = 'approved');

CREATE POLICY "Contributors can view own questions"
  ON questions FOR SELECT
  USING (auth.uid() = contributor_id);

CREATE POLICY "Contributors can insert questions"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = contributor_id);

-- Student answers policies
CREATE POLICY "Students can view own answers"
  ON student_answers FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own answers"
  ON student_answers FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Mock exam results policies
CREATE POLICY "Students can view own mock exam results"
  ON mock_exam_results FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own mock exam results"
  ON mock_exam_results FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Flashcard decks policies
CREATE POLICY "Authenticated users can view flashcard decks"
  ON flashcard_decks FOR SELECT
  USING (auth.role() = 'authenticated');

-- Flashcards policies
CREATE POLICY "Authenticated users can view flashcards"
  ON flashcards FOR SELECT
  USING (auth.role() = 'authenticated');

-- Flashcard progress policies
CREATE POLICY "Students can view own flashcard progress"
  ON flashcard_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can manage own flashcard progress"
  ON flashcard_progress FOR ALL
  USING (auth.uid() = student_id);

-- Tutor availability policies
CREATE POLICY "Anyone can view active availability"
  ON tutor_availability FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Tutors can manage own availability"
  ON tutor_availability FOR ALL
  USING (auth.uid() = tutor_id);

-- Sessions policies
CREATE POLICY "Students can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = tutor_id);

CREATE POLICY "Students can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Tutors can update own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = tutor_id);

-- Session reviews policies
CREATE POLICY "Students can view reviews for their tutors"
  ON session_reviews FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Students can create reviews for own sessions"
  ON session_reviews FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Study groups policies
CREATE POLICY "Students can view open groups"
  ON study_groups FOR SELECT
  USING (privacy = 'open' OR creator_id = auth.uid());

CREATE POLICY "Students can create groups"
  ON study_groups FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own groups"
  ON study_groups FOR UPDATE
  USING (auth.uid() = creator_id);

-- Group members policies
CREATE POLICY "Students can view group members"
  ON group_members FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Students can join groups"
  ON group_members FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can leave groups"
  ON group_members FOR DELETE
  USING (auth.uid() = student_id);

-- Revision plans policies
CREATE POLICY "Students can view own revision plans"
  ON revision_plans FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Anyone with token can view shared plans"
  ON revision_plans FOR SELECT
  USING (share_token IS NOT NULL);

CREATE POLICY "Students can create own revision plans"
  ON revision_plans FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Student badges policies
CREATE POLICY "Students can view own badges"
  ON student_badges FOR SELECT
  USING (auth.uid() = student_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Study notes policies
CREATE POLICY "Authenticated users can view approved notes"
  ON study_notes FOR SELECT
  USING (auth.role() = 'authenticated' AND status = 'approved');

CREATE POLICY "Contributors can view own notes"
  ON study_notes FOR SELECT
  USING (auth.uid() = contributor_id);

CREATE POLICY "Contributors can create notes"
  ON study_notes FOR INSERT
  WITH CHECK (auth.uid() = contributor_id);
