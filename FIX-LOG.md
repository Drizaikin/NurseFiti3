# NurseFiti SEO, AEO & GEO Fix Log

**Last updated:** 2026-07-18  
**Canonical site:** https://www.nursefiti.co.ke  
**Working branch:** `feat/seo-aeo-geo-audit`  
**Status legend:** Done | Partial | Not started

This audit compares the NurseFiti codebase and live production site against a 14-section technical SEO, answer-engine optimization (AEO), and generative-engine optimization (GEO) checklist. Production was checked before these changes. At that point `/tutors` redirected crawlers to a `noindex` login page despite appearing in the sitemap, `llms.txt` did not exist, and multiple files competed to produce `robots.txt`.

## Section 2 - Build Questions - Partial

**Plain English:** The site has a clear audience and product, but its public authority and measurement strategy are incomplete.

**Done:**

- Defined NurseFiti as an independent Kenyan nursing education platform.
- Clarified that NurseFiti does not claim NCK approval, partnership, certification, or guaranteed outcomes.
- Established canonical public pages and private application boundaries.

**Still needed:**

- Confirm the legal/operating entity and named people responsible for the product and editorial review.
- Decide whether tutor profiles should become public search landing pages.
- Define the primary organic conversion and its analytics events.

## Section 3 - Entity Architecture - Partial

**What was wrong:**

- The footer linked to a missing `/about` page.
- Organization, WebSite, Course, and article schema repeated the name "NurseFiti" without stable relationships.
- No public page explained ownership, independence, editorial standards, or review practices.

**What was fixed:**

- Added `/about` with an `AboutPage` and `EducationalOrganization` graph.
- Added stable entity IDs for the organization, website, service, web application, articles, and breadcrumbs.
- Linked schema nodes through `publisher`, `provider`, `isPartOf`, and `mainEntityOfPage`.
- Replaced broken schema logo references with the existing `/logo.png` asset.

**Still needed:**

- Add verified leadership/editorial people and professional profile links when supplied.
- Replace personal Gmail addresses with domain email addresses.

## Section 4 - Ownership, Access & Environments - Partial

**What was wrong:**

- Credential-looking values were stored in the tracked `.env.example` and maintenance scripts.
- Preview deployments had no global `noindex` response policy.
- Environment documentation omitted cron and Resend keys.

**What was fixed:**

- Sanitized `.env.example` and removed hardcoded Supabase service-role fallbacks from maintenance scripts.
- Added `env.download`, `token5.json`, and the Google service-account file to `.gitignore`.
- Added `CRON_SECRET` and `RESEND_API_KEY` to the secret-free environment template.
- Added `X-Robots-Tag: noindex, nofollow, noarchive` to non-production deployments.
- Made preview `robots.txt` disallow all crawling.

**Blocker:**

- All previously exposed Supabase, IntaSend, SMTP, and Google credentials must be rotated. Removing them from current files does not remove them from Git history.

## Section 5 - Technical SEO Foundation - Done

**What was wrong:**

- Three competing robots systems existed.
- `/tutors` was submitted in the sitemap but resolved to a `noindex` login page.
- Unknown URLs redirected to login instead of returning a real 404.
- Intended sponsor, share, scholarship, and tutor-agreement routes were intercepted by auth middleware.
- Help and legal pages lacked self-referencing canonicals.
- Sitemap timestamps changed on every request.

**What was fixed:**

- Retained `app/robots.ts` as the sole robots source and removed static/legacy generators.
- Removed the private tutor directory from the sitemap and public crawler claims.
- Added named AI crawler rules while protecting private and transactional paths.
- Added a branded real 404 page.
- Changed middleware to authenticate explicit app routes and let unknown paths reach Next.js 404 handling.
- Restored intended access to tutor agreements, token shares, sponsor campaigns, and scholarship application routing.
- Added canonicals to Help, Privacy, Terms, and Tutor Agreement.
- Added `/about` and Tutor Agreement to the sitemap with stable modification dates.
- Added `trailingSlash: false` and disabled the framework signature header.
- Added permanent HTTP/apex-to-HTTPS-`www` canonical redirects in middleware.
- Added `X-Robots-Tag: noindex, nofollow, noarchive` to private app, auth, sponsor, scholarship, and share responses.
- Added crawlable Pricing, Practice Questions, Mock Exams, NCK Flashcards, Revision Plans, and Tutoring pages to the sitemap and crawler policy.
- Explicitly allowed the new public routes where private route prefixes such as `/practice` and `/mock-exam` would otherwise overlap.

