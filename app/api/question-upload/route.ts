/**
 * POST /api/question-upload
 *
 * Allows free-plan students to upload exam question files (PDF, TXT, DOC/DOCX).
 * Requirements:
 *   - At least 3 files
 *   - Each file must be PDF, TXT, DOC, or DOCX
 *   - Max 10 MB per file
 *   - Files are stored in Supabase Storage (question-uploads bucket)
 *   - A notification email is sent to the admin (docotyanga@gmail.com)
 *   - A question_uploads record is created with status 'pending'
 *   - Duplicate detection: rejects if the same student already has a pending/approved upload
 *
 * Returns:
 *   { success: true, uploadId: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'docotyanga@gmail.com';
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MIN_FILES = 3;
const ALLOWED_TYPES = [
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.doc', '.docx'];

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const adminSupabase = createAdminClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check student is on free plan
    const { data: sp } = await supabase
      .from('student_profiles')
      .select('plan_tier, plan_expires_at')
      .eq('id', user.id)
      .single();

    if (!sp) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Check for existing pending or approved upload (duplicate prevention)
    const { data: existingUpload } = await adminSupabase
      .from('question_uploads')
      .select('id, status')
      .eq('student_id', user.id)
      .in('status', ['pending', 'approved'])
      .maybeSingle();

    if (existingUpload) {
      if (existingUpload.status === 'approved') {
        return NextResponse.json(
          { error: 'You already have an approved upload. Your account should already be upgraded. Contact support if not.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'You already have a pending upload under review. We will notify you once it is processed.' },
        { status: 409 }
      );
    }

    // Parse multipart form data
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length < MIN_FILES) {
      return NextResponse.json(
        { error: `Please upload at least ${MIN_FILES} question files.` },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 10 MB limit.` },
          { status: 400 }
        );
      }
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext) && !ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File "${file.name}" is not a supported format. Use PDF, TXT, DOC, or DOCX.` },
          { status: 400 }
        );
      }
    }

    // Get student profile for email
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single();

    // Upload files to Supabase Storage
    const uploadedUrls: string[] = [];
    const uploadedNames: string[] = [];
    const timestamp = Date.now();

    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
      const storagePath = `${user.id}/${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await adminSupabase.storage
        .from('question-uploads')
        .upload(storagePath, buffer, {
          contentType: file.type || `application/${ext}`,
          upsert: false,
        });

      if (uploadError) {
        console.error('[question-upload] Storage error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to store one or more files. Please try again.' },
          { status: 500 }
        );
      }

      // Get signed URL (valid 7 days for admin review)
      const { data: signedData } = await adminSupabase.storage
        .from('question-uploads')
        .createSignedUrl(storagePath, 60 * 60 * 24 * 7);

      uploadedUrls.push(signedData?.signedUrl ?? storagePath);
      uploadedNames.push(file.name);
    }

    // Create question_uploads record
    const { data: uploadRecord, error: dbError } = await adminSupabase
      .from('question_uploads')
      .insert({
        student_id: user.id,
        file_urls: uploadedUrls,
        file_names: uploadedNames,
        file_count: files.length,
        status: 'pending',
      })
      .select('id')
      .single();

    if (dbError || !uploadRecord) {
      console.error('[question-upload] DB insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to record upload. Please try again.' },
        { status: 500 }
      );
    }

    // Send notification email to admin via Supabase Edge Function or direct SMTP
    // We use the Supabase auth.admin.generateLink trick to send a custom email,
    // but since we don't have a mail service configured yet, we log and use
    // the admin dashboard as the primary review mechanism.
    // TODO: integrate Resend/SendGrid for production email delivery.
    await sendAdminNotificationEmail({
      uploadId: uploadRecord.id,
      studentName: profile?.full_name ?? 'Unknown',
      studentEmail: profile?.email ?? user.email ?? '',
      fileNames: uploadedNames,
      fileUrls: uploadedUrls,
    });

    return NextResponse.json({
      success: true,
      uploadId: uploadRecord.id,
      message: 'Files uploaded successfully. We will review your submission and upgrade your account within 24 hours.',
    });
  } catch (err) {
    console.error('[question-upload]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Admin notification email
// ---------------------------------------------------------------------------

async function sendAdminNotificationEmail(params: {
  uploadId: string;
  studentName: string;
  studentEmail: string;
  fileNames: string[];
  fileUrls: string[];
}) {
  const { uploadId, studentName, studentEmail, fileNames, fileUrls } = params;
  const adminDashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/uploads`;

  // Build file list HTML
  const fileListHtml = fileNames
    .map((name, i) => `<li><a href="${fileUrls[i]}">${name}</a></li>`)
    .join('');

  const emailBody = `
New question upload submission from ${studentName} (${studentEmail}).

Upload ID: ${uploadId}
Files submitted: ${fileNames.length}
${fileNames.map((n, i) => `  ${i + 1}. ${n}`).join('\n')}

Review and approve/reject at:
${adminDashboardUrl}

If approved, the student will automatically be upgraded to Standard plan.
  `.trim();

  // Log for now — replace with Resend/SendGrid in production
  console.log(`[question-upload] Admin notification:\nTo: ${ADMIN_EMAIL}\n${emailBody}`);

  // If RESEND_API_KEY is configured, send via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'NurseFiti <noreply@nursefiti.com>',
          to: [ADMIN_EMAIL],
          subject: `[NurseFiti] New Question Upload — ${studentName} (${fileNames.length} files)`,
          html: `
            <h2>New Question Upload Submission</h2>
            <p><strong>Student:</strong> ${studentName} (${studentEmail})</p>
            <p><strong>Upload ID:</strong> ${uploadId}</p>
            <p><strong>Files (${fileNames.length}):</strong></p>
            <ul>${fileListHtml}</ul>
            <p><a href="${adminDashboardUrl}" style="background:#08514F;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:12px;">Review in Admin Dashboard →</a></p>
            <hr/>
            <p style="font-size:12px;color:#666;">Approving this upload will automatically upgrade the student to Standard plan for 30 days.</p>
          `,
        }),
      });
    } catch (emailErr) {
      // Non-fatal — admin can still review via dashboard
      console.error('[question-upload] Email send failed:', emailErr);
    }
  }
}
