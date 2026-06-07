# Feature Spotlight Tour Fix — Bugfix Design

## Overview

When `CURRENT_TOUR_VERSION` is bumped from 0 to 1, both `OnboardingTourGate` variants
(student and tutor) currently show the full 10-step orientation to **all** users whose
`tour_version < CURRENT_TOUR_VERSION`, including existing users who already completed the
orientation under the old boolean system. The fix introduces a `FEATURE_UPDATES` registry
and a thin "What's New" spotlight wrapper so the gate can distinguish new users (show full
orientation) from existing users (show a compact spotlight covering only the features added
in this version bump), without touching the orientation steps or their components at all.

No database schema changes are required; the `tour_version` column already exists on both
`student_profiles` and `tutor_profiles` from migration `20260607000003`.

---

## Glossary

- **Bug_Condition (C)**: The gate condition that triggers the bug — a user whose
  `stored_tour_version >= 1` AND `stored_tour_version < CURRENT_TOUR_VERSION` is
  incorrectly routed to the full orientation tour instead of a spotlight.
- **Property (P)**: The desired gate output — an existing user in the version-gap range
  shall see the spotlight modal, not the orientation.
- **Preservation**: The gate decisions for new users (`stored = 0`) and up-to-date users
  (`stored >= CURRENT`) must remain exactly unchanged.
- **`selectTourModal(X)`**: The gate's routing function in its current (unfixed) form.
- **`selectTourModal'(X)`**: The gate's routing function after the fix is applied.
- **`FEATURE_UPDATES`**: An array of `SpotlightRelease` objects keyed conceptually by
  version number; each entry carries `version`, `fromVersion`, and `steps`.
- **`SpotlightRelease`**: A registry entry `{ version: number; fromVersion: number; steps: TourStep[] }`.
- **`TourStep`**: The existing step interface `{ emoji, title, description, tip? }` already
  defined in `components/shared/OnboardingTour.tsx`.
- **`WhatsNewTour`**: A new sibling component (or inner variant) that renders the same
  modal chrome as `OnboardingTour` but with a "What's New 🎉" header badge and "Got it →"
  on the final step.
- **`stored_tour_version`**: The integer stored in `student_profiles.tour_version` or
  `tutor_profiles.tour_version` for a given user (defaults to `0`).
- **`CURRENT_TOUR_VERSION`**: The constant in each gate file representing the latest
  released tour version (currently `1`).

---

## Bug Details

### Bug Condition

The bug manifests when the gate evaluates a user who has already completed the original
orientation (their `stored_tour_version` is at least `1`, reflecting the completed v0
orientation under the old boolean system) but whose stored version is still below
`CURRENT_TOUR_VERSION`. The gate's single comparison `seen < CURRENT_TOUR_VERSION` is
true for both new users (`stored = 0`) and these existing users, so both populations are
routed to `<OnboardingTour>` — the full orientation — when the existing-user population
should receive only the targeted spotlight.

**Formal Specification:**

```
FUNCTION isBugCondition(X)
  INPUT:  X of type { stored_tour_version: integer, current_tour_version: integer }
  OUTPUT: boolean

  // Bug fires for existing users in the version gap — they have seen at
  // least one tour but are below the current version.
  RETURN X.stored_tour_version >= 1
     AND X.stored_tour_version < X.current_tour_version
END FUNCTION
```

### Examples

- **Existing user, version bump** — `stored = 0` (old boolean seen = true, effectively
  v0 completed), `CURRENT = 1`: bug fires, user sees the full 10-step orientation again
  instead of a 4-step "What's New" spotlight. *(This is the primary affected population.)*
- **Existing user, two-version gap** — `stored = 1`, `CURRENT = 2` (hypothetical future
  bump): bug would fire, user would see full orientation instead of v2 spotlight steps.
- **New user** — `stored = 0`, no prior session, `CURRENT = 1`: bug does NOT fire; full
  orientation is the correct response here.
- **Up-to-date user** — `stored = 1`, `CURRENT = 1`: bug does NOT fire; no modal shown.

---

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**

- The full `STUDENT_STEPS` and `TUTOR_STEPS` arrays in `OnboardingTour.tsx` MUST remain
  completely untouched.
