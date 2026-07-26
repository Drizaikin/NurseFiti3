# Implementation Plan

- [-] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Platform Performance Degradation Under Load
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bugs exist
  - **DO NOT attempt to fix the test or the code when it fails**
  - **GOAL**: Surface counterexamples that demonstrate each performance anti-pattern
  - **Scoped PBT Approach**: Scope to concrete failing cases — a student with 500+ answers loading the dashboard, and a practice start when 1,000+ answers exist
  - Test that `get_unanswered_practice_questions` uses a correlated NOT EXISTS subquery (check via `EXPLAIN` output or pg_stat_statements)
  - Test that `student_answers` has no composite index on `(student_id, mode)` — query `pg_indexes` and assert index is absent
  - Test that dashboard data load time exceeds 1,500ms for a student with 1,000+ answers (Bug Condition: `X.dashboard_answer_fetch_limit = UNBOUNDED`)
  - Test that `BadgeProvider` fires badge evaluation on every mount, not only on answer events (Bug Condition: `X.badge_eval_triggered_by = PAGE_LOAD`)
  - Test that `ActivityTracker` calls `supabase.from('profiles').select('role')` on every route change (Bug Condition: `X.activity_tracker_profile_fetches_per_nav > 0`)
  - Test that middleware issues more than one DB query per protected-route request (Bug Condition: `X.middleware_db_queries_per_request > 1`)
  - Test that two Realtime channels are opened per authenticated user (Bug Condition: `X.open_realtime_channels_per_user > 1`)
  - Run tests on UNFIXED code — expect FAILURE (confirms bugs exist)
  - Document counterexamples found (e.g., "dashboard load = 3,200ms; NotificationsPanel opens channel before userId confirmed")
  - Mark task complete when tests are written, run, and failures are documented
  - _Requirements: 8.1, 8.2, 8.3, 7.1, 2.1, 2.2, 3.1, 3.2, 4.1, 5.1, 1.1, 1.2_


- [~] 2. Write preservation property tests (BEFORE implementing fixes)
  - **Property 2: Preservation** - Correctness of Core Platform Behaviors
  - **IMPORTANT**: Follow observation-first methodology — observe behavior on unfixed code for non-buggy inputs
  - Observe: `get_unanswered_practice_questions` returns only unanswered questions for a student with a small answer set (< 50 answers) — record returned IDs
  - Observe: badge evaluation correctly awards the "50 Questions Answered" badge when a student reaches 50 correct answers
  - Observe: middleware correctly redirects a student attempting to access `/tutor-dashboard` (RBAC enforcement)
  - Observe: `ActivityTracker` records exactly one `page_visits` row per route change with correct `user_id`, `role`, and `page_slug`
  - Observe: `NotificationsPanel` shows real-time new-notification badge on bell icon without page refresh
  - Observe: mock exam delivers NCK-style unit-interleaved question ordering and correct `totalQuestions` count
  - Write property-based test: for all students with non-empty answer history, practice returns only unseen questions (from Preservation Requirement 3.3)
  - Write property-based test: for all badge types, the same badge is never awarded twice to the same student (from Preservation Requirement 3.2)
  - Write property-based test: for all role values (student, tutor, admin), middleware enforces correct routing (from Preservation Requirement 3.5)
  - Verify all preservation tests PASS on UNFIXED code
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12_


- [ ] 3. Fix 1 — Add composite indexes migration

  - [~] 3.1 Create migration file `supabase/migrations/20260728000001_add_performance_indexes.sql`
    - Create `idx_student_answers_student_mode` on `student_answers (student_id, mode)`
    - Create `idx_student_answers_student_mode_paper` on `student_answers (student_id, mode, paper)`
    - Create `idx_student_answers_qid_student_mode` on `student_answers (question_id, student_id, mode)`
    - Create `idx_questions_cadre_paper_status` on `questions (cadre, paper, status)`
    - Create `idx_questions_cadre_status` on `questions (cadre, status)`
    - Create `idx_page_visits_user_id` on `page_visits (user_id)`
    - Create `idx_user_logins_user_id` on `user_logins (user_id)`
    - Use `CREATE INDEX CONCURRENTLY IF NOT EXISTS` for all indexes (zero-downtime, idempotent)
    - _Bug_Condition: `X.composite_index_student_answers_mode_paper = FALSE` OR `X.composite_index_questions_cadre_paper_status = FALSE`_
    - _Expected_Behavior: Index scans replace full table scans on `student_answers` and `questions`_
    - _Preservation: All existing INSERT/UPDATE/SELECT/DELETE on indexed tables continue to work — indexes are transparent to query semantics_
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 3.7_

  - [~] 3.2 Apply the migration to the local Supabase instance and verify
    - Run `supabase db push` or `supabase migration up` against the local dev database
    - Confirm all 7 indexes appear in `pg_indexes` for the correct tables
    - Run `EXPLAIN (ANALYZE, BUFFERS)` on a representative `student_answers` query filtered by `(student_id, mode, paper)` and confirm index scan is used
    - Confirm no existing queries are broken after index addition


