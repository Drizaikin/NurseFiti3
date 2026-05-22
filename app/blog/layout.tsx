import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import { DarkModeToggle } from '@/components/shared/DarkModeToggle';

export const metadata: Metadata = {
  title: {
    default: 'Blog — NCK Exam Tips & Guides',
    template: '%s | NurseFiti Blog',
  },
  description: 'Expert guides, revision tips, and study strategies for Kenyan nursing graduates preparing for the NCK licensure exam.',
  openGraph: {
    siteName: 'NurseFiti',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark text-[var(--color-text)]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-neutral-cream/90 dark:bg-dark/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" aria-label="NurseFiti home">
            <NurseFitiLogo variant="full" size={40} />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-neutral-mid">
            <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/blog" className="text-primary">Blog</Link>
            <Link href="/help" className="hover:text-primary transition-colors">Help</Link>
          </nav>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary-light transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-accent text-dark rounded-xl hover:bg-accent-dark transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-10 px-4 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-mid">
          <Link href="/" aria-label="NurseFiti home">
            <NurseFitiLogo variant="full" size={32} />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/help" className="hover:text-primary transition-colors">Help</Link>
          </div>
          <p>© {new Date().getFullYear()} NurseFiti. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
