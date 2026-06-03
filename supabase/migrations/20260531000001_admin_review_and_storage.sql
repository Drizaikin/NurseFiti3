-- =============================================================================
-- Migration: Admin review infrastructure
-- - RLS policies for admin to read questions and generate signed document URLs
-- - Storage buckets for tutor documents and question uploads
-- =============================================================================

-- ── 1. Admin policy on questions table ───────────────────────────────────────
-- Admins need to read all questions (any status) and update status

DROP POLICY IF EXISTS "Admins can manage all questions" ON questions;
CREATE POLICY "Admins can manage all questions"
  ON questions FOR ALL
  USING (is_admin());

-- Tutors can insert their own questions
DROP POLICY IF EXISTS "Tutors can insert questions" ON questions;
CREATE POLICY "Tutors can insert questions"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = contributor_id);

-- Tutors can view their own questions
DROP POLICY IF EXISTS "Contributors can view own questions" ON questions;
CREATE POLICY "Contributors can view own questions"
  ON questions FOR SELECT
  USING (auth.uid() = contributor_id);

-- Students can view approved questions
DROP POLICY IF EXISTS "Students can view approved questions" ON questions;
CREATE POLICY "Students can view approved questions"
  ON questions FOR SELECT
  USING (status = 'approved');

-- ── 2. Admin policy on tutor_profiles ────────────────────────────────────────
-- Admins need to read tutor document URLs and update verification status

DROP POLICY IF EXISTS "Admins can manage tutor profiles" ON tutor_profiles;
CREATE POLICY "Admins can manage tutor profiles"
  ON tutor_profiles FOR ALL
  USING (is_admin());

-- ── 3. Storage: documents bucket (tutor verification docs) ───────────────────
-- NOTE: Run this manually in Supabase Dashboard > Storage if the bucket
-- doesn't exist yet. The SQL below creates the RLS policies.
-- To create the bucket go to: Storage > New Bucket > Name: "documents" > Private

-- Allow tutors to upload to their own folder
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false,
  5242880, -- 5 MB
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/octet-stream'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Tutors can upload to their own subfolder
DROP POLICY IF EXISTS "Tutors can upload own documents" ON storage.objects;
CREATE POLICY "Tutors can upload own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.uid()::text = (string_to_array(name, '/'))[2]
  );

-- Tutors can read their own documents
DROP POLICY IF EXISTS "Tutors can read own documents" ON storage.objects;
CREATE POLICY "Tutors can read own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (string_to_array(name, '/'))[2]
  );

-- Service role (admin API) can read all documents
DROP POLICY IF EXISTS "Service role can manage documents" ON storage.objects;
CREATE POLICY "Service role can manage documents"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'documents'
    AND auth.role() = 'service_role'
  );

-- ── 4. Storage: question-uploads bucket (student question files) ──────────────
-- This bucket is auto-created by the upload route but we add policies here

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'question-uploads',
  'question-uploads',
  false,
  10485760, -- 10 MB
  ARRAY[
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream'
  ]
) ON CONFLICT (id) DO NOTHING;

-- Students can upload to their own subfolder
DROP POLICY IF EXISTS "Students can upload question files" ON storage.objects;
CREATE POLICY "Students can upload question files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'question-uploads'
    AND auth.uid()::text = (string_to_array(name, '/'))[1]
  );

-- Service role can manage all question uploads
DROP POLICY IF EXISTS "Service role can manage question uploads" ON storage.objects;
CREATE POLICY "Service role can manage question uploads"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'question-uploads'
    AND auth.role() = 'service_role'
  );

-- ── 5. Generate signed URLs for admin document review ─────────────────────────
-- The admin API uses the service-role client to generate signed URLs on the fly.
-- No additional DB changes needed — this is handled in the API route.

-- ── 6. Notifications for question review ─────────────────────────────────────
-- Add new notification types (no schema change needed — type is TEXT)
-- The review-question API route inserts 'question_approved' and 'question_rejected'
-- notifications which are already handled by the notifications table.
