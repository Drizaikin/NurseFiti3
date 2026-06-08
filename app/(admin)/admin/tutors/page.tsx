"use client";

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

interface Tutor {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  professional_title: string;
  cadres_taught: string[];
  years_experience: number;
  verification_status: string;
  verification_tier: string | null;
  average_rating: number;
  total_sessions: number;
  rate_per_hour: number;
  nck_reg_number: string;
  bio: string | null;
  current_employer: string | null;
  nck_certificate_url: string | null;
  academic_qualification_url: string | null;
  national_id_url: string | null;
  mpesa_number: string | null;
  rejection_reason: string | null;
  created_at: string;
  is_locked: boolean;
}

type ConfirmAction =
  | { type: 'lock';   tutor: Tutor }
  | { type: 'unlock'; tutor: Tutor }
  | { type: 'delete'; tutor: Tutor };

const STATUS_BADGE: Record<string, 'green' | 'amber' | 'red'> = {
  verified: 'green',
  pending:  'amber',
  rejected: 'red',
};

export default function AdminTutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [verifyModal, setVerifyModal] = useState<Tutor | null>(null);
  const [verifyTier, setVerifyTier] = useState<'standard' | 'gold'>('standard');
  const [rejectModal, setRejectModal] = useState<Tutor | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  const getSignedUrl = async (path: string | null, bucket = 'documents'): Promise<string | null> => {
    if (!path) return null;
    // Return cached URL if already fetched
    if (signedUrls[path]) return signedUrls[path];
    try {
      const res = await fetch(`/api/admin/signed-url?path=${encodeURIComponent(path)}&bucket=${bucket}`);
      const data = await res.json();
      if (data.url) {
        setSignedUrls(prev => ({ ...prev, [path]: data.url }));
        return data.url;
      }
    } catch { /* ignore */ }
    return null;
  };

  const handleExpand = async (tutor: Tutor) => {
    const isOpening = expanded !== tutor.id;
    setExpanded(isOpening ? tutor.id : null);
    if (isOpening) {
      // Pre-fetch signed URLs for all three documents
      await Promise.all([
        getSignedUrl(tutor.nck_certificate_url),
        getSignedUrl(tutor.academic_qualification_url),
        getSignedUrl(tutor.national_id_url),
      ]);
    }
  };

  const loadTutors = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/data?type=tutors');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setTutors(data.tutors ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tutors');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadTutors(); }, [loadTutors]);

  const filtered = tutors.filter(t => {
    const matchSearch = t.full_name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.nck_reg_number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || t.verification_status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleVerify = async () => {
    if (!verifyModal) return;
    setActionLoading(verifyModal.id);
    try {
      const res = await fetch('/api/admin/verify-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorId: verifyModal.id, status: 'verified', tier: verifyTier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success(`${verifyModal.full_name} verified as ${verifyTier}`);
      setVerifyModal(null);
      await loadTutors();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal || !rejectReason.trim()) { toast.error('Enter a rejection reason'); return; }
    setActionLoading(rejectModal.id);
    try {
      const res = await fetch('/api/admin/verify-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorId: rejectModal.id, status: 'rejected', reason: rejectReason.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      toast.success('Tutor application rejected');
      setRejectModal(null);
      setRejectReason('');
      await loadTutors();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirmedAction = async () => {
    if (!confirmAction) return;
    const { tutor } = confirmAction;
    setActionLoading(tutor.id);
    try {
      const res = await fetch('/api/admin/manage-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: tutor.id, action: confirmAction.type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed');
      if (confirmAction.type === 'delete') {
        toast.success(`${tutor.full_name}'s account has been deleted`);
      } else if (confirmAction.type === 'lock') {
        toast.success(`${tutor.full_name}'s account has been locked`);
      } else {
        toast.success(`${tutor.full_name}'s account has been unlocked`);
      }
      setConfirmAction(null);
      await loadTutors();
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
          <h1 className="text-2xl font-heading font-bold text-primary">Manage Tutors</h1>
          <p className="text-neutral-mid text-sm mt-1">
            {isLoading ? 'Loading…' : `${tutors.length} registered tutor${tutors.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button onClick={loadTutors} className="text-xs text-primary hover:underline">↻ Refresh</button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, or NCK number…"
          className="flex-1 min-w-[200px] max-w-sm px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <div className="flex gap-2">
          {(['all', 'pending', 'verified', 'rejected'] as const).map(f => (
            <button key={f} onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors capitalize ${filterStatus === f ? 'bg-primary text-white' : 'bg-[var(--color-card)] border border-[var(--color-border)] text-neutral-mid hover:border-primary/40'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16"><Spinner size="lg" color="primary" /></div>
      ) : error ? (
        <Card className="text-center py-8">
          <p className="text-error mb-3">{error}</p>
          <Button variant="primary" size="sm" onClick={loadTutors}>Retry</Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(t => (
            <Card key={t.id}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-[var(--color-text)]">{t.full_name}</p>
                    <Badge variant={STATUS_BADGE[t.verification_status] ?? 'secondary'} size="sm">
                      {t.verification_status}
                    </Badge>
                    {t.verification_tier && (
                      <Badge variant={t.verification_tier === 'gold' ? 'amber' : 'teal'} size="sm">
                        {t.verification_tier} tier
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-neutral-mid">{t.professional_title}</p>
                  <p className="text-xs text-neutral-mid mt-1">{t.email} · {t.phone}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-mid">
                    <span>NCK: <strong className="text-[var(--color-text)]">{t.nck_reg_number}</strong></span>
                    <span>{t.years_experience} yrs exp</span>
                    <span>KSh {t.rate_per_hour}/hr</span>
                    <span>⭐ {t.average_rating > 0 ? t.average_rating.toFixed(1) : '—'}</span>
                    <span>{t.total_sessions} sessions</span>
                    <span>Cadres: {t.cadres_taught.join(', ') || '—'}</span>
                  </div>
                  <p className="text-xs text-neutral-mid mt-1">
                    Registered {new Date(t.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>

                  {/* Expand/collapse details */}
                  <button
                    onClick={() => handleExpand(t)}
                    className="text-xs text-primary hover:underline mt-2"
                  >
                    {expanded === t.id ? '▲ Hide details' : '▼ View profile & documents'}
                  </button>

                  {/* Expanded profile + documents */}
                  {expanded === t.id && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)] space-y-4">

                      {/* Profile details */}
                      {t.bio && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-mid mb-1">Bio</p>
                          <p className="text-sm text-[var(--color-text)]">{t.bio}</p>
                        </div>
                      )}
                      {t.current_employer && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-mid mb-1">Current Employer</p>
                          <p className="text-sm text-[var(--color-text)]">{t.current_employer}</p>
                        </div>
                      )}
                      {t.mpesa_number && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-neutral-mid mb-1">M-Pesa Number</p>
                          <p className="text-sm text-[var(--color-text)]">{t.mpesa_number}</p>
                        </div>
                      )}

                      {/* Documents */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-mid mb-2">Uploaded Documents</p>
                        <div className="space-y-2">
                          {[
                            { label: 'NCK Certificate',          path: t.nck_certificate_url },
                            { label: 'Academic Qualification',   path: t.academic_qualification_url },
                            { label: 'National ID / Passport',   path: t.national_id_url },
                          ].map(({ label, path }) => {
                            const signedUrl = path ? signedUrls[path] : null;
                            return (
                              <div key={label} className="flex items-center gap-3 p-2 rounded-xl border border-[var(--color-border)]">
                                <span className="text-xl">📄</span>
                                <span className="text-sm text-[var(--color-text-secondary)] flex-1">{label}</span>
                                {path ? (
                                  signedUrl ? (
                                    <a
                                      href={signedUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-mid transition-colors"
                                    >
                                      Open →
                                    </a>
                                  ) : (
                                    <span className="text-xs text-neutral-mid">Loading…</span>
                                  )
                                ) : (
                                  <span className="text-xs text-error font-semibold px-3 py-1.5">Not uploaded</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Rejection reason if any */}
                      {t.rejection_reason && (
                        <div className="p-3 rounded-xl bg-error/5 border border-error/20">
                          <p className="text-xs font-bold text-error mb-1">Previous Rejection Reason</p>
                          <p className="text-sm text-[var(--color-text)]">{t.rejection_reason}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {t.verification_status === 'pending' && (
                    <>
                      <Button variant="primary" size="sm"
                        onClick={() => { setVerifyModal(t); setVerifyTier('standard'); }}
                        disabled={actionLoading !== null}>
                        ✓ Verify
                      </Button>
                      <Button variant="outline" size="sm"
                        onClick={() => { setRejectModal(t); setRejectReason(''); }}
                        disabled={actionLoading !== null}>
                        ✗ Reject
                      </Button>
                    </>
                  )}
                  {t.verification_status === 'verified' && (
                    <Button variant="ghost" size="sm"
                      onClick={() => { setRejectModal(t); setRejectReason(''); }}
                      disabled={actionLoading !== null}>
                      Revoke
                    </Button>
                  )}
                  {t.verification_status === 'rejected' && (
                    <Button variant="outline" size="sm"
                      onClick={() => { setVerifyModal(t); setVerifyTier('standard'); }}
                      disabled={actionLoading !== null}>
                      Re-verify
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <Card className="text-center py-10">
              <p className="text-neutral-mid">
                {search || filterStatus !== 'all' ? 'No tutors match your filter.' : 'No tutors registered yet.'}
              </p>
            </Card>
          )}
        </div>
      )}

      {/* Verify modal */}
      {verifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-heading font-bold mb-1">Verify Tutor</h3>
            <p className="text-sm text-neutral-mid mb-4">{verifyModal.full_name} · {verifyModal.professional_title}</p>
            <p className="text-sm font-semibold mb-2">Verification tier:</p>
            <div className="space-y-2 mb-4">
              {[
                { value: 'standard' as const, label: 'Standard', desc: 'Verified NCK-registered tutor' },
                { value: 'gold' as const,     label: 'Gold ⭐',  desc: '5+ reviews, 4.8+ rating, examiner background' },
              ].map(opt => (
                <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${verifyTier === opt.value ? 'border-primary bg-primary-light' : 'border-[var(--color-border)] hover:border-primary/40'}`}>
                  <input type="radio" name="tier" value={opt.value} checked={verifyTier === opt.value}
                    onChange={() => setVerifyTier(opt.value)} className="sr-only" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{opt.label}</p>
                    <p className="text-xs text-neutral-mid">{opt.desc}</p>
                  </div>
                  {verifyTier === opt.value && <span className="ml-auto text-primary mt-0.5">✓</span>}
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setVerifyModal(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={handleVerify} disabled={actionLoading !== null}>
                {actionLoading ? <Spinner size="sm" color="white" /> : 'Approve'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-heading font-bold mb-1">
              {rejectModal.verification_status === 'verified' ? 'Revoke Verification' : 'Reject Application'}
            </h3>
            <p className="text-sm text-neutral-mid mb-3">{rejectModal.full_name}</p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] text-sm bg-[var(--color-card)] focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              placeholder="Reason (shown to tutor)…" />
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" className="flex-1" onClick={() => setRejectModal(null)}>Cancel</Button>
              <Button variant="danger" className="flex-1" onClick={handleReject}
                disabled={actionLoading !== null || !rejectReason.trim()}>
                {actionLoading ? <Spinner size="sm" color="white" /> : 'Confirm'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
