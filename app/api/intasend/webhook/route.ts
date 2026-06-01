/**
 * POST /api/intasend/webhook
 *
 * Receives IntaSend webhook events. This is the server-to-server notification
 * that fires whenever a payment state changes.
 *
 * Set this URL in your IntaSend dashboard under Webhooks:
 *   https://www.nursefiti.co.ke/api/intasend/webhook
 *
 * Also set a "challenge" string in the dashboard and add it to your env:
 *   INTASEND_WEBHOOK_CHALLENGE=your-challenge-string
 *
 * Events handled (collection events — state field):
 *   COMPLETE  — payment completed
 *   FAILED    — payment failed
 *
 * Send money events (status field):
 *   Completed — tutor payout completed
 *   Failed Processing — tutor payout failed
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyWebhookChallenge } from '@/lib/intasend';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Validate the challenge to confirm the request is from IntaSend
  const challenge = body.challenge as string | undefined;
  if (!verifyWebhookChallenge(challenge)) {
    console.warn('[intasend/webhook] Invalid challenge — request rejected');
    return NextResponse.json({ error: 'Invalid challenge' }, { status: 401 });
  }

  const supabase = createAdminClient();

  try {
    // Collection event — has invoice_id and state
    if (body.invoice_id && body.state) {
      await handleCollectionEvent(supabase, body);
      return NextResponse.json({ received: true });
    }

    // Send money event — has file_id and status
    if (body.file_id && body.status) {
      await handleSendMoneyEvent(supabase, body);
      return NextResponse.json({ received: true });
    }

    // Unknown event shape — acknowledge without error
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[intasend/webhook] Error handling event:', err);
    // Return 200 so IntaSend doesn't deactivate the webhook
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCollectionEvent(supabase: any, data: any) {
  const invoiceId = data.invoice_id as string;
  const state = data.state as string;
  const apiRef = data.api_ref as string; // our reference (NF-xxx)
  const provider = data.provider as string;

  // Find our payment record by our own api_ref
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('intasend_reference', apiRef)
    .single();

  if (!payment) {
    console.warn(`[intasend/webhook] Payment not found for api_ref: ${apiRef}`);
    return;
  }

  if (state === 'COMPLETE') {
    // Idempotency — already processed
    if (payment.status === 'completed') return;

    await supabase
      .from('payments')
      .update({
        status: 'completed',
        intasend_invoice_id: invoiceId,
        intasend_channel: provider,
        completed_at: new Date().toISOString(),
      })
      .eq('id', payment.id);

    // Pass a txnData shape consistent with what provisionAccess expects
    await provisionAccess(supabase, payment, { invoice_id: invoiceId, provider });
  } else if (state === 'FAILED') {
    if (payment.status === 'failed') return;

    await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('id', payment.id);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSendMoneyEvent(supabase: any, data: any) {
  const trackingId = data.tracking_id as string;
  const status = data.status as string;

  // Map IntaSend send-money status to our payout status
  let payoutStatus: string;
  if (status === 'Completed') {
    payoutStatus = 'success';
  } else if (status === 'Failed Processing') {
    payoutStatus = 'failed';
  } else {
    payoutStatus = 'processing';
  }

  await supabase
    .from('tutor_payouts')
    .update({
      status: payoutStatus,
      completed_at: payoutStatus === 'success' ? new Date().toISOString() : null,
    })
    .eq('tracking_id', trackingId);
}

// ---------------------------------------------------------------------------
// Provision access (same logic as verify route — kept in sync)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function provisionAccess(supabase: any, payment: any, txnData: any) {
  switch (payment.type) {
    case 'plan_subscription': {
      const { tier, durationDays } = getPlanFromAmount(payment.amount);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + durationDays);

      await supabase
        .from('student_profiles')
        .update({ plan_tier: tier, plan_expires_at: expiresAt.toISOString() })
        .eq('id', payment.user_id);
      break;
    }

    case 'revision_plan': {
      if (payment.reference_id) {
        await supabase
          .from('revision_plans')
          .update({ payment_ref: txnData.invoice_id })
          .eq('id', payment.reference_id);
      } else {
        await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('id', payment.id);
      }
      break;
    }

    case 'session_booking': {
      if (!payment.reference_id) break;

      await supabase
        .from('sessions')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          payment_reference: txnData.invoice_id,
        })
        .eq('id', payment.reference_id);

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
  if (amountKsh >= 999)  return { tier: 'standard', durationDays: 30 };
  if (amountKsh >= 299)  return { tier: 'weekly',   durationDays: 7  };
  if (amountKsh >= 69)   return { tier: 'daily',    durationDays: 1  };
  return { tier: 'free', durationDays: 0 };
}
