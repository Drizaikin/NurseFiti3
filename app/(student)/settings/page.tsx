"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import { effectiveTier, PLAN_PRICING_META } from '@/lib/planLimits';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  cadre: string;
  specialty: string;
  institution: string;
  exam_date: string;
  exam_cycle: string;
  plan_tier: string;
  plan_expires_at: string | null;
}

interface NotifPrefs {
  notif_booking_confirmed: boolean;
  notif_session_reminder: boolean;
  notif_streak_alerts: boolean;
  notif_plan_expiry: boolean;
  notif_weekly_summary: boolean;
  notif_whatsapp: boolean;
}

type Section = 'profile' | 'password' | 'notifications' | 'account';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionTab({ id, label, icon, active, onClick }: {
  id: Section; label: string; icon: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
        active
          ? 'bg-primary text-white shadow-sm'
          : 'text-[var(--color-text-secondary)] hover:bg-primary-light hover:text-primary'
      }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );
}

function FormField({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--color-text)] mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-[var(--color-text-secondary)] mt-1">{hint}</p>}
    </div>
  );
}

function inputClass(disabled = false) {
  return `w-full px-3 py-2.5 rounded-xl border text-sm text-[var(--color-text)] bg-[var(--color-card)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
    disabled
      ? 'border-[var(--color-border)] opacity-60 cursor-not-allowed'
      : 'border-[var(--color-border)] hover:border-primary/40 focus:border-primary'
  }`;
}

