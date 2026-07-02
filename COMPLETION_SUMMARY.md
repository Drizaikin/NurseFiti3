# NurseFiti — Platform Completion Summary
**Last Updated:** July 2026
**Overall Completion: 100%**

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
| Daily (Exam Boost) | KSh 99 | 1 day | Unlimited | 2 |
| Weekly (Exam Boost) | KSh 499 | 7 days | Unlimited | 2 |
| Standard (Success Plan) | KSh 1,199 | 30 days | Unlimited | 2 |
| Premium (Elite Prep) | KSh 3,500 | 60 days | Unlimited | Unlimited |

### Enforcement points
- **Practice** — `getLimits(planTier).practiceQuestionsPerDay` cap enforced in `startPractice()`
- **Mock Exam** — weekly limit counted from `mock_exam_results` table; free users see upload-to-unlock panel. Download of mock exams gated to Standard/Premium plans only.
- **Flashcards** — `flashcardsAccess: false` for free; paywall card shown
- **Analytics** — free users see readiness score + 4 stat cards; full charts behind upgrade teaser
- **Revision Plan** — one-time AI generation fee (free with Elite Prep)
- Plan expiry auto-detected via `effectiveTier()` helper — expired plans revert to free automatically

### Key files
- `lib/planLimits.ts` — single source of truth for all tier limits

---

## 3. Payments ✅ 100%

### IntaSend (primary)
- Initialize → redirect to IntaSend checkout → webhook confirmation flow
- `POST /api/intasend/initialize` — creates checkout session, returns `checkout_url`
- `POST /api/intasend/webhook` — handles `COMPLETE` events server-to-server, provisions plan
- `POST /api/intasend/verify` — checks and verifies transactions
- `POST /api/intasend/sync-plan` — manual "I already paid" button fallback
- Webhook signature verified via `INTASEND_WEBHOOK_CHALLENGE`
- Supports: M-Pesa, card, bank transfer (IntaSend handles all)
- Tutor session payments also routed through IntaSend
- Scholarship sponsorships routed via IntaSend

### Key files
- `app/api/intasend/`

---

## 4. Student Learning Engine ✅ 100%

### 4a. MCQ Practice
- Unit/subject filter dropdown — student selects a specific unit or "All Units"
- **Question rotation system** — never shows already-answered questions; cycles per unit
- Session persistence: `localStorage` key `nursefiti_practice_session` (24h TTL)
- Resume prompt shown if student returns mid-session
- XP awarded: +8 XP per correct answer
- Streak tracking: increments on first answer each day; resets after 1-day gap
- Daily limit enforced per plan tier

### 4b. Mock Exam
- DigiProctor-style CBT simulation: 120 minutes, 100 questions
- Four papers: KRCHN Paper I, KRCHN Paper II, BScN Paper I, BScN Paper II
- **Question rotation** — prioritises unseen questions per paper across exam attempts
- **NCK-style unit distribution** — interleaves questions proportionally by unit
- Flag system: any question can be flagged for review
- Auto-submit when timer reaches zero
- Full rationale review after submission (show/hide per question)
- AskAI button on each rationale (Gemini-powered)
- PDF Download gated strictly to Standard and Premium plans.

### 4c. Flashcards
- SM-2 spaced repetition algorithm
- 4-rating buttons: Again / Hard / Good / Easy

### 4d. Analytics
- Readiness score (composite metric)
- 7-day study trend chart
- Unit mastery breakdown (% correct per unit)
- Mock exam history table

### 4e. Revision Plan
- AI-generated HTML revision plan via Anthropic/Gemini
- Personalised to cadre, exam date, and weak units

### 4f. Leaderboard System
- Global and weekly leaderboards using XP.
- Simulated XP points (Bots) tracking integrated with `pg_cron` to make leaderboards dynamic and competitive.
- Weekly bot calculations accurately use 7-day rolling windows synced with user calculations.

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

---

## 6. Question Upload System ✅ 100%

Free-tier students can unlock mock exam access by submitting past exam questions:
1. Student uploads ≥3 files (PDF/TXT/DOC/DOCX, max 10 MB each)
2. Admin reviews in `/admin/uploads`
3. One-click Approve → student upgraded to Standard plan (30 days) automatically

---

## 7. Admin Dashboard ✅ 100%

Accessible at `/admin` — admin role only.
- **Overview** — student counts by plan, pending upload count, platform stats
- **Question Uploads** — filter by status (pending/approved/rejected), view files
- **MCQ Review** — review tutor-submitted questions
- **Students** — search by name/email, set plan
- **Tutors** — view tutor verification status
- **Scholarships** — Create, manage, distribute scholarships
- **Flagged Questions** — manage questions flagged by students

---

## 8. Scholarships & Sponsorships ✅ 100%

- Organizers and admins can create fully transparent Scholarship campaigns (`/admin/scholarships`).
- Sponsors can fund campaigns at heavily subsidized rates (`/sponsor/[slug]`) via IntaSend checkout.
- Automated generation of promo codes dynamically calculated by `subsidizedPrice`.
- Students can claim promotional codes via the settings page to immediately gain Premium status.

---

## 9. Tutor System & Bookings ✅ 100%

- Profile & Verification
- Availability & Recurring schedules
- Real-time chat integration
- Session bookings via IntaSend logic with platform fees handled.
- Live Session Tracking
- Tutor Payout requests

---

## 10. Community & Chat ✅ 100%

- Real-time Chat Panel
- Open or Invite-only Groups
- Replies and Quotes functionality
- Message soft-deletes

---

## 11. Custom Emails ✅ 100%

- `lib/email.ts` fully redesigned for beautiful modern aesthetics.
- Hero images, clean typography, branded teal accents, structured list processing for transaction and notification emails.

---

## 12. Database Schema (Full)

| Table | Purpose |
|---|---|
| `profiles` | Base user |
| `student_profiles` | Student data |
| `tutor_profiles` | Tutor data |
| `questions` | MCQ bank |
| `student_answers` | Every answer event |
| `mock_exam_results` | Mock exam summaries |
| `flashcards` / `flashcard_progress` | SRS state |
| `tutor_availability` / `sessions` | Tutor scheduler |
| `session_reviews` | Post-session ratings |
| `study_groups` / `group_members` | Community |
| `community_messages` | Real-time chat |
| `scholarship_campaigns` / `scholarship_donations` / `scholarship_codes` | Sponsorships |
| `leaderboard_bots` / `leaderboard_bot_logs` | Bot XP generation |

---

## 13. Environment Variables Required

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
| `RESEND_API_KEY` | Email notifications |

---

## 14. Remaining Work (~0%)
- Launch the platform! All systems are functionally complete.
