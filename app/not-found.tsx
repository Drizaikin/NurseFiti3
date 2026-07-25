import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-neutral-cream dark:bg-dark px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <Link href="/" className="inline-flex" aria-label="NurseFiti home">
          <NurseFitiLogo variant="full" size={48} />
        </Link>
        <p className="mt-12 text-sm font-bold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-4xl font-heading font-bold text-[var(--color-text)]">
          This page could not be found
        </h1>
        <p className="mt-4 text-neutral-mid">
          The link may be outdated, or the page may have moved. Continue with NurseFiti exam preparation or browse the study blog.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary-mid">
            Return home
          </Link>
          <Link href="/blog" className="rounded-xl border-2 border-primary px-6 py-3 font-bold text-primary hover:bg-primary-light">
            Browse study guides
          </Link>
        </div>
      </div>
    </main>
  );
}
