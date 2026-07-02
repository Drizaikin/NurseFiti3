-- Migration: 20260702000001
-- Purpose: Correct erroneous Mental Health Act admission data
--
-- ERRORS FOUND AND CORRECTED:
--
-- 1. MCQ (exam_year 2021): Q9 "The legal document used for involuntary psychiatric
--    admission in Kenya is:" had correct_option = 'A' (MOH 613).
--    CORRECTION: correct_option = 'C' (MOH 614).
--    MOH 613 is used for VOLUNTARY admission.
--    MOH 614 is used for INVOLUNTARY (compulsory) admission.
--    MOH 637 is used for voluntary admission of MINORS (under 16, by parent/guardian).
--    Source: Kenya Mental Health (Amendment) Act 2022; Kenya MOH forms reference.
--
-- 2. Flashcard (Deck 5 — Mental Health Nursing, BScN): answer was incomplete.
--    Missing: Emergency/Protective Custody pathway (24 hrs → 72 hr assessment),
--    MOH form numbers, voluntary patient's right to leave on 72-hr written notice,
--    and the minor admission provision (MOH 637).

-- ── Fix MCQ: correct_option A → C for both KRCHN and BScN versions ──────────

UPDATE questions
SET
  correct_option = 'C',
  rationale = 'Under the Kenya Mental Health (Amendment) Act 2022 and the older Cap 248 framework, MOH forms are assigned as follows: MOH 613 = VOLUNTARY admission (adult); MOH 614 = INVOLUNTARY (compulsory) admission; MOH 637 = voluntary admission of a minor (under 16) by parent or guardian; MOH 638 = emergency/forensic pathway. An involuntary admission requires documented psychiatric assessment and a tribunal review — the patient cannot be detained indefinitely without review. Ref: Kenya Mental Health (Amendment) Act 2022; Kenya MOH administrative forms.'
WHERE
  stem = 'The legal document used for involuntary psychiatric admission in Kenya is:'
  AND cadre = 'KRCHN';

UPDATE questions
SET
  correct_option = 'C',
  rationale = 'Under the Kenya Mental Health (Amendment) Act 2022, MOH forms are: MOH 613 = VOLUNTARY admission (adult); MOH 614 = INVOLUNTARY (compulsory) admission; MOH 637 = voluntary admission of a minor; MOH 638 = emergency/forensic pathway. Involuntary admission requires documented assessment and tribunal review; no patient can be detained indefinitely without review. Ref: Kenya Mental Health (Amendment) Act 2022; Kenya MOH administrative forms.'
WHERE
  stem = 'The legal document used for involuntary psychiatric admission in Kenya is:'
  AND cadre = 'BScN';

-- ── Fix Flashcard: update back_text and back_highlight ───────────────────────

UPDATE flashcards
SET
  back_text = 'Under the Kenya Mental Health (Amendment) Act 2022, there are three admission pathways:

1. VOLUNTARY ADMISSION (MOH 613 for adults; MOH 637 for minors under 16 by parent/guardian): Patient consents to treatment. May leave after giving 72 hours'' written notice.

2. INVOLUNTARY (COMPULSORY) ADMISSION (MOH 614): Patient lacks insight, refuses treatment, and is a danger to self or others. Requires documented psychiatric assessment and review tribunal. No patient can be detained indefinitely without review.

3. EMERGENCY / PROTECTIVE CUSTODY: Authorised persons (police Inspector+, chiefs, assistant chiefs) may take a person into protective custody if they are mentally disordered and are dangerous, neglected, or acting indecently. Person must reach a hospital within 24 hours. Initial assessment period up to 72 hours.

Informed consent applies to all competent voluntary patients.',
  back_highlight = 'MOH 613 = Voluntary · MOH 614 = Involuntary · MOH 637 = Minor · Emergency = 24 hrs to hospital'
WHERE
  front_text = 'Under the Mental Health Act Kenya 2022, what are the admission types?';
