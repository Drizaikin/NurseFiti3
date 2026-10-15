-- Add personal/global scope to AI Tutor materials and make retrieval user-aware.

ALTER TABLE public.ai_tutor_materials
  ADD COLUMN IF NOT EXISTS scope TEXT NOT NULL DEFAULT 'personal';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'ai_tutor_materials_scope_check'
  ) THEN
    ALTER TABLE public.ai_tutor_materials
      ADD CONSTRAINT ai_tutor_materials_scope_check
      CHECK (scope IN ('global', 'personal'));
  END IF;
END $$;

-- Treat admin-uploaded materials as global knowledge.
UPDATE public.ai_tutor_materials m
SET scope = 'global'
WHERE m.uploaded_by IN (SELECT p.id FROM public.profiles p WHERE p.role = 'admin');

-- Replace retrieval function to support global + user-owned personal materials.
DROP FUNCTION IF EXISTS public.search_ai_tutor_chunks(TEXT, UUID, INTEGER);

CREATE OR REPLACE FUNCTION public.search_ai_tutor_chunks(
  p_query TEXT,
  p_user_id UUID DEFAULT NULL,
  p_material_id UUID DEFAULT NULL,
  p_limit INTEGER DEFAULT 8
)
RETURNS TABLE (
  id UUID,
  material_id UUID,
  title TEXT,
  chunk_index INTEGER,
  content TEXT,
  rank REAL
)
LANGUAGE SQL STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id,
    c.material_id,
    m.title,
    c.chunk_index,
    c.content,
    ts_rank(c.search_vector, plainto_tsquery('english', p_query)) AS rank
  FROM public.ai_tutor_chunks c
  JOIN public.ai_tutor_materials m ON m.id = c.material_id
  WHERE c.search_vector @@ plainto_tsquery('english', p_query)
    AND (p_material_id IS NULL OR c.material_id = p_material_id)
    AND m.status = 'approved'
    AND (m.scope = 'global' OR (p_user_id IS NOT NULL AND m.uploaded_by = p_user_id))
  ORDER BY rank DESC, c.id
  LIMIT GREATEST(1, LEAST(p_limit, 24));
$$;

GRANT EXECUTE ON FUNCTION public.search_ai_tutor_chunks(TEXT, UUID, UUID, INTEGER) TO authenticated;