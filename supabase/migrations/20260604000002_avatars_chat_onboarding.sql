-- =============================================================================
-- Migration: Avatar storage, community chat, onboarding tour flags
-- =============================================================================

-- ── 1. Avatar URL columns ─────────────────────────────────────────────────────
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- ── 2. Onboarding tour seen flags ────────────────────────────────────────────
ALTER TABLE student_profiles
  ADD COLUMN IF NOT EXISTS onboarding_tour_seen BOOLEAN DEFAULT FALSE;

ALTER TABLE tutor_profiles
  ADD COLUMN IF NOT EXISTS onboarding_tour_seen BOOLEAN DEFAULT FALSE;

-- ── 3. Community chat messages table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS community_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id     UUID REFERENCES profiles NOT NULL,
  group_id      UUID REFERENCES study_groups NOT NULL,
  body          TEXT NOT NULL CHECK (char_length(body) <= 2000),
  reply_to_id   UUID REFERENCES community_messages(id) ON DELETE SET NULL,
  quote_body    TEXT,          -- snapshot of quoted message text (denormalized)
  quote_author  TEXT,          -- snapshot of quoted author name (denormalized)
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

-- ── 4. Enable Realtime on community_messages ─────────────────────────────────
-- (Supabase requires the table to be in the publication for realtime)
-- Idempotent: only add if not already a member of the publication
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

-- ── 5. RLS on community_messages ─────────────────────────────────────────────
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read messages in groups they are a member of
-- (groups are already "all cadres open" per product spec)
DROP POLICY IF EXISTS "Members can read group messages" ON community_messages;
CREATE POLICY "Members can read group messages"
  ON community_messages FOR SELECT
  USING (
    auth.role() = 'authenticated'
  );

-- Only the author can insert their own messages
DROP POLICY IF EXISTS "Authors can insert messages" ON community_messages;
CREATE POLICY "Authors can insert messages"
  ON community_messages FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Authors can soft-delete (set is_deleted=true) but not hard-delete
DROP POLICY IF EXISTS "Authors can update own messages" ON community_messages;
CREATE POLICY "Authors can update own messages"
  ON community_messages FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- ── 6. RLS on profiles — allow avatar_url updates ────────────────────────────
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
