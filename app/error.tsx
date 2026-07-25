'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="grid min-h-screen place-items-center bg-[var(--color-bg)] px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center shadow-premium sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-heading font-bold text-[var(--color-text)]">This page could not finish loading</h1>
        <p className="mt-4 leading-7 text-neutral-mid">
          Your information has not been shown here. Try loading the page again, or return to the NurseFiti homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary min-h-[48px]">Try again</button>
          <Link href="/" className="btn-outline min-h-[48px]">Return home</Link>
        </div>
      </div>
    </main>
  );
}
