'use strict';
/**
 * Send one sample of every email template to danotyanga@gmail.com
 * Run:  node sendTestEmails.js
 */
const fs   = require('fs');
const path = require('path');

// Load .env.local
for (const line of fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const eq = t.indexOf('=');
  if (eq === -1) continue;
  process.env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
}

const nodemailer = require('nodemailer');
const TO      = 'danotyanga@gmail.com';
const SITE    = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nursefiti.co.ke').replace(/\/$/, '');
const SUPPORT = process.env.SMTP_USER || 'danotyanga@gmail.com';
const LOGO    = `${SITE}/logo.png`;
const TODAY   = new Date().toLocaleDateString('en-KE', {year:'numeric',month:'short',day:'numeric'});
const FUTURE  = new Date(Date.now()+7*86400000).toLocaleDateString('en-KE',{year:'numeric',month:'short',day:'numeric'});

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: { user: process.env.SMTP_USER, pass: (process.env.SMTP_PASS||'').replace(/\s+/g,'') },
});
const FROM = process.env.PAYMENT_EMAIL_FROM || `NurseFiti <${SUPPORT}>`;

// ── ECG SVG with glow filter ─────────────────────────────────────────────────
const ECG = `<svg width="600" height="52" viewBox="0 0 600 52" xmlns="http://www.w3.org/2000/svg" style="display:block;width:600px;"><defs><filter id="eg" x="-5%" y="-40%" width="110%" height="180%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="ef" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#F5A623" stop-opacity="0"/><stop offset="10%" stop-color="#F5A623" stop-opacity="0.6"/><stop offset="70%" stop-color="#F5A623" stop-opacity="1"/><stop offset="100%" stop-color="#F5A623" stop-opacity="0.4"/></linearGradient></defs><path d="M-10,36 L60,36 L72,33 L78,26 L84,33 L100,36 L112,36 L118,40 L124,6 L130,48 L136,36 L146,41 L158,28 L166,36 L260,36 L272,33 L278,26 L284,33 L300,36 L312,36 L318,40 L324,6 L330,48 L336,36 L346,41 L358,28 L366,36 L460,36 L472,33 L478,26 L484,33 L500,36 L512,36 L518,40 L524,6 L530,48 L536,36 L546,41 L558,28 L566,36 L610,36" fill="none" stroke="url(#ef)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#eg)"/></svg>`;

// ── Shared template pieces ───────────────────────────────────────────────────
function hdr(tagline) {
  return `<tr><td style="padding:0;margin:0;"><table width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;background:linear-gradient(135deg,#051F1E 0%,#08514F 45%,#0A6B68 100%);"><tr><td><div style="position:relative;background:linear-gradient(135deg,#051F1E 0%,#08514F 45%,#0A6B68 100%);overflow:hidden;"><div style="position:absolute;top:-60px;right:-60px;width:260px;height:260px;background:radial-gradient(circle,rgba(245,166,35,0.18) 0%,transparent 65%);pointer-events:none;"></div><div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,0.045) 1px,transparent 1px);background-size:18px 18px;pointer-events:none;"></div><div style="position:relative;z-index:2;padding:28px 36px 0;display:table;width:528px;"><div style="display:table-cell;vertical-align:middle;"><div style="background:#ffffff;border-radius:10px;padding:7px 16px;display:inline-block;line-height:0;"><img src="${LOGO}" alt="NurseFiti" width="120" height="36" style="display:block;border:0;height:36px;width:auto;"/></div></div><div style="display:table-cell;vertical-align:middle;text-align:right;"><div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,0.92);">${tagline}</div><div style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#F7BC55;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px;">NCK Exam Preparation Platform</div></div></div><div style="position:relative;z-index:2;margin-top:6px;">${ECG}</div><div style="height:4px;background:linear-gradient(90deg,#F5A623 0%,#F7BC55 60%,transparent 100%);"></div></div></td></tr></table></td></tr>`;
}

