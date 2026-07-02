const nodemailer = require('nodemailer') as {
  createTransport: (options: Record<string, unknown>) => {
    sendMail: (message: {
      from: string;
      to: string;
      replyTo?: string;
      subject: string;
      text: string;
      html: string;
      attachments?: EmailAttachment[];
    }) => Promise<unknown>;
  };
};

type MailResult = { sent: true } | { sent: false; reason: string };

export type EmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

type SubscriptionEmailParams = {
  to: string | null | undefined;
  firstName: string;
  planName: string;
  amount: string;
  startDate: string;
  endDate: string;
  transactionId: string;
};

type WelcomeEmailParams = {
  to: string | null | undefined;
  firstName: string;
};

type SessionEmailParams = {
  studentEmail: string | null | undefined;
  tutorEmail: string | null | undefined;
  studentName: string;
  tutorName: string;
  subject: string;
  sessionDate: string;
  sessionTime: string;
  duration: string;
  meetingLink: string;
  bookingId: string;
};

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nursefiti.co.ke').replace(/\/$/, '');
}

function getSupportEmail(): string {
  return process.env.SMTP_USER ?? 'danotyanga@gmail.com';
}

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '');

  if (!host || !user || !pass) {
    throw new Error('SMTP email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.');
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

function getFromAddress(): string {
  return process.env.PAYMENT_EMAIL_FROM ?? `NurseFiti <${getSupportEmail()}>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderHtml(title: string, body: string): string {
  const paragraphs = body
    .split('\n\n')
    .map(part => {
      if (part.includes('✓') || part.includes('- ')) {
        const items = part.split('\n').map(item => {
          const content = item.replace(/^(✓|-)\s*/, '');
          return `<li style="margin-bottom: 8px;">${escapeHtml(content)}</li>`;
        }).join('');
        return `<ul style="padding-left: 20px; margin: 16px 0; color: #334155;">${items}</ul>`;
      }
      
      if (part.endsWith('Details') || part.endsWith('Information') || part === 'Great news!' || part === 'Congratulations!') {
        return `<h3 style="color: #0f172a; font-size: 18px; margin: 24px 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">${escapeHtml(part)}</h3>`;
      }

      return `<p style="margin: 0 0 16px;">${escapeHtml(part).replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  const parsedParagraphs = paragraphs.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" style="color: #0f766e; text-decoration: none; font-weight: 600;">$1</a>'
  );

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; -webkit-font-smoothing: antialiased;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; width: 100%; margin: 0; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
            <!-- Hero Image -->
            <tr>
              <td>
                <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=600&auto=format&fit=crop" alt="Medical Banner" width="100%" style="display: block; width: 100%; height: 180px; object-fit: cover;" />
              </td>
            </tr>
            <!-- Header Title -->
            <tr>
              <td style="background-color: #0f766e; padding: 24px 40px; text-align: center;">
                <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; letter-spacing: -0.5px;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <!-- Body Content -->
            <tr>
              <td style="padding: 40px;">
                <div style="font-size: 16px; line-height: 1.6; color: #475569;">
                  ${parsedParagraphs}
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #64748b; font-weight: 600;">NurseFiti - NCK Exam Preparation</p>
                <p style="margin: 0 0 16px; font-size: 12px; color: #94a3b8;">Empowering nursing students across Kenya to learn smarter and achieve excellence.</p>
                <div style="margin: 0;">
                  <a href="https://www.nursefiti.co.ke" style="color: #0f766e; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 8px;">Visit Website</a>
                  <span style="color: #cbd5e1;">|</span>
                  <a href="mailto:danotyanga@gmail.com" style="color: #0f766e; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 8px;">Contact Support</a>
                </div>
              </td>
            </tr>
          </table>
          <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px;">
            &copy; ${new Date().getFullYear()} NurseFiti. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendEmail(
  to: string | null | undefined,
  subject: string,
  text: string,
  attachments?: EmailAttachment[]
): Promise<MailResult> {
  if (!to) return { sent: false, reason: 'Missing recipient email' };

  try {
    await getTransporter().sendMail({
      from: getFromAddress(),
      to,
      replyTo: getSupportEmail(),
      subject,
      text,
      html: renderHtml(subject, text),
      attachments,
    });

    return { sent: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[email] Failed to send email:', reason);
    return { sent: false, reason };
  }
}

export function getFirstName(fullName: string | null | undefined, fallback = 'there'): string {
  return fullName?.trim().split(/\s+/)[0] || fallback;
}

export function formatEmailDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatEmailDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatSessionTime(startTime: string | null | undefined, endTime: string | null | undefined): string {
  const start = startTime?.slice(0, 5) ?? 'TBC';
  const end = endTime?.slice(0, 5);
  return end ? `${start} - ${end}` : start;
}

export function formatSessionDuration(startTime: string | null | undefined, endTime: string | null | undefined): string {
  if (!startTime || !endTime) return 'TBC';

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  if (
    startHours === undefined || startMinutes === undefined ||
    endHours === undefined || endMinutes === undefined ||
    Number.isNaN(startHours) || Number.isNaN(startMinutes) ||
    Number.isNaN(endHours) || Number.isNaN(endMinutes)
  ) {
    return 'TBC';
  }

  const minutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  if (minutes <= 0) return 'TBC';
  if (minutes < 60) return `${minutes} minutes`;

  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} hour${hours === 1 ? '' : 's'}` : `${minutes} minutes`;
}

export async function sendWelcomeEmail(params: WelcomeEmailParams): Promise<MailResult> {
  const loginUrl = `${getSiteUrl()}/login`;
  const supportEmail = getSupportEmail();
  const text = `Dear ${params.firstName},

Welcome to NurseFiti!

We're excited to have you join thousands of nursing students preparing smarter, studying faster, and improving their chances of success.

With NurseFiti, you can:

✓ Access AI-powered nursing assistance
✓ Practice with exam-focused materials
✓ Book one-on-one tutor sessions
✓ Learn anytime, anywhere
✓ Track your learning progress

Your account has been successfully created and is ready to use.

Start exploring today and take the next step toward academic excellence.

Login here:
${loginUrl}

If you ever need assistance, our support team is ready to help.

Thank you for choosing NurseFiti.

Helping Nursing Students Learn Smarter.

Warm Regards,

The NurseFiti Team

${supportEmail}`;

  return sendEmail(params.to, 'Welcome to NurseFiti', text);
}

export async function sendSubscriptionConfirmationEmail(params: SubscriptionEmailParams): Promise<MailResult> {
  const dashboardUrl = `${getSiteUrl()}/dashboard`;
  const supportEmail = getSupportEmail();
  const text = `Dear ${params.firstName},

Thank you for your payment.

Your NurseFiti subscription has been successfully activated.

Subscription Details

Plan: ${params.planName}

Amount Paid: ${params.amount}

Activation Date: ${params.startDate}

Expiry Date: ${params.endDate}

Transaction Reference: ${params.transactionId}

You now have access to all features included in your plan.

Access your account:
${dashboardUrl}

Need help?

Contact us anytime at:
${supportEmail}

Thank you for trusting NurseFiti as your learning partner.

We wish you success in your nursing studies.

Warm Regards,

The NurseFiti Team`;

  return sendEmail(params.to, 'Your NurseFiti subscription is active', text);
}

export async function sendSessionBookingEmails(params: SessionEmailParams): Promise<MailResult[]> {
  const studentText = `Dear ${params.studentName},

Great news!

Your tutor session has been successfully booked and confirmed.

Session Details

Tutor: ${params.tutorName}

Subject: ${params.subject}

Date: ${params.sessionDate}

Time: ${params.sessionTime}

Duration: ${params.duration}

Meeting Link: ${params.meetingLink}

Booking Reference: ${params.bookingId}

Please join the session a few minutes before the scheduled time.

If you need to reschedule, kindly do so before the permitted deadline.

We look forward to helping you achieve your learning goals.

Warm Regards,

The NurseFiti Team`;

  const tutorText = `Hello ${params.tutorName},

A new tutoring session has been booked and payment has been successfully confirmed.

Student Information

Student Name: ${params.studentName}

Subject: ${params.subject}

Session Date: ${params.sessionDate}

Session Time: ${params.sessionTime}

Duration: ${params.duration}

Booking ID: ${params.bookingId}

Please prepare accordingly and ensure you join the session on time.

View Booking:
${getSiteUrl()}/tutor-dashboard

Thank you for being part of NurseFiti and helping students succeed.

Best Regards,

NurseFiti Tutor Management Team`;

  return Promise.all([
    sendEmail(params.studentEmail, 'Your NurseFiti tutor session is confirmed', studentText),
    sendEmail(params.tutorEmail, 'New NurseFiti tutoring session booked', tutorText),
  ]);
}

export async function sendSessionReminderEmail(params: SessionEmailParams, timeUntil: string): Promise<MailResult[]> {
  const studentText = `Dear ${params.studentName},

This is a reminder that your tutor session is starting in ${timeUntil}.

Session Details

Tutor: ${params.tutorName}

Subject: ${params.subject}

Date: ${params.sessionDate}

Time: ${params.sessionTime}

Duration: ${params.duration}

Meeting Link: ${params.meetingLink}

Please ensure you are in a quiet environment with a stable internet connection.

Join the session a few minutes early using the meeting link above.

We wish you a productive session!

Warm Regards,

The NurseFiti Team`;

  const tutorText = `Hello ${params.tutorName},

This is a reminder that your tutoring session with ${params.studentName} is starting in ${timeUntil}.

Session Details

Subject: ${params.subject}

Date: ${params.sessionDate}

Time: ${params.sessionTime}

Duration: ${params.duration}

Meeting Link: ${params.meetingLink}

Please ensure you join the meeting link promptly. 

Thank you for your dedication to our students.

Best Regards,

NurseFiti Tutor Management Team`;

  return Promise.all([
    sendEmail(params.studentEmail, `Reminder: Your NurseFiti session is starting in ${timeUntil}`, studentText),
    sendEmail(params.tutorEmail, `Reminder: Tutoring session starting in ${timeUntil}`, tutorText),
  ]);
}

export type ScholarshipWelcomeEmailParams = {
  to: string | null | undefined;
  firstName: string;
  campaignName: string;
  sponsorName: string;
  beneficiaryType: string;
};

export async function sendScholarshipWelcomeEmail(params: ScholarshipWelcomeEmailParams): Promise<MailResult> {
  const dashboardUrl = `${getSiteUrl()}/dashboard`;
  const supportEmail = getSupportEmail();
  const scholarshipType = params.beneficiaryType === 'FULL' ? 'Full Premium Access' : 'Subsidized Premium Access';
  const text = `Dear ${params.firstName},

Congratulations!

You have been selected as a beneficiary of the ${params.campaignName}.

This scholarship has been proudly sponsored by ${params.sponsorName}.

Your NurseFiti account has been successfully upgraded with ${scholarshipType} for 90 days.

You now have access to our AI features, mock exams, and premium practice materials to help you prepare smarter and succeed in your exams.

Start your preparation now:
${dashboardUrl}

If you have any questions, our support team is ready to help at:
${supportEmail}

We wish you immense success in your nursing journey.

Warm Regards,

The NurseFiti Team`;

  return sendEmail(params.to, `Welcome to the ${params.campaignName} Scholarship!`, text);
}