- The `OnboardingTour` component's props, rendering, and internal logic MUST remain
  completely untouched.
- New users (`stored = 0`) MUST continue to receive the full orientation tour.
- Users already up-to-date (`stored >= CURRENT`) MUST continue to see no modal.
- After completing or skipping either modal, `tour_version` MUST be written as
  `CURRENT_TOUR_VERSION` and `onboarding_tour_seen` as `true` — same as before.
- The tutor gate MUST apply identical routing logic to the student gate.
- Mouse/keyboard interactions, routing, and all other page behaviour MUST be unaffected.

**Scope:**

All inputs where `isBugCondition(X)` is false are entirely outside the scope of this fix
and their behaviour must be byte-for-byte identical before and after the change. This
includes:

- Users with `stored_tour_version = 0` who are genuinely new.
- Users with `stored_tour_version >= CURRENT_TOUR_VERSION`.
- Any user on a page that does not render a gate component.

**Note:** The precise expected correct behavior for existing users in the version gap is
defined in the Correctness Properties section below (Property 1).

---

## Hypothesized Root Cause

The gate uses a single branch `if (seen < CURRENT_TOUR_VERSION) setShow(true)` with no
distinction between the sub-populations within that range. The rendering branch always
returns `<OnboardingTour role="student" …>`, the full orientation, with no conditional
path to a spotlight component. Specifically:

1. **Missing population discriminant**: The gate reads only `seen < CURRENT_TOUR_VERSION`
   and has no check for `seen > 0` to identify existing users.

2. **No spotlight component exists**: There is no `WhatsNewTour` or equivalent component
   that renders only new-feature steps — the gate has nothing to route existing users to
   even if it wanted to.

3. **No step registry exists**: Feature-version spotlight steps are not registered
   anywhere; all step arrays (`STUDENT_STEPS`, `TUTOR_STEPS`) are hardcoded for the full
   orientation.

4. **State carries only a boolean**: The gate's local state `show: boolean` is not rich
   enough to carry a modal-type discriminant (`'orientation' | 'spotlight'`); adding a
   second state field is the minimal change required.

---

## Correctness Properties

Property 1: Bug Condition — Existing Users See Spotlight, Not Full Orientation

_For any_ `X` where `isBugCondition(X)` returns `true`
(`X.stored_tour_version >= 1` AND `X.stored_tour_version < X.current_tour_version`),
the fixed gate `selectTourModal'(X)` SHALL render the `WhatsNewTour` component with only
the spotlight steps registered for the version range
`(X.stored_tour_version, X.current_tour_version]` — and SHALL NOT render `OnboardingTour`
with the full `STUDENT_STEPS` / `TUTOR_STEPS` arrays.

**Validates: Requirements 2.2, 2.3**

---

Property 2: Preservation — New Users Still Get Full Orientation

_For any_ `X` where `X.stored_tour_version = 0` AND `X.current_tour_version > 0`,
the fixed gate `selectTourModal'(X)` SHALL produce exactly the same result as the original
gate `selectTourModal(X)` — rendering `OnboardingTour` with the full orientation steps,
unchanged.

**Validates: Requirements 2.1, 3.1**

---

Property 3: Preservation — Up-to-Date Users See No Modal

_For any_ `X` where `X.stored_tour_version >= X.current_tour_version`,
the fixed gate `selectTourModal'(X)` SHALL produce exactly the same result as the original
gate — showing no modal (`show = false`), leaving the session undisturbed.

**Validates: Requirements 3.1**

---

Property 4: Preservation — Mark-as-Seen Writes Are Unchanged

_For any_ user who completes or skips either modal (orientation or spotlight),
the fixed `handleComplete` function SHALL write
`{ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true }` to the appropriate
profile table — identical to the original `handleComplete` behavior.

**Validates: Requirements 3.2, 3.3**

---

Property 5: Registry Fallback — No Orphaned Version Gap

_For any_ `X` where `isBugCondition(X)` is `true` AND no `SpotlightRelease` entry in
`FEATURE_UPDATES` covers the range `(X.stored_tour_version, X.current_tour_version]`,
the fixed gate SHALL fall back to the full orientation tour rather than showing nothing.

