import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createGoogleMeetRoom } from '@/lib/google-meet';
import {
  formatEmailDateTime,
  formatSessionDuration,
  formatSessionTime,
  sendSessionBookingEmails,
} from '@/lib/email';
import { createAdminClient } from '@/lib/supabase/admin';

function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient() as any;
    const adminSupabase = createAdminClient() as any;

    // ── Auth: get caller identity ─────────────────────────────────────────
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    // ── Parse body ────────────────────────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const { sessionId } = body as { sessionId?: string };

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // ── Fetch session and verify ownership ────────────────────────────────
    const { data: session, error: fetchError } = await supabase
      .from('sessions')
      .select('id, tutor_id, student_id, status, platform, session_date, start_time, end_time, join_link, topic, cadre, student:student_id(email, full_name), tutor:tutor_id(email, full_name)')
      .eq('id', sessionId)
      .single();

    if (fetchError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if ((session as any).tutor_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden: you are not the tutor for this session' }, { status: 403 });
    }

    if ((session as any).status === 'confirmed') {
      return NextResponse.json({ success: true, message: 'Session already confirmed' });
    }

    // ── Generate Meet Link if needed ──────────────────────────────────────
    let finalJoinLink = (session as any).join_link;

    if (!finalJoinLink && (session as any).platform === 'Google Meet') {
      try {
        const { data: existingGroupSession } = await supabase
          .from('sessions')
          .select('join_link')
          .eq('tutor_id', (session as any).tutor_id)
          .eq('session_date', (session as any).session_date)
          .eq('start_time', (session as any).start_time)
          .not('join_link', 'is', null)
          .limit(1)
          .maybeSingle();

        if (existingGroupSession?.join_link) {
          finalJoinLink = existingGroupSession.join_link;
        } else {
          const startIso = new Date(`${(session as any).session_date}T${(session as any).start_time}+03:00`).toISOString();
          const endIso = new Date(`${(session as any).session_date}T${(session as any).end_time}+03:00`).toISOString();
          const studentEmail = (session as any).student?.email;
          const tutorEmail = (session as any).tutor?.email;
          const emails = [studentEmail, tutorEmail].filter(Boolean);

          finalJoinLink = await createGoogleMeetRoom(
            `NurseFiti Tutoring: ${(session as any).topic || 'Session'}`,
            `NurseFiti Session`,
            startIso,
            endIso,
            emails as string[]
          );
        }
      } catch (meetErr) {
        console.error('[sessions/approve] Auto meet generation failed:', meetErr);
        // We do not fail the request, but we log the error. The link will be null.
      }
    }

    // ── Update Session Status ─────────────────────────────────────────────
    const { error: updateError } = await supabase
      .from('sessions')
      .update({ 
        status: 'confirmed',
        join_link: finalJoinLink
      } as any)
      .eq('id', sessionId);

    if (updateError) {
      console.error('[sessions/approve] Failed to update session status:', updateError);
      return NextResponse.json({ error: 'Failed to approve session' }, { status: 500 });
    }

    // ── Create Notifications ──────────────────────────────────────────────
    const sessionDate = new Date((session as any).session_date).toLocaleDateString('en-KE', {
      weekday: 'short', month: 'short', day: 'numeric',
    });

    await adminSupabase.from('notifications').insert([
      {
        user_id: (session as any).student_id,
        type: 'session_confirmed',
        title: 'Session Confirmed',
        body: `Your session on ${sessionDate} at ${(session as any).start_time?.slice(0, 5)} has been confirmed by the tutor.`,
        action_url: '/bookings',
      }
    ]);

    // ── Send Emails ───────────────────────────────────────────────────────
    try {
      await sendSessionBookingEmails({
        studentEmail: (session as any).student?.email,
        tutorEmail: (session as any).tutor?.email,
        studentName: (session as any).student?.full_name ?? 'Student',
        tutorName: (session as any).tutor?.full_name ?? 'Tutor',
        subject: (session as any).topic ?? (session as any).cadre ?? 'General revision',
        sessionDate: formatEmailDateTime((session as any).session_date),
        sessionTime: formatSessionTime((session as any).start_time, (session as any).end_time),
        duration: formatSessionDuration((session as any).start_time, (session as any).end_time),
        meetingLink: finalJoinLink ?? 'The tutor will add the meeting link before the session.',
        bookingId: sessionId,
      });
    } catch (emailErr) {
      console.error('[sessions/approve] Failed to send booking emails:', emailErr);
    }

    return NextResponse.json({ success: true, meetLink: finalJoinLink });
  } catch (err) {
    console.error('[sessions/approve] internal error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
