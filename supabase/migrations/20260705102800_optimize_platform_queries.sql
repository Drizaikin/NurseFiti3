-- ==============================================================================
-- TITLE: PLATFORM-WIDE PERFORMANCE OPTIMIZATIONS (FLASHCARDS & TUTOR STATS)
-- PURPOSE: Eliminates severe lag by moving heavy data aggregation from the 
--          JavaScript client into native, ultra-fast PostgreSQL RPC functions.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. get_student_accuracy(p_student_ids UUID[])
-- ------------------------------------------------------------------------------
-- Replaces a massive unpaginated query on the Tutor "My Students" page.
-- Instead of transferring 100,000+ answers to the browser, this calculates
-- total answers and correct answers internally in milliseconds.

CREATE OR REPLACE FUNCTION public.get_student_accuracy(p_student_ids UUID[])
RETURNS TABLE (
  student_id UUID,
  total_answers BIGINT,
  correct_answers BIGINT
) 
LANGUAGE sql 
SECURITY DEFINER
AS $$
  SELECT 
    student_id,
    COUNT(*) as total_answers,
    SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers
  FROM public.student_answers
  WHERE student_id = ANY(p_student_ids)
  GROUP BY student_id;
$$;


-- ------------------------------------------------------------------------------
-- 2. get_due_flashcard_counts(p_student_id UUID)
-- ------------------------------------------------------------------------------
-- Replaces an unconditional fetch of every single flashcard ID in the database
-- on the Flashcards page. 
-- Instantly returns the number of cards due for review, grouped by deck.

CREATE OR REPLACE FUNCTION public.get_due_flashcard_counts(p_student_id UUID)
RETURNS TABLE (
  deck_id UUID,
  due_count BIGINT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  WITH due_cards AS (
    SELECT c.deck_id
    FROM public.flashcards c
    LEFT JOIN public.flashcard_progress p 
      ON p.card_id = c.id AND p.student_id = p_student_id
    -- A card is due if it has no progress (unseen) or the next review date is in the past
    WHERE p.next_review_at IS NULL OR p.next_review_at <= NOW()
  )
  SELECT deck_id, COUNT(*) as due_count
  FROM due_cards
  GROUP BY deck_id;
$$;
