/**
 * POST /api/paystack/webhook
 *
 * Receives Paystack webhook events. This is the server-to-server notification
 * that fires regardless of whether the user completes the redirect flow.
 *
 * Set this URL in your Paystack dashboard:
 *   https://nursefiti.com/api/paystack/webhook
 *
 * Events handled:
 *   charge.success       — payment completed
 *   transfer.success     — tutor payout completed
 *   transfer.failed      — tutor payout failed
 *   transfer.reversed    — tutor payout reversed
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyWebhookSignature } from '@/lib/paystack';

export async function POST(req: NextRequest) {
  // Read raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get('x-paystack-signature');

  // Verify the request is genuinely from Paystack
  if (!verifyWebhookSignature(rawBody, signature)) {
    console.warn('[paystack/webhook] Invalid signature — request rejected');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: { event: string; data: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(supabase, event.data);
        break;

      case 'transfer.success':
        await handleTransferUpdate(supabase, event.data, 'success');
        break;

      case 'transfer.failed':
        await handleTransferUpdate(supabase, event.data, 'failed');
        break;

      case 'transfer.reversed':
        await handleTransferUpdate(supabase, event.data, 'reversed');
        break;

      default:
        // Acknowledge unknown events without error
        break;
    }
  } catch (err) {
    console.error(`[paystack/webhook] Error handling ${event.event}:`, err);
    // Return 200 so Paystack doesn't retry — log the error for investigation
    return NextResponse.json({ received: true, error: 'Processing error' });
  }

  return NextResponse.json({ received: true });
}

// ---------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleChargeSuccess(supabase: any, data: any) {
  const reference = data.reference as string;
  const channel = data.channel as string;

  // Find our payment record
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('paystack_reference', reference)
    .single();

  if (!payment) {
    console.warn(`[paystack/webhook] Payment not found for reference: ${reference}`);
    return;
  }

  // Idempotency — already processed (e.g. via the redirect verify route)
  if (payment.status === 'completed') return;

  // Mark as completed
  await supabase
    .from('payments')
    .update({
      status: 'completed',
      paystack_receipt: reference,
      paystack_channel: channel,
      completed_at: new Date().toISOString(),
    })
    .eq('id', payment.id);

  // Provision access
  await provisionAccess(supabase, payment, data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleTransferUpdate(supabase: any, data: any, status: string) {
  const transferCode = data.transfer_code as string;

  await supabase
    .from('tutor_payouts')
    .update({
      status,
      completed_at: status === 'success' ? new Date().toISOString() : null,
    })
    .eq('transfer_code', transferCode);
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
          .update({ payment_ref: txnData.reference })
          .eq('id', payment.reference_id);
      } else {
        // Payment before plan creation — mark user as having paid
        // The generate route will check for a completed revision_plan payment
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
          payment_reference: txnData.reference,
        })
        .eq('id', payment.reference_id);

      // Notifications
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
