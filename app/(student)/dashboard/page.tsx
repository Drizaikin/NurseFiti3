"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Spinner } from '@/components/ui/Spinner';
import { FeedbackWidget } from '@/components/shared/FeedbackWidget';
import { FeedbackWall } from '@/components/shared/FeedbackWall';
import { effectiveTier, PLAN_PRICING_META } from '@/lib/planLimits';
import { MnemonicWidget } from './MnemonicWidget';
import { AppRatingModal } from './AppRatingModal';

// ── Time-aware greeting (uses browser local time = user's timezone) ────────
function useGreeting() {
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const update = () => {
      const hour = new Date().getHours(); // local time, respects user's timezone
      if (hour >= 5 && hour < 12)       { setGreeting('Good morning');   setEmoji('👋'); }
      else if (hour >= 12 && hour < 17) { setGreeting('Good afternoon'); setEmoji('☀️'); }
      else if (hour >= 17 && hour < 21) { setGreeting('Good evening');   setEmoji('🌆'); }
      else                              { setGreeting('Good night');      setEmoji('🌙'); }
    };
    update();
    // Re-check every minute so it updates if the user leaves the tab open
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return { greeting, emoji };
}

// ── Live countdown hook ────────────────────────────────────────────────────
function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      total:   diff,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);
  return time;
}

function pad(n: number) { return String(n).padStart(2, '0'); }

