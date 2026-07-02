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

// â”€â”€â”€ Shared branded template pieces â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const LOGO_BASE64 =
  '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';
  'iVBORw0KGgoAAAANSUhEUgAAAZUAAAB5CAYAAADxqrx2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAEhQSURBVHhe7V15fFXF2X7m3AQSAkmAhE12wi6yr1p3QXBfUOoG+llx19a61Vq1aqVWW2vVWutWtWprreACasEFlJ0goqxhDZBAwpadJPfM98fMO2fO3HNvbkJYEubhN+Se2WfOOe8z7zvLYTxcwWFhYWFhYVEPcEwPCwsLCwuLusKSioWFhYVFvcGSioWFhYVFvcGSioWFhYVFvcGSioWFhYVFvYEdi6u/vl29Gl+t/AEb83chd3chthYUYMuuAjNao0CXNpnonJmJzhkZ6Na2DU4bMABj+vYxo1lYWFjUC44ZUpm1LBvTFy7CrOzlKNi/3ww+ppCZlobxQwbjwlEjMX7oEDPYwsLCos5o9KTyxfcr8eBbbyN740YzyALAkO7d8ehVV+D0EwaYQUcMnNfukWSMmV4Whxh0j2zfW5hotKSybMMGPPjW2/hy5Q9mkEUAThtwPB696goM7dHDDDqkqC2BxAsr7OoGez8sDhaNklRemDkL973xFqqqq80gixhITEjAk1OuwY1njzOD6hWHSnBFgxVo0VHTvahrz8XO1d6TxoxGRSrF5eWY+vxf8cHCRWaQRS1w0aiReOW2W5HctIkZdFCoSYAdalhBJhDtPhzq3gku1d6XxoZGQyo/bNmKSX94Ghvy880gizqgf+dOePfuu5DVvr0ZVCtEE2BHEseqEDPvxZHshaCn4li9L40NjWKfiuu6uP+NNy2h1CN+3JqLu159Ha7rmkFxwxRiscA5r7WrKw42fUOD2V52hAkFWh30epj1tGiYaBSk8pu338XsFd+b3hYHic+Xf4ffvP2u6V0jahIOJjnEihsLZh61zau28Y8WmO0Ncno8RBHiNcHMs8Z';

const ECG_SVG = `<svg style="display:block;width:600px;" viewBox="0 0 600 52" height="52" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <defs>
    <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F5A623" stop-opacity="0"/>
      <stop offset="12%" stop-color="#F5A623" stop-opacity="0.7"/>
      <stop offset="75%" stop-color="#F5A623" stop-opacity="1"/>
      <stop offset="100%" stop-color="#F5A623" stop-opacity="0.3"/>
    </linearGradient>
  </defs>
  <path d="M -10,36 L 60,36 L 72,33 L 78,26 L 84,33 L 100,36 L 112,36 L 118,40 L 124,6 L 130,48 L 136,36 L 146,41 L 158,28 L 166,36 L 260,36 L 272,33 L 278,26 L 284,33 L 300,36 L 312,36 L 318,40 L 324,6 L 330,48 L 336,36 L 346,41 L 358,28 L 366,36 L 460,36 L 472,33 L 478,26 L 484,33 L 500,36 L 512,36 L 518,40 L 524,6 L 530,48 L 536,36 L 546,41 L 558,28 L 566,36 L 610,36"
    fill="none" stroke="url(#ecgGrad)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
</svg>`;

function emailHeader(tagline: string): string {
  return `
  <tr>
    <td style="background:linear-gradient(135deg,#051F1E 0%,#08514F 45%,#0A6B68 100%);position:relative;overflow:hidden;">
      <div style="position:absolute;top:-60px;right:-60px;width:260px;height:260px;background:radial-gradient(circle,rgba(245,166,35,0.18) 0%,transparent 65%);pointer-events:none;"></div>
      <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px);background-size:18px 18px;pointer-events:none;"></div>
      <div style="position:relative;z-index:2;padding:28px 36px 0;display:flex;align-items:center;justify-content:space-between;gap:20px;">
        <div style="background:white;border-radius:10px;padding:7px 16px;display:inline-block;">
          <img src="data:image/png;base64,${LOGO_BASE64}" alt="NurseFiti" style="height:36px;width:auto;display:block;"/>
        </div>
        <div style="text-align:right;">
          <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);">${escapeHtml(tagline)}</div>
          <div style="font-size:10.5px;color:#F7BC55;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">NCK Exam Preparation Platform</div>
        </div>
      </div>
      <div style="position:relative;z-index:2;">${ECG_SVG}</div>
      <div style="height:4px;background:linear-gradient(90deg,#F5A623 0%,#F7BC55 60%,transparent 100%);"></div>
    </td>
  </tr>`;
}

