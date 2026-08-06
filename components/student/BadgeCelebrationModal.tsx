"use client";

import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { BadgeDef } from '@/lib/badges';
import { Button } from '@/components/ui/Button';

interface Props {
  badges: BadgeDef[];
  onClose: () => void;
}

export function BadgeCelebrationModal({ badges, onClose }: Props) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);

  // Cycle through badges if multiple were earned at once
  useEffect(() => {
    if (badges.length === 0) {
      onClose();
    }
  }, [badges, onClose]);

  if (badges.length === 0) return null;

  const currentBadge = badges[currentIdx];

  const handleNext = () => {
    if (currentIdx < badges.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      onClose();
    }
  };

  const handleViewAchievements = () => {
    onClose();
    router.push('/achievements');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key={currentBadge.id} // Re-animate if badge changes
          className="relative w-full max-w-sm bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl p-8 text-center overflow-hidden"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: -50, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Animated Background Rays/Glow */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--color-accent) 90deg, transparent 180deg, var(--color-accent) 270deg, transparent 360deg)',
              opacity: 0.35,
              scale: 2
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{
                scale: { type: "spring", damping: 12, stiffness: 200, delay: 0.1 },
                rotate: { delay: 0.4, duration: 0.5 }
              }}
              className="text-7xl mb-6 inline-block filter drop-shadow-xl"
            >
              {currentBadge.icon}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm uppercase tracking-widest text-accent font-bold mb-2"
            >
              Badge Unlocked!
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {currentBadge.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-300 mb-8"
            >
              {currentBadge.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              {currentIdx === badges.length - 1 ? (
                <>
                  <Button onClick={handleViewAchievements} className="w-full font-bold">
                    View Achievements
                  </Button>
                  <Button onClick={onClose} variant="ghost" className="w-full">
                    View Later
                  </Button>
                </>
              ) : (
                <Button onClick={handleNext} className="w-full font-bold">
                  Next Badge ({badges.length - currentIdx - 1} more!)
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
