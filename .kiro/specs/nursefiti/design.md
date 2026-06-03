# Technical Design Document

## Overview

NurseFiti is a comprehensive Kenyan NCK exam preparation platform built on a modern serverless architecture. The system serves two distinct user types (Students and Tutors) through a unified Next.js 14 application with Supabase backend, real-time synchronization, M-Pesa payment integration, and WhatsApp notifications. The platform provides three core pillars: Practice & Analytics (MCQ bank, mock exams, flashcards), Smart Revision Planning (AI-generated study schedules), and Expert Tutoring (live sessions with booking system). The architecture emphasizes mobile-first design, real-time bidirectional data sync, security through Row Level Security, and performance optimization for Kenyan 3G/4G networks.

## Architecture

The system follows a serverless architecture pattern with clear separation between presentation, business logic, and data layers. The frontend uses Next.js 14 App Router with React Server Components for optimal performance. The backend leverages Supabase for database, authentication, storage, and real-time subscriptions. All API routes are implemented as Next.js API handlers deployed on Vercel Edge Network. External integrations include M-Pesa Daraja API for payments, WhatsApp Business API for notifications, and video conferencing platforms for tutoring sessions. The real-time synchronization layer uses Supabase Realtime WebSocket connections to ensure tutor availability and student bookings stay synchronized across all clients within 2 seconds. Database-level locking prevents race conditions during concurrent booking attempts.

## Components and Interfaces

The application is organized into route groups: (auth) for authentication pages, (student) for student dashboard and features, and (tutor) for tutor dashboard and features. Shared components include UI primitives (Button, Card, Badge, Modal), layout components (Navbar, Sidebar, Topbar), and feature-specific components (MCQCard, AnalyticsChart, FlashcardDeck). The student interface provides practice modes, mock exams, flashcards, analytics, achievements, study groups, revision plan generator, tutor browsing, and booking management. The tutor interface provides schedule management, student roster, content studio, earnings tracking, review management, and profile editing. API interfaces are RESTful with JSON payloads, organized by domain (auth, student, practice, mock-exam, flashcards, tutors, sessions, payments, revision-plan, gamification, groups, notifications). All API routes require authentication except public endpoints (landing, tutor directory, blog) and webhooks (M-Pesa callback).

## Data Models

The database schema consists of 20+ tables organized around core entities: profiles (base user table), student_profiles (student-specific data including XP, level, streak, plan tier), tutor_profiles (tutor-specific data including verification status, rates, ratings), questions (MCQ bank with rationale), student_answers (answer history for analytics), mock_exam_results (exam scores and timing), flashcards and flashcard_progress (SRS data), tutor_availability (weekly schedule slots), sessions (bookings with payment status), session_reviews (ratings and feedback), study_groups and group_members (collaborative learning), revision_plans (generated study schedules), student_badges (achievement tracking), payments (transaction records), and notifications (in-app alerts). All tables use UUID primary keys, timestamptz for dates, and enforce referential integrity through foreign keys. Row Level Security policies ensure students can only access their own data, tutors can access their own data plus session-related student data, and public data (approved questions, verified tutor profiles) is accessible to authenticated users.

## 1. System Overview

### 1.1 Architecture Style
NurseFiti follows a **modern serverless architecture** with:
- **Frontend**: Next.js 14 App Router (React Server Components + Client Components)
- **Backend**: Next.js API Routes + Supabase Edge Functions
- **Database**: Supabase PostgreSQL with Row Level Security
- **Real-time**: Supabase Realtime for bidirectional synchronization
- **Deployment**: Vercel Edge Network
- **Payments**: M-Pesa Daraja API integration
- **Notifications**: WhatsApp Business API (Twilio/Meta)

### 1.2 High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │    Mobile    │  │     PWA      │          │
│  │  (Desktop)   │  │   (Safari/   │  │  (Installed) │          │
│  │              │  │   Chrome)    │  │              │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
                    ┌────────▼────────┐
                    │   VERCEL EDGE   │
                    │    NETWORK      │
                    └────────┬────────┘
                             │
          ┌──────────────────┴──────────────────┐
          │                                     │
┌─────────▼─────────┐              ┌───────────▼──────────┐
│   NEXT.JS APP     │              │   SUPABASE CLOUD     │
│                   │              │                      │
│ • App Router      │◄────────────►│ • PostgreSQL DB      │
│ • Server Actions  │   Auth &     │ • Auth Service       │
│ • API Routes      │   Data       │ • Storage            │
│ • Middleware      │              │ • Realtime           │
└─────────┬─────────┘              │ • Edge Functions     │
          │                        └───────────┬──────────┘
          │                                    │
          │                        ┌───────────▼──────────┐
          │                        │   SUPABASE REALTIME  │
          │                        │   • WebSocket        │
          │                        │   • Presence         │
          │                        │   • Broadcast        │
          │                        └──────────────────────┘
          │
          └────────────┬───────────────────────┬───────────┐
                       │                       │           │
            ┌──────────▼────────┐   ┌─────────▼──────┐   │
            │   M-PESA DARAJA   │   │   WHATSAPP     │   │
            │                   │   │   BUSINESS API │   │
            │ • STK Push        │   │                │   │
            │ • B2C Payments    │   │ • Send Msgs    │   │
            │ • Callbacks       │   │ • Templates    │   │
            └───────────────────┘   └────────────────┘   │
                                                          │
                                              ┌───────────▼──────┐
                                              │  VIDEO PLATFORM  │
                                              │  (Zoom/Meet)     │
                                              └──────────────────┘
```

### 1.3 Technology Stack Rationale

| Technology | Rationale |
|------------|-----------|
| **Next.js 14 App Router** | Server Components reduce bundle size; App Router provides file-based routing; built-in API routes; excellent Vercel integration |
| **TypeScript** | Type safety prevents runtime errors; better IDE support; self-documenting code |
| **Tailwind CSS** | Utility-first approach speeds development; excellent mobile-first support; easy dark mode implementation |
| **Supabase** | PostgreSQL with RLS provides security; built-in auth; realtime subscriptions; generous free tier; Kenyan data center available |
| **Vercel** | Zero-config deployment; edge network for fast global access; automatic HTTPS; preview deployments |
| **M-Pesa Daraja** | Only viable payment method in Kenya; 99% mobile money penetration; instant payments |
| **WhatsApp Business** | Primary communication channel in Kenya; high open rates; familiar to users |


## 2. Component Architecture

### 2.1 Application Structure

```
nursefiti/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth route group (no layout)
│   │   ├── login/
│   │   ├── signup/
│   │   └── signup-tutor/
│   ├── (student)/                # Student route group (student layout)
│   │   ├── dashboard/
│   │   ├── practice/
│   │   ├── mock-exam/
│   │   ├── flashcards/
│   │   ├── analytics/
│   │   ├── achievements/
│   │   ├── groups/
│   │   ├── revision-plan/
│   │   ├── tutors/
│   │   ├── bookings/
│   │   └── settings/
│   ├── (tutor)/                  # Tutor route group (tutor layout)
│   │   ├── tutor-dashboard/
│   │   ├── tutor-schedule/
│   │   ├── tutor-students/
│   │   ├── tutor-studio/
│   │   ├── tutor-earnings/
│   │   ├── tutor-reviews/
│   │   └── tutor-profile/
│   ├── api/                      # API routes
│   │   ├── mpesa/
│   │   │   ├── stkpush/
│   │   │   ├── callback/
│   │   │   └── b2c/
│   │   ├── revision-plan/
│   │   │   └── generate/
│   │   ├── sessions/
│   │   │   └── book/
│   │   ├── notifications/
│   │   └── webhooks/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── middleware.ts             # Auth & routing middleware
├── components/
│   ├── ui/                       # Base UI components
│   ├── student/                  # Student-specific components
│   ├── tutor/                    # Tutor-specific components
│   └── shared/                   # Shared components
├── lib/
│   ├── supabase/                 # Supabase clients
│   ├── mpesa/                    # M-Pesa integration
│   ├── whatsapp/                 # WhatsApp integration
│   ├── algorithms/               # SRS, AI recommendations
│   ├── types/                    # TypeScript types
│   └── utils/                    # Helper functions
└── public/
    └── logo/                     # Brand assets
```

### 2.2 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      Root Layout                             │
│  • Google Fonts (Syne, Nunito)                              │
│  • Theme Provider (next-themes)                             │
│  • Toast Provider                                           │
│  • Supabase Auth Provider                                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┬─────────────────┐
        │                   │                 │
┌───────▼────────┐  ┌───────▼────────┐  ┌────▼──────────┐
│  Public Pages  │  │ Student Layout │  │  Tutor Layout │
│                │  │                │  │               │
│ • Landing      │  │ • Sidebar      │  │ • Sidebar     │
│ • Login        │  │ • Topbar       │  │ • Topbar      │
│ • Signup       │  │ • XP Badge     │  │ • Earnings    │
│ • Blog         │  │ • Streak       │  │ • Rating      │
└────────────────┘  └───────┬────────┘  └───────┬───────┘
                            │                   │
                    ┌───────┴────────┐  ┌───────┴────────┐
                    │ Student Pages  │  │  Tutor Pages   │
                    │                │  │                │
                    │ • Dashboard    │  │ • Dashboard    │
                    │ • Practice     │  │ • Schedule     │
                    │ • Mock Exam    │  │ • Students     │
                    │ • Flashcards   │  │ • Studio       │
                    │ • Analytics    │  │ • Earnings     │
                    │ • Achievements │  │ • Reviews      │
                    │ • Groups       │  │ • Profile      │
                    │ • Revision Plan│  │                │
                    │ • Tutors       │  │                │
                    │ • Bookings     │  │                │
                    │ • Settings     │  │                │
                    └────────────────┘  └────────────────┘
```


## 3. Data Models

### 3.1 Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│   profiles   │         │ student_profiles │         │student_answers│
│──────────────│         │──────────────────│         │──────────────│
│ id (PK)      │◄────────│ id (FK)          │         │ id (PK)      │
│ role         │         │ cadre            │         │ student_id   │
│ full_name    │         │ specialty        │         │ question_id  │
│ email        │         │ institution      │         │ selected_opt │
│ phone        │         │ exam_date        │         │ is_correct   │
│ avatar_url   │         │ exam_cycle       │         │ time_taken   │
│ created_at   │         │ xp               │         │ mode         │
└──────┬───────┘         │ level            │         │ answered_at  │
       │                 │ streak_count     │         └──────┬───────┘
       │                 │ last_study_date  │                │
       │                 │ plan_tier        │                │
       │                 │ plan_expires_at  │                │
       │                 └──────────────────┘                │
       │                                                     │
       │                 ┌──────────────────┐                │
       │                 │  tutor_profiles  │                │
       │                 │──────────────────│                │
       └─────────────────┤ id (FK)          │                │
                         │ nck_reg_number   │                │
                         │ professional_title│               │
                         │ bio              │                │
                         │ years_experience │                │
                         │ cadres_taught[]  │                │
                         │ specialties[]    │                │
                         │ rate_per_hour    │                │
                         │ verification_status│              │
                         │ verification_tier│                │
                         │ whatsapp_number  │                │
                         │ total_students   │                │
                         │ total_sessions   │                │
                         │ average_rating   │                │
                         │ pass_rate        │                │
                         │ is_accepting_bookings│            │
                         │ session_platform[]│               │
                         │ allow_instant_booking│            │
                         │ allow_group_sessions│             │
                         │ buffer_minutes   │                │
                         └──────┬───────────┘                │
                                │                            │
                                │                            │
┌──────────────┐                │                            │
│  questions   │                │                            │
│──────────────│                │                            │
│ id (PK)      │◄───────────────┼────────────────────────────┘
│ cadre        │                │
│ unit         │                │
│ topic        │                │
│ stem         │                │
│ option_a     │                │
│ option_b     │                │
│ option_c     │                │
│ option_d     │                │
│ correct_option│               │
│ rationale    │                │
│ rationale_a  │                │
│ rationale_b  │                │
│ rationale_c  │                │
│ rationale_d  │                │
│ difficulty   │                │
│ contributor_id│               │
│ status       │                │
│ exam_year    │                │
│ paper        │                │
│ views        │                │
│ created_at   │                │
└──────────────┘                │
                                │
┌──────────────────┐            │
│tutor_availability│            │
│──────────────────│            │
│ id (PK)          │            │
│ tutor_id (FK)    │◄───────────┘
│ day_of_week      │
│ start_time       │
│ end_time         │
│ is_active        │
└──────┬───────────┘
       │
       │
┌──────▼───────┐         ┌──────────────────┐
│   sessions   │         │ session_reviews  │
│──────────────│         │──────────────────│
│ id (PK)      │◄────────│ id (PK)          │
│ student_id   │         │ session_id (FK)  │
│ tutor_id     │         │ student_id (FK)  │
│ session_date │         │ tutor_id (FK)    │
│ start_time   │         │ rating           │
│ end_time     │         │ review_text      │
│ cadre        │         │ keywords[]       │
│ topic        │         │ is_published     │
│ platform     │         │ created_at       │
│ join_link    │         └──────────────────┘
│ student_note │
│ tutor_note   │
│ duration_min │
│ rate_per_hour│
│ gross_amount │
│ platform_fee │
│ net_amount   │
│ status       │
│ payment_status│
│ mpesa_txn_id │
│ booked_at    │
│ completed_at │
│ reviewed     │
└──────────────┘

┌──────────────────┐         ┌──────────────────┐
│mock_exam_results │         │   flashcards     │
│──────────────────│         │──────────────────│
│ id (PK)          │         │ id (PK)          │
│ student_id (FK)  │         │ deck_id (FK)     │
│ cadre            │         │ front_text       │
│ paper            │         │ back_text        │
│ total_questions  │         │ back_highlight   │
│ correct_answers  │         │ cadre            │
│ score_percentage │         │ unit             │
│ time_used_min    │         │ contributor_id   │
│ passed           │         └──────┬───────────┘
│ started_at       │                │
│ completed_at     │                │
└──────────────────┘                │
                                    │
┌──────────────────┐                │
│flashcard_progress│                │
│──────────────────│                │
│ id (PK)          │                │
│ student_id (FK)  │                │
│ card_id (FK)     │◄───────────────┘
│ ease_factor      │
│ interval_days    │
│ repetitions      │
│ rating           │
│ next_review_at   │
│ last_reviewed_at │
│ updated_at       │
└──────────────────┘

