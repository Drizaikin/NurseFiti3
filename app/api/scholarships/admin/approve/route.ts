import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';
import { sendScholarshipWelcomeEmail } from '@/lib/email';
import { PLAN_PRICING_META } from '@/lib/planLimits';

const approveSchema = z.object({
  application_id: z.string().uuid(),
  decision: z.enum(['FULL', 'SUBSIDIZED', 'REJECT', 'WAITLIST'])
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
    const parsed = approveSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
    }

    const { application_id, decision } = parsed.data;

    if (decision === 'REJECT' || decision === 'WAITLIST') {
      const status = decision === 'REJECT' ? 'rejected' : 'waitlisted';
      await adminSupabase
        .from('scholarship_applications')
        .update({ status })
        .eq('id', application_id);
      return NextResponse.json({ success: true, status });
    }

    // Process Approval (FULL or SUBSIDIZED)
    const { data: application, error: appError } = await adminSupabase
      .from('scholarship_applications')
      .select('*, scholarship_campaigns(*)')
      .eq('id', application_id)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status === 'approved') {
      return NextResponse.json({ error: 'Already approved' }, { status: 400 });
    }

    const campaign = application.scholarship_campaigns;
    const premiumPrice = PLAN_PRICING_META.premium.amountKsh; // e.g. 3500

    let allocatedAmount = 0;
    
    if (decision === 'FULL') {
      allocatedAmount = premiumPrice;
    } else if (decision === 'SUBSIDIZED') {
      const discountMult = (100 - campaign.subsidy_discount_percentage) / 100;
      allocatedAmount = Math.round(premiumPrice * discountMult);
    }

    // Verify Available Funds for this campaign
    // 1. Sum all deposits
    const { data: deposits } = await adminSupabase
      .from('scholarship_deposits')
      .select('amount_kes')
      .eq('campaign_id', campaign.id);
    const totalDeposits = deposits?.reduce((sum: number, d: any) => sum + (d.amount_kes || 0), 0) || 0;

    // 2. Sum all allocated amounts
    const { data: beneficiaries } = await adminSupabase
      .from('scholarship_beneficiaries')
      .select('allocated_amount_kes')
      .eq('campaign_id', campaign.id);
    const totalAllocated = beneficiaries?.reduce((sum: number, b: any) => sum + (b.allocated_amount_kes || 0), 0) || 0;

    const availableFunds = totalDeposits - totalAllocated;

    if (availableFunds < allocatedAmount) {
      return NextResponse.json({ 
        error: `Insufficient sponsor funds. Required: KES ${allocatedAmount}. Available: KES ${availableFunds}.`
      }, { status: 400 });
    }

    // Create the beneficiary record (Transaction)
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

    // Update application status
    await adminSupabase
      .from('scholarship_applications')
      .update({ status: 'approved' })
      .eq('id', application_id);

    // Upgrade student profile to premium
    await adminSupabase
      .from('student_profiles')
      .update({
        plan_tier: 'premium',
        plan_expires_at: expiresAt.toISOString()
      })
      .eq('id', application.student_id);

    // Send Welcome Email
    await sendScholarshipWelcomeEmail({
      to: application.email,
      firstName: application.full_name.split(' ')[0],
      campaignName: campaign.name,
      sponsorName: campaign.sponsor_name,
      beneficiaryType: decision
    });

    return NextResponse.json({ success: true, allocatedAmount, availableFunds: availableFunds - allocatedAmount });

  } catch (error) {
    console.error('Approve error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
