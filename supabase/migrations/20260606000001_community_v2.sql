-- Community v2: admin posts, tutor community, likes, notification reads

-- Extend community_messages
ALTER TABLE community_messages
  ADD COLUMN IF NOT EXISTS is_admin_post BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS likes_count   INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS views_count   INTEGER DEFAULT 0;

-- Tutor-only community feed
CREATE TABLE IF NOT EXISTS tutor_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id     UUID REFERENCES profiles NOT NULL,
  body          TEXT NOT NULL CHECK (char_length(body) <= 2000),
  reply_to_id   UUID REFERENCES tutor_messages(id) ON DELETE SET NULL,
  quote_body    TEXT,
  quote_author  TEXT,
  is_deleted    BOOLEAN DEFAULT FALSE,
  is_admin_post BOOLEAN DEFAULT FALSE,
  likes_count   INTEGER DEFAULT 0,
  views_count   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tutor_msg_created ON tutor_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tutor_msg_author  ON tutor_messages (author_id);

ALTER TABLE tutor_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tutors read tutor messages" ON tutor_messages;
CREATE POLICY "Tutors read tutor messages"
  ON tutor_messages FOR SELECT
  USING (auth.role() = 'authenticated' AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('tutor','admin')));

DROP POLICY IF EXISTS "Tutors insert own messages" ON tutor_messages;
CREATE POLICY "Tutors insert own messages"
  ON tutor_messages FOR INSERT
  WITH CHECK (auth.uid() = author_id AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('tutor','admin')));

DROP POLICY IF EXISTS "Authors update own tutor messages" ON tutor_messages;
CREATE POLICY "Authors update own tutor messages"
  ON tutor_messages FOR UPDATE
  USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Service role full tutor_messages" ON tutor_messages;
CREATE POLICY "Service role full tutor_messages"
  ON tutor_messages FOR ALL USING (auth.role() = 'service_role');

-- Likes table
CREATE TABLE IF NOT EXISTS community_likes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id   UUID NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('student','tutor')),
  user_id      UUID REFERENCES profiles NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (message_id, message_type, user_id)
);

ALTER TABLE community_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own likes" ON community_likes;
CREATE POLICY "Users manage own likes"
  ON community_likes FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Auth users read likes" ON community_likes;
CREATE POLICY "Auth users read likes"
  ON community_likes FOR SELECT USING (auth.role() = 'authenticated');

-- Extend notifications
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS is_broadcast BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS read_count   INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS target_role  TEXT;

-- Notification reads
CREATE TABLE IF NOT EXISTS notification_reads (
  notification_id UUID REFERENCES notifications NOT NULL,
  user_id         UUID REFERENCES profiles NOT NULL,
  read_at         TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (notification_id, user_id)
);

ALTER TABLE notification_reads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own reads" ON notification_reads;
DROP POLICY IF EXISTS "Users read own reads" ON notification_reads;
DROP POLICY IF EXISTS "Service role reads" ON notification_reads;
CREATE POLICY "Users insert own reads"   ON notification_reads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own reads"     ON notification_reads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role reads"       ON notification_reads FOR ALL USING (auth.role() = 'service_role');

-- Allow service role to post admin messages to community_messages
DROP POLICY IF EXISTS "Service role community_messages" ON community_messages;
CREATE POLICY "Service role community_messages"
  ON community_messages FOR ALL USING (auth.role() = 'service_role');

-- Realtime
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND tablename = 'tutor_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE tutor_messages;
  END IF;
END $$;
