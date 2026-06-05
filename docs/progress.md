# NurseFiti — Project Progress

## Sitemap & SEO Setup
**Status:** ✅ Complete  
**Date:** June 2026

### How the Sitemap Works

#### Architecture
NurseFiti uses **Next.js 14's built-in dynamic sitemap** via `app/sitemap.ts`. This generates `/sitemap.xml` as a live route handler — no static file, no build step, always up to date.

#### Key Files
| File | Purpose |
|------|---------|
| `app/sitemap.ts` | Generates `/sitemap.xml` dynamically at runtime |
| `public/robots.txt` | Tells Google which routes to crawl and points to the sitemap |
| `next-sitemap.config.js` | Legacy config — kept for reference, no longer runs (postbuild removed) |
| `middleware.ts` | Auth middleware — must exclude `.xml` and `.txt` from its matcher |

#### Pages Included in Sitemap
- `/` — Homepage (priority 1.0)
- `/blog` — Blog index (priority 0.9)
- `/blog/nck-exam-preparation-guide-kenya`
- `/blog/krchn-exam-revision-tips`
- `/blog/bscn-nursing-exam-kenya`
- `/blog/nck-past-papers-practice`
- `/blog/digiproctor-nck-exam-guide`
- `/tutors` — Tutor listing (priority 0.8)
- `/help` (priority 0.6)
- `/privacy` (priority 0.4)
- `/terms` (priority 0.4)

#### Pages Excluded (auth-protected, not indexed)
- All `/dashboard`, `/practice`, `/mock-exam`, `/flashcards`, etc.
- All `/tutor-*` routes
- All `/admin/*` routes
- `/api/*`, `/auth/*`
- `/login`, `/signup`, `/signup-tutor`, `/forgot-password`

#### The Middleware Fix (Critical)
The biggest gotcha: `middleware.ts` runs Supabase auth on every request. Before the fix, Google's crawler (unauthenticated) would hit `/sitemap.xml`, get redirected to `/login`, and receive HTML — causing the "Sitemap is HTML" error in Google Search Console.

**Fix applied in `middleware.ts`:**
1. Added `/sitemap.xml` and `/robots.txt` to `publicRoutes`
2. Added `xml` and `txt` to the matcher exclusion pattern:
```ts
'/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)'
```

#### Environment Variable
The sitemap base URL is controlled by:
```
NEXT_PUBLIC_SITE_URL=https://www.nursefiti.co.ke
```
Set in Vercel → Settings → Environment Variables (Production).  
The canonical domain is `www.nursefiti.co.ke` — the non-www redirects to www via a 307.

#### Adding New Pages to the Sitemap
Edit `app/sitemap.ts` and add a new entry:
```ts
{
  url: `${baseUrl}/your-new-page`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.7,
},
```
Then push to git — it goes live on the next Vercel deployment automatically.

#### Google Search Console
- Property: `nursefiti.co.ke`
- Sitemap submitted: `https://www.nursefiti.co.ke/sitemap.xml`
- To resubmit: Search Console → Sitemaps → Remove old → Add `sitemap.xml` → Submit
