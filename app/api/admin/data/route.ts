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

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Use service-role client for all data reads — bypasses RLS entirely
    const admin = createAdminClient();
    const type = req.nextUrl.searchParams.get('type') ?? 'students';

    if (type === 'uploads') {
      const statusFilter = req.nextUrl.searchParams.get('status');
      let query = admin
        .from('question_uploads')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter) as typeof query;
      }

      const { data: uploadData } = await query;
      if (!uploadData) return NextResponse.json({ uploads: [] });

      // Fetch student names/emails/plans
      const studentIds = [...new Set((uploadData as Array<{ student_id: string }>).map(u => u.student_id))];
      const [profilesRes, spRes] = await Promise.all([
        admin.from('profiles').select('id, full_name, email').in('id', studentIds),
        admin.from('student_profiles').select('id, plan_tier').in('id', studentIds),
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
        .select('id, plan_tier')
        .in('id',
          (await admin.from('profiles').select('id').eq('role', 'student')).data?.map((p: { id: string }) => p.id) ?? []
        );

      const plans = (studentPlans ?? []) as Array<{ plan_tier: string }>;
      const tutors = (tutorsRes.data ?? []) as Array<{ verification_status: string }>;

      return NextResponse.json({
        totalStudents:    studentsRes.count ?? 0,
        freeStudents:     plans.filter(s => s.plan_tier === 'free').length,
        paidStudents:     plans.filter(s => s.plan_tier !== 'free').length,
        totalTutors:      tutors.length,
        verifiedTutors:   tutors.filter(t => t.verification_status === 'verified').length,
        pendingTutors:    tutors.filter(t => t.verification_status === 'pending').length,
        pendingUploads:   uploadsRes.count ?? 0,
        pendingQuestions: questionsRes.count ?? 0,
      });
    }

    if (type === 'students') {
      const [profilesRes, spRes] = await Promise.all([
        admin
          .from('profiles')
          .select('id, full_name, email, created_at')
          .eq('role', 'student')
          .order('created_at', { ascending: false })
          .limit(200),
        admin
          .from('student_profiles')
          .select('id, cadre, plan_tier, plan_expires_at'),
      ]);

      const profiles = (profilesRes.data ?? []) as Array<{
        id: string; full_name: string; email: string; created_at: string;
      }>;
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
          plan_tier:      sp?.plan_tier ?? 'free',
          plan_expires_at: sp?.plan_expires_at ?? null,
          created_at:     p.created_at,
        };
      });

      return NextResponse.json({ students });
    }

    if (type === 'tutors') {
      const [profilesRes, tpRes] = await Promise.all([
        admin
          .from('profiles')
          .select('id, full_name, email, phone, created_at')
          .eq('role', 'tutor')
          .order('created_at', { ascending: false })
          .limit(200),
        admin
          .from('tutor_profiles')
          .select('id, professional_title, cadres_taught, years_experience, verification_status, verification_tier, average_rating, total_sessions, rate_per_hour, nck_reg_number, bio, current_employer, nck_certificate_url, academic_qualification_url, national_id_url, mpesa_number, rejection_reason'),
      ]);

      const profiles = (profilesRes.data ?? []) as Array<{
        id: string; full_name: string; email: string; phone: string; created_at: string;
      }>;
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
      const contributorIds = [...new Set((questionsData as Array<{ contributor_id: string | null }>)
        .map(q => q.contributor_id).filter(Boolean))] as string[];

      const { data: contributorProfiles } = contributorIds.length > 0
        ? await admin.from('profiles').select('id, full_name').in('id', contributorIds)
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

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (err) {
    console.error('[admin/data]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
