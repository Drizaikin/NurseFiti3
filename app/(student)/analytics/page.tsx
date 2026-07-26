"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Spinner } from '@/components/ui/Spinner';
import { StatCard } from '@/components/shared/StatCard';
import { getLimits, effectiveTier } from '@/lib/planLimits';
import { fetchPlatformSettings } from '@/lib/platformSettings';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DownloadWrongQuestionsCard } from '@/components/student/DownloadWrongQuestionsCard';

import { MockResult, MockExamHistoryTable } from '@/components/student/MockExamHistoryTable';

interface TopicStat {
  topic: string;
  total: number;
  correct: number;
  accuracy: number;
}

interface UnitStat {
  unit: string;
  total: number;
  correct: number;
  accuracy: number;
  topics: TopicStat[];
}

interface DayStat {
  day: string;
  score: number;
  count: number;
}

interface AnalyticsData {
  totalAnswered: number;
  correctAnswers: number;
  accuracy: number;
  studyTimeMinutes: number;
  mockExams: MockResult[];
  unitStats: UnitStat[];
  weeklyStats: DayStat[];
  readinessScore: number;
  flashcardsReviewed: number;
}

function UnitMasteryItem({ u }: { u: UnitStat }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] overflow-hidden transition-all">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex flex-col px-4 py-3 text-left hover:bg-neutral-light/50 dark:hover:bg-neutral-dark/30 transition-colors"
      >
        <div className="flex items-center justify-between mb-2 w-full">
          <div className="flex items-center gap-2 max-w-[60%]">
            <span className="text-sm font-semibold text-[var(--color-text)] truncate">{u.unit}</span>
            <span className="text-xs text-neutral-mid flex-shrink-0">({u.topics.length} topics)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-neutral-mid">{u.correct}/{u.total}</span>
            <Badge size="sm" variant={u.accuracy >= 70 ? 'green' : u.accuracy >= 50 ? 'amber' : 'red'}>{u.accuracy}%</Badge>
            <span className={`text-neutral-mid text-xs transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
          </div>
        </div>
        <ProgressBar value={u.accuracy} color={u.accuracy >= 70 ? 'green' : u.accuracy >= 50 ? 'amber' : 'red'} size="sm" showLabel={false} />
      </button>

      {isExpanded && u.topics.length > 0 && (
        <div className="px-4 pb-4 bg-neutral-light/30 dark:bg-[var(--color-background)] border-t border-[var(--color-border)] space-y-4">
          {u.topics.map(t => (
            <div key={t.topic} className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[var(--color-text-secondary)] truncate max-w-[70%]">{t.topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-neutral-mid">{t.correct}/{t.total}</span>
                  <span className={`text-xs font-bold ${t.accuracy >= 70 ? 'text-[#10B981]' : t.accuracy >= 50 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>{t.accuracy}%</span>
                </div>
              </div>
              <ProgressBar value={t.accuracy} color={t.accuracy >= 70 ? 'green' : t.accuracy >= 50 ? 'amber' : 'red'} size="sm" showLabel={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [planTier, setPlanTier] = useState<string>('free');
  const [dailyPrice, setDailyPrice] = useState(99);

  useEffect(() => {
    const load = async () => {
      try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [profileRes, answersRes, mockRes, flashRes, settingsRes] = await Promise.all([
        supabase.from('student_profiles').select('plan_tier, plan_expires_at').eq('id', user.id).maybeSingle(),
        // Limit to last 2000 answers to avoid timeout on large accounts
        supabase.from('student_answers')
          .select('is_correct, time_taken_seconds, answered_at, question_id, questions(unit, topic)')
          .eq('student_id', user.id)
          .order('answered_at', { ascending: false })
          .limit(2000),
        supabase.from('mock_exam_results').select('*').eq('student_id', user.id).order('completed_at', { ascending: false }),
        supabase.from('flashcard_progress').select('id').eq('student_id', user.id),
        fetchPlatformSettings(supabase as any)
      ]);

      const profileData = profileRes.data as { plan_tier: string; plan_expires_at: string | null } | null;
      if (profileData) {
        setPlanTier(effectiveTier(profileData.plan_tier, profileData.plan_expires_at));
      }

      const answers = (answersRes.data ?? []) as Array<{ is_correct: boolean; time_taken_seconds: number | null; answered_at: string; question_id: string; questions?: { unit: string; topic: string | null } }>;
      const mocks = (mockRes.data ?? []) as MockResult[];
      const flashCount = flashRes.data?.length ?? 0;
      const settings = settingsRes as any;
      
      if (settings?.plan_daily_price) {
        setDailyPrice(settings.plan_daily_price);
      }

      const totalAnswered = answers.length;
      const correctAnswers = answers.filter(a => a.is_correct).length;
      const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
      const studyTimeMinutes = Math.round(answers.reduce((s, a) => s + (a.time_taken_seconds ?? 0), 0) / 60);

      // Weekly stats (last 7 days) — correctly parsing UTC strings to local dates
      const weeklyStats: DayStat[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        
        const dayAnswers = answers.filter(a => {
          if (!a.answered_at) return false;
          const ansDate = new Date(a.answered_at);
          return ansDate.getFullYear() === d.getFullYear() &&
                 ansDate.getMonth() === d.getMonth() &&
                 ansDate.getDate() === d.getDate();
        });
        
        const dayCorrect = dayAnswers.filter(a => a.is_correct).length;
        weeklyStats.push({
          day: d.toLocaleDateString('en-KE', { weekday: 'short' }),
          score: dayAnswers.length > 0 ? Math.round((dayCorrect / dayAnswers.length) * 100) : 0,
          count: dayAnswers.length,
        });
      }

      // Unit stats — computed efficiently in memory since questions are already joined
      let unitStats: UnitStat[] = [];
      const unitMap = new Map<string, { total: number; correct: number; topics: Map<string, { total: number; correct: number }> }>();
      for (const ans of answers) {
        const unit = ans.questions?.unit;
        const topic = ans.questions?.topic || 'General';
        if (!unit) continue;
        
        let unitData = unitMap.get(unit);
        if (!unitData) {
          unitData = { total: 0, correct: 0, topics: new Map() };
          unitMap.set(unit, unitData);
        }
        unitData.total++;
        if (ans.is_correct) unitData.correct++;
        
        let topicData = unitData.topics.get(topic);
        if (!topicData) {
          topicData = { total: 0, correct: 0 };
          unitData.topics.set(topic, topicData);
        }
        topicData.total++;
        if (ans.is_correct) topicData.correct++;
      }

      unitStats = Array.from(unitMap.entries()).map(([unit, s]) => {
        const topics: TopicStat[] = Array.from(s.topics.entries()).map(([topic, ts]) => ({
          topic, total: ts.total, correct: ts.correct, accuracy: Math.round((ts.correct / ts.total) * 100)
        })).sort((a, b) => b.accuracy - a.accuracy); // Highest accuracy first (positive appraisal)

        return {
          unit, total: s.total, correct: s.correct,
          accuracy: Math.round((s.correct / s.total) * 100),
          topics
        };
      }).sort((a, b) => b.total - a.total);

      // Readiness score: weighted average of unit accuracies + mock exam average
      const unitAvg = unitStats.length > 0 ? unitStats.reduce((s, u) => s + u.accuracy, 0) / unitStats.length : 0;
      const mockAvg = mocks.length > 0 ? mocks.reduce((s, m) => s + m.score_percentage, 0) / mocks.length : 0;
      const readinessScore = unitStats.length > 0 || mocks.length > 0
        ? Math.round(unitAvg * 0.6 + mockAvg * 0.4) : 0;

      setData({ totalAnswered, correctAnswers, accuracy, studyTimeMinutes, mockExams: mocks, unitStats, weeklyStats, readinessScore, flashcardsReviewed: flashCount });
      } catch (err) {
        console.error('Analytics error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  if (!data) return null;

  const readinessColor = data.readinessScore >= 70 ? 'text-success' : data.readinessScore >= 50 ? 'text-accent' : 'text-error';
  const limits = getLimits(planTier);
  const isFullAnalytics = limits.analyticsLevel === 'full';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-1">Analytics</h1>
        <p className="text-neutral-mid">Your performance breakdown across all study activities.</p>
      </div>

      {/* Readiness Score */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <p className="text-sm text-neutral-mid mb-1">Exam Readiness Score</p>
            <p className={`text-7xl font-heading font-bold ${readinessColor}`}>{data.readinessScore}%</p>
            <Badge variant={data.readinessScore >= 70 ? 'green' : data.readinessScore >= 50 ? 'amber' : 'red'} className="mt-2">
              {data.readinessScore >= 70 ? 'On Track' : data.readinessScore >= 50 ? 'Needs Work' : 'At Risk'}
            </Badge>
          </div>
          <div className="flex-1 w-full">
            <ProgressBar value={data.readinessScore} color={data.readinessScore >= 70 ? 'green' : data.readinessScore >= 50 ? 'amber' : 'red'} size="lg" showLabel={false} />
            <p className="text-xs text-neutral-mid mt-2">Based on unit mastery (60%) + mock exam scores (40%)</p>
          </div>
        </div>
      </Card>

      <DownloadWrongQuestionsCard planTier={planTier} />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Questions Answered" value={data.totalAnswered.toLocaleString()} icon="📝" />
        <StatCard label="Accuracy Rate" value={`${data.accuracy}%`} icon="✅" deltaPositive={data.accuracy >= 60} delta={data.accuracy >= 60 ? 'Good' : 'Needs improvement'} />
        <StatCard label="Study Time" value={(() => { const h = Math.floor(data.studyTimeMinutes / 60); const m = data.studyTimeMinutes % 60; return h > 0 ? `${h}h ${m}m` : `${m}m`; })()} icon="⏱️" />
        <StatCard label="Flashcards Reviewed" value={data.flashcardsReviewed.toLocaleString()} icon="🎴" />
      </div>

      {/* ── FULL ANALYTICS (Standard / Premium) ─────────────────────────── */}
      {isFullAnalytics ? (
        <>
          {/* Weekly score chart */}
          <Card>
            <h2 className="text-xl font-heading font-bold mb-4">7-Day Score Trend</h2>
            {data.weeklyStats.some(d => d.count > 0) ? (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.weeklyStats} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                      formatter={(value: number, _name: string, props: any) => {
                        const payload = props.payload as DayStat;
                        return [`${value}% (${payload.count} Qs)`, 'Score'] as [string, string];
                      }}
                    />
                    <Bar dataKey="score" fill="#08514F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-neutral-mid text-sm py-8 text-center">No practice data this week. Start practicing to see your trend!</p>
            )}
          </Card>

          {/* Unit mastery */}
          {data.unitStats.length > 0 && (
            <Card>
              <h2 className="text-xl font-heading font-bold mb-4">Unit Mastery</h2>
              <div className="space-y-4">
                {data.unitStats.map(u => (
                  <UnitMasteryItem key={u.unit} u={u} />
                ))}
              </div>
            </Card>
          )}

          {/* Mock exam history */}
          {data.mockExams.length > 0 && (
            <Card>
              <h2 className="text-xl font-heading font-bold mb-4">Mock Exam History</h2>
              <MockExamHistoryTable mockExams={data.mockExams} planTier={planTier} />
            </Card>
          )}
        </>
      ) : (
        /* ── BASIC ANALYTICS UPGRADE TEASER (Free) ──────────────────────── */
        <Card className="border-primary/20">
          <div className="flex flex-col sm:flex-row items-center gap-6 py-4">
            <div className="text-5xl">📊</div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-heading font-bold text-primary mb-1">Unlock Full Analytics</h3>
              <p className="text-sm text-neutral-mid mb-1">
                Exam Boost, Success Plan, and Elite Prep include your 7-day score trend, per-unit mastery breakdown, and full mock exam history.
              </p>
              <p className="text-xs text-neutral-mid">Test Yourself plan · Upgrade from KSh {dailyPrice}/day</p>
            </div>
            <Link href="/settings?tab=account" className="flex-shrink-0">
              <Button variant="primary">Upgrade →</Button>
            </Link>
          </div>
        </Card>
      )}

      {data.totalAnswered === 0 && (
        <Card className="text-center py-12">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-heading font-bold text-primary mb-2">No data yet</h3>
          <p className="text-neutral-mid">Start practicing to see your analytics here.</p>
        </Card>
      )}
    </div>
  );
}