function emailFooter(siteUrl: string, supportEmail: string): string {
  const year = new Date().getFullYear();
  return `
  <tr>
    <td>
      <div style="height:3px;background:linear-gradient(90deg,#F5A623 0%,#F7BC55 50%,transparent 100%);"></div>
      <div style="background:#0D1C1C;padding:26px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,0.07);">
          <tr>
            <td width="50%" style="vertical-align:top;padding-right:20px;">
              <div style="background:white;border-radius:7px;padding:5px 12px;display:inline-block;margin-bottom:8px;">
                <img src="data:image/png;base64,${LOGO_BASE64}" alt="NurseFiti" style="height:28px;width:auto;display:block;"/>
              </div>
              <div style="font-size:11.5px;color:rgba(255,255,255,0.45);line-height:1.6;max-width:220px;margin-top:4px;">Preparing nursing students across Kenya for NCK exam success.</div>
            </td>
            <td width="25%" style="vertical-align:top;padding-right:16px;">
              <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#F7BC55;margin-bottom:10px;">Quick Links</div>
              <a href="${siteUrl}/dashboard" style="display:block;font-size:12px;color:rgba(255,255,255,0.6);text-decoration:none;margin-bottom:6px;">Dashboard</a>
              <a href="${siteUrl}/mock-exam" style="display:block;font-size:12px;color:rgba(255,255,255,0.6);text-decoration:none;margin-bottom:6px;">Mock Exams</a>
              <a href="${siteUrl}/flashcards" style="display:block;font-size:12px;color:rgba(255,255,255,0.6);text-decoration:none;margin-bottom:6px;">Flashcards</a>
            </td>
            <td width="25%" style="vertical-align:top;">
              <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#F7BC55;margin-bottom:10px;">Support</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:6px;"><strong style="color:#F7BC55;">Email:</strong> ${supportEmail}</div>
              <a href="${siteUrl}" style="display:block;font-size:12px;color:rgba(255,255,255,0.6);text-decoration:none;">nursefiti.co.ke</a>
            </td>
          </tr>
        </table>
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="font-size:10.5px;color:rgba(255,255,255,0.3);">&copy; ${year} NurseFiti. All rights reserved.</div>
          <div style="font-size:10.5px;color:rgba(255,255,255,0.3);">Empowering Nurses for NCK Success</div>
        </div>
      </div>
    </td>
  </tr>`;
}

