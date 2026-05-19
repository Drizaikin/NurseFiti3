# Requirements Document

## Introduction

NurseFiti is a comprehensive Kenyan NCK (Nursing Council of Kenya) exam preparation platform designed to help nursing graduates prepare for their licensure examination. The platform serves two distinct user types: Students preparing for the NCK exam and Expert Tutors who provide guidance. The system provides three core pillars: Practice & Analytics (MCQ bank, mock exams, flashcards, progress tracking), Smart Revision Planning (AI-generated personalized study schedules), and Expert Tutoring (live 1-on-1 and group sessions). The platform is built on Next.js 14 with TypeScript, Tailwind CSS, Supabase database, and integrates M-Pesa payments and WhatsApp notifications.

## Glossary

- **Platform**: The NurseFiti web application system
- **Student**: A nursing graduate user preparing for the NCK licensure exam
- **Tutor**: An expert tutor user who provides teaching services to Students
- **NCK_Exam**: The Nursing Council of Kenya licensure examination
- **MCQ**: Multiple Choice Question
- **Mock_Exam**: A simulated NCK exam experience
- **DigiProctor**: The official NCK exam interface that must be simulated
- **Flashcard**: A study card with question and answer for spaced repetition learning
- **SRS**: Spaced Repetition System algorithm for flashcard scheduling
- **Revision_Plan**: An AI-generated personalized study schedule (paid feature)
- **Session**: A live tutoring session (1-on-1 or group)
- **Booking**: A scheduled tutoring Session between Student and Tutor
- **M_Pesa**: Kenyan mobile money payment system
- **Daraja_API**: M-Pesa integration API
- **Supabase**: Backend database and authentication service
- **RLS**: Row Level Security policies in Supabase
- **XP**: Experience points earned through platform activities
- **Streak**: Consecutive days of platform activity
- **Badge**: Achievement award for completing milestones
- **Leaderboard**: Ranking display of Student performance
- **Study_Group**: A collaborative group of Students
- **Availability**: Time slots when a Tutor is available for booking
- **WhatsApp_Notification**: Automated message sent via WhatsApp
- **Subscription**: Recurring payment plan for platform access
- **KSh**: Kenyan Shillings currency

## Requirements

### Requirement 1: Platform Foundation

**User Story:** As a developer, I want to establish the technical foundation, so that the platform can be built on a stable architecture.

#### Acceptance Criteria

1. THE Platform SHALL be built using Next.js 14 App Router with TypeScript
2. THE Platform SHALL use Tailwind CSS for styling
3. THE Platform SHALL use Supabase for database and authentication
4. THE Platform SHALL be deployed on Vercel
5. THE Platform SHALL support mobile-first responsive design
6. THE Platform SHALL support dark mode
7. THE Platform SHALL use Syne font for headings and Nunito font for body text
8. THE Platform SHALL use primary color teal #08514F, accent color amber #F5A623, and background color cream #FFFDF8
9. THE Platform SHALL display no advertisements

### Requirement 2: Database Schema

**User Story:** As a developer, I want a complete database schema, so that all platform data can be stored securely.

#### Acceptance Criteria

1. THE Platform SHALL create Supabase tables for users, students, tutors, questions, exams, flashcards, sessions, bookings, payments, and analytics
2. THE Platform SHALL enforce Row Level Security policies on all Supabase tables
3. WHEN a user is created, THE Platform SHALL automatically create associated Student or Tutor profile records
4. THE Platform SHALL store all monetary values in KSh currency
5. THE Platform SHALL maintain referential integrity between related tables

### Requirement 3: Student Authentication

**User Story:** As a Student, I want to sign up and log in, so that I can access the platform.

#### Acceptance Criteria

1. WHEN a Student provides email and password, THE Platform SHALL create a Student account
2. WHEN a Student provides valid credentials, THE Platform SHALL authenticate the Student
3. THE Platform SHALL validate email format before account creation
4. THE Platform SHALL require password minimum length of 8 characters
5. WHEN authentication succeeds, THE Platform SHALL redirect the Student to the Student dashboard
6. WHEN authentication fails, THE Platform SHALL display an error message

### Requirement 4: Tutor Application and Verification

**User Story:** As a Tutor, I want to apply and be verified, so that I can offer tutoring services.

