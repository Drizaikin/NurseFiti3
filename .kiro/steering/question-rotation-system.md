---
inclusion: manual
---

# NurseFiti — Question Rotation & Distribution System

> **Purpose:** This document describes the complete question rotation and distribution system currently implemented in NurseFiti. It must be read every time new question batches are added to the database, to ensure new questions integrate correctly with the rotation logic and students continue to receive a fair, non-repetitive experience.

---

## 1. Background & Problem This Solves

Before this system was implemented, both the Practice and Mock Exam features fetched questions using a simple random shuffle with a hard `.limit()` cap. This caused:

- Students repeatedly seeing the **same 20–100 questions** even when more existed in the database
- No mechanism to track which questions a student had already answered
- Mock exam questions sometimes clustering — e.g., 6 Pharmacology questions in a row

This system fixes all of that.

---

## 2. Database Schema — What Was Added

A migration (`20260604000001_question_rotation.sql`) added two columns to the `student_answers` table:

```sql
ALTER TABLE student_answers ADD COLUMN IF NOT EXISTS unit TEXT;
ALTER TABLE student_answers ADD COLUMN IF NOT EXISTS paper TEXT;

CREATE INDEX IF NOT EXISTS idx_answers_student_unit
  ON student_answers (student_id, unit)
  WHERE mode = 'practice';

CREATE INDEX IF NOT EXISTS idx_answers_student_paper
  ON student_answers (student_id, paper)
  WHERE mode = 'mock_exam';
```

### Why denormalize `unit` and `paper` onto `student_answers`?

The `questions` table already has `unit` and `paper`. However, to efficiently answer "which question IDs has this student already answered in unit X?" you would need a JOIN on every practice session start. By storing `unit` and `paper` directly on each `student_answers` row at insert time, the lookup becomes a single indexed query with no JOIN — much faster at scale.

### Full `student_answers` schema (after migration)

| Column | Type | Notes |
|---|---|---|
| `id` | UUID PK | |
| `student_id` | UUID FK → profiles | |
| `question_id` | UUID FK → questions | |
| `selected_option` | TEXT | A / B / C / D |
| `is_correct` | BOOLEAN | |
| `time_taken_seconds` | INTEGER | nullable |
| `mode` | TEXT | `practice` / `mock_exam` / `weak_drill` |
| `session_id` | UUID | nullable |
| `answered_at` | TIMESTAMPTZ | |
| `unit` | TEXT | **NEW** — denormalized from questions.unit |
| `paper` | TEXT | **NEW** — denormalized from questions.paper |

---

## 3. Practice Mode — Rotation Logic

**File:** `app/(student)/practice/page.tsx` → `startPractice()` and `handleAnswer()`

### How it works (step by step)

**Step 1 — Query answered IDs for this unit**

When a student starts a practice session, the app first queries `student_answers` to get all `question_id` values the student has already answered in `mode = 'practice'`:

- If the student selected a **specific unit**, filter by `unit = selectedUnit`
- If the student selected **"All Units"**, no unit filter is applied (tracks across all units)

```
student_answers
  WHERE student_id = <current student>
  AND mode = 'practice'
  AND unit = <selectedUnit>   ← only if a specific unit was chosen
```

**Step 2 — Fetch unseen questions**

The app fetches questions from the `questions` table, filtered by the student's `cadre` and `status = 'approved'`, **excluding** the already-answered IDs:

```
questions
  WHERE cadre = <studentCadre>
  AND status = 'approved'
  AND unit = <selectedUnit>   ← only if a specific unit was chosen
  AND id NOT IN (<answeredIds>)
  LIMIT <remaining * 2>       ← fetch double for shuffle headroom
```

**Step 3 — Cycle reset**

If the number of unseen questions returned is **less than the session batch size** (20), it means the student has answered every question in that unit. The app:

1. Resets by fetching **all** questions for that unit (no exclusion)
2. Shows a toast: `"🔄 You've gone through all questions in this unit — starting the cycle again!"`

**Step 4 — Shuffle and serve**

The fetched questions are shuffled randomly, then sliced to the batch size (20) and served to the student.

**Step 5 — Save with `unit` on each answer**

In `handleAnswer()`, when a student submits an answer, it is saved to `student_answers` with the `unit` field populated from the question object already in memory:

