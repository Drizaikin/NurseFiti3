"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export const dynamic = 'force-dynamic';

interface Transaction {
  id: string;
  student_name: string;
  session_date: string;
  duration_minutes: number;
  gross_amount: number;
  platform_fee: number;
  net_amount: number;
  status: string;
  payment_status: string;
  topic: string | null;
}

interface EarningsData {
  thisMonthGross: number;
  thisMonthNet: number;
  totalYTD: number;
  pendingPayout: number;
  transactions: Transaction[];
  weeklyChart: Array<{ week: string; net: number }>;
  mpesaNumber: string | null;
  ratePerHour: number;
}

export default function TutorEarningsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [data, setData] = useState<EarningsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestingPayout, setRequestingPayout] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      await loadEarnings(user.id);
      setIsLoading(false);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadEarnings = async (uid: string) => {
    const [sessionsRes, tutorRes] = await Promise.all([
      supabase.from('sessions')
        .select('id, session_date, duration_minutes, gross_amount, platform_fee, net_amount, status, payment_status, topic, student_id')
        .eq('tutor_id', uid)
        .in('status', ['confirmed', 'completed'])
        .order('session_date', { ascending: false }),
      supabase.from('tutor_profiles').select('mpesa_number, rate_per_hour').eq('id', uid).single(),
    ]);

    const sessions = (sessionsRes.data ?? []) as any[];
    const tutor = tutorRes.data as any;

    // Get student names
    const studentIds = Array.from(new Set(sessions.map(s => s.student_id)));
    let nameMap: Record<string, string> = {};
    if (studentIds.length > 0) {
      const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', studentIds);
      nameMap = Object.fromEntries((names ?? []).map((n: any) => [n.id, n.full_name]));
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const thisMonthSessions = sessions.filter(s => new Date(s.session_date) >= startOfMonth);
    const thisMonthGross = thisMonthSessions.reduce((sum, s) => sum + (s.gross_amount ?? 0), 0);
    const thisMonthNet = thisMonthSessions.reduce((sum, s) => sum + (s.net_amount ?? 0), 0);
    const totalYTD = sessions.filter(s => new Date(s.session_date) >= startOfYear).reduce((sum, s) => sum + (s.net_amount ?? 0), 0);
    const pendingPayout = sessions.filter(s => s.payment_status === 'paid' && s.status === 'completed').reduce((sum, s) => sum + (s.net_amount ?? 0), 0);

    // Weekly chart (last 8 weeks)
    const weeklyChart = [];
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - i * 7 - weekStart.getDay());
      const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 7);
      const weekNet = sessions
        .filter(s => { const d = new Date(s.session_date); return d >= weekStart && d < weekEnd; })
        .reduce((sum, s) => sum + (s.net_amount ?? 0), 0);
      weeklyChart.push({
        week: weekStart.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }),
        net: weekNet,
      });
    }

    const transactions: Transaction[] = sessions.slice(0, 50).map(s => ({
      id: s.id,
      student_name: nameMap[s.student_id] ?? 'Student',
      session_date: s.session_date,
      duration_minutes: s.duration_minutes ?? 60,
      gross_amount: s.gross_amount ?? 0,
      platform_fee: s.platform_fee ?? 0,
      net_amount: s.net_amount ?? 0,
      status: s.status,
      payment_status: s.payment_status,
      topic: s.topic,
    }));

    setData({ thisMonthGross, thisMonthNet, totalYTD, pendingPayout, transactions, weeklyChart, mpesaNumber: tutor?.mpesa_number ?? null, ratePerHour: tutor?.rate_per_hour ?? 0 });
  };

  const requestPayout = async () => {
    setRequestingPayout(true);
    try {
      const res = await fetch('/api/intasend/payout', { method: 'POST' });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? 'Payout failed');
      toast.success(result.message ?? 'Payout initiated successfully!');
      // Refresh data to reflect updated pending amount
      const { data: { user } } = await supabase.auth.getUser();
      if (user) await loadEarnings(user.id);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Payout request failed. Try again.');
    } finally {
      setRequestingPayout(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  if (!data) return null;

  const today = new Date().getDay();
  const isMonday = today === 1;

  return (
    <div className="space-y-5 pb-24 lg:pb-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)]">Earnings & Payouts</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">All amounts in KSh. Platform fee: 30% · You keep 70%. Payouts every Monday.</p>
      </div>

      {/* Hero stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'This Month (Gross)', value: `KSh ${data.thisMonthGross.toLocaleString()}`, sub: `Net: KSh ${data.thisMonthNet.toLocaleString()}`, color: 'bg-primary/5 border-primary/20' },
          { label: 'Year to Date (Net)', value: `KSh ${data.totalYTD.toLocaleString()}`, sub: 'Total earned this year', color: 'bg-success/5 border-success/20' },
          { label: 'Pending Payout', value: `KSh ${data.pendingPayout.toLocaleString()}`, sub: 'Available for withdrawal', color: 'bg-accent/5 border-accent/20' },
        ].map(s => (
          <Card key={s.label} className={s.color}>
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-1">{s.label}</p>
            <p className="text-3xl font-heading font-bold text-[var(--color-text)]">{s.value}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Payout card */}
      <Card className="border-accent/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-[var(--color-text)] mb-1">Request Payout</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              M-Pesa: <span className="font-semibold text-[var(--color-text)]">{data.mpesaNumber ?? 'Not set'}</span>
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Gross → 30% platform fee → You receive 70%: KSh {Math.round(data.ratePerHour * 0.70).toLocaleString()}/hr
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="primary"
              onClick={requestPayout}
              disabled={requestingPayout || data.pendingPayout < 1000 || !isMonday}
            >
              {requestingPayout ? <Spinner size="sm" color="white" /> : `Request KSh ${data.pendingPayout.toLocaleString()}`}
            </Button>
            {!isMonday && <p className="text-xs text-[var(--color-text-secondary)]">Payouts available on Mondays</p>}
            {data.pendingPayout < 1000 && <p className="text-xs text-[var(--color-text-secondary)]">Minimum payout: KSh 1,000</p>}
          </div>
        </div>
      </Card>

      {/* Weekly chart */}
      <Card>
        <h2 className="text-lg font-heading font-bold mb-4">Weekly Earnings (Net)</h2>
        {data.weeklyChart.some(w => w.net > 0) ? (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyChart} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(v: number) => [`KSh ${v.toLocaleString()}`, 'Net Earnings']}
                />
                <Bar dataKey="net" fill="#F5A623" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-[var(--color-text-secondary)] text-sm text-center py-8">No earnings data yet. Complete sessions to see your earnings here.</p>
        )}
      </Card>

      {/* Transactions table */}
      <Card>
        <h2 className="text-lg font-heading font-bold mb-4">Transaction History</h2>
        {data.transactions.length === 0 ? (
          <p className="text-[var(--color-text-secondary)] text-sm text-center py-8">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {['Student', 'Date', 'Duration', 'Gross', 'Fee', 'Net', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 text-[var(--color-text-secondary)] font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.transactions.map(t => (
                  <tr key={t.id} className="border-b border-[var(--color-border)] last:border-0">
                    <td className="py-3 pr-4 text-[var(--color-text)] font-medium">{t.student_name}</td>
                    <td className="py-3 pr-4 text-[var(--color-text-secondary)] whitespace-nowrap">
                      {new Date(t.session_date).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 pr-4 text-[var(--color-text-secondary)]">{t.duration_minutes}m</td>
                    <td className="py-3 pr-4 text-[var(--color-text)]">KSh {t.gross_amount.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-error">-KSh {t.platform_fee.toLocaleString()}</td>
                    <td className="py-3 pr-4 font-bold text-success">KSh {t.net_amount.toLocaleString()}</td>
                    <td className="py-3">
                      <Badge variant={t.payment_status === 'paid' ? 'green' : t.payment_status === 'pending' ? 'amber' : 'error'} size="sm">
                        {t.payment_status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
