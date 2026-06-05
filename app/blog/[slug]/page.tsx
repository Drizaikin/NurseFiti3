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
    title: 'The Complete NCK Exam Preparation Guide for Kenyan Nursing Graduates (2026)',
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
- **2 integrated papers** — Paper I and Paper II
- Paper I covers Medical-Surgical Nursing, Midwifery, and Pharmacology
- Paper II covers Community Health Nursing, Mental Health Nursing, and Professional Issues
- Each paper: 100 MCQs in 2 hours

### BScN (Bachelor of Science in Nursing)
- **2 integrated competency papers** — Paper I and Paper II
- Paper I covers Advanced Adult Health, Specialised Nursing, and Maternal/Newborn care
- Paper II covers Community/Public Health, Research, Leadership, and Mental Health
- Each paper: 100 MCQs in 2 hours

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

## Sources & Further Reading

This guide is based on original editorial content by NurseFiti, informed by official NCK examination regulations and publicly available candidate experience. For official information, refer to:

- **Nursing Council of Kenya** — official website and examination regulations. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration, results, and licence applications. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Tuko.co.ke** — *"NCK exam registration and timetable for the 2026 academic year"*. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)
- **Tuko.co.ke** — *"Nursing Council of Kenya license registration and renewal"*. [tuko.co.ke](https://www.tuko.co.ke/302415-nursing-council-kenya-license-registration-renewal.html)

*Exam structure details are based on NCK examination regulations. Always confirm the latest structure with the official NCK website before your exam.*
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

The KRCHN (Kenya Registered Community Health Nurse) NCK exam consists of **two integrated papers**, each with 100 MCQs to be completed in 2 hours. The exam tests your ability to apply nursing knowledge in both community and clinical settings — not just recall facts. Questions are scenario-based and test prioritisation, emergency recognition, and safe patient care.

## Paper Structure for KRCHN

### Paper I — Medical-Surgical + Midwifery + Pharmacology
- **Medical-Surgical Nursing** (30–35%) — common conditions, nursing interventions, post-operative care, emergency recognition
- **Pharmacology** (20–25%) — drug classifications, dosage calculations, adverse effects, common drug protocols
- **Midwifery & Maternal Health** (15–20%) — antenatal care, safe delivery, postnatal care, obstetric emergencies
- **Paediatric Nursing** (10–15%) — common paediatric conditions, growth monitoring, immunisation
- **Anatomy & Physiology** (10–15%) — body systems, pathophysiology underlying clinical presentations

### Paper II — Community Health + Mental Health + Professional Issues
- **Community Health Nursing** (25–30%) — health promotion, disease prevention, community assessment, PHC
- **Mental Health Nursing** (15–20%) — mental status examination, common psychiatric conditions, therapeutic communication
- **Environmental Health & Nutrition** (10–15%) — water sanitation, waste management, vector control, nutritional assessment
- **Research & Statistics** (10–15%) — basic research concepts, health data interpretation
- **Health Systems & Professional Issues** (10–15%) — Kenya MOH structure, nursing ethics, legal frameworks
- **Infection Prevention & Control** (10–15%) — standard precautions, sterilisation, isolation protocols

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

**Week 1:** Paper I focus — Medical-Surgical Nursing + Pharmacology (60 MCQs/day)
**Week 2:** Paper I focus — Midwifery, Maternal & Child Health, Anatomy & Physiology (60 MCQs/day)
**Week 3:** Paper II focus — Community Health + Mental Health + Environmental Health + mixed practice (80 MCQs/day)
**Week 4:** Full mock exams (2 per week) + flashcard review + weak unit drilling

## Key Numbers to Memorise

- Normal blood pressure: 120/80 mmHg
- Normal pulse: 60–100 bpm
- Normal respiratory rate: 12–20 breaths/min
- Normal temperature: 36.5–37.5°C
- Normal blood glucose (fasting): 3.9–5.6 mmol/L
- WHO immunisation schedule milestones: BCG at birth, OPV/DPT/Hib/PCV at 6/10/14 weeks, measles at 9 months

## Sources & Further Reading

This guide is original editorial content by NurseFiti. Clinical reference ranges and immunisation schedules are drawn from internationally recognised medical standards and Kenya Ministry of Health guidelines. For official NCK information:

- **Nursing Council of Kenya** — regulations and approved programmes. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Kenya Ministry of Health** — Kenya National Immunisation Programme guidelines. [health.go.ke](https://www.health.go.ke)
- **WHO immunisation schedule** — World Health Organization, *Immunization schedules by antigen*. [who.int](https://www.who.int/teams/immunization-vaccines-and-biologicals/immunization-analysis-and-insights/global-monitoring/immunization-coverage/who-unicef-estimates-of-national-immunization-coverage)

*The percentage weightings per unit are based on candidate experience and publicly reported NCK examination patterns. Confirm exact weightings with official NCK syllabus documents.*
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

BScN candidates sit **2 integrated competency papers**, each with 100 MCQs and a 2-hour time limit. Unlike KRCHN, the BScN papers demand advanced clinical reasoning, evidence-based practice, and leadership thinking — not just protocol recall. Knowing which units to prioritise and how to think through complex scenarios is the key to passing efficiently.

## Paper Breakdown

### Paper I — Advanced Adult Health + Specialised Nursing + Maternal/Newborn
The first paper integrates complex clinical management across acute and specialised settings:
- Advanced Medical-Surgical Nursing — cardiovascular, respiratory, endocrine, neurological, renal disorders with multi-system complications
- Critical Care Nursing — shock, sepsis, organ failure, ICU prioritisation
- Pharmacology — advanced drug interactions, dosage calculations, adverse effects, polypharmacy
- Surgical Nursing — peri-operative management, post-op complications
- Midwifery — obstetric emergencies (pre-eclampsia, PPH, obstructed labour)
- Maternal & Child Health — high-risk pregnancy, neonatal resuscitation
- Paediatric Nursing — acute paediatric conditions, nutritional disorders
- Anatomy & Physiology — pathophysiological basis for clinical presentations

### Paper II — Community/Public Health + Research + Leadership + Mental Health
The second paper tests independent professional judgment and systems-level thinking:
- Community Health Nursing — community assessment, public health interventions, Kenya MOH guidelines
- Mental Health Nursing — mental status examination, psychotic and mood disorders, therapeutic communication, Mental Health Act Kenya
- Research & Evidence-Based Practice — research methodology, sampling, data analysis, critical appraisal of studies
- Nursing Management & Leadership — delegation, quality improvement, interdisciplinary coordination
- Professional Ethics & Law — ethical frameworks, legal accountability, scope of practice
- Health Systems in Kenya — health policy, levels of care, health financing
- Infection Prevention & Control — standard and transmission-based precautions
- Nutrition — nutritional assessment and therapeutic diets across the lifespan

## 6-Week BScN Study Plan

**Week 1:** Paper I — Advanced Medical-Surgical, Critical Care, Pharmacology (80 MCQs/day)
**Week 2:** Paper I — Surgical Nursing, Midwifery, Maternal & Child Health, Paediatrics (80 MCQs/day)
**Week 3:** Paper II — Community Health + Mental Health Nursing (80 MCQs/day)
**Week 4:** Paper II — Research & EBP + Nursing Leadership & Management (80 MCQs/day)
**Week 5:** Paper II — Professional Ethics, Health Systems, IPC, Nutrition + mixed practice (80 MCQs/day)
**Week 6:** Full mock exams (3 per week) + weak unit drilling + flashcard review

## BScN-Specific Tips

**Research and leadership questions:** Many BScN candidates underestimate Paper II. Don't. Research and leadership content is highly scoreable because it is finite and logical. Master research terminology, sampling methods, data analysis concepts, and delegation principles — they repeat across exam cycles.

**Mental health communication:** Questions about therapeutic communication have one rule — always choose the response that acknowledges the patient's feelings and keeps the conversation open. Avoid responses that give advice, minimise feelings, or close the conversation.

**Advanced reasoning over recall:** BScN MCQs test analysis, synthesis, and evaluation. When answering, ask yourself: *What is the underlying pathophysiology? What is the priority intervention? What evidence guides this decision?* Rote recall alone will not carry you through Paper I.

**Pharmacology integration:** Drug questions appear across both papers. Prioritise: antihypertensives, antidiabetics, antibiotics, anticoagulants, antipsychotics, antidepressants, and critical care medications. Know mechanisms, not just names.

## Sources & Further Reading

This guide is original editorial content by NurseFiti. For official NCK examination information:

- **Nursing Council of Kenya** — official regulations and approved programmes. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Kenya Mental Health Act (2022)** — Kenya Gazette Supplement, Mental Health (Amendment) Act 2022. Referenced for mental health nursing regulatory content.
- **Tuko.co.ke** — *"NCK exam registration and timetable for the 2026 academic year"*. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)

*Unit percentage breakdowns are based on candidate experience and publicly reported NCK examination patterns. Always verify the current syllabus with NCK directly.*
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

## Sources & Further Reading

The learning science principles in this article — particularly retrieval practice and spaced repetition — are drawn from peer-reviewed cognitive psychology research:

- **Roediger, H.L. & Karpicke, J.D. (2006)** — *"Test-enhanced learning: Taking memory tests improves long-term retention"*, Psychological Science, 17(3), 249–255. The foundational study on retrieval practice and its superiority over passive review.
- **Kornell, N. & Bjork, R.A. (2008)** — *"Learning concepts and categories: Is spacing the 'enemy of induction'?"*, Psychological Science, 19(6), 585–592. On spaced practice and long-term retention.
- **Nursing Council of Kenya** — official website. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)

*The study strategy framework in this article is original editorial content by NurseFiti, drawing on established learning science principles applied to the NCK examination context.*
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

## Sources & Further Reading

This guide is original editorial content by NurseFiti, based on publicly available information about the DigiProctor CBT platform and NCK examination procedures:

- **Nursing Council of Kenya** — official examination guidelines and centre information. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — admission letters, exam registration, and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Scribd — NCK Examination Instructions & Schedule** — *"Annexure 2: Examination instructions and schedule"*, 2025. [scribd.com](https://www.scribd.com/document/862497368/Annexure-2-Examination-instructions-and-schedule-2)

*DigiProctor interface details are based on candidate-reported experience. The actual platform may be updated by NCK. Always follow instructions given by invigilators on exam day.*
    `,
  },
];

const POSTS_NEWS: Post[] = [
  {
    slug: 'nck-latest-news-june-2026',
    title: 'NCK Latest Updates: February 2026 Results Out, May Exams Done & Unaccredited College Warning',
    excerpt: 'The Nursing Council of Kenya releases February 2026 licensure exam results, the May 2026 sitting wraps up, and NCK warns the public against an unaccredited college. Everything you need to know.',
    category: 'NCK News',
    readTime: '6 min read',
    date: '2026-06-05',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
## February 2026 NCK Licensure Exam Results Released

The Nursing Council of Kenya has released results for the February 2026 Online Licensure Examination. The February series was conducted at approved examination centres across Kenya between **18 and 20 February 2026**.

To check your results, log in to the NCK Online Services Portal at [osp.nckenya.go.ke](https://osp.nckenya.go.ke). You will need your registration credentials to access your individual result.

**What to do if you passed:**
Apply for your practising licence within **30 days** of the results release. NCK regulations require successful candidates to apply promptly — delays can complicate the licencing process. Applications are processed through the same Online Services Portal.

**What to do if you did not pass:**
You are eligible to resit at the next available sitting. Use the time between now and the August 2026 series to diagnose your weak areas, structured your revision, and practise under timed, exam-like conditions. Candidates who resit without changing their study approach tend to get similar results.

## May 2026 NCK Licensure Exam — What Happened

The May 2026 NCK licensure examination cycle was scheduled to start on **13 May 2026** for most programmes, with select programmes sitting on 14 and 15 May 2026. The exam follows the standard NCK structure — two integrated papers per cadre, each with 100 MCQs completed in 2 hours on the DigiProctor CBT platform.

Results for the May 2026 series are expected to be released within the standard NCK turnaround window. Check the OSP portal regularly for updates: [osp.nckenya.go.ke](https://osp.nckenya.go.ke).

## Upcoming: August 2026 Examination Sitting

The next NCK licensure examination sitting is the **August 2026 series**. NCK typically organises three examination sittings per year — February, May, and August/November. 

If you are preparing for the August 2026 sitting, you have approximately 6–8 weeks of structured preparation time remaining. Use it well:
- Start with a diagnostic practice session to identify your weakest units
- Allocate more time to units you score below 60% in
- Take at least 2–3 full DigiProctor-style mock exams before your sitting date
- Review every wrong answer with rationales, not just the correct option

Registration deadlines for the August sitting will be announced on the NCK website at [nckenya.com](https://www.nckenya.com). Check there regularly and do not wait until the last week — late registration is not typically accommodated.

## NCK Warning: Northlands International Medical Training College

On **21 April 2026**, the Nursing Council of Kenya issued a formal public warning against **Northlands International Medical Training College (NIMTC)**, cautioning prospective students and their guardians against enrolling in nursing or midwifery programmes at the institution.

NCK stated that the college is offering nursing courses **without the Council's approval or clearance**, which means any certificates issued by that institution for nursing or midwifery programmes will not be recognised for the purposes of NCK licensure, registration, or lawful nursing practice in Kenya.

The Council also clarified an important point: **"Nurse Aid" and "Nursing Assistant" are not recognised programmes** within the professional framework regulated by the Nursing Council of Kenya. Any institution offering such certificates as a pathway to nursing licensure is misrepresenting the regulatory reality. No such certificate qualifies a holder to sit the NCK licensure exam or obtain a practising licence.

NCK's official statement directed the public to verify the accreditation status of any institution before enrolling: visit [nckenya.com](https://www.nckenya.com) for the current list of approved nursing and midwifery programmes and institutions.

**Why this matters for you:**
If you or someone you know is enrolled — or considering enrolment — at any nursing training institution, verify its NCK approval status first. Spending years and tuition money at an unaccredited institution can end a nursing career before it starts. The NCK website publishes an updated list of approved institutions and programmes.

## How to Verify an Institution's NCK Accreditation

1. Go to **[nckenya.com](https://www.nckenya.com)** — the official NCK website
2. Navigate to the list of approved institutions and programmes
3. Confirm your institution and programme appear on the list
4. If in doubt, contact NCK directly through their official contact channels on the website

Do not rely on the institution itself to confirm its own accreditation — always verify directly with NCK.

## Stay Ahead of NCK Updates

NCK announcements — results releases, exam dates, accreditation warnings, and policy changes — are published on the official NCK website and the OSP portal. NurseFiti tracks these updates and publishes timely summaries here on the blog so you always have accurate, verified information.

If you are preparing for an upcoming NCK sitting, NurseFiti gives you adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards, and a personalised revision plan built around your exam date.

## Sources & References

The information in this article is sourced from verified news reports and official NCK communications:

- **February 2026 NCK results release** — The Kenya Times, *"NCK February 2026 Licensure Exam Results Out"*, reported 28 April 2026. [thekenyatimes.com](https://thekenyatimes.com/education/nursing-council-releases-latest-licensure-exam-results/)
- **May 2026 exam dates** — Tuko.co.ke, *"NCK exam registration and timetable for the 2026 academic year"*, updated 8 April 2026. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)
- **Northlands NIMTC warning** — Dawan Africa, *"NCK Warns Public Over Unaccredited Courses at Northlands International Medical Training College"*, 21 April 2026. [dawan.africa](https://www.dawan.africa/news/nck-warns-public-over-unaccredited-courses-at-northlands-international-medical-training-college)
- **Northlands NIMTC warning (corroboration)** — Kahawa Tungu, *"NCK Flags Unapproved Nursing College"*, April 2026. [kahawatungu.com](https://kahawatungu.com/nck-flags-unapproved-nursing-college/)
- **Northlands NIMTC warning (corroboration)** — Citizen Digital, *"Nursing Council flags unrecognized courses at Northlands International College"*, April 2026. [citizen.digital](https://citizen.digital/article/nursing-council-flags-unrecognized-courses-at-northlands-international-college-n381170)
- **Official NCK portal** — Nursing Council of Kenya Online Services Portal. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Official NCK website** — Nursing Council of Kenya. [nckenya.com](https://www.nckenya.com)

*Always verify exam dates, results, and accreditation status directly on the official NCK website, as information may change after publication.*
    `,
  },
];

