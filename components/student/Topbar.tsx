"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { DarkModeToggle } from '../shared/DarkModeToggle';
import { NurseFitiLogo } from '../shared/NurseFitiLogo';
import NotificationsPanel, { useUnreadCount } from '@/components/shared/NotificationsPanel';

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
  const [showNotifs, setShowNotifs] = useState(false);
  const [userId, setUserId] = useState('');
  const unreadCount = useUnreadCount(userId);

  useEffect(() => {
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUserId(user.id);

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
    <header className="h-16 topbar-bg border-b border-[var(--color-border)] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">

      {/* Mobile: real SVG logo */}
      <div className="lg:hidden">
        <NurseFitiLogo variant="full" size={32} context="topbar" />
      </div>

      {/* Desktop: spacer pushes everything right */}
      <div className="hidden lg:block flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* XP / Level / Streak — visible on mobile too (compact) */}
        {profile && (
          <div className="flex items-center gap-1.5">
            <Badge variant="primary" size="sm">Lv {profile.level}</Badge>
            <Badge variant="secondary" size="sm" className="hidden sm:inline-flex">{profile.xp} XP</Badge>
            {profile.streak_count > 0 && (
              <Badge variant="warning" size="sm">🔥 {profile.streak_count}</Badge>
            )}
          </div>
        )}

        <DarkModeToggle />

        {/* Notifications bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl text-[var(--color-text-secondary)] hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Open notifications"
            aria-expanded={showNotifs}
            aria-haspopup="true"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationsPanel isOpen={showNotifs} onClose={() => setShowNotifs(false)} userId={userId} />
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] justify-center"
            aria-label="Open profile menu"
            aria-expanded={showMenu}
          >
            <Avatar name={profile?.full_name || 'Student'} src={profile?.avatar_url} size="sm" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-premium z-20 overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border)] bg-gradient-to-br from-primary/5 to-transparent">
                  <p className="font-semibold text-sm text-[var(--color-text)]">
                    {profile?.full_name || 'Student'}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    Level {profile?.level ?? 1} · {profile?.xp ?? 0} XP
                  </p>
                </div>
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => { router.push('/settings'); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-primary-light hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
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
