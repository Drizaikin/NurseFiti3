import { SupabaseClient } from '@supabase/supabase-js';
import { effectiveTier } from './planLimits';

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
  { id: 'streak_7', icon: '📅', name: 'Week Warrior', description: '7-day study streak', condition: '7 days' },
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
  { id: 'flashcard_expert', icon: '🚀', name: 'Flashcard Expert', description: 'Review 100 flashcards', condition: '100 Cards' },
  { id: 'flashcard_master', icon: '🤯', name: 'Flashcard Master', description: 'Review 200 flashcards', condition: '200 Cards' },
  { id: 'flashcard_addict', icon: '🔥', name: 'Flashcard Addict', description: 'Review 500 flashcards', condition: '500 Cards' },

  // Membership Badges
  { id: 'daily_member', icon: '🎟️', name: 'Daily Scholar', description: 'Subscribed to Exam Boost Daily', condition: 'Daily Plan' },
  { id: 'standard_member', icon: '🌟', name: 'Success Scholar', description: 'Subscribed to Success Plan', condition: 'Standard Plan' },
  { id: 'premium_member', icon: '💎', name: 'Elite Scholar', description: 'Subscribed to Elite Prep (90-day)', condition: 'Premium Plan' },

  // Ranking Badges
  { id: 'top_20_ranking', icon: '🎖️', name: 'Top 20', description: 'Reached Top 20 on the Leaderboard', condition: 'Rank <= 20' },
  { id: 'top_10_ranking', icon: '🏅', name: 'Top 10', description: 'Reached Top 10 on the Leaderboard', condition: 'Rank <= 10' },
  { id: 'top_5_ranking', icon: '🥇', name: 'Top 5', description: 'Reached Top 5 on the Leaderboard', condition: 'Rank <= 5' },
  { id: 'top_3_ranking', icon: '🥉', name: 'Podium Finish', description: 'Reached Top 3 on the Leaderboard', condition: 'Rank <= 3' },
  { id: 'number_one_ranking', icon: '👑', name: 'The Best', description: 'Ranked #1 on the Leaderboard', condition: 'Rank = 1' },

  // Community Badges
  { id: 'social_butterfly', icon: '🦋', name: 'Social Butterfly', description: 'Post 5 Community Messages', condition: '5 Posts' },
  { id: 'team_captain', icon: '👑', name: 'Team Captain', description: 'Create and lead a study group', condition: 'Create a group' },

  // Timing Badges (New)
  { id: 'early_bird', icon: '🌅', name: 'Early Bird', description: 'Answered a question before 8 AM', condition: 'Study < 8 AM' },
  { id: 'night_owl', icon: '🦉', name: 'Night Owl', description: 'Answered a question after 10 PM', condition: 'Study > 10 PM' },
  { id: 'weekend_warrior', icon: '⚔️', name: 'Weekend Warrior', description: 'Answered 50 questions on a weekend', condition: '50 Qs on Weekend' },
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
      supabase.from('student_profiles').select('level, streak_count, xp, plan_tier, plan_expires_at').eq('id', userId).maybeSingle(),
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
    checkAndAward('streak_7', sp.streak_count >= 7);
    checkAndAward('streak_master', sp.streak_count >= 14);
    checkAndAward('consistency_king', sp.streak_count >= 30);
    checkAndAward('century_club', sp.streak_count >= 100);

    // Evaluate Membership Badges
    const tier = effectiveTier(sp.plan_tier, sp.plan_expires_at);
    checkAndAward('daily_member', tier === 'daily');
    checkAndAward('standard_member', tier === 'standard');
    checkAndAward('premium_member', tier === 'premium');

    // Evaluate Ranking Badges
    const needsRanking = !initialEarned.has('number_one_ranking') || !initialEarned.has('top_3_ranking') || !initialEarned.has('top_5_ranking') || !initialEarned.has('top_10_ranking') || !initialEarned.has('top_20_ranking');
    if (needsRanking && sp.xp > 0) {
      // Rank is 1 + (number of students with more XP)
      const { count, error: rankErr } = await (supabase.from('student_profiles') as any)
        .select('*', { count: 'exact', head: true })
        .gt('xp', sp.xp);
      
      if (!rankErr && count !== null) {
        const rank = count + 1;
        checkAndAward('top_20_ranking', rank <= 20);
        checkAndAward('top_10_ranking', rank <= 10);
        checkAndAward('top_5_ranking', rank <= 5);
        checkAndAward('top_3_ranking', rank <= 3);
        checkAndAward('number_one_ranking', rank === 1);
      }
    }

    // Evaluate Unit & Total Question & Timing Badges
    const needsWarmUp = !initialEarned.has('warm_up');
    const needsDedicated = !initialEarned.has('dedicated_student');
    const needsTotalQ = !initialEarned.has('knowledge_god');
    const needsPharma = !initialEarned.has('pharma_warrior');
    const needsMedSurg = !initialEarned.has('med_surg_master');
    const needsAnatomy = !initialEarned.has('anatomy_ace');
    const needsObgyn = !initialEarned.has('obgyn_oracle');
    const needsEarlyBird = !initialEarned.has('early_bird');
    const needsNightOwl = !initialEarned.has('night_owl');
    const needsWeekendWarrior = !initialEarned.has('weekend_warrior');

    if (needsWarmUp || needsDedicated || needsTotalQ || needsPharma || needsMedSurg || needsAnatomy || needsObgyn || needsEarlyBird || needsNightOwl || needsWeekendWarrior) {
      // Fetch all answers with unit data to count locally
      const { data: answers, error: ansError } = await (supabase.from('student_answers') as any)
        .select('answered_at, questions!inner(unit)')
        .eq('student_id', userId);
      
      if (!ansError && answers) {
        checkAndAward('warm_up', answers.length >= 50);
        checkAndAward('dedicated_student', answers.length >= 500);
        checkAndAward('knowledge_god', answers.length >= 5000);
        
        let pharmaCount = 0;
        let medSurgCount = 0;
        let anatomyCount = 0;
        let obgynCount = 0;
        let hasEarlyBird = false;
        let hasNightOwl = false;
        let weekendCount = 0;

        for (const ans of answers) {
          const unit = ans.questions?.unit || '';
          if (unit.includes('Pharmacology')) pharmaCount++;
          else if (unit.includes('Medical Surgical') || unit.includes('Med-Surg')) medSurgCount++;
          else if (unit.includes('Anatomy')) anatomyCount++;
          else if (unit.includes('Midwifery') || unit.includes('OBGYN')) obgynCount++;

          if (ans.answered_at) {
            const d = new Date(ans.answered_at);
            const hour = d.getHours();
            const day = d.getDay();
            if (hour < 8) hasEarlyBird = true;
            if (hour >= 22 || hour < 4) hasNightOwl = true;
            if (day === 0 || day === 6) weekendCount++;
          }
        }

        checkAndAward('pharma_warrior', pharmaCount >= 100);
        checkAndAward('med_surg_master', medSurgCount >= 100);
        checkAndAward('anatomy_ace', anatomyCount >= 100);
        checkAndAward('obgyn_oracle', obgynCount >= 100);
        checkAndAward('early_bird', hasEarlyBird);
        checkAndAward('night_owl', hasNightOwl);
        checkAndAward('weekend_warrior', weekendCount >= 50);
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
    const needsFlashcards = !initialEarned.has('flashcard_newbie') || !initialEarned.has('flashcard_expert') || !initialEarned.has('flashcard_master') || !initialEarned.has('flashcard_addict');
    if (needsFlashcards) {
      const { count, error: flashError } = await (supabase.from('flashcard_progress') as any)
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId);
        
      if (!flashError && count !== null) {
        checkAndAward('flashcard_newbie', count >= 50);
        checkAndAward('flashcard_expert', count >= 100);
        checkAndAward('flashcard_master', count >= 200);
        checkAndAward('flashcard_addict', count >= 500);
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
      }
    }

  } catch (err) {
    console.error('Error evaluating badges:', err);
  }

  return newlyEarnedDefs;
}