#### Acceptance Criteria

1. WHEN a Tutor submits an application with credentials, THE Platform SHALL create a pending Tutor account
2. THE Platform SHALL require Tutor credentials including qualifications and experience
3. THE Platform SHALL set Tutor account status to pending until verified
4. WHEN an administrator approves a Tutor, THE Platform SHALL activate the Tutor account
5. WHEN a Tutor account is activated, THE Platform SHALL send a WhatsApp_Notification to the Tutor
6. THE Platform SHALL prevent pending Tutors from accessing Tutor dashboard features

### Requirement 5: MCQ Practice Bank

**User Story:** As a Student, I want to practice MCQ questions, so that I can prepare for the NCK_Exam.

#### Acceptance Criteria

1. WHEN a Student selects practice mode, THE Platform SHALL display MCQ questions
2. WHEN a Student submits an answer, THE Platform SHALL validate the answer and display immediate feedback
3. THE Platform SHALL track correct and incorrect answers for each Student
4. THE Platform SHALL categorize questions by NCK exam topics
5. WHEN a Student completes a practice session, THE Platform SHALL update the Student XP
6. THE Platform SHALL prevent displaying the same question twice in a single practice session

### Requirement 6: Mock Exam Simulation

**User Story:** As a Student, I want to take mock exams that simulate DigiProctor, so that I can practice in a realistic exam environment.

#### Acceptance Criteria

1. WHEN a Student starts a Mock_Exam, THE Platform SHALL display the DigiProctor interface simulation
2. THE Platform SHALL replicate DigiProctor visual layout, navigation, and timing display
3. WHEN the Mock_Exam timer expires, THE Platform SHALL automatically submit the exam
4. THE Platform SHALL prevent Students from navigating away during a Mock_Exam
5. WHEN a Student completes a Mock_Exam, THE Platform SHALL calculate and display the score
6. THE Platform SHALL store Mock_Exam results for analytics

### Requirement 7: Flashcard System with Spaced Repetition

**User Story:** As a Student, I want to study flashcards with spaced repetition, so that I can retain information effectively.

#### Acceptance Criteria

1. WHEN a Student reviews a Flashcard, THE Platform SHALL display the question side first
2. WHEN a Student flips a Flashcard, THE Platform SHALL display the answer side
3. WHEN a Student rates a Flashcard difficulty, THE Platform SHALL apply the SRS algorithm to schedule the next review
4. THE Platform SHALL prioritize Flashcards due for review based on SRS scheduling
5. WHEN a Student completes a Flashcard review session, THE Platform SHALL update the Student XP
6. THE Platform SHALL track Flashcard mastery level for each Student

### Requirement 8: Student Analytics Dashboard

**User Story:** As a Student, I want to view my performance analytics, so that I can identify strengths and weaknesses.

#### Acceptance Criteria

1. THE Platform SHALL display Student overall accuracy percentage
2. THE Platform SHALL display Student performance by NCK exam topic
3. THE Platform SHALL display Student Mock_Exam score history
4. THE Platform SHALL display Student study time statistics
5. THE Platform SHALL display Student XP, level, and Streak
6. THE Platform SHALL display Student Badge collection
7. THE Platform SHALL generate visual charts for performance trends

### Requirement 9: AI-Powered Study Recommendations

**User Story:** As a Student, I want AI-powered study recommendations, so that I can focus on areas needing improvement.

#### Acceptance Criteria

1. WHEN a Student has completed at least 10 practice questions, THE Platform SHALL analyze performance data
2. THE Platform SHALL identify weak topic areas based on accuracy below 70 percent
3. THE Platform SHALL recommend specific topics for focused study
4. THE Platform SHALL recommend Flashcards for weak topics
5. THE Platform SHALL update recommendations after each practice session

### Requirement 10: NCK Revision Plan Generator

**User Story:** As a Student, I want to purchase an AI-generated personalized Revision_Plan, so that I can follow a structured study schedule.

#### Acceptance Criteria

1. WHEN a Student requests a Revision_Plan, THE Platform SHALL collect exam date and available study hours
2. WHEN a Student completes payment of KSh 500, THE Platform SHALL generate a personalized Revision_Plan
3. THE Platform SHALL create a day-by-day study schedule based on Student performance data
4. THE Platform SHALL allocate more time to weak topic areas
5. THE Platform SHALL include practice, flashcard, and Mock_Exam activities in the schedule
6. THE Platform SHALL allow Students to download the Revision_Plan as PDF
7. THE Platform SHALL store the Revision_Plan for Student access

