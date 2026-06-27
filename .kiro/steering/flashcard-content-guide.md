---
inclusion: manual
---

# NurseFiti — Flashcard Content & Seeding Guide

> **Purpose:** This document governs how flashcard decks and cards are created, styled and seeded. Read this before adding any new flashcard content.

---

## 1. Flashcard System Architecture

Each flashcard deck has:
- A row in `flashcard_decks` — one deck per unit/subject, per cadre
- Rows in `flashcards` — individual cards belonging to the deck
- `flashcard_progress` rows (created at study time per student) — never seeded

### Key fields

| Table | Field | Notes |
|---|---|---|
| `flashcard_decks` | `cadre` | `'KRCHN'` or `'BScN'` |
| `flashcard_decks` | `unit` | Exact unit string from the questions table taxonomy |
| `flashcard_decks` | `card_count` | Must match actual number of flashcards in the deck |
| `flashcards` | `front_text` | The question side — a focused prompt, not more than 2 sentences |
| `flashcards` | `back_text` | Full answer with enough clinical detail for learning |
| `flashcards` | `back_highlight` | A short 3–10 word memory anchor — the "sticky" part of the answer |
| `flashcards` | `unit` | Must match the deck's `unit` exactly |

---

## 2. Card Writing Standards

### Front text (question side)
- Write as a clinical scenario or direct question
- Keep it under 40 words
- Focus on ONE concept per card
- Good: `"A patient on warfarin has INR of 6.2. What is the first nursing action?"`
- Bad: `"What is warfarin, what does it do, and what are the side effects?"`

### Back text (answer side)
- Full, complete answer — 2–4 sentences
- Include the rationale/reason (not just what to do, but why)
- Reference Kenya-relevant guidelines (MOH, KEPI, IMNCI, Kenya Paediatric Protocols)
- Good: `"Hold the warfarin dose and notify the physician. INR >5.0 with no bleeding → hold dose and recheck. INR >5.0 with minor bleeding → hold + vitamin K oral. INR >8.0 or major bleeding → stop, IV vitamin K + prothrombin complex concentrate. Ref: MOH Kenya anticoagulation guidelines."`

### Back highlight (memory anchor)
- 3–10 words maximum
- Should be the single most important thing to remember
- Often a mnemonic, a value, a drug name, a rule, or a visual trigger
- Examples: `"Hold dose + notify physician"`, `"4.5 mL"`, `"TDF + 3TC + DTG"`, `"Clear before cloudy"`

---

## 3. Card Density & Coverage

Each deck should have **15–25 cards** covering the highest-yield topics in that unit. Aim for:
- Drug calculations and dosages (pharmacology units)
- Normal values and thresholds (A&P, clinical units)
- Emergency recognition signs (clinical units)
- Protocol sequences (IMNCI, DOTS, KEPI schedules)
- Definitions and classifications (research, community health)
- Side effects and contraindications (pharmacology)

---

## 4. Themes and Psychology

The flashcard page offers 7 themes, each grounded in colour psychology:

| Theme | Best for | Psychology principle |
|---|---|---|
| Clinical Focus | Focused recall | High contrast reduces cognitive load |
| Night Owl | Late-night sessions | Blue light reduction improves melatonin |
| Sakura | Enjoyable study | Positive emotions improve hippocampal consolidation by ~40% |
| Ocean Calm | Pre-exam anxiety | Blue tones reduce cortisol |
| Deep Forest | Long sessions | Green signals safety/growth to the brain |
| Golden Hour | Morning sessions | Warm tones sync with circadian rhythm |
| Neon Lab | Late-night drill | High contrast triggers mild arousal for factual recall |

Themes are chosen by the student at deck launch — content seeding does not need to specify a theme.

---

## 5. Deck IDs

Use a deterministic UUID pattern for deck IDs to allow `ON CONFLICT (id) DO NOTHING` safe re-runs:

```
a1000000-0000-0000-0000-00000000000X  ← existing decks (001–009)
a2000000-0000-0000-0000-00000000000X  ← KRCHN Paper I decks
a3000000-0000-0000-0000-00000000000X  ← KRCHN Paper II decks
a4000000-0000-0000-0000-00000000000X  ← BScN Paper I decks
a5000000-0000-0000-0000-00000000000X  ← BScN Paper II decks
```

Always use `ON CONFLICT (id) DO NOTHING` on deck inserts.

---

## 6. Units in Scope

### KRCHN Paper I decks
- Medical-Surgical Nursing
- Pharmacology
- Paediatric Nursing
- Midwifery
- Maternal & Child Health
- Anatomy & Physiology
- Surgical Nursing

### KRCHN Paper II decks
- Community Health Nursing
- Mental Health Nursing
- Nutrition
- Research & Statistics
- Health Systems & Management
- Environmental Health
- Infection Prevention & Control

### BScN Paper I decks
- Medical-Surgical Nursing
- Pharmacology
- Paediatric Nursing
- Critical Care Nursing
- Midwifery
- Maternal & Child Health
- Anatomy & Physiology
- Surgical Nursing

### BScN Paper II decks
- Community Health Nursing
- Mental Health Nursing
- Research & Evidence-Based Practice
- Nursing Management & Leadership
- Professional Ethics & Law
- Health Systems in Kenya
- Infection Prevention & Control
- Nutrition

---

## 7. Current Decks Seeded (as of June 2026)

| Deck ID | Name | Cadre | Unit | Cards |
|---|---|---|---|---|
| a1000000-…-001 | Pharmacology Fundamentals | KRCHN | Clinical Pharmacology | 20 |
| a1000000-…-002 | Maternal & Child Health | KRCHN | Maternal & Child Health | 20 |
| a1000000-…-003 | Community Health Essentials | KRCHN | Community Health Nursing | 20 |
| a1000000-…-004 | Medical-Surgical Nursing | KRCHN | Medical-Surgical Nursing | 20 |
| a1000000-…-005 | Mental Health Nursing | BScN | Mental Health Nursing | 5 |
| a1000000-…-006 | Anatomy & Physiology Quick Review | BScN | Human Anatomy | 5 |
| a2000000-…-001 | Paediatric Nursing Essentials | KRCHN | Paediatric Nursing | 20 |
| a2000000-…-002 | Midwifery Essentials | KRCHN | Midwifery | 15 |
| a2000000-…-003 | Anatomy & Physiology Quick Review | KRCHN | Anatomy & Physiology | 15 |
| a3000000-…-001 | Community Health & Epidemiology | KRCHN | Community Health Nursing | 20 |
| a3000000-…-002 | Research Methods & Biostatistics | KRCHN | Research & Statistics | 18 |
| a3000000-…-003 | Mental Health Nursing — KRCHN | KRCHN | Mental Health Nursing | 18 |
| a4000000-…-001 | BScN Advanced Pharmacology | BScN | Pharmacology | 18 |
| a5000000-…-001 | BScN Nursing Leadership & Management | BScN | Nursing Management & Leadership | 18 |
| a5000000-…-002 | BScN Research & Evidence-Based Practice | BScN | Research & Evidence-Based Practice | 15 |

> **Total: ~247 cards across 15 decks.** Update this table after each new batch.
