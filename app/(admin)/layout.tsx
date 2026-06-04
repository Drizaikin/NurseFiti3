"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Spinner } from '@/components/ui/Spinner';
import { AvatarUpload } from '@/components/shared/AvatarUpload';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [checking, setChecking] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [adminName, setAdminName] = useState('');
  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, full_name, avatar_url')
        .eq('id', user.id)
        .single();
      if (!profile || (profile as { role: string }).role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      setAdminId(user.id);
      setAdminName((profile as { full_name: string }).full_name ?? 'Admin');
      setAdminAvatar((profile as { avatar_url: string | null }).avatar_url ?? null);
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

        <div className="flex items-center gap-3">
          {adminId && (
            <AvatarUpload
              userId={adminId}
              currentUrl={adminAvatar}
              name={adminName}
              size="md"
              onUploaded={setAdminAvatar}
            />
          )}
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
            className="text-xs text-neutral-mid hover:text-error transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
