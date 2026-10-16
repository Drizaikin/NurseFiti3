/**
 * POST /api/hd-materials/upload
 *
 * Tutors upload a Higher Diploma study material file.
 * Accepts multipart/form-data:
 *   - file      : File (PDF / DOCX / PPTX, max 50 MB)
 *   - title     : string
 *   - description : string (optional)
 *   - specialty : 'Critical Care' | 'Oncology' | 'Renal Nursing' | 'Perioperative' | 'Psychiatric'
 *
 * Returns: { material_id: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const VALID_SPECIALTIES = [
  'Critical Care',
  'Oncology',
  'Renal Nursing',
  'Perioperative',
  'Psychiatric',
];

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Role check — tutor only
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single() as any;

    if (profile?.role !== 'tutor') {
      return NextResponse.json({ error: 'Only tutors can upload materials.' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type') || '';
    const admin = createAdminClient();

    // Branch 1: JSON payload (get-upload-url OR save-record after direct storage upload)
    if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}));
      const action = body?.action;

      if (action === 'get-upload-url') {
        const fileName = String(body?.fileName ?? '').trim();
        const fileSize = Number(body?.fileSize ?? 0);
        const fileType = String(body?.fileType ?? 'application/octet-stream');
        const title = String(body?.title ?? '').trim();
        const specialty = String(body?.specialty ?? '').trim();

        if (!fileName) return NextResponse.json({ error: 'fileName is required.' }, { status: 400 });
        if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
        if (!specialty || !VALID_SPECIALTIES.includes(specialty)) {
          return NextResponse.json({ error: `Specialty must be one of: ${VALID_SPECIALTIES.join(', ')}` }, { status: 400 });
        }
        if (!ALLOWED_TYPES.includes(fileType) && !fileName.match(/\.(pdf|doc|docx|ppt|pptx)$/i)) {
          return NextResponse.json({ error: 'Unsupported file type. Please upload PDF, Word, or PowerPoint files.' }, { status: 400 });
        }
        if (fileSize > MAX_SIZE_BYTES) {
          return NextResponse.json({ error: 'File too large. Maximum size is 50 MB.' }, { status: 400 });
        }

        const fileId = crypto.randomUUID();
        const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `${user.id}/${fileId}/${safeName}`;

        const { data: signData, error: signError } = await admin.storage
          .from('hd-materials')
          .createSignedUploadUrl(filePath);

        if (signError || !signData) {
          console.error('[hd-materials/upload-url]', signError);
          return NextResponse.json({ error: 'Failed to create signed upload URL.' }, { status: 500 });
        }

        return NextResponse.json({
          signedUrl: signData.signedUrl,
          token: signData.token,
          path: signData.path,
          filePath,
        });
      }

      if (action === 'save-record' || body?.filePath) {
        const filePath = String(body?.filePath ?? '').trim();
        const fileName = String(body?.fileName ?? '').trim();
        const fileSize = Number(body?.fileSize ?? 0);
        const fileType = String(body?.fileType ?? 'application/octet-stream');
        const title = String(body?.title ?? '').trim();
        const description = String(body?.description ?? '').trim();
        const specialty = String(body?.specialty ?? '').trim();

        if (!filePath) return NextResponse.json({ error: 'filePath is required.' }, { status: 400 });
        if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 });

        const { data: material, error: dbError } = await (admin as any)
          .from('hd_materials')
          .insert({
            tutor_id: user.id,
            title,
            description: description || null,
            specialty,
            file_path: filePath,
            file_name: fileName,
            file_size_bytes: fileSize,
            file_type: fileType,
            status: 'pending',
          })
          .select('id')
          .single() as any;

        if (dbError) {
          console.error('[hd-materials/save-record]', dbError);
          await admin.storage.from('hd-materials').remove([filePath]);
          return NextResponse.json({ error: 'Failed to save material record.' }, { status: 500 });
        }

        return NextResponse.json({ material_id: material.id });
      }
    }

    // Branch 2: Fallback for multipart form data (< 4.5MB)
    const formData = await req.formData();
    const file      = formData.get('file') as File | null;
    const title     = (formData.get('title') as string | null)?.trim();
    const description = (formData.get('description') as string | null)?.trim() ?? '';
    const specialty = (formData.get('specialty') as string | null)?.trim();

    // Validate required fields
    if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    if (!specialty || !VALID_SPECIALTIES.includes(specialty)) {
      return NextResponse.json(
        { error: `Specialty must be one of: ${VALID_SPECIALTIES.join(', ')}` },
        { status: 400 }
      );
    }
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|ppt|pptx)$/i)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, Word, or PowerPoint files.' },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50 MB.' }, { status: 400 });
    }

    // Build storage path: hd-materials/<tutor_id>/<random>/<filename>
    const fileId    = crypto.randomUUID();
    const safeName  = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath  = `${user.id}/${fileId}/${safeName}`;

    // Upload to storage using admin client (bypasses user-level storage RLS issues)
    const fileBytes = await file.arrayBuffer();

    const { error: storageError } = await admin.storage
      .from('hd-materials')
      .upload(filePath, fileBytes, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (storageError) {
      console.error('[hd-materials/upload] Storage error:', storageError);
      return NextResponse.json({ error: 'Failed to upload file. Please try again.' }, { status: 500 });
    }

    // Insert metadata record
    const { data: material, error: dbError } = await (admin as any)
      .from('hd_materials')
      .insert({
        tutor_id:        user.id,
        title,
        description:     description || null,
        specialty,
        file_path:       filePath,
        file_name:       file.name,
        file_size_bytes: file.size,
        file_type:       file.type || 'application/octet-stream',
        status:          'pending',
      })
      .select('id')
      .single() as any;

    if (dbError) {
      console.error('[hd-materials/upload] DB error:', dbError);
      // Clean up storage if DB insert fails
      await admin.storage.from('hd-materials').remove([filePath]);
      return NextResponse.json({ error: 'Failed to save material record.' }, { status: 500 });
    }

    return NextResponse.json({ material_id: material.id });
  } catch (err) {
    console.error('[hd-materials/upload]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
