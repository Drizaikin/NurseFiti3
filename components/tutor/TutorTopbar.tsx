"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { DarkModeToggle } from '../shared/DarkModeToggle';
import { NurseFitiLogo } from '../shared/NurseFitiLogo';
import NotificationsPanel, { useUnreadCount } from '@/components/shared/NotificationsPanel';

interface TutorProfile {
  full_name: string;
  avatar_url?: string | null;
  verification_tier?: string | null;
  average_rating?: number;
}

export function TutorTopbar() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const unreadCount = useUnreadCount(userId ?? '');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);

        const [{ data: profileData }, { data: tutorData }] = await Promise.all([
          supabase.from('profiles').select('full_name, avatar_url').eq('id', user.id).single(),
          supabase.from('tutor_profiles').select('verification_tier, average_rating').eq('id', user.id).single(),
        ]);

        if (profileData) {
          setProfile({
            full_name: (profileData as any).full_name,
            avatar_url: (profileData as any).avatar_url,
            verification_tier: (tutorData as any)?.verification_tier ?? null,
            average_rating: (tutorData as any)?.average_rating ?? 0,
          });
        }
      } catch (error) {
        console.error('Error fetching tutor profile:', error);
      }
    };
    fetchProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="h-16 topbar-bg border-b border-[var(--color-border)] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
      {/* Mobile logo */}
      <div className="lg:hidden">
        <NurseFitiLogo variant="full" size={32} context="topbar" />
      </div>

      {/* Desktop spacer */}
      <div className="hidden lg:block flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {profile && (
          <div className="flex items-center gap-1.5">
            {profile.verification_tier === 'gold' && (
              <Badge variant="warning" size="sm">⭐ Gold Tutor</Badge>
            )}
            {profile.verification_tier === 'standard' && (
              <Badge variant="primary" size="sm">✓ Verified</Badge>
            )}
            {(profile.average_rating ?? 0) > 0 && (
              <Badge variant="secondary" size="sm" className="hidden sm:inline-flex">
                ★ {(profile.average_rating ?? 0).toFixed(1)}
              </Badge>
            )}
          </div>
        )}

        <DarkModeToggle />

        {/* Notification bell */}
        <button
          onClick={() => setShowNotifs(true)}
          className="relative flex items-center justify-center min-h-[44px] min-w-[44px] hover:opacity-80 transition-opacity"
          aria-label="Open notifications"
        >
          <svg className="w-6 h-6 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          )}
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] justify-center"
            aria-label="Open profile menu"
            aria-expanded={showMenu}
          >
            <Avatar name={profile?.full_name || 'Tutor'} src={profile?.avatar_url} size="sm" />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-premium z-20 overflow-hidden">
                <div className="p-4 border-b border-[var(--color-border)] bg-gradient-to-br from-accent/5 to-transparent">
                  <p className="font-semibold text-sm text-[var(--color-text)]">
                    {profile?.full_name || 'Tutor'}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Expert Tutor</p>
                </div>
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => { router.push('/tutor-profile'); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-primary-light hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
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

      <NotificationsPanel isOpen={showNotifs} onClose={() => setShowNotifs(false)} userId={userId ?? ''} />
    </header>
  );
}
