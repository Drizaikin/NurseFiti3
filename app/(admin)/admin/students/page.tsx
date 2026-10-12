"use client";

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import { effectiveTier } from '@/lib/planLimits';

interface Student {
  id: string;
  full_name: string;
  email: string;
  cadre: string;
  exam_date: string | null;
  exam_cycle: string | null;
  plan_tier: string;
  plan_expires_at: string | null;
  created_at: string;
  is_locked: boolean;
}

interface ExpiredActiveStudent {
  id: string;
  full_name: string;
  email: string;
  exam_date: string;
  exam_cycle: string | null;
  last_login_at: string;
}

const TIER_BADGE: Record<string, 'amber' | 'teal' | 'secondary'> = {
  premium:  'amber',
  standard: 'teal',
  weekly:   'teal',
  daily:    'teal',
  free:     'secondary',
};

const PLAN_OPTIONS = [
  { tier: 'standard', label: 'Success Plan (30 days)',     days: 30 },
  { tier: 'premium',  label: 'Elite Prep (90 days)',       days: 90 },
  { tier: 'weekly',   label: 'Exam Boost Weekly (7 days)', days: 7  },
  { tier: 'daily',    label: 'Exam Boost Daily (1 day)',   days: 1  },
  { tier: 'free',     label: 'Test Yourself (no expiry)',  days: 0  },
];

const EXAM_CYCLES = ['May', 'August', 'November'] as const;
type ExamCycle = typeof EXAM_CYCLES[number];

type ConfirmAction =
  | { type: 'lock';   student: Student }
  | { type: 'unlock'; student: Student }
  | { type: 'delete'; student: Student };

