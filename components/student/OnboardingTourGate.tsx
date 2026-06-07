"use client";

/**
 * OnboardingTourGate — client component that checks if the student has seen
 * the tour and shows it if not. Dropped into the student layout.
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { OnboardingTour } from '@/components/shared/OnboardingTour';

export function OnboardingTourGate() {
  const supabase = createClient();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from('student_profiles')
        .select('onboarding_tour_seen')
        .eq('id', user.id)
        .maybeSingle();

      // Show if column exists and is false/null (new account)
      // If column doesn't exist yet (migration pending), data will be null — don't show
      if (data && 'onboarding_tour_seen' in data && !(data as { onboarding_tour_seen: boolean }).onboarding_tour_seen) {
        setShow(true);
      }
    };
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = async () => {
    setShow(false);
    if (!userId) return;
    await (supabase as any)
      .from('student_profiles')
      .update({ onboarding_tour_seen: true })
      .eq('id', userId);
  };

  if (!show) return null;

  return <OnboardingTour role="student" onComplete={handleComplete} />;
}
