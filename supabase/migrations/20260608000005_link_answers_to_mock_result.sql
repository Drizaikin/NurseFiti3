-- Add result_id to student_answers so mock exam answers are permanently
-- linked to their mock_exam_results row. This enables reliable history
-- retrieval for any past exam without relying on timestamp window matching.

ALTER TABLE public.student_answers
  ADD COLUMN IF NOT EXISTS result_id UUID REFERENCES mock_exam_results(id) ON DELETE SET NULL;

-- Index for fast lookup of all answers belonging to a specific result
CREATE INDEX IF NOT EXISTS idx_answers_result_id ON student_answers(result_id)
  WHERE result_id IS NOT NULL;
