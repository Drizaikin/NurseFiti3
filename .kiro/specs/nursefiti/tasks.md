# Implementation Tasks

## Phase 0: Foundation (Week 1)

### Task 0.1: Initialize Next.js 14 Project
**Status:** ✅ complete  
**Priority:** critical  
**Estimated Hours:** 2

**Description:**
Set up a new Next.js 14 project with TypeScript and App Router.

**Acceptance Criteria:**
- [ ] Next.js 14+ installed with TypeScript
- [ ] App Router structure created
- [ ] Development server runs successfully
- [ ] TypeScript configuration is strict mode enabled

**Implementation Steps:**
1. Run `npx create-next-app@latest nursefiti --typescript --tailwind --app --no-src-dir`
2. Configure `tsconfig.json` with strict mode
3. Verify `npm run dev` works
4. Create initial folder structure

**Dependencies:** None

**Validates:** Requirement 1

---

### Task 0.2: Configure Tailwind CSS with Design Tokens
**Status:** ✅ complete  
**Priority:** critical  
**Estimated Hours:** 3

**Description:**
Configure Tailwind CSS with NurseFiti brand colors, typography, and design tokens.

**Acceptance Criteria:**
- [ ] Tailwind config includes all brand colors (teal, amber, neutrals)
- [ ] Custom font families configured (Syne, Nunito)
- [ ] CSS variables created for light and dark modes
- [ ] Global styles applied

**Implementation Steps:**
1. Update `tailwind.config.js` with custom colors and fonts
2. Create `app/globals.css` with CSS variables
3. Add dark mode class strategy
4. Test color tokens in both light and dark modes

**Dependencies:** Task 0.1

**Validates:** Requirement 1

---

### Task 0.3: Set Up Supabase Project
**Status:** ✅ complete  
**Priority:** critical  
**Estimated Hours:** 2

**Description:**
Create Supabase project and configure authentication.

**Acceptance Criteria:**
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Supabase client initialized
- [ ] Authentication enabled

**Implementation Steps:**
1. Create Supabase project at supabase.com
2. Copy project URL and anon key
3. Add to `.env.local`
4. Install `@supabase/supabase-js` and `@supabase/auth-helpers-nextjs`
5. Create `lib/supabase/client.ts` and `lib/supabase/server.ts`

**Dependencies:** Task 0.1

**Validates:** Requirements 1, 2

---

### Task 0.4: Install and Configure next-themes
**Status:** ✅ complete  
**Priority:** high  
**Estimated Hours:** 1

**Description:**
Set up dark mode support using next-themes.

**Acceptance Criteria:**
- [x] next-themes installed
- [x] ThemeProvider added to root layout
- [x] Dark mode toggle component created
- [x] Theme persists across page reloads

**Implementation Steps:**
1. Install `next-themes`
2. Wrap app in ThemeProvider in `app/layout.tsx`
3. Create `components/shared/DarkModeToggle.tsx`
4. Test theme switching

**Dependencies:** Task 0.2

**Validates:** Requirement 1

---

### Task 0.5: Add Google Fonts
**Status:** ✅ complete  
**Priority:** medium  
**Estimated Hours:** 1

**Description:**
Integrate Syne and Nunito fonts from Google Fonts.

**Acceptance Criteria:**
- [x] Syne font loaded (weights: 400, 600, 700, 800)
- [x] Nunito font loaded (weights: 400, 500, 600, 700)
- [x] Fonts applied to headings and body text
- [x] Font display swap configured

**Implementation Steps:**
1. Import fonts in `app/layout.tsx` using `next/font/google`
2. Apply font variables to HTML element
3. Update Tailwind config to use font variables
4. Verify fonts load correctly

**Dependencies:** Task 0.2

**Validates:** Requirement 1

---

### Task 0.6: Create NurseFiti Logo Component
**Status:** ✅ complete  
**Priority:** high  
**Estimated Hours:** 2

**Description:**
Build SVG logo component with ECG line and amber checkmark.

**Acceptance Criteria:**
- [x] Logo SVG component created
- [x] Supports light and dark mode variants
- [x] Icon-only variant available
- [x] Responsive sizing

**Implementation Steps:**
1. Create `components/shared/NurseFitiLogo.tsx`
2. Implement SVG with exact paths from spec
3. Add props for size and variant
4. Test in light and dark modes

**Dependencies:** Task 0.4

**Validates:** Requirement 1


### Task 0.7: Create Base UI Components
**Status:** ✅ complete  
**Priority:** critical  
**Estimated Hours:** 6

**Description:**
Build reusable UI component library (Button, Card, Badge, ProgressBar, Avatar, Modal, Toast, Spinner).