```typescript
const answeredQuestion = questions.find(q => q.id === questionId);
const questionUnit = answeredQuestion?.unit ?? null;

supabase.from('student_answers').insert({
  student_id: userId,
  question_id: questionId,
  selected_option: selectedOption,
  is_correct: isCorrect,
  time_taken_seconds: timeTaken,
  mode: 'practice',
  unit: questionUnit,   // ← this is what powers the next rotation
});
```

### Practical result for students

| Session | What they get |
|---|---|
| 1st session — Pharmacology | Questions 1–20 (never seen) |
| 2nd session — Pharmacology | Questions 21–40 (skips already answered) |
| 3rd session — Pharmacology | Questions 41–60 |
| …continues until exhausted… | |
| After all questions answered | Cycle resets → Questions 1–20 again (toast shown) |

This behaviour is **per unit per student** — one student's rotation does not affect another's.

---

## 4. Mock Exam Mode — Rotation + NCK-Style Distribution

**File:** `app/(student)/mock-exam/page.tsx` → `startExam()` and `submitExam()`

### 4.1 Rotation Logic

**Step 1 — Query seen question IDs for this paper**

When a student starts a mock exam, the app queries all question IDs they have previously seen in mock exams for the same paper:

```
student_answers
  WHERE student_id = <current student>
  AND mode = 'mock_exam'
  AND paper = <config.paper>    ← e.g. 'Paper I' or 'Paper II'
```

**Step 2 — Fetch ALL questions for the paper**

Unlike practice mode, the app fetches **the entire question bank** for that cadre + paper (no `.limit()` cap at this stage):

```
questions
  WHERE cadre = <config.cadre>
  AND paper = <config.paper>
  AND status = 'approved'
```

**Step 3 — Filter to unseen questions**

```typescript
let unseenPool = allQuestions.filter(q => !seenIds.includes(q.id));
```

**Step 4 — Cycle reset**

If `unseenPool.length < config.totalQuestions` (i.e. fewer unseen questions than needed for a full 100-question exam), the cycle is considered complete and the full bank is used again:

```typescript
if (unseenPool.length < config.totalQuestions) {
  unseenPool = allQuestions;  // reset: use full bank
  cycleReset = true;
}
```

When `cycleReset = true`, a toast is shown: `"🔄 You've completed a full exam cycle — questions are now repeating from the full bank."`

### 4.2 NCK-Style Unit Distribution (Interleaving)

After the unseen pool is determined, questions are **not** simply shuffled randomly. Instead, they are spread across the 100-question exam proportionally by unit — mimicking how NCK distributes questions across subjects in a real paper.

**How the interleaving works:**

1. Group questions by `unit`
2. Shuffle within each unit (so individual questions are randomised)
3. Calculate each unit's proportional share of the 100 slots:
   ```
   unit_share = round( (unit_count / total_pool_size) × 100 )
   ```
4. Assign each unit's questions to evenly-spaced positions across the exam array:
   - A unit with 20 questions gets a slot roughly every 5 positions
   - A unit with 5 questions gets a slot roughly every 20 positions
5. Fill any gaps from rounding with remaining unseen questions

**Practical result:**

Instead of getting questions like:
```
Q1–Q12: Pharmacology, Q13–Q28: Anatomy, Q29–Q35: Pharmacology again...
```

Students get:
```
Q1: Pharmacology, Q2: Anatomy, Q3: Midwifery, Q4: Med-Surg, Q5: Pharmacology...
```

This matches the real NCK CBT experience where no subject dominates a long stretch.

### 4.3 Saving Answers for Rotation Tracking

Previously, mock exam results were only saved as a **summary row** in `mock_exam_results`. This meant the rotation system had no record of which individual questions a student had seen.

Now, at the end of every mock exam (`submitExam()`), every individual question the student encountered is saved to `student_answers`:

```typescript
const answerRecords = questions.map(q => ({
  student_id: userId,
  question_id: q.id,
  selected_option: answers[q.id] ?? 'A',
  is_correct: answers[q.id] === q.correct_option,
  time_taken_seconds: null,
  mode: 'mock_exam',
  unit: q.unit,     // ← for unit-level analytics
  paper: config.paper, // ← for rotation tracking
  answered_at: new Date().toISOString(),
}));

supabase.from('student_answers').insert(answerRecords);
```

This insert happens **before** the `mock_exam_results` summary insert, so rotation tracking is always up to date.

---

## 5. Paper & Unit Classification Rules

Questions **must** be assigned the correct `paper` and `unit` values when seeded. The rotation system filters by both. A wrong `paper` value means:
- The question never appears in the correct mock exam
- It is excluded from the correct rotation cycle

