# Getting Started with NurseFiti Development

## 🎉 Phase 0 Complete!

The foundation for NurseFiti has been successfully set up. You now have a production-ready Next.js 14 application with TypeScript, Tailwind CSS, Supabase integration, and a complete component library.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

**Option A: Create New Supabase Project**

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key
3. Create `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
4. Add your Supabase credentials to `.env.local`

**Option B: Use Supabase CLI (Recommended)**

```bash
# Install Supabase CLI globally
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Start local Supabase (includes PostgreSQL, Auth, Storage, Realtime)
supabase start

# This will output your local credentials - add them to .env.local
```

### 3. Run Database Migrations

```bash
# Link to your Supabase project (if using cloud)
supabase link --project-ref your-project-ref

# Push migrations to database
supabase db push

# Generate TypeScript types from your database
supabase gen types typescript --local > lib/types/database.types.ts
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nursefiti/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth pages (login, signup)
│   ├── (student)/                # Student dashboard pages
│   ├── (tutor)/                  # Tutor dashboard pages
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── providers/                # Context providers
│   │   └── ThemeProvider.tsx     # Dark mode provider
│   ├── shared/                   # Shared components
│   │   ├── NurseFitiLogo.tsx     # Brand logo
│   │   └── DarkModeToggle.tsx    # Theme toggle
│   └── ui/                       # Base UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── ProgressBar.tsx
│       ├── Avatar.tsx
│       └── Spinner.tsx
│
├── lib/
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts             # Client-side
│   │   └── server.ts             # Server-side
│   ├── types/                    # TypeScript types
│   │   └── database.types.ts     # Generated from DB
│   └── utils/                    # Helper functions
│
├── supabase/
│   ├── config.toml               # Supabase config
│   └── migrations/               # Database migrations
│       ├── 20260519000001_create_initial_schema.sql
│       ├── 20260519000002_enable_rls.sql
│       └── 20260519000003_create_booking_function.sql
│
├── .kiro/specs/nursefiti/        # Project specifications
│   ├── requirements.md           # 30 requirements
│   ├── design.md                 # Technical design
│   └── tasks.md                  # Implementation tasks
│
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── next.config.mjs               # Next.js config
└── README.md                     # Project overview
```

## Available Components

### UI Components

```tsx
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { Spinner } from '@/components/ui/Spinner';

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>

// Badge colors
<Badge variant="teal">Teal</Badge>
<Badge variant="amber">Amber</Badge>
<Badge variant="green">Success</Badge>
<Badge variant="red">Error</Badge>

// Progress bar
<ProgressBar value={75} color="teal" showLabel />

// Avatar with fallback
<Avatar name="John Doe" size="md" />
<Avatar src="/avatar.jpg" name="John Doe" size="lg" />
```

### Shared Components

```tsx
import { NurseFitiLogo } from '@/components/shared/NurseFitiLogo';
import { DarkModeToggle } from '@/components/shared/DarkModeToggle';

// Logo variants
<NurseFitiLogo variant="full" size={64} />
<NurseFitiLogo variant="icon" size={48} />

// Dark mode toggle
<DarkModeToggle />
```

## Database Schema

The database includes 20+ tables:

- **User Management:** profiles, student_profiles, tutor_profiles
- **Content:** questions, flashcard_decks, flashcards, study_notes
- **Learning:** student_answers, mock_exam_results, flashcard_progress
- **Tutoring:** tutor_availability, sessions, session_reviews
- **Social:** study_groups, group_members
- **Gamification:** student_badges, notifications
- **Commerce:** payments, revision_plans

All tables have Row Level Security (RLS) enabled.

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/student-signup
```

### 2. Develop Your Feature

Follow the tasks in `.kiro/specs/nursefiti/tasks.md`

### 3. Test Your Changes

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Build for production (test)
npm run build
```

### 4. Commit and Push

```bash
git add .
git commit -m "feat: implement student signup page"
git push origin feature/student-signup
```

### 5. Deploy to Vercel

- Push to `main` branch for production
- Push to any branch for preview deployment

## Next Steps: Phase 1 - Authentication

Now that Phase 0 is complete, start Phase 1:

### Week 2 Tasks:

1. **Task 1.1:** Build Student Signup Page
2. **Task 1.2:** Implement Student Signup Logic
3. **Task 1.3:** Build Tutor Application Form
4. **Task 1.4:** Implement Tutor Application Logic
5. **Task 1.5:** Build Login Page
6. **Task 1.6:** Configure Auth Middleware
7. **Task 1.7:** Build Onboarding Diagnostic Quiz
8. **Task 1.8:** Build Tutor Pending Verification Page

See `.kiro/specs/nursefiti/tasks.md` for detailed task descriptions.

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Supabase
supabase start           # Start local Supabase
supabase stop            # Stop local Supabase
supabase status          # Check Supabase status
supabase db reset        # Reset database
supabase db push         # Push migrations
supabase gen types typescript --local > lib/types/database.types.ts

# Git
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to remote
```

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

## Need Help?

- Check the spec files in `.kiro/specs/nursefiti/`
- Review the design document for architecture details
- Check the tasks document for step-by-step instructions

---

**Happy Coding! Let's build NurseFiti! 🚀**