┌──────────────────┐         ┌──────────────────┐
│  study_groups    │         │  group_members   │
│──────────────────│         │──────────────────│
│ id (PK)          │◄────────│ group_id (FK)    │
│ name             │         │ student_id (FK)  │
│ description      │         │ role             │
│ cadre            │         │ joined_at        │
│ exam_cycle       │         └──────────────────┘
│ privacy          │
│ creator_id (FK)  │
│ member_count     │
│ max_members      │
│ created_at       │
└──────────────────┘

┌──────────────────┐         ┌──────────────────┐
│ revision_plans   │         │    payments      │
│──────────────────│         │──────────────────│
│ id (PK)          │         │ id (PK)          │
│ student_id (FK)  │         │ user_id (FK)     │
│ cadre            │         │ type             │
│ exam_date        │         │ amount           │
│ days_available   │         │ currency         │
│ study_hrs_weekday│         │ mpesa_phone      │
│ study_hrs_weekend│         │ mpesa_receipt    │
│ work_school_status│        │ status           │
│ plan_html        │         │ reference_id     │
│ plan_data (jsonb)│         │ initiated_at     │
│ generated_at     │         │ completed_at     │
│ payment_ref      │         └──────────────────┘
│ share_token      │
└──────────────────┘

┌──────────────────┐         ┌──────────────────┐
│ student_badges   │         │ notifications    │
│──────────────────│         │──────────────────│
│ id (PK)          │         │ id (PK)          │
│ student_id (FK)  │         │ user_id (FK)     │
│ badge_id         │         │ type             │
│ earned_at        │         │ title            │
└──────────────────┘         │ body             │
                             │ is_read          │
                             │ action_url       │
                             │ created_at       │
                             └──────────────────┘
```


### 3.2 Core Table Schemas

#### profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'tutor', 'admin')) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

#### student_profiles
```sql
CREATE TABLE student_profiles (
  id UUID REFERENCES profiles PRIMARY KEY,
  cadre TEXT CHECK (cadre IN ('KRCHN', 'BScN', 'Higher Diploma')) NOT NULL,
  specialty TEXT,
  institution TEXT,
  exam_date DATE NOT NULL,
  exam_cycle TEXT CHECK (exam_cycle IN ('February', 'May', 'August', 'November')) NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  last_study_date DATE,
  plan_tier TEXT CHECK (plan_tier IN ('free', 'daily', 'weekly', 'standard', 'premium')) DEFAULT 'free',
  plan_expires_at TIMESTAMPTZ
);

-- RLS Policies
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own profile"
  ON student_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON student_profiles FOR UPDATE
  USING (auth.uid() = id);
```

#### tutor_profiles
```sql
CREATE TABLE tutor_profiles (
  id UUID REFERENCES profiles PRIMARY KEY,
  nck_reg_number TEXT UNIQUE NOT NULL,
  professional_title TEXT NOT NULL,
  bio TEXT,
  years_experience INTEGER NOT NULL,
  cadres_taught TEXT[] NOT NULL,
  specialties TEXT[],
  rate_per_hour INTEGER NOT NULL,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  verification_tier TEXT CHECK (verification_tier IN ('standard', 'gold')),
  whatsapp_number TEXT,
  total_students INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  average_rating NUMERIC(3,2) DEFAULT 0,
  pass_rate NUMERIC(5,2) DEFAULT 0,
  is_accepting_bookings BOOLEAN DEFAULT TRUE,
  session_platform TEXT[] DEFAULT ARRAY['Zoom', 'Google Meet', 'WhatsApp'],
  allow_instant_booking BOOLEAN DEFAULT TRUE,
  allow_group_sessions BOOLEAN DEFAULT FALSE,
  buffer_minutes INTEGER DEFAULT 30
);

-- RLS Policies
ALTER TABLE tutor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view own profile"
  ON tutor_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Tutors can update own profile"
  ON tutor_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Students can view verified tutors"
  ON tutor_profiles FOR SELECT
  USING (verification_status = 'verified');
```

#### questions
```sql
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cadre TEXT NOT NULL,
  unit TEXT NOT NULL,
  topic TEXT NOT NULL,
  stem TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT CHECK (correct_option IN ('A','B','C','D')) NOT NULL,
  rationale TEXT NOT NULL,
  rationale_a TEXT,
  rationale_b TEXT,
  rationale_c TEXT,
  rationale_d TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  contributor_id UUID REFERENCES profiles,
  status TEXT CHECK (status IN ('pending_review', 'approved', 'rejected', 'needs_revision')) DEFAULT 'approved',
  exam_year INTEGER,
  paper TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_cadre_unit ON questions(cadre, unit);
CREATE INDEX idx_questions_status ON questions(status);

-- RLS Policies
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view approved questions"
  ON questions FOR SELECT
  USING (auth.role() = 'authenticated' AND status = 'approved');

CREATE POLICY "Contributors can view own questions"
  ON questions FOR SELECT
  USING (auth.uid() = contributor_id);
```


#### tutor_availability
```sql
CREATE TABLE tutor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES profiles NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(tutor_id, day_of_week, start_time)
);

CREATE INDEX idx_availability_tutor ON tutor_availability(tutor_id);

-- RLS Policies
ALTER TABLE tutor_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can manage own availability"
  ON tutor_availability FOR ALL
  USING (auth.uid() = tutor_id);

CREATE POLICY "Students can view active availability"
  ON tutor_availability FOR SELECT
  USING (is_active = TRUE);
```

#### sessions
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  tutor_id UUID REFERENCES profiles NOT NULL,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  cadre TEXT NOT NULL,
  topic TEXT,
  platform TEXT CHECK (platform IN ('Zoom', 'Google Meet', 'WhatsApp')) NOT NULL,
  join_link TEXT,
  student_note TEXT,
  tutor_note TEXT,
  duration_minutes INTEGER NOT NULL,
  rate_per_hour INTEGER NOT NULL,
  gross_amount INTEGER NOT NULL,
  platform_fee INTEGER NOT NULL,
  net_amount INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending_approval', 'confirmed', 'completed', 'cancelled', 'no_show')) DEFAULT 'confirmed',
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')) DEFAULT 'pending',
  mpesa_transaction_id TEXT,
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  reviewed BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_sessions_student ON sessions(student_id);
CREATE INDEX idx_sessions_tutor ON sessions(tutor_id);
CREATE INDEX idx_sessions_date ON sessions(session_date);

-- RLS Policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = tutor_id);

CREATE POLICY "Students can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Tutors can update own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = tutor_id);
```

#### student_answers
```sql
CREATE TABLE student_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles NOT NULL,
  question_id UUID REFERENCES questions NOT NULL,
  selected_option TEXT CHECK (selected_option IN ('A','B','C','D')) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INTEGER,
  mode TEXT CHECK (mode IN ('practice', 'mock_exam', 'weak_drill')) NOT NULL,
  session_id UUID,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_answers_student ON student_answers(student_id);
CREATE INDEX idx_answers_question ON student_answers(question_id);
CREATE INDEX idx_answers_student_question ON student_answers(student_id, question_id);

-- RLS Policies
ALTER TABLE student_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own answers"
  ON student_answers FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own answers"
  ON student_answers FOR INSERT
  WITH CHECK (auth.uid() = student_id);
```


## 4. Authentication & Authorization

### 4.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    STUDENT SIGNUP FLOW                       │
└─────────────────────────────────────────────────────────────┘

1. Student fills signup form
   ↓
2. POST /api/auth/signup
   ↓
3. Supabase Auth creates user
   ↓
4. Database trigger creates profiles record
   ↓
5. Database trigger creates student_profiles record
   ↓
6. Send verification email
   ↓
7. Student verifies email
   ↓
8. Redirect to /dashboard
   ↓
9. Show onboarding diagnostic quiz (10 questions)
   ↓
10. Calculate baseline performance
    ↓
11. Dashboard ready


┌─────────────────────────────────────────────────────────────┐
│                    TUTOR APPLICATION FLOW                    │
└─────────────────────────────────────────────────────────────┘

1. Tutor fills multi-step application
   ↓
2. POST /api/auth/signup-tutor
   ↓
3. Supabase Auth creates user
   ↓
4. Database trigger creates profiles record
   ↓
5. Database trigger creates tutor_profiles record (status: pending)
   ↓
6. Upload documents to Supabase Storage
   ↓
7. Send notification to admin
   ↓
8. Admin reviews application
   ↓
9. Admin approves/rejects
   ↓
10. If approved:
    - Update verification_status to 'verified'
    - Send WhatsApp notification to tutor
    - Tutor can access tutor dashboard
    ↓
11. If rejected:
    - Send email with reason
    - Allow reapplication
```

### 4.2 Middleware-Based Route Protection

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  // Public routes - allow access
  if (req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/signup') ||
      req.nextUrl.pathname === '/') {
    return res
  }
  
  // Protected routes - require auth
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Get user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()
  
  // Student routes - redirect tutors
  if (req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/practice') ||
      req.nextUrl.pathname.startsWith('/mock-exam')) {
    if (profile?.role === 'tutor') {
      return NextResponse.redirect(new URL('/tutor-dashboard', req.url))
    }
  }
  
  // Tutor routes - redirect students
  if (req.nextUrl.pathname.startsWith('/tutor-')) {
    if (profile?.role === 'student') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // Check tutor verification status
    const { data: tutorProfile } = await supabase
      .from('tutor_profiles')
      .select('verification_status')
      .eq('id', session.user.id)
      .single()
    
    if (tutorProfile?.verification_status !== 'verified') {
      return NextResponse.redirect(new URL('/tutor-pending', req.url))
    }
  }
  
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
```

### 4.3 Row Level Security Policies

**Key RLS Principles:**
1. Students can only access their own data
2. Tutors can access their own data + their students' session-related data
3. Approved questions are visible to all authenticated users
4. Tutor availability is visible to all students
5. Session data is visible to both student and tutor involved


## 5. Real-Time Synchronization Architecture

### 5.1 Supabase Realtime for Availability Sync

**Problem:** When a tutor updates availability or a student books a session, all connected clients must see the change within 2 seconds to prevent double-bookings.

**Solution:** Supabase Realtime WebSocket subscriptions

```typescript
// lib/realtime/availability-sync.ts

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RealtimeChannel } from '@supabase/supabase-js'

export class AvailabilitySync {
  private channel: RealtimeChannel | null = null
  private supabase = createClientComponentClient()
  
  /**
   * Subscribe to tutor availability changes
   * Used by: Student booking page, Tutor schedule page
   */
  subscribeToAvailability(tutorId: string, callback: (payload: any) => void) {
    this.channel = this.supabase
      .channel(`availability:${tutorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tutor_availability',
          filter: `tutor_id=eq.${tutorId}`
        },
        callback
      )
      .subscribe()
    
    return this.channel
  }
  
  /**
   * Subscribe to session bookings
   * Used by: Student booking page, Tutor schedule page
   */
  subscribeToSessions(userId: string, role: 'student' | 'tutor', callback: (payload: any) => void) {
    const filter = role === 'student' 
      ? `student_id=eq.${userId}`
      : `tutor_id=eq.${userId}`
    
    this.channel = this.supabase
      .channel(`sessions:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sessions',
          filter
        },
        callback
      )
      .subscribe()
    
    return this.channel
  }
  
  /**
   * Broadcast presence (who's viewing the booking page)
   * Prevents race conditions
   */
  broadcastPresence(tutorId: string, userId: string) {
    this.channel = this.supabase
      .channel(`presence:${tutorId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel?.presenceState()
        console.log('Active viewers:', state)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await this.channel?.track({
            user_id: userId,
            online_at: new Date().toISOString()
          })
        }
      })
    
    return this.channel
  }
  
  unsubscribe() {
    if (this.channel) {
      this.supabase.removeChannel(this.channel)
      this.channel = null
    }
  }
}
```

### 5.2 Booking Flow with Race Condition Prevention

```typescript
// lib/booking/create-booking.ts

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function createBooking(params: {
  tutorId: string
  studentId: string
  sessionDate: string
  startTime: string
  endTime: string
  cadre: string
  topic: string
  platform: string
  durationMinutes: number
  ratePerHour: number
}) {
  const supabase = createClientComponentClient()
  
  // Use Supabase RPC function for atomic booking
  const { data, error } = await supabase.rpc('create_booking_atomic', {
    p_tutor_id: params.tutorId,
    p_student_id: params.studentId,
    p_session_date: params.sessionDate,
    p_start_time: params.startTime,
    p_end_time: params.endTime,
    p_cadre: params.cadre,
    p_topic: params.topic,
    p_platform: params.platform,
    p_duration_minutes: params.durationMinutes,
    p_rate_per_hour: params.ratePerHour
  })
  
  if (error) {
    if (error.message.includes('slot_already_booked')) {
      throw new Error('This time slot was just booked by another student. Please select a different time.')
    }
    throw error
  }
  
  return data
}
```

```sql
-- Supabase Edge Function: create_booking_atomic
-- Prevents race conditions using database-level locking

CREATE OR REPLACE FUNCTION create_booking_atomic(
  p_tutor_id UUID,
  p_student_id UUID,
  p_session_date DATE,
  p_start_time TIME,
  p_end_time TIME,
  p_cadre TEXT,
  p_topic TEXT,
  p_platform TEXT,
  p_duration_minutes INTEGER,
  p_rate_per_hour INTEGER
) RETURNS UUID AS $$
DECLARE
  v_session_id UUID;
  v_gross_amount INTEGER;
  v_platform_fee INTEGER;
  v_net_amount INTEGER;
  v_existing_session UUID;
BEGIN
  -- Lock the tutor's availability row to prevent concurrent bookings
  PERFORM * FROM tutor_availability
  WHERE tutor_id = p_tutor_id
    AND day_of_week = EXTRACT(DOW FROM p_session_date)
    AND start_time <= p_start_time
    AND end_time >= p_end_time
    AND is_active = TRUE
  FOR UPDATE;
  
  -- Check if slot is already booked
  SELECT id INTO v_existing_session
  FROM sessions
  WHERE tutor_id = p_tutor_id
    AND session_date = p_session_date
    AND start_time = p_start_time
    AND status IN ('confirmed', 'pending_approval');
  
  IF v_existing_session IS NOT NULL THEN
    RAISE EXCEPTION 'slot_already_booked';
  END IF;
  
  -- Calculate amounts
  v_gross_amount := (p_rate_per_hour * p_duration_minutes) / 60;
  v_platform_fee := ROUND(v_gross_amount * 0.15);
  v_net_amount := v_gross_amount - v_platform_fee;
  
  -- Create session
  INSERT INTO sessions (
    student_id, tutor_id, session_date, start_time, end_time,
    cadre, topic, platform, duration_minutes, rate_per_hour,
    gross_amount, platform_fee, net_amount, status, payment_status
  ) VALUES (
    p_student_id, p_tutor_id, p_session_date, p_start_time, p_end_time,
    p_cadre, p_topic, p_platform, p_duration_minutes, p_rate_per_hour,
    v_gross_amount, v_platform_fee, v_net_amount, 'confirmed', 'pending'
  ) RETURNING id INTO v_session_id;
  
  RETURN v_session_id;
