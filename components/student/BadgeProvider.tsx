"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BadgeDef, evaluateUserBadges } from '@/lib/badges';
import { BadgeCelebrationModal } from './BadgeCelebrationModal';

interface BadgeContextType {
  checkBadges: () => Promise<void>;
}

const BadgeContext = createContext<BadgeContextType>({
  checkBadges: async () => {},
});

export const useBadges = () => useContext(BadgeContext);

export function BadgeProvider({ children }: { children: ReactNode }) {
  const [unlockedBadges, setUnlockedBadges] = useState<BadgeDef[]>([]);
  const supabase = createClient();

  const checkBadges = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newlyEarned = await evaluateUserBadges(supabase, user.id);
    if (newlyEarned.length > 0) {
      setUnlockedBadges(prev => [...prev, ...newlyEarned]);
    }
  };

  // Run a check on first mount (layout load)
  useEffect(() => {
    checkBadges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BadgeContext.Provider value={{ checkBadges }}>
      {children}
      {unlockedBadges.length > 0 && (
        <BadgeCelebrationModal 
          badges={unlockedBadges} 
          onClose={() => setUnlockedBadges([])} 
        />
      )}
    </BadgeContext.Provider>
  );
}
