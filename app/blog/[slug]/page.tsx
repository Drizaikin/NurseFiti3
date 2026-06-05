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
    title: 'NCK Exam Preparation Guide: Pass First Attempt (2026)',
    excerpt: 'Everything Kenyan nursing graduates need — exam structure, DigiProctor tips, and a proven 8-week study strategy for KRCHN, BScN and Higher Diploma.',
    category: 'Study Guide',
    readTime: '12 min read',
    date: '2026-05-01',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Most nursing graduates who fail the NCK exam studied hard. The problem wasn't effort — it was method. Here's what the research and candidate experience consistently shows works.

## What is the NCK Licensure Exam?

The Nursing Council of Kenya (NCK) licensure examination is the mandatory assessment every nursing graduate must pass before practising in Kenya. It is a computer-based test (CBT) administered through the **DigiProctor** platform at approved centres across the country. Passing is not optional — it is the gateway to your internship, your licence, and your income.

Miss one cycle, and you wait 4–6 months for the next sitting. That is the real cost of an unstructured study approach.

## Exam Structure by Cadre

### KRCHN (Kenya Registered Community Health Nurse)
- **2 integrated papers** — Paper I and Paper II
- Paper I: Medical-Surgical Nursing, Midwifery, Pharmacology
- Paper II: Community Health, Mental Health, Professional Issues
- Each paper: 100 MCQs in 2 hours

### BScN (Bachelor of Science in Nursing)
- **2 integrated competency papers** — Paper I and Paper II
- Paper I: Advanced Adult Health, Specialised Nursing, Maternal/Newborn
- Paper II: Community/Public Health, Research, Leadership, Mental Health
- Each paper: 100 MCQs in 2 hours

### Higher Diploma
- **2 specialty papers** — 100 MCQs each, 2 hours each
- Specialties: Critical Care, Oncology, Renal, Psychiatric, Peri-Operative

## The DigiProctor Interface

DigiProctor is the CBT platform NCK uses for all licensure examinations. Many candidates lose marks not because they lack knowledge — but because they encounter the interface for the first time on exam day. That is a solvable problem.

Key features you must know before sitting:
- **Question navigator grid** — colour-coded grid of all 100 questions; use it to flag and return
- **Flag for review** — mark uncertain questions without leaving them blank
- **Timer** — auto-submits when it reaches zero; turns red below 20 minutes
- **Free navigation** — move back and forward between questions at any time