END;
$$ LANGUAGE plpgsql;
```


## 6. Payment Integration Architecture

### 6.1 M-Pesa Daraja API Integration

```
┌─────────────────────────────────────────────────────────────┐
│                    M-PESA PAYMENT FLOW                       │
└─────────────────────────────────────────────────────────────┘

1. Student initiates payment (subscription/revision plan/session)
   ↓
2. Frontend calls POST /api/mpesa/stkpush
   ↓
3. Backend generates OAuth token from Daraja API
   ↓
4. Backend calls Daraja STK Push API
   {
     "BusinessShortCode": "174379",
     "Password": "base64(shortcode + passkey + timestamp)",
     "Timestamp": "20260519143045",
     "TransactionType": "CustomerPayBillOnline",
     "Amount": "500",
     "PartyA": "254712345678",
     "PartyB": "174379",
     "PhoneNumber": "254712345678",
     "CallBackURL": "https://nursefiti.com/api/mpesa/callback",
     "AccountReference": "NurseFiti",
     "TransactionDesc": "Revision Plan Purchase"
   }
   ↓
5. Daraja sends STK Push to student's phone
   ↓
6. Student enters M-Pesa PIN on phone
   ↓
7. Daraja processes payment
   ↓
8. Daraja calls callback URL with result
   POST /api/mpesa/callback
   {
     "Body": {
       "stkCallback": {
         "MerchantRequestID": "...",
         "CheckoutRequestID": "...",
         "ResultCode": 0,
         "ResultDesc": "The service request is processed successfully.",
         "CallbackMetadata": {
           "Item": [
             { "Name": "Amount", "Value": 500 },
             { "Name": "MpesaReceiptNumber", "Value": "QGH7..." },
             { "Name": "TransactionDate", "Value": 20260519143045 },
             { "Name": "PhoneNumber", "Value": 254712345678 }
           ]
         }
       }
     }
   }
   ↓
9. Backend updates payment record in database
   ↓
10. Backend provisions access (update plan_tier, create revision_plan, confirm session)
    ↓
11. Backend sends WhatsApp notification
    ↓
12. Frontend polls payment status or receives realtime update
```

### 6.2 Payment API Routes

```typescript
// app/api/mpesa/stkpush/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { initiateMpesaPayment } from '@/lib/mpesa/stk-push'

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  // Verify authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await req.json()
  const { amount, phone, type, referenceId } = body
  
  // Validate inputs
  if (!amount || !phone || !type) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  
  // Create payment record
  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      user_id: session.user.id,
      type,
      amount,
      currency: 'KES',
      mpesa_phone: phone,
      status: 'pending',
      reference_id: referenceId
    })
    .select()
    .single()
  
  if (paymentError) {
    return NextResponse.json({ error: 'Failed to create payment record' }, { status: 500 })
  }
  
  // Initiate M-Pesa STK Push
  try {
    const mpesaResponse = await initiateMpesaPayment({
      amount,
      phone,
      accountReference: `NurseFiti-${payment.id}`,
      transactionDesc: getTransactionDescription(type)
    })
    
    // Update payment with checkout request ID
    await supabase
      .from('payments')
      .update({ 
        mpesa_checkout_request_id: mpesaResponse.CheckoutRequestID 
      })
      .eq('id', payment.id)
    
    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      checkoutRequestId: mpesaResponse.CheckoutRequestID,
      message: 'Please check your phone and enter M-Pesa PIN'
    })
  } catch (error) {
    // Update payment status to failed
    await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('id', payment.id)
    
    return NextResponse.json({ 
      error: 'Failed to initiate M-Pesa payment',
      details: error.message 
    }, { status: 500 })
  }
}

function getTransactionDescription(type: string): string {
  switch (type) {
    case 'plan_subscription':
      return 'NurseFiti Subscription'
    case 'revision_plan':
      return 'NCK Revision Plan'
    case 'session_booking':
      return 'Tutor Session Booking'
    default:
      return 'NurseFiti Payment'
  }
}
```


```typescript
// app/api/mpesa/callback/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWhatsAppNotification } from '@/lib/whatsapp/send-notification'

// Use service role key for callback (no user session)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  const { Body: { stkCallback } } = body
  const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback
  
  // Find payment record
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('mpesa_checkout_request_id', CheckoutRequestID)
    .single()
  
  if (!payment) {
    console.error('Payment not found for CheckoutRequestID:', CheckoutRequestID)
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  }
  
  // Payment successful
  if (ResultCode === 0) {
    const metadata = CallbackMetadata.Item
    const mpesaReceipt = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value
    
    // Update payment record
    await supabase
      .from('payments')
      .update({
        status: 'completed',
        mpesa_receipt: mpesaReceipt,
        completed_at: new Date().toISOString()
      })
      .eq('id', payment.id)
    
    // Provision access based on payment type
    await provisionAccess(payment)
    
    // Send WhatsApp notification
    await sendWhatsAppNotification({
      to: payment.mpesa_phone,
      template: 'payment_success',
      params: {
        amount: payment.amount,
        receipt: mpesaReceipt,
        type: payment.type
      }
    })
  } else {
    // Payment failed
    await supabase
      .from('payments')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString()
      })
      .eq('id', payment.id)
  }
  
  return NextResponse.json({ success: true })
}

async function provisionAccess(payment: any) {
  switch (payment.type) {
    case 'plan_subscription':
      // Update student plan tier
      const expiresAt = new Date()
      expiresAt.setMonth(expiresAt.getMonth() + 1) // 1 month subscription
      
      await supabase
        .from('student_profiles')
        .update({
          plan_tier: 'standard',
          plan_expires_at: expiresAt.toISOString()
        })
        .eq('id', payment.user_id)
      break
    
    case 'revision_plan':
      // Trigger revision plan generation
      // This will be handled by a separate API route
      break
    
    case 'session_booking':
      // Confirm session booking
      await supabase
        .from('sessions')
        .update({
          payment_status: 'paid',
          status: 'confirmed'
        })
        .eq('id', payment.reference_id)
      break
  }
}
```

### 6.3 Tutor Payout (B2C)

```typescript
// app/api/mpesa/b2c/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { initiateMpesaPayout } from '@/lib/mpesa/b2c'

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  // Verify tutor authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Get tutor profile
  const { data: tutor } = await supabase
    .from('tutor_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  if (!tutor) {
    return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
  }
  
  // Calculate available balance
  const { data: sessions } = await supabase
    .from('sessions')
    .select('net_amount')
    .eq('tutor_id', session.user.id)
    .eq('status', 'completed')
    .eq('payment_status', 'paid')
  
  const totalEarnings = sessions?.reduce((sum, s) => sum + s.net_amount, 0) || 0
  
  // Get previous payouts
  const { data: previousPayouts } = await supabase
    .from('tutor_payouts')
    .select('amount')
    .eq('tutor_id', session.user.id)
    .eq('status', 'completed')
  
  const totalPaidOut = previousPayouts?.reduce((sum, p) => sum + p.amount, 0) || 0
  const availableBalance = totalEarnings - totalPaidOut
  
  // Check minimum payout threshold
  if (availableBalance < 1000) {
    return NextResponse.json({ 
      error: 'Minimum payout amount is KSh 1,000',
      availableBalance 
    }, { status: 400 })
  }
  
  // Initiate B2C payout
  try {
    const mpesaResponse = await initiateMpesaPayout({
      amount: availableBalance,
      phone: tutor.whatsapp_number,
      remarks: 'NurseFiti Tutor Earnings'
    })
    
    // Create payout record
    await supabase
      .from('tutor_payouts')
      .insert({
        tutor_id: session.user.id,
        amount: availableBalance,
        mpesa_conversation_id: mpesaResponse.ConversationID,
        status: 'pending'
      })
    
    return NextResponse.json({
      success: true,
      amount: availableBalance,
      message: 'Payout initiated. You will receive M-Pesa within 5 minutes.'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to initiate payout',
      details: error.message 
    }, { status: 500 })
  }
}
```


## 7. Key Algorithms

### 7.1 Spaced Repetition System (SRS) for Flashcards

**Algorithm:** Modified SM-2 (SuperMemo 2)

```typescript
// lib/algorithms/srs.ts

export interface FlashcardProgress {
  ease_factor: number      // Default: 2.5
  interval_days: number    // Days until next review
  repetitions: number      // Number of successful reviews
  next_review_at: Date
}

export type Rating = 'again' | 'hard' | 'good' | 'easy'

/**
 * Calculate next review date based on student rating
 * @param currentProgress - Current flashcard progress
 * @param rating - Student's difficulty rating
 * @returns Updated progress with new review date
 */
export function calculateNextReview(
  currentProgress: FlashcardProgress,
  rating: Rating
): FlashcardProgress {
  let { ease_factor, interval_days, repetitions } = currentProgress
  
  switch (rating) {
    case 'again':
      // Reset progress, review in 1 minute
      return {
        ease_factor: Math.max(1.3, ease_factor - 0.2),
        interval_days: 0,
        repetitions: 0,
        next_review_at: new Date(Date.now() + 60 * 1000) // 1 minute
      }
    
    case 'hard':
      // Slight decrease in ease, review in 1 day
      ease_factor = Math.max(1.3, ease_factor - 0.15)
      interval_days = 1
      repetitions = Math.max(0, repetitions - 1)
      break
    
    case 'good':
      // Standard progression
      if (repetitions === 0) {
        interval_days = 1
      } else if (repetitions === 1) {
        interval_days = 3
      } else {
        interval_days = Math.round(interval_days * ease_factor)
      }
      repetitions += 1
      break
    
    case 'easy':
      // Accelerated progression
      ease_factor = ease_factor + 0.15
      if (repetitions === 0) {
        interval_days = 3
      } else if (repetitions === 1) {
        interval_days = 7
      } else {
        interval_days = Math.round(interval_days * ease_factor * 1.3)
      }
      repetitions += 1
      break
  }
  
  // Calculate next review date
  const next_review_at = new Date()
  next_review_at.setDate(next_review_at.getDate() + interval_days)
  
  return {
    ease_factor,
    interval_days,
    repetitions,
    next_review_at
  }
}

/**
 * Get flashcards due for review
 * @param studentId - Student UUID
 * @param limit - Maximum number of cards to return
 * @returns Array of flashcard IDs due for review
 */
export async function getDueFlashcards(
  studentId: string,
  limit: number = 20
): Promise<string[]> {
  const supabase = createClientComponentClient()
  
  const { data } = await supabase
    .from('flashcard_progress')
    .select('card_id')
    .eq('student_id', studentId)
    .lte('next_review_at', new Date().toISOString())
    .order('next_review_at', { ascending: true })
    .limit(limit)
  
  return data?.map(p => p.card_id) || []
}
```

### 7.2 AI-Powered Study Recommendations

```typescript
// lib/algorithms/recommendations.ts

export interface TopicPerformance {
  topic: string
  unit: string
  total_questions: number
  correct_answers: number
  accuracy: number
  last_practiced: Date
}

/**
 * Analyze student performance and generate recommendations
 * @param studentId - Student UUID
 * @returns Recommended topics and study actions
 */
export async function generateRecommendations(studentId: string) {
  const supabase = createClientComponentClient()
  
  // Get student's answer history
  const { data: answers } = await supabase
    .from('student_answers')
    .select(`
      is_correct,
      answered_at,
      questions (
        unit,
        topic,
        cadre
      )
    `)
    .eq('student_id', studentId)
    .order('answered_at', { ascending: false })
    .limit(500)
  
  if (!answers || answers.length < 10) {
    return {
      message: 'Complete at least 10 practice questions to get personalized recommendations',
      recommendations: []
    }
  }
  
  // Calculate performance by topic
  const topicStats = new Map<string, TopicPerformance>()
  
  answers.forEach(answer => {
    const topic = answer.questions.topic
    const unit = answer.questions.unit
    
    if (!topicStats.has(topic)) {
      topicStats.set(topic, {
        topic,
        unit,
        total_questions: 0,
        correct_answers: 0,
        accuracy: 0,
        last_practiced: new Date(answer.answered_at)
      })
    }
    
    const stats = topicStats.get(topic)!
    stats.total_questions += 1
    if (answer.is_correct) {
      stats.correct_answers += 1
    }
    stats.accuracy = (stats.correct_answers / stats.total_questions) * 100
  })
  
  // Convert to array and sort by priority
  const topics = Array.from(topicStats.values())
  
  // Priority score: (100 - accuracy) * recency_weight
  const now = Date.now()
  topics.forEach(topic => {
    const daysSinceLastPractice = (now - topic.last_practiced.getTime()) / (1000 * 60 * 60 * 24)
    const recencyWeight = Math.min(daysSinceLastPractice / 7, 2) // Max 2x weight after 14 days
    topic.priority = (100 - topic.accuracy) * recencyWeight
  })
  
  // Sort by priority (highest first)
  topics.sort((a, b) => b.priority - a.priority)
  
  // Generate recommendations
  const recommendations = []
  
  // Weak areas (accuracy < 70%)
  const weakTopics = topics.filter(t => t.accuracy < 70).slice(0, 3)
  if (weakTopics.length > 0) {
    recommendations.push({
      type: 'weak_area_drill',
      title: 'Focus on Weak Areas',
      topics: weakTopics.map(t => t.topic),
      reason: 'These topics need more practice to reach mastery',
      action: 'Start Weak Area Drill',
      actionUrl: '/practice?mode=weak_drill'
    })
  }
  
  // Neglected topics (not practiced in 7+ days)
  const neglectedTopics = topics.filter(t => {
    const daysSince = (now - t.last_practiced.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince >= 7
  }).slice(0, 2)
  
  if (neglectedTopics.length > 0) {
    recommendations.push({
      type: 'review',
      title: 'Review Neglected Topics',
      topics: neglectedTopics.map(t => t.topic),
      reason: 'You haven\'t practiced these in over a week',
      action: 'Review Now',
      actionUrl: `/practice?topics=${neglectedTopics.map(t => t.topic).join(',')}`
    })
  }
  
  // Flashcard recommendations for weak topics
  if (weakTopics.length > 0) {
    recommendations.push({
      type: 'flashcards',
      title: 'Study Flashcards',
      topics: weakTopics.map(t => t.topic),
      reason: 'Flashcards help reinforce weak areas',
      action: 'Start Flashcard Session',
      actionUrl: `/flashcards?topics=${weakTopics.map(t => t.topic).join(',')}`
    })
  }
  
  // Mock exam recommendation (if overall accuracy > 60%)
  const overallAccuracy = (answers.filter(a => a.is_correct).length / answers.length) * 100
  if (overallAccuracy >= 60 && answers.length >= 100) {
    recommendations.push({
      type: 'mock_exam',
      title: 'Take a Mock Exam',
      reason: `Your overall accuracy is ${overallAccuracy.toFixed(1)}%. Test yourself with a full mock exam.`,
      action: 'Start Mock Exam',
      actionUrl: '/mock-exam'
    })
  }
  
  return {
    overallAccuracy,
    totalQuestions: answers.length,
    recommendations
  }
}
```


### 7.3 Gamification System

```typescript
// lib/algorithms/gamification.ts

export const XP_REWARDS = {
  CORRECT_ANSWER: 8,
  MOCK_EXAM_COMPLETE: 200,
  FLASHCARD_SESSION: 30,
  STREAK_DAY: 50,
  DAILY_CHALLENGE_EASY: 60,
  DAILY_CHALLENGE_MEDIUM: 80,
  DAILY_CHALLENGE_HARD: 200,
  CONTENT_CONTRIBUTION: 50,
  TUTOR_SESSION_COMPLETE: 100
}

export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  200,    // Level 2
  500,    // Level 3
  900,    // Level 4
  1400,   // Level 5
  2000,   // Level 6
  2700,   // Level 7
  3500,   // Level 8
  4400,   // Level 9
  5400,   // Level 10
  // Continue pattern: +100, +200, +300, etc.
]

