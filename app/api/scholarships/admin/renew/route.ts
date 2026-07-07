import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';
import { fetchPlatformSettings } from '@/lib/platformSettings';

const renewSchema = z.object({
  application_id: z.string().uuid(),
  decision: z.enum(['FULL', 'SUBSIDIZED'])
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient() as any;
    const adminSupabase = createAdminClient() as any;

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify Admin role
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const parsed = renewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
    }

    const { application_id, decision } = parsed.data;

    const { data: application, error: appError } = await adminSupabase
      .from('scholarship_applications')
      .select('*, scholarship_campaigns(*)')
      .eq('id', application_id)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status !== 'approved') {
      return NextResponse.json({ error: 'Cannot renew a non-approved application. Please approve it first.' }, { status: 400 });
    }

    const campaign = application.scholarship_campaigns;

    // Check if already an active beneficiary
    const { data: existingBen } = await adminSupabase
      .from('scholarship_beneficiaries')
      .select('id')
      .eq('student_id', application.student_id)
      .eq('campaign_id', campaign.id)
      .maybeSingle();

    if (existingBen) {
      return NextResponse.json({ error: 'Student is already an active beneficiary.' }, { status: 400 });
    }

    const settings = await fetchPlatformSettings(adminSupabase as any);
    const premiumPrice = settings.plan_premium_price; // dynamic

    let allocatedAmount = 0;
    
    if (decision === 'FULL') {
      allocatedAmount = premiumPrice;
    } else if (decision === 'SUBSIDIZED') {
      const discountMult = (100 - campaign.subsidy_discount_percentage) / 100;
      allocatedAmount = Math.round(premiumPrice * discountMult);
    }

    // Create the beneficiary record
    const durationDays = 90;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    const { error: benError } = await adminSupabase
      .from('scholarship_beneficiaries')
      .insert({
        campaign_id: campaign.id,
        student_id: application.student_id,
        beneficiary_type: decision,
        allocated_amount_kes: allocatedAmount,
        approved_by: user.id,
        activated_at: now.toISOString(),
        expires_at: expiresAt.toISOString()
      });

    if (benError) {
      return NextResponse.json({ error: 'Failed to create beneficiary ledger record' }, { status: 500 });
    }

    // Upgrade student profile to premium
    await adminSupabase
      .from('student_profiles')
      .update({
        plan_tier: 'premium',
        plan_expires_at: expiresAt.toISOString()
      })
      .eq('id', application.student_id);

    return NextResponse.json({ success: true, allocatedAmount });

  } catch (error) {
    console.error('Renew error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
