/**
 * POST /api/admin/set-exam-date
 *
 * Admin-only endpoint to update a student's target exam date and cycle.
 *
 * Body:
 *   studentId  — UUID of the student
 *   examDate   — ISO date string (YYYY-MM-DD) — must be in the future
 *   examCycle  — 'May' | 'August' | 'November'
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/requireAdmin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  examDate:  z.string()
    .min(1, 'Exam date is required')
    .refine(val => !isNaN(Date.parse(val)), 'Invalid exam date format')
    .refine(val => new Date(val).getTime() > Date.now(), 'Exam date must be in the future'),
  examCycle: z.enum(['May', 'August', 'November'], {
    errorMap: () => ({ message: 'Exam cycle must be May, August, or November' }),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const access = await requireAdmin();
    if ('response' in access) return access.response;
    const { admin } = access;

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = bodySchema.safeParse(rawBody);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? 'Invalid request';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { studentId, examDate, examCycle } = parsed.data;

    // Confirm the student profile exists
    const { data: student, error: fetchError } = await admin
      .from('student_profiles')
      .select('id')
      .eq('id', studentId)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    // Update exam_date and exam_cycle
    const { error: updateError } = await admin
      .from('student_profiles')
      .update({ exam_date: examDate, exam_cycle: examCycle })
      .eq('id', studentId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/set-exam-date]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
