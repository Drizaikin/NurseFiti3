import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';
import { sendScholarshipWelcomeEmail } from '@/lib/email';
import { addDays } from 'date-fns';
import { fetchPlatformSettings } from '@/lib/platformSettings';

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
    const settings = await fetchPlatformSettings(adminSupabase);
    const premiumPrice = settings.plan_premium_price; // dynamic

    let allocatedAmount = 0;
    
    if (decision === 'FULL') {
      allocatedAmount = premiumPrice;
    } else if (decision === 'SUBSIDIZED') {
      const discountMult = (100 - campaign.subsidy_discount_percentage) / 100;
      allocatedAmount = Math.round(premiumPrice * discountMult);
    }

    // Verify Available Slots for this campaign
    const { data: beneficiaries } = await adminSupabase
      .from('scholarship_beneficiaries')
      .select('beneficiary_type')
      .eq('campaign_id', campaign.id);
      
    const fullCount = beneficiaries?.filter((b: any) => b.beneficiary_type === 'FULL').length || 0;
    const subCount = beneficiaries?.filter((b: any) => b.beneficiary_type === 'SUBSIDIZED').length || 0;

    if (decision === 'FULL' && fullCount >= campaign.full_scholarship_slots) {
      return NextResponse.json({ 
        error: `No slots available. Maximum ${campaign.full_scholarship_slots} FULL scholarships reached.`
      }, { status: 400 });
    }

    if (decision === 'SUBSIDIZED' && subCount >= campaign.subsidized_scholarship_slots) {
      return NextResponse.json({ 
        error: `No slots available. Maximum ${campaign.subsidized_scholarship_slots} SUBSIDIZED scholarships reached.`
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

    return NextResponse.json({ success: true, allocatedAmount });

  } catch (error) {
    console.error('Approve error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
