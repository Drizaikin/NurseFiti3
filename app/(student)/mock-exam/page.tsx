"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { getLimits, effectiveTier, getWeekStart } from '@/lib/planLimits';
import { AskAI } from '@/components/student/AskAI';
import toast from 'react-hot-toast';
import { MockResult, MockExamHistoryTable } from '@/components/student/MockExamHistoryTable';

interface Question {
  id: string;
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  rationale: string;
  rationale_a?: string;
  rationale_b?: string;
  rationale_c?: string;
  rationale_d?: string;
  unit: string;
  topic: string;
  difficulty: string;
}

type ExamState = 'setup' | 'active' | 'results';

interface ExamConfig {
  cadre: string;
  paper: string;
  totalMinutes: number;
  totalQuestions: number;
}

const EXAM_CONFIGS: Record<string, ExamConfig> = {
  'KRCHN-Paper1': { cadre: 'KRCHN', paper: 'Paper I',  totalMinutes: 120, totalQuestions: 100 },
  'KRCHN-Paper2': { cadre: 'KRCHN', paper: 'Paper II', totalMinutes: 120, totalQuestions: 100 },
  'BScN-Paper1':  { cadre: 'BScN',  paper: 'Paper I',  totalMinutes: 120, totalQuestions: 100 },
  'BScN-Paper2':  { cadre: 'BScN',  paper: 'Paper II', totalMinutes: 120, totalQuestions: 100 },
};