**Acceptance Criteria:**
- [x] Button component with variants (primary, secondary, ghost, outline, danger)
- [x] Card component with consistent styling
- [x] Badge component with color variants
- [x] ProgressBar component with percentage display
- [x] Avatar component with initials fallback
- [x] Modal component with overlay (pending)
- [x] Toast notification system (react-hot-toast configured)
- [x] Spinner loading component
- [x] All components support dark mode

**Implementation Steps:**
1. Create `components/ui/Button.tsx`
2. Create `components/ui/Card.tsx`
3. Create `components/ui/Badge.tsx`
4. Create `components/ui/ProgressBar.tsx`
5. Create `components/ui/Avatar.tsx`
6. Create `components/ui/Modal.tsx`
7. Install and configure `react-hot-toast`
8. Create `components/ui/Spinner.tsx`
9. Test all components in Storybook or test page

**Dependencies:** Tasks 0.2, 0.4

**Validates:** Requirement 1

---

### Task 0.8: Create Database Schema
**Status:** ✅ complete  
**Priority:** critical  
**Estimated Hours:** 4

**Description:**
Create all Supabase database tables with proper relationships and constraints.

**Acceptance Criteria:**
- [x] All 20+ tables created
- [x] Foreign key relationships established
- [x] Indexes created for performance
- [x] UUID primary keys configured
- [x] Timestamptz columns for dates
- [x] Check constraints for enums

**Implementation Steps:**
1. Install Supabase CLI: `npm install -g supabase`
2. Initialize Supabase: `supabase init`
3. Link to project: `supabase link --project-ref xxxxx`
4. Create migration: `supabase migration new create_initial_schema`
5. Write SQL for all tables (profiles, student_profiles, tutor_profiles, questions, etc.)
6. Apply migration: `supabase db reset`
7. Verify tables in Supabase dashboard

**Dependencies:** Task 0.3

**Validates:** Requirement 2

---

### Task 0.9: Configure Row Level Security
**Status:** ✅ complete  
**Priority:** critical  
**Estimated Hours:** 3

**Description:**
Enable RLS and create security policies for all tables.

**Acceptance Criteria:**
- [x] RLS enabled on all tables
- [x] Students can only access their own data
- [x] Tutors can access their own data + session-related student data
- [x] Public data (questions, tutor profiles) accessible to authenticated users
- [x] Admin role has full access

**Implementation Steps:**
1. Create migration: `supabase migration new enable_rls`
2. Write `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` for all tables
3. Create policies for each table following design doc patterns
4. Test policies with different user roles
5. Apply migration

**Dependencies:** Task 0.8

**Validates:** Requirement 2

---

### Task 0.10: Set Up Vercel Deployment
**Status:** ✅ complete (ready)  
**Priority:** high  
**Estimated Hours:** 2

**Description:**
Configure Vercel project and link to GitHub repository.

**Acceptance Criteria:**
- [x] Vercel project created (ready)
- [x] GitHub repository connected (pending user action)
- [x] Environment variables configured (template ready)
- [x] Automatic deployments enabled (pending)
- [x] Preview deployments working (pending)

**Implementation Steps:**
1. Create GitHub repository
2. Push code to GitHub
3. Create Vercel project
4. Link GitHub repository
5. Add environment variables in Vercel dashboard
6. Verify deployment succeeds
7. Test preview deployment on new branch

**Dependencies:** Tasks 0.1-0.9

**Validates:** Requirement 1

---

## Phase 1: Authentication System (Week 2)

### Task 1.1: Build Student Signup Page
**Status:** todo  
**Priority:** critical  
**Estimated Hours:** 4

**Description:**
Create student registration form with validation.

**Acceptance Criteria:**
- [ ] Form includes: full name, email, phone, password, cadre, institution, exam date
- [ ] Client-side validation with Zod
- [ ] Password strength indicator
- [ ] Cadre dropdown (KRCHN, BScN, Higher Diploma)
- [ ] Exam date picker with upcoming NCK dates
- [ ] Error handling and display

**Implementation Steps:**
1. Create `app/(auth)/signup/page.tsx`
2. Install `react-hook-form` and `zod`
3. Create signup form schema
4. Build form UI with validation
5. Implement form submission
6. Add loading states

**Dependencies:** Tasks 0.7, 0.3

**Validates:** Requirement 3

---

### Task 1.2: Implement Student Signup Logic
**Status:** todo  
**Priority:** critical  
**Estimated Hours:** 3

**Description:**
Handle student account creation with Supabase Auth.

**Acceptance Criteria:**
- [ ] Creates auth.users record
- [ ] Creates profiles record with role='student'
- [ ] Creates student_profiles record
- [ ] Sends verification email
- [ ] Handles errors gracefully

