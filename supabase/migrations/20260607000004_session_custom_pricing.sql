-- =============================================================================
-- Migration: Session custom pricing (student rate negotiation)
-- =============================================================================
-- Students may propose a custom amount (min KSh 800) when booking.
-- Tutors can accept or counter the proposed amount on their schedule page.
-- The final agreed amount becomes the payment amount.
-- =============================================================================

-- Add pricing negotiation columns to sessions
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS proposed_amount  INTEGER,          -- student's proposed amount (KSh)
  ADD COLUMN IF NOT EXISTS agreed_amount    INTEGER,          -- tutor's accepted/countered amount (KSh)
  ADD COLUMN IF NOT EXISTS pricing_status   TEXT
    CHECK (pricing_status IN ('standard', 'proposed', 'agreed', 'declined'))
    DEFAULT 'standard';

COMMENT ON COLUMN sessions.proposed_amount IS 'Amount proposed by student if different from standard rate. NULL means standard rate.';
COMMENT ON COLUMN sessions.agreed_amount   IS 'Final amount agreed by tutor. NULL until tutor responds. Falls back to gross_amount if tutor accepts standard.';
COMMENT ON COLUMN sessions.pricing_status  IS 'standard=no negotiation, proposed=student proposed custom, agreed=tutor agreed/countered, declined=tutor declined proposal (standard rate applies)';

-- Update create_booking_atomic to accept an optional proposed_amount
-- When p_proposed_amount IS NOT NULL, the session is created with pricing_status='proposed'
-- and the gross_amount is still calculated from the standard rate for record-keeping.
-- The actual payment will use agreed_amount (set by tutor) or gross_amount (if no proposal).
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
  p_proposed_amount   INTEGER DEFAULT NULL   -- NEW: optional student custom amount
) RETURNS UUID AS $$
DECLARE
  v_session_id      UUID;
  v_gross_amount    INTEGER;
  v_platform_fee    INTEGER;
  v_net_amount      INTEGER;
  v_existing_session UUID;
  v_pricing_status  TEXT;
BEGIN
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
  v_gross_amount := (p_rate_per_hour * p_duration_minutes) / 60;
  v_platform_fee := ROUND(v_gross_amount * 0.15);
  v_net_amount   := v_gross_amount - v_platform_fee;

  -- Validate proposed amount if provided
  IF p_proposed_amount IS NOT NULL THEN
    IF p_proposed_amount < 800 THEN
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

-- Grant execute permission to authenticated users
-- Must specify full parameter types to disambiguate from the previous overload
GRANT EXECUTE ON FUNCTION create_booking_atomic(UUID,UUID,DATE,TIME,TIME,TEXT,TEXT,TEXT,INTEGER,INTEGER,INTEGER) TO authenticated;

-- Drop the old overload that had no p_proposed_amount parameter so there is only one version
DROP FUNCTION IF EXISTS create_booking_atomic(UUID,UUID,DATE,TIME,TIME,TEXT,TEXT,TEXT,INTEGER,INTEGER);

-- RLS: allow tutors to update pricing_status and agreed_amount on their sessions
DROP POLICY IF EXISTS "Tutors can update session pricing" ON sessions;
CREATE POLICY "Tutors can update session pricing"
  ON sessions FOR UPDATE
  USING (auth.uid() = tutor_id)
  WITH CHECK (auth.uid() = tutor_id);
