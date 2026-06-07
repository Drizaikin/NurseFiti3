"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

interface TutorProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  professional_title: string;
  bio: string | null;
  years_experience: number;
  cadres_taught: string[];
  specialties: string[] | null;
  rate_per_hour: number;
  verification_tier: string | null;
  average_rating: number;
  total_students: number;
  total_sessions: number;
  pass_rate: number;
  is_accepting_bookings: boolean;
  allow_instant_booking: boolean;
  allow_group_sessions: boolean;
  session_platform: string[];
  buffer_minutes: number;
}

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Review {
  id: string;
  rating: number;
  review_text: string | null;
  keywords: string[] | null;
  created_at: string;
  student_name: string;
  student_cadre: string;
}

interface BookingSlot {
  date: Date;
  start_time: string;
  end_time: string;
  day_of_week: number;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sz = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} className={`${sz} ${star <= Math.round(rating) ? 'text-accent' : 'text-neutral-border'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getNext14Days(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function TutorProfilePage() {
  const router = useRouter();
  const params = useParams();
  const tutorId = params.id as string;
  const supabase = createClient();

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Array<{ session_date: string; start_time: string }>>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [studentCadre, setStudentCadre] = useState<string>('');

  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [bookingForm, setBookingForm] = useState({
    topic: '',
    platform: '',
    student_note: '',
  });
  const [isBooking, setIsBooking] = useState(false);

  // Realtime channel ref
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setCurrentUserId(user.id);

      const [tutorRes, profileRes, studentRes, availRes, sessionsRes, reviewsRes] = await Promise.all([
        supabase.from('tutor_profiles').select('*').eq('id', tutorId).eq('verification_status', 'verified').maybeSingle(),
        supabase.from('profiles').select('full_name, avatar_url').eq('id', tutorId).maybeSingle(),
        supabase.from('student_profiles').select('cadre').eq('id', user.id).maybeSingle(),
        supabase.from('tutor_availability').select('id, day_of_week, start_time, end_time').eq('tutor_id', tutorId).eq('is_active', true),
        supabase.from('sessions').select('session_date, start_time').eq('tutor_id', tutorId).in('status', ['confirmed', 'pending_approval']).gte('session_date', new Date().toISOString().split('T')[0]),
        supabase.from('session_reviews').select('id, rating, review_text, keywords, created_at, student_id').eq('tutor_id', tutorId).eq('is_published', true).order('created_at', { ascending: false }).limit(10),
      ]);

      if (!tutorRes.data || !profileRes.data) {
        router.push('/tutors');
        return;
      }

      const t = tutorRes.data as any;
      setTutor({
        id: tutorId,
        full_name: (profileRes.data as any).full_name,
        avatar_url: (profileRes.data as any).avatar_url,
        professional_title: t.professional_title ?? '',
        bio: t.bio ?? null,
        years_experience: t.years_experience ?? 0,
        cadres_taught: t.cadres_taught ?? [],
        specialties: t.specialties ?? null,
        rate_per_hour: t.rate_per_hour ?? 0,
        verification_tier: t.verification_tier ?? null,
        average_rating: t.average_rating ?? 0,
        total_students: t.total_students ?? 0,
        total_sessions: t.total_sessions ?? 0,
        pass_rate: t.pass_rate ?? 0,
        is_accepting_bookings: t.is_accepting_bookings ?? false,
        allow_instant_booking: t.allow_instant_booking ?? false,
        allow_group_sessions: t.allow_group_sessions ?? false,
        session_platform: t.session_platform ?? ['Zoom'],
        buffer_minutes: t.buffer_minutes ?? 30,
      });

      setAvailability((availRes.data ?? []) as AvailabilitySlot[]);
      setBookedSlots((sessionsRes.data ?? []) as any[]);
      setStudentCadre((studentRes.data as any)?.cadre ?? '');

      // Fetch reviewer names
      const reviewData = (reviewsRes.data ?? []) as any[];
      if (reviewData.length > 0) {
        const studentIds = reviewData.map((r: any) => r.student_id);
        const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', studentIds);
        const nameMap = Object.fromEntries((names ?? []).map((n: any) => [n.id, n.full_name]));
        const { data: cadres } = await supabase.from('student_profiles').select('id, cadre').in('id', studentIds);
        const cadreMap = Object.fromEntries((cadres ?? []).map((c: any) => [c.id, c.cadre]));
        setReviews(reviewData.map((r: any) => ({
          id: r.id,
          rating: r.rating,
          review_text: r.review_text,
          keywords: r.keywords,
          created_at: r.created_at,
          student_name: nameMap[r.student_id] ?? 'Student',
          student_cadre: cadreMap[r.student_id] ?? '',
        })));
      }
    } catch (err) {
      console.error('Tutor profile error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [tutorId, router, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Supabase Realtime — subscribe to availability changes
  useEffect(() => {
    if (!tutorId) return;

    const channel = supabase
      .channel(`tutor-availability-${tutorId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tutor_availability',
        filter: `tutor_id=eq.${tutorId}`,
      }, () => {
        // Refresh availability on any change
        supabase.from('tutor_availability').select('id, day_of_week, start_time, end_time')
          .eq('tutor_id', tutorId).eq('is_active', true)
          .then(({ data }) => setAvailability((data ?? []) as AvailabilitySlot[]));
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'sessions',
        filter: `tutor_id=eq.${tutorId}`,
      }, () => {
        // Refresh booked slots on any session change
        supabase.from('sessions').select('session_date, start_time')
          .eq('tutor_id', tutorId)
          .in('status', ['confirmed', 'pending_approval'])
          .gte('session_date', new Date().toISOString().split('T')[0])
          .then(({ data }) => setBookedSlots((data ?? []) as any[]));
      })
      .subscribe();

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [tutorId, supabase]);

  const isSlotBooked = (date: Date, startTime: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedSlots.some(s => s.session_date === dateStr && s.start_time === startTime);
  };

  const isSlotAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    return availability.filter(a => a.day_of_week === dayOfWeek);
  };

  const getAvailableSlotsForDate = (date: Date): BookingSlot[] => {
    const slots = isSlotAvailable(date);
    return slots
      .filter(s => !isSlotBooked(date, s.start_time))
      .map(s => ({ date, start_time: s.start_time, end_time: s.end_time, day_of_week: date.getDay() }));
  };

  const handleSelectSlot = (slot: BookingSlot) => {
    if (!tutor) return;
    setSelectedSlot(slot);
    // Default to Google Meet if available, otherwise first platform
    const preferredPlatform = tutor.session_platform.includes('Google Meet')
      ? 'Google Meet'
      : tutor.session_platform[0] ?? 'Google Meet';
    setBookingForm({ topic: '', platform: preferredPlatform, student_note: '' });
    setShowBookingModal(true);
  };

  const handleBookSession = async () => {
    if (!selectedSlot || !tutor || !currentUserId) return;

    if (currentUserId === tutorId) {
      toast.error('You cannot book a session with yourself.');
      return;
    }

    setIsBooking(true);

    try {
      const sessionDate = selectedSlot.date.toISOString().split('T')[0];
      const [startH, startM] = selectedSlot.start_time.split(':').map(Number);
      const [endH, endM] = selectedSlot.end_time.split(':').map(Number);
      const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      const grossAmount = Math.round((durationMinutes / 60) * tutor.rate_per_hour);

      // Use the atomic RPC to prevent race-condition double-bookings.
      // The function also computes platform_fee (15%) and net_amount server-side.
      const { data: sessionId, error: sessionError } = await (supabase as any).rpc(
        'create_booking_atomic',
        {
          p_tutor_id: tutorId,
          p_student_id: currentUserId,
          p_session_date: sessionDate,
          p_start_time: selectedSlot.start_time,
          p_end_time: selectedSlot.end_time,
          p_cadre: studentCadre || tutor.cadres_taught[0],
          p_topic: bookingForm.topic || null,
          p_platform: bookingForm.platform,
          p_duration_minutes: durationMinutes,
          p_rate_per_hour: tutor.rate_per_hour,
        }
      );

      if (sessionError) {
        if (sessionError.message?.includes('slot_already_booked')) {
          throw new Error('This slot was just booked by someone else. Please choose a different time.');
        }
        throw sessionError;
      }

      if (!sessionId) throw new Error('Failed to create session');

      // If non-instant booking, update status to pending_approval
      if (!tutor.allow_instant_booking) {
        await (supabase as any).from('sessions').update({ status: 'pending_approval' }).eq('id', sessionId);
      }

      // Save student note if provided
      if (bookingForm.student_note) {
        await (supabase as any).from('sessions').update({ student_note: bookingForm.student_note }).eq('id', sessionId);
      }

      setShowBookingModal(false);

      if (tutor.allow_instant_booking) {
        await initiatePayment(sessionId as string, grossAmount);
      } else {
        toast.success('Booking request sent! The tutor will confirm shortly.');
        router.push('/bookings');
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const initiatePayment = async (sessionId: string, amountKsh: number) => {
    try {
      const res = await fetch('/api/intasend/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'session_booking',
          amountKsh,
          referenceId: sessionId,
          metadata: { session_id: sessionId },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? `Payment initialization failed (${res.status})`);
      }
      if (!data.checkout_url) {
        throw new Error(data.error ?? 'No checkout URL returned');
      }
      window.location.href = data.checkout_url;
    } catch (err: any) {
      toast.error(err?.message ?? 'Payment failed. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  }

  if (!tutor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <p className="text-[var(--color-text)] mb-4">Tutor not found</p>
          <Link href="/tutors"><Button variant="primary">Browse Tutors</Button></Link>
        </Card>
      </div>
    );
  }

  const next14Days = getNext14Days();

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      {/* Back */}
      <Link href="/tutors" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-primary transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tutors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Profile */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <div className="text-center mb-4">
              <Avatar name={tutor.full_name} src={tutor.avatar_url} size="xl" className="mx-auto mb-3" />
              <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
                <h1 className="text-xl font-heading font-bold text-[var(--color-text)]">{tutor.full_name}</h1>
                {tutor.verification_tier === 'gold' && <Badge variant="warning" size="sm">⭐ Gold</Badge>}
                {tutor.verification_tier === 'standard' && <Badge variant="teal" size="sm">✓ Verified</Badge>}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{tutor.professional_title}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <StarRating rating={tutor.average_rating} size="md" />
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  {tutor.average_rating > 0 ? tutor.average_rating.toFixed(1) : 'New'}
                </span>
                {reviews.length > 0 && <span className="text-xs text-[var(--color-text-secondary)]">({reviews.length} reviews)</span>}
              </div>
            </div>

            {tutor.bio && (
              <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">{tutor.bio}</p>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Experience</span>
                <span className="font-semibold text-[var(--color-text)]">{tutor.years_experience} years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Students</span>
                <span className="font-semibold text-[var(--color-text)]">{tutor.total_students}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-secondary)]">Sessions</span>
                <span className="font-semibold text-[var(--color-text)]">{tutor.total_sessions}</span>
              </div>
              {tutor.pass_rate > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-secondary)]">Pass Rate</span>
                  <span className="font-semibold text-success">{tutor.pass_rate.toFixed(0)}%</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-text-secondary)]">Rate</span>
                <span className="text-lg font-bold text-accent">KSh {tutor.rate_per_hour.toLocaleString()}/hr</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Teaches</p>
              <div className="flex flex-wrap gap-1">
                {tutor.cadres_taught.map(c => <Badge key={c} variant="teal" size="sm">{c}</Badge>)}
              </div>
            </div>

            {tutor.specialties && tutor.specialties.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {tutor.specialties.map(s => <Badge key={s} variant="secondary" size="sm">{s}</Badge>)}
                </div>
              </div>
            )}

            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Platforms</p>
              <div className="flex flex-wrap gap-1">
                {tutor.session_platform.map(p => <Badge key={p} variant="secondary" size="sm">{p}</Badge>)}
              </div>
            </div>

            {!tutor.is_accepting_bookings && (
              <div className="mt-4 p-3 rounded-xl bg-error/10 border border-error/20">
                <p className="text-xs text-error font-medium text-center">Not accepting bookings at this time</p>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Availability + Reviews */}
        <div className="lg:col-span-2 space-y-5">
          {/* Availability Calendar */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-heading font-bold text-[var(--color-text)]">Available Slots</h2>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                <span className="w-2.5 h-2.5 rounded-full bg-success inline-block" />
                Live updates
              </div>
            </div>

            {availability.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-sm text-[var(--color-text-secondary)]">No availability set yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {next14Days.map(date => {
                  const slots = getAvailableSlotsForDate(date);
                  if (slots.length === 0) return null;
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div key={date.toISOString()} className="border border-[var(--color-border)] rounded-xl p-3">
                      <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">
                        {isToday ? 'Today' : DAYS_FULL[date.getDay()]},{' '}
                        {date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {slots.map(slot => (
                          <button
                            key={slot.start_time}
                            onClick={() => tutor.is_accepting_bookings && handleSelectSlot(slot)}
                            disabled={!tutor.is_accepting_bookings}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              tutor.is_accepting_bookings
                                ? 'bg-success/10 border-success/30 text-success hover:bg-success/20 cursor-pointer'
                                : 'bg-neutral-border/20 border-neutral-border text-neutral-mid cursor-not-allowed opacity-60'
                            }`}
                          >
                            {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {next14Days.every(d => getAvailableSlotsForDate(d).length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-3xl mb-2">🗓️</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">No available slots in the next 14 days</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Reviews */}
          {reviews.length > 0 && (
            <Card>
              <h2 className="text-base font-heading font-bold text-[var(--color-text)] mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-[var(--color-border)] last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-text)]">{review.student_name}</p>
                        {review.student_cadre && (
                          <Badge variant="secondary" size="sm">{review.student_cadre}</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <StarRating rating={review.rating} />
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                          {new Date(review.created_at).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    {review.review_text && (
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">{review.review_text}</p>
                    )}
                    {review.keywords && review.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {review.keywords.map(k => <Badge key={k} variant="secondary" size="sm">{k}</Badge>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => !isBooking && setShowBookingModal(false)}
        title="Book a Session"
      >
        {selectedSlot && tutor && (
          <div className="space-y-4">
            {/* Session summary */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Date</p>
                  <p className="font-semibold text-[var(--color-text)]">
                    {selectedSlot.date.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Time</p>
                  <p className="font-semibold text-[var(--color-text)]">
                    {formatTime(selectedSlot.start_time)} – {formatTime(selectedSlot.end_time)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Duration</p>
                  <p className="font-semibold text-[var(--color-text)]">
                    {(() => {
                      const [sh, sm] = selectedSlot.start_time.split(':').map(Number);
                      const [eh, em] = selectedSlot.end_time.split(':').map(Number);
                      const totalMins = (eh * 60 + em) - (sh * 60 + sm);
                      const hrs = Math.floor(totalMins / 60);
                      const mins = totalMins % 60;
                      if (mins === 0) return `${hrs} hour${hrs !== 1 ? 's' : ''}`;
                      if (hrs === 0) return `${mins} min`;
                      return `${hrs} hr ${mins} min`;
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Amount</p>
                  <p className="font-bold text-accent">
                    KSh {(() => {
                      const [sh, sm] = selectedSlot.start_time.split(':').map(Number);
                      const [eh, em] = selectedSlot.end_time.split(':').map(Number);
                      const totalMins = (eh * 60 + em) - (sh * 60 + sm);
                      return Math.round((totalMins / 60) * tutor.rate_per_hour).toLocaleString();
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                Topic / Focus Area <span className="text-[var(--color-text-secondary)] font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Pharmacology, Medical-Surgical Nursing..."
                value={bookingForm.topic}
                onChange={e => setBookingForm(f => ({ ...f, topic: e.target.value }))}
                className="input text-sm w-full"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Platform</label>
              <div className="flex flex-wrap gap-2">
                {tutor.session_platform.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setBookingForm(f => ({ ...f, platform: p }))}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      bookingForm.platform === p
                        ? 'border-primary bg-primary text-white shadow-glow-teal'
                        : 'border-[var(--color-border)] text-[var(--color-text)] hover:border-primary/40 hover:bg-primary-light'
                    }`}
                  >
                    {p === 'Google Meet' && <span>🎥</span>}
                    {p === 'Zoom' && <span>💻</span>}
                    {p === 'WhatsApp' && <span>📱</span>}
                    {p}
                    {p === 'Google Meet' && <span className="text-xs opacity-70">(Recommended)</span>}
                  </button>
                ))}
              </div>
              {bookingForm.platform === 'Google Meet' && (
                <p className="text-xs text-[var(--color-text-secondary)] mt-2 flex items-start gap-1.5">
                  <span>ℹ️</span>
                  <span>The tutor will add a Google Meet link before the session. You&apos;ll find the join button in your Bookings page.</span>
                </p>
              )}
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                Note to Tutor <span className="text-[var(--color-text-secondary)] font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Any specific areas you need help with..."
                value={bookingForm.student_note}
                onChange={e => setBookingForm(f => ({ ...f, student_note: e.target.value }))}
                className="input text-sm w-full resize-none"
                rows={3}
              />
            </div>

            {/* Booking type info */}
            <div className={`p-3 rounded-xl text-xs ${tutor.allow_instant_booking ? 'bg-success/10 border border-success/20 text-success' : 'bg-accent/10 border border-accent/20 text-accent-dark dark:text-accent'}`}>
              {tutor.allow_instant_booking
                ? '⚡ Instant booking — you\'ll be redirected to payment immediately'
                : '⏳ This tutor requires approval — you\'ll be notified when confirmed'}
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="ghost" className="flex-1" onClick={() => setShowBookingModal(false)} disabled={isBooking}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleBookSession} disabled={isBooking}>
                {isBooking ? <Spinner size="sm" color="white" /> : tutor.allow_instant_booking ? 'Book & Pay' : 'Send Request'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