function emailWrapper(bodyRows: string, tagline = 'Preparing Nurses for Success'): string {
  const siteUrl = getSiteUrl();
  const supportEmail = getSupportEmail();
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#E8F4F3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E8F4F3;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">
          ${emailHeader(tagline)}
          ${bodyRows}
          ${emailFooter(siteUrl, supportEmail)}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// â”€â”€â”€ sendEmail (generic) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

/** Fallback branded HTML for the generic sendEmail path (e.g. bulk admin emails). */
function buildGenericHtml(title: string, body: string): string {
  const lines = body.split('\n').map(l => `<tr><td style="font-size:14px;color:#1E3535;line-height:1.75;padding:0 0 8px;">${escapeHtml(l) || '&nbsp;'}</td></tr>`).join('');
  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h1 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 20px;">${escapeHtml(title)}</h1>
        <table width="100%" cellpadding="0" cellspacing="0">${lines}</table>
      </td>
    </tr>`);
}

// â”€â”€â”€ Utility exports (unchanged signatures) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  ) return 'TBC';
  const minutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  if (minutes <= 0) return 'TBC';
  if (minutes < 60) return `${minutes} minutes`;
  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} hour${hours === 1 ? '' : 's'}` : `${minutes} minutes`;
}

// â”€â”€â”€ Welcome / Onboarding â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildWelcomeHtml(firstName: string, loginUrl: string): string {
  const safeFirst = escapeHtml(firstName);
  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 0;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 14px;">
          Welcome, <span style="color:#F5A623;">${safeFirst}!</span> ðŸŽ‰
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 20px;">
          You've joined thousands of nursing students preparing smarter, studying faster, and improving their chances of NCK success. Your account is live and ready to go.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 36px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="32%" style="vertical-align:top;padding-right:8px;">
              <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-top:3px solid #08514F;border-radius:10px;padding:16px 14px;">
                <div style="font-size:22px;margin-bottom:8px;">ðŸ“š</div>
                <div style="font-family:Arial,sans-serif;font-size:12.5px;font-weight:700;color:#08514F;margin-bottom:5px;">Question Bank</div>
                <div style="font-size:11.5px;color:#4A6868;line-height:1.55;">2,400+ past-paper NCK questions with detailed answers and rationales.</div>
              </div>
            </td>
            <td width="4%"></td>
            <td width="32%" style="vertical-align:top;padding-right:8px;">
              <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-top:3px solid #F5A623;border-radius:10px;padding:16px 14px;">
                <div style="font-size:22px;margin-bottom:8px;">ðŸ“</div>
                <div style="font-family:Arial,sans-serif;font-size:12.5px;font-weight:700;color:#08514F;margin-bottom:5px;">Mock Exams</div>
                <div style="font-size:11.5px;color:#4A6868;line-height:1.55;">Timed, full-length mock exams that mirror the real NCK format exactly.</div>
              </div>
            </td>
            <td width="4%"></td>
            <td width="32%" style="vertical-align:top;">
              <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-top:3px solid #0A6B68;border-radius:10px;padding:16px 14px;">
                <div style="font-size:22px;margin-bottom:8px;">ðŸ“Š</div>
                <div style="font-family:Arial,sans-serif;font-size:12.5px;font-weight:700;color:#08514F;margin-bottom:5px;">Analytics</div>
                <div style="font-size:11.5px;color:#4A6868;line-height:1.55;">Know exactly which topics to focus on with your personal performance insights.</div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 36px 24px;">
        <div style="height:1px;background:#D5E8E8;margin-bottom:20px;"></div>
        <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">Your first 3 steps</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td width="36" style="vertical-align:top;padding-top:1px;">
              <div style="width:28px;height:28px;background:#08514F;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:800;color:white;text-align:center;line-height:28px;">1</div>
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:3px;">Complete your profile</div>
              <div style="font-size:13px;color:#4A6868;line-height:1.6;">Tell us your cadre (BScN, KRCHN, Higher Diploma) and exam date so we can personalise your revision plan.</div>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td width="36" style="vertical-align:top;padding-top:1px;">
              <div style="width:28px;height:28px;background:#08514F;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:800;color:white;text-align:center;line-height:28px;">2</div>
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:3px;">Run your diagnostic mock</div>
              <div style="font-size:13px;color:#4A6868;line-height:1.6;">A 30-question exam that maps your strengths and weak spots so you study the right things from day one.</div>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td width="36" style="vertical-align:top;padding-top:1px;">
              <div style="width:28px;height:28px;background:#08514F;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:800;color:white;text-align:center;line-height:28px;">3</div>
            </td>
            <td style="padding-left:12px;vertical-align:top;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:3px;">Build your revision streak</div>
              <div style="font-size:13px;color:#4A6868;line-height:1.6;">Even 20 minutes a day compounds fast. Use spaced-repetition flashcards to lock in your weak areas.</div>
            </td>
          </tr>
        </table>
        <div style="text-align:center;margin-bottom:24px;">
          <a href="${loginUrl}" style="display:inline-block;background:#08514F;color:white;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">Go to My Dashboard &rarr;</a>
        </div>
        <div style="height:1px;background:#D5E8E8;margin-bottom:24px;"></div>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:13.5px;color:#1E3535;line-height:1.7;font-style:italic;">&ldquo;I failed my NCK twice before NurseFiti. After two months of mock exams and analytics, I passed with 78%. The platform showed me exactly what I didn&rsquo;t know.&rdquo;</div>
          <div style="margin-top:10px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:middle;padding-right:10px;">
                <div style="width:32px;height:32px;background:#08514F;border-radius:50%;text-align:center;line-height:32px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:white;">NK</div>
              </td>
              <td style="vertical-align:middle;">
                <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#08514F;">Nurse Kamau</div>
                <div style="font-size:11px;color:#4A6868;">BScN &middot; Nairobi, Kenya</div>
              </td>
            </tr></table>
          </div>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">Reply to this email â€” a real person will get back to you.</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`);
}

