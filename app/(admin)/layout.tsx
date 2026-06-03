"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Spinner } from '@/components/ui/Spinner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (!profile || profile.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      setChecking(false);
    };
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Admin topbar */}
      <header className="sticky top-0 z-30 bg-[var(--color-card)] border-b border-[var(--color-border)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-lg font-heading font-bold text-primary">NurseFiti Admin</span>
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { href: '/admin', label: 'Overview' },
              { href: '/admin/uploads', label: 'Question Uploads' },
              { href: '/admin/questions', label: 'MCQ Review' },
              { href: '/admin/students', label: 'Students' },
              { href: '/admin/tutors', label: 'Tutors' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-primary-light hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
          className="text-xs text-neutral-mid hover:text-error transition-colors"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
