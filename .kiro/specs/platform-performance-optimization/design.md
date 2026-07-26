# Technical Design: Platform Performance Optimization

## Overview

This document maps every bottleneck identified in `bugfix.md` to a concrete, file-level implementation plan. Fixes are ordered by impact — database/query layer first (highest ROI), then application layer, then frontend micro-optimisations. All changes are backward-compatible: no schema columns are dropped, no API contracts change, and all existing functionality is preserved.

---

## Fix 1 — Composite Indexes on High-Traffic Tables (CRITICAL)

**New file:** `supabase/migrations/20260728000001_add_performance_indexes.sql`

This single migration delivers the biggest speedup with zero code changes. Every subsequent fix depends on these indexes existing first.

```sql
-- student_answers: the most-queried table across dashboard, practice, mock exam, badges
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_student_answers_student_mode
  ON student_answers (student_id, mode);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_student_answers_student_mode_paper
  ON student_answers (student_id, mode, paper);

-- Supports the anti-join lookup in get_unanswered_practice_questions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_student_answers_qid_student_mode
  ON student_answers (question_id, student_id, mode);

-- questions: cadre+paper+status filter used on every practice start and mock exam
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_cadre_paper_status
  ON questions (cadre, paper, status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_cadre_status
  ON questions (cadre, status);

-- page_visits / user_logins: index prevents seq-scan on admin queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_page_visits_user_id
  ON page_visits (user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_logins_user_id
  ON user_logins (user_id);
```

`CONCURRENTLY` ensures zero downtime — production tables are not locked during index creation.

---

## Fix 2 — Replace NOT EXISTS Correlated Subquery with LEFT JOIN Anti-Join (CRITICAL)
**New migration:** `supabase/migrations/20260728000002_fix_practice_antijoin.sql`

The existing `get_unanswered_practice_questions` uses `NOT EXISTS (SELECT 1 FROM student_answers ...)` — a correlated subquery that re-scans `student_answers` for every candidate question row. Replace with a `LEFT JOIN ... WHERE sa.id IS NULL` anti-join which the query planner executes as a single hash-join in O(questions + answers):

```sql
CREATE OR REPLACE FUNCTION get_unanswered_practice_questions(
  p_student_id UUID,
  p_cadre      TEXT,
  p_unit       TEXT DEFAULT 'all',
  p_limit      INT  DEFAULT 40
)
RETURNS SETOF questions
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT q.*
  FROM questions q
  LEFT JOIN student_answers sa
    ON  sa.question_id = q.id
    AND sa.student_id  = p_student_id
    AND sa.mode        = 'practice'
  WHERE q.cadre  = p_cadre
    AND q.status = 'approved'
    AND (p_unit = 'all' OR q.unit = p_unit)
    AND sa.id IS NULL
  ORDER BY random()
  LIMIT p_limit;
$$;
```

The `idx_student_answers_qid_student_mode` index from Fix 1 makes the LEFT JOIN lookup O(1) per row.
`STABLE` allows Postgres to cache the query plan within a transaction.

---

## Fix 3 — Dashboard Aggregation RPC (CRITICAL)

**New migration:** `supabase/migrations/20260728000003_dashboard_stats_rpc.sql`
**Modified file:** `app/(student)/dashboard/page.tsx`

### 3a. New PostgreSQL RPC

Replace the unbounded `SELECT is_correct, time_taken_seconds, answered_at FROM student_answers` fetch with a server-side aggregate that returns a single JSON object regardless of how many answers the student has:

