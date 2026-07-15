import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';
import { getLimits, PlanTier } from '@/lib/planLimits';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  mode: z.enum(['all', 'new']),
});

function escHtml(s: string): string {
  return (s ?? '')
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
    const { mode } = parsed.data;

    // 3. Load profile & plan
    const { data: profile } = await (admin as any)
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .single();
      
    const { data: studentProfile } = await (admin as any)
      .from('student_profiles')
      .select('effective_tier')
      .eq('id', user.id)
      .single();

    const studentName = profile?.full_name ?? 'Student';
    const studentEmail = profile?.email ?? user.email ?? '';
    const tier = (studentProfile?.effective_tier ?? 'free') as PlanTier;
    
    // Check plan limits
    const limits = getLimits(tier);
    if (!limits.wrongQuestionsDownload) {
       return NextResponse.json({ error: 'Feature not available on your current plan' }, { status: 403 });
    }

    // 4. Load ALL wrong practice answers for this student
    const { data: allAnswers } = await (admin as any)
      .from('student_answers')
      .select('question_id, selected_option')
      .eq('student_id', user.id)
      .eq('mode', 'practice')
      .eq('is_correct', false);

    if (!allAnswers || (allAnswers as any[]).length === 0) {
      return NextResponse.json({ error: 'No incorrectly answered practice questions found.' }, { status: 404 });
    }

    // Deduplicate questions (keep most recent selected_option if needed, but here we just need the IDs)
    const wrongQuestionMap = new Map<string, string>();
    for (const a of allAnswers as any[]) {
      wrongQuestionMap.set(a.question_id, a.selected_option);
    }
    
    let targetQuestionIds = Array.from(wrongQuestionMap.keys());

    // 5. If 'new', filter out already downloaded questions
    if (mode === 'new') {
      const { data: downloaded } = await (admin as any)
        .from('downloaded_wrong_questions')
        .select('question_id')
        .eq('student_id', user.id);
        
      const downloadedSet = new Set((downloaded as any[] || []).map(d => d.question_id));
      targetQuestionIds = targetQuestionIds.filter(id => !downloadedSet.has(id));
      
      if (targetQuestionIds.length === 0) {
        return NextResponse.json({ error: 'You have already downloaded all your wrong questions. Switch to "All" to download them again.' }, { status: 404 });
      }
    }

    // 6. Load question details
    const { data: qs } = await (admin as any)
      .from('questions')
      .select('id, stem, option_a, option_b, option_c, option_d, correct_option, rationale, unit, topic')
      .in('id', targetQuestionIds);
      
    const questionRows = (qs ?? []) as Array<Record<string, string>>;
    
    if (questionRows.length === 0) {
      return NextResponse.json({ error: 'Questions not found' }, { status: 404 });
    }

    // 7. Mark as downloaded
    const inserts = targetQuestionIds.map(qid => ({
      student_id: user.id,
      question_id: qid
    }));
    
    // We use upsert so we don't error out on conflict (if mode='all' and some were already downloaded)
    await (admin as any)
      .from('downloaded_wrong_questions')
      .upsert(inserts, { onConflict: 'student_id, question_id' });

    // 8. Build the HTML document
    const downloadedAt = new Date().toLocaleString('en-KE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    const watermarkText = `${studentName} · ${studentEmail} · ID: ${user.id.slice(0, 8).toUpperCase()}`;

    const questionHtml = questionRows.map((q, i) => {
      const selected = wrongQuestionMap.get(q.id) ?? '—';
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

      return `<div class="question q-wrong">
        <div class="q-header">
          <span class="q-num">${i + 1}</span>
          <span class="q-unit">${escHtml(q.unit ?? '')} · ${escHtml(q.topic ?? '')}</span>
          <span class="q-badge badge-fail">✗ Incorrect Practice Answer</span>
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
<title>NurseFiti Practice Review — ${escHtml(studentName)}</title>
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
  
  .student-card {
    background: white;
    padding: 16px 20px;
    border-radius: 12px;
    margin-bottom: 32px;
    border: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .s-name { font-weight: 700; font-size: 16px; color: #08514F; }
  .s-meta { font-size: 13px; color: #64748b; margin-top: 2px; }
  .s-date { text-align: right; font-size: 13px; color: #64748b; }
  .s-date strong { color: #1e293b; display: block; font-size: 14px; }

  /* ── Questions ────────────────────────────────────────────────── */
  .question {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    page-break-inside: avoid;
  }
  .q-wrong { border-left: 4px solid #ef4444; }

  .q-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .q-num {
    background: #f1f5f9; color: #475569;
    font-weight: 700; font-size: 13px;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 6px;
  }
  .q-unit { color: #64748b; font-size: 13px; font-weight: 500; flex: 1; }
  .q-badge {
    font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px;
  }
  .badge-fail { background: #fee2e2; color: #b91c1c; }

  .q-stem { font-size: 15px; font-weight: 500; margin-bottom: 20px; color: #1e293b; }

  /* ── Options ──────────────────────────────────────────────────── */
  .options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .option {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }
  .option.correct {
    background: #ecfdf5; border-color: #a7f3d0;
  }
  .option.wrong {
    background: #fef2f2; border-color: #fecaca;
  }
  .opt-letter {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    background: white; border: 1px solid #cbd5e1; border-radius: 4px;
    font-size: 12px; font-weight: 700; color: #64748b;
  }
  .option.correct .opt-letter { border-color: #10b981; color: #10b981; }
  .option.wrong .opt-letter { border-color: #ef4444; color: #ef4444; }
  .opt-mark { margin-left: auto; font-size: 12px; font-weight: 600; color: #10b981; }
  .wrong-mark { color: #ef4444; }

  /* ── Rationale ────────────────────────────────────────────────── */
  .rationale {
    background: #f0fdfa;
    border: 1px solid #ccfbf1;
    padding: 16px;
    border-radius: 8px;
  }
  .rationale-label {
    display: block; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.5px;
    color: #0f766e; margin-bottom: 6px;
  }
  .rationale p { color: #115e59; font-size: 14px; }

  /* ── Print Styles ─────────────────────────────────────────────── */
  @media print {
    body { background: white; }
    .container { padding: 0; max-width: 100%; }
    .header { border-radius: 0; padding: 20px; }
    .question { box-shadow: none; border-color: #cbd5e1; }
    .option { break-inside: avoid; }
    .rationale { break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="container">
  
  <div class="header">
    <div>
      <div class="header-logo">NurseFiti<span>.</span></div>
      <div class="header-title">Practice Review: Incorrectly Answered Questions</div>
    </div>
  </div>

  <div class="student-card">
    <div>
      <div class="s-name">${escHtml(studentName)}</div>
      <div class="s-meta">${escHtml(studentEmail)} · ID: ${user.id.slice(0, 8).toUpperCase()}</div>
    </div>
    <div class="s-date">
      Downloaded On
      <strong>${downloadedAt}</strong>
    </div>
  </div>

  ${questionHtml}

</div>

<!-- Auto-trigger print dialog to prompt PDF save -->
<script>
  window.onload = function() {
    setTimeout(function() {
      window.print();
    }, 500);
  };
</script>

</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error: any) {
    console.error('Error generating practice review:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
