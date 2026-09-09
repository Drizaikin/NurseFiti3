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
    pool: true, maxConnections: 3, maxMessages: 100,
    host, port, secure: port === 465, auth: { user, pass },
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

// ─── Shared branded template pieces ──────────────────────────────────────────

// Logo hosted in public/ — public/logo.png served at the site URL
const LOGO_URL = 'https://www.nursefiti.co.ke/logo.png';

function emailHeader(tagline: string): string {
  const siteUrl = getSiteUrl();
  return `<tr>
    <td align="center" style="background-color:#0D2020; padding:0; margin:0;">
      <a href="${siteUrl}" target="_blank" style="text-decoration:none; display:block;">
        <img src="${siteUrl}/images/email-banner.png" alt="NurseFiti - ${escapeHtml(tagline)}" width="600" style="display:block; width:100%; max-width:600px; height:auto; border:0; outline:none; text-decoration:none;" />
      </a>
    </td>
  </tr>
  <tr>
    <td height="16" style="font-size:0; line-height:0; background-color:#ffffff;">&nbsp;</td>
  </tr>`;
}

function emailFooter(siteUrl: string, supportEmail: string): string {
  const year = new Date().getFullYear();
  return `<tr>
    <td style="padding:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td height="4" style="background:linear-gradient(90deg,#F5A623 0%,#F7BC55 60%,rgba(245,166,35,0.05) 100%);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td style="background:#0D1C1C;padding:28px 32px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="40%" style="vertical-align:top;padding-right:12px;">
                  <div style="background:#ffffff;border-radius:7px;padding:6px 14px;display:inline-block;line-height:0;margin-bottom:10px;">
                    <img src="${LOGO_URL}" alt="NurseFiti" width="90" height="27" style="display:block;border:0;" />
                  </div>
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:rgba(255,255,255,0.45);line-height:1.65;max-width:200px;">Empowering Kenyan nurses through quality NCK exam preparation, mock exams, and performance analytics.</div>
                </td>
                <td width="30%" style="vertical-align:top;padding-right:12px;">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#F7BC55;margin-bottom:12px;">Platform</div>
                  <a href="${siteUrl}/questions" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Question Bank</a>
                  <a href="${siteUrl}/mock-exam" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Mock Exams</a>
                  <a href="${siteUrl}/analytics" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Analytics</a>
                  <a href="${siteUrl}/flashcards" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;">Flashcards</a>
                </td>
                <td width="30%" style="vertical-align:top;">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#F7BC55;margin-bottom:12px;">Support</div>
                  <a href="${siteUrl}/help" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Help Centre</a>
                  <a href="https://wa.me/254791952703" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">WhatsApp Support</a>
                  <a href="mailto:${supportEmail}" style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;">${supportEmail}</a>
                </td>
              </tr>
              <tr><td colspan="5" height="1" style="background:rgba(255,255,255,0.08);font-size:0;padding-top:20px;">&nbsp;</td></tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td height="16" style="font-size:0;">&nbsp;</td></tr>
              <tr>
                <td style="vertical-align:middle;text-align:center;">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:10.5px;color:rgba(255,255,255,0.3);line-height:1.5;">&copy; ${year} NurseFiti &middot; Kiambu, Kenya<br/>You received this because you created an account at nursefiti.co.ke</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

export function emailWrapper(bodyRows: string, tagline = 'Preparing Nurses for Success'): string {
  const siteUrl = getSiteUrl();
  const supportEmail = getSupportEmail();
  return `<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="x-apple-disable-message-reformatting"/>
</head>
<body style="margin:0;padding:0;background-color:#E8F4F3;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E8F4F3;">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;">
${emailHeader(tagline)}
${bodyRows}
${emailFooter(siteUrl, supportEmail)}
</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── sendEmail (generic) ──────────────────────────────────────────────────────

export async function sendEmail(
  to: string | null | undefined,
  subject: string,
  text: string,
  attachments?: EmailAttachment[],
  html?: string,
): Promise<MailResult> {
  if (!to) return { sent: false, reason: 'Missing recipient email' };
  try {
    await getTransporter().sendMail({
      from: getFromAddress(),
      to,
      replyTo: getSupportEmail(),
      subject,
      text,
      html: html ?? buildGenericHtml(subject, text),
      attachments,
    });
    return { sent: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown email error';
    console.error('[email] Failed to send email:', reason);
    return { sent: false, reason };
  }
}

function buildGenericHtml(title: string, body: string): string {
  const rows = body.split('\n').map(l =>
    `<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.75;padding:0 0 6px;">${escapeHtml(l) || '&nbsp;'}</td></tr>`
  ).join('');
  return emailWrapper(`<tr><td style="padding:32px 36px;">
    <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#08514F;margin:0 0 18px;">${escapeHtml(title)}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
  </td></tr>`);
}

// ─── Utility exports ──────────────────────────────────────────────────────────

export function getFirstName(fullName: string | null | undefined, fallback = 'there'): string {
  return fullName?.trim().split(/\s+/)[0] || fallback;
}

export function formatEmailDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatEmailDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatSessionTime(startTime: string | null | undefined, endTime: string | null | undefined): string {
  const start = startTime?.slice(0, 5) ?? 'TBC';
  const end = endTime?.slice(0, 5);
  return end ? `${start} - ${end}` : start;
}

export function formatSessionDuration(startTime: string | null | undefined, endTime: string | null | undefined): string {
  if (!startTime || !endTime) return 'TBC';
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  if ([sh, sm, eh, em].some(n => n === undefined || Number.isNaN(n))) return 'TBC';
  const minutes = (eh * 60 + em) - (sh * 60 + sm);
  if (minutes <= 0) return 'TBC';
  if (minutes < 60) return `${minutes} minutes`;
  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} hour${hours === 1 ? '' : 's'}` : `${minutes} minutes`;
}

// ─── Welcome / Onboarding ─────────────────────────────────────────────────────

function buildWelcomeHtml(firstName: string, loginUrl: string): string {
  const n = escapeHtml(firstName);
  const siteUrl = getSiteUrl();
  return emailWrapper(`
<tr><td style="padding:36px 36px 20px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:10px;">Welcome to NurseFiti</div>
  <h1 style="font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:800;color:#08514F;line-height:1.2;margin:0 0 14px;">You&#39;re in, ${n}.<br/>Let&#39;s get you <span style="color:#F5A623;">NCK-ready.</span></h1>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0;">Thousands of Kenyan nurses have used NurseFiti to walk into their NCK examinations prepared and confident. Your journey starts right now.</p>
</td></tr>
<tr><td style="padding:0 36px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:22px 36px 0;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:16px;">What&#39;s Waiting for You</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td width="32%" style="vertical-align:top;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #D0E8E7;border-top:3px solid #08514F;border-radius:10px;background:#F2FAFA;">
          <tr><td style="padding:16px 14px;">
            <div style="font-size:24px;margin-bottom:8px;">&#x1F4DA;</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:5px;">Question Bank</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#4A6868;line-height:1.55;">2,400+ past-paper NCK questions with detailed answers and rationales.</div>
          </td></tr>
        </table>
      </td>
      <td width="2%" style="font-size:0;">&nbsp;</td>
      <td width="32%" style="vertical-align:top;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #D0E8E7;border-top:3px solid #F5A623;border-radius:10px;background:#F2FAFA;">
          <tr><td style="padding:16px 14px;">
            <div style="font-size:24px;margin-bottom:8px;">&#x1F4DD;</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:5px;">Mock Exams</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#4A6868;line-height:1.55;">Timed, full-length mock exams that mirror the real NCK format exactly.</div>
          </td></tr>
        </table>
      </td>
      <td width="2%" style="font-size:0;">&nbsp;</td>
      <td width="32%" style="vertical-align:top;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #D0E8E7;border-top:3px solid #0A6B68;border-radius:10px;background:#F2FAFA;">
          <tr><td style="padding:16px 14px;">
            <div style="font-size:24px;margin-bottom:8px;">&#x1F4CA;</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:5px;">Analytics</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#4A6868;line-height:1.55;">Know exactly which topics to focus on with your personal performance insights.</div>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>
<tr><td style="padding:0 36px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;"><tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:22px 36px 0;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:16px;">Your First 3 Steps</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;"><tr>
    <td width="36" style="vertical-align:top;padding-top:2px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;color:#ffffff;line-height:28px;text-align:center;">1</td></tr></table>
    </td>
    <td style="padding-left:12px;vertical-align:top;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;margin-bottom:3px;">Complete your profile</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#4A6868;line-height:1.6;">Tell us your cadre (BScN, KRCHN, Higher Diploma) and your exam date &mdash; we use this to personalise your revision plan.</div>
    </td>
  </tr></table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;"><tr>
    <td width="36" style="vertical-align:top;padding-top:2px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;color:#ffffff;line-height:28px;text-align:center;">2</td></tr></table>
    </td>
    <td style="padding-left:12px;vertical-align:top;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;margin-bottom:3px;">Run your diagnostic mock</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#4A6868;line-height:1.6;">A short 30-question exam that maps your strengths and weak spots so you study the right things from day one.</div>
    </td>
  </tr></table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;"><tr>
    <td width="36" style="vertical-align:top;padding-top:2px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;color:#ffffff;line-height:28px;text-align:center;">3</td></tr></table>
    </td>
    <td style="padding-left:12px;vertical-align:top;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;margin-bottom:3px;">Build your revision streak</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#4A6868;line-height:1.6;">Even 20 minutes a day compounds fast. Use our spaced-repetition flashcards to lock in your weak areas.</div>
    </td>
  </tr></table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
    <tr><td align="center">
      <a href="${loginUrl}" style="display:block;background:#08514F;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;text-align:center;text-decoration:none;padding:16px 36px;border-radius:8px;border-bottom:3px solid #051F1E;">Go to My Dashboard &rarr;</a>
    </td></tr>
  </table>
</td></tr>
<tr><td style="padding:0 36px 24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:10px;">
    <tr><td style="padding:22px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:6px;">Unlock Everything</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;margin-bottom:6px;line-height:1.3;">Upgrade to Premium</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.75);line-height:1.6;">Unlimited mock exams, full question bank access, and in-depth analytics. Pay once via M-Pesa &mdash; no subscription needed.</div>
        </td>
        <td width="110" style="vertical-align:middle;text-align:right;padding-left:16px;">
          <a href="${siteUrl}/pricing" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;padding:12px 20px;border-radius:8px;text-decoration:none;white-space:nowrap;border-bottom:3px solid #C7841A;">See Plans</a>
        </td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>
<tr><td style="padding:0 36px 20px;">
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#4A6868;line-height:1.75;margin:0;">We&#39;re genuinely glad you&#39;re here, ${n}. If you have any questions about the platform or need help getting started, reply to this email &mdash; a real person will get back to you.</p>
</td></tr>
<tr><td style="padding:0 36px 32px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:0;">
    <tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr>
    <tr><td height="20" style="font-size:0;">&nbsp;</td></tr>
    <tr>
      <td>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="52" style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0"><tr><td width="44" height="44" align="center" valign="middle" style="background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:800;color:#ffffff;line-height:44px;text-align:center;">NF</td></tr></table>
          </td>
          <td style="padding-left:14px;vertical-align:middle;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#4A6868;margin-top:2px;">danotyanga@gmail.com &middot; nursefiti.co.ke</div>
          </td>
        </tr></table>
      </td>
    </tr>
  </table>
</td></tr>`);
}

export async function sendWelcomeEmail(params: WelcomeEmailParams): Promise<MailResult> {
  const loginUrl = `${getSiteUrl()}/login`;
  const text = `Dear ${params.firstName},

Welcome to NurseFiti! Thousands of Kenyan nurses have used NurseFiti to walk into their NCK examinations prepared and confident. Your journey starts right now.

What's waiting for you:
- 2,400+ past-paper NCK questions with detailed answers
- Timed, full-length mock exams mirroring the real NCK format
- Personal analytics showing exactly which topics to focus on

Log in here: ${loginUrl}

Warm Regards,
The NurseFiti Team
danotyanga@gmail.com`;

  return sendEmail(params.to, 'Welcome to NurseFiti — Your journey starts now', text, undefined, buildWelcomeHtml(params.firstName, loginUrl));
}

// ─── Subscription Confirmation ────────────────────────────────────────────────

function detailsTable(rows: Array<[string, string]>): string {
  return rows.map(([label, value]) => `
    <tr>
      <td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#4A6868;padding-bottom:10px;width:140px;">${escapeHtml(label)}</td>
      <td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${escapeHtml(value)}</td>
    </tr>`).join('');
}

function getFeaturesForPlanName(planName: string): string {
  const lower = planName.toLowerCase();
  if (lower.includes('daily')) {
    return 'Unlimited MCQ practice &middot; 2 mock exams (1 download) &middot; Readiness analytics &middot; Spaced-repetition flashcards';
  }
  if (lower.includes('weekly')) {
    return 'Unlimited MCQ practice &middot; 3 mock exams (2 downloads) &middot; Personalized revision plan &middot; Readiness analytics &middot; Flashcards';
  }
  if (lower.includes('success')) {
    return 'Unlimited MCQ practice &middot; 3 mock exams/week (unlimited downloads) &middot; Adaptive revision roadmap &middot; Smarter analytics &middot; Flashcards &middot; Tutor priority';
  }
  return 'Everything in Success Plan &middot; Unlimited mock exams &amp; downloads &middot; Tutor priority &middot; Exam registration reminders';
}

function buildSubscriptionHtml(params: SubscriptionEmailParams, dashboardUrl: string): string {
  const n = escapeHtml(params.firstName);
  const planFeatures = getFeaturesForPlanName(params.planName);
  return emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:10px;">Payment Confirmed</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Your subscription is <span style="color:#F5A623;">active</span>, ${n}.</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 22px;">You now have full access to all features included in your plan. Start studying smarter today.</p>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:12px;">Subscription Details</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${detailsTable([['Plan', params.planName], ['Amount Paid', params.amount], ['Activation Date', params.startDate], ['Expiry Date', params.endDate], ['Transaction Ref', params.transactionId]])}
    </table>
  </div>
  <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">What&#39;s Included</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;line-height:1.65;">${planFeatures}</div>
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
    <tr><td align="center"><a href="${dashboardUrl}" style="display:inline-block;background:#08514F;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">Go to Dashboard &rarr;</a></td></tr>
  </table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
    <tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr>
    <tr><td height="16" style="font-size:0;">&nbsp;</td></tr>
    <tr><td>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="52" style="vertical-align:middle;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="44" height="44" align="center" valign="middle" style="background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:800;color:#ffffff;line-height:44px;text-align:center;">NF</td></tr></table></td>
        <td style="padding-left:14px;vertical-align:middle;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#4A6868;margin-top:2px;">Thank you for trusting NurseFiti as your learning partner.</div>
        </td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>`);
}

