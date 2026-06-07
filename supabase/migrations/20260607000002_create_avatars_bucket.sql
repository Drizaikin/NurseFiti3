-- =============================================================================
-- Migration: Create avatars storage bucket
-- =============================================================================
-- The avatars bucket RLS policies were defined in migration 20260604000003
-- but the bucket itself was never created via migration — only its policies.
-- Supabase rejects storage uploads with "row violates row-level security"
-- when the bucket row does not exist in storage.buckets.
-- This migration creates the bucket idempotently.
-- =============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,                          -- public bucket so avatar URLs work without signed URLs
  5242880,                       -- 5 MB limit
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public              = EXCLUDED.public,
  file_size_limit     = EXCLUDED.file_size_limit,
  allowed_mime_types  = EXCLUDED.allowed_mime_types;

-- Re-apply RLS policies to be safe (idempotent)
-- Note: storage.objects RLS is managed by Supabase — ALTER TABLE is not needed here.

DROP POLICY IF EXISTS "Public can read avatars"                  ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars"   ON storage.objects;
DROP POLICY IF EXISTS "Users can update own avatar"              ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own avatar"              ON storage.objects;

CREATE POLICY "Public can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
