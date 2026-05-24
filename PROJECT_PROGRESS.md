# NurseFiti — Project Progress Report
**Last Updated:** May 24, 2026  
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase · Paystack · Vercel

---

## 📊 OVERALL PROGRESS SUMMARY

| Phase | Name | Status | Completion | Key Details |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 0** | **Foundation** | 🟢 Complete | 100% | Next.js 14, Tailwind, Supabase, 22 DB tables, full TypeScript schema |
| **Phase 1** | **Authentication** | 🟢 Complete | 100% | Student/Tutor signup, middleware role isolation, forgot-password |
| **Phase 2** | **Student Core** | 🟢 Complete | 100% | Dashboard, MCQ engine, Mock exams, Flashcards (SRS), Gamification |
| **Phase 3** | **Tutor Dashboard** | 🟢 Complete | 100% | Schedule, students, studio, earnings, reviews |
| **Phase 4** | **Booking System** | 🟢 Complete | 95% | Directory, booking flow, realtime sync. *Pending: live Paystack key e2e test* |
| **Phase 5** | **Revision Plan** | 🟢 Complete | 100% | AI generation, HTML renderer, public share links, payment gate |
| **Phase 6** | **Payments** | 🟢 Complete | 90% | Paystack initialize/verify/webhook fully wired. *Pending: M-Pesa Daraja STK push* |
| **Phase 7** | **Landing & SEO** | 🟢 Complete | 100% | 10-section landing, JSON-LD, sitemap, SSG blog |
| **Phase 8** | **Plan Enforcement** | 🟢 Complete | 100% | All 5 tiers enforced across practice, mock exam, flashcards, analytics |
| **Phase 9** | **Pricing Tiers** | 🟢 Complete | 100% | Daily (KSh 69), Weekly (KSh 349), Standard (KSh 1,200), Premium (KSh 3,500) |
| **Phase 10** | **Admin Dashboard** | 🟢 Complete | 100% | Upload review, student plan management, role-gated middleware |
| **Phase 11** | **Question Uploads** | 🟢 Complete | 100% | Free users upload 3+ files → admin reviews → auto-upgrade to Standard |
| **Phase 12** | **Notifications** | 🔴 Not Started | 0% | DB ready. Missing: realtime bell, Twilio WhatsApp, Resend email, cron jobs |
| **Phase 13** | **QA & Launch Prep** | 🔴 Not Started | 0% | Missing: Lighthouse audit, RLS adversarial tests, mobile Safari audit, load tests |

---

## 🗂️ FILE-BY-FILE AUDIT (May 24, 2026)

### Core Configuration
| File | Status | Notes |
| :--- | :--- | :--- |
| `middleware.ts` | ✅ Updated | Admin route guard added; student/tutor redirects updated for admin role |
| `lib/planLimits.ts` | ✅ Updated | 5 tiers: free/daily/weekly/standard/premium; `mockExamsPerWeek` replaces `mockExamsPerMonth`; `getWeekStart()` helper; `PLAN_PRICING_META` export |
| `lib/paystack.ts` | ✅ Unchanged | Paystack SDK wrapper — no changes needed |
| `lib/supabase/admin.ts` | ✅ Unchanged | Service-role admin client |
| `lib/supabase/client.ts` | ✅ Unchanged | Browser Supabase client |
| `lib/supabase/server.ts` | ✅ Unchanged | Server-side Supabase client |

