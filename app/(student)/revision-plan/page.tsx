"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { effectiveTier } from '@/lib/planLimits';
import toast from 'react-hot-toast';

// ─── Constants ────────────────────────────────────────────────────────────────

const PLAN_ACCESS: Record<string, { label: string; variant: 'teal' | 'amber' | 'secondary'; included: boolean }> = {
  premium:  { label: 'Elite Prep',         variant: 'amber',     included: true },
  standard: { label: 'Success Plan',       variant: 'teal',      included: true },
  weekly:   { label: 'Exam Boost Weekly',  variant: 'teal',      included: true },
  daily:    { label: 'Exam Boost Daily',   variant: 'teal',      included: false },
  free:     { label: 'Test Yourself',      variant: 'secondary', included: false },
};

const WORK_STATUS_OPTIONS = [
  { value: 'student_only',      label: 'Full-time student',    desc: 'No work commitments — maximum study time' },
  { value: 'working_part_time', label: 'Working part-time',    desc: 'Some work commitments — moderate study time' },
  { value: 'working_full_time', label: 'Working full-time',    desc: 'Heavy work commitments — focused study time' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type PageState = 'loading' | 'form' | 'generating' | 'result';

interface FormData {
  examDate: string;
  studyHoursWeekday: number;
  studyHoursWeekend: number;
  workSchoolStatus: string;
}

interface SavedPlan {
  id: string;
  cadre: string;
  exam_date: string;
  generated_at: string;
  share_token: string;
  plan_html: string;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            i + 1 < step ? 'bg-success text-white' :
            i + 1 === step ? 'bg-primary text-white' :
            'bg-[var(--color-border)] text-[var(--color-text-secondary)]'
          }`}>
            {i + 1 < step ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 transition-all ${i + 1 < step ? 'bg-success' : 'bg-[var(--color-border)]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RevisionPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [pageState, setPageState] = useState<PageState>('loading');
  const [planTier, setPlanTier] = useState<string>('free');
  const [planExpiresAt, setPlanExpiresAt] = useState<string | null>(null);
  const [cadre, setCadre] = useState<string>('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    examDate: '',
    studyHoursWeekday: 3,
    studyHoursWeekend: 5,
    workSchoolStatus: 'student_only',
  });
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [activePlan, setActivePlan] = useState<SavedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSyncingPayment, setIsSyncingPayment] = useState(false);
  const [pendingPaymentRef, setPendingPaymentRef] = useState<string | null>(null);

  const activeTier = effectiveTier(planTier, planExpiresAt);
  const planAccess = PLAN_ACCESS[activeTier] ?? PLAN_ACCESS.free;

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const [{ data: sp }, { data: plans }] = await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('student_profiles').select('plan_tier, plan_expires_at, exam_date, cadre').eq('id', user.id).single(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('revision_plans').select('id, cadre, exam_date, generated_at, share_token, plan_html').eq('student_id', user.id).order('generated_at', { ascending: false }).limit(5),
    ]);

    if (sp) {
      setPlanTier(sp.plan_tier ?? 'free');
      setPlanExpiresAt(sp.plan_expires_at ?? null);
      setCadre(sp.cadre ?? '');
      setFormData(f => ({ ...f, examDate: sp.exam_date ?? '' }));
    }
    if (plans) setSavedPlans(plans as SavedPlan[]);

    setPageState('form');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Handle IntaSend redirect back after payment
  useEffect(() => {
    const payment = searchParams.get('payment');
    const ref = searchParams.get('reference');
    if (payment === 'success' && ref) {
      setPendingPaymentRef(ref);
      toast.success('Payment confirmed! Generating your plan…');
      router.replace('/revision-plan', { scroll: false });
      // Auto-trigger generation
      setTimeout(() => handleGenerate(ref), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Payment ─────────────────────────────────────────────────────────────────
  const handlePay = async () => {
    router.push('/settings?tab=account');
  };

  const handleSyncPayment = async () => {
    setIsSyncingPayment(true);
    try {
      const res = await fetch('/api/intasend/sync-plan', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Could not confirm payment');

      if (data.upgraded) {
        toast.success('Payment confirmed. Your plan has been upgraded.');
        await loadData();
      } else {
        toast.error(data.message ?? 'IntaSend has not confirmed the payment yet.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not confirm payment');
    } finally {
      setIsSyncingPayment(false);
    }
  };

  // ── Generation ──────────────────────────────────────────────────────────────
  const handleGenerate = async (paymentRef?: string) => {
    setIsGenerating(true);
    setPageState('generating');
    try {
      const ref = paymentRef ?? pendingPaymentRef ?? 'included_subscription';
      const res = await fetch('/api/revision-plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, paymentRef: ref }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Generation failed');

      // Reload plans and show result
      await loadData();
      const newPlan = { id: data.planId, cadre, exam_date: formData.examDate, generated_at: new Date().toISOString(), share_token: data.shareToken, plan_html: data.planHtml };
      setActivePlan(newPlan);
      setPageState('result');
      toast.success('Your revision plan is ready!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Generation failed. Please try again.');
      setPageState('form');
    } finally {
      setIsGenerating(false);
    }
  };

  // ── PDF download ─────────────────────────────────────────────────────────────
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !activePlan) return;
    printWindow.document.write(activePlan.plan_html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  // ── Copy share link ──────────────────────────────────────────────────────────
  const handleCopyShare = async () => {
    if (!activePlan) return;
    const url = `${window.location.origin}/revision-plan/share/${activePlan.share_token}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied!');
    } catch {
      toast.error('Could not copy link. Please copy it manually.');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  if (pageState === 'loading') {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  }

  // ── RESULT VIEW ──────────────────────────────────────────────────────────────
  if (pageState === 'result' && activePlan) {
    return (
      <div className="max-w-5xl mx-auto space-y-4 pb-24 lg:pb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Your Revision Plan</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">{activePlan.cadre} · Exam: {new Date(activePlan.exam_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleCopyShare}>🔗 Copy Share Link</Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>📄 Download PDF</Button>
            <Button variant="ghost" size="sm" onClick={() => { setPageState('form'); setStep(1); }}>Generate New Plan</Button>
          </div>
        </div>

        {/* Render plan HTML */}
        <div
          className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"
          dangerouslySetInnerHTML={{ __html: activePlan.plan_html }}
        />

        {/* Previous plans */}
        {savedPlans.length > 1 && (
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-3">Previous Plans</h3>
            <div className="space-y-2">
              {savedPlans.filter(p => p.id !== activePlan.id).map(plan => (
                <div key={plan.id} className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] hover:border-primary/40 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{plan.cadre} plan</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Generated {new Date(plan.generated_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActivePlan(plan)}>View</Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  }

  // ── GENERATING ───────────────────────────────────────────────────────────────
  if (pageState === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-6xl animate-bounce">📅</div>
        <div className="text-center">
          <h2 className="text-xl font-heading font-bold text-[var(--color-text)] mb-2">Building your revision plan…</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Analysing your weak areas and scheduling your study sessions</p>
        </div>
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // ── FORM VIEW ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Revision Plan Generator</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">AI-powered personalised study schedule built around your exam date and weak areas.</p>
      </div>

      {/* Pricing banner */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] mb-6">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Your plan: <Badge variant={planAccess.variant} size="sm">{planAccess.label}</Badge>
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            {planAccess.included
              ? 'Included in your active prep plan'
              : 'Upgrade to Exam Boost, Success Plan, or Elite Prep to generate a personalized plan'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-heading font-bold text-primary">{planAccess.included ? 'Included' : 'Upgrade'}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{planAccess.included ? 'with your plan' : 'to unlock'}</p>
        </div>
      </div>

      {!planAccess.included && (
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncPayment}
            disabled={isSyncingPayment}
            className="w-full"
          >
            {isSyncingPayment
              ? <><Spinner size="sm" />&nbsp;Checking IntaSend payment...</>
              : 'Already paid? Confirm recent payment'}
          </Button>
        </div>
      )}

      {/* Previous plans shortcut */}
      {savedPlans.length > 0 && (
        <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary-xlight dark:bg-primary/5">
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">You have {savedPlans.length} existing plan{savedPlans.length > 1 ? 's' : ''}</p>
          <div className="flex gap-2 flex-wrap">
            {savedPlans.map(plan => (
              <Button key={plan.id} variant="outline" size="sm" onClick={() => { setActivePlan(plan); setPageState('result'); }}>
                View {new Date(plan.generated_at).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })} plan
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Step form */}
      <Card>
        <StepIndicator step={step} total={3} />

        {/* Step 1: Exam details */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-1">Exam Details</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Confirm your cadre and target exam date.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">Your Cadre</label>
              <div className="px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] opacity-70 text-sm text-[var(--color-text)]">
                {cadre || 'Loading…'}
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Cadre is set from your profile and cannot be changed here.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">Target Exam Date</label>
              <input
                type="date"
                value={formData.examDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setFormData(f => ({ ...f, examDate: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text)] bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>

            <Button
              variant="primary"
              className="w-full"
              disabled={!formData.examDate || !cadre}
              onClick={() => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selected = new Date(formData.examDate);
                selected.setHours(0, 0, 0, 0);
                if (selected <= today) {
                  toast.error('Exam date must be in the future.');
                  return;
                }
                setStep(2);
              }}
            >
              Next: Study Capacity →
            </Button>
          </div>
        )}

        {/* Step 2: Study capacity */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-1">Study Capacity</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">How many hours can you study each day?</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">
                Weekday study hours: <span className="text-primary font-bold">{formData.studyHoursWeekday}h</span>
              </label>
              <input
                type="range" min={1} max={8} step={1}
                value={formData.studyHoursWeekday}
                onChange={e => setFormData(f => ({ ...f, studyHoursWeekday: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
                <span>1h</span><span>4h</span><span>8h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">
                Weekend study hours: <span className="text-primary font-bold">{formData.studyHoursWeekend}h</span>
              </label>
              <input
                type="range" min={1} max={12} step={1}
                value={formData.studyHoursWeekend}
                onChange={e => setFormData(f => ({ ...f, studyHoursWeekend: Number(e.target.value) }))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
                <span>1h</span><span>6h</span><span>12h</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Work / School Status</label>
              <div className="space-y-2">
                {WORK_STATUS_OPTIONS.map(opt => (
                  <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.workSchoolStatus === opt.value ? 'border-primary bg-primary-light' : 'border-[var(--color-border)] hover:border-primary/40'}`}>
                    <input type="radio" name="workStatus" value={opt.value} checked={formData.workSchoolStatus === opt.value} onChange={() => setFormData(f => ({ ...f, workSchoolStatus: opt.value }))} className="sr-only" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--color-text)]">{opt.label}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{opt.desc}</p>
                    </div>
                    {formData.workSchoolStatus === opt.value && <span className="text-primary text-lg">✓</span>}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}>← Back</Button>
              <Button variant="primary" className="flex-1" onClick={() => setStep(3)}>Next: Review & Pay →</Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & pay */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-1">Review & Generate</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {planAccess.included
                  ? 'Confirm your details and generate your included plan.'
                  : 'Confirm your details, then upgrade to unlock personalized revision planning.'}
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-2 p-4 rounded-xl bg-primary-xlight dark:bg-primary/5 border border-primary/20">
              {[
                { label: 'Cadre', value: cadre },
                { label: 'Exam Date', value: new Date(formData.examDate).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                { label: 'Weekday study', value: `${formData.studyHoursWeekday} hours/day` },
                { label: 'Weekend study', value: `${formData.studyHoursWeekend} hours/day` },
                { label: 'Status', value: WORK_STATUS_OPTIONS.find(o => o.value === formData.workSchoolStatus)?.label ?? '' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">{label}</span>
                  <span className="font-semibold text-[var(--color-text)]">{value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-primary/20">
                <span className="font-bold text-[var(--color-text)]">Access</span>
                <span className="text-xl font-heading font-bold text-primary">{planAccess.included ? 'Included' : 'Upgrade required'}</span>
              </div>
            </div>

            {/* What you'll get */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '📆', text: 'Day-by-day schedule' },
                { icon: '🎯', text: 'Weak area targeting' },
                { icon: '⏱️', text: 'Mock exam schedule' },
                { icon: '🎴', text: 'Flashcard targets' },
                { icon: '📄', text: 'PDF download' },
                { icon: '🔗', text: 'Shareable link' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setStep(2)}>← Back</Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => planAccess.included ? handleGenerate() : handlePay()}
                disabled={isGenerating}
              >
                {isGenerating
                  ? <><Spinner size="sm" color="white" />&nbsp;Generating…</>
                  : planAccess.included
                  ? 'Generate My Plan'
                  : 'Upgrade to Generate'}
              </Button>
            </div>

            <p className="text-xs text-center text-[var(--color-text-secondary)]">
              Paid plans use secure IntaSend checkout with M-Pesa, card, or bank transfer
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
