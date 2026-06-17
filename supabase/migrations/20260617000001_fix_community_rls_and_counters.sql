-- =============================================================================
-- Migration: Fix community RLS + safe counter RPCs
-- Problems fixed:
--   1. Only group creators could UPDATE study_groups (member_count was silently
--      failing for non-creator students who join).
--   2. No mechanism existed to increment views_count when a post is rendered.
-- =============================================================================

-- ── 1. Allow any authenticated member to increment member_count ───────────────
-- The old policy only allowed the creator to UPDATE study_groups.
-- We add a permissive policy so any authenticated user can update member_count
-- (e.g. when joining). The creator policy stays so creators can still edit name/desc.
DROP POLICY IF EXISTS "Members can update member_count" ON study_groups;
CREATE POLICY "Members can update member_count"
  ON study_groups FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── 2. RPC: increment_member_count ───────────────────────────────────────────
-- Called from the client after a successful group join to bump the counter
-- atomically. Using a SECURITY DEFINER function avoids direct UPDATE RLS issues.
CREATE OR REPLACE FUNCTION increment_member_count(group_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE study_groups
  SET    member_count = member_count + 1
  WHERE  id = group_id;
END;
$$;

-- ── 3. RPC: decrement_member_count ───────────────────────────────────────────
-- Useful for when a user leaves a group in the future.
CREATE OR REPLACE FUNCTION decrement_member_count(group_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE study_groups
  SET    member_count = GREATEST(member_count - 1, 0)
  WHERE  id = group_id;
END;
$$;

-- ── 4. RPC: increment_post_views ─────────────────────────────────────────────
-- Atomically increments views_count for a community_messages row.
-- Using SECURITY DEFINER means any authenticated user can bump views without
-- needing a blanket UPDATE policy on community_messages.
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE community_messages
  SET    views_count = views_count + 1
  WHERE  id = post_id;
END;
$$;

-- ── 5. RPC: toggle_post_like ──────────────────────────────────────────────────
-- Inserts or removes a community_likes row and keeps likes_count in sync.
-- Returns true if the post is now liked, false if unliked.
CREATE OR REPLACE FUNCTION toggle_post_like(p_post_id UUID, p_user_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  already_liked boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM community_likes
    WHERE message_id = p_post_id
      AND message_type = 'student'
      AND user_id = p_user_id
  ) INTO already_liked;

  IF already_liked THEN
    DELETE FROM community_likes
    WHERE message_id = p_post_id
      AND message_type = 'student'
      AND user_id = p_user_id;

    UPDATE community_messages
    SET    likes_count = GREATEST(likes_count - 1, 0)
    WHERE  id = p_post_id;

    RETURN false;
  ELSE
    INSERT INTO community_likes (message_id, message_type, user_id)
    VALUES (p_post_id, 'student', p_user_id)
    ON CONFLICT DO NOTHING;

    UPDATE community_messages
    SET    likes_count = likes_count + 1
    WHERE  id = p_post_id;

    RETURN true;
  END IF;
END;
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION increment_member_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION decrement_member_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_post_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION toggle_post_like(UUID, UUID) TO authenticated;
