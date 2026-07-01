/**
 * POST /api/intasend/initialize
 *
 * Creates an IntaSend checkout session and returns the hosted checkout URL
 * for the client to redirect to.
 *
 * Body:
 *   type        — 'plan_subscription' | 'revision_plan' | 'session_booking'
 *   amountKsh   — amount in KSh (e.g. 69, 299, 999, 3500)
 *   referenceId — UUID of the resource being paid for (session id, etc.)
 *   metadata    — optional extra data stored on the transaction
 *
 * Returns:
 *   { checkout_url, reference }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createCheckout, generateReference } from '@/lib/intasend';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  type: z.enum(['plan_subscription', 'revision_plan', 'session_booking', 'sponsor_deposit']),
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

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, phone, full_name')
      .eq('id', user.id)
      .single() as any;

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Parse JSON body — return 400 on malformed JSON
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    // Validate body
    const body = bodySchema.safeParse(rawBody);
    if (!body.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: body.error.flatten() },
        { status: 400 }
      );
    }

    const { type, amountKsh, referenceId } = body.data;

    // Enforce valid plan prices for plan_subscription
    const VALID_PLAN_PRICES = [99, 499, 1199, 3500];
    if (type === 'plan_subscription' && !VALID_PLAN_PRICES.includes(amountKsh)) {
      return NextResponse.json(
        { error: `Invalid plan price. Must be one of: ${VALID_PLAN_PRICES.join(', ')}` },
        { status: 400 }
      );
    }

    const reference = generateReference('NF');

    // Split full name into first/last for IntaSend
    const nameParts = (profile.full_name ?? '').trim().split(' ');
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ') || undefined;

    // Normalize phone for IntaSend (needs 254... format)
    const rawPhone = (profile.phone ?? '').replace(/\s/g, '');
    const phone = rawPhone.startsWith('0')
      ? `254${rawPhone.slice(1)}`
      : rawPhone.startsWith('+')
      ? rawPhone.slice(1)
      : rawPhone || undefined;

    const appOrigin = req.nextUrl.origin;

    // Create IntaSend checkout
    const result = await createCheckout({
      email: profile.email,
      phone_number: phone,
      first_name: firstName,
      last_name: lastName,
      amount: amountKsh,
      currency: 'KES',
      api_ref: reference,
      redirect_url: `${appOrigin}/api/intasend/verify?reference=${reference}`,
      comment: `NurseFiti ${type.replace(/_/g, ' ')}`,
    });

    // Store pending payment record using the admin client — the payments table
    // has RLS enabled with no INSERT policy for end users, so using the user
    // session client causes a silent rejection.
    const admin = createAdminClient();
    const insertPayload: any = {
      user_id: user.id,
      type,
      amount: amountKsh,
      currency: 'KES',
      customer_phone: phone ?? profile.phone,
      intasend_reference: reference,
      intasend_checkout_id: result.id,
      intasend_checkout_url: result.url,
      intasend_signature: result.signature,
      status: 'pending',
      reference_id: referenceId ?? null,
    };

    if (body.data.metadata) {
      insertPayload.metadata = body.data.metadata;
    }

    const { error: insertError } = await admin.from('payments').insert(insertPayload);

    if (insertError) {
      console.error('[intasend/initialize] payment insert failed:', insertError);
      return NextResponse.json(
        { error: 'Could not record payment. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkout_url: result.url,
      reference,
    });
  } catch (err) {
    console.error('[intasend/initialize]', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
