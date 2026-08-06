"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface ResolveFlagFormProps {
  flagId: string;
  status: string;
}

export function ResolveFlagForm({ flagId, status }: ResolveFlagFormProps) {
  const router = useRouter();
  const [isResolving, setIsResolving] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleResolve = async (sendEmail: boolean) => {
    if (sendEmail && !explanation.trim()) {
      setError('Please provide an explanation to send to the student.');
      return;
    }

    try {
      setIsResolving(true);
      setError(null);

      const res = await fetch('/api/admin/flagged/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flagId,
          explanation: explanation.trim(),
          sendEmail,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to resolve flag');
      }

      setExplanation('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsResolving(false);
    }
  };

  if (isResolving) {
    return <p className="text-sm text-neutral-mid italic">{status === 'resolved' ? 'Sending email...' : 'Resolving...'}</p>;
  }

  return (
    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
      <h4 className="text-sm font-semibold text-neutral-dark mb-2">
        {status === 'resolved' ? 'Send Explanation Email' : 'Resolve Flag'}
      </h4>
      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        placeholder="Explanation to send to the student (e.g., why the rationale is correct, or what was fixed)..."
        className="w-full text-sm p-3 rounded bg-white dark:bg-neutral-dark/10 border border-[var(--color-border)] mb-3 focus:outline-none focus:border-primary resize-y min-h-[80px]"
      />
      {error && <p className="text-xs text-error mb-3">{error}</p>}
      <div className="flex gap-2 flex-wrap">
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => handleResolve(true)}
        >
          {status === 'resolved' ? 'Send Email to Student' : 'Resolve & Email Student'}
        </Button>
        {status !== 'resolved' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleResolve(false)}
          >
            Mark Resolved (No Email)
          </Button>
        )}
      </div>
    </div>
  );
}
