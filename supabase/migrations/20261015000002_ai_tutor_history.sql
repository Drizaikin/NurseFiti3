-- AI Tutor: Persistent conversations and chat memory
-- Migration: 20261015000002_ai_tutor_history.sql

CREATE TABLE IF NOT EXISTS public.ai_tutor_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Study Session',
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_tutor_conversations_user
  ON public.ai_tutor_conversations(user_id, updated_at DESC);

ALTER TABLE public.ai_tutor_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_tutor_conversations_owner" ON public.ai_tutor_conversations;
CREATE POLICY "ai_tutor_conversations_owner"
  ON public.ai_tutor_conversations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
