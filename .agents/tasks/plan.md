# Implementation Plan: TypeScript Fixes + Platform Performance

## Context

- **Project**: NurseFiti — Next.js 14 App Router, Supabase, TypeScript
- **Build command**: `npm run build` (or `npx next build`)
- **Typecheck command**: `npm run typecheck` (i.e. `tsc --noEmit`)
- **TypeScript errors are ignored during `next build`** (`typescript.ignoreBuildErrors: true` in next.config.mjs), so `tsc --noEmit` is the definitive verification command.
- **No test suite exists** for these files; verification = the typecheck passing cleanly.

---

## Part 1: Fix 24 TypeScript Errors (database.types.ts additions)

### Root Cause Analysis

The Supabase client is typed via `Database` in `lib/types/database.types.ts`. When a table definition is missing, `.from('missing_table')` returns `never` for all operations, causing every insert/update/select on that table to emit TS errors.

The 7 affected route files operate on these **5 missing/incomplete tables**:

---

### Table 1: `notifications` — missing `is_broadcast` and `target_role` columns

**Used by**: `app/api/admin/broadcast/route.ts` line 37 — inserts `{ ..., is_broadcast: true, target_role: ... }`.

The migration `20260606000001_community_v2.sql` added:
```sql
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS is_broadcast BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS read_count   INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS target_role  TEXT;
```

**Fix**: Add `is_broadcast: boolean`, `read_count: number`, `target_role: string | null` to `notifications.Row` and allow them in `Insert`.

---

### Table 2: `tutor_messages` — entirely missing from database.types.ts

**Used by**: `app/api/admin/community-post/route.ts` line 21 — `.from('tutor_messages').insert(...)`.

From `20260606000001_community_v2.sql`:
```sql
CREATE TABLE IF NOT EXISTS tutor_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id     UUID REFERENCES profiles NOT NULL,
  body          TEXT NOT NULL CHECK (char_length(body) <= 2000),
  reply_to_id   UUID REFERENCES tutor_messages(id) ON DELETE SET NULL,
  quote_body    TEXT,
  quote_author  TEXT,
  is_deleted    BOOLEAN DEFAULT FALSE,
  is_admin_post BOOLEAN DEFAULT FALSE,
  likes_count   INTEGER DEFAULT 0,
  views_count   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

**Fix**: Add full `tutor_messages` table definition.

---

### Table 3: `community_messages` — entirely missing from database.types.ts

**Used by**: `app/api/admin/community-post/route.ts` line 30 — `.from('community_messages').insert(...)`.

From `20260604000002_avatars_chat_onboarding.sql` (plus v2 additions):
```sql
CREATE TABLE IF NOT EXISTS community_messages (
  id            UUID,
  author_id     UUID,
  group_id      UUID,
  body          TEXT,
  reply_to_id   UUID | null,
  quote_body    TEXT | null,
  quote_author  TEXT | null,
  is_deleted    BOOLEAN,
  is_admin_post BOOLEAN,   -- added in community_v2
  likes_count   INTEGER,   -- added in community_v2
  views_count   INTEGER,   -- added in community_v2
  created_at    TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ
);
```

**Fix**: Add full `community_messages` table definition.

---

### Table 4: `flagged_questions` — missing `status`, `reason`, `details` columns

**Used by**: `app/api/admin/flagged/resolve/route.ts` line 71 — `.update({ status: 'resolved' })`.

From `20260626000005_update_flagged_questions.sql`:
```sql
ALTER TABLE flagged_questions
  ADD COLUMN IF NOT EXISTS reason TEXT,
  ADD COLUMN IF NOT EXISTS details TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
