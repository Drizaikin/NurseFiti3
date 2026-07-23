-- Add last_read_at to group_members if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'group_members' AND column_name = 'last_read_at') THEN
        ALTER TABLE public.group_members ADD COLUMN last_read_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- RPC to check if a user has unread messages in their groups
CREATE OR REPLACE FUNCTION has_unread_community_messages(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    has_unread BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM public.group_members gm
        JOIN public.community_messages m ON m.group_id = gm.group_id
        WHERE gm.student_id = user_uuid
          AND m.is_deleted = FALSE
          AND m.created_at > gm.last_read_at
          AND m.author_id != user_uuid -- Don't count their own messages as unread
    ) INTO has_unread;
    
    RETURN has_unread;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC to mark a specific group as read for a user
CREATE OR REPLACE FUNCTION mark_group_as_read(target_group_id UUID, user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.group_members
    SET last_read_at = NOW()
    WHERE group_id = target_group_id AND student_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
