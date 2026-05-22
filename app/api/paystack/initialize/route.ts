/**
 * POST /api/paystack/initialize
 *
 * Initializes a Paystack transaction and returns the authorization_url
 * for the client to redirect to (or open in a popup via Paystack Inline JS).
 *
 * Body:
 *   type        — 'plan_subscription' | 'revision_plan' | 'session_booking'
 *   amountKsh   — amount in KSh (e.g. 500, 1200, 3500)
 *   referenceId — UUID of the resource being paid for (session id, etc.)
 *   metadata    — optional extra data stored on the transaction
 *
 * Returns:
 *   { authorization_url, reference, access_code }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { initializeTransaction, generateReference } from '@/lib/paystack';
import { z } from 'zod';

const bodySchema = z.object({
  type: z.enum(['plan_subscription', 'revision_plan', 'session_booking']),
  amountKsh: z.number().int().positive(),
  referenceId: z.string().uuid().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user email and phone
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, phone, full_name')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Validate body
    const body = bodySchema.safeParse(await req.json());
    if (!body.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: body.error.flatten() },
        { status: 400 }
      );
    }

    const { type, amountKsh, referenceId, metadata } = body.data;
    const reference = generateReference('NF');

    // Initialize with Paystack
    const result = await initializeTransaction({
      email: profile.email,
      amountKsh,
      reference,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paystack/verify?reference=${reference}`,
      metadata: {
        user_id: user.id,
        user_name: profile.full_name,
        payment_type: type,
        reference_id: referenceId ?? null,
        ...metadata,
      },
      channels: ['card', 'bank', 'mobile_money', 'bank_transfer'],
    });

    // Store pending payment record
    await supabase.from('payments').insert({
      user_id: user.id,
      type,
      amount: amountKsh,
      currency: 'KES',
      customer_phone: profile.phone,
      paystack_reference: reference,
      paystack_access_code: result.access_code,
      paystack_authorization_url: result.authorization_url,
      status: 'pending',
      reference_id: referenceId ?? null,
    } as any);

    return NextResponse.json({
      authorization_url: result.authorization_url,
      access_code: result.access_code,
      reference: result.reference,
    });
  } catch (err) {
    console.error('[paystack/initialize]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
