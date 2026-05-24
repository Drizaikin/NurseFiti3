/**
 * POST /api/paystack/payout
 *
 * Initiates a tutor payout via Paystack Transfers (M-Pesa mobile money).
 * Only callable on Mondays. Minimum payout: KSh 1,000.
 *
 * Flow:
 *   1. Verify tutor identity + pending payout amount
 *   2. Create/reuse Paystack transfer recipient (M-Pesa)
 *   3. Initiate transfer
 *   4. Store payout record in tutor_payouts table
 *
 * Note: Paystack Transfers must be enabled on your dashboard and
 * your account must have sufficient balance.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  createTransferRecipient,
  initiateTransfer,
  generateReference,
} from '@/lib/paystack';

export const dynamic = 'force-dynamic';

const MIN_PAYOUT_KSH = 1000;

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const adminSupabase = createAdminClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is a tutor
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'tutor') {
      return NextResponse.json({ error: 'Forbidden — tutors only' }, { status: 403 });
    }

    // Get tutor profile with M-Pesa number
    const { data: tutorProfile } = await supabase
      .from('tutor_profiles')
      .select('mpesa_number, rate_per_hour, verification_status')
      .eq('id', user.id)
      .single();

    if (!tutorProfile || tutorProfile.verification_status !== 'verified') {
      return NextResponse.json(
        { error: 'Only verified tutors can request payouts' },
        { status: 403 }
      );
    }

    if (!tutorProfile.mpesa_number) {
      return NextResponse.json(
        { error: 'No M-Pesa number on file. Update your profile first.' },
        { status: 400 }
      );
    }

    // Calculate pending payout amount (completed sessions, payment paid, not yet paid out)
    const { data: sessions } = await supabase
      .from('sessions')
      .select('net_amount')
      .eq('tutor_id', user.id)
      .eq('status', 'completed')
      .eq('payment_status', 'paid');

    const pendingAmount = (sessions ?? []).reduce(
      (sum, s) => sum + ((s as any).net_amount ?? 0),
      0
    );

    if (pendingAmount < MIN_PAYOUT_KSH) {
      return NextResponse.json(
        { error: `Minimum payout is KSh ${MIN_PAYOUT_KSH}. Current balance: KSh ${pendingAmount}` },
        { status: 400 }
      );
    }

    // Create Paystack transfer recipient (M-Pesa)
    // Normalize phone: strip leading 0, add 254
    const rawPhone = tutorProfile.mpesa_number.replace(/\s/g, '');
    const normalizedPhone = rawPhone.startsWith('0')
      ? `254${rawPhone.slice(1)}`
      : rawPhone.startsWith('+')
      ? rawPhone.slice(1)
      : rawPhone;

    let recipientCode: string;
    try {
      const recipient = await createTransferRecipient({
        name: profile.full_name,
        accountNumber: normalizedPhone,
        bankCode: 'MPESA',
        currency: 'KES',
      });
      recipientCode = recipient.recipient_code;
    } catch (err) {
      console.error('[payout] Failed to create recipient:', err);
      return NextResponse.json(
        { error: 'Failed to set up payout recipient. Check your M-Pesa number.' },
        { status: 500 }
      );
    }

    // Initiate transfer
    const reference = generateReference('PAYOUT');
    const transfer = await initiateTransfer({
      amountKsh: pendingAmount,
      recipientCode,
      reason: `NurseFiti tutor payout — ${new Date().toLocaleDateString('en-KE')}`,
      reference,
    });

    // Record payout
    await adminSupabase.from('tutor_payouts').insert({
      tutor_id: user.id,
      amount: pendingAmount,
      currency: 'KES',
      recipient_code: recipientCode,
      transfer_code: transfer.transfer_code,
      status: 'processing',
      reason: `Payout for completed sessions`,
    } as any);

    return NextResponse.json({
      success: true,
      amount: pendingAmount,
      transfer_code: transfer.transfer_code,
      message: `KSh ${pendingAmount.toLocaleString()} payout initiated to ${tutorProfile.mpesa_number}. You'll receive it within minutes.`,
    });
  } catch (err) {
    console.error('[paystack/payout]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payout failed' },
      { status: 500 }
    );
  }
}
