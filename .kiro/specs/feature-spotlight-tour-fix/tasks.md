# Implementation Plan

## Overview

Fix the `OnboardingTourGate` (student and tutor) so that existing users whose `stored_tour_version >= 1` but is below `CURRENT_TOUR_VERSION` see a compact "What's New" spotlight modal instead of the full 10-step orientation tour. New users (`stored = 0`) continue to receive the full orientation unchanged.

## Tasks

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Existing Users Incorrectly See Full Orientation Tour
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior — it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples demonstrating that existing users (stored_tour_version >= 1) are shown `<OnboardingTour>` (full orientation) instead of `<WhatsNewTour>` (spotlight)
  - **Scoped PBT Approach**: Scope the property to concrete failing cases — `stored_tour_version = 1` and `CURRENT_TOUR_VERSION = 2` for the student gate; mirror for the tutor gate
  - Write a property-based test using `fast-check` (or equivalent) that generates `stored >= 1` and `current > stored`, mocks `supabase.from('student_profiles').select` to return `{ tour_version: stored }`, renders `<OnboardingTourGate>`, and asserts that `<WhatsNewTour>` is present in the tree and `<OnboardingTour>` (full orientation) is NOT present
  - Run test on UNFIXED code (`OnboardingTourGate` before any changes)
  - **EXPECTED OUTCOME on unfixed code**: Test FAILS — `OnboardingTour` is found instead of `WhatsNewTour` (proves the bug exists)
  - Document counterexamples found, e.g. `{ stored: 1, current: 2 }` → `OnboardingTour` rendered incorrectly
  - Additional concrete cases to document: `{ stored: 1, current: 3 }` (two-version gap) also triggers the bug
  - Mark task complete when test is written, run on unfixed code, and failure is documented
  - _Requirements: 1.1, 1.2_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Buggy Inputs Produce Identical Gate Output
  - **IMPORTANT**: Follow observation-first methodology — run UNFIXED code first to record baseline behavior
  - Observe on UNFIXED code:
    - `stored = 0, current = 1` → `OnboardingTour` (full orientation) renders for student gate
    - `stored = 1, current = 1` → nothing renders (no modal) for student gate
    - `stored = 0, current = 1` → `OnboardingTour` renders for tutor gate (`tutor_profiles`)
    - `stored = 1, current = 1` → nothing renders for tutor gate
    - After `onComplete()`, supabase update receives `{ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true }`
  - Write property-based test (sub-domain 1 — new users): for any `current > 0` with `stored = 0`, the gate renders `OnboardingTour` with the correct `role` prop and no `WhatsNewTour` in the tree
  - Write property-based test (sub-domain 2 — up-to-date users): for any `stored >= current` (`stored = current` as the concrete case), the gate renders nothing (null)
  - Write example-based test: for any modal's `onComplete`, the supabase `.update()` call receives exactly `{ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true }`
  - Write parity tests: for each student-gate case above, a mirror tutor-gate case using `tutor_profiles` must behave identically
  - Run all tests on UNFIXED code
  - **EXPECTED OUTCOME**: All tests PASS on unfixed code (confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 2.1, 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Fix: route existing users to spotlight modal instead of full orientation

  - [ ] 3.1 Export `TourStep` type from `components/shared/OnboardingTour.tsx`
    - Add `export` keyword to the existing `TourStep` interface so it can be imported by the new files
    - No other changes to `OnboardingTour.tsx` — component behavior, props, and step arrays remain untouched
    - _Bug_Condition: isBugCondition(X) where X.stored_tour_version >= 1 AND X.stored_tour_version < X.current_tour_version_
    - _Preservation: OnboardingTour component itself is unchanged — zero behavioral delta_
    - _Requirements: 2.1, 3.1_

  - [ ] 3.2 Create `components/shared/featureUpdates.ts` — spotlight step registry
    - Export `SpotlightRelease` interface: `{ version: number; fromVersion: number; steps: TourStep[] }`
    - Export `FEATURE_UPDATES: SpotlightRelease[]` array containing the v1 spotlight release registered as `{ version: 1, fromVersion: 1, steps: V1_STEPS }`
    - V1 spotlight steps (4 steps): "Meet Your Community Identity" 🆔, "Your Username & Display Name" ✏️, "The 'Hide My Real Name' Toggle" 🔒, "Try It Now — Head to Settings" ⚙️ (content per design)
    - Export pure helper `getSpotlightSteps(stored: number, current: number): TourStep[] | null` — filters entries where `entry.fromVersion >= stored && entry.version <= current`, aggregates steps, returns `null` when array is empty (triggers fallback to orientation)
    - _Expected_Behavior: getSpotlightSteps(1, 2) returns the 4 V1 steps; getSpotlightSteps(0, 1) returns null (new user, no spotlight); getSpotlightSteps with no matching entries returns null_
    - _Requirements: 2.2, 2.3, 3.5_

  - [ ] 3.3 Create `components/shared/WhatsNewTour.tsx` — spotlight modal component
    - Renders the same modal chrome as `OnboardingTour` (backdrop, card, progress bar, dot indicators, navigation buttons)
    - Accepts props `{ steps: TourStep[]; onComplete: () => void }`
    - Replaces the "N of M" step counter with a `"What's New 🎉"` header badge
    - Replaces `"Next →"` / `"Let's go! 🚀"` on the final step with `"Got it →"`
    - All other interactions (back button, skip, dot navigation) work identically to `OnboardingTour`
    - _Requirements: 2.2_

  - [ ] 3.4 Update `components/student/OnboardingTourGate.tsx` — add routing discriminant
    - Import `WhatsNewTour` from `@/components/shared/WhatsNewTour`
    - Import `getSpotlightSteps` from `@/components/shared/featureUpdates`
    - Add state: `const [tourType, setTourType] = useState<'orientation' | 'spotlight'>('orientation')`
    - Add state: `const [spotlightSteps, setSpotlightSteps] = useState<TourStep[]>([])`
    - In the `check` effect after computing `seen`:
      - If `seen === 0` → `setTourType('orientation'); setShow(true)` (new user, existing behavior unchanged)
      - If `seen >= 1 && seen < CURRENT_TOUR_VERSION` → call `getSpotlightSteps(seen, CURRENT_TOUR_VERSION)`; if non-null set spotlight steps and `setTourType('spotlight'); setShow(true)`; else fall back to `setTourType('orientation'); setShow(true)`
    - In the render return, switch on `tourType`:
      - `'orientation'` → `<OnboardingTour role="student" onComplete={handleComplete} />` (unchanged)
      - `'spotlight'` → `<WhatsNewTour steps={spotlightSteps} onComplete={handleComplete} />`
    - _Bug_Condition: isBugCondition(X) where X.stored_tour_version >= 1 AND X.stored_tour_version < CURRENT_TOUR_VERSION_
    - _Expected_Behavior: selectTourModal'(X) = WhatsNewTour with spotlight steps for existing users in version gap_
    - _Preservation: stored = 0 still routes to OnboardingTour; stored >= CURRENT still shows nothing; handleComplete writes unchanged_
    - _Requirements: 2.2, 2.3, 3.1, 3.2, 3.3, 3.5_

  - [ ] 3.5 Update `components/tutor/OnboardingTourGate.tsx` — mirror student gate changes
    - Apply identical changes as 3.4 to `TutorOnboardingTourGate`
    - Use `tutor_profiles` table (already correct) — no table name changes needed
    - Import `WhatsNewTour` and `getSpotlightSteps` identically
    - Add the same `tourType` and `spotlightSteps` state
    - Same routing logic in `check` effect
    - Same render switch on `tourType`
    - _Preservation: tutor gate routing logic is byte-for-byte equivalent to student gate_
    - _Requirements: 2.2, 2.3, 3.4_

  - [ ] 3.6 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Existing Users See WhatsNewTour, Not Full Orientation
    - **IMPORTANT**: Re-run the SAME test from task 1 — do NOT write a new test
    - The test from task 1 encodes the expected behavior: existing users with `stored >= 1, current > stored` should see `WhatsNewTour`, not `OnboardingTour`
    - Run bug condition exploration test from step 1 against the fixed code
    - **EXPECTED OUTCOME**: Test PASSES — `WhatsNewTour` is found in the tree, `OnboardingTour` is not (confirms bug is fixed)
    - _Requirements: 2.2, 2.3_

  - [ ] 3.7 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Buggy Inputs Unchanged After Fix
    - **IMPORTANT**: Re-run the SAME tests from task 2 — do NOT write new tests
    - Run all preservation property tests from step 2 against the fixed code
    - **EXPECTED OUTCOME**: All tests PASS — new users still see full orientation, up-to-date users see nothing, `handleComplete` writes are unchanged, tutor gate mirrors student gate
    - Confirm zero regressions after fix

- [ ] 4. Checkpoint — Ensure all tests pass
  - Run the full test suite (unit tests, property tests, integration tests)
  - Confirm Property 1 (bug condition) passes — `WhatsNewTour` renders for `stored >= 1, current > stored`
  - Confirm Property 2 (preservation — new users) passes — `OnboardingTour` renders for `stored = 0`
  - Confirm Property 3 (preservation — up-to-date) passes — nothing renders for `stored >= current`
  - Confirm Property 4 (mark-as-seen) passes — `handleComplete` writes `{ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true }`
  - Confirm Property 5 (fallback) passes — gate falls back to `OnboardingTour` when no registry entries cover the gap
  - Confirm `getSpotlightSteps` unit tests pass (correct steps returned, null returned for empty range, multi-version aggregation correct)
  - Confirm `WhatsNewTour` unit tests pass ("What's New 🎉" badge present, no "N of M" counter, "Got it →" on last step)
  - Confirm tutor gate parity tests pass
  - If any test fails, investigate and resolve before marking complete
  - Ask the user if any questions arise

## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": ["1", "2"],
      "description": "Exploration and preservation tests written against unfixed code — no dependencies"
    },
    {
      "wave": 2,
      "tasks": ["3.1"],
      "description": "Export TourStep type — prerequisite for all new files"
    },
    {
      "wave": 3,
      "tasks": ["3.2", "3.3"],
      "description": "featureUpdates registry and WhatsNewTour component — depend on 3.1"
    },
    {
      "wave": 4,
      "tasks": ["3.4", "3.5"],
      "description": "Student and tutor gate updates — depend on 3.2 and 3.3"
    },
    {
      "wave": 5,
      "tasks": ["3.6", "3.7"],
      "description": "Verify tests against fixed code — depend on 3.4 and 3.5"
    },
    {
      "wave": 6,
      "tasks": ["4"],
      "description": "Final checkpoint — depends on 3.6 and 3.7"
    }
  ]
}
```

## Notes

- Tasks 1 and 2 must be completed **before** any implementation work begins. They run against the unfixed code to establish the bug baseline and the preservation baseline.
- Task 1 is expected to **fail** on unfixed code — that failure is the confirmation that the bug exists.
- Task 2 is expected to **pass** on unfixed code — those passing tests capture the baseline behavior to preserve.
- The `OnboardingTour` component (`components/shared/OnboardingTour.tsx`) must not be modified except for the single-line `TourStep` type export in 3.1.
- The V1 spotlight steps content (four steps) is fully specified in `design.md` under "Fix Implementation → New file: featureUpdates.ts".
- Both gate files (`student/OnboardingTourGate.tsx` and `tutor/OnboardingTourGate.tsx`) must receive identical routing logic changes — there is no behavioral divergence between them beyond the table name (`student_profiles` vs `tutor_profiles`).
