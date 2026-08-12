# Implementation Plan: question-bank-seed

## Overview

This plan converts the NCK-MCQ-Compilation-Set5 design into a sequence of SQL migration authoring tasks, post-seed verification, and a WhatsNew modal version bump. All tasks produce either SQL file changes or TypeScript component edits. There are no runtime application-code changes — the rotation system picks up new questions automatically.

Migration filename: `supabase/migrations/20260805000001_seed_mcq_compilation_set5.sql`

---

## Tasks

- [ ] 1. Create migration file skeleton and apply audit corrections
  - [ ] 1.1 Create the migration file with the standard header block
    - Create `supabase/migrations/20260805000001_seed_mcq_compilation_set5.sql`
    - Write the header comment block: batch name (`NCK-MCQ-Compilation-Set5`), source document filename (`NCK_MCQ_Compilation_Set5.docx`), total question count placeholder (~900–1,000), cadres (BScN, KRCHN), papers (Paper I, Paper II), exam_year (NULL), generated timestamp
    - _Requirements: 7.4_

  - [ ] 1.2 Write the 5 audit-corrected INSERTs (3a–3e)
    - For each of the five audit corrections, write an `-- AUDIT CORRECTION` block (three comment lines: original marked answer, corrected answer, reason) immediately above the INSERT
    - 3a — Wrong drug concentration (e.g. 3% vs 1% tetracycline eye ointment)
    - 3b — Wrong diluent (e.g. oxytocin in dextrose vs normal saline)
    - 3c — Antidote confusion (folinic acid vs folic acid for methotrexate)
    - 3d — Outdated drug classification / contraindication error
    - 3e — Mechanism error (pharmacokinetics vs pharmacodynamics confusion)
    - Each INSERT must include `ON CONFLICT (stem, cadre) DO NOTHING`
    - `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL` on all five rows
    - _Requirements: 4.2, 4.5, 7.3_

- [ ] 2. Seed BScN Paper I questions (~400 questions)
  - [ ] 2.1 Write INSERTs for BScN Paper I — Medical-Surgical Nursing and Anatomy & Physiology
    - Cover units: Medical-Surgical Nursing, Anatomy & Physiology
    - `cadre = 'BScN'`, `paper = 'Paper I'`, `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL`
    - Each `topic` must be a specific clinical sub-topic (3–60 chars); never `'General'`
    - `unit` must exactly match the rotation system's permitted strings
    - `difficulty` mapped from Bloom's: easy (recall), medium (application/prioritisation), hard (analysis/synthesis/evaluation)
    - Include `ON CONFLICT (stem, cadre) DO NOTHING` on every INSERT
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.9, 6.1–6.3, 7.2, 9.1–9.2_

  - [ ] 2.2 Write INSERTs for BScN Paper I — Pharmacology and Critical Care Nursing
    - Cover units: Pharmacology, Critical Care Nursing
    - Same field rules as 2.1
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.9, 6.1–6.3, 7.2, 9.1–9.2_

  - [ ] 2.3 Write INSERTs for BScN Paper I — Surgical Nursing, Midwifery, Maternal & Child Health, and Paediatric Nursing
    - Cover units: Surgical Nursing, Midwifery, Maternal & Child Health, Paediatric Nursing
    - Same field rules as 2.1
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.9, 6.1–6.3, 7.2, 9.1–9.2_

- [ ] 3. Seed BScN Paper II questions (~180 questions)
  - [ ] 3.1 Write INSERTs for BScN Paper II — Community Health Nursing, Mental Health Nursing, and IPC
    - Cover units: Community Health Nursing, Mental Health Nursing, Infection Prevention & Control
    - `cadre = 'BScN'`, `paper = 'Paper II'`, `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL`
    - Same topic, difficulty, and conflict rules as task 2
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.10, 6.1–6.3, 7.2, 9.1–9.2_

  - [ ] 3.2 Write INSERTs for BScN Paper II — Research & EBP, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, and Nutrition
    - Cover units: Research & Evidence-Based Practice, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, Nutrition
    - Same field rules as 3.1
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.10, 6.1–6.3, 7.2, 9.1–9.2_

