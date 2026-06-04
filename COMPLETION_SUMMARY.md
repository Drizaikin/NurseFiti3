# NurseFiti — Platform Completion Summary
**Last Updated:** June 4, 2026
**Overall Completion: ~97%**

---

## Platform Overview

NurseFiti is a Kenya-specific NCK licensure exam preparation platform for nursing students (KRCHN and BScN cadres) and their tutors. It is built with Next.js 14 (App Router), Supabase (Postgres + Auth + Storage + Realtime), and IntaSend for payments. Deployed on Vercel.

---

## 1. Authentication & Access Control ✅ 100%

### What is built
- Student signup (`/signup`) — collects cadre, specialty, institution, exam date, exam cycle
- Tutor signup (`/signup-tutor`) — separate flow; creates both `profiles` and `tutor_profiles` records
- Login (`/login`) with email + password
- Forgot password (`/forgot-password`) via Supabase Auth magic link
- Role-based middleware enforces route isolation:
  - Students → `/dashboard` and all `(student)` routes
  - Tutors → `/tutor-dashboard` and all `(tutor)` routes
  - Admins → `/admin` routes only
- Admin role stored in `profiles.role` column; set via SQL
- Session persistence via Supabase Auth cookies (server-side rendering safe)
- Auth state checked server-side in layouts and client-side in pages

### Key files
- `middleware.ts` — route guard
- `app/(auth)/` — all auth pages
- `lib/supabase/client.ts`, `server.ts`, `admin.ts`

---

## 2. Plan Tiers & Enforcement ✅ 100%

### Five tiers

| Tier | Price | Duration | Practice Q/day | Mock Exams/week |
|---|---|---|---|---|
| Free (Test Yourself) | KSh 0 | Forever | 30 | 0 (upload-to-unlock) |
| Daily (Exam Boost) | KSh 69 | 1 day | Unlimited | 2 |
| Weekly (Exam Boost) | KSh 299 | 7 days | Unlimited | 2 |
| Standard (Success Plan) | KSh 999 | 30 days | Unlimited | 2 |
| Premium (Elite Prep) | KSh 3,500 | 60 days | Unlimited | Unlimited |

### Enforcement points
- **Practice** — `getLimits(planTier).practiceQuestionsPerDay` cap enforced in `startPractice()`
- **Mock Exam** — weekly limit counted from `mock_exam_results` table; free users see upload-to-unlock panel
- **Flashcards** — `flashcardsAccess: false` for free; paywall card shown
- **Analytics** — free users see readiness score + 4 stat cards; full charts behind upgrade teaser
- **Revision Plan** — one-time AI generation fee (free with Elite Prep)
- Plan expiry auto-detected via `effectiveTier()` helper — expired plans revert to free automatically

### Key files
- `lib/planLimits.ts` — single source of truth for all tier limits

---

## 3. Payments ✅ 95%

### IntaSend (primary)
- Initialize → redirect to IntaSend checkout → webhook confirmation flow
- `POST /api/intasend/initialize` — creates checkout session, returns `checkout_url`
- `POST /api/intasend/webhook` — handles `COMPLETE` events server-to-server, provisions plan
- `POST /api/intasend/sync-plan` — manual "I already paid" button fallback
- Webhook signature verified via `INTASEND_WEBHOOK_CHALLENGE`
- Supports: M-Pesa, card, bank transfer (IntaSend handles all)
- Tutor session payments also routed through IntaSend

### Pending
- Native M-Pesa Daraja STK push (non-blocking; IntaSend M-Pesa works already)

### Key files
- `app/api/intasend/`

---

## 4. Student Learning Engine ✅ 100%

### 4a. MCQ Practice
- Unit/subject filter dropdown — student selects a specific unit or "All Units"
- **Question rotation system** — never shows already-answered questions; cycles per unit
  - On session start: queries `student_answers` for answered IDs in the selected unit
  - Excludes those IDs from the fetch via `.not('id', 'in', ...)`
  - Fetches next 20 unseen questions, shuffled randomly
  - When all questions in a unit are answered: cycle resets, toast shown: "🔄 Starting again!"
  - `unit` column denormalized on `student_answers` for fast per-unit rotation queries
