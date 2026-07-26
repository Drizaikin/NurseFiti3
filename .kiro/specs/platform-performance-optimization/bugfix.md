# Bugfix Requirements Document

## Introduction

The NurseFiti platform (Next.js 14 / TypeScript / Supabase / Tailwind, deployed on Vercel) is experiencing progressive and widespread performance degradation as the user base grows. Students report sluggish page loads, slow question transitions during practice sessions, and the platform feeling unresponsive under concurrent usage. The root cause is not a single bug but a cluster of compounding performance anti-patterns spread across the database layer, middleware, client-side data fetching, real-time subscriptions, badge evaluation, and activity tracking. This document captures every identified bottleneck, its evidence in the codebase, and the correctness criteria for a successful fix.

---

## Bug Analysis

### Current Behavior (Defect)

**Section 1 — Middleware: Double Supabase client + double DB round-trip on every protected request**

1.1 WHEN any authenticated user visits a protected route (e.g. `/dashboard`, `/practice`, `/mock-exam`, `/tutor-dashboard`) THEN the middleware creates a fresh `createServerClient` instance, calls `supabase.auth.getSession()`, and then issues a second `supabase.from('profiles').select('role').eq('id', ...).single()` query, adding ~100–200ms of cold-start latency to every single page navigation before the route handler even starts.

1.2 WHEN an authenticated tutor visits any tutor route THEN the middleware performs three sequential Supabase queries (session, profiles, tutor_profiles), blocking the entire request behind ~200–400ms of serial round-trips.

1.3 WHEN the middleware runs on admin routes THEN it also performs two sequential Supabase queries (session + profile role check) with no caching, even for requests that arrive within milliseconds of each other from the same user.

**Section 2 — Dashboard page: Massive parallel waterfall with unbounded student_answers fetch**

2.1 WHEN a student opens `/dashboard` THEN the page fires nine concurrent Supabase queries on the client side (profiles, student_profiles, student_answers, mock_exam_results, flashcard_progress, sessions, scholarship_beneficiaries, platform_settings, RPC has_unread_community_messages), all triggered inside a `useEffect` with no server-side data fetching, causing a full client-side waterfall that blocks the initial render behind the slowest query.

2.2 WHEN a student has a large answer history THEN `supabase.from('student_answers').select('is_correct, time_taken_seconds, answered_at').eq('student_id', user.id)` fetches ALL rows with no LIMIT, transferring tens of thousands of rows over the network to the browser just to count totals and compute badge eligibility in JavaScript.

2.3 WHEN the dashboard page runs `computeBadges()` THEN it iterates over the entire unbounded answer array in the browser to compute badge eligibility (weekend answers, early-bird answers, night-owl answers) rather than delegating the aggregation to PostgreSQL.

2.4 WHEN a student has answered 1,000+ questions THEN the nine-query `Promise.all` on the dashboard can take 2–5 seconds to resolve because `student_answers` transfers the largest payload with no server-side aggregation, blocking the display of all other dashboard stats.

**Section 3 — Badge evaluation: Full table scan of student_answers with a JOIN on every mount**

3.1 WHEN the `BadgeProvider` mounts inside the student layout THEN `evaluateUserBadges()` immediately fires up to 8 separate Supabase queries (student_profiles, student_badges, student_profiles ranking count, student_answers with `questions!inner(unit)` join, mock_exam_results, flashcard_progress, community_messages, study_groups) on every single page load, even when no new answers have been submitted.

3.2 WHEN a student has answered 500+ questions THEN `supabase.from('student_answers').select('answered_at, questions!inner(unit)').eq('student_id', userId)` fetches every answer row with a joined question record and transfers the entire dataset to the browser to count unit-specific totals in a JavaScript `for` loop — a full table scan that grows linearly with answer count.

3.3 WHEN the badge system fetches the student's XP ranking THEN it runs `supabase.from('student_profiles').select('*', { count: 'exact', head: true }).gt('xp', sp.xp)` — a full count scan of the student_profiles table on every single layout mount, regardless of whether the student's XP has changed since the last check.

**Section 4 — ActivityTracker: Double profile fetch on every route change**

4.1 WHEN a student navigates between pages THEN `ActivityTracker` fires two independent `supabase.auth.getUser()` + `supabase.from('profiles').select('role')` call pairs (one in the login-recording `useEffect` and one in the page-visit `useEffect`), inserting a `page_visits` row and re-fetching the profile role on every route change even though the user's role cannot change during a session.

