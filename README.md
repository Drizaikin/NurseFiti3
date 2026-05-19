# NurseFiti - NCK Exam Preparation Platform

Kenya's most intelligent NCK exam preparation platform for nursing graduates.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel
- **Payments:** M-Pesa Daraja API
- **Notifications:** WhatsApp Business API (Twilio)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Git

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
   
   Then edit `.env.local` and add your Supabase credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nursefiti/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (student)/         # Student dashboard
│   ├── (tutor)/           # Tutor dashboard
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Base UI components
│   ├── student/           # Student-specific components
│   ├── tutor/             # Tutor-specific components
│   └── shared/            # Shared components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── types/             # TypeScript types
│   └── utils/             # Helper functions
└── public/                # Static assets
```

## Development Phases

- [x] **Phase 0:** Foundation (Week 1) - ✅ COMPLETED
- [x] **Phase 1:** Authentication System (Week 2) - ✅ COMPLETED
- [x] **Phase 2:** Student Dashboard Core (Weeks 3-5) - ✅ COMPLETED
- [ ] **Phase 3:** Tutor Dashboard (Weeks 6-7)
- [ ] **Phase 4:** Booking System (Week 8)
- [ ] **Phase 5:** Revision Plan Generator (Week 9)
- [ ] **Phase 6:** M-Pesa & Payments (Week 10)
- [ ] **Phase 7:** Landing Page & SEO (Week 11)
- [ ] **Phase 8:** Notifications & WhatsApp (Week 12)
- [ ] **Phase 9:** QA & Launch Prep (Weeks 13-14)

**Current Status:** Phase 1 & 2 Complete - 100% Functional ✅  
**See:** `PHASE_1_AND_2_COMPLETE.md` for detailed completion report

## Key Features

### For Students
- 📚 MCQ Practice Bank with 5,000+ questions
- 🎯 DigiProctor-style Mock Exams
- 🃏 Spaced Repetition Flashcards
- 📊 Performance Analytics
- 🏆 Gamification (XP, Streaks, Badges)
- 👥 Study Groups
- 📅 AI-Generated Revision Plans (KSh 500)
- 👨‍🏫 Book Expert Tutors

### For Tutors
- 📅 Schedule Management
- 👨‍🎓 Student Roster & Progress Tracking
- 📝 Content Studio (Create MCQs & Notes)
- 💰 Earnings & Payouts
- ⭐ Reviews & Ratings
- 📱 WhatsApp Session Notifications

## Brand Colors

- **Primary Teal:** `#08514F`
- **Accent Amber:** `#F5A623`
- **Background Cream:** `#FFFDF8`
- **Success Green:** `#1A9E75`
- **Error Red:** `#E84545`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved

---

**Built with ❤️ for Kenyan nursing graduates**
