/**
 * GET /api/paystack/verify?reference=NF-xxx
 *
 * Called after Paystack redirects back to our site (callback_url).
 * Verifies the transaction server-side, updates the payment record,
 * and provisions access (plan, revision plan, or session confirmation).
 *
 * Redirects to:
 *   /dashboard?payment=success&type=<type>   on success
 *   /dashboard?payment=failed                on failure
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { verifyTransaction } from '@/lib/paystack';
import { addDays, addMonths } from 'date-fns';

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  if (!reference) {
    return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=no_reference`);
  }

  try {
    const supabase = createRouteClient();

    // Verify with Paystack
    const txn = await verifyTransaction(reference);

    if (txn.status !== 'success') {
      await supabase
        .from('payments')
        .update({ status: 'failed' } as any)
        .eq('paystack_reference' as any, reference);

      return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=${txn.status}`);
    }

    // Fetch our payment record
    const { data: payment } = await supabase
      .from('payments')
      .select('*')
      .eq('paystack_reference' as any, reference)
      .single();

    if (!payment) {
      return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=not_found`);
    }

    // Idempotency — already processed
    if ((payment as any).status === 'completed') {
      return NextResponse.redirect(
        `${siteUrl}${getSuccessRedirect((payment as any).type)}`
      );
    }

    // Mark payment as completed
    await supabase
      .from('payments')
      .update({
        status: 'completed',
        paystack_receipt: txn.reference,
        paystack_channel: txn.channel,
        completed_at: new Date().toISOString(),
      } as any)
      .eq('id', (payment as any).id);

    // Provision access based on payment type
    await provisionAccess(supabase, payment as any, txn);

    return NextResponse.redirect(
      `${siteUrl}${getSuccessRedirect((payment as any).type)}`
    );
  } catch (err) {
    console.error('[paystack/verify]', err);
    return NextResponse.redirect(`${siteUrl}/dashboard?payment=failed&reason=server_error`);
  }
}

// ---------------------------------------------------------------------------
// Provision access after successful payment
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function provisionAccess(supabase: any, payment: any, txn: any) {
  switch (payment.type) {
    case 'plan_subscription': {
      // Determine plan tier and duration from amount
      const { tier, durationDays } = getPlanFromAmount(payment.amount);
      const expiresAt = addDays(new Date(), durationDays).toISOString();

      await supabase
        .from('student_profiles')
        .update({ plan_tier: tier, plan_expires_at: expiresAt })
        .eq('id', payment.user_id);
      break;
    }

    case 'revision_plan': {
      // Mark the revision plan as paid so the generator unlocks
      // The actual plan generation happens when the student submits the form
      await supabase
        .from('revision_plans')
        .update({ payment_ref: txn.reference })
        .eq('id', payment.reference_id);
      break;
    }

    case 'session_booking': {
      // Confirm the session and mark payment as paid
      await supabase
        .from('sessions')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          payment_reference: txn.reference,
        })
        .eq('id', payment.reference_id);

      // Create notifications for both student and tutor
      const { data: session } = await supabase
        .from('sessions')
        .select('student_id, tutor_id, session_date, start_time, topic')
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
      }
      break;
    }
  }
}

function getPlanFromAmount(amountKsh: number): { tier: string; durationDays: number } {
  if (amountKsh >= 3500) return { tier: 'premium',  durationDays: 90 };
  if (amountKsh >= 1200) return { tier: 'standard', durationDays: 30 };
  if (amountKsh >= 349)  return { tier: 'weekly',   durationDays: 7  };
  if (amountKsh >= 69)   return { tier: 'daily',    durationDays: 1  };
  return { tier: 'free', durationDays: 0 };
}

function getSuccessRedirect(type: string): string {
  switch (type) {
    case 'revision_plan':    return '/revision-plan?payment=success';
    case 'session_booking':  return '/bookings?payment=success';
    case 'plan_subscription': return '/settings?payment=success';
    default:                 return '/dashboard?payment=success';
  }
}
