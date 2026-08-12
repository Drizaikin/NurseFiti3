# Requirements Document

## Introduction

This specification covers the end-to-end process for seeding a new batch of NCK past-paper MCQs into the NurseFiti database. The workflow spans five sequential phases: (1) receiving and parsing a question source document, (2) auditing each question for clinical accuracy and metadata correctness, (3) writing and validating the SQL seed migration, (4) running post-seed verification queries, and (5) announcing the new batch to students via the What's New modal.

The process is performed by an authorised NurseFiti admin or developer. All seeded questions must integrate correctly with the existing question rotation system (practice mode, mock exam mode) and must satisfy the NCK CBT blueprint for cadre, paper, unit, and cognitive-level alignment.

---

## Glossary

- **Seed_Process**: The complete end-to-end workflow of ingesting a source document and inserting validated questions into the `questions` table.
- **Source_Document**: A Word document, PDF, or other file containing question stems, options, marked answers, and rationales supplied for seeding.
- **Auditor**: The admin or developer performing the question audit before SQL generation.
- **Question_Row**: A single row in the `questions` table representing one MCQ.
- **Migration_File**: A Supabase migration SQL file (e.g. `YYYYMMDDHHMMSS_seed_<batch_name>.sql`) placed in `supabase/migrations/`.
- **Deduplication_Check**: The process of detecting exact or near-identical question stems for the same cadre to prevent duplicate inserts.
- **Rotation_System**: The practice-mode and mock-exam rotation logic described in the question-rotation-system steering document; it depends on correct `unit`, `paper`, `cadre`, and `status` values on every Question_Row.
- **WhatsNew_Modal**: The `WhatsNewModal.tsx` component that announces new content to students on their next page load.
- **CURRENT_VERSION**: The integer version constant shared between `WhatsNewModal.tsx` and `WhatsNewTrigger.tsx`; must be incremented to trigger a new announcement.
- **KRCHN**: Kenya Registered Community Health Nurse — a cadre identifier used in the `cadre` column.
- **BScN**: Bachelor of Science in Nursing — a cadre identifier used in the `cadre` column.
- **Paper_I**: The first paper value (`'Paper I'`) used in the `paper` column; always Roman numeral.
- **Paper_II**: The second paper value (`'Paper II'`) used in the `paper` column; always Roman numeral.

---

## Requirements

---

### Requirement 1: Source Document Intake and Parsing

**User Story:** As an admin, I want to parse an uploaded source document into individual question records, so that each question can be independently audited and seeded.

#### Acceptance Criteria

1. WHEN a Source_Document is provided, THE Seed_Process SHALL extract each question as a discrete record containing: stem (max 2000 characters), option_a, option_b, option_c, option_d (each max 500 characters), marked_correct_option, and rationale (max 2000 characters).
2. WHEN a Source_Document header or title contains an explicit 4-digit year between 1900 and 2100 (e.g. "NCK 2014"), THE Seed_Process SHALL record that integer as the candidate `exam_year` for all questions in that document.
3. WHEN a Source_Document contains no identifiable 4-digit year, THE Seed_Process SHALL assign `exam_year = NULL` to all questions in that document.
4. WHEN a Source_Document contains questions from a single identifiable cadre (KRCHN or BScN), THE Seed_Process SHALL apply that cadre to all questions in the document.
5. WHEN a Source_Document contains questions from multiple cadres (KRCHN and BScN), THE Seed_Process SHALL assign each question's `cadre` individually based on document labelling and question complexity, not apply a single cadre to the entire document.
6. IF a Source_Document contains a question where one or more options (option_a, option_b, option_c, or option_d) are blank or absent, THEN THE Seed_Process SHALL flag that question identifying which specific options are missing, preserve the partial record for manual reconstruction, and exclude it from the INSERT batch until reconstruction is confirmed complete.
7. IF a Source_Document contains a question where `marked_correct_option` does not match any of the four extracted options (A, B, C, or D), THEN THE Seed_Process SHALL flag that question as unresolvable and exclude it from the INSERT batch.

---

### Requirement 2: Cadre and Cognitive Level Assignment

