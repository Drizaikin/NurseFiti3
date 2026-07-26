# Implementation Plan

- [ ] 1. Write bug condition exploration test
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


- [ ] 2. Write preservation property tests (BEFORE implementing fixes)
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

