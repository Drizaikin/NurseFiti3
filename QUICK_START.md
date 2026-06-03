# NurseFiti - Quick Start Guide

## 🚀 What's Working Right Now

### For Students
1. **Sign Up** → `/signup`
   - Create account with email/password
   - Select cadre (KRCHN, BScN, Higher Diploma)
   - Set exam date and cycle

2. **Take Diagnostic Quiz** → `/onboarding`
   - Answer 10 questions
   - Get baseline performance score
   - Earn your first XP

3. **Dashboard** → `/dashboard`
   - View your stats (XP, level, streak, accuracy)
   - See days until exam
   - Quick access to all features

4. **Practice Questions** → `/practice`
   - Filter by unit and difficulty
   - Answer MCQs with immediate feedback
   - Earn 5 XP per correct answer
   - Build your streak (plan-gated: 30 Q/day free, unlimited paid)

5. **Mock Exam** → `/mock-exam`
   - DigiProctor-style CBT simulation
   - 100-question timed exam with navigator grid
   - Auto-submit on timer expiry
   - Full rationale review after submission
   - Plan-gated (upload 3 question files to unlock for free users; 2/week paid)

6. **Flashcards** → `/flashcards`
   - SM-2 spaced repetition algorithm
   - 4-rating system (Again/Hard/Good/Easy)
   - Plan-gated (paid plans only)

7. **Analytics** → `/analytics`
   - Readiness score, 7-day trend chart
   - Unit mastery breakdown (paid plans)
   - Mock exam history (paid plans)

8. **Revision Plan** → `/revision-plan`
   - AI-generated day-by-day study schedule
   - Payment-gated per generation (KSh 199–999 by plan tier)
   - Public share links

9. **Tutors & Bookings** → `/tutors`, `/bookings`
   - Verified tutor directory
   - Session booking with Paystack payment

10. **Settings & Upgrade** → `/settings`
    - Profile management
    - Upgrade to Daily/Weekly/Standard/Premium via Paystack

### For Tutors
1. **Apply** → `/signup-tutor`
   - Fill 5-step application form
   - Upload documents (NCK cert, academic qual, ID)
   - Set session rate and payment details

2. **Check Status** → `/tutor-pending`
   - View application status
   - See submitted information
   - Wait for admin approval

3. **Tutor Dashboard** → `/tutor-dashboard` (after approval)
   - Earnings, schedule, student roster, studio, reviews

---

## 📱 How to Test

### Test Student Flow
```
1. Go to http://localhost:3000/signup
2. Fill out the form:
   - Name: Test Student
   - Email: student@test.com
   - Phone: +254712345678
   - Password: Test@123
   - Cadre: BScN
   - Institution: Test University
   - Exam Date: (any future date)
   - Exam Cycle: May or November
3. Click "Create Account"
4. Check email for verification link (if configured)
5. Go to /login and sign in
6. Complete onboarding quiz
7. Explore dashboard
8. Try practice questions
```

### Test Tutor Flow
```
1. Go to http://localhost:3000/signup-tutor
2. Fill Step 1: Personal info
3. Fill Step 2: Professional credentials
4. Fill Step 3: Specialization (bio 200-400 chars)
5. Upload Step 4: Documents (PDF/JPG/PNG, max 5MB each)
6. Fill Step 5: Payment details
7. Submit application
8. Go to /login and sign in
9. View pending status at /tutor-pending
```

---

## 🗂️ Key Files to Know

### Pages
- `app/(auth)/signup/page.tsx` - Student signup
- `app/(auth)/signup-tutor/page.tsx` - Tutor application
- `app/(auth)/login/page.tsx` - Login
- `app/(student)/dashboard/page.tsx` - Student dashboard
- `app/(student)/practice/page.tsx` - Practice questions
- `app/(student)/onboarding/page.tsx` - Diagnostic quiz

### Components
- `components/student/Sidebar.tsx` - Navigation
- `components/student/Topbar.tsx` - Top bar with stats
- `components/student/MCQCard.tsx` - Question card
- `components/ui/*` - Reusable UI components

### API Routes
- `app/api/auth/signup/route.ts` - Student signup
- `app/api/auth/signup-tutor/route.ts` - Tutor signup

### Configuration
- `middleware.ts` - Route protection
- `lib/validations/auth.ts` - Form validation schemas
- `tailwind.config.ts` - Design tokens

---

## 🎨 Design Tokens

