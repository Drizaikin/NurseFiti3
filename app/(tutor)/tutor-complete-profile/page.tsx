"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

// ─── Constants ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, name: 'Specialization',  description: 'Teaching areas & bio' },
  { id: 2, name: 'Documents',       description: 'Upload certificates' },
  { id: 3, name: 'Payment Details', description: 'M-Pesa & session rate' },
];

const CADRES = ['KRCHN', 'BScN', 'Higher Diploma'] as const;

const HIGHER_DIPLOMA_SPECIALTIES = [
  'Critical Care Nursing',
  'Oncology Nursing',
  'Renal Nursing',
  'Psychiatric Nursing',
  'Peri-Operative Nursing',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

// ─── Page ──────────────────────────────────────────────────────────────────

export default function TutorCompleteProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Step 1 — Specialization
  const [cadresTaught, setCadresTaught] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [sessionRate, setSessionRate] = useState(1500);

  // Step 2 — Documents
  const [documents, setDocuments] = useState<{
    nckCertificate: File | null;
    academicQualification: File | null;
    nationalId: File | null;
  }>({ nckCertificate: null, academicQualification: null, nationalId: null });

  // Step 3 — Payment
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  // ── Auth check ──────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);

      // Pre-fill from existing tutor_profiles row if available
      const { data: tutor } = await (supabase as any)
        .from('tutor_profiles')
        .select('cadres_taught, specialties, bio, rate_per_hour, mpesa_number, whatsapp_number')
        .eq('id', user.id)
        .maybeSingle();

      if (tutor) {
        setCadresTaught(tutor.cadres_taught ?? []);
        setSpecialties(tutor.specialties ?? []);
        setBio(tutor.bio ?? '');
        setSessionRate(tutor.rate_per_hour ?? 1500);
        setMpesaNumber(tutor.mpesa_number ?? '');
        setWhatsappNumber(tutor.whatsapp_number ?? '');
      }
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const toggleCadre = (c: string) =>
    setCadresTaught(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const toggleSpecialty = (s: string) =>
    setSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleFileChange = (field: keyof typeof documents, file: File | null) => {
    if (file && file.size > MAX_FILE_SIZE) { toast.error(`${field} must be less than 5 MB`); return; }
    if (file && !ALLOWED_TYPES.includes(file.type)) { toast.error('Only PDF, JPG, or PNG allowed'); return; }
    setDocuments(prev => ({ ...prev, [field]: file }));
  };

  // ── Step validation ─────────────────────────────────────────────────────
  const validateStep = (): boolean => {
    if (currentStep === 1) {
      if (cadresTaught.length === 0) { toast.error('Select at least one cadre you can teach'); return false; }
      if (bio.trim().length < 200) { toast.error('Bio must be at least 200 characters'); return false; }
      if (!sessionRate || sessionRate < 500) { toast.error('Session rate must be at least KSh 500'); return false; }
    }
    if (currentStep === 2) {
      if (!documents.nckCertificate) { toast.error('Upload your NCK certificate'); return false; }
      if (!documents.academicQualification) { toast.error('Upload your academic qualification'); return false; }
      if (!documents.nationalId) { toast.error('Upload your national ID / passport'); return false; }
    }
    if (currentStep === 3) {
      const phoneRegex = /^(\+254|0)(7\d{8}|1\d{8})$/;
      if (!mpesaNumber || !phoneRegex.test(mpesaNumber)) { toast.error('Enter a valid M-Pesa number (e.g. 0712345678)'); return false; }
      if (!whatsappNumber || !phoneRegex.test(whatsappNumber)) { toast.error('Enter a valid WhatsApp number'); return false; }
    }
    return true;
  };

  const nextStep = () => { if (validateStep()) setCurrentStep(s => Math.min(s + 1, 3)); };
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  // ── Submit all 3 steps ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateStep() || !userId) return;
    setIsLoading(true);

    try {
      const timestamp = Date.now();
      const ext = (f: File) => f.name.split('.').pop() ?? 'bin';

      // Upload documents to Supabase Storage
      const uploadFile = async (file: File, name: string): Promise<string> => {
        const path = `tutor-documents/${userId}/${name}-${timestamp}.${ext(file)}`;
        const { error } = await supabase.storage
          .from('documents')
          .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: true });
        if (error) throw new Error(`Failed to upload ${name}: ${error.message}`);
        return path;
      };

      const [nckPath, academicPath, idPath] = await Promise.all([
        uploadFile(documents.nckCertificate!, 'nck-certificate'),
        uploadFile(documents.academicQualification!, 'academic-qualification'),
        uploadFile(documents.nationalId!, 'national-id'),
      ]);

      // Save all completed fields via the API route (uses admin client, bypasses RLS)
      const res = await fetch('/api/tutor/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cadresTaught: cadresTaught,
          specialties,
          bio: bio.trim(),
          sessionRate,
          mpesaNumber,
          whatsappNumber,
          nckCertificateUrl: nckPath,
          academicQualificationUrl: academicPath,
          nationalIdUrl: idPath,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? 'Failed to save profile');

      toast.success('Profile completed! Our team will review your application shortly.');
      // Force Next.js to invalidate the dashboard cache before navigating back
      router.refresh();
      router.push('/tutor-pending');
    } catch (err: any) {
      console.error('[complete-profile]', err);
      toast.error(err.message || 'Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Complete Your Profile</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Finish setting up your tutor profile so we can verify your application.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentStep > step.id ? 'bg-success text-white'
                  : currentStep === step.id ? 'bg-primary text-white'
                  : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <div className="mt-2 text-center hidden md:block">
                  <p className="text-xs font-semibold text-[var(--color-text)]">{step.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{step.description}</p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-1 flex-1 mx-2 transition-colors ${currentStep > step.id ? 'bg-success' : 'bg-[var(--color-border)]'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>

        {/* ── Step 1: Specialization ─────────────────────────────────── */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-1">Specialization</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Tell us about your teaching expertise</p>
            </div>

            {/* Cadres */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Which cadres can you teach? <span className="text-error">*</span>
              </label>
              <div className="space-y-2">
                {CADRES.map(cadre => (
                  <label key={cadre} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cadresTaught.includes(cadre)}
                      onChange={() => toggleCadre(cadre)}
                      className="w-5 h-5 text-primary border-[var(--color-border)] rounded focus:ring-primary"
                    />
                    <span className="text-sm text-[var(--color-text)]">{cadre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Higher Diploma specialties */}
            {cadresTaught.includes('Higher Diploma') && (
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Higher Diploma Specialties <span className="text-xs font-normal text-[var(--color-text-secondary)]">(optional)</span>
                </label>
                <div className="space-y-2">
                  {HIGHER_DIPLOMA_SPECIALTIES.map(spec => (
                    <label key={spec} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={specialties.includes(spec)}
                        onChange={() => toggleSpecialty(spec)}
                        className="w-5 h-5 text-primary border-[var(--color-border)] rounded focus:ring-primary"
                      />
                      <span className="text-sm text-[var(--color-text)]">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Professional Bio <span className="text-error">*</span>
              </label>
              <textarea
                rows={5}
                className="input resize-none"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell students about your experience, teaching style, and what makes you a great tutor..."
              />
              {(() => {
                const trimLen = bio.trim().length;
                return (
                  <p className={`text-xs mt-1 ${trimLen < 200 ? 'text-[var(--color-text-secondary)]' : trimLen > 400 ? 'text-error' : 'text-success'}`}>
                    {trimLen} / 400 characters (minimum 200)
                  </p>
                );
              })()}
            </div>

            {/* Session rate */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Hourly Session Rate (KSh) <span className="text-error">*</span>
              </label>
              <input
                type="number"
                className="input"
                value={sessionRate}
                onChange={e => setSessionRate(Number(e.target.value))}
                placeholder="1500"
                min={500}
                max={10000}
                step={100}
              />
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Set your rate between KSh 500–10,000 per hour</p>
            </div>
          </div>
        )}

        {/* ── Step 2: Documents ──────────────────────────────────────── */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-1">Documents</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Upload your professional certificates and identification</p>
            </div>

            {[
              { field: 'nckCertificate' as const,        label: 'NCK Registration Certificate',      hint: 'Your current NCK practising certificate' },
              { field: 'academicQualification' as const,  label: 'Academic Qualification Certificate', hint: 'Diploma, Degree, or Masters certificate' },
              { field: 'nationalId' as const,             label: 'National ID / Passport',             hint: 'Clear photo or scan of both sides' },
            ].map(({ field, label, hint }) => (
              <div key={field}>
                <label className="block text-sm font-semibold mb-2">
                  {label} <span className="text-error">*</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => handleFileChange(field, e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-[var(--color-text-secondary)]
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary file:text-white
                    hover:file:bg-primary-mid
                    file:cursor-pointer cursor-pointer"
                />
                {documents[field] && (
                  <p className="mt-1 text-sm text-success">✓ {documents[field]!.name}</p>
                )}
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{hint} · PDF, JPG, or PNG (max 5 MB)</p>
              </div>
            ))}

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> All documents will be reviewed by our admin team. Please ensure they are clear and legible.
              </p>
            </div>
          </div>
        )}

        {/* ── Step 3: Payment Details ────────────────────────────────── */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-1">Payment Details</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">How should we pay you for your tutoring sessions?</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                M-Pesa Number <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                className="input"
                value={mpesaNumber}
                onChange={e => setMpesaNumber(e.target.value)}
                placeholder="0712345678"
              />
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                This is where you&apos;ll receive payments for completed sessions
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                WhatsApp Number <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                className="input"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="0712345678"
              />
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                For session coordination and student communication
              </p>
            </div>

            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Payment Terms</h3>
              <ul className="text-sm text-teal-800 dark:text-teal-200 space-y-1">
                <li>• NurseFiti takes a 23% platform fee</li>
                <li>• Payments are processed weekly every Monday</li>
                <li>• Minimum payout threshold: KSh 1,000</li>
                <li>• You&apos;ll receive 77% of your session rate</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <div className="mt-8 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep} disabled={isLoading}>
              ← Previous
            </Button>
          ) : (
            <Button type="button" variant="ghost" onClick={() => router.push('/tutor-pending')} disabled={isLoading}>
              ← Back
            </Button>
          )}

          {currentStep < 3 ? (
            <Button type="button" variant="primary" onClick={nextStep} disabled={isLoading} className="ml-auto">
              Next →
            </Button>
          ) : (
            <Button type="button" variant="primary" onClick={handleSubmit} disabled={isLoading} className="ml-auto">
              {isLoading
                ? <><Spinner size="sm" color="white" />&nbsp;Saving…</>
                : 'Submit & Complete Profile'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
