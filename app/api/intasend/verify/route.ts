/**
 * GET /api/intasend/verify?reference=NF-xxx
 *
 * Called after IntaSend redirects back to our site (redirect_url).
 * Looks up the payment record by our api_ref, verifies the checkout status
 * with IntaSend, updates the payment record, and provisions access.
 *
 * Redirects to:
 *   /dashboard?payment=success&type=<type>   on success
 *   /dashboard?payment=failed                on failure
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyCheckout } from '@/lib/intasend';
import { fetchPlatformSettings, getDynamicPlanFromAmount, buildDynamicPlanPricingMeta } from '@/lib/platformSettings';
import { addDays } from 'date-fns';
import {
  formatEmailDate,
  formatEmailDateTime,
  formatSessionDuration,
  formatSessionTime,
  getFirstName,
  sendSessionBookingEmails,
  sendSubscriptionConfirmationEmail,
} from '@/lib/email';
import { createGoogleMeetRoom } from '@/lib/google-meet';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nursefiti.co.ke';

  if (!reference) {
    return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=no_reference`);
  }

  try {
    const supabase = createAdminClient();

    // Fetch our payment record by our own reference
    const { data: payment } = await supabase
      .from('payments')
      .select('*')
      .eq('intasend_reference' as any, reference)
      .single() as any;

    if (!payment) {
      return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=not_found`);
    }

    // Idempotency — already processed
    if ((payment as any).status === 'completed') {
      return NextResponse.redirect(
        `${siteUrl}${getSuccessRedirect((payment as any).type)}`
      );
    }

    // Verify with IntaSend using the checkout ID stored at initialization
    const invoiceId = (payment as any).intasend_checkout_id;

    if (!invoiceId) {
      return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=missing_invoice_id`);
    }

    let txn: { state: string; invoice_id?: string; provider?: string } | null = null;
    try {
      txn = await verifyCheckout(invoiceId);
    } catch (verifyErr) {
      // IntaSend status API can throw when the payment is still processing
      // (the checkout hasn't been linked to an invoice yet). Treat as pending.
      console.warn('[intasend/verify] status check threw — treating as pending:', verifyErr);
    }

    // If we couldn't verify or the state is still in-flight, leave pending
    if (!txn || txn.state === 'PENDING' || txn.state === 'PROCESSING') {
      return NextResponse.redirect(`${siteUrl}${getPendingRedirect((payment as any).type)}`);
    }

    if (txn.state === 'FAILED' || txn.state === 'CANCELLED' || txn.state === 'REJECTED') {
      await (supabase as any)
        .from('payments')
        .update({ status: 'failed' })
        .eq('intasend_reference', reference);

      return NextResponse.redirect(`${siteUrl}${getFailedRedirect((payment as any).type)}`);
    }

    if (txn.state !== 'COMPLETE' && txn.state !== 'COMPLETED') {
      // Any other unrecognized state — do not provision access
      return NextResponse.redirect(`${siteUrl}${getPendingRedirect((payment as any).type)}`);
    }

    // Mark payment as completed
    await (supabase as any)
      .from('payments')
      .update({
        status: 'completed',
        intasend_invoice_id: txn.invoice_id,
        intasend_channel: txn.provider,
        completed_at: new Date().toISOString(),
      })
      .eq('id', (payment as any).id);

    // Provision access based on payment type
    try {
      await provisionAccess(supabase, payment as any, txn);
    } catch (provisionErr) {
      console.error('[intasend/verify] provisionAccess failed for payment', (payment as any).id, provisionErr);
      // Payment was taken — redirect to success regardless so we don't confuse the user
    }

    return NextResponse.redirect(
      `${siteUrl}${getSuccessRedirect((payment as any).type)}`
    );
  } catch (err) {
    console.error('[intasend/verify]', err);
    // Don't send to a "failed" page — the payment may still complete via webhook
    const type = req.nextUrl.searchParams.get('type');
    const safeRedirect = type === 'session_booking' ? '/bookings?payment=pending' : '/settings?payment=pending';
    return NextResponse.redirect(`${siteUrl}${safeRedirect}`);
  }
}

// ---------------------------------------------------------------------------
// Provision access after successful payment
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function provisionAccess(supabase: any, payment: any, txn: any) {
  switch (payment.type) {
    case 'sponsor_deposit': {
      await supabase
        .from('scholarship_deposits')
        .insert({
          campaign_id: payment.reference_id,
          amount_kes: payment.amount,
          reference: txn.invoice_id ?? payment.intasend_reference ?? payment.id,
          notes: 'IntaSend online deposit'
        });
      break;
    }

    case 'plan_subscription': {
      const settings = await fetchPlatformSettings(supabase);
      const { tier, durationDays } = getDynamicPlanFromAmount(payment.amount, settings);
      const activatedAt = new Date();
      const expiresAt = addDays(activatedAt, durationDays).toISOString();

      // Upgrade the student's plan tier and expiry
      await supabase
        .from('student_profiles')
        .update({
          plan_tier: tier,
          plan_expires_at: expiresAt,
        })
        .eq('id', payment.user_id);

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', payment.user_id)
        .single();

      const dynamicMeta = buildDynamicPlanPricingMeta(settings);

      await sendSubscriptionConfirmationEmail({
        to: profile?.email,
        firstName: getFirstName(profile?.full_name),
        planName: (dynamicMeta as any)[tier]?.label ?? 'Plan',
        amount: `KSh ${Number(payment.amount).toLocaleString('en-KE')}`,
        startDate: formatEmailDate(activatedAt),
        endDate: formatEmailDate(expiresAt),
        transactionId: txn.invoice_id ?? payment.intasend_reference ?? payment.id,
      });
      break;
    }

    case 'revision_plan': {
      await supabase
        .from('revision_plans')
        .update({ payment_ref: txn.invoice_id })
        .eq('id', payment.reference_id);
      break;
    }

    case 'hd_material_purchase': {
      // Grant access by inserting purchase record
      await (supabase as any)
        .from('hd_material_purchases')
        .upsert({
          student_id:  payment.user_id,
          material_id: payment.reference_id,
          payment_id:  payment.id,
          amount_paid: payment.amount,
          purchased_at: new Date().toISOString(),
        }, { onConflict: 'student_id,material_id' });

      // Increment download_count via SECURITY DEFINER RPC
      await (supabase as any)
        .rpc('increment_hd_material_downloads', { p_material_id: payment.reference_id })
        .then(({ error }: any) => {
          if (error) console.error('[hd_material_purchase] RPC increment failed:', error);
        });
      break;
    }

    case 'session_booking': {
      await supabase
        .from('sessions')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          payment_reference: txn.invoice_id,
        })
        .eq('id', payment.reference_id);

      const { data: session } = await supabase
        .from('sessions')
        .select('id, student_id, tutor_id, session_date, start_time, end_time, topic, cadre, platform, join_link')
        .eq('id', payment.reference_id)
        .single();

      if (session) {
        const sessionDate = new Date(session.session_date).toLocaleDateString('en-KE', {
          weekday: 'short', month: 'short', day: 'numeric',
        });

        await supabase.from('notifications').insert([
          {
            user_id: session.student_id,
            type: 'session_confirmed',
            title: 'Session Confirmed',
            body: `Your session on ${sessionDate} at ${session.start_time} has been confirmed.`,
            action_url: '/bookings',
          },
          {
            user_id: session.tutor_id,
            type: 'new_booking',
            title: 'New Booking',
            body: `New session booked for ${sessionDate} at ${session.start_time}. Topic: ${session.topic ?? 'General revision'}.`,
            action_url: '/tutor-schedule',
          },
        ]);

        const [{ data: studentProfile }, { data: tutorProfile }] = await Promise.all([
          supabase.from('profiles').select('full_name, email').eq('id', session.student_id).single(),
          supabase.from('profiles').select('full_name, email').eq('id', session.tutor_id).single(),
        ]);

        let finalJoinLink = session.join_link;

        // Auto-generate Google Meet link if missing and platform is Google Meet
        if (!finalJoinLink && session.platform === 'Google Meet') {
          try {
            const startIso = new Date(`${session.session_date}T${session.start_time}+03:00`).toISOString();
            const endIso = new Date(`${session.session_date}T${session.end_time}+03:00`).toISOString();
            const emails = [studentProfile?.email, tutorProfile?.email].filter(Boolean) as string[];

            finalJoinLink = await createGoogleMeetRoom(
              `NurseFiti Tutoring: ${session.topic || 'Session'}`,
              `NurseFiti 1-on-1 Session`,
              startIso,
              endIso,
              emails
            );

            await supabase
              .from('sessions')
              .update({ join_link: finalJoinLink })
              .eq('id', session.id);
          } catch (meetErr) {
            console.error('[intasend/verify] Auto meet generation failed:', meetErr);
          }
        }

        await sendSessionBookingEmails({
          studentEmail: studentProfile?.email,
          tutorEmail: tutorProfile?.email,
          studentName: studentProfile?.full_name ?? 'Student',
          tutorName: tutorProfile?.full_name ?? 'Tutor',
          subject: session.topic ?? session.cadre ?? 'General revision',
          sessionDate: formatEmailDateTime(session.session_date),
          sessionTime: formatSessionTime(session.start_time, session.end_time),
          duration: formatSessionDuration(session.start_time, session.end_time),
          meetingLink: finalJoinLink ?? 'The tutor will add the meeting link before the session.',
          bookingId: payment.reference_id,
        });
      }
      break;
    }
  }
}

function getSuccessRedirect(type: string): string {
  switch (type) {
    case 'revision_plan':          return '/revision-plan?payment=success';
    case 'session_booking':        return '/bookings?payment=success';
    case 'plan_subscription':      return '/settings?payment=success';
    case 'hd_material_purchase':   return '/hd-materials?payment=success';
    case 'sponsor_deposit':        return '/dashboard?payment=success&type=sponsor';
    default:                       return '/dashboard?payment=success';
  }
}

function getPendingRedirect(type: string): string {
  switch (type) {
    case 'session_booking':        return '/bookings?payment=pending';
    case 'hd_material_purchase':   return '/hd-materials?payment=pending';
    case 'revision_plan':          return '/revision-plan?payment=pending';
    case 'plan_subscription':      return '/settings?payment=pending';
    default:                       return '/dashboard?payment=pending';
  }
}

function getFailedRedirect(type: string): string {
  switch (type) {
    case 'session_booking':        return '/bookings?payment=failed';
    case 'hd_material_purchase':   return '/hd-materials?payment=failed';
    case 'revision_plan':          return '/revision-plan?payment=failed';
    case 'plan_subscription':      return '/dashboard?payment=failed&reason=failed';
    default:                       return '/dashboard?payment=failed&reason=failed';
  }
}
