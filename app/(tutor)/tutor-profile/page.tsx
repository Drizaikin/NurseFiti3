"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Toggle } from '@/components/ui/Toggle';
import { AvatarUpload } from '@/components/shared/AvatarUpload';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const CADRES = ['KRCHN', 'BScN', 'Higher Diploma'];
const HD_SPECIALTIES = ['Critical Care Nursing', 'Oncology Nursing', 'Renal Nursing', 'Psychiatric Nursing', 'Peri-Operative Nursing'];
const PLATFORMS = ['Zoom', 'Google Meet', 'WhatsApp'];

interface ProfileForm {
  full_name: string;
  professional_title: string;
  bio: string;
  whatsapp_number: string;
  years_experience: number;
  cadres_taught: string[];
  specialties: string[];
  rate_per_hour: number;
  session_platform: string[];
  is_accepting_bookings: boolean;
  is_anonymous: boolean;
  pseudonym: string;
}

interface VerificationStatus {
  identity: boolean;
  nck: boolean;
  academic: boolean;
  mpesa: boolean;
  verification_tier: string | null;
  nck_reg_number: string;
}

export default function TutorProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState<ProfileForm>({
    full_name: '', professional_title: '', bio: '', whatsapp_number: '',
    years_experience: 0, cadres_taught: [], specialties: [], rate_per_hour: 1500,
    session_platform: ['Zoom', 'Google Meet', 'WhatsApp'], is_accepting_bookings: true,
    is_anonymous: false, pseudonym: '',
  });
  const [verification, setVerification] = useState<VerificationStatus>({
    identity: false, nck: false, academic: false, mpesa: false,
    verification_tier: null, nck_reg_number: '',
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ total_students: 0, total_sessions: 0, average_rating: 0, pass_rate: 0 });

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
      await loadProfile(user.id);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfile = async (uid: string) => {
    const [profileRes, tutorRes] = await Promise.all([
      supabase.from('profiles').select('full_name, avatar_url').eq('id', uid).maybeSingle(),
      supabase.from('tutor_profiles').select('*').eq('id', uid).maybeSingle(),
    ]);
    const profile = profileRes.data as any;
    const tutor = tutorRes.data as any;
    if (!profile || !tutor) return;

    setAvatarUrl(profile.avatar_url ?? null);
    setForm({
      full_name: profile.full_name ?? '',
      professional_title: tutor.professional_title ?? '',
      bio: tutor.bio ?? '',
      whatsapp_number: tutor.whatsapp_number ?? '',
      years_experience: tutor.years_experience ?? 0,
      cadres_taught: tutor.cadres_taught ?? [],
      specialties: tutor.specialties ?? [],
      rate_per_hour: tutor.rate_per_hour ?? 1500,
      session_platform: tutor.session_platform ?? ['Zoom', 'Google Meet', 'WhatsApp'],
      is_accepting_bookings: tutor.is_accepting_bookings ?? true,
      is_anonymous: tutor.is_anonymous ?? false,
      pseudonym: tutor.pseudonym ?? '',
    });
    setVerification({
      identity: !!tutor.national_id_url,
      nck: !!tutor.nck_certificate_url,
      academic: !!tutor.academic_qualification_url,
      mpesa: !!tutor.mpesa_number,
      verification_tier: tutor.verification_tier ?? null,
      nck_reg_number: tutor.nck_reg_number ?? '',
    });
    setStats({
      total_students: tutor.total_students ?? 0,
      total_sessions: tutor.total_sessions ?? 0,
      average_rating: tutor.average_rating ?? 0,
      pass_rate: tutor.pass_rate ?? 0,
    });
  };

  const toggleCadre = (cadre: string) => {
    setForm(f => ({
      ...f,
      cadres_taught: f.cadres_taught.includes(cadre)
        ? f.cadres_taught.filter(c => c !== cadre)
        : [...f.cadres_taught, cadre],
    }));
  };

  const toggleSpecialty = (spec: string) => {
    setForm(f => ({
      ...f,
      specialties: f.specialties.includes(spec)
        ? f.specialties.filter(s => s !== spec)
        : [...f.specialties, spec],
    }));
  };

  const togglePlatform = (platform: string) => {
    setForm(f => ({
      ...f,
      session_platform: f.session_platform.includes(platform)
        ? f.session_platform.filter(p => p !== platform)
        : [...f.session_platform, platform],
    }));
  };

  const saveProfile = async () => {
    if (!userId) return;
    if (!form.bio || form.bio.length < 200) { toast.error('Bio must be at least 200 characters'); return; }
    if (form.cadres_taught.length === 0) { toast.error('Select at least one cadre'); return; }
    if (form.is_anonymous && !form.pseudonym.trim()) { toast.error('You must set a pseudonym if you want to be anonymous'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/tutor/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save profile');
      toast.success('Profile saved!');
      // Reload so verification status reflects latest DB state
      await loadProfile(userId);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">My Profile</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">This is what students see when browsing tutors</p>
        </div>
        <Button variant="primary" onClick={saveProfile} disabled={saving}>
          {saving ? <Spinner size="sm" color="white" /> : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Edit form */}
        <div className="lg:col-span-2 space-y-5">

          {/* Basic info */}
          <Card>
            <h2 className="text-lg font-heading font-bold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Full Name *</label>
                <input className="input text-sm" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Professional Title *</label>
                <input className="input text-sm" placeholder="e.g., RN, BScN, MSc Clinical Nursing" value={form.professional_title} onChange={e => setForm(f => ({ ...f, professional_title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Years of Experience</label>
                  <input type="number" className="input text-sm" min={0} max={50} value={form.years_experience} onChange={e => setForm(f => ({ ...f, years_experience: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">WhatsApp Number</label>
                  <input className="input text-sm" placeholder="+254712345678" value={form.whatsapp_number} onChange={e => setForm(f => ({ ...f, whatsapp_number: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">
                  Bio * <span className="text-xs font-normal text-[var(--color-text-secondary)]">(200–400 characters)</span>
                </label>
                <textarea className="input resize-none text-sm" rows={4} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
                <p className={`text-xs mt-1 ${form.bio.length < 200 ? 'text-error' : form.bio.length > 400 ? 'text-error' : 'text-success'}`}>
                  {form.bio.length} / 400 characters
                </p>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">Teach Anonymously</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Hide your real name and profile picture from students</p>
                  </div>
                  <Toggle checked={form.is_anonymous} onChange={v => setForm(f => ({ ...f, is_anonymous: v }))} />
                </div>
                {form.is_anonymous && (
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Your Pseudonym *</label>
                    <input className="input text-sm" placeholder="e.g., Nurse Tutor J, Mentor 42" value={form.pseudonym} onChange={e => setForm(f => ({ ...f, pseudonym: e.target.value }))} />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Specialisation */}
          <Card>
            <h2 className="text-lg font-heading font-bold mb-4">Specialisation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Cadres You Teach *</label>
                <div className="flex flex-wrap gap-2">
                  {CADRES.map(c => (
                    <button key={c} type="button" onClick={() => toggleCadre(c)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${form.cadres_taught.includes(c) ? 'border-primary bg-primary-light text-primary' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              {form.cadres_taught.includes('Higher Diploma') && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Higher Diploma Specialties</label>
                  <div className="flex flex-wrap gap-2">
                    {HD_SPECIALTIES.map(s => (
                      <button key={s} type="button" onClick={() => toggleSpecialty(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${form.specialties.includes(s) ? 'border-primary bg-primary-light text-primary' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-primary/40'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Session settings */}
          <Card>
            <h2 className="text-lg font-heading font-bold mb-4">Session Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Rate per Hour (KSh)</label>
                <input type="number" className="input text-sm" min={500} max={10000} step={100} value={form.rate_per_hour} onChange={e => setForm(f => ({ ...f, rate_per_hour: Number(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Session Platforms</label>
                <div className="flex gap-3">
                  {PLATFORMS.map(p => (
                    <button key={p} type="button" onClick={() => togglePlatform(p)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${form.session_platform.includes(p) ? 'border-primary bg-primary-light text-primary' : 'border-[var(--color-border)] text-[var(--color-text-secondary)]'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">Accepting Bookings</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Students can book sessions with you</p>
                </div>
                <Toggle checked={form.is_accepting_bookings} onChange={v => setForm(f => ({ ...f, is_accepting_bookings: v }))} />
              </div>
            </div>
          </Card>
        </div>

        {/* Live preview + verification */}
        <div className="space-y-4 sticky top-24">

          {/* Verification status */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-3">Verification Status</h3>
            <div className="space-y-2">
              {[
                { label: 'Identity Verified', ok: verification.identity },
                { label: 'NCK Registration', ok: verification.nck },
                { label: 'Academic Credentials', ok: verification.academic },
                { label: 'M-Pesa Linked', ok: verification.mpesa },
              ].map(v => (
                <div key={v.label} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">{v.label}</span>
                  <span className={v.ok ? 'text-success font-semibold' : 'text-[var(--color-text-secondary)]'}>
                    {v.ok ? '✅' : '⏳'}
                  </span>
                </div>
              ))}
              {verification.nck_reg_number && (
                <div className="pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
                  NCK Reg: <span className="font-semibold text-[var(--color-text)]">{verification.nck_reg_number}</span>
                </div>
              )}
            </div>
            {verification.verification_tier && (
              <div className="mt-3">
                <Badge variant={verification.verification_tier === 'gold' ? 'warning' : 'teal'}>
                  {verification.verification_tier === 'gold' ? '⭐ Gold Tutor' : '✓ Standard Verified'}
                </Badge>
              </div>
            )}
          </Card>

          {/* Live preview */}
          <Card className="border-primary/20">
            <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">Student View Preview</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {form.is_anonymous ? (
                  <div className="w-12 h-12 rounded-full bg-neutral-border/30 flex items-center justify-center text-neutral-mid shrink-0">
                    <span className="text-xl">🕵️</span>
                  </div>
                ) : (
                  <AvatarUpload
                    userId={userId!}
                    currentUrl={avatarUrl}
                    name={form.full_name}
                    size="md"
                    onUploaded={setAvatarUrl}
                    showNudge={true}
                  />
                )}
                <div>
                  <p className="font-heading font-bold text-sm text-[var(--color-text)]">
                    {form.is_anonymous ? (form.pseudonym || 'Your Pseudonym') : (form.full_name || 'Your Name')}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{form.professional_title || 'Professional Title'}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-primary-xlight rounded-lg p-2">
                  <p className="font-bold text-primary">{stats.total_students}</p>
                  <p className="text-[var(--color-text-secondary)]">Students</p>
                </div>
                <div className="bg-primary-xlight rounded-lg p-2">
                  <p className="font-bold text-primary">{stats.average_rating.toFixed(1)}</p>
                  <p className="text-[var(--color-text-secondary)]">Rating</p>
                </div>
                <div className="bg-accent-light rounded-lg p-2">
                  <p className="font-bold text-accent-dark">KSh {(form.rate_per_hour / 1000).toFixed(1)}k</p>
                  <p className="text-[var(--color-text-secondary)]">per hr</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {form.cadres_taught.map(c => <Badge key={c} variant="teal" size="sm">{c}</Badge>)}
              </div>
              {form.bio && (
                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3">{form.bio}</p>
              )}
              <button className="w-full py-2 rounded-xl text-sm font-bold text-dark" style={{ background: 'linear-gradient(135deg, #F5A623, #C47F0A)' }}>
                Book Session
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