**User Story:** As an admin, I want every question assigned the correct cadre and difficulty, so that students see questions appropriate to their qualification level.

#### Acceptance Criteria

1. THE Seed_Process SHALL assign `cadre = 'KRCHN'` to questions that test recall, application, or prioritisation at the bedside-nursing level, and `cadre = 'BScN'` to questions that test analysis, synthesis, or evaluation at the professional-nurse-leader level.
2. WHEN a question's cognitive level is determined to be recall (Bloom's Level 1), THE Seed_Process SHALL assign `difficulty = 'easy'`.
3. WHEN a question's cognitive level is determined to be application or prioritisation (Bloom's Levels 2–3), THE Seed_Process SHALL assign `difficulty = 'medium'`.
4. WHEN a question's cognitive level is determined to be analysis, synthesis, or evaluation (Bloom's Levels 4–6), THE Seed_Process SHALL assign `difficulty = 'hard'`.
5. THE Seed_Process SHALL never insert a Question_Row where `cadre IS NULL` or `difficulty IS NULL`.
6. IF a question's cadre cannot be determined from the source document, THEN THE Auditor SHALL resolve the cadre ambiguity by comparing the question's complexity against the NCK KRCHN and BScN exam setting criteria before proceeding with the seed run.
7. IF a question's cognitive level cannot be determined using Bloom's Taxonomy, THEN THE Auditor SHALL resolve the ambiguity before proceeding with the seed run.
8. IF the Seed_Process attempts to insert a Question_Row with a NULL `cadre` or NULL `difficulty`, THEN THE Seed_Process SHALL abort that row's INSERT, log the offending question's source identifier and the unresolved field name, and halt the seed run.

---

### Requirement 3: Paper, Unit, and Topic Assignment

**User Story:** As an admin, I want every question assigned the correct paper, unit, and topic, so that the Rotation_System includes questions in the correct mock exam paper and practice unit grouping.

#### Acceptance Criteria

1. THE Seed_Process SHALL assign `paper = 'Paper I'` or `paper = 'Paper II'` (Roman numerals only) to every Question_Row using the unit-to-paper mapping defined in the NCK exam system steering document.
2. THE Seed_Process SHALL never use Arabic numeral strings (`'Paper 1'`, `'Paper 2'`) in the `paper` field.
3. THE Seed_Process SHALL assign `unit` to one of the established clinical unit names defined for the question's cadre (e.g. `'Pharmacology'`, `'Midwifery'`, `'Community Health Nursing'`).
4. THE Seed_Process SHALL never assign `unit = 'Nursing'` to any Question_Row.
5. THE Seed_Process SHALL assign `topic` to a specific clinical sub-topic within the unit (e.g. `'Antimicrobials'`, `'Obstetric Emergencies'`, `'Epidemiology'`), between 3 and 60 characters.
6. THE Seed_Process SHALL never assign `topic = 'General'` to any Question_Row.
7. WHEN a question covers content classified under KRCHN Paper I, THE Seed_Process SHALL assign `paper = 'Paper I'` and set `unit` to one of: Medical-Surgical Nursing, Midwifery, Pharmacology, Maternal & Child Health, Paediatric Nursing, Anatomy & Physiology, Surgical Nursing.
8. WHEN a question covers content classified under KRCHN Paper II, THE Seed_Process SHALL assign `paper = 'Paper II'` and set `unit` to one of: Community Health Nursing, Mental Health Nursing, Environmental Health, Nutrition, Research & Statistics, Health Systems & Management, Infection Prevention & Control.
9. WHEN a question covers content classified under BScN Paper I, THE Seed_Process SHALL assign `paper = 'Paper I'` and set `unit` to one of: Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology, Critical Care Nursing, Surgical Nursing, Midwifery, Maternal & Child Health, Paediatric Nursing.
10. WHEN a question covers content classified under BScN Paper II, THE Seed_Process SHALL assign `paper = 'Paper II'` and set `unit` to one of: Community Health Nursing, Mental Health Nursing, Research & Evidence-Based Practice, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, Infection Prevention & Control, Nutrition.
11. IF any Question_Row is missing `paper`, `unit`, or `topic` after assignment, THEN THE Seed_Process SHALL abort the batch, report the count of affected rows and their source identifiers, and not write any INSERT to the database for those rows.
12. IF a `unit` value does not match the permitted unit list for the question's `cadre`, THEN THE Seed_Process SHALL abort that row's INSERT, report the invalid unit value and the affected row's source identifier.

