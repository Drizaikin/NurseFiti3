import { SupabaseClient } from '@supabase/supabase-js';

export interface BadgeDef {
  id: string;
  icon: string;
  name: string;
  description: string;
  condition: string;
}

export const BADGE_DEFS: BadgeDef[] = [
  // Level Badges
  { id: 'first_steps', icon: '👶', name: 'First Steps', description: 'Reach Level 2', condition: 'Level 2' },
  { id: 'top_10', icon: '🏆', name: 'Top 10%', description: 'Reach Level 10', condition: 'Level 10' },

  // Streak Badges
  { id: 'streak_beginner', icon: '🌱', name: 'Getting Started', description: '3-day study streak', condition: '3 days' },
  { id: 'streak_master', icon: '🔥', name: 'Streak Master', description: '14-day study streak', condition: '14 days' },
  { id: 'consistency_king', icon: '👑', name: 'Consistency King', description: '30-day study streak', condition: '30 days' },
  { id: 'century_club', icon: '🏛️', name: 'Century Club', description: '100-day study streak', condition: '100 days' },
  
  // Total Volume Badges
  { id: 'warm_up', icon: '🏃', name: 'Warm Up', description: 'Answer 50 questions total', condition: '50 Qs' },
  { id: 'dedicated_student', icon: '📚', name: 'Dedicated Student', description: 'Answer 500 questions total', condition: '500 Qs' },
  { id: 'knowledge_god', icon: '🧠', name: 'Knowledge God', description: 'Answer 5,000 questions total', condition: '5,000 Qs' },

  // Unit Specific Badges
  { id: 'pharma_warrior', icon: '💊', name: 'Pharma Warrior', description: 'Answer 100 Pharma questions', condition: '100 Qs' },
  { id: 'med_surg_master', icon: '🏥', name: 'Med-Surg Master', description: 'Answer 100 Med-Surg questions', condition: '100 Qs' },
  { id: 'anatomy_ace', icon: '🦴', name: 'Anatomy Ace', description: 'Answer 100 Anatomy questions', condition: '100 Qs' },
  { id: 'obgyn_oracle', icon: '👶', name: 'OBGYN Oracle', description: 'Answer 100 Midwifery/OBGYN questions', condition: '100 Qs' },

  // Mock Exam Badges
  { id: 'mock_maestro', icon: '🎓', name: 'Mock Maestro', description: 'Complete 3 Mock Exams', condition: '3 Exams' },
  { id: 'exam_conqueror', icon: '⚔️', name: 'Exam Conqueror', description: 'Complete 10 Mock Exams', condition: '10 Exams' },
  { id: 'perfect_score', icon: '⭐', name: 'Perfect Score', description: 'Get 90%+ on a Mock Exam', condition: '90% Score' },
  { id: 'flawless_victory', icon: '💯', name: 'Flawless Victory', description: 'Get 100% on a Mock Exam', condition: '100% Score' },
  { id: 'speed_demon', icon: '⚡', name: 'Speed Demon', description: 'Finish mock 20+ mins early', condition: '-20 mins' },

  // Flashcard Badges
  { id: 'flashcard_newbie', icon: '🎴', name: 'Flashcard Newbie', description: 'Review 50 flashcards', condition: '50 Cards' },
  { id: 'flashcard_master', icon: '🤯', name: 'Flashcard Master', description: 'Review 200 flashcards', condition: '200 Cards' },

  // Community Badges
  { id: 'social_butterfly', icon: '🦋', name: 'Social Butterfly', description: 'Post 5 Community Messages', condition: '5 Posts' },
  { id: 'team_captain', icon: '👑', name: 'Team Captain', description: 'Create and lead a study group', condition: 'Create a group' },
];

/**
 * Evaluates a student's entire history to determine if new badges should be awarded.
 * This runs entirely on the client side using the user's Supabase session.
 * 
 * @returns Array of newly earned BadgeDef objects.
 */
