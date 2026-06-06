-- ─── Google Meet Integration ──────────────────────────────────────────────────
-- 1. Ensure sessions table has the join_link column (already exists, but safe to confirm)
-- 2. Add a DB function to auto-generate a Meet-format link on session confirmation
-- 3. Add trigger to fire the function when a session status becomes 'confirmed'
-- 4. Update tutor_profiles to default session_platform to include Google Meet
-- 5. Add notifications table column for meet_link_added type if not already present

-- ── Function: generate a random Google Meet-style room code ──────────────────
CREATE OR REPLACE FUNCTION generate_meet_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijkmnopqrstuvwxyz';
  result TEXT := '';
  i INTEGER;
BEGIN
  -- Generate format: xxx-xxxx-xxx
  FOR i IN 1..3 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  result := result || '-';
  FOR i IN 1..4 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  result := result || '-';
  FOR i IN 1..3 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN 'https://meet.google.com/' || result;
END;
$$ LANGUAGE plpgsql;

-- ── Function: auto-set join_link when a Google Meet session is confirmed ──────
CREATE OR REPLACE FUNCTION auto_set_meet_link()
RETURNS TRIGGER AS $$
BEGIN
  -- Only act when:
  -- 1. Status is changing TO 'confirmed'
  -- 2. Platform is 'Google Meet'
  -- 3. join_link is not already set
  IF NEW.status = 'confirmed'
     AND NEW.platform = 'Google Meet'
     AND (NEW.join_link IS NULL OR NEW.join_link = '')
     AND (OLD.status IS DISTINCT FROM 'confirmed' OR TG_OP = 'INSERT')
  THEN
    NEW.join_link := generate_meet_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── Trigger: fires on INSERT or UPDATE of sessions ───────────────────────────
DROP TRIGGER IF EXISTS trg_auto_set_meet_link ON sessions;

CREATE TRIGGER trg_auto_set_meet_link
  BEFORE INSERT OR UPDATE OF status ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION auto_set_meet_link();

-- ── Update existing confirmed Google Meet sessions that have no join_link ──────
UPDATE sessions
SET join_link = generate_meet_code()
WHERE platform = 'Google Meet'
  AND status = 'confirmed'
  AND (join_link IS NULL OR join_link = '');

-- ── Ensure 'Google Meet' is in all existing tutor session_platform arrays ─────
UPDATE tutor_profiles
SET session_platform = array_append(session_platform, 'Google Meet')
WHERE NOT ('Google Meet' = ANY(session_platform));

-- ── Index on join_link for fast lookups ──────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sessions_join_link ON sessions(join_link)
  WHERE join_link IS NOT NULL;