- [ ] 4. Seed KRCHN Paper I questions (~400 questions)
  - [ ] 4.1 Write INSERTs for KRCHN Paper I — Medical-Surgical Nursing and Anatomy & Physiology
    - Cover units: Medical-Surgical Nursing, Anatomy & Physiology
    - `cadre = 'KRCHN'`, `paper = 'Paper I'`, `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL`
    - KRCHN cognitive level: recall and bedside-application focus (Bloom's Levels 1–3)
    - Same topic, difficulty, and conflict rules as task 2
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.7, 6.1–6.3, 7.2, 9.1–9.2_

  - [ ] 4.2 Write INSERTs for KRCHN Paper I — Pharmacology and Surgical Nursing
    - Cover units: Pharmacology, Surgical Nursing
    - Same field rules as 4.1
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.7, 6.1–6.3, 7.2, 9.1–9.2_

  - [ ] 4.3 Write INSERTs for KRCHN Paper I — Midwifery, Maternal & Child Health, and Paediatric Nursing
    - Cover units: Midwifery, Maternal & Child Health, Paediatric Nursing
    - Same field rules as 4.1
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.7, 6.1–6.3, 7.2, 9.1–9.2_

- [ ] 5. Seed KRCHN Paper II questions (~179 questions)
  - [ ] 5.1 Write INSERTs for KRCHN Paper II — Community Health Nursing, Mental Health Nursing, and Environmental Health
    - Cover units: Community Health Nursing, Mental Health Nursing, Environmental Health
    - `cadre = 'KRCHN'`, `paper = 'Paper II'`, `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL`
    - Same topic, difficulty, and conflict rules as task 4
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.8, 6.1–6.3, 7.2, 9.1–9.2_

  - [ ] 5.2 Write INSERTs for KRCHN Paper II — Nutrition, Research & Statistics, Health Systems & Management, and IPC
    - Cover units: Nutrition, Research & Statistics, Health Systems & Management, Infection Prevention & Control
    - Same field rules as 5.1
    - _Requirements: 2.1–2.4, 3.3, 3.5, 3.8, 6.1–6.3, 7.2, 9.1–9.2_

- [ ] 6. Checkpoint — Pre-apply migration review
  - Spot-check 10–15 random INSERTs across all four cadre/paper groups: verify `paper` uses Roman numerals, `status = 'approved'`, `contributor_id = NULL`, `exam_year = NULL`
  - Confirm every `-- AUDIT CORRECTION` block (tasks 1.2) contains all three required lines
  - Confirm no Windows-1252 encoding artifacts (`â€™`, `â€œ`, `â€"`, etc.) remain in any SQL string
  - Confirm the migration header total question count matches the actual INSERT count
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Write post-seed verification SQL block
  - [ ] 7.1 Append the 7 verification queries as a comment block at the end of the migration file
    - Query 1: `SELECT COUNT(*) WHERE cadre IS NULL OR paper IS NULL` — expected 0
    - Query 2: newly inserted rows where `unit = 'Nursing'` or `topic = 'General'` — expected 0 rows
    - Query 3: rows where `paper IN ('Paper 1', 'Paper 2')` — expected 0 rows
    - Query 4: `status != 'approved'` or `contributor_id IS NOT NULL` on new rows — expected 0
    - Query 5: `exam_year` type check (not text) on new rows — expected 0 rows
    - Query 6: `correct_option NOT IN ('A','B','C','D')` on new rows — expected 0 rows
    - Query 7: `COUNT(*) GROUP BY cadre, paper` — expected 4 rows, none with count = 0
    - _Requirements: 8.1–8.7_

- [ ] 8. Update WhatsNew components to version 17
  - [ ] 8.1 Update `components/student/WhatsNewModal.tsx`
    - Change `const CURRENT_VERSION = 16;` → `const CURRENT_VERSION = 17;`
    - Append the v17 release entry to the bottom of `WHATS_NEW_RELEASES` array:
      - `version: 17`, `date: "<DD Month YYYY>"`, one item with icon `"📚"`, tag `"New"`, tagColor `"bg-emerald-500/20 text-emerald-400"`, title `"900+ New Practice Questions Added"`, description in student-facing language mentioning count rounded to nearest 10, cadres covered (BScN and KRCHN), and CTA linking to `/practice`
    - _Requirements: 10.1, 10.2, 10.5_

  - [ ] 8.2 Update `components/student/WhatsNewTrigger.tsx`
    - Change `const CURRENT_VERSION = 16;` → `const CURRENT_VERSION = 17;`
    - Confirm the value matches `WhatsNewModal.tsx` exactly — a mismatch causes the trigger pill to malfunction
    - _Requirements: 10.3, 10.4_

- [ ] 9. Final checkpoint — Verify migration and component consistency
  - Confirm `CURRENT_VERSION = 17` in both `WhatsNewModal.tsx` and `WhatsNewTrigger.tsx`
  - Confirm the migration file total INSERT count matches the header comment
  - Confirm no `-- SKIPPED` exclusions were left without documentation in the migration header
  - Ensure all tasks are complete, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP (none in this plan — this is a data migration with no PBT-applicable pure functions)
- The design document explicitly states property-based testing is not applicable for this feature; only SQL verification queries and manual smoke checks apply
- Each INSERT task references the exact unit names required by the rotation system — deviating from the canonical spelling will silently break rotation queries
- `ON CONFLICT (stem, cadre) DO NOTHING` must appear on every single INSERT; a missing clause can overwrite existing rows
- Encoding cleanup (Windows-1252 artifacts → correct UTF-8) must be applied before writing any SQL string, not after
- Both WhatsNew component files must be committed together in the same git commit as or immediately after the migration file (Requirement 10.6)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "3.1", "3.2", "4.1", "4.2", "4.3", "5.1", "5.2"] },
    { "id": 3, "tasks": ["7.1"] },
    { "id": 4, "tasks": ["8.1", "8.2"] }
  ]
}
```