- [ ] 4. Fix 2 — Replace NOT EXISTS correlated subquery with LEFT JOIN anti-join

  - [~] 4.1 Create migration file `supabase/migrations/20260728000002_fix_practice_antijoin.sql`
    - Write `CREATE OR REPLACE FUNCTION get_unanswered_practice_questions(p_student_id UUID, p_cadre TEXT, p_unit TEXT DEFAULT 'all', p_limit INT DEFAULT 40)` using the LEFT JOIN anti-join pattern
    - The WHERE clause must use `sa.id IS NULL` (not `NOT EXISTS`) to allow hash-join or merge-join execution plans
    - Mark function `STABLE` to allow Postgres to cache the query plan within a transaction
    - Use `SECURITY DEFINER`
    - Preserve the `p_unit = 'all'` fallback (no unit filter when 'all') and the `p_limit` parameter
    - _Bug_Condition: `X.practice_rpc_uses_correlated_subquery = TRUE`_
    - _Expected_Behavior: Practice start completes in under 800ms P95; query plan shows hash-join or merge-join instead of nested loop_
    - _Preservation: Returns only questions the student has not previously answered in practice mode; falls back to full question bank when all have been seen (Preservation Requirement 3.3)_
    - _Requirements: 8.1, 8.2, 8.3, 3.3_

  - [~] 4.2 Verify the rewritten RPC
    - Apply migration to local DB
    - Run `EXPLAIN ANALYZE` on `get_unanswered_practice_questions` for a student with 1,000+ practice answers and confirm no "Nested Loop" with sub-plan referencing `student_answers`
    - Assert results contain only IDs not present in `student_answers` for that student in practice mode (Preservation Requirement 3.3)
    - Test fallback: when all questions have been answered, the function still returns `p_limit` questions from the full bank


- [ ] 5. Fix 3a — Dashboard stats RPC migration

  - [~] 5.1 Create migration file `supabase/migrations/20260728000003_dashboard_stats_rpc.sql`
    - Write `CREATE OR REPLACE FUNCTION get_student_dashboard_stats(p_student_id UUID) RETURNS JSON`
    - Use `SECURITY DEFINER`, `LANGUAGE sql`, `STABLE`
    - Return a single `json_build_object` with keys: `total_answered`, `correct_answers`, `study_time_min`, `has_early_bird`, `has_night_owl`, `weekend_count`
    - `has_early_bird`: `BOOL_OR(EXTRACT(HOUR FROM answered_at AT TIME ZONE 'Africa/Nairobi') < 8)`
    - `has_night_owl`: `BOOL_OR(EXTRACT(HOUR FROM answered_at AT TIME ZONE 'Africa/Nairobi') >= 22)`
    - `weekend_count`: `SUM(CASE WHEN EXTRACT(DOW FROM answered_at) IN (0,6) THEN 1 ELSE 0 END)`
    - `study_time_min`: `COALESCE(SUM(time_taken_seconds), 0) / 60`
    - _Bug_Condition: `X.dashboard_answer_fetch_limit = UNBOUNDED`_
    - _Expected_Behavior: Dashboard data load completes in under 300ms P95; transferred payload is O(1) regardless of answer count_
    - _Preservation: `total_answered`, `correct_answers`, `study_time_min` values match what the current full-row calculation produces (Preservation Requirement 3.1)_
    - _Requirements: 3.1, 3.2, 2.3, 2.4_

  - [~] 5.2 Verify the RPC
    - Apply migration and call `get_student_dashboard_stats` for a seeded student
    - Cross-check `total_answered` against direct `SELECT COUNT(*)` on `student_answers` for the same student
    - Cross-check `correct_answers` against direct `SELECT COUNT(*) WHERE is_correct`
    - Confirm single-row JSON response (payload size does not grow with answer count)


