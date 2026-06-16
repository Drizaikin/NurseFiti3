---
inclusion: manual
---

# NCK Licensure Examination System — Reference Guide for Question Seeding

> **Purpose:** This document must be reviewed every time questions are seeded into the database. It governs how questions are distributed, weighted, and styled per cadre (KRCHN and BScN) to accurately reflect the current NCK examination system.

---

## Background

The current NCK licensure examination system for both KRCHN and BScN has changed significantly between 2023–2026 due to:

- Transition to Computer-Based Testing (CBT)
- Competency-based assessment
- Online invigilation systems
- Integrated paper structures
- Standardised national exam cycles

However, there are still important differences between KRCHN and BScN in:

- Depth of competency tested
- Clinical reasoning expectations
- Integration level
- Internship expectations
- Examination blueprint weighting

---

## 1. Current NCK Exam Structure (2025–2026)

### KRCHN

NCK now commonly administers KRCHN as **2 integrated CBT papers**:

| Paper | Main Integrated Areas |
| :---- | :---- |
| Paper 1 | Medical-Surgical + Midwifery + Pharmacology |
| Paper 2 | Community Health + Mental Health + Professional Issues |

### BScN

NCK now commonly administers BScN as **2 highly integrated competency papers**:

| Paper | Main Integrated Areas |
| :---- | :---- |
| Paper 1 | Advanced Adult Health + Specialised Nursing + Maternal/Newborn |
| Paper 2 | Community/Public Health + Research + Leadership + Mental Health |

---

## 2. The Main Difference Between KRCHN & BScN Exam Setting

The major difference is **NOT** merely the number of papers.

The real difference is:

- Competency depth
- Complexity of clinical reasoning
- Leadership/research integration
- Level of independent nursing judgment expected

---

## 3. How NCK Sets KRCHN Exams

KRCHN exams are designed around:

- Safe bedside nursing
- Procedural competency
- Basic-to-intermediate clinical decision-making
- Implementation of established nursing protocols

### Focus Areas
- Direct patient care
- Routine nursing management
- Standard protocol application
- Emergency identification

### Typical Cognitive Level

Mostly:
- Recall
- Application
- Prioritisation

Less emphasis on:
- Advanced analysis
- Leadership systems thinking
- Evidence appraisal

### Typical KRCHN Question Styles
- Identify the first nursing action
- Recognise danger signs
- Select correct intervention
- Perform protocol-based management

**Example style:**
> *"A patient develops dyspnoea post-operatively. What should the nurse do first?"*

This tests: prioritisation, emergency recognition, bedside action.

---

## 4. How NCK Sets BScN Exams

BScN exams are designed around:

- Professional nurse leadership
- Independent clinical judgment
- Evidence-based practice
- Systems thinking
- Advanced patient management

### Focus Areas
- Comprehensive patient management
- Research utilisation
- Leadership
- Interdisciplinary coordination
- Evidence-based care

### Typical Cognitive Level

Heavy emphasis on:
- Analysis
- Synthesis
- Evaluation
- Clinical reasoning

### Typical BScN Question Styles
- Prioritisation with multiple comorbidities
- Leadership delegation
- Interpretation of research evidence
- Quality improvement
- Community systems management

**Example style:**
> *"A diabetic hypertensive patient develops acute confusion after medication adjustment. Analyse possible causes and prioritise interdisciplinary interventions."*

This requires: pathophysiological reasoning, pharmacology integration, prioritisation, collaborative care planning.

---

## 5. Difference in Question Complexity

| Area | KRCHN | BScN |
| :---- | :---- | :---- |
| Clinical depth | Moderate | Advanced |
| Pharmacology integration | Basic/intermediate | Advanced |
| Leadership questions | Limited | Extensive |
| Research questions | Basic | Heavy |
| Community systems thinking | Moderate | Advanced |
| Independent decision making | Moderate | High |
| Evidence-based practice | Limited | Strong emphasis |
| Multi-system integration | Moderate | Extensive |

---

## 6. CBT & Online Proctoring

Both KRCHN and BScN currently use DigiProctor-style CBT systems. Both cadres undergo:

- CBT exams
- Mock exams
- Digital verification
- Electronic monitoring/proctoring systems

NCK now requires:
- Mandatory rehearsals
- Mock examinations
- Examination system orientation
- Digital identity verification before the main exam