export const BADGES = {
  STREAK_MASTER: {
    id: 'streak_master',
    name: 'Streak Master',
    description: '14-day study streak',
    icon: '🔥',
    condition: (student: any) => student.streak_count >= 14
  },
  PHARMA_WARRIOR: {
    id: 'pharma_warrior',
    name: 'Pharma Warrior',
    description: '100 Pharmacology questions answered',
    icon: '💊',
    condition: async (studentId: string) => {
      const count = await getTopicAnswerCount(studentId, 'Pharmacology')
      return count >= 100
    }
  },
  MOCK_MAESTRO: {
    id: 'mock_maestro',
    name: 'Mock Maestro',
    description: '3 full mock exams completed',
    icon: '📝',
    condition: async (studentId: string) => {
      const count = await getMockExamCount(studentId)
      return count >= 3
    }
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Finish mock exam 20+ minutes early',
    icon: '⚡',
    condition: (mockExam: any) => {
      const timeLimit = 120 // 2 hours in minutes
      return (timeLimit - mockExam.time_used_minutes) >= 20
    }
  },
  TOP_10_PERCENT: {
    id: 'top_10_percent',
    name: 'Top 10%',
    description: 'Reach 90th percentile in peer comparison',
    icon: '🏆',
    condition: async (studentId: string) => {
      const percentile = await getStudentPercentile(studentId)
      return percentile >= 90
    }
  },
  KNOWLEDGE_GOD: {
    id: 'knowledge_god',
    name: 'Knowledge God',
    description: 'Answer all 5,000 questions',
    icon: '👑',
    condition: async (studentId: string) => {
      const uniqueQuestions = await getUniqueQuestionsAnswered(studentId)
      return uniqueQuestions >= 5000
    }
  },
  PERFECT_SCORE: {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 90%+ on any mock exam',
    icon: '💯',
    condition: (mockExam: any) => mockExam.score_percentage >= 90
  },
  TEAM_CAPTAIN: {
    id: 'team_captain',
    name: 'Team Captain',
    description: 'Create and lead a study group',
    icon: '👥',
    condition: async (studentId: string) => {
      const isCreator = await isStudyGroupCreator(studentId)
      return isCreator
    }
  }
}

/**
 * Award XP to student and check for level up
 */
export async function awardXP(studentId: string, amount: number, reason: string) {
  const supabase = createClientComponentClient()
  
  // Get current student profile
  const { data: student } = await supabase
    .from('student_profiles')
    .select('xp, level')
    .eq('id', studentId)
    .single()
  
  if (!student) return
  
  const newXP = student.xp + amount
  const newLevel = calculateLevel(newXP)
  const leveledUp = newLevel > student.level
  
  // Update student profile
  await supabase
    .from('student_profiles')
    .update({ xp: newXP, level: newLevel })
    .eq('id', studentId)
  
  // Create notification
  await supabase
    .from('notifications')
    .insert({
      user_id: studentId,
      type: 'xp_earned',
      title: `+${amount} XP`,
      body: reason,
      is_read: false
    })
  
  // If leveled up, send special notification
  if (leveledUp) {
    await supabase
      .from('notifications')
      .insert({
        user_id: studentId,
        type: 'level_up',
        title: `Level Up! 🎉`,
        body: `You've reached Level ${newLevel}!`,
        is_read: false
      })
  }
  
  return { newXP, newLevel, leveledUp }
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

/**
 * Update student streak
 */
export async function updateStreak(studentId: string) {
  const supabase = createClientComponentClient()
  
  const { data: student } = await supabase
    .from('student_profiles')
    .select('streak_count, last_study_date')
    .eq('id', studentId)
    .single()
  
  if (!student) return
  
  const today = new Date().toISOString().split('T')[0]
  const lastStudyDate = student.last_study_date
  
  // Already studied today
  if (lastStudyDate === today) {
    return { streak: student.streak_count, continued: false }
  }
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  
  let newStreak = student.streak_count
  
  // Continued streak from yesterday
  if (lastStudyDate === yesterdayStr) {
    newStreak += 1
    await awardXP(studentId, XP_REWARDS.STREAK_DAY, `${newStreak}-day streak!`)
  } else {
    // Streak broken, reset to 1
    newStreak = 1
  }
  
  // Update student profile
  await supabase
    .from('student_profiles')
    .update({
      streak_count: newStreak,
      last_study_date: today
    })
    .eq('id', studentId)
  
  // Check for streak milestone badges
  if (newStreak === 7) {
    await awardBadge(studentId, 'WEEK_WARRIOR')
  } else if (newStreak === 14) {
    await awardBadge(studentId, 'STREAK_MASTER')
  } else if (newStreak === 30) {
    await awardBadge(studentId, 'MONTH_MASTER')
  }
  
  return { streak: newStreak, continued: true }
}

/**
 * Award badge to student
 */
export async function awardBadge(studentId: string, badgeId: string) {
  const supabase = createClientComponentClient()
  
  // Check if already earned
  const { data: existing } = await supabase
    .from('student_badges')
    .select('id')
    .eq('student_id', studentId)
    .eq('badge_id', badgeId)
    .single()
  
  if (existing) return
  
  // Award badge
  await supabase
    .from('student_badges')
    .insert({
      student_id: studentId,
      badge_id: badgeId
    })
  
  // Send notification
  const badge = Object.values(BADGES).find(b => b.id === badgeId)
  if (badge) {
    await supabase
      .from('notifications')
      .insert({
        user_id: studentId,
        type: 'badge_earned',
        title: `Badge Unlocked! ${badge.icon}`,
        body: `${badge.name}: ${badge.description}`,
        is_read: false
      })
  }
}
```


### 7.4 Revision Plan Generation Algorithm

```typescript
// lib/algorithms/revision-plan-generator.ts

export interface RevisionPlanInput {
  studentId: string
  cadre: 'KRCHN' | 'BScN' | 'Higher Diploma'
  specialty?: string
  examDate: Date
  studyHoursWeekday: number
  studyHoursWeekend: number
  workSchoolStatus: 'student' | 'working' | 'full_time_revision'
  studyPreference: 'morning' | 'evening' | 'split'
  includeResources: boolean
  includeDailySchedule: boolean
  includeMockExamSchedule: boolean
  revisionStyle: 'topic_by_topic' | 'mixed_daily' | 'paper_based'
}

export interface RevisionPlanOutput {
  planHtml: string
  planData: {
    weeks: WeekPlan[]
    totalStudyHours: number
    topicsTocover: string[]
    mockExamSchedule: MockExamSchedule[]
  }
}

interface WeekPlan {
  weekNumber: number
  startDate: Date
  endDate: Date
  topics: string[]
  studyHours: number
  activities: Activity[]
  checkpoint: string
}

interface Activity {
  day: string
  topic: string
  type: 'reading' | 'practice' | 'flashcards' | 'mock_exam' | 'review'
  duration: number
  resources?: string[]
}

/**
 * Generate personalized NCK revision plan
 */
export async function generateRevisionPlan(input: RevisionPlanInput): Promise<RevisionPlanOutput> {
  const supabase = createClientComponentClient()
  
  // Calculate available study time
  const today = new Date()
  const daysUntilExam = Math.floor((input.examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const weeksAvailable = Math.floor(daysUntilExam / 7)
  
  // Get student's performance data (if exists)
  const { data: answers } = await supabase
    .from('student_answers')
    .select(`
      is_correct,
      questions (unit, topic)
    `)
    .eq('student_id', input.studentId)
  
  // Calculate topic mastery
  const topicMastery = calculateTopicMastery(answers || [])
  
  // Load cadre-specific units
  const units = await loadCadreUnits(input.cadre, input.specialty)
  
  // Prioritize units based on NCK weight and student weakness
  const prioritizedUnits = prioritizeUnits(units, topicMastery)
  
  // Allocate weeks to units
  const weekPlans = allocateWeeksToUnits(
    prioritizedUnits,
    weeksAvailable,
    input.studyHoursWeekday,
    input.studyHoursWeekend,
    input.revisionStyle
  )
  
  // Add mock exam schedule (last 2 weeks)
  const mockExamSchedule = generateMockExamSchedule(input.cadre, input.examDate)
  
  // Generate daily schedule template
  const dailySchedule = input.includeDailySchedule
    ? generateDailyScheduleTemplate(input.studyHoursWeekday, input.studyPreference, input.workSchoolStatus)
    : null
  
  // Generate HTML output
  const planHtml = await generatePlanHTML({
    studentId: input.studentId,
    cadre: input.cadre,
    examDate: input.examDate,
    daysUntilExam,
    weekPlans,
    mockExamSchedule,
    dailySchedule,
    includeResources: input.includeResources,
    prioritizedUnits
  })
  
  return {
    planHtml,
    planData: {
      weeks: weekPlans,
      totalStudyHours: calculateTotalHours(weekPlans),
      topicsTocover: prioritizedUnits.map(u => u.name),
      mockExamSchedule
    }
  }
}

/**
 * Calculate topic mastery from student answers
 */
function calculateTopicMastery(answers: any[]): Map<string, number> {
  const topicStats = new Map<string, { correct: number, total: number }>()
  
  answers.forEach(answer => {
    const topic = answer.questions.unit
    if (!topicStats.has(topic)) {
      topicStats.set(topic, { correct: 0, total: 0 })
    }
    const stats = topicStats.get(topic)!
    stats.total += 1
    if (answer.is_correct) {
      stats.correct += 1
    }
  })
  
  const mastery = new Map<string, number>()
  topicStats.forEach((stats, topic) => {
    mastery.set(topic, (stats.correct / stats.total) * 100)
  })
  
  return mastery
}

/**
 * Prioritize units based on NCK weight and student weakness
 */
function prioritizeUnits(units: Unit[], topicMastery: Map<string, number>): PrioritizedUnit[] {
  return units.map(unit => {
    const studentMastery = topicMastery.get(unit.name) || 0
    const weakness = 100 - studentMastery
    
    // Priority = (NCK weight * 0.6) + (weakness * 0.4)
    const priority = (unit.nckWeight * 0.6) + (weakness * 0.4)
    
    return {
      ...unit,
      studentMastery,
      priority,
      tier: unit.nckWeight >= 8 ? 1 : unit.nckWeight >= 5 ? 2 : 3
    }
  }).sort((a, b) => b.priority - a.priority)
}

/**
 * Allocate weeks to units based on priority
 */
function allocateWeeksToUnits(
  units: PrioritizedUnit[],
  weeksAvailable: number,
  hoursWeekday: number,
  hoursWeekend: number,
  style: string
): WeekPlan[] {
  const weeklyHours = (hoursWeekday * 5) + (hoursWeekend * 2)
  const totalHoursAvailable = weeklyHours * weeksAvailable
  
  // Reserve last 2 weeks for mock exams
  const studyWeeks = Math.max(1, weeksAvailable - 2)
  
  // Allocate hours to units based on priority
  const unitHours = new Map<string, number>()
  let remainingHours = totalHoursAvailable * 0.7 // 70% for content, 30% for practice
  
  units.forEach(unit => {
    const hoursNeeded = unit.tier === 1 ? 12 : unit.tier === 2 ? 6 : 3
    const allocated = Math.min(hoursNeeded, remainingHours)
    unitHours.set(unit.name, allocated)
    remainingHours -= allocated
  })
  
  // Create week plans
  const weekPlans: WeekPlan[] = []
  let currentWeek = 0
  let currentDate = new Date()
  
  for (const unit of units) {
    if (currentWeek >= studyWeeks) break
    
    const hours = unitHours.get(unit.name) || 0
    const weeksForUnit = Math.ceil(hours / weeklyHours)
    
    for (let w = 0; w < weeksForUnit && currentWeek < studyWeeks; w++) {
      const startDate = new Date(currentDate)
      const endDate = new Date(currentDate)
      endDate.setDate(endDate.getDate() + 6)
      
      weekPlans.push({
        weekNumber: currentWeek + 1,
        startDate,
        endDate,
        topics: [unit.name],
        studyHours: weeklyHours,
        activities: generateWeekActivities(unit, hoursWeekday, hoursWeekend, style),
        checkpoint: `Complete ${unit.name} practice questions with 70%+ accuracy`
      })
      
      currentDate.setDate(currentDate.getDate() + 7)
      currentWeek++
    }
  }
  
  return weekPlans
}

/**
 * Generate mock exam schedule for final 2 weeks
 */
function generateMockExamSchedule(cadre: string, examDate: Date): MockExamSchedule[] {
  const schedule: MockExamSchedule[] = []
  const twoWeeksBefore = new Date(examDate)
  twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14)
  
  if (cadre === 'KRCHN') {
    // 2 papers for KRCHN
    schedule.push(
      { date: new Date(twoWeeksBefore.getTime() + 2 * 24 * 60 * 60 * 1000), paper: 'Paper I', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 5 * 24 * 60 * 60 * 1000), paper: 'Paper II', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 9 * 24 * 60 * 60 * 1000), paper: 'Paper I (Retake)', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 12 * 24 * 60 * 60 * 1000), paper: 'Paper II (Retake)', duration: 120 }
    )
  } else if (cadre === 'BScN') {
    // 2 integrated papers for BScN (Paper I: Advanced Adult Health + Specialised + Maternal/Newborn; Paper II: Community/Public Health + Research + Leadership + Mental Health)
    schedule.push(
      { date: new Date(twoWeeksBefore.getTime() + 1 * 24 * 60 * 60 * 1000), paper: 'Paper I', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 3 * 24 * 60 * 60 * 1000), paper: 'Paper II', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 7 * 24 * 60 * 60 * 1000), paper: 'Paper I (Retake)', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 10 * 24 * 60 * 60 * 1000), paper: 'Paper II (Retake)', duration: 120 },
      { date: new Date(twoWeeksBefore.getTime() + 13 * 24 * 60 * 60 * 1000), paper: 'Full Mock (Paper I + II)', duration: 240 }
    )
  }
  
  return schedule
}
```


## 8. API Endpoints

### 8.1 Authentication APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Create student account | No |
| POST | `/api/auth/signup-tutor` | Submit tutor application | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/logout` | Logout current session | Yes |
| POST | `/api/auth/reset-password` | Request password reset | No |
| GET | `/api/auth/session` | Get current session | Yes |

