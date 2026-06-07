const nodemailer = require('nodemailer') as {
  createTransport: (options: Record<string, unknown>) => {
    sendMail: (message: {
      from: string;
      to: string;
      replyTo?: string;
      subject: string;
      text: string;
      html: string;
    }) => Promise<unknown>;
  };
};

type MailResult = { sent: true } | { sent: false; reason: string };

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
    .map(part => `<p>${escapeHtml(part).replace(/\n/g, '<br />')}</p>`)
    .join('\n');

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f7fbfa;font-family:Arial,sans-serif;color:#053b36;">
    <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #d6e7e4;border-radius:12px;padding:28px;">
        <h1 style="margin:0 0 20px;font-size:24px;color:#035c55;">${escapeHtml(title)}</h1>
        <div style="font-size:15px;line-height:1.65;color:#153f3b;">${paragraphs}</div>
      </div>
    </div>
  </body>
</html>`;
}

async function sendEmail(to: string | null | undefined, subject: string, text: string): Promise<MailResult> {
  if (!to) return { sent: false, reason: 'Missing recipient email' };

  try {
    await getTransporter().sendMail({
      from: getFromAddress(),
      to,
      replyTo: getSupportEmail(),
      subject,
      text,
      html: renderHtml(subject, text),
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