export async function sendWelcomeEmail(params: WelcomeEmailParams): Promise<MailResult> {
  const loginUrl = `${getSiteUrl()}/login`;
  const supportEmail = getSupportEmail();

  const text = `Dear ${params.firstName},

Welcome to NurseFiti!

We're excited to have you join thousands of nursing students preparing smarter and improving their chances of success.

With NurseFiti, you can:
- Access AI-powered nursing assistance
- Practice with exam-focused materials
- Book one-on-one tutor sessions
- Learn anytime, anywhere
- Track your learning progress

Login here: ${loginUrl}

If you ever need assistance, our support team is ready to help.

Warm Regards,
The NurseFiti Team
${supportEmail}`;

  return sendEmail(
    params.to,
    'Welcome to NurseFiti â€” Your journey starts now',
    text,
    undefined,
    buildWelcomeHtml(params.firstName, loginUrl),
  );
}

// â”€â”€â”€ Subscription Confirmation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildSubscriptionHtml(params: SubscriptionEmailParams, dashboardUrl: string): string {
  const safeFirst = escapeHtml(params.firstName);
  const safePlan = escapeHtml(params.planName);
  const safeAmount = escapeHtml(params.amount);
  const safeStart = escapeHtml(params.startDate);
  const safeEnd = escapeHtml(params.endDate);
  const safeTxn = escapeHtml(params.transactionId);

  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 8px;">
          Payment Confirmed, <span style="color:#F5A623;">${safeFirst}!</span>
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 24px;">
          Your NurseFiti subscription is now <strong style="color:#08514F;">active</strong>. You have full access to all features included in your plan â€” start studying smarter today.
        </p>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">Subscription Details</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:13px;color:#4A6868;padding-bottom:10px;width:140px;">Plan</td>
              <td style="font-size:13px;color:#08514F;font-weight:700;padding-bottom:10px;">${safePlan}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Amount Paid</td>
              <td style="font-size:13px;color:#08514F;font-weight:700;padding-bottom:10px;">${safeAmount}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Activation Date</td>
              <td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeStart}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Expiry Date</td>
              <td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeEnd}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#4A6868;">Transaction Ref</td>
              <td style="font-size:12px;color:#4A6868;font-family:monospace;">${safeTxn}</td>
            </tr>
          </table>
        </div>
        <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">What&rsquo;s Included</div>
          <div style="font-size:13px;color:#1E3535;line-height:1.65;">Unlimited mock exams &middot; Full question bank &middot; Detailed analytics &middot; AI tutor assistance &middot; Spaced-repetition flashcards</div>
        </div>
        <div style="text-align:center;margin-bottom:28px;">
          <a href="${dashboardUrl}" style="display:inline-block;background:#08514F;color:white;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">Go to Dashboard &rarr;</a>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">Thank you for trusting NurseFiti as your learning partner.</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`, 'Preparing Nurses for Success');
}

export async function sendSubscriptionConfirmationEmail(params: SubscriptionEmailParams): Promise<MailResult> {
  const dashboardUrl = `${getSiteUrl()}/dashboard`;
  const supportEmail = getSupportEmail();

  const text = `Dear ${params.firstName},

Thank you for your payment. Your NurseFiti subscription is now active.

Plan: ${params.planName}
Amount Paid: ${params.amount}
Activation Date: ${params.startDate}
Expiry Date: ${params.endDate}
Transaction Reference: ${params.transactionId}

Access your account: ${dashboardUrl}

Need help? Contact us at: ${supportEmail}

Warm Regards,
The NurseFiti Team`;

  return sendEmail(
    params.to,
    'Your NurseFiti subscription is active',
    text,
    undefined,
    buildSubscriptionHtml(params, dashboardUrl),
  );
}

