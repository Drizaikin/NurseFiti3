/**
 * Run once to send a sample of every email template to danotyanga@gmail.com.
 *
 * Usage (from the NurseFiti3 directory):
 *   npx ts-node --skip-project sendTestEmails.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ── 1. Load .env.local ────────────────────────────────────────────────────────
const envPath = path.resolve(__dirname, '.env.local');
const envText = fs.readFileSync(envPath, 'utf8');
for (const line of envText.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
  process.env[key] = val;
}

// ── 2. Import email functions ─────────────────────────────────────────────────
import {
  sendWelcomeEmail,
  sendSubscriptionConfirmationEmail,
  sendSessionBookingEmails,
  sendSessionReminderEmail,
  sendScholarshipWelcomeEmail,
  sendTutorWelcomeEmail,
  sendTutorVerificationEmail,
} from './lib/email';

const TO = 'danotyanga@gmail.com';
const TODAY = new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
const NEXT_WEEK = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });

async function main() {
  console.log('\n📧 Sending sample emails to', TO, '…\n');

  // ① Welcome — Student
  process.stdout.write('  ① Welcome (student)                 … ');
  const r1 = await sendWelcomeEmail({ to: TO, firstName: 'Danotyanga' });
  console.log(r1.sent ? '✅ sent' : `❌ ${r1.reason}`);

  // ② Subscription Confirmation
  process.stdout.write('  ② Subscription Confirmation          … ');
  const r2 = await sendSubscriptionConfirmationEmail({
    to: TO,
    firstName: 'Danotyanga',
    planName: 'Premium — 6 Months',
    amount: 'KES 1,500',
    startDate: TODAY,
    endDate: NEXT_WEEK,
    transactionId: 'MPESA-TEST-001',
  });
  console.log(r2.sent ? '✅ sent' : `❌ ${r2.reason}`);

  // ③ Session Booking — student + tutor
  process.stdout.write('  ③ Session Booking (student + tutor)  … ');
  const [r3s, r3t] = await sendSessionBookingEmails({
    studentEmail: TO,
    tutorEmail: TO,
    studentName: 'Danotyanga',
    tutorName: 'Dr. Kamau',
    subject: 'Medical-Surgical Nursing',
    sessionDate: NEXT_WEEK,
    sessionTime: '10:00 - 11:00',
    duration: '1 hour',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    bookingId: 'BKG-TEST-001',
  });
  console.log(r3s.sent && r3t.sent ? '✅ sent (x2)' : `❌ student:${r3s.sent} tutor:${r3t.sent}`);

  // ④ Session Reminder — student + tutor
  process.stdout.write('  ④ Session Reminder (student + tutor) … ');
  const [r4s, r4t] = await sendSessionReminderEmail(
    {
      studentEmail: TO,
      tutorEmail: TO,
      studentName: 'Danotyanga',
      tutorName: 'Dr. Kamau',
      subject: 'Medical-Surgical Nursing',
      sessionDate: NEXT_WEEK,
      sessionTime: '10:00 - 11:00',
      duration: '1 hour',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      bookingId: 'BKG-TEST-001',
    },
    '30 minutes',
  );
  console.log(r4s.sent && r4t.sent ? '✅ sent (x2)' : `❌ student:${r4s.sent} tutor:${r4t.sent}`);

  // ⑤ Scholarship Welcome
  process.stdout.write('  ⑤ Scholarship Welcome                … ');
  const r5 = await sendScholarshipWelcomeEmail({
    to: TO,
    firstName: 'Danotyanga',
    campaignName: 'Equity Foundation Nursing Scholarship 2025',
    sponsorName: 'Equity Foundation',
    beneficiaryType: 'FULL',
  });
  console.log(r5.sent ? '✅ sent' : `❌ ${r5.reason}`);

  // ⑥ Tutor Welcome (on application)
  process.stdout.write('  ⑥ Tutor Welcome (application)        … ');
  const r6 = await sendTutorWelcomeEmail({ to: TO, firstName: 'Danotyanga' });
  console.log(r6.sent ? '✅ sent' : `❌ ${r6.reason}`);

  // ⑦ Tutor Verified
  process.stdout.write('  ⑦ Tutor Verification — approved      … ');
  const r7 = await sendTutorVerificationEmail({
    to: TO,
    firstName: 'Danotyanga',
    status: 'verified',
    tier: 'gold',
  });
  console.log(r7.sent ? '✅ sent' : `❌ ${r7.reason}`);

  // ⑧ Tutor Rejected
  process.stdout.write('  ⑧ Tutor Verification — rejected      … ');
  const r8 = await sendTutorVerificationEmail({
    to: TO,
    firstName: 'Danotyanga',
    status: 'rejected',
    reason: 'The NCK certificate provided appears to be expired. Please reapply with a valid, current certificate.',
  });
  console.log(r8.sent ? '✅ sent' : `❌ ${r8.reason}`);

  console.log('\nDone — check your inbox at', TO, '\n');
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