// ── Hero banner — matches the reference image exactly ─────────────────────
function HeroBanner({
  firstName, streakCount, examDate, examCycle,
}: {
  firstName: string;
  streakCount: number;
  examDate: string;
  examCycle: string;
}) {
  const { greeting, emoji } = useGreeting();
  const t = useCountdown(examDate);
  const isUrgent = t.days < 14;

  return (
    <div
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl px-6 py-7 sm:px-8 sm:py-8"
      style={{
        /* Layer 1: deep forest green base — exactly as in image */
        background: '#0D2B1F',
      }}
    >
      {/* Layer 2: gradient — darker bottom-left to slightly lighter top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(135deg, #0A2018 0%, #0F2E22 40%, #133828 70%, #174030 100%)',
        }}
      />

      {/* Layer 3a: soft circle — top-right, slightly lighter green, not distinct */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: '-60px',
          right: '-60px',
          width: '420px',
          height: '380px',
          background: 'radial-gradient(ellipse at center, rgba(30,90,55,0.55) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Layer 3b: soft circle — bottom-left, slightly different green tone, not distinct */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: '-60px',
          left: '-60px',
          width: '380px',
          height: '340px',
          background: 'radial-gradient(ellipse at center, rgba(14,70,45,0.60) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
      />

      {/* ── Content row ── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        {/* Left: greeting + subtitle + CTAs */}
        <div className="flex-1 min-w-0">
          {/* Greeting */}
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight mb-1">
            {greeting}, {firstName} {emoji}
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-white/70 mb-5">
            {streakCount > 0
              ? <>You&apos;re on a <span className="text-accent font-semibold">{streakCount}-day streak</span>! Your exam is in <span className="text-accent font-semibold">{t.days} days</span>. Stay consistent.</>
              : <>Your <span className="text-accent font-semibold">{examCycle} NCK exam</span> is in <span className="text-accent font-semibold">{t.days} days</span>. Start your streak today.</>
            }
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href="/practice">
              <button className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                font-semibold text-sm text-dark
                transition-all duration-200 active:scale-[0.97]
              " style={{
                background: 'linear-gradient(135deg, #F5A623 0%, #E09010 100%)',
              }}>
                <span>📝</span> Continue Practice
              </button>
            </Link>
            <Link href="/mock-exam">
              <button className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                font-semibold text-sm text-white
                border border-white/25
                transition-all duration-200 active:scale-[0.97]
                hover:bg-white/10
              " style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}>
                <span>⏱️</span> Take Mock Exam
              </button>
            </Link>
          </div>
        </div>

        {/* Right: countdown box */}
        <div className="flex-shrink-0">
          {t.total > 0 ? (
            <div
              className="rounded-2xl px-5 py-4 text-center min-w-[120px]"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                boxShadow: isUrgent
                  ? '0 0 24px rgba(232,69,69,0.30), inset 0 1px 0 rgba(255,255,255,0.08)'
                  : '0 0 24px rgba(245,166,35,0.20), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Days — big number like the image */}
              <div
                className="text-5xl sm:text-6xl font-heading font-bold tabular-nums leading-none"
                style={{
                  color: isUrgent ? '#E84545' : '#F5A623',
                  textShadow: isUrgent
                    ? '0 0 20px rgba(232,69,69,0.60)'
                    : '0 0 20px rgba(245,166,35,0.60)',
                }}
              >
                {pad(t.days)}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mt-1 mb-3">
                DAYS
              </div>

              {/* Hours : Mins : Secs — smaller row */}
              <div className="flex items-center justify-center gap-1 text-white/80">
                {[
                  { v: t.hours,   l: 'HRS' },
                  { v: t.minutes, l: 'MIN' },
                  { v: t.seconds, l: 'SEC' },
                ].map(({ v, l }, i) => (
                  <div key={l} className="flex items-center gap-1">
                    <div className="text-center">
                      <div className="text-base font-heading font-bold tabular-nums leading-none">{pad(v)}</div>
                      <div className="text-[9px] uppercase tracking-wider text-white/40 mt-0.5">{l}</div>
                    </div>
                    {i < 2 && <span className="text-white/30 font-bold text-sm mb-3">:</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl px-6 py-5 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-2xl font-heading font-bold text-accent">🎉</p>
              <p className="text-sm text-white font-semibold mt-1">Exam Day!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Stat tile ──────────────────────────────────────────────────────────────
function StatTile({ label, value, sub, icon, color }: {
  label: string; value: string | number; sub: string; icon: string;
  color: 'teal' | 'amber' | 'green' | 'blue';
}) {
  const styles = {
    teal:  { bg: 'rgba(8,81,79,0.08)',   border: 'rgba(8,81,79,0.18)',   iconBg: 'rgba(8,81,79,0.12)',   val: '#08514F',  dark: { bg: 'rgba(10,104,101,0.15)', border: 'rgba(10,104,101,0.25)', val: '#0A6865' } },
    amber: { bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.18)', iconBg: 'rgba(245,166,35,0.12)', val: '#C47F0A', dark: { bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.22)', val: '#F5A623' } },
    green: { bg: 'rgba(26,158,117,0.08)', border: 'rgba(26,158,117,0.18)', iconBg: 'rgba(26,158,117,0.12)', val: '#1A9E75', dark: { bg: 'rgba(26,158,117,0.12)', border: 'rgba(26,158,117,0.22)', val: '#1A9E75' } },
    blue:  { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.18)', iconBg: 'rgba(59,130,246,0.12)', val: '#2563EB', dark: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.22)', val: '#60A5FA' } },
  };
  const s = styles[color];

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: `var(--stat-bg-${color}, ${s.bg})`,
        border: `1px solid ${s.border}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">{label}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: s.iconBg }}>
          {icon}
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-heading font-bold leading-none" style={{ color: s.val }}>{value}</p>
      <p className="text-xs text-[var(--color-text-secondary)] mt-2">{sub}</p>
    </div>
  );
}

// ── Action card ────────────────────────────────────────────────────────────
function ActionCard({ href, icon, label, sublabel, variant }: {
  href: string; icon: string; label: string; sublabel: string;
  variant: 'teal' | 'amber' | 'outline';
}) {
  const styles = {
    teal: {
      bg: 'linear-gradient(135deg, #08514F 0%, #0A6865 100%)',
      border: 'rgba(10,104,101,0.40)',
      shadow: '0 0 20px rgba(8,81,79,0.30), 0 4px 12px rgba(8,81,79,0.20)',
      text: 'text-white',
      sub: 'text-white/60',
    },
    amber: {
      bg: 'linear-gradient(135deg, #F5A623 0%, #C47F0A 100%)',
      border: 'rgba(245,166,35,0.40)',
      shadow: '0 0 20px rgba(245,166,35,0.35), 0 4px 12px rgba(245,166,35,0.25)',
      text: 'text-dark',
      sub: 'text-dark/60',
    },
    outline: {
      bg: 'var(--color-card)',
      border: 'var(--color-border)',
      shadow: 'var(--shadow-card)',
      text: 'text-[var(--color-text)]',
      sub: 'text-[var(--color-text-secondary)]',
    },
  };
  const s = styles[variant];

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group ${s.text}`}
        style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: s.shadow }}
      >
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{label}</p>
          <p className={`text-xs mt-0.5 ${s.sub}`}>{sublabel}</p>
        </div>
        <svg className="w-4 h-4 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

// ── Dashboard data types ───────────────────────────────────────────────────
interface DashboardData {
  student: {
    full_name: string; cadre: string; specialty?: string;
    exam_date: string; exam_cycle: string;
    xp: number; level: number; streak_count: number;
    plan_tier: string; plan_expires_at: string | null;
    scholarship?: {
      campaign_name: string;
      sponsor_name: string;
      beneficiary_type: string;
    };
  };
  stats: {
    total_questions_answered: number; correct_answers: number;
    accuracy_percentage: number; total_study_time_minutes: number;
    mock_exams_taken: number; flashcards_reviewed: number;
    badges: Array<{ name: string; description: string; icon: string; rarity: 'easy' | 'moderate' | 'hard' }>;
  };
  upcomingSessions: Array<{
    id: string; tutor_name: string; session_date: string; start_time: string; topic: string;
  }>;
}

const computeBadges = (answers: any[], streakCount: number, level: number) => {
  const badges: Array<{ name: string; description: string; icon: string; rarity: 'easy' | 'moderate' | 'hard' }> = [];

  let weekendAnswers = 0;
  let earlyBirdAnswers = 0;
  let nightOwlAnswers = 0;

  answers.forEach(a => {
    if (!a.created_at) return;
    const date = new Date(a.created_at);
    
    const day = date.getDay();
    if (day === 0 || day === 6) weekendAnswers++;

    const hour = date.getHours();
    if (hour >= 4 && hour < 8) earlyBirdAnswers++;
    if (hour >= 22 || hour < 3) nightOwlAnswers++;
  });

  // Easy
  if (answers.length >= 1) badges.push({ name: 'First Step', description: 'Answered your first question', icon: '🐣', rarity: 'easy' });
  if (weekendAnswers >= 10) badges.push({ name: 'Weekend Warrior', description: 'Answered 10+ questions on weekends', icon: '⚔️', rarity: 'easy' });

  // Moderate
  if (earlyBirdAnswers >= 10) badges.push({ name: 'Early Bird', description: 'Answered 10+ questions between 4AM-8AM', icon: '🌅', rarity: 'moderate' });
  if (nightOwlAnswers >= 10) badges.push({ name: 'Night Owl', description: 'Answered 10+ questions between 10PM-3AM', icon: '🦉', rarity: 'moderate' });
  if (streakCount >= 3) badges.push({ name: 'Consistency', description: 'Maintained a 3+ day streak', icon: '🔥', rarity: 'moderate' });

  // Hard
  if (answers.length >= 100) badges.push({ name: 'Marathoner', description: 'Answered 100+ questions in total', icon: '🏃‍♂️', rarity: 'hard' });
  if (level >= 5) badges.push({ name: 'Master', description: 'Reached Level 5', icon: '👑', rarity: 'hard' });

  if (answers.length >= 50) {
    const last50 = answers.slice(-50);
    const correctLast50 = last50.filter(a => a.is_correct).length;
    if (correctLast50 / 50 >= 0.9) {
      badges.push({ name: 'Sharpshooter', description: '90%+ accuracy over the last 50 questions', icon: '🎯', rarity: 'hard' });
    }
  }

  return badges;
};

// ── Main page ──────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient() as any;
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    // 1. Supabase Realtime subscription
    const channel = supabase
      .channel('student_dashboard_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'student_answers' },
        () => fetchDashboardData()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mock_exam_results' },
        () => fetchDashboardData()
      )
      .subscribe();

    // 2. Window focus listener
    const onFocus = () => fetchDashboardData();
    window.addEventListener('focus', onFocus);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('focus', onFocus);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [profileRes, studentRes, answersRes, mockRes, flashRes, sessionsRes, scholarshipRes] = await Promise.all([
        supabase.from('profiles').select('full_name').eq('id', user.id).single(),
        supabase.from('student_profiles').select('*').eq('id', user.id).single(),
        supabase.from('student_answers').select('is_correct, time_taken_seconds, created_at').eq('student_id', user.id).order('created_at', { ascending: true }),
        supabase.from('mock_exam_results').select('id').eq('student_id', user.id),
        supabase.from('flashcard_progress').select('id').eq('student_id', user.id),
        supabase.from('sessions')
          .select('id, session_date, start_time, topic, tutor:profiles!tutor_id(full_name)')
          .eq('student_id', user.id).eq('status', 'confirmed')
          .gte('session_date', new Date().toISOString().split('T')[0])
          .order('session_date', { ascending: true }).limit(3),
        supabase.from('scholarship_beneficiaries').select('beneficiary_type, scholarship_campaigns(name, sponsor_name)').eq('student_id', user.id).single()
      ]);

      const profileData = profileRes.data as { full_name: string } | null;
      const studentData = studentRes.data as {
        cadre: string; specialty?: string; exam_date: string; exam_cycle: string;
        xp: number; level: number; streak_count: number;
        plan_tier: string; plan_expires_at: string | null;
      } | null;

      if (!studentData) { router.push('/onboarding'); return; }

      const answers = (answersRes.data ?? []) as Array<{ is_correct: boolean; time_taken_seconds: number | null; created_at: string }>;
      const totalAnswers = answers.length;
      const correctAnswers = answers.filter(a => a.is_correct).length;
      const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
      const studyTime = Math.floor(answers.reduce((s, a) => s + (a.time_taken_seconds ?? 0), 0) / 60);
      
      const earnedBadges = computeBadges(answers, studentData.streak_count ?? 0, studentData.level ?? 1);

      const sessions = (sessionsRes.data ?? []) as Array<{
        id: string; session_date: string; start_time: string; topic: string | null;
        tutor: { full_name: string } | null;
      }>;

      setData({
        student: {
          full_name: profileData?.full_name ?? '',
          cadre: studentData.cadre,
          specialty: studentData.specialty,
          exam_date: studentData.exam_date,
          exam_cycle: studentData.exam_cycle,
          xp: studentData.xp ?? 0,
          level: studentData.level ?? 1,
          streak_count: studentData.streak_count ?? 0,
          plan_tier: studentData.plan_tier ?? 'free',
          plan_expires_at: studentData.plan_expires_at ?? null,
          scholarship: scholarshipRes.data ? {
            campaign_name: (scholarshipRes.data.scholarship_campaigns as any)?.name,
            sponsor_name: (scholarshipRes.data.scholarship_campaigns as any)?.sponsor_name,
            beneficiary_type: scholarshipRes.data.beneficiary_type
          } : undefined
        },
        stats: {
          total_questions_answered: totalAnswers,
          correct_answers: correctAnswers,
          accuracy_percentage: accuracy,
          total_study_time_minutes: studyTime,
          mock_exams_taken: mockRes.data?.length ?? 0,
          flashcards_reviewed: flashRes.data?.length ?? 0,
          badges: earnedBadges,
        },
        upcomingSessions: sessions.map(s => ({
          id: s.id,
          tutor_name: s.tutor?.full_name ?? 'Unknown',
          session_date: s.session_date,
          start_time: s.start_time,
          topic: s.topic ?? 'General Session',
        })),
      });
    } catch (err) {
      console.error('Dashboard error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <p className="text-error mb-4">Failed to load dashboard</p>
          <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );
  }

  const firstName = data.student.full_name.split(' ')[0] || 'Nurse';
  const xpPerLevel = 100;
  const xpForNextLevel = xpPerLevel; // each level requires 100 XP
  const xpInLevel = data.student.xp % xpPerLevel;
  const xpProgress = Math.min(100, (xpInLevel / xpPerLevel) * 100);

  return (
    <div className="space-y-5 pb-24 lg:pb-6">

      {/* ── Hero banner ────────────────────────────────────────────────── */}
      <HeroBanner
        firstName={firstName}
        streakCount={data.student.streak_count}
        examDate={data.student.exam_date}
        examCycle={data.student.exam_cycle}
      />

      {data.student.scholarship && (
        <Card className="bg-gradient-to-r from-teal-50 to-primary-50 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                🏆 {data.student.scholarship.campaign_name} Scholar
              </h2>
              <p className="text-sm text-neutral-dark mt-1">
                Your <span className="font-semibold">Premium Access</span> is proudly sponsored by <strong>{data.student.scholarship.sponsor_name}</strong>. Keep up the great work!
              </p>
            </div>
            <div className="hidden md:block">
              <span className="bg-teal-600 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                Active Scholarship
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* ── Mnemonic of The Day ────────────────────────────────────────── */}
      <MnemonicWidget />

      {/* ── Stat tiles ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile label="Questions Answered" value={data.stats.total_questions_answered} sub={`${data.stats.accuracy_percentage.toFixed(0)}% accuracy`} icon="📝" color="teal" />
        <StatTile label="Study Streak"        value={`${data.student.streak_count}d`}     sub={data.student.streak_count > 0 ? 'Keep it going!' : 'Start today'} icon="🔥" color="amber" />
        <StatTile label="Average Score"       value={`${data.stats.accuracy_percentage.toFixed(0)}%`} sub={`${data.stats.correct_answers} correct`} icon="✅" color="green" />
        <StatTile label="Study Time"          value={`${data.stats.total_study_time_minutes}m`} sub="Total minutes" icon="⏱️" color="blue" />
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left col */}
        <div className="lg:col-span-2 space-y-5">

          {/* Quick actions */}
          <Card>
            <h2 className="text-base font-heading font-bold text-[var(--color-text)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ActionCard href="/practice"   icon="📝" label="Practice Questions"  sublabel="Adaptive MCQ drill"     variant="teal" />
              <ActionCard href="/mock-exam"  icon="⏱️" label="Mock Exam"           sublabel="DigiProctor simulation"  variant="amber" />
              <ActionCard href="/flashcards" icon="🎴" label="Flashcards"          sublabel="Spaced repetition SRS"   variant="outline" />
              <ActionCard href="/tutors"     icon="👨‍🏫" label="Find a Tutor"       sublabel="Book a live session"     variant="outline" />
            </div>
          </Card>

          {/* XP level progress */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-heading font-bold text-[var(--color-text)]">Level Progress</h2>
              <Badge variant="teal">Level {data.student.level}</Badge>
            </div>
            <ProgressBar value={xpProgress} color="teal" size="lg" showLabel={false} />
            <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-2">
              <span>{xpInLevel} XP earned</span>
              <span>{xpForNextLevel - xpInLevel} XP to Level {data.student.level + 1}</span>
            </div>
          </Card>

          {/* Study progress bars */}
          <Card>
            <h2 className="text-base font-heading font-bold text-[var(--color-text)] mb-4">Study Progress</h2>
            <div className="space-y-4">
              {[
                { label: 'Questions Answered', value: data.stats.total_questions_answered, max: 500,  color: 'teal'  as const },
                { label: 'Mock Exams Done',     value: data.stats.mock_exams_taken,         max: 10,   color: 'amber' as const },
                { label: 'Flashcards Reviewed', value: data.stats.flashcards_reviewed,      max: 200,  color: 'green' as const },
              ].map(({ label, value, max, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
                    <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{value} / {max}</span>
                  </div>
                  <ProgressBar value={Math.min((value / max) * 100, 100)} color={color} size="sm" showLabel={false} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-5">

          {/* Exam details */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">Exam Details</h3>
            <div className="space-y-3 text-sm">
              {/* Active plan */}
              {(() => {
                const tier = effectiveTier(data.student.plan_tier, data.student.plan_expires_at);
                const meta = PLAN_PRICING_META[tier];
                const isExpired = data.student.plan_tier !== 'free' && tier === 'free';
                const expiresAt = data.student.plan_expires_at;
                return (
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                    <span className="text-[var(--color-text-secondary)]">Active Plan</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <Badge variant={meta.badge} size="sm">{meta.label}</Badge>
                      {isExpired && (
                        <span className="text-[10px] text-error font-semibold">Expired</span>
                      )}
                      {!isExpired && tier !== 'free' && expiresAt && (
                        <span className="text-[10px] text-[var(--color-text-secondary)]">
                          until {new Date(expiresAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })()}
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Cadre</span>
                <Badge variant="teal" size="sm">{data.student.cadre}</Badge>
              </div>
              {data.student.specialty && (
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)]">Specialty</span>
                  <span className="font-semibold text-[var(--color-text)] text-xs">{data.student.specialty}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Exam Date</span>
                <span className="font-semibold text-[var(--color-text)]">
                  {new Date(data.student.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Cycle</span>
                <span className="font-semibold text-[var(--color-text)]">{data.student.exam_cycle}</span>
              </div>
            </div>
          </Card>

          {/* Upcoming sessions */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">Upcoming Sessions</h3>
            {data.upcomingSessions.length > 0 ? (
              <div className="space-y-3">
                {data.upcomingSessions.map(s => (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl border"
                    style={{ background: 'rgba(8,81,79,0.05)', borderColor: 'rgba(8,81,79,0.12)' }}
                  >
                    <p className="font-semibold text-sm text-[var(--color-text)]">{s.tutor_name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{s.topic}</p>
                    <p className="text-xs text-primary font-medium mt-1">
                      {new Date(s.session_date).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} at {s.start_time}
                    </p>
                  </div>
                ))}
                <Link href="/bookings">
                  <Button variant="ghost" size="sm" className="w-full mt-1">View All Bookings</Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-4xl mb-3">👨‍🏫</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">No upcoming sessions</p>
                <Link href="/tutors">
                  <Button variant="primary" size="sm" className="w-full">Book a Tutor</Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Feedback & support */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-1">Feedback & Support</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              Your review is posted publicly — like a Play Store review.
            </p>
            <FeedbackWidget
              displayName={firstName}
              cadre={data.student.cadre}
              userRole="student"
              triggerVariant="dashboard"
            />
            <div className="mt-3 flex gap-2">
              <a
                href="mailto:danotyanga@gmail.com"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-primary/40 hover:text-primary transition-colors"
              >
                ✉️ Email Support
              </a>
              <a
                href="https://whatsapp.com/channel/0029VbChmRR4SpkDcdghnW3m"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:border-success/40 hover:text-success transition-colors"
              >
                💬 WhatsApp Community
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
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">What students and tutors are saying about NurseFiti</p>
          </div>
          <FeedbackWidget
            displayName={firstName}
            cadre={data.student.cadre}
            userRole="student"
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
      
      {/* ── Hidden modals/tracking ─────────────────────────────────────── */}
      <AppRatingModal />
    </div>
  );
}
