"use client";

/**
 * OnboardingTourGate — tutor version. Same logic, different profile table.
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { OnboardingTour } from '@/components/shared/OnboardingTour';

export function TutorOnboardingTourGate() {
  const supabase = createClient();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from('tutor_profiles')
        .select('onboarding_tour_seen')
        .eq('id', user.id)
        .maybeSingle();

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
    await supabase
      .from('tutor_profiles')
      .update({ onboarding_tour_seen: true })
      .eq('id', userId);
  };

  if (!show) return null;

  return <OnboardingTour role="tutor" onComplete={handleComplete} />;
}
