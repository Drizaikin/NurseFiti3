"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { CountdownTimer } from '@/components/shared/CountdownTimer';

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
  'KRCHN-Paper1': { cadre: 'KRCHN', paper: 'Paper I',   totalMinutes: 120, totalQuestions: 100 },
  'KRCHN-Paper2': { cadre: 'KRCHN', paper: 'Paper II',  totalMinutes: 120, totalQuestions: 100 },
  'BScN-Paper1':  { cadre: 'BScN',  paper: 'Paper I',   totalMinutes: 120, totalQuestions: 100 },
  'BScN-Paper2':  { cadre: 'BScN',  paper: 'Paper II',  totalMinutes: 120, totalQuestions: 100 },
  'BScN-Paper3':  { cadre: 'BScN',  paper: 'Paper III', totalMinutes: 120, totalQuestions: 100 },
  'BScN-Paper4':  { cadre: 'BScN',  paper: 'Paper IV',  totalMinutes: 120, totalQuestions: 100 },
};

export default function MockExamPage() {
  const router = useRouter();
  const supabase = createClient();

  const [examState, setExamState] = useState<ExamState>('setup');
  const [studentCadre, setStudentCadre] = useState<string>('KRCHN');
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
  } | null>(null);
  const [showRationale, setShowRationale] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data: spData } = await supabase.from('student_profiles').select('cadre').eq('id', user.id).single();
      const sp = spData as { cadre: string } | null;
      if (sp?.cadre) {
        setStudentCadre(sp.cadre);
        setSelectedExam(`${sp.cadre}-Paper1`);
      }
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startExam = async () => {
    const config = EXAM_CONFIGS[selectedExam];
    if (!config) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('cadre', config.cadre)
      .eq('status', 'approved')
      .limit(config.totalQuestions);
    if (error || !data || data.length === 0) {
      alert('Not enough questions available for this exam. Please try again later.');
      setIsLoading(false);
      return;
    }
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, config.totalQuestions);
    setQuestions(shuffled);
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setIsSubmitting(false); return; }

    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) correct++;
    });
    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = score >= 50;
    const timeUsed = startedAt ? Math.round((Date.now() - startedAt.getTime()) / 60000) : 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('mock_exam_results') as any).insert({
      student_id: user.id,
      cadre: config.cadre,
      paper: config.paper,
      total_questions: total,
      correct_answers: correct,
      score_percentage: score,
      time_used_minutes: timeUsed,
      passed,
      started_at: startedAt?.toISOString() ?? new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: spData } = await (supabase as any).from('student_profiles').select('xp, level').eq('id', user.id).single();
    if (spData) {
      const newXP = (spData.xp ?? 0) + 100;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('student_profiles').update({ xp: newXP, level: Math.floor(newXP / 100) + 1 }).eq('id', user.id);
    }

    setResults({ score, correct, total, passed, timeUsed });
    setExamState('results');
    setIsSubmitting(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, selectedExam, questions, answers, startedAt]);

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
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Mock Exam</h1>
        <p className="text-neutral-mid mb-6">DigiProctor-style timed simulation — same format as the real NCK exam.</p>
        <Card>
          <h2 className="text-xl font-heading font-bold mb-4">Select Your Paper</h2>
          <div className="space-y-3 mb-6">
            {availableExams.map(([key, config]) => (
              <label key={key} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedExam === key ? 'border-primary bg-primary-light' : 'border-[var(--color-border)] hover:border-primary/40'}`}>
                <input type="radio" name="exam" value={key} checked={selectedExam === key} onChange={() => setSelectedExam(key)} className="sr-only" />
                <div className="flex-1">
                  <p className="font-semibold text-[var(--color-text)]">{config.cadre} — {config.paper}</p>
                  <p className="text-sm text-neutral-mid">{config.totalQuestions} questions · {config.totalMinutes} minutes</p>
                </div>
                {selectedExam === key && <span className="text-primary text-xl">✓</span>}
              </label>
            ))}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-sm text-neutral-mid space-y-1">
            <p className="font-semibold text-accent-dark dark:text-accent">⚠️ Exam Rules</p>
            <p>• No rationale shown during the exam — results only after submission</p>
            <p>• Timer is always visible and turns red under 20 minutes</p>
            <p>• You can flag questions for review and navigate freely</p>
            <p>• Exam auto-submits when the timer reaches zero</p>
          </div>
          <Button variant="primary" size="lg" className="w-full" onClick={startExam}>
            Start Exam →
          </Button>
        </Card>
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
                      <div className="mt-2 p-3 bg-primary-light dark:bg-primary/10 rounded-lg text-xs text-[var(--color-text)]">
                        {q.rationale}
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
          <Button variant="outline" className="flex-1" onClick={() => router.push('/analytics')}>View Analytics</Button>
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
        <div ref={gridRef} className="hidden lg:block w-56 bg-[#0F2020] border-l border-[#1E3535] p-4 overflow-y-auto">
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