function Toggle({ checked, onChange, label, sub }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
      <div>
        <p className="text-sm font-medium text-[var(--color-text)]">{label}</p>
        {sub && <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{sub}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-primary' : 'bg-neutral-border'}`}
        role="switch"
        aria-checked={checked}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}


// ─── Subscription Card ────────────────────────────────────────────────────────

const PLANS = [
  {
    tier: 'daily',
    name: 'Exam Boost Daily',
    price: 'KSh 69',
    period: '/day',
    amountKsh: 69,
    color: 'border-primary/30 bg-primary-xlight dark:bg-primary/5',
    badge: 'teal' as const,
    features: [
      'Unlimited MCQ practice',
      '2 mock exams per week',
      'Readiness analytics',
      'Spaced repetition flashcards',
      'Personalized revision plan included',
    ],
    note: '24-hour focused revision',
  },
  {
    tier: 'weekly',
    name: 'Exam Boost Weekly',
    price: 'KSh 299',
    period: '/week',
    amountKsh: 299,
    color: 'border-primary/40 bg-primary-xlight dark:bg-primary/5',
    badge: 'teal' as const,
    features: [
      'Everything in Exam Boost Daily',
      '2 mock exams per week',
      '7-day access',
      'Personalized revision plan included',
    ],
    note: 'Best value for short-term exam prep',
    highlight: true,
  },
  {
    tier: 'standard',
    name: 'Success Plan',
    price: 'KSh 999',
    period: '/month',
    amountKsh: 999,
    color: 'border-primary/40 bg-primary-xlight dark:bg-primary/5',
    badge: 'teal' as const,
    features: [
      'Unlimited MCQ practice',
      '2 mock exams per week',
      'Smarter analytics',
      'Spaced repetition flashcards',
      'Adaptive revision roadmap',
      'Tutor priority',
    ],
    note: '30-day access',
  },
  {
    tier: 'premium',
    name: 'Elite Prep',
    price: 'KSh 3,500',
    period: '/exam cycle',
    amountKsh: 3500,
    color: 'border-accent/40 bg-accent-light dark:bg-accent/5',
    badge: 'amber' as const,
    features: [
      'Everything in Success Plan',
      'Unlimited mock exams',
      'Tutor priority',
      'WhatsApp mentorship',
      'AI coaching',
      'Accountability tracking',
      'Exam registration reminders',
    ],
    note: 'Full exam-cycle support',
  },
];

function SubscriptionCard({ planTier, planExpiresAt, onUpgradeSuccess }: {
  planTier: string;
  planExpiresAt: string | null;
  onUpgradeSuccess: () => void;
}) {
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);

  // Use the effective tier — falls back to 'free' if expired
  const activeTier = effectiveTier(planTier, planExpiresAt);
  const isExpired = planTier !== 'free' && activeTier === 'free';
  const meta = PLAN_PRICING_META[activeTier];

  const handleUpgrade = async (amountKsh: number, tier: string) => {
    setIsUpgrading(tier);
    try {
      const res = await fetch('/api/intasend/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'plan_subscription', amountKsh }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Payment initialization failed');
      window.location.href = data.checkout_url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not start payment. Try again.');
      setIsUpgrading(null);
    }
  };

  // Tier ordering for "show plans above current"
  const TIER_ORDER: Record<string, number> = { free: 0, daily: 1, weekly: 2, standard: 3, premium: 4 };
  const currentOrder = TIER_ORDER[activeTier] ?? 0;

  const planSummary: Record<string, string> = {
    premium:  'Elite Prep - KSh 3,500 / exam cycle',
    standard: 'Success Plan - KSh 999 / month',
    weekly:   'Exam Boost Weekly - KSh 299 / week',
    daily:    'Exam Boost Daily - KSh 69 / day',
    free:     'Test Yourself - KSh 0 / forever',
  };
  const planSubtext: Record<string, string> = {
    premium:  'You are on the highest plan with exam-cycle mentorship and accountability.',
    standard: 'Upgrade to Elite Prep for unlimited mocks, WhatsApp mentorship, and stronger accountability.',
    weekly:   'Upgrade to Success Plan or Elite Prep for longer access and deeper support.',
    daily:    'Upgrade to Exam Boost Weekly, Success Plan, or Elite Prep for longer access.',
    free:     'Upgrade to unlock unlimited practice, mock exams, flashcards, and included revision plans.',
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">Subscription</h2>
        <Badge variant={meta.badge}>{meta.label} Plan</Badge>
      </div>

      {/* Current plan summary */}
      <div className={`p-4 rounded-xl border mb-5 ${isExpired ? 'bg-error/5 border-error/20' : 'bg-primary-xlight dark:bg-primary/5 border-primary/20'}`}>
        {isExpired ? (
          <>
            <p className="text-sm font-semibold text-error">⚠️ Your {planTier} plan has expired</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Expired {planExpiresAt ? new Date(planExpiresAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}. You are now on Test Yourself. Renew below to restore access.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-[var(--color-text)]">{planSummary[activeTier] ?? planSummary.free}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              {activeTier !== 'free' && planExpiresAt
                ? `Active until ${new Date(planExpiresAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}. ${planSubtext[activeTier] ?? ''}`
                : planSubtext[activeTier] ?? planSubtext.free}
            </p>
          </>
        )}
      </div>

      {/* Upgrade options — show all plans above current effective tier */}
      {activeTier !== 'premium' && (
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
            {activeTier === 'free' ? 'Available Plans' : 'Upgrade Options'}
          </p>
          {PLANS.filter(p => (TIER_ORDER[p.tier] ?? 0) > currentOrder).map(plan => (
            <div key={plan.tier} className={`rounded-xl border-2 p-4 ${plan.color} ${plan.highlight ? 'ring-2 ring-primary/30' : ''}`}>
              {plan.highlight && (
                <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">⭐ Most Popular</p>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-heading font-bold text-[var(--color-text)]">{plan.name}</p>
                    <Badge variant={plan.badge} size="sm">{plan.price}{plan.period}</Badge>
                  </div>
                  {plan.note && <p className="text-xs text-neutral-mid mb-2 italic">{plan.note}</p>}
                  <ul className="space-y-0.5 mb-3">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <span className="text-success">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleUpgrade(plan.amountKsh, plan.tier)}
                disabled={isUpgrading !== null}
                className="w-full"
              >
                {isUpgrading === plan.tier
                  ? <><Spinner size="sm" color="white" />&nbsp;Redirecting to payment…</>
                  : isExpired
                  ? `Renew with ${plan.name} — ${plan.price}`
                  : `Get ${plan.name} — ${plan.price}`}
              </Button>
            </div>
          ))}
          <p className="text-xs text-[var(--color-text-secondary)]">
            Payment via IntaSend (M-Pesa, card, or bank transfer). You will be redirected to a secure checkout page.
          </p>
        </div>
      )}
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [activeSection, setActiveSection] = useState<Section>('profile');

  // Handle tab query param — e.g. /settings?tab=account jumps straight to the account section
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'account' || tab === 'profile' || tab === 'password' || tab === 'notifications') {
      setActiveSection(tab as Section);
    }
    // Handle IntaSend redirect back after payment
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      toast.success('Payment successful! Your plan has been upgraded.');
      setActiveSection('account');
      router.replace('/settings?tab=account', { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>({
    notif_booking_confirmed: true,
    notif_session_reminder: true,
    notif_streak_alerts: true,
    notif_plan_expiry: true,
    notif_weekly_summary: true,
    notif_whatsapp: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Edit profile form state
  const [editForm, setEditForm] = useState({ full_name: '', phone: '', institution: '', exam_date: '', exam_cycle: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password form state
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
  const [isSavingPw, setIsSavingPw] = useState(false);

  // Notification save state
  const [isSavingNotif, setIsSavingNotif] = useState(false);

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const fetchProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const [{ data: pd }, { data: sd }] = await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('profiles').select('full_name, email, phone').eq('id', user.id).single(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (supabase as any).from('student_profiles')
        .select('cadre, specialty, institution, exam_date, exam_cycle, plan_tier, plan_expires_at, notif_booking_confirmed, notif_session_reminder, notif_streak_alerts, notif_plan_expiry, notif_weekly_summary, notif_whatsapp')
        .eq('id', user.id).single(),
    ]);

    if (pd && sd) {
      // Compute effective tier — if expired, write free back to DB so it stays consistent
      const rawTier = sd.plan_tier ?? 'free';
      const expiresAt = sd.plan_expires_at ?? null;
      const active = effectiveTier(rawTier, expiresAt);
      if (active === 'free' && rawTier !== 'free') {
        // Plan has expired — reset stored tier to free
        await (supabase as any)
          .from('student_profiles')
          .update({ plan_tier: 'free', plan_expires_at: null })
          .eq('id', user.id);
      }

      const p: ProfileData = {
        full_name: pd.full_name ?? '',
        email: pd.email ?? '',
        phone: pd.phone ?? '',
        cadre: sd.cadre ?? '',
        specialty: sd.specialty ?? '',
        institution: sd.institution ?? '',
        exam_date: sd.exam_date ?? '',
        exam_cycle: sd.exam_cycle ?? '',
        plan_tier: active,           // always the effective tier
        plan_expires_at: active !== 'free' ? expiresAt : null,
      };
      setProfile(p);
      setEditForm({
        full_name: p.full_name,
        phone: p.phone,
        institution: p.institution,
        exam_date: p.exam_date,
        exam_cycle: p.exam_cycle,
      });
      setNotifPrefs({
        notif_booking_confirmed: sd.notif_booking_confirmed ?? true,
        notif_session_reminder:  sd.notif_session_reminder  ?? true,
        notif_streak_alerts:     sd.notif_streak_alerts     ?? true,
        notif_plan_expiry:       sd.notif_plan_expiry       ?? true,
        notif_weekly_summary:    sd.notif_weekly_summary    ?? true,
        notif_whatsapp:          sd.notif_whatsapp          ?? true,
      });
    }
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // ── Save profile ────────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!editForm.full_name.trim()) { toast.error('Full name is required'); return; }
    if (!editForm.phone.trim()) { toast.error('Phone number is required'); return; }
    setIsSavingProfile(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [r1, r2] = await Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from('profiles').update({ full_name: editForm.full_name.trim(), phone: editForm.phone.trim() }).eq('id', user.id),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any).from('student_profiles').update({ institution: editForm.institution.trim(), exam_date: editForm.exam_date, exam_cycle: editForm.exam_cycle }).eq('id', user.id),
      ]);

      if (r1.error || r2.error) throw new Error(r1.error?.message ?? r2.error?.message);
      toast.success('Profile updated successfully');
      await fetchProfile();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // ── Change password ─────────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    if (!pwForm.current) { toast.error('Enter your current password'); return; }
    if (pwForm.next.length < 8) { toast.error('New password must be at least 8 characters'); return; }
    if (!/[A-Z]/.test(pwForm.next)) { toast.error('New password must contain an uppercase letter'); return; }
    if (!/[0-9]/.test(pwForm.next)) { toast.error('New password must contain a number'); return; }
    if (pwForm.next !== pwForm.confirm) { toast.error('Passwords do not match'); return; }

    setIsSavingPw(true);
    try {
      // Re-authenticate with current password first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error('No user session');

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: pwForm.current,
      });
      if (signInError) throw new Error('Current password is incorrect');

      const { error: updateError } = await supabase.auth.updateUser({ password: pwForm.next });
      if (updateError) throw updateError;

      toast.success('Password changed successfully');
      setPwForm({ current: '', next: '', confirm: '' });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setIsSavingPw(false);
    }
  };

  // ── Save notification preferences ───────────────────────────────────────────
  const handleSaveNotifications = async () => {
    setIsSavingNotif(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('student_profiles').update(notifPrefs).eq('id', user.id);
      if (error) throw error;
      toast.success('Notification preferences saved');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save preferences');
    } finally {
      setIsSavingNotif(false);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }


  const EXAM_CYCLES = ['May', 'August', 'November'];

  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Settings</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage your profile, password, and notification preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Sidebar nav ── */}
        <aside className="lg:w-52 flex-shrink-0">
          <nav className="space-y-1">
            <SectionTab id="profile"       label="Profile"        icon="👤" active={activeSection === 'profile'}       onClick={() => setActiveSection('profile')} />
            <SectionTab id="password"      label="Password"       icon="🔒" active={activeSection === 'password'}      onClick={() => setActiveSection('password')} />
            <SectionTab id="notifications" label="Notifications"  icon="🔔" active={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} />
            <SectionTab id="account"       label="Account"        icon="⚙️" active={activeSection === 'account'}       onClick={() => setActiveSection('account')} />
          </nav>
        </aside>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">

          {/* ── PROFILE SECTION ── */}
          {activeSection === 'profile' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">Profile Information</h2>
                <Badge
                  variant={PLAN_PRICING_META[profile?.plan_tier as keyof typeof PLAN_PRICING_META]?.badge ?? 'secondary'}
                  size="sm"
                >
                  {PLAN_PRICING_META[profile?.plan_tier as keyof typeof PLAN_PRICING_META]?.label ?? 'Free'} Plan
                </Badge>
              </div>

              <div className="space-y-4">
                <FormField label="Full Name">
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={e => setEditForm(f => ({ ...f, full_name: e.target.value }))}
                    className={inputClass()}
                    placeholder="Your full name"
                  />
                </FormField>

                <FormField label="Email Address" hint="Email cannot be changed. Contact support if needed.">
                  <input type="email" value={profile?.email ?? ''} disabled className={inputClass(true)} />
                </FormField>

                <FormField label="Phone Number" hint="Kenyan format: 07XX XXX XXX or +254 7XX XXX XXX">
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                    className={inputClass()}
                    placeholder="0712 345 678"
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Cadre" hint="Cadre cannot be changed after signup.">
                    <input type="text" value={profile?.cadre ?? ''} disabled className={inputClass(true)} />
                  </FormField>
                  {profile?.specialty && (
                    <FormField label="Specialty">
                      <input type="text" value={profile.specialty} disabled className={inputClass(true)} />
                    </FormField>
                  )}
                </div>

                <FormField label="Institution">
                  <input
                    type="text"
                    value={editForm.institution}
                    onChange={e => setEditForm(f => ({ ...f, institution: e.target.value }))}
                    className={inputClass()}
                    placeholder="Your nursing school or institution"
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Exam Date">
                    <input
                      type="date"
                      value={editForm.exam_date}
                      onChange={e => setEditForm(f => ({ ...f, exam_date: e.target.value }))}
                      className={inputClass()}
                    />
                  </FormField>
                  <FormField label="Exam Cycle">
                    <select
                      value={editForm.exam_cycle}
                      onChange={e => setEditForm(f => ({ ...f, exam_cycle: e.target.value }))}
                      className={inputClass()}
                    >
                      {EXAM_CYCLES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FormField>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex justify-end">
                <Button variant="primary" onClick={handleSaveProfile} disabled={isSavingProfile}>
                  {isSavingProfile ? <><Spinner size="sm" color="white" />&nbsp;Saving…</> : 'Save Changes'}
                </Button>
              </div>
            </Card>
          )}

          {/* ── PASSWORD SECTION ── */}
          {activeSection === 'password' && (
            <Card>
              <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-6">Change Password</h2>

              <div className="space-y-4 max-w-md">
                {(['current', 'next', 'confirm'] as const).map((field) => {
                  const labels = { current: 'Current Password', next: 'New Password', confirm: 'Confirm New Password' };
                  const hints  = { current: '', next: 'Min 8 characters, 1 uppercase, 1 number', confirm: '' };
                  return (
                    <FormField key={field} label={labels[field]} hint={hints[field]}>
                      <div className="relative">
                        <input
                          type={showPw[field] ? 'text' : 'password'}
                          value={pwForm[field]}
                          onChange={e => setPwForm(f => ({ ...f, [field]: e.target.value }))}
                          className={inputClass() + ' pr-10'}
                          placeholder="••••••••"
                          autoComplete={field === 'current' ? 'current-password' : 'new-password'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw(s => ({ ...s, [field]: !s[field] }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-primary transition-colors"
                          aria-label={showPw[field] ? 'Hide password' : 'Show password'}
                        >
                          {showPw[field] ? '🙈' : '👁️'}
                        </button>
                      </div>
                    </FormField>
                  );
                })}

                {/* Password strength indicator */}
                {pwForm.next && (
                  <div className="space-y-1.5">
                    {[
                      { label: 'At least 8 characters', ok: pwForm.next.length >= 8 },
                      { label: 'Contains uppercase letter', ok: /[A-Z]/.test(pwForm.next) },
                      { label: 'Contains a number', ok: /[0-9]/.test(pwForm.next) },
                      { label: 'Passwords match', ok: pwForm.next === pwForm.confirm && pwForm.confirm.length > 0 },
                    ].map(({ label, ok }) => (
                      <div key={label} className="flex items-center gap-2 text-xs">
                        <span className={ok ? 'text-success' : 'text-[var(--color-text-secondary)]'}>
                          {ok ? '✓' : '○'}
                        </span>
                        <span className={ok ? 'text-success' : 'text-[var(--color-text-secondary)]'}>{label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex justify-end">
                <Button variant="primary" onClick={handleChangePassword} disabled={isSavingPw}>
                  {isSavingPw ? <><Spinner size="sm" color="white" />&nbsp;Updating…</> : 'Update Password'}
                </Button>
              </div>
            </Card>
          )}

          {/* ── NOTIFICATIONS SECTION ── */}
          {activeSection === 'notifications' && (
            <Card>
              <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-2">Notification Preferences</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">Choose which notifications you receive. Critical security notifications cannot be disabled.</p>

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">In-App & Email</p>
                <Toggle
                  checked={notifPrefs.notif_booking_confirmed}
                  onChange={v => setNotifPrefs(p => ({ ...p, notif_booking_confirmed: v }))}
                  label="Booking confirmations"
                  sub="When a session is confirmed or cancelled"
                />
                <Toggle
                  checked={notifPrefs.notif_session_reminder}
                  onChange={v => setNotifPrefs(p => ({ ...p, notif_session_reminder: v }))}
                  label="Session reminders"
                  sub="30 minutes before a scheduled session"
                />
                <Toggle
                  checked={notifPrefs.notif_streak_alerts}
                  onChange={v => setNotifPrefs(p => ({ ...p, notif_streak_alerts: v }))}
                  label="Streak alerts"
                  sub="When your study streak is at risk of breaking"
                />
                <Toggle
                  checked={notifPrefs.notif_plan_expiry}
                  onChange={v => setNotifPrefs(p => ({ ...p, notif_plan_expiry: v }))}
                  label="Plan expiry reminders"
                  sub="3 days before your subscription expires"
                />
                <Toggle
                  checked={notifPrefs.notif_weekly_summary}
                  onChange={v => setNotifPrefs(p => ({ ...p, notif_weekly_summary: v }))}
                  label="Weekly progress summary"
                  sub="Your study stats every Sunday"
                />
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">WhatsApp</p>
                <Toggle
                  checked={notifPrefs.notif_whatsapp}
                  onChange={v => setNotifPrefs(p => ({ ...p, notif_whatsapp: v }))}
                  label="WhatsApp notifications"
                  sub="Receive booking and reminder messages on WhatsApp"
                />
              </div>

              <div className="pt-4 border-t border-[var(--color-border)] flex justify-end">
                <Button variant="primary" onClick={handleSaveNotifications} disabled={isSavingNotif}>
                  {isSavingNotif ? <><Spinner size="sm" color="white" />&nbsp;Saving…</> : 'Save Preferences'}
                </Button>
              </div>
            </Card>
          )}

          {/* ── ACCOUNT SECTION ── */}
          {activeSection === 'account' && (
            <div className="space-y-4">
              {/* Subscription */}
              <SubscriptionCard planTier={profile?.plan_tier ?? 'free'} planExpiresAt={profile?.plan_expires_at ?? null} onUpgradeSuccess={fetchProfile} />

              {/* Logout */}
              <Card>
                <h2 className="text-lg font-heading font-bold text-[var(--color-text)] mb-2">Sign Out</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">Sign out of your account on this device.</p>
                <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
              </Card>

              {/* Danger zone */}
              <Card className="border-error/30">
                <h2 className="text-lg font-heading font-bold text-error mb-2">Danger Zone</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>

                {!showDeleteConfirm ? (
                  <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>Delete Account</Button>
                ) : (
                  <div className="space-y-3 p-4 rounded-xl border border-error/30 bg-error/5">
                    <p className="text-sm font-semibold text-error">Type <strong>DELETE</strong> to confirm account deletion:</p>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={e => setDeleteConfirmText(e.target.value)}
                      className={inputClass()}
                      placeholder="Type DELETE"
                    />
                    <div className="flex gap-3">
                      <Button variant="ghost" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}>
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        disabled={deleteConfirmText !== 'DELETE'}
                        onClick={() => toast.error('Account deletion requires admin action. Contact support@nursefiti.com')}
                      >
                        Confirm Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
