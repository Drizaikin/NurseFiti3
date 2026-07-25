import Link from 'next/link';
import type { PublicProduct } from '@/lib/publicProducts';
import { productJsonLd } from '@/lib/publicProducts';
import { FaqSection } from '@/components/marketing/FaqSection';
import { JsonLd } from '@/components/marketing/JsonLd';

export function ProductLandingPage({ product, note }: { product: PublicProduct; note?: React.ReactNode }) {
  return (
    <main id="main-content">
      <JsonLd data={productJsonLd(product)} />
      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{product.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] text-[var(--color-text)] sm:text-5xl lg:text-6xl">{product.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-mid sm:text-xl">{product.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={product.primaryHref} className="btn-primary min-h-[52px] text-center">{product.primaryCta}</Link>
              <Link href={product.secondaryHref} className="btn-outline min-h-[52px] text-center">{product.secondaryCta}</Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-neutral-mid">{product.summary}</p>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-primary/10" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-premium sm:p-8">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-light">A useful study loop</p>
                  <p className="mt-1 font-heading text-xl font-bold">Focus. Practise. Review.</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-xl font-bold text-white">NF</span>
              </div>
              <div className="mt-6 space-y-4">
                {product.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl bg-primary-xlight p-4 dark:bg-primary-light">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-heading text-sm font-bold text-white">{index + 1}</span>
                    <div>
                      <p className="font-bold text-[var(--color-text)]">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-mid">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              {note && <div className="mt-5 rounded-xl border border-accent/40 bg-accent-light p-4 text-sm leading-6 text-dark">{note}</div>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-bold sm:justify-between">
          {product.suitedFor.map((item) => <span key={item} className="flex items-center gap-2"><span className="text-accent">&#10003;</span>{item}</span>)}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Designed for deliberate revision</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">More structure, less guesswork</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {product.highlights.map((item, index) => (
              <article key={item.title} className="card group min-h-52">
                <span className="text-sm font-bold text-accent">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-[var(--color-text)]">{item.title}</h3>
                <p className="mt-3 leading-7 text-neutral-mid">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-dark px-6 py-12 text-center text-white shadow-premium sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Start from where you are</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">Make your next revision session specific and useful</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">Create an account, choose the support you need, and build a study routine you can realistically sustain.</p>
          <Link href={product.primaryHref} className="btn-primary mt-8 min-h-[52px]">{product.primaryCta}</Link>
        </div>
      </section>

      <FaqSection items={product.faqs.map(({ question, answer }) => ({ question, answer }))} />
    </main>
  );
}