### 8.2 Student APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/student/profile` | Get student profile | Yes (Student) |
| PATCH | `/api/student/profile` | Update student profile | Yes (Student) |
| GET | `/api/student/dashboard` | Get dashboard data | Yes (Student) |
| GET | `/api/student/analytics` | Get performance analytics | Yes (Student) |
| GET | `/api/student/recommendations` | Get AI recommendations | Yes (Student) |

### 8.3 Practice & Questions APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/questions` | Get practice questions | Yes |
| GET | `/api/questions/:id` | Get single question | Yes |
| POST | `/api/questions/answer` | Submit answer | Yes (Student) |
| GET | `/api/questions/weak-areas` | Get weak area questions | Yes (Student) |
| POST | `/api/questions/flag` | Flag question for review | Yes (Student) |

### 8.4 Mock Exam APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/mock-exam/start` | Start mock exam session | Yes (Student) |
| POST | `/api/mock-exam/submit` | Submit completed exam | Yes (Student) |
| GET | `/api/mock-exam/results/:id` | Get exam results | Yes (Student) |
| GET | `/api/mock-exam/history` | Get exam history | Yes (Student) |

### 8.5 Flashcard APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/flashcards/decks` | Get available decks | Yes |
| GET | `/api/flashcards/due` | Get due flashcards | Yes (Student) |
| POST | `/api/flashcards/review` | Submit flashcard rating | Yes (Student) |
| GET | `/api/flashcards/progress` | Get flashcard progress | Yes (Student) |

### 8.6 Tutor APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tutors` | Get tutor directory | Yes |
| GET | `/api/tutors/:id` | Get tutor profile | Yes |
| GET | `/api/tutors/:id/availability` | Get tutor availability | Yes |
| PATCH | `/api/tutor/profile` | Update tutor profile | Yes (Tutor) |
| POST | `/api/tutor/availability` | Set availability | Yes (Tutor) |
| DELETE | `/api/tutor/availability/:id` | Remove availability | Yes (Tutor) |
| GET | `/api/tutor/students` | Get student roster | Yes (Tutor) |
| GET | `/api/tutor/earnings` | Get earnings data | Yes (Tutor) |

### 8.7 Session Booking APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/sessions/book` | Book tutor session | Yes (Student) |
| GET | `/api/sessions` | Get user sessions | Yes |
| PATCH | `/api/sessions/:id` | Update session | Yes |
| DELETE | `/api/sessions/:id` | Cancel session | Yes |
| POST | `/api/sessions/:id/review` | Submit session review | Yes (Student) |
| PATCH | `/api/sessions/:id/complete` | Mark session complete | Yes (Tutor) |

### 8.8 Payment APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/mpesa/stkpush` | Initiate M-Pesa payment | Yes |
| POST | `/api/mpesa/callback` | M-Pesa payment callback | No (Webhook) |
| POST | `/api/mpesa/b2c` | Tutor payout | Yes (Tutor) |
| GET | `/api/payments/history` | Get payment history | Yes |

### 8.9 Revision Plan APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/revision-plan/generate` | Generate revision plan | Yes (Student) |
| GET | `/api/revision-plan` | Get student's plan | Yes (Student) |
| GET | `/api/revision-plan/share/:token` | View shared plan | No |
| POST | `/api/revision-plan/download` | Download plan as PDF | Yes (Student) |

### 8.10 Gamification APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/gamification/leaderboard` | Get leaderboard | Yes |
| GET | `/api/gamification/badges` | Get student badges | Yes (Student) |
| GET | `/api/gamification/achievements` | Get achievements | Yes (Student) |

### 8.11 Study Group APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/groups` | Get study groups | Yes (Student) |
| POST | `/api/groups` | Create study group | Yes (Student) |
| POST | `/api/groups/:id/join` | Join study group | Yes (Student) |
| DELETE | `/api/groups/:id/leave` | Leave study group | Yes (Student) |
| GET | `/api/groups/:id/members` | Get group members | Yes (Student) |

### 8.12 Notification APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notifications` | Get user notifications | Yes |
| PATCH | `/api/notifications/:id/read` | Mark notification read | Yes |
| PATCH | `/api/notifications/read-all` | Mark all read | Yes |
| POST | `/api/notifications/preferences` | Update notification preferences | Yes |


## 9. WhatsApp Notification System

### 9.1 WhatsApp Integration Architecture

```typescript
// lib/whatsapp/send-notification.ts

import { Twilio } from 'twilio'

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export interface WhatsAppMessage {
  to: string // Phone number in format: +254712345678
  template: string
  params?: Record<string, string>
}

export const WHATSAPP_TEMPLATES = {
  session_confirmed: {
    body: 'Hi {{name}}, your tutoring session with {{tutor}} is confirmed for {{date}} at {{time}}. Platform: {{platform}}. See you there! 📚',
    params: ['name', 'tutor', 'date', 'time', 'platform']
  },
  session_reminder: {
    body: 'Reminder: Your session with {{tutor}} starts in 30 minutes. Join link: {{link}} ⏰',
    params: ['tutor', 'link']
  },
  streak_milestone: {
    body: 'Amazing! 🔥 You\'ve maintained a {{days}}-day study streak on NurseFiti. Keep it going, {{name}}!',
    params: ['days', 'name']
  },
  streak_at_risk: {
    body: 'Don\'t break your {{days}}-day streak! Log in to NurseFiti tonight to keep it going. 💪',
    params: ['days']
  },
  plan_expiring: {
    body: 'Hi {{name}}, your NurseFiti {{plan}} plan expires in {{days}} days. Renew now to keep studying: {{link}}',
    params: ['name', 'plan', 'days', 'link']
  },
  tutor_verified: {
    body: 'Congratulations! 🎉 Your NurseFiti tutor account has been verified. You can now start accepting bookings. Login: {{link}}',
    params: ['link']
  },
  payment_success: {
    body: 'Payment received! ✅ KSh {{amount}} for {{type}}. Receipt: {{receipt}}. Thank you for using NurseFiti!',
    params: ['amount', 'type', 'receipt']
  },
  exam_registration_reminder: {
    body: 'Reminder: NCK {{month}} exam registration closes in {{days}} days. Register at nck.go.ke 📋',
    params: ['month', 'days']
  },
  daily_mcq: {
    body: '📚 NurseFiti Daily MCQ:\n\n{{question}}\n\nA) {{optionA}}\nB) {{optionB}}\nC) {{optionC}}\nD) {{optionD}}\n\nReply with your answer!',
    params: ['question', 'optionA', 'optionB', 'optionC', 'optionD']
  }
}

/**
 * Send WhatsApp notification using Twilio
 */
export async function sendWhatsAppNotification(message: WhatsAppMessage) {
  const template = WHATSAPP_TEMPLATES[message.template]
  
  if (!template) {
    throw new Error(`Unknown WhatsApp template: ${message.template}`)
  }
  
  // Replace template parameters
  let body = template.body
  if (message.params) {
    Object.entries(message.params).forEach(([key, value]) => {
      body = body.replace(`{{${key}}}`, value)
    })
  }
  
  try {
    const result = await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${message.to}`,
      body
    })
    
    console.log('WhatsApp sent:', result.sid)
    return result
  } catch (error) {
    console.error('WhatsApp send failed:', error)
    throw error
  }
}

/**
 * Check if user has opted out of notifications
 */
export async function canSendNotification(userId: string, type: string): Promise<boolean> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data: preferences } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (!preferences) return true // Default: all notifications enabled
  
  // Critical notifications always sent
  const criticalTypes = ['session_confirmed', 'payment_success', 'tutor_verified']
  if (criticalTypes.includes(type)) return true
  
  // Check user preferences
  return preferences[`allow_${type}`] !== false
}
```

### 9.2 Notification Triggers

```typescript
// lib/notifications/triggers.ts

import { sendWhatsAppNotification, canSendNotification } from '@/lib/whatsapp/send-notification'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * Trigger: Session booked
 */
export async function notifySessionBooked(sessionId: string) {
  const { data: session } = await supabase
    .from('sessions')
    .select(`
      *,
      student:profiles!student_id(full_name, phone),
      tutor:profiles!tutor_id(full_name, phone)
    `)
    .eq('id', sessionId)
    .single()
  
  if (!session) return
  
  // Notify student
  if (await canSendNotification(session.student_id, 'session_confirmed')) {
    await sendWhatsAppNotification({
      to: session.student.phone,
      template: 'session_confirmed',
      params: {
        name: session.student.full_name,
        tutor: session.tutor.full_name,
        date: new Date(session.session_date).toLocaleDateString(),
        time: session.start_time,
        platform: session.platform
      }
    })
  }
  
  // Notify tutor
  if (await canSendNotification(session.tutor_id, 'session_confirmed')) {
    await sendWhatsAppNotification({
      to: session.tutor.phone,
      template: 'session_confirmed',
      params: {
        name: session.tutor.full_name,
        tutor: session.student.full_name,
        date: new Date(session.session_date).toLocaleDateString(),
        time: session.start_time,
        platform: session.platform
      }
    })
  }
}

/**
 * Trigger: Session starting in 30 minutes
 * Run via cron job every 15 minutes
 */
export async function notifyUpcomingSessions() {
  const now = new Date()
  const in30Minutes = new Date(now.getTime() + 30 * 60 * 1000)
  
  const { data: sessions } = await supabase
    .from('sessions')
    .select(`
      *,
      student:profiles!student_id(phone),
      tutor:profiles!tutor_id(full_name, phone)
    `)
    .eq('status', 'confirmed')
    .gte('session_date', now.toISOString().split('T')[0])
    .lte('session_date', in30Minutes.toISOString().split('T')[0])
  
  for (const session of sessions || []) {
    const sessionDateTime = new Date(`${session.session_date}T${session.start_time}`)
    const minutesUntil = (sessionDateTime.getTime() - now.getTime()) / (1000 * 60)
    
    if (minutesUntil >= 25 && minutesUntil <= 35) {
      // Send reminder to both
      await sendWhatsAppNotification({
        to: session.student.phone,
        template: 'session_reminder',
        params: {
          tutor: session.tutor.full_name,
          link: session.join_link || 'Check your dashboard'
        }
      })
      
      await sendWhatsAppNotification({
        to: session.tutor.phone,
        template: 'session_reminder',
        params: {
          tutor: session.student.full_name,
          link: session.join_link || 'Check your dashboard'
        }
      })
    }
  }
}

/**
 * Trigger: Check streaks at risk
 * Run via cron job daily at 8 PM
 */
export async function notifyStreaksAtRisk() {
  const today = new Date().toISOString().split('T')[0]
  
  const { data: students } = await supabase
    .from('student_profiles')
    .select(`
      id,
      streak_count,
      last_study_date,
      profiles!inner(phone, full_name)
    `)
    .gte('streak_count', 3)
    .neq('last_study_date', today)
  
  for (const student of students || []) {
    if (await canSendNotification(student.id, 'streak_at_risk')) {
      await sendWhatsAppNotification({
        to: student.profiles.phone,
        template: 'streak_at_risk',
        params: {
          days: student.streak_count.toString()
        }
      })
    }
  }
}
```


## 10. UI/UX Design System

### 10.1 Design Tokens

```typescript
// lib/design-tokens.ts

export const colors = {
  // Primary
  primary: {
    teal: '#08514F',
    tealMid: '#0A6865',
    tealLight: '#E8F5F4',
    tealXLight: '#F0FAF9',
  },
  // Accent
  accent: {
    amber: '#F5A623',
    amberLight: '#FFF3DC',
    amberDark: '#C47F0A',
  },
  // Neutrals
  neutral: {
    dark: '#0F1C1C',
    darkMid: '#1E3535',
    mid: '#4A6565',
    light: '#7A9E9E',
    border: '#D0E6E5',
    cream: '#FFFDF8',
    white: '#FFFFFF',
  },
  // Semantic
  semantic: {
    error: '#E84545',
    success: '#1A9E75',
    warning: '#F5A623',
    info: '#0A6865',
  },
}

export const typography = {
  fonts: {
    heading: 'Syne, sans-serif',
    body: 'Nunito, sans-serif',
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
}

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
}

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  full: '9999px',
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}
```

### 10.2 Tailwind Configuration

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#08514F',
          mid: '#0A6865',
          light: '#E8F5F4',
          xlight: '#F0FAF9',
        },
        accent: {
          DEFAULT: '#F5A623',
          light: '#FFF3DC',
          dark: '#C47F0A',
        },
        dark: {
          DEFAULT: '#0F1C1C',
          mid: '#1E3535',
        },
        neutral: {
          mid: '#4A6565',
          light: '#7A9E9E',
          border: '#D0E6E5',
          cream: '#FFFDF8',
        },
        error: '#E84545',
        success: '#1A9E75',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
}
```

### 10.3 Dark Mode Implementation

