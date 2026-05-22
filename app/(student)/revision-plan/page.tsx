"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';

// Revision plan generation price by subscription plan
const PLAN_PRICING: Record<string, { price: number; label: string; variant: 'teal' | 'amber' | 'secondary' }> = {
  premium:  { price: 199,  label: 'Premium',  variant: 'amber' },
  standard: { price: 499,  label: 'Standard',  variant: 'teal' },
  free:     { price: 999,  label: 'Free',      variant: 'secondary' },
};

export default function RevisionPlanPage() {
  const supabase = createClient();
  const [planTier, setPlanTier] = useState<string>('free');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from('student_profiles')
        .select('subscription_plan')
        .eq('id', user.id)
        .single();
      if (data?.subscription_plan) setPlanTier(data.subscription_plan);
      setIsLoading(false);
    };
    fetchPlan();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pricing = PLAN_PRICING[planTier] ?? PLAN_PRICING.free;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-1">
          Revision Plan Generator
        </h1>
        <p className="text-neutral-mid">AI-powered personalised study schedule built around your exam date and weak areas.</p>
      </div>

      {/* Pricing callout — tier-aware */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--color-text)]">Your plan: <Badge variant={pricing.variant} size="sm">{pricing.label}</Badge></p>
          <p className="text-xs text-neutral-mid mt-0.5">
            {planTier === 'premium'
              ? 'Premium includes 1 free plan per billing cycle. Additional plans at KSh 199 each.'
              : planTier === 'standard'
              ? 'Standard plan: KSh 499 per generation. Upgrade to Premium for KSh 199 per plan + 1 free per cycle.'
              : 'Free plan: KSh 999 per generation. Upgrade to Standard (KSh 499) or Premium (KSh 199 + 1 free/cycle).'}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-heading font-bold text-primary">KSh {pricing.price.toLocaleString()}</p>
          <p className="text-xs text-neutral-mid">per generation</p>
        </div>
      </div>

      {/* Main teaser card */}
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          AI-Powered Revision Plan
        </h2>
        <p className="text-neutral-mid mb-3 max-w-md mx-auto">
          Get a personalised day-by-day study schedule tailored to your exam date, available study hours, and your weakest NCK units.
        </p>
        <p className="text-sm font-semibold text-primary mb-6">
          KSh {pricing.price.toLocaleString()} for {pricing.label} plan users
        </p>
        <p className="text-sm text-neutral-mid mb-8">
          Coming in Phase 5 — full generator with payment, AI scheduling, and PDF download.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/practice">
            <Button variant="primary">Practice Questions Instead</Button>
          </Link>
          {planTier === 'free' && (
            <Link href="/settings">
              <Button variant="outline">Upgrade Plan</Button>
            </Link>
          )}
        </div>
      </Card>

      {/* What's included preview */}
      <Card>
        <h3 className="font-heading font-bold text-[var(--color-text)] mb-4">What your revision plan will include</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '📆', title: 'Day-by-day schedule', desc: 'Built around your exact exam date and daily study hours' },
            { icon: '🎯', title: 'Weak area focus', desc: 'More time allocated to units where your accuracy is below 70%' },
            { icon: '📊', title: 'Mock exam schedule', desc: 'Timed mock exams built into the final 2 weeks' },
            { icon: '🎴', title: 'Flashcard targets', desc: 'Daily flashcard review goals per unit' },
            { icon: '📄', title: 'PDF download', desc: 'Download and print your full plan' },
            { icon: '🔗', title: 'Share link', desc: 'Share your plan with a study partner or tutor' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-primary-xlight dark:bg-primary/5">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">{item.title}</p>
                <p className="text-xs text-neutral-mid mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