---

### Requirement 4: Answer and Rationale Audit

**User Story:** As an admin, I want every question's correct answer and rationale audited against authoritative clinical references before insertion, so that students are never taught incorrect information.

#### Acceptance Criteria

1. THE Auditor SHALL independently verify each question's correct answer against its rationale — the marked answer in the source document SHALL NOT be trusted without verification.
2. WHEN the marked answer in the source document contradicts the clinical rationale, THE Auditor SHALL determine the correct answer from the rationale and primary reference materials, note the correction in a SQL comment immediately above the INSERT statement (stating the original marked answer, the corrected answer, and the reason), and proceed with the corrected answer.
3. WHEN a question has multiple clinically defensible answers, THE Auditor SHALL select the most appropriate answer per NCK/MOH Kenya/Kenya Medical Protocols and ensure the rationale explicitly explains why that choice is the most appropriate over the other defensible options.
4. THE Auditor SHALL audit every rationale for clinical accuracy against the reference hierarchy: MOH Kenya guidelines → Kenya-specific nursing texts → WHO guidelines → international nursing texts (Brunner & Suddarth, Myles, Nelson Paediatrics, etc.).
5. IF a rationale contains an identified clinical error (e.g. wrong drug concentration such as 3% vs 1% tetracycline eye ointment, wrong diluent such as oxytocin in dextrose vs normal saline, antidote confusion such as folic acid vs folinic acid for methotrexate, outdated drug classification, contraindication error), THEN THE Auditor SHALL correct the rationale before the INSERT is written.
6. THE Seed_Process SHALL populate the `rationale` field with a complete, accurate clinical explanation for every Question_Row — a blank or placeholder rationale is not permitted.
7. IF a question's correct answer cannot be determined after consulting all reference materials in the hierarchy, THEN THE Auditor SHALL exclude the question from the INSERT batch and document the reason.

---

### Requirement 5: Deduplication

**User Story:** As an admin, I want duplicate questions detected and skipped before insertion, so that students do not encounter the same question twice in the same cadre's rotation cycle.

#### Acceptance Criteria

1. WHEN a question stem, after normalizing whitespace to single spaces, trimming leading and trailing whitespace, removing punctuation characters (periods, commas, question marks, exclamation marks), and converting all characters to lowercase, matches an existing Question_Row with the same `cadre` value, THE Seed_Process SHALL skip the INSERT for that question.
2. WHEN a question stem matches an existing Question_Row but the `cadre` value differs, THE Seed_Process SHALL proceed with the INSERT because the UNIQUE constraint on `(stem, cadre)` permits it.
3. WHEN a question's knowledge area overlaps with an existing question but the normalized stem does not match any existing Question_Row with the same `cadre`, THE Seed_Process SHALL proceed with the INSERT.
4. WHEN a duplicate is detected and the existing Question_Row has `exam_year = NULL` and the new source document has an identified exam year as a 4-digit integer between 1900 and 2100, THE Seed_Process SHALL issue an UPDATE setting the existing row's `exam_year` to that integer value instead of inserting a new row.
5. IF the new source document has an identified exam year and the existing duplicate Question_Row already has a non-NULL `exam_year`, THEN THE Seed_Process SHALL skip both the INSERT and the UPDATE, leaving the existing row unchanged.
6. THE Seed_Process SHALL include `ON CONFLICT (stem, cadre) DO NOTHING` in every INSERT statement so that exact-duplicate inserts are silently skipped without terminating the migration.

---

### Requirement 6: Standard Field Values

**User Story:** As an admin, I want every seeded question to have the required platform-standard field values set, so that questions appear correctly in practice mode, mock exam mode, and admin dashboards.

#### Acceptance Criteria