### API Routes
| File | Status | Notes |
| :--- | :--- | :--- |
| `app/api/paystack/initialize/route.ts` | ✅ Unchanged | Accepts any `amountKsh`; daily/weekly amounts now map correctly |
| `app/api/paystack/verify/route.ts` | ✅ Updated | `getPlanFromAmount` now handles KSh 69 → daily (1 day), KSh 349 → weekly (7 days) |
| `app/api/paystack/webhook/route.ts` | ✅ Updated | Same `getPlanFromAmount` update for webhook path |
| `app/api/paystack/payout/route.ts` | ✅ Unchanged | Tutor payout — no changes needed |
| `app/api/auth/signup/route.ts` | ✅ Unchanged | Student signup — creates free plan by default |
| `app/api/auth/signup-tutor/route.ts` | ✅ Unchanged | Tutor signup |
| `app/api/revision-plan/generate/route.ts` | ✅ Unchanged | Plan generation with payment gate |
| `app/api/question-upload/route.ts` | 🆕 New | Multipart upload handler; validates 3+ files; stores in Supabase Storage; creates `question_uploads` record; sends admin email via Resend (if `RESEND_API_KEY` set) |
| `app/api/admin/set-plan/route.ts` | 🆕 New | Admin-only; sets student plan tier + expiry; marks upload as approved |
| `app/api/admin/reject-upload/route.ts` | 🆕 New | Admin-only; rejects or marks upload as duplicate |
| `app/api/health/route.ts` | ✅ Unchanged | Health check endpoint |

### Student Pages
| File | Status | Notes |
| :--- | :--- | :--- |
| `app/(student)/dashboard/page.tsx` | ✅ Unchanged | Hero banner, stat tiles, quick actions |
| `app/(student)/practice/page.tsx` | ✅ Unchanged | Full plan enforcement (30 Q/day for free) |
| `app/(student)/mock-exam/page.tsx` | ✅ Updated | Weekly limit (2/week for daily/weekly/standard; unlimited for premium); free users see upload panel; `examsThisMonth` → `examsThisWeek` |
| `app/(student)/flashcards/page.tsx` | ✅ Updated | `flashcardsAccess` gate; free users see paywall card |
| `app/(student)/analytics/page.tsx` | ✅ Updated | `analyticsLevel` gate; free users see basic stats + upgrade teaser |
| `app/(student)/settings/page.tsx` | ✅ Updated | 4 upgrade plans shown (daily/weekly/standard/premium); tier ordering logic; plan summaries |
| `app/(student)/revision-plan/page.tsx` | ✅ Unchanged | Payment-gated per-generation pricing |
| `app/(student)/bookings/page.tsx` | ✅ Unchanged | Session booking management |
| `app/(student)/tutors/page.tsx` | ✅ Unchanged | Tutor directory |
| `app/(student)/onboarding/page.tsx` | ✅ Unchanged | Post-signup onboarding |
| `app/(student)/achievements/page.tsx` | ✅ Unchanged | Badges and XP |
| `app/(student)/groups/page.tsx` | ✅ Unchanged | Study groups |

### Admin Pages (New)
| File | Status | Notes |
| :--- | :--- | :--- |
| `app/(admin)/layout.tsx` | 🆕 New | Admin shell with topbar nav; role-checks client-side (middleware also guards) |
| `app/(admin)/admin/page.tsx` | 🆕 New | Overview: student counts, pending uploads |
| `app/(admin)/admin/uploads/page.tsx` | 🆕 New | Full upload review UI: approve → upgrades student; reject/duplicate with reason |
| `app/(admin)/admin/students/page.tsx` | 🆕 New | Student search + manual plan setter modal |

### Tutor Pages
| File | Status | Notes |
| :--- | :--- | :--- |
| `app/(tutor)/tutor-dashboard/page.tsx` | ✅ Unchanged | Tutor overview |
| `app/(tutor)/tutor-schedule/page.tsx` | ✅ Unchanged | Availability management |
| `app/(tutor)/tutor-students/page.tsx` | ✅ Unchanged | Student roster |
| `app/(tutor)/tutor-studio/page.tsx` | ✅ Unchanged | Content creation |
| `app/(tutor)/tutor-earnings/page.tsx` | ✅ Unchanged | Earnings and payouts |
| `app/(tutor)/tutor-reviews/page.tsx` | ✅ Unchanged | Review management |
| `app/(tutor)/tutor-profile/page.tsx` | ✅ Unchanged | Profile editing |
| `app/(tutor)/tutor-pending/page.tsx` | ✅ Unchanged | Pending verification screen |