- Session persistence: `localStorage` key `nursefiti_practice_session` (24h TTL)
- Resume prompt shown if student returns mid-session
- XP awarded: +8 XP per correct answer
- Streak tracking: increments on first answer each day; resets after 1-day gap
- Daily limit enforced per plan tier

### 4b. Mock Exam
- DigiProctor-style CBT simulation: 120 minutes, 100 questions
- Four papers: KRCHN Paper I, KRCHN Paper II, BScN Paper I, BScN Paper II
- **Question rotation** — prioritises unseen questions per paper across exam attempts
  - Queries `student_answers` WHERE `mode='mock_exam'` AND `paper=<current paper>`
  - Excludes seen IDs from selection pool
  - Full cycle reset when all paper questions exhausted (toast shown)
- **NCK-style unit distribution** — interleaves questions proportionally by unit
  - Groups questions by unit, shuffles within each unit
  - Spreads each unit's questions evenly across all 100 slots (no subject clusters)
  - Mimics real NCK CBT paper structure
- Question navigator sidebar (desktop): colour-coded answered/flagged/unanswered
- Flag system: any question can be flagged for review
- Auto-submit when timer reaches zero
- Full rationale review after submission (show/hide per question)
- AskAI button on each rationale (Gemini-powered)
- Individual answers saved to `student_answers` on submit (enables rotation tracking)
- Summary saved to `mock_exam_results` (score, pass/fail, time used)
- +100 XP on completion
- Free plan: upload-to-unlock panel (submit 3+ past exam files)

### 4c. Flashcards
- SM-2 spaced repetition algorithm
- 4-rating buttons: Again / Hard / Good / Easy
- Ease factor and next review interval calculated per card
- `flashcard_progress` table tracks per-student progress
- XP rewards per review
- Paywalled for free tier

### 4d. Analytics
- Readiness score (composite metric)
- 7-day study trend chart
- Unit mastery breakdown (% correct per unit)
- Mock exam history table
- Free: readiness score + 4 stat cards only
- Paid: full charts, unit mastery, mock history

### 4e. Revision Plan
- AI-generated HTML revision plan via Anthropic/Gemini
- Personalised to cadre, exam date, and weak units
- One-time generation fee (free with Elite Prep)
- Public share link generated per plan

### Key files
- `app/(student)/practice/page.tsx`
- `app/(student)/mock-exam/page.tsx`
- `app/(student)/flashcards/page.tsx`
- `app/(student)/analytics/page.tsx`
- `app/(student)/revision-plan/page.tsx`

---

## 5. Question Bank ✅ 100%

### Current question counts (June 2026)

| Cadre | Paper | Questions | Status |
|---|---|---|---|
| KRCHN | Paper I | 121 | All approved |
| KRCHN | Paper II | 142 | All approved |
| BScN | Paper I | 183 | All approved |
| BScN | Paper II | 62 | All approved |
| **Total** | | **508** | |

### Paper assignment rules (from `nck-exam-system.md`)

**KRCHN Paper I** (Medical-Surgical + Midwifery + Pharmacology):
`Medical-Surgical Nursing, Midwifery, Pharmacology, Maternal & Child Health, Paediatric Nursing, Anatomy & Physiology, Surgical Nursing`

**KRCHN Paper II** (Community + Mental Health + Professional Issues):
`Community Health Nursing, Mental Health Nursing, Environmental Health, Nutrition, Research & Statistics, Health Systems & Management, Infection Prevention & Control`

**BScN Paper I** (Advanced Adult Health + Specialised + Maternal/Newborn):
`Medical-Surgical Nursing, Pharmacology, Anatomy & Physiology, Critical Care Nursing, Surgical Nursing, Midwifery, Maternal & Child Health, Paediatric Nursing`

**BScN Paper II** (Community + Research + Leadership + Mental Health):
`Community Health Nursing, Mental Health Nursing, Research & Evidence-Based Practice, Nursing Management & Leadership, Professional Ethics & Law, Health Systems in Kenya, Infection Prevention & Control, Nutrition`

> Paper field must always be `'Paper I'` or `'Paper II'` (Roman numerals). Status must be `'approved'` to appear in practice and exams.

---

## 6. Question Upload System ✅ 100%