function ftr() {
  const yr = new Date().getFullYear();
  return `<tr><td><div style="height:3px;background:linear-gradient(90deg,#F5A623 0%,#F7BC55 50%,transparent 100%);"></div><div style="background:#0D1C1C;padding:26px 32px 20px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="40%" style="vertical-align:top;padding-right:12px;"><div style="background:#fff;border-radius:7px;padding:5px 12px;display:inline-block;margin-bottom:8px;"><img src="${LOGO}" alt="NurseFiti" width="90" height="27" style="display:block;border:0;"/></div><div style="font-size:11.5px;color:rgba(255,255,255,0.45);line-height:1.65;max-width:200px;font-family:Arial,sans-serif;">Empowering Kenyan nurses through quality NCK exam preparation, mock exams, and performance analytics.</div></td><td width="30%" style="vertical-align:top;padding-right:12px;"><div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#F7BC55;margin-bottom:12px;">Platform</div><a href="${SITE}/questions" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Question Bank</a><a href="${SITE}/mock-exam" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Mock Exams</a><a href="${SITE}/analytics" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Analytics</a><a href="${SITE}/flashcards" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;">Flashcards</a></td><td width="30%" style="vertical-align:top;"><div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#F7BC55;margin-bottom:12px;">Support</div><a href="${SITE}/help" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">Help Centre</a><a href="https://wa.me/254700000000" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;margin-bottom:8px;">WhatsApp Community</a><a href="mailto:${SUPPORT}" style="display:block;font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.65);text-decoration:none;">${SUPPORT}</a></td></tr></table><hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:18px 0 14px;"/><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td><div style="font-family:Arial,sans-serif;font-size:10.5px;color:rgba(255,255,255,0.3);line-height:1.5;">&copy; ${yr} NurseFiti &middot; Nairobi, Kenya<br/>You received this because you created an account at nursefiti.co.ke</div></td><td style="text-align:right;"><a href="${SITE}/unsubscribe" style="font-family:Arial,sans-serif;font-size:10.5px;color:rgba(255,255,255,0.3);text-decoration:underline;margin-right:10px;">Unsubscribe</a><a href="${SITE}/email-preferences" style="font-family:Arial,sans-serif;font-size:10.5px;color:rgba(255,255,255,0.3);text-decoration:underline;">Email Preferences</a></td></tr></table></div></td></tr>`;
}

