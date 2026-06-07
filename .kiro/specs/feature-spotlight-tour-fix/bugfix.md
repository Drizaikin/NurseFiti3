# Bugfix Requirements Document

## Introduction

When `CURRENT_TOUR_VERSION` is bumped (currently 0 → 1), `OnboardingTourGate` (both student and tutor variants) treats all users whose `tour_version < CURRENT_TOUR_VERSION` identically — showing every one of them the full 10-step orientation tour (`STUDENT_STEPS` / `TUTOR_STEPS`). This is correct for brand-new users who have never seen any tour (`tour_version = 0`), but it is wrong for existing users who already completed the original orientation (`tour_version = 0` after the old boolean system, effectively "version 0 seen"). Those returning users should instead see a compact "What's New" spotlight modal covering only the community identity feature introduced in version 1, not the entire orientation again.

The fix must distinguish the two populations and route each to the appropriate modal, while remaining extensible so future version bumps can supply their own targeted spotlight steps without modifying gate logic.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user's stored `tour_version` is `0` AND `CURRENT_TOUR_VERSION` is `1` THEN the system shows that user the full 10-step `STUDENT_STEPS` orientation tour regardless of whether the user is a new account or an existing account that has already seen the original orientation.

1.2 WHEN a user's stored `tour_version` is any value `> 0` AND less than `CURRENT_TOUR_VERSION` THEN the system shows that user the full orientation tour instead of a targeted spotlight for the features introduced since their last seen version.

### Expected Behavior (Correct)

2.1 WHEN a user's stored `tour_version` is `0` (never seen any tour) AND `CURRENT_TOUR_VERSION` is `1` THEN the system SHALL show the full orientation tour (`STUDENT_STEPS` / `TUTOR_STEPS`) exactly as before, because this is a new user who needs the complete introduction.

2.2 WHEN a user's stored `tour_version` is `>= 1` (has already completed the original orientation) AND less than `CURRENT_TOUR_VERSION` THEN the system SHALL show a compact "What's New" spotlight modal containing only the steps relevant to features added since the user's last seen version — specifically, for the version 1 bump, steps covering the new community identity feature (username, display name, and the "Hide my real name" privacy toggle in Settings → Profile).

2.3 WHEN a version bump introduces new spotlight steps, the system SHALL allow those steps to be registered alongside a minimum `fromVersion` value so the gate can select the correct spotlight without the gate logic itself needing to change.

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user's stored `tour_version` equals `CURRENT_TOUR_VERSION` THEN the system SHALL CONTINUE TO show no tour modal, leaving the user's session undisturbed.

3.2 WHEN a new user (never seen any tour, `tour_version = 0`) completes or skips the full orientation tour THEN the system SHALL CONTINUE TO mark their profile with `tour_version = CURRENT_TOUR_VERSION` and `onboarding_tour_seen = true`.

3.3 WHEN an existing user completes or skips the "What's New" spotlight modal THEN the system SHALL CONTINUE TO mark their profile with `tour_version = CURRENT_TOUR_VERSION` so they are not shown the spotlight again.

3.4 WHEN the tutor `OnboardingTourGate` is evaluated THEN the system SHALL CONTINUE TO apply the same new/existing user distinction as the student gate, using `tutor_profiles.tour_version`.

3.5 WHEN no spotlight steps are registered for a given version range THEN the system SHALL CONTINUE TO fall back to showing the full orientation tour rather than showing nothing, to prevent silent skips of important onboarding content.

---

## Bug Condition (Formal Specification)

**Bug Condition Function — identifies inputs that trigger the bug:**

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type UserTourState { stored_tour_version: integer, current_tour_version: integer }
  OUTPUT: boolean

  // The bug fires when the user has already seen at least one tour version
  // (i.e. they are an existing user, not a fresh account) but still receives
  // the full orientation tour instead of a targeted spotlight.
  RETURN X.stored_tour_version >= 1
     AND X.stored_tour_version < X.current_tour_version
END FUNCTION
```

**Property: Fix Checking**

```pascal
// For all existing users who need a version-bump tour, the correct modal is shown.
FOR ALL X WHERE isBugCondition(X) DO
  modal ← selectTourModal'(X)
  ASSERT modal = SPOTLIGHT_MODAL
     AND modal.steps ⊆ NEW_FEATURE_STEPS          // only new-feature steps, not the full orientation
     AND modal.steps ≠ FULL_ORIENTATION_STEPS
END FOR
```

**Property: Preservation Checking**

```pascal
// For all inputs where the bug does NOT apply, gate behaviour is unchanged.
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT selectTourModal'(X) = selectTourModal(X)
END FOR
```
