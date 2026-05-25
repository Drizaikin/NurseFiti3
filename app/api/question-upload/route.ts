/**
 * POST /api/question-upload
 *
 * Allows free-plan students to upload exam question files (PDF, TXT, DOC/DOCX).
 * Requirements:
 *   - At least 3 files
 *   - Each file must be PDF, TXT, DOC, or DOCX
 *   - Max 10 MB per file
 *   - Files are stored in Supabase Storage (question-uploads bucket, auto-created if missing)
 *   - A notification email is sent to the admin (docotyanga@gmail.com)
 *   - A question_uploads record is created with status 'pending'
 *   - Duplicate detection: rejects if the same student already has a pending/approved upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'docotyanga@gmail.com';
const BUCKET_NAME = 'question-uploads';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MIN_FILES = 3;
const ALLOWED_EXTENSIONS = ['pdf', 'txt', 'doc', 'docx'];

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const adminSupabase = createAdminClient();

    // ── Auth check ────────────────────────────────────────────────────────
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── Duplicate prevention ──────────────────────────────────────────────
    const { data: existingUpload } = await adminSupabase
      .from('question_uploads')
      .select('id, status')
      .eq('student_id', user.id)
      .in('status', ['pending', 'approved'])
      .maybeSingle();

    if (existingUpload) {
      const msg = existingUpload.status === 'approved'
        ? 'You already have an approved upload. Your account should already be upgraded. Contact support if not.'
        : 'You already have a pending upload under review. We will notify you once it is processed.';
      return NextResponse.json({ error: msg }, { status: 409 });
    }

    // ── Parse multipart form data ─────────────────────────────────────────
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length < MIN_FILES) {
      return NextResponse.json(
        { error: `Please upload at least ${MIN_FILES} question files.` },
        { status: 400 }
      );
    }

    // ── Validate files ────────────────────────────────────────────────────
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 10 MB limit.` },
          { status: 400 }
        );
      }
      // Use extension as primary check — mobile browsers often send empty MIME type
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { error: `File "${file.name}" is not supported. Use PDF, TXT, DOC, or DOCX.` },
          { status: 400 }
        );
      }
    }

    // ── Get student profile for email ─────────────────────────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single();

    // ── Ensure storage bucket exists ──────────────────────────────────────
    // Auto-creates the bucket if it was never created in the dashboard.
    const { data: buckets } = await adminSupabase.storage.listBuckets();
    const bucketExists = (buckets ?? []).some(b => b.name === BUCKET_NAME);
    if (!bucketExists) {
      const { error: bucketError } = await adminSupabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: MAX_FILE_SIZE_BYTES,
        allowedMimeTypes: [
          'application/pdf',
          'text/plain',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/octet-stream', // fallback for some mobile browsers
        ],
      });
      if (bucketError) {
        // Non-fatal — log and continue; upload attempt will reveal the real error
        console.warn('[question-upload] Could not create bucket:', bucketError.message);
      }
    }

    // ── Upload files to Supabase Storage ──────────────────────────────────
    const uploadedUrls: string[] = [];
    const uploadedNames: string[] = [];
    const storageErrors: string[] = [];
    const timestamp = Date.now();

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `${user.id}/${timestamp}_${safeName}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Determine content type — fall back to extension-based type if browser sent empty
      const contentTypeMap: Record<string, string> = {
        pdf:  'application/pdf',
        txt:  'text/plain',
        doc:  'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      const contentType = (file.type && file.type !== 'application/octet-stream')
        ? file.type
        : (contentTypeMap[ext] ?? 'application/octet-stream');

      const { error: uploadError } = await adminSupabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, buffer, { contentType, upsert: false });

      if (uploadError) {
        console.error('[question-upload] Storage error for', file.name, ':', uploadError.message);
        storageErrors.push(file.name);
        // Store filename as placeholder so the record is still created
        uploadedUrls.push(`[storage-error] ${file.name}`);
        uploadedNames.push(file.name);
        continue;
      }

      // Generate a signed URL valid for 30 days for admin review
      const { data: signedData } = await adminSupabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(storagePath, 60 * 60 * 24 * 30);

      uploadedUrls.push(signedData?.signedUrl ?? `[no-url] ${storagePath}`);
      uploadedNames.push(file.name);
    }

    // If ALL files failed to store, return an error with a helpful message
    if (storageErrors.length === files.length) {
      return NextResponse.json(
        {
          error: 'Could not store your files. This usually means the storage bucket is not set up yet. ' +
                 'Please contact support at docotyanga@gmail.com and attach your files directly.',
        },
        { status: 500 }
      );
    }

    // ── Create question_uploads record ────────────────────────────────────
    const { data: uploadRecord, error: dbError } = await adminSupabase
      .from('question_uploads')
      .insert({
        student_id: user.id,
        file_urls:  uploadedUrls,
        file_names: uploadedNames,
        file_count: files.length,
        status:     'pending',
        admin_note: storageErrors.length > 0
          ? `Storage failed for: ${storageErrors.join(', ')}. Files may need to be re-requested.`
          : null,
      })
      .select('id')
      .single();

    if (dbError || !uploadRecord) {
      console.error('[question-upload] DB insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to record your upload. Please try again.' },
        { status: 500 }
      );
    }

    // ── Send admin notification email ─────────────────────────────────────
    await sendAdminNotificationEmail({
      uploadId:     uploadRecord.id,
      studentName:  profile?.full_name ?? 'Unknown',
      studentEmail: profile?.email ?? user.email ?? '',
      fileNames:    uploadedNames,
      fileUrls:     uploadedUrls,
      hasStorageErrors: storageErrors.length > 0,
    });

    const partialWarning = storageErrors.length > 0
      ? ` Note: ${storageErrors.length} file(s) could not be stored — the admin has been notified and may contact you.`
      : '';

    return NextResponse.json({
      success:  true,
      uploadId: uploadRecord.id,
      message:  `Files submitted successfully.${partialWarning} We will review your submission and upgrade your account within 24 hours.`,
    });

  } catch (err) {
    console.error('[question-upload] Unexpected error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}

// ── Admin notification email ──────────────────────────────────────────────────

async function sendAdminNotificationEmail(params: {
  uploadId: string;
  studentName: string;
  studentEmail: string;
  fileNames: string[];
  fileUrls: string[];
  hasStorageErrors: boolean;
}) {
  const { uploadId, studentName, studentEmail, fileNames, fileUrls, hasStorageErrors } = params;
  const adminDashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/uploads`;

  const fileListHtml = fileNames
    .map((name, i) => `<li>${fileUrls[i].startsWith('[') ? `${name} (storage error — request from student)` : `<a href="${fileUrls[i]}">${name}</a>`}</li>`)
    .join('');

  console.log(
    `[question-upload] New upload from ${studentName} (${studentEmail})\n` +
    `Upload ID: ${uploadId}\nFiles: ${fileNames.join(', ')}\n` +
    `Review at: ${adminDashboardUrl}` +
    (hasStorageErrors ? '\n⚠ Some files had storage errors.' : '')
  );

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NurseFiti <noreply@nursefiti.com>',
        to:   [ADMIN_EMAIL],
        subject: `[NurseFiti] New Question Upload — ${studentName} (${fileNames.length} files)${hasStorageErrors ? ' ⚠ Storage Error' : ''}`,
        html: `
          <h2>New Question Upload Submission</h2>
          ${hasStorageErrors ? '<p style="color:red;font-weight:bold;">⚠ Some files had storage errors. You may need to request them from the student.</p>' : ''}
          <p><strong>Student:</strong> ${studentName} (${studentEmail})</p>
          <p><strong>Upload ID:</strong> ${uploadId}</p>
          <p><strong>Files (${fileNames.length}):</strong></p>
          <ul>${fileListHtml}</ul>
          <p>
            <a href="${adminDashboardUrl}"
               style="background:#08514F;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:12px;">
              Review in Admin Dashboard →
            </a>
          </p>
          <hr/>
          <p style="font-size:12px;color:#666;">Approving this upload will automatically upgrade the student to Standard plan for 30 days.</p>
        `,
      }),
    });
  } catch (emailErr) {
    console.error('[question-upload] Email send failed:', emailErr);
  }
}