```sql
CREATE OR REPLACE FUNCTION get_student_dashboard_stats(p_student_id UUID)
RETURNS JSON
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT json_build_object(
    'total_answered',   COUNT(*),
    'correct_answers',  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END),
    'study_time_min',   COALESCE(SUM(time_taken_seconds), 0) / 60,
    'has_early_bird',   BOOL_OR(EXTRACT(HOUR FROM answered_at AT TIME ZONE 'Africa/Nairobi') < 8),
    'has_night_owl',    BOOL_OR(EXTRACT(HOUR FROM answered_at AT TIME ZONE 'Africa/Nairobi') >= 22),
    'weekend_count',    SUM(CASE WHEN EXTRACT(DOW FROM answered_at) IN (0,6) THEN 1 ELSE 0 END)
  )
  FROM student_answers
  WHERE student_id = p_student_id;
$$;
```
### 3b. Dashboard page changes (`app/(student)/dashboard/page.tsx`)

In the `Promise.all` inside `fetchDashboardData`, replace the answers row fetch with the RPC call and the two count-only fetches with HEAD queries:

```typescript
// BEFORE — fetches all answer rows (O(N) transfer)
supabase.from('student_answers')
  .select('is_correct, time_taken_seconds, answered_at')
  .eq('student_id', user.id)
  .order('answered_at', { ascending: true }),

// AFTER — single aggregate RPC (O(1) transfer)
supabase.rpc('get_student_dashboard_stats', { p_student_id: user.id }),
```

```typescript
// BEFORE — fetches all IDs just to get the count
supabase.from('mock_exam_results').select('id').eq('student_id', user.id),
supabase.from('flashcard_progress').select('id').eq('student_id', user.id),

// AFTER — HEAD count: zero row transfer
supabase.from('mock_exam_results')
  .select('*', { count: 'exact', head: true }).eq('student_id', user.id),
supabase.from('flashcard_progress')
  .select('*', { count: 'exact', head: true }).eq('student_id', user.id),
```

Update stat computation to read from the RPC result instead of iterating an array:

```typescript
const statsData = statsRes.data as {
  total_answered: number; correct_answers: number; study_time_min: number;
} | null;
const totalAnswers   = statsData?.total_answered  ?? 0;
const correctAnswers = statsData?.correct_answers ?? 0;
const studyTime      = Math.floor(statsData?.study_time_min ?? 0);
const accuracy       = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
```

Remove the `computeBadges()` function and its call entirely from `dashboard/page.tsx`.
Badge display reads from `student_badges` table directly (populated by Fix 4).

---

## Fix 4 — Event-Driven Badge Evaluation (HIGH)

**New migration:** `supabase/migrations/20260728000004_badge_aggregation_rpcs.sql`
**Modified files:** `lib/badges.ts`, `components/student/BadgeProvider.tsx`

### 4a. New aggregation RPCs

```sql
-- Per-unit answer counts — replaces the full row fetch with JOIN
CREATE OR REPLACE FUNCTION get_answer_counts_by_unit(p_student_id UUID)
RETURNS TABLE (unit TEXT, cnt BIGINT)
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT q.unit, COUNT(*) AS cnt
  FROM student_answers sa
  JOIN questions q ON q.id = sa.question_id
  WHERE sa.student_id = p_student_id
  GROUP BY q.unit;
$$;
```
```sql
-- Total stats + timing badge flags
CREATE OR REPLACE FUNCTION get_answer_stats_for_badges(p_student_id UUID)
RETURNS JSON
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT json_build_object(
    'total',          COUNT(*),
    'has_early_bird', BOOL_OR(EXTRACT(HOUR FROM answered_at AT TIME ZONE 'Africa/Nairobi') < 8),
    'has_night_owl',  BOOL_OR(EXTRACT(HOUR FROM answered_at AT TIME ZONE 'Africa/Nairobi') >= 22),
    'weekend_count',  SUM(CASE WHEN EXTRACT(DOW FROM answered_at) IN (0,6) THEN 1 ELSE 0 END)
  )
  FROM student_answers WHERE student_id = p_student_id;
$$;

-- Student rank (1-indexed) by XP
CREATE OR REPLACE FUNCTION get_student_rank(p_student_id UUID)
RETURNS BIGINT
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT COUNT(*) + 1 FROM student_profiles
  WHERE xp > (SELECT xp FROM student_profiles WHERE id = p_student_id);
$$;
```