4.2 WHEN the student layout first mounts THEN the Topbar, ActivityTracker, and BadgeProvider each independently call `supabase.auth.getUser()` and fetch the profiles table, resulting in at least 3–4 redundant auth + profile fetches in the same render cycle.

**Section 5 — NotificationsPanel: Persistent realtime channel opened before panel is interacted with**

5.1 WHEN the Topbar renders THEN `useUnreadCount(userId)` immediately subscribes a Supabase Realtime channel (`unread-count-{userId}`) and a count query fires even before the user opens the notifications panel, adding a persistent WebSocket channel and a DB round-trip to every page render.

5.2 WHEN the NotificationsPanel is opened THEN a second Supabase Realtime channel (`notifications-panel-{userId}`) is subscribed, meaning each active student maintains two overlapping notification channels simultaneously — one always-on count channel and one panel channel — doubling the Realtime load.

5.3 WHEN many users are simultaneously active THEN the platform runs N×2 persistent Realtime channels (one per user × 2 channels), creating O(N) WebSocket connections that overwhelm the Supabase Realtime server and slow all subscribers.

**Section 6 — Mock exam setup: Two sequential full-table scans per exam start**

6.1 WHEN a student starts a mock exam THEN the `startExam` function first fetches ALL `student_answers` rows for the student filtered by `mode='mock_exam'` and `paper` to build a seen-question set, then fetches ALL approved question IDs and units for the selected cadre+paper — two large sequential queries before the exam can start, each returning O(total answers) and O(total questions) rows respectively.

6.2 WHEN a student has taken many mock exams THEN the `student_answers` query to compute seen question IDs grows unboundedly and takes progressively longer, eventually timing out for students with large answer histories.

6.3 WHEN the mock exam setup page renders THEN `fetchProgress()` runs a loop that fires two Supabase queries per available exam type (one COUNT on questions, one full fetch of student_answers for that paper), executing up to 4 sequential DB queries on the setup page without parallelisation.

**Section 7 — Practice page: get_unanswered_practice_questions uses NOT EXISTS with a correlated subquery**

7.1 WHEN a student starts a practice session THEN `get_unanswered_practice_questions` executes a `NOT EXISTS` correlated subquery against `student_answers` for every candidate question row — a query pattern that degrades to O(questions × answers) as both tables grow, performing a sequential scan of the entire `student_answers` table for each question evaluated.

7.2 WHEN a cadre has 5,000+ approved questions and a student has 1,000+ practice answers THEN the `NOT EXISTS` correlated subquery in `get_unanswered_practice_questions` can take 3–10 seconds to execute, making practice start feel unresponsive.

**Section 8 — Missing database indexes on high-traffic query patterns**

8.1 WHEN queries filter `student_answers` by `(student_id, mode, paper)` or `(student_id, mode)` THEN no composite index exists on those columns, forcing full sequential scans of the student_answers table on every practice start, mock exam start, badge evaluation, analytics page load, and dashboard load.

8.2 WHEN queries filter `questions` by `(cadre, paper, status)` or `(cadre, status)` THEN no composite index exists on those columns, meaning mock exam and practice question fetches scan the entire questions table (5,000+ rows and growing).

8.3 WHEN `get_unanswered_practice_questions` runs its `NOT EXISTS` correlated subquery THEN `student_answers` has no index on `(student_id, question_id, mode)` to allow index-only lookups for the subquery, causing full table scans.

8.4 WHEN `page_visits` and `user_logins` receive a row insert on every page navigation THEN these tables grow at O(users × page views per session) with no archival strategy, and admin analytics queries scanning them without indexes slow all concurrent inserts.

**Section 9 — Supabase admin client: New client instantiated per request in API routes**

9.1 WHEN any API route calls `createAdminClient()` THEN a brand-new `@supabase/supabase-js` client is created for each HTTP request with `autoRefreshToken: false` and `persistSession: false`, meaning the connection is torn down and re-established on every invocation with no connection reuse across the serverless function's lifetime.

**Section 10 — WhatsNewModal: Heavy Framer Motion animations on every student layout mount**

10.1 WHEN a student loads any page in the student layout THEN the `WhatsNewProvider` (which renders `WhatsNewModal`) imports and instantiates Framer Motion's `motion`, `AnimatePresence`, and multiple animated sub-components, adding Framer Motion's runtime weight to the initial JS parse budget even for users who have already dismissed the modal.

