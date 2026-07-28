"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { NurseFitiLogo } from '../shared/NurseFitiLogo';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

function Icon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
    </svg>
  );
}

const baseNavItems: NavItem[] = [
  { name: 'Dashboard',     href: '/dashboard',      icon: <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { name: 'Mnemonics',     href: '/mnemonics/today',icon: <Icon d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
  { name: 'Practice',      href: '/practice',       icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> },
  { name: 'Mock Exam',     href: '/mock-exam',      icon: <Icon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { name: 'Flashcards',    href: '/flashcards',     icon: <Icon d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
  { name: 'Analytics',     href: '/analytics',      icon: <Icon d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
  { name: 'Achievements',  href: '/achievements',   icon: <Icon d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /> },
  { name: 'Study Groups',  href: '/groups',         icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
  { name: 'Revision Plan', href: '/revision-plan',  icon: <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
  { name: 'Find Tutors',   href: '/tutors',         icon: <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
  { name: 'My Bookings',   href: '/bookings',       icon: <Icon d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
  { name: 'Settings',      href: '/settings',       icon: <Icon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
];

const hdNavItem: NavItem = {
  name: 'HD Materials',
  href: '/hd-materials',
  icon: <Icon d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
};

function SidebarContent({ onNavClick, isHd }: { onNavClick?: () => void; isHd?: boolean }) {
  const pathname = usePathname();
  const navItems = isHd
    ? [...baseNavItems.slice(0, -1), hdNavItem, baseNavItems[baseNavItems.length - 1]]
    : baseNavItems;

  return (
    <>
      {/* Logo */}
      <div className="flex items-center h-16 px-5 border-b border-white/10">
        <Link href="/dashboard" aria-label="NurseFiti home" onClick={onNavClick}>
          <NurseFitiLogo variant="full" size={36} context="sidebar" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin" aria-label="Student navigation">
        <ul className="space-y-0.5 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavClick}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 min-h-[44px] group
                    ${isActive
                      ? 'bg-gradient-to-r from-accent to-accent/80 text-dark font-semibold shadow-glow-amber'
                      : 'text-[#7A9E9E] hover:bg-white/8 hover:text-white'
                    }
                  `}
                >
                  <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-dark' : 'text-[#7A9E9E] group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-dark/40" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-[#4A6565] text-center">© 2026 NurseFiti</p>
      </div>
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHd, setIsHd]             = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  // Fetch cadre once on mount to conditionally show HD Materials link
  useEffect(() => {
    const loadCadre = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('student_profiles')
        .select('cadre')
        .eq('id', user.id)
        .single() as any;
      setIsHd(data?.cadre === 'Higher Diploma');
    };
    loadCadre();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── DESKTOP sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 sidebar-bg border-r border-white/8 z-30">
        <SidebarContent isHd={isHd} />
      </aside>

      {/* ── MOBILE hamburger button (rendered inside Topbar via export) ─── */}
      {/* Exposed as a separate export so Topbar can render it */}

      {/* ── MOBILE drawer backdrop ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE drawer ───────────────────────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 flex flex-col sidebar-bg
          border-r border-white/8 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Mobile navigation"
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#7A9E9E] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <SidebarContent isHd={isHd} onNavClick={() => setMobileOpen(false)} />
      </aside>

      {/* ── MOBILE hamburger trigger (fixed bottom-right for easy thumb reach) */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`
          fixed bottom-6 right-6 z-30 lg:hidden
          w-14 h-14 rounded-2xl
          bg-gradient-to-br from-primary to-primary-mid
          shadow-glow-teal
          flex items-center justify-center
          text-white
          transition-all duration-200 active:scale-95
          ${mobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        aria-label="Open navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}