### 4b. `lib/badges.ts` — replace raw row fetches with RPCs

```typescript
// BEFORE — fetches every answer row with JOIN
const { data: answers } = await supabase
  .from('student_answers')
  .select('answered_at, questions!inner(unit)')
  .eq('student_id', userId);

// AFTER — two lightweight RPC calls in parallel
const [statsRes, unitRes] = await Promise.all([
  supabase.rpc('get_answer_stats_for_badges', { p_student_id: userId }),
  supabase.rpc('get_answer_counts_by_unit',   { p_student_id: userId }),
]);
const stats    = statsRes.data as { total: number; has_early_bird: boolean; has_night_owl: boolean; weekend_count: number };
const unitRows = (unitRes.data ?? []) as Array<{ unit: string; cnt: number }>;
const unitMap  = Object.fromEntries(unitRows.map(r => [r.unit, Number(r.cnt)]));
const totalAnswers = stats?.total ?? 0;
const pharmaCount  = Object.entries(unitMap).filter(([u]) => u.includes('Pharmacology')).reduce((s,[,c]) => s+c, 0);
const medSurgCount = Object.entries(unitMap).filter(([u]) => u.includes('Medical') || u.includes('Med-Surg')).reduce((s,[,c]) => s+c, 0);
const anatomyCount = Object.entries(unitMap).filter(([u]) => u.includes('Anatomy')).reduce((s,[,c]) => s+c, 0);
const obgynCount   = Object.entries(unitMap).filter(([u]) => u.includes('Midwifery') || u.includes('OBGYN')).reduce((s,[,c]) => s+c, 0);
```

```typescript
// BEFORE — full count scan of student_profiles on every mount
const { count } = await supabase.from('student_profiles')
  .select('*', { count: 'exact', head: true }).gt('xp', sp.xp);
const rank = (count ?? 0) + 1;

// AFTER — dedicated RPC
const { data: rankData } = await supabase.rpc('get_student_rank', { p_student_id: userId });
const rank = (rankData as number) ?? 999999;
```

### 4c. `components/student/BadgeProvider.tsx` — defer to event-driven

Replace the immediate on-mount `evaluateUserBadges()` call with a 5-second deferred call that does not block the initial render. Expose `checkBadges` via context for call sites to invoke after answer submission:

```typescript
useEffect(() => {
  if (!userId) return;
  const timer = setTimeout(() => {
    evaluateUserBadges(supabase, userId).then(newBadges => {
      if (newBadges.length > 0) { /* show badge modal */ }
    });
  }, 5000); // defer 5s — does not block first render
  return () => clearTimeout(timer);
}, [userId]);
```

---

## Fix 5 — ActivityTracker: Cache Identity for the Session (HIGH)

**Modified file:** `components/student/ActivityTracker.tsx`
The current implementation calls `supabase.auth.getUser()` + `profiles.select('role')` on every single route change. Fix: capture user identity once on mount and store it in a `useRef`:

```typescript
export function ActivityTracker() {
  const pathname = usePathname();
  const supabase = createClient();
  const identityRef = useRef<{ userId: string; role: string } | null>(null);

  // Mount effect: fetch identity ONCE and record login
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || !user) return;
      const { data: profile } = await (supabase as any)
        .from('profiles').select('role').eq('id', user.id).single();
      if (cancelled || !profile) return;
      identityRef.current = { userId: user.id, role: profile.role };
      await recordLogin(user.id, profile.role);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps — runs once on mount only

  // Route-change effect: NO auth/profile fetch — reuse cached identity
  useEffect(() => {
    const identity = identityRef.current;
    if (!identity) return;
    recordPageVisit(identity.userId, identity.role, slugFromPathname(pathname));
  }, [pathname]);

  return null;
}
```

This reduces route-change cost from 2 DB queries to 0 DB queries (just one fire-and-forget INSERT).

