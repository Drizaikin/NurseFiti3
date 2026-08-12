# Design Document — question-bank-seed

## Overview

This design describes the technical implementation for seeding NCK-MCQ-Compilation-Set5 questions into the NurseFiti `questions` table. The feature is a one-time data migration executed by an authorised developer. It produces a single Supabase migration SQL file, runs post-seed verification queries, and updates the What's New modal to announce the new batch to students.

Source: **NCK-MCQ-Compilation-Set5** (undated Word document — `exam_year = NULL`).

Estimated unique questions after deduplication:
- BScN Paper I: ~400
- BScN Paper II: ~180
- KRCHN Paper I: ~400
- KRCHN Paper II: ~179
- **Total: ~900–1,000**

---

## Architecture

The feature has no runtime code changes. It is purely a migration artifact plus two component constant updates:

```
Source Document (Set5.docx)
        │
        ▼
  Audit Phase (auditor reads each question)
        │
        ▼
  Migration File (SQL INSERTs)          ──▶  supabase/migrations/
        │
        ▼
  Post-Seed Verification (SQL queries)  ──▶  Supabase console / CLI
        │
        ▼
  WhatsNew Bump (version 16 → 17)       ──▶  components/student/
```

No application code in `app/` is modified. The rotation system picks up new questions automatically because it queries `questions WHERE status = 'approved'` on every session start.

---

## Components and Interfaces

### Migration File

| Property | Value |
|---|---|
| Location | `supabase/migrations/` |
| Naming convention | `<UTC-timestamp>_seed_mcq_compilation_set5.sql` |
| Timestamp format | `YYYYMMDDHHMMSS` (current UTC at time of file creation) |
| Example filename | `20260805120000_seed_mcq_compilation_set5.sql` |

Because the last migration is `20260801000000_seed_new_mnemonics.sql`, the new file's timestamp must be greater than `20260801000000`. Use the actual UTC datetime at creation time.

### WhatsNew Components

| File | Change |
|---|---|
| `components/student/WhatsNewModal.tsx` | Increment `CURRENT_VERSION` from `16` → `17`; add a new entry to `WHATS_NEW_RELEASES` |
| `components/student/WhatsNewTrigger.tsx` | Set `CURRENT_VERSION` to `17` |

Both files must be updated in the same commit as (or immediately after) the migration file.

---

## Data Models

### `questions` Table — Field Reference

All INSERTs target the `questions` table. Every row must populate these fields exactly:

| Field | Type | Value for this batch |
|---|---|---|
| `stem` | TEXT (≤ 2000 chars) | Question text from source |
| `option_a` | TEXT (≤ 500 chars) | Option A from source |
| `option_b` | TEXT (≤ 500 chars) | Option B from source |
| `option_c` | TEXT (≤ 500 chars) | Option C from source |
| `option_d` | TEXT (≤ 500 chars) | Option D from source |
| `correct_option` | TEXT | `'A'` / `'B'` / `'C'` / `'D'` — verified against rationale |
| `rationale` | TEXT (≤ 2000 chars) | Audited and corrected where necessary |
| `cadre` | TEXT | `'BScN'` or `'KRCHN'` |
| `paper` | TEXT | `'Paper I'` or `'Paper II'` (Roman numerals only) |
| `unit` | TEXT | Canonical unit name (see rotation steering doc) |
| `topic` | TEXT | Specific sub-topic (3–60 chars, not `'General'`) |
| `difficulty` | TEXT | `'easy'` / `'medium'` / `'hard'` (Bloom's mapping) |
| `status` | TEXT | `'approved'` (hard-coded) |
| `contributor_id` | UUID | `NULL` (platform-owned) |
| `exam_year` | INTEGER | `NULL` (undated batch) |

### Unique Constraint

The `questions` table has a unique constraint on `(stem, cadre)`. Every INSERT must include:

```sql
ON CONFLICT (stem, cadre) DO NOTHING
```

---

## Migration File Structure

### Header Block

Every migration file begins with a comment header as the first content:

```sql
-- ============================================================
-- Batch:           NCK-MCQ-Compilation-Set5
-- Source document: NCK_MCQ_Compilation_Set5.docx
-- Total questions: <N> (estimated ~900-1000 unique after dedup)
-- Cadres:          BScN, KRCHN
-- Papers:          Paper I, Paper II
-- exam_year:       NULL (undated source document)
-- Generated:       <UTC datetime>
-- ============================================================
```

### Per-Question INSERT Template

Each question gets its own INSERT statement. Multiple questions are **never** batched into a single multi-row `VALUES` list — one INSERT per question for rollback safety and readability.

**Standard INSERT (no correction needed):**

```sql
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'Question stem text here.',
  'Option A text',
  'Option B text',
  'Option C text',
  'Option D text',
  'B',
  'Rationale explaining why B is correct per MOH Kenya/NCK guidelines.',
  'BScN',
  'Paper I',
  'Medical-Surgical Nursing',
  'Fluid and Electrolyte Balance',
  'medium',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;
```

**INSERT with audit correction (Audit 3a–3e format):**

When the marked answer in the source document was wrong and the auditor corrected it, a comment block immediately precedes the INSERT:

```sql
-- AUDIT CORRECTION
-- Original marked answer: A
-- Corrected answer:       C
-- Reason: Source marked option A (folic acid) but rationale and MOH Kenya guidelines
--         specify folinic acid (leucovorin) as the correct antidote for methotrexate
--         toxicity. Folic acid is contraindicated — it competes with folinic acid rescue.
INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status, contributor_id, exam_year)
VALUES (
  'A patient on methotrexate therapy develops signs of toxicity. Which antidote should the nurse administer?',
  'Folic acid 5mg orally',
  'Vitamin B12 1000mcg IM',
  'Folinic acid (leucovorin) IV',
  'Cyanocobalamin 500mcg IM',
  'C',
  'Folinic acid (leucovorin) is the specific antidote for methotrexate toxicity. It bypasses the enzyme blocked by methotrexate, restoring folate function. Folic acid is contraindicated as it cannot be converted to active folate when dihydrofolate reductase is inhibited by methotrexate. MOH Kenya Poisoning guidelines confirm leucovorin as the rescue agent.',
  'BScN',
  'Paper I',
  'Pharmacology',
  'Antidotes and Toxicology',
  'hard',
  'approved',
  NULL,
  NULL
) ON CONFLICT (stem, cadre) DO NOTHING;
```

The "3a–3e" audit corrections referenced in the requirements correspond to five specific clinical error categories identified during audit:
- **3a** — Wrong drug concentration (e.g. 3% vs 1% tetracycline eye ointment)
- **3b** — Wrong diluent (e.g. oxytocin in dextrose vs normal saline)
- **3c** — Antidote confusion (e.g. folic acid vs folinic acid for methotrexate)
- **3d** — Outdated drug classification / contraindication error
- **3e** — Mechanism error (pharmacokinetics vs pharmacodynamics confusion)

Each correction gets its own `-- AUDIT CORRECTION` block with all three lines (original, corrected, reason).

---

## Character Encoding Cleanup

The Set5 source document may contain Windows-1252 → UTF-8 misinterpretation artifacts — most commonly `â€™` appearing instead of a right single quotation mark `'` (U+2019).

**Cleanup approach:**

Before writing each SQL string, replace these artifacts with their correct UTF-8 equivalents:

| Artifact | Correct character | Unicode |
|---|---|---|
| `â€™` | `'` | U+2019 RIGHT SINGLE QUOTATION MARK |
| `â€œ` | `"` | U+201C LEFT DOUBLE QUOTATION MARK |
| `â€` | `"` | U+201D RIGHT DOUBLE QUOTATION MARK |
| `â€"` | `–` | U+2013 EN DASH |
| `â€"` | `—` | U+2014 EM DASH |

If using a Python helper to batch-transform the document text before writing SQL:

```python
text = text.replace('â€™', '\u2019')
text = text.replace('â€œ', '\u201c')
text = text.replace('â€\x9d', '\u201d')
text = text.replace('â€"', '\u2013')
text = text.replace('â€"', '\u2014')
```

All SQL strings in the migration file must be clean UTF-8. Single quotes inside SQL strings are escaped with a doubled quote (`''`), not a backslash.

---

## Deduplication Strategy

Deduplication operates at two levels:

**Level 1 — Database constraint (automatic):**
`ON CONFLICT (stem, cadre) DO NOTHING` silently skips any INSERT where the exact stem already exists for the same cadre. No error is raised; the migration continues.

**Level 2 — Pre-write human check (manual):**
Before writing each INSERT, the auditor performs a case-insensitive, whitespace-normalised comparison against the source question list to catch near-duplicates that differ only in punctuation or capitalisation. If a near-duplicate is found for the same cadre, the question is excluded. If the stem is identical but the cadre differs, the INSERT is allowed — the constraint permits it.

**Cross-batch duplicates:**
Set5 may overlap with previously seeded NULL-year batches (Set3, Set4, undated compiled batches). The `ON CONFLICT DO NOTHING` handles exact stem matches automatically. The auditor should be alert to paraphrased duplicates that evade the constraint.

---

## `exam_year = NULL` Assignment

The Set5 source document (`NCK_MCQ_Compilation_Set5.docx`) contains no identifiable 4-digit year in its title, header, or footer. Per Requirement 6.3 and the NCK exam system steering document (Section 13.1), all questions in this batch receive:

```sql
exam_year = NULL
```

This is a hard-coded `NULL` in every INSERT — not a variable, not a string `'NULL'`, just SQL `NULL`. The field type is `INTEGER` nullable.

---

## Paper Value Enforcement

Every question must have `paper = 'Paper I'` or `paper = 'Paper II'`. Arabic numerals (`'Paper 1'`, `'Paper 2'`) are prohibited.

Paper assignment follows the unit-to-paper mapping from the NCK exam system steering document:

**KRCHN:**
- `'Paper I'`: Medical-Surgical Nursing, Midwifery, Pharmacology, Maternal & Child Health, Paediatric Nursing, Anatomy & Physiology, Surgical Nursing
- `'Paper II'`: Community Health Nursing, Mental Health Nursing, Environmental Health, Nutrition, Research & Statistics, Health Systems & Management, Infection Prevention & Control

**BScN:**
- `'Paper I'`: Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology, Critical Care Nursing, Surgical Nursing, Midwifery, Maternal & Child Health, Paediatric Nursing
- `'Paper II'`: Community Health Nursing, Mental Health Nursing, Research & Evidence-Based Practice, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, Infection Prevention & Control, Nutrition

The auditor assigns `paper` based on the question's `unit`. If a question's `unit` maps unambiguously to a paper for its cadre, no further judgment is needed.

---

## Standard Field Values

These values are identical for every row in this batch and must not vary:

| Field | Value | Notes |
|---|---|---|
| `status` | `'approved'` | Platform-owned; immediately visible to students |
| `contributor_id` | `NULL` | No contributor for admin-seeded batches |
| `exam_year` | `NULL` | Undated source document |

---

## Post-Seed Verification Queries

Run these queries in the Supabase SQL editor (or via CLI) immediately after applying the migration. All must pass before the migration is considered complete.

```sql
-- 1. No NULL cadre or paper
SELECT COUNT(*) AS null_cadre_or_paper
FROM questions
WHERE cadre IS NULL OR paper IS NULL;
-- Expected: 0

-- 2. No invalid unit or topic values in newly inserted rows
SELECT id, unit, topic
FROM questions
WHERE (unit = 'Nursing' OR topic = 'General')
  AND exam_year IS NULL
  AND contributor_id IS NULL
  AND status = 'approved'
  AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0 rows

-- 3. No Arabic-numeral paper values
SELECT id, paper
FROM questions
WHERE paper IN ('Paper 1', 'Paper 2');
-- Expected: 0 rows

-- 4. All new rows have status='approved' and contributor_id IS NULL
SELECT COUNT(*) AS bad_status_or_contributor
FROM questions
WHERE status != 'approved' OR contributor_id IS NOT NULL
  AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0

-- 5. exam_year is integer or NULL (never a text value)
SELECT id, exam_year
FROM questions
WHERE exam_year IS NOT NULL
  AND pg_typeof(exam_year)::text != 'integer'
  AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0 rows

-- 6. correct_option is one of A, B, C, D
SELECT id, correct_option
FROM questions
WHERE correct_option NOT IN ('A', 'B', 'C', 'D')
  AND created_at > NOW() - INTERVAL '10 minutes';
-- Expected: 0 rows

-- 7. Row counts by cadre and paper (for batch summary)
SELECT cadre, paper, COUNT(*) AS new_questions
FROM questions
WHERE created_at > NOW() - INTERVAL '10 minutes'
GROUP BY cadre, paper
ORDER BY cadre, paper;
-- Expected: 4 rows covering (BScN, Paper I), (BScN, Paper II),
--           (KRCHN, Paper I), (KRCHN, Paper II) — none with count = 0
```

After verification passes, update the question counts table in the `question-rotation-system.md` steering document.

---

## WhatsNew Modal Update

After the migration is pushed:

1. In `components/student/WhatsNewModal.tsx`:
   - Change `const CURRENT_VERSION = 16;` → `const CURRENT_VERSION = 17;`
   - Add to the bottom of `WHATS_NEW_RELEASES`:
     ```ts
     {
       version: 17,
       date: "<DD Month YYYY>",
       items: [
         {
           icon: "📚",
           tag: "New",
           tagColor: "bg-emerald-500/20 text-emerald-400",
           title: "900+ New Practice Questions Added",
           description:
             "We've added over 900 new NCK-style questions for both BScN and KRCHN students across Paper I and Paper II. Start practising now to boost your exam readiness.",
           cta: { label: "Practise now", href: "/practice" },
         },
       ],
     }
     ```

2. In `components/student/WhatsNewTrigger.tsx`:
   - Change `const CURRENT_VERSION = 16;` → `const CURRENT_VERSION = 17;`

Both files must be committed together with (or immediately after) the migration file in the same git commit.

---

## Error Handling

| Scenario | Handling |
|---|---|
| Source question has a blank option (A–D) | Exclude from batch; document in a `-- SKIPPED` comment in migration header |
| `correct_option` doesn't match A/B/C/D | Exclude from batch; document reason |
| Correct answer contradicts rationale | Correct the answer; add `-- AUDIT CORRECTION` block |
| Stem is an exact duplicate for same cadre | `ON CONFLICT DO NOTHING` silently skips it |
| Stem is an exact duplicate for different cadre | INSERT proceeds; constraint allows it |
| Character encoding artifact found | Fix in SQL string before writing; no runtime error |
| Post-seed verification query returns non-zero | Fix affected rows in a follow-up migration before marking seed complete |

---

## Testing Strategy

This is a data migration feature. Property-based testing is not applicable — the feature consists of manually audited SQL INSERTs, static field assignments, and database-level constraint enforcement. There are no pure functions with variable input/output to test with a PBT framework.

**Applicable test types:**

1. **Pre-migration smoke checks (manual):**
   - Review migration file header for correct batch name, source filename, and question count
   - Spot-check 10–15 random INSERTs: verify `paper` uses Roman numerals, `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL`
   - Confirm every `-- AUDIT CORRECTION` block has all three lines (original, corrected, reason)
   - Confirm no `â€™` or other encoding artifacts remain in SQL strings

2. **Post-migration integration checks (SQL verification queries):**
   - Run all seven verification queries in the Post-Seed Verification Queries section above
   - All must return 0 / expected counts before the migration is considered complete
   - Any failure must be remediated in a follow-up migration before the batch is announced

3. **Rotation compatibility check (manual):**
   - Start a practice session as a BScN student — confirm new units appear in the unit selector
   - Start a practice session as a KRCHN student — confirm the same
   - Start a mock exam (Paper I and Paper II) for both cadres — confirm new questions appear

4. **WhatsNew modal smoke test (manual):**
   - Clear `localStorage` and reload the student dashboard — confirm the v17 modal appears
   - Dismiss the modal — confirm it does not re-appear on the next page load
   - Confirm `CURRENT_VERSION` matches between `WhatsNewModal.tsx` and `WhatsNewTrigger.tsx`