export default function MockExamPage() {
  const router = useRouter();
  const supabase = createClient();

  const [examState, setExamState] = useState<ExamState>('setup');
  const [studentCadre, setStudentCadre] = useState<string>('KRCHN');
  const [planTier, setPlanTier] = useState<string>('free');
  const [examsThisWeek, setExamsThisWeek] = useState(0);
  // Free-tier upload unlock state
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>('KRCHN-Paper1');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [examEndTime, setExamEndTime] = useState<Date | null>(null);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [results, setResults] = useState<{
    score: number; correct: number; total: number; passed: boolean; timeUsed: number;
    resultId?: string;
  } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showRationale, setShowRationale] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedMocks, setDownloadedMocks] = useState<string[]>([]);
  const [mockExams, setMockExams] = useState<MockResult[]>([]);
  const [examProgress, setExamProgress] = useState<Record<string, { totalSets: number; completedSets: number; uniqueSeen: number; totalQuestions: number; isFetching: boolean }>>({});

  const handleDownloadResult = async () => {
    if (!results?.resultId) { toast.error('Result ID not available. Please retry.'); return; }
    setIsDownloading(true);
    try {
      const res = await fetch('/api/mock-exam/download-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultId: results.resultId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Download failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nursefiti-mock-exam-result.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Download started. Open the file in any browser to view or print.');
      try {
        const downloaded = JSON.parse(localStorage.getItem('downloaded_mocks') || '[]');
        if (!downloaded.includes(results.resultId)) {
          downloaded.push(results.resultId);
          localStorage.setItem('downloaded_mocks', JSON.stringify(downloaded));
          setDownloadedMocks(downloaded);
          window.dispatchEvent(new Event('mock_downloaded'));
        }
      } catch (e) {
        console.error('Error tracking download', e);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      const { data: spData } = await supabase
        .from('student_profiles')
        .select('cadre, plan_tier, plan_expires_at')
        .eq('id', user.id)
        .single();
      const sp = spData as { cadre: string; plan_tier: string; plan_expires_at: string | null } | null;

      if (sp?.cadre) {
        const tier = effectiveTier(sp.plan_tier, sp.plan_expires_at);
        setStudentCadre(sp.cadre);
        setPlanTier(tier);
        setSelectedExam(`${sp.cadre}-Paper1`);

        // Fetch all mock exams to show history and count this week
        const weekStart = getWeekStart();
        const { data: mocksData } = await supabase
          .from('mock_exam_results')
          .select('*')
          .eq('student_id', user.id)
          .order('completed_at', { ascending: false });
          
        const mocks = (mocksData ?? []) as MockResult[];
        setMockExams(mocks);
        
        const thisWeekCount = mocks.filter(m => new Date(m.completed_at) >= new Date(weekStart)).length;
        setExamsThisWeek(thisWeekCount);
      }
      try {
        setDownloadedMocks(JSON.parse(localStorage.getItem('downloaded_mocks') || '[]'));
      } catch (e) {}
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userId || !studentCadre) return;
      const examsToFetch = Object.entries(EXAM_CONFIGS).filter(([_, config]) => config.cadre === studentCadre);
      if (examsToFetch.length === 0) return;

      const newProgress: Record<string, any> = {};
      
      setExamProgress(prev => {
        const next = { ...prev };
        for (const [key] of examsToFetch) {
          next[key] = { ...(prev[key] || { totalSets: 0, completedSets: 0, uniqueSeen: 0, totalQuestions: 0 }), isFetching: true };
        }
        return next;
      });

      for (const [key, config] of examsToFetch) {
        const { count: totalQ } = await supabase.from('questions')
          .select('id', { count: 'exact', head: true })
          .eq('cadre', config.cadre).eq('paper', config.paper).eq('status', 'approved');

        const { data: seenData } = await supabase.from('student_answers')
          .select('question_id')
          .eq('student_id', userId)
          .eq('mode', 'mock_exam')
          .eq('paper', config.paper);

        const uniqueSeen = new Set((seenData as Array<{ question_id: string }> | null)?.map(d => d.question_id) ?? []).size;
        const total = totalQ ?? 0;
        const setSize = config.totalQuestions;

        newProgress[key] = {
          totalSets: Math.floor(total / setSize),
          completedSets: Math.floor(uniqueSeen / setSize),
          uniqueSeen,
          totalQuestions: total,
          isFetching: false
        };
      }
      setExamProgress(prev => ({ ...prev, ...newProgress }));
    };

    fetchProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, studentCadre]);

  const startExam = async () => {
    const config = EXAM_CONFIGS[selectedExam];
    if (!config) return;
    setIsLoading(true);

    // ── Server-side limit re-check — never trust the cached examsThisWeek state ──
    // Re-query the DB right before starting so a user can't bypass the gate
    // by manipulating React state or navigating directly to startExam.
    const limits = getLimits(planTier);
    const weeklyLimit = limits.mockExamsPerWeek;
    const isFreeCheck = planTier === 'free';

    if (isFreeCheck) {
      // Free users are always blocked here — shouldn't reach startExam anyway
      toast.error('Mock exams require a paid plan.');
      setIsLoading(false);
      return;
    }

    if (weeklyLimit !== Infinity) {
      const weekStart = getWeekStart();
      const { count: liveCount } = await supabase
        .from('mock_exam_results')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', userId!)
        .gte('completed_at', weekStart);
      const liveExamsThisWeek = liveCount ?? 0;
      // Keep local state in sync with the authoritative DB count
      setExamsThisWeek(liveExamsThisWeek);
      if (liveExamsThisWeek >= weeklyLimit) {
        toast.error(`Weekly limit reached — you've used all ${weeklyLimit} mock exam${weeklyLimit !== 1 ? 's' : ''} this week.`);
        setIsLoading(false);
        return;
      }
    }

    // ── STEP 1: Get question IDs the student has already seen in mock exams for this paper ──
    const { data: seenData } = await (supabase as any)
      .from('student_answers')
      .select('question_id')
      .eq('student_id', userId!)
      .eq('mode', 'mock_exam')
      .eq('paper', config.paper);

    const seenIds = (seenData as Array<{ question_id: string }> | null)?.map(a => a.question_id) ?? [];

    // ── STEP 2: Fetch ONLY IDs and units for ALL approved questions for this cadre + paper ──
    const { data: allQuestionsRaw, error } = await (supabase as any)
      .from('questions')
      .select('id, unit')
      .eq('cadre', config.cadre)
      .eq('paper', config.paper)
      .eq('status', 'approved');
    const allQuestionsMeta = allQuestionsRaw as Array<{ id: string, unit: string | null }> | null;

    if (error || !allQuestionsMeta || allQuestionsMeta.length === 0) {
      toast.error('Not enough questions available for this exam. Please try again later.');
      setIsLoading(false);
      return;
    }

    // ── STEP 3: Prefer unseen questions; if not enough, reset cycle ──
    let unseenPool = allQuestionsMeta.filter(q => !seenIds.includes(q.id));
    let cycleReset = false;

    if (unseenPool.length < config.totalQuestions) {
      // Cycle complete — use the full question bank again
      unseenPool = allQuestionsMeta;
      cycleReset = true;
    }

    // ── STEP 4: NCK-style unit distribution — interleave questions across units ──
    // Group unseen questions by unit
    const byUnit: Record<string, typeof unseenPool> = {};
    for (const q of unseenPool) {
      const u = q.unit ?? 'Other';
      if (!byUnit[u]) byUnit[u] = [];
      byUnit[u].push(q);
    }

    // Shuffle within each unit
    for (const unit of Object.keys(byUnit)) {
      byUnit[unit] = byUnit[unit].sort(() => Math.random() - 0.5);
    }

    // Safe round-robin interleave: cycle through units picking one question at a time
    // This guarantees no NaN indices and distributes units evenly
    const unitNames = Object.keys(byUnit);
    const unitPointers: Record<string, number> = {};
    for (const u of unitNames) unitPointers[u] = 0;

    const totalNeeded = Math.min(config.totalQuestions, unseenPool.length);
    const interleaved: typeof unseenPool = [];

    // Sort units by question count desc so larger units fill more slots proportionally
    const sortedUnitNames = [...unitNames].sort((a, b) => byUnit[b].length - byUnit[a].length);

    let round = 0;
    while (interleaved.length < totalNeeded) {
      let addedThisRound = 0;
      for (const u of sortedUnitNames) {
        if (interleaved.length >= totalNeeded) break;
        const ptr = unitPointers[u];
        if (ptr < byUnit[u].length) {
          interleaved.push(byUnit[u][ptr]);
          unitPointers[u]++;
          addedThisRound++;
        }
      }
      // If no unit had any questions left, break to avoid infinite loop
      if (addedThisRound === 0) break;
      round++;
    }

    const finalQuestionsMeta = interleaved.slice(0, config.totalQuestions);

    if (finalQuestionsMeta.length === 0) {
      toast.error('Not enough questions available for this exam. Please try again later.');
      setIsLoading(false);
      return;
    }

    // ── STEP 5: Fetch FULL payloads ONLY for the interleaved final set ──
    const finalQuestionIds = finalQuestionsMeta.map(q => q.id);
    const { data: finalQuestionsData, error: finalError } = await (supabase as any)
      .from('questions')
      .select('*')
      .in('id', finalQuestionIds);

    if (finalError || !finalQuestionsData) {
      toast.error('Failed to load final questions. Please try again later.');
      setIsLoading(false);
      return;
    }

    // Preserve the carefully interleaved order
    const questionsMap = new Map(finalQuestionsData.map((q: any) => [q.id, q]));
    const finalQuestions = finalQuestionsMeta.map(q => questionsMap.get(q.id)).filter(Boolean);

    if (cycleReset) {
      toast('🔄 You\'ve completed a full exam cycle — questions are now repeating from the full bank.', { duration: 4000 });
    }

    setQuestions(finalQuestions as Question[]);
    setAnswers({});
    setFlagged(new Set());
    setCurrentIndex(0);
    setShowRationale(null);
    const now = new Date();
    setStartedAt(now);
    setExamEndTime(new Date(now.getTime() + config.totalMinutes * 60 * 1000));
    setExamState('active');
    setIsLoading(false);
  };

  const submitExam = useCallback(async (autoSubmit = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowConfirm(false);
    const config = EXAM_CONFIGS[selectedExam];

    // ── 1. Calculate results immediately from local state ──────────────────
    // Do this FIRST so we can show results even if DB writes fail/timeout
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) correct++;
    });
    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = score >= 50;
    const timeUsed = startedAt ? Math.round((Date.now() - startedAt.getTime()) / 60000) : 0;

    // ── 2. Show results immediately — don't wait for DB ────────────────────
    // The user can see their score while DB writes happen in the background.
    // resultId will be filled in once the DB write completes.
    setResults({ score, correct, total, passed, timeUsed, resultId: undefined });
    setExamState('results');
    setIsSubmitting(false);

    // ── 3. Save the full exam state to localStorage as backup ──────────────
    // If the DB writes fail, the user can at least see their answers in the
    // current session. On next page load this won't recover (by design —
    // we only recover during the active session).
    const examBackup = {
      questions,
      answers,
      score,
      correct,
      total,
      passed,
      timeUsed,
      cadre: config.cadre,
      paper: config.paper,
      savedAt: Date.now(),
    };
    try {
      localStorage.setItem('nursefiti_last_exam', JSON.stringify(examBackup));
    } catch { /* ignore quota errors */ }

    // ── 4. DB writes happen in background — don't block the UI ────────────
    if (!userId) return;

    try {
      const answerRecords = questions.map(q => ({
        student_id: userId,
        question_id: q.id,
        selected_option: answers[q.id] ?? 'A',
        is_correct: answers[q.id] === q.correct_option,
        time_taken_seconds: null,
        mode: 'mock_exam' as const,
        unit: q.unit,
        paper: config.paper,
        answered_at: new Date().toISOString(),
      }));

      // Insert answers with a 20-second timeout — don't let it hang forever
      const answersPromise = (supabase.from('student_answers') as any).insert(answerRecords);
      const answersTimeout = new Promise<{ error: any }>(resolve =>
        setTimeout(() => resolve({ error: new Error('timeout') }), 20000)
      );
      const { error: answersError } = await Promise.race([answersPromise, answersTimeout]);
      if (answersError) {
        console.error('student_answers insert error:', answersError.message ?? answersError);
      }

      // Insert the result row
      const resultPromise = (supabase.from('mock_exam_results') as any).insert({
        student_id: userId,
        cadre: config.cadre,
        paper: config.paper,
        total_questions: total,
        correct_answers: correct,
        score_percentage: score,
        time_used_minutes: timeUsed,
        passed,
        started_at: startedAt?.toISOString() ?? new Date().toISOString(),
        completed_at: new Date().toISOString(),
      }).select('id').single();
      const resultTimeout = new Promise<{ error: any; data: any }>(resolve =>
        setTimeout(() => resolve({ error: new Error('timeout'), data: null }), 20000)
      );
      const { error: insertError, data: insertedResult } = await Promise.race([resultPromise, resultTimeout]);

      if (insertError) {
        console.error('mock_exam_results insert error:', insertError.message ?? insertError);
        toast('Results saved locally. Score shown above.', { icon: 'ℹ️', duration: 5000 });
      } else if (insertedResult) {
        const newResultId = (insertedResult as any).id as string;
        // Update resultId so Download button works
        setResults(prev => prev ? { ...prev, resultId: newResultId } : prev);
        // Clear backup now that DB has it
        try { localStorage.removeItem('nursefiti_last_exam'); } catch { /* ignore */ }

        // Back-link all answer records to this result for reliable history retrieval.
        // We match the answers we just inserted (same student, mock_exam mode, same paper,
        // within the last 2 minutes) and stamp them with the result_id.
        const linkWindowStart = new Date(Date.now() - 2 * 60 * 1000).toISOString();
        (supabase as any)
          .from('student_answers')
          .update({ result_id: newResultId })
          .eq('student_id', userId)
          .eq('mode', 'mock_exam')
          .eq('paper', config.paper)
          .gte('answered_at', linkWindowStart)
          .is('result_id', null)
          .then(({ error: linkErr }: any) => {
            if (linkErr) console.error('Failed to link answers to result:', linkErr.message);
          });
      }

      // ── Increment the weekly counter immediately so the gate is correct
      // when the user clicks "Take Another Exam" without refreshing the page.
      // This prevents the stale-state bug where examsThisWeek stays at the old
      // value and the limit check passes for a 3rd exam on a 2/week plan.
      setExamsThisWeek(prev => prev + 1);

      // Update XP and streak via SECURITY DEFINER RPC — atomic, no RLS issues
      const { error: xpErr } = await (supabase as any).rpc('update_student_xp', {
        p_student_id: userId,
        p_xp_delta: 100,
      });
      if (xpErr) console.error('XP/streak update failed:', xpErr.message ?? xpErr);

    } catch (err: any) {
      console.error('submitExam background error:', err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, selectedExam, questions, answers, startedAt, userId]);

  const toggleFlag = (id: string) => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // ── SETUP ──────────────────────────────────────────────────────────────────
  if (examState === 'setup') {
    const availableExams = Object.entries(EXAM_CONFIGS).filter(([, c]) => c.cadre === studentCadre);
    const limits = getLimits(planTier);
    const weeklyLimit = limits.mockExamsPerWeek;
    const isFree = planTier === 'free';
    // Free users are fully blocked unless they have an approved upload (handled server-side by plan upgrade)
    const limitReached = isFree || (weeklyLimit !== Infinity && examsThisWeek >= weeklyLimit);

    // ── File upload handler for free users ──────────────────────────────────
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? []);
      const allowed = selected.filter(f => {
        const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
        return ['pdf', 'txt', 'doc', 'docx'].includes(ext);
      });
      if (allowed.length < selected.length) {
        toast.error('Only PDF, TXT, DOC, and DOCX files are accepted.');
      }
      setUploadFiles(allowed);
    };

    const handleUploadSubmit = async () => {
      if (uploadFiles.length < 3) {
        toast.error('Please select at least 3 question files.');
        return;
      }
      setIsUploading(true);
      try {
        const fd = new FormData();
        uploadFiles.forEach(f => fd.append('files', f));
        const res = await fetch('/api/question-upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Upload failed');
        setUploadDone(true);
        toast.success('Files submitted! We will review and upgrade your account within 24 hours.');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Mock Exam</h1>
        <p className="text-neutral-mid mb-6">DigiProctor-style timed simulation — same format as the real NCK exam.</p>

        {/* Weekly limit banner — paid plans with a cap */}
        {!isFree && weeklyLimit !== Infinity && (
          <div className={`mb-4 rounded-xl px-4 py-3 flex items-center justify-between gap-4 border ${
            limitReached ? 'bg-error/10 border-error/30' : 'bg-primary-xlight dark:bg-primary/10 border-primary/20'
          }`}>
            <div>
              <p className={`text-sm font-semibold ${limitReached ? 'text-error' : 'text-primary'}`}>
                {limitReached
                  ? `Weekly limit reached — ${weeklyLimit} mock exam${weeklyLimit !== 1 ? 's' : ''} used this week`
                  : `${planTier.charAt(0).toUpperCase() + planTier.slice(1)} plan: ${weeklyLimit - examsThisWeek} of ${weeklyLimit} mock exam${weeklyLimit !== 1 ? 's' : ''} remaining this week`}
              </p>
              {limitReached && (
                <p className="text-xs text-neutral-mid mt-0.5">Resets every Monday · Upgrade to Elite Prep for unlimited mock exams</p>
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

        {/* Free-tier block */}
        {isFree && !showUploadPanel && !uploadDone && (
          <div className="mb-4 rounded-xl px-4 py-4 border bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <p className="text-sm font-semibold text-accent-dark dark:text-accent mb-1">🔒 Mock Exams — Paid Feature</p>
            <p className="text-xs text-neutral-mid mb-3">
              Mock exams require a paid plan. You can unlock access by uploading at least 3 past exam question files (PDF, TXT, DOC, or DOCX) for review — or upgrade directly.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowUploadPanel(true)}
                className="px-4 py-2 rounded-lg bg-accent text-dark text-xs font-bold hover:bg-accent/80 transition-colors"
              >
                Upload Questions to Unlock →
              </button>
              <Link href="/settings?tab=account">
                <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-mid transition-colors">
                  Upgrade Plan →
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Upload panel for free users */}
        {isFree && showUploadPanel && !uploadDone && (
          <Card className="mb-4 border-accent/30">
            <h2 className="text-lg font-heading font-bold mb-1">Upload Exam Questions</h2>
            <p className="text-sm text-neutral-mid mb-4">
              Upload at least <strong>3 files</strong> containing past exam questions (PDF, TXT, DOC, or DOCX, max 10 MB each).
              We will verify they are not already in our database and upgrade your account to Exam Boost Daily within 24 hours.
            </p>
            <div className="space-y-3">
              <label className="block">
                <span className="text-sm font-semibold text-[var(--color-text)] mb-1.5 block">Select files (min. 3)</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-neutral-mid file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-mid cursor-pointer"
                />
              </label>
              {uploadFiles.length > 0 && (
                <div className="text-xs text-neutral-mid space-y-0.5">
                  {uploadFiles.map((f, i) => (
                    <p key={i}>✓ {f.name} ({(f.size / 1024).toFixed(0)} KB)</p>
                  ))}
                  {uploadFiles.length < 3 && (
                    <p className="text-error font-semibold mt-1">⚠ Need at least 3 files ({3 - uploadFiles.length} more)</p>
                  )}
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="primary"
                  onClick={handleUploadSubmit}
                  disabled={isUploading || uploadFiles.length < 3}
                >
                  {isUploading ? <><Spinner size="sm" color="white" />&nbsp;Uploading…</> : 'Submit Files'}
                </Button>
                <Button variant="ghost" onClick={() => setShowUploadPanel(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Upload success state */}
        {isFree && uploadDone && (
          <div className="mb-4 rounded-xl px-4 py-4 border bg-success/10 border-success/30">
            <p className="text-sm font-semibold text-success mb-1">✅ Files submitted successfully</p>
            <p className="text-xs text-neutral-mid">
              Your files are under review. We will upgrade your account to Exam Boost Daily within 24 hours.
              Check back soon or contact support if you have not heard back.
            </p>
          </div>
        )}

        <Card>
          <h2 className="text-xl font-heading font-bold mb-4">Select Your Paper</h2>
          <div className="space-y-3 mb-6">
            {availableExams.map(([key, config]) => {
              const progress = examProgress[key];
              return (
              <label key={key} className={`flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedExam === key ? 'border-primary bg-primary-light' : 'border-[var(--color-border)] hover:border-primary/40'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="exam" value={key} checked={selectedExam === key} onChange={() => setSelectedExam(key)} className="sr-only" />
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--color-text)]">{config.cadre} — {config.paper}</p>
                    <p className="text-sm text-neutral-mid">{config.totalQuestions} questions · {config.totalMinutes} minutes</p>
                  </div>
                  {selectedExam === key && <span className="text-primary text-xl">✓</span>}
                </div>
                {progress && !progress.isFetching && progress.totalSets > 0 && (
                  <div className="mt-1 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs text-neutral-mid">
                      <span>Unique Mock Sets Completed:</span>
                      <span className="font-bold text-primary">{progress.completedSets} of {progress.totalSets}</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-light/50 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${Math.min(100, (progress.completedSets / progress.totalSets) * 100)}%` }} />
                    </div>
                    {progress.completedSets >= progress.totalSets && (
                      <p className="text-[10px] text-accent-dark dark:text-accent font-medium leading-tight mt-0.5">
                        All unique sets completed. Taking this exam again will reset your cycle and shuffle from all available questions.
                      </p>
                    )}
                  </div>
                )}
              </label>
            )})}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-sm text-neutral-mid space-y-1">
            <p className="font-semibold text-accent-dark dark:text-accent">⚠️ Exam Rules</p>
            <p>• No rationale shown during the exam — results only after submission</p>
            <p>• Timer is always visible and turns red under 20 minutes</p>
            <p>• You can flag questions for review and navigate freely</p>
            <p>• Exam auto-submits when the timer reaches zero</p>
          </div>
          {limitReached ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-error/5 border border-error/20 text-center">
                {isFree ? (
                  <>
                    <p className="text-sm font-semibold text-error mb-1">Test Yourself — mock exams locked</p>
                    <p className="text-xs text-neutral-mid">Upload past exam questions above to unlock, or upgrade to a paid plan.</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-error mb-1">Weekly limit reached ({weeklyLimit} exams/week)</p>
                    <p className="text-xs text-neutral-mid">Resets every Monday. Upgrade to Elite Prep for unlimited mock exams.</p>
                  </>
                )}
              </div>
              {!isFree && (
                <Link href="/settings?tab=account">
                  <Button variant="primary" size="lg" className="w-full">Upgrade to Elite Prep — Unlimited Mock Exams</Button>
                </Link>
              )}
            </div>
          ) : (
            <Button variant="primary" size="lg" className="w-full" onClick={startExam}>
              Start Exam →
            </Button>
          )}
        </Card>

        {mockExams.length > 0 && (
          <Card className="mt-6">
            <h2 className="text-xl font-heading font-bold mb-4">Past Mock Exams</h2>
            <MockExamHistoryTable mockExams={mockExams} planTier={planTier} />
          </Card>
        )}
      </div>
    );
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if (examState === 'results' && results) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`rounded-2xl p-8 text-center ${results.passed ? 'bg-success/10 border-2 border-success' : 'bg-error/10 border-2 border-error'}`}>
          <div className="text-6xl mb-3">{results.passed ? '🎉' : '📚'}</div>
          <h1 className="text-4xl font-heading font-bold mb-2" style={{ color: results.passed ? '#1A9E75' : '#E84545' }}>
            {results.passed ? 'Passed!' : 'Keep Studying'}
          </h1>
          <p className="text-neutral-mid mb-4">{EXAM_CONFIGS[selectedExam]?.cadre} — {EXAM_CONFIGS[selectedExam]?.paper}</p>
          <div className="text-7xl font-heading font-bold" style={{ color: results.passed ? '#1A9E75' : '#E84545' }}>
            {results.score}%
          </div>
          <p className="text-neutral-mid mt-2">{results.correct} / {results.total} correct · {results.timeUsed} min used · +100 XP</p>
        </div>

        {/* Question review */}
        <Card>
          <h2 className="text-xl font-heading font-bold mb-4">Question Review</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {questions.map((q, i) => {
              const selected = answers[q.id];
              const isCorrect = selected === q.correct_option;
              return (
                <div key={q.id} className={`p-4 rounded-xl border-2 ${isCorrect ? 'border-success/40 bg-success/5' : 'border-error/40 bg-error/5'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isCorrect ? 'bg-success text-white' : 'bg-error text-white'}`}>{i + 1}</span>
                    <p className="text-sm font-medium text-[var(--color-text)]">{q.stem}</p>
                  </div>
                  <div className="ml-10 space-y-1 text-sm">
                    {(['A','B','C','D'] as const).map(opt => {
                      const text = q[`option_${opt.toLowerCase()}` as keyof Question] as string;
                      const isSelected = selected === opt;
                      const isAnswer = q.correct_option === opt;
                      return (
                        <div key={opt} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isAnswer ? 'bg-success/20 text-success font-semibold' : isSelected && !isAnswer ? 'bg-error/20 text-error' : 'text-neutral-mid'}`}>
                          <span className="font-bold w-5">{opt}.</span>
                          <span>{text}</span>
                          {isAnswer && <span className="ml-auto">✓</span>}
                          {isSelected && !isAnswer && <span className="ml-auto">✗</span>}
                        </div>
                      );
                    })}
                    <button onClick={() => setShowRationale(showRationale === q.id ? null : q.id)} className="text-xs text-primary hover:underline mt-1">
                      {showRationale === q.id ? 'Hide' : 'Show'} explanation
                    </button>
                    {showRationale === q.id && (
                      <div className="mt-2 space-y-3">
                        <div className="p-3 bg-primary-light dark:bg-primary/10 rounded-lg text-xs text-[var(--color-text)]">
                          {q.rationale}
                        </div>
                        <AskAI question={q} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="primary" className="flex-1" onClick={() => setExamState('setup')}>Take Another Exam</Button>
          <Button variant="ghost" className="flex-1 border border-[#1E3535] text-white" onClick={() => router.push('/analytics')}>View Analytics</Button>
          {(() => {
            const limits = getLimits(planTier);
            const isDownloaded = results.resultId && downloadedMocks.includes(results.resultId);
            const canDownloadNew = downloadedMocks.length < limits.mockExamDownloads;
            const showDownload = limits.mockExamDownloads > 0 && results.resultId && (limits.mockExamDownloads === Infinity || isDownloaded || canDownloadNew);

            return showDownload ? (
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDownloadResult}
                disabled={isDownloading}
              >
                {isDownloading ? <><Spinner size="sm" />&nbsp;Preparing…</> : '⬇ Download Results'}
              </Button>
            ) : null;
          })()}
        </div>
      </div>
    );
  }

  // ── ACTIVE EXAM ────────────────────────────────────────────────────────────
  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const config = EXAM_CONFIGS[selectedExam];

  return (
    <div className="min-h-screen bg-[#0A1A1A] text-white flex flex-col" onContextMenu={e => e.preventDefault()}>
      {/* Exam topbar */}
      <div className="sticky top-0 z-20 bg-[#0F2020] border-b border-[#1E3535] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-light">{config?.cadre} — {config?.paper}</p>
          <p className="text-sm font-semibold">Q {currentIndex + 1} / {questions.length}</p>
        </div>
        <div className="text-center">
          {examEndTime && (
            <CountdownTimer targetDate={examEndTime} variant="exam" onExpire={() => submitExam(true)}
              className="text-2xl font-heading font-bold" />
          )}
          <p className="text-xs text-neutral-light mt-0.5">Time Remaining</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-light">{answeredCount}/{questions.length} answered</span>
          <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>Submit</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question panel */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{currentQ.unit}</Badge>
              <button onClick={() => toggleFlag(currentQ.id)} className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${flagged.has(currentQ.id) ? 'bg-accent text-dark' : 'bg-[#1E3535] text-neutral-light hover:bg-[#2A4545]'}`}>
                🚩 {flagged.has(currentQ.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>
            <p className="text-lg font-medium leading-relaxed mb-6 text-white">{currentQ.stem}</p>
            <div className="space-y-3">
              {(['A','B','C','D'] as const).map(opt => {
                const text = currentQ[`option_${opt.toLowerCase()}` as keyof Question] as string;
                const isSelected = answers[currentQ.id] === opt;
                return (
                  <button key={opt} onClick={() => setAnswers(prev => ({ ...prev, [currentQ.id]: opt }))}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${isSelected ? 'border-accent bg-accent/10' : 'border-[#1E3535] bg-[#0F2020] hover:border-[#2A4545]'}`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm ${isSelected ? 'bg-accent text-dark' : 'bg-[#1E3535] text-neutral-light'}`}>{opt}</span>
                    <span className="pt-1 text-sm text-white">{text}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="text-white border border-[#1E3535] hover:bg-[#1E3535]">← Prev</Button>
              <Button variant="ghost" onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))} disabled={currentIndex === questions.length - 1} className="ml-auto text-white border border-[#1E3535] hover:bg-[#1E3535]">Next →</Button>
            </div>
          </div>
        </div>

        {/* Question grid sidebar */}
        <div className="hidden lg:block w-56 bg-[#0F2020] border-l border-[#1E3535] p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-neutral-light mb-3 uppercase tracking-wider">Navigator</p>
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q, i) => {
              const isAnswered = !!answers[q.id];
              const isFlagged = flagged.has(q.id);
              const isCurrent = i === currentIndex;
              return (
                <button key={q.id} onClick={() => setCurrentIndex(i)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${isCurrent ? 'ring-2 ring-accent' : ''} ${isFlagged ? 'bg-accent text-dark' : isAnswered ? 'bg-success/70 text-white' : 'bg-[#1E3535] text-neutral-light hover:bg-[#2A4545]'}`}>
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-1.5 text-xs text-neutral-light">
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-success/70 inline-block" /> Answered</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-accent inline-block" /> Flagged</div>
            <div className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-[#1E3535] inline-block" /> Unanswered</div>
          </div>
        </div>
      </div>

      {/* Confirm submit modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#0F2020] border border-[#1E3535] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-heading font-bold mb-2">Submit Exam?</h3>
            <p className="text-neutral-light text-sm mb-4">
              You have answered {answeredCount} of {questions.length} questions.
              {answeredCount < questions.length && ` ${questions.length - answeredCount} questions are unanswered.`}
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1 border border-[#1E3535] text-white" onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={() => submitExam(false)} disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" color="white" /> : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