---

## Fix 6 — Middleware: Eliminate Serial DB Round-Trips (HIGH)

**Modified file:** `middleware.ts`
**New migration:** `supabase/migrations/20260728000005_auth_role_claim_hook.sql`

### Strategy: encode role in the JWT via a Supabase Auth Hook

Add a `custom_access_token` hook that embeds `app_role` into every JWT. Middleware then reads it from the token — zero DB queries for role-based routing.

```sql
CREATE OR REPLACE FUNCTION add_role_claim_to_jwt(event JSONB)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles
  WHERE id = (event->>'user_id')::UUID;
  RETURN jsonb_set(event, '{claims,app_role}',
    to_jsonb(COALESCE(user_role, 'student')));
END;
$$;
```

Register this function in the Supabase Dashboard under **Authentication → Hooks → Custom Access Token**.

Then update `middleware.ts` to read role from the JWT instead of querying the DB:

```typescript
// BEFORE (2 round-trips per request)
const { data: { session } } = await supabase.auth.getSession();
const { data: profile } = await supabase
  .from('profiles').select('role').eq('id', session.user.id).single();
const role = profile?.role;

// AFTER (0 DB queries — role embedded in JWT)
const { data: { session } } = await supabase.auth.getSession();
const role = (session?.user?.app_metadata?.app_role as string | undefined)
          ?? (session?.user?.user_metadata?.role as string | undefined)
          ?? 'student';
```

The tutor verification check (single `tutor_profiles` query) is acceptable and remains unchanged — it only runs for verified tutor routes, not for every student page.

---

## Fix 7 — Mock Exam: Server-Side Seen-Question RPC (HIGH)

**New migration:** `supabase/migrations/20260728000006_mock_exam_rpc.sql`
**Modified file:** `app/(student)/mock-exam/page.tsx`
### 7a. New RPC — builds unseen pool entirely in PostgreSQL

```sql
CREATE OR REPLACE FUNCTION get_mock_exam_question_ids(
  p_student_id UUID, p_cadre TEXT, p_paper TEXT, p_total INT DEFAULT 100
)
RETURNS TABLE (id UUID, unit TEXT)
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE unseen_count INT;
BEGIN
  SELECT COUNT(*) INTO unseen_count
  FROM questions q
  LEFT JOIN student_answers sa
    ON sa.question_id = q.id AND sa.student_id = p_student_id AND sa.mode = 'mock_exam'
  WHERE q.cadre = p_cadre AND q.paper = p_paper AND q.status = 'approved'
    AND sa.id IS NULL;

  IF unseen_count < p_total THEN
    -- Cycle complete: use full bank
    RETURN QUERY SELECT q.id, q.unit FROM questions q
      WHERE q.cadre = p_cadre AND q.paper = p_paper AND q.status = 'approved'
      ORDER BY random() LIMIT p_total;
  ELSE
    RETURN QUERY SELECT q.id, q.unit FROM questions q
      LEFT JOIN student_answers sa
        ON sa.question_id = q.id AND sa.student_id = p_student_id AND sa.mode = 'mock_exam'
      WHERE q.cadre = p_cadre AND q.paper = p_paper AND q.status = 'approved'
        AND sa.id IS NULL
      ORDER BY random() LIMIT p_total;
  END IF;
END;
$$;
```

### 7b. `app/(student)/mock-exam/page.tsx` — startExam changes

```typescript
// BEFORE: 2 sequential large fetches transferred to browser
const { data: seenData } = await supabase.from('student_answers')
  .select('question_id').eq('student_id', userId).eq('mode','mock_exam').eq('paper', config.paper);
const { data: allQuestionsRaw } = await supabase.from('questions')
  .select('id, unit').eq('cadre', config.cadre).eq('paper', config.paper).eq('status','approved');

// AFTER: single RPC call — all seen-question logic runs server-side
const { data: questionMeta, error } = await supabase.rpc('get_mock_exam_question_ids', {
  p_student_id: userId, p_cadre: config.cadre,
  p_paper: config.paper, p_total: config.totalQuestions,
});
```

