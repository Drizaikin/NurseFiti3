-- =============================================================================
-- APP FEEDBACK / COMPLAINTS / REVIEWS TABLE
-- Idempotent version — safe to run even if partially applied already
-- =============================================================================

CREATE TABLE IF NOT EXISTS app_feedback (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES profiles NOT NULL,
  user_role       TEXT CHECK (user_role IN ('student', 'tutor')) NOT NULL,
  display_name    TEXT NOT NULL,
  cadre           TEXT,
  category        TEXT CHECK (category IN (
                    'general', 'complaint', 'suggestion', 'bug_report', 'praise'
                  )) NOT NULL DEFAULT 'general',
  rating          INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  message         TEXT NOT NULL CHECK (char_length(message) BETWEEN 10 AND 1000),
  contact_channel TEXT CHECK (contact_channel IN ('email', 'whatsapp', 'none')) DEFAULT 'none',
  is_approved     BOOLEAN DEFAULT TRUE,
  is_pinned       BOOLEAN DEFAULT FALSE,
  helpful_count   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_app_feedback_approved  ON app_feedback(is_approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_app_feedback_user      ON app_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_app_feedback_category  ON app_feedback(category);
CREATE INDEX IF NOT EXISTS idx_app_feedback_rating    ON app_feedback(rating);

ALTER TABLE app_feedback ENABLE ROW LEVEL SECURITY;

-- Drop policies before recreating so re-runs don't error
DROP POLICY IF EXISTS "Public can view approved feedback"    ON app_feedback;
DROP POLICY IF EXISTS "Authenticated users can submit feedback" ON app_feedback;
DROP POLICY IF EXISTS "Users can update own feedback"        ON app_feedback;
DROP POLICY IF EXISTS "Users can delete own feedback"        ON app_feedback;

CREATE POLICY "Public can view approved feedback"
  ON app_feedback FOR SELECT
  USING (is_approved = TRUE);

CREATE POLICY "Authenticated users can submit feedback"
  ON app_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback"
  ON app_feedback FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own feedback"
  ON app_feedback FOR DELETE
  USING (auth.uid() = user_id);

-- Helpful votes table
CREATE TABLE IF NOT EXISTS feedback_helpful (
  feedback_id UUID REFERENCES app_feedback ON DELETE CASCADE NOT NULL,
  user_id     UUID REFERENCES profiles NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (feedback_id, user_id)
);

ALTER TABLE feedback_helpful ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can mark helpful" ON feedback_helpful;
DROP POLICY IF EXISTS "Public can view helpful counts"       ON feedback_helpful;

CREATE POLICY "Authenticated users can mark helpful"
  ON feedback_helpful FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view helpful counts"
  ON feedback_helpful FOR SELECT
  USING (TRUE);
