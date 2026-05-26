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

## References

- https://nckenya.com/examination/
- https://nckenya.com/wp-content/uploads/2025/12/Annexure-Examination-instructions-and-schedule-February-May-2026-1.pdf
- https://osp.nckenya.com/ajax/login
- https://nckenya.com/downloads/
