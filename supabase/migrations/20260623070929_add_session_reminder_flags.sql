-- Add flags to track if automated session reminders have been sent
ALTER TABLE sessions 
  ADD COLUMN IF NOT EXISTS reminder_sent_24h BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS reminder_sent_1h BOOLEAN NOT NULL DEFAULT FALSE;

COMMENT ON COLUMN sessions.reminder_sent_24h IS 'Indicates if the 24-hour reminder email has been sent for this session.';
COMMENT ON COLUMN sessions.reminder_sent_1h IS 'Indicates if the 1-hour reminder email has been sent for this session.';
