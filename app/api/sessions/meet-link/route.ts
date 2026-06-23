import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createGoogleMeetRoom } from '@/lib/google-meet';

// ── Helpers ───────────────────────────────────────────────────────────────────

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

// ── Helpers ───────────────────────────────────────────────────────────────────

// ── POST /api/sessions/meet-link ──────────────────────────────────────────────
// Body: { sessionId: string; meetLink?: string }
// - If meetLink is provided, validates it's a real Google Meet URL and saves it
// - If meetLink is omitted, auto-generates a NurseFiti-hosted Meet room URL
// Only the tutor who owns the session can call this.

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();

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
    const { sessionId, meetLink } = body as { sessionId?: string; meetLink?: string };

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // ── Fetch session and verify ownership ────────────────────────────────
    const { data: session, error: fetchError } = await supabase
      .from('sessions')
      .select('id, tutor_id, student_id, status, platform, session_date, start_time, end_time, join_link, topic, student:student_id(email), tutor:tutor_id(email)')
      .eq('id', sessionId)
      .single();

    if (fetchError || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if ((session as any).tutor_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden: you are not the tutor for this session' }, { status: 403 });
    }

    if (!['confirmed', 'pending_approval'].includes((session as any).status)) {
      return NextResponse.json({ error: 'Meet link can only be set on confirmed or pending sessions' }, { status: 400 });
    }

    // ── Validate or generate the meet link ───────────────────────────────
    let finalLink: string;

    if (meetLink) {
      // Validate: must be a Google Meet URL
      const meetPattern = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
      if (!meetPattern.test(meetLink.trim())) {
        return NextResponse.json({
          error: 'Invalid Google Meet URL. Expected format: https://meet.google.com/xxx-xxxx-xxx',
        }, { status: 400 });
      }
      finalLink = meetLink.trim();
    } else {
      // Auto-generate a real Google Meet link via API
      try {
        const sDate = (session as any).session_date;
        const sTime = (session as any).start_time;
        const eTime = (session as any).end_time;
        
        // Convert to ISO 8601 string for Google API (Assuming EAT timezone +03:00)
        const startIso = new Date(`${sDate}T${sTime}+03:00`).toISOString();
        const endIso = new Date(`${sDate}T${eTime}+03:00`).toISOString();
        
        const studentEmail = (session as any).student?.email;
        const tutorEmail = (session as any).tutor?.email;
        const emails = [studentEmail, tutorEmail].filter(Boolean);

        finalLink = await createGoogleMeetRoom(
          `NurseFiti Tutoring: ${(session as any).topic || 'Session'}`,
          `NurseFiti 1-on-1 Session`,
          startIso,
          endIso,
          emails
        );
      } catch (err) {
        console.error('Failed to create real google meet link:', err);
        return NextResponse.json({ error: 'Failed to auto-generate Google Meet link via API. Please ensure your Google API credentials are set or paste a link manually.' }, { status: 500 });
      }
    }

    // ── Save to session ───────────────────────────────────────────────────
    const { error: updateError } = await supabase
      .from('sessions')
      .update({ join_link: finalLink } as any)
      .eq('id', sessionId);

    if (updateError) {
      console.error('Failed to update join_link:', updateError);
      return NextResponse.json({ error: 'Failed to save meet link' }, { status: 500 });
    }

    // ── Notify student ────────────────────────────────────────────────────
    const sessionDate = new Date((session as any).session_date).toLocaleDateString('en-KE', {
      weekday: 'short', month: 'short', day: 'numeric',
    });

    await supabase.from('notifications').insert({
      user_id: (session as any).student_id,
      type: 'meet_link_added',
      title: 'Google Meet Link Ready',
      body: `Your tutor has added the Google Meet link for your session on ${sessionDate} at ${(session as any).start_time?.slice(0, 5)}. You can now join from your Bookings page.`,
      action_url: '/bookings',
    } as any);

    return NextResponse.json({ success: true, meetLink: finalLink });
  } catch (err) {
    console.error('meet-link route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── GET /api/sessions/meet-link?sessionId=xxx ─────────────────────────────────
// Returns the current meet link for a session (student or tutor can call)

export async function GET(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient();

    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

    const sessionId = req.nextUrl.searchParams.get('sessionId');
    if (!sessionId) return NextResponse.json({ error: 'sessionId required' }, { status: 400 });

    const { data: session, error } = await supabase
      .from('sessions')
      .select('id, tutor_id, student_id, join_link, status, session_date, start_time')
      .eq('id', sessionId)
      .single();

    if (error || !session) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Only the tutor or student on this session can read the link
    if ((session as any).tutor_id !== user.id && (session as any).student_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ meetLink: (session as any).join_link });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