1. THE Seed_Process SHALL set `status = 'approved'` on every Question_Row.
2. THE Seed_Process SHALL set `contributor_id = NULL` on every Question_Row (platform-owned questions have no contributor).
3. THE Seed_Process SHALL set `exam_year` to the integer year sourced from the document header, or `NULL` if no year is identifiable — never a string, never a float.
4. THE Seed_Process SHALL never insert a Question_Row where `paper IS NULL`.
5. THE Seed_Process SHALL never insert a Question_Row where `cadre IS NULL`.
6. WHEN a year/cadre/paper combination has already been fully seeded (as recorded in the nck-exam-system steering document), THE Seed_Process SHALL compare all question stems against existing rows using case-insensitive, whitespace-normalized comparison before inserting, and shall log the count of skipped duplicates on completion.
7. IF the Seed_Process detects a Question_Row with `paper IS NULL` or `cadre IS NULL` at INSERT time, THEN THE Seed_Process SHALL skip that row's INSERT, log an error identifying the row index and source document, and continue processing remaining rows.

---

### Requirement 7: SQL Migration File Construction

**User Story:** As a developer, I want the seed data delivered as a properly structured Supabase migration file, so that it can be applied to production using the standard migration pipeline.

#### Acceptance Criteria

1. WHEN the Seed_Process completes, THE Seed_Process SHALL produce one migration file named `supabase/migrations/<UTC-timestamp>_seed_<batch_name>.sql` where `<UTC-timestamp>` is the current UTC date-time in `YYYYMMDDHHMMSS` format and `<batch_name>` contains only alphanumeric characters and underscores.
2. THE Migration_File SHALL contain one `INSERT INTO questions (...) VALUES (...) ON CONFLICT (stem, cadre) DO NOTHING;` statement per question — multiple distinct questions SHALL NOT be batched into a single multi-row `VALUES` list.
3. WHEN an answer correction was made during audit, THE Migration_File SHALL include a SQL comment on the line immediately preceding the INSERT, with each of the following on a separate comment line: the original marked answer, the corrected answer, and the reason for the correction.
4. THE Migration_File SHALL begin with a header comment block as the first content in the file, stating: batch name, source document filename, total question count as a positive integer, cadre(s) covered, and paper(s) covered.
5. IF the current UTC timestamp cannot be resolved at the time of file creation, THEN THE Seed_Process SHALL halt and report an error rather than produce a Migration_File with an invalid or placeholder timestamp.

---

### Requirement 8: Post-Seed Verification

**User Story:** As a developer, I want a post-seed verification checklist run after applying the migration, so that data quality issues are caught before students interact with the new questions.

#### Acceptance Criteria

1. WHEN the Migration_File has been applied, THE Seed_Process SHALL run `SELECT COUNT(*) FROM questions WHERE cadre IS NULL OR paper IS NULL`; IF the result is not `0`, THE Seed_Process SHALL output a failure message listing the IDs of all affected rows.
2. WHEN the Migration_File has been applied, THE Seed_Process SHALL run a query checking for newly inserted rows where `unit = 'Nursing'` or `topic = 'General'`; IF any such rows exist, THE Seed_Process SHALL output a failure message listing those rows' IDs and current unit/topic values.
3. WHEN the Migration_File has been applied, THE Seed_Process SHALL run a query checking for newly inserted rows where `paper IN ('Paper 1', 'Paper 2')`; IF any such rows exist, THE Seed_Process SHALL output a failure message listing those rows' IDs and incorrect paper values.
4. WHEN the Migration_File has been applied, THE Seed_Process SHALL run a query confirming `status = 'approved'` and `contributor_id IS NULL` on every newly inserted row; IF any row fails either check, THE Seed_Process SHALL output a failure message identifying those rows.
5. WHEN the Migration_File has been applied, THE Seed_Process SHALL run a query confirming that `exam_year` is either an integer or NULL (not a text value) on every newly inserted row; IF any row fails this check, THE Seed_Process SHALL output a failure message identifying those rows.
6. WHEN the Migration_File has been applied, THE Seed_Process SHALL confirm that `correct_option` is one of `'A'`, `'B'`, `'C'`, or `'D'` on every newly inserted row; IF any row has an invalid value, THE Seed_Process SHALL output a failure message listing those rows.
7. WHEN the Migration_File has been applied, THE Seed_Process SHALL emit the count of newly inserted rows grouped by `(cadre, paper)`; IF any `(cadre, paper)` combination yields a count of zero, THE Seed_Process SHALL output a warning identifying that combination.
8. IF any verification check in criteria 1–6 reports a failure, THEN THE Seed_Process SHALL output a non-zero exit code and mark the migration as requiring remediation before it is considered complete.