// â”€â”€â”€ Session Booking â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildSessionBookingStudentHtml(params: SessionEmailParams): string {
  const safeName = escapeHtml(params.studentName);
  const safeTutor = escapeHtml(params.tutorName);
  const safeSubject = escapeHtml(params.subject);
  const safeDate = escapeHtml(params.sessionDate);
  const safeTime = escapeHtml(params.sessionTime);
  const safeDuration = escapeHtml(params.duration);
  const safeBooking = escapeHtml(params.bookingId);

  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 8px;">
          Session Confirmed, <span style="color:#F5A623;">${safeName}!</span> âœ…
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 24px;">
          Your tutor session has been successfully booked and confirmed. Please join a few minutes early.
        </p>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">Session Details</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;width:120px;">Tutor</td><td style="font-size:13px;color:#08514F;font-weight:700;padding-bottom:10px;">${safeTutor}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Subject</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeSubject}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Date</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeDate}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Time</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeTime}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Duration</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeDuration}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;">Booking Ref</td><td style="font-size:12px;color:#4A6868;font-family:monospace;">${safeBooking}</td></tr>
          </table>
        </div>
        <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Meeting Link</div>
          <a href="${escapeHtml(params.meetingLink)}" style="font-size:13px;color:#08514F;font-weight:600;word-break:break-all;">${escapeHtml(params.meetingLink)}</a>
        </div>
        <div style="text-align:center;margin-bottom:28px;">
          <a href="${escapeHtml(params.meetingLink)}" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #C7841A;">Join Session &rarr;</a>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">We look forward to helping you achieve your learning goals.</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`, 'Preparing Nurses for Success');
}

function buildSessionBookingTutorHtml(params: SessionEmailParams, dashboardUrl: string): string {
  const safeName = escapeHtml(params.tutorName);
  const safeStudent = escapeHtml(params.studentName);
  const safeSubject = escapeHtml(params.subject);
  const safeDate = escapeHtml(params.sessionDate);
  const safeTime = escapeHtml(params.sessionTime);
  const safeDuration = escapeHtml(params.duration);
  const safeBooking = escapeHtml(params.bookingId);

  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 8px;">
          New Session Booked, <span style="color:#F5A623;">${safeName}!</span>
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 24px;">
          A new tutoring session has been booked and payment has been successfully confirmed. Please prepare accordingly.
        </p>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">Session Details</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;width:120px;">Student</td><td style="font-size:13px;color:#08514F;font-weight:700;padding-bottom:10px;">${safeStudent}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Subject</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeSubject}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Date</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeDate}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Time</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeTime}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Duration</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeDuration}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;">Booking ID</td><td style="font-size:12px;color:#4A6868;font-family:monospace;">${safeBooking}</td></tr>
          </table>
        </div>
        <div style="text-align:center;margin-bottom:28px;">
          <a href="${dashboardUrl}" style="display:inline-block;background:#08514F;color:white;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">View in Dashboard &rarr;</a>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">NurseFiti Tutor Management</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">Thank you for being part of NurseFiti and helping students succeed.</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`, 'Preparing Nurses for Success');
}

export async function sendSessionBookingEmails(params: SessionEmailParams): Promise<MailResult[]> {
  const tutorDashboardUrl = `${getSiteUrl()}/tutor-dashboard`;

  const studentText = `Dear ${params.studentName},

Your tutor session has been successfully booked and confirmed.

Tutor: ${params.tutorName}
Subject: ${params.subject}
Date: ${params.sessionDate}
Time: ${params.sessionTime}
Duration: ${params.duration}
Meeting Link: ${params.meetingLink}
Booking Reference: ${params.bookingId}

Please join the session a few minutes before the scheduled time.

Warm Regards,
The NurseFiti Team`;

  const tutorText = `Hello ${params.tutorName},

A new tutoring session has been booked and payment has been confirmed.

Student: ${params.studentName}
Subject: ${params.subject}
Date: ${params.sessionDate}
Time: ${params.sessionTime}
Duration: ${params.duration}
Booking ID: ${params.bookingId}

View Booking: ${tutorDashboardUrl}

