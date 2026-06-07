"use client";

/**
 * OnboardingTourGate — client component that checks if the student has seen
 * the current tour version and shows it if not. Dropped into the student layout.
 *
 * To trigger the tour again for new features, increment CURRENT_TOUR_VERSION.
 * Any student with tour_version < CURRENT_TOUR_VERSION will see the tour again.
 * The old `onboarding_tour_seen` boolean is ignored; tour_version supersedes it.
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { OnboardingTour } from '@/components/shared/OnboardingTour';

// ── Bump this when new tour steps are added or a feature needs re-introduction ──
const CURRENT_TOUR_VERSION = 1;

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
        .select('tour_version')
        .eq('id', user.id)
        .maybeSingle();

      // Show if tour_version column exists and user hasn't seen current version
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
      .from('student_profiles')
      .update({ tour_version: CURRENT_TOUR_VERSION, onboarding_tour_seen: true })
      .eq('id', userId);
  };

  if (!show) return null;

  return <OnboardingTour role="student" onComplete={handleComplete} />;
}
