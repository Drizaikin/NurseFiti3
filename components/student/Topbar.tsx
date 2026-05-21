"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { DarkModeToggle } from '../shared/DarkModeToggle';

interface StudentProfile {
  full_name: string;
  avatar_url?: string | null;
  xp: number;
  level: number;
  streak_count: number;
}

export function Topbar() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: profileData }, { data: studentData }] = await Promise.all([
        supabase.from('profiles').select('full_name, avatar_url').eq('id', user.id).single(),
        supabase.from('student_profiles').select('xp, level, streak_count').eq('id', user.id).single(),
      ]);

      if (profileData && studentData) {
        setProfile({
          full_name: (profileData as any).full_name,
          avatar_url: (profileData as any).avatar_url,
          xp: (studentData as any).xp ?? 0,
          level: (studentData as any).level ?? 1,
          streak_count: (studentData as any).streak_count ?? 0,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="h-16 bg-[var(--color-card)] border-b border-[var(--color-border)] flex items-center justify-between px-4 lg:px-6">
      {/* Mobile logo */}
      <span className="lg:hidden text-lg font-heading font-bold text-primary">NurseFiti</span>

      {/* Spacer */}
      <div className="hidden lg:block flex-1" />

      {/* Stats & Profile */}
      <div className="flex items-center gap-3">
        {profile && (
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="primary">Lv {profile.level}</Badge>
            <Badge variant="secondary">{profile.xp} XP</Badge>
            {profile.streak_count > 0 && (
              <Badge variant="warning">🔥 {profile.streak_count}d</Badge>
            )}
          </div>
        )}

        <DarkModeToggle />

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Open profile menu"
          >
            <Avatar name={profile?.full_name || 'Student'} src={profile?.avatar_url} size="sm" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-52 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-lg z-20">
                <div className="p-3 border-b border-[var(--color-border)]">
                  <p className="font-semibold text-sm text-[var(--color-text)]">
                    {profile?.full_name || 'Student'}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP
                  </p>
                </div>
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => { router.push('/settings'); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-primary-light hover:text-primary transition-colors"
                    >
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