```css
/* app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #08514F;
    --color-primary-mid: #0A6865;
    --color-primary-light: #E8F5F4;
    --color-accent: #F5A623;
    --color-accent-light: #FFF3DC;
    --color-dark: #0F1C1C;
    --color-dark-mid: #1E3535;
    --color-neutral-mid: #4A6565;
    --color-neutral-light: #7A9E9E;
    --color-border: #D0E6E5;
    --color-bg: #FFFDF8;
    --color-card: #FFFFFF;
    --color-text: #0F1C1C;
    --color-text-secondary: #4A6565;
  }
  
  .dark {
    --color-primary: #0A6865;
    --color-primary-mid: #08514F;
    --color-primary-light: #1E3535;
    --color-accent: #F5A623;
    --color-accent-light: #2A2416;
    --color-dark: #FFFDF8;
    --color-dark-mid: #E8F5F4;
    --color-neutral-mid: #7A9E9E;
    --color-neutral-light: #4A6565;
    --color-border: #1E3535;
    --color-bg: #0A1A1A;
    --color-card: #0F1C1C;
    --color-text: #FFFDF8;
    --color-text-secondary: #7A9E9E;
  }
  
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: 'Nunito', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Syne', sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-accent text-white font-semibold py-3 px-6 rounded-lg hover:bg-accent-dark transition-colors;
  }
  
  .btn-secondary {
    @apply bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-mid transition-colors;
  }
  
  .card {
    @apply bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 shadow-md;
  }
  
  .input {
    @apply w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary;
  }
}
```

### 10.4 Responsive Breakpoints

```typescript
// Mobile-first approach
export const breakpoints = {
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large devices (desktops)
  '2xl': '1536px', // 2X large devices (large desktops)
}

// Usage in Tailwind:
// sm:text-lg    - applies on screens >= 640px
// md:grid-cols-2 - applies on screens >= 768px
// lg:px-8       - applies on screens >= 1024px
```

### 10.5 Accessibility Guidelines

1. **Color Contrast**: All text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
2. **Touch Targets**: Minimum 44px × 44px for all interactive elements
3. **Keyboard Navigation**: All interactive elements accessible via Tab key
4. **Focus Indicators**: Visible focus rings on all focusable elements
5. **Screen Reader Support**: Proper ARIA labels and semantic HTML
6. **Alt Text**: All images have descriptive alt text
7. **Form Labels**: All form inputs have associated labels


## 11. Performance Optimization

### 11.1 Next.js Optimization Strategies

```typescript
// Image Optimization
import Image from 'next/image'

// Use Next.js Image component for automatic optimization
<Image
  src="/tutor-avatar.jpg"
  alt="Tutor name"
  width={80}
  height={80}
  priority={false} // Only true for above-the-fold images
  placeholder="blur"
/>

// Font Optimization
import { Syne, Nunito } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-nunito',
})

// Dynamic Imports for Heavy Components
import dynamic from 'next/dynamic'

const AnalyticsChart = dynamic(() => import('@/components/student/AnalyticsChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable SSR for client-only components
})

const MockExamCanvas = dynamic(() => import('@/components/student/MockExamCanvas'), {
  loading: () => <ExamLoadingSkeleton />,
})
```

### 11.2 Database Query Optimization

```typescript
// Use Supabase query optimization

// ❌ Bad: Multiple queries
const { data: student } = await supabase.from('student_profiles').select('*').eq('id', id).single()
const { data: answers } = await supabase.from('student_answers').select('*').eq('student_id', id)
const { data: badges } = await supabase.from('student_badges').select('*').eq('student_id', id)

// ✅ Good: Single query with joins
const { data: student } = await supabase
  .from('student_profiles')
  .select(`
    *,
    answers:student_answers(count),
    badges:student_badges(badge_id, earned_at)
  `)
  .eq('id', id)
  .single()

// Use indexes for frequently queried columns
CREATE INDEX idx_student_answers_student_id ON student_answers(student_id);
CREATE INDEX idx_student_answers_question_id ON student_answers(question_id);
CREATE INDEX idx_sessions_student_tutor ON sessions(student_id, tutor_id);
CREATE INDEX idx_sessions_date ON sessions(session_date);

// Use materialized views for complex analytics
CREATE MATERIALIZED VIEW student_performance_summary AS
SELECT 
  student_id,
  COUNT(*) as total_questions,
  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_answers,
  ROUND(AVG(CASE WHEN is_correct THEN 100 ELSE 0 END), 2) as accuracy,
  COUNT(DISTINCT DATE(answered_at)) as study_days
FROM student_answers
GROUP BY student_id;

-- Refresh materialized view daily via cron
REFRESH MATERIALIZED VIEW CONCURRENTLY student_performance_summary;
```

### 11.3 Caching Strategy

```typescript
// lib/cache/redis-cache.ts (optional, for high-traffic scenarios)

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 3600 // 1 hour default
): Promise<T> {
  // Try to get from cache
  const cached = await redis.get(key)
  if (cached) {
    return cached as T
  }
  
  // Fetch fresh data
  const data = await fetcher()
  
  // Store in cache
  await redis.set(key, data, { ex: ttl })
  
  return data
}

// Usage example
export async function getTutorProfile(tutorId: string) {
  return getCachedData(
    `tutor:${tutorId}`,
    async () => {
      const { data } = await supabase
        .from('tutor_profiles')
        .select('*')
        .eq('id', tutorId)
        .single()
      return data
    },
    1800 // Cache for 30 minutes
  )
}

// Invalidate cache on update
export async function updateTutorProfile(tutorId: string, updates: any) {
  await supabase
    .from('tutor_profiles')
    .update(updates)
    .eq('id', tutorId)
  
  // Invalidate cache
  await redis.del(`tutor:${tutorId}`)
}
```

### 11.4 Bundle Size Optimization

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Compress responses
  compress: true,
  
  // Analyze bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Analyze bundle in production
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './analyze.html',
          })
        )
      }
    }
    return config
  },
  
  // Image optimization
  images: {
    domains: ['supabase.co', 'nursefiti.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['recharts', 'framer-motion'],
  },
}

module.exports = nextConfig
```

### 11.5 Mobile Performance

```typescript
// Progressive Web App (PWA) Configuration

