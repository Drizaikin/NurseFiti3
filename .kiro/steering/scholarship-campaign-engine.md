# Scholarship & Sponsorship Campaign Engine (Ledger Architecture)

## Overview
This document outlines the architecture for the generic scholarship engine, designed to handle bulk sponsorships from MPs, County Governments, NGOs, and corporate sponsors. 

It uses a **ledger-based allocation system** to ensure strict financial accountability. Every deposit is tracked, and every beneficiary access granted has a corresponding exact monetary allocation deducted from the sponsor's pool.

## Database Schema (Supabase)

### `scholarship_campaigns`
- `id` (uuid)
- `slug` (text, unique) - e.g., `samburu-nursing-excellence`
- `name` (text)
- `sponsor_name` (text) - e.g., "Senetorial Aspirant, sir. Lokwang Jackson Nadukae"
- `full_scholarship_slots` (integer) - e.g., 10
- `max_subsidized_slots` (integer) - e.g., 100
- `subsidy_discount_percentage` (integer) - e.g., 25
- `is_public` (boolean) - Toggle for public dashboard visibility (Default: false)
- `status` (text) - active, completed

### `scholarship_deposits` (The Ledger - IN)
- `id` (uuid)
- `campaign_id` (uuid, FK)
- `amount_kes` (integer) - e.g., 50000
- `reference` (text) - Transaction/cheque reference or IntaSend Invoice ID
- `deposit_date` (timestamp)
- `notes` (text) - e.g., 'IntaSend online deposit'

### `scholarship_applications`
- `id` (uuid)
- `campaign_id` (uuid, FK)
- `student_id` (uuid, FK to auth.users)
- Application fields: Full Name, Phone, Email, Institution, Course, Exam Date, County, Sub-County, National ID, Student ID
- `status` (text) - pending, approved, rejected, waitlisted

### `scholarship_beneficiaries` (The Ledger - OUT)
- `id` (uuid)
- `campaign_id` (uuid, FK)
- `student_id` (uuid, FK)
- `beneficiary_type` (text) - FULL or SUBSIDIZED
- `allocated_amount_kes` (integer) - Explicitly tracking the exact cost deducted from the sponsor's pool.
- `approved_by` (uuid, FK to admin user)
- `activated_at` (timestamp)
- `expires_at` (timestamp)

---

## 1. Student Interface (Frontend)

### Application Form (`app/scholarships/[slug]/apply/page.tsx`)
- Captures required student details and links to the specific campaign.

### Student Account Settings (`app/(student)/settings/page.tsx`)
- Contains a dedicated **Scholarships** card under the "Account" tab.
- Displays available campaigns with a direct "Apply for Scholarship" button.

### Dashboard Banner (`app/(student)/dashboard/page.tsx`)
- Checks if the current user has an active record in `scholarship_beneficiaries`.
- Displays dynamic premium badge acknowledging the specific sponsor.

---

## 2. Admin Workflow & Automations

### Admin Dashboard (`app/(admin)/admin/scholarships/[campaignId]/page.tsx`)
When an Admin reviews a pending application, the system handles the math automatically:
1. **Calculate Available Funds:** `SUM(deposits.amount_kes) - SUM(beneficiaries.allocated_amount_kes)`
2. **Determine Allocation:**
   - If current FULL beneficiaries `< campaign.full_scholarship_slots`: System suggests **APPROVE FULL** (allocated amount = full premium price).
   - If FULL slots maxed, and `Available Funds >= subsidized_cost`: System suggests **APPROVE SUBSIDIZED** (allocated amount = subsidized cost).
   - If `Available Funds < subsidized_cost` or limits reached: Approval is blocked.
3. **Execution on Approval:**
   - Create `scholarship_beneficiaries` record with exact `allocated_amount_kes`.
   - Automatically upgrade `student_profiles.plan_tier` to `premium` for 90 days.
   - Send automatic welcome email via Nodemailer.

---

## 3. Sponsor Dashboard & IntaSend Payment Integration

### Impact Reporting (`app/sponsor/[slug]/page.tsx`)
- **Security:** Requires Admin login UNLESS the campaign's `is_public` toggle is `true`.
- **Financials:** Funds Received (Total Deposits), Funds Allocated (Total Beneficiary Allocations), Balance Remaining.
- **Metrics:** Applications (Approved/Pending/Rejected), Active Beneficiaries, Questions Attempted, Mock Exams Completed, Average Score Improvement.

### Sponsor Dynamic Checkout (`SponsorCheckout.tsx`)
- Sponsors can enter a dynamic KES amount to fund the campaign.
- **Impact Calculator:** Dynamically shows how many Full and Subsidized students the amount will cover before payment.
- **Payment API (`/api/intasend/initialize` & `/api/intasend/webhook`)**:
  - Initiates an IntaSend checkout with `type: 'sponsor_deposit'` and `metadata.campaign_id`.
  - Upon successful webhook confirmation, the system automatically inserts a row into `scholarship_deposits`, instantly increasing the campaign's Available Funds balance.

## 4. Recent Implementations & Fixes (June 2026)

### Application Integration
- A dedicated `app/api/scholarships/apply/route.ts` API route securely captures student applications, ensuring they are only allowed to apply once per campaign.
- A newly built application form (`app/scholarships/[slug]/apply/page.tsx`) seamlessly gathers all the needed student details required by the sponsors.

### Database Synchronisation
- Extensively synced `database.types.ts` manually mapping Supabase Postgres tables like `activity_logs`, `session_reminders`, `page_views`, `scholarship_applications` enabling zero compilation errors.
- Created `20260625150000_update_sponsor_name.sql` to apply the exact sponsor alias "Senetorial Aspirant, sir. Lokwang Jackson Nadukae".
- Pushed migrations perfectly aligning local shadow db with live remote production. 

### Admin & Sponsor Tools
- The Admin Interface (`app/(admin)/admin/scholarships/[campaignId]/ClientManager.tsx`) accurately distributes "Available Balance" strictly subtracting exact allocated values. It exposes 1-click **Copy Sponsor Link** (`/sponsor/[slug]`) and **Copy Application Link** (`/scholarships/[slug]/apply`) features directly wired to the live `www.nursefiti.co.ke` domain for easy sharing.
- Sponsor dashboard (`app/sponsor/[slug]/page.tsx`) accurately measures 25% discount dynamic capacity calculations without typescript mismatch errors.

## Important Guidelines
- Maintain the current NurseFiti designs, brand themes, colors, standards, and features.
- Any contradictions in this document with existing NurseFiti styles should be redesigned to meet the current standards.
- Always verify for bugs and syntax errors with every implementation to maintain platform functionality.
