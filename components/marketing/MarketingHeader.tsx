import Link from 'next/link';
import { DarkModeToggle } from '@/components/shared/DarkModeToggle';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

const productLinks = [
  ['Questions', '/practice-questions'],
  ['Mock exams', '/mock-exams'],
  ['Flashcards', '/nck-flashcards'],
  ['Revision plans', '/revision-plans'],
  ['Tutoring', '/tutoring'],
] as const;

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="NurseFiti home" className="shrink-0">
          <NurseFitiLogo size={36} variant="full" />
        </Link>
        <nav aria-label="Product navigation" className="hidden items-center gap-5 lg:flex">
          {productLinks.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-semibold text-neutral-mid transition-colors hover:text-primary">
              {label}
            </Link>
          ))}
          <Link href="/nursing-students" className="text-sm font-semibold text-neutral-mid transition-colors hover:text-primary">Students</Link>
          <Link href="/pricing" className="text-sm font-semibold text-neutral-mid transition-colors hover:text-primary">Pricing</Link>
          <Link href="/blog" className="text-sm font-semibold text-neutral-mid transition-colors hover:text-primary">Blog</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <DarkModeToggle />
          <Link href="/login" className="hidden min-h-[44px] items-center px-3 text-sm font-bold text-primary sm:inline-flex">Log in</Link>
          <Link href="/signup" className="inline-flex min-h-[44px] items-center rounded-xl bg-accent px-4 text-sm font-bold text-dark transition-colors hover:bg-accent-dark">
            Start free
          </Link>
        </div>
      </div>
      <nav aria-label="Mobile product navigation" className="flex gap-1 overflow-x-auto border-t border-[var(--color-border)] px-4 py-2 lg:hidden">
        {[...productLinks, ['Students', '/nursing-students'] as const, ['Pricing', '/pricing'] as const, ['Blog', '/blog'] as const].map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-neutral-mid hover:bg-primary-light hover:text-primary">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
