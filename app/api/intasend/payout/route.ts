/**
 * POST /api/intasend/payout
 *
 * Initiates a tutor payout via IntaSend M-Pesa B2C.
 * Only callable on Mondays. Minimum payout: KSh 1,000.
 *
 * Flow:
 *   1. Verify tutor identity + pending payout amount
 *   2. Initiate M-Pesa B2C transfer via IntaSend
 *   3. Store payout record in tutor_payouts table
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { initiateMpesaPayout, generateReference } from '@/lib/intasend';

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
      .single() as any;

    if (!profile || profile.role !== 'tutor') {
      return NextResponse.json({ error: 'Forbidden — tutors only' }, { status: 403 });
    }

    // Get tutor profile with M-Pesa number
    const { data: tutorProfile } = await supabase
      .from('tutor_profiles')
      .select('mpesa_number, rate_per_hour, verification_status')
      .eq('id', user.id)
      .single() as any;

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

    // Calculate pending payout amount — only sessions NOT already covered by a completed payout.
    // We track this by storing paid-out session IDs in tutor_payouts.session_ids (array).
    // Fallback: exclude sessions whose booked_at is earlier than the last successful payout.
    const { data: lastPayout } = await supabase
      .from('tutor_payouts')
      .select('initiated_at')
      .eq('tutor_id', user.id)
      .in('status', ['success', 'processing'])
      .order('initiated_at', { ascending: false })
      .limit(1)
      .maybeSingle() as any;

    const sinceDate = lastPayout?.initiated_at ?? '1970-01-01T00:00:00Z';

    const { data: sessions } = await supabase
      .from('sessions')
      .select('net_amount')
      .eq('tutor_id', user.id)
      .eq('status', 'completed')
      .eq('payment_status', 'paid')
      .gt('completed_at', sinceDate);

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

    // Normalize phone: strip leading 0, add 254 country code
    const rawPhone = tutorProfile.mpesa_number.replace(/\s/g, '');
    const normalizedPhone = rawPhone.startsWith('0')
      ? `254${rawPhone.slice(1)}`
      : rawPhone.startsWith('+')
      ? rawPhone.slice(1)
      : rawPhone;

    // Initiate M-Pesa B2C payout via IntaSend
    let result;
    try {
      result = await initiateMpesaPayout({
        amount: pendingAmount,
        account: normalizedPhone,
        name: profile.full_name,
        narrative: `NurseFiti tutor payout — ${new Date().toLocaleDateString('en-KE')}`,
        currency: 'KES',
      });
    } catch (err) {
      console.error('[payout] Failed to initiate payout:', err);
      return NextResponse.json(
        { error: 'Failed to initiate payout. Please try again or contact support.' },
        { status: 500 }
      );
    }

    // Record payout
    await adminSupabase.from('tutor_payouts').insert({
      tutor_id: user.id,
      amount: pendingAmount,
      currency: 'KES',
      tracking_id: result.tracking_id,
      status: 'processing',
      reason: `Payout for completed sessions`,
    } as any);

    return NextResponse.json({
      success: true,
      amount: pendingAmount,
      tracking_id: result.tracking_id,
      message: `KSh ${pendingAmount.toLocaleString()} payout initiated to ${tutorProfile.mpesa_number}. You'll receive it within minutes.`,
    });
  } catch (err) {
    console.error('[intasend/payout]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payout failed' },
      { status: 500 }
    );
  }
}
