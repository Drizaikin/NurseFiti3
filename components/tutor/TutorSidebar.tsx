"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const navItems: NavItem[] = [
  { name: 'Dashboard',    href: '/tutor-dashboard',  icon: <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
  { name: 'Schedule',     href: '/tutor-schedule',   icon: <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
  { name: 'My Students',  href: '/tutor-students',   icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
  { name: 'Content Studio', href: '/tutor-studio',  icon: <Icon d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /> },
  { name: 'Earnings',     href: '/tutor-earnings',   icon: <Icon d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { name: 'Reviews',      href: '/tutor-reviews',    icon: <Icon d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
  { name: 'My Profile',   href: '/tutor-profile',    icon: <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
];

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <div className="flex items-center h-16 px-5 border-b border-white/10">
        <Link href="/tutor-dashboard" aria-label="NurseFiti tutor home" onClick={onNavClick}>
          <NurseFitiLogo variant="full" size={36} context="sidebar" />
        </Link>
      </div>

      {/* Tutor badge */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20">
          <span className="text-accent text-sm">👨‍🏫</span>
          <span className="text-xs font-semibold text-accent">Tutor Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin" aria-label="Tutor navigation">
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

export function TutorSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 sidebar-bg border-r border-white/8 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col sidebar-bg border-r border-white/8 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Mobile tutor navigation"
      >
        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2 rounded-lg text-[#7A9E9E] hover:text-white hover:bg-white/10 transition-colors" aria-label="Close menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <SidebarContent onNavClick={() => setMobileOpen(false)} />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-glow-amber flex items-center justify-center text-dark transition-all duration-200 active:scale-95 ${mobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}
