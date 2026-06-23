import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendSessionReminderEmail } from '@/lib/email';

export async function GET(req: Request) {
  try {
    // Basic auth using CRON_SECRET
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Fetch confirmed sessions that haven't started yet
    // We also need student and tutor emails
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select(`
        id, session_date, start_time, end_time, topic, platform, join_link, duration_minutes,
        student_id, tutor_id, reminder_sent_24h, reminder_sent_1h, reminder_sent_15m
      `)
      .eq('status', 'confirmed')
      .is('actual_start_time', null);

    if (error || !sessions) {
      console.error('Failed to fetch sessions for cron:', error);
      return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
    }

    const now = new Date();
    let emailsSent = 0;

    // To minimize DB calls, extract unique user IDs
    const userIds = Array.from(new Set(sessions.flatMap(s => [s.student_id, s.tutor_id])));
    
    let profilesMap: Record<string, { email: string; full_name: string }> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', userIds);
        
      profilesMap = Object.fromEntries(
        (profiles || []).map(p => [p.id, { email: p.email, full_name: p.full_name }])
      );
    }

    for (const session of sessions) {
      const sessionDateStr = session.session_date;
      const startTimeStr = session.start_time;
      const sessionDateTime = new Date(`${sessionDateStr}T${startTimeStr}`);
      
      const diffMs = sessionDateTime.getTime() - now.getTime();
      const diffMinutes = diffMs / (1000 * 60);

      // Only care about future sessions
      if (diffMinutes < 0) continue;

      const student = profilesMap[session.student_id];
      const tutor = profilesMap[session.tutor_id];
      if (!student || !tutor) continue;

      const emailParams = {
        studentEmail: student.email,
        tutorEmail: tutor.email,
        studentName: student.full_name,
        tutorName: tutor.full_name,
        subject: session.topic || 'General Tutoring Session',
        sessionDate: sessionDateStr,
        sessionTime: startTimeStr.slice(0, 5),
        duration: `${session.duration_minutes} minutes`,
        meetingLink: session.join_link || 'Link pending from tutor',
        bookingId: session.id,
      };

      let timeUntil = '';
      let updateColumn = '';

      if (diffMinutes <= 15 && diffMinutes > 0 && !session.reminder_sent_15m) {
        timeUntil = '15 minutes';
        updateColumn = 'reminder_sent_15m';
      } else if (diffMinutes <= 60 && diffMinutes > 15 && !session.reminder_sent_1h) {
        timeUntil = '1 hour';
        updateColumn = 'reminder_sent_1h';
      } else if (diffMinutes <= 24 * 60 && diffMinutes > 60 && !session.reminder_sent_24h) {
        timeUntil = '24 hours';
        updateColumn = 'reminder_sent_24h';
      }

      if (timeUntil && updateColumn) {
        // Send email
        await sendSessionReminderEmail(emailParams, timeUntil);
        emailsSent++;

        // Update DB so we don't send it again
        await supabase
          .from('sessions')
          .update({ [updateColumn]: true })
          .eq('id', session.id);
      }
    }

    return NextResponse.json({ success: true, emailsSent });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
