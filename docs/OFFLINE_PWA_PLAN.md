# NurseFiti — Offline PWA Master Plan

> **This document is the single source of truth for all offline/PWA work on NurseFiti.**
> Every implementation step must be cross-checked against this file before any code is written.
> **Golden Rule: No change may break any existing feature for online users.**

---

## Project Snapshot (as of June 2026)

| Property | Value |
|---|---|
| Framework | Next.js 14.2.3 (App Router) |
| Backend | Supabase (PostgreSQL + Auth + Storage + RPCs) |
| Styling | Tailwind CSS 3 + custom CSS variables |
| Auth | Supabase SSR (`@supabase/ssr`) with middleware |
| Key lib | `next-themes`, `react-hot-toast`, `recharts`, `framer-motion` |
| Roles | `student`, `tutor`, `admin` (separate route groups) |
| Deployment | Vercel |

### Student Routes Eligible for Offline Support

| Route | Priority | Offline Value |
|---|---|---|
| `/dashboard` | High | Show cached XP, streak, progress |
| `/practice` | **Critical** | Core study loop — must work offline |
| `/mock-exam` | High | Timed exam — needs careful offline handling |
| `/flashcards` | **Critical** | Core study loop — must work offline |
| `/revision-plan` | Medium | Read-only plan viewing |
| `/analytics` | Low | Read-only charts from cached data |
| `/achievements` | Low | Read-only badges |
| `/groups` | Low | Community — needs live connection ideally |
| `/bookings` | None | Payment/booking — must always be online |
| `/settings` | None | Account changes — must always be online |

---

## The Three Layers

---

### LAYER 1 — PWA Shell (Installability & Offline App Frame)

**Goal:** The app loads and shows the correct UI even with zero internet. Users can install NurseFiti on their home screen like a native app.

**What changes:**
- Add a Web App Manifest (`/public/manifest.json`)
- Add app icons in multiple sizes (`/public/icons/`)
- Register a Service Worker via `@serwist/next` (the maintained successor to `next-pwa` for Next.js 14 App Router)
- Cache all static assets: JS bundles, CSS, fonts, images
- Show a friendly "You are offline" notice when a page needs live data but can't get it

**What does NOT change:**
- Zero changes to any existing page logic
- Zero changes to Supabase client calls
- Zero changes to middleware or auth flow
- The Service Worker only intercepts static asset requests in Layer 1

**Files created (Layer 1 only):**

```
public/
  manifest.json              <- App identity (name, icons, theme colour)
  icons/
    icon-192.png
    icon-512.png
    icon-maskable-512.png
app/
  sw.ts                      <- Service Worker entry point (compiled by serwist)
  layout.tsx                 <- Add <link rel="manifest"> + SW registration (additive only)
lib/
  offline/
    register-sw.ts           <- Client-side SW registration hook
```

**Package added:**
```
@serwist/next        <- Service worker wrapper for Next.js 14 App Router
serwist              <- Core service worker library
```

**`next.config.mjs` change (additive only):**
```js
// Wrap existing config with withSerwist()
// The existing withMDX() chain is preserved inside
import withSerwist from '@serwist/next';
```

**Safety checklist for Layer 1:**
- [ ] Service Worker registered only in production build (`process.env.NODE_ENV === 'production'`)
- [ ] Service Worker registration is non-blocking (does not affect page load time)
- [ ] All existing Supabase API calls continue to work online without any change
- [ ] Auth middleware (`middleware.ts`) is completely untouched
- [ ] `withMDX` config wrapper is preserved when adding `withSerwist`

---

### LAYER 2 — Offline Data Cache (Questions, Flashcards, Profile)

**Goal:** When a student opens the Practice or Flashcards page offline, they see their downloaded questions and can study. No internet required.

**How it works:**
1. On first successful login, silently pre-fetch and store in **IndexedDB**:
   - The student's assigned questions (filtered by their cadre)
   - All flashcard decks and their cards
   - The student's current profile (XP, level, streak)
2. When the Practice or Flashcards page loads:
   - Try Supabase first (online path — unchanged)
   - If Supabase fails (offline), fall back to IndexedDB
3. Answers made offline are stored in an **"outbox"** queue in IndexedDB (handled in Layer 3)

**IndexedDB schema (via Dexie.js):**