Best Regards,
NurseFiti Tutor Management Team`;

  return Promise.all([
    sendEmail(
      params.studentEmail,
      'Your NurseFiti tutor session is confirmed',
      studentText,
      undefined,
      buildSessionBookingStudentHtml(params),
    ),
    sendEmail(
      params.tutorEmail,
      'New NurseFiti tutoring session booked',
      tutorText,
      undefined,
      buildSessionBookingTutorHtml(params, tutorDashboardUrl),
    ),
  ]);
}

// â”€â”€â”€ Session Reminder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function buildReminderStudentHtml(params: SessionEmailParams, timeUntil: string): string {
  const safeName = escapeHtml(params.studentName);
  const safeTutor = escapeHtml(params.tutorName);
  const safeSubject = escapeHtml(params.subject);
  const safeDate = escapeHtml(params.sessionDate);
  const safeTime = escapeHtml(params.sessionTime);
  const safeDuration = escapeHtml(params.duration);
  const safeTime2 = escapeHtml(timeUntil);

  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 8px;">
          â° Reminder: Session in <span style="color:#F5A623;">${safeTime2}</span>
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 24px;">
          Hi ${safeName}, your tutor session is starting soon. Ensure you&rsquo;re in a quiet environment with a stable connection.
        </p>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">Session Details</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;width:120px;">Tutor</td><td style="font-size:13px;color:#08514F;font-weight:700;padding-bottom:10px;">${safeTutor}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Subject</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeSubject}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Date</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeDate}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Time</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeTime}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;">Duration</td><td style="font-size:13px;color:#1E3535;font-weight:600;">${safeDuration}</td></tr>
          </table>
        </div>
        <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Meeting Link</div>
          <a href="${escapeHtml(params.meetingLink)}" style="font-size:13px;color:#08514F;font-weight:600;word-break:break-all;">${escapeHtml(params.meetingLink)}</a>
        </div>
        <div style="text-align:center;margin-bottom:28px;">
          <a href="${escapeHtml(params.meetingLink)}" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #C7841A;">Join Now &rarr;</a>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">We wish you a productive session!</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`, 'Preparing Nurses for Success');
}

function buildReminderTutorHtml(params: SessionEmailParams, timeUntil: string): string {
  const safeName = escapeHtml(params.tutorName);
  const safeStudent = escapeHtml(params.studentName);
  const safeSubject = escapeHtml(params.subject);
  const safeDate = escapeHtml(params.sessionDate);
  const safeTime = escapeHtml(params.sessionTime);
  const safeDuration = escapeHtml(params.duration);
  const safeTime2 = escapeHtml(timeUntil);

  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 8px;">
          â° Session Reminder â€” Starting in <span style="color:#F5A623;">${safeTime2}</span>
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 24px;">
          Hi ${safeName}, your tutoring session with ${safeStudent} is starting soon. Please join the meeting on time.
        </p>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">Session Details</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;width:120px;">Student</td><td style="font-size:13px;color:#08514F;font-weight:700;padding-bottom:10px;">${safeStudent}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Subject</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeSubject}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Date</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeDate}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">Time</td><td style="font-size:13px;color:#1E3535;font-weight:600;padding-bottom:10px;">${safeTime}</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;">Duration</td><td style="font-size:13px;color:#1E3535;font-weight:600;">${safeDuration}</td></tr>
          </table>
        </div>
        <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Meeting Link</div>
          <a href="${escapeHtml(params.meetingLink)}" style="font-size:13px;color:#08514F;font-weight:600;word-break:break-all;">${escapeHtml(params.meetingLink)}</a>
        </div>
        <div style="text-align:center;margin-bottom:28px;">
          <a href="${escapeHtml(params.meetingLink)}" style="display:inline-block;background:#08514F;color:white;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">Join Session &rarr;</a>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">NurseFiti Tutor Management</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">Thank you for your dedication to our students.</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`, 'Preparing Nurses for Success');
}

export async function sendSessionReminderEmail(params: SessionEmailParams, timeUntil: string): Promise<MailResult[]> {
  const studentText = `Dear ${params.studentName},

Your tutor session with ${params.tutorName} is starting in ${timeUntil}.

Subject: ${params.subject}
Date: ${params.sessionDate}
Time: ${params.sessionTime}
Duration: ${params.duration}
Meeting Link: ${params.meetingLink}

Please join a few minutes early.

Warm Regards,
The NurseFiti Team`;

  const tutorText = `Hello ${params.tutorName},

Your tutoring session with ${params.studentName} is starting in ${timeUntil}.

Subject: ${params.subject}
Date: ${params.sessionDate}
Time: ${params.sessionTime}
Duration: ${params.duration}
Meeting Link: ${params.meetingLink}

