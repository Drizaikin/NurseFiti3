import { SupabaseClient } from '@supabase/supabase-js';

export interface PlatformSettings {
  allow_tutor_custom_pricing: boolean;
  krchn_hourly_rate: number;
  bscn_hourly_rate: number;
  plan_daily_price: number;
  plan_weekly_price: number;
  plan_standard_price: number;
  plan_premium_price: number;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  allow_tutor_custom_pricing: false,
  krchn_hourly_rate: 1500,
  bscn_hourly_rate: 1800,
  plan_daily_price: 99,
  plan_weekly_price: 499,
  plan_standard_price: 1199,
  plan_premium_price: 3500,
};

// In-memory cache to avoid excessive DB calls during identical renders
let cachedSettings: PlatformSettings | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

export async function fetchPlatformSettings(supabase: SupabaseClient, forceRefresh = false): Promise<PlatformSettings> {
  const now = Date.now();
  if (!forceRefresh && cachedSettings && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedSettings;
  }

  try {
    const { data, error } = await supabase
      .from('platform_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error || !data) {
      console.error('[fetchPlatformSettings] Error fetching, falling back to defaults:', error);
      return DEFAULT_SETTINGS;
    }

    cachedSettings = {
      allow_tutor_custom_pricing: data.allow_tutor_custom_pricing,
      krchn_hourly_rate: Number(data.krchn_hourly_rate),
      bscn_hourly_rate: Number(data.bscn_hourly_rate),
      plan_daily_price: Number(data.plan_daily_price),
      plan_weekly_price: Number(data.plan_weekly_price),
      plan_standard_price: Number(data.plan_standard_price),
      plan_premium_price: Number(data.plan_premium_price),
    };
    lastFetchTime = now;
    return cachedSettings;
  } catch (err) {
    console.error('[fetchPlatformSettings] Exception, falling back to defaults:', err);
    return DEFAULT_SETTINGS;
  }
}

export function buildDynamicPlanPricingMeta(settings: PlatformSettings) {
  return {
    free:     { label: 'Test Yourself',     price: 'KSh 0',     period: 'forever',     amountKsh: 0,    durationDays: 0,  badge: 'secondary' as const },
    daily:    { label: 'Exam Boost Daily',  price: `KSh ${settings.plan_daily_price.toLocaleString()}`,    period: '/day',        amountKsh: settings.plan_daily_price,   durationDays: 1,  badge: 'teal' as const },
    weekly:   { label: 'Exam Boost Weekly', price: `KSh ${settings.plan_weekly_price.toLocaleString()}`,   period: '/week',       amountKsh: settings.plan_weekly_price,  durationDays: 7,  badge: 'teal' as const, highlight: true },
    standard: { label: 'Success Plan',      price: `KSh ${settings.plan_standard_price.toLocaleString()}`, period: '/month',      amountKsh: settings.plan_standard_price, durationDays: 30, badge: 'teal' as const },
    premium:  { label: 'Elite Prep',        price: `KSh ${settings.plan_premium_price.toLocaleString()}`, period: '/exam cycle', amountKsh: settings.plan_premium_price, durationDays: 90, badge: 'amber' as const },
  };
}

export function getDynamicPlanFromAmount(amountKsh: number | string | null | undefined, settings: PlatformSettings): { tier: any; durationDays: number } {
  const amt = Number(amountKsh) || 0;
  if (amt >= settings.plan_premium_price) return { tier: 'premium',  durationDays: 90 };
  if (amt >= settings.plan_standard_price) return { tier: 'standard', durationDays: 30 };
  if (amt >= settings.plan_weekly_price)  return { tier: 'weekly',   durationDays: 7  };
  if (amt >= settings.plan_daily_price)   return { tier: 'daily',    durationDays: 1  };
  return { tier: 'free', durationDays: 0 };
}