```
nursefiti_offline_db (version 1)
+-- questions          [id, cadre, unit, stem, options, correct_option, rationale, cached_at]
+-- flashcard_decks    [id, name, unit, card_count, cached_at]
+-- flashcards         [id, deck_id, front_text, back_text, back_highlight, unit, cached_at]
+-- student_profile    [id, xp, level, streak_count, last_study_date, cadre, plan_tier, cached_at]
+-- answer_outbox      [id (uuid), question_id, selected_option, is_correct, mode, unit, xp_delta, created_at, synced]
```

**Package added:**
```
dexie               <- IndexedDB wrapper (tiny, well-maintained, TypeScript-first)
```

**Files created (Layer 2):**

```
lib/
  offline/
    db.ts                    <- Dexie database schema & instance (singleton)
    cache-questions.ts       <- Fetch + store questions for student's cadre
    cache-flashcards.ts      <- Fetch + store all decks and cards
    cache-profile.ts         <- Fetch + store student profile snapshot
    use-offline-status.ts    <- React hook: returns { isOnline: boolean }
```

**Files modified (additive — online path untouched):**

| File | Change |
|---|---|
| `app/(student)/practice/page.tsx` | Add: if Supabase fetch fails -> fall back to IndexedDB questions. Online path unchanged. |
| `app/(student)/flashcards/page.tsx` | Add: if Supabase fetch fails -> fall back to IndexedDB cards. Online path unchanged. |
| `app/(student)/dashboard/page.tsx` | Add: show stale profile (XP, streak) from IndexedDB when offline. |
| `app/(student)/layout.tsx` | Add: trigger background cache refresh on mount (online only, non-blocking). |

**The fallback pattern (used in every page):**

```typescript
// PATTERN: Try online first, fall back to cache. Online path is NEVER modified.
let questions = null;
const { data, error } = await supabase.from('questions').select(...);
if (error || !data) {
  // Only reach here if offline or Supabase is down
  questions = await offlineDb.questions.where('cadre').equals(studentCadre).toArray();
} else {
  questions = data;
  // Silently refresh the cache in the background
  cacheQuestions(studentCadre).catch(() => {}); // never throws
}
```

**Safety checklist for Layer 2:**
- [ ] The online path (Supabase queries) is **never modified** — fallback only adds an `if (error)` branch
- [ ] Cache writes are always non-blocking (`Promise` + `.catch(() => {})`)
- [ ] Cache is keyed by `cadre` — a student only downloads questions relevant to them
- [ ] Cache expiry: `cached_at` timestamp. Questions older than **7 days** are re-fetched on next online session
- [ ] Plan tier limits still enforced from cached profile (`plan_tier` stored locally)
- [ ] No cached data is ever sent to another student

---

### LAYER 3 — Background Sync (Answers, XP, Streaks)

**Goal:** When a student answers questions offline, those answers are stored locally and automatically synced to Supabase the moment connectivity is restored.

**How it works:**
1. Every answered question is written to `answer_outbox` in IndexedDB first (both online and offline)
2. Online: outbox flushes immediately to Supabase (`student_answers` insert + `update_student_xp` RPC)
3. Offline: outbox items remain with `synced = false`
4. On reconnect, the `use-offline-status` hook detects the network returning and triggers a flush
5. The `update_student_xp` RPC (already built and deployed) handles XP atomically — no double-counting

**Files created (Layer 3):**

```
lib/
  offline/
    answer-outbox.ts         <- Write to outbox, flush outbox, mark items synced
    use-sync-on-reconnect.ts <- Hook: listens to window 'online' event, flushes outbox
```

**Files modified (additive):**

| File | Change |
|---|---|
| `app/(student)/practice/page.tsx` | `handleAnswer()`: write to outbox first, then flush if online. Online path still uses Supabase directly. |
| `app/(student)/flashcards/page.tsx` | `rate()`: same outbox pattern. |
| `app/(student)/layout.tsx` | Mount `use-sync-on-reconnect` hook once for the whole student section. |

**The outbox flush sequence:**

```
for each unsynced item in answer_outbox:
  1. INSERT into student_answers (Supabase)
  2. Call update_student_xp RPC with item.xp_delta
  3. Mark item as synced = true in IndexedDB
  4. If any step fails -> leave item in outbox, retry next sync
```