### Requirement 11: Gamification System

**User Story:** As a Student, I want to earn XP, maintain streaks, and unlock badges, so that I stay motivated.

#### Acceptance Criteria

1. WHEN a Student completes a practice question correctly, THE Platform SHALL award 10 XP
2. WHEN a Student completes a Mock_Exam, THE Platform SHALL award 100 XP
3. WHEN a Student reviews Flashcards, THE Platform SHALL award 5 XP per card
4. WHEN a Student uses the Platform on consecutive days, THE Platform SHALL increment the Student Streak
5. WHEN a Student misses a day, THE Platform SHALL reset the Student Streak to zero
6. WHEN a Student reaches XP thresholds, THE Platform SHALL award Badges
7. THE Platform SHALL display Student rank on the Leaderboard based on XP

### Requirement 12: Study Groups

**User Story:** As a Student, I want to join study groups, so that I can collaborate with peers.

#### Acceptance Criteria

1. WHEN a Student creates a Study_Group, THE Platform SHALL generate a unique group code
2. WHEN a Student enters a valid group code, THE Platform SHALL add the Student to the Study_Group
3. THE Platform SHALL display Study_Group member list
4. THE Platform SHALL display Study_Group aggregate performance statistics
5. THE Platform SHALL allow Study_Group members to share progress
6. THE Platform SHALL limit Study_Group size to 20 members

### Requirement 13: Tutor Dashboard Schedule Management

**User Story:** As a Tutor, I want to manage my availability, so that Students can book sessions.

#### Acceptance Criteria

1. WHEN a Tutor sets Availability time slots, THE Platform SHALL store the Availability
2. THE Platform SHALL allow Tutors to set recurring weekly Availability
3. WHEN a Tutor updates Availability, THE Platform SHALL synchronize with Student booking views in real-time
4. THE Platform SHALL prevent Tutors from setting overlapping Availability slots
5. THE Platform SHALL display booked and available time slots distinctly
6. WHEN a Session is booked, THE Platform SHALL automatically mark that Availability slot as unavailable

### Requirement 14: Tutor Content Studio

**User Story:** As a Tutor, I want to create and manage study content, so that I can provide resources to Students.

#### Acceptance Criteria

1. WHEN a Tutor creates a study resource, THE Platform SHALL store the resource with Tutor attribution
2. THE Platform SHALL allow Tutors to upload documents, videos, and links
3. THE Platform SHALL allow Tutors to categorize resources by NCK exam topics
4. THE Platform SHALL display Tutor-created resources to Students
5. THE Platform SHALL track resource views and downloads

### Requirement 15: Tutor Earnings and Analytics

**User Story:** As a Tutor, I want to view my earnings and session analytics, so that I can track my tutoring business.

#### Acceptance Criteria

1. THE Platform SHALL display Tutor total earnings in KSh
2. THE Platform SHALL display Tutor earnings by Session
3. THE Platform SHALL display Tutor number of completed Sessions
4. THE Platform SHALL display Tutor average rating from Student reviews
5. THE Platform SHALL display Tutor upcoming booked Sessions
6. THE Platform SHALL calculate Tutor payout amounts after Platform commission

### Requirement 16: Session Booking System

**User Story:** As a Student, I want to book tutoring sessions, so that I can receive expert guidance.

#### Acceptance Criteria

1. WHEN a Student views Tutor profiles, THE Platform SHALL display Tutor Availability
2. WHEN a Student selects an Availability slot, THE Platform SHALL create a pending Booking
3. WHEN a Student completes payment, THE Platform SHALL confirm the Booking
4. WHEN a Booking is confirmed, THE Platform SHALL send WhatsApp_Notifications to both Student and Tutor
5. THE Platform SHALL synchronize Booking status between Student and Tutor dashboards in real-time
6. WHEN a Booking is confirmed, THE Platform SHALL remove the Availability slot from other Students' views
7. THE Platform SHALL allow Students to cancel Bookings at least 24 hours in advance

### Requirement 17: Real-Time Availability Synchronization

