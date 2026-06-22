-- =============================================================================
-- Migration: Fix create_booking_atomic ambiguity
-- =============================================================================
-- This migration drops conflicting versions of create_booking_atomic and
-- recreates the definitive version which supports the custom pricing proposal
-- (11 arguments) while also utilizing the 23% platform fee structure.
-- =============================================================================

-- Drop the old 10-argument function
DROP FUNCTION IF EXISTS create_booking_atomic(UUID,UUID,DATE,TIME,TIME,TEXT,TEXT,TEXT,INTEGER,INTEGER);

-- Drop the old 11-argument function just to be safe before recreating
DROP FUNCTION IF EXISTS create_booking_atomic(UUID,UUID,DATE,TIME,TIME,TEXT,TEXT,TEXT,INTEGER,INTEGER,INTEGER);

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
BEGIN
  -- Fetch tutor's negotiation settings
  SELECT allow_price_negotiation, min_negotiated_rate
    INTO v_allow_negotiation, v_min_negotiated_rate
    FROM tutor_profiles
   WHERE id = p_tutor_id;

  -- Lock the tutor's availability row to prevent concurrent bookings
  PERFORM * FROM tutor_availability
  WHERE tutor_id = p_tutor_id
    AND day_of_week = EXTRACT(DOW FROM p_session_date)
    AND start_time <= p_start_time
    AND end_time >= p_end_time
    AND is_active = TRUE
  FOR UPDATE;

  -- Check if slot is already booked
  SELECT id INTO v_existing_session
  FROM sessions
  WHERE tutor_id = p_tutor_id
    AND session_date = p_session_date
    AND start_time = p_start_time
    AND status IN ('confirmed', 'pending_approval');

  IF v_existing_session IS NOT NULL THEN
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

GRANT EXECUTE ON FUNCTION create_booking_atomic(UUID,UUID,DATE,TIME,TIME,TEXT,TEXT,TEXT,INTEGER,INTEGER,INTEGER) TO authenticated;
