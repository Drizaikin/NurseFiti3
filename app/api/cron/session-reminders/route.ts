import { NextResponse } from 'next/server';

export async function GET() {
  // Deprecated route handler. Use /api/cron/reminders instead.
  return NextResponse.json({ message: "Deprecated. Use /api/cron/reminders." }, { status: 200 });
}
