-- Update platform fee from 15% to 23%
-- NurseFiti takes 23% of the gross session amount; tutors receive 77%.

CREATE OR REPLACE FUNCTION create_booking_atomic(
  p_tutor_id UUID,
  p_student_id UUID,
  p_session_date DATE,
  p_start_time TIME,
  p_end_time TIME,
  p_cadre TEXT,
  p_topic TEXT,
  p_platform TEXT,
  p_duration_minutes INTEGER,
  p_rate_per_hour INTEGER
) RETURNS UUID AS $$
DECLARE
  v_session_id UUID;
  v_gross_amount INTEGER;
  v_platform_fee INTEGER;
  v_net_amount INTEGER;
  v_existing_session UUID;
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

  -- Calculate amounts — NurseFiti fee: 23%, tutor receives: 77%
  v_gross_amount := (p_rate_per_hour * p_duration_minutes) / 60;
  v_platform_fee := ROUND(v_gross_amount * 0.23);
  v_net_amount   := v_gross_amount - v_platform_fee;

  -- Create session
  INSERT INTO sessions (
    student_id, tutor_id, session_date, start_time, end_time,
    cadre, topic, platform, duration_minutes, rate_per_hour,
    gross_amount, platform_fee, net_amount, status, payment_status
  ) VALUES (
    p_student_id, p_tutor_id, p_session_date, p_start_time, p_end_time,
    p_cadre, p_topic, p_platform, p_duration_minutes, p_rate_per_hour,
    v_gross_amount, v_platform_fee, v_net_amount, 'confirmed', 'pending'
  ) RETURNING id INTO v_session_id;

  RETURN v_session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_booking_atomic(UUID, UUID, DATE, TIME, TIME, TEXT, TEXT, TEXT, INTEGER, INTEGER) TO authenticated;