export async function sendSubscriptionConfirmationEmail(params: SubscriptionEmailParams): Promise<MailResult> {
  const dashboardUrl = `${getSiteUrl()}/dashboard`;
  const text = `Dear ${params.firstName},

Your NurseFiti subscription is now active.

Plan: ${params.planName}
Amount Paid: ${params.amount}
Activation Date: ${params.startDate}
Expiry Date: ${params.endDate}
Transaction Reference: ${params.transactionId}

Access your account: ${dashboardUrl}

Warm Regards,
The NurseFiti Team`;

  return sendEmail(params.to, 'Your NurseFiti subscription is active', text, undefined, buildSubscriptionHtml(params, dashboardUrl));
}

export async function sendPastPaperApprovalEmail(params: { to: string | null | undefined; firstName: string; planName: string; startDate: string; endDate: string }): Promise<MailResult> {
  const dashboardUrl = `${getSiteUrl()}/dashboard`;
  const text = `Dear ${params.firstName},

Your past-paper upload has been approved.

You have been granted the ${params.planName} paid plan from ${params.startDate} until ${params.endDate}.

Open your dashboard to start using your plan: ${dashboardUrl}

Thank you for contributing to NurseFiti.

Warm regards,
The NurseFiti Team`;
  const html = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:10px;">Past-paper upload approved</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Your ${escapeHtml(params.planName)} plan is active, ${escapeHtml(params.firstName)}.</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 22px;">Thank you for submitting past papers for review. Your upload has been approved and your paid plan is now active.</p>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:24px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:12px;">Plan details</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailsTable([['Plan', params.planName], ['Starts', params.startDate], ['Ends', params.endDate]])}</table>
  </div>
  ${ctaButton(dashboardUrl, 'Open your dashboard', true)}
  ${nfSignature('Thank you for helping strengthen NurseFiti learning resources.')}
</td></tr>`);
  return sendEmail(params.to, 'Your NurseFiti paid plan is active', text, undefined, html);
}

// ─── Session helpers ──────────────────────────────────────────────────────────

function sessionDetailsCard(rows: Array<[string, string]>): string {
  return `<div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:18px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:12px;">Session Details</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailsTable(rows)}</table>
  </div>`;
}

function meetingLinkCard(link: string): string {
  return `<div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Meeting Link</div>
    <a href="${escapeHtml(link)}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#08514F;font-weight:600;word-break:break-all;text-decoration:none;">${escapeHtml(link)}</a>
  </div>`;
}

function nfSignature(subtitle: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
    <tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr>
    <tr><td height="16" style="font-size:0;">&nbsp;</td></tr>
    <tr><td>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="52" style="vertical-align:middle;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="44" height="44" align="center" valign="middle" style="background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:800;color:#ffffff;line-height:44px;text-align:center;">NF</td></tr></table></td>
        <td style="padding-left:14px;vertical-align:middle;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#4A6868;margin-top:2px;">${escapeHtml(subtitle)}</div>
        </td>
      </tr></table>
    </td></tr>
  </table>`;
}

