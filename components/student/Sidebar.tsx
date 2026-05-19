"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NurseFitiLogo } from '../shared/NurseFitiLogo';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Practice', href: '/practice', icon: '📝' },
  { name: 'Mock Exam', href: '/mock-exam', icon: '⏱️' },
  { name: 'Flashcards', href: '/flashcards', icon: '🎴' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Achievements', href: '/achievements', icon: '🏆' },
  { name: 'Study Groups', href: '/groups', icon: '👥' },
  { name: 'Revision Plan', href: '/revision-plan', icon: '📅' },
  { name: 'Find Tutors', href: '/tutors', icon: '👨‍🏫' },
  { name: 'My Bookings', href: '/bookings', icon: '📖' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-dark-card border-r border-neutral-border">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-neutral-border">
        <Link href="/dashboard">
          <NurseFitiLogo variant="full" size={40} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-neutral-mid hover:bg-neutral-cream dark:hover:bg-dark hover:text-primary'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-border">
        <p className="text-xs text-neutral-light text-center">
          © 2026 NurseFiti
        </p>
      </div>
    </aside>
  );
}
