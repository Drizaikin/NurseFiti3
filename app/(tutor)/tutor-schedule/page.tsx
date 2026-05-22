"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7AM–8PM

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
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
}

interface TutorPrefs {
  allow_instant_booking: boolean;
  allow_group_sessions: boolean;
  buffer_minutes: number;
  rate_per_hour: number;
  session_platform: string[];
  is_accepting_bookings: boolean;
}

function formatHour(h: number) {
  if (h === 12) return '12 PM';
  if (h > 12) return `${h - 12} PM`;
  return `${h} AM`;
}

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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week

  // Get the Monday of the displayed week
  const getWeekStart = useCallback(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
    d.setDate(diff + weekOffset * 7);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [weekOffset]);

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

  const loadAvailability = async (uid: string) => {
    const { data } = await supabase.from('tutor_availability').select('*').eq('tutor_id', uid);
    setAvailability((data ?? []) as AvailabilitySlot[]);
  };

  const loadSessions = async (uid: string) => {
    const weekStart = getWeekStart();
    const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 7);
    const { data: sessData } = await supabase.from('sessions')
      .select('id, session_date, start_time, end_time, topic, platform, status, student_id')
      .eq('tutor_id', uid)
      .gte('session_date', weekStart.toISOString().split('T')[0])
      .lt('session_date', weekEnd.toISOString().split('T')[0])
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
      student_name: nameMap[s.student_id] ?? 'Student', topic: s.topic, platform: s.platform, status: s.status,
    })));
  };

  const loadPrefs = async (uid: string) => {
    const { data } = await supabase.from('tutor_profiles')
      .select('allow_instant_booking, allow_group_sessions, buffer_minutes, rate_per_hour, session_platform, is_accepting_bookings')
      .eq('id', uid).single();
    if (data) setPrefs(data as TutorPrefs);
  };

  const toggleSlot = async (dayOfWeek: number, hour: number) => {
    if (!userId) return;
    const startTime = `${String(hour).padStart(2, '0')}:00:00`;
    const endTime = `${String(hour + 1).padStart(2, '0')}:00:00`;
    const existing = availability.find(a => a.day_of_week === dayOfWeek && a.start_time === startTime);

    if (existing) {
      // Toggle active state
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('tutor_availability')
        .update({ is_active: !existing.is_active }).eq('id', existing.id);
      if (!error) {
        setAvailability(prev => prev.map(a => a.id === existing.id ? { ...a, is_active: !a.is_active } : a));
      }
    } else {
      // Create new slot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).from('tutor_availability').insert({
        tutor_id: userId, day_of_week: dayOfWeek, start_time: startTime, end_time: endTime, is_active: true,
      }).select().single();
      if (!error && data) {
        setAvailability(prev => [...prev, data as AvailabilitySlot]);
      }
    }
  };

  const savePrefs = async () => {
    if (!userId) return;
    setSaving(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('tutor_profiles').update({
      allow_instant_booking: prefs.allow_instant_booking,
      allow_group_sessions: prefs.allow_group_sessions,
      buffer_minutes: prefs.buffer_minutes,
      rate_per_hour: prefs.rate_per_hour,
      is_accepting_bookings: prefs.is_accepting_bookings,
    }).eq('id', userId);
    setSaving(false);
    if (error) { toast.error('Failed to save preferences'); }
    else { toast.success('Preferences saved!'); }
  };

  const getSlotStatus = (dayOfWeek: number, hour: number, date: Date) => {
    const startTime = `${String(hour).padStart(2, '0')}:00:00`;
    const dateStr = date.toISOString().split('T')[0];
    const booked = sessions.find(s => s.session_date === dateStr && s.start_time === startTime);
    if (booked) return { type: 'booked' as const, session: booked };
    const avail = availability.find(a => a.day_of_week === dayOfWeek && a.start_time === startTime && a.is_active);
    if (avail) return { type: 'available' as const };
    return { type: 'empty' as const };
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;

  const weekStart = getWeekStart();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart); d.setDate(d.getDate() + i); return d;
  });

  return (
    <div className="space-y-5 pb-24 lg:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Schedule & Availability</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Click any slot to toggle availability. Students see this in real-time.</p>
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

        {/* Calendar grid */}
        <div className="lg:col-span-3">
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="w-16 p-3 text-xs text-[var(--color-text-secondary)] font-medium text-left">Time</th>
                    {weekDays.map((d, i) => {
                      const isToday = d.toDateString() === new Date().toDateString();
                      return (
                        <th key={i} className="p-3 text-center">
                          <p className={`text-xs font-semibold ${isToday ? 'text-primary' : 'text-[var(--color-text-secondary)]'}`}>{DAYS[d.getDay()]}</p>
                          <p className={`text-lg font-heading font-bold ${isToday ? 'text-primary' : 'text-[var(--color-text)]'}`}>{d.getDate()}</p>
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
                        const isPast = d < new Date() && hour < new Date().getHours();
                        return (
                          <td key={di} className="p-1">
                            <button
                              onClick={() => !isPast && toggleSlot(d.getDay(), hour)}
                              disabled={isPast}
                              className={`w-full h-10 rounded-lg text-xs font-medium transition-all ${
                                status.type === 'booked'
                                  ? 'bg-accent/20 border border-accent/40 text-accent-dark dark:text-accent cursor-default'
                                  : status.type === 'available'
                                  ? 'bg-success/20 border border-success/40 text-success hover:bg-success/30'
                                  : isPast
                                  ? 'bg-neutral-border/30 cursor-not-allowed opacity-40'
                                  : 'bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-primary-light hover:border-primary/40 cursor-pointer'
                              }`}
                              title={status.type === 'booked' ? `${status.session.student_name} — ${status.session.topic ?? 'Session'}` : undefined}
                            >
                              {status.type === 'booked' && (
                                <span className="truncate px-1 block">{status.session.student_name.split(' ')[0]}</span>
                              )}
                              {status.type === 'available' && <span>✓</span>}
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
            <div className="flex items-center gap-4 p-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/30 border border-success/40 inline-block" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-accent/20 border border-accent/40 inline-block" /> Booked</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-neutral-border/30 inline-block" /> Unavailable</span>
            </div>
          </Card>
        </div>

        {/* Settings panel */}
        <div className="space-y-4">
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
              <Button variant="primary" size="sm" className="w-full" onClick={savePrefs} disabled={saving}>
                {saving ? <Spinner size="sm" color="white" /> : 'Save Preferences'}
              </Button>
            </div>
          </Card>

          {/* Student view banner */}
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

          {/* This week's sessions */}
          {sessions.length > 0 && (
            <Card>
              <h3 className="font-heading font-bold text-[var(--color-text)] mb-3">This Week</h3>
              <div className="space-y-2">
                {sessions.slice(0, 5).map(s => (
                  <div key={s.id} className="p-2.5 rounded-lg border border-[var(--color-border)] text-xs">
                    <p className="font-semibold text-[var(--color-text)]">{s.student_name}</p>
                    <p className="text-[var(--color-text-secondary)]">
                      {new Date(s.session_date).toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })} · {s.start_time.slice(0, 5)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant={s.status === 'confirmed' ? 'green' : s.status === 'pending_approval' ? 'amber' : 'secondary'} size="sm">{s.status.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
