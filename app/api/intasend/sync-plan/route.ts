/**
 * POST /api/intasend/sync-plan
 *
 * Re-checks the current student's latest IntaSend plan payment and upgrades
 * the account if IntaSend confirms the checkout was paid. This is a recovery
 * path for cases where the customer paid but the redirect/webhook was missed.
 */

import { NextResponse } from 'next/server';
import { addDays } from 'date-fns';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyCheckout } from '@/lib/intasend';
import { fetchPlatformSettings, getDynamicPlanFromAmount, buildDynamicPlanPricingMeta } from '@/lib/platformSettings';
import {
  formatEmailDate,
  getFirstName,
  sendSubscriptionConfirmationEmail,
} from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const userClient = createRouteClient();
    const { data: { user }, error: authError } = await userClient.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createAdminClient();

    const settings = await fetchPlatformSettings(admin as any);
    const { data: payments, error: paymentError } = await (admin as any)
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'plan_subscription')
      .in('status', ['pending', 'completed'])
      .order('initiated_at', { ascending: false })
      .limit(5);

    if (paymentError) throw paymentError;

    const payment = payments?.find((p: any) => Number(p.amount) >= settings.plan_daily_price);
    if (!payment) {
      return NextResponse.json({ error: 'No recent plan payment found.' }, { status: 404 });
    }

    const wasAlreadyCompleted = payment.status === 'completed';
    let transactionId = payment.intasend_invoice_id ?? payment.intasend_reference ?? payment.id;

    if (payment.status !== 'completed') {
      const invoiceId = payment.intasend_checkout_id;
      if (!invoiceId) {
        return NextResponse.json({ error: 'Payment is missing its IntaSend checkout ID.' }, { status: 400 });
      }

      const txn = await verifyCheckout(invoiceId);
      if (txn.state !== 'COMPLETE') {
        return NextResponse.json({
          upgraded: false,
          state: txn.state,
          message: `IntaSend still reports this payment as ${txn.state}.`,
        });
      }

      await (admin as any)
        .from('payments')
        .update({
          status: 'completed',
          intasend_invoice_id: txn.invoice_id,
          intasend_channel: txn.provider,
          completed_at: new Date().toISOString(),
        })
        .eq('id', payment.id);

      transactionId = txn.invoice_id ?? transactionId;
    }


    const { tier, durationDays } = getDynamicPlanFromAmount(Number(payment.amount), settings);
    // Use the original payment completion time so double-clicking sync doesn't shorten the subscription
    const baseDate = payment.completed_at ? new Date(payment.completed_at) : new Date();
    const expiresAt = addDays(baseDate, durationDays).toISOString();

    await (admin as any)
      .from('student_profiles')
      .update({ plan_tier: tier, plan_expires_at: expiresAt })
      .eq('id', user.id);

    if (!wasAlreadyCompleted) {
      const { data: profile } = await (admin as any)
        .from('profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single();

      const dynamicMeta = buildDynamicPlanPricingMeta(settings);
      await sendSubscriptionConfirmationEmail({
        to: profile?.email ?? user.email,
        firstName: getFirstName(profile?.full_name ?? user.user_metadata?.full_name),
        planName: (dynamicMeta as any)[tier]?.label ?? 'Plan',
        amount: `KSh ${Number(payment.amount).toLocaleString('en-KE')}`,
        startDate: formatEmailDate(baseDate),
        endDate: formatEmailDate(expiresAt),
        transactionId,
      });
    }

    return NextResponse.json({
      upgraded: true,
      tier,
      expiresAt,
      amountKsh: Number(payment.amount),
    });
  } catch (err) {
    console.error('[intasend/sync-plan]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Could not sync payment.' },
      { status: 500 }
    );
  }
}

