import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';

// ─── Post data ───────────────────────────────────────────────────────────────

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  cadres: string[];
  content: string;
}

const POSTS: Post[] = [
  {
    slug: 'nck-exam-preparation-guide-kenya',
    title: 'The Complete NCK Exam Preparation Guide for Kenyan Nursing Graduates (2025)',
    excerpt: 'Everything you need to know about the NCK licensure exam — structure, topics, DigiProctor interface, and a proven study strategy to pass first attempt.',
    category: 'Study Guide',
    readTime: '12 min read',
    date: '2026-05-01',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
## What is the NCK Licensure Exam?

The Nursing Council of Kenya (NCK) licensure examination is the mandatory assessment that every nursing graduate must pass before practising as a registered nurse in Kenya. It is a computer-based test (CBT) administered through the **DigiProctor** platform at approved examination centres across the country.

Passing the NCK exam is not optional — it is the gateway to your nursing career. Yet many graduates underestimate its difficulty, especially those who rely solely on classroom notes without structured exam preparation.

## Exam Structure by Cadre

### KRCHN (Kenya Registered Community Health Nurse)
- **2 papers** — Paper 1 and Paper 2
- **100 MCQs per paper**
- **2 hours per paper**
- Topics: Community Health Nursing, Maternal & Child Health, Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology

### BScN (Bachelor of Science in Nursing)
- **4 papers** — Paper 1, Paper 2, Paper 3, and Paper 4
- **100 MCQs per paper**
- **2 hours per paper**
- Paper 1: Medical-Surgical Nursing & Pharmacology
- Paper 2: Maternal, Child & Community Health
- Paper 3: Mental Health & Psychiatric Nursing
- Paper 4: Research, Management & Professional Issues

### Higher Diploma
- **2 papers** — specialty-specific
- **100 MCQs per paper**
- **2 hours per paper**
- Specialties: Critical Care, Oncology, Renal, Psychiatric, Peri-Operative

## The DigiProctor Interface

DigiProctor is the CBT platform used by NCK. Many candidates lose marks not because they don't know the content, but because they are unfamiliar with the interface on exam day. Key features:

- **Question navigator grid** — shows all questions, flagged questions, and answered/unanswered status
- **Flag for review** — mark questions to revisit before submitting
- **Timer** — displayed prominently; auto-submits when time expires
- **No back-navigation penalty** — you can move freely between questions

**The fix:** Practice on a DigiProctor-style interface before exam day. NurseFiti's mock exam module replicates the exact layout, including the dark theme, grid navigator, and countdown timer.

## A Proven 8-Week Study Strategy

### Weeks 1–2: Diagnostic & Foundation
Take a diagnostic quiz to identify your weakest units. Don't start with your strongest topics — start with the units that carry the most marks and where you score below 60%.

### Weeks 3–5: Focused Unit Practice
Work through each unit systematically. For each unit:
1. Read your notes or a concise summary
2. Practice 30–50 MCQs on that unit
3. Review every wrong answer — read the rationale, not just the correct option
4. Add weak concepts to your flashcard deck

### Weeks 6–7: Mixed Practice & Mock Exams
Stop studying unit by unit. Switch to mixed-topic practice sessions that mirror the real exam. Take at least 2 full mock exams per week under timed conditions.

### Week 8: Review & Consolidation
No new topics. Review your flashcards, revisit flagged questions from mock exams, and focus on high-yield topics. Get adequate sleep the night before the exam.

## The Most Common Mistakes

1. **Memorising without understanding** — NCK MCQs test application, not recall. You need to understand *why* an answer is correct.
2. **Skipping pharmacology** — Drug calculations and drug mechanisms appear in every paper. Don't neglect them.
3. **Not practising under time pressure** — 100 questions in 2–3 hours means roughly 1–1.5 minutes per question. Practice at that pace.
4. **Ignoring community health** — KRCHN candidates especially underestimate community health nursing. It is heavily weighted.

## Start Your Preparation Today

NurseFiti gives you everything in this guide in one platform: adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards, and a personalised revision plan built around your exam date.
    `,
  },
  {
    slug: 'krchn-exam-revision-tips',
    title: 'KRCHN Exam Revision Tips: How to Pass the Kenya Registered Community Health Nurse Exam',
    excerpt: 'Targeted revision strategies for KRCHN candidates. Learn which units carry the most marks, how to approach MCQs, and how to use spaced repetition effectively.',
    category: 'KRCHN',
    readTime: '9 min read',
    date: '2026-05-05',
    cadres: ['KRCHN'],
    content: `
## Understanding the KRCHN Exam

The KRCHN (Kenya Registered Community Health Nurse) NCK exam consists of two papers, each with 100 MCQs to be completed in 2 hours. The exam tests your ability to apply nursing knowledge in community and clinical settings — not just recall facts.

## High-Yield Units for KRCHN

Based on past exam patterns, these units consistently carry the most marks:

### Paper 1 — Community & Primary Health Care
- **Community Health Nursing** (25–30% of paper) — health promotion, disease prevention, community assessment
- **Maternal & Child Health** (20–25%) — antenatal care, postnatal care, immunisation schedules, nutrition
- **Environmental Health** (10–15%) — water sanitation, waste management, vector control

### Paper 2 — Clinical Nursing
- **Medical-Surgical Nursing** (30–35%) — common conditions, nursing interventions, post-operative care
- **Pharmacology** (20–25%) — drug classifications, dosage calculations, adverse effects
- **Anatomy & Physiology** (15–20%) — body systems, pathophysiology

## The KRCHN MCQ Approach

KRCHN MCQs are scenario-based. You will be given a patient situation and asked what the nurse should do *first*, *next*, or *most appropriately*. 

**The ABCDE framework:**
When a question asks what to do first, apply this priority order:
1. **Airway** — is the airway patent?
2. **Breathing** — is the patient breathing adequately?
3. **Circulation** — is there adequate perfusion?
4. **Disability** — neurological status
5. **Exposure** — other findings

This framework eliminates wrong answers in most emergency scenario questions.

## Spaced Repetition for KRCHN

The KRCHN exam covers a broad range of topics. The most efficient way to retain this volume of information is spaced repetition — reviewing information at increasing intervals just before you would forget it.

**How to implement it:**
1. After studying a unit, create flashcards for key concepts, drug names, and normal values
2. Review new cards daily for the first week
3. Cards you know well get pushed to 3-day, then 7-day, then 14-day intervals
4. Cards you struggle with stay on short intervals until mastered

NurseFiti's flashcard system does this automatically using the SM-2 algorithm.

## 4-Week KRCHN Revision Plan

**Week 1:** Community Health Nursing + Maternal & Child Health (60 MCQs/day)  
**Week 2:** Medical-Surgical Nursing + Pharmacology (60 MCQs/day)  
**Week 3:** Environmental Health + Anatomy & Physiology + mixed practice (80 MCQs/day)  
**Week 4:** Full mock exams (2 per week) + flashcard review + weak unit drilling

## Key Numbers to Memorise

- Normal blood pressure: 120/80 mmHg
- Normal pulse: 60–100 bpm
- Normal respiratory rate: 12–20 breaths/min
- Normal temperature: 36.5–37.5°C
- Normal blood glucose (fasting): 3.9–5.6 mmol/L
- WHO immunisation schedule milestones: BCG at birth, OPV/DPT/Hib/PCV at 6/10/14 weeks, measles at 9 months
    `,
  },
];

const POSTS_EXTRA: Post[] = [
  {
    slug: 'bscn-nursing-exam-kenya',
    title: 'BScN NCK Exam: Unit Breakdown, High-Yield Topics & Study Plan',
    excerpt: 'A detailed breakdown of the BScN NCK exam papers, the highest-yield units, and a 6-week study plan that has helped hundreds of BScN graduates pass first attempt.',
    category: 'BScN',
    readTime: '10 min read',
    date: '2026-05-10',
    cadres: ['BScN'],
    content: `
## The BScN NCK Exam at a Glance

BScN candidates sit **4 papers**, each with 100 MCQs and a 2-hour time limit. The exam covers a broad clinical and community scope — knowing which units to prioritise is the key to passing efficiently.

## Paper Breakdown

### Paper 1 — Medical-Surgical Nursing
The largest paper by content volume. Focus areas:
- Cardiovascular disorders (MI, heart failure, hypertension)
- Respiratory disorders (pneumonia, COPD, TB)
- Endocrine disorders (diabetes mellitus, thyroid disorders)
- Neurological disorders (stroke, meningitis, epilepsy)
- Renal disorders (AKI, CKD, nephrotic syndrome)
- Pharmacology — drug classifications, dosage calculations, adverse effects

### Paper 2 — Maternal, Child & Community Health
- Obstetric complications (pre-eclampsia, PPH, obstructed labour)
- Neonatal care and common neonatal conditions
- Paediatric nursing (malnutrition, diarrhoea, pneumonia in children)
- Community health and primary health care

### Paper 3 — Mental Health & Psychiatric Nursing
Often underestimated. High-yield topics:
- Mental status examination
- Psychotic disorders (schizophrenia, bipolar)
- Anxiety and mood disorders
- Substance use disorders
- Therapeutic communication techniques
- Mental Health Act Kenya

### Paper 4 — Research, Management & Professional Issues
- Nursing research methodology
- Evidence-based practice
- Nursing management and leadership
- Professional ethics and legal issues
- Health systems in Kenya

## 6-Week BScN Study Plan

**Week 1:** Medical-Surgical Paper 1 — cardiovascular, respiratory, endocrine (80 MCQs/day)
**Week 2:** Medical-Surgical Paper 1 — neurological, renal, pharmacology (80 MCQs/day)
**Week 3:** Maternal, Child & Community Health (80 MCQs/day)
**Week 4:** Mental Health & Psychiatric Nursing (80 MCQs/day)
**Week 5:** Research, Management & Professional Issues + mixed practice (80 MCQs/day)
**Week 6:** Full mock exams (3 per week) + weak unit drilling + flashcard review

## BScN-Specific Tips

**Research paper:** Many BScN candidates neglect Paper 4. Don't. It is highly scoreable because the content is finite and logical. Master research terminology, sampling methods, and data analysis concepts — they repeat across exam cycles.

**Mental health communication:** Questions about therapeutic communication have one rule — always choose the response that acknowledges the patient's feelings and keeps the conversation open. Avoid responses that give advice, minimise feelings, or close the conversation.

**Pharmacology across all papers:** Drug questions appear in every paper. Know your drug classes, mechanisms, and key adverse effects. Prioritise: antihypertensives, antidiabetics, antibiotics, anticoagulants, antipsychotics, and antidepressants.
    `,
  },
  {
    slug: 'nck-past-papers-practice',
    title: 'How to Use NCK Past Papers Effectively (And Why Most Students Do It Wrong)',
    excerpt: 'Past papers are powerful — but only if you use them correctly. Learn the active recall method, how to analyse your mistakes, and when to switch from past papers to timed mock exams.',
    category: 'Study Strategy',
    readTime: '8 min read',
    date: '2026-05-15',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
## The Problem with How Most Students Use Past Papers

Most nursing students use past papers the wrong way. They read through questions and answers passively — almost like reading a textbook. This feels productive but produces very little actual learning.

The research on learning is clear: **retrieval practice** (actively trying to recall an answer before seeing it) produces far better long-term retention than passive review.

## The Right Way to Use NCK Past Papers

### Step 1: Attempt First, Check Later
Cover the answer options. Read the question stem. Try to answer it in your head before looking at the options. Then reveal the options and select your answer. Only then check the correct answer.

This extra step — forcing your brain to retrieve before seeing the answer — dramatically improves retention.

### Step 2: Analyse Every Wrong Answer
When you get a question wrong, don't just note the correct answer and move on. Ask:
- *Why did I choose the wrong option?* (misread the question? knowledge gap? distractor worked?)
- *What concept does this question test?*
- *What is the rule or principle I need to remember?*

Write a one-sentence note for each wrong answer. This is your personal error log — review it weekly.

### Step 3: Categorise Your Errors

After 50+ questions, you will see patterns. Group your errors:
1. **Knowledge gaps** — you simply didn't know the content → go back and study that unit
2. **Application errors** — you knew the content but misapplied it → practice more scenario questions on that topic
3. **Careless errors** — you misread the question → slow down and read more carefully
4. **Distractor traps** — you were fooled by a plausible wrong answer → learn to identify distractor patterns

### Step 4: Know When to Stop Using Past Papers

Past papers are for the **middle phase** of your preparation (weeks 3–5 of an 8-week plan). In the final 2 weeks, switch to **full timed mock exams**. 

Why? Past papers train you on individual questions. Mock exams train you on:
- Time management across 100 questions
- Mental stamina for 2–3 hours of sustained focus
- The DigiProctor interface and navigation
- Exam-day decision-making under pressure

## Where to Find NCK Past Papers

NCK does not officially publish past papers. However, question banks compiled from candidate recall are widely circulated. The most reliable source is a structured platform like NurseFiti, where questions are verified, categorised by unit, and accompanied by detailed rationales — not just answer keys.

## The Bottom Line

Past papers + active recall + error analysis = a powerful combination. But they are a tool, not a strategy. Use them as part of a structured plan, not as a substitute for one.
    `,
  },
  {
    slug: 'digiproctor-nck-exam-guide',
    title: 'DigiProctor NCK Exam: What to Expect and How to Prepare for the Interface',
    excerpt: 'The NCK now uses DigiProctor for computer-based testing. Here\'s exactly what the interface looks like, how navigation works, and how to practice so the technology doesn\'t slow you down on exam day.',
    category: 'Exam Day',
    readTime: '7 min read',
    date: '2026-05-20',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
## What is DigiProctor?

DigiProctor is the computer-based testing (CBT) platform used by the Nursing Council of Kenya for the NCK licensure examination. It replaced paper-based exams to improve security, reduce marking errors, and enable faster results.

If you have never used DigiProctor before, the interface can feel unfamiliar on exam day — and unfamiliarity costs time and marks.

## The DigiProctor Interface: What You Will See

### The Exam Screen
- **Question stem** — displayed prominently in the centre
- **Answer options** — four options labelled A, B, C, D
- **Question counter** — shows your current question number and total (e.g., "Question 23 of 100")
- **Timer** — countdown clock in the top corner; turns red when less than 20 minutes remain
- **Flag button** — marks a question for review without submitting an answer
- **Previous / Next buttons** — navigate between questions freely

### The Question Navigator Grid
A 10×10 grid showing all 100 questions. Each cell is colour-coded:
- **White/grey** — not yet visited
- **Blue/teal** — answered
- **Yellow/amber** — flagged for review
- **Red** — visited but not answered

Use this grid strategically: answer all questions you are confident about first, flag uncertain ones, then return to flagged questions in the remaining time.

### Submission
You must manually click "Submit Exam" when done. The system will warn you if there are unanswered questions. If the timer reaches zero, the exam auto-submits with whatever answers you have entered.

## Common DigiProctor Mistakes

1. **Spending too long on hard questions** — if you are stuck after 90 seconds, flag it and move on. Return at the end.
2. **Not using the flag feature** — candidates who don't flag questions often forget to return to uncertain ones.
3. **Panicking when the timer turns red** — this is normal. You have 20 minutes for remaining questions. Stay calm and work through them.
4. **Not reviewing flagged questions** — always check the navigator grid before submitting to ensure no flagged questions are left unanswered.

## How to Practice for DigiProctor

The only way to be comfortable with DigiProctor on exam day is to practice in a similar environment beforehand. NurseFiti's mock exam module replicates:

- The dark-themed DigiProctor interface
- The 10×10 question navigator grid
- The countdown timer with red warning
- The flag-for-review functionality
- Auto-submit on timer expiry
- Full results review with rationales after submission

Take at least 3–4 full mock exams on NurseFiti before your exam date. By the time you sit the real exam, the interface will feel completely natural.

## Exam Day Logistics

- Arrive at the examination centre at least 30 minutes early
- Bring your national ID and NCK exam admission letter
- No phones, notes, or electronic devices in the exam room
- You will be provided with scratch paper for calculations
- Invigilators will guide you through the login process

The exam itself is the same content you have been practising. The only variable is the interface — and now you know exactly what to expect.
    `,
  },
];

const ALL_POSTS = [...POSTS, ...POSTS_EXTRA];

// ─── generateStaticParams ────────────────────────────────────────────────────

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

// ─── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = ALL_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.nursefiti.co.ke/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['NurseFiti'],
      tags: post.cadres,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://www.nursefiti.co.ke/blog/${post.slug}`,
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'Study Guide': 'bg-primary-light text-primary',
  'KRCHN': 'bg-accent-light text-accent-dark',
  'BScN': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'Study Strategy': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  'Exam Day': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Render the markdown-like content string into JSX */
function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />);
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-heading font-bold text-[var(--color-text)] mt-8 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-heading font-bold text-[var(--color-text)] mt-10 mb-4 pb-2 border-b border-[var(--color-border)]">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('- ')) {
      elements.push(
        <li key={key++} className="flex items-start gap-2 text-[var(--color-text)] leading-relaxed mb-1">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
        </li>
      );
    } else if (/^\d+\./.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\./)?.[1];
      elements.push(
        <li key={key++} className="flex items-start gap-3 text-[var(--color-text)] leading-relaxed mb-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {num}
          </span>
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^\d+\.\s*/, '')) }} />
        </li>
      );
    } else {
      elements.push(
        <p key={key++} className="text-[var(--color-text)] leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    }
  }
  return elements;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-primary-light text-primary text-sm font-mono">$1</code>');
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = ALL_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = ALL_POSTS.filter(
    (p) => p.slug !== post.slug && p.cadres.some((c) => post.cadres.includes(c))
  ).slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://www.nursefiti.co.ke/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'NurseFiti',
      url: 'https://www.nursefiti.co.ke',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NurseFiti',
      url: 'https://www.nursefiti.co.ke',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.nursefiti.co.ke/icon.svg',
      },
    },
    about: {
      '@type': 'Thing',
      name: 'NCK Licensure Examination Kenya',
    },
    keywords: post.cadres.join(', ') + ', NCK exam Kenya, nursing exam preparation',
  };

  return (
    <>
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-mid mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[var(--color-text)] truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[post.category] ?? 'bg-primary-light text-primary'}`}>
              {post.category}
            </span>
            <span className="text-sm text-neutral-mid">{post.readTime}</span>
            <span className="text-sm text-neutral-mid">·</span>
            <time dateTime={post.date} className="text-sm text-neutral-mid">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-mid leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.cadres.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full text-sm font-semibold bg-primary-light text-primary">
                {c}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <hr className="border-[var(--color-border)] mb-10" />

        {/* Article content */}
        <article className="prose-nursefiti">
          <ul className="list-none p-0 m-0 space-y-1">
            {renderContent(post.content)}
          </ul>
        </article>

        {/* CTA */}
        <div className="mt-14 bg-primary rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-heading font-bold mb-2">Put this into practice</h2>
          <p className="text-primary-light mb-6 max-w-lg mx-auto">
            NurseFiti gives you adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards,
            and a personalised revision plan — all built for the NCK exam.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 font-bold bg-accent text-dark rounded-xl hover:bg-accent-dark transition-colors"
          >
            Start Free Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-heading font-bold text-[var(--color-text)] mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group block bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary/40 rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${CATEGORY_COLORS[rp.category] ?? 'bg-primary-light text-primary'}`}>
                    {rp.category}
                  </span>
                  <h3 className="text-sm font-heading font-bold text-[var(--color-text)] group-hover:text-primary transition-colors leading-snug">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </main>
    </>
  );
}
