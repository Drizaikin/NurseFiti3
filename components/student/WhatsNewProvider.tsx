"use client";

/**
 * WhatsNewProvider
 *
 * Thin client wrapper that manages open/closed state for the WhatsNewModal
 * and the WhatsNewTrigger (the floating "What's New" pill).
 *
 * Drop this once into the student layout — it renders both the modal and the
 * floating trigger button so layout.tsx (a Server Component) stays clean.
 *
 * Logic:
 * - On mount, the modal auto-opens if the user hasn't seen the current version
 *   (checked via localStorage inside WhatsNewModal).
 * - The floating trigger pill lets the user re-open the modal manually.
 * - Only one WhatsNewModal instance is ever rendered at a time.
 */

import { useState } from "react";
import { WhatsNewModal } from "./WhatsNewModal";
import { WhatsNewTrigger } from "./WhatsNewTrigger";

export function WhatsNewProvider() {
  // forceOpen = true when the user clicks the floating trigger pill
  const [forceOpen, setForceOpen] = useState(false);

  return (
    <>
      {/* Floating pill — clicking it re-opens the modal */}
      <WhatsNewTrigger onClick={() => setForceOpen(true)} />

      {/*
        Single modal instance.
        - When forceOpen=false: auto-shows on first visit (localStorage gate inside modal).
        - When forceOpen=true:  shows unconditionally (user manually re-opened).
        onForceClose resets forceOpen so the modal returns to its auto-show-only behaviour.
      */}
      <WhatsNewModal
        forceOpen={forceOpen}
        onForceClose={() => setForceOpen(false)}
      />
    </>
  );
}