**Safety checklist for Layer 3:**
- [ ] XP is **never double-counted**: the `update_student_xp` RPC uses `FOR UPDATE` lock. If an online answer already wrote XP, the outbox entry is marked synced before flush
- [ ] Outbox is cleared of items older than **30 days** on each flush to prevent unbounded growth
- [ ] Mock exam answers: Mock exams are **not queued offline**. They require a live connection for integrity. An offline notice is shown if the student tries to start one without internet
- [ ] Bookings, payments, settings: completely excluded from outbox
- [ ] Community posts: excluded from outbox (requires live connection)

---

## What Is NEVER Offline

The following features must always require an active internet connection. No offline fallback will be built for them. If offline, a clear message is shown and the action is blocked:

| Feature | Reason |
|---|---|
| Mock Exam submission | Server-side integrity, week limits |
| Tutor bookings | Payment processing (Intasend) |
| Payment/upgrade | Intasend API |
| Community posts & messages | Real-time, anti-spam |
| Admin panel | Security-sensitive |
| Settings / account changes | Auth-sensitive |
| Question uploads | File upload to Supabase Storage |

---

## Implementation Order

```
Layer 1  ->  Layer 2  ->  Layer 3
```

Each layer is a self-contained PR/commit that can be reviewed independently.
No layer is started until the previous one is verified working in production.

---

## Progress Tracker

### Layer 1 — PWA Shell
- [ ] Install `@serwist/next` and `serwist`
- [ ] Create `public/manifest.json`
- [ ] Generate and add app icons (192px, 512px, maskable)
- [ ] Create `app/sw.ts` (Service Worker entry)
- [ ] Wrap `next.config.mjs` with `withSerwist` (preserving `withMDX`)
- [ ] Add SW registration to `app/layout.tsx` (additive only)
- [ ] Create `lib/offline/register-sw.ts`
- [ ] Test: Lighthouse PWA score >= 90
- [ ] Test: Install prompt appears on Chrome (Android)
- [ ] Test: App shell loads offline (dashboard shows, no white screen)
- [ ] Test: All existing online functionality unchanged

### Layer 2 — Offline Data Cache
- [ ] Install `dexie`
- [ ] Create `lib/offline/db.ts` with full IndexedDB schema
- [ ] Create `lib/offline/cache-questions.ts`
- [ ] Create `lib/offline/cache-flashcards.ts`
- [ ] Create `lib/offline/cache-profile.ts`
- [ ] Create `lib/offline/use-offline-status.ts`
- [ ] Add background cache trigger to `app/(student)/layout.tsx`
- [ ] Add offline fallback to `practice/page.tsx`
- [ ] Add offline fallback to `flashcards/page.tsx`
- [ ] Add stale profile display to `dashboard/page.tsx`
- [ ] Test: Practice works offline (questions load from cache)
- [ ] Test: Flashcards work offline (cards load from cache)
- [ ] Test: Online users see zero change in behaviour

### Layer 3 — Background Sync
- [ ] Create `lib/offline/answer-outbox.ts`
- [ ] Create `lib/offline/use-sync-on-reconnect.ts`
- [ ] Integrate outbox into `practice/page.tsx` `handleAnswer()`
- [ ] Integrate outbox into `flashcards/page.tsx` `rate()`
- [ ] Mount `use-sync-on-reconnect` in `app/(student)/layout.tsx`
- [ ] Test: Answer offline -> reconnect -> answer appears in Supabase
- [ ] Test: XP updates correctly after sync (no double-count)
- [ ] Test: Outbox cleared after successful sync
- [ ] Test: Mock exam correctly blocked when offline with clear message

---

## Non-Negotiable Safety Rules

1. **Never modify the online-path return values.** Every existing Supabase query stays as-is. Offline code only runs in catch/fallback branches.
2. **Never disable RLS.** All sync writes go through the authenticated Supabase client — same RLS policies apply.
3. **Never store sensitive data in IndexedDB unencrypted.** Profile cache stores only: `xp`, `level`, `streak_count`, `cadre`, `plan_tier`. No passwords, tokens, or payment info.
4. **Service Worker must not intercept API routes.** The SW caches only static assets and explicitly listed shell pages. All `/api/*` and Supabase requests are network-first.
5. **Verify each Layer in production on Vercel before starting the next.**
6. **Every change is a separate, atomic commit** with a clear message referencing this document.
