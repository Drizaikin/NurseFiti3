/**
 * Single source of truth for plan limits.
 * Every feature page and API route imports from here.
 * Update this file when pricing changes — nowhere else.
 *
 * Plan tiers:
 *   free     — KSh 0 forever (limited features; can unlock mock exam by uploading questions)
 *   daily    — KSh 99/day  (same features as standard, 1-day access)
 *   weekly   — KSh 499/week (same features as standard, 7-day access)
 *   standard — KSh 1,199/month (full features, 2 mock exams per week)
 *   premium  — KSh 3,500/60-day cycle (all features, unlimited mock exams = 1/day)
 */

export type PlanTier = 'free' | 'daily' | 'weekly' | 'standard' | 'premium';

/**
 * Mock exam limits:
 *   free     — 0 (blocked unless they upload questions — handled separately)
 *   daily    — 2 per week (same as standard; resets Monday 00:00 EAT)
 *   weekly   — 2 per week (same as standard; resets Monday 00:00 EAT)
 *   standard — 2 per week (resets Monday 00:00 EAT)
 *   premium  — Infinity (effectively 1/day = ~7/week, no hard cap)
 */
export const PLAN_LIMITS = {
  free: {
    practiceQuestionsPerDay: 30,
    mockExamsPerWeek: 0,          // blocked; upload-to-unlock handled in mock-exam page
    flashcardsAccess: false,
    analyticsLevel: 'basic' as const,
    tutorBookingAccess: true,
    revisionPlanPriceKsh: 0,
    communityGroups: true,
    leaderboard: false,
    whatsappSupport: false,
    examReminders: false,
  },
  daily: {
    practiceQuestionsPerDay: Infinity,
    mockExamsPerWeek: 2,
    flashcardsAccess: true,
    analyticsLevel: 'full' as const,
    tutorBookingAccess: true,
    revisionPlanPriceKsh: 0,
    communityGroups: true,
    leaderboard: false,
    whatsappSupport: false,
    examReminders: false,
  },
  weekly: {
    practiceQuestionsPerDay: Infinity,
    mockExamsPerWeek: 2,
    flashcardsAccess: true,
    analyticsLevel: 'full' as const,
    tutorBookingAccess: true,
    revisionPlanPriceKsh: 0,
    communityGroups: true,
    leaderboard: false,
    whatsappSupport: false,
    examReminders: false,
  },
  standard: {
    practiceQuestionsPerDay: Infinity,
    mockExamsPerWeek: 2,
    flashcardsAccess: true,
    analyticsLevel: 'full' as const,
    tutorBookingAccess: true,
    revisionPlanPriceKsh: 0,
    communityGroups: true,
    leaderboard: false,
    whatsappSupport: false,
    examReminders: false,
  },
  premium: {
    practiceQuestionsPerDay: Infinity,
    mockExamsPerWeek: Infinity,   // 1 per day effectively; no hard weekly cap
    flashcardsAccess: true,
    analyticsLevel: 'full' as const,
    tutorBookingAccess: true,
    revisionPlanPriceKsh: 0,
    communityGroups: true,
    leaderboard: true,
    whatsappSupport: true,
    examReminders: true,
  },
} as const satisfies Record<PlanTier, {
  practiceQuestionsPerDay: number;
  mockExamsPerWeek: number;
  flashcardsAccess: boolean;
  analyticsLevel: 'basic' | 'full';
  tutorBookingAccess: boolean;
  revisionPlanPriceKsh: number;
  communityGroups: boolean;
  leaderboard: boolean;
  whatsappSupport: boolean;
  examReminders: boolean;
}>;

export function getLimits(tier: string) {
  return PLAN_LIMITS[tier as PlanTier] ?? PLAN_LIMITS.free;
}

/** Returns true if the plan tier is still active (not expired) */
export function isPlanActive(tier: string, expiresAt: string | null): boolean {
  if (tier === 'free') return true;
  if (!expiresAt) return false;
  return new Date(expiresAt) > new Date();
}

/** Returns the effective tier — falls back to 'free' if expired */
export function effectiveTier(tier: string, expiresAt: string | null): PlanTier {
  if (tier === 'free') return 'free';
  if (isPlanActive(tier, expiresAt)) return tier as PlanTier;
  return 'free'; // expired paid plan → treat as free
}

/**
 * Returns the ISO date string for the start of the current week (Monday 00:00 EAT).
 * EAT = UTC+3. Using local Monday midnight avoids the UTC-offset issue where
 * a user at 1–2am EAT on Monday would be counted in the previous week.
 */
export function getWeekStart(): string {
  const now = new Date();
  // Work in local time to respect the user's calendar week
  const day = now.getDay(); // 0 = Sunday, 1 = Monday …
  const diff = day === 0 ? -6 : 1 - day; // days back to Monday
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff, 0, 0, 0, 0);
  return monday.toISOString();
}

/** Pricing metadata for display in the UI */
export const PLAN_PRICING_META: Record<PlanTier, {
  label: string;
  price: string;
  period: string;
  amountKsh: number;
  durationDays: number;
  badge: 'secondary' | 'teal' | 'amber';
  highlight?: boolean;
}> = {
  free:     { label: 'Test Yourself',     price: 'KSh 0',     period: 'forever',     amountKsh: 0,    durationDays: 0,  badge: 'secondary' },
  daily:    { label: 'Exam Boost Daily',  price: 'KSh 99',    period: '/day',        amountKsh: 99,   durationDays: 1,  badge: 'teal' },
  weekly:   { label: 'Exam Boost Weekly', price: 'KSh 499',   period: '/week',       amountKsh: 499,  durationDays: 7,  badge: 'teal', highlight: true },
  standard: { label: 'Success Plan',      price: 'KSh 1,199', period: '/month',      amountKsh: 1199, durationDays: 30, badge: 'teal' },
  premium:  { label: 'Elite Prep',        price: 'KSh 3,500', period: '/exam cycle', amountKsh: 3500, durationDays: 90, badge: 'amber' },
};

/**
 * Derives the plan tier and duration from a payment amount in KSh.
 * Single source of truth — import this instead of duplicating the thresholds.
 */
export function getPlanFromAmount(amountKsh: number | string | null | undefined): { tier: PlanTier; durationDays: number } {
  const amt = Number(amountKsh) || 0;
  if (amt >= 3500) return { tier: 'premium',  durationDays: 90 };
  if (amt >= 1199) return { tier: 'standard', durationDays: 30 };
  if (amt >= 499)  return { tier: 'weekly',   durationDays: 7  };
  if (amt >= 99)   return { tier: 'daily',    durationDays: 1  };
  return { tier: 'free', durationDays: 0 };
}
