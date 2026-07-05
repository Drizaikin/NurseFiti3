-- Migration: optimize_practice_queries
-- Description: Adds RPCs to efficiently fetch active units and unanswered practice questions without large array transfers

-- 1. RPC to get unique active units for a cadre
CREATE OR REPLACE FUNCTION get_active_units(p_cadre TEXT)
RETURNS TABLE (unit TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT q.unit
  FROM questions q
  WHERE q.cadre = p_cadre AND q.status = 'approved'
  ORDER BY q.unit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. RPC to fetch unanswered practice questions
CREATE OR REPLACE FUNCTION get_unanswered_practice_questions(
  p_student_id UUID,
  p_cadre TEXT,
  p_unit TEXT DEFAULT 'all',
  p_limit INT DEFAULT 40
)
RETURNS SETOF questions AS $$
BEGIN
  IF p_unit = 'all' THEN
    RETURN QUERY
    SELECT q.*
    FROM questions q
    WHERE q.cadre = p_cadre
      AND q.status = 'approved'
      AND NOT EXISTS (
        SELECT 1
        FROM student_answers sa
        WHERE sa.question_id = q.id
          AND sa.student_id = p_student_id
          AND sa.mode = 'practice'
      )
    ORDER BY RANDOM()
    LIMIT p_limit;
  ELSE
    RETURN QUERY
    SELECT q.*
    FROM questions q
    WHERE q.cadre = p_cadre
      AND q.unit = p_unit
      AND q.status = 'approved'
      AND NOT EXISTS (
        SELECT 1
        FROM student_answers sa
        WHERE sa.question_id = q.id
          AND sa.student_id = p_student_id
          AND sa.mode = 'practice'
      )
    ORDER BY RANDOM()
    LIMIT p_limit;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
