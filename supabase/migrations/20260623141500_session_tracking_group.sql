-- =============================================================================
-- Migration: Session Live Tracking, Group Bookings & Completion Rules
-- =============================================================================

-- 1. Add new columns to `sessions` table for live tracking & recording
ALTER TABLE sessions
ADD COLUMN IF NOT EXISTS actual_start_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS actual_end_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS actual_duration_seconds INTEGER,
ADD COLUMN IF NOT EXISTS recording_url TEXT;

-- 2. Modify completion metric tracking
-- Previously, there was no strict trigger tied to session 'status' changes
-- We will create a trigger that ONLY increments tutor total_sessions and total_students
-- when a session's status is changed to 'completed'.

CREATE OR REPLACE FUNCTION handle_session_completion()
RETURNS TRIGGER AS $$
DECLARE
  v_student_count INTEGER;
BEGIN
  -- Check if status is transitioning to 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed' OR TG_OP = 'INSERT') THEN
    -- Increment total_sessions for the tutor
    UPDATE tutor_profiles
    SET total_sessions = total_sessions + 1
    WHERE id = NEW.tutor_id;

    -- Check if this is a unique student for this tutor
    SELECT COUNT(*)
    INTO v_student_count
    FROM sessions
    WHERE tutor_id = NEW.tutor_id AND student_id = NEW.student_id AND status = 'completed';

    -- If this is the FIRST completed session for this specific student-tutor pair
    IF v_student_count = 1 THEN
      UPDATE tutor_profiles
      SET total_students = total_students + 1
      WHERE id = NEW.tutor_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS trg_session_completion ON sessions;
CREATE TRIGGER trg_session_completion
  AFTER INSERT OR UPDATE OF status ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION handle_session_completion();

-- 3. Modify `create_booking_atomic` to support group sessions
-- We will adjust the check for `v_existing_session` to bypass the exact slot overlap block
-- IF `allow_group_sessions` is true.

CREATE OR REPLACE FUNCTION create_booking_atomic(
  p_tutor_id          UUID,
  p_student_id        UUID,
  p_session_date      DATE,
  p_start_time        TIME,
  p_end_time          TIME,
  p_cadre             TEXT,
  p_topic             TEXT,
  p_platform          TEXT,
  p_duration_minutes  INTEGER,
  p_rate_per_hour     INTEGER,
  p_proposed_amount   INTEGER DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_session_id            UUID;
  v_gross_amount          INTEGER;
  v_platform_fee          INTEGER;
  v_net_amount            INTEGER;
  v_existing_session      UUID;
  v_pricing_status        TEXT;
  v_allow_negotiation     BOOLEAN;
  v_min_negotiated_rate   INTEGER;
  v_allow_group_sessions  BOOLEAN;
  v_existing_students     INTEGER;
BEGIN
  -- Fetch tutor's negotiation and group session settings
  SELECT allow_price_negotiation, min_negotiated_rate, allow_group_sessions
    INTO v_allow_negotiation, v_min_negotiated_rate, v_allow_group_sessions
    FROM tutor_profiles
   WHERE id = p_tutor_id;

  -- Lock the tutor's availability row to prevent concurrent bookings on the schedule configuration
  PERFORM * FROM tutor_availability
  WHERE tutor_id = p_tutor_id
    AND day_of_week = EXTRACT(DOW FROM p_session_date)
    AND start_time <= p_start_time
    AND end_time >= p_end_time
    AND is_active = TRUE
  FOR UPDATE;

  -- Check if slot is already booked
  SELECT COUNT(id) INTO v_existing_students
  FROM sessions
  WHERE tutor_id = p_tutor_id
    AND session_date = p_session_date
    AND start_time = p_start_time
    AND status IN ('confirmed', 'pending_approval');

  -- If slot is booked and group sessions are not allowed, reject.
  IF v_existing_students > 0 AND NOT v_allow_group_sessions THEN
    RAISE EXCEPTION 'slot_already_booked';
  END IF;

  -- Optional: Set a hard limit for group sessions (e.g. max 50 students)
  IF v_existing_students >= 50 THEN
    RAISE EXCEPTION 'slot_already_booked';
  END IF;

  -- Calculate standard amounts (always stored for reference)
  -- NurseFiti takes 23% of the gross session amount; tutors receive 77%.
  v_gross_amount := (p_rate_per_hour * p_duration_minutes) / 60;
  v_platform_fee := ROUND(v_gross_amount * 0.23);
  v_net_amount   := v_gross_amount - v_platform_fee;

  -- Validate proposed amount against tutor settings
  IF p_proposed_amount IS NOT NULL THEN
    IF NOT v_allow_negotiation THEN
      RAISE EXCEPTION 'negotiation_not_allowed';
    END IF;
    IF p_proposed_amount < v_min_negotiated_rate THEN
      RAISE EXCEPTION 'proposed_amount_too_low';
    END IF;
    v_pricing_status := 'proposed';
  ELSE
    v_pricing_status := 'standard';
  END IF;

  -- Create session
  INSERT INTO sessions (
    student_id, tutor_id, session_date, start_time, end_time,
    cadre, topic, platform, duration_minutes, rate_per_hour,
    gross_amount, platform_fee, net_amount, status, payment_status,
    proposed_amount, pricing_status
  ) VALUES (
    p_student_id, p_tutor_id, p_session_date, p_start_time, p_end_time,
    p_cadre, p_topic, p_platform, p_duration_minutes, p_rate_per_hour,
    v_gross_amount, v_platform_fee, v_net_amount, 'confirmed', 'pending',
    p_proposed_amount, v_pricing_status
  ) RETURNING id INTO v_session_id;

  RETURN v_session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
