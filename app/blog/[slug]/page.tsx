import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { BlogSampleMCQ } from '@/components/blog/BlogSampleMCQ';

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
    slug: 'moh-nursing-internship-deployment-kenya-2026',
    title: 'Ministry of Health 2026 Internship Deployment: What You Must Do By June 29',
    excerpt: 'The Ministry of Health has confirmed the July 1st, 2026 deployment of 6,360 healthcare interns, including 2,000 BSc Nursing Officers. Here is how to collect your offer letter.',
    category: 'NCK News',
    readTime: '4 min read',
    date: '2026-06-27',
    cadres: ['BScN'],
    content: `
Many nursing graduates spend months anxiously waiting for their internship postings, fearing they might be left out of the national cohort. If you have been waiting, the wait is officially over.

The Ministry of Health has just announced the deployment of 6,360 healthcare interns for the 2026/2027 cohort. Out of this group, 2,000 slots have been specifically allocated to BSc Nursing Officers. The official start date for this internship cycle is July 1, 2026.

If you are one of the designated pre-interns, this update contains critical, time-sensitive instructions on how to secure your placement.

## Offer Letter Collection Details

The Ministry has mandated a strict process for collecting your official offer letter. **All pre-interns must report to Afya House, Nairobi, on Monday, June 29, 2026, to collect their letters in person.**

You will not be allowed to collect your letter without a valid **National ID**. Ensure you have your original identification document ready before travelling.

<div class="bg-primary-xlight border border-primary/20 p-4 rounded-xl my-6">
  <strong>Key Takeaway:</strong> The collection window is firm. If you miss the June 29 deadline at Afya House, you risk delaying your internship start date or losing your slot entirely in this cohort.
</div>

**[Are you a KRCHN/BScN candidate still waiting to sit your licensure exam? Start your preparation early on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## What to Expect Next

Once you collect your offer letter, your internship will officially commence on July 1, 2026. You will be deployed to various designated internship centres across the country. 

This period is critical for translating your academic knowledge into clinical practice. It is also the stepping stone to full registration with the Nursing Council of Kenya (NCK) after successful completion.

## The Competition is Real

The deployment of 2,000 BSc Nursing Officers is a significant move, but it also highlights how competitive the field has become. Securing your licensure and completing your internship smoothly is non-negotiable. 

If you are still a student or preparing for your upcoming NCK exams, you need to treat your preparation with the same urgency as this internship deployment. 

**[NurseFiti's mock exam replicates the DigiProctor interface exactly. Try a free mock exam →](https://www.nursefiti.co.ke/signup)**

## Start Your Preparation Today

Don't wait until your final year to start worrying about licensure and internships. The best time to start preparing is now. Structured, spaced repetition and continuous mock exams are the proven ways to guarantee a first-attempt pass.

**[Start your free NurseFiti account — no credit card required](https://www.nursefiti.co.ke/signup)**

> *Found this — really important update on the MOH 2026 internship deployment for BSc Nurses. Offer letters are being collected on Monday June 29 at Afya House. Share with anyone who is waiting for their posting: nursefiti.co.ke/blog/moh-nursing-internship-deployment-kenya-2026*

---

### Sources & References

*Always verify official Ministry communications directly at [health.go.ke](https://www.health.go.ke) or official MOH channels.*

- **Ministry of Health, Kenya** — Official announcement regarding the deployment of 6,360 healthcare interns for the 2026/2027 cohort. [health.go.ke](https://www.health.go.ke)
    `,
  },
  {
    slug: 'nck-exam-warning-unaccredited-colleges-kenya-2026',
    title: 'NCK Exam Warning 2026: The Unaccredited College Alert You Must Know',
    excerpt: 'The Nursing Council of Kenya has issued a formal warning regarding unaccredited training institutions. Verify your college status to avoid NCK exam disqualification.',
    category: 'NCK News',
    readTime: '6 min read',
    date: '2026-06-25',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Imagine spending three years of your life, millions of shillings in tuition, and countless sleepless nights on the ward—only to discover your nursing college wasn't accredited. You try to register for the NCK exam on the OSP portal, and the system rejects you. Your degree or diploma is completely void.

This isn't a theoretical fear. The Nursing Council of Kenya (NCK) has just issued a serious public warning addressing this exact nightmare scenario.

In this update, we cover the latest June 2026 NCK announcements, including the unaccredited institution alert, the status of the February 2026 results, and what happens next for the May 2026 cohort.

## The NCK Warning on Unaccredited Colleges

The NCK has issued formal warnings regarding institutions offering nursing training without proper council accreditation. Specifically, the Council named **Northlands International Medical Training College**, alerting the public that nursing programs from this institution are not currently recognised.

Why does this matter? Because the NCK is the sole regulatory body for nursing education in Kenya. If your college is not accredited by the NCK, you **cannot** sit for the national licensure examination. You will not receive a licence, and you cannot legally practise as a nurse in Kenya.

Before enrolling in any nursing program, or if you are currently enrolled and unsure, you must verify your institution's status. The NCK maintains an updated list of approved training institutions.

<div class="bg-primary-xlight border border-primary/20 p-4 rounded-xl my-6">
  <strong>Key Takeaway:</strong> Always verify institutional accreditation directly on the official NCK website before paying tuition fees. Do not rely on verbal assurances from college administrators.
</div>

**[Ready to see if you are prepared for the NCK exam? Start practising on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## February 2026 Results are Live

If you sat for the February 2026 NCK licensure examination, the wait is over. The results have been officially released and are accessible via the NCK Online Services Portal (OSP).

For candidates who passed: Congratulations! Your next immediate step is to apply for your practising licence through the same portal. Do not delay this step, as internship postings often require proof of licensure or successful exam completion.

For candidates who did not pass: Do not panic. NCK reports that a significant proportion of first-attempt candidates do not pass — making structured preparation, not casual revision, the distinguishing factor. You will have to wait for the next available cycle to re-sit. Use this time to completely change your study approach. Reading notes doesn't work; active recall and mock exams do.

## May 2026 Exams Concluded

The May 2026 series of national licensure examinations has officially concluded. To all the candidates who just finished, take a well-deserved break. The hard work of studying is behind you.

You are now in the waiting period. NCK will communicate the release date for the results in due course. Keep a close eye on the official OSP portal and your registered email address.

## How to Protect Your Nursing Career

The recent warning about unaccredited colleges is a reminder of how strict the NCK regulations are. The Council does not compromise on standards, whether it's college accreditation or the licensure exam itself.

When it comes to the exam, you need to treat it with the same level of seriousness. The NCK exam format (DigiProctor) is unique, and the questions are designed to test clinical application, not just rote memorisation.

**[NurseFiti's mock exam replicates the DigiProctor interface exactly. Try a free mock exam →](https://www.nursefiti.co.ke/signup)**

## Start Your Preparation Today

Whether you are waiting for your May results, preparing to re-sit after February, or gearing up for the August/November cycles, your preparation strategy dictates your outcome.

Do not wait until the last minute. Structured, spaced repetition and continuous mock exams are the only proven ways to guarantee a first-attempt pass.

**[Start your free NurseFiti account — no credit card required](https://www.nursefiti.co.ke/signup)**

> *Found this — really useful update on the latest NCK news, especially the warning about unaccredited colleges. Also has info on the Feb results. Share with anyone who needs it: nursefiti.co.ke/blog/nck-exam-warning-unaccredited-colleges-kenya-2026*

---

### Sources & References

*Always verify current exam information and institutional accreditation directly at [nckenya.com](https://www.nckenya.com).*

- **NurseFiti Market Intelligence** — Verified NCK operational updates and exam cycle tracking (June 2026).
- **The Kenya Times** — Coverage on NCK portal operations and licensure processes. [thekenyatimes.com](https://thekenyatimes.com)
- **Nursing Council of Kenya** — Official website for verifying approved training institutions. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal (OSP)** — Official portal for exam results and licence applications. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
    `,
  },
  {
    slug: 'fathers-day-appreciation-dads-role',
    title: "The Unsung Heroes: Celebrating the Significance of Dads this Father's Day",
    excerpt: 'A heartfelt reflection on the evolving role of fathers, their impact on our resilience, and why their presence is irreplaceable in our lives.',
    category: 'Community',
    readTime: '3 min read',
    date: '2026-06-21',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Father’s Day is more than just a date on the calendar; it is a dedicated moment to pause and reflect on the profound impact fathers and father figures have on our lives. While mothers often get (and rightfully deserve) a spotlight for their nurturing warmth, the role of a dad is equally foundational, shaping the trajectory of our lives in quiet, profound ways.

## The Evolution of Fatherhood

The image of the modern dad has evolved significantly. Gone are the days when a father’s sole role was to be the stern breadwinner. Today’s dads are emotionally present, deeply involved in the daily mechanics of parenting, and are comfortable being both vulnerable and strong. They are the bedtime storytellers, the weekend soccer coaches, the math tutors, and the shoulder to cry on.

## The Pillars of Strength and Guidance

Dads have a unique way of teaching us about the world. They are often our first introduction to resilience. When we fall, a father is usually the one who dusts off our knees and tells us to try again. This kind of tough love is not about being unsympathetic; rather, it’s about instilling confidence and a belief that we can overcome adversity.

They also teach us by example. A father's work ethic, the way he treats others, and his integrity serve as a blueprint for our own moral compass. Through their actions, dads teach us about responsibility, commitment, and the importance of showing up, even when it’s hard.

## The Magic of "Dad Energy"

There is a specific kind of magic to "dad energy." It’s the dad jokes that make us groan but secretly smile. It’s the elaborate, sometimes chaotic, pancake breakfasts on Sunday mornings. It’s the way they can turn a simple cardboard box into a spaceship or a rainy afternoon into an adventure. Dads often bring a sense of playfulness and spontaneity that balances the structure of family life.

## A Lasting Impact

The significance of a dad’s presence cannot be overstated. Studies consistently show that children with involved fathers are more likely to have higher self-esteem, better academic performance, and stronger emotional intelligence. But beyond the statistics, the true impact of a father is felt in the heart. It’s the quiet reassurance that no matter how big the world gets, there is always someone in your corner.

## To All the Dads

To the new dads navigating sleepless nights, the seasoned dads watching their children step into adulthood, the grandfathers passing down generations of wisdom, and the father figures who have stepped up to fill a void—thank you.

Thank you for the sacrifices you make, the love you give, and the strength you provide. Your role is not just significant; it is irreplaceable.

Happy Father's Day.
    `,
  },
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

**[Practice the DigiProctor interface on NurseFiti's mock exam →](https://www.nursefiti.co.ke/signup)**

## A Proven 8-Week Study Strategy

### Weeks 1–2: Diagnostic & Foundation
Take a diagnostic session first. Identify which units you score below 60% in — those are your priority, not the units you already know.

### Weeks 3–5: Focused Unit Practice
Work through each unit in order of difficulty:
1. Read a concise summary of the unit
2. Practice 30–50 MCQs on that unit
3. Review every wrong answer with the rationale — not just the correct option
4. Add weak concepts to your flashcard deck for spaced repetition

**[Start unit-by-unit practice free on NurseFiti →](https://www.nursefiti.co.ke/signup)**

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

**[Use NurseFiti's spaced-repetition flashcard system — free →](https://www.nursefiti.co.ke/signup)**

## 4-Week KRCHN Revision Plan

**Week 1:** Paper I — Medical-Surgical + Pharmacology (60 MCQs/day on [NurseFiti practice](https://www.nursefiti.co.ke/signup))
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

**[See how NurseFiti structures BScN practice questions →](https://www.nursefiti.co.ke/signup)**

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

**[Build your personalised BScN revision plan on NurseFiti →](https://www.nursefiti.co.ke/signup)**

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

**[Take a full DigiProctor-style mock exam on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## Where to Find NCK Past Papers

NCK does not officially publish past papers. Question banks compiled from candidate recall are widely circulated, but quality varies significantly — errors in unofficial past papers create false confidence. NurseFiti's question bank is verified, categorised by unit, and includes detailed rationales explaining *why* each answer is correct. See also our [DigiProctor exam guide](https://www.nursefiti.co.ke/blog/digiproctor-nck-exam-guide) for how to replicate the real exam environment.

**[Access NurseFiti's verified question bank →](https://www.nursefiti.co.ke/signup)**

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

**[Practise on NurseFiti's DigiProctor-style mock exam →](https://www.nursefiti.co.ke/signup)**

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
    slug: 'nck-may-2026-exam-results-released',
    title: 'NCK May 2026 Exam Results Released: How to Check (2026)',
    excerpt: 'The Nursing Council of Kenya has officially released the May 2026 licensure examination results. Find out how to check and your next steps.',
    category: 'NCK News',
    readTime: '6 min read',
    date: '2026-06-27',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Most nursing graduates checking their May 2026 NCK results will find exactly what they hoped for. But for some, the portal will show a different outcome — and what you do in the next 24 hours determines whether you waste another 6 months or fix the problem permanently.

The wait is officially over. The [Nursing Council of Kenya (NCK)](https://www.nckenya.com) has officially released the results for the **May 2026 licensure examination** series. Whether you sat for KRCHN, BScN, or Higher Diploma papers during the mid-May sitting, you can now access your official standing.

In this update, we will cover exactly how to access your results safely, the immediate next steps for successful candidates as mandated by the Council, and the one specific mistake unsuccessful candidates must avoid. We will cover that mistake below — keep reading.

## How to Check Your May 2026 Results

As per standard Council protocol, results are released exclusively through the [NCK Online Services Portal (OSP)](https://osp.nckenya.go.ke). Do not trust third-party lists or unverified WhatsApp forwards claiming to have "leaked" results. 

Follow these steps to access your official results:
1. Navigate to the official **[NCK Online Services Portal](https://osp.nckenya.go.ke)**
2. Log in using the same credentials you used to register for the exam
3. Navigate to the "Examinations" or "Results" tab on your dashboard
4. Your individual result slip will be available for viewing and download

If the portal is slow, it is due to high traffic. NCK typically releases results on a rolling basis, so if yours are not immediately visible, continue checking periodically.

**[Start preparing for the next step of your nursing career with NurseFiti →](https://www.nursefiti.co.ke/signup)**

## What to Do If You Passed

Congratulations! Passing the NCK licensure exam is the culmination of years of hard work. 

Your next immediate step is to **[apply for your practising licence](https://www.nursefiti.co.ke/blog/how-to-apply-nck-licence-kenya)**. According to [NCK regulations](https://www.nckenya.com), successful candidates must initiate the licensure process on the OSP portal within 30 days of the results release. Delays in applying can complicate your licensing process and delay your internship or employment postings, which require proof of active licensure. 

<div class="bg-primary-xlight border border-primary/20 p-4 rounded-xl my-6">
  <strong>Key Takeaway:</strong> Passing the exam does not automatically generate your licence. You must actively initiate the application process on the <a href="https://osp.nckenya.go.ke" target="_blank" class="text-primary hover:underline">OSP portal</a>.
</div>

## What to Do If You Did Not Pass

If you did not pass, do not panic. It is a setback, not the end of your nursing career. NCK reports that a significant proportion of first-attempt candidates do not pass due to the rigorous clinical reasoning required by the [DigiProctor CBT platform](https://www.nckenya.com). 

However, this brings us to the mistake you must avoid: **Do not simply re-read your old notes and hope for a better result.** 

If your current study strategy resulted in a fail, using it again for the August 2026 sitting will yield the same outcome. The NCK exam tests application and clinical judgment, not rote memorisation. You need a structured revision plan that focuses on your weakest units.

**[NurseFiti's diagnostic mock exams replicate the DigiProctor interface exactly. Try a free mock exam →](https://www.nursefiti.co.ke/signup)**

Join the thousands of Kenyan nurses already preparing systematically on NurseFiti. Focus on retrieval practice, spaced repetition, and timed mock exams.

**[Start your free NurseFiti account — no credit card required](https://www.nursefiti.co.ke/signup)**

> *Found this — NCK just released the May 2026 results. You can check them on the OSP portal now. Also has good info on the licence application process: nursefiti.co.ke/blog/nck-may-2026-exam-results-released*

---

### Sources & References

*Always verify current exam information directly at [nckenya.com](https://www.nckenya.com).*

- **NurseFiti Market Intelligence** — Verified NCK operational updates and exam cycle tracking (June 2026).
- **Nursing Council of Kenya** — Official announcements and examination regulations. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal (OSP)** — Official portal for exam results and licence applications. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
    `,
  },
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

**[Start a free diagnostic practice session on NurseFiti →](https://www.nursefiti.co.ke/signup)**

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

**[Build your August 2026 revision plan on NurseFiti →](https://www.nursefiti.co.ke/signup)**

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
  {
    slug: 'nck-june-2026-update',
    title: 'NCK June 2026 Update: Exam Results, May Cycle Wrap‑up & Unaccredited College Warning',
    excerpt: 'Latest NCK news: February results released, May exam concluded, Directorate of Nurses reinstated, and NOYA awards launched. Everything verified.',
    category: 'NCK News',
    readTime: '9 min read',
    date: '2026-06-25',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
The Ministry of Health just reinstated the Directorate of Nurses — a move that changes the leadership landscape for every nurse in Kenya. Meanwhile, NCK has released the February 2026 results, wrapped up the May sitting, and there is a government-backed awards scheme you should know about. Here is everything that happened this month, verified and sourced.

There is one change in this update that affects your career trajectory more than exam results — and most nursing graduates have not heard about it yet. Keep reading.

*Last verified: 25 June 2026. Always confirm current information at [nckenya.com](https://www.nckenya.com).*

## Directorate of Nurses Reinstated by the Ministry of Health

During the International Nurses and Midwives Day celebrations in Nairobi in May 2026, Health Cabinet Secretary Aden Duale announced the **reinstatement of the Directorate of Nurses**. According to the Ministry of Health, the absence of this directorate had long hampered the profession, and its restoration is a constitutional step to improve leadership, management, and empowerment of nurses in Kenya.

This is significant because nurses make up approximately **58% of Kenya's health workforce**, according to the Ministry of Health. Having a dedicated directorate means nurses will have direct representation at the policy-making level — influencing staffing ratios, career progression frameworks, and working conditions.

For nursing students and new graduates: this is the institutional change that creates the environment for better internship placements, improved career pathways, and stronger professional advocacy. It is worth watching closely.

**[Start preparing for the NCK exam that opens these doors — practise free on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## Nurse of the Year Awards (NOYA) Launched

Alongside the Directorate reinstatement, the Ministry of Health launched the **Nurses and Midwives Recognition and Awards Scheme**, officially called the **Nurse of the Year Awards (NOYA)**. The scheme was announced during International Nurses Week (6–12 May 2026) under the theme *"Our Nurses, Our Future — Empowered Nurses Save Lives."*

According to The Star, the NOYA scheme is designed to celebrate excellence, promote professionalism, and honour the dedication and leadership of nurses and midwives who serve as the backbone of Kenya's healthcare system.

For current students: this is the kind of professional recognition framework that adds value to your licence. Pass the NCK exam, get licensed, practise with excellence — and this scheme creates a pathway for national recognition.

## February 2026 NCK Licensure Exam Results

The NCK released the February 2026 Online Licensure Examination results. According to The Kenya Times, candidates were directed to the NCK Online Services Portal (OSP) to access their results.

If you passed: Apply for your practising licence within **30 days** at [osp.nckenya.go.ke](https://osp.nckenya.go.ke). Delays complicate the process.

If you did not pass: You are eligible to resit at the next available sitting. Before you register again, take an honest diagnostic of your weak areas. NCK reports that a significant proportion of first-attempt candidates do not pass — the distinguishing factor is structured preparation, not extra hours of casual reading.

<div class="bg-primary-xlight border border-primary/20 p-4 rounded-xl my-6">
  <strong>Key Takeaway:</strong> Whether you passed or not, the next step requires action now. Passed? Apply for your licence today. Did not pass? Start a structured diagnostic practice session to identify your weakest units before the August sitting.
</div>

**[NurseFiti's mock exam replicates the DigiProctor interface exactly. Try a free mock exam →](https://www.nursefiti.co.ke/signup)**

## May 2026 Exams Concluded — August Is Next

The May 2026 series of national licensure examinations has officially concluded. Results are expected within the standard NCK turnaround window. Keep checking [osp.nckenya.go.ke](https://osp.nckenya.go.ke).

The next sitting is the **August 2026 series** — approximately **6–8 weeks away**. NCK does not accommodate late registration. Once the deadline passes, you wait for the next cycle, which means 4–6 months lost.

If you are preparing now, here is what matters most in the next 6 weeks:

1. Run a diagnostic to identify your weakest units
2. Focus 70% of study time on weak areas, not comfort zones
3. Take at least 3 full mock exams under timed conditions
4. Review every incorrect answer with the rationale — understand *why*, not just *what*
5. Use spaced repetition flashcards for high-yield pharmacology and drug calculations

See our [8-week NCK prep plan](https://www.nursefiti.co.ke/blog/nck-august-2026-exam-prep-plan) for a week-by-week breakdown.

## Test Yourself: Sample NCK Question

Here is the type of question you will face on the NCK exam. Try it — select your answer and submit to see the correct answer with a full rationale, exactly as NurseFiti users experience it:

<div class="sample-mcq-embed" data-question-slug="nck-june-2026-update-sample"></div>

Want access to thousands more questions like this, with AI-powered explanations? **[Create your free NurseFiti account →](https://www.nursefiti.co.ke/signup)**

## NCK Warning on Unaccredited Colleges Remains Active

The NCK's formal warning regarding **Northlands International Medical Training College (NIMTC)** remains in effect. The Council stated in April 2026 that NIMTC is offering nursing courses without approval, and certificates from this institution will not be recognised for licensure.

Verify your institution's accreditation directly at [nckenya.com](https://www.nckenya.com). Do not rely on verbal assurances from college administrators.

For the full breakdown of this warning and how to verify any institution, see our [detailed coverage of the NCK unaccredited college alert](https://www.nursefiti.co.ke/blog/nck-exam-warning-unaccredited-colleges-kenya-2026).

**[Start your free NurseFiti account — no credit card required](https://www.nursefiti.co.ke/signup)**

> *Share this: "Big news — the Directorate of Nurses has been reinstated by the Ministry of Health, plus NCK Feb results are out and NOYA awards launched. Full breakdown here: nursefiti.co.ke/blog/nck-june-2026-update"*

---

## Sources & References

- **Ministry of Health Kenya** — Reinstatement of the Directorate of Nurses announcement during International Nurses and Midwives Day celebrations, May 2026. [health.go.ke](https://www.health.go.ke)
- **The Star** — *"Government launches Nurse of the Year Awards (NOYA) during International Nurses Week"*, May 2026. [the-star.co.ke](https://www.the-star.co.ke)
- **The Kenya Times** — *"NCK February 2026 Licensure Exam Results Released"*, April 2026. [thekenyatimes.com](https://thekenyatimes.com)
- **NCK Online Services Portal (OSP)** — Official portal for exam results and licence applications. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Nursing Council of Kenya** — Official website for accreditation verification and exam information. [nckenya.com](https://www.nckenya.com)
- **Health Cabinet Secretary Aden Duale** — Public address on the reinstatement of the Directorate of Nurses (as reported by multiple outlets, May 2026).

*Always verify current exam information and institutional accreditation directly at [nckenya.com](https://www.nckenya.com).*
    `,
  },
  {
    slug: 'nursefiti-for-nursing-students-undergrads',
    title: 'NurseFiti Is Not Just for NCK Exam Prep — It Works for Undergrads Too',
    excerpt: 'Think NurseFiti is only for licensing exam candidates? Nursing undergrads use it to ace unit exams, master clinical concepts, and build study habits that last.',
    category: 'Study Guide',
    readTime: '8 min read',
    date: '2026-06-25',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Most nursing students discover NurseFiti the week before their NCK licensure exam — panicked, cramming, and wishing they had started months earlier. But here is something most people do not realise: the students who pass the NCK exam first attempt are often the ones who started using NurseFiti as undergrads, long before graduation.

There is a specific study technique that top-performing BScN and KRCHN students use throughout their degree — and it has nothing to do with re-reading lecture notes. We will cover it below.

## The Problem with How Nursing Students Study

Let us be direct. The traditional study approach for most Kenyan nursing undergrads looks like this:

1. Attend lectures (or get notes from a friend who attended)
2. Read notes the night before the unit exam
3. Memorise as much as possible
4. Sit the exam
5. Forget 80% of the content within two weeks

This approach might get you through individual unit exams. But it creates a devastating problem: by the time you graduate and face the NCK licensure exam, you have forgotten most of what you learned in Year 1 and Year 2. You are essentially starting from scratch — with 6 semesters of content to re-learn in a few weeks.

That is why so many first-attempt candidates fail. It is not a knowledge gap — it is a **retention gap**.

**[Start building retention now — practise free on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## What Makes NurseFiti Different for Undergrads

NurseFiti was built for the NCK exam — but the study tools work just as powerfully for unit exams, clinical placements, and continuous assessment tests (CATs). Here is why:

### Active Recall Through MCQ Practice

Every question on NurseFiti is designed around **active recall** — the practice of retrieving information from memory rather than passively re-reading it. Research consistently shows that active recall produces significantly stronger long-term retention than re-reading or highlighting.

As an undergrad, you can filter questions by the specific unit you are currently studying — Pharmacology, Medical-Surgical Nursing, Community Health, Midwifery — and practise questions that test the exact concepts your lecturer will examine.

### Spaced Repetition Flashcards

NurseFiti's flashcard system uses **spaced repetition**, an evidence-based method where you review information at increasing intervals. Concepts you struggle with appear more frequently; concepts you know well appear less often.

For undergrads, this means you can create flashcard decks for each semester and maintain your knowledge across the entire degree. By the time you graduate, the content from Year 1 is still fresh — because you have been reviewing it at scientifically optimised intervals.

### AI-Powered Explanations

Every question comes with a detailed rationale explaining why the correct answer is correct and why each distractor is wrong. When you need more depth, NurseFiti AI provides clinical explanations grounded in Kenyan nursing curricula, approved by the Nursing Council of Kenya standards.

This is not a generic AI chatbot. NurseFiti AI understands the Kenyan healthcare context — the Kenya Essential Medicines List (KEML), the county health system structure, the immunisation schedule, and the NCK competency framework.

## Test Yourself: Sample Question

Here is a sample question from the NurseFiti question bank. Select your answer and submit to see the rationale — exactly as you would in the full app:

<div class="sample-mcq-embed" data-question-slug="nursefiti-undergrad-sample"></div>

Want thousands more? **[Create your free NurseFiti account →](https://www.nursefiti.co.ke/signup)**

## How Undergrads Use NurseFiti — A Practical Guide

### During the Semester
- After each lecture, spend 15 minutes answering 10 MCQs on the topic covered
- Use flashcards for drug names, dosages, and clinical procedures
- Review AI explanations for concepts you find confusing

### Before Unit Exams
- Filter questions by the specific unit being examined
- Take a timed practice set of 50 questions to simulate exam conditions
- Focus on questions you got wrong — the rationales are where the real learning happens

### During Clinical Placements
- Use flashcards offline (on the matatu, during breaks) to maintain knowledge while on the ward
- After encountering a clinical scenario, practise related MCQs to reinforce the connection between theory and practice

### Preparing for CATs and End-of-Semester Exams
- Run mixed-topic sessions across all units covered that semester
- Track your performance in Analytics to identify units below 60% accuracy — those need extra attention

## The Long Game: How Undergrad Practice Pays Off at NCK

Consider this: the NCK exam tests content from **your entire nursing programme** — all years, all units, integrated into two papers. Candidates who try to learn everything in the 8 weeks before the exam are fighting an impossible battle.

But candidates who have been practising throughout their degree? They arrive at the NCK exam with:

- Existing familiarity with 70–80% of the content
- Strong retrieval pathways from years of active recall
- Confidence from thousands of practice questions already answered
- A study habit that makes the final 8 weeks of revision feel like a review, not a rescue mission

This is the difference between passing first attempt and joining the significant proportion of candidates who do not.

## What You Get on the Free Plan

NurseFiti's free tier is designed to let you start building these habits right now, with no financial barrier:

- Practice questions every day with rationales
- Spaced repetition flashcards
- Access to NurseFiti AI for deeper explanations
- Performance analytics showing your strengths and weaknesses
- A personalised revision plan

You do not need to wait until graduation to start preparing. The best time to start is today — in Year 1, Year 2, or Year 3. The earlier you begin, the easier the NCK exam becomes.

**[Start your free NurseFiti account — no credit card required](https://www.nursefiti.co.ke/signup)**

> *Share this with your classmates: "NurseFiti isn't just for NCK exam prep — it works for unit exams too. Free practice questions, flashcards, and AI explanations. Check it out: nursefiti.co.ke/blog/nursefiti-for-nursing-students-undergrads"*

---

## Sources & References

- **Roediger, H.L. & Butler, A.C. (2011)** — *"The critical role of retrieval practice in long-term retention"*, Trends in Cognitive Sciences, 15(1), 20–27. [DOI: 10.1016/j.tics.2010.09.003](https://doi.org/10.1016/j.tics.2010.09.003)
- **Cepeda, N.J., Pashler, H., Vul, E., et al. (2006)** — *"Distributed practice in verbal recall tasks: A review and quantitative synthesis"*, Psychological Bulletin, 132(3), 354–380. [DOI: 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354)
- **Nursing Council of Kenya** — Official website for approved curricula and examination standards. [nckenya.com](https://www.nckenya.com)
- **Ministry of Health Kenya** — Kenya Essential Medicines List and national health workforce data. [health.go.ke](https://www.health.go.ke)

*Always verify current exam and registration information directly at [nckenya.com](https://www.nckenya.com).*
    `,
  },
];

const POSTS_NEW: Post[] = [
  {
    slug: 'nck-exam-anxiety-how-to-manage-it',
    title: 'NCK Exam Anxiety: 7 Evidence-Based Strategies That Work (2026)',
    excerpt: 'Exam anxiety costs Kenyan nursing candidates real marks. Here are 7 strategies backed by cognitive and clinical research — practical, not generic.',
    category: 'Study Strategy',
    readTime: '9 min read',
    date: '2026-06-08',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
7 in 10 nursing students experience significant exam anxiety. Most of them know their content. The anxiety is what undermines performance. Here's what actually helps — not generic wellness advice, but strategies with clinical and cognitive research behind them.

## Why NCK Exam Anxiety Is Different

The NCK licensing exam carries a specific weight that ordinary university exams do not: failing means 4–6 months before you can resit. No income. No internship. No licence. That is a real, high-stakes consequence — and your nervous system knows it.

Understanding that your anxiety is a rational response to a genuinely high-stakes situation is the first step. It is not a character flaw or a sign you are unprepared. It is your brain treating the exam the way it should — as important.

**[Start with structured practice to build exam confidence →](https://www.nursefiti.co.ke/signup)**

## 1. Reappraise Anxiety as Readiness

Telling yourself to calm down before a high-stakes exam backfires — it tries to suppress arousal your body has already prepared. Harvard researcher Alison Wood Brooks (2014) found that telling yourself "I am excited" rather than "I am calm" before a performance task significantly improved outcomes. The mechanism: excitement and anxiety share the same physiological arousal. Reframing it as readiness uses that energy productively rather than fighting it.

*Try this: Before entering the exam hall, say — out loud if possible — "I am ready."*

## 2. Controlled Breathing — Box Breathing

Box breathing activates the parasympathetic nervous system (your body's "rest" response) within 60 to 90 seconds. It is used by surgical teams, military personnel, and elite athletes before high-performance situations.

**How to do it:**
- Inhale slowly through your nose for 4 counts
- Hold for 4 counts
- Exhale slowly through your mouth for 4 counts
- Hold for 4 counts
- Repeat 4 times

Do this sitting in the exam hall before you begin. It costs you less than 2 minutes and measurably reduces cortisol response (Ma et al., 2017).

## 3. Simulate the Exam Environment Repeatedly

Anxiety is highest when something is novel. Every time you practise under exam conditions — timed, full 100 questions, DigiProctor interface — you reduce novelty and therefore anxiety on exam day.

This is called **systematic desensitisation** — a well-validated behavioural technique. The more times your nervous system encounters something that previously triggered fear, under controlled conditions, the weaker the fear response becomes.

**[Practise full timed mock exams on NurseFiti →](https://www.nursefiti.co.ke/signup)**

Take at least 3–4 full mock exams before your sitting. Your anxiety in mock exam 4 will be noticeably lower than in mock exam 1.

## 4. The 3-Category Worry Sort

Anxiety often feels like one large undifferentiated mass of dread. Breaking it into specific categories reduces its power considerably.

Write down everything you are worried about. Then sort each item into three categories:
- **In my control** — units I haven't studied enough, sleep schedule
- **Partly in my control** — exam day logistics, how I perform under pressure
- **Outside my control** — the difficulty of questions, other candidates

For category 1, make an action plan. For category 2, have a plan and accept uncertainty. For category 3, deliberately release it — your worry about it produces zero benefit and real cost.

## 5. Study Consistency, Not Intensity

Cramming creates anxiety. Consistent daily practice — even 2 hours — creates competence, and competence is the most reliable long-term antidote to exam anxiety. You cannot feel genuinely confident about content you barely know.

A 7-day streak of 2-hour study sessions produces more retention and more confidence than a single 14-hour session the week before. This is the spacing effect — one of the most replicated findings in learning science (Cepeda et al., 2006). See also our [NCK exam preparation guide](https://www.nursefiti.co.ke/blog/nck-exam-preparation-guide-kenya) for the full 8-week framework.

## 6. Sleep the Night Before — Non-Negotiably

Pulling an all-nighter before the NCK exam will hurt your performance. Sleep deprivation impairs working memory, processing speed, and emotional regulation — the exact cognitive functions the NCK exam tests. Walker (2017) documents in peer-reviewed detail that a single night of poor sleep reduces cognitive performance by an amount equivalent to being mildly intoxicated.

Go to bed at your normal time. Set two alarms. Do not open your notes after 9pm. The content is in your head. Sleep consolidates it there.

## 7. Arrive Early and Build a 10-Minute Buffer

Rushing to an exam amplifies anxiety physiologically. Arriving 30 minutes early allows your cortisol to normalise, lets you find your workstation without stress, and gives you time to do your box breathing before the exam begins.

Prepare everything the night before: ID, admission letter, water, transport. The morning of the exam is for arriving, not planning.

> *Share this: "Practical breakdown of what actually helps with NCK exam anxiety — not generic wellness tips: nursefiti.co.ke/blog/nck-exam-anxiety-how-to-manage-it"*

## Sources & References

- **Wood Brooks, A. (2014)** — *"Get excited: Reappraising pre-performance anxiety as excitement"*, Journal of Experimental Psychology: General, 143(3), 1144–1158. [DOI: 10.1037/a0035325](https://doi.org/10.1037/a0035325)
- **Ma, X., Yue, Z.Q., Gong, Z.Q., et al. (2017)** — *"The effect of diaphragmatic breathing on attention, negative affect and stress in healthy adults"*, Frontiers in Psychology, 8, 874. [DOI: 10.3389/fpsyg.2017.00874](https://doi.org/10.3389/fpsyg.2017.00874)
- **Cepeda, N.J., Pashler, H., Vul, E., et al. (2006)** — *"Distributed practice in verbal recall tasks: A review and quantitative synthesis"*, Psychological Bulletin, 132(3), 354–380. [DOI: 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354)
- **Walker, M. (2017)** — *Why We Sleep: Unlocking the Power of Sleep and Dreams*. Scribner. (Underlying research on sleep and cognitive performance.)
- **Nursing Council of Kenya** — official website. [nckenya.com](https://www.nckenya.com)

*Always verify current NCK exam dates at [nckenya.com](https://www.nckenya.com) before planning your preparation.*
    `,
  },
  {
    slug: 'nck-pharmacology-calculations-guide',
    title: 'NCK Pharmacology & Drug Calculations: Complete Guide (2026)',
    excerpt: 'Pharmacology and drug calculations appear in every NCK paper. Master the formulas, common KEML drugs, and calculation question patterns with worked examples.',
    category: 'Study Guide',
    readTime: '11 min read',
    date: '2026-06-09',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Pharmacology is the most consistent source of marks across all NCK papers — and the most consistently under-prepared subject. Many candidates treat drug calculations as secondary. Here is why that is a mistake, and exactly what to do about it.

## Why Pharmacology Dominates the NCK Exam

Clinical pharmacology appears across **all NCK papers** — not just as standalone questions but embedded in scenario questions about management, patient safety, and adverse effects. According to candidate experience across multiple exam cycles, pharmacology content accounts for an estimated 15–25% of total NCK marks across both papers. Miss pharmacology, and you are starting with a significant structural disadvantage.

**[Practice pharmacology MCQs on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## The Drug Calculation Formulas You Must Memorise

These three formulas cover virtually every calculation question in the NCK exam. Drill them until they are automatic — not just understood, but automatic.

### 1. Dose/Volume Calculation
**Formula:** Volume to administer = (Desired dose ÷ Available dose) × Stock volume

*Example:* Doctor orders 250mg amoxicillin. Available: 500mg/5mL.
→ Volume = (250 ÷ 500) × 5 = **2.5mL**

### 2. IV Drip Rate (drops per minute)
**Formula:** Drops/min = (Volume in mL × Drop factor) ÷ Time in minutes

*Example:* 500mL 0.9% NS over 4 hours, standard IV set (drop factor 15 drops/mL).
→ Time = 4 × 60 = 240 min
→ Drops/min = (500 × 15) ÷ 240 = 7,500 ÷ 240 = **31 drops/min**

### 3. Weight-Based Dosing (paediatric)
**Formula:** Dose = Weight (kg) × Dose per kg

*Example:* Child weighs 12kg. Ordered: paracetamol 15mg/kg.
→ Dose = 12 × 15 = **180mg**

## Kenya Essential Medicines List (KEML) — What to Know

All NCK pharmacology questions align to the **Kenya Essential Medicines List (KEML)** — not to international drug databases. Source: KEMSA — [kemsa.co.ke](https://www.kemsa.co.ke).

### High-Yield Drug Categories for NCK

**Antibiotics** (appear in almost every paper):
- First-line for community-acquired pneumonia: Amoxicillin or Amoxicillin-Clavulanate
- First-line for UTI: Nitrofurantoin or Trimethoprim-Sulfamethoxazole
- TB standard regimen: 2HRZE/4HR (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol)
- HIV first-line ART (Kenya guideline 2022): TDF + 3TC + DTG

**Cardiovascular drugs:**
- ACE inhibitors (Enalapril, Lisinopril) — first-line hypertension; monitor for dry cough
- Beta-blockers (Atenolol, Carvedilol) — heart failure, post-MI; contraindicated in acute asthma
- Furosemide — loop diuretic; monitor electrolytes especially potassium
- Digoxin toxicity signs: yellow-green visual disturbances, bradycardia, nausea

**Diabetes:**
- Metformin — first-line type 2 DM; contraindicated in renal impairment (eGFR <30)
- Insulin types: Actrapid (rapid), Mixtard (intermediate), Lantus/Glargine (long-acting)
- DKA management: IV fluids first, then insulin — never start insulin without correcting dehydration

**Emergency drugs (memorise doses and route):**
- Adrenaline (Epinephrine) — anaphylaxis: 0.5mg IM (1:1000), anterolateral thigh
- Magnesium sulphate — eclampsia: 4g IV loading dose, then 1g/hour maintenance
- Oxytocin — active management of 3rd stage labour, PPH prevention and treatment
- Atropine — bradycardia: 0.5–1mg IV

**Psychotropics:**
- Haloperidol — typical antipsychotic; EPS side effects (akathisia, dystonia)
- Clozapine — atypical antipsychotic; agranulocytosis risk → mandatory WBC monitoring
- SSRIs (Fluoxetine, Sertraline) — first-line depression; 2–4 week onset delay
- Lithium — bipolar disorder; narrow therapeutic index; monitor levels and renal function

## Common NCK Pharmacology Exam Traps

1. **"Which finding requires immediate intervention?"** — Know toxicity signs: digoxin (visual changes), lithium (tremors, confusion), gentamicin (tinnitus/hearing loss), warfarin (bleeding)
2. **Contraindications over indications** — NCK frequently asks which patient should NOT receive a drug (e.g., metformin in renal failure, beta-blockers in asthma)
3. **Route matters** — adrenaline for anaphylaxis is IM, not IV (unless cardiac arrest). Getting the route wrong = wrong answer
4. **KEML first-line vs second-line** — NCK follows Kenya MOH guidelines. The first-line drug in the UK or US may not be first-line in Kenya

## A Daily Pharmacology Drill

From today until your exam, spend 20 minutes per day on pharmacology:
- 10 MCQs on drug mechanisms and adverse effects (use NurseFiti's practice bank)
- 2 drug calculation problems from the three formulas above
- Review 5 flashcard entries on drug names, doses, and contraindications

This compounds significantly. 20 minutes × 40 days = 800 minutes of pharmacology drilling. It will show on exam day.

**[Start your pharmacology drill on NurseFiti →](https://www.nursefiti.co.ke/signup)**

Also see our [KRCHN revision guide](https://www.nursefiti.co.ke/blog/krchn-exam-revision-tips) for how pharmacology integrates into Paper I strategy.

> *Share this: "Complete NCK pharmacology guide — formulas, KEML drugs, and the traps NCK examiners use. Worth saving: nursefiti.co.ke/blog/nck-pharmacology-calculations-guide"*

## Sources & References

- **Kenya Essential Medicines List (KEML)** — Ministry of Health Kenya / KEMSA. The authoritative reference for all Kenya MOH drug protocols. [kemsa.co.ke](https://www.kemsa.co.ke)
- **Ministry of Health Kenya** — *Kenya HIV Prevention and Treatment Guidelines 2022* (ART first-line regimen). [health.go.ke](https://www.health.go.ke)
- **WHO** — *WHO Model Formulary* — reference for drug class information and clinical use. [who.int](https://www.who.int/publications/i/item/978924154704)
- **Nursing Council of Kenya** — official website. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — exam registration and results. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)

*Drug doses and protocols reference the Kenya Essential Medicines List and Kenya MOH guidelines as of 2026. Always verify current clinical protocols before patient care.*
    `,
  },
  {
    slug: 'how-to-apply-nck-licence-kenya',
    title: 'How to Apply for the NCK Practising Licence After Passing (2026)',
    excerpt: 'You passed the NCK exam — congratulations! Now here is the exact step-by-step process for applying for your practising licence on the OSP portal to avoid delays.',
    category: 'Study Guide',
    readTime: '6 min read',
    date: '2026-06-24',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
Passing the NCK exam is a massive relief, but it is not the finish line. Every year, graduates who pass their NCK exam find themselves waiting months to start their internship or employment because they delayed or made errors in their licence application. 

Here is exactly how to apply for your Nursing Council of Kenya practising licence and registration certificate so you can start working without unnecessary delays.

## 1. Do Not Wait to Apply

NCK explicitly advises candidates to apply for their practising licence within **30 days** of the results being released. If you delay your application, you delay your entry onto the NCK register. Until you have that licence and registration number, you cannot legally practise in Kenya.

## 2. Gather Your Documents Before Logging In

You will need digital copies (scanned PDFs or clear JPEGs) of the following documents before you start the application process on the OSP portal:
- **National ID** or Passport (both sides)
- **KRA PIN Certificate**
- **Passport-size photograph** (clear, professional background)
- **High School Certificate** (KCSE or equivalent)
- **Nursing School Certificate/Transcript** (from your approved training institution)
- **Payment** (via M-PESA paybill or bank deposit, as generated by the portal)

*Note: The required documents can occasionally change. Always verify the current list on the OSP portal.*

## 3. The Application Process on the OSP Portal

The entire application is processed through the NCK Online Services Portal (OSP). Paper applications are no longer accepted at the NCK Plaza.

**Step 1:** Log in to your account at [osp.nckenya.go.ke](https://osp.nckenya.go.ke). (This is the same account you used to register for the exam).
**Step 2:** Navigate to the "Licensing" or "Registration" tab on your dashboard.
**Step 3:** Fill out the personal and professional details. Ensure your name matches your ID exactly.
**Step 4:** Upload your scanned documents in the required formats.
**Step 5:** Generate an invoice. The system will give you a specific reference number and M-PESA paybill instructions.
**Step 6:** Pay the registration and licensing fees. The portal will automatically update your payment status (though it can sometimes take a few hours).

## 4. Tracking Your Application

Once submitted, your application goes through several stages of verification by NCK staff. You can track this status on the OSP dashboard. 
If your application is marked as "Incomplete" or "Query", NCK will usually leave a comment explaining what is missing (e.g., "ID scan blurry"). You must correct this immediately to keep your application moving.

## What if you didn't pass?

If you did not get the result you wanted this cycle, you are not alone. A significant proportion of first-attempt candidates do not pass — making structured preparation, not casual revision, the distinguishing factor. The next step is to diagnose exactly what went wrong and change your study strategy before the next sitting.

**[Start a free diagnostic practice session on NurseFiti →](https://www.nursefiti.co.ke/signup)**

NurseFiti replicates the DigiProctor interface exactly, giving you the timed practice and spaced repetition needed to pass your resit. 

## Staying Compliant After Registration

Your NCK practising licence is not permanent — it must be renewed regularly. As a registered nurse in Kenya, you will be required to earn Continuing Professional Development (CPD) points annually to maintain your active status on the register. 

> *Share this: "Just passed the NCK exam? Here is exactly how to apply for your licence on the OSP portal without delays: nursefiti.co.ke/blog/how-to-apply-nck-licence-kenya"*

## Sources & References

This guide is original editorial content by NurseFiti, informed by official NCK application procedures. For official information:

- **Nursing Council of Kenya** — official website and licensing regulations. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — for licence applications and tracking. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Kenya Ministry of Health** — [health.go.ke](https://www.health.go.ke)

*Always verify current application requirements and fees directly at [osp.nckenya.go.ke](https://osp.nckenya.go.ke) before submitting your application.*
    `,
  },
];

const POSTS_JUNE15: Post[] = [
  {
    slug: 'nck-august-2026-exam-prep-plan',
    title: 'NCK August 2026 Exam: Dates, Registration & 8-Week Prep',
    excerpt: 'The NCK August 2026 sitting is roughly 8 weeks away. Here are the confirmed dates, registration steps, and a week-by-week prep plan to pass first attempt.',
    category: 'NCK News',
    readTime: '10 min read',
    date: '2026-06-15',
    cadres: ['KRCHN', 'BScN', 'Higher Diploma'],
    content: `
The August 2026 NCK sitting is approximately 8 weeks away. Eight weeks is enough time to pass — if you start today and use them correctly. Most candidates who fail in August say the same thing afterwards: "I knew the content but I didn't practise enough." Don't be that candidate.

*Last verified: 15 June 2026. Always confirm current registration deadlines and exam dates directly at [nckenya.com](https://www.nckenya.com) or the NCK Online Services Portal at [osp.nckenya.go.ke](https://osp.nckenya.go.ke).*

## NCK August 2026: What We Know So Far

NCK runs three examination sittings per year: February, May, and August/November. The May 2026 series concluded in mid-May 2026, and results are expected on the NCK Online Services Portal within the standard turnaround window. The August 2026 series is the next national sitting.

Registration for the August series typically opens 6–8 weeks before the exam. As of 15 June 2026, the official registration window has not yet been formally announced. **Watch [nckenya.com](https://www.nckenya.com) and [osp.nckenya.go.ke](https://osp.nckenya.go.ke) for the official announcement — NCK does not accommodate late or manual registration once the portal closes.**

**[Start your free diagnostic session on NurseFiti while you wait →](https://www.nursefiti.co.ke/signup)**

## How to Register for the NCK August 2026 Exam

NCK registration is done entirely online through the NCK Online Services Portal. Here is the process based on the established procedure for all 2025–2026 sittings (Source: [osp.nckenya.go.ke](https://osp.nckenya.go.ke) and NCK official examination guidelines):

1. **Log in** to the NCK Online Services Portal at [osp.nckenya.go.ke](https://osp.nckenya.go.ke) using your NCK registration number and password
2. **Navigate to Examination Registration** in the applicant dashboard
3. **Select the August 2026 sitting** once it appears on the portal
4. **Choose your examination centre** — centres are listed during registration; select one in your county or the nearest accessible centre
5. **Pay the examination fee** through the portal's M-Pesa or bank payment integration
6. **Download your admission letter** after payment confirmation — do not lose this; it is required for entry on exam day

If you have forgotten your portal credentials, use the "Forgot Password" option on the portal — do not attempt to create a duplicate account, as this causes licencing complications.

**Critical:** NCK requires your nursing programme to be from an NCK-approved institution. If you are uncertain whether your institution is approved, verify at [nckenya.com](https://www.nckenya.com) before registering. NCK issued a formal warning against Northlands International Medical Training College (NIMTC) in April 2026 for offering unapproved nursing programmes — see our [NCK June 2026 news roundup](https://www.nursefiti.co.ke/blog/nck-latest-news-june-2026) for details.

## What Happens If You Missed May 2026?

If you sat the May 2026 exam and have not yet received your results: check [osp.nckenya.go.ke](https://osp.nckenya.go.ke) regularly — results are released on a rolling basis, not all at once. Source: The Kenya Times, reporting on NCK's May 2026 results release process.

If you sat and did not pass: this is normal — NCK's first-attempt pass rate is not publicly reported but is understood by candidates to be competitive. The key question is not how you felt about the exam — it is which units cost you the marks. Use the next 8 weeks differently. Start with a diagnostic session to identify your weak units, not your comfortable ones.

**There is one mistake candidates who resit consistently make: they study the same way they studied before.** If your method did not work once, doing more of it will not work twice.

## Your 8-Week NCK August 2026 Prep Plan

This plan assumes you start on or before 22 June 2026. Adjust the start date if your exam falls earlier or later.

### Week 1 — Diagnostic (22–28 June)
Before you study a single unit, run a diagnostic: take an untimed, full-topic practice session and record your score by unit. Which units are you below 60% in? Those are your priority for the next 7 weeks — not the units you find enjoyable.

**KRCHN candidates:** Your likely weak areas are Paper II units — Community Health, Mental Health, and Research & Statistics. Most KRCHN candidates over-prepare Paper I and under-prepare Paper II.

**BScN candidates:** Your likely weak areas are Research & Evidence-Based Practice, Nursing Leadership, and the integration of multi-system scenarios in Paper I. Advanced reasoning questions catch many BScN candidates off guard.

**[Run your diagnostic session free on NurseFiti →](https://www.nursefiti.co.ke/signup)**

### Week 2 — High-Priority Unit Drilling (29 June – 5 July)
Take your 2–3 weakest units from the diagnostic and drill them:
- 60–80 unit-specific MCQs per day
- Read the rationale on every wrong answer — not just the correct option
- Add all unclear concepts to flashcards for spaced repetition

Do not jump between units this week. Concentrated drilling on weak units closes gaps faster than scattered review.

### Week 3 — Continue Unit Drilling (6–12 July)
Continue with the next tier of weak units. By end of week 3, every unit should be above 65% in practice.

### Weeks 4 & 5 — Mixed Practice (13–26 July)
Stop studying unit by unit. Switch to mixed-topic sessions. This simulates the real exam, where questions from different units appear in random order. The shift is uncomfortable at first — that discomfort means your brain is working harder, which builds stronger recall.

- Target: 80–100 mixed MCQs daily
- Continue reviewing rationales on all wrong answers
- Keep flashcard reviews going daily (15–20 minutes is enough)

### Week 6 — First Full Mock Exam (27 July – 2 August)
Take your first full timed mock exam: 100 questions, 120 minutes, DigiProctor-style interface. Record:
- Total score
- Score by unit
- Time used vs. remaining
- Questions flagged but not returned to

Review every question — not just wrong ones. Correct guesses teach you nothing. See our [DigiProctor guide](https://www.nursefiti.co.ke/blog/digiproctor-nck-exam-guide) for how to navigate the interface strategically.

### Week 7 — Targeted Drilling Based on Mock (3–9 August)
Return to drilling any unit where your mock exam score was below 65%. One more week of focused practice on gaps.

### Week 8 — Final Mock Exams & Consolidation (10–16 August)
Take 2–3 more full mock exams this week. No new topics. Focus on:
- Flashcard review (20–30 minutes daily)
- Re-reading your error log from weeks 1–7
- Exam-day logistics: know your centre, confirm your ID and admission letter
- Sleep 7–8 hours the night before

## The 5 Mistakes That Cost August Candidates the Most Marks

1. **Starting preparation in August** — 8 weeks is the minimum. Less than 4 weeks of active preparation produces outcomes consistent with insufficient preparation.
2. **Practising only comfortable units** — your score is determined by your weakest units, not your strongest.
3. **Reading rationales passively** — you must understand *why* each answer is correct, not just which one it is. NCK rephrases the same concepts across cycles.
4. **Skipping full mock exams** — candidates who take 3+ mock exams before sitting consistently report lower anxiety and better time management on exam day.
5. **Studying the night before** — cognitive performance on an exam is determined by your preparation over the preceding weeks, not the last 12 hours. Sleep is more valuable than a midnight study session. See our [exam anxiety guide](https://www.nursefiti.co.ke/blog/nck-exam-anxiety-how-to-manage-it) for evidence-based strategies for the final week.

## August 2026 Exam Day: What to Bring

- **National ID** (or valid passport) — no admission without it
- **NCK Exam Admission Letter** — download from [osp.nckenya.go.ke](https://osp.nckenya.go.ke) after registration
- **Arrive 30 minutes early** — invigilators will not hold the exam for late arrivals
- No phones, notes, or electronic devices in the examination room
- Scratch paper is provided at the centre for calculations

> *Share this: "NCK August 2026 exam is roughly 8 weeks away — found a week-by-week prep plan and the registration steps in one place: nursefiti.co.ke/blog/nck-august-2026-exam-prep-plan. Pass it on to anyone sitting soon."*

## Sources & References

- **Nursing Council of Kenya** — official website, approved institutions list, examination guidelines. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal** — examination registration, results, admission letters. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **NCK Examination Instructions & Schedule, February–May 2026** — Annexure document published by NCK December 2025. [nckenya.com/wp-content/uploads/2025/12/Annexure-Examination-instructions-and-schedule-February-May-2026-1.pdf](https://nckenya.com/wp-content/uploads/2025/12/Annexure-Examination-instructions-and-schedule-February-May-2026-1.pdf)
- **The Kenya Times** — *"NCK February 2026 Licensure Exam Results Out"*, 28 April 2026. [thekenyatimes.com](https://thekenyatimes.com/education/nursing-council-releases-latest-licensure-exam-results/)
- **Tuko.co.ke** — *"NCK exam registration and timetable for the 2026 academic year"*, updated 8 April 2026. [tuko.co.ke](https://www.tuko.co.ke/facts-lifehacks/study/539756-nck-exam-registration-timetable-2024-academic-year/)

*Always verify current registration deadlines, examination dates, and approved centres directly at [nckenya.com](https://www.nckenya.com) before registering — information may change after this article's publication date.*
    `,
  },
];

const POSTS_INTERN: Post[] = [
  {
    slug: 'nck-exam-study-internship-guide',
    title: 'How to Study for NCK Exam While Working as an Intern (2026)',
    excerpt: 'Demanding nursing internship in Kenya? Learn a practical study routine, high-yield topics, and how to prepare for the NCK exam and pass first attempt.',
    category: 'Study Strategy',
    readTime: '9 min read',
    date: '2026-06-20',
    cadres: ['KRCHN', 'BScN'],
    content: `
Most nursing interns fail their NCK licensure exam not because they lack clinical knowledge, but because they try to study like full-time students. When you are standing on your feet for 12 hours in a busy ward, standard study schedules are useless. Here is how to pass the NCK exam without burning out.

There is one particular ward task that interns perform daily which double-serves as the highest-yield revision for pharmacology — we will show you how to leverage this below.

## The Reality of NCK Exam Preparation During Internship

Nursing internship in Kenya (whether under the Ministry of Health, faith-based hospitals, or private institutions) is physically and mentally gruelling. You are managing high patient loads, executing doctor's orders, running ward rounds, and documenting care, often on rotating shifts. By the time you get home, the last thing you want to do is open a textbook. 

Typical exam preparation guides tell you to study for 6 to 8 hours a day. For an intern, that is a recipe for severe sleep deprivation, clinical errors, and burnout. You do not need to study *longer*; you need to study *smarter*. The NCK licensing exam does not test your ability to memorise books; it tests your clinical judgment in situations you encounter on the wards every single day. 

**[Practise questions on internship-related clinical cases free on NurseFiti →](https://www.nursefiti.co.ke/signup)**

## The "Micro-Study" Method: Leveraging the Ward for Revision

Since you spend 40 to 60 hours a week in the hospital, make the hospital your primary classroom. This is the **Micro-Study Method**, where you turn daily ward tasks into active NCK exam preparation.

### 1. The Medicine Trolley is Your Pharmacology Guide
Every time you administer a drug, perform a mental 10-second drill:
- What is the class of this drug?
- What are the major side effects I must monitor in this patient?
- What are the absolute contraindications? (e.g., holding Metformin for a patient with an eGFR below 30).
- Is there a calculation involved? (e.g., calculating paediatric doses using weight or calculating IV drip rates).

This active recall is significantly more effective than memorising lists. When you see a patient experiencing a dry cough from Enalapril, that memory sticks far better than a line in a notebook.

### 2. Patient Handovers are Scenario Practice
NCK questions are scenario-based: *"A 45-year-old male is admitted with..."* When you receive or give a shift handover report, pay close attention to the prioritisation.
- Which patient is the most unstable?
- What is the priority nursing diagnosis?
- What is the first intervention you should perform?
Apply the ABCDE (Airway, Breathing, Circulation, Disability, Exposure) primary survey framework to your handover sheet. This directly maps to how Paper I and Paper II prioritize questions.

## The 3-Hour Daily Study Schedule for Busy Interns

You do not need massive blocks of free time. Break your day into three manageable study windows:

### Morning Prep (30 Minutes)
Before your shift begins, spend 30 minutes on active recall. Do not read notes. Go straight to your flashcard deck. Review 20 to 30 cards using spaced repetition. This primes your brain for the day and keeps key numbers (like normal lab values and vital signs) fresh in your mind.

### The Tea/Lunch Break Drill (30 Minutes)
Use 20 minutes of your lunch break to practice 15 to 20 MCQs on your phone. Focus on a single unit (e.g., Obstetric Emergencies or Infection Prevention and Control). 
- Do not worry about timing.
- Focus on understanding the rationales.
- If you get a question wrong, take a screenshot or add it to your digital log.

**[NurseFiti's mobile-friendly platform lets you practice MCQs during tea break. Try a free practice session →](https://www.nursefiti.co.ke/signup)**

### Post-Shift Consolidation (2 Hours)
After your shift, go home, shower, eat, and rest. Allocate a block of 2 hours for focused study before sleep:
- **First 60 minutes:** Study the underlying theory of the units you got wrong during your lunch break. Use concise summaries, guidelines from the Ministry of Health (MOH), or WHO protocols.
- **Next 40 minutes:** Practice 30 mixed-topic MCQs under a mild timer.
- **Last 20 minutes:** Review the rationales of all incorrect answers and add new concepts to your flashcards.

## High-Yield Topics for KRCHN and BScN Interns

Do not study everything equally. Target the topics that NCK examiners test most heavily:

### 1. Midwifery and Obstetric Emergencies (Paper I)
- Active Management of the Third Stage of Labour (AMTSL) — standard doses of Oxytocin (10 IU IM).
- Management of Pre-eclampsia and Eclampsia — Magnesium Sulphate loading dose (4g IV) and maintenance protocols.
- Antepartum and Postpartum Haemorrhage (APH/PPH) identification and immediate nursing interventions.

### 2. Community Health and Public Health (Paper II)
- The Kenya National Immunisation Programme (EPI) schedule — what antigens are given at birth, 6, 10, 14 weeks, and 9 months.
- Cold chain management and vaccine storage temperatures (+2°C to +8°C).
- Primary Health Care (PHC) principles and levels of care in the Kenyan health system (Levels 1 to 6).

### 3. Medical-Surgical Emergencies (Paper I)
- Diabetic Ketoacidosis (DKA) management protocol (IV fluids first, then insulin titration).
- Shock types (hypovolaemic, cardiogenic, anaphylactic, septic) and their distinctive clinical signs.
- Post-operative care and monitoring for early complications (haemorrhage, airway obstruction, deep vein thrombosis).

## Managing Fatigue and Cognitive Load

Studying while fatigued is difficult because your brain's working memory is compromised. Research in cognitive science demonstrates that sleep is not just passive rest; it is the active process where your brain consolidates what you learned during the day (Walker, 2017). 

If you are post-call or have worked a 12-hour night shift, **do not force yourself to study**. Sleep first. A 2-hour study session on a rested brain is five times more productive than a 4-hour session on a sleep-deprived brain. Protect your sleep non-negotiably.

Additionally, maintain a consistent study streak rather than studying in bursts. A 7-day streak of 2 hours daily produces far greater long-term retention than a single 14-hour study marathon on your day off. This is known as the spacing effect, a core pillar of effective learning (Cepeda et al., 2006).

## The Week Before the NCK Exam

As your exam date approaches, your study strategy must shift:
- **Stop learning new topics:** Focus entirely on consolidating what you already know.
- **Review your error log:** Go through the screenshots and notes of every question you got wrong over the last 8 weeks.
- **Run timed mock exams:** Take at least 2 full-length, 100-question mock exams using a DigiProctor simulator. This trains your pacing (72 seconds per question) and reduces anxiety by making the interface familiar.
- **Sort your logistics:** Download your exam admission letter from [osp.nckenya.go.ke](https://osp.nckenya.go.ke) and ensure you have your original National ID.

## Conclusion

Passing the NCK licensure exam while working as an intern is a test of strategy, not just intelligence. By using the Micro-Study Method and maintaining a consistent daily routine, you can pass on your first attempt and secure your registration.

**[Start your free NurseFiti account — no credit card required →](https://www.nursefiti.co.ke/signup)**

> *Share this: "Demanding nursing internship? Found this practical guide on how to study for the NCK exam while working on the wards — really helpful schedule: nursefiti.co.ke/blog/nck-exam-study-internship-guide"*

## Sources & References

- **Nursing Council of Kenya (NCK)** — Official website for licensure regulations and exam requirements. [nckenya.com](https://www.nckenya.com)
- **NCK Online Services Portal (OSP)** — Registration, exam schedules, and results portal. [osp.nckenya.go.ke](https://osp.nckenya.go.ke)
- **Ministry of Health Kenya** — *Kenya National Immunisation Programme guidelines & EPI schedules*. [health.go.ke](https://www.health.go.ke)
- **Walker, M. (2017)** — *Why We Sleep: Unlocking the Power of Sleep and Dreams*. Scribner. (Detailing the role of sleep in cognitive consolidation.)
- **Cepeda, N.J., Pashler, H., Vul, E., et al. (2006)** — *"Distributed practice in verbal recall tasks: A review and quantitative synthesis"*, Psychological Bulletin, 132(3), 354–380. [DOI: 10.1037/0033-2909.132.3.354](https://doi.org/10.1037/0033-2909.132.3.354)
- **World Health Organization (WHO)** — *Guidelines for the management of common childhood illnesses and emergency triage (ETAT)*. [who.int](https://www.who.int)

*Disclaimer: Internship duties and shifts vary by hospital. Always ensure patient safety is your primary priority while on the wards. Confirm current exam registration details directly at [nckenya.com](https://www.nckenya.com).*
    `,
  },
];

const ALL_POSTS = [...POSTS_INTERN, ...POSTS_JUNE15, ...POSTS_NEWS, ...POSTS, ...POSTS_EXTRA, ...POSTS_NEW];

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
  'moh-nursing-internship-deployment-kenya-2026': {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',
    alt: 'Medical professional reviewing documents - MOH Internship Deployment',
    credit: 'Unsplash',
  },
  'nck-exam-study-internship-guide': {
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing intern reviewing patient charts and clinical files in a hospital ward',
    credit: 'Unsplash',
  },
  'nck-june-2026-update': {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',
    alt: 'Medical professional reviewing nursing data on digital tablet — NCK June 2026 update',
    credit: 'Unsplash',
  },
  'nck-exam-warning-unaccredited-colleges-kenya-2026': {
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing exam results announcement — nurses celebrating',
    credit: 'Unsplash',
  },
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
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80&auto=format&fit=crop',
    alt: 'Student hands typing on laptop during computer-based exam — DigiProctor NCK interface',
    credit: 'Unsplash',
  },
  'nck-exam-anxiety-how-to-manage-it': {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing student managing exam stress with deep breathing',
    credit: 'Unsplash',
  },
  'nck-pharmacology-calculations-guide': {
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing pharmacology — medications and drug calculations',
    credit: 'Unsplash',
  },
  'nck-august-2026-exam-prep-plan': {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80&auto=format&fit=crop',
    alt: 'Kenyan nursing student preparing for NCK August 2026 exam with study plan',
    credit: 'Unsplash',
  },
  'how-to-apply-nck-licence-kenya': {
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80&auto=format&fit=crop',
    alt: 'Official documents and forms for NCK licence application',
    credit: 'Unsplash',
  },
  'nursefiti-for-nursing-students-undergrads': {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop',
    alt: 'Nursing students collaborating and studying together at university with laptop',
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
    } else if (trimmed.includes('sample-mcq-embed')) {
      // Extract the data-question-slug from the HTML
      const slugMatch = trimmed.match(/data-question-slug="([^"]+)"/);
      if (slugMatch) {
        elements.push(<BlogSampleMCQ key={key++} questionSlug={slugMatch[1]} />);
      }
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
