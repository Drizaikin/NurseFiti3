import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const applySchema = z.object({
  campaign_id: z.string().uuid(),
  full_name: z.string().min(2, "Full name is required"),
  phone_number: z.string().min(9, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  institution: z.string().min(2, "Institution is required"),
  course: z.string().min(2, "Course is required"),
  exam_date: z.string().optional(),
  county: z.string().min(2, "County is required"),
  sub_county: z.string().optional(),
  national_id: z.string().optional(),
  student_id_number: z.string().optional(),
  student_id_front_url: z.string().url("Valid URL required for Student ID Front"),
  student_id_back_url: z.string().url("Valid URL required for Student ID Back"),
  national_id_front_url: z.string().url("Valid URL required for National ID Front"),
  national_id_back_url: z.string().url("Valid URL required for National ID Back")
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient() as any;
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = applySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data', details: parsed.error.format() }, { status: 400 });
    }

    // Check if already applied
    const { data: existingApp } = await supabase
      .from('scholarship_applications')
      .select('id')
      .eq('campaign_id', parsed.data.campaign_id)
      .eq('student_id', user.id)
      .single();

    if (existingApp) {
      return NextResponse.json({ error: 'You have already applied for this scholarship.' }, { status: 400 });
    }

    // Insert application
    const { data: application, error: insertError } = await supabase
      .from('scholarship_applications')
      .insert({
        ...parsed.data,
        student_id: user.id,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Apply error:', insertError);
      return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, application });

  } catch (error) {
    console.error('Scholarship apply route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