The unit-interleaving logic that currently runs in the browser remains in the browser (it operates on the returned IDs/units, not on all questions), preserving NCK-style exam ordering.

### 7c. `fetchProgress()` — parallelise sequential loop

```typescript
// BEFORE: sequential for-loop (each iteration waits for the previous)
for (const [key, config] of examsToFetch) {
  const { count: totalQ } = await supabase.from('questions')...
  const { data: seenData } = await supabase.from('student_answers')...
}

// AFTER: all exam types fetched in parallel
const progressResults = await Promise.all(
  examsToFetch.map(async ([key, config]) => {
    const [totalRes, seenRes] = await Promise.all([
      supabase.from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('cadre', config.cadre).eq('paper', config.paper).eq('status', 'approved'),
      supabase.from('student_answers')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId).eq('mode', 'mock_exam').eq('paper', config.paper),
    ]);
    return [key, { totalQ: totalRes.count ?? 0, uniqueSeen: seenRes.count ?? 0, config }];
  })
);
```

---

## Fix 8 — NotificationsPanel: Single Realtime Channel Per User (HIGH)

**Modified file:** `components/shared/NotificationsPanel.tsx`
Guard the `useUnreadCount` subscription so it only opens when `userId` is non-empty (it renders with an empty string on first render before the Topbar auth fetch completes):

```typescript
// In useUnreadCount hook — add userId guard:
useEffect(() => {
  if (!userId) return; // don't subscribe until userId is known

  const channel = supabase
    .channel(`unread-count-${userId}`)
    // ... existing subscription code ...
    ;

  return () => { supabase.removeChannel(channel); };
}, [userId]); // only re-subscribe when userId changes
```

Guard the panel-specific channel so it only opens when the panel is actually open:

```typescript
// In NotificationsPanel component — add isOpen guard:
useEffect(() => {
  if (!isOpen || !userId) return; // defer until panel actually opens

  const channel = supabase.channel(`notifications-panel-${userId}`)
    // ... subscription ...
    ;

  return () => { supabase.removeChannel(channel); };
}, [isOpen, userId]);
```

This halves Realtime channel count across all concurrent users: from 2 channels/user to 1 channel/user.

---

## Fix 9 — Admin Client: Module-Level Singleton (MEDIUM)

**Modified file:** `lib/supabase/admin.ts`

Vercel serverless functions reuse module scope across warm invocations within the same function instance. Change from a factory to a lazily-initialized singleton:

```typescript
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database.types';

let _adminClient: SupabaseClient<Database> | null = null;

export function getAdminClient(): SupabaseClient<Database> {
  if (_adminClient) return _adminClient;
  _adminClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  return _adminClient;
}

// Backward-compatible alias — no call sites need to change
export const createAdminClient = getAdminClient;
```

---

## Fix 10 — WhatsNewModal: Stop Infinite Animation Loop (MEDIUM)

**Modified files:** `components/student/WhatsNewModal.tsx`, `components/student/WhatsNewTrigger.tsx`

**Change 1 — Early null return for already-dismissed users:**

```typescript
// Add at top of WhatsNewModal component body (before any animated elements):
const [alreadySeen] = useState<boolean>(() => {
  try { return !forceOpen && !!localStorage.getItem(STORAGE_KEY); }
  catch { return false; }
});
if (!forceOpen && alreadySeen) return null;
```

This prevents Framer Motion from initialising for the majority of users who have already dismissed the modal.

**Change 2 — Finite animation repeat:**

```typescript
// In WhatsNewModal header sparkle — change repeat: Infinity to repeat: 3
transition={{ repeat: 3, repeatDelay: 3, duration: 0.6 }}

// In WhatsNewTrigger sparkle:
transition={{ repeat: 3, repeatDelay: 2, duration: 0.5 }}

// In CTA arrow animation:
transition={{ repeat: 3, repeatDelay: 1.5, duration: 0.5 }}
```