- [ ] 6. Fix 3b — Dashboard page code changes (`app/(student)/dashboard/page.tsx`)

  - [~] 6.1 Read the current `app/(student)/dashboard/page.tsx` before making changes
    - Identify the `Promise.all` block inside `fetchDashboardData` (or equivalent data-fetching function)
    - Locate the `supabase.from('student_answers').select('is_correct, time_taken_seconds, answered_at')` call
    - Locate the `supabase.from('mock_exam_results').select('id')` and `supabase.from('flashcard_progress').select('id')` calls
    - Locate the `computeBadges()` call and its definition

  - [~] 6.2 Replace unbounded answer fetch with the aggregation RPC
    - Remove `supabase.from('student_answers').select('is_correct, time_taken_seconds, answered_at').eq('student_id', user.id)`
    - Add `supabase.rpc('get_student_dashboard_stats', { p_student_id: user.id })` in its place within the `Promise.all`
    - Update stat computation: read `total_answered`, `correct_answers`, `study_time_min` from `statsRes.data` instead of iterating an array
    - Derive `accuracy` as `totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0`
    - _Requirements: 3.1, 3.2_

  - [~] 6.3 Replace count fetches with HEAD queries
    - Replace `supabase.from('mock_exam_results').select('id').eq('student_id', user.id)` with `supabase.from('mock_exam_results').select('*', { count: 'exact', head: true }).eq('student_id', user.id)`
    - Replace `supabase.from('flashcard_progress').select('id').eq('student_id', user.id)` with `supabase.from('flashcard_progress').select('*', { count: 'exact', head: true }).eq('student_id', user.id)`
    - Update downstream code to read `.count` instead of `.data.length`
    - _Requirements: 2.1, 2.4_

  - [~] 6.4 Remove `computeBadges()` from dashboard
    - Delete the `computeBadges()` function definition (or import) from `dashboard/page.tsx`
    - Remove the call to `computeBadges()` — badge display now reads from `student_badges` table directly (populated by event-driven Fix 4)
    - Ensure badge section UI still renders correctly using `student_badges` data
    - _Requirements: 2.3, 4.1_

  - [~] 6.5 Add `export const dynamic = 'force-dynamic'` to dashboard page
    - Add `export const dynamic = 'force-dynamic';` as the first export after imports in `app/(student)/dashboard/page.tsx`
    - This is a prerequisite for Fix 12 (removing it from the layout) — the dashboard is genuinely dynamic
    - _Requirements: 11.1, 11.2_

  - [~] 6.6 Verify dashboard page changes
    - Confirm TypeScript compiles with no errors (`npx tsc --noEmit`)
    - Load dashboard locally and confirm all stat tiles display correct values
    - Open browser Network tab and confirm no `student_answers` rows query with large payload is fired from dashboard


- [ ] 7. Fix 4a — Badge aggregation RPCs migration

  - [~] 7.1 Create migration file `supabase/migrations/20260728000004_badge_aggregation_rpcs.sql`
    - Write `CREATE OR REPLACE FUNCTION get_answer_counts_by_unit(p_student_id UUID) RETURNS TABLE (unit TEXT, cnt BIGINT)` using `JOIN questions ON q.id = sa.question_id` with `GROUP BY q.unit`; mark `SECURITY DEFINER`, `STABLE`
    - Write `CREATE OR REPLACE FUNCTION get_answer_stats_for_badges(p_student_id UUID) RETURNS JSON` returning `json_build_object` with keys `total`, `has_early_bird`, `has_night_owl`, `weekend_count`; use same timezone and DOW logic as dashboard RPC; mark `SECURITY DEFINER`, `STABLE`
    - Write `CREATE OR REPLACE FUNCTION get_student_rank(p_student_id UUID) RETURNS BIGINT` returning `COUNT(*) + 1` from `student_profiles WHERE xp > (SELECT xp FROM student_profiles WHERE id = p_student_id)`; mark `SECURITY DEFINER`, `STABLE`
    - _Bug_Condition: `X.badge_eval_triggered_by = PAGE_LOAD`_
    - _Expected_Behavior: Badge evaluation completes within 500ms P95; payload is O(1) per RPC call_
    - _Preservation: Badge awards remain correct for all badge types; no duplicate awards (Preservation Requirement 3.2)_
    - _Requirements: 4.1, 4.2, 4.3, 3.2_

  - [~] 7.2 Apply migration and verify RPCs
    - Apply migration to local DB
    - Call `get_answer_counts_by_unit` for a seeded student and cross-check unit totals against direct `SELECT q.unit, COUNT(*) FROM student_answers sa JOIN questions q ON q.id = sa.question_id WHERE sa.student_id = $1 GROUP BY q.unit`
    - Call `get_student_rank` and confirm it returns `COUNT(*) + 1` for students ranked below, equal to, and above a reference student


