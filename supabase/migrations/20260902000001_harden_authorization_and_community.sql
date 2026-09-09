-- Harden authorization boundaries and community counters.
-- This migration removes broad direct updates to sensitive records and makes
-- client-facing counter operations derive the acting user from auth.uid().

-- Profiles contain authorization and contact data. Block clients from changing
-- authorization, identity and account-lock fields while retaining the existing
-- UI path for self-service display/contact edits. Service-role admin operations
-- remain permitted for account management.
CREATE OR REPLACE FUNCTION protect_profile_sensitive_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF auth.role() <> 'service_role' AND (
    NEW.role IS DISTINCT FROM OLD.role OR
    NEW.email IS DISTINCT FROM OLD.email OR
    NEW.is_locked IS DISTINCT FROM OLD.is_locked
  ) THEN
    RAISE EXCEPTION 'Sensitive profile fields cannot be changed by clients';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_profile_sensitive_fields_trigger ON profiles;
CREATE TRIGGER protect_profile_sensitive_fields_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION protect_profile_sensitive_fields();

-- Remove unrestricted group mutation and caller-controlled counter RPCs.
DROP POLICY IF EXISTS "Members can update member_count" ON study_groups;
DROP FUNCTION IF EXISTS increment_member_count(UUID);
DROP FUNCTION IF EXISTS decrement_member_count(UUID);
DROP FUNCTION IF EXISTS increment_post_views(UUID);
DROP FUNCTION IF EXISTS toggle_post_like(UUID, UUID);

CREATE OR REPLACE FUNCTION toggle_own_post_like(p_post_id UUID)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  already_liked BOOLEAN;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM community_messages message
    JOIN group_members member ON member.group_id = message.group_id
    WHERE message.id = p_post_id AND member.student_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Not authorized for this post';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM community_likes
    WHERE message_id = p_post_id AND message_type = 'student' AND user_id = auth.uid()
  ) INTO already_liked;

  IF already_liked THEN
    DELETE FROM community_likes WHERE message_id = p_post_id AND message_type = 'student' AND user_id = auth.uid();
    UPDATE community_messages SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = p_post_id;
    RETURN false;
  END IF;

  INSERT INTO community_likes (message_id, message_type, user_id)
  VALUES (p_post_id, 'student', auth.uid()) ON CONFLICT DO NOTHING;
  UPDATE community_messages SET likes_count = likes_count + 1 WHERE id = p_post_id;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION toggle_own_post_like(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION sync_study_group_member_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_group_id UUID := COALESCE(NEW.group_id, OLD.group_id);
BEGIN
  UPDATE study_groups
  SET member_count = (SELECT count(*) FROM group_members WHERE group_id = target_group_id)
  WHERE id = target_group_id;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS sync_study_group_member_count_trigger ON group_members;
CREATE TRIGGER sync_study_group_member_count_trigger
  AFTER INSERT OR DELETE ON group_members
  FOR EACH ROW EXECUTE FUNCTION sync_study_group_member_count();

CREATE OR REPLACE FUNCTION join_study_group(p_group_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF NOT EXISTS (SELECT 1 FROM study_groups WHERE id = p_group_id AND privacy = 'open') THEN
    RAISE EXCEPTION 'Study group is not available';
  END IF;
  INSERT INTO group_members (group_id, student_id, role)
  VALUES (p_group_id, auth.uid(), 'member') ON CONFLICT DO NOTHING;
  UPDATE study_groups
  SET member_count = (SELECT count(*) FROM group_members WHERE group_id = p_group_id)
  WHERE id = p_group_id;
END;
$$;
GRANT EXECUTE ON FUNCTION join_study_group(UUID) TO authenticated;
