import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = createClient() as any;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { sessionId, action } = body;

    if (!sessionId || !action) {
      return NextResponse.json({ error: 'Missing sessionId or action' }, { status: 400 });
    }

    // Verify session belongs to user (either student or tutor)
    const { data: session, error: fetchErr } = await supabase
      .from('sessions')
      .select('student_id, tutor_id, status, actual_start_time')
      .eq('id', sessionId)
      .single();

    if (fetchErr || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (session.student_id !== user.id && session.tutor_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (action === 'start') {
      if (session.actual_start_time) {
        return NextResponse.json({ error: 'Session already started' }, { status: 400 });
      }
      
      const { error: updateErr } = await supabase
        .from('sessions')
        .update({ actual_start_time: new Date().toISOString() })
        .eq('id', sessionId);

      if (updateErr) throw updateErr;
      return NextResponse.json({ success: true, message: 'Session started' });
    } 
    
    if (action === 'end') {
      if (!session.actual_start_time) {
        return NextResponse.json({ error: 'Session has not been started' }, { status: 400 });
      }

      const endTime = new Date();
      const startTime = new Date(session.actual_start_time);
      const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      // We only update status to 'completed' if it was confirmed. If it was already completed, just return
      if (session.status === 'completed') {
        return NextResponse.json({ success: true, message: 'Session already completed' });
      }

      const { error: updateErr } = await supabase
        .from('sessions')
        .update({ 
          actual_end_time: endTime.toISOString(),
          actual_duration_seconds: durationSeconds,
          status: 'completed',
          completed_at: endTime.toISOString()
        })
        .eq('id', sessionId);

      if (updateErr) throw updateErr;
      return NextResponse.json({ success: true, message: 'Session ended and marked as completed' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Session live action error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
