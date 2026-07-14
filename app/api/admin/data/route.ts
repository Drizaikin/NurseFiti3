/**
 * GET /api/admin/data?type=students|tutors|overview
 *
 * Admin-only data endpoint. Uses the service-role client to bypass RLS
 * and return full platform data. The regular Supabase client cannot read
 * other users' profiles due to RLS — this route is the correct pattern.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { effectiveTier } from '@/lib/planLimits';

// Force dynamic rendering — this route reads cookies (auth session)
// and must never be statically generated at build time.
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Auth + role check using the regular client (reads own profile only — fine)
    const supabase = createRouteClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    const profile = profileData as { role: string } | null;

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Use service-role client for all data reads — bypasses RLS entirely
    const admin = createAdminClient();
    const type = req.nextUrl.searchParams.get('type') ?? 'students';

    if (type === 'uploads') {
      const statusFilter = req.nextUrl.searchParams.get('status');
      let query = (admin as any)
        .from('question_uploads')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data: uploadData } = await query;
      if (!uploadData) return NextResponse.json({ uploads: [] });

      // Fetch student names/emails/plans
      const studentIds = Array.from(new Set((uploadData as Array<{ student_id: string }>).map(u => u.student_id)));
      const [profilesRes, spRes] = await Promise.all([
        (admin as any).from('profiles').select('id, full_name, email').in('id', studentIds),
        (admin as any).from('student_profiles').select('id, plan_tier').in('id', studentIds),
      ]);

      const profileMap = new Map(
        ((profilesRes.data ?? []) as Array<{ id: string; full_name: string; email: string }>)
          .map(p => [p.id, p])
      );
      const spMap = new Map(
        ((spRes.data ?? []) as Array<{ id: string; plan_tier: string }>)
          .map(s => [s.id, s])
      );

      const uploads = (uploadData as Array<{
        id: string; student_id: string; file_urls: string[]; file_names: string[];
        file_count: number; status: string; rejection_reason: string | null; submitted_at: string;
      }>).map(u => {
        const p = profileMap.get(u.student_id) as { full_name: string; email: string } | undefined;
        const sp = spMap.get(u.student_id) as { plan_tier: string } | undefined;
        return { ...u, student_name: p?.full_name ?? 'Unknown', student_email: p?.email ?? '', student_plan: sp?.plan_tier ?? 'free' };
      });

      return NextResponse.json({ uploads });
    }

    if (type === 'overview') {
      const [studentsRes, tutorsRes, uploadsRes, questionsRes] = await Promise.all([
        // Count only profiles with role = 'student' — excludes admin accounts
        // that may have a student_profiles row from before being promoted
        admin.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
        admin.from('tutor_profiles').select('verification_status'),
        admin.from('question_uploads').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        admin.from('questions').select('id', { count: 'exact', head: true }).eq('status', 'pending_review'),
      ]);

      // For plan breakdown, join student_profiles only for actual students
      const { data: studentPlans } = await admin
        .from('student_profiles')
        .select('id, plan_tier, plan_expires_at')
        .in('id',
          (await admin.from('profiles').select('id').eq('role', 'student')).data?.map((p: { id: string }) => p.id) ?? []
        );

      const plans = (studentPlans ?? []) as Array<{ plan_tier: string; plan_expires_at: string | null }>;
      const tutors = (tutorsRes.data ?? []) as Array<{ verification_status: string }>;

      return NextResponse.json({
        totalStudents:    studentsRes.count ?? 0,
        freeStudents:     plans.filter(s => effectiveTier(s.plan_tier, s.plan_expires_at) === 'free').length,
        paidStudents:     plans.filter(s => effectiveTier(s.plan_tier, s.plan_expires_at) !== 'free').length,
        totalTutors:      tutors.length,
        verifiedTutors:   tutors.filter(t => t.verification_status === 'verified').length,
        pendingTutors:    tutors.filter(t => t.verification_status === 'pending').length,
        pendingUploads:   uploadsRes.count ?? 0,
        pendingQuestions: questionsRes.count ?? 0,
      });
    }

    if (type === 'students') {
      const profilesRes = await admin
          .from('profiles')
          .select('id, full_name, email, created_at, is_locked')
          .eq('role', 'student')
          .order('created_at', { ascending: false })
          .limit(200);

      if (profilesRes.error) {
        console.error('[admin/data] profiles query error:', profilesRes.error);
        return NextResponse.json({ error: profilesRes.error.message }, { status: 500 });
      }

      const profiles = (profilesRes.data ?? []) as Array<{
        id: string; full_name: string; email: string; created_at: string; is_locked: boolean | null;
      }>;

      const profileIds = profiles.map(p => p.id);
      
      const spRes = profileIds.length > 0 
        ? await admin.from('student_profiles').select('id, cadre, plan_tier, plan_expires_at').in('id', profileIds)
        : { data: [], error: null };

      if (spRes.error) {
        console.error('[admin/data] student_profiles query error:', spRes.error);
        return NextResponse.json({ error: spRes.error.message }, { status: 500 });
      }

      const spMap = new Map(
        ((spRes.data ?? []) as Array<{
          id: string; cadre: string; plan_tier: string; plan_expires_at: string | null;
        }>).map(s => [s.id, s])
      );

      const students = profiles.map(p => {
        const sp = spMap.get(p.id);
        return {
          id:             p.id,
          full_name:      p.full_name,
          email:          p.email,
          cadre:          sp?.cadre ?? '—',
          plan_tier:      sp ? effectiveTier(sp.plan_tier, sp.plan_expires_at) : 'free',
          plan_expires_at: sp?.plan_expires_at ?? null,
          created_at:     p.created_at,
          is_locked:      p.is_locked ?? false,
        };
      });

      return NextResponse.json({ students });
    }

    if (type === 'tutors') {
      const profilesRes = await admin
          .from('profiles')
          .select('id, full_name, email, phone, created_at, is_locked')
          .eq('role', 'tutor')
          .order('created_at', { ascending: false })
          .limit(200);

      if (profilesRes.error) {
        console.error('[admin/data] tutor profiles query error:', profilesRes.error);
        return NextResponse.json({ error: profilesRes.error.message }, { status: 500 });
      }

      const profiles = (profilesRes.data ?? []) as Array<{
        id: string; full_name: string; email: string; phone: string; created_at: string; is_locked: boolean | null;
      }>;

      const profileIds = profiles.map(p => p.id);

      const tpRes = profileIds.length > 0
        ? await admin
          .from('tutor_profiles')
          .select('id, professional_title, cadres_taught, years_experience, verification_status, verification_tier, average_rating, total_sessions, rate_per_hour, nck_reg_number, bio, current_employer, nck_certificate_url, academic_qualification_url, national_id_url, mpesa_number, rejection_reason')
          .in('id', profileIds)
        : { data: [], error: null };

      if (tpRes.error) {
        console.error('[admin/data] tutor_profiles query error:', tpRes.error);
        return NextResponse.json({ error: tpRes.error.message }, { status: 500 });
      }

      const tpMap = new Map(
        ((tpRes.data ?? []) as Array<{
          id: string; professional_title: string; cadres_taught: string[];
          years_experience: number; verification_status: string; verification_tier: string | null;
          average_rating: number; total_sessions: number; rate_per_hour: number; nck_reg_number: string;
          bio: string | null; current_employer: string | null;
          nck_certificate_url: string | null; academic_qualification_url: string | null;
          national_id_url: string | null; mpesa_number: string | null; rejection_reason: string | null;
        }>).map(t => [t.id, t])
      );

      const tutors = profiles.map(p => {
        const tp = tpMap.get(p.id);
        return {
          id:                        p.id,
          full_name:                 p.full_name,
          email:                     p.email,
          phone:                     p.phone,
          professional_title:        tp?.professional_title ?? '—',
          cadres_taught:             tp?.cadres_taught ?? [],
          years_experience:          tp?.years_experience ?? 0,
          verification_status:       tp?.verification_status ?? 'pending',
          verification_tier:         tp?.verification_tier ?? null,
          average_rating:            tp?.average_rating ?? 0,
          total_sessions:            tp?.total_sessions ?? 0,
          rate_per_hour:             tp?.rate_per_hour ?? 0,
          nck_reg_number:            tp?.nck_reg_number ?? '—',
          bio:                       tp?.bio ?? null,
          current_employer:          tp?.current_employer ?? null,
          nck_certificate_url:       tp?.nck_certificate_url ?? null,
          academic_qualification_url: tp?.academic_qualification_url ?? null,
          national_id_url:           tp?.national_id_url ?? null,
          mpesa_number:              tp?.mpesa_number ?? null,
          rejection_reason:          tp?.rejection_reason ?? null,
          created_at:                p.created_at,
          is_locked:                 p.is_locked ?? false,
        };
      });

      return NextResponse.json({ tutors });
    }

    if (type === 'questions') {
      const statusFilter = req.nextUrl.searchParams.get('status') ?? 'pending_review';
      const { data: questionsData } = await admin
        .from('questions')
        .select('id, cadre, unit, topic, stem, option_a, option_b, option_c, option_d, correct_option, rationale, difficulty, contributor_id, status, created_at')
        .eq('status', statusFilter)
        .order('created_at', { ascending: false })
        .limit(200);

      if (!questionsData) return NextResponse.json({ questions: [] });

      // Enrich with contributor name
      const contributorIds = Array.from(new Set((questionsData as Array<{ contributor_id: string | null }>)
        .map(q => q.contributor_id).filter(Boolean))) as string[];

      const { data: contributorProfiles } = contributorIds.length > 0
        ? await (admin as any).from('profiles').select('id, full_name').in('id', contributorIds)
        : { data: [] };

      const contributorMap = new Map(
        ((contributorProfiles ?? []) as Array<{ id: string; full_name: string }>).map(p => [p.id, p.full_name])
      );

      const questions = (questionsData as any[]).map(q => ({
        ...q,
        contributor_name: q.contributor_id ? (contributorMap.get(q.contributor_id) ?? 'Unknown') : 'System',
      }));

      return NextResponse.json({ questions });
    }

    // ─── Analytics — logins and page visits ──────────────────────────────────
    if (type === 'analytics') {
      const days = Math.min(parseInt(req.nextUrl.searchParams.get('days') ?? '30', 10), 90);
      const since = new Date();
      since.setDate(since.getDate() - days);
      const sinceISO = since.toISOString();

      // Tables may not exist yet if the analytics migration hasn't been applied.
      // Check gracefully — return empty data rather than a 500.
      try {
        const [loginsRaw, visitsRaw, topPagesRaw] = await Promise.all([
          (admin as any)
            .from('user_logins')
            .select('role, logged_in_at')
            .gte('logged_in_at', sinceISO)
            .order('logged_in_at', { ascending: true }),
          (admin as any)
            .from('page_visits')
            .select('role, page_slug, visited_at')
            .gte('visited_at', sinceISO)
            .order('visited_at', { ascending: true }),
          (admin as any)
            .from('page_visits')
            .select('page_slug, role')
            .gte('visited_at', sinceISO),
        ]);

        // If the tables don't exist yet, Supabase returns an error on the query
        if (loginsRaw.error || visitsRaw.error) {
          // Tables not yet created — return empty analytics rather than crashing
          return NextResponse.json({
            days,
            summary: { totalLogins: 0, studentLogins: 0, tutorLogins: 0, totalVisits: 0 },
            dailyLogins: [],
            dailyVisits: [],
            topPages: [],
            notice: 'Analytics tables not yet available. Run the migration 20260616000003_admin_activity_tracking.sql first.',
          });
        }

        const logins: Array<{ role: string; logged_in_at: string }> = loginsRaw.data ?? [];
        const visits: Array<{ role: string; page_slug: string; visited_at: string }> = visitsRaw.data ?? [];
        const allVisits: Array<{ page_slug: string; role: string }> = topPagesRaw.data ?? [];

        const loginByDay: Record<string, { date: string; students: number; tutors: number; total: number }> = {};
        for (const row of logins) {
          const date = row.logged_in_at.slice(0, 10);
          if (!loginByDay[date]) loginByDay[date] = { date, students: 0, tutors: 0, total: 0 };
          if (row.role === 'student') loginByDay[date].students++;
          else if (row.role === 'tutor') loginByDay[date].tutors++;
          loginByDay[date].total++;
        }
        const dailyLogins = Object.values(loginByDay).sort((a, b) => a.date.localeCompare(b.date));

        const visitByDay: Record<string, { date: string; students: number; tutors: number; total: number }> = {};
        for (const row of visits) {
          const date = row.visited_at.slice(0, 10);
          if (!visitByDay[date]) visitByDay[date] = { date, students: 0, tutors: 0, total: 0 };
          if (row.role === 'student') visitByDay[date].students++;
          else if (row.role === 'tutor') visitByDay[date].tutors++;
          visitByDay[date].total++;
        }
        const dailyVisits = Object.values(visitByDay).sort((a, b) => a.date.localeCompare(b.date));

        const pageCounts: Record<string, { page: string; students: number; tutors: number; total: number }> = {};
        for (const row of allVisits) {
          if (!pageCounts[row.page_slug]) pageCounts[row.page_slug] = { page: row.page_slug, students: 0, tutors: 0, total: 0 };
          if (row.role === 'student') pageCounts[row.page_slug].students++;
          else if (row.role === 'tutor') pageCounts[row.page_slug].tutors++;
          pageCounts[row.page_slug].total++;
        }
        const topPages = Object.values(pageCounts)
          .sort((a, b) => b.total - a.total)
          .slice(0, 20);

        return NextResponse.json({
          days,
          summary: {
            totalLogins: logins.length,
            studentLogins: logins.filter(l => l.role === 'student').length,
            tutorLogins: logins.filter(l => l.role === 'tutor').length,
            totalVisits: visits.length,
          },
          dailyLogins,
          dailyVisits,
          topPages,
        });
      } catch {
        // Network/unexpected error — return empty rather than 500
        return NextResponse.json({
          days,
          summary: { totalLogins: 0, studentLogins: 0, tutorLogins: 0, totalVisits: 0 },
          dailyLogins: [],
          dailyVisits: [],
          topPages: [],
          notice: 'Analytics unavailable. Check that the migration has been applied.',
        });
      }
    }

    // ─── Activity — user activity list (for admin/activity page) ────────────
    if (type === 'activity') {
      try {
        // Fetch recent page visits, grouped by user
        const { data: visitsData, error: visitsError } = await (admin as any)
          .from('page_visits')
          .select('user_id, page_slug, visited_at')
          .order('visited_at', { ascending: false })
          .limit(500);

        if (visitsError || !visitsData) {
          return NextResponse.json({ users: [], notice: 'page_visits table may not exist yet.' });
        }

        // Group by user_id: count total pages and find last_seen
        const userMap = new Map<string, { total: number; last_seen: string }>();
        for (const v of visitsData as Array<{ user_id: string; page_slug: string; visited_at: string }>) {
          const existing = userMap.get(v.user_id);
          if (!existing) {
            userMap.set(v.user_id, { total: 1, last_seen: v.visited_at });
          } else {
            existing.total++;
          }
        }

        const userIds = Array.from(userMap.keys());
        if (userIds.length === 0) {
          return NextResponse.json({ users: [] });
        }

        const { data: profilesData } = await (admin as any)
          .from('profiles')
          .select('id, full_name, role')
          .in('id', userIds)
          .neq('role', 'admin');

        const profileMap = new Map(
          ((profilesData ?? []) as Array<{ id: string; full_name: string; role: string }>)
            .map((p) => [p.id, p])
        );

        const users = Array.from(userMap.entries())
          .map(([user_id, stats]) => {
            const profile = profileMap.get(user_id);
            if (!profile) return null;
            return {
              user_id,
              full_name: profile.full_name || 'Unknown User',
              role: profile.role || 'student',
              total_pages: stats.total,
              last_seen: stats.last_seen,
            };
          })
          .filter(Boolean)
          .sort((a: any, b: any) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime());

        return NextResponse.json({ users });
      } catch {
        return NextResponse.json({ users: [], notice: 'Failed to load activity data.' });
      }
    }

    // ─── User Activity — specific user's page visit history ──────────────
    if (type === 'user-activity') {
      const targetUserId = req.nextUrl.searchParams.get('userId');
      if (!targetUserId) {
        return NextResponse.json({ error: 'userId param required' }, { status: 400 });
      }

      try {
        const [profileRes, visitsRes] = await Promise.all([
          (admin as any)
            .from('profiles')
            .select('full_name, role')
            .eq('id', targetUserId)
            .maybeSingle(),
          (admin as any)
            .from('page_visits')
            .select('id, page_slug, visited_at')
            .eq('user_id', targetUserId)
            .order('visited_at', { ascending: false })
            .limit(200),
        ]);

        return NextResponse.json({
          profile: profileRes.data ?? null,
          views: (visitsRes.data ?? []) as Array<{ id: string; page_slug: string; visited_at: string }>,
        });
      } catch {
        return NextResponse.json({ profile: null, views: [] });
      }
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (err) {
    console.error('[admin/data]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