- [ ] 8. Fix 4b+c — `lib/badges.ts` and `components/student/BadgeProvider.tsx` refactor

  - [~] 8.1 Read `lib/badges.ts` before making changes
    - Identify the `supabase.from('student_answers').select('answered_at, questions!inner(unit)')` call
    - Identify the `supabase.from('student_profiles').select('*', { count: 'exact', head: true }).gt('xp', sp.xp)` call for rank computation
    - Map how `answers` array is iterated to compute `totalAnswers`, `pharmaCount`, `medSurgCount`, `anatomyCount`, `obgynCount`, `hasEarlyBird`, `hasNightOwl`, `weekendCount`

  - [~] 8.2 Replace raw answer fetch with parallel RPCs in `lib/badges.ts`
    - Replace the `student_answers` full-row fetch with `Promise.all([supabase.rpc('get_answer_stats_for_badges', ...), supabase.rpc('get_answer_counts_by_unit', ...)])`
    - Build `unitMap` as `Object.fromEntries(unitRows.map(r => [r.unit, Number(r.cnt)]))`
    - Derive `pharmaCount`, `medSurgCount`, `anatomyCount`, `obgynCount` by filtering `unitMap` keys (preserve existing unit-name matching logic)
    - Derive `totalAnswers`, `hasEarlyBird`, `hasNightOwl`, `weekendCount` from `stats` object
    - Replace rank count-scan with `supabase.rpc('get_student_rank', { p_student_id: userId })`
    - _Bug_Condition: Full table scan of `student_answers` with JOIN on every badge evaluation_
    - _Expected_Behavior: Two lightweight parallel RPC calls replace one large row-fetching query_
    - _Preservation: All badge types still computed correctly; no double-awards (Preservation Requirement 3.2)_
    - _Requirements: 4.2, 4.3, 3.1, 3.2_

  - [~] 8.3 Read `components/student/BadgeProvider.tsx` before making changes
    - Identify the `useEffect` that calls `evaluateUserBadges()` immediately on mount
    - Identify whether `checkBadges` is exposed via context for event-driven calls

  - [~] 8.4 Defer badge evaluation in `BadgeProvider.tsx`
    - Replace immediate `evaluateUserBadges()` call with a `setTimeout(..., 5000)` deferred call inside `useEffect`
    - Clear the timeout in the `useEffect` cleanup to prevent stale calls after unmount
    - Ensure `checkBadges` is still exposed via context so call sites (answer submission, exam completion) can trigger it explicitly
    - _Requirements: 4.1, 3.2_

  - [~] 8.5 Verify badge refactor
    - Compile TypeScript with no errors
    - Submit a test answer and confirm `checkBadges` fires once and new badge is awarded correctly
    - Navigate between pages and confirm `evaluateUserBadges` does NOT fire on each route change (add console.log temporarily if needed)


- [ ] 9. Fix 5 — ActivityTracker identity cache (`components/student/ActivityTracker.tsx`)

  - [~] 9.1 Read `components/student/ActivityTracker.tsx` before making changes
    - Identify the two `useEffect` hooks (login-recording and page-visit-recording)
    - Confirm both currently call `supabase.auth.getUser()` and `supabase.from('profiles').select('role')`
    - Note the `pathname` dependency used for page visit tracking

  - [~] 9.2 Implement identity cache using `useRef`
    - Add `const identityRef = useRef<{ userId: string; role: string } | null>(null);`
    - Rewrite the first `useEffect` (empty deps array `[]`) to fetch identity once, store in `identityRef.current`, then call `recordLogin`
    - Add a cancellation flag (`let cancelled = false`) to prevent state updates after unmount
    - Rewrite the second `useEffect` (deps: `[pathname]`) to read from `identityRef.current` only — no `supabase.auth.getUser()` or `profiles` query
    - Guard the route-change effect: `if (!identity) return;` before calling `recordPageVisit`
    - _Bug_Condition: `X.activity_tracker_profile_fetches_per_nav > 0`_
    - _Expected_Behavior: Each route change incurs at most one lightweight INSERT; zero auth or profile DB queries_
    - _Preservation: One login event per browser session; one `page_visits` row per route change with correct `user_id`, `role`, `page_slug` (Preservation Requirement 3.8)_
    - _Requirements: 5.1, 4.1, 4.2, 3.8_

  - [~] 9.3 Verify ActivityTracker changes
    - Compile TypeScript with no errors
    - Navigate between three pages in the student area and confirm Network tab shows no `profiles?select=role` request on second and third navigation
    - Check `page_visits` table in local DB and confirm one row per navigation with correct values


