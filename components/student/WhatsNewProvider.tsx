"use client";

/**
 * WhatsNewProvider
 *
 * Thin client wrapper that manages open/closed state for the WhatsNewModal
 * and the WhatsNewTrigger (the floating "What's New" pill).
 *
 * Drop this once into the student layout — it renders both the modal and the
 * floating trigger button so layout.tsx (a Server Component) stays clean.
 */

import { useState } from "react";
import { WhatsNewModal } from "./WhatsNewModal";
import { WhatsNewTrigger } from "./WhatsNewTrigger";

export function WhatsNewProvider() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating pill — clicking it re-opens the modal */}
      <WhatsNewTrigger onClick={() => setOpen(true)} />

      {/* The modal itself — controlled by this provider's state */}
      {open && <WhatsNewModal forceOpen onForceClose={() => setOpen(false)} />}

      {/* Auto-open on first visit — rendered separately with its own localStorage gate */}
      <WhatsNewModal />
    </>
  );
}
