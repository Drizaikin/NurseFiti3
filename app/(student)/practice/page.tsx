"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { MCQCard } from '@/components/student/MCQCard';
import { getLimits, effectiveTier } from '@/lib/planLimits';

interface Question {
  id: string;
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  rationale: string;
  rationale_a?: string;
  rationale_b?: string;
  rationale_c?: string;
  rationale_d?: string;
  unit: string;
  topic: string;
  cadre: string;
  difficulty: string;
}

interface PracticeSession {
  questionsAnswered: number;
  correctAnswers: number;
  xpEarned: number;
}

export default function PracticePage() {
  const router = useRouter();
  const supabase = createClient();

  const [studentCadre, setStudentCadre] = useState<string>('');
  const [planTier, setPlanTier] = useState<string>('free');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [session, setSession] = useState<PracticeSession>({
    questionsAnswered: 0,
    correctAnswers: 0,
    xpEarned: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [units, setUnits] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  // How many questions the student has already answered today
  const [answeredToday, setAnsweredToday] = useState(0);

  useEffect(() => {
    fetchStudentProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data: profileRaw } = await supabase
        .from('student_profiles')
        .select('cadre, plan_tier, plan_expires_at')
        .eq('id', user.id)
        .single();

      const profile = profileRaw as { cadre: string; plan_tier: string; plan_expires_at: string | null } | null;

      if (profile) {
        const tier = effectiveTier(profile.plan_tier, profile.plan_expires_at);
        setStudentCadre(profile.cadre);
        setPlanTier(tier);
        await Promise.all([
          fetchUnits(profile.cadre),
          fetchAnsweredToday(user.id),
        ]);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnsweredToday = async (userId: string) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count } = await supabase
      .from('student_answers')
      .select('id', { count: 'exact', head: true })
      .eq('student_id', userId)
      .eq('mode', 'practice')
      .gte('answered_at', todayStart.toISOString());
    setAnsweredToday(count ?? 0);
  };

  const fetchUnits = async (cadre: string) => {
    try {
      const { data: unitsRaw } = await supabase
        .from('questions')
        .select('unit')
        .eq('cadre', cadre)
        .eq('status', 'approved');

      if (unitsRaw) {
        const uniqueUnits = Array.from(new Set((unitsRaw as Array<{ unit: string }>).map(q => q.unit))).sort();
        setUnits(uniqueUnits);
      }
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const startPractice = async () => {
    const limits = getLimits(planTier);

    // Enforce daily limit for free users
    if (limits.practiceQuestionsPerDay !== Infinity && answeredToday >= limits.practiceQuestionsPerDay) {
      return; // UI already shows the paywall — button is disabled
    }

    setIsLoading(true);
    try {
      // How many questions can we still serve today?
      const remaining = limits.practiceQuestionsPerDay === Infinity
        ? 20
        : Math.min(20, limits.practiceQuestionsPerDay - answeredToday);

      let query = supabase
        .from('questions')
        .select('*')
        .eq('cadre', studentCadre)
        .eq('status', 'approved');

      if (selectedUnit !== 'all') {
        query = query.eq('unit', selectedUnit);
      }

      const { data, error } = await query.limit(remaining);

      if (error) { console.error('Error fetching questions:', error); return; }

      if (!data || data.length === 0) {
        alert('No questions available for the selected filters. Try different filters.');
        return;
      }

      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setShowFilters(false);
      setSession({ questionsAnswered: 0, correctAnswers: 0, xpEarned: 0 });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (questionId: string, selectedOption: string, isCorrect: boolean, timeTaken: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('student_answers').insert({
        student_id: user.id,
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
        time_taken_seconds: timeTaken,
        mode: 'practice',
      });

      const xpGained = isCorrect ? 8 : 0;
      setSession(prev => ({
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        xpEarned: prev.xpEarned + xpGained,
      }));
      setAnsweredToday(prev => prev + 1);

      if (isCorrect) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: currentProfileRaw } = await (supabase as any)
          .from('student_profiles')
          .select('xp, level, last_study_date, streak_count')
          .eq('id', user.id)
          .single();

        const currentProfile = currentProfileRaw as {
          xp: number; level: number; last_study_date: string | null; streak_count: number;
        } | null;

        if (currentProfile) {
          const today = new Date().toISOString().split('T')[0];
          const lastStudyDate = currentProfile.last_study_date;
          let newStreak = currentProfile.streak_count;

          if (lastStudyDate) {
            const daysDiff = Math.floor(
              (new Date(today).getTime() - new Date(lastStudyDate).getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysDiff === 1) newStreak += 1;
            else if (daysDiff > 1) newStreak = 1;
          } else {
            newStreak = 1;
          }

          const newXP = currentProfile.xp + xpGained;
          const newLevel = Math.floor(newXP / 100) + 1;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from('student_profiles')
            .update({ xp: newXP, level: newLevel, streak_count: newStreak, last_study_date: today })
            .eq('id', user.id);
        }
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleNextQuestion = () => {
    const limits = getLimits(planTier);
    const hitDailyLimit = limits.practiceQuestionsPerDay !== Infinity
      && answeredToday >= limits.practiceQuestionsPerDay;

    if (hitDailyLimit || currentQuestionIndex >= questions.length - 1) {
      setShowFilters(true);
      setQuestions([]);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEndSession = () => {
    setShowFilters(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  const limits = getLimits(planTier);
  const isFree = planTier === 'free';
  const dailyLimit = limits.practiceQuestionsPerDay;
  const limitReached = dailyLimit !== Infinity && answeredToday >= dailyLimit;
  const remaining = dailyLimit === Infinity ? null : Math.max(0, dailyLimit - answeredToday);

  // ── FILTER / START SCREEN ──────────────────────────────────────────────────
  if (showFilters || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Practice Questions</h1>
          <p className="text-neutral-mid">Select your preferences and start practicing</p>
        </div>

        {/* Daily limit banner for free users */}
        {isFree && (
          <div className={`mb-4 rounded-xl px-4 py-3 flex items-center justify-between gap-4 border ${
            limitReached
              ? 'bg-error/10 border-error/30'
              : 'bg-primary-xlight dark:bg-primary/10 border-primary/20'
          }`}>
            <div>
              <p className={`text-sm font-semibold ${limitReached ? 'text-error' : 'text-primary'}`}>
                {limitReached
                  ? `Daily limit reached — ${dailyLimit} questions used today`
                  : `Free plan: ${remaining} of ${dailyLimit} questions remaining today`}
              </p>
              {limitReached && (
                <p className="text-xs text-neutral-mid mt-0.5">
                  Resets at midnight · Upgrade for unlimited practice
                </p>
              )}
            </div>
            {limitReached && (
              <Link href="/settings">
                <button className="flex-shrink-0 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-mid transition-colors">
                  Upgrade →
                </button>
              </Link>
            )}
          </div>
        )}

        {/* Session Summary (if completed) */}
        {session.questionsAnswered > 0 && (
          <Card className="mb-6 bg-primary/5 dark:bg-primary/10 border-primary/20">
            <h2 className="text-xl font-heading font-bold text-primary mb-4">Session Complete! 🎉</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{session.questionsAnswered}</p>
                <p className="text-sm text-neutral-mid">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{session.correctAnswers}</p>
                <p className="text-sm text-neutral-mid">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">+{session.xpEarned}</p>
                <p className="text-sm text-neutral-mid">XP Earned</p>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">Practice Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Your Cadre</label>
              <Badge variant="primary" size="lg">{studentCadre}</Badge>
            </div>
            <div>
              <label htmlFor="unit" className="block text-sm font-semibold mb-2">Select Unit</label>
              <select
                id="unit"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="input"
                disabled={limitReached}
              >
                <option value="all">All Units</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            {limitReached ? (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-error/5 border border-error/20 text-center">
                  <p className="text-sm font-semibold text-error mb-1">Daily limit reached</p>
                  <p className="text-xs text-neutral-mid">
                    Free plan allows {dailyLimit} practice questions per day. Come back tomorrow or upgrade for unlimited access.
                  </p>
                </div>
                <Link href="/settings">
                  <Button variant="primary" size="lg" className="w-full">
                    Upgrade for Unlimited Practice
                  </Button>
                </Link>
              </div>
            ) : (
              <Button variant="primary" size="lg" onClick={startPractice} className="w-full">
                {isFree && remaining !== null
                  ? `Start Practice (${remaining} questions left today)`
                  : 'Start Practice Session'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // ── ACTIVE SESSION ─────────────────────────────────────────────────────────
  const currentQuestion = questions[currentQuestionIndex];
  const hitLimit = dailyLimit !== Infinity && answeredToday >= dailyLimit;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary mb-1">Practice Session</h1>
          <p className="text-sm text-neutral-mid">
            Question {currentQuestionIndex + 1} of {questions.length}
            {isFree && dailyLimit !== Infinity && (
              <span className="ml-2 text-neutral-mid">· {Math.max(0, dailyLimit - answeredToday)} left today</span>
            )}
          </p>
        </div>
        <Button variant="ghost" onClick={handleEndSession}>End Session</Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-primary">{session.questionsAnswered}</p>
          <p className="text-xs text-neutral-mid">Answered</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-success">{session.correctAnswers}</p>
          <p className="text-xs text-neutral-mid">Correct</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-accent">+{session.xpEarned}</p>
          <p className="text-xs text-neutral-mid">XP</p>
        </Card>
      </div>

      <MCQCard
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
        showFeedback={true}
      />

      {/* Daily limit hit mid-session */}
      {hitLimit && (
        <div className="mt-4 p-4 rounded-xl bg-error/10 border border-error/30 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-error">
            You&apos;ve reached your {dailyLimit}-question daily limit.
          </p>
          <Link href="/settings">
            <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-mid transition-colors flex-shrink-0">
              Upgrade →
            </button>
          </Link>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button variant="primary" size="lg" onClick={handleNextQuestion}>
          {hitLimit || currentQuestionIndex >= questions.length - 1
            ? 'Finish Session'
            : 'Next Question →'}
        </Button>
      </div>
    </div>
  );
}