// public/manifest.json
{
  "name": "NurseFiti - NCK Exam Preparation",
  "short_name": "NurseFiti",
  "description": "Kenya's most intelligent NCK exam preparation platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFDF8",
  "theme_color": "#08514F",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

// Service Worker for offline flashcards
// app/sw.ts
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('nursefiti-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/dashboard',
        '/flashcards',
        '/offline-flashcards.json',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

### 11.6 Performance Monitoring

```typescript
// lib/monitoring/performance.ts

import { Analytics } from '@vercel/analytics'

export function trackPageLoad(pageName: string) {
  if (typeof window !== 'undefined') {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const metrics = {
      page: pageName,
      dns: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
      tcp: navigationTiming.connectEnd - navigationTiming.connectStart,
      ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
      download: navigationTiming.responseEnd - navigationTiming.responseStart,
      domInteractive: navigationTiming.domInteractive - navigationTiming.fetchStart,
      domComplete: navigationTiming.domComplete - navigationTiming.fetchStart,
      loadComplete: navigationTiming.loadEventEnd - navigationTiming.fetchStart,
    }
    
    // Send to analytics
    Analytics.track('page_performance', metrics)
    
    // Log slow pages
    if (metrics.loadComplete > 3000) {
      console.warn('Slow page load:', pageName, metrics)
    }
  }
}

// Usage in pages
export default function DashboardPage() {
  useEffect(() => {
    trackPageLoad('student_dashboard')
  }, [])
  
  return <div>...</div>
}
```


## 12. SEO Strategy

### 12.1 Metadata Configuration

```typescript
// app/layout.tsx - Root metadata

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://nursefiti.com'),
  title: {
    default: 'NurseFiti - NCK Exam Preparation Platform Kenya',
    template: '%s | NurseFiti'
  },
  description: 'Kenya\'s most intelligent NCK exam preparation platform. Practice MCQs, take DigiProctor-style mock exams, study with flashcards, and book expert tutors. Pass your KRCHN, BScN, or Higher Diploma exam.',
  keywords: [
    'NCK exam preparation Kenya',
    'KRCHN exam revision',
    'BScN nursing exam Kenya',
    'NCK past papers',
    'DigiProctor simulation',
    'nursing council Kenya exam',
    'NCK tutor Kenya',
    'nursing exam practice questions',
    'Kenya nursing licensure exam',
    'NCK mock exams'
  ],
  authors: [{ name: 'NurseFiti' }],
  creator: 'NurseFiti',
  publisher: 'NurseFiti',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://nursefiti.com',
    siteName: 'NurseFiti',
    title: 'NurseFiti - NCK Exam Preparation Platform Kenya',
    description: 'Pass your NCK exam with Kenya\'s most intelligent exam preparation platform',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NurseFiti - NCK Exam Preparation'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NurseFiti - NCK Exam Preparation Platform Kenya',
    description: 'Pass your NCK exam with Kenya\'s most intelligent exam preparation platform',
    images: ['/twitter-image.png'],
    creator: '@nursefiti'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// app/dashboard/page.tsx - Page-specific metadata
export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Track your NCK exam preparation progress, view analytics, and access study materials',
  robots: {
    index: false, // Don't index authenticated pages
    follow: false,
  },
}
```

### 12.2 Structured Data (JSON-LD)

```typescript
// components/seo/StructuredData.tsx

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'NurseFiti',
    url: 'https://nursefiti.com',
    logo: 'https://nursefiti.com/logo.png',
    description: 'Kenya\'s most intelligent NCK exam preparation platform',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressLocality: 'Nairobi',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-XXX-XXXXXX',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Swahili']
    },
    sameAs: [
      'https://twitter.com/nursefiti',
      'https://facebook.com/nursefiti',
      'https://instagram.com/nursefiti'
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CourseSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NCK Exam Preparation Course',
    description: 'Comprehensive NCK licensure exam preparation with practice questions, mock exams, and expert tutoring',
    provider: {
      '@type': 'Organization',
      name: 'NurseFiti',
      sameAs: 'https://nursefiti.com'
    },
    educationalLevel: 'Professional',
    inLanguage: 'en',
    availableLanguage: ['en', 'sw'],
    offers: {
      '@type': 'Offer',
      category: 'Subscription',
      price: '1200',
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock'
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function TutorProfileSchema({ tutor }: { tutor: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: tutor.full_name,
    jobTitle: tutor.professional_title,
    description: tutor.bio,
    image: tutor.avatar_url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tutor.average_rating,
      reviewCount: tutor.total_reviews,
      bestRating: 5,
      worstRating: 1
    },
    offers: {
      '@type': 'Offer',
      price: tutor.rate_per_hour,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock'
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 12.3 Sitemap Generation

```typescript
// app/sitemap.ts

import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nursefiti.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tutors`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]
  
  // Dynamic tutor pages
  const { data: tutors } = await supabase
    .from('tutor_profiles')
    .select('id, updated_at')
    .eq('verification_status', 'verified')
  
  const tutorPages = (tutors || []).map((tutor) => ({
    url: `${baseUrl}/tutors/${tutor.id}`,
    lastModified: new Date(tutor.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true)
  
  const blogPages = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...tutorPages, ...blogPages]
}
```

### 12.4 Robots.txt

```typescript
// app/robots.ts

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/tutor-dashboard/',
          '/api/',
          '/settings/',
          '/bookings/',
        ],
      },
    ],
    sitemap: 'https://nursefiti.com/sitemap.xml',
  }
}
```

### 12.5 Blog Content Strategy

**Target Keywords & Content Plan:**

1. **"NCK exam preparation Kenya"** - Ultimate Guide to NCK Exam Preparation in Kenya (2026)
2. **"KRCHN vs BScN exam"** - KRCHN vs BScN: Which Nursing Path is Right for You?
3. **"NCK past papers"** - How to Use NCK Past Papers Effectively for Exam Success
4. **"DigiProctor NCK"** - DigiProctor Guide: What to Expect on NCK Exam Day
5. **"NCK exam syllabus 2026"** - Complete NCK Exam Syllabus Breakdown (KRCHN & BScN)
6. **"nursing council Kenya registration"** - Step-by-Step Guide to NCK Exam Registration
7. **"NCK exam tips"** - 10 Proven Tips to Pass Your NCK Exam on First Attempt
8. **"nursing exam study schedule"** - How to Create the Perfect NCK Study Schedule
9. **"NCK tutor Kenya"** - Why You Need an NCK Tutor (And How to Choose One)
10. **"nursing licensure exam Kenya"** - Everything You Need to Know About Kenya's Nursing Licensure Exam

**Content Format:**
- 2,000+ words per article
- H2/H3 subheadings with target keywords
- Internal links to relevant platform pages
- External links to official NCK resources
- Featured images optimized for SEO
- Meta descriptions with target keywords
- FAQ sections for featured snippets


## 13. Security Considerations

### 13.1 Authentication Security

```typescript
// Supabase Auth Configuration

// 1. Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

// 2. Session Management
- Session timeout: 30 days (with "Remember Me")
- Session timeout: 24 hours (without "Remember Me")
- Automatic session refresh
- Secure HTTP-only cookies

// 3. Email Verification
- Required for all new accounts
- Verification link expires in 24 hours
- Resend verification option

// 4. Password Reset
- Reset link expires in 1 hour
- One-time use tokens
- Email notification on password change

// 5. Rate Limiting
- Login attempts: 5 per 15 minutes per IP
- Signup attempts: 3 per hour per IP
- Password reset: 3 per hour per email
```

### 13.2 Row Level Security (RLS) Policies

```sql
-- Comprehensive RLS policies for all tables

-- 1. Profiles: Users can only access their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Student Answers: Students can only access their own answers
CREATE POLICY "Students can view own answers"
  ON student_answers FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own answers"
  ON student_answers FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- 3. Sessions: Both student and tutor can view their sessions
CREATE POLICY "Students can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Tutors can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = tutor_id);

-- 4. Payments: Users can only view their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Tutor Availability: Public read, tutor-only write
CREATE POLICY "Anyone can view active availability"
  ON tutor_availability FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Tutors can manage own availability"
  ON tutor_availability FOR ALL
  USING (auth.uid() = tutor_id);

-- 6. Questions: Approved questions are public
CREATE POLICY "Authenticated users can view approved questions"
  ON questions FOR SELECT
  USING (auth.role() = 'authenticated' AND status = 'approved');

-- 7. Revision Plans: Students can only access their own plans
CREATE POLICY "Students can view own revision plans"
  ON revision_plans FOR SELECT
  USING (auth.uid() = student_id);

-- 8. Shared Revision Plans: Anyone with token can view
CREATE POLICY "Anyone with token can view shared plans"
  ON revision_plans FOR SELECT
  USING (share_token IS NOT NULL);
```

### 13.3 API Security

```typescript
// lib/security/api-protection.ts

import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { rateLimit } from '@/lib/security/rate-limit'

/**
 * Verify user authentication
 */
export async function requireAuth(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return { session, supabase }
}

/**
 * Verify user role
 */
export async function requireRole(req: NextRequest, allowedRoles: string[]) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  
  const { data: profile } = await auth.supabase
    .from('profiles')
    .select('role')
    .eq('id', auth.session.user.id)
    .single()
  
  if (!profile || !allowedRoles.includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  return { ...auth, role: profile.role }
}

/**
 * Rate limiting middleware
 */
export async function withRateLimit(
  req: NextRequest,
  identifier: string,
  limit: number,
  window: number
) {
  const { success, remaining } = await rateLimit(identifier, limit, window)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': (Date.now() + window * 1000).toString()
        }
      }
    )
  }
  
  return null
}

/**
 * Input validation
 */
export function validateInput(data: any, schema: any) {
  // Use Zod for validation
  const result = schema.safeParse(data)
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors
    }
  }
  
  return { valid: true, data: result.data }
}

// Usage in API routes
export async function POST(req: NextRequest) {
  // Check authentication
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  
  // Check rate limit
  const rateLimitError = await withRateLimit(
    req,
    auth.session.user.id,
    10, // 10 requests
    60  // per 60 seconds
  )
  if (rateLimitError) return rateLimitError
  
  // Validate input
  const body = await req.json()
  const validation = validateInput(body, MySchema)
  if (!validation.valid) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 })
  }
  
  // Process request...
}
```

### 13.4 Payment Security

```typescript
// lib/security/payment-verification.ts

import crypto from 'crypto'

/**
 * Verify M-Pesa callback signature
 */
export function verifyMpesaCallback(payload: any, signature: string): boolean {
  const secret = process.env.MPESA_CALLBACK_SECRET!
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex')
  
  return hash === signature
}

/**
 * Prevent payment replay attacks
 */
export async function checkPaymentIdempotency(
  checkoutRequestId: string
): Promise<boolean> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data } = await supabase
    .from('payments')
    .select('id')
    .eq('mpesa_checkout_request_id', checkoutRequestId)
    .single()
  
  return data !== null
}

/**
 * Sanitize payment amounts
 */
export function sanitizeAmount(amount: number): number {
  // Ensure amount is positive integer
  const sanitized = Math.abs(Math.floor(amount))
  
  // Enforce maximum amount (KSh 100,000)
  return Math.min(sanitized, 100000)
}
```

### 13.5 Data Protection

```typescript
// 1. Sensitive Data Encryption
// Store sensitive data encrypted in Supabase

// 2. PII Handling
// - Never log PII (phone numbers, emails, names)
// - Mask sensitive data in error messages
// - Use UUIDs instead of sequential IDs

// 3. HTTPS Only
// - All traffic over HTTPS
// - HSTS headers enabled
// - Secure cookies only

// 4. CORS Configuration
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://nursefiti.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

// 5. Content Security Policy
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  frame-src 'self' https://www.youtube.com;
`
```

### 13.6 Audit Logging

```sql
-- Create audit log table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- Log critical actions
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, metadata)
VALUES (
  auth.uid(),
  'session_booked',
  'session',
  NEW.id,
  jsonb_build_object('tutor_id', NEW.tutor_id, 'amount', NEW.gross_amount)
);
```


## Correctness Properties

### Property 1: Booking Atomicity
No two students can book the same tutor time slot. Enforced through database-level locking in `create_booking_atomic` function with `FOR UPDATE` row locks.

**Validates: Requirements 16, 17**

### Property 2: Payment Idempotency
Each M-Pesa transaction is processed exactly once. Enforced through unique `mpesa_checkout_request_id` constraint and idempotency checks in callback handler.

**Validates: Requirement 18**

### Property 3: XP Consistency
Student XP and level are always consistent with the level threshold table. Enforced through atomic updates and `calculateLevel` function validation.

**Validates: Requirement 11**

### Property 4: Streak Accuracy
Streak count accurately reflects consecutive study days without gaps. Enforced through date comparison logic in `updateStreak` function and atomic updates.

**Validates: Requirement 11**

### Property 5: Session State Consistency
Session status and payment status are always synchronized. Enforced through database transactions that update both fields atomically.

**Validates: Requirements 16, 18**

### Property 6: RLS Enforcement
Users can only access data they are authorized to see. Enforced through Supabase Row Level Security policies on all tables with `auth.uid()` checks.

**Validates: Requirement 2**

### Property 7: Real-time Sync Consistency
All clients see the same availability state within 2 seconds of any change. Enforced through Supabase Realtime subscriptions and database triggers.

**Validates: Requirement 17**

## Error Handling

The system implements comprehensive error handling at multiple layers:

**Frontend Error Handling:**
- React Error Boundaries catch component errors and display fallback UI
- API call errors show user-friendly toast notifications
- Form validation errors display inline with specific field guidance
- Network errors trigger retry logic with exponential backoff
- Loading states prevent duplicate submissions

**API Error Handling:**
- All API routes use try-catch blocks
- Errors are logged to Sentry with context
- HTTP status codes follow REST conventions (400 for validation, 401 for auth, 403 for authorization, 404 for not found, 409 for conflicts, 500 for server errors)
- Error responses include user-friendly messages and error codes
- Sensitive information is never exposed in error messages

**Database Error Handling:**
- Foreign key violations return specific error messages
- Unique constraint violations are caught and handled gracefully
- Transaction rollbacks on any error in multi-step operations
- Connection pool exhaustion triggers alerts
- Query timeouts are logged and investigated

**Payment Error Handling:**
- M-Pesa callback failures are retried with exponential backoff
- Payment status is polled if callback is not received within 60 seconds
- Failed payments are marked and user is notified
- Partial payments are prevented through atomic transactions
- Refunds are processed through manual admin interface

**Real-time Error Handling:**
- WebSocket disconnections trigger automatic reconnection
- Missed updates are fetched on reconnection
- Presence tracking handles network interruptions
- Stale data is refreshed on focus

## 14. Testing Strategy

### 14.1 Testing Pyramid

```
                    /\
                   /  \
                  / E2E \          (10% - Critical user flows)
                 /______\
                /        \
               /  Integr. \        (30% - API + DB interactions)
              /____________\
             /              \
            /   Unit Tests   \    (60% - Business logic)
           /__________________\
```

### 14.2 Unit Testing

```typescript
// __tests__/lib/algorithms/srs.test.ts

import { calculateNextReview, Rating } from '@/lib/algorithms/srs'

describe('SRS Algorithm', () => {
  const initialProgress = {
    ease_factor: 2.5,
    interval_days: 0,
    repetitions: 0,
    next_review_at: new Date()
  }
  
  test('should reset progress on "again" rating', () => {
    const result = calculateNextReview(initialProgress, 'again')
    
    expect(result.repetitions).toBe(0)
    expect(result.interval_days).toBe(0)
    expect(result.ease_factor).toBeLessThan(initialProgress.ease_factor)
  })
  
  test('should increase interval on "good" rating', () => {
    const progress = { ...initialProgress, repetitions: 2, interval_days: 3 }
    const result = calculateNextReview(progress, 'good')
    
    expect(result.repetitions).toBe(3)
    expect(result.interval_days).toBeGreaterThan(3)
  })
  
  test('should accelerate on "easy" rating', () => {
    const progress = { ...initialProgress, repetitions: 1, interval_days: 1 }
    const resultGood = calculateNextReview(progress, 'good')
    const resultEasy = calculateNextReview(progress, 'easy')
    
    expect(resultEasy.interval_days).toBeGreaterThan(resultGood.interval_days)
    expect(resultEasy.ease_factor).toBeGreaterThan(resultGood.ease_factor)
  })
})

// __tests__/lib/algorithms/gamification.test.ts

import { calculateLevel, XP_REWARDS } from '@/lib/algorithms/gamification'

describe('Gamification System', () => {
  test('should calculate correct level from XP', () => {
    expect(calculateLevel(0)).toBe(1)
    expect(calculateLevel(200)).toBe(2)
    expect(calculateLevel(500)).toBe(3)
    expect(calculateLevel(5400)).toBe(10)
  })
  
  test('should award correct XP for actions', () => {
    expect(XP_REWARDS.CORRECT_ANSWER).toBe(8)
    expect(XP_REWARDS.MOCK_EXAM_COMPLETE).toBe(200)
    expect(XP_REWARDS.STREAK_DAY).toBe(50)
  })
})
```

### 14.3 Integration Testing

```typescript
// __tests__/api/sessions/book.test.ts

import { POST } from '@/app/api/sessions/book/route'
import { createMocks } from 'node-mocks-http'

describe('POST /api/sessions/book', () => {
  test('should create session booking with valid data', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        tutorId: 'tutor-uuid',
        sessionDate: '2026-05-25',
        startTime: '14:00',
        endTime: '15:00',
        cadre: 'KRCHN',
        topic: 'Pharmacology',
        platform: 'Zoom',
        durationMinutes: 60,
        ratePerHour: 1200
      }
    })
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.sessionId).toBeDefined()
  })
  
  test('should reject booking for unavailable slot', async () => {
    // Test double-booking prevention
    const { req } = createMocks({
      method: 'POST',
      body: {
        tutorId: 'tutor-uuid',
        sessionDate: '2026-05-25',
        startTime: '14:00', // Already booked
        endTime: '15:00',
        cadre: 'KRCHN',
        topic: 'Pharmacology',
        platform: 'Zoom',
        durationMinutes: 60,
        ratePerHour: 1200
      }
    })
    
    const response = await POST(req)
    const data = await response.json()
    
    expect(response.status).toBe(409)
    expect(data.error).toContain('already booked')
  })
  
  test('should require authentication', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {}
    })
    
    const response = await POST(req)
    
    expect(response.status).toBe(401)
  })
})
```

### 14.4 End-to-End Testing

```typescript
// e2e/student-flow.spec.ts (using Playwright)

import { test, expect } from '@playwright/test'

test.describe('Student Complete Flow', () => {
  test('should complete full student journey', async ({ page }) => {
    // 1. Signup
    await page.goto('/signup')
    await page.fill('[name="fullName"]', 'Test Student')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="phone"]', '+254712345678')
    await page.fill('[name="password"]', 'SecurePass123!')
    await page.selectOption('[name="cadre"]', 'KRCHN')
    await page.click('button[type="submit"]')
    
    // 2. Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    
    // 3. Start practice session
    await page.click('text=Practice MCQs')
    await expect(page).toHaveURL('/practice')
    
    // 4. Answer a question
    await page.click('[data-option="A"]')
    await page.click('text=Submit Answer')
    
    // 5. Verify XP awarded
    const xpBadge = page.locator('[data-testid="xp-badge"]')
    await expect(xpBadge).toContainText('+8 XP')
    
    // 6. Navigate to analytics
    await page.click('text=Analytics')
    await expect(page).toHaveURL('/analytics')
    
    // 7. Verify analytics display
    await expect(page.locator('[data-testid="accuracy-chart"]')).toBeVisible()
  })
  
  test('should book tutor session', async ({ page }) => {
    // Login as student
    await page.goto('/login')
    await page.fill('[name="email"]', 'student@example.com')
    await page.fill('[name="password"]', 'password')
    await page.click('button[type="submit"]')
    
    // Browse tutors
    await page.goto('/tutors')
    await page.click('[data-testid="tutor-card"]:first-child')
    
    // Select available slot
    await page.click('[data-testid="available-slot"]:first-child')
    
    // Fill booking form
    await page.fill('[name="topic"]', 'Pharmacology help')
    await page.selectOption('[name="platform"]', 'Zoom')
    
    // Initiate payment
    await page.click('text=Confirm & Pay via M-Pesa')
    
    // Verify payment prompt
    await expect(page.locator('text=Check your phone')).toBeVisible()
  })
})

// e2e/tutor-flow.spec.ts

test.describe('Tutor Complete Flow', () => {
  test('should manage availability and view bookings', async ({ page }) => {
    // Login as tutor
    await page.goto('/login')
    await page.fill('[name="email"]', 'tutor@example.com')
    await page.fill('[name="password"]', 'password')
    await page.click('button[type="submit"]')
    
    // Navigate to schedule
    await page.goto('/tutor/schedule')
    
    // Add availability slot
    await page.click('[data-day="Monday"][data-time="14:00"]')
    await expect(page.locator('[data-day="Monday"][data-time="14:00"]')).toHaveClass(/available/)
    
    // View student roster
    await page.goto('/tutor/students')
    await expect(page.locator('[data-testid="student-row"]')).toHaveCount(5)
    
    // View earnings
    await page.goto('/tutor/earnings')
    await expect(page.locator('[data-testid="total-earnings"]')).toBeVisible()
  })
})
```

### 14.5 Performance Testing

```typescript
// __tests__/performance/load-test.ts (using k6)

import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be below 1%
  },
}

export default function () {
  // Test landing page
  const landingRes = http.get('https://nursefiti.com')
  check(landingRes, {
    'landing page status is 200': (r) => r.status === 200,
    'landing page loads in <2s': (r) => r.timings.duration < 2000,
  })
  
  sleep(1)
  
  // Test tutor directory
  const tutorsRes = http.get('https://nursefiti.com/api/tutors')
  check(tutorsRes, {
    'tutors API status is 200': (r) => r.status === 200,
    'tutors API responds in <500ms': (r) => r.timings.duration < 500,
  })
  
  sleep(1)
}
```

### 14.6 Accessibility Testing

```typescript
// __tests__/accessibility/a11y.test.ts (using jest-axe)

import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import DashboardPage from '@/app/dashboard/page'

expect.extend(toHaveNoViolations)

