import type { Metadata } from 'next';
import Link from 'next/link';
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import { DarkModeToggle } from '@/components/shared/DarkModeToggle';

export const metadata: Metadata = {
  title: 'NurseFiti — Kenya\'s NCK Exam Preparation Platform',
  description:
    'Pass your NCK licensure exam with AI-adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards, personalised revision plans, and live expert tutors. Built for KRCHN, BScN & Higher Diploma nurses in Kenya.',
  openGraph: {
    title: 'NurseFiti — NCK Exam Preparation Kenya',
    description: 'Kenya\'s most intelligent NCK exam prep platform. Practice MCQs, mock exams, flashcards, revision plans & expert tutors.',
    url: 'https://nursefiti.com',
    siteName: 'NurseFiti',
    type: 'website',
  },
};

// ─── Static data ────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '📝',
    title: 'Adaptive MCQ Bank',
    desc: 'Over 5,000 exam-style questions across all NCK units. AI surfaces your weak areas automatically.',
  },
  {
    icon: '⏱️',
    title: 'DigiProctor Mock Exams',
    desc: 'Pixel-perfect replica of the real NCK exam interface — same layout, same timer, same pressure.',
  },
  {
    icon: '🎴',
    title: 'Spaced Repetition Flashcards',
    desc: 'Science-backed SRS algorithm schedules cards at the exact moment before you forget them.',
  },
  {
    icon: '📊',
    title: 'Deep Analytics',
    desc: 'Unit-by-unit mastery scores, peer percentile ranking, and AI-projected exam readiness.',
  },
  {
    icon: '🗓️',
    title: 'Revision Plan Generator',
    desc: 'Personalised week-by-week study schedule built around your exam date and weak units.',
  },
  {
    icon: '👨‍🏫',
    title: 'Expert Tutors',
    desc: 'Book 1-on-1 sessions with verified registered nurses and NCK examiners via Zoom or WhatsApp.',
  },
];

const CADRES = [
  {
    id: 'krchn',
    label: 'KRCHN',
    full: 'Kenya Registered Community Health Nurse',
    papers: '2 papers · 100 MCQs each · 2 hours per paper',
    color: 'bg-primary-light border-primary/30',
    badge: 'bg-primary text-white',
  },
  {
    id: 'bscn',
    label: 'BScN',
    full: 'Bachelor of Science in Nursing',
    papers: '4 papers · 100 MCQs each · 3 hours per paper',
    color: 'bg-accent-light border-accent/30',
    badge: 'bg-accent text-dark',
  },
  {
    id: 'hd',
    label: 'Higher Diploma',
    full: 'Critical Care · Oncology · Renal · Psychiatric · Peri-Op',
    papers: '2 papers · specialty-specific · 2 hours per paper',
    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    badge: 'bg-success text-white',
  },
];

const TUTORS = [
  {
    name: 'Dr. Amina Wanjiku',
    title: 'RN, BScN, MSc Critical Care',
    cadres: ['BScN', 'Higher Diploma'],
    rating: 4.9,
    reviews: 87,
    students: 142,
    passRate: 94,
    rate: 1500,
    badge: 'gold',
    initials: 'AW',
  },
  {
    name: 'James Otieno',
    title: 'RN, KRCHN, Dip. Nursing Ed.',
    cadres: ['KRCHN'],
    rating: 4.8,
    reviews: 63,
    students: 98,
    passRate: 91,
    rate: 1000,
    badge: 'standard',
    initials: 'JO',
  },
  {
    name: 'Faith Muthoni',
    title: 'RN, BScN, NCK Examiner',
    cadres: ['KRCHN', 'BScN'],
    rating: 5.0,
    reviews: 41,
    students: 76,
    passRate: 97,
    rate: 1800,
    badge: 'gold',
    initials: 'FM',
  },
];

const STEPS = [
  { n: '01', title: 'Create your account', desc: 'Sign up free in 2 minutes. Select your cadre and target exam date.' },
  { n: '02', title: 'Take the diagnostic quiz', desc: '10 questions to map your baseline. We identify your weak units immediately.' },
  { n: '03', title: 'Study your personalised plan', desc: 'Practice MCQs, flashcards, and mock exams — all adapted to your gaps.' },
  { n: '04', title: 'Pass your NCK exam', desc: 'Walk in confident. You\'ve already sat the exam dozens of times on NurseFiti.' },
];

