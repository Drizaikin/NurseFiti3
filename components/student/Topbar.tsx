"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { DarkModeToggle } from '../shared/DarkModeToggle';

interface StudentProfile {
  full_name: string;
  avatar_url?: string;
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
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single();

      const { data: studentData } = await supabase
        .from('student_profiles')
        .select('xp, level, streak_count')
        .eq('id', user.id)
        .single();

      if (profileData && studentData) {
        setProfile({
          ...profileData,
          ...studentData,
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
    <header className="h-16 bg-white dark:bg-dark-card border-b border-neutral-border flex items-center justify-between px-4 lg:px-6">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-neutral-mid hover:text-primary"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page Title (Mobile) */}
      <h1 className="lg:hidden text-lg font-heading font-bold text-primary">
        NurseFiti
      </h1>

      {/* Spacer */}
      <div className="hidden lg:block flex-1" />

      {/* Stats & Profile */}
      <div className="flex items-center space-x-4">
        {/* XP Badge */}
        {profile && (
          <div className="hidden md:flex items-center space-x-2">
            <Badge variant="primary" size="md">
              Level {profile.level}
            </Badge>
            <Badge variant="secondary" size="md">
              {profile.xp} XP
            </Badge>
            {profile.streak_count > 0 && (
              <Badge variant="warning" size="md">
                🔥 {profile.streak_count} day streak
              </Badge>
            )}
          </div>
        )}

        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Avatar
              name={profile?.full_name || 'Student'}
              src={profile?.avatar_url}
              size="sm"
            />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-neutral-border rounded-lg shadow-lg z-20">
                <div className="p-3 border-b border-neutral-border">
                  <p className="font-semibold text-sm text-neutral-dark dark:text-neutral-light">
                    {profile?.full_name || 'Student'}
                  </p>
                  <p className="text-xs text-neutral-mid">
                    Level {profile?.level || 1} • {profile?.xp || 0} XP
                  </p>
                </div>
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => {
                        router.push('/settings');
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-mid hover:bg-neutral-cream dark:hover:bg-dark hover:text-primary"
                    >
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 dark:hover:bg-red-900/20"
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
