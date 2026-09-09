-- Correct post-hardening community regressions and enforce group boundaries.

CREATE OR REPLACE FUNCTION join_study_group(p_group_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_members INTEGER;
  maximum_members INTEGER;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT member_count, max_members INTO current_members, maximum_members
  FROM study_groups WHERE id = p_group_id AND privacy = 'open' FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Study group is not available'; END IF;
  IF EXISTS (SELECT 1 FROM group_members WHERE group_id = p_group_id AND student_id = auth.uid()) THEN RETURN; END IF;
  IF current_members >= maximum_members THEN RAISE EXCEPTION 'Study group is full'; END IF;
  INSERT INTO group_members (group_id, student_id, role) VALUES (p_group_id, auth.uid(), 'member');
  -- The group_members trigger keeps member_count in sync after the insert.
END;
$$;
GRANT EXECUTE ON FUNCTION join_study_group(UUID) TO authenticated;

DROP POLICY IF EXISTS "Authors can insert messages" ON community_messages;
CREATE POLICY "Members can insert group messages"
  ON community_messages FOR INSERT
  WITH CHECK (
    auth.uid() = author_id AND EXISTS (
      SELECT 1 FROM group_members WHERE group_id = community_messages.group_id AND student_id = auth.uid()
    )
  );

CREATE OR REPLACE FUNCTION increment_multiple_post_views(post_ids UUID[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  UPDATE community_messages message
  SET views_count = COALESCE(message.views_count, 0) + 1
  WHERE message.id = ANY(post_ids)
    AND EXISTS (
      SELECT 1 FROM group_members member WHERE member.group_id = message.group_id AND member.student_id = auth.uid()
    );
END;
$$;
GRANT EXECUTE ON FUNCTION increment_multiple_post_views(UUID[]) TO authenticated;
