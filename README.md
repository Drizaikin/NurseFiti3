# NurseFiti - NCK Exam Preparation Platform

NurseFiti is Kenya's most intelligent, adaptive NCK (Nursing Council of Kenya) exam preparation platform for nursing graduates. Built to completely rethink how nurses prepare for licensure, it provides mock exams, spaced repetition flashcards, live tutoring, and gamification in one seamless ecosystem.

## 🚀 Overview & Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (with Row Level Security)
- **Payments:** IntaSend (Mobile Money / M-Pesa Integration)
- **Notifications:** Resend (Email) & Webhook integrations
- **Hosting:** Vercel

## ⚙️ Core Systems & Workflows

### 1. Dynamic Pricing & Configuration
NurseFiti uses a centralized dynamic settings system that completely drives the platform's pricing models and capabilities.
- **`platform_settings` Database Table:** A single-row table containing prices for all subscriptions (Daily, Weekly, Standard, Premium) and Base Rates for tutors.
- **Admin Control Panel:** Accessible at `/admin/settings`, the platform administrator can alter prices in real-time. Changes instantly propagate to landing pages, student checkout pages, scholarship calculations, and webhook validations.
- **IntaSend Integration:** The backend `/api/intasend/initialize` dynamically fetches the active settings to ensure the user is billed correctly. Upon webhook success, `/api/intasend/webhook` verifies against the dynamic pricing engine to provision accurate access lengths.

### 2. User Roles & Identity
- **Students:** Users preparing for their exams. They can upload past questions to bypass payment (which admins review) or pay via M-Pesa.
- **Tutors:** Certified nurses offering 1-on-1 tutoring. Tutors have access to a fully-featured studio to manage their schedule, check earnings, and interact with students.
  - **Tutor Anonymity:** To comply with the Kenyan Data Protection Act 2019 and avoid conflicts of interest for government-employed nurses, tutors can configure a **Pseudonym** and hide their real name/avatar via the `/tutor-profile` anonymity settings.
- **Admins:** Global platform administrators overseeing settings, scholarship campaigns, user management, and manual question reviews.

### 3. Study Mechanics (The Core Loop)
- **MCQ Practice:** Adaptive testing based on previous errors.
- **Mock Exams:** Timed, strict DigiProctor exams. The PDFs can be unlocked and downloaded depending on the user's active subscription tier (Success Plan & Elite Prep).
- **Spaced Repetition (SRS):** Flashcards using the SM-2 algorithm. The system intelligently surfaces cards the student is most likely to forget, optimizing retention.
- **Gamification:** Leaderboards, XP, and weekly challenges. To maintain ecosystem health, **Automated Bots** operate via Supabase `pg_cron` jobs to simulate peer pressure on leaderboards within strict 7-day rolling windows.

### 4. Subscriptions & Scholarship Pipeline
NurseFiti is a freemium platform driven by IntaSend M-Pesa payments.
- **Tiers:** Free, Exam Boost Daily, Exam Boost Weekly, Success Plan, and Elite Prep.
- **Scholarships:** External sponsors (e.g., Samburu Excellence Scholarship, Nadukae) can fund "Campaigns". Sponsors use the `/sponsor/[slug]` public checkout page to instantly deposit funds via IntaSend. Admins can then seamlessly click "Approve Full" or "Subsidized" on student applications, which automatically deducts the `plan_premium_price` dynamically from the sponsor's wallet and grants the student Elite Prep access.
- **Legal Protection:** Our Terms of Service thoroughly protects the platform and its sponsors from legal liability.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Supabase account (Local or Cloud)
- IntaSend API keys

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nursefiti.git
   cd nursefiti
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Supabase URL, Anon Key, Service Role Key, and IntaSend keys.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:** Navigate to `http://localhost:3000`

## 📁 Codebase Structure

```
nursefiti/
├── app/
│   ├── (auth)/            # Login, Signup, Password reset flows
│   ├── (student)/         # Core studying dashboards, flashcards, settings
│   ├── (tutor)/           # Tutor studio, scheduling, and profile settings
│   ├── (admin)/           # Admin management, settings, scholarships
│   ├── (public)/          # Legal pages (Terms, Privacy)
│   ├── api/               # API routes (IntaSend webhooks, Tutor profile updates)
│   ├── sponsor/           # Public sponsor checkout pages
│   └── page.tsx           # Landing page
├── components/            # Reusable UI, Layouts, Feedback widgets
├── lib/                   # Utilities, Supabase Clients, Platform Settings helpers
└── public/                # Static assets, images, icons
```

## 🔒 Security & Data Compliance
- **RLS (Row Level Security):** Fully enforced in Supabase. Students cannot view other students' data. 
- **Anonymity:** Handled safely on the server side; frontend UI completely masks the real `full_name` behind the `pseudonym` if `is_anonymous` is active.
- **Liability:** Educational content only; not to be used for clinical decision making.

## 📝 License
Proprietary - All rights reserved. Built with ❤️ for Kenyan nursing graduates.
