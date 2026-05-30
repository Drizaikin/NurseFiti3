/**
 * useIntaSend — client-side hook for initiating IntaSend payments.
 *
 * Usage:
 *   const { pay, isLoading } = useIntaSend();
 *   await pay({ type: 'revision_plan', amountKsh: 500 });
 *
 * The hook calls /api/intasend/initialize, then redirects the user to
 * IntaSend's hosted checkout page. On completion, IntaSend redirects back
 * to /api/intasend/verify which provisions access and redirects to the
 * appropriate success page.
 */

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface PayOptions {
  type: 'plan_subscription' | 'revision_plan' | 'session_booking';
  amountKsh: number;
  referenceId?: string;
  metadata?: Record<string, unknown>;
  /** Called just before redirect — useful for showing a loading state */
  onRedirect?: () => void;
}

export function useIntaSend() {
  const [isLoading, setIsLoading] = useState(false);

  const pay = async (options: PayOptions) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/intasend/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: options.type,
          amountKsh: options.amountKsh,
          referenceId: options.referenceId,
          metadata: options.metadata,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Payment initialization failed');
      }

      options.onRedirect?.();

      // Redirect to IntaSend hosted checkout page
      window.location.href = data.checkout_url;
    } catch (err) {
      setIsLoading(false);
      toast.error(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    }
    // Note: don't setIsLoading(false) on success — page is redirecting
  };

  return { pay, isLoading };
}