```

The existing `flagged_questions.Row` has only `id, student_id, question_id, flagged_at`. It needs `status`, `reason`, and `details` added.

**Fix**: Extend `flagged_questions.Row` and `Update` with `status: string | null`, `reason: string | null`, `details: string | null`.

---

### Table 5: `question_uploads` — entirely missing from database.types.ts

**Used by**: `app/api/admin/set-plan/route.ts` — queries `question_uploads` for `.select('id, status, email_sent')` and `.update({ status, admin_note, reviewed_by, reviewed_at })`.

From `20260524000004_daily_weekly_plans_and_uploads.sql`:
```sql
CREATE TABLE IF NOT EXISTS question_uploads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id      UUID REFERENCES profiles NOT NULL,
  file_urls       TEXT[] NOT NULL,
  file_names      TEXT[] NOT NULL,
  file_count      INTEGER NOT NULL,
  status          TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'duplicate')) DEFAULT 'pending',
  rejection_reason TEXT,
  admin_note      TEXT,
  reviewed_by     UUID REFERENCES profiles,
  reviewed_at     TIMESTAMPTZ,
  email_sent      BOOLEAN DEFAULT FALSE,
  submitted_at    TIMESTAMPTZ DEFAULT NOW()
);
```

**Fix**: Add full `question_uploads` table definition.

---

### Table 6: `platform_settings` — entirely missing from database.types.ts

**Used by**: `app/api/admin/settings/route.ts` — `.update(payload.data).eq('id', 1)` where payload includes fields like `allow_tutor_custom_pricing`, `krchn_hourly_rate`, etc.

From `20260707120000_dynamic_pricing_and_anonymity.sql` plus `20260728150000_hd_materials_feature.sql`:
```sql
CREATE TABLE IF NOT EXISTS platform_settings (
    id integer PRIMARY KEY DEFAULT 1,
    allow_tutor_custom_pricing boolean DEFAULT false,
    krchn_hourly_rate numeric DEFAULT 1500,
    bscn_hourly_rate numeric DEFAULT 1800,
    plan_daily_price numeric DEFAULT 99,
    plan_weekly_price numeric DEFAULT 499,
    plan_standard_price numeric DEFAULT 1199,
    plan_premium_price numeric DEFAULT 3500,
    hd_material_price integer DEFAULT 500,        -- added in hd_materials_feature
    created_at timestamptz,
    updated_at timestamptz,
    CONSTRAINT single_row CHECK (id = 1)
);
```

**Fix**: Add full `platform_settings` table definition.

---

### Additional TypeScript Issue: `set-plan/route.ts` null guard

**Error lines**: `set-plan/route.ts:53` — three TS18047 (`upload` is possibly `null`).

The variable `upload` is typed as `{ id: string; status: string; email_sent: boolean | null } | null` and on line 53 it's used without a null check inside an `if (uploadId)` branch. The fix is adding `&& upload !== null` to the condition on line 53 that checks `upload.status`, matching the existing null pattern already used in the route.

---

### Ordered Fix Steps (Part 1)

- [ ] 1. Add the 6 missing/incomplete table definitions to `lib/types/database.types.ts`.
        Extend `notifications.Row/Insert` with `is_broadcast`, `read_count`, `target_role`.
        Add `tutor_messages`, `community_messages`, `question_uploads`, `platform_settings` as new table entries.
        Extend `flagged_questions.Row/Update` with `status`, `reason`, `details`.
        **Files**: `lib/types/database.types.ts`
        **Verify**: `npm run typecheck` — the 24 errors in the 7 admin routes drop to zero. No new errors introduced.

- [ ] 2. Fix the null-guard TypeScript error in `set-plan/route.ts`.
        On the line that reads `if (!upload || upload.status === 'pending') {` (line ~53), this is fine as written but TS cannot narrow it after the earlier `return` guard. The root cause is that `upload` is typed as `{ id; status; email_sent } | null`. The question_uploads table definition added in step 1 will resolve most of these via the typed client. If TS errors 53, 58, 59, 62, 68, 75, 76, 79, 80, 86 persist after step 1 (because the route uses `.maybeSingle()` which still returns `T | null`), add an explicit null-narrowing guard: `if (!upload) { ... already handled above ... }` is already present; the remaining errors at lines 58+ are inside `if (!upload || upload.status === 'pending')` which is safe. If TS still complains, cast the local `upload` variable type explicitly after the null check.
        **Files**: `app/api/admin/set-plan/route.ts`
        **Verify**: `npm run typecheck` — zero errors.

---

## Part 2: Performance Optimizations

### P0 — Highest Impact

- [ ] 3. **Parallelize login page auth check** (login/page.tsx — sequential DB calls on sign-in).
        After `signInWithPassword` succeeds, the login form does two sequential awaits: `supabase.auth.signInWithPassword` → then `supabase.from('profiles').select('role')` → then (for tutors only) `supabase.from('tutor_profiles').select(...)`. The profile fetch is sequential but only one query, so it's not a bottleneck. However for **tutor login**, there are two sequential DB queries after auth. Wrap the tutor path in a `Promise.all`: fetch `profiles` (role) and `tutor_profiles` (verification status) simultaneously in a single `Promise.all` for any login attempt (not just tutor), since we don't know the role until after the first query. **Risk**: The role must be known before choosing which second query to fire. The safest optimization is to always fire `profiles.select('role')` after sign-in as currently done (1 query, already fast), then only fire `tutor_profiles` for tutors. No further parallelization is possible here without over-fetching. **Verdict**: Leave the login page as-is; the sequential queries are role-conditional and cannot be parallelized without knowing role first. Documented as already optimal.

- [ ] 4. **Add `priority` prop to above-the-fold Next.js `<Image>` components**.
        Audit `(marketing)` pages and the `NurseFitiLogo` component (used on login/signup pages) for `<Image>` tags that are above the fold but lack `priority`. The NurseFitiLogo renders an `<img>` element (or SVG inline) — verify whether it uses `next/image` with `priority`.
        **Files to check and update**: Search `components/shared/NurseFitiLogo.tsx`, any hero images in `app/(marketing)/**/*.tsx`.
        **Files**: `components/shared/NurseFitiLogo.tsx` and any marketing hero images.
        **Verify**: `npm run typecheck` passes, `npm run build` succeeds.

- [ ] 5. **Dashboard parallel fetch is already optimal** — the client-side `fetchDashboardData` already uses `Promise.all` with 9 parallel queries (confirmed in `dashboard/page.tsx` lines ~100–110). No change needed here.

---

### P1 — Meaningful Wins

- [ ] 6. **Add Suspense boundary to the login page's `<LoginForm>` component**.
        The login page already correctly wraps `<LoginForm>` in `<Suspense>` (visible at the bottom of `app/(auth)/login/page.tsx`). This is already done correctly.

- [ ] 7. **Middleware static-asset exclusion audit**.
        The middleware `config.matcher` already correctly excludes `_next/static`, `_next/image`, `favicon.ico`, images (svg, png, jpg, etc.), and `api/` routes:
        ```js
        matcher: ['/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)']
        ```
        This is already optimal — no changes needed.

- [ ] 8. **Middleware: add `.ico` and font extensions to static exclusion**.
        The current matcher excludes common image extensions but not font files (`.woff`, `.woff2`, `.ttf`) or `.ico` (only `favicon.ico` by exact name). Add font extensions to the regex so middleware never runs on font requests.
        **Files**: `middleware.ts`
        **Change**: Update the `matcher` regex to:
        ```
        '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt|ico|woff|woff2|ttf|eot|otf)$).*)'
        ```
        **Risk**: Low. This only skips middleware for font file requests, which should never require auth checks.
        **Verify**: `npm run typecheck` passes. Confirm in the browser that auth still works on protected routes.

---

### P2 — Moderate Wins (safe, no API changes)

- [ ] 9. **Lazy-load `FeedbackWall` and `FeedbackWidget` on the dashboard with `next/dynamic`**.
        Both components are below the fold on the dashboard and non-critical for initial render. They currently load synchronously, adding to the JS bundle for the first paint.
        **Files**: `app/(student)/dashboard/page.tsx`
        **Change**:
        ```ts
        import dynamic from 'next/dynamic';
        const FeedbackWidget = dynamic(() => import('@/components/shared/FeedbackWidget').then(m => ({ default: m.FeedbackWidget })), { ssr: false });
        const FeedbackWall = dynamic(() => import('@/components/shared/FeedbackWall').then(m => ({ default: m.FeedbackWall })), { ssr: false });
        ```
        Remove the existing static imports for `FeedbackWidget` and `FeedbackWall`.
        **Risk**: These are client-only widgets (`"use client"`). `ssr: false` prevents hydration mismatches.
        **Verify**: `npm run build` succeeds with no errors. Dashboard still shows the feedback components after scrolling down.

- [ ] 10. **Lazy-load `AppRatingModal` with `next/dynamic`**.
        `AppRatingModal` is imported statically on the dashboard but only shown on a delayed timer/trigger — it is never part of the initial paint.
        **Files**: `app/(student)/dashboard/page.tsx`
        **Change**:
        ```ts
        const AppRatingModal = dynamic(() => import('./AppRatingModal').then(m => ({ default: m.AppRatingModal })), { ssr: false });
        ```
        Remove the existing static import.
        **Risk**: Low. The component is gated behind a modal trigger, not rendered until user interaction.
        **Verify**: `npm run build` succeeds. The app rating modal still appears when triggered.

- [ ] 11. **Lazy-load `WhatsNewProvider` and `OnboardingTourGate` in student layout**.
        Both components in `app/(student)/layout.tsx` are secondary UX layers (tour and what's-new modal). They do not affect the first meaningful paint. Lazy-loading them reduces the server-rendered HTML and initial JS.
        **Files**: `app/(student)/layout.tsx`
        **Change**:
        ```ts
        const OnboardingTourGate = dynamic(() => import('@/components/student/OnboardingTourGate').then(m => ({ default: m.OnboardingTourGate })), { ssr: false });
        const WhatsNewProvider = dynamic(() => import('@/components/student/WhatsNewProvider').then(m => ({ default: m.WhatsNewProvider })), { ssr: false });
        ```
        Keep `Sidebar`, `Topbar`, `BadgeProvider`, `ActivityTracker` as static imports — these are required at first paint.
        **Risk**: Low. Both components are only shown after the main content loads and are not layout-critical.
        **Verify**: `npm run build` and `npm run typecheck` pass. Onboarding tour and what's-new modal still function.

- [ ] 12. **next.config.mjs: enable `compress` and verify image optimization settings**.
        Next.js has `compress: true` by default. The current config already has `formats: ['image/avif', 'image/webp']` and `optimizePackageImports` for recharts/framer-motion. No changes needed here — config is already well-optimized.

---

### P3 — Report Only (do NOT fix — require schema/architecture changes)

The following N+1 patterns exist but fixing them would require either schema changes or component API changes that fall outside the scope of this task:

1. **Admin students page** (`/api/admin/data?type=students`): loads ALL students at once without pagination. With thousands of users this will slow down and hit Supabase row limits. Fix requires adding server-side pagination (limit/offset params) to the API and infinite scroll or page controls to the frontend. Deferred — not safe to change without UI changes.

2. **Dashboard `fetchDashboardData`**: queries `flashcard_progress` counting ALL rows for that user with `.select('id')` (line: `supabase.from('flashcard_progress').select('id').eq('student_id', user.id)`). As the user reviews thousands of cards this row count grows. Fix: use `{ count: 'exact', head: true }` for a COUNT query instead of fetching all rows. **This is safe to fix** — see item 13 below.

- [ ] 13. **Fix flashcard count query to use COUNT instead of fetching all rows** (dashboard).
        **Files**: `app/(student)/dashboard/page.tsx`
        **Change**: Replace:
        ```ts
        supabase.from('flashcard_progress').select('id').eq('student_id', user.id),
        ```
        With:
        ```ts
        supabase.from('flashcard_progress').select('id', { count: 'exact', head: true }).eq('student_id', user.id),
        ```
        And update the data access from `flashRes.data?.length ?? 0` to `flashRes.count ?? 0`.
        Same optimization for `mock_exam_results`:
        ```ts
        supabase.from('mock_exam_results').select('id', { count: 'exact', head: true }).eq('student_id', user.id),
        ```
        And `mockRes.data?.length ?? 0` → `mockRes.count ?? 0`.
        **Risk**: Low. Both are read-only stat counts. The count value is functionally identical.
        **Verify**: `npm run typecheck` passes. Dashboard still shows correct mock exam and flashcard counts.

---

## Execution Order (dependency-aware)

1. Step 1 — fix database.types.ts (unblocks steps 2, and is prerequisite for correct typing)
2. Step 2 — fix set-plan null guard (depends on step 1 for the typed client)
3. Steps 3–6 — verify existing implementations are already optimal (no code changes)
4. Step 8 — middleware matcher update (standalone, safe)
5. Step 9 — lazy-load FeedbackWall/FeedbackWidget (standalone)
6. Step 10 — lazy-load AppRatingModal (standalone)
7. Step 11 — lazy-load layout providers (standalone)
8. Step 13 — fix COUNT queries on dashboard (standalone)

**Final verification after all steps**: `npm run typecheck` → 0 errors. `npm run build` → clean build.

---

## Risks and Skipped Items

| Item | Risk | Decision |
|------|------|----------|
| Login page sequential DB calls | Queries are role-conditional; can't parallelize without over-fetching | Skip |
| Admin students pagination | Requires frontend UI changes | Report only (P3) |
| Route logic changes | Out of scope; only types/imports changed | Not touched |
| `next.config.mjs` compress/images | Already optimal | No change |
| Middleware auth logic | Correct and already well-structured | No change |
| `<Image priority>` on logo | NurseFitiLogo uses SVG/CSS logo, not `<Image>` — verify in step 4 | Verify then act |