describe('Accessibility', () => {
  test('dashboard should have no accessibility violations', async () => {
    const { container } = render(<DashboardPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  test('all interactive elements should be keyboard accessible', async () => {
    const { getByRole } = render(<DashboardPage />)
    
    const button = getByRole('button', { name: /practice/i })
    button.focus()
    expect(button).toHaveFocus()
  })
})
```


## 15. Deployment & DevOps

### 15.1 Environment Configuration

```bash
# .env.local (Development)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# M-Pesa Sandbox
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
MPESA_SHORTCODE=174379
MPESA_PASSKEY=xxx
MPESA_CALLBACK_URL=https://nursefiti-dev.vercel.app/api/mpesa/callback
MPESA_ENVIRONMENT=sandbox

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+14155238886

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=xxx

# .env.production (Production - set in Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# M-Pesa Production
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
MPESA_SHORTCODE=xxxxx
MPESA_PASSKEY=xxx
MPESA_CALLBACK_URL=https://nursefiti.com/api/mpesa/callback
MPESA_ENVIRONMENT=production

# WhatsApp Production
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+254xxx

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 15.2 Vercel Deployment Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  },
  "build": {
    "env": {
      "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key",
      "MPESA_CONSUMER_KEY": "@mpesa-consumer-key",
      "MPESA_CONSUMER_SECRET": "@mpesa-consumer-secret"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/nursepass",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/nursepass/:path*",
      "destination": "/:path*",
      "permanent": true
    }
  ]
}
```

### 15.3 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
  
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Check bundle size
        run: npm run analyze
  
  e2e:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e
  
  deploy-preview:
    runs-on: ubuntu-latest
    needs: [lint, test, build]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
  
  deploy-production:
    runs-on: ubuntu-latest
    needs: [lint, test, build, e2e]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 15.4 Database Migrations

```bash
# Supabase CLI setup
npm install -g supabase

# Initialize Supabase project
supabase init

# Link to remote project
supabase link --project-ref xxxxx

# Create migration
supabase migration new create_initial_schema

# Apply migrations locally
supabase db reset

# Push migrations to production
supabase db push

# Generate TypeScript types from database
supabase gen types typescript --local > lib/types/database.types.ts
```

```sql
-- supabase/migrations/20260519000001_create_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT CHECK (role IN ('student', 'tutor', 'admin')) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- ... (rest of schema from Section 3)
```

### 15.5 Monitoring & Logging

```typescript
// lib/monitoring/sentry.ts

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies
      delete event.request.headers?.authorization
    }
    return event
  },
})

// Usage
try {
  await riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'payment',
      action: 'mpesa_callback'
    },
    extra: {
      userId: session.user.id,
      amount: payment.amount
    }
  })
}
```

```typescript
// lib/monitoring/analytics.ts

import { Analytics } from '@vercel/analytics'

export function trackEvent(name: string, properties?: Record<string, any>) {
  Analytics.track(name, properties)
}

// Usage
trackEvent('session_booked', {
  tutorId: session.tutor_id,
  amount: session.gross_amount,
  platform: session.platform
})

trackEvent('mock_exam_completed', {
  cadre: exam.cadre,
  paper: exam.paper,
  score: exam.score_percentage,
  passed: exam.passed
})
```

### 15.6 Backup & Disaster Recovery

```bash
# Automated daily backups (Supabase)
# Configured in Supabase dashboard:
# - Daily automated backups
# - 30-day retention
# - Point-in-time recovery (PITR) enabled

# Manual backup
supabase db dump -f backup.sql

# Restore from backup
psql -h db.xxxxx.supabase.co -U postgres -d postgres -f backup.sql

# Backup Vercel environment variables
vercel env pull .env.backup

# Disaster recovery checklist:
# 1. Restore database from latest backup
# 2. Verify data integrity
# 3. Restore environment variables
# 4. Redeploy application
# 5. Test critical flows (auth, payments, bookings)
# 6. Monitor error rates
# 7. Communicate with users
```

### 15.7 Scaling Considerations

```typescript
// Database Connection Pooling
// Supabase automatically handles connection pooling
// Max connections: 100 (can be increased)

// Caching Strategy
// 1. Static pages: Cached at CDN edge (Vercel)
// 2. Dynamic data: Redis cache (Upstash) for high-traffic endpoints
// 3. Database queries: Materialized views for analytics

// Load Balancing
// Vercel automatically load balances across edge functions

// Database Scaling
// Supabase supports:
// - Read replicas for read-heavy workloads
// - Vertical scaling (increase instance size)
// - Connection pooling (PgBouncer)

// File Storage Scaling
// Supabase Storage uses S3-compatible storage
// Automatically scales with usage

// Real-time Scaling
// Supabase Realtime supports:
// - 500 concurrent connections per project (free tier)
// - 10,000+ concurrent connections (pro tier)
```


## 16. Implementation Phases

### Phase 0: Foundation (Week 1)
**Goal:** Set up project infrastructure and core dependencies

**Tasks:**
1. Initialize Next.js 14 project with TypeScript
2. Configure Tailwind CSS with custom design tokens
3. Set up Supabase project and configure authentication
4. Install and configure next-themes for dark mode
5. Add Google Fonts (Syne, Nunito) to layout
6. Create CSS variables file with brand colors
7. Build NurseFitiLogo SVG component
8. Create base UI components (Button, Card, Badge, ProgressBar, Avatar, Modal, Toast, Spinner)
9. Set up Supabase database schema (run all migrations)
10. Configure Row Level Security policies
11. Set up Vercel project and link to GitHub
12. Configure environment variables in Vercel

**Deliverables:**
- Working Next.js app with Tailwind CSS
- Supabase database with all tables and RLS policies
- Base UI component library
- Vercel deployment pipeline

---

### Phase 1: Authentication System (Week 2)
**Goal:** Implement dual authentication for students and tutors

**Tasks:**
1. Build `/signup` page with student registration form
2. Build `/signup/tutor` page with multi-step tutor application
3. Build `/login` page with email/password authentication
4. Configure Supabase Auth middleware for route protection
5. Implement auth callback handlers
6. Build onboarding diagnostic quiz for students (10 questions)
7. Build tutor pending verification page
8. Create email templates for verification and approval
9. Test student signup → dashboard flow
10. Test tutor signup → pending → approval flow

**Deliverables:**
- Working student and tutor authentication
- Protected routes with middleware
- Email verification system
- Tutor application workflow

---

### Phase 2: Student Dashboard Core (Weeks 3-5)
**Goal:** Build complete student experience

**Tasks:**
1. Convert dashboard HTML to `/dashboard` page with Supabase data
2. Build Sidebar component (student variant)
3. Build Topbar component with XP/streak badges
4. Build MCQCard component for question display
5. Build `/practice` page with unit filters and practice modes
6. Implement answer submission and XP awarding
7. Build `/mock-exam` page with DigiProctor simulation
8. Implement mock exam timer and auto-submit
9. Build `/flashcards` page with SRS algorithm
10. Implement flashcard flip animation and rating
11. Build `/analytics` page with performance charts
12. Build `/achievements` page with XP, streaks, badges, leaderboard
13. Build `/groups` page with study group features
14. Build `/settings` page with all configuration options
15. Implement gamification system (XP, levels, streaks, badges)

**Deliverables:**
- Complete student dashboard
- Practice system with multiple modes
- DigiProctor-accurate mock exam simulation
- Flashcard system with SRS
- Analytics and gamification features

---

### Phase 3: Tutor Dashboard (Weeks 6-7)
**Goal:** Build complete tutor experience

**Tasks:**
1. Convert tutor dashboard HTML to `/tutor/dashboard`
2. Build tutor Sidebar component (amber-accented variant)
3. Build `/tutor/schedule` with weekly calendar and availability toggles
4. Implement availability CRUD operations
5. Build `/tutor/students` with roster table and detail panel
6. Implement session notes feature
7. Build `/tutor/studio` with MCQ and note creation forms
8. Implement content submission and moderation workflow
9. Build `/tutor/earnings` with transactions and payout card
10. Build `/tutor/reviews` with rating display and review cards
11. Build `/tutor/profile` with profile editor and live preview

**Deliverables:**
- Complete tutor dashboard
- Schedule management system
- Student roster with progress tracking
- Content contribution studio
- Earnings and review management

---

### Phase 4: Booking System (Week 8)
**Goal:** Implement real-time tutor booking synchronization

**Tasks:**
1. Build `/tutors` public directory with filters
2. Build `/tutors/[id]` individual tutor profile page
3. Implement availability display on tutor profiles
4. Build session booking form
5. Implement Supabase Realtime subscriptions for availability sync
6. Create `create_booking_atomic` database function for race condition prevention
7. Build `/bookings` student page (upcoming + past sessions)
8. Implement booking approval workflow for tutors
9. Build post-session review form
10. Implement session reminder system
11. Test full booking cycle end-to-end

**Deliverables:**
- Public tutor directory
- Real-time availability synchronization
- Session booking with race condition prevention
- Review system

---

### Phase 5: Revision Plan Generator (Week 9)
**Goal:** Build AI-powered revision plan feature

**Tasks:**
1. Build `/revision-plan` page with locked teaser state
2. Implement M-Pesa KSh 500 payment flow
3. Build multi-step input form (4 steps)
4. Build `/api/revision-plan/generate` route
5. Implement revision plan generation algorithm
6. Build plan output renderer (HTML display)
7. Implement PDF download functionality
8. Build plan share token system
9. Test plan generation with various inputs
10. Optimize plan generation performance

**Deliverables:**
- Revision plan purchase flow
- AI-generated personalized study plans
- PDF download feature
- Plan sharing system

---

### Phase 6: M-Pesa & Payments (Week 10)
**Goal:** Integrate M-Pesa for all payment flows

**Tasks:**
1. Set up Daraja API credentials (sandbox)
2. Build `/api/mpesa/stkpush` route
3. Build `/api/mpesa/callback` route
4. Implement payment record creation and updates
5. Test subscription payment flow
6. Test revision plan payment flow
7. Test session booking payment flow
8. Build `/api/mpesa/b2c` route for tutor payouts
9. Implement payout request workflow
10. Build payment history display
11. Switch to production Daraja API
12. Test all payment flows in production

**Deliverables:**
- Complete M-Pesa integration
- STK Push for all payment types
- B2C payouts for tutors
- Payment history tracking

---

### Phase 7: Landing Page & SEO (Week 11)
**Goal:** Build public-facing pages and optimize for search

**Tasks:**
1. Convert landing page HTML to `/page.tsx`
2. Build all landing page sections (hero, features, pricing, tutors, testimonials, FAQ)
3. Build reusable Navbar component
4. Add Metadata API to all pages
5. Create `/blog` route with MDX support
6. Write 5 launch SEO articles
7. Generate sitemap.xml
8. Configure robots.txt
9. Implement structured data (JSON-LD)
10. Add Open Graph tags
11. Optimize images and fonts
12. Run Lighthouse audit and fix issues

**Deliverables:**
- Complete landing page
- SEO-optimized blog
- Sitemap and robots.txt
- Structured data markup
- Lighthouse score ≥85

---

### Phase 8: Notifications & WhatsApp (Week 12)
**Goal:** Implement notification system

**Tasks:**
1. Set up WhatsApp Business API (Twilio)
2. Build notification service (`lib/notifications.ts`)
3. Implement all notification triggers
4. Build in-platform notification bell with Supabase Realtime
5. Create notification preferences UI
6. Test WhatsApp message delivery
7. Set up cron jobs for scheduled notifications
8. Implement notification opt-out system
9. Test all notification flows

**Deliverables:**
- WhatsApp notification system
- In-platform notifications
- Notification preferences
- Scheduled notification jobs

---

### Phase 9: QA & Launch Prep (Week 13-14)
**Goal:** Test, optimize, and prepare for launch

**Tasks:**
1. Run Lighthouse performance audit
2. Fix all performance issues
3. Test mobile responsiveness (375px, 390px, 414px)
4. Audit dark mode on all pages
5. Verify Supabase RLS policies
6. Run end-to-end tests for all user flows
7. Load test M-Pesa callbacks
8. Set up production environment variables
9. Configure DNS for nursefiti.com
10. Run security audit
11. Set up monitoring (Sentry, Vercel Analytics)
12. Create user documentation
13. Soft launch with 100 beta students and 10 tutors
14. Gather feedback and fix critical issues
15. Full public launch

**Deliverables:**
- Production-ready application
- All tests passing
- Performance optimized
- Security hardened
- Monitoring configured
- Beta testing complete
- Public launch

---

## 17. Success Metrics

### Technical Metrics
- **Performance:** Lighthouse score ≥85 on mobile
- **Uptime:** 99.9% availability
- **Response Time:** API responses <500ms (p95)
- **Error Rate:** <0.1% of requests
- **Bundle Size:** Initial load <200KB gzipped

### Business Metrics
- **Student Signups:** 1,000 in first month
- **Tutor Applications:** 50 in first month
- **Active Users:** 60% weekly active rate
- **Conversion Rate:** 20% free → paid conversion
- **Session Bookings:** 100 sessions in first month
- **Revision Plans Sold:** 50 in first month

### User Experience Metrics
- **Time to First Practice:** <2 minutes from signup
- **Session Completion Rate:** >90%
- **Student Satisfaction:** 4.5+ stars average
- **Tutor Satisfaction:** 4.5+ stars average
- **Support Tickets:** <5% of users need support

---

## 18. Risk Mitigation

### Technical Risks
1. **M-Pesa Integration Failure**
   - Mitigation: Extensive testing in sandbox, fallback to manual payment verification
   
2. **Real-time Sync Race Conditions**
   - Mitigation: Database-level locking, atomic transactions, comprehensive testing
   
3. **Performance Degradation**
   - Mitigation: Caching strategy, database indexing, CDN usage, monitoring

4. **Data Loss**
   - Mitigation: Daily automated backups, point-in-time recovery, disaster recovery plan

### Business Risks
1. **Low Student Adoption**
   - Mitigation: SEO optimization, social media marketing, referral program
   
2. **Insufficient Tutor Supply**
   - Mitigation: Competitive rates, streamlined onboarding, tutor incentives
   
3. **Payment Fraud**
   - Mitigation: M-Pesa verification, rate limiting, fraud detection

4. **Regulatory Compliance**
   - Mitigation: Legal review, data protection compliance, NCK partnership

---

## Conclusion

This technical design document provides a comprehensive blueprint for building NurseFiti, Kenya's most intelligent NCK exam preparation platform. The design emphasizes:

- **Scalability:** Serverless architecture with Supabase and Vercel
- **Real-time:** Bidirectional sync for tutor availability and bookings
- **Security:** Row Level Security, authentication, payment verification
- **Performance:** Mobile-first, optimized for 3G/4G networks
- **User Experience:** Intuitive interfaces for both students and tutors
- **Business Value:** Multiple revenue streams (subscriptions, revision plans, session commissions)

The phased implementation approach ensures steady progress with clear milestones and deliverables. Each phase builds on the previous one, allowing for iterative testing and refinement.

**Next Steps:**
1. Review and approve this design document
2. Set up development environment
3. Begin Phase 0: Foundation
4. Follow the 14-week implementation timeline
5. Launch beta in Week 13
6. Full public launch in Week 14

---

**Document Version:** 1.0  
**Last Updated:** May 19, 2026  
**Status:** Ready for Implementation
