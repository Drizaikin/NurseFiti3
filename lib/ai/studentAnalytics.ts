/**
 * Analyzes a student's practice answers, mock exams, and questions failed
 * to provide the AI Tutor with complete contextual awareness of the student's mastery patterns.
 */

export interface FailedQuestionDetail {
  id: string;
  unit: string;
  topic: string;
  stem: string;
  studentOption: string;
  correctOption: string;
  studentAnswerText?: string;
  correctAnswerText?: string;
  rationale: string;
  answeredAt: string;
}

export interface UnitPerformance {
  unit: string;
  total: number;
  correct: number;
  accuracy: number;
  failedCount: number;
  topics: Array<{
    topic: string;
    total: number;
    correct: number;
    accuracy: number;
  }>;
}

export interface StudentPerformanceProfile {
  hasData: boolean;
  totalAnswered: number;
  totalCorrect: number;
  overallAccuracy: number;
  weakUnits: UnitPerformance[];
  strongUnits: UnitPerformance[];
  allUnits: UnitPerformance[];
  recentFailedQuestions: FailedQuestionDetail[];
  mockSummary: Array<{
    paper: string;
    score: number;
    passed: boolean;
    date: string;
  }>;
  formattedSummary: string;
}

export async function getStudentPerformanceProfile(
  adminClient: any,
  userId: string
): Promise<StudentPerformanceProfile> {
  try {
    const [answersRes, mocksRes, profileRes] = await Promise.all([
      // Fetch recent 300 answers with full question context
      adminClient
        .from('student_answers')
        .select(`
          id,
          question_id,
          selected_option,
          is_correct,
          time_taken_seconds,
          answered_at,
          questions:question_id (
            id,
            unit,
            topic,
            stem,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            rationale
          )
        `)
        .eq('student_id', userId)
        .order('answered_at', { ascending: false })
        .limit(300),

      // Fetch recent mock exams
      adminClient
        .from('mock_exam_results')
        .select('paper, total_questions, correct_answers, score_percentage, passed, created_at')
        .eq('student_id', userId)
        .order('created_at', { ascending: false })
        .limit(5),

      // Fetch student profile details (cadre, exam date)
      adminClient
        .from('student_profiles')
        .select('cadre, exam_date, exam_cycle, streak_count, xp')
        .eq('id', userId)
        .maybeSingle(),
    ]);

    const answers = (answersRes?.data ?? []) as any[];
    const mocks = (mocksRes?.data ?? []) as any[];
    const profile = profileRes?.data ?? {};

    if (!answers || answers.length === 0) {
      return {
        hasData: false,
        totalAnswered: 0,
        totalCorrect: 0,
        overallAccuracy: 0,
        weakUnits: [],
        strongUnits: [],
        allUnits: [],
        recentFailedQuestions: [],
        mockSummary: [],
        formattedSummary: `The student has not completed any practice questions or mock exams yet on NurseFiti. Encourage them to practice and take topic quizzes so you can identify their learning patterns.`,
      };
    }

    const totalAnswered = answers.length;
    const totalCorrect = answers.filter((a) => a.is_correct).length;
    const overallAccuracy = Math.round((totalCorrect / totalAnswered) * 100);

    // Group by unit & topic
    const unitMap = new Map<
      string,
      {
        total: number;
        correct: number;
        topics: Map<string, { total: number; correct: number }>;
      }
    >();

    const failedQuestions: FailedQuestionDetail[] = [];
    const seenFailedQuestionIds = new Set<string>();

    for (const ans of answers) {
      const q = ans.questions;
      if (!q) continue;

      const unit = q.unit || 'General Nursing';
      const topic = q.topic || 'General';

      let uData = unitMap.get(unit);
      if (!uData) {
        uData = { total: 0, correct: 0, topics: new Map() };
        unitMap.set(unit, uData);
      }
      uData.total++;
      if (ans.is_correct) uData.correct++;

      let tData = uData.topics.get(topic);
      if (!tData) {
        tData = { total: 0, correct: 0 };
        uData.topics.set(topic, tData);
      }
      tData.total++;
      if (ans.is_correct) tData.correct++;

      // Track failed questions (up to 12 most recent unique failed questions)
      if (!ans.is_correct && !seenFailedQuestionIds.has(q.id) && failedQuestions.length < 12) {
        seenFailedQuestionIds.add(q.id);

        const getOptionText = (optKey: string) => {
          switch (optKey?.toUpperCase()) {
            case 'A': return q.option_a;
            case 'B': return q.option_b;
            case 'C': return q.option_c;
            case 'D': return q.option_d;
            default: return '';
          }
        };

        failedQuestions.push({
          id: q.id,
          unit,
          topic,
          stem: q.stem,
          studentOption: ans.selected_option,
          studentAnswerText: getOptionText(ans.selected_option),
          correctOption: q.correct_option,
          correctAnswerText: getOptionText(q.correct_option),
          rationale: q.rationale,
          answeredAt: ans.answered_at,
        });
      }
    }

    const allUnits: UnitPerformance[] = Array.from(unitMap.entries())
      .map(([unit, data]) => {
        const accuracy = Math.round((data.correct / data.total) * 100);
        const topics = Array.from(data.topics.entries()).map(([topic, td]) => ({
          topic,
          total: td.total,
          correct: td.correct,
          accuracy: Math.round((td.correct / td.total) * 100),
        })).sort((a, b) => a.accuracy - b.accuracy); // lowest accuracy topics first

        return {
          unit,
          total: data.total,
          correct: data.correct,
          accuracy,
          failedCount: data.total - data.correct,
          topics,
        };
      })
      .sort((a, b) => a.accuracy - b.accuracy); // weakest units first

    const weakUnits = allUnits.filter((u) => u.accuracy < 60 || u.failedCount >= 3);
    const strongUnits = allUnits.filter((u) => u.accuracy >= 70 && u.total >= 4);

    const mockSummary = mocks.map((m: any) => ({
      paper: m.paper || 'Mock Exam',
      score: Number(m.score_percentage ?? 0),
      passed: Boolean(m.passed),
      date: m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Recent',
    }));

    // Build the formatted prompt block
    const lines: string[] = [];
    lines.push(`- Cadre: ${profile.cadre || 'Nursing Student'} | Target Exam Cycle: ${profile.exam_cycle || 'Upcoming'}`);
    lines.push(`- Overall Practice Accuracy: ${overallAccuracy}% (${totalCorrect}/${totalAnswered} questions correct)`);

    if (mockSummary.length > 0) {
      lines.push(`- Mock Exam Track Record:`);
      for (const m of mockSummary) {
        lines.push(`  * ${m.paper}: ${m.score}% (${m.passed ? 'PASSED' : 'FAILED'}) on ${m.date}`);
      }
    }

    if (weakUnits.length > 0) {
      lines.push(`\n- WEAK UNITS & TOPICS (Identified Pattern of Struggle):`);
      for (const u of weakUnits.slice(0, 5)) {
        const weakTopics = u.topics
          .filter((t) => t.accuracy < 60)
          .map((t) => `"${t.topic}" (${t.accuracy}% acc, ${t.correct}/${t.total})`)
          .join(', ');
        lines.push(`  * ${u.unit}: ${u.accuracy}% overall accuracy (${u.failedCount} mistakes out of ${u.total} questions).${weakTopics ? ` Struggling specifically with: ${weakTopics}.` : ''}`);
      }
    }

    if (strongUnits.length > 0) {
      lines.push(`\n- STRONG UNITS (High Mastery):`);
      for (const u of strongUnits.slice(0, 4)) {
        lines.push(`  * ${u.unit}: ${u.accuracy}% accuracy (${u.correct}/${u.total} correct).`);
      }
    }

    if (failedQuestions.length > 0) {
      lines.push(`\n- SPECIFIC RECENT QUESTIONS THE STUDENT FAILED (Use these to diagnose misconceptions, explain their errors, or drill them):`);
      failedQuestions.slice(0, 8).forEach((q, idx) => {
        lines.push(`  ${idx + 1}. [${q.unit} -> ${q.topic}]`);
        lines.push(`     Question: "${q.stem}"`);
        lines.push(`     Student's Choice: Option ${q.studentOption}${q.studentAnswerText ? ` ("${q.studentAnswerText}")` : ''} ❌ INCORRECT`);
        lines.push(`     Correct Answer: Option ${q.correctOption}${q.correctAnswerText ? ` ("${q.correctAnswerText}")` : ''} ✅`);
        lines.push(`     Clinical Rationale: ${q.rationale}`);
      });
    }

    return {
      hasData: true,
      totalAnswered,
      totalCorrect,
      overallAccuracy,
      weakUnits,
      strongUnits,
      allUnits,
      recentFailedQuestions: failedQuestions,
      mockSummary,
      formattedSummary: lines.join('\n'),
    };
  } catch (err: any) {
    console.error('[studentAnalytics] Error computing performance profile:', err);
    return {
      hasData: false,
      totalAnswered: 0,
      totalCorrect: 0,
      overallAccuracy: 0,
      weakUnits: [],
      strongUnits: [],
      allUnits: [],
      recentFailedQuestions: [],
      mockSummary: [],
      formattedSummary: `Performance data could not be retrieved at this time. Respond based on the student's current question.`,
    };
  }
}
