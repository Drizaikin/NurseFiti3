/**
 * POST /api/mock-exam/download-result
 *
 * Generates a watermarked, account-locked HTML result document for a
 * completed mock exam. The file is served inline so it can be opened in
 * the browser — it is NOT a generic downloadable file. It embeds the
 * student's name, email, and account ID as a visible watermark so any
 * shared copy is clearly traceable.
 *
 * Access rules:
 *   - Must be authenticated (valid session)
 *   - resultId must belong to the requesting student
 *   - Plan can be expired — results are always accessible to their owner
 *
 * Body: { resultId: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  resultId: z.string().uuid(),
});

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function optLabel(q: Record<string, string>, opt: string): string {
  return escHtml(q[`option_${opt.toLowerCase()}`] ?? '');
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const admin = createAdminClient();

    // 1. Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate body
    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const { resultId } = parsed.data;

    // 3. Load the result — must belong to this student
    const { data: result, error: resultErr } = await (admin as any)
      .from('mock_exam_results')
      .select('*')
      .eq('id', resultId)
      .eq('student_id', user.id)
      .single();

    if (resultErr || !result) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    // 4. Load student profile for watermark
    const { data: profile } = await (admin as any)
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single();

    const studentName = profile?.full_name ?? 'Student';
    const studentEmail = profile?.email ?? user.email ?? '';

    // 5. Load the answers for this exam session
    // Primary: use result_id link (reliable, set for all new exams)
    // Fallback: time-window match for legacy exams
    const completedAt = new Date(result.completed_at);
    // Window: from 3 hours before completion to 5 minutes AFTER
    // (answers are inserted after the result row, so completed_at < answered_at is possible)
    const windowStart = new Date(completedAt.getTime() - 3 * 60 * 60 * 1000).toISOString();
    const windowEnd   = new Date(completedAt.getTime() + 5 * 60 * 1000).toISOString();

    // Try result_id first (all new exams have this)
    let { data: answers } = await (admin as any)
      .from('student_answers')
      .select('question_id, selected_option, is_correct')
      .eq('student_id', user.id)
      .eq('result_id', resultId);

    // Fallback to time-window for legacy exams (no result_id)
    if (!answers || (answers as any[]).length === 0) {
      const { data: windowAnswers } = await (admin as any)
        .from('student_answers')
        .select('question_id, selected_option, is_correct')
        .eq('student_id', user.id)
        .eq('mode', 'mock_exam')
        .gte('answered_at', windowStart)
        .lte('answered_at', windowEnd);
      answers = windowAnswers;
    }

    // Last resort: fetch all mock_exam answers for this cadre+paper on the same calendar day.
    // This handles cases where the submission timestamp drifted significantly.
    if (!answers || (answers as any[]).length === 0) {
      const dayStart = completedAt.toISOString().split('T')[0] + 'T00:00:00.000Z';
      const dayEnd   = completedAt.toISOString().split('T')[0] + 'T23:59:59.999Z';
      const { data: dayAnswers } = await (admin as any)
        .from('student_answers')
        .select('question_id, selected_option, is_correct')
        .eq('student_id', user.id)
        .eq('mode', 'mock_exam')
        .gte('answered_at', dayStart)
        .lte('answered_at', dayEnd);
      answers = dayAnswers;
    }

    const answerMap = new Map<string, { selected: string; correct: boolean }>();
    for (const a of (answers ?? []) as Array<{ question_id: string; selected_option: string; is_correct: boolean }>) {
      answerMap.set(a.question_id, { selected: a.selected_option, correct: a.is_correct });
    }

    // 6. Load the question details
    const questionIds = Array.from(answerMap.keys());
    let questionRows: Array<Record<string, string>> = [];

    if (questionIds.length > 0) {
      const { data: qs } = await (admin as any)
        .from('questions')
        .select('id, stem, option_a, option_b, option_c, option_d, correct_option, rationale, unit, topic')
        .in('id', questionIds);
      questionRows = (qs ?? []) as Array<Record<string, string>>;
    }

    // 7. Build the HTML document
    const score = result.score_percentage ?? 0;
    const passed = result.passed;
    const examDate = new Date(result.completed_at).toLocaleDateString('en-KE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const examTime = new Date(result.completed_at).toLocaleTimeString('en-KE', {
      hour: '2-digit', minute: '2-digit',
    });
    const downloadedAt = new Date().toLocaleString('en-KE');
    const watermarkText = `${studentName} · ${studentEmail} · ID: ${user.id.slice(0, 8).toUpperCase()}`;

    const questionHtml = questionRows.map((q, i) => {
      const ans = answerMap.get(q.id);
      const isCorrect = ans?.correct ?? false;
      const selected = ans?.selected ?? '—';
      const correct = q.correct_option;

      const options = ['A', 'B', 'C', 'D'].map(opt => {
        const isSelected = selected === opt;
        const isCorrectOpt = correct === opt;
        const cls = isCorrectOpt
          ? 'correct'
          : isSelected && !isCorrectOpt
          ? 'wrong'
          : '';
        return `<div class="option ${cls}">
          <span class="opt-letter">${opt}</span>
          <span>${optLabel(q, opt)}</span>
          ${isCorrectOpt ? '<span class="opt-mark">✓ Correct</span>' : ''}
          ${isSelected && !isCorrectOpt ? '<span class="opt-mark wrong-mark">✗ Your answer</span>' : ''}
        </div>`;
      }).join('');

      return `<div class="question ${isCorrect ? 'q-correct' : 'q-wrong'}">
        <div class="q-header">
          <span class="q-num">${i + 1}</span>
          <span class="q-unit">${escHtml(q.unit ?? '')} · ${escHtml(q.topic ?? '')}</span>
          <span class="q-badge ${isCorrect ? 'badge-pass' : 'badge-fail'}">${isCorrect ? '✓ Correct' : '✗ Wrong'}</span>
        </div>
        <p class="q-stem">${escHtml(q.stem ?? '')}</p>
        <div class="options">${options}</div>
        <div class="rationale">
          <span class="rationale-label">Explanation</span>
          <p>${escHtml(q.rationale ?? '')}</p>
        </div>
      </div>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NurseFiti Mock Exam Results — ${escHtml(studentName)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f5f9f8;
    color: #1a2e2d;
    font-size: 14px;
    line-height: 1.6;
  }

  /* ── Watermark ────────────────────────────────────────────────── */
  body::before {
    content: "${watermarkText.replace(/"/g, "'")} · Personal Copy — Do Not Share";
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 14px;
    font-weight: 700;
    color: rgba(8, 81, 79, 0.07);
    white-space: nowrap;
    pointer-events: none;
    z-index: 9999;
    letter-spacing: 1px;
    width: 200%;
    text-align: center;
  }

  /* ── Layout ───────────────────────────────────────────────────── */
  .container { max-width: 900px; margin: 0 auto; padding: 24px 16px 48px; }

  /* ── Header ───────────────────────────────────────────────────── */
  .header {
    background: linear-gradient(135deg, #08514F 0%, #0A6865 100%);
    color: white;
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .header-logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
  .header-logo span { color: #F5A623; }
  .header-title { font-size: 14px; opacity: 0.8; margin-top: 2px; }
  .score-circle {
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 5px solid rgba(255,255,255,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .score-pct { font-size: 28px; font-weight: 900; line-height: 1; }
  .score-label { font-size: 11px; opacity: 0.8; }

  /* ── Meta grid ────────────────────────────────────────────────── */
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
  }
  .meta-card {
    background: white;
    border: 1px solid #d6e7e4;
    border-radius: 10px;
    padding: 12px 14px;
    text-align: center;
  }
  .meta-value { font-size: 22px; font-weight: 800; color: #08514F; }
  .meta-lbl { font-size: 11px; color: #6b8f8e; margin-top: 2px; }
  .pass-badge {
    display: inline-block;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    background: ${passed ? '#d1fae5' : '#fee2e2'};
    color: ${passed ? '#065f46' : '#991b1b'};
  }

  /* ── Watermark notice ─────────────────────────────────────────── */
  .notice {
    background: #fff8e1;
    border: 1px solid #f5a623;
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 12px;
    color: #6b4c00;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Section title ────────────────────────────────────────────── */
  .section-title {
    font-size: 17px;
    font-weight: 800;
    color: #08514F;
    margin: 24px 0 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #e8f5f4;
  }

  /* ── Questions ────────────────────────────────────────────────── */
  .question {
    background: white;
    border-radius: 12px;
    border-left: 4px solid #e5e7eb;
    padding: 16px;
    margin-bottom: 14px;
    border: 1px solid #e0eae9;
  }
  .q-correct { border-left-color: #10b981; }
  .q-wrong   { border-left-color: #ef4444; }
  .q-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .q-num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: #08514F;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .q-unit { font-size: 11px; color: #6b8f8e; flex: 1; }
  .q-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 12px;
  }
  .badge-pass { background: #d1fae5; color: #065f46; }
  .badge-fail { background: #fee2e2; color: #991b1b; }
  .q-stem { font-size: 14px; font-weight: 600; margin-bottom: 10px; line-height: 1.5; }
  .options { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
  .option {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    background: #f9fffe;
    border: 1px solid #e0eae9;
  }
  .option.correct { background: #d1fae5; border-color: #6ee7b7; color: #065f46; }
  .option.wrong   { background: #fee2e2; border-color: #fca5a5; color: #991b1b; }
  .opt-letter {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #e8f5f4;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    flex-shrink: 0;
  }
  .option.correct .opt-letter { background: #6ee7b7; color: #065f46; }
  .option.wrong   .opt-letter { background: #fca5a5; color: #991b1b; }
  .opt-mark { margin-left: auto; font-size: 11px; font-weight: 700; white-space: nowrap; }
  .wrong-mark { color: #991b1b; }
  .rationale {
    background: #f0fdf9;
    border: 1px solid #a7f3d0;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 12px;
    color: #065f46;
  }
  .rationale-label {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #065f46;
    margin-bottom: 4px;
  }

  /* ── Footer ───────────────────────────────────────────────────── */
  .footer {
    text-align: center;
    font-size: 11px;
    color: #9ca3af;
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid #e0eae9;
  }

  /* ── Print ────────────────────────────────────────────────────── */
  @media print {
    body::before { font-size: 12px; }
    .no-print { display: none; }
    .question { break-inside: avoid; }
    .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="container">

  <!-- Header -->
  <div class="header">
    <div>
      <div class="header-logo">Nurse<span>Fiti</span></div>
      <div class="header-title">NCK EXAM PREPARATION</div>
      <div style="margin-top:12px">
        <p style="font-size:18px;font-weight:800;">${escHtml(studentName)}</p>
        <p style="font-size:12px;opacity:0.75;margin-top:2px">${escHtml(studentEmail)}</p>
        <p style="font-size:12px;opacity:0.75;margin-top:4px">${escHtml(result.cadre)} — ${escHtml(result.paper)}</p>
        <p style="font-size:11px;opacity:0.65;margin-top:4px">${examDate} at ${examTime}</p>
      </div>
    </div>
    <div style="text-align:center">
      <div class="score-circle">
        <span class="score-pct">${Math.round(score)}%</span>
        <span class="score-label">${passed ? 'PASS' : 'FAIL'}</span>
      </div>
      <div style="margin-top:8px">
        <span class="pass-badge">${passed ? '🎉 Passed' : '📚 Not yet'}</span>
      </div>
    </div>
  </div>

  <!-- Meta -->
  <div class="meta-grid">
    <div class="meta-card"><div class="meta-value">${result.correct_answers}</div><div class="meta-lbl">Correct</div></div>
    <div class="meta-card"><div class="meta-value">${result.total_questions - result.correct_answers}</div><div class="meta-lbl">Wrong</div></div>
    <div class="meta-card"><div class="meta-value">${result.total_questions}</div><div class="meta-lbl">Total Questions</div></div>
    <div class="meta-card"><div class="meta-value">${result.time_used_minutes} min</div><div class="meta-lbl">Time Used</div></div>
    <div class="meta-card"><div class="meta-value">${Math.round(score)}%</div><div class="meta-lbl">Score (50% to pass)</div></div>
  </div>

  <!-- Notice -->
  <div class="notice">
    🔒 <strong>Personal copy — do not share.</strong>
    This document is generated for <strong>${escHtml(studentName)}</strong> (${escHtml(studentEmail)}) only.
    Shared copies are traceable to this account. Downloaded: ${downloadedAt}
  </div>

  <!-- Question Review -->
  <h2 class="section-title">📋 Full Question Review with Explanations</h2>
  ${questionHtml || '<p style="color:#6b8f8e;font-size:13px;">Question details not available for this exam session.</p>'}

  <!-- Footer -->
  <div class="footer">
    <p>NurseFiti · nursefiti.co.ke · NCK Exam Preparation</p>
    <p style="margin-top:4px">This document was generated for ${escHtml(studentName)} · ${escHtml(studentEmail)} · Account: ${user.id.slice(0, 8).toUpperCase()}</p>
    <p style="margin-top:4px">Downloaded: ${downloadedAt} · Personal copy — do not share or redistribute</p>
  </div>
</div>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Prevent caching and discourage hotlinking
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': `attachment; filename="nursefiti-exam-${result.paper.replace(/\s+/g, '-')}-${new Date(result.completed_at).toISOString().split('T')[0]}.html"`,
      },
    });
  } catch (err) {
    console.error('[mock-exam/download-result]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