Best Regards,
NurseFiti Tutor Management Team`;

  return Promise.all([
    sendEmail(
      params.studentEmail,
      `Reminder: Your NurseFiti session is starting in ${timeUntil}`,
      studentText,
      undefined,
      buildReminderStudentHtml(params, timeUntil),
    ),
    sendEmail(
      params.tutorEmail,
      `Reminder: Tutoring session starting in ${timeUntil}`,
      tutorText,
      undefined,
      buildReminderTutorHtml(params, timeUntil),
    ),
  ]);
}

// â”€â”€â”€ Scholarship Welcome â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type ScholarshipWelcomeEmailParams = {
  to: string | null | undefined;
  firstName: string;
  campaignName: string;
  sponsorName: string;
  beneficiaryType: string;
};

function buildScholarshipHtml(params: ScholarshipWelcomeEmailParams, dashboardUrl: string): string {
  const safeFirst = escapeHtml(params.firstName);
  const safeCampaign = escapeHtml(params.campaignName);
  const safeSponsor = escapeHtml(params.sponsorName);
  const scholarshipType = params.beneficiaryType === 'FULL' ? 'Full Premium Access' : 'Subsidized Premium Access';
  const safeType = escapeHtml(scholarshipType);

  return emailWrapper(`
    <tr>
      <td style="background:#ffffff;padding:36px 36px 28px;">
        <h2 style="font-family:Arial,sans-serif;font-size:21px;font-weight:700;color:#08514F;margin:0 0 8px;">
          Congratulations, <span style="color:#F5A623;">${safeFirst}!</span> ðŸŽ“
        </h2>
        <p style="font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 24px;">
          You have been selected as a beneficiary of the <strong style="color:#08514F;">${safeCampaign}</strong>. This is a tremendous opportunity to accelerate your NCK preparation.
        </p>
        <div style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:12px;padding:22px 24px;margin-bottom:24px;position:relative;overflow:hidden;">
          <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;background:rgba(245,166,35,0.12);border-radius:50%;"></div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;">
                <div style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:6px;">Scholarship Award</div>
                <div style="font-family:Arial,sans-serif;font-size:16px;font-weight:700;color:white;margin-bottom:6px;">${safeType} â€” 90 Days</div>
                <div style="font-size:12.5px;color:rgba(255,255,255,0.75);line-height:1.6;">Sponsored by <strong style="color:#F7BC55;">${safeSponsor}</strong></div>
              </td>
            </tr>
          </table>
        </div>
        <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
          <div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:14px;">What You Now Have Access To</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">âœ…</td><td style="font-size:13px;color:#1E3535;padding-bottom:10px;padding-left:8px;">Unlimited mock exams mirroring the real NCK format</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">âœ…</td><td style="font-size:13px;color:#1E3535;padding-bottom:10px;padding-left:8px;">Full 2,400+ question bank with detailed rationales</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">âœ…</td><td style="font-size:13px;color:#1E3535;padding-bottom:10px;padding-left:8px;">AI-powered nursing tutor assistant</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;padding-bottom:10px;">âœ…</td><td style="font-size:13px;color:#1E3535;padding-bottom:10px;padding-left:8px;">Personal performance analytics &amp; insights</td></tr>
            <tr><td style="font-size:13px;color:#4A6868;">âœ…</td><td style="font-size:13px;color:#1E3535;padding-left:8px;">Spaced-repetition flashcard system</td></tr>
          </table>
        </div>
        <div style="text-align:center;margin-bottom:28px;">
          <a href="${dashboardUrl}" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 36px;border-radius:8px;text-decoration:none;border-bottom:3px solid #C7841A;">Start Studying Now &rarr;</a>
        </div>
        <div style="border-top:2px solid #D0E8E7;padding-top:18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:14px;">
              <div style="width:42px;height:42px;background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;text-align:center;line-height:42px;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:white;">NF</div>
            </td>
            <td style="vertical-align:middle;">
              <div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div>
              <div style="font-size:11.5px;color:#4A6868;margin-top:2px;">We wish you immense success in your nursing journey.</div>
            </td>
          </tr></table>
        </div>
      </td>
    </tr>`, 'Preparing Nurses for Success');
}

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

Start your preparation now: ${dashboardUrl}

If you have any questions, our support team is ready to help at: ${supportEmail}

We wish you immense success in your nursing journey.

Warm Regards,
The NurseFiti Team`;

  return sendEmail(
    params.to,
    `Congratulations! You have been awarded the ${params.campaignName} Scholarship`,
    text,
    undefined,
    buildScholarshipHtml(params, dashboardUrl),
  );
}
