import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { sendSessionReminderEmail, formatEmailDate, formatSessionTime, formatSessionDuration } from '@/lib/email';

// Make sure this route is fully dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Optional: Secure the cron job (Vercel automatically sets CRON_SECRET if configured)
  const authHeader = request.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get() { return ''; },
          set() {},
          remove() {},
        },
      }
    );

    const now = new Date();
    // Buffer margins
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const in1Hour = new Date(now.getTime() + 1 * 60 * 60 * 1000);

    // We'll fetch all confirmed sessions that haven't had their 1hr reminder sent yet
    const { data: sessions, error } = await supabase
      .from('sessions')
      .select(`
        *,
        student:student_id (id, full_name, email),
        tutor:tutor_id (id, full_name, email)
      `)
      .in('status', ['confirmed'])
      .eq('reminder_sent_1h', false);

    if (error) {
      console.error('[cron/session-reminders] Error fetching sessions:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ success: true, message: 'No pending reminders' });
    }

    let remindersSent = 0;

    for (const session of sessions) {
      // Parse session date and start time (assuming session_date is YYYY-MM-DD and start_time is HH:mm:ss)
      const sessionStartStr = `${session.session_date}T${session.start_time}`;
      const sessionStartDate = new Date(sessionStartStr);
      
      // Calculate time difference in milliseconds
      const diffMs = sessionStartDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // We only send reminders if the session is strictly in the future
      if (diffHours < 0) continue;

      let shouldSend24h = false;
      let shouldSend1h = false;

      // 24-hour reminder condition: between 23 to 24.5 hours away
      if (!session.reminder_sent_24h && diffHours > 23 && diffHours <= 24.5) {
        shouldSend24h = true;
      }

      // 1-hour reminder condition: between 0.5 to 1.5 hours away
      if (!session.reminder_sent_1h && diffHours > 0.5 && diffHours <= 1.5) {
        shouldSend1h = true;
      }

      if (shouldSend24h || shouldSend1h) {
        const timeUntil = shouldSend1h ? '1 hour' : '24 hours';
        
        await sendSessionReminderEmail({
          studentEmail: session.student?.email,
          tutorEmail: session.tutor?.email,
          studentName: session.student?.full_name || 'Student',
          tutorName: session.tutor?.full_name || 'Tutor',
          subject: session.topic || 'Tutoring Session',
          sessionDate: formatEmailDate(session.session_date),
          sessionTime: formatSessionTime(session.start_time, session.end_time),
          duration: formatSessionDuration(session.start_time, session.end_time),
          meetingLink: session.join_link || 'Link will be available in your bookings page',
          bookingId: session.id,
        }, timeUntil);

        // Update database flags
        await supabase
          .from('sessions')
          .update({
            reminder_sent_24h: session.reminder_sent_24h || shouldSend24h,
            reminder_sent_1h: session.reminder_sent_1h || shouldSend1h,
          })
          .eq('id', session.id);

        remindersSent++;
      }
    }

    return NextResponse.json({ success: true, remindersSent });
  } catch (err) {
    console.error('[cron/session-reminders] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