const ALL_POSTS = [...POSTS_NEWS, ...POSTS, ...POSTS_EXTRA];

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

// Per-post hero images (Unsplash free CDN)
const POST_IMAGES: Record<string, { url: string; alt: string; credit: string }> = {
  'nck-latest-news-june-2026': {
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing exam results announcement — nurses celebrating',
    credit: 'Unsplash',
  },
  'nck-exam-preparation-guide-kenya': {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing student studying for NCK exam',
    credit: 'Unsplash',
  },
  'krchn-exam-revision-tips': {
    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&auto=format&fit=crop',
    alt: 'KRCHN nurse in community health setting',
    credit: 'Unsplash',
  },
  'bscn-nursing-exam-kenya': {
    url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80&auto=format&fit=crop',
    alt: 'BScN nursing student at hospital',
    credit: 'Unsplash',
  },
  'nck-past-papers-practice': {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80&auto=format&fit=crop',
    alt: 'Student studying past exam papers at desk',
    credit: 'Unsplash',
  },
  'digiproctor-nck-exam-guide': {
    url: 'https://images.unsplash.com/photo-1588776814546-1ffbb9b0ea79?w=1200&q=80&auto=format&fit=crop',
    alt: 'Computer-based exam testing interface',
    credit: 'Unsplash',
  },
};

