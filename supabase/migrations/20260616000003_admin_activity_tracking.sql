-- =============================================================================
-- Admin Activity Tracking — User Logins & Page Visits
-- =============================================================================
-- Tracks:
--   1. user_logins — every login event per user (role, timestamp)
--   2. page_visits — every tab/panel visit per user (page slug, role, timestamp)
--
-- Both tables are append-only event logs.
-- Admin reads via service-role only (bypasses RLS).
-- RLS is enabled; students and tutors can INSERT their own rows only.
-- =============================================================================

-- ─── Table: user_logins ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_logins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('student', 'tutor', 'admin')),
  logged_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_logins_user     ON user_logins(user_id);
CREATE INDEX IF NOT EXISTS idx_user_logins_role     ON user_logins(role);
CREATE INDEX IF NOT EXISTS idx_user_logins_date     ON user_logins(logged_in_at DESC);

-- ─── Table: page_visits ───────────────────────────────────────────────────────
-- page_slug examples: 'dashboard', 'practice', 'mock-exam', 'flashcards',
--   'analytics', 'revision-plan', 'bookings', 'tutors', 'groups',
--   'achievements', 'settings', 'community', 'tutor-dashboard',
--   'tutor-earnings', 'tutor-sessions', 'tutor-community'
CREATE TABLE IF NOT EXISTS page_visits (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('student', 'tutor', 'admin')),
  page_slug   TEXT NOT NULL,
  visited_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_visits_user     ON page_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_page_visits_role     ON page_visits(role);
CREATE INDEX IF NOT EXISTS idx_page_visits_page     ON page_visits(page_slug);
CREATE INDEX IF NOT EXISTS idx_page_visits_date     ON page_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_visits_role_page ON page_visits(role, page_slug);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
ALTER TABLE user_logins  ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits  ENABLE ROW LEVEL SECURITY;

-- Students/tutors can only insert their own rows
CREATE POLICY "insert_own_login" ON user_logins
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "insert_own_visit" ON page_visits
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- No SELECT for regular users — admin reads via service-role client only
-- (service-role bypasses RLS entirely)