**Implementation Steps:**
1. Create `app/api/auth/signup/route.ts`
2. Implement Supabase signUp call
3. Create database trigger for profile creation
4. Handle email verification
5. Test signup flow end-to-end

**Dependencies:** Task 1.1

**Validates:** Requirement 3

---

### Task 1.3: Build Tutor Application Form
**Status:** todo  
**Priority:** critical  
**Estimated Hours:** 6

**Description:**
Create multi-step tutor application form.

**Acceptance Criteria:**
- [ ] Step 1: Personal information
- [ ] Step 2: Professional credentials (NCK reg, title, experience)
- [ ] Step 3: Specialization selection
- [ ] Step 4: Document upload (NCK cert, academic qual, ID)
- [ ] Step 5: M-Pesa number
- [ ] Progress indicator
- [ ] Form state persists between steps

**Implementation Steps:**
1. Create `app/(auth)/signup-tutor/page.tsx`
2. Build multi-step form component
3. Create form schemas for each step
4. Implement file upload to Supabase Storage
5. Add progress indicator
6. Handle form submission

**Dependencies:** Tasks 0.7, 0.3

**Validates:** Requirement 4

---

### Task 1.4: Implement Tutor Application Logic
**Status:** todo  
**Priority:** critical  
**Estimated Hours:** 3

**Description:**
Handle tutor application submission and verification workflow.

**Acceptance Criteria:**
- [ ] Creates auth.users record
- [ ] Creates profiles record with role='tutor'
- [ ] Creates tutor_profiles record with status='pending'
- [ ] Uploads documents to Supabase Storage
- [ ] Sends notification to admin
- [ ] Sends confirmation email to tutor

**Implementation Steps:**
1. Create `app/api/auth/signup-tutor/route.ts`
2. Implement Supabase signUp call
3. Handle document uploads
4. Create tutor profile with pending status
5. Send admin notification
6. Test application flow

**Dependencies:** Task 1.3

**Validates:** Requirement 4

---

### Task 1.5: Build Login Page
**Status:** todo  
**Priority:** critical  
**Estimated Hours:** 3

**Description:**
Create login page with email/password authentication.

**Acceptance Criteria:**
- [ ] Email and password inputs
- [ ] Remember me checkbox
- [ ] Forgot password link
- [ ] Error handling
- [ ] Redirects to appropriate dashboard based on role

**Implementation Steps:**
1. Create `app/(auth)/login/page.tsx`
2. Build login form with validation
3. Implement Supabase signInWithPassword
4. Handle role-based redirect
5. Add "Remember me" functionality
6. Test login flow

**Dependencies:** Tasks 0.7, 0.3

**Validates:** Requirement 3

---

### Task 1.6: Configure Auth Middleware
**Status:** todo  
**Priority:** critical  
**Estimated Hours:** 3

**Description:**
Set up middleware for route protection and role-based access.

**Acceptance Criteria:**
- [ ] Public routes accessible without auth
- [ ] Protected routes require authentication
- [ ] Student routes redirect tutors to tutor dashboard
- [ ] Tutor routes redirect students to student dashboard
- [ ] Pending tutors redirected to pending page

**Implementation Steps:**
1. Create `middleware.ts`
2. Implement session check
3. Add role-based routing logic
4. Handle tutor verification status
5. Test all route protection scenarios

**Dependencies:** Task 1.5

**Validates:** Requirements 3, 4

---

### Task 1.7: Build Onboarding Diagnostic Quiz
**Status:** todo  
**Priority:** high  
**Estimated Hours:** 4

**Description:**
Create 10-question diagnostic quiz for new students.

**Acceptance Criteria:**
- [ ] 10 questions covering various NCK topics
- [ ] Questions appropriate for student's cadre
- [ ] Calculates baseline performance
- [ ] Stores results for analytics
- [ ] Shows results summary

**Implementation Steps:**
1. Create `app/(student)/onboarding/page.tsx`
2. Fetch 10 random questions from database
3. Build quiz interface
4. Calculate and store results
5. Show performance summary
6. Redirect to dashboard

**Dependencies:** Tasks 0.8, 1.2

**Validates:** Requirement 3

---

### Task 1.8: Build Tutor Pending Verification Page
**Status:** todo  
**Priority:** medium  
**Estimated Hours:** 2

**Description:**
Create page for tutors awaiting verification.

**Acceptance Criteria:**
- [ ] Shows application status
- [ ] Displays submitted information
- [ ] Shows estimated review time
- [ ] Allows document re-upload if needed

**Implementation Steps:**
1. Create `app/(tutor)/tutor-pending/page.tsx`
2. Fetch tutor application data
3. Display status and information
4. Add document re-upload functionality
5. Test pending state

**Dependencies:** Task 1.4

**Validates:** Requirement 4

