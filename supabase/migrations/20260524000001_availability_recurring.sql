-- Add recurring/one-time support to tutor_availability
-- is_recurring = TRUE  → repeats every week on that day_of_week
-- is_recurring = FALSE → one-time slot on specific_date only

ALTER TABLE tutor_availability
  ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS specific_date DATE;

-- Drop the old unique constraint (day_of_week + start_time) and replace with one
-- that handles both recurring and one-time slots correctly
ALTER TABLE tutor_availability
  DROP CONSTRAINT IF EXISTS tutor_availability_tutor_id_day_of_week_start_time_key;

-- Recurring slots: unique on (tutor_id, day_of_week, start_time) where is_recurring = TRUE
CREATE UNIQUE INDEX IF NOT EXISTS uq_availability_recurring
  ON tutor_availability (tutor_id, day_of_week, start_time)
  WHERE is_recurring = TRUE;

-- One-time slots: unique on (tutor_id, specific_date, start_time) where is_recurring = FALSE
CREATE UNIQUE INDEX IF NOT EXISTS uq_availability_onetime
  ON tutor_availability (tutor_id, specific_date, start_time)
  WHERE is_recurring = FALSE;

-- Index for fast lookup of one-time slots by date
CREATE INDEX IF NOT EXISTS idx_availability_specific_date
  ON tutor_availability (tutor_id, specific_date)
  WHERE is_recurring = FALSE;
