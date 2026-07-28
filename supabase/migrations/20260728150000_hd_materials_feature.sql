-- ============================================================
-- Migration: 20260728150000_hd_materials_feature.sql
-- Higher Diploma Materials Marketplace
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. Storage bucket for HD materials (private)
-- ────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'hd-materials',
  'hd-materials',
  false,
  52428800, -- 50 MB
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/octet-stream'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- 2. Add hd_material_price to platform_settings
-- ────────────────────────────────────────────────────────────
ALTER TABLE platform_settings
  ADD COLUMN IF NOT EXISTS hd_material_price INTEGER NOT NULL DEFAULT 500;

-- ────────────────────────────────────────────────────────────
-- 3. HD Materials table
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hd_materials (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id        UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT        NOT NULL,
  description     TEXT,
  specialty       TEXT        NOT NULL CHECK (specialty IN (
                    'Critical Care',
                    'Oncology',
                    'Renal Nursing',
                    'Perioperative',
                    'Psychiatric'
                  )),
  file_path       TEXT        NOT NULL,  -- storage key: hd-materials/<tutor_id>/<uuid>/<filename>
  file_name       TEXT        NOT NULL,
  file_size_bytes BIGINT      NOT NULL DEFAULT 0,
  file_type       TEXT        NOT NULL DEFAULT 'application/pdf',
  status          TEXT        NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'approved', 'rejected', 'hidden')),
  download_count  INTEGER     NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hd_materials_tutor_id ON hd_materials(tutor_id);
CREATE INDEX IF NOT EXISTS idx_hd_materials_status   ON hd_materials(status);
CREATE INDEX IF NOT EXISTS idx_hd_materials_specialty ON hd_materials(specialty);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_hd_materials_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_hd_materials_updated_at ON hd_materials;
CREATE TRIGGER trg_hd_materials_updated_at
  BEFORE UPDATE ON hd_materials
  FOR EACH ROW EXECUTE FUNCTION update_hd_materials_updated_at();

-- ────────────────────────────────────────────────────────────
-- 4. HD Material Purchases table
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hd_material_purchases (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  material_id  UUID        NOT NULL REFERENCES hd_materials(id) ON DELETE CASCADE,
  payment_id   UUID,  -- references payments.id (set after payment completes)
  amount_paid  INTEGER     NOT NULL DEFAULT 0,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, material_id)  -- prevent duplicate purchases
);

CREATE INDEX IF NOT EXISTS idx_hd_purchases_student_id  ON hd_material_purchases(student_id);
CREATE INDEX IF NOT EXISTS idx_hd_purchases_material_id ON hd_material_purchases(material_id);

-- ────────────────────────────────────────────────────────────
-- 5. Row Level Security
-- ────────────────────────────────────────────────────────────

-- hd_materials
ALTER TABLE hd_materials ENABLE ROW LEVEL SECURITY;

-- Tutors can see and manage their own materials
CREATE POLICY "tutor_own_hd_materials" ON hd_materials
  FOR ALL USING (auth.uid() = tutor_id);

-- HD students can see only approved materials
CREATE POLICY "hd_student_view_approved" ON hd_materials
  FOR SELECT USING (
    status = 'approved'
    AND EXISTS (
      SELECT 1 FROM student_profiles sp
      WHERE sp.id = auth.uid()
        AND sp.cadre = 'Higher Diploma'
    )
  );

-- Admins can do everything (via service role — no RLS restriction needed in practice,
-- but add a policy for completeness)
CREATE POLICY "admin_all_hd_materials" ON hd_materials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- hd_material_purchases
ALTER TABLE hd_material_purchases ENABLE ROW LEVEL SECURITY;

-- Students can see their own purchases
CREATE POLICY "student_own_purchases" ON hd_material_purchases
  FOR SELECT USING (auth.uid() = student_id);

-- Tutors can see purchases of their materials
CREATE POLICY "tutor_see_own_material_purchases" ON hd_material_purchases
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM hd_materials m
      WHERE m.id = material_id AND m.tutor_id = auth.uid()
    )
  );

-- ────────────────────────────────────────────────────────────
-- 6. Storage RLS policies for hd-materials bucket
-- ────────────────────────────────────────────────────────────

-- Tutors: can upload to their own folder
CREATE POLICY "tutor_upload_hd_materials"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'hd-materials'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'tutor'
    )
  );

-- Tutors: can read their own files
CREATE POLICY "tutor_read_own_hd_materials"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'hd-materials'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Tutors: can delete their own files
CREATE POLICY "tutor_delete_own_hd_materials"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'hd-materials'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Note: Signed URL downloads bypass object-level RLS (generated server-side
-- with service role), so no SELECT policy for students is needed here.

-- ────────────────────────────────────────────────────────────
-- Done
-- ────────────────────────────────────────────────────────────
DO $$ BEGIN
  RAISE NOTICE 'HD Materials Marketplace migration applied successfully.';
END $$;
