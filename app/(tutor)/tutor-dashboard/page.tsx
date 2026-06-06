"use client";

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FeedbackWidget } from '@/components/shared/FeedbackWidget';
import { FeedbackWall } from '@/components/shared/FeedbackWall';

export const dynamic = 'force-dynamic';

interface TutorDashboardData {
  tutor: {
    full_name: string;
    avatar_url: string | null;
    professional_title: string;
    verification_status: string;
    verification_tier: string | null;
    average_rating: number;
    total_students: number;
    total_sessions: number;
    pass_rate: number;
    rate_per_hour: number | null;
    is_accepting_bookings: boolean;
    // completion checklist fields
    bio: string | null;
    cadres_taught: string[];
    mpesa_number: string | null;
    nck_certificate_url: string | null;
    academic_qualification_url: string | null;
    national_id_url: string | null;
  };
  todaySessions: Array<{
    id: string;
    student_name: string;
    start_time: string;
    end_time: string;
    topic: string | null;
    platform: string;
    status: string;
    cadre: string;
    join_link: string | null;
  }>;
  pendingBookings: Array<{
    id: string;
    student_name: string;
    session_date: string;
    start_time: string;
    topic: string | null;
    cadre: string;
  }>;
  recentStudents: Array<{
    id: string;
    full_name: string;
    cadre: string;
    sessions_count: number;
  }>;
  earningsThisMonth: number;
  contributionStats: { questions: number; notes: number };
}

// ── Verification banner shown to pending/incomplete tutors ────────────────────
function VerificationBanner({ tutor, onRefresh }: {
  tutor: TutorDashboardData['tutor'];
  onRefresh: () => Promise<void>;
}) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try { await onRefresh(); } finally { setRefreshing(false); }
  };
  const steps = [
    {
      id: 'profile',
      label: 'Complete your profile',
      detail: 'Add your bio, cadres you teach, and set your hourly rate',
      done: !!(tutor.bio && tutor.bio.length >= 200 && tutor.cadres_taught.length > 0 && tutor.rate_per_hour),
      href: '/tutor-complete-profile',
      cta: 'Complete Profile',
    },
    {
      id: 'documents',
      label: 'Upload your documents',
      detail: 'NCK certificate, academic qualification, and national ID',
      done: !!(tutor.nck_certificate_url && tutor.academic_qualification_url && tutor.national_id_url),
      href: '/tutor-complete-profile',
      cta: 'Upload Documents',
    },
    {
      id: 'mpesa',
      label: 'Link your M-Pesa number',
      detail: 'Required to receive payments for completed sessions',
      done: !!tutor.mpesa_number,
      href: '/tutor-complete-profile',
      cta: 'Add M-Pesa',
    },
    {
      id: 'review',
      label: 'Admin review',
      detail: 'Our team verifies your credentials — typically 1–2 business days',
      done: tutor.verification_status === 'verified',
      href: null,
      cta: null,
    },
  ];

  const completedCount = steps.filter(s => s.done).length;
  const progress = Math.round((completedCount / steps.length) * 100);
  const isRejected = tutor.verification_status === 'rejected';

  if (tutor.verification_status === 'verified') return null;

  return (
    <div className={`rounded-2xl border-2 p-5 sm:p-6 ${isRejected ? 'border-error/30 bg-error/5' : 'border-accent/30 bg-accent/5'}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${isRejected ? 'bg-error/15' : 'bg-accent/15'}`}>
          {isRejected ? '❌' : '⏳'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className={`font-heading font-bold text-lg ${isRejected ? 'text-error' : 'text-[var(--color-text)]'}`}>
            {isRejected ? 'Application Not Approved' : 'Complete Your Verification'}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            {isRejected
              ? 'Your application was not approved. Please contact support for details.'
              : `${completedCount} of ${steps.length} steps done — you can use the dashboard while you wait for admin review.`}
          </p>
        </div>
        {!isRejected && (
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-heading font-bold text-accent">{progress}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">complete</p>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-xs text-primary hover:underline mt-1 block disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {refreshing ? '⏳ Refreshing…' : '↻ Refresh'}
            </button>
          </div>
        )}
      </div>

      {!isRejected && (
        <>
          {/* Progress bar */}
          <div className="h-2 rounded-full bg-[var(--color-border)] mb-5 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={step.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${step.done ? 'border-success/20 bg-success/5' : 'border-[var(--color-border)] bg-[var(--color-card)]'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 ${step.done ? 'bg-success text-white' : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]'}`}>
                  {step.done ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${step.done ? 'text-success line-through opacity-70' : 'text-[var(--color-text)]'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{step.detail}</p>
                </div>
                {!step.done && step.href && step.cta && (
                  <Link href={step.href} className="flex-shrink-0">
                    <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-mid transition-colors whitespace-nowrap">
                      {step.cta} →
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--color-text-secondary)] mt-4 text-center">
            Questions? <a href="mailto:support@nursefiti.co.ke" className="text-primary font-semibold hover:underline">Contact support</a>
          </p>
        </>
      )}
    </div>
  );
}

function StatTile({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: 'teal' | 'amber' | 'green' | 'blue' }) {
  const styles = {
    teal:  { bg: 'rgba(8,81,79,0.08)',   border: 'rgba(8,81,79,0.18)',   val: '#08514F',  iconBg: 'rgba(8,81,79,0.12)' },
    amber: { bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.18)', val: '#C47F0A', iconBg: 'rgba(245,166,35,0.12)' },
    green: { bg: 'rgba(26,158,117,0.08)', border: 'rgba(26,158,117,0.18)', val: '#1A9E75', iconBg: 'rgba(26,158,117,0.12)' },
    blue:  { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.18)', val: '#2563EB', iconBg: 'rgba(59,130,246,0.12)' },
  };
  const s = styles[color];
  return (
    <div className="rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{label}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: s.iconBg }}>{icon}</div>
      </div>
      <p className="text-2xl sm:text-3xl font-heading font-bold leading-none" style={{ color: s.val }}>{value}</p>
    </div>
  );
}

export default function TutorDashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>}>
      <TutorDashboardInner />
    </Suspense>
  );
}

function TutorDashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [data, setData] = useState<TutorDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [profileRes, tutorRes, sessionsRes, paymentsRes, questionsRes, notesRes] = await Promise.all([
        supabase.from('profiles').select('full_name, avatar_url').eq('id', user.id).maybeSingle(),
        supabase.from('tutor_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('sessions').select('id, session_date, start_time, end_time, topic, platform, status, cadre, student_id, join_link').eq('tutor_id', user.id).order('session_date', { ascending: false }).limit(20),
        supabase.from('payments').select('amount, completed_at').eq('user_id', user.id).eq('status', 'completed').eq('type', 'session_booking'),
        supabase.from('questions').select('id').eq('contributor_id', user.id).eq('status', 'approved'),
        supabase.from('study_notes').select('id').eq('contributor_id', user.id).eq('status', 'approved'),
      ]);

      const profile = profileRes.data as { full_name: string; avatar_url: string | null } | null;
      const tutor = (tutorRes.data ?? {}) as any;

      if (!profile) { setIsLoading(false); return; }

      const allSessions = (sessionsRes.data ?? []) as any[];
      const today = new Date().toISOString().split('T')[0];

      const todaySessionIds = allSessions.filter(s => s.session_date === today && s.status === 'confirmed');
      const studentIds = Array.from(new Set([...todaySessionIds, ...allSessions.filter(s => s.status === 'pending_approval')].map(s => s.student_id)));

      let studentNames: Record<string, string> = {};
      if (studentIds.length > 0) {
        const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', studentIds);
        studentNames = Object.fromEntries((names ?? []).map((n: any) => [n.id, n.full_name]));
      }

      const todaySessions = todaySessionIds.map(s => ({
        id: s.id, student_name: studentNames[s.student_id] ?? 'Student',
        start_time: s.start_time, end_time: s.end_time, topic: s.topic,
        platform: s.platform, status: s.status, cadre: s.cadre,
        join_link: s.join_link ?? null,
      }));

      const pendingBookings = allSessions
        .filter(s => s.status === 'pending_approval').slice(0, 5)
        .map(s => ({
          id: s.id, student_name: studentNames[s.student_id] ?? 'Student',
          session_date: s.session_date, start_time: s.start_time, topic: s.topic, cadre: s.cadre,
        }));

      const seenStudents = new Set<string>();
      const recentStudents: TutorDashboardData['recentStudents'] = [];
      for (const s of allSessions) {
        if (!seenStudents.has(s.student_id) && recentStudents.length < 5) {
          seenStudents.add(s.student_id);
          recentStudents.push({
            id: s.student_id, full_name: studentNames[s.student_id] ?? 'Student',
            cadre: s.cadre, sessions_count: allSessions.filter(x => x.student_id === s.student_id).length,
          });
        }
      }

      const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0);
      const payments = (paymentsRes.data ?? []) as Array<{ amount: number; completed_at: string }>;
      const earningsThisMonth = payments
        .filter(p => new Date(p.completed_at) >= startOfMonth)
        .reduce((sum, p) => sum + Math.round(p.amount * 0.70), 0);

      setData({
        tutor: {
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          professional_title: tutor.professional_title ?? '',
          verification_status: tutor.verification_status ?? 'pending',
          verification_tier: tutor.verification_tier ?? null,
          average_rating: tutor.average_rating ?? 0,
          total_students: tutor.total_students ?? 0,
          total_sessions: tutor.total_sessions ?? 0,
          pass_rate: tutor.pass_rate ?? 0,
          rate_per_hour: tutor.rate_per_hour ?? null,
          is_accepting_bookings: tutor.is_accepting_bookings ?? false,
          bio: tutor.bio ?? null,
          cadres_taught: tutor.cadres_taught ?? [],
          mpesa_number: tutor.mpesa_number ?? null,
          nck_certificate_url: tutor.nck_certificate_url ?? null,
          academic_qualification_url: tutor.academic_qualification_url ?? null,
          national_id_url: tutor.national_id_url ?? null,
        },
        todaySessions,
        pendingBookings,
        recentStudents,
        earningsThisMonth,
        contributionStats: {
          questions: questionsRes.data?.length ?? 0,
          notes: notesRes.data?.length ?? 0,
        },
      });
    } catch (err) {
      console.error('Tutor dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial load
  useEffect(() => { fetchData(); }, [fetchData]);

  // Re-fetch when returning from complete-profile (?refreshed=1)
  useEffect(() => {
    if (searchParams.get('refreshed') === '1') {
      fetchData().then(() => {
        // Clean the URL without causing a navigation
        router.replace('/tutor-dashboard', { scroll: false });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const approveBooking = async (sessionId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('sessions').update({ status: 'confirmed' }).eq('id', sessionId);
    fetchData();
  };

  const declineBooking = async (sessionId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('sessions').update({ status: 'cancelled' }).eq('id', sessionId);
    fetchData();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <p className="text-error mb-4">Failed to load dashboard</p>
          <Button variant="primary" onClick={() => fetchData()}>Retry</Button>
        </Card>
      </div>
    );
  }

  const { tutor } = data;

  return (
    <div className="space-y-5 pb-24 lg:pb-6">

      {/* Verification banner — shown until verified */}
      <VerificationBanner tutor={tutor} onRefresh={fetchData} />

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl px-6 py-7 sm:px-8 sm:py-8"
        style={{ background: 'linear-gradient(135deg, #0A2018 0%, #0F2E22 40%, #133828 70%, #174030 100%)' }}>
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ top: '-60px', right: '-60px', width: '420px', height: '380px', background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.15) 0%, transparent 65%)', filter: 'blur(60px)' }} />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={tutor.full_name} src={tutor.avatar_url} size="lg" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-heading font-bold text-white">{tutor.full_name}</h1>
                {tutor.verification_tier === 'gold' && <Badge variant="warning" size="sm">⭐ Gold</Badge>}
                {tutor.verification_tier === 'standard' && <Badge variant="primary" size="sm">✓ Verified</Badge>}
              </div>
              <p className="text-sm text-white/70">{tutor.professional_title}</p>
              <div className="flex items-center gap-3 mt-2">
                {tutor.average_rating > 0 && (
                  <span className="text-sm text-accent font-semibold">★ {tutor.average_rating.toFixed(1)}</span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${tutor.is_accepting_bookings ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                  {tutor.is_accepting_bookings ? '● Accepting bookings' : '● Not accepting bookings'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/tutor-schedule">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-dark transition-all duration-200 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E09010 100%)' }}>
                📅 Manage Schedule
              </button>
            </Link>
            <Link href="/tutor-profile">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white border border-white/25 transition-all duration-200 active:scale-[0.97] hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                ✏️ Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile label="Total Students" value={tutor.total_students} icon="👥" color="teal" />
        <StatTile label="Total Sessions" value={tutor.total_sessions} icon="📅" color="amber" />
        <StatTile label="Pass Rate" value={`${tutor.pass_rate.toFixed(0)}%`} icon="✅" color="green" />
        <StatTile label="This Month" value={`KSh ${data.earningsThisMonth.toLocaleString()}`} icon="💰" color="blue" />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left col */}
        <div className="lg:col-span-2 space-y-5">

          {/* Today's sessions */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-heading font-bold text-[var(--color-text)]">Today&apos;s Sessions</h2>
              <Link href="/tutor-schedule"><Button variant="ghost" size="sm">View Schedule</Button></Link>
            </div>
            {data.todaySessions.length > 0 ? (
              <div className="space-y-3">
                {data.todaySessions.map(s => (
                  <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl border" style={{ background: 'rgba(8,81,79,0.05)', borderColor: 'rgba(8,81,79,0.12)' }}>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {s.student_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--color-text)]">{s.student_name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{s.topic ?? 'General Session'} · {s.platform}</p>
                      {/* Meet link action */}
                      {s.platform === 'Google Meet' && (
                        <div className="mt-1.5 flex gap-2">
                          {s.join_link ? (
                            <a
                              href={s.join_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-success text-white text-xs font-bold hover:bg-success/80 transition-colors"
                            >
                              🎥 Join Google Meet
                            </a>
                          ) : (
                            <Link href="/tutor-schedule">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent text-dark text-xs font-bold hover:bg-accent-dark transition-colors cursor-pointer">
                                ⚠️ Add Meet Link
                              </span>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-primary">{s.start_time.slice(0, 5)}</p>
                      <Badge variant="teal" size="sm">{s.cadre}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-sm text-[var(--color-text-secondary)]">No sessions scheduled for today</p>
              </div>
            )}
          </Card>

          {/* Pending booking requests */}
          {data.pendingBookings.length > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-heading font-bold text-[var(--color-text)]">Pending Requests</h2>
                <Badge variant="warning">{data.pendingBookings.length}</Badge>
              </div>
              <div className="space-y-3">
                {data.pendingBookings.map(b => (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl border border-accent/20 bg-accent/5">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--color-text)]">{b.student_name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {new Date(b.session_date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })} at {b.start_time.slice(0, 5)}
                        {b.topic && ` · ${b.topic}`}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => approveBooking(b.id)} className="px-3 py-1.5 rounded-lg bg-success text-white text-xs font-semibold hover:bg-success/80 transition-colors">Approve</button>
                      <button onClick={() => declineBooking(b.id)} className="px-3 py-1.5 rounded-lg bg-error/10 text-error text-xs font-semibold hover:bg-error/20 transition-colors">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick actions */}
          <Card>
            <h2 className="text-base font-heading font-bold text-[var(--color-text)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { href: '/tutor-schedule', icon: '📅', label: 'Set Availability' },
                { href: '/tutor-students', icon: '👥', label: 'View Students' },
                { href: '/tutor-studio', icon: '✏️', label: 'Add Content' },
                { href: '/tutor-earnings', icon: '💰', label: 'View Earnings' },
                { href: '/tutor-reviews', icon: '⭐', label: 'My Reviews' },
                { href: '/tutor-profile', icon: '👤', label: 'Edit Profile' },
              ].map(a => (
                <Link key={a.href} href={a.href}>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:border-primary/40 hover:bg-primary-xlight transition-all cursor-pointer">
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-sm font-medium text-[var(--color-text)]">{a.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-5">

          {/* Rate & earnings summary */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">Rate & Earnings</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Hourly Rate</span>
                <span className="font-bold text-accent">KSh {(tutor.rate_per_hour ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Platform Fee</span>
                <span className="font-semibold text-[var(--color-text)]">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Your Net Rate</span>
                <span className="font-bold text-success">KSh {Math.round((tutor.rate_per_hour ?? 0) * 0.70).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)]">This Month</span>
                  <span className="font-bold text-[var(--color-text)]">KSh {data.earningsThisMonth.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Link href="/tutor-earnings">
              <Button variant="ghost" size="sm" className="w-full mt-4">View Full Earnings →</Button>
            </Link>
          </Card>

          {/* Recent students */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-[var(--color-text)]">Recent Students</h3>
              <Link href="/tutor-students"><Button variant="ghost" size="sm">All →</Button></Link>
            </div>
            {data.recentStudents.length > 0 ? (
              <div className="space-y-3">
                {data.recentStudents.map(s => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {s.full_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text)] truncate">{s.full_name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{s.cadre} · {s.sessions_count} session{s.sessions_count !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)] text-center py-4">No students yet</p>
            )}
          </Card>

          {/* Content contributions */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">Contributions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">Approved MCQs</span>
                <Badge variant="teal">{data.contributionStats.questions}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">Study Notes</span>
                <Badge variant="secondary">{data.contributionStats.notes}</Badge>
              </div>
            </div>
            <Link href="/tutor-studio">
              <Button variant="primary" size="sm" className="w-full mt-4">+ Add Content</Button>
            </Link>
          </Card>

          {/* Feedback & support */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-1">Feedback & Support</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              Share a complaint, suggestion, or praise — posted publicly.
            </p>
            <FeedbackWidget
              displayName={tutor.full_name.split(' ')[0]}
              cadre={tutor.professional_title}
              userRole="tutor"
              triggerVariant="dashboard"
            />
            <div className="mt-3 flex gap-2">
              <a
                href="mailto:support@nursefiti.vercel.app"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-primary/40 hover:text-primary transition-colors"
              >
                ✉️ Email Support
              </a>
              <a
                href="https://wa.me/254791952703"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-success/40 hover:text-success transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Community Reviews ─────────────────────────────────────────── */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-heading font-bold text-[var(--color-text)]">Community Reviews</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">What the NurseFiti community is saying</p>
          </div>
          <FeedbackWidget
            displayName={tutor.full_name.split(' ')[0]}
            cadre={tutor.professional_title}
            userRole="tutor"
            trigger={
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-mid transition-colors">
                + Write a Review
              </button>
            }
          />
        </div>
        <FeedbackWall limit={4} showSummary={false} showFilters={false} compact={true} />
        <a href="/#reviews" className="block text-center text-xs text-primary font-semibold mt-4 hover:underline">
          View all reviews →
        </a>
      </Card>
    </div>
  );
}