/** Suggest the most likely NCK exam cycle from a date */
function inferCycle(dateStr: string): ExamCycle {
  const month = new Date(dateStr).getUTCMonth(); // 0-indexed
  if (month >= 3 && month <= 5) return 'May';
  if (month >= 6 && month <= 8) return 'August';
  return 'November';
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  // Plan modal
  const [planModal, setPlanModal] = useState<Student | null>(null);
  const [selectedTier, setSelectedTier] = useState('standard');
  const [selectedDays, setSelectedDays] = useState(30);

  // Exam date edit modal
  const [examModal, setExamModal] = useState<Student | null>(null);
  const [examDateInput, setExamDateInput] = useState('');
  const [examCycleInput, setExamCycleInput] = useState<ExamCycle>('May');
  const [examDateError, setExamDateError] = useState('');

  // Confirm modal for lock / delete
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  // Expired-exam-active section
  const [expiredActive, setExpiredActive] = useState<ExpiredActiveStudent[]>([]);
  const [expiredLoading, setExpiredLoading] = useState(false);
  const [expiredError, setExpiredError] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [expiredFetched, setExpiredFetched] = useState(false);

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/data?type=students');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setStudents(data.students ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = students.filter(s => {
    const matchesSearch =
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (planFilter === 'all') return true;
    return effectiveTier(s.plan_tier, s.plan_expires_at) === planFilter;
  });

  const examTimestamp = (examDate: string | null) => {
    if (!examDate) return null;
    const ts = new Date(examDate).getTime();
    return Number.isFinite(ts) ? ts : null;
  };

  const examSummary = students.reduce((acc, s) => {
    const ts = examTimestamp(s.exam_date);
    if (ts === null) acc.unscheduled += 1;
    else if (ts <= now) acc.datePassed += 1;
    else acc.upcoming += 1;
    return acc;
  }, { upcoming: 0, datePassed: 0, unscheduled: 0 });

  const examStatus = (examDate: string | null) => {
    const ts = examTimestamp(examDate);
    if (ts === null) return { label: 'No exam date', variant: 'secondary' as const };
    return ts <= now
      ? { label: 'Exam date passed', variant: 'amber' as const }
      : { label: 'Upcoming', variant: 'teal' as const };
  };

  const examCountdown = (examDate: string | null) => {
    const ts = examTimestamp(examDate);
    if (ts === null) return '—';
    const diff = ts - now;
    if (diff <= 0) return 'Exam date passed';
    const total = Math.floor(diff / 1000);
    const d = Math.floor(total / 86_400);
    const h = Math.floor((total % 86_400) / 3_600);
    const m = Math.floor((total % 3_600) / 60);
    const sec = total % 60;
    return `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(sec).padStart(2, '00')}s`;
  };

  // ── Plan modal ──────────────────────────────────────────────────────────

  const openPlanModal = (student: Student) => {
    setPlanModal(student);
    setSelectedTier('standard');
    setSelectedDays(30);
  };

  const handleSetPlan = async () => {
    if (!planModal) return;
    setActionLoading(planModal.id);
    try {
      const res = await fetch('/api/admin/set-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: planModal.id, tier: selectedTier, durationDays: selectedDays }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success(`${planModal.full_name} set to ${selectedTier}`);
      setPlanModal(null);
      await loadStudents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  // ── Exam date modal ──────────────────────────────────────────────────────

  const openExamModal = (student: Student) => {
    const existing = student.exam_date ? student.exam_date.slice(0, 10) : '';
    setExamModal(student);
    setExamDateInput(existing);
    setExamCycleInput(
      student.exam_cycle && (EXAM_CYCLES as readonly string[]).includes(student.exam_cycle)
        ? (student.exam_cycle as ExamCycle)
        : existing ? inferCycle(existing) : 'May'
    );
    setExamDateError('');
  };

  const handleExamDateChange = (val: string) => {
    setExamDateInput(val);
    setExamDateError('');
    if (val) setExamCycleInput(inferCycle(val));
  };

  const handleSetExamDate = async () => {
    if (!examModal) return;
    if (!examDateInput) { setExamDateError('Please select a date.'); return; }
    if (new Date(examDateInput).getTime() <= Date.now()) {
      setExamDateError('Exam date must be in the future.');
      return;
    }
    setActionLoading(examModal.id);
    try {
      const res = await fetch('/api/admin/set-exam-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: examModal.id, examDate: examDateInput, examCycle: examCycleInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success(`Exam date updated for ${examModal.full_name}`);
      setExamModal(null);
      await loadStudents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  // ── Lock / delete ────────────────────────────────────────────────────────

  const handleConfirmedAction = async () => {
    if (!confirmAction) return;
    const { student } = confirmAction;
    setActionLoading(student.id);
    try {
      const res = await fetch('/api/admin/manage-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: student.id, action: confirmAction.type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      if (confirmAction.type === 'delete') {
        toast.success(`${student.full_name}'s account has been deleted`);
      } else if (confirmAction.type === 'lock') {
        toast.success(`${student.full_name}'s account has been locked`);
      } else {
        toast.success(`${student.full_name}'s account has been unlocked`);
      }
      setConfirmAction(null);
      await loadStudents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  // Minimum date for the exam date picker: tomorrow
  const minExamDate = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);

  // ── Expired-exam-active ───────────────────────────────────────────────────

  const loadExpiredActive = async () => {
    setExpiredLoading(true);
    setExpiredError('');
    try {
      const res = await fetch('/api/admin/data?type=expired-exam-active');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setExpiredActive(data.students ?? []);
    } catch (err) {
      setExpiredError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setExpiredLoading(false);
      setExpiredFetched(true);
    }
  };

  const toggleExpiredSection = () => {
    const next = !showExpired;
    setShowExpired(next);
    if (next && !expiredFetched) loadExpiredActive();
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">Manage Students</h1>
          <p className="text-neutral-mid text-sm mt-1">
            {isLoading ? 'Loading…' : `${students.length} registered student${students.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button onClick={loadStudents} className="text-xs text-primary hover:underline">↻ Refresh</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="p-4"><p className="text-xs text-neutral-mid">Upcoming exam dates</p><p className="text-2xl font-heading font-bold text-primary mt-1">{examSummary.upcoming}</p></Card>
        <Card className="p-4"><p className="text-xs text-neutral-mid">Exam dates passed</p><p className="text-2xl font-heading font-bold text-accent-dark mt-1">{examSummary.datePassed}</p></Card>
        <Card className="p-4"><p className="text-xs text-neutral-mid">No exam date set</p><p className="text-2xl font-heading font-bold text-neutral-mid mt-1">{examSummary.unscheduled}</p></Card>
      </div>

      <p className="text-xs text-neutral-mid">Exam status is inferred from each student's saved target exam date; it does not confirm attendance or results.</p>

      <div className="flex gap-3 max-w-2xl">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <select
          value={planFilter}
          onChange={e => setPlanFilter(e.target.value)}
          className="w-40 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="all">All Plans</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
          <option value="free">Free</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Spinner size="lg" color="primary" /></div>
      ) : error ? (
        <Card className="text-center py-8">
          <p className="text-error mb-3">{error}</p>
          <Button variant="primary" size="sm" onClick={loadStudents}>Retry</Button>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-primary-xlight dark:bg-primary/10">
              <tr>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Student</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Cadre</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Exam cycle</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Live exam timer</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Plan</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Expires</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Joined</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className={`border-t border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-primary-xlight/30 dark:bg-primary/5'}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--color-text)]">{s.full_name}</p>
                    <p className="text-xs text-neutral-mid">{s.email}</p>
                  </td>
                  <td className="px-4 py-3 text-neutral-mid">{s.cadre}</td>
                  <td className="px-4 py-3 text-xs text-neutral-mid">
                    <p>{s.exam_cycle ?? '—'}</p>
                    {examTimestamp(s.exam_date) !== null && (
                      <p className="mt-0.5">{new Date(s.exam_date!).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const status = examStatus(s.exam_date);
                      return (
                        <>
                          <Badge variant={status.variant} size="sm">{status.label}</Badge>
                          <p className="font-mono text-xs text-[var(--color-text)] mt-1 whitespace-nowrap">{examCountdown(s.exam_date)}</p>
                        </>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const tier = effectiveTier(s.plan_tier, s.plan_expires_at);
                      return <Badge variant={TIER_BADGE[tier] ?? 'secondary'} size="sm">{tier}</Badge>;
                    })()}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-mid">
                    {s.plan_expires_at
                      ? new Date(s.plan_expires_at) < new Date()
                        ? <span className="text-error font-semibold">Expired {new Date(s.plan_expires_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</span>
                        : new Date(s.plan_expires_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
                      : s.plan_tier === 'free' ? '—' : 'No expiry'}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-mid">
                    {new Date(s.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    {s.is_locked
                      ? <Badge variant="red" size="sm">Locked</Badge>
                      : <Badge variant="green" size="sm">Active</Badge>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => openPlanModal(s)}>
                        Set Plan
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openExamModal(s)}>
                        Edit Exam Date
                      </Button>
                      {s.is_locked ? (
                        <Button variant="ghost" size="sm"
                          onClick={() => setConfirmAction({ type: 'unlock', student: s })}>
                          Unlock
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm"
                          onClick={() => setConfirmAction({ type: 'lock', student: s })}>
                          Lock
                        </Button>
                      )}
                      <Button variant="danger" size="sm"
                        onClick={() => setConfirmAction({ type: 'delete', student: s })}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-neutral-mid">
                    {search ? `No students matching "${search}"` : 'No students registered yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Recently Active — Expired Exam Date ── */}
      <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <button
          onClick={toggleExpiredSection}
          className="w-full flex items-center justify-between px-5 py-4 bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-amber-600 text-xl">⚠️</span>
            <div className="text-left">
              <p className="font-heading font-semibold text-amber-900 dark:text-amber-100 text-sm">
                Recently Active — Expired Exam Date
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300/70">
                Students who logged in within the last 30 days but have a past exam date
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expiredFetched && (
              <span className="bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 text-xs font-bold px-2 py-0.5 rounded-full">
                {expiredActive.length}
              </span>
            )}
            <svg className={`w-4 h-4 text-amber-600 transition-transform ${showExpired ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {showExpired && (
          <div className="p-4">
            {expiredLoading ? (
              <div className="flex items-center justify-center py-8"><Spinner size="lg" color="primary" /></div>
            ) : expiredError ? (
              <div className="text-center py-6">
                <p className="text-error text-sm mb-3">{expiredError}</p>
                <Button variant="outline" size="sm" onClick={loadExpiredActive}>Retry</Button>
              </div>
            ) : expiredActive.length === 0 ? (
              <p className="text-center py-6 text-neutral-mid text-sm">
                No recently-active students with a past exam date. ✅
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                <table className="w-full text-sm">
                  <thead className="bg-amber-50 dark:bg-amber-900/10">
                    <tr>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Student</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Exam Date (Passed)</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Cycle</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Last Login</th>
                      <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiredActive.map((s, i) => (
                      <tr key={s.id} className={`border-t border-[var(--color-border)] ${i % 2 === 0 ? '' : 'bg-amber-50/30 dark:bg-amber-900/5'}`}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-[var(--color-text)]">{s.full_name}</p>
                          <p className="text-xs text-neutral-mid">{s.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-error font-semibold text-xs">
                            {new Date(s.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-mid">{s.exam_cycle ?? '—'}</td>
                        <td className="px-4 py-3 text-xs text-neutral-mid">
                          {new Date(s.last_login_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                          <span className="block text-[10px] text-neutral-mid/70">
                            {new Date(s.last_login_at).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="outline" size="sm" onClick={() => openExamModal({
                            id: s.id,
                            full_name: s.full_name,
                            email: s.email,
                            cadre: '—',
                            exam_date: s.exam_date,
                            exam_cycle: s.exam_cycle,
                            plan_tier: 'free',
                            plan_expires_at: null,
                            created_at: '',
                            is_locked: false,
                          })}>
                            Fix Exam Date
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Plan modal ── */}
      {planModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-heading font-bold mb-1">Set Plan</h3>
            <p className="text-sm text-neutral-mid mb-4">{planModal.full_name} · currently <strong>{planModal.plan_tier}</strong></p>
            <div className="space-y-2 mb-4">
              {PLAN_OPTIONS.map(opt => (
                <label key={opt.tier} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedTier === opt.tier ? 'border-primary bg-primary-light' : 'border-[var(--color-border)] hover:border-primary/40'}`}>
                  <input type="radio" name="plan" value={opt.tier} checked={selectedTier === opt.tier}
                    onChange={() => { setSelectedTier(opt.tier); setSelectedDays(opt.days); }} className="sr-only" />
                  <span className="text-sm font-medium text-[var(--color-text)]">{opt.label}</span>
                  {selectedTier === opt.tier && <span className="ml-auto text-primary">✓</span>}
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setPlanModal(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={handleSetPlan} disabled={actionLoading !== null}>
                {actionLoading ? <Spinner size="sm" color="white" /> : 'Apply'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit exam date modal ── */}
      {examModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-heading font-bold mb-1">Edit Exam Date</h3>
            <p className="text-sm text-neutral-mid mb-4">{examModal.full_name}</p>

            {examModal.exam_date && (
              <p className="text-xs text-neutral-mid mb-3">
                Current:{' '}
                <span className="font-semibold text-[var(--color-text)]">
                  {new Date(examModal.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {examModal.exam_cycle ? ` · ${examModal.exam_cycle} cycle` : ''}
                </span>
              </p>
            )}

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1.5 text-[var(--color-text)]">
                New exam date <span className="text-error">*</span>
              </label>
              <input
                type="date"
                value={examDateInput}
                min={minExamDate}
                onChange={e => handleExamDateChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {examDateError && (
                <p className="mt-1 text-xs text-error">{examDateError}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1.5 text-[var(--color-text)]">
                Exam cycle <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {EXAM_CYCLES.map(cycle => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() => setExamCycleInput(cycle)}
                    className={`py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                      examCycleInput === cycle
                        ? 'border-primary bg-primary-light text-primary'
                        : 'border-[var(--color-border)] text-neutral-mid hover:border-primary/40'
                    }`}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setExamModal(null)} disabled={actionLoading !== null}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleSetExamDate}
                disabled={actionLoading !== null || !examDateInput}
              >
                {actionLoading ? <Spinner size="sm" color="white" /> : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm lock / unlock / delete modal ── */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full">
            {confirmAction.type === 'delete' ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-error">Delete Account</h3>
                    <p className="text-xs text-neutral-mid">This cannot be undone</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text)] mb-2">
                  You are about to <strong>permanently delete</strong> the account of:
                </p>
                <div className="bg-error/5 border border-error/20 rounded-xl p-3 mb-4">
                  <p className="font-semibold text-[var(--color-text)]">{confirmAction.student.full_name}</p>
                  <p className="text-xs text-neutral-mid">{confirmAction.student.email}</p>
                </div>
                <p className="text-sm text-neutral-mid mb-4">
                  All their data, progress, and subscriptions will be permanently erased.
                </p>
              </>
            ) : confirmAction.type === 'lock' ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold">Lock Account</h3>
                    <p className="text-xs text-neutral-mid">User will be unable to log in</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text)] mb-2">
                  You are about to <strong>lock</strong> the account of:
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
                  <p className="font-semibold text-[var(--color-text)]">{confirmAction.student.full_name}</p>
                  <p className="text-xs text-neutral-mid">{confirmAction.student.email}</p>
                </div>
                <p className="text-sm text-neutral-mid mb-4">
                  They will be signed out and blocked from logging in. You can unlock them at any time.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold">Unlock Account</h3>
                    <p className="text-xs text-neutral-mid">User will be able to log in again</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text)] mb-2">Restore access for:</p>
                <div className="bg-success/5 border border-success/20 rounded-xl p-3 mb-4">
                  <p className="font-semibold text-[var(--color-text)]">{confirmAction.student.full_name}</p>
                  <p className="text-xs text-neutral-mid">{confirmAction.student.email}</p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setConfirmAction(null)} disabled={actionLoading !== null}>
                Cancel
              </Button>
              <Button
                variant={confirmAction.type === 'delete' ? 'danger' : 'primary'}
                className="flex-1"
                onClick={handleConfirmedAction}
                disabled={actionLoading !== null}
              >
                {actionLoading
                  ? <Spinner size="sm" color="white" />
                  : confirmAction.type === 'delete' ? 'Yes, Delete'
                  : confirmAction.type === 'lock' ? 'Yes, Lock'
                  : 'Yes, Unlock'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
