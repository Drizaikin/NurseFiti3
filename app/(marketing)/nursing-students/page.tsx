import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { serializeJsonLd } from '@/lib/jsonLd';

export const metadata: Metadata = {
  title: 'Nursing Students Hub Kenya: CATs, Placement & Study Support',
  description: 'Practical study support for Kenyan BScN and KRCHN students: CATs, unit exams, care plans, drug calculations, clinical placement and NCK transition.',
  alternates: { canonical: 'https://www.nursefiti.co.ke/nursing-students' },
  openGraph: {
    title: 'Nursing Students Hub Kenya | NurseFiti',
    description: 'Study support for Kenyan BScN and KRCHN students, from first-year foundations to the NCK transition.',
    url: 'https://www.nursefiti.co.ke/nursing-students',
    type: 'website',
  },
};

const journeys = [
  {
    number: '01',
    title: 'CATs and unit exams',
    description: 'Turn lectures into active recall. Build a weekly rhythm around practice questions, rationales and the topics you still need to revisit.',
    links: [
      ['Practise nursing questions', '/practice-questions'],
      ['Build a revision plan', '/revision-plans'],
    ],
  },
  {
    number: '02',
    title: 'Clinical placement',
    description: 'Arrive ready to observe, ask better questions and connect ward encounters to the nursing concepts you are learning in class.',
    links: [
      ['Read the placement guide', '/blog/surviving-first-clinical-placement-kenyan-public-hospital'],
      ['Review clinical flashcards', '/nck-flashcards'],
    ],
  },
  {
    number: '03',
    title: 'Final year and NCK transition',
    description: 'Move from unit-by-unit learning to integrated clinical reasoning, timed practice and a realistic plan for the next professional steps.',
    links: [
      ['Explore mock exams', '/mock-exams'],
      ['Plan after the NCK exam', '/blog/after-nck-exam-kenya'],
    ],
  },
];

const studyAreas = [
  ['Care plans and nursing process', 'Use assessment, priorities and evaluation to reason through a case rather than memorise a template.', '/practice-questions'],
  ['Drug calculations and pharmacology', 'Practise calculation logic, medicine safety and rationale-based recall before the pressure of a CAT or placement.', '/blog/nck-pharmacology-calculations-guide'],
  ['OSCE and practical confidence', 'Prepare your explanation, sequence and safety checks alongside your institution’s own assessment criteria.', '/tutoring'],
  ['Community health fieldwork', 'Revisit population health, prevention and referral concepts with Kenya-specific nursing context.', '/blog/community-health-nursing-kenya'],
  ['Research and professional growth', 'Develop the study habits, evidence skills and support network that make final-year work more manageable.', '/tutoring'],
  ['NCK indexing and transition', 'Know when to verify official requirements, protect your eligibility and begin building long-term recall early.', '/blog/nck-indexing-60-day-deadline-kenya'],
] as const;

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.nursefiti.co.ke/nursing-students#webpage',
  name: 'NurseFiti Nursing Students Hub Kenya',
  description: 'Study support for Kenyan BScN and KRCHN nursing students: CATs, unit exams, clinical placement and NCK transition.',
  url: 'https://www.nursefiti.co.ke/nursing-students',
  isPartOf: { '@id': 'https://www.nursefiti.co.ke/#website' },
  about: { '@type': 'Thing', name: 'Undergraduate nursing education in Kenya' },
  audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
  provider: { '@type': 'Organization', '@id': 'https://www.nursefiti.co.ke/#organization', name: 'NurseFiti' },
};