Free-tier students can unlock mock exam access by submitting past exam questions:
1. Student uploads ≥3 files (PDF/TXT/DOC/DOCX, max 10 MB each) from the mock exam page
2. Files stored in `question-uploads` Supabase Storage bucket (private)
3. Admin receives email notification (via Resend if `RESEND_API_KEY` is set)
4. Admin reviews in `/admin/uploads`
5. One-click Approve → student upgraded to Standard plan (30 days) automatically
6. Reject option with reason field; Duplicate option to flag repeat submissions
7. Duplicate detection: rejects if student already has pending/approved upload

### Key files
- `app/api/question-upload/route.ts`
- `app/(admin)/admin/uploads/page.tsx`
- `app/api/admin/review-question/route.ts`

---

## 7. Admin Dashboard ✅ 100%

Accessible at `/admin` — admin role only (set via SQL on `profiles.role`).

### Pages
- **Overview** (`/admin`) — student counts by plan, pending upload count, platform stats
- **Question Uploads** (`/admin/uploads`) — filter by status (pending/approved/rejected), view files via signed URLs, one-click approve/reject/duplicate with reason modal
- **MCQ Review** (`/admin/questions`) — review tutor-submitted questions; approve or reject with reason; filter by pending/approved/rejected
- **Students** (`/admin/students`) — search by name/email, view plan tier and expiry, set any plan tier with custom duration via modal
- **Tutors** (`/admin/tutors`) — view tutor verification status, approve/reject verification

### Admin avatar
- Admin can upload a profile picture directly from the admin topbar (hover the avatar circle)

---

## 8. Tutor System ✅ 100%

### Profile & Verification
- Tutors complete profile via `/tutor-complete-profile` (bio, NCK reg, upload verification documents)
- Verification documents stored in `documents` Supabase Storage bucket
- Admin reviews and approves/rejects verification
- Verification tiers: `standard` (all documents verified) and `gold` (premium verified)
- Tutor profile photo upload via `/tutor-profile` page (with nudge banner if missing)
- Profile visible to students in `/tutors` directory

### Schedule
- Weekly recurring availability slots (day of week + time range)
- Supabase Realtime subscription on availability — students see live slot updates
- Buffer time setting between sessions

### Content Studio
- Submit MCQ questions (pending admin review before going live)
- Submit study notes
- Contributor credit tracked via `contributor_id` on questions

### Dashboard & Earnings
- Session history, upcoming sessions
- Earnings breakdown, total earned, pending payouts
- Payout request via IntaSend Transfer API

### Reviews
- Students leave ratings + written reviews post-session
- Published reviews appear on tutor's public profile
- Aggregate rating and pass rate shown on profile

---

## 9. Booking System ✅ 95%

- Public tutor directory at `/tutors` — filter by cadre, availability, rate
- Individual tutor profile at `/tutors/[id]` — 14-day availability calendar
- Booking modal: pick slot, set topic, platform, note to tutor
- Instant booking (auto-confirmed) or approval-required (tutor confirms)
- Realtime conflict prevention — booked slots hidden as students browse
- Payment flow: IntaSend checkout on booking confirmation
- Platform fee: 30% of session gross amount
- Session cancellation supported
- Pending: end-to-end test with live IntaSend keys in production

---

## 10. Community & Study Groups ✅ 100%

### Groups
- Students can create or join study groups
- Open (anyone can join) or Invite-only groups
- Max 50 members per group
- All cadres (KRCHN, BScN, Higher Diploma) are in the same space — no segregation by cadre

### Real-time Chat (NEW)
- Full chat panel inside each group — X/Twitter-style messaging
- Messages delivered instantly via Supabase Realtime (Postgres Changes subscription)
- Reply to messages: shows quoted message context above reply
- Quote messages: pre-fills input with quoted text
- Soft delete: authors can delete their own messages (shows "[message deleted]")
- Optimistic UI: your message appears immediately while the server confirms
- Author avatar and name shown per message bubble
- Timestamp on each message; grouped by time
- Keyboard shortcut: Enter to send, Shift+Enter for new line
- Message limit: 2000 characters

### Key DB table
- `community_messages` (id, author_id, group_id, body, reply_to_id, quote_body, quote_author, is_deleted, created_at)
- RLS: authenticated users can read; authors can INSERT and UPDATE (soft delete) their own messages
- Realtime: table added to `supabase_realtime` publication

---

## 11. Profile Pictures / Avatars ✅ 100%

