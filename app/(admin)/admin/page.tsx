"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';

interface Overview {
  totalStudents: number;
  freeStudents: number;
  paidStudents: number;
  totalTutors: number;
  verifiedTutors: number;
  pendingTutors: number;
  pendingUploads: number;
  pendingQuestions: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Overview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/data?type=overview')
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); } else { setStats(d); }
        setIsLoading(false);
      })
      .catch(() => { setError('Failed to load'); setIsLoading(false); });
  }, []);

  if (isLoading) return <div className="flex items-center justify-center min-h-[40vh]"><Spinner size="lg" color="primary" /></div>;
  if (error) return <p className="text-error p-4">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Admin Overview</h1>
        <p className="text-neutral-mid text-sm mt-1">Platform health at a glance — live data.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students',   value: stats?.totalStudents ?? 0,  icon: '👥', color: 'text-primary' },
          { label: 'Free Plan',        value: stats?.freeStudents ?? 0,   icon: '🆓', color: 'text-neutral-mid' },
          { label: 'Paid Plans',       value: stats?.paidStudents ?? 0,   icon: '💳', color: 'text-success' },
          { label: 'Pending Uploads',  value: stats?.pendingUploads ?? 0,   icon: '📂', color: (stats?.pendingUploads ?? 0) > 0 ? 'text-error' : 'text-neutral-mid' },
          { label: 'Pending MCQs',     value: stats?.pendingQuestions ?? 0, icon: '📝', color: (stats?.pendingQuestions ?? 0) > 0 ? 'text-accent' : 'text-neutral-mid' },
          { label: 'Total Tutors',     value: stats?.totalTutors ?? 0,    icon: '👨‍🏫', color: 'text-primary' },
          { label: 'Verified Tutors',  value: stats?.verifiedTutors ?? 0, icon: '✅', color: 'text-success' },
          { label: 'Pending Tutors',   value: stats?.pendingTutors ?? 0,  icon: '⏳', color: (stats?.pendingTutors ?? 0) > 0 ? 'text-accent' : 'text-neutral-mid' },
        ].map(s => (
          <Card key={s.label}>
            <p className="text-xs text-neutral-mid mb-1">{s.icon} {s.label}</p>
            <p className={`text-3xl font-heading font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/uploads">
          <Card className="hover:border-primary/40 transition-all cursor-pointer h-full">
            <h2 className="font-heading font-bold text-[var(--color-text)] mb-1">📂 Question Uploads</h2>
            <p className="text-sm text-neutral-mid">Review student-submitted exam question files and approve/reject to upgrade their plan.</p>
            {(stats?.pendingUploads ?? 0) > 0 && (
              <p className="text-xs text-error font-semibold mt-2">{stats?.pendingUploads} pending review</p>
            )}
          </Card>
        </Link>
        <Link href="/admin/students">
          <Card className="hover:border-primary/40 transition-all cursor-pointer h-full">
            <h2 className="font-heading font-bold text-[var(--color-text)] mb-1">👥 Manage Students</h2>
            <p className="text-sm text-neutral-mid">View all {stats?.totalStudents ?? 0} registered students, search by name/email, and set plan tiers.</p>
          </Card>
        </Link>
        <Link href="/admin/questions">
          <Card className="hover:border-primary/40 transition-all cursor-pointer h-full">
            <h2 className="font-heading font-bold text-[var(--color-text)] mb-1">📝 MCQ Review</h2>
            <p className="text-sm text-neutral-mid">Review and approve tutor-submitted questions. Approved MCQs go live immediately for students.</p>
            {(stats?.pendingQuestions ?? 0) > 0 && (
              <p className="text-xs text-accent font-semibold mt-2">{stats?.pendingQuestions} pending review</p>
            )}
          </Card>
        </Link>
        <Link href="/admin/tutors">
          <Card className="hover:border-primary/40 transition-all cursor-pointer h-full">
            <h2 className="font-heading font-bold text-[var(--color-text)] mb-1">👨‍🏫 Manage Tutors</h2>
            <p className="text-sm text-neutral-mid">View all {stats?.totalTutors ?? 0} registered tutors and approve/reject verification applications.</p>
            {(stats?.pendingTutors ?? 0) > 0 && (
              <p className="text-xs text-accent font-semibold mt-2">{stats?.pendingTutors} pending verification</p>
            )}
          </Card>
        </Link>
      </div>
    </div>
  );
}
