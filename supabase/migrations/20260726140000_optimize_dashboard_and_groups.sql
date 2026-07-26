-- Migration to optimize student dashboard stats and community group view tracking

-- 1. Dashboard Stats RPC
-- Calculates total questions answered, correct answers, total study time, and badge metrics efficiently in Postgres.
CREATE OR REPLACE FUNCTION get_student_dashboard_stats(user_uuid uuid)
RETURNS TABLE (
    total_answers bigint,
    correct_answers bigint,
    study_time_seconds bigint,
    weekend_answers bigint,
    early_bird_answers bigint,
    night_owl_answers bigint,
    last_50_correct bigint,
    last_50_total bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH stats AS (
        SELECT 
            COUNT(*) as total_answers,
            COUNT(*) FILTER (WHERE is_correct = true) as correct_answers,
            COALESCE(SUM(time_taken_seconds), 0)::bigint as study_time_seconds,
            COUNT(*) FILTER (WHERE EXTRACT(ISODOW FROM answered_at) IN (6, 7)) as weekend_answers,
            COUNT(*) FILTER (WHERE EXTRACT(HOUR FROM (answered_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Nairobi')) >= 4 AND EXTRACT(HOUR FROM (answered_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Nairobi')) < 8) as early_bird_answers,
            COUNT(*) FILTER (WHERE EXTRACT(HOUR FROM (answered_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Nairobi')) >= 22 OR EXTRACT(HOUR FROM (answered_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Nairobi')) < 3) as night_owl_answers
        FROM public.student_answers
        WHERE student_id = user_uuid
    ),
    last_50 AS (
        SELECT is_correct
        FROM public.student_answers
        WHERE student_id = user_uuid
        ORDER BY answered_at DESC NULLS LAST
        LIMIT 50
    ),
    last_50_stats AS (
        SELECT 
            COUNT(*) as last_50_total,
            COUNT(*) FILTER (WHERE is_correct = true) as last_50_correct
        FROM last_50
    )
    SELECT 
        s.total_answers,
        s.correct_answers,
        s.study_time_seconds,
        s.weekend_answers,
        s.early_bird_answers,
        s.night_owl_answers,
        l.last_50_correct,
        l.last_50_total
    FROM stats s CROSS JOIN last_50_stats l;
END;
$$;

-- 2. Community Group Multiple Post Views RPC
-- Avoids N+1 queries by accepting an array of UUIDs and incrementing views in a single update.
CREATE OR REPLACE FUNCTION increment_multiple_post_views(post_ids uuid[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.community_messages
    SET views_count = COALESCE(views_count, 0) + 1
    WHERE id = ANY(post_ids);
END;
$$;
