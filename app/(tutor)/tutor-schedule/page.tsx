"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { Spinner } from '@/components/ui/Spinner';
import { Modal } from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7AM–8PM

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  is_recurring: boolean;
  specific_date: string | null;
}

interface BookedSession {
  id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  student_name: string;
  topic: string | null;
  platform: string;
  status: string;
  join_link: string | null;
  proposed_amount: number | null;
  agreed_amount: number | null;
  gross_amount: number;
  pricing_status: string;
}

interface TutorPrefs {
  allow_instant_booking: boolean;
  allow_group_sessions: boolean;
  buffer_minutes: number;
  rate_per_hour: number;
  session_platform: string[];
  is_accepting_bookings: boolean;
  allow_price_negotiation: boolean;
  min_negotiated_rate: number;
}

interface MeetLinkModal {
  sessionId: string;
  studentName: string;
  sessionDate: string;
  startTime: string;
  existingLink: string | null;
}

interface SlotPickerState {
  dayOfWeek: number;
  hour: number;
  date: Date;
  anchorRect: DOMRect;
}

function formatHour(h: number) {
  if (h === 12) return '12 PM';
  if (h > 12) return `${h - 12} PM`;
  return `${h} AM`;
}

function toDateStr(d: Date) {
  // Use local date parts to avoid UTC offset shifting the date
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ── Mini Calendar Component ───────────────────────────────────────────────────
interface MiniCalendarProps {
  availability: AvailabilitySlot[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

function MiniCalendar({ availability, onDateClick, selectedDate }: MiniCalendarProps) {
  const today = new Date();
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = calMonth.getFullYear();
  const month = calMonth.getMonth();
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build set of dates that have availability in this month
  // For recurring: project forward — every matching day_of_week in this month
  // For one-time: just the specific_date
  const recurringDow = new Set(
    availability.filter(a => a.is_active && a.is_recurring).map(a => a.day_of_week)
  );
  const oneTimeDates = new Set(
    availability.filter(a => a.is_active && !a.is_recurring && a.specific_date).map(a => a.specific_date!)
  );

  const hasAvailability = (date: Date): { recurring: boolean; oneTime: boolean } => {
    const dateStr = toDateStr(date);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateMidnight < todayMidnight) return { recurring: false, oneTime: false };
    return {
      recurring: recurringDow.has(date.getDay()),
      oneTime: oneTimeDates.has(dateStr),
    };
  };

  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = calMonth.toLocaleDateString('en-KE', { month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setCalMonth(new Date(year, month - 1, 1))}
          className="p-1 rounded hover:bg-primary-light transition-colors"
        >
          <svg className="w-4 h-4 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-[var(--color-text)]">{monthLabel}</span>
        <button
          onClick={() => setCalMonth(new Date(year, month + 1, 1))}
          className="p-1 rounded hover:bg-primary-light transition-colors"
        >
          <svg className="w-4 h-4 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-[var(--color-text-secondary)] py-1">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const isToday = toDateStr(date) === toDateStr(today);
          const isSelected = selectedDate && toDateStr(date) === toDateStr(selectedDate);
          const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isPast = new Date(date.getFullYear(), date.getMonth(), date.getDate()) < todayMidnight;
          const { recurring, oneTime } = hasAvailability(date);
          const hasAny = recurring || oneTime;

          return (
            <button
              key={i}
              onClick={() => !isPast && onDateClick(date)}
              disabled={isPast}
              className={`relative flex flex-col items-center justify-center h-8 w-full rounded-lg text-xs font-medium transition-all
                ${isSelected ? 'bg-primary text-white' : ''}
                ${isToday && !isSelected ? 'ring-1 ring-primary text-primary font-bold' : ''}
                ${isPast ? 'opacity-30 cursor-not-allowed' : !isSelected ? 'hover:bg-primary-light cursor-pointer' : ''}
                ${!isSelected && !isToday && !isPast ? 'text-[var(--color-text)]' : ''}
              `}
            >
              <span>{date.getDate()}</span>
              {hasAny && !isSelected && (
                <span className="absolute bottom-0.5 flex gap-0.5">
                  {recurring && <span className="w-1 h-1 rounded-full bg-success inline-block" />}
                  {oneTime  && <span className="w-1 h-1 rounded-full bg-primary inline-block" />}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dot legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--color-border)]">
        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-2 h-2 rounded-full bg-success inline-block" /> Recurring
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" /> One-time
        </span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TutorSchedulePage() {
  const router = useRouter();
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [sessions, setSessions] = useState<BookedSession[]>([]);
  const [prefs, setPrefs] = useState<TutorPrefs>({
    allow_instant_booking: true,
    allow_group_sessions: false,
    buffer_minutes: 30,
    rate_per_hour: 1500,
    session_platform: ['Zoom', 'Google Meet', 'WhatsApp'],
    is_accepting_bookings: true,
    allow_price_negotiation: false,
    min_negotiated_rate: 1000,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [slotPicker, setSlotPicker] = useState<SlotPickerState | null>(null);
  const [calSelectedDate, setCalSelectedDate] = useState<Date | null>(null);
  const [meetModal, setMeetModal] = useState<MeetLinkModal | null>(null);
  const [meetLinkInput, setMeetLinkInput] = useState('');
  const [savingMeetLink, setSavingMeetLink] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // ── Week helpers ──────────────────────────────────────────────────────────
  const getWeekStart = useCallback(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff + weekOffset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [weekOffset]);

  // Compute weekOffset for a given date
  const weekOffsetForDate = (date: Date): number => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const currentMonday = new Date(now); currentMonday.setDate(diff); currentMonday.setHours(0,0,0,0);
    const targetMonday = new Date(date);
    const td = targetMonday.getDay();
    const tdiff = targetMonday.getDate() - td + (td === 0 ? -6 : 1);
    targetMonday.setDate(tdiff); targetMonday.setHours(0,0,0,0);
    return Math.round((targetMonday.getTime() - currentMonday.getTime()) / (7 * 24 * 60 * 60 * 1000));
  };

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
      await Promise.all([loadAvailability(user.id), loadSessions(user.id), loadPrefs(user.id)]);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId) loadSessions(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekOffset, userId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setSlotPicker(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Data loaders ──────────────────────────────────────────────────────────
  const loadAvailability = async (uid: string) => {
    const { data } = await supabase.from('tutor_availability').select('*').eq('tutor_id', uid);
    setAvailability((data ?? []) as AvailabilitySlot[]);
  };

  const loadSessions = async (uid: string) => {
    const weekStart = getWeekStart();
    const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 7);
    const { data: sessData } = await supabase.from('sessions')
      .select('id, session_date, start_time, end_time, topic, platform, status, student_id, join_link, proposed_amount, agreed_amount, gross_amount, pricing_status')
      .eq('tutor_id', uid)
      .gte('session_date', toDateStr(weekStart))
      .lt('session_date', toDateStr(weekEnd))
      .in('status', ['confirmed', 'pending_approval', 'completed']);
    const sessArr = (sessData ?? []) as any[];
    const studentIds = Array.from(new Set(sessArr.map(s => s.student_id)));
    let nameMap: Record<string, string> = {};
    if (studentIds.length > 0) {
      const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', studentIds);
      nameMap = Object.fromEntries((names ?? []).map((n: any) => [n.id, n.full_name]));
    }
    setSessions(sessArr.map(s => ({
      id: s.id, session_date: s.session_date, start_time: s.start_time, end_time: s.end_time,
      student_name: nameMap[s.student_id] ?? 'Student', topic: s.topic, platform: s.platform,
      status: s.status, join_link: s.join_link ?? null,
      proposed_amount: s.proposed_amount ?? null,
      agreed_amount: s.agreed_amount ?? null,
      gross_amount: s.gross_amount ?? 0,
      pricing_status: s.pricing_status ?? 'standard',
    })));
  };

  const loadPrefs = async (uid: string) => {
    const { data } = await supabase.from('tutor_profiles')
      .select('allow_instant_booking, allow_group_sessions, buffer_minutes, rate_per_hour, session_platform, is_accepting_bookings, allow_price_negotiation, min_negotiated_rate')
      .eq('id', uid).maybeSingle();
    if (data) setPrefs(data as TutorPrefs);
  };

  // ── Slot helpers ──────────────────────────────────────────────────────────
  const isSlotPast = (date: Date, hour: number): boolean => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const slotDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (slotDay < today) return true;
    if (slotDay.getTime() === today.getTime() && hour < now.getHours()) return true;
    return false;
  };

  const findActiveSlot = (dayOfWeek: number, hour: number, date: Date): AvailabilitySlot | undefined => {
    const startTime = `${String(hour).padStart(2, '0')}:00:00`;
    const dateStr = toDateStr(date);
    const oneTime = availability.find(
      a => !a.is_recurring && a.specific_date === dateStr && a.start_time === startTime && a.is_active
    );
    if (oneTime) return oneTime;
    return availability.find(
      a => a.is_recurring && a.day_of_week === dayOfWeek && a.start_time === startTime && a.is_active
    );
  };

  const getSlotStatus = (dayOfWeek: number, hour: number, date: Date) => {
    const startTime = `${String(hour).padStart(2, '0')}:00:00`;
    const dateStr = toDateStr(date);
    const booked = sessions.find(s => s.session_date === dateStr && s.start_time === startTime);
    if (booked) return { type: 'booked' as const, session: booked };
    if (!isSlotPast(date, hour)) {
      const avail = findActiveSlot(dayOfWeek, hour, date);
      if (avail) return { type: 'available' as const, slot: avail };
    }
    return { type: 'empty' as const };
  };

  // Get all active slots for a specific date (for the day detail panel)
  const getSlotsForDate = (date: Date): AvailabilitySlot[] => {
    const dateStr = toDateStr(date);
    const dow = date.getDay();
    const result: AvailabilitySlot[] = [];
    const seenTimes = new Set<string>();
    // One-time slots first
    availability.filter(a => a.is_active && !a.is_recurring && a.specific_date === dateStr)
      .forEach(a => { result.push(a); seenTimes.add(a.start_time); });
    // Recurring slots (only if no one-time overrides that time)
    availability.filter(a => a.is_active && a.is_recurring && a.day_of_week === dow)
      .forEach(a => { if (!seenTimes.has(a.start_time)) result.push(a); });
    return result.sort((a, b) => a.start_time.localeCompare(b.start_time));
  };

  // ── Slot mutations ────────────────────────────────────────────────────────
  const removeSlot = async (slot: AvailabilitySlot) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('tutor_availability')
      .update({ is_active: false }).eq('id', slot.id);
    if (!error) {
      setAvailability(prev => prev.map(a => a.id === slot.id ? { ...a, is_active: false } : a));
      toast.success('Slot removed');
    }
  };

  const addSlot = async (dayOfWeek: number, hour: number, date: Date, isRecurring: boolean) => {
    if (!userId) return;
    const startTime = `${String(hour).padStart(2, '0')}:00:00`;
    const endTime   = `${String(hour + 1).padStart(2, '0')}:00:00`;
    const dateStr   = toDateStr(date);
    const existing = availability.find(a =>
      isRecurring
        ? a.is_recurring && a.day_of_week === dayOfWeek && a.start_time === startTime
        : !a.is_recurring && a.specific_date === dateStr && a.start_time === startTime
    );
    if (existing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('tutor_availability')
        .update({ is_active: true }).eq('id', existing.id);
      if (!error) {
        setAvailability(prev => prev.map(a => a.id === existing.id ? { ...a, is_active: true } : a));
        toast.success(isRecurring ? 'Recurring slot added' : 'One-time slot added');
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).from('tutor_availability').insert({
        tutor_id: userId, day_of_week: dayOfWeek, start_time: startTime, end_time: endTime,
        is_active: true, is_recurring: isRecurring, specific_date: isRecurring ? null : dateStr,
      }).select().single();
      if (!error && data) {
        setAvailability(prev => [...prev, data as AvailabilitySlot]);
        toast.success(isRecurring ? 'Recurring slot added' : 'One-time slot added');
      } else if (error) {
        toast.error('Could not save slot');
      }
    }
    setSlotPicker(null);
  };

  const handleCellClick = (e: React.MouseEvent<HTMLButtonElement>, dayOfWeek: number, hour: number, date: Date) => {
    const status = getSlotStatus(dayOfWeek, hour, date);
    if (status.type === 'booked') return;
    if (status.type === 'available') { removeSlot(status.slot); return; }
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    setSlotPicker({ dayOfWeek, hour, date, anchorRect: rect });
  };

  // Calendar date click — jump week grid to that week and select the date
  const handleCalendarDateClick = (date: Date) => {
    setCalSelectedDate(date);
    setWeekOffset(weekOffsetForDate(date));
  };

  // ── Meet link ─────────────────────────────────────────────────────────────
  const handleOpenMeetModal = (session: BookedSession) => {
    setMeetLinkInput(session.join_link ?? '');
    setMeetModal({
      sessionId: session.id,
      studentName: session.student_name,
      sessionDate: session.session_date,
      startTime: session.start_time,
      existingLink: session.join_link,
    });
  };

  const handleSaveMeetLink = async () => {
    if (!meetModal) return;
    setSavingMeetLink(true);
    try {
      const { data: { session: authSession } } = await supabase.auth.getSession();
      const token = authSession?.access_token;
      if (!token) throw new Error('Not authenticated');

      const body: Record<string, string> = { sessionId: meetModal.sessionId };
      if (meetLinkInput.trim()) body.meetLink = meetLinkInput.trim();

      const res = await fetch('/api/sessions/meet-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save meet link');

      // Update local state
      setSessions(prev => prev.map(s =>
        s.id === meetModal.sessionId ? { ...s, join_link: data.meetLink } : s
      ));

      toast.success('Google Meet link saved! Student has been notified.');
      setMeetModal(null);
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to save meet link');
    } finally {
      setSavingMeetLink(false);
    }
  };

  // ── Pricing negotiation ───────────────────────────────────────────────────
  const [pricingModal, setPricingModal] = useState<{ session: BookedSession; counterAmount: string } | null>(null);

  const handlePricingResponse = async (session: BookedSession, action: 'accept' | 'counter' | 'decline', counterAmount?: number) => {
    try {
      if (action === 'accept') {
        await (supabase as any).from('sessions').update({
          agreed_amount: session.proposed_amount,
          pricing_status: 'agreed',
        }).eq('id', session.id);
        setSessions(prev => prev.map(s => s.id === session.id
          ? { ...s, agreed_amount: session.proposed_amount, pricing_status: 'agreed' }
          : s
        ));
        toast.success('Rate accepted. Student will be notified to proceed with payment.');
      } else if (action === 'counter' && counterAmount) {
        if (counterAmount < 800) { toast.error('Minimum rate is KSh 800'); return; }
        await (supabase as any).from('sessions').update({
          agreed_amount: counterAmount,
          pricing_status: 'agreed',
        }).eq('id', session.id);
        setSessions(prev => prev.map(s => s.id === session.id
          ? { ...s, agreed_amount: counterAmount, pricing_status: 'agreed' }
          : s
        ));
        toast.success(`Counter offer of KSh ${counterAmount.toLocaleString()} set. Student will be notified.`);
      } else if (action === 'decline') {
        await (supabase as any).from('sessions').update({
          pricing_status: 'declined',
          agreed_amount: session.gross_amount,
        }).eq('id', session.id);
        setSessions(prev => prev.map(s => s.id === session.id
          ? { ...s, pricing_status: 'declined', agreed_amount: session.gross_amount }
          : s
        ));
        toast('Proposal declined. Session will proceed at standard rate.', { icon: 'ℹ️' });
      }
      setPricingModal(null);
    } catch {
      toast.error('Failed to update pricing. Please try again.');
    }
  };

  // ── Prefs save ────────────────────────────────────────────────────────────
  const savePrefs = async () => {
    if (!userId) return;
    if (prefs.allow_price_negotiation && prefs.min_negotiated_rate < 1000) {
      toast.error('Minimum negotiated rate must be at least KSh 1,000');
      return;
    }
    setSaving(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('tutor_profiles').update({
      allow_instant_booking: prefs.allow_instant_booking,
      allow_group_sessions: prefs.allow_group_sessions,
      buffer_minutes: prefs.buffer_minutes,
      rate_per_hour: prefs.rate_per_hour,
      is_accepting_bookings: prefs.is_accepting_bookings,
      allow_price_negotiation: prefs.allow_price_negotiation,
      min_negotiated_rate: prefs.min_negotiated_rate,
    }).eq('id', userId);
    setSaving(false);
    if (error) toast.error('Failed to save preferences');
    else toast.success('Preferences saved!');
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" color="primary" />
    </div>
  );

  const weekStart = getWeekStart();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart); d.setDate(d.getDate() + i); return d;
  });

  // Slots for the selected calendar date (for the detail panel)
  const selectedDateSlots = calSelectedDate ? getSlotsForDate(calSelectedDate) : [];

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Schedule & Availability</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Click any slot to set availability. Choose <strong>Recurring</strong> to repeat every week, or <strong>One-time</strong> for that date only.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 rounded-lg border border-[var(--color-border)] hover:bg-primary-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setWeekOffset(0)} className="px-3 py-1.5 text-sm font-medium rounded-lg border border-[var(--color-border)] hover:bg-primary-light transition-colors">Today</button>
          <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-lg border border-[var(--color-border)] hover:bg-primary-light transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

        {/* ── Week grid ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 relative">
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="w-16 p-3 text-xs text-[var(--color-text-secondary)] font-medium text-left">Time</th>
                    {weekDays.map((d, i) => {
                      const isToday = d.toDateString() === new Date().toDateString();
                      const isCalSelected = calSelectedDate && toDateStr(d) === toDateStr(calSelectedDate);
                      const dayDateStr = toDateStr(d);
                      const hasBookings = sessions.some(s => s.session_date === dayDateStr && s.status !== 'completed');
                      return (
                        <th key={i} className={`p-3 text-center ${isCalSelected ? 'bg-primary/5 rounded-t-lg' : ''}`}>
                          <p className={`text-xs font-semibold ${isToday ? 'text-primary' : 'text-[var(--color-text-secondary)]'}`}>{DAYS[d.getDay()]}</p>
                          <p className={`text-lg font-heading font-bold ${isToday ? 'text-primary' : isCalSelected ? 'text-primary' : 'text-[var(--color-text)]'}`}>{d.getDate()}</p>
                          {hasBookings && (
                            <span className="block w-1.5 h-1.5 rounded-full bg-accent mx-auto mt-0.5" title="Has bookings" />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {HOURS.map(hour => (
                    <tr key={hour} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="p-2 text-xs text-[var(--color-text-secondary)] font-medium whitespace-nowrap">{formatHour(hour)}</td>
                      {weekDays.map((d, di) => {
                        const status = getSlotStatus(d.getDay(), hour, d);
                        const isPast = isSlotPast(d, hour);
                        const isRecurringSlot = status.type === 'available' && status.slot.is_recurring;
                        const isOneTimeSlot   = status.type === 'available' && !status.slot.is_recurring;
                        const isCalSelected = calSelectedDate && toDateStr(d) === toDateStr(calSelectedDate);
                        return (
                          <td key={di} className={`p-1 ${isCalSelected ? 'bg-primary/5' : ''}`}>
                            <button
                              onClick={(e) => !isPast && handleCellClick(e, d.getDay(), hour, d)}
                              disabled={isPast || status.type === 'booked'}
                              className={`w-full h-10 rounded-lg text-xs font-medium transition-all ${
                                status.type === 'booked'
                                  ? 'bg-accent/20 border border-accent/40 text-accent-dark dark:text-accent cursor-default'
                                  : isRecurringSlot
                                  ? 'bg-success/20 border border-success/40 text-success hover:bg-success/30'
                                  : isOneTimeSlot
                                  ? 'bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25'
                                  : isPast
                                  ? 'bg-neutral-border/30 cursor-not-allowed opacity-40'
                                  : 'bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-primary-light hover:border-primary/40 cursor-pointer'
                              }`}
                              title={
                                status.type === 'booked' ? `${status.session.student_name} — ${status.session.topic ?? 'Session'}`
                                : isRecurringSlot ? 'Recurring every week — click to remove'
                                : isOneTimeSlot ? 'One-time slot — click to remove'
                                : isPast ? 'Past slot' : 'Click to set availability'
                              }
                            >
                              {status.type === 'booked' && (
                                <span className="truncate px-1 block text-[9px] leading-tight">
                                  {status.session.student_name.split(' ')[0]}
                                  <br/>
                                  <span className="opacity-70">{status.session.start_time.slice(0,5)}</span>
                                </span>
                              )}
                              {isRecurringSlot && <span className="flex items-center justify-center gap-0.5"><span>✓</span><span className="text-[9px] opacity-70">↻</span></span>}
                              {isOneTimeSlot && <span>✓</span>}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 p-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/30 border border-success/40 inline-block" />Recurring (every week)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary/15 border border-primary/40 inline-block" />One-time (this date only)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-accent/20 border border-accent/40 inline-block" />Booked</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-neutral-border/30 inline-block" />Unavailable / Past</span>
            </div>
          </Card>

          {/* Slot type picker popup */}
          {slotPicker && (
            <div
              ref={pickerRef}
              className="fixed z-50 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-xl p-4 w-64"
              style={{
                top: Math.min(slotPicker.anchorRect.bottom + 8, window.innerHeight - 200),
                left: Math.min(slotPicker.anchorRect.left, window.innerWidth - 272),
              }}
            >
              <p className="text-sm font-heading font-bold text-[var(--color-text)] mb-1">
                {DAYS[slotPicker.dayOfWeek]}{' '}
                {slotPicker.date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}{' '}
                · {formatHour(slotPicker.hour)}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mb-4">How should this slot repeat?</p>
              <div className="space-y-2">
                <button onClick={() => addSlot(slotPicker.dayOfWeek, slotPicker.hour, slotPicker.date, true)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg border border-success/40 bg-success/5 hover:bg-success/10 transition-colors text-left">
                  <span className="text-success text-lg leading-none mt-0.5">↻</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">Recurring</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Every {DAYS[slotPicker.dayOfWeek]} at {formatHour(slotPicker.hour)}, week after week</p>
                  </div>
                </button>
                <button onClick={() => addSlot(slotPicker.dayOfWeek, slotPicker.hour, slotPicker.date, false)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg border border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors text-left">
                  <span className="text-primary text-lg leading-none mt-0.5">📅</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">One-time only</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Only on {slotPicker.date.toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  </div>
                </button>
              </div>
              <button onClick={() => setSlotPicker(null)} className="mt-3 w-full text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Cancel</button>
            </div>
          )}
        </div>

        {/* ── Right panel ────────────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* ── Mini Calendar ─────────────────────────────────────────────── */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">Availability Overview</h3>
            <MiniCalendar
              availability={availability}
              onDateClick={handleCalendarDateClick}
              selectedDate={calSelectedDate}
            />
          </Card>

          {/* ── Day detail panel (shown when a date is selected) ──────────── */}
          {calSelectedDate && (
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-heading font-bold text-[var(--color-text)] text-sm">
                    {calSelectedDate.toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    {selectedDateSlots.length === 0
                      ? 'No availability set'
                      : `${selectedDateSlots.length} slot${selectedDateSlots.length > 1 ? 's' : ''} available`}
                  </p>
                </div>
                <button
                  onClick={() => setCalSelectedDate(null)}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                  title="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedDateSlots.length === 0 ? (
                <p className="text-xs text-[var(--color-text-secondary)] text-center py-3">
                  Click any slot in the grid above to add availability for this day.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {selectedDateSlots.map(slot => (
                    <div
                      key={slot.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs
                        ${slot.is_recurring
                          ? 'bg-success/5 border-success/30'
                          : 'bg-primary/5 border-primary/30'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={slot.is_recurring ? 'text-success' : 'text-primary'}>
                          {slot.is_recurring ? '↻' : '📅'}
                        </span>
                        <span className="font-medium text-[var(--color-text)]">
                          {formatHour(parseInt(slot.start_time.slice(0, 2)))}
                          {' – '}
                          {formatHour(parseInt(slot.end_time.slice(0, 2)))}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold
                          ${slot.is_recurring
                            ? 'bg-success/15 text-success'
                            : 'bg-primary/15 text-primary'}`}>
                          {slot.is_recurring ? 'Weekly' : 'Once'}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSlot(slot)}
                        className="text-[var(--color-text-secondary)] hover:text-red-500 transition-colors ml-2"
                        title="Remove this slot"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* ── Session Preferences ───────────────────────────────────────── */}
          <Card>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">Session Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">Accepting Bookings</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Students can book you</p>
                </div>
                <Toggle checked={prefs.is_accepting_bookings} onChange={v => setPrefs(p => ({ ...p, is_accepting_bookings: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">Instant Booking</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">No approval needed</p>
                </div>
                <Toggle checked={prefs.allow_instant_booking} onChange={v => setPrefs(p => ({ ...p, allow_instant_booking: v }))} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text)]">Group Sessions</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Allow multiple students</p>
                </div>
                <Toggle checked={prefs.allow_group_sessions} onChange={v => setPrefs(p => ({ ...p, allow_group_sessions: v }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Buffer Time</label>
                <select className="input text-sm" value={prefs.buffer_minutes} onChange={e => setPrefs(p => ({ ...p, buffer_minutes: Number(e.target.value) }))}>
                  <option value={0}>No buffer</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Rate per Hour (KSh)</label>
                <input type="number" className="input text-sm" value={prefs.rate_per_hour} min={500} max={10000} step={100}
                  onChange={e => setPrefs(p => ({ ...p, rate_per_hour: Number(e.target.value) }))} />
              </div>

              {/* ── Price negotiation ── */}
              <div className="pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">Allow Price Negotiation</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Students can propose a lower rate</p>
                  </div>
                  <Toggle
                    checked={prefs.allow_price_negotiation}
                    onChange={v => setPrefs(p => ({ ...p, allow_price_negotiation: v }))}
                  />
                </div>
                {prefs.allow_price_negotiation && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
                      Your minimum rate (KSh) <span className="text-[var(--color-text-secondary)] font-normal">— must be ≥ 1,000</span>
                    </label>
                    <input
                      type="number"
                      className="input text-sm"
                      value={prefs.min_negotiated_rate}
                      min={1000}
                      max={prefs.rate_per_hour}
                      step={100}
                      onChange={e => setPrefs(p => ({ ...p, min_negotiated_rate: Number(e.target.value) }))}
                    />
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      Students cannot propose below KSh {prefs.min_negotiated_rate.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
              <Button variant="primary" size="sm" className="w-full" onClick={savePrefs} disabled={saving}>
                {saving ? <Spinner size="sm" color="white" /> : 'Save Preferences'}
              </Button>
            </div>
          </Card>

          {/* ── Live banner ───────────────────────────────────────────────── */}
          <Card className="bg-success/5 border-success/20">
            <div className="flex items-start gap-2">
              <span className="text-success text-lg">✅</span>
              <div>
                <p className="text-sm font-semibold text-success">Live on Student Side</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  Your availability is visible to students in real-time. Changes take effect immediately.
                </p>
              </div>
            </div>
          </Card>

          {/* ── This week's sessions ──────────────────────────────────────── */}
          {sessions.length > 0 && (
            <Card>
              <h3 className="font-heading font-bold text-[var(--color-text)] mb-3">
                This Week
                <span className="ml-2 text-xs font-normal text-[var(--color-text-secondary)]">
                  {sessions.filter(s => s.status !== 'completed').length} upcoming
                </span>
              </h3>
              <div className="space-y-2">
                {sessions.map(s => (
                  <div key={s.id} className="p-2.5 rounded-lg border border-[var(--color-border)] text-xs">
                    <p className="font-semibold text-[var(--color-text)]">{s.student_name}</p>
                    <p className="text-[var(--color-text-secondary)]">
                      {new Date(s.session_date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })} · {s.start_time.slice(0, 5)}
                    </p>
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      <Badge
                        variant={s.status === 'confirmed' ? 'green' : s.status === 'pending_approval' ? 'amber' : 'secondary'}
                        size="sm"
                      >
                        {s.status.replace('_', ' ')}
                      </Badge>
                      {/* Pricing proposal badge */}
                      {s.pricing_status === 'proposed' && (
                        <button
                          onClick={() => setPricingModal({ session: s, counterAmount: '' })}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors animate-pulse"
                        >
                          💬 KSh {s.proposed_amount?.toLocaleString()} proposed
                        </button>
                      )}
                      {s.pricing_status === 'agreed' && s.agreed_amount && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success/15 text-success font-semibold">
                          ✓ KSh {s.agreed_amount.toLocaleString()} agreed
                        </span>
                      )}
                      {/* Meet link status & action */}
                      {s.platform === 'Google Meet' && s.status === 'confirmed' && (
                        s.join_link ? (
                          <div className="flex items-center gap-1 flex-wrap">
                            <a
                              href={s.join_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success/15 text-success text-[10px] font-semibold hover:bg-success/25 transition-colors"
                            >
                              🎥 Open Meet
                            </a>
                            <button
                              onClick={() => handleOpenMeetModal(s)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold hover:bg-primary/20 transition-colors"
                            >
                              ✏️ Edit Link
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenMeetModal(s)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/15 text-accent-dark dark:text-accent text-[10px] font-semibold hover:bg-accent/25 transition-colors"
                          >
                            + Add Meet Link
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

        </div>{/* end right panel */}
      </div>{/* end grid */}

      {/* ── Pricing Negotiation Modal ────────────────────────────────────────── */}
      <Modal
        isOpen={!!pricingModal}
        onClose={() => setPricingModal(null)}
        title="Student Rate Proposal"
      >
        {pricingModal && (
          <div className="space-y-4">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 p-4">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Session with {pricingModal.session.student_name}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                {new Date(pricingModal.session.session_date).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })} at {pricingModal.session.start_time.slice(0, 5)}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Your standard rate</p>
                  <p className="font-bold text-[var(--color-text)]">KSh {pricingModal.session.gross_amount.toLocaleString()}</p>
                </div>
                <div className="text-[var(--color-text-secondary)]">→</div>
                <div>
                  <p className="text-xs text-[var(--color-text-secondary)]">Student proposes</p>
                  <p className="font-bold text-amber-600 dark:text-amber-400">KSh {pricingModal.session.proposed_amount?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)]">
              You can accept the student&apos;s proposed rate, set a counter-offer (minimum KSh 800), or decline and charge your standard rate.
            </p>

            {/* Counter amount input */}
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
                Counter-offer amount (KSh) — optional
              </label>
              <input
                type="number"
                min={800}
                max={pricingModal.session.gross_amount - 1}
                step={100}
                placeholder={`e.g. ${Math.round(((pricingModal.session.proposed_amount ?? 0) + pricingModal.session.gross_amount) / 2)}`}
                value={pricingModal.counterAmount}
                onChange={e => setPricingModal(p => p ? { ...p, counterAmount: e.target.value } : null)}
                className="input text-sm w-full"
              />
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Minimum KSh 800</p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePricingResponse(pricingModal.session, 'decline')}
              >
                Decline
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const amt = parseInt(pricingModal.counterAmount, 10);
                  if (!pricingModal.counterAmount || isNaN(amt)) {
                    toast.error('Enter a counter-offer amount first');
                    return;
                  }
                  handlePricingResponse(pricingModal.session, 'counter', amt);
                }}
              >
                Counter
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handlePricingResponse(pricingModal.session, 'accept')}
              >
                Accept KSh {pricingModal.session.proposed_amount?.toLocaleString()}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Meet Link Modal ──────────────────────────────────────────────────── */}
      <Modal
        isOpen={!!meetModal}
        onClose={() => !savingMeetLink && setMeetModal(null)}
        title="Add Google Meet Link"
      >
        {meetModal && (
          <div className="space-y-4">
            {/* Session info */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-3 text-sm">
              <p className="font-semibold text-[var(--color-text)]">Session with {meetModal.studentName}</p>
              <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                {new Date(meetModal.sessionDate).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })} at {meetModal.startTime.slice(0, 5)}
              </p>
            </div>

            {/* Instructions */}
            <div className="rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-secondary)] space-y-2">
              <p className="font-semibold text-[var(--color-text)]">How to get your Google Meet link:</p>
              <ol className="space-y-1 list-none">
                <li className="flex gap-2"><span className="text-primary font-bold">1.</span> Go to <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">meet.google.com</a> and click <strong>"New meeting"</strong></li>
                <li className="flex gap-2"><span className="text-primary font-bold">2.</span> Choose <strong>"Create a meeting for later"</strong></li>
                <li className="flex gap-2"><span className="text-primary font-bold">3.</span> Copy the link and paste it below</li>
              </ol>
              <p className="pt-1 border-t border-[var(--color-border)]">
                Or leave the field empty to auto-generate a Meet room link.
              </p>
            </div>

            {/* Link input */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                Google Meet URL <span className="text-[var(--color-text-secondary)] font-normal">(optional — leave empty to auto-generate)</span>
              </label>
              <input
                type="url"
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                value={meetLinkInput}
                onChange={e => setMeetLinkInput(e.target.value)}
                className="input text-sm w-full"
                disabled={savingMeetLink}
              />
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Format: https://meet.google.com/abc-defg-hij
              </p>
            </div>

            {/* Existing link */}
            {meetModal.existingLink && (
              <div className="rounded-lg bg-success/5 border border-success/20 p-3 text-xs">
                <p className="font-semibold text-success mb-1">Current link:</p>
                <a href={meetModal.existingLink} target="_blank" rel="noopener noreferrer"
                  className="text-primary underline break-all">{meetModal.existingLink}</a>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setMeetModal(null)}
                disabled={savingMeetLink}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleSaveMeetLink}
                disabled={savingMeetLink}
              >
                {savingMeetLink
                  ? <Spinner size="sm" color="white" />
                  : meetLinkInput.trim()
                    ? 'Save Meet Link'
                    : 'Auto-Generate Link'
                }
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
