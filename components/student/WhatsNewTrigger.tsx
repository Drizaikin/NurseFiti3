"use client";

/**
 * WhatsNewTrigger — a small animated "NEW" pill that appears in the sidebar
 * and re-opens the WhatsNewModal.
 *
 * Import and render alongside <WhatsNewModal /> in the layout.
 * It disappears permanently once the user has seen the current version.
 */

import { useEffect, useState } from "react";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";

// Must match CURRENT_VERSION and STORAGE_KEY in WhatsNewModal.tsx
const CURRENT_VERSION = 4;
const STORAGE_KEY = `whats_new_seen_v${CURRENT_VERSION}`;

interface Props {
  onClick: () => void;
}

export function WhatsNewTrigger({ onClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", damping: 18, stiffness: 260 }}
        onClick={onClick}
        className="fixed bottom-24 right-5 z-[70] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl text-sm font-bold text-white cursor-pointer select-none"
        style={{
          background: "linear-gradient(135deg, var(--color-accent, #3B82F6) 0%, #7C3AED 100%)",
          boxShadow: "0 4px 24px rgba(59,130,246,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        }}
        aria-label="See what's new on NurseFiti"
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
        </span>

        {/* Sparkle */}
        <motion.span
          animate={{ rotate: [0, 20, -15, 20, 0] }}
          transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
          className="text-base leading-none"
          aria-hidden="true"
        >
          ✨
        </motion.span>

        <span>What&apos;s New</span>
      </motion.button>
    </AnimatePresence>
  );
}
