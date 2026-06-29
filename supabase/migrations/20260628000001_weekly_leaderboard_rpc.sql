-- Migration: 20260628000001_weekly_leaderboard_rpc.sql
-- Description: Adds RPC to calculate weekly leaderboard XP for real users

CREATE OR REPLACE FUNCTION get_weekly_leaderboard()
RETURNS TABLE (
  id UUID,
  xp BIGINT,
  level INTEGER,
  cadre TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sa.student_id as id,
    (SUM(
      CASE 
        WHEN sa.mode = 'mock_exam' AND sa.is_correct THEN 2
        WHEN sa.mode = 'mock_exam' AND NOT sa.is_correct THEN 0
        WHEN sa.is_correct THEN 8 
        ELSE 0 
      END
    ))::BIGINT as xp,
    sp.level,
    sp.cadre
  FROM student_answers sa
  JOIN student_profiles sp ON sp.id = sa.student_id
  WHERE sa.answered_at >= (CURRENT_DATE - INTERVAL '7 days')
  GROUP BY sa.student_id, sp.level, sp.cadre
  ORDER BY xp DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_weekly_leaderboard() TO authenticated;
