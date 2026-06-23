-- =============================================================================
-- Migration: Session Reminders State
-- =============================================================================

ALTER TABLE sessions
ADD COLUMN IF NOT EXISTS reminder_sent_15m BOOLEAN DEFAULT FALSE;
