import { describe, it, expect, vi } from 'vitest';
import { getStudentPerformanceProfile } from './studentAnalytics';

describe('studentAnalytics', () => {
  it('handles student with no answers gracefully', async () => {
    const mockAdmin = {
      from: vi.fn((table: string) => {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue({ data: [] }),
          maybeSingle: vi.fn().mockResolvedValue({ data: null }),
        };
      }),
    };

    const profile = await getStudentPerformanceProfile(mockAdmin, 'user-1');
    expect(profile.hasData).toBe(false);
    expect(profile.totalAnswered).toBe(0);
    expect(profile.formattedSummary).toContain('not completed any practice questions');
  });

  it('aggregates unit mastery, identifies weak/strong units, and captures failed questions with rationales', async () => {
    const mockAnswers = [
      {
        id: 'ans-1',
        is_correct: false,
        selected_option: 'A',
        time_taken_seconds: 30,
        answered_at: new Date().toISOString(),
        questions: {
          id: 'q-1',
          unit: 'Pharmacology',
          topic: 'Cardiac Drugs',
          stem: 'What is the antidote for digoxin toxicity?',
          option_a: 'Naloxone',
          option_b: 'Digoxin Immune Fab (DigiFab)',
          option_c: 'Atropine',
          option_d: 'Protamine sulfate',
          correct_option: 'B',
          rationale: 'DigiFab is the specific antidote for severe digitalis toxicity.',
        },
      },
      {
        id: 'ans-2',
        is_correct: false,
        selected_option: 'C',
        time_taken_seconds: 45,
        answered_at: new Date().toISOString(),
        questions: {
          id: 'q-2',
          unit: 'Pharmacology',
          topic: 'Cardiac Drugs',
          stem: 'Which electrolyte disturbance potentiates digoxin toxicity?',
          option_a: 'Hypernatremia',
          option_b: 'Hyperkalemia',
          option_c: 'Hypomagnesemia alone',
          option_d: 'Hypokalemia',
          correct_option: 'D',
          rationale: 'Hypokalemia significantly increases the risk of digitalis toxicity.',
        },
      },
      {
        id: 'ans-3',
        is_correct: true,
        selected_option: 'A',
        time_taken_seconds: 20,
        answered_at: new Date().toISOString(),
        questions: {
          id: 'q-3',
          unit: 'Fundamentals of Nursing',
          topic: 'Infection Control',
          stem: 'What is the most effective method to prevent healthcare-associated infections?',
          option_a: 'Hand hygiene',
          option_b: 'Wearing gloves',
          option_c: 'Sterilization of all items',
          option_d: 'Prophylactic antibiotics',
          correct_option: 'A',
          rationale: 'Hand hygiene remains the cornerstone of infection prevention.',
        },
      },
      {
        id: 'ans-4',
        is_correct: true,
        selected_option: 'B',
        time_taken_seconds: 15,
        answered_at: new Date().toISOString(),
        questions: {
          id: 'q-4',
          unit: 'Fundamentals of Nursing',
          topic: 'Vital Signs',
          stem: 'Normal adult resting heart rate range is:',
          option_a: '40-60 bpm',
          option_b: '60-100 bpm',
          option_c: '100-140 bpm',
          option_d: '50-80 bpm',
          correct_option: 'B',
          rationale: '60-100 bpm is the accepted normal resting heart rate for adults.',
        },
      },
    ];

    const mockAdmin = {
      from: vi.fn((table: string) => {
        if (table === 'student_answers') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue({ data: mockAnswers }),
          };
        }
        if (table === 'mock_exam_results') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            limit: vi.fn().mockResolvedValue({
              data: [
                { paper: 'Paper 1 (General)', score_percentage: 54, passed: true, created_at: '2026-09-01T10:00:00Z' },
              ],
            }),
          };
        }
        if (table === 'student_profiles') {
          return {
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            maybeSingle: vi.fn().mockResolvedValue({
              data: { cadre: 'KRCHN', exam_cycle: 'November', exam_date: '2026-11-20' },
            }),
          };
        }
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue({ data: [] }),
        };
      }),
    };

    const profile = await getStudentPerformanceProfile(mockAdmin, 'student-123');

    expect(profile.hasData).toBe(true);
    expect(profile.totalAnswered).toBe(4);
    expect(profile.totalCorrect).toBe(2);
    expect(profile.overallAccuracy).toBe(50);

    // Weak unit identified
    expect(profile.weakUnits.some((u) => u.unit === 'Pharmacology')).toBe(true);
    const pharm = profile.weakUnits.find((u) => u.unit === 'Pharmacology');
    expect(pharm?.accuracy).toBe(0);
    expect(pharm?.failedCount).toBe(2);

    // Failed questions captured
    expect(profile.recentFailedQuestions.length).toBe(2);
    expect(profile.recentFailedQuestions[0].stem).toContain('antidote for digoxin');
    expect(profile.recentFailedQuestions[0].studentOption).toBe('A');
    expect(profile.recentFailedQuestions[0].studentAnswerText).toBe('Naloxone');
    expect(profile.recentFailedQuestions[0].correctOption).toBe('B');
    expect(profile.recentFailedQuestions[0].correctAnswerText).toBe('Digoxin Immune Fab (DigiFab)');
    expect(profile.recentFailedQuestions[0].rationale).toContain('DigiFab is the specific antidote');

    // Formatted summary contains key diagnostic indicators
    expect(profile.formattedSummary).toContain('Overall Practice Accuracy: 50%');
    expect(profile.formattedSummary).toContain('WEAK UNITS & TOPICS');
    expect(profile.formattedSummary).toContain('Pharmacology: 0% overall accuracy');
    expect(profile.formattedSummary).toContain('SPECIFIC RECENT QUESTIONS THE STUDENT FAILED');
    expect(profile.formattedSummary).toContain('Paper 1 (General): 54% (PASSED)');
  });
});