function ctaButton(href: string, label: string, amber = false): string {
  const bg = amber ? '#F5A623' : '#08514F';
  const fg = amber ? '#051F1E' : '#ffffff';
  const border = amber ? '#C7841A' : '#051F1E';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
    <tr><td align="center"><a href="${escapeHtml(href)}" style="display:inline-block;background:${bg};color:${fg};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid ${border};">${escapeHtml(label)} &rarr;</a></td></tr>
  </table>`;
}

// ─── Session Booking ──────────────────────────────────────────────────────────

export async function sendSessionBookingEmails(params: SessionEmailParams): Promise<MailResult[]> {
  const tutorDashboardUrl = `${getSiteUrl()}/tutor-dashboard`;

  const studentHtml = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Session Confirmed</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 12px;">Your session is booked, ${escapeHtml(params.studentName)}! &#x2705;</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.75;margin:0 0 20px;">Your tutor session has been successfully confirmed. Please join a few minutes early.</p>
  ${sessionDetailsCard([['Tutor', params.tutorName], ['Subject', params.subject], ['Date', params.sessionDate], ['Time', params.sessionTime], ['Duration', params.duration], ['Booking Ref', params.bookingId]])}
  ${meetingLinkCard(params.meetingLink)}
  ${ctaButton(params.meetingLink, 'Join Session', true)}
  ${nfSignature('We look forward to helping you achieve your learning goals.')}
</td></tr>`);

  const tutorHtml = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">New Booking</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 12px;">New session booked, ${escapeHtml(params.tutorName)}!</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.75;margin:0 0 20px;">A new tutoring session has been booked and payment confirmed. Please prepare accordingly.</p>
  ${sessionDetailsCard([['Student', params.studentName], ['Subject', params.subject], ['Date', params.sessionDate], ['Time', params.sessionTime], ['Duration', params.duration], ['Booking ID', params.bookingId]])}
  ${ctaButton(tutorDashboardUrl, 'View in Dashboard')}
  ${nfSignature('Thank you for being part of NurseFiti and helping students succeed.')}