const PRICING = [
  {
    name: 'Free',
    price: 'KSh 0',
    period: 'forever',
    desc: 'Get started with no commitment.',
    features: ['50 practice questions/day', '1 mock exam/month', 'Basic analytics', 'Community study groups', 'Tutor booking access', 'Revision plan — KSh 999 per generation'],
    cta: 'Start Free',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Standard',
    price: 'KSh 1,200',
    period: '/month',
    desc: 'Everything you need to pass.',
    features: ['Unlimited MCQ practice', 'Unlimited mock exams', 'Full analytics & AI insights', 'Spaced repetition flashcards', 'Tutor booking access', 'Revision plan — KSh 499 per generation'],
    cta: 'Start Standard',
    href: '/signup',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'KSh 3,500',
    period: '/60-day cycle',
    desc: 'Intensive prep for your exam cycle.',
    features: ['Everything in Standard', '1 free revision plan per billing cycle', 'Additional plans — KSh 199 each', '2 tutor sessions included', 'Priority support via WhatsApp', 'Peer percentile leaderboard', 'Exam registration reminders'],
    cta: 'Go Premium',
    href: '/signup',
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    name: 'Cynthia Achieng',
    cadre: 'KRCHN · August 2025',
    text: 'I failed my first attempt and was devastated. NurseFiti\'s weak-area drill and the DigiProctor mock exams completely changed how I prepared. Passed with 74% on my second attempt.',
    initials: 'CA',
  },
  {
    name: 'Brian Kamau',
    cadre: 'BScN · May 2025',
    text: 'The revision plan generator was worth every shilling. It told me exactly which units to focus on given my 6 weeks left. I didn\'t waste a single study session.',
    initials: 'BK',
  },
  {
    name: 'Mercy Njeri',
    cadre: 'Higher Diploma (Critical Care) · November 2025',
    text: 'Booked 3 sessions with Dr. Amina through NurseFiti. She knew exactly what NCK examiners look for in Critical Care. First attempt pass.',
    initials: 'MN',
  },
];