---

### Requirement 9: Rotation System Compatibility

**User Story:** As a developer, I want new questions to integrate immediately with the existing rotation system, so that students begin seeing them in their next practice session or mock exam without any additional code changes.

#### Acceptance Criteria

1. THE Seed_Process SHALL assign `unit` values that exactly match (case-sensitive) the unit strings used by the Rotation_System's practice-mode query filters.
2. THE Seed_Process SHALL assign `paper` values that exactly match (case-sensitive) the paper strings used by the Rotation_System's mock-exam query filters (`'Paper I'` and `'Paper II'`).
3. WHEN `status = 'approved'` is set on a newly inserted Question_Row, THE Rotation_System SHALL include that question in the eligible pool for the next practice session or mock exam started by any student in that cadre within 60 seconds of the migration being applied, without requiring a server restart or cache flush.
4. THE Seed_Process SHALL NOT require any code changes to `app/(student)/practice/page.tsx` or `app/(student)/mock-exam/page.tsx` to make new questions visible — correct field values on the Question_Row are sufficient.
5. IF a Question_Row is inserted with a `unit` value that does not exactly match a unit string in the Rotation_System's permitted list, THEN THE Seed_Process SHALL reject that row with an error before any database write is committed.
6. IF a Question_Row is inserted with a `paper` value that does not exactly match `'Paper I'` or `'Paper II'`, THEN THE Seed_Process SHALL reject that row with an error before any database write is committed.

---

### Requirement 10: What's New Announcement

**User Story:** As an admin, I want the new question batch announced to all students via the What's New modal after the migration is pushed, so that students know more questions are available and are encouraged to practise.

#### Acceptance Criteria

1. WHEN a new batch migration has been pushed to production, THE Seed_Process SHALL increment `CURRENT_VERSION` in `components/student/WhatsNewModal.tsx` by exactly 1.
2. WHEN `CURRENT_VERSION` is incremented in `WhatsNewModal.tsx`, THE Seed_Process SHALL add a corresponding entry to `WHATS_NEW_RELEASES` with `version` equal to the new `CURRENT_VERSION` value, `date` in `DD Month YYYY` format, and at least one item describing the question batch.
3. WHEN `CURRENT_VERSION` is incremented in `WhatsNewModal.tsx`, THE Seed_Process SHALL update `CURRENT_VERSION` in `components/student/WhatsNewTrigger.tsx` to the same new value.
4. THE Seed_Process SHALL ensure `CURRENT_VERSION` in `WhatsNewModal.tsx` and `CURRENT_VERSION` in `WhatsNewTrigger.tsx` are identical after the update — a mismatch causes the trigger pill to behave incorrectly.
5. WHEN writing the What's New announcement items, THE Seed_Process SHALL write descriptions in student-facing language (not developer language), mentioning: the number of new questions added rounded to the nearest 10, the cadre(s) covered, and a call-to-action linking to `/practice` or `/mock-exam`.
6. THE Seed_Process SHALL commit both `WhatsNewModal.tsx` and `WhatsNewTrigger.tsx` together in the same commit as or immediately after the migration file.
7. WHEN a student loads any page after the version has been incremented, THE WhatsNew_Modal SHALL display within 2 seconds of the page reaching interactive state, provided the student has not previously dismissed the new version.
8. IF a student has already seen and dismissed the current version's modal (i.e. the locally stored `whats_new_seen_v{N}` key matches the new `CURRENT_VERSION`), THEN THE WhatsNew_Modal SHALL NOT display again on subsequent page loads for that student on that device.
