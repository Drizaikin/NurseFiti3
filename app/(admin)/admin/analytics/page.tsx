"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DailyEntry {
  date: string;       // 'YYYY-MM-DD'
  students: number;
  tutors: number;
  total: number;
}

interface PageEntry {
  page: string;
  students: number;
  tutors: number;
  total: number;
}

interface AnalyticsSummary {
  totalLogins: number;
  studentLogins: number;
  tutorLogins: number;
  totalVisits: number;
}

interface AnalyticsData {
  days: number;
  summary: AnalyticsSummary;
  dailyLogins: DailyEntry[];
  dailyVisits: DailyEntry[];
  topPages: PageEntry[];
  notice?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-KE', {
    month: 'short', day: 'numeric',
  });
}

function maxVal(arr: DailyEntry[]): number {
  return Math.max(...arr.map(d => d.total), 1);
}

// ─── Tiny bar chart (CSS-only, no library dependency) ─────────────────────────

function MiniBarChart({
  data,
  height = 80,
  label,
}: {
  data: DailyEntry[];
  height?: number;
  label: string;
}) {
  if (data.length === 0) {
    return <p className="text-xs text-[var(--color-text-secondary)] italic">No data yet.</p>;
  }
  const peak = maxVal(data);
  // Show at most 30 bars; if more data, show last 30
  const visible = data.slice(-30);

  return (
    <div>
      <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
        {label}
      </p>
      <div
        className="flex items-end gap-[2px] w-full overflow-hidden"
        style={{ height }}
        aria-label={label}
      >
        {visible.map((d) => {
          const pct = Math.round((d.total / peak) * 100);
          const studentPct = Math.round((d.students / peak) * 100);
          const tutorPct = Math.round((d.tutors / peak) * 100);
          return (
            <div
              key={d.date}
              className="flex-1 flex flex-col justify-end gap-[1px] group relative"
              style={{ minWidth: 0 }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-2 py-1 text-xs shadow-lg whitespace-nowrap">
                  <p className="font-bold text-[var(--color-text)]">{formatDate(d.date)}</p>
                  <p className="text-primary">Students: {d.students}</p>
                  <p className="text-accent">Tutors: {d.tutors}</p>
                  <p className="text-[var(--color-text-secondary)]">Total: {d.total}</p>
                </div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--color-border)]" />
              </div>
              {/* Tutor bar */}
              {d.tutors > 0 && (
                <div
                  style={{ height: `${tutorPct}%` }}
                  className="w-full rounded-t-sm bg-[var(--color-accent)] opacity-80 min-h-[2px]"
                />
              )}
              {/* Student bar */}
              {d.students > 0 && (
                <div
                  style={{ height: `${studentPct}%` }}
                  className="w-full rounded-t-sm bg-primary opacity-90 min-h-[2px]"
                />
              )}
              {/* Empty bar placeholder */}
              {d.total === 0 && (
                <div className="w-full min-h-[2px] bg-[var(--color-border)] opacity-40 rounded-t-sm" />
              )}
            </div>
          );
        })}
      </div>
      {/* X-axis: first and last date labels */}
      {visible.length > 1 && (
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[var(--color-text-secondary)]">{formatDate(visible[0].date)}</span>
          <span className="text-[10px] text-[var(--color-text-secondary)]">{formatDate(visible[visible.length - 1].date)}</span>
        </div>
      )}
      {/* Legend */}
      <div className="flex gap-4 mt-2">
        <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary" /> Students
        </span>
        <span className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[var(--color-accent)]" /> Tutors
        </span>
      </div>
    </div>
  );
}

// ─── Page visit bar for top pages ─────────────────────────────────────────────

