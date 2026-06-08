"use client";

/**
 * OnboardingTourGate — tutor version.
 *
 * To trigger the tour again for new features, increment CURRENT_TOUR_VERSION.
 * Any tutor with tour_version < CURRENT_TOUR_VERSION will see the tour again.
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { OnboardingTour } from '@/components/shared/OnboardingTour';

// ── Bump this when new tour steps are added or a feature needs re-introduction ──
const CURRENT_TOUR_VERSION = 2;

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
        .select('tour_version')
        .eq('id', user.id)
        .maybeSingle();

      if (data && 'tour_version' in data) {
        const seen = (data as { tour_version: number | null }).tour_version ?? 0;
        if (seen < CURRENT_TOUR_VERSION) {
          setShow(true);
        }
      }
    };
    check();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = async () => {
    setShow(false);
    if (!userId) return;
    await (supabase as any)
      .from('tutor_profiles')
      .update({ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true })
      .eq('id', userId);
  };

  if (!show) return null;

  return <OnboardingTour role="tutor" onComplete={handleComplete} />;
}