function sig(sub) {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;"><tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr><tr><td height="16" style="font-size:0;">&nbsp;</td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0"><tr><td width="52" style="vertical-align:middle;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="44" height="44" align="center" valign="middle" style="background:linear-gradient(135deg,#08514F,#0A6B68);border-radius:50%;font-family:Arial,sans-serif;font-size:14px;font-weight:800;color:#fff;line-height:44px;text-align:center;">NF</td></tr></table></td><td style="padding-left:14px;vertical-align:middle;"><div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;">The NurseFiti Team</div><div style="font-family:Arial,sans-serif;font-size:12px;color:#4A6868;margin-top:2px;">${sub}</div></td></tr></table></td></tr></table>`;
}

function wrap(body, tagline) {
  return `<!doctype html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/></head><body style="margin:0;padding:0;background:#E8F4F3;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E8F4F3;"><tr><td align="center" style="padding:24px 16px;"><table width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#fff;">${hdr(tagline||'Preparing Nurses for Success')}${body}${ftr()}</table></td></tr></table></body></html>`;
}

async function send(subj, html, label) {
  process.stdout.write(`  ${label.padEnd(44)}… `);
  try { await transport.sendMail({from:FROM,to:TO,replyTo:SUPPORT,subject:subj,text:subj,html}); console.log('✅'); }
  catch(e){ console.log('❌', e.message); }
}

// ── 1. Welcome ───────────────────────────────────────────────────────────────
function welcomeHtml(name) {
  return wrap(`
<tr><td style="padding:36px 36px 20px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:10px;">Welcome to NurseFiti</div>
  <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:800;color:#08514F;line-height:1.2;margin:0 0 14px;">You&#39;re in, ${name}.<br/>Let&#39;s get you <span style="color:#F5A623;">NCK-ready.</span></h1>
  <p style="font-family:Arial,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0;">Thousands of Kenyan nurses have used NurseFiti to walk into their NCK examinations prepared and confident. Your journey starts right now.</p>
</td></tr>
<tr><td style="padding:0 36px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:22px 36px 0;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:16px;">What&#39;s Waiting for You</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="32%" style="vertical-align:top;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #D0E8E7;border-top:3px solid #08514F;border-radius:10px;background:#F2FAFA;"><tr><td style="padding:16px 14px;"><div style="font-size:24px;margin-bottom:8px;">&#x1F4DA;</div><div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:5px;">Question Bank</div><div style="font-family:Arial,sans-serif;font-size:12px;color:#4A6868;line-height:1.55;">2,400+ past-paper NCK questions with detailed answers and rationales.</div></td></tr></table></td>
    <td width="2%" style="font-size:0;">&nbsp;</td>
    <td width="32%" style="vertical-align:top;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #D0E8E7;border-top:3px solid #F5A623;border-radius:10px;background:#F2FAFA;"><tr><td style="padding:16px 14px;"><div style="font-size:24px;margin-bottom:8px;">&#x1F4DD;</div><div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:5px;">Mock Exams</div><div style="font-family:Arial,sans-serif;font-size:12px;color:#4A6868;line-height:1.55;">Timed, full-length mock exams that mirror the real NCK format exactly.</div></td></tr></table></td>
    <td width="2%" style="font-size:0;">&nbsp;</td>
    <td width="32%" style="vertical-align:top;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1.5px solid #D0E8E7;border-top:3px solid #0A6B68;border-radius:10px;background:#F2FAFA;"><tr><td style="padding:16px 14px;"><div style="font-size:24px;margin-bottom:8px;">&#x1F4CA;</div><div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#08514F;margin-bottom:5px;">Analytics</div><div style="font-family:Arial,sans-serif;font-size:12px;color:#4A6868;line-height:1.55;">Know exactly which topics to focus on with your personal performance insights.</div></td></tr></table></td>
  </tr></table>
</td></tr>
<tr><td style="padding:0 36px;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;"><tr><td height="1" style="background:#D5E8E8;font-size:0;">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:22px 36px 0;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:16px;">Your First 3 Steps</div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;"><tr><td width="36" style="vertical-align:top;padding-top:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:800;color:#fff;line-height:28px;text-align:center;">1</td></tr></table></td><td style="padding-left:12px;vertical-align:top;"><div style="font-family:Arial,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;margin-bottom:3px;">Complete your profile</div><div style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;line-height:1.6;">Tell us your cadre (BScN, KRCHN, Higher Diploma) and your exam date &mdash; we use this to personalise your revision plan.</div></td></tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;"><tr><td width="36" style="vertical-align:top;padding-top:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:800;color:#fff;line-height:28px;text-align:center;">2</td></tr></table></td><td style="padding-left:12px;vertical-align:top;"><div style="font-family:Arial,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;margin-bottom:3px;">Run your diagnostic mock</div><div style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;line-height:1.6;">A short 30-question exam that maps your strengths and weak spots so you study the right things from day one.</div></td></tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;"><tr><td width="36" style="vertical-align:top;padding-top:2px;"><table cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" style="background:#08514F;border-radius:50%;font-family:Arial,sans-serif;font-size:13px;font-weight:800;color:#fff;line-height:28px;text-align:center;">3</td></tr></table></td><td style="padding-left:12px;vertical-align:top;"><div style="font-family:Arial,sans-serif;font-size:13.5px;font-weight:700;color:#08514F;margin-bottom:3px;">Build your revision streak</div><div style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;line-height:1.6;">Even 20 minutes a day compounds fast. Use our spaced-repetition flashcards to lock in your weak areas.</div></td></tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr><td align="center"><a href="${SITE}/dashboard" style="display:block;background:#08514F;color:#fff;font-family:Arial,sans-serif;font-size:15px;font-weight:700;text-align:center;text-decoration:none;padding:16px 36px;border-radius:8px;border-bottom:3px solid #051F1E;">Go to My Dashboard &rarr;</a></td></tr></table>
</td></tr>
<tr><td style="padding:0 36px 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:10px;"><tr><td style="padding:22px 24px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="vertical-align:middle;"><div style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:6px;">Unlock Everything</div><div style="font-family:Arial,sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:6px;line-height:1.3;">Upgrade to Premium</div><div style="font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.75);line-height:1.6;">Unlimited mock exams, full question bank access, and in-depth analytics. Pay once via M-Pesa &mdash; no subscription needed.</div></td><td width="110" style="vertical-align:middle;text-align:right;padding-left:16px;"><a href="${SITE}/pricing" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:13px;font-weight:800;padding:12px 20px;border-radius:8px;text-decoration:none;white-space:nowrap;border-bottom:3px solid #C7841A;">See Plans</a></td></tr></table></td></tr></table>
</td></tr>
<tr><td style="padding:0 36px 20px;"><p style="font-family:Arial,sans-serif;font-size:14.5px;color:#4A6868;line-height:1.75;margin:0;">We&#39;re genuinely glad you&#39;re here, ${name}. If you have any questions about the platform or need help getting started, reply to this email &mdash; a real person will get back to you.</p></td></tr>
<tr><td style="padding:0 36px 32px;">${sig('support@nursefiti.co.ke &middot; nursefiti.co.ke')}</td></tr>`);
}

// ── 2–8: remaining templates (reuse wrap/hdr/ftr/sig) ────────────────────────
function subscriptionHtml() {
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Payment Confirmed</div>
  <h2 style="font-family:Arial,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 12px;">Your subscription is <span style="color:#F5A623;">active</span>, Danotyanga.</h2>
  <p style="font-family:Arial,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 20px;">You now have full access to all features. Start studying smarter today.</p>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:20px;">
    <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:12px;">Subscription Details</div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;width:140px;">Plan</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">Premium — 6 Months</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;">Amount Paid</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">KES 1,500</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;">Activation</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">${TODAY}</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;">Expiry</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">${FUTURE}</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;">Ref</td><td style="font-family:Arial,sans-serif;font-size:12px;color:#4A6868;font-family:monospace;">MPESA-TEST-001</td></tr>
    </table>
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="${SITE}/dashboard" style="display:inline-block;background:#08514F;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">Go to Dashboard &rarr;</a></td></tr></table>
  ${sig('Thank you for trusting NurseFiti as your learning partner.')}
</td></tr>`);
}

function sessionHtml(role) {
  const isStudent = role === 'student';
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">${isStudent ? 'Session Confirmed' : 'New Booking'}</div>
  <h2 style="font-family:Arial,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 10px;">${isStudent ? 'Your session is booked, Danotyanga! ✅' : 'New session booked, Dr. Kamau!'}</h2>
  <div style="background:#F2FAFA;border:1.5px solid #D0E8E7;border-left:4px solid #08514F;border-radius:10px;padding:20px 22px;margin-bottom:16px;">
    <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A6B68;margin-bottom:12px;">Session Details</div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;width:120px;">${isStudent ? 'Tutor' : 'Student'}</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#08514F;font-weight:700;padding-bottom:8px;">${isStudent ? 'Dr. Kamau' : 'Danotyanga'}</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;">Subject</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">Medical-Surgical Nursing</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;">Date</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">${FUTURE}</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;padding-bottom:8px;">Time</td><td style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;font-weight:600;padding-bottom:8px;">10:00 - 11:00</td></tr>
      <tr><td style="font-family:Arial,sans-serif;font-size:13px;color:#4A6868;">Booking</td><td style="font-family:Arial,sans-serif;font-size:12px;color:#4A6868;font-family:monospace;">BKG-TEST-001</td></tr>
    </table>
  </div>
  ${isStudent ? `<div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:18px;"><div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Meeting Link</div><a href="https://meet.google.com/abc-xyz" style="font-family:Arial,sans-serif;font-size:13px;color:#08514F;font-weight:600;text-decoration:none;">https://meet.google.com/abc-xyz</a></div><table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="https://meet.google.com/abc-xyz" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #C7841A;">Join Session &rarr;</a></td></tr></table>` : `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="${SITE}/tutor-dashboard" style="display:inline-block;background:#08514F;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">View in Dashboard &rarr;</a></td></tr></table>`}
  ${sig(isStudent ? 'We look forward to helping you achieve your learning goals.' : 'Thank you for helping students succeed.')}
</td></tr>`);
}

function reminderHtml(role) {
  const isStudent = role === 'student';
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Session Reminder</div>
  <h2 style="font-family:Arial,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 10px;">&#x23F0; Your session starts in <span style="color:#F5A623;">30 minutes</span></h2>
  <p style="font-family:Arial,sans-serif;font-size:14px;color:#1E3535;line-height:1.75;margin:0 0 18px;">Hi ${isStudent ? 'Danotyanga' : 'Dr. Kamau'}, ${isStudent ? 'your session with Dr. Kamau is coming up. Make sure you\'re in a quiet environment.' : 'your session with Danotyanga is starting soon. Please join on time.'}</p>
  <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:18px;"><div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Meeting Link</div><a href="https://meet.google.com/abc-xyz" style="font-family:Arial,sans-serif;font-size:13px;color:#08514F;font-weight:600;text-decoration:none;">https://meet.google.com/abc-xyz</a></div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="https://meet.google.com/abc-xyz" style="display:inline-block;background:${isStudent ? '#F5A623' : '#08514F'};color:${isStudent ? '#051F1E' : '#fff'};font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid ${isStudent ? '#C7841A' : '#051F1E'};">Join ${isStudent ? 'Now' : 'Session'} &rarr;</a></td></tr></table>
  ${sig(isStudent ? 'We wish you a productive session!' : 'Thank you for your dedication to our students.')}
</td></tr>`);
}

