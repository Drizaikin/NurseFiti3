-- Migration: Auto-expire paid plans back to free when plan_expires_at passes
--
-- Creates a Postgres function + cron job (via pg_cron) that resets any
-- student whose plan_expires_at is in the past back to plan_tier = 'free'.
--
-- This means the stored value in the DB is always correct, not just the
-- client-side display. The cron runs every hour.
--
-- NOTE: pg_cron must be enabled on your Supabase project.
-- Enable it in: Supabase Dashboard → Database → Extensions → pg_cron

-- ── Function ──────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION expire_student_plans()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE student_profiles
  SET
    plan_tier       = 'free',
    plan_expires_at = NULL
  WHERE
    plan_tier != 'free'
    AND plan_expires_at IS NOT NULL
    AND plan_expires_at < NOW();
END;
$$;

-- ── Cron job — runs every hour ─────────────────────────────────────────────────
-- Requires pg_cron extension. If not available, the function above can be
-- called manually or via a Supabase Edge Function on a schedule.

DO $$
BEGIN
  -- Only schedule if pg_cron is available
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    PERFORM cron.schedule(
      'expire-student-plans',   -- job name (unique)
      '0 * * * *',              -- every hour at :00
      'SELECT expire_student_plans()'
    );
  END IF;
END;
$$;