</td></tr>`);

  const studentText = `Dear ${params.studentName},\n\nYour tutor session with ${params.tutorName} is confirmed.\n\nSubject: ${params.subject}\nDate: ${params.sessionDate}\nTime: ${params.sessionTime}\nDuration: ${params.duration}\nMeeting Link: ${params.meetingLink}\nBooking Ref: ${params.bookingId}\n\nWarm Regards,\nThe NurseFiti Team`;
  const tutorText = `Hello ${params.tutorName},\n\nA new session has been booked by ${params.studentName}.\n\nSubject: ${params.subject}\nDate: ${params.sessionDate}\nTime: ${params.sessionTime}\nDuration: ${params.duration}\nBooking ID: ${params.bookingId}\n\nBest Regards,\nNurseFiti Tutor Management`;

  return Promise.all([
    sendEmail(params.studentEmail, 'Your NurseFiti tutor session is confirmed', studentText, undefined, studentHtml),
    sendEmail(params.tutorEmail, 'New NurseFiti tutoring session booked', tutorText, undefined, tutorHtml),
  ]);
}

// ─── Session Reminder ─────────────────────────────────────────────────────────

export async function sendSessionReminderEmail(params: SessionEmailParams, timeUntil: string): Promise<MailResult[]> {
  const studentHtml = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Session Reminder</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 12px;">&#x23F0; Your session starts in <span style="color:#F5A623;">${escapeHtml(timeUntil)}</span></h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.75;margin:0 0 20px;">Hi ${escapeHtml(params.studentName)}, your session is coming up. Make sure you&#39;re in a quiet environment with a stable connection.</p>
  ${sessionDetailsCard([['Tutor', params.tutorName], ['Subject', params.subject], ['Date', params.sessionDate], ['Time', params.sessionTime], ['Duration', params.duration]])}
  ${meetingLinkCard(params.meetingLink)}
  ${ctaButton(params.meetingLink, 'Join Now', true)}
  ${nfSignature('We wish you a productive session!')}
</td></tr>`);

  const tutorHtml = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Session Reminder</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 12px;">&#x23F0; Your session starts in <span style="color:#F5A623;">${escapeHtml(timeUntil)}</span></h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.75;margin:0 0 20px;">Hi ${escapeHtml(params.tutorName)}, your session with ${escapeHtml(params.studentName)} is starting soon. Please join on time.</p>
  ${sessionDetailsCard([['Student', params.studentName], ['Subject', params.subject], ['Date', params.sessionDate], ['Time', params.sessionTime], ['Duration', params.duration]])}
  ${meetingLinkCard(params.meetingLink)}
  ${ctaButton(params.meetingLink, 'Join Session')}
  ${nfSignature('Thank you for your dedication to our students.')}
