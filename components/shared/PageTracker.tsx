"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track actual paths, avoid tracking static files if they somehow trigger this
    if (!pathname) return;
    
    const fullPath = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    
    // Debounce/deduplicate immediate double-fires
    if (lastTrackedPath.current === fullPath) return;
    lastTrackedPath.current = fullPath;

    // Fire and forget, don't await, don't block
    fetch('/api/activity-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: fullPath }),
    }).catch(err => {
      // Ignore network errors (e.g. adblockers)
    });
  }, [pathname, searchParams]);

  return null;
}
