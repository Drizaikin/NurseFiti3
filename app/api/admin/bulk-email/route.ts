import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getFirstName, sendEmail, emailWrapper, type EmailAttachment } from '@/lib/email';
import { convert } from 'html-to-text';

export const dynamic = 'force-dynamic';

type TargetRole = 'student' | 'tutor';

// examFilter is only applicable when targetRole === 'student'
// 'all'    → all students (default)
// 'passed' → students whose exam_date is in the past
// 'active' → students whose exam_date is in the future OR has not been set
type ExamFilter = 'all' | 'passed' | 'active';

const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const BATCH_SIZE = 5;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
]);

function isAllowedAttachment(file: File): boolean {
  return file.type.startsWith('image/') || ALLOWED_ATTACHMENT_TYPES.has(file.type);
}

function renderBulkEmailText(firstName: string, textMessage: string): string {
  return `Dear ${firstName},

${textMessage.trim()}

Warm Regards,

The NurseFiti Team`;
}

function renderBulkEmailHtml(firstName: string, htmlMessage: string): string {
  const content = `
    <tr><td style="padding:32px 36px;">
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1E3535;margin-bottom:16px;">
        Dear ${firstName},
      </p>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.6;">
        ${htmlMessage}
      </div>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1E3535;margin-top:24px;">
        Warm Regards,<br/><br/>
        The NurseFiti Team
      </p>
    </td></tr>
  `;
  return emailWrapper(content);
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: adminProfileData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    const adminProfile = adminProfileData as { role: string } | null;

    if (!adminProfile || adminProfile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const formData = await req.formData();
    const sendMode = String(formData.get('sendMode') ?? 'bulk').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const files = formData.getAll('attachments').filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required.' }, { status: 400 });
    }

    const totalAttachmentBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: 'Attachments must be 20 MB or less in total.' }, { status: 400 });
    }

    const disallowedFile = files.find(file => !isAllowedAttachment(file));
    if (disallowedFile) {
      return NextResponse.json(
        { error: `${disallowedFile.name} is not an allowed attachment type.` },
        { status: 400 }
      );
    }

    const attachments: EmailAttachment[] = await Promise.all(
      files.map(async file => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || 'application/octet-stream',
      }))
    );

    const admin = createAdminClient();

    let profiles: Array<{ id: string; full_name: string | null; email: string | null }> = [];

    if (sendMode === 'specific') {
      // ── Individual mode: send to a specific set of user IDs ───────────────
      const specificIdsRaw = String(formData.get('specificIds') ?? '').trim();
      const specificIds = specificIdsRaw
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      if (specificIds.length === 0) {
        return NextResponse.json({ error: 'No recipients selected.' }, { status: 400 });
      }

      // Validate max recipients for individual mode to avoid abuse
      if (specificIds.length > 200) {
        return NextResponse.json({ error: 'Select at most 200 individual recipients.' }, { status: 400 });
      }

      const { data: profilesData, error: profilesError } = await admin
        .from('profiles')
        .select('id, full_name, email')
        .in('id', specificIds);

      if (profilesError) throw profilesError;
      profiles = (profilesData ?? []) as typeof profiles;

    } else {
      // ── Bulk mode: send to a role group with optional exam-date filter ─────
      const targetRole = formData.get('targetRole');
      const examFilterRaw = String(formData.get('examFilter') ?? 'all').trim();

      if (targetRole !== 'student' && targetRole !== 'tutor') {
        return NextResponse.json({ error: 'Choose students or tutors.' }, { status: 400 });
      }

      const examFilter: ExamFilter = (examFilterRaw === 'passed' || examFilterRaw === 'active')
        ? examFilterRaw
        : 'all';

      const { data: profilesData, error: profilesError } = await admin
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', targetRole as TargetRole)
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;
      profiles = (profilesData ?? []) as typeof profiles;

      // Apply exam-date filter for students only.
      if (targetRole === 'student' && examFilter !== 'all') {
        const profileIds = profiles.map(p => p.id);
        if (profileIds.length > 0) {
          const { data: spData } = await admin
            .from('student_profiles')
            .select('id, exam_date')
            .in('id', profileIds);

          const examDateMap = new Map(
            ((spData ?? []) as Array<{ id: string; exam_date: string | null }>).map(s => [s.id, s.exam_date])
          );

          const now = new Date();

          profiles = profiles.filter(p => {
            const examDateRaw = examDateMap.get(p.id) ?? null;
            if (!examDateRaw) {
              return examFilter === 'active';
            }
            const examTs = new Date(examDateRaw).getTime();
            if (!Number.isFinite(examTs)) {
              return examFilter === 'active';
            }
            const hasPassed = examTs <= now.getTime();
            return examFilter === 'passed' ? hasPassed : !hasPassed;
          });
        }
      }
    }

    const validRecipients = profiles.filter(
      (p): p is { id: string; full_name: string | null; email: string } => Boolean(p.email)
    );

    const skipped = profiles.length - validRecipients.length;

    if (validRecipients.length === 0) {
      return NextResponse.json({ sent: 0, failed: 0, skipped, total: profiles.length, failures: [] });
    }

    let sent = 0;
    const failures: Array<{ email: string; reason: string }> = [];

    const plainTextMessage = convert(message, { wordwrap: 130 });

    for (let index = 0; index < validRecipients.length; index += BATCH_SIZE) {
      const batch = validRecipients.slice(index, index + BATCH_SIZE);
      const results = await Promise.all(
        batch.map(async recipient => {
          const firstName = getFirstName(recipient.full_name);
          const result = await sendEmail(
            recipient.email,
            subject,
            renderBulkEmailText(firstName, plainTextMessage),
            attachments,
            renderBulkEmailHtml(firstName, message)
          );
          return { recipient, result };
        })
      );

      for (const { recipient, result } of results) {
        if (result.sent) {
          sent += 1;
        } else {
          failures.push({ email: recipient.email, reason: result.reason });
        }
      }
    }

    return NextResponse.json({
      sent,
      failed: failures.length,
      skipped,
      total: profiles.length,
      failures: failures.slice(0, 20),
    });
  } catch (err) {
    console.error('[admin/bulk-email]', err);
    return NextResponse.json({ error: 'Failed to send bulk email.' }, { status: 500 });
  }
}
