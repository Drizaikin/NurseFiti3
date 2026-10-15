-- AI Tutor: Dedicated Private Student Reviews & Feedback
-- Migration: 20261016000000_ai_tutor_reviews.sql
-- Strictly private to platform admins — NOT public, never exposed on FeedbackWall

CREATE TABLE IF NOT EXISTS public.ai_tutor_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT,
  user_role TEXT DEFAULT 'student',
  cadre TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  experience TEXT,
  expected TEXT,
  disappointing TEXT,
  recommendations TEXT,
  selected_voice TEXT,
  session_message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_tutor_reviews_created
  ON public.ai_tutor_reviews(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ai_tutor_reviews_user
  ON public.ai_tutor_reviews(user_id);

-- Enable RLS
ALTER TABLE public.ai_tutor_reviews ENABLE ROW LEVEL SECURITY;

-- Students / Authenticated users can insert their own AI tutor review
DROP POLICY IF EXISTS "ai_tutor_reviews_insert_authenticated" ON public.ai_tutor_reviews;
CREATE POLICY "ai_tutor_reviews_insert_authenticated"
  ON public.ai_tutor_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ONLY Platform Admins can view/select AI Tutor reviews (Strictly NOT Public)
DROP POLICY IF EXISTS "ai_tutor_reviews_admin_select" ON public.ai_tutor_reviews;
CREATE POLICY "ai_tutor_reviews_admin_select"
  ON public.ai_tutor_reviews
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- ONLY Platform Admins can delete AI Tutor reviews
DROP POLICY IF EXISTS "ai_tutor_reviews_admin_delete" ON public.ai_tutor_reviews;
CREATE POLICY "ai_tutor_reviews_admin_delete"
  ON public.ai_tutor_reviews
  FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- Broadcast notification for AI Clinical Tutor launch with Multi-Voice & Accents
INSERT INTO public.notifications (
  id,
  user_id,
  type,
  title,
  body,
  action_url,
  is_broadcast,
  is_read,
  read_count,
  target_role,
  created_at
)
VALUES (
  'a1707001-0000-4000-8000-000000000001'::uuid,
  NULL,
  'ai_tutor_launch',
  '🩺 New: AI Clinical Tutor with Multi-Voice & Accents is Live!',
  'We have upgraded the AI Clinical Tutor with multiple voice personalities and British & American accents! Practice clinical cases, test knowledge against accredited textbooks, and hear lifelike speech. Please test it out and share your reviews and recommendations — your feedback is highly appreciated!',
  '/ai-tutor',
  true,
  false,
  0,
  NULL,
  NOW()
)
ON CONFLICT (id) DO NOTHING;
