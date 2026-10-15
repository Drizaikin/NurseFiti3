-- AI Tutor: materials + grounded chunks
-- Migration: 20261015000000_create_ai_tutor.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.ai_tutor_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  mime_type TEXT,
  file_size_bytes BIGINT,
  status TEXT NOT NULL DEFAULT 'processing'
    CHECK (status IN ('processing', 'approved', 'failed', 'hidden')),
  chunk_count INTEGER NOT NULL DEFAULT 0,
  extracted_char_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_tutor_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  material_id UUID NOT NULL REFERENCES public.ai_tutor_materials(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  search_vector TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_tutor_materials_status
  ON public.ai_tutor_materials(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ai_tutor_chunks_material
  ON public.ai_tutor_chunks(material_id, chunk_index);

CREATE INDEX IF NOT EXISTS idx_ai_tutor_chunks_search
  ON public.ai_tutor_chunks USING GIN (search_vector);

-- Retrieval RPC (full-text, ranked)
CREATE OR REPLACE FUNCTION public.search_ai_tutor_chunks(
  p_query TEXT,
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
  ORDER BY rank DESC, c.id
  LIMIT GREATEST(1, LEAST(p_limit, 24));
$$;

GRANT EXECUTE ON FUNCTION public.search_ai_tutor_chunks(TEXT, UUID, INTEGER) TO authenticated;

-- RLS
ALTER TABLE public.ai_tutor_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tutor_chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_tutor_materials_admin_all" ON public.ai_tutor_materials;
CREATE POLICY "ai_tutor_materials_admin_all"
  ON public.ai_tutor_materials
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "ai_tutor_materials_read_authenticated" ON public.ai_tutor_materials;
CREATE POLICY "ai_tutor_materials_read_authenticated"
  ON public.ai_tutor_materials
  FOR SELECT
  TO authenticated
  USING (status = 'approved' OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "ai_tutor_chunks_admin_all" ON public.ai_tutor_chunks;
CREATE POLICY "ai_tutor_chunks_admin_all"
  ON public.ai_tutor_chunks
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

DROP POLICY IF EXISTS "ai_tutor_chunks_read_approved" ON public.ai_tutor_chunks;
CREATE POLICY "ai_tutor_chunks_read_approved"
  ON public.ai_tutor_chunks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.ai_tutor_materials m
      WHERE m.id = ai_tutor_chunks.material_id
        AND (m.status = 'approved' OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
    )
  );

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_touch_ai_tutor_materials ON public.ai_tutor_materials;
CREATE TRIGGER trg_touch_ai_tutor_materials
BEFORE UPDATE ON public.ai_tutor_materials
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('ai-tutor-materials', 'ai-tutor-materials', false)
ON CONFLICT (id) DO NOTHING;
