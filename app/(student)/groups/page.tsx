"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function GroupsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        Study Groups
      </h1>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Study Groups
        </h2>
        <p className="text-neutral-mid mb-6 max-w-md mx-auto">
          Join or create study groups with fellow nursing students preparing for the same exam cycle.
        </p>
        <p className="text-sm text-neutral-light mb-6">
          Coming soon in Phase 2
        </p>
        <Link href="/dashboard">
          <Button variant="primary">
            Back to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
}