export default function NursingStudentsHubPage() {
  return (
    <>
      <Script id="json-ld-nursing-students-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} />
      <main id="main-content">
        <section className="relative overflow-hidden bg-[#073B3A] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 10% 5%, #F5A623 0, transparent 22%), radial-gradient(circle at 88% 68%, #1A9E75 0, transparent 26%)' }} />
          <div className="relative mx-auto max-w-6xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#F9D481]">For BScN and KRCHN students</span>
            <div className="mt-7 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] sm:text-6xl">Build the study system that carries you from class to clinical practice.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">NurseFiti helps Kenyan nursing students turn lectures, CATs and clinical exposure into stronger recall and safer clinical reasoning — long before the NCK examination is close.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/signup" className="inline-flex min-h-[48px] items-center rounded-xl bg-accent px-5 font-bold text-dark transition-colors hover:bg-accent-dark">Start free on NurseFiti</Link>
                  <Link href="#study-path" className="inline-flex min-h-[48px] items-center rounded-xl border border-white/30 px-5 font-bold text-white transition-colors hover:bg-white/10">Explore your study path</Link>
                </div>
              </div>
              <aside className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#F9D481]">A practical promise</p>
                <p className="mt-3 text-xl font-heading font-bold leading-snug">Do not wait for final year to discover which topics you have forgotten.</p>
                <p className="mt-3 text-sm leading-6 text-white/75">Use small, regular practice sessions to find gaps early, review rationales and return to difficult concepts with a plan.</p>
              </aside>
            </div>
          </div>
        </section>

        <section id="study-path" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Choose where you are now</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl">One nursing journey. Different study needs at each stage.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {journeys.map((journey) => (
              <article key={journey.number} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
                <span className="font-heading text-4xl font-extrabold text-accent-dark">{journey.number}</span>
                <h3 className="mt-5 font-heading text-2xl font-bold text-[var(--color-text)]">{journey.title}</h3>
                <p className="mt-3 leading-7 text-neutral-mid">{journey.description}</p>
                <div className="mt-6 grid gap-3">
                  {journey.links.map(([label, href]) => <Link key={href} href={href} className="font-bold text-primary hover:text-primary-mid">{label} <span aria-hidden>→</span></Link>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--color-border)] bg-primary-xlight px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Study support, not a shortcut</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--color-text)] sm:text-4xl">Start with the academic problems students actually face.</h2>
              <p className="mt-4 leading-7 text-neutral-mid">Use NurseFiti to strengthen your recall and clinical reasoning. Always follow your institution’s current curriculum, assessment instructions and clinical-supervisor guidance.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {studyAreas.map(([title, description, href]) => (
                <Link key={title} href={href} className="group rounded-2xl border border-primary/15 bg-[var(--color-card)] p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover">
                  <h3 className="font-heading text-lg font-bold text-[var(--color-text)] group-hover:text-primary">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-mid">{description}</p>
                  <span className="mt-4 inline-block text-sm font-bold text-primary">Explore support →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-3xl bg-[var(--color-card)] p-7 ring-1 ring-[var(--color-border)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">A weekly rhythm that lasts</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--color-text)]">Make every lecture do more work for you.</h2>
              <p className="mt-4 leading-7 text-neutral-mid">You do not need to solve every unit in one weekend. Build a simple loop: learn, practise, review the rationale, and schedule the difficult concept for another recall session.</p>
              <Link href="/revision-plans" className="mt-6 inline-flex min-h-[46px] items-center rounded-xl bg-primary px-5 font-bold text-white transition-colors hover:bg-primary-mid">Build a revision plan</Link>
            </div>
            <ol className="grid gap-4">
              {[
                ['After a lecture', 'Answer a short set of questions on the topic before reopening your notes.'],
                ['After a CAT or unit exam', 'Record the concept behind each error, not just the answer you missed.'],
                ['During placement', 'Link one real observation to the physiology, communication or safety concept behind it.'],
                ['Each week', 'Use flashcards and mixed practice to retrieve older topics before they disappear.'],
              ].map(([label, text], index) => (
                <li key={label} className="flex gap-4 rounded-xl border border-[var(--color-border)] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-dark">{index + 1}</span>
                  <div><h3 className="font-bold text-[var(--color-text)]">{label}</h3><p className="mt-1 text-sm leading-6 text-neutral-mid">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#073B3A] px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F9D481]">Start before the pressure builds</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Your NCK preparation does not start after graduation.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">Begin building the recall, reasoning and study habits that will support your unit exams now and your professional transition later.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="inline-flex min-h-[48px] items-center rounded-xl bg-accent px-5 font-bold text-dark transition-colors hover:bg-accent-dark">Create your free account</Link>
              <Link href="/tutoring" className="inline-flex min-h-[48px] items-center rounded-xl border border-white/30 px-5 font-bold text-white transition-colors hover:bg-white/10">Explore tutoring support</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
