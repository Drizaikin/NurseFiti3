-- Add notification preferences to student_profiles
ALTER TABLE student_profiles
  ADD COLUMN IF NOT EXISTS notif_booking_confirmed BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS notif_session_reminder BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS notif_streak_alerts BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS notif_plan_expiry BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS notif_weekly_summary BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS notif_whatsapp BOOLEAN DEFAULT TRUE;