**[Practice the DigiProctor interface on NurseFiti's mock exam →](https://www.nursefiti.co.ke/mock-exam)**

## A Proven 8-Week Study Strategy

### Weeks 1–2: Diagnostic & Foundation
Take a diagnostic session first. Identify which units you score below 60% in — those are your priority, not the units you already know.

### Weeks 3–5: Focused Unit Practice
Work through each unit in order of difficulty:
1. Read a concise summary of the unit
2. Practice 30–50 MCQs on that unit
3. Review every wrong answer with the rationale — not just the correct option
4. Add weak concepts to your flashcard deck for spaced repetition

**[Start unit-by-unit practice free on NurseFiti →](https://www.nursefiti.co.ke/practice)**

### Weeks 6–7: Mixed Practice & Mock Exams
Stop studying unit by unit. Switch to full mixed-topic sessions. Take at least 2 full mock exams per week under timed, DigiProctor-style conditions.

### Week 8: Review & Consolidation
No new topics. Review flashcards, revisit flagged questions from mock exams, focus on high-yield areas. Get adequate sleep the night before.

## The Most Common Mistakes

1. **Memorising without understanding** — NCK MCQs test application, not recall. You must know *why* an answer is correct.
2. **Skipping pharmacology** — drug calculations and mechanisms appear in every paper. They are not optional.
3. **No timed practice** — 100 questions in 2 hours means 72 seconds per question. Practice at that pace or the timer will catch you.
4. **Underestimating community health** — especially for KRCHN, Paper II is where many candidates lose the most marks. See our [KRCHN revision guide](https://www.nursefiti.co.ke/blog/krchn-exam-revision-tips) for the breakdown.

## Start Your Preparation Today

**[Create your free NurseFiti account →](https://www.nursefiti.co.ke/signup)**

NurseFiti brings adaptive MCQ practice, DigiProctor mock exams, spaced-repetition flashcards, and a personalised revision plan together in one platform — built specifically for the NCK exam.

> *Share this: "Solid breakdown of the NCK exam structure and an 8-week study plan — useful for anyone sitting soon: nursefiti.co.ke/blog/nck-exam-preparation-guide-kenya"*

## Sources & Further Reading

This guide is original editorial content by NurseFiti, informed by official NCK examination regulations and publicly available candidate experience. For official information:

- **Nursing Council of Kenya** — official website and examination regulations. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration, results, licence applications. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Tuko.co.ke** — *"NCK exam registration and timetable for the 2026 academic year"*. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)
- **Tuko.co.ke** — *"Nursing Council of Kenya license registration and renewal"*. [tuko.co.ke](https://www.tuko.co.ke/302415-nursing-council-kenya-license-registration-renewal.html)

*Exam structure details are based on NCK examination regulations. Always confirm the latest structure at [nckenya.com](https://www.nckenya.com) before your exam.*
    `,
  },
  {
    slug: 'krchn-exam-revision-tips',
    title: 'KRCHN Exam: How to Pass Paper I and Paper II (2026)',
    excerpt: 'Targeted revision for KRCHN candidates — what each paper tests, the ABCDE framework for MCQs, a 4-week plan, and the key numbers NCK will test you on.',
    category: 'KRCHN',
    readTime: '9 min read',
    date: '2026-05-05',
    cadres: ['KRCHN'],
    content: `
There is one mistake that costs KRCHN candidates more marks than any knowledge gap: treating Paper II as easier than Paper I. It isn't. Here's the full breakdown — and how to approach both.

## Understanding the KRCHN Exam

The KRCHN NCK exam has **two integrated papers**, each with 100 MCQs completed in 2 hours. Questions are scenario-based — you will be given a patient situation and asked what the nurse should do *first*, *next*, or *most appropriately*. The exam does not test memorisation. It tests prioritisation, emergency recognition, and safe clinical judgment.

## Paper Structure for KRCHN

### Paper I — Medical-Surgical + Midwifery + Pharmacology
- **Medical-Surgical Nursing** (30–35%) — common conditions, interventions, post-operative care, emergency recognition
- **Pharmacology** (20–25%) — drug classifications, dosage calculations, adverse effects, common protocols
- **Midwifery & Maternal Health** (15–20%) — antenatal care, safe delivery, postnatal care, obstetric emergencies
- **Paediatric Nursing** (10–15%) — common paediatric conditions, growth monitoring, immunisation
- **Anatomy & Physiology** (10–15%) — body systems, pathophysiology underlying clinical presentations

### Paper II — Community Health + Mental Health + Professional Issues
- **Community Health Nursing** (25–30%) — health promotion, disease prevention, community assessment, PHC
- **Mental Health Nursing** (15–20%) — mental status exam, psychiatric conditions, therapeutic communication
- **Environmental Health & Nutrition** (10–15%) — water sanitation, waste management, nutritional assessment
- **Research & Statistics** (10–15%) — basic research concepts, health data interpretation
- **Health Systems & Professional Issues** (10–15%) — Kenya MOH structure, nursing ethics, legal frameworks
- **Infection Prevention & Control** (10–15%) — standard precautions, sterilisation, isolation protocols

*These percentage ranges are based on publicly reported candidate experience. Confirm exact weightings with official NCK syllabus documents at [nckenya.com](https://www.nckenya.com).*

## The KRCHN MCQ Approach — ABCDE First

When a question asks what to do *first*, apply this priority order every time:
1. **Airway** — is it patent?
2. **Breathing** — is it adequate?
3. **Circulation** — is perfusion sufficient?
4. **Disability** — neurological status
5. **Exposure** — other findings

This framework eliminates wrong answers in the majority of emergency scenario questions. It is not specific to NCK — it is the internationally recognised primary survey used in clinical practice (see ATLS/ACLS protocols).

## Spaced Repetition: The Most Efficient Way to Retain KRCHN Content

The KRCHN exam covers a broad range of units. Spaced repetition — reviewing information at increasing intervals before you would forget it — is the most evidence-backed method for retaining large volumes of content. The SM-2 algorithm, which underpins NurseFiti's flashcard system, was validated in peer-reviewed research by Wozniak & Gorzelanczyk (1994) and subsequent studies.

**How to implement it practically:**
1. After studying a unit, create flashcards for key concepts, drug names, and normal values
2. Review new cards daily for the first week
3. Cards answered correctly move to 3-day, then 7-day, then 14-day intervals
4. Cards answered incorrectly return to daily review

**[Use NurseFiti's spaced-repetition flashcard system — free →](https://www.nursefiti.co.ke/flashcards)**

## 4-Week KRCHN Revision Plan

**Week 1:** Paper I — Medical-Surgical + Pharmacology (60 MCQs/day on [NurseFiti practice](https://www.nursefiti.co.ke/practice))
**Week 2:** Paper I — Midwifery, Maternal & Child Health, Anatomy & Physiology (60 MCQs/day)
**Week 3:** Paper II — Community Health + Mental Health + Environmental Health + mixed (80 MCQs/day)
**Week 4:** Full mock exams (2 per week) + flashcard review + weak unit drilling

## Key Numbers NCK Will Test You On

- Normal blood pressure: 120/80 mmHg *(JNC guidelines; WHO cardiovascular risk assessment)*
- Normal pulse: 60–100 bpm
- Normal respiratory rate: 12–20 breaths/min
- Normal temperature: 36.5–37.5°C
- Normal fasting blood glucose: 3.9–5.6 mmol/L *(WHO diabetes diagnostic criteria)*
- Kenya EPI immunisation: BCG at birth; OPV/DPT/Hib/PCV at 6, 10, 14 weeks; measles at 9 months *(Kenya MOH EPI schedule — [health.go.ke](https://www.health.go.ke))*

> *Share this: "KRCHN Paper I and II breakdown with a 4-week study plan — good prep resource: nursefiti.co.ke/blog/krchn-exam-revision-tips"*

## Sources & Further Reading

- **Nursing Council of Kenya** — regulations and approved programmes. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Kenya Ministry of Health** — Kenya National Immunisation Programme (EPI) schedule. [health.go.ke](https://www.health.go.ke)
- **WHO** — *Immunization schedules by antigen*. [who.int](https://www.who.int/teams/immunization-vaccines-and-biologicals/immunization-analysis-and-insights/global-monitoring/immunization-coverage/who-unicef-estimates-of-national-immunization-coverage)
- **Wozniak, P. & Gorzelanczyk, E.J. (1994)** — *"Optimization of repetition spacing in the practice of learning"*, Acta Neurobiologiae Experimentalis, 54(1), 59–62. Basis of the SM-2 spaced-repetition algorithm.

*Unit percentage ranges are based on candidate experience and publicly reported NCK examination patterns. Confirm with official NCK syllabus documents.*
    `,
  },
];

const POSTS_EXTRA: Post[] = [
  {
    slug: 'bscn-nursing-exam-kenya',
    title: 'BScN NCK Exam: High-Yield Topics & 6-Week Study Plan (2026)',
    excerpt: 'Unit breakdown for BScN Paper I and Paper II, the highest-yield topics, and a structured 6-week plan built around the NCK competency exam format.',
    category: 'BScN',
    readTime: '10 min read',
    date: '2026-05-10',
    cadres: ['BScN'],
    content: `
BScN candidates consistently underestimate Paper II. By the time most realise how much Research, Leadership, and Mental Health are tested, they have already lost the marks. Here's the full breakdown so you don't make that mistake.

## The BScN NCK Exam at a Glance

BScN candidates sit **2 integrated competency papers**, each with 100 MCQs and a 2-hour time limit. Unlike KRCHN, the BScN papers demand advanced clinical reasoning, evidence-based practice, and leadership judgment — not just protocol recall. Knowing which units to prioritise is the difference between passing and resitting.

**[See how NurseFiti structures BScN practice questions →](https://www.nursefiti.co.ke/practice)**

## Paper Breakdown

### Paper I — Advanced Adult Health + Specialised Nursing + Maternal/Newborn
- Advanced Medical-Surgical Nursing — cardiovascular, respiratory, endocrine, neurological, renal disorders with multi-system complications
- Critical Care Nursing — shock, sepsis, organ failure, ICU prioritisation
- Pharmacology — advanced drug interactions, dosage calculations, adverse effects, polypharmacy
- Surgical Nursing — peri-operative management, post-op complications
- Midwifery — obstetric emergencies (pre-eclampsia, PPH, obstructed labour)
- Maternal & Child Health — high-risk pregnancy, neonatal resuscitation
- Paediatric Nursing — acute paediatric conditions, nutritional disorders
- Anatomy & Physiology — pathophysiological basis for clinical presentations

### Paper II — Community/Public Health + Research + Leadership + Mental Health
- Community Health Nursing — community assessment, public health interventions, Kenya MOH guidelines
- Mental Health Nursing — mental status examination, psychotic and mood disorders, therapeutic communication, Mental Health Act Kenya (2022)
- Research & Evidence-Based Practice — research methodology, sampling, data analysis, critical appraisal
- Nursing Management & Leadership — delegation, quality improvement, interdisciplinary coordination
- Professional Ethics & Law — ethical frameworks, legal accountability, scope of practice
- Health Systems in Kenya — health policy, levels of care, health financing
- Infection Prevention & Control — standard and transmission-based precautions
- Nutrition — nutritional assessment and therapeutic diets across the lifespan

*Unit percentage distributions are based on publicly reported candidate experience. Confirm with official NCK syllabus documents at [nckenya.com](https://www.nckenya.com).*

## 6-Week BScN Study Plan

**Week 1:** Paper I — Advanced Medical-Surgical, Critical Care, Pharmacology (80 MCQs/day)
**Week 2:** Paper I — Surgical Nursing, Midwifery, Maternal & Child Health, Paediatrics (80 MCQs/day)
**Week 3:** Paper II — Community Health + Mental Health Nursing (80 MCQs/day)
**Week 4:** Paper II — Research & EBP + Nursing Leadership & Management (80 MCQs/day)
**Week 5:** Paper II — Professional Ethics, Health Systems, IPC, Nutrition + mixed practice (80 MCQs/day)
**Week 6:** Full mock exams (3 per week) + weak unit drilling + flashcard review

**[Build your personalised BScN revision plan on NurseFiti →](https://www.nursefiti.co.ke/revision-plan)**

## BScN-Specific Tips

**Research and leadership:** Paper II is where BScN candidates gain or lose the exam. Research and leadership content is highly scoreable because it is finite and logical — master the terminology, sampling methods, and delegation principles. They repeat across exam cycles. See also our [NCK past papers guide](https://www.nursefiti.co.ke/blog/nck-past-papers-practice) for how to use question banks effectively.

**Mental health communication:** Always choose the response that acknowledges the patient's feelings and keeps the conversation open. Avoid responses that give advice, minimise, or close the conversation.

**Advanced reasoning over recall:** Ask yourself: *What is the pathophysiology? What is the priority intervention? What evidence guides this?* Rote recall alone will not carry Paper I.

**Pharmacology integration:** Drug questions appear in both papers. Prioritise: antihypertensives, antidiabetics, antibiotics, anticoagulants, antipsychotics, antidepressants, and critical care medications.

> *Share this: "BScN NCK exam breakdown — Paper I and Paper II with a 6-week plan. Good reference: nursefiti.co.ke/blog/bscn-nursing-exam-kenya"*

## Sources & Further Reading

- **Nursing Council of Kenya** — official regulations and approved programmes. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Kenya Mental Health (Amendment) Act 2022** — Kenya Gazette Supplement No. 38, 7 April 2022. Referenced for mental health nursing regulatory content.
- **Tuko.co.ke** — *"NCK exam registration and timetable for the 2026 academic year"*. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)

*Unit ranges are based on candidate experience. Always verify the current syllabus with NCK directly.*
    `,
  },
  {
    slug: 'nck-past-papers-practice',
    title: 'NCK Past Papers: How to Use Them (Most Students Get This Wrong)',
    excerpt: 'Passive reading of past papers is almost useless. Learn the retrieval-practice method, how to categorise errors, and when to switch to timed mock exams.',
    category: 'Study Strategy',
    readTime: '8 min read',
    date: '2026-05-15',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
You have been using past papers wrong. Not because you are not working hard — but because passive review of questions and answers produces very little long-term retention. Here's the method that actually works, backed by cognitive science.

## The Problem with How Most Students Use Past Papers

Most nursing students read through questions and answers passively — almost like reading a textbook. It feels productive. The research says it barely works.

The most replicated finding in cognitive psychology is that **retrieval practice** — actively trying to recall an answer before seeing it — produces dramatically better long-term retention than passive review. Roediger & Karpicke (2006) showed that students who practised retrieval retained 50% more content after one week compared to students who re-read the same material.

## The Right Way to Use NCK Past Papers

### Step 1: Attempt First, Check Later
Cover the answer options. Read the question stem. Commit to an answer in your head. Then reveal the options, select, and check. That one extra step — forcing retrieval before exposure — is what makes the difference.

### Step 2: Analyse Every Wrong Answer
Don't note the correct answer and move on. For every wrong answer, ask:
- *Why did I choose the wrong option?*
- *What concept does this question test?*
- *What rule or principle do I need to remember?*

Write a one-sentence note per wrong answer. Review this error log weekly.

### Step 3: Categorise Your Errors

After 50+ questions, patterns emerge. Group your errors:
1. **Knowledge gaps** — you didn't know the content → go back and study that unit on NurseFiti
2. **Application errors** — you knew it but misapplied it → practice more scenario questions
3. **Careless errors** — you misread → slow down and read the full stem before the options
4. **Distractor traps** — a plausible wrong answer fooled you → learn to identify distractor patterns

### Step 4: Know When to Stop Using Past Papers

Past papers are for the **middle phase** of preparation (roughly weeks 3–5 of an 8-week plan). In the final 2 weeks, switch to full timed mock exams. Past papers train you on individual questions. Mock exams train:
- Time management across 100 questions
- Mental stamina for 2–3 hours of sustained focus
- The DigiProctor interface and navigation under pressure

**[Take a full DigiProctor-style mock exam on NurseFiti →](https://www.nursefiti.co.ke/mock-exam)**

## Where to Find NCK Past Papers

NCK does not officially publish past papers. Question banks compiled from candidate recall are widely circulated, but quality varies significantly — errors in unofficial past papers create false confidence. NurseFiti's question bank is verified, categorised by unit, and includes detailed rationales explaining *why* each answer is correct. See also our [DigiProctor exam guide](https://www.nursefiti.co.ke/blog/digiproctor-nck-exam-guide) for how to replicate the real exam environment.

**[Access NurseFiti's verified question bank →](https://www.nursefiti.co.ke/practice)**

## The Bottom Line

Retrieval practice + error analysis + timed mock exams = the evidence-backed formula. Past papers are a tool inside that system — not the system itself.

> *Share this: "If you've been reading through NCK past papers passively, this explains why that barely works — and what to do instead: nursefiti.co.ke/blog/nck-past-papers-practice"*

## Sources & Further Reading

- **Roediger, H.L. & Karpicke, J.D. (2006)** — *"Test-enhanced learning: Taking memory tests improves long-term retention"*, Psychological Science, 17(3), 249–255. [DOI: 10.1111/j.1467-9280.2006.01693.x](https://doi.org/10.1111/j.1467-9280.2006.01693.x)
- **Kornell, N. & Bjork, R.A. (2008)** — *"Learning concepts and categories: Is spacing the 'enemy of induction'?"*, Psychological Science, 19(6), 585–592. [DOI: 10.1111/j.1467-9280.2008.02127.x](https://doi.org/10.1111/j.1467-9280.2008.02127.x)
- **Nursing Council of Kenya** — official website. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)

*The study strategy framework is original editorial content by NurseFiti, applying established learning science to the NCK examination context.*
    `,
  },
  {
    slug: 'digiproctor-nck-exam-guide',
    title: 'DigiProctor NCK Exam Interface: What to Expect (2026)',
    excerpt: 'The NCK exam runs on DigiProctor CBT. Here is exactly what the interface looks like, how the navigator grid works, and how to practise so it is not new on exam day.',
    category: 'Exam Day',
    readTime: '7 min read',
    date: '2026-05-20',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Candidates who fail the NCK exam because of the DigiProctor interface do so for one reason: they have never used it before. The content is fine. The interface trips them. That is entirely preventable.

## What is DigiProctor?

DigiProctor is the computer-based testing (CBT) platform used by the Nursing Council of Kenya for all licensure examinations. NCK adopted CBT to improve examination security, reduce marking errors, and accelerate results release.

The interface has specific features that, if unfamiliar, cost you time and marks on exam day.

## The DigiProctor Interface: What You Will See

### The Exam Screen
- **Question stem** — displayed prominently in the centre
- **Answer options** — four options labelled A, B, C, D
- **Question counter** — shows position and total (e.g., "Question 23 of 100")
- **Timer** — countdown clock; turns red below 20 minutes remaining
- **Flag button** — marks a question for later review without submitting
- **Previous / Next buttons** — navigate freely between questions

### The Question Navigator Grid
A 10×10 grid showing all 100 questions. Colour-coded:
- **White/grey** — not yet visited
- **Blue/teal** — answered
- **Yellow/amber** — flagged for review
- **Red** — visited but not answered

Use it strategically: answer confident questions first, flag uncertain ones, return to flagged questions before submitting.

### Submission
Click "Submit Exam" manually when done. The system warns you of unanswered questions. Auto-submits when the timer reaches zero.

**[Practise on NurseFiti's DigiProctor-style mock exam →](https://www.nursefiti.co.ke/mock-exam)**

## Common DigiProctor Mistakes

1. **Spending too long on hard questions** — stuck after 90 seconds? Flag it and move on. Return at the end.
2. **Not using the flag feature** — candidates who skip flagging regularly forget to return to uncertain questions.
3. **Panicking when the timer turns red** — normal. Stay methodical and work through remaining questions.
4. **Submitting without checking the navigator** — always scan the grid before submitting to catch unanswered questions.

## Exam Day Logistics

- Arrive at least 30 minutes before your scheduled start time
- Bring your national ID and NCK exam admission letter — no admission without both
- No phones, notes, or electronic devices permitted in the exam room
- Scratch paper provided for calculations
- Invigilators guide you through login

Also read our [full NCK exam preparation guide](https://www.nursefiti.co.ke/blog/nck-exam-preparation-guide-kenya) for the complete content strategy alongside interface familiarity.

> *Share this: "If you haven't practised on DigiProctor before your NCK exam, this is worth reading: nursefiti.co.ke/blog/digiproctor-nck-exam-guide"*

## Sources & Further Reading

- **Nursing Council of Kenya** — official examination guidelines and centre information. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — admission letters, exam registration, results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Scribd — NCK Examination Instructions & Schedule** — *"Annexure 2: Examination instructions and schedule"*, 2025. [scribd.com](https://www.scribd.com/document/862497368/Annexure-2-Examination-instructions-and-schedule-2)

*DigiProctor interface details are based on candidate-reported experience. Follow invigilator instructions on exam day as the platform may be updated.*
    `,
  },
];

const POSTS_NEWS: Post[] = [
  {
    slug: 'nck-latest-news-june-2026',
    title: 'NCK June 2026: Feb Results, May Exam & Unaccredited College Warning',
    excerpt: 'NCK releases February 2026 results, May 2026 exam wraps up, and a formal warning is issued against Northlands NIMTC. Here is everything verified.',
    category: 'NCK News',
    readTime: '6 min read',
    date: '2026-06-05',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
If you sat the February 2026 NCK exam, your results are out. If you sat in May, yours are coming. And if someone you know is enrolled at Northlands International Medical Training College — read the warning section before they waste another semester.

*Last verified: 5 June 2026. Always confirm current information at [nckenya.com](https://www.nckenya.com).*

## February 2026 NCK Licensure Exam Results Released

The Nursing Council of Kenya has released results for the February 2026 Online Licensure Examination. According to The Kenya Times, NCK confirmed the results were released and directed candidates to the portal. The February series was conducted between **18 and 20 February 2026** at approved centres across Kenya.

To check your results: log in to the NCK Online Services Portal at [osp.nckenya.go.ke](https://osp.nckenya.go.ke) using your registration credentials.

**If you passed:** Apply for your practising licence within **30 days** of the results release. NCK requires prompt application — delays complicate the licencing process. Applications are processed through the same OSP portal.

**If you did not pass:** You are eligible to resit at the next available sitting. Before you register again, be honest about what went wrong. Candidates who resit without changing their preparation approach consistently get similar results. Start with a diagnostic session to identify your weakest units — not your strongest.

**[Start a free diagnostic practice session on NurseFiti →](https://www.nursefiti.co.ke/practice)**

## May 2026 NCK Licensure Exam — What Happened

The May 2026 NCK sitting started on **13 May 2026** for most programmes, with select programmes sitting on 14 and 15 May. This follows the standard NCK structure: two integrated papers per cadre, 100 MCQs each, 2 hours each, on the DigiProctor CBT platform. Source: Tuko.co.ke reporting on NCK's 2026 timetable.

Results for the May 2026 series are expected within the standard NCK turnaround window. Check [osp.nckenya.go.ke](https://osp.nckenya.go.ke) regularly.

## Upcoming: August 2026 Examination Sitting

The next sitting is the **August 2026 series**. NCK runs three sittings annually: February, May, and August/November. If you are preparing now, you have approximately 6–8 weeks.

Use that time well:
- Run a diagnostic session to find your weak units
- Allocate study time proportional to weakness, not comfort
- Take at least 2–3 full DigiProctor-style mock exams before sitting
- Review every wrong answer with rationales, not just the correct option

Registration deadlines will be announced on [nckenya.com](https://www.nckenya.com). Do not wait until the last week — late registration is not accommodated.

**[Build your August 2026 revision plan on NurseFiti →](https://www.nursefiti.co.ke/revision-plan)**

## NCK Warning: Northlands International Medical Training College

On **21 April 2026**, the Nursing Council of Kenya issued a formal public warning against **Northlands International Medical Training College (NIMTC)**. This was reported by Dawan Africa, Citizen Digital, and Kahawa Tungu, all citing NCK's statement directly.

NCK stated that NIMTC is offering nursing courses **without the Council's approval or clearance**. Any certificates issued by NIMTC for nursing or midwifery programmes will not be recognised for NCK licensure, registration, or lawful nursing practice in Kenya.

NCK also clarified: **"Nurse Aid" and "Nursing Assistant" are not recognised programmes** within its regulatory framework. No such certificate qualifies the holder to sit the NCK licensure exam or obtain a practising licence.

NIMTC subsequently responded, as reported by Tuko.co.ke, denying that it was offering unapproved NCK nursing programmes and stating it operates as a TVET institution. That response has been noted — however, NCK's formal regulatory position as of April 2026 remains as stated above. Students and guardians should verify accreditation directly with NCK, not with the institution itself.

NCK directed the public to [nckenya.com](https://www.nckenya.com) for the list of approved programmes and institutions as of April 2026.

## How to Verify Any Institution's NCK Accreditation

1. Go to [nckenya.com](https://www.nckenya.com) — the official NCK website
2. Navigate to the approved institutions and programmes list
3. Confirm your institution and programme appear on the list
4. If in doubt, contact NCK directly via the official contacts on the website

Do not rely on the institution to confirm its own accreditation status.

Also see our [NCK exam preparation guide](https://www.nursefiti.co.ke/blog/nck-exam-preparation-guide-kenya) for everything you need to get started once accreditation is confirmed.

> *Share this: "NCK Feb 2026 results are out — check osp.nckenya.go.ke. Also a warning about Northlands NIMTC that's worth knowing: nursefiti.co.ke/blog/nck-latest-news-june-2026"*

## Sources & References

- **The Kenya Times** — *"NCK February 2026 Licensure Exam Results Out"*, 28 April 2026. [thekenyatimes.com](https://thekenyatimes.com/education/nursing-council-releases-latest-licensure-exam-results/)
- **Tuko.co.ke** — *"NCK exam registration and timetable for the 2026 academic year"*, updated 8 April 2026. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)
- **Dawan Africa** — *"NCK Warns Public Over Unaccredited Courses at Northlands International Medical Training College"*, 21 April 2026. [dawan.africa](https://www.dawan.africa/news/nck-warns-public-over-unaccredited-courses-at-northlands-international-medical-training-college)
- **Kahawa Tungu** — *"NCK Flags Unapproved Nursing College"*, April 2026. [kahawatungu.com](https://kahawatungu.com/nck-flags-unapproved-nursing-college/)
- **Citizen Digital** — *"Nursing Council flags unrecognized courses at Northlands International College"*, April 2026. [citizen.digital](https://citizen.digital/article/nursing-council-flags-unrecognized-courses-at-northlands-international-college-n381170)
- **Tuko.co.ke** — *"Northlands International Medical Training College Clarifies Accreditation, Programs Amid NCK Notice"*, April 2026 (institution's response). [tuko.co.ke](https://www.tuko.co.ke/kenya/counties/624024-northlands-international-medical-training-college-clarifies-accreditation-programs-nck-notice/)
- **NCK Online Services Portal** — [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Official NCK website** — [nckenya.com](https://www.nckenya.com)

*Always verify exam dates, results, and accreditation status directly at [nckenya.com](https://www.nckenya.com), as information may change after publication.*
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
