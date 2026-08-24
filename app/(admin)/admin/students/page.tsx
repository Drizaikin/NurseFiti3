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

const TIER_BADGE: Record<string, 'amber' | 'teal' | 'secondary'> = {
  premium:  'amber',
  standard: 'teal',
  weekly:   'teal',
  daily:    'teal',
  free:     'secondary',
};

const PLAN_OPTIONS = [
  { tier: 'standard', label: 'Success Plan (30 days)',       days: 30  },
  { tier: 'premium',  label: 'Elite Prep (90 days)',         days: 90  },
  { tier: 'weekly',   label: 'Exam Boost Weekly (7 days)',   days: 7   },
  { tier: 'daily',    label: 'Exam Boost Daily (1 day)',     days: 1   },
  { tier: 'free',     label: 'Test Yourself (no expiry)',    days: 0   },
];

type ConfirmAction =
  | { type: 'lock';   student: Student }
  | { type: 'unlock'; student: Student }
  | { type: 'delete'; student: Student };

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

  // Confirm modal for lock / delete
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

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

  // Match the student dashboard: all timers count toward the saved exam_date.
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = students.filter(s => {
    const matchesSearch = s.full_name.toLowerCase().includes(search.toLowerCase()) ||
                          s.email.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (planFilter === 'all') return true;
    
    const currentTier = effectiveTier(s.plan_tier, s.plan_expires_at);
    return currentTier === planFilter;
  });

  const examSummary = students.reduce((summary, student) => {
    if (!student.exam_date) summary.unscheduled += 1;
    else if (new Date(student.exam_date).getTime() <= now) summary.datePassed += 1;
    else summary.upcoming += 1;
    return summary;
  }, { upcoming: 0, datePassed: 0, unscheduled: 0 });

  const examStatus = (examDate: string | null) => {
    if (!examDate) return { label: 'No exam date', variant: 'secondary' as const };
    return new Date(examDate).getTime() <= now
      ? { label: 'Exam date passed', variant: 'amber' as const }
      : { label: 'Upcoming', variant: 'teal' as const };
  };

  const examCountdown = (examDate: string | null) => {
    if (!examDate) return '—';
    const diff = new Date(examDate).getTime() - now;
    if (diff <= 0) return 'Exam date passed';
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86_400);
    const hours = Math.floor((totalSeconds % 86_400) / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  };

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

      <p className="text-xs text-neutral-mid">Exam status is inferred from each student’s saved target exam date; it does not confirm attendance or results.</p>

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
                    {s.exam_date && <p className="mt-0.5">{new Date(s.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
                  </td>
                  <td className="px-4 py-3">
                    {(() => { const status = examStatus(s.exam_date); return <><Badge variant={status.variant} size="sm">{status.label}</Badge><p className="font-mono text-xs text-[var(--color-text)] mt-1 whitespace-nowrap">{examCountdown(s.exam_date)}</p></>; })()}
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

      {/* Plan modal */}
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

      {/* Confirm lock / unlock / delete modal */}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold">Unlock Account</h3>
                    <p className="text-xs text-neutral-mid">User will be able to log in again</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text)] mb-2">
                  Restore access for:
                </p>
                <div className="bg-success/5 border border-success/20 rounded-xl p-3 mb-4">
                  <p className="font-semibold text-[var(--color-text)]">{confirmAction.student.full_name}</p>
                  <p className="text-xs text-neutral-mid">{confirmAction.student.email}</p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setConfirmAction(null)}
                disabled={actionLoading !== null}>
                Cancel
              </Button>
              <Button
                variant={confirmAction.type === 'delete' ? 'danger' : confirmAction.type === 'lock' ? 'primary' : 'primary'}
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
