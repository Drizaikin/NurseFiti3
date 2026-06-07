-- =============================================================================
-- Migration: Storage RLS policies + pending schema from migration 002
-- Run this in Supabase Dashboard → SQL Editor
-- Safe to run multiple times (all statements use IF NOT EXISTS / IF EXISTS)
-- =============================================================================

-- ── 1. Onboarding tour flags (from migration 002 if not yet applied) ──────────
ALTER TABLE student_profiles
  ADD COLUMN IF NOT EXISTS onboarding_tour_seen BOOLEAN DEFAULT FALSE;

ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS onboarding_tour_seen BOOLEAN DEFAULT FALSE;

-- ── 2. Community chat messages table (from migration 002 if not yet applied) ──
CREATE TABLE IF NOT EXISTS community_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id     UUID REFERENCES profiles NOT NULL,
  group_id      UUID REFERENCES study_groups NOT NULL,
  body          TEXT NOT NULL CHECK (char_length(body) <= 2000),
  reply_to_id   UUID REFERENCES community_messages(id) ON DELETE SET NULL,
  quote_body    TEXT,
  quote_author  TEXT,
  is_deleted    BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_group_created
  ON community_messages (group_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_author
  ON community_messages (author_id);

CREATE INDEX IF NOT EXISTS idx_chat_reply_to
  ON community_messages (reply_to_id);

-- Enable Realtime
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND tablename = 'community_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE community_messages;
  END IF;
END $$;

-- RLS on community_messages
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can read group messages" ON community_messages;
CREATE POLICY "Members can read group messages"
  ON community_messages FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authors can insert messages" ON community_messages;
CREATE POLICY "Authors can insert messages"
  ON community_messages FOR INSERT
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update own messages" ON community_messages;
CREATE POLICY "Authors can update own messages"
  ON community_messages FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- ── 3. Profiles UPDATE policy for avatar_url ─────────────────────────────────
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── 4. Storage RLS policies for avatars bucket ───────────────────────────────
-- Public read (bucket is public, but policy must also exist)
DROP POLICY IF EXISTS "Public can read avatars" ON storage.objects;
CREATE POLICY "Public can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Authenticated users can upload to their own folder: {user_id}/avatar.*
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can overwrite their own avatar
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can delete their own avatar
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