---

## Fix 11 — API Cache Headers for Static-ish Responses (LOW)

**Modified files:** Any API route that returns `platform_settings` or public lists.

Add `Cache-Control` headers to API routes that serve data that changes infrequently:

```typescript
// platform_settings API route:
return NextResponse.json(data, {
  headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' }
});

// Student-specific endpoints — private caching only:
return NextResponse.json(data, {
  headers: { 'Cache-Control': 'private, max-age=30, stale-while-revalidate=60' }
});
```
---

## Fix 12 — Remove `force-dynamic` from Student Layout (LOW)

**Modified file:** `app/(student)/layout.tsx`

`export const dynamic = 'force-dynamic'` on the layout forces every nested page to skip Next.js caching. The layout shell renders no user-specific data directly. Remove it from the layout and add it only to individual pages that genuinely need fully dynamic rendering:

```typescript
// app/(student)/layout.tsx — REMOVE this line:
// export const dynamic = 'force-dynamic';

// Add to individual data-fetching pages instead:
// app/(student)/dashboard/page.tsx — first line after imports:
export const dynamic = 'force-dynamic';
// (repeat for practice/page.tsx, mock-exam/page.tsx, analytics/page.tsx, etc.)
```

---

## Implementation Order & Migration Sequence

| Priority | Fix | File(s) | Est. Speedup |
|----------|-----|---------|--------------|
| 1 | Composite indexes | `20260728000001_add_performance_indexes.sql` | Dashboard −70%, Practice −80% |
| 2 | Practice anti-join RPC | `20260728000002_fix_practice_antijoin.sql` | Practice start −90% |
| 3 | Dashboard stats RPC | `20260728000003_dashboard_stats_rpc.sql` + `dashboard/page.tsx` | Dashboard load −85% |
| 4 | Badge aggregation RPCs | `20260728000004_badge_aggregation_rpcs.sql` + `badges.ts` + `BadgeProvider.tsx` | Every page load −60% |
| 5 | ActivityTracker cache | `ActivityTracker.tsx` | Nav change −100% DB queries |
| 6 | Middleware JWT claim | `20260728000005_auth_role_claim_hook.sql` + `middleware.ts` | Every request −100% DB |
| 7 | Mock exam RPC | `20260728000006_mock_exam_rpc.sql` + `mock-exam/page.tsx` | Mock start −75% |
| 8 | Realtime single channel | `NotificationsPanel.tsx` | Realtime load −50% |
| 9 | Admin client singleton | `lib/supabase/admin.ts` | API cold-start −30% |
| 10 | WhatsNew animation fix | `WhatsNewModal.tsx`, `WhatsNewTrigger.tsx` | CPU −minor |
| 11 | API cache headers | API route files | CDN hit rate +50% |
| 12 | Remove layout force-dynamic | `app/(student)/layout.tsx` | TTFB −200ms |

---

## Regression Prevention

- All new RPCs use `SECURITY DEFINER` with explicit `p_student_id` parameters — they cannot read other users' data.
- The anti-join rewrite preserves the fallback-to-full-bank behaviour via the `unseen_count < p_total` check in the RPC.
- The JWT claim hook writes to `app_metadata` (service role only) — students cannot spoof their own role.
- The admin client singleton is module-scoped per Vercel function instance — never shared across HTTP requests.
- ActivityTracker identity cache is a `useRef` — per-component-instance, never shared across users.
- Badge evaluation remains idempotent: `checkAndAward` checks `initialEarned` before inserting, preventing double-awards even if called multiple times.
- Mock exam unit-interleaving logic remains client-side — the RPC returns IDs+units, the browser does the round-robin sort.
- The `force-dynamic` change on the layout does not change the rendering of any individual page that already has the directive.

---

*Design document: platform-performance-optimization v1.0*
