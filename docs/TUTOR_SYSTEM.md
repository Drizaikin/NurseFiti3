# NurseFiti Tutor System Documentation

## Overview
The Tutor System allows verified professionals to offer 1-on-1 and group tutoring sessions, answer questions, provide study notes, and earn income. This document summarizes the architecture, constraints, and lifecycle of tutoring features.

## 1. Profile Verification
Tutors must complete their profile before appearing in the directory or accepting bookings:
- **Requirements:** Bio, cadres taught, hourly rate, NCK certificate, Academic Qualifications, National ID, and M-Pesa number.
- **Verification Status:** `pending`, `verified`, `rejected`. Only `verified` tutors show up in the directory (`/tutors`).

## 2. Scheduling & Availability
- **Setup:** Tutors set availability blocks via the `/tutor-schedule` page.
- **Conflict Prevention:** Uses PL/pgSQL `create_booking_atomic` to lock rows (`SELECT ... FOR UPDATE`) and prevent double booking.
- **Passed Slots:** Past dates are completely hidden. If a slot is on the current date but the time has passed, it is shown as "Passed" and disabled.
- **Group Sessions:** If a tutor toggles `allow_group_sessions` in `tutor_profiles`, the booking RPC bypasses the strict slot lock (allowing up to 50 concurrent bookings on the same slot).

## 3. Session Lifecycle & Live Tracking
- **Booking:** Students select a slot, pay via IntaSend, and the status transitions from `pending` to `confirmed`.
- **Meet Links:** Handled automatically via `auto_set_meet_link` DB trigger calling the Google Meet webhook for the `/api/sessions/meet` serverless function.
- **Live Tracking:**
  - On the dashboard, students and tutors see a **Start Tracking** button.
  - Pressing it marks `actual_start_time`.
  - Pressing **End Session** marks `actual_end_time`, calculates `actual_duration_seconds`, and marks the session as `completed`.
- **Metrics Trigger:** A trigger on `sessions` only increments `tutor_profiles.total_sessions` and `total_students` when the status changes to `completed`.

## 4. Notifications & Reminders
- **Cron Job:** `/api/cron/reminders` runs every 15 minutes (via `vercel.json`).
- **Reminders:** Sends email notifications at 24h, 1h, and 15m marks. Tracks sent status in DB columns (`reminder_24h_sent`, `reminder_1h_sent`, `reminder_15m_sent`) to prevent duplicates.
- **Google Calendar:** Additional automatic notifications are sent natively to guests via Google Calendar integration when the Meet link is created.

## 5. Earnings & Platform Fee
- The system enforces a **23% platform fee**.
- The `gross_amount` is paid by the student. `platform_fee` goes to NurseFiti. The tutor receives `net_amount` (77%).
- Payouts are manually reconciled based on `sessions.status = 'completed'` and `tutor_profiles.mpesa_number`.