### Storage
- Supabase Storage bucket: `avatars` (public read, authenticated write, 5 MB limit)
- Path format: `{userId}/avatar.{ext}`
- Supported formats: JPEG, PNG, WebP, GIF

### Where avatars appear
- **Student topbar** — profile dropdown shows student's avatar (already in `Topbar.tsx`)
- **Tutor topbar** — tutor's avatar in profile dropdown (already in `TutorTopbar.tsx`)
- **Student settings** — upload/change photo in Settings → Profile section
- **Tutor profile** — upload in My Profile page (with nudge: "Add a profile picture — students trust tutors they can see!")
- **Admin topbar** — upload by hovering avatar circle
- **Tutor public profile** (`/tutors/[id]`) — student-facing tutor card shows avatar
- **Community chat** — avatar shown beside each message bubble
- **Tutors directory** — avatar shown on tutor cards

### AvatarUpload component
- `components/shared/AvatarUpload.tsx`
- Props: `userId`, `currentUrl`, `name`, `size` (md/lg/xl), `onUploaded`, `showNudge`
- Hover to see change button; click text link below avatar
- Immediate local preview before upload confirms
- Cache-buster appended to URL to force browser refresh

---

## 12. Onboarding Tour ✅ 100%

### Student tour (10 steps)
1. Welcome to NurseFiti
2. Practice Questions — rotation system explained
3. Mock Exams — DigiProctor format explained
4. Flashcards — spaced repetition explained
5. Analytics — readiness score explained
6. Revision Plan — AI plan explained
7. Find a Tutor
8. Community Groups — cross-cadre openness highlighted
9. Settings & Upgrade — profile photo mentioned
10. You're all set!

### Tutor tour (9 steps)
1. Welcome to NurseFiti Tutors
2. Complete Your Profile — photo importance highlighted
3. Verification
4. Manage Your Schedule
5. Content Studio
6. Your Students
7. Earnings & Payouts
8. Reviews
9. You're ready!

### Behaviour
- Shown automatically on first login (checks `onboarding_tour_seen` flag on profile table)
- Never shown again after the user completes or skips
- Skippable at any step via "Skip tour" link in top-right
- Dot navigation — click any dot to jump to that step
- "← Back" button from step 2 onwards
- Progress bar at top of modal
- Graceful degradation: if `onboarding_tour_seen` column doesn't exist (migration pending), tour is silently suppressed

### Key files
- `components/shared/OnboardingTour.tsx` — the modal/step component
- `components/student/OnboardingTourGate.tsx` — checks student profile, renders tour
- `components/tutor/OnboardingTourGate.tsx` — checks tutor profile, renders tour
- Injected via `app/(student)/layout.tsx` and `app/(tutor)/layout.tsx`

---

## 13. Database Schema (Full)

| Table | Purpose |
|---|---|
| `profiles` | Base user (id, role, full_name, email, phone, **avatar_url**, created_at) |
| `student_profiles` | Student data (cadre, xp, level, streak, plan_tier, **onboarding_tour_seen**, ...) |
| `tutor_profiles` | Tutor data (nck_reg, bio, cadres_taught, verification, **onboarding_tour_seen**, ...) |
| `questions` | MCQ bank (cadre, unit, paper, stem, options, correct_option, rationale, status) |
| `student_answers` | Every answer event (student_id, question_id, mode, **unit**, **paper**, answered_at) |
| `mock_exam_results` | Mock exam summaries (score, pass/fail, time used) |
| `flashcard_decks` | Flashcard deck metadata |
| `flashcards` | Individual flashcard items |
| `flashcard_progress` | SRS state (ease factor, interval, next_review_at) |
| `tutor_availability` | Weekly recurring slots |
| `sessions` | Booked tutor sessions |
| `session_reviews` | Post-session student ratings |
| `study_groups` | Community group metadata |
| `group_members` | Group membership |
| `community_messages` | **NEW** Real-time chat (body, reply_to_id, quote_body, quote_author, is_deleted) |
| `revision_plans` | AI-generated revision plans |
| `student_badges` | Earned badges |
| `notifications` | In-app notifications |
| `payments` | Payment records |
| `tutor_payouts` | Tutor payout transfers |
| `study_notes` | Tutor study notes |
| `flagged_questions` | Student-flagged questions |
| `session_notes` | Tutor private notes |
| `units` | NCK unit catalogue |
| `practice_sessions` | Practice session grouping |
| `question_uploads` | Student file uploads |