const FAQS = [
  {
    q: 'Is NurseFiti only for KRCHN students?',
    a: 'No — NurseFiti supports all three NCK cadres: KRCHN, BScN, and Higher Diploma (Critical Care, Oncology, Renal, Psychiatric, Peri-Operative). Each cadre has its own question bank, mock exam papers, and tutor specialists.',
  },
  {
    q: 'How is NurseFiti different from just reading textbooks?',
    a: 'NurseFiti is built around active recall and exam simulation — the two most evidence-backed study methods. You practice the exact format of the NCK exam (DigiProctor interface, 100 MCQs, timed), get instant rationale feedback, and our AI tracks which units you\'re weakest in so you never waste time on what you already know.',
  },
  {
    q: 'How does the Revision Plan Generator work?',
    a: 'You enter your exam date, daily study hours, and your current baseline (or we pull it from your practice data). The generator builds a week-by-week schedule that prioritises Tier 1 high-yield NCK units, allocates more time to your weak areas, and includes a mock exam schedule for the final 2 weeks. Available on all plans: KSh 999 per generation on Free, KSh 499 on Standard, and KSh 199 on Premium — plus Premium users get 1 free generation every billing cycle.',
  },
  {
    q: 'Are the tutors verified?',
    a: 'Yes. Every tutor on NurseFiti submits their NCK registration certificate, academic qualifications, and national ID. Our team manually verifies each application before granting access. Gold-badge tutors have 5+ reviews, a 4.8+ rating, and often have NCK examiner backgrounds.',
  },
  {
    q: 'How do I pay? Do you accept M-Pesa?',
    a: 'All payments are via M-Pesa — no credit cards needed. When you subscribe or book a session, you\'ll receive an STK push to your M-Pesa number. Tutor payouts are also via M-Pesa.',
  },
  {
    q: 'Can I use NurseFiti on my phone?',
    a: 'Yes — NurseFiti is mobile-first. The entire platform is designed for phone screens. Most Kenyan nursing students study on their phones, so we\'ve optimised every screen for 375px and above.',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-accent' : 'text-neutral-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function VerificationBadge({ tier }: { tier: 'gold' | 'standard' }) {
  return tier === 'gold' ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-accent text-dark">
      ⭐ Gold Tutor
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">
      ✓ Verified
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark text-[var(--color-text)]">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-neutral-cream/90 dark:bg-dark/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" aria-label="NurseFiti home">
            <NurseFitiLogo variant="full" size={40} />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-neutral-mid">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#cadres" className="hover:text-primary transition-colors">Cadres</Link>
            <Link href="#tutors" className="hover:text-primary transition-colors">Tutors</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
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
              className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-accent text-dark rounded-lg hover:bg-accent-dark transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Kenya&apos;s #1 NCK Exam Prep Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[var(--color-text)] leading-tight mb-6">
            Pass Your NCK Exam
            <span className="block text-primary">First Attempt.</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-mid max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards,
            personalised revision plans, and live expert tutors — all in one platform built for
            Kenyan nursing graduates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-accent text-dark rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
            >
              Start Studying Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary border-2 border-primary rounded-xl hover:bg-primary-light transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-primary py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { value: '12,400+', label: 'Students Enrolled' },
            { value: '89%', label: 'First-Attempt Pass Rate' },
            { value: '5,000+', label: 'Practice Questions' },
            { value: '60+', label: 'Verified Tutors' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-heading font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-primary-light mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              Everything you need to pass
            </h2>
            <p className="text-neutral-mid max-w-xl mx-auto">
              No scattered PDFs. No guesswork. One platform with every tool a Kenyan nursing graduate needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--color-text)] mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-mid leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CADRE SELECTOR ── */}
      <section id="cadres" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-xlight dark:bg-dark-mid/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              Which path are you on?
            </h2>
            <p className="text-neutral-mid">
              NurseFiti is built specifically for each NCK cadre — not a one-size-fits-all approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CADRES.map((c) => (
              <div
                key={c.id}
                className={`border-2 rounded-2xl p-6 ${c.color}`}
              >
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 ${c.badge}`}>
                  {c.label}
                </span>
                <h3 className="text-lg font-heading font-bold text-[var(--color-text)] mb-2">{c.full}</h3>
                <p className="text-sm text-neutral-mid mb-4">{c.papers}</p>
                <Link
                  href="/signup"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Start {c.label} prep →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERT TUTORS ── */}
      <section id="tutors" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              Learn from verified NCK experts
            </h2>
            <p className="text-neutral-mid max-w-xl mx-auto">
              Every tutor is a registered nurse with verified NCK credentials. Many are active NCK examiners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {TUTORS.map((t) => (
              <div
                key={t.name}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-[var(--color-text)]">{t.name}</p>
                      <p className="text-xs text-neutral-mid">{t.title}</p>
                    </div>
                  </div>
                  <VerificationBadge tier={t.badge as 'gold' | 'standard'} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={t.rating} />
                  <span className="text-sm font-semibold text-[var(--color-text)]">{t.rating}</span>
                  <span className="text-xs text-neutral-mid">({t.reviews} reviews)</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-primary-xlight dark:bg-primary/10 rounded-lg p-2">
                    <p className="text-lg font-bold text-primary">{t.students}</p>
                    <p className="text-xs text-neutral-mid">Students</p>
                  </div>
                  <div className="bg-primary-xlight dark:bg-primary/10 rounded-lg p-2">
                    <p className="text-lg font-bold text-primary">{t.passRate}%</p>
                    <p className="text-xs text-neutral-mid">Pass Rate</p>
                  </div>
                  <div className="bg-accent-light dark:bg-accent/10 rounded-lg p-2">
                    <p className="text-lg font-bold text-accent-dark dark:text-accent">
                      {t.rate.toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-mid">KSh/hr</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {t.cadres.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href="/signup"
                  className="block w-full text-center py-2.5 text-sm font-bold bg-accent text-dark rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Book a Session
                </Link>
              </div>
            ))}
          </div>
          {/* Tutor CTAs */}
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-heading font-bold mb-2">Are you a registered nurse?</h3>
            <p className="text-primary-light mb-6 max-w-lg mx-auto">
              Join NurseFiti as an expert tutor. Set your own rate, manage your schedule, and earn via M-Pesa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup-tutor"
                className="px-6 py-3 font-bold bg-accent text-dark rounded-xl hover:bg-accent-dark transition-colors"
              >
                Sign Up as an Expert Tutor
              </Link>
              <Link
                href="/login?role=tutor"
                className="px-6 py-3 font-semibold border-2 border-white/40 text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                Tutor Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-xlight dark:bg-dark-mid/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              From signup to passing — 4 steps
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary/20 z-0" />
                )}
                <div className="relative z-10 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-heading font-bold text-lg mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-heading font-bold text-[var(--color-text)] mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-mid leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-neutral-mid">All plans paid via M-Pesa. No credit cards. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-8 border-2 flex flex-col ${
                  p.highlight
                    ? 'border-primary bg-primary text-white shadow-xl shadow-primary/20'
                    : 'border-[var(--color-border)] bg-[var(--color-card)]'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-accent text-dark">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className={`text-sm font-semibold mb-1 ${p.highlight ? 'text-primary-light' : 'text-neutral-mid'}`}>
                    {p.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-heading font-bold">{p.price}</span>
                    <span className={`text-sm ${p.highlight ? 'text-primary-light' : 'text-neutral-mid'}`}>
                      {p.period}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${p.highlight ? 'text-primary-light' : 'text-neutral-mid'}`}>
                    {p.desc}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${p.highlight ? 'text-accent' : 'text-success'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={p.highlight ? 'text-white' : 'text-[var(--color-text)]'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.href}
                  className={`block text-center py-3 rounded-xl font-bold transition-colors ${
                    p.highlight
                      ? 'bg-accent text-dark hover:bg-accent-dark'
                      : 'bg-primary text-white hover:bg-primary-mid'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-xlight dark:bg-dark-mid/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              Students who passed with NurseFiti
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text)] leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--color-text)]">{t.name}</p>
                    <p className="text-xs text-neutral-mid">{t.cadre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] mb-4">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-[var(--color-text)] hover:bg-primary-xlight dark:hover:bg-primary/10 transition-colors list-none">
                  {f.q}
                  <svg
                    className="w-5 h-5 text-neutral-mid flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-neutral-mid leading-relaxed border-t border-[var(--color-border)] pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIPS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-xlight dark:bg-dark-mid/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold mb-5">
            🤝 Partnerships & Collaborations
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-text)] mb-4">
            Partner with NurseFiti
          </h2>
          <p className="text-neutral-mid leading-relaxed mb-6">
            Are you a nursing school, hospital, professional association, or organisation looking to support nursing graduates in Kenya? We&apos;re open to institutional partnerships, bulk licensing, co-branded programmes, and content collaborations.
          </p>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 inline-block text-left">
            <p className="text-sm font-semibold text-[var(--color-text-secondary)] mb-1">Get in touch</p>
            <a
              href="mailto:docotyanga@gmail.com"
              className="text-lg font-bold text-primary hover:underline"
            >
              docotyanga@gmail.com
            </a>
            <p className="text-xs text-neutral-mid mt-2">We typically respond within 1–2 business days.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Your NCK exam is closer than you think.
          </h2>
          <p className="text-primary-light text-lg mb-8 max-w-xl mx-auto">
            Start free today. No credit card. No commitment. Just the most focused NCK prep available in Kenya.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 font-bold bg-accent text-dark rounded-xl hover:bg-accent-dark transition-colors text-lg"
            >
              Create Free Account
            </Link>
            <Link
              href="/signup-tutor"
              className="w-full sm:w-auto px-8 py-4 font-semibold border-2 border-white/40 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Apply as a Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-dark-mid text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <NurseFitiLogo variant="full" size={36} />
              <p className="text-sm text-neutral-light mt-4 leading-relaxed">
                Kenya&apos;s most intelligent NCK exam preparation platform. Built for KRCHN, BScN, and Higher Diploma nurses.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider text-neutral-light">Platform</h4>
              <ul className="space-y-2 text-sm text-neutral-light">
                <li><Link href="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/tutors" className="hover:text-white transition-colors">Find Tutors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider text-neutral-light">Resources</h4>
              <ul className="space-y-2 text-sm text-neutral-light">
                <li><Link href="/blog" className="hover:text-white transition-colors">NCK Study Blog</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About NurseFiti</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Centre</Link></li>
                <li>
                  <a
                    href="https://nck.go.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    NCK Official Site ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4 text-sm uppercase tracking-wider text-neutral-light">Contact</h4>
              <ul className="space-y-2 text-sm text-neutral-light">
                <li>
                  <a href="mailto:support@nursefiti.vercel.app" className="hover:text-white transition-colors">
                    support@nursefiti.vercel.app
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/254791952703"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Support
                  </a>
                </li>
                <li>
                  <a href="mailto:docotyanga@gmail.com" className="hover:text-white transition-colors">
                    Partnerships
                  </a>
                </li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-light">
            <p>© 2026 NurseFiti. All rights reserved.</p>
            <p>Made with ❤️ for Kenyan nurses</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