**User Story:** As a Student and Tutor, I want booking availability to update in real-time, so that double-bookings are prevented.

#### Acceptance Criteria

1. WHEN a Tutor updates Availability, THE Platform SHALL propagate changes to all Student views within 2 seconds
2. WHEN a Student books a Session, THE Platform SHALL remove the Availability slot from all other Student views within 2 seconds
3. WHEN a Booking is cancelled, THE Platform SHALL restore the Availability slot to all Student views within 2 seconds
4. THE Platform SHALL use Supabase real-time subscriptions for synchronization
5. THE Platform SHALL prevent race conditions when multiple Students attempt to book the same slot simultaneously

### Requirement 18: M-Pesa Payment Integration

**User Story:** As a Student, I want to pay via M-Pesa, so that I can access paid features and book sessions.

#### Acceptance Criteria

1. WHEN a Student initiates payment, THE Platform SHALL integrate with Daraja_API
2. WHEN a Student enters M-Pesa phone number, THE Platform SHALL send an STK push prompt
3. WHEN payment is completed, THE Platform SHALL receive payment confirmation from Daraja_API
4. WHEN payment is confirmed, THE Platform SHALL update Student account with purchased feature access
5. THE Platform SHALL store payment transaction records
6. WHEN payment fails, THE Platform SHALL display an error message and allow retry
7. THE Platform SHALL support payments for Subscriptions, Revision_Plans, and Session Bookings

### Requirement 19: Subscription Management

**User Story:** As a Student, I want to subscribe to the platform, so that I can access premium features.

#### Acceptance Criteria

1. THE Platform SHALL offer monthly and annual Subscription plans
2. WHEN a Student purchases a Subscription, THE Platform SHALL grant access to premium features
3. WHEN a Subscription expires, THE Platform SHALL revoke premium feature access
4. THE Platform SHALL send WhatsApp_Notification 3 days before Subscription expiration
5. THE Platform SHALL allow Students to cancel Subscriptions
6. THE Platform SHALL display Subscription status on Student dashboard

### Requirement 20: WhatsApp Notification System

**User Story:** As a Student and Tutor, I want to receive WhatsApp notifications, so that I stay informed about important events.

#### Acceptance Criteria

1. WHEN a Booking is confirmed, THE Platform SHALL send WhatsApp_Notification to Student and Tutor
2. WHEN a Session is scheduled within 24 hours, THE Platform SHALL send reminder WhatsApp_Notification
3. WHEN a Student Streak reaches 7 days, THE Platform SHALL send congratulatory WhatsApp_Notification
4. WHEN a Subscription is expiring within 3 days, THE Platform SHALL send reminder WhatsApp_Notification
5. WHEN a Tutor account is verified, THE Platform SHALL send confirmation WhatsApp_Notification
6. THE Platform SHALL allow users to opt out of non-critical WhatsApp_Notifications

### Requirement 21: Landing Page

**User Story:** As a visitor, I want to view an informative landing page, so that I can understand the platform and sign up.

#### Acceptance Criteria

1. THE Platform SHALL display a hero section with value proposition
2. THE Platform SHALL display features section describing the three core pillars
3. THE Platform SHALL display pricing section with Subscription plans
4. THE Platform SHALL display tutor showcase section with featured Tutors
5. THE Platform SHALL display testimonials section
6. THE Platform SHALL display call-to-action buttons for Student signup and Tutor application
7. THE Platform SHALL optimize landing page for Kenyan nursing search terms for SEO

### Requirement 22: SEO Optimization

**User Story:** As a platform owner, I want the platform to rank well in search engines, so that Kenyan nursing students can discover it.

#### Acceptance Criteria

1. THE Platform SHALL include meta tags optimized for Kenyan nursing exam keywords
2. THE Platform SHALL generate a sitemap for search engine crawlers
3. THE Platform SHALL implement structured data markup for rich search results
4. THE Platform SHALL optimize page load speed for mobile devices
5. THE Platform SHALL use semantic HTML for accessibility and SEO
6. THE Platform SHALL include Open Graph tags for social media sharing

### Requirement 23: Tutor Review System

**User Story:** As a Student, I want to review Tutors after sessions, so that I can provide feedback and help other Students.

#### Acceptance Criteria