</td></tr>`);

  const studentText = `Dear ${params.studentName},\n\nYour session with ${params.tutorName} starts in ${timeUntil}.\n\nMeeting Link: ${params.meetingLink}\n\nWarm Regards,\nThe NurseFiti Team`;
  const tutorText = `Hello ${params.tutorName},\n\nYour session with ${params.studentName} starts in ${timeUntil}.\n\nMeeting Link: ${params.meetingLink}\n\nBest Regards,\nNurseFiti Tutor Management`;

  return Promise.all([
    sendEmail(params.studentEmail, `Reminder: Your NurseFiti session is starting in ${timeUntil}`, studentText, undefined, studentHtml),
    sendEmail(params.tutorEmail, `Reminder: Tutoring session starting in ${timeUntil}`, tutorText, undefined, tutorHtml),
  ]);
}

// ─── Scholarship Welcome ──────────────────────────────────────────────────────

export type ScholarshipWelcomeEmailParams = {
  to: string | null | undefined;
  firstName: string;
  campaignName: string;
  sponsorName: string;
  beneficiaryType: string;
};

export async function sendScholarshipWelcomeEmail(params: ScholarshipWelcomeEmailParams): Promise<MailResult> {
  const dashboardUrl = `${getSiteUrl()}/dashboard`;
  const scholarshipType = params.beneficiaryType === 'FULL' ? 'Full Premium Access' : 'Subsidized Premium Access';
  const n = escapeHtml(params.firstName);

  const html = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Scholarship Award</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Congratulations, ${n}! &#x1F393;</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 22px;">You have been selected as a beneficiary of the <strong style="color:#08514F;">${escapeHtml(params.campaignName)}</strong>. This is a tremendous opportunity to accelerate your NCK preparation.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:12px;margin-bottom:22px;">
    <tr><td style="padding:22px 24px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:6px;">Scholarship Award</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;margin-bottom:4px;">${escapeHtml(scholarshipType)} &mdash; 90 Days</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.75);">Sponsored by <strong style="color:#F7BC55;">${escapeHtml(params.sponsorName)}</strong></div>
    </td></tr>
  </table>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:22px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:12px;">What You Now Have Access To</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:13px;color:#4A6868;padding-bottom:8px;width:20px;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-bottom:8px;padding-left:8px;">Unlimited mock exams mirroring the real NCK format</td></tr>
      <tr><td style="font-size:13px;color:#4A6868;padding-bottom:8px;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-bottom:8px;padding-left:8px;">Full 2,400+ question bank with detailed rationales</td></tr>
      <tr><td style="font-size:13px;color:#4A6868;padding-bottom:8px;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-bottom:8px;padding-left:8px;">AI-powered nursing tutor assistant</td></tr>
      <tr><td style="font-size:13px;color:#4A6868;padding-bottom:8px;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-bottom:8px;padding-left:8px;">Personal performance analytics &amp; insights</td></tr>
      <tr><td style="font-size:13px;color:#4A6868;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-left:8px;">Spaced-repetition flashcard system</td></tr>
    </table>
  </div>
  ${ctaButton(dashboardUrl, 'Start Studying Now', true)}
  ${nfSignature('We wish you immense success in your nursing journey.')}
</td></tr>`);

  const text = `Dear ${params.firstName},

Congratulations! You have been selected as a beneficiary of the ${params.campaignName}, sponsored by ${params.sponsorName}.

Your account has been upgraded with ${scholarshipType} for 90 days.

Start now: ${dashboardUrl}

Warm Regards,
The NurseFiti Team`;

  return sendEmail(params.to, `Congratulations! You have been awarded the ${params.campaignName} Scholarship`, text, undefined, html);
}