## Section 6 - Speed & Core Web Vitals - Partial

**What was fixed:**

- Changed the homepage from uncached per-request rendering to five-minute ISR.
- Added responsive `sizes` to public blog images.
- Added reduced-motion handling and preserved optimized `next/font` usage.
- Sorted the blog index by actual publication date rather than array position.

**Still needed:**

- Server-render or defer the feedback wall to reduce client-side Supabase work and layout shifts.
- Run three mobile and desktop PageSpeed tests after deployment and use the median result.
- Add real-user LCP, INP, and CLS reporting.

## Section 7 - Structured Data & Entity Graph - Partial

**What was fixed:**

- Replaced the broad homepage Course claim with a connected WebPage, EducationalOrganization, WebSite, Service, WebApplication, and OfferCatalog graph.
- Made structured offers use the same live platform settings as visible pricing.
- Added visible FAQ schema generated from the same FAQ data rendered on the homepage.
- Removed the nonfunctional tutor `SearchAction`.
- Added article Open Graph/Twitter images and breadcrumb schema.
- Added Service, WebPage, FAQ, and pricing offer schema to the new public intent pages.

**Still needed:**

- Add real Person author/reviewer schema only after those people and credentials are visible on-page.
- Do not add review/rating schema until review provenance is auditable.

## Section 8 - AEO & GEO Structure - Partial

**What was wrong:**

- No `llms.txt` existed.
- Blog markup wrapped headings and paragraphs inside a `<ul>`, producing invalid semantics.
- Unsupported claims such as "#1," "guaranteed," "pixel-perfect," and implied NCK approval contradicted the Terms.
- FAQ product limits contradicted the pricing table.

**What was fixed:**

- Added `/llms.txt` with identity, canonical pages, key guides, limitations, citation guidance, sitemap, and crawler policy.
- Rebuilt article bullet and numbered-list rendering into valid semantic lists.
- Added a visible NurseFiti Editorial Team byline linked to About.
- Replaced unsupported outcome, superiority, replication, examiner, and approval claims with defensible wording.
- Corrected the mock-exam FAQ to reference current plan data instead of stale limits.
- Added an independence and verification statement to About.
- Added public, answer-focused landing pages for pricing, practice questions, mock exams, flashcards, revision planning, and tutoring.
- Added shared responsive marketing navigation and intent-specific calls to action.
- Added a native admin Blog CMS foundation with secure draft, preview, schedule, publish, archive, edit, and delete workflows.
- Added a canonical `blog_posts` migration with public-published/admin-write RLS policies, SEO fields, source lists, FAQs, author/reviewer fields, and publication timestamps.
- Added DB-first public blog rendering, metadata, FAQ schema, and sitemap discovery while retaining every legacy article as a fallback during migration.
- Added a safe React Markdown renderer for CMS content and escaped CMS-controlled JSON-LD to prevent stored script injection.

**Still needed:**

- Add concise answer-first summaries to every article.
- Add exact claim-level links to primary NCK, MOH, KEMSA, legislation, and research sources.
- Add genuine `dateModified`, `lastVerified`, named author, and clinical/regulatory reviewer data.
- Consolidate overlapping June 2026 news articles and redirect retired URLs.
- Verify whether hardcoded tutor identities, ratings, student counts, and pass-rate claims are real and auditable; remove them if they are placeholders.
- Apply `20260718000001_create_blog_cms.sql` to the target Supabase project before using `/admin/blog`.
- Migrate and verify the 19 legacy articles before removing their hardcoded fallback sources.
- Add managed image uploads and revision history in the next CMS phase; the MVP accepts approved NurseFiti, Supabase, or Unsplash image URLs.

## Section 9 - Analytics & Attribution - Not started

No GTM/GA4 implementation or organic conversion attribution currently exists.

**Needed:**

- Provide `NEXT_PUBLIC_GTM_ID`.
- Implement consent-gated GTM and GA4.
- Track signup start/completion, tutor application, pricing clicks, payment initiation/success, and blog-to-signup conversion.
- Persist UTM parameters, click IDs, landing page, and referrer through conversion.

## Section 10 - Search Console & Reporting - Not started

**Needed after deployment:**

