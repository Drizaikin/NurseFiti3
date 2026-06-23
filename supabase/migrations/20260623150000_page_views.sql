-- =============================================================================
-- Migration: Admin User Tracking (page_views)
-- =============================================================================

CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster admin queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON page_views(user_id);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Admins can read all page views
CREATE POLICY "Admin can read page_views" 
  ON page_views FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- No INSERT policy needed because the API route uses service_role key to bypass RLS.