// ─── Tutor Welcome (on signup) ────────────────────────────────────────────────

export type TutorWelcomeEmailParams = {
  to: string | null | undefined;
  firstName: string;
};

export async function sendTutorWelcomeEmail(params: TutorWelcomeEmailParams): Promise<MailResult> {
  const siteUrl = getSiteUrl();
  const n = escapeHtml(params.firstName);

  const html = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Application Received</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Welcome to NurseFiti, ${n}! &#x1F393;</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 22px;">Thank you for applying to join the NurseFiti tutor network. Your application has been received and is currently <strong style="color:#08514F;">under review</strong> by our team.</p>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">What Happens Next</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td width="30" style="vertical-align:top;padding-top:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="22" height="22" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;color:#ffffff;line-height:22px;text-align:center;">1</td></tr></table></td>
        <td style="padding-left:10px;vertical-align:top;padding-bottom:12px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:2px;">Document Verification</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#4A6868;line-height:1.6;">Our admin team will review your NCK certificate, academic qualifications, and national ID.</div>
        </td>
      </tr>
      <tr>
        <td width="30" style="vertical-align:top;padding-top:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="22" height="22" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;color:#ffffff;line-height:22px;text-align:center;">2</td></tr></table></td>
        <td style="padding-left:10px;vertical-align:top;padding-bottom:12px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:2px;">Profile Review</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#4A6868;line-height:1.6;">We verify your professional title, years of experience, and specialties.</div>
        </td>
      </tr>
      <tr>
        <td width="30" style="vertical-align:top;padding-top:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="22" height="22" align="center" valign="middle" style="background:#F5A623;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;color:#051F1E;line-height:22px;text-align:center;">3</td></tr></table></td>
        <td style="padding-left:10px;vertical-align:top;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:2px;">Decision Email</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#4A6868;line-height:1.6;">You will receive an email once a decision is made &mdash; usually within 2&ndash;3 business days.</div>
        </td>
      </tr>
    </table>
  </div>
  <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:22px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">While You Wait</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;line-height:1.65;">You can log in to check your application status at any time. Reply to this email if you need to update your documents.</div>
  </div>
  ${ctaButton(`${siteUrl}/login`, 'Check Application Status')}
  ${nfSignature('Thank you for wanting to be part of our mission.')}
</td></tr>`);

  const text = `Dear ${params.firstName},

Thank you for applying to join the NurseFiti tutor network. Your application is under review.

Steps:
1. Document Verification — NCK certificate, academic qualifications, national ID
2. Profile Review — professional details and specialties
3. Decision Email — usually within 2-3 business days

Check status: ${siteUrl}/login

Warm Regards,
The NurseFiti Team`;

  return sendEmail(params.to, 'Your NurseFiti tutor application has been received', text, undefined, html);
}

// ─── Tutor Verification Decision ─────────────────────────────────────────────

export type TutorVerificationEmailParams = {
  to: string | null | undefined;
  firstName: string;
  status: 'verified' | 'rejected';
  tier?: string;
  reason?: string;
};

export async function sendTutorVerificationEmail(params: TutorVerificationEmailParams): Promise<MailResult> {
  const siteUrl = getSiteUrl();
  const isApproved = params.status === 'verified';
  const tierLabel = params.tier === 'gold' ? 'Gold Tier' : 'Standard Tier';
  const n = escapeHtml(params.firstName);

  const approvedHtml = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Application Approved</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Congratulations, ${n}! You&#39;re approved. &#x1F389;</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 20px;">Your NurseFiti tutor application has been <strong style="color:#08514F;">approved</strong>. Your profile is now live and visible to students.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:12px;margin-bottom:20px;">
    <tr><td style="padding:20px 24px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:6px;">Verified Tutor</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;margin-bottom:4px;">${n} &mdash; ${escapeHtml(tierLabel)}</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.75);">Your profile is now live and visible to students.</div>
    </td></tr>
  </table>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:10px;">Getting Started</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:13px;color:#4A6868;padding-bottom:8px;width:20px;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-bottom:8px;padding-left:8px;">Complete your profile — add a photo, update your bio and session rate</td></tr>
      <tr><td style="font-size:13px;color:#4A6868;padding-bottom:8px;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-bottom:8px;padding-left:8px;">Set your availability so students can book sessions with you</td></tr>
      <tr><td style="font-size:13px;color:#4A6868;">&#x2705;</td><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;padding-left:8px;">Ensure your M-Pesa number is up to date to receive payouts</td></tr>
    </table>
  </div>
  ${ctaButton(`${siteUrl}/tutor-dashboard`, 'Go to Tutor Dashboard', true)}
  ${nfSignature("Welcome to the team — we're excited to have you!")}
</td></tr>`);

  const rejectedHtml = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Application Update</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 12px;">Application Update, ${n}</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 20px;">Thank you for your interest in joining the NurseFiti tutor network. After carefully reviewing your application, we are unable to approve it at this time.</p>
  ${params.reason ? `<div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:18px 22px;margin-bottom:20px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:6px;">Reason</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13.5px;color:#1E3535;line-height:1.65;">${escapeHtml(params.reason)}</div>
  </div>` : ''}
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:22px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">You Can Reapply</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1E3535;line-height:1.65;">If you believe your documents meet our requirements, you are welcome to reapply after addressing the reason above. Contact danotyanga@gmail.com if you need guidance.</div>
  </div>
  ${nfSignature('Thank you for your time and interest in our platform.')}
