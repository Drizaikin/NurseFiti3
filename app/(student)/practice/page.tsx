"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
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

// Shape of what we persist in localStorage
interface SavedSession {
  questions: Question[];
  currentQuestionIndex: number;
  selectedUnit: string;
  session: PracticeSession;
  savedAt: number; // timestamp — sessions older than 24h are discarded
}

const STORAGE_KEY = 'nursefiti_practice_session';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function loadSavedSession(): SavedSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: SavedSession = JSON.parse(raw);
    // Discard sessions older than 24 hours
    if (Date.now() - parsed.savedAt > SESSION_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    // Must have at least one unanswered question remaining
    if (parsed.currentQuestionIndex >= parsed.questions.length) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveSession(data: SavedSession) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage may be unavailable (private browsing quota)
  }
}

function clearSavedSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export default function PracticePage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
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
  const [answeredToday, setAnsweredToday] = useState(0);

  // Resume prompt state
  const [savedSession, setSavedSession] = useState<SavedSession | null>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  useEffect(() => {
    fetchStudentProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      setUserId(user.id);

      const { data: profileRaw } = await supabase
        .from('student_profiles')
        .select('cadre, plan_tier, plan_expires_at')
        .eq('id', user.id)
        .maybeSingle();

      const profile = profileRaw as { cadre: string; plan_tier: string; plan_expires_at: string | null } | null;

      if (profile) {
        const tier = effectiveTier(profile.plan_tier, profile.plan_expires_at);
        setStudentCadre(profile.cadre);
        setPlanTier(tier);
        await Promise.all([
          fetchUnits(profile.cadre),
          fetchAnsweredToday(user.id),
        ]);

        // Check for a saved session after profile is loaded
        const saved = loadSavedSession();
        if (saved && saved.questions.length > 0) {
          setSavedSession(saved);
          setShowResumePrompt(true);
        }
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

  // Resume the saved session
  const handleResume = () => {
    if (!savedSession) return;
    setQuestions(savedSession.questions);
    setCurrentQuestionIndex(savedSession.currentQuestionIndex);
    setSelectedUnit(savedSession.selectedUnit);
    setSession(savedSession.session);
    setShowResumePrompt(false);
    setShowFilters(false);
  };

  // Discard saved session and go to filter screen
  const handleStartFresh = () => {
    clearSavedSession();
    setSavedSession(null);
    setShowResumePrompt(false);
  };

  const startPractice = async () => {
    const limits = getLimits(planTier);

    if (limits.practiceQuestionsPerDay !== Infinity && answeredToday >= limits.practiceQuestionsPerDay) {
      return;
    }

    setIsLoading(true);
    try {
      const remaining = limits.practiceQuestionsPerDay === Infinity
        ? 20
        : Math.min(20, limits.practiceQuestionsPerDay - answeredToday);

      // ── STEP 1: Get IDs of questions the student has already answered in this unit/cadre ──
      let answeredIdsQuery = (supabase as any)
        .from('student_answers')
        .select('question_id')
        .eq('student_id', userId!)
        .eq('mode', 'practice');

      if (selectedUnit !== 'all') {
        answeredIdsQuery = answeredIdsQuery.eq('unit', selectedUnit);
      }

      const { data: answeredData } = await answeredIdsQuery;
      const answeredIds = (answeredData as Array<{ question_id: string }> | null)?.map(a => a.question_id) || [];

      // ── STEP 2: Fetch questions, excluding already-answered ones ──
      let query = supabase
        .from('questions')
        .select('*')
        .eq('cadre', studentCadre)
        .eq('status', 'approved');

      if (selectedUnit !== 'all') {
        query = query.eq('unit', selectedUnit);
      }

      // Exclude answered question IDs
      if (answeredIds.length > 0) {
        query = query.not('id', 'in', `(${answeredIds.join(',')})`);
      }

      // Fetch double the remaining count to allow for shuffling, then slice
      const { data, error } = await query.limit(remaining * 2);

      if (error) { console.error('Error fetching questions:', error); return; }

      // ── STEP 3: If not enough unseen questions, reset cycle (fetch all) ──
      let finalQuestions = data || [];
      if (finalQuestions.length < remaining) {
        // All questions in this unit have been answered — reset the cycle
        let resetQuery = supabase
          .from('questions')
          .select('*')
          .eq('cadre', studentCadre)
          .eq('status', 'approved');

        if (selectedUnit !== 'all') {
          resetQuery = resetQuery.eq('unit', selectedUnit);
        }

        const { data: allData } = await resetQuery.limit(remaining * 2);
        finalQuestions = allData || [];
        
        if (finalQuestions.length === 0) {
          toast.error('No questions available for the selected filters. Try different filters.');
          setIsLoading(false);
          return;
        }

        // Notify student the cycle has restarted
        if (answeredIds.length > 0) {
          toast('🔄 You\'ve gone through all questions in this unit — starting the cycle again!', { duration: 4000 });
        }
      }

      const shuffled = [...finalQuestions].sort(() => Math.random() - 0.5).slice(0, remaining);
      const newSession: PracticeSession = { questionsAnswered: 0, correctAnswers: 0, xpEarned: 0 };

      setQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setShowFilters(false);
      setSession(newSession);

      // Persist the new session immediately
      saveSession({
        questions: shuffled,
        currentQuestionIndex: 0,
        selectedUnit,
        session: newSession,
        savedAt: Date.now(),
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (questionId: string, selectedOption: string, isCorrect: boolean, timeTaken: number) => {
    // Fix 4: use cached userId instead of calling getUser() on every answer
    if (!userId) return;

    try {
      // Resolve the unit for this question (for rotation tracking)
      const answeredQuestion = questions.find(q => q.id === questionId);
      const questionUnit = answeredQuestion?.unit ?? null;

      // Fix 1: destructure and check insert error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any).from('student_answers').insert({
        student_id: userId,
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
        time_taken_seconds: timeTaken,
        mode: 'practice',
        unit: questionUnit,   // denormalized for rotation queries
      });
      if (insertError) {
        console.error('Error saving answer:', insertError);
      }

      const xpGained = isCorrect ? 8 : 0;
      const updatedSession: PracticeSession = {
        questionsAnswered: session.questionsAnswered + 1,
        correctAnswers: session.correctAnswers + (isCorrect ? 1 : 0),
        xpEarned: session.xpEarned + xpGained,
      };
      setSession(updatedSession);
      setAnsweredToday(prev => prev + 1);

      // Persist progress after every answer — next question index is currentQuestionIndex + 1
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        saveSession({
          questions,
          currentQuestionIndex: nextIndex,
          selectedUnit,
          session: updatedSession,
          savedAt: Date.now(),
        });
      } else {
        // All questions answered — clear the saved session
        clearSavedSession();
      }

      // Use atomic SECURITY DEFINER RPC to handle XP, level, and streak
      const { error: xpErr } = await (supabase as any).rpc('update_student_xp', {
        p_student_id: userId,
        p_xp_delta: xpGained,
      });
      if (xpErr) console.error('XP/streak update failed:', xpErr.message ?? xpErr);
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleNextQuestion = () => {
    const limits = getLimits(planTier);
    const hitDailyLimit = limits.practiceQuestionsPerDay !== Infinity
      && answeredToday >= limits.practiceQuestionsPerDay;

    if (hitDailyLimit || currentQuestionIndex >= questions.length - 1) {
      clearSavedSession();
      setShowFilters(true);
      setQuestions([]);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEndSession = () => {
    // Session is already saved in localStorage — user can resume later
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

  // ── RESUME PROMPT ──────────────────────────────────────────────────────────
  if (showResumePrompt && savedSession) {
    const questionsLeft = savedSession.questions.length - savedSession.currentQuestionIndex;
    const unitLabel = savedSession.selectedUnit === 'all' ? 'All Units' : savedSession.selectedUnit;
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">Practice Questions</h1>
          <p className="text-neutral-mid">You have an unfinished session</p>
        </div>
        <Card className="border-primary/30 bg-primary/5 dark:bg-primary/10">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📖</div>
            <div className="flex-1">
              <h2 className="text-lg font-heading font-bold text-primary mb-1">Resume where you left off?</h2>
              <p className="text-sm text-neutral-mid mb-1">
                Unit: <span className="font-semibold text-[var(--color-text)]">{unitLabel}</span>
              </p>
              <p className="text-sm text-neutral-mid mb-4">
                <span className="font-semibold text-[var(--color-text)]">{questionsLeft}</span> question{questionsLeft !== 1 ? 's' : ''} remaining ·{' '}
                <span className="font-semibold text-success">{savedSession.session.correctAnswers}</span> correct so far
              </p>
              <div className="flex gap-3">
                <Button variant="primary" onClick={handleResume}>
                  Resume Session →
                </Button>
                <Button variant="outline" onClick={handleStartFresh}>
                  Start Fresh
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
                  : `Test Yourself: ${remaining} of ${dailyLimit} questions remaining today`}
              </p>
              {limitReached && (
                <p className="text-xs text-neutral-mid mt-0.5">
                  Resets at midnight · Upgrade for unlimited practice
                </p>
              )}
            </div>
            {limitReached && (
              <Link href="/settings?tab=account">
                <button className="flex-shrink-0 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-mid transition-colors">
                  Upgrade →
                </button>
              </Link>
            )}
          </div>
        )}

        {/* Session Summary (if just completed) */}
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
                    Test Yourself allows {dailyLimit} practice questions per day. Come back tomorrow or upgrade for unlimited access.
                  </p>
                </div>
                <Link href="/settings?tab=account">
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
        <Button variant="ghost" onClick={handleEndSession}>
          Pause &amp; Save
        </Button>
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
          <Link href="/settings?tab=account">
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
