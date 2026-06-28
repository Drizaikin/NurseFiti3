import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const deleteSchema = z.object({
  application_id: z.string().uuid()
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
    const parsed = deleteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
    }

    const { application_id } = parsed.data;

    const { data: application, error: appError } = await adminSupabase
      .from('scholarship_applications')
      .select('student_id, campaign_id')
      .eq('id', application_id)
      .single();

    if (appError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Delete the beneficiary record (if it exists)
    await adminSupabase
      .from('scholarship_beneficiaries')
      .delete()
      .eq('student_id', application.student_id)
      .eq('campaign_id', application.campaign_id);

    // Downgrade student profile
    await adminSupabase
      .from('student_profiles')
      .update({
        plan_tier: 'free',
        plan_expires_at: null
      })
      .eq('id', application.student_id);

    // Delete the application
    const { error: delError } = await adminSupabase
      .from('scholarship_applications')
      .delete()
      .eq('id', application_id);

    if (delError) {
      return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
