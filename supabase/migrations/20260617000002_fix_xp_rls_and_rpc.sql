-- =============================================================================
-- Migration: Fix XP updates, student_answers UPDATE RLS, community_messages
--            author UPDATE policy, and missing result_id back-link policy.
-- =============================================================================

-- ── 1. student_answers: add UPDATE policy so mock-exam result_id back-link works
-- Without this, the back-link update (setting result_id on answers) silently
-- fails due to RLS, and so does any future answer correction.
DROP POLICY IF EXISTS "Students can update own answers" ON student_answers;
CREATE POLICY "Students can update own answers"
  ON student_answers FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- ── 2. community_messages: authors need UPDATE to soft-delete their own posts
-- The existing service_role policy covers admin deletions, but the student
-- deletePost() call uses the anon/authenticated client and hits RLS.
DROP POLICY IF EXISTS "Authors can update own messages" ON community_messages;
CREATE POLICY "Authors can update own messages"
  ON community_messages FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- ── 3. SECURITY DEFINER RPC: update_student_xp
-- Centralises all XP + streak + level updates into one atomic DB function so:
--   a) No RLS issues (SECURITY DEFINER runs as the function owner)
--   b) XP is always read and incremented server-side (no stale-state race)
--   c) Streak logic is consistent across mock-exam, practice, flashcards
CREATE OR REPLACE FUNCTION update_student_xp(
  p_student_id UUID,
  p_xp_delta   INTEGER   -- XP to add (e.g. 8 for a correct practice answer, 100 for mock exam)
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_xp           INTEGER;
  v_streak       INTEGER;
  v_last_date    DATE;
  v_today        DATE;
  v_new_streak   INTEGER;
  v_new_xp       INTEGER;
  v_new_level    INTEGER;
BEGIN
  -- Read current values atomically
  SELECT xp, streak_count, last_study_date
    INTO v_xp, v_streak, v_last_date
    FROM student_profiles
   WHERE id = p_student_id
     FOR UPDATE;          -- row-level lock prevents concurrent races

  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Current date in UTC (Supabase DB timezone).
  -- Using CURRENT_DATE avoids any timezone conversion issues
  -- since all timestamps in the DB are stored in UTC.
  v_today := CURRENT_DATE;

  -- Streak logic
  IF v_last_date IS NULL THEN
    v_new_streak := 1;
  ELSIF v_today - v_last_date = 1 THEN
    v_new_streak := v_streak + 1;   -- studied yesterday
  ELSIF v_today - v_last_date > 1 THEN
    v_new_streak := 1;              -- gap — reset
  ELSE
    v_new_streak := v_streak;       -- same day — keep
  END IF;

  v_new_xp    := COALESCE(v_xp, 0) + p_xp_delta;
  v_new_level := FLOOR(v_new_xp::float / 100)::int + 1;

  UPDATE student_profiles
     SET xp              = v_new_xp,
         level           = v_new_level,
         streak_count    = v_new_streak,
         last_study_date = v_today
   WHERE id = p_student_id;
END;
$$;

GRANT EXECUTE ON FUNCTION update_student_xp(UUID, INTEGER) TO authenticated;