</td></tr>`);

  const approvedText = `Dear ${params.firstName},

Congratulations! Your NurseFiti tutor application has been approved as ${tierLabel}.

Next steps:
- Complete your profile (photo, bio, session rate)
- Set your availability for student bookings
- Ensure your M-Pesa number is up to date

Go to your dashboard: ${siteUrl}/tutor-dashboard

Welcome to the team!
NurseFiti Tutor Management`;

  const rejectedText = `Dear ${params.firstName},

Thank you for applying. After reviewing your application, we are unable to approve it at this time.
${params.reason ? `\nReason: ${params.reason}\n` : ''}
You are welcome to reapply after addressing the reason above.

NurseFiti Tutor Management`;

  return sendEmail(
    params.to,
    isApproved ? 'Your NurseFiti tutor application has been approved!' : 'Update on your NurseFiti tutor application',
    isApproved ? approvedText : rejectedText,
    undefined,
    isApproved ? approvedHtml : rejectedHtml,
  );
}

// ─── Flagged Question Resolution ──────────────────────────────────────────────

export type FlaggedResolutionEmailParams = {
  to: string | null | undefined;
  studentName: string;
  questionStem: string;
  options: { a: string; b: string; c: string; d: string };
  correctOption: string;
  rationale: string;
  explanation: string;
};

export async function sendFlaggedQuestionResolutionEmail(params: FlaggedResolutionEmailParams): Promise<MailResult> {
  const n = escapeHtml(getFirstName(params.studentName));
  const dashboardUrl = `${getSiteUrl()}/practice`;
  
  const isCorrect = (opt: string) => params.correctOption === opt;
  const highlightOpt = (opt: string) => isCorrect(opt) ? 'background:#d1fae5; font-weight:bold; border-left:4px solid #059669;' : 'background:#f3f4f6;';

  const html = emailWrapper(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Question Feedback</div>
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Your flagged question has been reviewed, ${n}.</h2>
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 22px;">Thank you for helping us improve our question bank! Our nursing educators have reviewed the question you flagged. Here is the feedback:</p>
  
  <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:8px;">Admin Explanation</div>
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E3535;line-height:1.65;white-space:pre-wrap;">${escapeHtml(params.explanation)}</div>
  </div>

  <div style="background:#ffffff;border:1.5px solid #e5e7eb;border-radius:10px;padding:20px;margin-bottom:24px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6b7280;margin-bottom:12px;">Original Question Context</div>
    <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#111827;line-height:1.6;margin:0 0 16px;">${escapeHtml(params.questionStem)}</p>
    
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#374151;margin-bottom:16px;">
      <div style="padding:10px 12px; margin-bottom:6px; border-radius:6px; ${highlightOpt('A')}">A: ${escapeHtml(params.options.a)}</div>
      <div style="padding:10px 12px; margin-bottom:6px; border-radius:6px; ${highlightOpt('B')}">B: ${escapeHtml(params.options.b)}</div>
      <div style="padding:10px 12px; margin-bottom:6px; border-radius:6px; ${highlightOpt('C')}">C: ${escapeHtml(params.options.c)}</div>
      <div style="padding:10px 12px; margin-bottom:6px; border-radius:6px; ${highlightOpt('D')}">D: ${escapeHtml(params.options.d)}</div>
    </div>
    
    <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:12px 14px; border-radius:8px;">
      <strong style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#166534;display:block;margin-bottom:4px;">Rationale:</strong>
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#166534;line-height:1.5;">${escapeHtml(params.rationale)}</span>
    </div>
  </div>
  
  ${ctaButton(dashboardUrl, 'Continue Practising')}
  ${nfSignature('Keep up the great work in your studies!')}
</td></tr>`
  );

  const text = `Dear ${n},

Thank you for flagging a question! Our nursing educators have reviewed it.

Admin Feedback:
${params.explanation}

Question:
${params.questionStem}
A: ${params.options.a}
B: ${params.options.b}
C: ${params.options.c}
D: ${params.options.d}

Correct Answer: ${params.correctOption}
Rationale: ${params.rationale}

Warm Regards,
The NurseFiti Team`;

  return sendEmail(params.to, 'Feedback on your flagged question', text, undefined, html);
}