10.2 WHEN the WhatsNewModal renders THEN it uses a `motion.span` with an `animate` prop that runs an infinitely looping emoji rotation animation (`{ repeat: Infinity, ... }`), keeping the Framer Motion animation loop alive for the entire session on every page as long as the modal is potentially shown.

**Section 11 — Student layout: All pages forced to `force-dynamic`**

11.1 WHEN Next.js builds or serves any student-area page THEN `export const dynamic = 'force-dynamic'` in the student layout opts every nested page out of static generation AND out of Next.js full-route caching, meaning even pages with no user-specific content (e.g. initial loading skeletons) cannot benefit from any caching and always incur a cold Vercel serverless function start.

11.2 WHEN Vercel cold-starts the serverless function for a student page THEN the Node.js runtime must be initialised from scratch (typically 200–500ms on Vercel's free/hobby tier), adding this cold-start latency to TTFB for the first request in any 5-minute idle window.

**Section 12 — RLS policies: Potential expensive subqueries on high-traffic tables**

12.1 WHEN Supabase evaluates RLS on `student_answers` for every inserted or queried row THEN if the RLS policy uses a subquery to verify the `auth.uid()` matches `student_id` (rather than a simple column equality), PostgreSQL re-evaluates the policy condition per row rather than once per statement, multiplying policy overhead by the row count of the result set.

---

### Expected Behavior (Correct)

**Section 2 — Middleware should be fast and stateless for already-authenticated users**

2.1 WHEN an authenticated user navigates to a protected route THEN the middleware SHALL read the user's role from a JWT claim or short-lived edge-compatible cache so that no database round-trips are required on the hot path for role-based routing.

2.2 WHEN the middleware must verify role (e.g. first visit or token refresh) THEN it SHALL complete role verification in a single database query (no serial chaining of session + profile queries) so that middleware latency is under 50ms P95 for warm serverless functions.

**Section 3 — Dashboard data shall be aggregated server-side**

3.1 WHEN a student opens `/dashboard` THEN the server SHALL pre-aggregate total_questions_answered, correct_answers, study_time_minutes, and accuracy using a single SQL RPC function rather than transferring raw answer rows to the client, so that dashboard data load completes in under 300ms P95 regardless of the student's answer history size.

3.2 WHEN the dashboard fetches `student_answers` statistics THEN the system SHALL use a COUNT/SUM aggregate RPC (e.g. `get_student_dashboard_stats`) rather than fetching all rows, so that transferred payload is O(1) regardless of answer count.

**Section 4 — Badge evaluation shall be event-driven, not on every mount**

4.1 WHEN a student answers a question or completes an exam THEN `checkBadges()` SHALL be called exactly once as a consequence of that specific event rather than on every page load, so that the full badge evaluation query suite runs at most once per meaningful user action.

4.2 WHEN badge evaluation queries student_answers THEN it SHALL use server-side aggregation RPCs (COUNT grouped by unit) rather than fetching all rows and iterating in JavaScript, so that badge evaluation time is O(1) regardless of answer count.

4.3 WHEN the student_answers badge check needs unit counts THEN the system SHALL call a dedicated RPC (e.g. `get_answer_counts_by_unit`) that returns pre-aggregated unit totals, not the raw rows.

**Section 5 — ActivityTracker shall cache user identity for the session**

5.1 WHEN the ActivityTracker records a page visit THEN it SHALL reuse the cached userId and role obtained at mount time rather than calling `supabase.auth.getUser()` and querying the profiles table again on every route change, so that each route change incurs at most one lightweight INSERT (no auth or profile round-trip).

**Section 6 — NotificationsPanel realtime subscription shall be deferred until panel opens**

6.1 WHEN the Topbar renders THEN the `useUnreadCount` hook SHALL defer the Supabase Realtime channel subscription until the userId is confirmed non-empty AND the hook has been mounted for at least one render cycle, so that cold-rendering the Topbar does not open a Realtime connection before the user is confirmed authenticated.

6.2 WHEN the NotificationsPanel is closed THEN it SHALL close the `notifications-panel-{userId}` Realtime channel immediately, so that at most one notification channel (the unread count channel) is open per authenticated user at any time.

6.3 WHEN a student has the notifications panel closed THEN the system SHALL maintain at most one Realtime channel per authenticated user (the always-on unread count channel), so that total open channels scales at O(N) with exactly one channel per active user rather than two.

**Section 7 — Mock exam shall use an RPC to build the seen-question set server-side**

7.1 WHEN a student starts a mock exam THEN the system SHALL call an RPC (e.g. `get_mock_exam_questions`) that builds the unseen question set entirely in PostgreSQL, returning only the final interleaved set of question IDs, so that no large intermediate arrays are transferred to the browser.

7.2 WHEN the mock exam setup page loads THEN `fetchProgress()` SHALL execute all per-exam progress queries in a single parallel `Promise.all` rather than a sequential for-loop, and SHALL use COUNT aggregations rather than full row fetches.

**Section 8 — get_unanswered_practice_questions shall use LEFT JOIN anti-join**

8.1 WHEN `get_unanswered_practice_questions` fetches unseen questions THEN the RPC SHALL use a `LEFT JOIN ... WHERE sa.id IS NULL` anti-join pattern instead of a `NOT EXISTS` correlated subquery, so that the query plan can use hash-join or merge-join strategies and runs in O(questions + answers) rather than O(questions × answers).

**Section 9 — Critical composite indexes shall exist on high-traffic columns**

9.1 WHEN queries filter `student_answers` by `(student_id, mode)` THEN the system SHALL have a composite index on `(student_id, mode)` so that index scans replace full table scans.

9.2 WHEN queries filter `student_answers` by `(student_id, mode, paper)` THEN the system SHALL have a composite index on `(student_id, mode, paper)` so that mock exam seen-question lookups are index-only.

9.3 WHEN queries filter `student_answers` by `(student_id, question_id, mode)` for the NOT EXISTS pattern THEN the system SHALL have a composite index on `(question_id, student_id, mode)` to support the anti-join lookup.

9.4 WHEN queries filter `questions` by `(cadre, status)` or `(cadre, paper, status)` THEN the system SHALL have composite indexes on both patterns so that question bank queries are index-only scans.

**Section 10 — WhatsNewModal animation loop shall not run perpetually**

10.1 WHEN a student has already seen the current WhatsNew version (localStorage flag set) THEN `WhatsNewModal` SHALL return `null` before importing or initializing any Framer Motion animation, so that the animation loop does not consume CPU cycles for users who dismissed the modal.

10.2 WHEN the WhatsNew emoji animation runs THEN it SHALL use `repeatDelay` with `repeat: 3` or a finite repeat count rather than `repeat: Infinity`, so that animation work stops after a few cycles rather than running for the entire session.

**Section 11 — Dashboard shall target sub-200ms TTFB**

11.1 WHEN a student page receives a request THEN the Time to First Byte (TTFB) SHALL be under 100ms for cached/static assets and under 500ms P95 for dynamic authenticated pages so that the page skeleton renders immediately.

11.2 WHEN API responses serve repeated identical data (e.g. platform_settings, active units list) THEN the system SHALL apply appropriate HTTP cache headers (`Cache-Control: max-age=60, stale-while-revalidate=300`) so that CDN/edge caching reduces origin hits.

**Section 12 — Measurable performance targets**

12.1 WHEN the dashboard page loads for an authenticated student THEN the full data load (all stat tiles visible, no spinner) SHALL complete in under 1,500ms P95 on a 4G mobile connection.

12.2 WHEN a student starts a practice session THEN the first question SHALL appear in under 800ms P95 from clicking "Start Practice".

12.3 WHEN a student starts a mock exam THEN all 100 questions SHALL be loaded and the exam UI SHALL be ready in under 2,000ms P95.

12.4 WHEN badge evaluation runs after an answer is submitted THEN it SHALL complete without blocking the answer confirmation UI and SHALL finish within 500ms P95.

12.5 WHEN 500 concurrent users are authenticated THEN total open Supabase Realtime channels SHALL not exceed 600 (one per user + minimal overhead) rather than the current ~1,000+ (two per user).

---

### Unchanged Behavior (Regression Prevention)

**Section 3 — Functional correctness must be preserved**

3.1 WHEN the dashboard uses an aggregation RPC instead of raw row transfer THEN the system SHALL CONTINUE TO display accurate total_questions_answered, correct_answers, accuracy_percentage, and study_time_minutes values that match what the current full-row calculation produces.

3.2 WHEN badge evaluation is moved to event-driven invocation THEN the system SHALL CONTINUE TO correctly detect and award all badge types (level, streak, volume, unit-specific, mock exam, flashcard, community, ranking, timing) and SHALL CONTINUE TO never award the same badge twice to the same student.

3.3 WHEN the anti-join replaces the NOT EXISTS correlated subquery in `get_unanswered_practice_questions` THEN the system SHALL CONTINUE TO return only questions the student has not previously answered in practice mode, and SHALL CONTINUE TO fallback to the full question bank when all questions have been seen.

3.4 WHEN Realtime subscription deferral is applied to NotificationsPanel THEN the system SHALL CONTINUE TO show real-time new notification badges on the bell icon without requiring a page refresh.

3.5 WHEN middleware role caching is added THEN the system SHALL CONTINUE TO correctly enforce role-based access control — students SHALL CONTINUE TO be redirected away from tutor routes and vice versa, and unverified tutors SHALL CONTINUE TO be redirected to the pending/complete-profile pages.

3.6 WHEN the mock exam uses an RPC to build the question set THEN the system SHALL CONTINUE TO deliver NCK-style unit-interleaved question ordering, SHALL CONTINUE TO prefer unseen questions and reset the cycle when all have been seen, and SHALL CONTINUE TO enforce the correct totalQuestions count per exam config.

3.7 WHEN composite indexes are added on student_answers and questions THEN all existing INSERT, UPDATE, SELECT, and DELETE operations on those tables SHALL CONTINUE TO work correctly without any behavioral change — indexes are transparent to query semantics.

3.8 WHEN ActivityTracker caches user identity THEN it SHALL CONTINUE TO record exactly one login event per browser session and one page_visit row per route change, with the same user_id, role, and page_slug values as currently recorded.

3.9 WHEN WhatsNewModal animation is made finite THEN the modal SHALL CONTINUE TO display correctly for new users seeing it for the first time, SHALL CONTINUE TO be re-openable via the WhatsNewTrigger, and SHALL CONTINUE TO persist dismissal in localStorage so it does not re-show after being closed.

3.10 WHEN platform_settings is fetched via the existing in-memory cache THEN the 1-minute TTL and cache invalidation behavior SHALL CONTINUE TO work as currently implemented.

3.11 WHEN API routes use the admin client THEN the service-role key bypass of RLS SHALL CONTINUE TO work correctly — no user data SHALL become inaccessible as a result of any connection optimisation.

3.12 WHEN the practice session resume/save feature uses localStorage THEN the 24-hour TTL, session serialization, and resume prompt logic SHALL CONTINUE TO function correctly after any performance changes to the practice page data-fetching flow.

---

## Bug Condition Pseudocode

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type PlatformRequest
    X.concurrent_users        : Integer  — number of simultaneous authenticated users
    X.student_answer_count    : Integer  — number of rows in student_answers for a given student
    X.total_question_count    : Integer  — total approved questions in the questions table
    X.page_navigations        : Integer  — route changes in a session
    X.open_realtime_channels  : Integer  — total open Supabase Realtime channels
  OUTPUT: boolean

  RETURN (
    // Middleware: serial DB queries on every page load
    X.middleware_db_queries_per_request > 1
    OR
    // Dashboard: unbounded raw row transfer
    X.dashboard_answer_fetch_limit = UNBOUNDED
    OR
    // Badge evaluation: full table scan on every layout mount
    X.badge_eval_triggered_by = PAGE_LOAD (not ANSWER_EVENT)
    OR
    // ActivityTracker: re-fetches identity on every route change
    X.activity_tracker_profile_fetches_per_nav > 0
    OR
    // Realtime: two channels per user
    X.open_realtime_channels_per_user > 1
    OR
    // Mock exam: O(N) answers transferred per exam start
    X.mock_start_answer_fetch_limit = UNBOUNDED
    OR
    // Practice RPC: NOT EXISTS correlated subquery
    X.practice_rpc_uses_correlated_subquery = TRUE
    OR
    // Missing composite indexes on student_answers + questions
    X.composite_index_student_answers_mode_paper = FALSE
    OR X.composite_index_questions_cadre_paper_status = FALSE
  )
END FUNCTION

// Property: Fix Checking
FOR ALL X WHERE isBugCondition(X) DO
  result ← platform_response(X)
  ASSERT result.dashboard_ttfb_ms < 1500
  AND result.practice_start_ms < 800
  AND result.mock_start_ms < 2000
  AND result.badge_eval_ms < 500
  AND result.middleware_latency_ms < 50
  AND result.realtime_channels_per_user <= 1
END FOR

// Property: Preservation Checking
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT platform_response(X).badge_awards_correct = TRUE
  AND platform_response(X).question_deduplication_correct = TRUE
  AND platform_response(X).rbac_enforcement_correct = TRUE
  AND platform_response(X).activity_tracking_complete = TRUE
END FOR
```
