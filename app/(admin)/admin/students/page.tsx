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
  plan_tier: string;
  plan_expires_at: string | null;
  created_at: string;
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

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [planModal, setPlanModal] = useState<Student | null>(null);
  const [selectedTier, setSelectedTier] = useState('standard');
  const [selectedDays, setSelectedDays] = useState(30);

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

  const filtered = students.filter(s =>
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

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

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or email…"
        className="w-full max-w-md px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40"
      />

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
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Plan</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Expires</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Joined</th>
                <th className="text-left px-4 py-3 text-neutral-mid font-semibold">Action</th>
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
                    <Button variant="outline" size="sm" onClick={() => openPlanModal(s)}>Set Plan</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-neutral-mid">
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
    </div>
  );
}