1. Add a Google Search Console Domain property for `nursefiti.co.ke`.
2. Verify through DNS TXT.
3. Submit `https://www.nursefiti.co.ke/sitemap.xml`.
4. Request indexing for Home, About, Blog, and the three strongest exam guides.
5. Monitor excluded/noindex reports to confirm private app URLs remain out of search.

## Section 11 - Consent, Privacy & Legal Tracking - Partial

The site does not currently load GA4/GTM, so no analytics banner was added prematurely.

**Still needed before analytics launches:**

- Add Consent Mode v2 denied defaults before GTM.
- Add Accept and Decline controls with persistent, reversible choice.
- Expand the Privacy Policy to name processor categories, AI processing, cookies, transfers, retention schedules, and user rights.

## Section 12 - Security, Accessibility & Operations - Partial

**What was fixed:**

- Added HSTS, MIME sniffing protection, frame protection, a strict referrer policy, and a basic permissions policy.
- Added a Content Security Policy in report-only mode so violations can be corrected before enforcement.
- Added `/.well-known/security.txt` and an accessible runtime error page.
- Added a keyboard skip link and main landmarks to shared layouts and public pages.
- Repaired shared modal focus trapping/restoration, tab keyboard navigation and ARIA relationships, and dropdown keyboard/listbox behavior.
- Changed the document language to `en-KE`.
- Added reduced-motion support.
- Removed tracked service-role key copies from maintenance scripts.

**Urgent issues outside this SEO patch:**

- Rotate exposed credentials and purge secret-bearing Git history.
- Authenticate admin broadcast/community mutation APIs from the session rather than caller-supplied UUIDs.
- Make the IntaSend webhook fail closed when its challenge is missing.
- Protect detailed health/admin diagnostics and add abuse controls to signup and AI routes.

## Section 13 - Testing & Acceptance - Partial

**Completed locally:**

- `npx tsc --noEmit` passed.
- `npm run build` passed and generated 98 routes, including the Blog CMS admin and API routes.
- `git diff --check` passed with line-ending warnings only.
- The generated robots body contains the named AI agents, disallows `/tutors`, and explicitly allows the new public routes that overlap private prefixes.
- The generated sitemap contains all six new marketing routes, `/about`, and `/tutor-agreement`, and does not contain `/tutors`.
- Local response checks confirmed a 308 apex-to-`www` redirect and private/auth `X-Robots-Tag` coverage.
- Local response checks confirmed the report-only CSP, generated PNG Open Graph image, consolidated schema graph, and real HTTP 404 behavior.
- The tracked-secret scan now returns only a documentation example showing the expected IntaSend key prefix, not a credential value.

**Pre-deploy checks:**

- `npx tsc --noEmit`
- `npm run build`
- `git diff --check`
- Inspect generated `/robots.txt`, `/sitemap.xml`, `/llms.txt`, canonical tags, schema, and unknown-route 404 behavior.

**Post-deploy checks:**

- Validate schema on Home, About, Blog, and three article URLs.
- Run PageSpeed Insights three times each on Home, Blog, and a representative article, mobile and desktop.
- Verify `/tutors` is absent from the sitemap and redirects only as an authenticated product route.
- Verify a random unknown URL returns HTTP 404, not a login redirect.
- Verify preview deployments return `X-Robots-Tag: noindex, nofollow, noarchive`.

## Section 14 - Deliverables - Partial

**Delivered locally:**

- Unified environment-aware robots policy
- Corrected sitemap
- `public/llms.txt`
- About/entity page
- Public Pricing, Practice Questions, Mock Exams, NCK Flashcards, Revision Plans, and Tutoring pages
- Branded 404 page
- Generated 1200x630 Open Graph image and accessible runtime error page
- Connected JSON-LD and FAQ/breadcrumb schema
- Canonical metadata coverage
- Canonical-host redirects and middleware route/indexing corrections
- Blog semantic, image, freshness, and trust-language improvements
- Shared marketing navigation and footer
- Modal, tabs, and dropdown accessibility repairs
- Security headers, report-only CSP, and `security.txt`
- Native admin Blog CMS MVP with secure CRUD APIs, Markdown preview, publishing controls, schema, and legacy fallback
- Secret-free environment template and maintenance scripts
- This version-controlled Fix Log

**Not performed:**

- No commit, push, pull request, merge, deployment, or Google Drive upload was performed.
- A Drive folder ID and Google account were not supplied for Fix Log upload.