- [ ] 10. Fix 6a — Middleware JWT role claim hook migration

  - [~] 10.1 Create migration file `supabase/migrations/20260728000005_auth_role_claim_hook.sql`
    - Write `CREATE OR REPLACE FUNCTION add_role_claim_to_jwt(event JSONB) RETURNS JSONB`
    - Fetch `role` from `profiles` table using `(event->>'user_id')::UUID`
    - Return `jsonb_set(event, '{claims,app_role}', to_jsonb(COALESCE(user_role, 'student')))`
    - Use `LANGUAGE plpgsql SECURITY DEFINER`
    - _Bug_Condition: `X.middleware_db_queries_per_request > 1`_
    - _Expected_Behavior: Role is embedded in JWT; middleware reads it with zero DB queries_
    - _Preservation: Role-based access control enforced correctly; students redirected away from tutor routes; unverified tutors redirected to pending pages (Preservation Requirement 3.5)_
    - _Requirements: 2.1, 2.2, 1.1, 1.2, 1.3, 3.5_

  - [~] 10.2 Register the hook in Supabase
    - Apply the migration to local Supabase instance
    - Navigate to the Supabase Dashboard → **Authentication → Hooks → Custom Access Token**
    - Register `add_role_claim_to_jwt` as the custom access token hook
    - Note: this step requires manual dashboard action — document the step in a comment in the migration file
    - Sign out and sign back in to get a fresh JWT with `app_role` in the claims
    - Inspect the decoded JWT and confirm `app_metadata.app_role` or `user_metadata.role` contains the correct role value


- [ ] 11. Fix 6b — Middleware role read from JWT (`middleware.ts`)

  - [~] 11.1 Read `middleware.ts` before making changes
    - Identify all locations where `supabase.from('profiles').select('role')` is called
    - Identify all locations where `supabase.from('tutor_profiles')` is called (this one may remain for verified tutor check)
    - Map the role branching logic (student routes, tutor routes, admin routes)

  - [~] 11.2 Replace DB role fetch with JWT claim read
    - After `const { data: { session } } = await supabase.auth.getSession();`, read role as:
      `const role = (session?.user?.app_metadata?.app_role as string | undefined) ?? (session?.user?.user_metadata?.role as string | undefined) ?? 'student';`
    - Remove the `supabase.from('profiles').select('role').eq('id', session.user.id).single()` call
    - Preserve the `supabase.from('tutor_profiles')` query for the tutor-verification check (it only runs for tutor routes)
    - _Bug_Condition: `X.middleware_db_queries_per_request > 1`_
    - _Expected_Behavior: Middleware latency under 50ms P95 for warm serverless functions_
    - _Preservation: Students redirected from tutor routes; tutors redirected from student routes; unverified tutors redirected to pending pages (Preservation Requirement 3.5)_
    - _Requirements: 2.1, 2.2, 1.1, 1.2, 1.3, 3.5_

  - [~] 11.3 Verify middleware changes
    - Compile TypeScript with no errors
    - Sign in as a student and attempt to access `/tutor-dashboard` — confirm redirect to student area
    - Sign in as a tutor and attempt to access `/dashboard` — confirm redirect to tutor area
    - Sign in as an admin and confirm `/admin` routes are accessible
    - Open browser Network tab and confirm no `profiles?select=role` request fires during any page navigation


- [ ] 12. Fix 7a — Mock exam seen-question RPC migration

  - [~] 12.1 Create migration file `supabase/migrations/20260728000006_mock_exam_rpc.sql`
    - Write `CREATE OR REPLACE FUNCTION get_mock_exam_question_ids(p_student_id UUID, p_cadre TEXT, p_paper TEXT, p_total INT DEFAULT 100) RETURNS TABLE (id UUID, unit TEXT)`
    - Use `LANGUAGE plpgsql SECURITY DEFINER`
    - Count unseen questions using `LEFT JOIN student_answers sa ON sa.question_id = q.id AND sa.student_id = p_student_id AND sa.mode = 'mock_exam'` with `sa.id IS NULL`
    - If `unseen_count < p_total` (cycle complete): return from full question bank via `ORDER BY random() LIMIT p_total`
    - Otherwise: return from unseen set only via LEFT JOIN + `sa.id IS NULL` filter + `ORDER BY random() LIMIT p_total`
    - _Bug_Condition: `X.mock_start_answer_fetch_limit = UNBOUNDED`_
    - _Expected_Behavior: Single RPC call; all seen-question logic runs server-side; only final IDs+units transferred to browser_
    - _Preservation: NCK-style unit-interleaved ordering preserved client-side; unseen-first then cycle-reset behavior preserved; correct `totalQuestions` count enforced (Preservation Requirement 3.6)_
    - _Requirements: 7.1, 6.1, 6.2, 3.6_

  - [~] 12.2 Verify the RPC
    - Apply migration to local DB
    - Call `get_mock_exam_question_ids` for a student with no mock exam answers — confirm returns `p_total` rows
    - Call for a student who has answered all questions — confirm cycle resets (returns full bank subset)
    - Confirm returned `id` values do not include any previously seen question IDs when unseen set is non-empty


