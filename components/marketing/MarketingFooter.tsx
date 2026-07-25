import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" aria-label="NurseFiti home"><NurseFitiLogo size={38} variant="full" /></Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-mid">
            Practical digital revision tools for Kenyan nursing candidates. NurseFiti is an independent education platform and does not guarantee examination outcomes.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">Prepare</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-mid">
            <Link href="/practice-questions" className="hover:text-primary">Practice questions</Link>
            <Link href="/mock-exams" className="hover:text-primary">Mock exams</Link>
            <Link href="/nck-flashcards" className="hover:text-primary">Flashcards</Link>
            <Link href="/revision-plans" className="hover:text-primary">Revision plans</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text)]">NurseFiti</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-mid">
            <Link href="/pricing" className="hover:text-primary">Pricing</Link>
            <Link href="/tutoring" className="hover:text-primary">Tutoring</Link>
            <Link href="/blog" className="hover:text-primary">NCK study blog</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/help" className="hover:text-primary">Help</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-4 py-5 text-center text-xs text-neutral-mid">
        &copy; {new Date().getFullYear()} NurseFiti. Educational support, not clinical advice.
      </div>
    </footer>
  );
}