function scholarshipHtml() {
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Scholarship Award</div>
  <h2 style="font-family:Arial,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 10px;">Congratulations, Danotyanga! &#x1F393;</h2>
  <p style="font-family:Arial,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 18px;">You have been selected as a beneficiary of the <strong style="color:#08514F;">Equity Foundation Nursing Scholarship 2025</strong>.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:12px;margin-bottom:18px;"><tr><td style="padding:20px 24px;"><div style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:5px;">Scholarship Award</div><div style="font-family:Arial,sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:4px;">Full Premium Access &mdash; 90 Days</div><div style="font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.75);">Sponsored by <strong style="color:#F7BC55;">Equity Foundation</strong></div></td></tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="${SITE}/dashboard" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #C7841A;">Start Studying Now &rarr;</a></td></tr></table>
  ${sig('We wish you immense success in your nursing journey.')}
</td></tr>`);
}

function tutorWelcomeHtml() {
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Application Received</div>
  <h2 style="font-family:Arial,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 10px;">Welcome to NurseFiti, Danotyanga! &#x1F393;</h2>
  <p style="font-family:Arial,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 18px;">Thank you for applying to join the NurseFiti tutor network. Your application is <strong style="color:#08514F;">under review</strong>.</p>
  <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:18px;"><div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">What Happens Next</div><div style="font-family:Arial,sans-serif;font-size:13px;color:#1E3535;line-height:1.65;">We will review your documents and notify you within 2–3 business days.</div></div>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="${SITE}/login" style="display:inline-block;background:#08514F;color:#fff;font-family:Arial,sans-serif;font-size:14px;font-weight:700;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #051F1E;">Check Application Status &rarr;</a></td></tr></table>
  ${sig('Thank you for wanting to be part of our mission.')}
</td></tr>`);
}

