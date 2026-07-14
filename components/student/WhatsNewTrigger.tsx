"use client";

/**
 * WhatsNewTrigger — floating "What's New" pill that re-opens the modal.
 *
 * Positioning:
 * - Mobile  : top-right corner (below topbar), clear of the bottom-right hamburger
 * - Desktop : bottom-left, clear of any fixed elements
 *
 * Visibility: shown only while the current version hasn't been dismissed.
 * Version must match CURRENT_VERSION in WhatsNewModal.tsx.
 */

import { useEffect, useState } from "react";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";

// ⚠️  Keep this in sync with CURRENT_VERSION in WhatsNewModal.tsx
const CURRENT_VERSION = 12;
const STORAGE_KEY = `whats_new_seen_v${CURRENT_VERSION}`;

interface Props {
  onClick: () => void;
}

export function WhatsNewTrigger({ onClick }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch { /* localStorage blocked — don't show */ }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="whats-new-trigger"
          initial={{ opacity: 0, scale: 0.8, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 18, stiffness: 260 }}
          onClick={onClick}
          aria-label="See what's new on NurseFiti"
          className={[
            // Base pill styles
            "fixed z-[70] flex items-center gap-2 px-4 py-2.5 rounded-full",
            "text-sm font-bold text-white cursor-pointer select-none",
            "shadow-xl active:scale-95 transition-transform duration-150",
            // Mobile (default): top-right, below topbar (h-16 = 4rem) + small gap
            // Uses env(safe-area-inset-*) for notched/island iPhones
            "top-[calc(4rem+0.75rem)] right-4",
            // Desktop: bottom-left, away from any bottom-right FABs
            "lg:top-auto lg:bottom-8 lg:right-auto lg:left-72",
          ].join(" ")}
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent,#3B82F6) 0%, #7C3AED 100%)",
            boxShadow:
              "0 4px 24px rgba(59,130,246,0.45), 0 2px 8px rgba(0,0,0,0.3)",
            // Honour iOS safe-area on the side the pill sits
            marginRight: "env(safe-area-inset-right,0px)",
            marginLeft: "env(safe-area-inset-left,0px)",
          }}
        >
          {/* Pulsing dot */}
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0" aria-hidden="true">
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
      )}
    </AnimatePresence>
  );
}