### Database Migrations
| File | Status | Notes |
| :--- | :--- | :--- |
| `20260519000001_create_initial_schema.sql` | ✅ Applied | 21 core tables |
| `20260519000002_enable_rls.sql` | ✅ Applied | RLS policies for all tables |
| `20260519000003_create_booking_function.sql` | ✅ Applied | Booking helper function |
| `20260520000001_add_missing_columns.sql` | ✅ Applied | Tutor columns, flagged_questions, units, practice_sessions |
| `20260522000001_paystack_payments.sql` | ✅ Applied | M-Pesa → Paystack column rename; tutor_payouts table |
| `20260522000002_phase4_booking_columns.sql` | ✅ Applied | Booking flow columns |
| `20260523000001_notification_preferences.sql` | ✅ Applied | Notification prefs on student_profiles |
| `20260523000002_seed_units.sql` | ✅ Applied | NCK unit seed data |
| `20260524000001_availability_recurring.sql` | ✅ Applied | Recurring availability |
| `20260524000002_seed_nck_paper2_questions.sql` | ✅ Applied | Paper 2 question seed |
| `20260524000003_app_feedback.sql` | ✅ Applied | App feedback + helpful votes |
| `20260524000004_daily_weekly_plans_and_uploads.sql` | 🆕 New — **APPLY NOW** | Extends `plan_tier` CHECK to include daily/weekly; adds `admin` role; creates `question_uploads` table with RLS; admin policies on student_profiles/profiles |

---

## 🔧 ENVIRONMENT VARIABLES NEEDED

Add these to your Vercel dashboard and `.env.local`:

```
# Already configured
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=

# New — optional but recommended for production
RESEND_API_KEY=          # Get free at resend.com (3,000 emails/month free)
```

---

## 🚀 IMMEDIATE ACTIONS REQUIRED BEFORE LAUNCH

### 1. Apply the new migration
Run in Supabase SQL editor or via `supabase db push`:
```sql
-- File: supabase/migrations/20260524000004_daily_weekly_plans_and_uploads.sql
```

### 2. Create the Supabase Storage bucket
In Supabase dashboard → Storage → New bucket:
- Name: `question-uploads`
- Public: **No** (private)
- File size limit: 10 MB
- Allowed MIME types: `application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### 3. Create your admin account
After creating your account normally, run in Supabase SQL editor:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'docotyanga@gmail.com';
```
Then navigate to `/admin` to access the dashboard.

### 4. Configure Resend (optional but recommended)
- Sign up at resend.com (free tier: 3,000 emails/month)
- Add `RESEND_API_KEY` to Vercel environment variables
- Verify your sending domain

### 5. Set Paystack webhook URL
In Paystack dashboard → Settings → Webhooks:
```
https://nursefiti.com/api/paystack/webhook
```

---

## 📋 PLAN LIMITS REFERENCE

| Feature | Free | Daily (KSh 69) | Weekly (KSh 349) | Standard (KSh 1,200) | Premium (KSh 3,500) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Practice Q/day | 30 | Unlimited | Unlimited | Unlimited | Unlimited |
| Mock exams | Upload to unlock | 2/week | 2/week | 2/week | Unlimited |
| Flashcards | ❌ | ✅ | ✅ | ✅ | ✅ |
| Analytics | Basic | Full | Full | Full | Full |
| Revision plan | KSh 999 | KSh 499 | KSh 499 | KSh 499 | KSh 199 + 1 free/cycle |
| Leaderboard | ❌ | ❌ | ❌ | ❌ | ✅ |
| WhatsApp support | ❌ | ❌ | ❌ | ❌ | ✅ |
| Access duration | Forever | 1 day | 7 days | 30 days | 60 days |

**Weekly mock exam reset:** Every Monday 00:00 UTC. The 2/week cap applies across daily, weekly, and standard plans — even if a user pays for daily every day, they cannot exceed 2 mock exams per week.
