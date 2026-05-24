# Requirements Document

## Introduction

The Revision Plan Generator is a paid, AI-powered feature of the NurseFiti NCK exam preparation platform. Students fill a 3-step form (exam date, study hours, work status), pay via Paystack, and receive a personalised day-by-day HTML study schedule. The schedule analyses each student's weak units from past MCQ performance, allocates extra study time to those units (1.5× weight), and schedules practice MCQs, flashcard reviews, and full mock exams across the remaining days before the exam. The generated plan can be downloaded as a PDF and shared via a public link.

This document covers Phase 5 of the NurseFiti platform and addresses: the missing `units` database table, the payment-to-generation race condition, plan generation correctness, PDF download, public share links, and the tiered pricing model.

## Glossary

- **Platform**: The NurseFiti Next.js 14 web application
- **Student**: An authenticated nursing graduate user with a `student_profiles` row
- **Cadre**: The nursing qualification category — one of `KRCHN`, `BScN`, or `Higher Diploma`
- **Unit**: A named NCK exam subject belonging to a specific Cadre (e.g. "Pharmacology" for KRCHN)
- **NCK_Weight**: A numeric multiplier (0.7–1.5) representing a Unit's relative exam importance
- **Tier**: An integer (1, 2, or 3) classifying a Unit's exam yield — Tier 1 is highest yield
- **Accuracy**: A Student's percentage of correct answers for a given Unit, derived from `student_answers`
- **Weak_Unit**: A Unit where the Student's Accuracy is below 70%, or where the Student has no answer history
- **Revision_Plan**: A generated, student-specific day-by-day study schedule stored in `revision_plans`
- **Plan_HTML**: The self-contained HTML string that renders the Revision_Plan visually
- **Share_Token**: A UUID stored on a Revision_Plan that enables public, unauthenticated viewing
- **Payment**: A row in the `payments` table tracking a Paystack transaction
- **Paystack_Reference**: The unique string identifier for a Paystack transaction (e.g. `NF-abc123`)
- **Plan_Tier**: The Student's subscription level — one of `free`, `standard`, or `premium`
- **Generation_Price**: The KSh amount charged per Revision_Plan generation, determined by Plan_Tier
- **Race_Condition**: The timing gap between Paystack's redirect callback and the webhook marking a payment `completed`
- **Verify_Route**: `GET /api/paystack/verify` — server-side Paystack transaction verification
- **Generate_Route**: `POST /api/revision-plan/generate` — plan generation API endpoint
- **Webhook_Route**: `POST /api/paystack/webhook` — Paystack server-to-server event handler
- **RLS**: Row Level Security policies enforced by Supabase
- **Service_Role**: The Supabase service-role key that bypasses RLS, used only in server-side admin clients
- **KSh**: Kenyan Shillings

## Requirements

---

### Requirement 1: Units Table Creation

**User Story:** As a developer, I want a `units` database table with correct schema and seed data, so that the plan generation API can query NCK exam units without failing.

#### Acceptance Criteria

