import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId, reason, details } = await req.json();

    if (!questionId || !reason) {
      return NextResponse.json({ error: 'Missing questionId or reason' }, { status: 400 });
    }

    const { error: insertError } = await supabase
      .from('flagged_questions')
      .insert(
        {
          student_id: user.id,
          question_id: questionId,
          reason,
          details,
          status: 'pending',
          flagged_at: new Date().toISOString()
        } as any
      );

    if (insertError) {
      console.error('Failed to flag question:', insertError);
      return NextResponse.json({ error: 'Failed to save flag' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/questions/flag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
