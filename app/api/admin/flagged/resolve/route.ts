import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendFlaggedQuestionResolutionEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || (profile as { role: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { flagId, explanation, sendEmail } = await req.json();

    if (!flagId) {
      return NextResponse.json({ error: 'Flag ID is required' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    // Fetch the flag and related data first if we need to send an email
    let flagData = null;
    if (sendEmail && explanation) {
      const { data, error } = await adminClient
        .from('flagged_questions')
        .select(`
          id,
          student_id,
          questions (
            stem,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            rationale
          ),
          profiles!flagged_questions_student_id_fkey (
            full_name,
            email
          )
        `)
        .eq('id', flagId)
        .single();
      
      if (error || !data) {
        console.error('Error fetching flag data for email:', error);
        return NextResponse.json({ error: 'Failed to fetch flag data' }, { status: 500 });
      }
      flagData = data;
    }

    // Update the flag status
    const { error: updateError } = await adminClient
      .from('flagged_questions')
      .update({ status: 'resolved' })
      .eq('id', flagId);

    if (updateError) {
      console.error('Error resolving flag:', updateError);
      return NextResponse.json({ error: 'Failed to resolve flag' }, { status: 500 });
    }

    // Send email if requested
    if (sendEmail && explanation && flagData && flagData.profiles && flagData.questions) {
      // Note: Casts are needed due to Supabase join typing limitations
      const studentEmail = (flagData.profiles as any).email;
      const studentName = (flagData.profiles as any).full_name;
      const q = flagData.questions as any;

      if (studentEmail) {
        await sendFlaggedQuestionResolutionEmail({
          to: studentEmail,
          studentName: studentName || 'Student',
          questionStem: q.stem,
          options: {
            a: q.option_a,
            b: q.option_b,
            c: q.option_c,
            d: q.option_d,
          },
          correctOption: q.correct_option,
          rationale: q.rationale,
          explanation: explanation,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/flagged/resolve]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