1. THE Platform SHALL create a `units` table using `CREATE TABLE IF NOT EXISTS` with columns: `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `cadre TEXT NOT NULL`, `name TEXT NOT NULL`, `description TEXT`, `nck_weight NUMERIC NOT NULL`, `tier INTEGER NOT NULL`, `is_examinable BOOLEAN NOT NULL DEFAULT TRUE`, and `UNIQUE(cadre, name)`
2. THE Platform SHALL enforce a `CHECK` constraint on `cadre` limiting values to `'KRCHN'`, `'BScN'`, and `'Higher Diploma'`
3. THE Platform SHALL enforce a `CHECK` constraint on `tier` limiting values to `1`, `2`, and `3`
4. THE Platform SHALL enforce a `CHECK` constraint on `nck_weight` requiring values between `0.7` and `1.5` inclusive, matching the Glossary definition of NCK_Weight
5. WHEN the `units` table migration runs, THE Platform SHALL seed units using `ON CONFLICT (cadre, name) DO NOTHING`, resulting in at least 10 rows for KRCHN, at least 10 rows for BScN, and at least 10 rows for Higher Diploma
6. THE Platform SHALL create an index on `(cadre, is_examinable)` to support the generate route's filtered query
7. WHEN the Generate_Route queries `units` filtered by `cadre` and `is_examinable = TRUE`, THE Platform SHALL return at least one row for each valid Cadre value

---

### Requirement 2: Units Table Row Level Security

**User Story:** As a security-conscious developer, I want RLS policies on the `units` table, so that students can read unit data but only the service role can modify it.

#### Acceptance Criteria

1. THE Platform SHALL enable Row Level Security on the `units` table
2. WHEN an authenticated Student reads from `units`, THE Platform SHALL permit the SELECT operation
3. WHEN an unauthenticated request reads from `units`, THE Platform SHALL deny the SELECT operation
4. WHEN any client other than the Service_Role attempts INSERT, UPDATE, or DELETE on `units`, THE Platform SHALL deny the operation
5. WHEN the Service_Role performs INSERT, UPDATE, or DELETE on `units`, THE Platform SHALL permit the operation

---

### Requirement 3: Tiered Generation Pricing

**User Story:** As a student, I want to know exactly how much I will be charged before paying, so that I can make an informed decision about generating a plan.

#### Acceptance Criteria

1. WHEN a Student with `plan_tier = 'premium'` initiates a generation, THE Platform SHALL charge KSh 199
2. WHEN a Student with `plan_tier = 'standard'` initiates a generation, THE Platform SHALL charge KSh 499
3. WHEN a Student with `plan_tier = 'free'` initiates a generation, THE Platform SHALL charge KSh 999
4. THE Platform SHALL display the applicable Generation_Price to the Student on the review step of the form before payment is initiated
5. WHEN the Paystack transaction amount does not match the Generation_Price for the Student's Plan_Tier, THE Generate_Route SHALL reject the generation request with HTTP 402
6. THE Platform SHALL pass the correct `amountKsh` value to `POST /api/paystack/initialize` based on the Student's current Plan_Tier at the time of form submission

---

### Requirement 4: Payment Initialisation

**User Story:** As a student, I want to be redirected to Paystack to complete payment, so that my plan generation is unlocked after a successful transaction.

#### Acceptance Criteria

1. WHEN a Student submits the 3-step form and clicks "Pay & Generate", THE Platform SHALL call `POST /api/paystack/initialize` with `type = 'revision_plan'`, the correct `amountKsh`, and a `metadata` object containing the serialised form data
2. WHEN `POST /api/paystack/initialize` succeeds, THE Platform SHALL redirect the Student's browser to the returned `authorization_url`
3. WHEN `POST /api/paystack/initialize` fails, THE Platform SHALL display an error toast and return the Student to the form without charging them
4. THE Platform SHALL store a `payments` row with `status = 'pending'`, `type = 'revision_plan'`, and the correct `amount` before redirecting to Paystack
5. WHEN the Student's browser is redirected to Paystack, THE Platform SHALL set the `callback_url` to `{NEXT_PUBLIC_SITE_URL}/api/paystack/verify?reference={reference}`

---

### Requirement 5: Payment Verification and Race Condition Fix

**User Story:** As a student, I want my plan to be generated immediately after I return from Paystack, so that I am not left waiting or seeing an error due to a timing issue.

#### Acceptance Criteria

1. WHEN Paystack redirects the Student back to the Platform after payment, THE Verify_Route SHALL verify the transaction with Paystack's API and mark the `payments` row `status = 'completed'` before redirecting the Student to `/revision-plan?payment=success&reference={reference}`
2. WHEN the Student's browser lands on `/revision-plan?payment=success&reference={reference}`, THE Platform SHALL NOT auto-trigger generation immediately; instead it SHALL poll `GET /api/paystack/verify-status?reference={reference}` at 2-second intervals
3. THE `GET /api/paystack/verify-status` endpoint SHALL query the `payments` table for the row matching `paystack_reference` and the authenticated Student's `user_id`, and return `{ status: 'completed' | 'pending' | 'failed' }`
4. WHEN the poll response indicates `status = 'completed'`, THE Platform SHALL automatically call the Generate_Route with the form data stored in component state and the confirmed Paystack_Reference
5. WHEN the poll has not received `status = 'completed'` after 10 seconds (5 poll attempts at 2-second intervals), THE Platform SHALL stop polling, display a "Verifying payment…" message, and show a manual "Generate My Plan" button that the Student can click to retry generation
6. WHEN the poll response indicates `status = 'failed'`, THE Platform SHALL stop polling immediately, display an error toast with message "Payment was not successful. Please try again.", and return the Student to form step 3
7. IF the Generate_Route receives a `paymentRef` that does not correspond to a `payments` row with `status = 'completed'` and `type = 'revision_plan'` for the authenticated Student, THEN THE Generate_Route SHALL return HTTP 402 with error `'Payment not verified'`
8. IF a `payments` row already has `status = 'completed'`, THEN THE Verify_Route and Webhook_Route SHALL skip re-processing and return success without modifying the row again
9. THE Webhook_Route SHALL mark the `payments` row `status = 'completed'` upon receiving a `charge.success` event, ensuring idempotent processing regardless of which path (redirect or webhook) completes first

---

### Requirement 6: Generation API — Input Validation

**User Story:** As a developer, I want the Generate_Route to validate all inputs strictly, so that malformed requests cannot produce corrupt plans or bypass payment.

#### Acceptance Criteria

1. THE Generate_Route SHALL require an authenticated session; WHEN no valid session exists, THE Generate_Route SHALL return HTTP 401
2. THE Generate_Route SHALL validate `examDate` as an ISO 8601 date string (`YYYY-MM-DD`) that is at least 1 day in the future; IF the date is today or in the past, THEN THE Generate_Route SHALL return HTTP 400 with error `'Exam date must be in the future'`
3. THE Generate_Route SHALL validate `studyHoursWeekday` as an integer between 1 and 8 inclusive; IF the value is outside this range, THEN THE Generate_Route SHALL return HTTP 400
4. THE Generate_Route SHALL validate `studyHoursWeekend` as an integer between 1 and 12 inclusive; IF the value is outside this range, THEN THE Generate_Route SHALL return HTTP 400
5. THE Generate_Route SHALL validate `workSchoolStatus` as one of `'working_full_time'`, `'working_part_time'`, or `'student_only'`; IF the value is not one of these, THEN THE Generate_Route SHALL return HTTP 400
6. THE Generate_Route SHALL validate `paymentRef` as a non-empty string; IF `paymentRef` is absent or empty, THEN THE Generate_Route SHALL return HTTP 400

---

### Requirement 7: Generation API — Unit Loading and Weak Area Analysis

**User Story:** As a student, I want my revision plan to reflect my actual performance data, so that weak units receive more study time.

#### Acceptance Criteria

1. WHEN the Generate_Route runs, THE Generate_Route SHALL query the `units` table for all rows where `cadre` matches the Student's cadre and `is_examinable = TRUE`
2. IF no units are found for the Student's cadre, THEN THE Generate_Route SHALL return HTTP 500 with error `'No units found for this cadre'`
3. THE Generate_Route SHALL compute each Unit's Accuracy by joining `student_answers` with `questions` on `question_id`, grouping by `questions.unit`, and calculating `(correct_count / total_count) * 100`
4. WHEN a Unit has no answer history for the Student, THE Generate_Route SHALL treat that Unit's Accuracy as `undefined` and classify it as a Weak_Unit for scheduling purposes
5. THE Generate_Route SHALL classify a Unit as a Weak_Unit WHEN its Accuracy is below 70 OR when it has no answer history
6. WHEN computing study time allocation, THE Generate_Route SHALL apply a 1.5× multiplier to the NCK_Weight of every Weak_Unit before proportional distribution
7. THE Generate_Route SHALL sort units for scheduling with Weak_Units first, then by Tier ascending (Tier 1 first), then by NCK_Weight descending

---

### Requirement 8: Generation API — Plan Correctness

**User Story:** As a student, I want my revision plan to be a valid, complete schedule that covers all my units before the exam, so that I can follow it with confidence.

#### Acceptance Criteria

1. WHEN a Revision_Plan is generated, THE Generate_Route SHALL produce at least one `DayPlan` entry for every calendar day from the UTC server date of generation (inclusive) up to but not including the exam date
2. WHEN a Revision_Plan is generated, THE Generate_Route SHALL assign `studyHoursWeekend` hours to every Saturday and Sunday, and `studyHoursWeekday` hours to every Monday through Friday
3. WHEN a Revision_Plan is generated, THE Generate_Route SHALL reserve the final 14 days (or all days if the total period is ≤ 14 days) as the mock exam and final review period
4. WHEN a Revision_Plan is generated, THE Generate_Route SHALL schedule a full mock exam task on day 1 of the mock exam period and then on every third day thereafter within that period
5. WHEN a Revision_Plan is generated, THE Generate_Route SHALL schedule a flashcard review task on alternating days starting from day 1 of the study period, applied to all non-mock-exam days including those in the mock exam period
6. WHEN a Revision_Plan is generated and the total study period is at least 7 days, every unit with `is_examinable = TRUE` for the Student's cadre SHALL appear in at least one `DayPlan.units` entry; WHEN the total study period is fewer than 7 days, THE Generate_Route SHALL prioritise Tier 1 units only
7. WHEN a Revision_Plan is generated, the sum of `hours` across all `DayPlan.units` entries across all days SHALL equal the total available study hours within a rounding tolerance of ±2 hours
8. WHEN a Revision_Plan is generated, no single unit SHALL be allocated more than 2 hours of study on any single day
9. WHEN a Revision_Plan is generated, THE Generate_Route SHALL assign a unique UUID `share_token` to that Revision_Plan

---

### Requirement 9: Generation API — Persistence

**User Story:** As a developer, I want generated plans to be stored reliably in Supabase, so that students can retrieve their plans later.

#### Acceptance Criteria

1. WHEN a Revision_Plan is successfully generated, THE Generate_Route SHALL insert a row into `revision_plans` containing: `student_id`, `cadre`, `exam_date`, `days_available`, `study_hours_weekday`, `study_hours_weekend`, `work_school_status`, `plan_html`, `plan_data` (JSONB), `payment_ref`, and `share_token`
2. THE Generate_Route SHALL use the Service_Role admin client for the `revision_plans` INSERT to bypass RLS
3. WHEN the `revision_plans` INSERT fails, THE Generate_Route SHALL return HTTP 500 with error `'Failed to save plan'` and SHALL NOT return a partial plan to the client
4. WHEN the INSERT succeeds, THE Generate_Route SHALL return `{ planId, shareToken, planHtml }` with HTTP 200

---

### Requirement 10: Generation Progress Feedback

**User Story:** As a student, I want clear visual feedback while my plan is being generated, so that I know the system is working and I do not navigate away prematurely.

#### Acceptance Criteria

1. WHEN the Generate_Route call is in-flight, THE Platform SHALL display a full-screen loading state with a descriptive message (e.g. "Analysing your weak areas and scheduling your study sessions")
2. WHEN the Generate_Route call is in-flight, THE Platform SHALL display a progress indicator that cycles through at least 3 labelled stages: "Analysing performance", "Building schedule", "Rendering plan"
3. WHEN the Generate_Route call is in-flight, THE Platform SHALL disable all form inputs and navigation buttons to prevent duplicate submissions
4. WHEN the Generate_Route returns an error, THE Platform SHALL display the error message in a toast notification and return the Student to the form step 3 (review) so they can retry without re-entering data

---

### Requirement 11: PDF Download

**User Story:** As a student, I want to download my revision plan as a PDF, so that I can study offline or print it.

#### Acceptance Criteria

1. WHEN a Student views a generated Revision_Plan, THE Platform SHALL display a "Download PDF" button
2. WHEN the Student clicks "Download PDF", THE Platform SHALL open the Plan_HTML in a new browser window and trigger the browser's print dialog targeting PDF output
3. WHEN the Plan_HTML is rendered for printing, THE Platform SHALL apply `@media print` CSS rules that: hide the share box element, set the day grid to a 3-column layout, and preserve background colours using `print-color-adjust: exact`
4. WHEN the Plan_HTML is rendered for printing, THE Platform SHALL not include any NurseFiti navigation chrome or sidebar elements

---

### Requirement 12: Public Share Link

**User Story:** As a student, I want to share my revision plan with a study partner or tutor via a public link, so that they can view it without needing a NurseFiti account.

#### Acceptance Criteria

1. WHEN a Student views a generated Revision_Plan, THE Platform SHALL display a "Copy Share Link" button
2. WHEN the Student clicks "Copy Share Link", THE Platform SHALL copy the URL `{NEXT_PUBLIC_SITE_URL}/revision-plan/share/{share_token}` to the clipboard and display a success toast
3. WHEN an unauthenticated visitor navigates to `/revision-plan/share/{share_token}`, THE Platform SHALL render the Plan_HTML for that Revision_Plan without requiring login
4. WHEN an unauthenticated visitor navigates to `/revision-plan/share/{share_token}` and no matching `share_token` exists, THE Platform SHALL return a 404 page
5. THE Platform SHALL set `robots: { index: false, follow: false }` on the share page to prevent search engine indexing of student plans
6. THE Platform SHALL display a call-to-action on the share page prompting unauthenticated visitors to sign up and create their own plan
7. WHEN the share page renders, THE Platform SHALL display the Student's cadre and exam date in the page header without revealing the Student's name or user ID to the visitor

---

### Requirement 13: Plan History

**User Story:** As a student, I want to view my previously generated plans, so that I can refer back to an older schedule if needed.

#### Acceptance Criteria

1. WHEN a Student visits the revision plan page, THE Platform SHALL query `revision_plans` for up to 5 most recent plans belonging to that Student, ordered by `generated_at` descending
2. WHEN the Student has at least one existing plan, THE Platform SHALL display a "Previous Plans" section with a button for each plan showing its generation date
3. WHEN the Student clicks a previous plan button, THE Platform SHALL display that plan's Plan_HTML in the result view without making a new API call
4. WHEN the Student is viewing a previous plan, THE Platform SHALL display the "Copy Share Link" and "Download PDF" buttons using that plan's `share_token` and `plan_html`