function tutorApprovedHtml() {
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Application Approved</div>
  <h2 style="font-family:Arial,sans-serif;font-size:24px;font-weight:800;color:#08514F;margin:0 0 10px;">Congratulations, Danotyanga! You&#39;re approved. &#x1F389;</h2>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#08514F 0%,#0A6B68 100%);border-radius:12px;margin-bottom:18px;"><tr><td style="padding:20px 24px;"><div style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F7BC55;margin-bottom:5px;">Verified Tutor</div><div style="font-family:Arial,sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:4px;">Danotyanga &mdash; Gold Tier</div><div style="font-family:Arial,sans-serif;font-size:12.5px;color:rgba(255,255,255,0.75);">Your profile is now live and visible to students.</div></td></tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td align="center"><a href="${SITE}/tutor-dashboard" style="display:inline-block;background:#F5A623;color:#051F1E;font-family:Arial,sans-serif;font-size:14px;font-weight:800;padding:15px 40px;border-radius:8px;text-decoration:none;border-bottom:3px solid #C7841A;">Go to Tutor Dashboard &rarr;</a></td></tr></table>
  ${sig("Welcome to the team — we're excited to have you!")}
</td></tr>`);
}

function tutorRejectedHtml() {
  return wrap(`
<tr><td style="padding:36px 36px 24px;">
  <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0A6B68;margin-bottom:8px;">Application Update</div>
  <h2 style="font-family:Arial,sans-serif;font-size:22px;font-weight:800;color:#08514F;margin:0 0 10px;">Application Update, Danotyanga</h2>
  <p style="font-family:Arial,sans-serif;font-size:14.5px;color:#1E3535;line-height:1.75;margin:0 0 18px;">After carefully reviewing your application, we are unable to approve it at this time.</p>
  <div style="background:#FFF8EA;border:1.5px solid rgba(245,166,35,0.2);border-left:4px solid #F5A623;border-radius:10px;padding:16px 20px;margin-bottom:18px;"><div style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C7841A;margin-bottom:4px;">Reason</div><div style="font-family:Arial,sans-serif;font-size:13.5px;color:#1E3535;line-height:1.65;">The NCK certificate provided appears to be expired. Please reapply with a valid, current certificate.</div></div>
  ${sig('Thank you for your time and interest in our platform.')}
</td></tr>`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n📧 Sending all template samples to', TO, '…\n');
  await send('[①] Welcome — Student',            welcomeHtml('Danotyanga'),          '① Welcome (student)');
  await send('[②] Subscription Confirmed',        subscriptionHtml(),                  '② Subscription Confirmation');
  await send('[③] Session Booking — Student',     sessionHtml('student'),              '③ Session Booking (student)');
  await send('[③] Session Booking — Tutor',       sessionHtml('tutor'),                '③ Session Booking (tutor)');
  await send('[④] Session Reminder — Student',    reminderHtml('student'),             '④ Session Reminder (student)');
  await send('[④] Session Reminder — Tutor',      reminderHtml('tutor'),               '④ Session Reminder (tutor)');
  await send('[⑤] Scholarship Welcome',           scholarshipHtml(),                   '⑤ Scholarship Welcome');
  await send('[⑥] Tutor Application Received',    tutorWelcomeHtml(),                  '⑥ Tutor Welcome (application)');
  await send('[⑦] Tutor Application Approved',    tutorApprovedHtml(),                 '⑦ Tutor Verification — approved');
  await send('[⑧] Tutor Application Rejected',    tutorRejectedHtml(),                 '⑧ Tutor Verification — rejected');
  console.log('\nDone — check your inbox at', TO, '\n');
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1); });