- [ ] 13. Fix 7b+c — Mock exam page refactor (`app/(student)/mock-exam/page.tsx`)

  - [~] 13.1 Read `app/(student)/mock-exam/page.tsx` before making changes
    - Identify the `startExam` function and its two sequential large fetches (`student_answers` + `questions`)
    - Identify the `fetchProgress` function and its sequential for-loop over `examsToFetch`
    - Note the unit-interleaving logic that runs in the browser after fetching question metadata

  - [~] 13.2 Refactor `startExam` to use the new RPC
    - Remove `supabase.from('student_answers').select('question_id').eq('student_id', userId).eq('mode','mock_exam').eq('paper', config.paper)`
    - Remove `supabase.from('questions').select('id, unit').eq('cadre', config.cadre).eq('paper', config.paper).eq('status','approved')`
    - Replace with `const { data: questionMeta, error } = await supabase.rpc('get_mock_exam_question_ids', { p_student_id: userId, p_cadre: config.cadre, p_paper: config.paper, p_total: config.totalQuestions })`
    - Preserve the existing unit-interleaving/round-robin sort logic — it now operates on the RPC-returned `questionMeta` (IDs + units) rather than the full unfiltered question list
    - _Bug_Condition: `X.mock_start_answer_fetch_limit = UNBOUNDED` — two large sequential fetches_
    - _Expected_Behavior: Mock exam start under 2,000ms P95; only final question IDs transferred to browser_
    - _Preservation: NCK unit-interleaved ordering; unseen-first; correct question count (Preservation Requirement 3.6)_
    - _Requirements: 7.1, 7.2, 6.1, 6.2, 3.6_

  - [~] 13.3 Parallelise `fetchProgress` loop
    - Replace the sequential `for...of` loop over `examsToFetch` with `Promise.all(examsToFetch.map(async ([key, config]) => { ... }))`
    - Inside the map callback, run the COUNT query and the seen-count query in a nested `Promise.all`
    - Use `select('*', { count: 'exact', head: true })` for both (zero row transfer, just counts)
    - _Bug_Condition: `6.3` — sequential for-loop fires up to 4 queries serially_
    - _Expected_Behavior: All exam progress queries execute in parallel_
    - _Requirements: 7.2, 6.3_

  - [~] 13.4 Add `export const dynamic = 'force-dynamic'` to mock-exam page
    - Add as first export after imports (prerequisite for Fix 12 removing it from the layout)
    - _Requirements: 11.1_

  - [~] 13.5 Verify mock-exam page changes
    - Compile TypeScript with no errors
    - Load mock exam setup page locally and confirm progress bars show correct values
    - Start a mock exam and confirm all questions load; verify unit interleaving is intact


- [ ] 14. Fix 8 — NotificationsPanel Realtime channel guards (`components/shared/NotificationsPanel.tsx`)

  - [~] 14.1 Read `components/shared/NotificationsPanel.tsx` before making changes
    - Identify the `useUnreadCount` hook and its Realtime channel subscription `useEffect`
    - Identify the panel-level Realtime channel subscription and its `useEffect` dependencies
    - Confirm whether `isOpen` prop or state variable controls panel visibility

  - [~] 14.2 Add `userId` guard to `useUnreadCount` subscription
    - In the `useEffect` that opens the `unread-count-{userId}` channel, add `if (!userId) return;` as the first statement
    - Ensure the cleanup function (`supabase.removeChannel(channel)`) is called in the return
    - Keep `userId` in the dependency array so the subscription re-establishes if userId changes
    - _Bug_Condition: `X.open_realtime_channels_per_user > 1` — channel opened before userId is confirmed_
    - _Expected_Behavior: No Realtime channel opened until userId is confirmed non-empty_
    - _Preservation: Real-time new-notification badge continues to appear without page refresh (Preservation Requirement 3.4)_
    - _Requirements: 6.1, 5.1, 3.4_

  - [~] 14.3 Add `isOpen` guard to panel-level Realtime channel
    - In the `useEffect` that opens the `notifications-panel-{userId}` channel, add `if (!isOpen || !userId) return;` as the first statement
    - Ensure cleanup closes the channel when `isOpen` becomes false
    - This ensures at most one channel (the unread count channel) is open per user when the panel is closed
    - _Bug_Condition: `X.open_realtime_channels_per_user > 1` — panel channel stays open even when panel is closed_
    - _Expected_Behavior: Panel channel opens only when panel opens; closes when panel closes; at most 1 channel per user_
    - _Requirements: 6.2, 6.3, 5.2, 5.3_

  - [~] 14.4 Verify Realtime channel fixes
    - Load a student page and open browser DevTools → Network → WS tab
    - Confirm only one channel (`unread-count-{userId}`) is visible before the panel is opened
    - Open the notifications panel and confirm a second channel (`notifications-panel-{userId}`) appears
    - Close the panel and confirm the panel channel is removed (check for `unsubscribe` message in WS frames)
    - Reload page and confirm no channel is opened until auth completes (userId is confirmed)