const CATEGORY_STYLES: Record<string, { badge: string; dot: string }> = {
  'Study Guide':    { badge: 'bg-primary-light text-primary border border-primary/20',        dot: 'bg-primary' },
  'KRCHN':          { badge: 'bg-accent-light text-accent-dark border border-accent/20',       dot: 'bg-accent' },
  'BScN':           { badge: 'bg-primary-light text-primary-mid border border-primary-mid/20', dot: 'bg-primary-mid' },
  'Study Strategy': { badge: 'bg-accent-light text-accent-dark border border-accent/30',       dot: 'bg-accent-dark' },
  'Exam Day':       { badge: 'bg-[#FFF0F0] text-error border border-error/20 dark:bg-error/10 dark:text-error', dot: 'bg-error' },
  'NCK News':       { badge: 'bg-primary-xlight text-primary border border-primary/30',        dot: 'bg-primary' },
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
  let inSourcesSection = false;

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
      const heading = trimmed.slice(3);
      inSourcesSection = heading.toLowerCase().includes('source') || heading.toLowerCase().includes('reference');
      if (inSourcesSection) {
        elements.push(
          <div key={key++} className="mt-12 pt-6 border-t-2 border-primary/20">
            <h2 className="text-lg font-heading font-bold text-neutral-mid mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs">📎</span>
              {heading}
            </h2>
          </div>
        );
      } else {
        elements.push(
          <h2 key={key++} className="text-2xl font-heading font-bold text-[var(--color-text)] mt-10 mb-4 pb-2 border-b-2 border-primary/20">
            {heading}
          </h2>
        );
      }
    } else if (trimmed.startsWith('- ')) {
      if (inSourcesSection) {
        elements.push(
          <li key={key++} className="flex items-start gap-2 text-sm text-neutral-mid leading-relaxed mb-2">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-light flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
          </li>
        );
      } else {
        elements.push(
          <li key={key++} className="flex items-start gap-2 text-[var(--color-text)] leading-relaxed mb-1.5">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }} />
          </li>
        );
      }
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
      if (inSourcesSection) {
        elements.push(
          <p key={key++} className="text-xs text-neutral-mid italic leading-relaxed mb-2"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      } else {
        elements.push(
          <p key={key++} className="text-[var(--color-text)] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      }
    }
  }
  return elements;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[var(--color-text)]">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold underline underline-offset-2 hover:text-primary-mid transition-colors">$1</a>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-primary-light text-primary text-sm font-mono border border-primary/20">$1</code>');
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = ALL_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = ALL_POSTS.filter(
    (p) => p.slug !== post.slug && p.cadres.some((c) => post.cadres.includes(c))
  ).slice(0, 2);

  const catStyle = CATEGORY_STYLES[post.category] ?? CATEGORY_STYLES['Study Guide'];
  const heroImg = POST_IMAGES[post.slug];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://www.nursefiti.co.ke/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    ...(heroImg ? { image: heroImg.url } : {}),
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
          <span className="text-neutral-light">/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span className="text-neutral-light">/</span>
          <span className="text-[var(--color-text)] truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${catStyle.badge}`}>
              {post.category}
            </span>
            <span className="text-sm text-neutral-mid">{post.readTime}</span>
            <span className="text-neutral-light">·</span>
            <time dateTime={post.date} className="text-sm text-neutral-mid">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--color-text)] leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-neutral-mid leading-relaxed mb-5">{post.excerpt}</p>
          {/* Cadre tags */}
          <div className="flex flex-wrap gap-2">
            {post.cadres.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full text-sm font-semibold bg-primary-light text-primary border border-primary/20">
                {c}
              </span>
            ))}
          </div>
        </header>

        {/* Hero image */}
        {heroImg && (
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-10 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImg.url}
              alt={heroImg.alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Brand teal gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(8,81,79,0.10) 0%, rgba(8,81,79,0.45) 100%)' }}
            />
            {/* Category badge overlay */}
            <div className="absolute bottom-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${catStyle.badge}`}>
                {post.category}
              </span>
            </div>
          </div>
        )}

        {/* Teal accent divider */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-1 w-12 rounded-full bg-primary" />
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {/* Article content */}
        <article className="prose-nursefiti">
          <ul className="list-none p-0 m-0 space-y-1">
            {renderContent(post.content)}
          </ul>
        </article>

        {/* CTA banner */}
        <div
          className="mt-14 rounded-2xl p-8 text-center text-white overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #08514F 0%, #0A6865 60%, #133828 100%)' }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <p className="text-3xl mb-2">📝</p>
            <h2 className="text-2xl font-heading font-bold mb-2">Put this into practice</h2>
            <p className="text-primary-light mb-6 max-w-lg mx-auto text-sm leading-relaxed">
              NurseFiti gives you adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards,
              and a personalised revision plan — all built for the NCK exam.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #F5A623 0%, #C47F0A 100%)', color: '#0F1C1C', boxShadow: '0 0 20px rgba(245,166,35,0.40)' }}
            >
              Start Free Today
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 rounded-full bg-accent" />
              <h2 className="text-xl font-heading font-bold text-[var(--color-text)]">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => {
                const rpCat = CATEGORY_STYLES[rp.category] ?? CATEGORY_STYLES['Study Guide'];
                const rpImg = POST_IMAGES[rp.slug];
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group block bg-[var(--color-card)] border border-[var(--color-border)] hover:border-primary/40 rounded-xl overflow-hidden transition-all hover:shadow-card-hover"
                  >
                    {rpImg && (
                      <div className="relative h-28 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={rpImg.url} alt={rpImg.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(8,81,79,0.5) 100%)' }} />
                      </div>
                    )}
                    <div className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${rpCat.badge}`}>
                        {rp.category}
                      </span>
                      <h3 className="text-sm font-heading font-bold text-[var(--color-text)] group-hover:text-primary transition-colors leading-snug">
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-mid transition-colors"
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
