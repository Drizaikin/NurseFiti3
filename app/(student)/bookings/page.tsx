"use client";

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function BookingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-6">
        My Bookings
      </h1>
      <Card className="text-center py-12">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Session Bookings
        </h2>
        <p className="text-neutral-mid mb-6 max-w-md mx-auto">
          View your upcoming and past tutoring sessions, join live sessions, and leave reviews for your tutors.
        </p>
        <p className="text-sm text-neutral-light mb-6">
          Coming soon in Phase 4
        </p>
        <Link href="/tutors">
          <Button variant="primary">
            Find a Tutor
          </Button>
        </Link>
      </Card>
    </div>
  );
}