- [ ] 15. Fix 9 — Admin client singleton (`lib/supabase/admin.ts`)

  - [~] 15.1 Read `lib/supabase/admin.ts` before making changes
    - Identify the `createAdminClient()` factory function and how it initialises the Supabase client
    - Note the `autoRefreshToken: false` and `persistSession: false` options (preserve these)

  - [~] 15.2 Convert to lazily-initialized module-level singleton
    - Add `let _adminClient: SupabaseClient<Database> | null = null;` at module scope
    - Write `export function getAdminClient(): SupabaseClient<Database>` that checks `if (_adminClient) return _adminClient;` before creating
    - Move client creation logic inside `getAdminClient`, storing result in `_adminClient` before returning
    - Add `export const createAdminClient = getAdminClient;` as a backward-compatible alias so no call sites need to change
    - _Expected_Behavior: Client created at most once per Vercel function warm instance; connection reused across invocations_
    - _Preservation: Service-role key RLS bypass continues to work; no user data becomes inaccessible (Preservation Requirement 3.11)_
    - _Requirements: 9.1, 3.11_

  - [~] 15.3 Verify admin client singleton
    - Compile TypeScript with no errors
    - Confirm all API routes that call `createAdminClient()` still compile and resolve correctly (no import errors)
    - Call two API routes in rapid succession and confirm no Supabase authentication errors


- [ ] 16. Fix 10 — WhatsNewModal + WhatsNewTrigger animation fixes

  - [~] 16.1 Read `components/student/WhatsNewModal.tsx` and `components/student/WhatsNewTrigger.tsx` before making changes
    - Identify the `useState` or `useEffect` that checks localStorage for the dismissal flag
    - Identify all `motion.*` elements with `repeat: Infinity` in their `transition` props
    - Note the `STORAGE_KEY` constant used for localStorage persistence

  - [~] 16.2 Add early null return in `WhatsNewModal` for already-dismissed users
    - Add `const [alreadySeen] = useState<boolean>(() => { try { return !forceOpen && !!localStorage.getItem(STORAGE_KEY); } catch { return false; } });`
    - Add `if (!forceOpen && alreadySeen) return null;` immediately after the state declaration, before any animated elements
    - This prevents Framer Motion from initialising for users who have dismissed the modal
    - _Expected_Behavior: Framer Motion animation loop does not run for users who dismissed the modal_
    - _Preservation: Modal displays correctly for new users; re-openable via WhatsNewTrigger; dismissal persisted in localStorage (Preservation Requirement 3.9)_
    - _Requirements: 10.1, 10.2, 3.9_

  - [~] 16.3 Replace `repeat: Infinity` with finite repeat counts
    - In `WhatsNewModal`: change sparkle animation to `transition={{ repeat: 3, repeatDelay: 3, duration: 0.6 }}`
    - In `WhatsNewTrigger`: change sparkle animation to `transition={{ repeat: 3, repeatDelay: 2, duration: 0.5 }}`
    - In CTA arrow animation (if present): change to `transition={{ repeat: 3, repeatDelay: 1.5, duration: 0.5 }}`
    - Search for any other `repeat: Infinity` in these two files and apply the same finite-repeat pattern
    - _Requirements: 10.2, 3.9_

  - [~] 16.4 Verify WhatsNew animation changes
    - Compile TypeScript with no errors
    - Set the `STORAGE_KEY` flag in localStorage manually and reload a student page — confirm no Framer Motion animation runs and component returns null
    - Clear localStorage, reload, and confirm modal appears with animations that stop after a few cycles
    - Click the WhatsNewTrigger and confirm modal re-opens (Preservation Requirement 3.9)


- [ ] 17. Fix 11 — API cache headers

  - [~] 17.1 Identify API route files that serve infrequently-changing data
    - Search for API routes returning `platform_settings` (e.g. `app/api/settings/route.ts` or similar)
    - Search for API routes returning public or semi-public lists (e.g. active units, cadre lists)
    - Note which routes return user-specific data (must use `private` cache-control) vs. public data (`public`)

  - [~] 17.2 Add `Cache-Control` headers to `platform_settings` and public endpoints
    - For public/shared data routes: add header `'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'` to the `NextResponse.json(data, { headers: {...} })` call
    - For student-specific data endpoints: add `'Cache-Control': 'private, max-age=30, stale-while-revalidate=60'`
    - Do not add cache headers to endpoints serving sensitive write operations (mutations)
    - _Expected_Behavior: CDN/edge cache reduces origin hits for platform_settings by ~50%_
    - _Preservation: In-memory 1-minute TTL cache and cache invalidation behavior for platform_settings unchanged (Preservation Requirement 3.10)_
    - _Requirements: 11.2, 3.10_

  - [~] 17.3 Verify cache headers
    - Compile TypeScript with no errors
    - Use `curl -I` or browser DevTools → Network tab to confirm `Cache-Control` header is present in API responses
    - Confirm student-specific endpoints use `private` (not `public`) cache-control