function PageVisitRow({ entry, peak }: { entry: PageEntry; peak: number }) {
  const pct = Math.round((entry.total / peak) * 100);
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-32 shrink-0 text-xs font-mono text-[var(--color-text)] truncate">
        /{entry.page}
      </span>
      <div className="flex-1 h-5 bg-[var(--color-border)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-primary/80 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="shrink-0 text-right">
        <span className="text-xs font-bold text-[var(--color-text)]">{entry.total}</span>
        <span className="text-[10px] text-[var(--color-text-secondary)] ml-1">
          ({entry.students}S / {entry.tutors}T)
        </span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState(30);

  useEffect(() => {
    setIsLoading(true);
    setError('');
    fetch(`/api/admin/data?type=analytics&days=${days}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); } else { setData(d as AnalyticsData); }
        setIsLoading(false);
      })
      .catch(() => { setError('Failed to load analytics.'); setIsLoading(false); });
  }, [days]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">Platform Analytics</h1>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">
            Login frequency and tab/panel usage across student and tutor accounts.
          </p>
        </div>
        {/* Day range picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-secondary)]">Show last:</span>
          {[7, 14, 30, 60, 90].map(d => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                days === d
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-primary/50'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Spinner size="lg" color="primary" />
        </div>
      )}

      {error && <p className="text-error text-sm p-4 rounded-xl border border-error/20 bg-error/5">{error}</p>}

      {data && !isLoading && (
        <>
          {/* ── Migration notice ────────────────────────────────────────────── */}
          {data.notice && (
            <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-3 text-sm text-[var(--color-text-secondary)]">
              ℹ️ {data.notice}
            </div>
          )}
          {/* ── Summary cards ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Total Logins',
                value: data.summary.totalLogins,
                icon: '🔐',
                sub: `last ${data.days} days`,
                color: 'text-primary',
              },
              {
                label: 'Student Logins',
                value: data.summary.studentLogins,
                icon: '👩‍🎓',
                sub: `${data.days}d window`,
                color: 'text-primary',
              },
              {
                label: 'Tutor Logins',
                value: data.summary.tutorLogins,
                icon: '👨‍🏫',
                sub: `${data.days}d window`,
                color: 'text-[var(--color-accent)]',
              },
              {
                label: 'Page Visits',
                value: data.summary.totalVisits,
                icon: '👁️',
                sub: `${data.days}d window`,
                color: 'text-success',
              },
            ].map(s => (
              <Card key={s.label} className="space-y-1">
                <p className="text-xs text-[var(--color-text-secondary)]">{s.icon} {s.label}</p>
                <p className={`text-3xl font-heading font-bold ${s.color}`}>{s.value.toLocaleString()}</p>
                <p className="text-[10px] text-[var(--color-text-secondary)]">{s.sub}</p>
              </Card>
            ))}
          </div>

          {/* ── Charts row ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <h2 className="text-sm font-heading font-bold text-[var(--color-text)] mb-4">
                📅 Daily Logins
              </h2>
              <MiniBarChart data={data.dailyLogins} height={100} label={`Logins per day — last ${data.days} days`} />
            </Card>

            <Card>
              <h2 className="text-sm font-heading font-bold text-[var(--color-text)] mb-4">
                🖱️ Daily Page Visits
              </h2>
              <MiniBarChart data={data.dailyVisits} height={100} label={`Visits per day — last ${data.days} days`} />
            </Card>
          </div>

          {/* ── Top pages ─────────────────────────────────────────────────── */}
          <Card>
            <h2 className="text-sm font-heading font-bold text-[var(--color-text)] mb-4">
              🏆 Most Visited Pages / Tabs — last {data.days} days
            </h2>
            {data.topPages.length === 0 ? (
              <p className="text-xs text-[var(--color-text-secondary)] italic">No visit data yet.</p>
            ) : (
              <div className="space-y-0.5">
                {data.topPages.map((entry, i) => (
                  <div key={entry.page} className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--color-text-secondary)] w-4 text-right shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <PageVisitRow entry={entry} peak={data.topPages[0].total} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[10px] text-[var(--color-text-secondary)] mt-3">
              S = students · T = tutors
            </p>
          </Card>

          {/* ── Daily detail table ────────────────────────────────────────── */}
          <Card>
            <h2 className="text-sm font-heading font-bold text-[var(--color-text)] mb-4">
              📋 Daily Login Detail
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
                    <th className="pb-2 pr-4 font-semibold">Date</th>
                    <th className="pb-2 pr-4 font-semibold text-primary">Student logins</th>
                    <th className="pb-2 pr-4 font-semibold text-[var(--color-accent)]">Tutor logins</th>
                    <th className="pb-2 pr-4 font-semibold">Total</th>
                    <th className="pb-2 font-semibold text-[var(--color-text-secondary)]">Page visits</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data.dailyLogins].reverse().slice(0, 30).map(d => {
                    const visitRow = data.dailyVisits.find(v => v.date === d.date);
                    return (
                      <tr
                        key={d.date}
                        className="border-b border-[var(--color-border)]/40 hover:bg-[var(--color-border)]/20 transition-colors"
                      >
                        <td className="py-2 pr-4 font-mono">{formatDate(d.date)}</td>
                        <td className="py-2 pr-4 text-primary font-semibold">{d.students}</td>
                        <td className="py-2 pr-4 text-[var(--color-accent)] font-semibold">{d.tutors}</td>
                        <td className="py-2 pr-4 font-bold text-[var(--color-text)]">{d.total}</td>
                        <td className="py-2 text-[var(--color-text-secondary)]">{visitRow?.total ?? 0}</td>
                      </tr>
                    );
                  })}
                  {data.dailyLogins.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[var(--color-text-secondary)] italic">
                        No login data in the selected period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
