export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ items, title = 'Questions before you begin' }: { items: FaqItem[]; title?: string }) {
  return (
    <section id="faq" className="border-t border-[var(--color-border)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Clear answers</p>
        <h2 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">{title}</h2>
        <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-heading text-lg font-bold text-[var(--color-text)]">
                {item.question}
                <span aria-hidden="true" className="text-2xl font-normal text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pt-3 leading-7 text-neutral-mid">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
