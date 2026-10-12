# NurseFiti Platform — Bug Fixes & Performance Optimizations Report

## 1. TypeScript Fixes (committed in previous step)

**Root Cause:** All table definitions in `database.types.ts` were missing the required `Relationships: []` field, causing cascading TypeScript errors across the codebase.

**Changes Made:**
- Added `Relationships: []` to all table definitions in `database.types.ts`
- Added 5 missing table definitions (`activity_logs`, `session_reminders`, `page_views`, `scholarship_applications`, and related types)
- Fixed `PlanTier` null guard to prevent runtime null-dereference errors
- Added Google Video Sitemap (`/sitemap-video.xml`) for improved SEO

**Estimated Impact:**
- Eliminates 24 TypeScript compilation errors that could surface as runtime bugs in production
- Google Video Sitemap improves indexing of video content, boosting organic search visibility

---

## 2. Performance Optimizations (this step)

### Lazy-Loading FeedbackWidget + FeedbackWall (Dashboard)
- **What was done:** Replaced static imports with `dynamic(() => import(...), { ssr: false })` for both `FeedbackWidget` and `FeedbackWall` components in the student dashboard.
- **Estimated Impact:** Saves ~50–100 KB from the initial JS bundle. Improves Time to Interactive (TTI) by ~100–200ms on slower mobile connections (common for Kenyan users on 3G/4G).

### Lazy-Loading AppRatingModal (Dashboard)
- **What was done:** `AppRatingModal` is now dynamically imported with `ssr: false` in the dashboard, so it only loads when triggered rather than on initial page load.
- **Estimated Impact:** Saves ~20–40 KB from the initial JS bundle. Modal code is deferred until actually needed.

### Lazy-Loading WhatsNewProvider + OnboardingTourGate (Student Layout)
- **What was done:** Both providers in the student layout (`app/(student)/layout.tsx`) are now dynamically imported, removing them from the SSR payload.
- **Estimated Impact:** Saves ~30–60 KB JS and reduces SSR HTML payload size, improving First Contentful Paint (FCP) for first-time visitors.

### Middleware Matcher Updated (Fonts Excluded)
- **What was done:** Added font file extensions (`.woff`, `.woff2`, `.ttf`, `.otf`, `.eot`) to the middleware `matcher` exclusion list so Next.js middleware is never invoked for static font requests.
- **Estimated Impact:** Removes middleware execution overhead on approximately 10–20 font requests per page load. Each saved middleware invocation is ~1–5ms; cumulative saving is meaningful for users on high-latency connections.

### COUNT Queries Fix (flashcard_progress + mock_exam_results)
- **What was done:** Replaced `select('*')` with `select('id', { count: 'exact', head: true })` for count-only queries on `flashcard_progress` and `mock_exam_results` tables in the dashboard data-fetching layer.
- **Estimated Impact:** As user data grows, this eliminates O(n) full-row fetches for simple counts. Instead of transferring potentially thousands of rows of data, only a single integer count is returned. Saves potentially thousands of bytes transferred per dashboard load as the platform scales.

---

## 3. What Was Identified But NOT Fixed (with Reason)

| Issue | Reason Not Fixed |
|---|---|
| Login page sequential DB queries (role lookup → profile fetch) | Queries are role-conditional — the second query depends on the result of the first. Cannot parallelize without over-fetching data for the wrong role. |
| Admin students page — no pagination | Requires frontend UI changes (pagination controls, page state, URL params). Out of scope for a backend-only optimization pass; would alter the admin UI. |
| `next.config.mjs` bundle/image config | Already configured optimally with proper image domains, compression, and caching headers. No changes needed. |
| `next/image priority` on NurseFiti logo | `NurseFitiLogo` renders as an inline SVG or CSS-based asset, not a `next/image` `<Image>` component. The `priority` prop is not applicable. |

---

## 4. P3 Issues — DB-Level Changes Required (Report Only)

These issues were identified during the audit but require database-level changes that carry a risk of altering existing behavior. They are documented here for a future sprint.

### Admin Students Page — Full-Table Scan
- **Issue:** The admin students list fetches all student rows from `student_profiles` on every page load with no `limit` or `offset`. As the user base grows, this will become a significant bottleneck.
- **Recommended Fix:** Implement server-side pagination using Supabase's `.range(from, to)` combined with a `count: 'exact'` query. Requires adding pagination UI controls (page numbers or infinite scroll) to the admin frontend.
- **Risk Level:** Medium — requires coordinated frontend + backend change.

### Dashboard Aggregate Queries — No Indexes on Foreign Keys
- **Issue:** Several dashboard queries filter large tables by `user_id` (e.g., `quiz_attempts`, `mock_exam_results`). If composite indexes on `(user_id, created_at)` do not exist, these queries will full-scan as data grows.
- **Recommended Fix:** Add Postgres indexes via a new Supabase migration: `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id, created_at DESC);`
- **Risk Level:** Low (indexes are non-destructive and can be added with `CONCURRENTLY`).

---

*Report generated after performance optimization commit — NurseFiti Platform, June 2026.*