1. WHEN a Session is completed, THE Platform SHALL prompt the Student to submit a review
2. THE Platform SHALL require a rating from 1 to 5 stars
3. THE Platform SHALL allow optional written feedback
4. WHEN a review is submitted, THE Platform SHALL update the Tutor average rating
5. THE Platform SHALL display reviews on Tutor profile pages
6. THE Platform SHALL prevent Students from reviewing the same Session multiple times

### Requirement 24: Session Video Integration

**User Story:** As a Student and Tutor, I want to conduct live video sessions, so that we can interact in real-time.

#### Acceptance Criteria

1. WHEN a Session start time arrives, THE Platform SHALL provide a video call link
2. THE Platform SHALL integrate with a video conferencing service
3. THE Platform SHALL allow screen sharing during Sessions
4. THE Platform SHALL record Sessions when both parties consent
5. WHEN a Session ends, THE Platform SHALL store the recording for Student access
6. THE Platform SHALL support both 1-on-1 and group video Sessions

### Requirement 25: Content Moderation

**User Story:** As a platform owner, I want to moderate user-generated content, so that the platform remains professional and safe.

#### Acceptance Criteria

1. WHEN a Student or Tutor submits text content, THE Platform SHALL scan for inappropriate language
2. WHEN inappropriate content is detected, THE Platform SHALL flag the content for review
3. THE Platform SHALL allow administrators to review flagged content
4. THE Platform SHALL allow administrators to remove inappropriate content
5. THE Platform SHALL notify users when their content is removed
6. THE Platform SHALL track content moderation actions for audit purposes

### Requirement 26: Performance Monitoring

**User Story:** As a developer, I want to monitor platform performance, so that I can identify and resolve issues.

#### Acceptance Criteria

1. THE Platform SHALL log application errors with stack traces
2. THE Platform SHALL track page load times
3. THE Platform SHALL track API response times
4. THE Platform SHALL track database query performance
5. THE Platform SHALL send alerts when error rates exceed thresholds
6. THE Platform SHALL provide performance dashboards for monitoring

### Requirement 27: Data Backup and Recovery

**User Story:** As a platform owner, I want automated data backups, so that user data is protected.

#### Acceptance Criteria

1. THE Platform SHALL perform daily automated backups of the Supabase database
2. THE Platform SHALL retain backups for 30 days
3. THE Platform SHALL verify backup integrity weekly
4. THE Platform SHALL document data recovery procedures
5. THE Platform SHALL test data recovery procedures quarterly
6. THE Platform SHALL encrypt backups at rest

### Requirement 28: Accessibility Compliance

**User Story:** As a user with disabilities, I want the platform to be accessible, so that I can use all features.

#### Acceptance Criteria

1. THE Platform SHALL support keyboard navigation for all interactive elements
2. THE Platform SHALL provide alt text for all images
3. THE Platform SHALL maintain color contrast ratios meeting WCAG AA standards
4. THE Platform SHALL support screen reader navigation
5. THE Platform SHALL provide focus indicators for interactive elements
6. THE Platform SHALL allow text resizing without breaking layouts

### Requirement 29: Mobile Application Considerations

**User Story:** As a Student, I want a mobile-optimized experience, so that I can study on my phone.

#### Acceptance Criteria

1. THE Platform SHALL render correctly on screen sizes from 320px to 1920px width
2. THE Platform SHALL optimize touch targets for mobile devices with minimum 44px tap areas
3. THE Platform SHALL minimize data usage for Students on mobile networks
4. THE Platform SHALL support offline access to downloaded Flashcards
5. THE Platform SHALL optimize images for mobile bandwidth
6. THE Platform SHALL provide a progressive web app manifest for installation

### Requirement 30: Tutor Payout System

**User Story:** As a Tutor, I want to receive payouts for completed sessions, so that I can earn income.

#### Acceptance Criteria

1. WHEN a Session is completed, THE Platform SHALL calculate Tutor earnings after commission
2. THE Platform SHALL accumulate Tutor earnings in a balance
3. WHEN a Tutor requests payout, THE Platform SHALL initiate M-Pesa transfer
4. THE Platform SHALL require minimum payout threshold of KSh 1000
5. WHEN payout is completed, THE Platform SHALL send confirmation WhatsApp_Notification
6. THE Platform SHALL maintain payout transaction history for Tutors
