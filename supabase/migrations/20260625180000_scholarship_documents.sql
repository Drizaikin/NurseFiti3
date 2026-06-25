-- =============================================================================
-- Migration: Add scholarship document uploads bucket and columns
-- =============================================================================

-- 1. Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'scholarship_documents',
  'scholarship_documents',
  true,                          -- public bucket so Admin can easily view them without signed URLs 
  5242880,                       -- 5 MB limit
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public              = EXCLUDED.public,
  file_size_limit     = EXCLUDED.file_size_limit,
  allowed_mime_types  = EXCLUDED.allowed_mime_types;

-- 2. Storage RLS Policies
DROP POLICY IF EXISTS "Public can read scholarship documents" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload scholarship documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own scholarship documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own scholarship documents" ON storage.objects;

-- Allow public read access (necessary for admin dashboard rendering)
CREATE POLICY "Public can read scholarship documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'scholarship_documents');

-- Allow authenticated users to upload documents to their own folder
CREATE POLICY "Authenticated users can upload scholarship documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'scholarship_documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own scholarship documents"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'scholarship_documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own scholarship documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'scholarship_documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 3. Update scholarship_applications table
ALTER TABLE public.scholarship_applications
  ADD COLUMN IF NOT EXISTS student_id_front_url text,
  ADD COLUMN IF NOT EXISTS student_id_back_url text,
  ADD COLUMN IF NOT EXISTS national_id_front_url text,
  ADD COLUMN IF NOT EXISTS national_id_back_url text;