### KRCHN

| `paper` value | Units that belong here |
|---|---|
| `'Paper I'` | Medical-Surgical Nursing, Midwifery, Pharmacology, Maternal & Child Health, Paediatric Nursing, Anatomy & Physiology, Surgical Nursing |
| `'Paper II'` | Community Health Nursing, Mental Health Nursing, Environmental Health, Nutrition, Research & Statistics, Health Systems & Management, Infection Prevention & Control |

### BScN

| `paper` value | Units that belong here |
|---|---|
| `'Paper I'` | Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology, Critical Care Nursing, Surgical Nursing, Midwifery, Maternal & Child Health, Paediatric Nursing |
| `'Paper II'` | Community Health Nursing, Mental Health Nursing, Research & Evidence-Based Practice, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, Infection Prevention & Control, Nutrition |

> **Critical:** The `paper` field must always use Roman numerals: `'Paper I'` and `'Paper II'`. Never use `'Paper 1'` or `'Paper 2'` — the mock exam engine filters by exact string match.

---

## 6. What to Do When Adding New Question Batches

Follow this checklist every time a new batch of questions is seeded:

1. **Assign the correct `cadre`** — either `'KRCHN'` or `'BScN'`
2. **Assign the correct `unit`** — must match exactly one of the unit strings in Section 5 (case-sensitive)
3. **Assign the correct `paper`** — `'Paper I'` or `'Paper II'` based on the unit (see Section 5)
4. **Set `status = 'approved'`** — only approved questions appear in practice and mock exams
5. **Check for duplicates** — compare `stem` text against existing questions before inserting to avoid duplicate content appearing in rotation cycles
6. **Do not add a `contributor_id`** for admin-seeded batches — leave it `null`

### Impact of new questions on existing rotation cycles

- New questions are immediately included in rotation because the system queries the live database on every session start
- Students who have already completed a cycle will encounter new questions in their **next** session (they won't be in the `student_answers` exclusion list yet)
- No migration or cache flush is needed when adding new questions

---

## 7. Current Question Counts (as of June 2026)

| Cadre | Paper | Questions | Units Covered |
|---|---|---|---|
| KRCHN | Paper I | ~181 | A&P, MCH, Midwifery, Med-Surg, Paediatrics, Pharmacology, Surgical |
| KRCHN | Paper II | ~232 | Nutrition, Mental Health, Health Systems, Community Health, Environmental Health, Research & Stats, IPC |
| BScN | Paper I | ~233 | Med-Surg, Surgical, Midwifery, A&P, MCH, Paediatrics, Pharmacology, Critical Care, Mental Health |
| BScN | Paper II | ~172 | Nursing Management, Mental Health, Research & EBP, Ethics & Law, Community Health, IPC, Nutrition |
| **Total** | | **~818** | |

> **Last batch added:** `20260616000001_seed_answered_mcqs_doc1.sql` — 458 inserts (229 unique questions × both cadres where criteria met). Source: NCK-Answered-MCQs-with-Rationales 1.docx.

> Update this table after each batch is added.

---

## 8. Known Limits & Edge Cases

| Scenario | What happens |
|---|---|
| Student selects "All Units" in practice | Rotation tracks across all units combined — answeredIds pool is larger, but same logic applies |
| A unit has fewer than 20 questions | The app fetches all of them (no error), session is shorter than 20 |
| Mock exam paper has fewer than 100 questions | The exam uses however many are available; no crash |
| Student answers a question twice in the same session | Only the first answer is recorded; duplicate inserts are safe (no unique constraint on student_id + question_id) |
| New questions added mid-cycle | New questions appear in the next session immediately; they are not in the student's answered list yet |
| `unit` column is null on an old `student_answers` row | Old rows (before migration) have `unit = null` — these are not excluded from rotation (they don't match any unit filter), so old answered questions may repeat once before being tracked. This self-corrects after the first session post-migration. |

---

## 9. Files Modified by This System

| File | What changed |
|---|---|
| `app/(student)/practice/page.tsx` | `startPractice()` — rotation query logic; `handleAnswer()` — saves `unit` on insert |
| `app/(student)/mock-exam/page.tsx` | `startExam()` — rotation + NCK interleaving; `submitExam()` — saves individual answers with `unit` and `paper` |
| `supabase/migrations/20260604000001_question_rotation.sql` | Adds `unit` and `paper` columns + indexes to `student_answers` |
