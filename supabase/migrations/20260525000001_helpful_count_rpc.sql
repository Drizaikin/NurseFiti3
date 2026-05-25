-- =============================================================================
-- Migration: increment_helpful_count RPC function
-- Called from the client after a successful feedback_helpful insert.
-- Uses SECURITY DEFINER so it can update app_feedback regardless of RLS.
-- =============================================================================

CREATE OR REPLACE FUNCTION increment_helpful_count(feedback_id UUID)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE app_feedback
  SET helpful_count = helpful_count + 1
  WHERE id = feedback_id;
$$;

-- Allow authenticated users to call this function
GRANT EXECUTE ON FUNCTION increment_helpful_count(UUID) TO authenticated;