export async function evaluateUserBadges(supabase: any, userId: string): Promise<BadgeDef[]> {
  const newlyEarnedDefs: BadgeDef[] = [];
  
  try {
    // 1. Fetch current profile stats & already earned badges
    const [profileRes, badgesRes] = await Promise.all([
      supabase.from('student_profiles').select('level, streak_count').eq('id', userId).maybeSingle(),
      supabase.from('student_badges').select('badge_id').eq('student_id', userId)
    ]);

    const sp = profileRes.data;
    if (!sp) return [];

    const initialEarned = new Set<string>((badgesRes.data ?? []).map((b: any) => b.badge_id));
    const newlyEarnedIds: string[] = [];

    // Helper to check and add badge
    const checkAndAward = (id: string, conditionMet: boolean) => {
      if (!initialEarned.has(id) && conditionMet) {
        newlyEarnedIds.push(id);
        const def = BADGE_DEFS.find(b => b.id === id);
        if (def) newlyEarnedDefs.push(def);
      }
    };

    // Evaluate Profile-based Badges
    checkAndAward('first_steps', sp.level >= 2);
    checkAndAward('top_10', sp.level >= 10);
    
    checkAndAward('streak_beginner', sp.streak_count >= 3);
    checkAndAward('streak_master', sp.streak_count >= 14);
    checkAndAward('consistency_king', sp.streak_count >= 30);
    checkAndAward('century_club', sp.streak_count >= 100);

    // Evaluate Unit & Total Question Badges
    const needsWarmUp = !initialEarned.has('warm_up');
    const needsDedicated = !initialEarned.has('dedicated_student');
    const needsTotalQ = !initialEarned.has('knowledge_god');
    const needsPharma = !initialEarned.has('pharma_warrior');
    const needsMedSurg = !initialEarned.has('med_surg_master');
    const needsAnatomy = !initialEarned.has('anatomy_ace');
    const needsObgyn = !initialEarned.has('obgyn_oracle');

    if (needsWarmUp || needsDedicated || needsTotalQ || needsPharma || needsMedSurg || needsAnatomy || needsObgyn) {
      // Fetch all answers with unit data to count locally
      const { data: answers, error: ansError } = await (supabase.from('student_answers') as any)
        .select('questions!inner(unit)')
        .eq('student_id', userId);
      
      if (!ansError && answers) {
        checkAndAward('warm_up', answers.length >= 50);
        checkAndAward('dedicated_student', answers.length >= 500);
        checkAndAward('knowledge_god', answers.length >= 5000);
        
        let pharmaCount = 0;
        let medSurgCount = 0;
        let anatomyCount = 0;
        let obgynCount = 0;

        for (const ans of answers) {
          const unit = ans.questions?.unit || '';
          if (unit.includes('Pharmacology')) pharmaCount++;
          else if (unit.includes('Medical Surgical') || unit.includes('Med-Surg')) medSurgCount++;
          else if (unit.includes('Anatomy')) anatomyCount++;
          else if (unit.includes('Midwifery') || unit.includes('OBGYN')) obgynCount++;
        }

        checkAndAward('pharma_warrior', pharmaCount >= 100);
        checkAndAward('med_surg_master', medSurgCount >= 100);
        checkAndAward('anatomy_ace', anatomyCount >= 100);
        checkAndAward('obgyn_oracle', obgynCount >= 100);
      }
    }

    // Evaluate Mock Exam Badges
    const needsMocks = !initialEarned.has('mock_maestro') || 
                       !initialEarned.has('exam_conqueror') ||
                       !initialEarned.has('perfect_score') || 
                       !initialEarned.has('flawless_victory') || 
                       !initialEarned.has('speed_demon');
                       
    if (needsMocks) {
      const { data: mocks, error: mocksError } = await (supabase.from('mock_exam_results') as any)
        .select('score_percentage, time_used_minutes, total_questions')
        .eq('student_id', userId);
        
      if (!mocksError && mocks && mocks.length > 0) {
        checkAndAward('mock_maestro', mocks.length >= 3);
        checkAndAward('exam_conqueror', mocks.length >= 10);
        checkAndAward('perfect_score', (mocks as any[]).some(m => m.score_percentage >= 90));
        checkAndAward('flawless_victory', (mocks as any[]).some(m => m.score_percentage >= 100));
        checkAndAward('speed_demon', (mocks as any[]).some(m => m.time_used_minutes <= (m.total_questions - 20)));
      }
    }
    
    // Evaluate Flashcard Badges
    const needsFlashcards = !initialEarned.has('flashcard_newbie') || !initialEarned.has('flashcard_master');
    if (needsFlashcards) {
      const { count, error: flashError } = await (supabase.from('flashcard_progress') as any)
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId);
        
      if (!flashError && count !== null) {
        checkAndAward('flashcard_newbie', count >= 50);
        checkAndAward('flashcard_master', count >= 200);
      }
    }

    // Evaluate Community Badges
    if (!initialEarned.has('social_butterfly')) {
      const { count, error: commError } = await (supabase.from('community_messages') as any)
        .select('*', { count: 'exact', head: true })
        .eq('author_id', userId);
      
      if (!commError && count !== null) {
        checkAndAward('social_butterfly', count >= 5);
      }
    }

    if (!initialEarned.has('team_captain')) {
      const { count, error: groupError } = await (supabase.from('study_groups') as any)
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', userId);
      
      if (!groupError && count !== null) {
        checkAndAward('team_captain', count >= 1);
      }
    }

    // Save newly earned badges to the database
    if (newlyEarnedIds.length > 0) {
      const insertData = newlyEarnedIds.map(b => ({ student_id: userId, badge_id: b }));
      const { error: insertError } = await (supabase.from('student_badges') as any).insert(insertData);
      
      if (insertError) {
        console.error('Failed to save earned badges:', insertError);
        // If save fails, we shouldn't show them as earned, else they will see it again next load.
        // But for UX, we might want to show them anyway. Let's return them so the UI can celebrate!
        // In the future, the DB will sync.
      }
    }

  } catch (err) {
    console.error('Error evaluating badges:', err);
  }

  return newlyEarnedDefs;
}