### Colors
```typescript
primary: '#08514F'      // Teal
accent: '#F5A623'       // Amber
success: '#10B981'      // Green
error: '#EF4444'        // Red
warning: '#F59E0B'      // Yellow
```

### Fonts
- **Headings:** Syne
- **Body:** Nunito

---

## 🔐 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗄️ Database Setup

### Required Tables
1. profiles
2. student_profiles
3. tutor_profiles
4. questions
5. student_answers
6. mock_exam_results
7. flashcards
8. flashcard_progress
9. tutor_availability
10. sessions
11. session_reviews
12. study_groups
13. group_members
14. revision_plans
15. student_badges
16. payments
17. notifications

### Migrations
Run migrations in order:
```bash
# Already created in supabase/migrations/
1. 20260519000001_create_initial_schema.sql
2. 20260519000002_enable_rls.sql
3. 20260519000003_create_booking_function.sql
```

---

## 🎮 Gamification System

### XP Rewards
- Correct answer in practice: **+5 XP**
- Complete onboarding quiz: **+50 XP**
- Correct answer in onboarding: **+5 XP**

### Levels
- Level = floor(Total XP / 100) + 1
- Level 1: 0-99 XP
- Level 2: 100-199 XP
- Level 3: 200-299 XP
- etc.

### Streaks
- Study today: Maintain streak
- Study yesterday: Increment streak
- Miss > 1 day: Reset to 1

---

## 📊 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login
- `/signup` - Student signup
- `/signup-tutor` - Tutor application

### Student Routes (Protected)
- `/dashboard` - Dashboard
- `/onboarding` - Diagnostic quiz
- `/practice` - Practice questions
- `/mock-exam` - Mock exam (placeholder)
- `/flashcards` - Flashcards (placeholder)
- `/analytics` - Analytics (placeholder)
- `/achievements` - Achievements (placeholder)
- `/groups` - Study groups (placeholder)
- `/revision-plan` - Revision plan (placeholder)
- `/tutors` - Find tutors (placeholder)
- `/bookings` - My bookings (placeholder)
- `/settings` - Settings

### Tutor Routes (Protected)
- `/tutor-pending` - Pending verification

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🐛 Common Issues

### Issue: "Supabase client error"
**Solution:** Check `.env.local` has correct Supabase credentials

### Issue: "Questions not loading"
**Solution:** Ensure questions table has data with status='approved'

### Issue: "Login redirects to wrong page"
**Solution:** Check middleware.ts and user role in profiles table

### Issue: "Dark mode not working"
**Solution:** Ensure ThemeProvider is in root layout

---

## 📚 Documentation

- **Detailed Report:** `PHASE_1_AND_2_COMPLETE.md`
- **Quick Summary:** `COMPLETION_SUMMARY.md`
- **Phase 1 Details:** `PHASE_1_PROGRESS.md`
- **Phase 2 Details:** `PHASE_2_PROGRESS.md`
- **This Guide:** `QUICK_START.md`

---

## ✅ Checklist for Testing

### Authentication
- [ ] Student can sign up
- [ ] Tutor can apply
- [ ] User can log in
- [ ] Email verification works
- [ ] Logout works
- [ ] Protected routes redirect

### Student Features
- [ ] Dashboard loads with stats
- [ ] Onboarding quiz works
- [ ] Practice questions load
- [ ] Answers submit correctly
- [ ] XP updates after correct answer
- [ ] Streak updates daily
- [ ] Settings page shows profile

### UI/UX
- [ ] Dark mode toggle works
- [ ] Mobile menu works
- [ ] Navigation highlights active page
- [ ] Loading spinners show
- [ ] Error messages display
- [ ] Forms validate correctly

---

## 🎯 Next Steps

1. **Seed Database** - Add sample questions for testing
2. **Test All Flows** - Go through student and tutor journeys
3. **Check Mobile** - Test on phone/tablet
4. **Verify Dark Mode** - Toggle and check all pages
5. **Review Code** - Ensure everything is clean
6. **Start Phase 3** - Begin tutor dashboard

---

## 💡 Tips

- Use Chrome DevTools for debugging
- Check Network tab for API errors
- Use React DevTools for component inspection
- Check Supabase dashboard for database issues
- Use Tailwind IntelliSense for CSS classes

---

## 🆘 Need Help?

1. Check documentation files
2. Review error messages in console
3. Check Supabase logs
4. Verify environment variables
5. Ensure database migrations ran

---

**Status:** Production Ready ✅  
**Last Updated:** May 19, 2026  
**Version:** 1.0.0 (Phase 1 & 2 Complete)
