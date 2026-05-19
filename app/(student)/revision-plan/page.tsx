"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RevisionPlanPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        Revision Plan Generator
      </h1>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          AI-Powered Revision Plan
        </h2>
        <p className="text-neutral-mid mb-6 max-w-md mx-auto">
          Get a personalized study schedule tailored to your exam date, available time, and weak areas. Only KSh 500!
        </p>
        <p className="text-sm text-neutral-light mb-6">
          Coming soon in Phase 5
        </p>
        <Link href="/practice">
          <Button variant="primary">
            Practice Questions Instead
          </Button>
        </Link>
      </Card>
    </div>
  );
}