---

## 7. Current NCK Exam Format

The modern CBT format uses:

### A. MCQs
Still dominant. Usually:
- Single-best-answer
- Clinical scenario-based

### B. Structured Short Answers
Candidates type concise answers, identify interventions, list priorities, interpret clinical findings.

### C. Clinical Scenarios
Large integrated case studies. Candidates may answer sequential questions, prioritisation items, and nursing process questions.

> **Note on Long Essays (LAQs):** Traditional handwritten essays are decreasing under CBT. Long narrative essays are being replaced by structured clinical reasoning questions, short typed responses, and integrated scenarios.

---

## 8. Current NCK Exam Cycles (2025–2026)

| Exam Cycle | Typical Purpose |
| :---- | :---- |
| February | Resits / special candidates |
| May | Main national licensing series |
| August / November | Additional licensing series |

---

## 9. Rehearsal & Mock System

Before sitting exams, candidates must:

- Attend physical rehearsal
- Complete mock exams
- Receive exam cards
- Undergo system familiarisation

---

## 10. Key Trends in Recent 2025–2026 Exams

Recent NCK papers for **both** KRCHN and BScN increasingly emphasise:

- Emergency prioritisation
- Infection prevention
- Oxygenation
- Shock/sepsis recognition
- Maternal emergencies
- Patient safety
- Kenyan MOH guidelines
- Integrated care
- Clinical judgment rather than recall

BScN papers consistently go deeper into:
- Leadership
- Evidence-based practice
- Research interpretation
- Systems management
- Advanced reasoning
- Interdisciplinary care coordination

---

## 11. Key Conclusions for Question Seeding

### KRCHN
NCK examines whether the candidate can:
- Safely care for patients
- Recognise emergencies
- Follow protocols
- Deliver competent bedside nursing care

> **Seeding implication:** KRCHN questions should be grounded in direct care, protocol application, and emergency recognition. Cognitive level: mostly recall, application, and prioritisation. Avoid heavy research/leadership framing.

### BScN
NCK examines whether the candidate can:
- Think independently
- Lead nursing care
- Integrate evidence
- Coordinate complex care
- Make higher-level clinical decisions
- Function as a professional nurse leader

> **Seeding implication:** BScN questions should reflect advanced clinical reasoning, multi-system integration, evidence-based practice, and leadership. Cognitive level: analysis, synthesis, evaluation. Scenario complexity should be higher than KRCHN equivalents.

---

## 12. Paper Assignment for Seeded Questions

The platform uses **Roman numeral** paper names (`'Paper I'`, `'Paper II'`) — always use this format in the `paper` field of the `questions` table. Arabic numerals (`'Paper 1'`, `'Paper 2'`) are incorrect and will cause a mismatch with the mock exam engine.

Both KRCHN and BScN have **2 papers each**, matching the NCK integrated CBT structure in Section 1.

**KRCHN — 2 papers:**

| Paper value in DB | Integrated Areas | Units covered |
| :---- | :---- | :---- |
| `'Paper I'` | Medical-Surgical + Midwifery + Pharmacology | Medical-Surgical Nursing, Midwifery, Pharmacology, Maternal & Child Health, Paediatric Nursing, Anatomy & Physiology, Surgical Nursing |
| `'Paper II'` | Community Health + Mental Health + Professional Issues | Community Health Nursing, Mental Health Nursing, Environmental Health, Nutrition, Research & Statistics, Health Systems & Management, Infection Prevention & Control |

**BScN — 2 papers:**

| Paper value in DB | Integrated Areas | Units covered |
| :---- | :---- | :---- |
| `'Paper I'` | Advanced Adult Health + Specialised Nursing + Maternal/Newborn | Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology, Critical Care Nursing, Surgical Nursing, Midwifery, Maternal & Child Health, Paediatric Nursing |
| `'Paper II'` | Community/Public Health + Research + Leadership + Mental Health | Community Health Nursing, Mental Health Nursing, Research & Evidence-Based Practice, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, Infection Prevention & Control, Nutrition |

> **Critical rule:** Every seeded question must have its `paper` value set according to this table. The mock exam engine filters questions by `cadre` AND `paper` — a wrong or missing paper value means the question will never appear in the correct exam.

---

## 13. Seeding Criteria by `exam_year`