**Validates: Requirements 3.5**

---

## Fix Implementation

### Changes Required

**No changes** to `components/shared/OnboardingTour.tsx`.

---

**New file**: `components/shared/WhatsNewTour.tsx`

- Renders the same modal chrome as `OnboardingTour` (backdrop, card, progress bar, dots).
- Replaces the "N of M" step counter with a `"What's New 🎉"` header badge.
- Replaces `"Next →"` on the final step with `"Got it →"`.
- Accepts `steps: TourStep[]` and `onComplete: () => void` as props.
- Imports `TourStep` type from `OnboardingTour` (exported — requires a one-line type
  export addition to `OnboardingTour.tsx`, which does not change any component behavior).

---

**New file**: `components/shared/featureUpdates.ts`

- Exports the `SpotlightRelease` interface:
  ```ts
  export interface SpotlightRelease {
    version: number;      // the tour version this release targets
    fromVersion: number;  // show these steps when stored_tour_version >= fromVersion
    steps: TourStep[];
  }
  ```
- Exports `FEATURE_UPDATES: SpotlightRelease[]` — the registry array.
- Exports `getSpotlightSteps(stored: number, current: number): TourStep[] | null` — a
  pure helper that filters `FEATURE_UPDATES` for entries where
  `entry.fromVersion >= stored && entry.version <= current`, aggregates their steps, and
  returns `null` if the array is empty (triggers fallback to orientation).

**Version 1 spotlight steps** (four steps, registered as `{ version: 1, fromVersion: 1 }`):

| # | emoji | title | Key content |
|---|-------|-------|-------------|
| 1 | 🆔 | Meet Your Community Identity | Introduces the new "Community Identity" section in Settings → Profile; explains username and display name. |
| 2 | ✏️ | Your Username & Display Name | Explains the `@username` field (unique handle in community) and the `Display Name` field (what others see). |
| 3 | 🔒 | The "Hide My Real Name" Toggle | Explains the `hide_real_name` privacy toggle: when on, your real name is hidden from other students. |
| 4 | ⚙️ | Try It Now — Head to Settings | Closing CTA step; tip points to Settings → Profile to set up community identity. |

---

**Modified file**: `components/student/OnboardingTourGate.tsx`

1. Import `WhatsNewTour` and `getSpotlightSteps` from their new files.
2. Add state `const [tourType, setTourType] = useState<'orientation' | 'spotlight'>('orientation')`.
3. In the `check` effect, after computing `seen`:
   - If `seen === 0` → `setTourType('orientation'); setShow(true)` (existing behavior).
   - If `seen >= 1 && seen < CURRENT_TOUR_VERSION` → get spotlight steps via
     `getSpotlightSteps(seen, CURRENT_TOUR_VERSION)`; if steps found set
     `setTourType('spotlight'); setShow(true)`; else fall back to orientation.
4. In the render branch, switch on `tourType`:
   - `'orientation'` → return `<OnboardingTour role="student" onComplete={handleComplete} />` (unchanged).
   - `'spotlight'` → return `<WhatsNewTour steps={spotlightSteps} onComplete={handleComplete} />`.

**Modified file**: `components/tutor/OnboardingTourGate.tsx`

- Mirror the identical changes made to the student gate (same logic, `tutor_profiles` table).

---

## Testing Strategy

### Validation Approach

Testing follows a two-phase approach: run exploratory tests on the **unfixed** gate to
surface counterexamples that confirm the bug, then run fix-checking and preservation tests
against the fixed code.

---

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples demonstrating that the unfixed gate shows the full
orientation to existing users, confirming the root cause.

**Test Plan**: Mock `supabase.from('student_profiles').select` to return
`{ tour_version: 1 }` (an existing user) with `CURRENT_TOUR_VERSION = 2`, render
`<OnboardingTourGate>`, and assert that `<OnboardingTour>` is rendered. These tests will
**pass on unfixed code** (confirming the bug) and **fail after the fix** (confirming
the fix) — so they are written as *bug condition* tests that we then invert.

**Test Cases**:

1. **Existing student, one-version gap** — `stored = 1`, `CURRENT = 2`: assert
   `OnboardingTour` renders (will confirm bug on unfixed code). *(fails after fix)*
2. **Existing tutor, one-version gap** — same as above for tutor gate.
3. **Two-version gap** — `stored = 1`, `CURRENT = 3`: assert `OnboardingTour` renders.
   *(fails after fix)*
4. **Boundary: stored = 0** — `stored = 0`, `CURRENT = 1`: assert `OnboardingTour` still
   renders on unfixed code. *(should still pass after fix — new user path unchanged)*

**Expected Counterexamples** (after applying fix):

- The fixed gate renders `WhatsNewTour` for cases 1–3, not `OnboardingTour`.
- Case 4 continues to render `OnboardingTour` (preservation).

---

### Fix Checking

**Goal**: Verify that for all inputs where `isBugCondition(X)` holds, the fixed gate
renders `WhatsNewTour` with the correct spotlight steps.

**Pseudocode:**

```
FOR ALL X WHERE isBugCondition(X) DO
  result := renderGate(X)
  ASSERT result.component = WhatsNewTour
  ASSERT result.steps ⊆ FEATURE_UPDATES steps for range (X.stored, X.current]
  ASSERT result.steps ≠ FULL_ORIENTATION_STEPS
END FOR
```

---

### Preservation Checking

**Goal**: Verify that for all inputs where `isBugCondition(X)` is false, the fixed gate
produces exactly the same output as the original gate.

**Pseudocode:**

```
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT renderGate_original(X) = renderGate_fixed(X)
END FOR
```

**Testing Approach**: Property-based testing is recommended here because the preserved
paths cover two distinct sub-domains (`stored = 0` and `stored >= CURRENT`) across any
possible integer version values, and PBT can generate many combinations automatically.

**Test Cases**:

1. **New user preservation** — `stored = 0`, arbitrary `CURRENT > 0`: `OnboardingTour`
   renders with the correct role prop; no `WhatsNewTour` in the tree.
2. **Up-to-date user preservation** — arbitrary `stored = CURRENT`: nothing renders.
3. **Mark-as-seen preservation** — after any modal's `onComplete`, the Supabase update
   call receives `{ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true }`.
4. **Tutor parity** — for each student-gate case above, an equivalent tutor-gate case
   must behave identically (using `tutor_profiles`).

---

### Unit Tests

- `getSpotlightSteps(stored, current)` returns the correct steps for known version ranges.
- `getSpotlightSteps` returns `null` when no registry entry covers the gap.
- `getSpotlightSteps` aggregates steps across multiple entries when `current - stored > 1`.
- `WhatsNewTour` renders "What's New 🎉" badge and no "N of M" counter.
- `WhatsNewTour` shows "Got it →" on the last step and "Next →" on non-last steps.
- Student gate renders `OnboardingTour` when `stored = 0`.
- Student gate renders `WhatsNewTour` when `stored = 1, CURRENT = 2` (after fix).
- Student gate renders nothing when `stored = CURRENT`.
- Tutor gate mirrors the above three cases.

### Property-Based Tests

- **Property 1 (fix check)**: For any `stored >= 1, current > stored`, the fixed gate
  renders `WhatsNewTour` (when spotlight steps exist for the range).
- **Property 2 (preservation — new user)**: For any `current > 0`, `stored = 0`, the
  fixed gate renders `OnboardingTour`.
- **Property 3 (preservation — no modal)**: For any `stored >= current`, the fixed gate
  renders nothing.
- **Property 5 (fallback)**: For any version pair where `FEATURE_UPDATES` has no entries
  covering the gap, the fixed gate renders `OnboardingTour` (not nothing).

### Integration Tests

- Full student flow: new user (`stored = 0`) sees orientation, completes it, `tour_version`
  written as `CURRENT`, no modal on next load.
- Full student flow: existing user (`stored = 1`) sees spotlight on version bump to 2,
  completes it, `tour_version` written as `2`, no modal on next load.
- Tutor mirrors both cases above via the tutor gate.
- Spotlight content: the four V1 spotlight steps display the expected titles and copy
  about username, display name, hide_real_name, and Settings CTA.
