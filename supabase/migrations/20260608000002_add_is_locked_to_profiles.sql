-- Add is_locked column to profiles for admin account management
-- This column is used by the admin panel to lock/unlock user accounts.
-- The Supabase Auth ban_duration is set separately; this column
-- mirrors that state in the profiles table for fast UI queries.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_locked boolean NOT NULL DEFAULT false;

-- Index for fast filtering on locked accounts in admin queries
CREATE INDEX IF NOT EXISTS profiles_is_locked_idx ON public.profiles (is_locked)
  WHERE is_locked = true;