The `exam_year` field in the `questions` table is an `INTEGER` (nullable). It records the NCK past paper year from which a question was sourced. It is **admin and analytics use only** — it is never exposed to students.

### 13.1 When to Set `exam_year`

| Situation | `exam_year` value |
| :---- | :---- |
| Question sourced from a dated NCK past paper PDF | Set to the **integer year** of that paper (e.g., `2011`, `2012`, `2014`, `2016`, `2018`) |
| Question sourced from an undated / uncategorised PDF or set | Set to `NULL` |
| Question is platform-created (not from a past paper) | Set to `NULL` |
| Question is from a Word document upload with a known year | Set to the **integer year** stated in the document |
| Question is from a Word document upload with no year stated | Set to `NULL` |

### 13.2 Years Already Seeded (Do Not Duplicate)

The following year/cadre/paper combinations have already been seeded into the database. Before inserting questions from a source document, confirm the year and cadre against this table to avoid duplicates:

| Year | Cadre | Paper | Source description |
| :---- | :---- | :---- | :---- |
| 2011 | KRCHN | Paper II | NCK Paper 2 — KRCHN August 2011 |
| 2011 | KRCHN | Paper I | NCK Paper 3 — KRCHN 2011 set |
| 2012 | KRCHN | Paper II | NCK Paper 2 — KRCHN August 2012 |
| 2012 | KRCHN | Paper I | NCK Paper 3 — KRCHN 2012 set |
| 2014 | KRCHN | Paper II | NCK Paper 2 — KRCHN July 2014 |
| 2014 | KRCHN | Paper I | NCK Paper 3 — KRCHN 2014 set; Paper 4 — KRCHN July 2014 |
| 2016 | BScN | Paper II | NCK Paper 2 — BScN August 2016; Paper 4 — BScN August 2016 |
| 2018 | BScN | Paper II | NCK Paper 2 — BScN April 2018 |
| NULL | BScN | Paper I / Paper II | Multiple uncategorised sets (Papers 1, 2, 3 — no year on source PDF) |
| NULL | KRCHN | Paper I / Paper II | Multiple uncategorised sets (Papers 1, 2, 3 — no year on source PDF) |

> **Deduplication rule:** If a question stem already exists in the database (exact or near-identical wording), **do not re-insert it** — even if the source year differs. Use the existing row and update `exam_year` if it was previously `NULL`.

### 13.3 How to Handle an Uploaded Word Document

When a Word document containing questions, answers, and rationales is uploaded for seeding, follow this checklist:

1. **Identify the year** — look for a year on the document title, header, or footer. If found, use that integer as `exam_year`. If not found, use `NULL`.
2. **Identify the cadre** — determine whether the questions are KRCHN or BScN based on document labelling and question complexity (see Sections 3 and 4). A document may contain both cadres; assign each question individually.
3. **Assign the paper** — map each question's subject area to `'Paper I'` or `'Paper II'` using the table in Section 12. **Never use Arabic numerals** (`'Paper 1'`, `'Paper 2'`).
4. **Check for duplicates** — cross-reference against the already-seeded years in Section 13.2 and against existing question stems before inserting.
5. **Set standard fields** — every inserted question must have:
   - `status = 'approved'`
   - `contributor_id = NULL` (platform-owned)
   - `difficulty` — assign `'easy'`, `'medium'`, or `'hard'` based on cognitive level (recall = easy; application/prioritisation = medium; analysis/synthesis/evaluation = hard)
6. **One INSERT per question** — do not batch multiple different questions into a single VALUES list that spans a migration; keep one `INSERT INTO questions ... VALUES (...)` block per question for clarity and rollback safety.

### 13.4 `exam_year` vs. Question Content

`exam_year` is a metadata tag only. It does **not** affect:
- Which paper the question appears in (governed by `paper`)
- Which cadre sees the question (governed by `cadre`)
- Question difficulty or weighting

Its sole purpose is to allow admin filtering (e.g., "show all 2014 KRCHN questions") and analytics (e.g., tracking coverage of past paper years).

---

## References

- https://nckenya.com/examination/
- https://nckenya.com/wp-content/uploads/2025/12/Annexure-Examination-instructions-and-schedule-February-May-2026-1.pdf
- https://osp.nckenya.com/ajax/login
- https://nckenya.com/downloads/
