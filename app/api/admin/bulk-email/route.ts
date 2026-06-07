import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getFirstName, sendEmail, type EmailAttachment } from '@/lib/email';

export const dynamic = 'force-dynamic';

type TargetRole = 'student' | 'tutor';

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

function renderBulkEmail(firstName: string, message: string): string {
  return `Dear ${firstName},

${message.trim()}

Warm Regards,

The NurseFiti Team`;
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
    const targetRole = formData.get('targetRole');
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const files = formData.getAll('attachments').filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (targetRole !== 'student' && targetRole !== 'tutor') {
      return NextResponse.json({ error: 'Choose students or tutors.' }, { status: 400 });
    }

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
    const { data: recipientsData, error: recipientsError } = await admin
      .from('profiles')
      .select('id, full_name, email')
      .eq('role', targetRole as TargetRole)
      .order('created_at', { ascending: false })
      .limit(500);

    if (recipientsError) throw recipientsError;

    const recipients = (recipientsData ?? []) as Array<{ id: string; full_name: string | null; email: string | null }>;
    const validRecipients = recipients.filter((profile): profile is { id: string; full_name: string | null; email: string } => Boolean(profile.email));
    if (validRecipients.length === 0) {
      return NextResponse.json({ sent: 0, failed: 0, skipped: 0, total: 0, failures: [] });
    }

    let sent = 0;
    const failures: Array<{ email: string; reason: string }> = [];

    for (let index = 0; index < validRecipients.length; index += BATCH_SIZE) {
      const batch = validRecipients.slice(index, index + BATCH_SIZE);
      const results = await Promise.all(
        batch.map(async recipient => {
          const result = await sendEmail(
            recipient.email,
            subject,
            renderBulkEmail(getFirstName(recipient.full_name), message),
            attachments
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
      skipped: recipients.length - validRecipients.length,
      total: recipients.length,
      failures: failures.slice(0, 20),
    });
  } catch (err) {
    console.error('[admin/bulk-email]', err);
    return NextResponse.json({ error: 'Failed to send bulk email.' }, { status: 500 });
  }
}
