"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Modal } from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

interface Session {
  id: string;
  tutor_id: string;
  tutor_name: string;
  tutor_avatar: string | null;
  session_date: string;
  start_time: string;
  end_time: string;
  topic: string | null;
  platform: string;
  join_link: string | null;
  cadre: string;
  gross_amount: number;
  status: string;
  payment_status: string;
  reviewed: boolean;
  booked_at: string;
  completed_at: string | null;
}

const STATUS_STYLES: Record<string, { variant: 'teal' | 'amber' | 'green' | 'secondary' | 'error'; label: string }> = {
  confirmed:       { variant: 'green',     label: 'Confirmed' },
  pending_approval:{ variant: 'amber',     label: 'Pending Approval' },
  completed:       { variant: 'teal',      label: 'Completed' },
  cancelled:       { variant: 'secondary', label: 'Cancelled' },
  no_show:         { variant: 'error',     label: 'No Show' },
};

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default function BookingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [reviewModal, setReviewModal] = useState<{ sessionId: string; tutorId: string; tutorName: string } | null>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, review_text: '', keywords: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const payment = searchParams.get('payment');
    if (payment === 'success') {
      toast.success('Payment successful! Your session is confirmed.');
      router.replace('/bookings', { scroll: false });
    } else if (payment === 'pending') {
      toast('Payment is still processing — your session will be confirmed once M-Pesa confirms. Check back in a moment.', { icon: '⏳', duration: 8000 });
      router.replace('/bookings', { scroll: false });
    } else if (payment === 'failed') {
      toast.error('Payment was not completed. You can try paying again from your bookings below.');
      router.replace('/bookings', { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data, error } = await supabase
        .from('sessions')
        .select('id, tutor_id, session_date, start_time, end_time, topic, platform, join_link, cadre, gross_amount, status, payment_status, reviewed, booked_at, completed_at')
        .eq('student_id', user.id)
        .order('session_date', { ascending: false });

      if (error) throw error;

      const sessArr = (data ?? []) as any[];
      const tutorIds = Array.from(new Set(sessArr.map(s => s.tutor_id)));
      let tutorMap: Record<string, { full_name: string; avatar_url: string | null }> = {};
      if (tutorIds.length > 0) {
        const { data: profiles } = await supabase.from('profiles').select('id, full_name, avatar_url').in('id', tutorIds);
        tutorMap = Object.fromEntries((profiles ?? []).map((p: any) => [p.id, { full_name: p.full_name, avatar_url: p.avatar_url }]));
      }

      setSessions(sessArr.map(s => ({
        id: s.id,
        tutor_id: s.tutor_id,
        tutor_name: tutorMap[s.tutor_id]?.full_name ?? 'Tutor',
        tutor_avatar: tutorMap[s.tutor_id]?.avatar_url ?? null,
        session_date: s.session_date,
        start_time: s.start_time,
        end_time: s.end_time,
        topic: s.topic,
        platform: s.platform,
        join_link: s.join_link,
        cadre: s.cadre,
        gross_amount: s.gross_amount,
        status: s.status,
        payment_status: s.payment_status,
        reviewed: s.reviewed ?? false,
        booked_at: s.booked_at,
        completed_at: s.completed_at,
      })));
    } catch (err) {
      console.error('Bookings fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [router, supabase]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  const today = new Date().toISOString().split('T')[0];
  const upcomingSessions = sessions.filter(s =>
    (s.session_date >= today && ['confirmed', 'pending_approval'].includes(s.status))
  );
  const pastSessions = sessions.filter(s =>
    s.status === 'completed' || s.status === 'cancelled' || s.status === 'no_show' ||
    (s.session_date < today && s.status !== 'pending_approval')
  );

  const handleCancelSession = async (sessionId: string, sessionDate: string, startTime: string) => {
    const sessionDateObj = new Date(`${sessionDate}T${startTime}`);
    const now = new Date();
    const hoursUntil = (sessionDateObj.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntil < 24) {
      toast.error('Sessions can only be cancelled at least 24 hours in advance.');
      return;
    }

    setCancellingId(sessionId);
    try {
      const { error } = await (supabase as any)
        .from('sessions')
        .update({ status: 'cancelled' })
        .eq('id', sessionId);

      if (error) throw error;
      toast.success('Session cancelled successfully.');
      fetchSessions();
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to cancel session.');
    } finally {
      setCancellingId(null);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewModal) return;
    setIsSubmittingReview(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const keywords = reviewForm.keywords
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);

      const { error: reviewError } = await supabase
        .from('session_reviews')
        .insert({
          session_id: reviewModal.sessionId,
          student_id: user.id,
          tutor_id: reviewModal.tutorId,
          rating: reviewForm.rating,
          review_text: reviewForm.review_text || null,
          keywords: keywords.length > 0 ? keywords : null,
          is_published: true,
        } as any);

      if (reviewError) throw reviewError;

      // Mark session as reviewed
      await (supabase as any).from('sessions').update({ reviewed: true }).eq('id', reviewModal.sessionId);

      // Update tutor average rating via API (students can't write tutor_profiles directly)
      await fetch('/api/tutor/update-rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tutorId: reviewModal.tutorId }),
      });

      toast.success('Review submitted! Thank you.');
      setReviewModal(null);
      setReviewForm({ rating: 5, review_text: '', keywords: '' });
      fetchSessions();
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const displayedSessions = tab === 'upcoming' ? upcomingSessions : pastSessions;

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">My Bookings</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage your tutoring sessions</p>
        </div>
        <Link href="/tutors">
          <Button variant="primary" size="sm">+ Book a Session</Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] w-fit">
        {(['upcoming', 'past'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              tab === t
                ? 'bg-primary text-white shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            {t} {t === 'upcoming' ? `(${upcomingSessions.length})` : `(${pastSessions.length})`}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><Spinner size="lg" color="primary" /></div>
      ) : displayedSessions.length === 0 ? (
        <Card className="text-center py-16">
          <div className="text-5xl mb-4">{tab === 'upcoming' ? '📅' : '📖'}</div>
          <h3 className="font-heading font-bold text-[var(--color-text)] mb-2">
            {tab === 'upcoming' ? 'No upcoming sessions' : 'No past sessions'}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            {tab === 'upcoming' ? 'Book a session with a verified tutor to get started' : 'Your completed sessions will appear here'}
          </p>
          {tab === 'upcoming' && (
            <Link href="/tutors"><Button variant="primary">Find a Tutor</Button></Link>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {displayedSessions.map(session => {
            const statusStyle = STATUS_STYLES[session.status] ?? { variant: 'secondary' as const, label: session.status };
            const sessionDateTime = new Date(`${session.session_date}T${session.start_time}`);
            const isToday = session.session_date === today;
            const canJoin = isToday && session.status === 'confirmed' && session.join_link;
            const canCancel = session.status === 'confirmed' || session.status === 'pending_approval';
            const canReview = session.status === 'completed' && !session.reviewed;

            return (
              <Card key={session.id} padding="sm">
                <div className="flex items-start gap-4">
                  {/* Date block */}
                  <div className="flex-shrink-0 w-14 text-center rounded-xl p-2 bg-primary/8 border border-primary/15">
                    <p className="text-xs font-bold text-primary uppercase">
                      {sessionDateTime.toLocaleDateString('en-KE', { month: 'short' })}
                    </p>
                    <p className="text-2xl font-heading font-bold text-primary leading-none">
                      {sessionDateTime.getDate()}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {sessionDateTime.toLocaleDateString('en-KE', { weekday: 'short' })}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-[var(--color-text)]">{session.tutor_name}</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          {formatTime(session.start_time)} – {formatTime(session.end_time)} · {session.platform}
                        </p>
                        {session.topic && (
                          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">📚 {session.topic}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={statusStyle.variant} size="sm">{statusStyle.label}</Badge>
                        {session.payment_status === 'paid' && <Badge variant="green" size="sm">✓ Paid</Badge>}
                        {session.payment_status === 'pending' && session.status === 'confirmed' && (
                          <Badge variant="amber" size="sm">Payment Pending</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="text-sm font-semibold text-accent">KSh {session.gross_amount.toLocaleString()}</span>
                      <Badge variant="secondary" size="sm">{session.cadre}</Badge>

                      {/* Pay now if pending payment */}
                      {session.status === 'confirmed' && session.payment_status === 'pending' && (
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch('/api/intasend/initialize', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ type: 'session_booking', amountKsh: session.gross_amount, referenceId: session.id }),
                              });
                              if (!res.ok) {
                                const errData = await res.json().catch(() => ({}));
                                throw new Error(errData?.error ?? `Request failed with status ${res.status}`);
                              }
                              const data = await res.json();
                              if (data.checkout_url) {
                                window.location.href = data.checkout_url;
                              } else {
                                throw new Error(data.error ?? 'Payment initialization failed');
                              }
                            } catch (err: any) {
                              toast.error(err?.message ?? 'Payment failed. Please try again.');
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-accent text-dark text-xs font-bold hover:bg-accent/80 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}

                      {/* Join session */}
                      {canJoin && (
                        <a href={session.join_link!} target="_blank" rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-success text-white text-xs font-bold hover:bg-success/80 transition-colors">
                          🎥 {session.platform === 'Google Meet' ? 'Join Google Meet' : 'Join Session'}
                        </a>
                      )}
                      {/* Google Meet pending link — session is today but no link yet */}
                      {isToday && session.status === 'confirmed' && session.platform === 'Google Meet' && !session.join_link && (
                        <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                          ⏳ Meet link pending from tutor
                        </span>
                      )}

                      {/* Cancel */}
                      {canCancel && (
                        <button
                          onClick={() => handleCancelSession(session.id, session.session_date, session.start_time)}
                          disabled={cancellingId === session.id}
                          className="px-3 py-1 rounded-lg bg-error/10 text-error text-xs font-semibold hover:bg-error/20 transition-colors disabled:opacity-50"
                        >
                          {cancellingId === session.id ? '...' : 'Cancel'}
                        </button>
                      )}

                      {/* Leave review */}
                      {canReview && (
                        <button
                          onClick={() => setReviewModal({ sessionId: session.id, tutorId: session.tutor_id, tutorName: session.tutor_name })}
                          className="px-3 py-1 rounded-lg bg-accent/10 text-accent-dark dark:text-accent text-xs font-semibold hover:bg-accent/20 transition-colors"
                        >
                          ⭐ Leave Review
                        </button>
                      )}

                      {session.reviewed && (
                        <span className="text-xs text-success font-medium">✓ Reviewed</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={!!reviewModal}
        onClose={() => !isSubmittingReview && setReviewModal(null)}
        title={`Review — ${reviewModal?.tutorName}`}
      >
        <div className="space-y-4">
          {/* Star rating */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                  className={`text-3xl transition-transform hover:scale-110 ${star <= reviewForm.rating ? 'text-accent' : 'text-neutral-border'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
              Review <span className="text-[var(--color-text-secondary)] font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Share your experience with this tutor..."
              value={reviewForm.review_text}
              onChange={e => setReviewForm(f => ({ ...f, review_text: e.target.value }))}
              className="input text-sm w-full resize-none"
              rows={4}
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
              Keywords <span className="text-[var(--color-text-secondary)] font-normal">(comma-separated, optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. patient, knowledgeable, clear explanations"
              value={reviewForm.keywords}
              onChange={e => setReviewForm(f => ({ ...f, keywords: e.target.value }))}
              className="input text-sm w-full"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setReviewModal(null)} disabled={isSubmittingReview}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={handleSubmitReview} disabled={isSubmittingReview}>
              {isSubmittingReview ? <Spinner size="sm" color="white" /> : 'Submit Review'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