### Migration files (in order)
| File | What it does |
|---|---|
| `20260519000001_create_initial_schema.sql` | Full initial schema |
| `20260519000002_enable_rls.sql` | RLS policies |
| `20260519000003_create_booking_function.sql` | Booking helper function |
| `20260520000001_add_missing_columns.sql` | Schema additions |
| `20260522000001_paystack_payments.sql` | Payments table |
| `20260522000002_phase4_booking_columns.sql` | Booking columns |
| `20260523000001_notification_preferences.sql` | Notif prefs columns |
| `20260523000002_seed_units.sql` | NCK units seed data |
| `20260524000001_availability_recurring.sql` | Recurring availability |
| `20260524000002_seed_nck_paper2_questions.sql` | Question seeds |
| `20260524000003_app_feedback.sql` | Feedback table |
| `20260524000004_daily_weekly_plans_and_uploads.sql` | Plan tiers + uploads |
| `20260525000001_helpful_count_rpc.sql` | Helpful count RPC |
| `20260526000001_seed_questions_batch2.sql` | Question seeds |
| `20260526000002_correct_paper_assignments.sql` | Paper assignment fixes |
| `20260526000003_deduplicate_questions.sql` | Deduplication |
| `20260526000004_seed_paper3_paper4_batch_a.sql` | More question seeds |
| `20260526000005_seed_paper3_krchn_sets.sql` | More question seeds |
| `20260526000006_seed_paper3_uncategorised.sql` | More question seeds |
| `20260529000001_intasend_payment_columns.sql` | IntaSend columns |
| `20260530000001_auto_expire_plans.sql` | Plan expiry logic |
| `20260530000002_repair_intasend_payment_schema.sql` | Schema repair |
| `20260531000001_admin_review_and_storage.sql` | Admin review + storage |
| `20260531000002_tutor_profiles_rls.sql` | Tutor RLS |
| `20260603000001_comprehensive_rls_and_schema_fixes.sql` | Full RLS audit |
| `20260604000001_question_rotation.sql` | unit + paper cols on student_answers |
| `20260604000002_avatars_chat_onboarding.sql` | community_messages table + onboarding flags |

---

## 14. Storage Buckets

| Bucket | Access | Purpose | Limit |
|---|---|---|---|
| `documents` | Private | Tutor verification documents | 10 MB |
| `question-uploads` | Private | Student question file submissions | 10 MB |
| `avatars` | **Public** | Profile pictures (students, tutors, admin) | 5 MB |

---

## 15. Environment Variables Required

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (server only) |
| `NEXT_PUBLIC_SITE_URL` | Site URL for auth redirects |
| `INTASEND_SECRET_KEY` | IntaSend secret key |
| `NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY` | IntaSend publishable key |
| `INTASEND_WEBHOOK_CHALLENGE` | Webhook signature string |
| `GEMINI_API_KEY` | Google Gemini (AI explanations) |
| `ANTHROPIC_API_KEY` | Anthropic Claude (revision plans) |
| `RESEND_API_KEY` | Email notifications (optional) |

---

## 16. Remaining Work (~3%)

### Pending — requires action
1. **Run migration `20260604000002`** in [Supabase SQL Editor](https://supabase.com/dashboard/project/wnfbjyfenvdofvfcxnzk/sql/new)
   - Creates `community_messages` table
   - Adds `onboarding_tour_seen` to `student_profiles` and `tutor_profiles`
   - Safe to run — `DROP POLICY IF EXISTS` only drops/recreates RLS policies

### Optional enhancements
2. **In-app notification bell** — Supabase Realtime subscription on `notifications` table (medium effort, zero cost)
3. **Email notifications** — Resend integration for booking confirmations, streak reminders, plan expiry warnings (medium effort, Resend free tier = 3,000/month)
4. **WhatsApp notifications** — Twilio (defer until post-revenue; ~KSh 0.65/message)
5. **Native M-Pesa Daraja STK push** — better UX than IntaSend redirect; requires Safaricom business account
6. **Lighthouse audit** — target 90+ on performance, accessibility, SEO
7. **Production RLS adversarial test** — verify no cross-student data leakage
8. **Add more question batches** — see `.kiro/steering/question-rotation-system.md` for checklist
