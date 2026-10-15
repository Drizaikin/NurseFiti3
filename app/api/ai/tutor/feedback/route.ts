import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    let user = null;
    try {
      const { data: userData } = await supabase.auth.getUser();
      user = userData?.user ?? null;
    } catch {}

    if (!user) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        user = sessionData?.session?.user ?? null;
      } catch {}
    }

    const body = await req.json().catch(() => ({}));
    const rating = Math.max(1, Math.min(5, Number(body.rating) || 5));
    const experience = typeof body.experience === 'string' ? body.experience.trim() : '';
    const expected = typeof body.expected === 'string' ? body.expected.trim() : '';
    const disappointing = typeof body.disappointing === 'string' ? body.disappointing.trim() : '';
    const recommendations = typeof body.recommendations === 'string' ? body.recommendations.trim() : '';
    const selectedVoice = typeof body.selectedVoice === 'string' ? body.selectedVoice.trim() : null;
    const sessionMessageCount = Number(body.sessionMessageCount) || 0;

    let userName = typeof body.userName === 'string' ? body.userName.trim() : 'Student';
    let userRole = typeof body.userRole === 'string' ? body.userRole : 'student';
    let cadre = typeof body.cadre === 'string' ? body.cadre.trim() : null;

    if (user) {
      try {
        const { data: profile } = await (supabase as any)
          .from('profiles')
          .select('full_name, role')
          .eq('id', user.id)
          .maybeSingle();

        if ((profile as any)?.full_name) userName = (profile as any).full_name;
        if ((profile as any)?.role) userRole = (profile as any).role;

        const { data: studentProfile } = await (supabase as any)
          .from('student_profiles')
          .select('cadre')
          .eq('id', user.id)
          .maybeSingle();

        if ((studentProfile as any)?.cadre) cadre = (studentProfile as any).cadre;
      } catch (err) {
        console.warn('[ai/tutor/feedback] Profile lookup warning:', err);
      }
    }

    // Try primary insert into dedicated ai_tutor_reviews table
    const { error: insertError } = await (supabase as any)
      .from('ai_tutor_reviews')
      .insert([
        {
          user_id: user?.id ?? null,
          user_name: userName,
          user_role: userRole,
          cadre: cadre,
          rating,
          experience: experience || null,
          expected: expected || null,
          disappointing: disappointing || null,
          recommendations: recommendations || null,
          selected_voice: selectedVoice,
          session_message_count: sessionMessageCount,
        },
      ]);

    if (insertError) {
      console.warn('[ai/tutor/feedback] Primary insert into ai_tutor_reviews returned:', insertError.message);
      // Fallback: If table is not yet migrated, save into app_feedback with is_approved=false
      // so it is STRICTLY PRIVATE (admin only) and never exposed on the public FeedbackWall
      if (user) {
        const adminPrivateNote = [
          `[INTERNAL AI TUTOR REVIEW - ADMIN ONLY - NOT PUBLIC]`,
          `Voice: ${selectedVoice || 'default'} | Messages: ${sessionMessageCount}`,
          `Rating: ${rating}/5`,
          `Experience: ${experience}`,
          `Expected: ${expected}`,
          `Disappointing: ${disappointing}`,
          `Recommendations: ${recommendations}`,
        ].join('\n');

        await (supabase as any).from('app_feedback').insert([
          {
            user_id: user.id,
            user_role: userRole === 'tutor' ? 'tutor' : 'student',
            display_name: userName,
            cadre: cadre,
            category: 'suggestion',
            rating,
            message: adminPrivateNote,
            contact_channel: 'none',
            is_approved: false, // STRICTLY FALSE: never public
          },
        ]);
      }
    }

    return NextResponse.json({ ok: true, message: 'AI Tutor feedback recorded successfully.' });
  } catch (error: any) {
    console.error('[ai/tutor/feedback] POST error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to submit feedback' }, { status: 500 });
  }
}

// GET: Admin-only retrieval of AI Tutor Reviews & Recommendations
export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    let user = null;
    try {
      const { data: userData } = await supabase.auth.getUser();
      user = userData?.user ?? null;
    } catch {}

    if (!user) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        user = sessionData?.session?.user ?? null;
      } catch {}
    }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin role
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if ((profile as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
    }

    // Try fetching from ai_tutor_reviews
    const { data: reviews, error } = await (supabase as any)
      .from('ai_tutor_reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!error && reviews) {
      return NextResponse.json({ reviews });
    }

    // Fallback: look for internal ai tutor notes in app_feedback
    const { data: fallbackNotes } = await (supabase as any)
      .from('app_feedback')
      .select('*')
      .like('message', '%[INTERNAL AI TUTOR REVIEW%')
      .order('created_at', { ascending: false })
      .limit(100);

    const mapped = (fallbackNotes || []).map((f: any) => ({
      id: f.id,
      user_id: f.user_id,
      user_name: f.display_name,
      user_role: f.user_role,
      cadre: f.cadre,
      rating: f.rating,
      experience: f.message,
      expected: null,
      disappointing: null,
      recommendations: null,
      selected_voice: null,
      session_message_count: 0,
      created_at: f.created_at,
    }));

    return NextResponse.json({ reviews: mapped });
  } catch (err: any) {
    console.error('[ai/tutor/feedback] GET error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch reviews' }, { status: 500 });
  }
}