- [ ] 18. Fix 12 — Remove `force-dynamic` from student layout (`app/(student)/layout.tsx`)

  - [~] 18.1 Confirm individual pages have `export const dynamic = 'force-dynamic'` (dependency check)
    - Verify tasks 6.5, 13.4, and any other genuinely dynamic pages have already added the directive
    - Also add `export const dynamic = 'force-dynamic'` to `app/(student)/practice/page.tsx`, `app/(student)/analytics/page.tsx`, and any other student pages that perform authenticated data fetching
    - Read each page file to confirm before adding

  - [~] 18.2 Remove `force-dynamic` from the student layout
    - Read `app/(student)/layout.tsx`
    - Remove the line `export const dynamic = 'force-dynamic';` (or equivalent)
    - Do not change any other part of the layout
    - _Expected_Behavior: Layout shell can be statically rendered or cached; dynamic rendering only applies to pages that need it; TTFB improves by ~200ms for cold starts_
    - _Preservation: Individual dynamic pages still render correctly; no user-specific content is incorrectly cached at layout level (Preservation Requirement — Fix 12 design note)_
    - _Requirements: 11.1, 11.2_

  - [~] 18.3 Verify force-dynamic removal
    - Run `next build` (or `npx next build`) to confirm no static generation errors
    - Confirm the build output shows individual dynamic pages marked `ƒ` (dynamic) while the layout is no longer marked
    - Load a student page in the browser and confirm the layout shell renders and authenticated content hydrates correctly


- [ ] 19. Fix implementation — verify bug condition exploration test now passes
  - [~] 19.1 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Platform Performance Meets Targets
    - **IMPORTANT**: Re-run the SAME tests from task 1 — do NOT write new tests
    - Re-run: confirm `get_unanswered_practice_questions` no longer uses a correlated NOT EXISTS subquery (EXPLAIN shows hash-join or merge-join)
    - Re-run: confirm composite indexes exist on `student_answers` and `questions` via `pg_indexes`
    - Re-run: confirm dashboard data load completes in under 1,500ms P95 (measure with browser DevTools or Lighthouse)
    - Re-run: confirm `BadgeProvider` does NOT call `evaluateUserBadges` on every page navigation
    - Re-run: confirm `ActivityTracker` issues zero `profiles?select=role` DB queries on route changes
    - Re-run: confirm middleware issues only one DB query (or zero, via JWT) per protected route request
    - Re-run: confirm at most one Realtime channel is open per authenticated user when the panel is closed
    - **EXPECTED OUTCOME**: All exploration tests PASS (confirms all bugs are fixed)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 8.1, 2.1, 4.1, 5.1, 2.1, 6.1_

  - [~] 19.2 Verify preservation tests still pass
    - **Property 2: Preservation** - Core Platform Correctness After All Fixes
    - **IMPORTANT**: Re-run the SAME tests from task 2 — do NOT write new tests
    - Confirm practice returns only unseen questions (deduplication correct — Preservation Requirement 3.3)
    - Confirm no badge is awarded twice (idempotency correct — Preservation Requirement 3.2)
    - Confirm middleware correctly enforces RBAC for student, tutor, and admin roles (Preservation Requirement 3.5)
    - Confirm `ActivityTracker` records exactly one login event per session and one page_visit per route change (Preservation Requirement 3.8)
    - Confirm NotificationsPanel shows real-time badges without page refresh (Preservation Requirement 3.4)
    - Confirm mock exam delivers NCK unit-interleaved questions in correct count (Preservation Requirement 3.6)
    - **EXPECTED OUTCOME**: All preservation tests PASS (confirms no regressions)

- [~] 20. Checkpoint — Ensure all tests pass
  - Run `npx tsc --noEmit` and confirm zero TypeScript errors across the entire project
  - Run any existing test suite (`npm test -- --run` or equivalent) and confirm all tests pass
  - Perform a full `next build` and confirm no build errors
  - Manually smoke-test the critical flows: login → dashboard → start practice → answer question → check badge → start mock exam → open notifications panel
  - Confirm all 6 migration files exist in `supabase/migrations/` with correct timestamps and apply cleanly
  - Confirm Supabase Dashboard shows the custom access token hook registered for `add_role_claim_to_jwt`
  - Ask the user if any questions arise before marking complete
