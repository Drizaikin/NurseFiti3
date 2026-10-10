import { SupabaseClient } from '@supabase/supabase-js';
import { effectiveTier } from './planLimits';

export type BadgeCategory = 'clinical' | 'streaks' | 'exams' | 'milestones' | 'community';

export interface BadgeDef {
  id: string;
  icon: string;
  name: string;
  description: string;
  condition: string;
  category: BadgeCategory;
}

export const BADGE_CATEGORIES: { id: 'all' | BadgeCategory; label: string }[] = [
  { id: 'all', label: 'All Badges' },
  { id: 'clinical', label: 'Clinical Specialties' },
  { id: 'streaks', label: 'Streaks & Habits' },
  { id: 'exams', label: 'Mock Exams & CBT' },
  { id: 'milestones', label: 'Milestones & XP' },
  { id: 'community', label: 'Community & Mentorship' },
];

export const BADGE_DEFS: BadgeDef[] = [
  // ==========================================
  // 1. Clinical Specialties & Cadres (33 Badges)
  // ==========================================
  // Pharmacology
  { id: 'pharma_novice', icon: '💊', name: 'Pharma Novice', description: 'Answer 25 Pharmacology questions', condition: '25 Qs', category: 'clinical' },
  { id: 'pharma_warrior', icon: '💉', name: 'Pharma Warrior', description: 'Answer 100 Pharmacology questions', condition: '100 Qs', category: 'clinical' },
  { id: 'pharma_specialist', icon: '🧪', name: 'Pharmacology Specialist', description: 'Answer 250 Pharmacology questions', condition: '250 Qs', category: 'clinical' },
  { id: 'pharma_legend', icon: '🧬', name: 'Clinical Pharmacologist', description: 'Answer 500 Pharmacology questions', condition: '500 Qs', category: 'clinical' },

  // Medical-Surgical Nursing
  { id: 'med_surg_novice', icon: '🩹', name: 'Med-Surg Novice', description: 'Answer 25 Medical-Surgical questions', condition: '25 Qs', category: 'clinical' },
  { id: 'med_surg_master', icon: '🏥', name: 'Med-Surg Master', description: 'Answer 100 Medical-Surgical questions', condition: '100 Qs', category: 'clinical' },
  { id: 'med_surg_specialist', icon: '🔬', name: 'Surgical Savant', description: 'Answer 250 Medical-Surgical questions', condition: '250 Qs', category: 'clinical' },
  { id: 'med_surg_legend', icon: '🩺', name: 'Chief Clinician', description: 'Answer 500 Medical-Surgical questions', condition: '500 Qs', category: 'clinical' },

  // Anatomy & Physiology
  { id: 'anatomy_explorer', icon: '🩻', name: 'Anatomy Explorer', description: 'Answer 25 Anatomy & Physiology questions', condition: '25 Qs', category: 'clinical' },
  { id: 'anatomy_ace', icon: '🦴', name: 'Anatomy Ace', description: 'Answer 100 Anatomy & Physiology questions', condition: '100 Qs', category: 'clinical' },
  { id: 'anatomy_prodigy', icon: '🫀', name: 'Physiological Prodigy', description: 'Answer 250 Anatomy & Physiology questions', condition: '250 Qs', category: 'clinical' },
  { id: 'anatomy_guru', icon: '🧠', name: 'Anatomical Scholar', description: 'Answer 500 Anatomy & Physiology questions', condition: '500 Qs', category: 'clinical' },

  // Midwifery, Maternal & Child Health (MCH)
  { id: 'midwife_novice', icon: '🍼', name: 'Midwife-in-Training', description: 'Answer 25 Midwifery / Maternal Health questions', condition: '25 Qs', category: 'clinical' },
  { id: 'obgyn_oracle', icon: '👶', name: 'OBGYN Oracle', description: 'Answer 100 Midwifery / Maternal Health questions', condition: '100 Qs', category: 'clinical' },
  { id: 'labour_maestro', icon: '🌸', name: 'Labour Ward Maestro', description: 'Answer 250 Midwifery / Maternal Health questions', condition: '250 Qs', category: 'clinical' },
  { id: 'master_midwife', icon: '👑', name: 'Master Midwife', description: 'Answer 500 Midwifery / Maternal Health questions', condition: '500 Qs', category: 'clinical' },

  // Community & Public Health
  { id: 'community_novice', icon: '🏘️', name: 'Village Health Worker', description: 'Answer 25 Community & Public Health questions', condition: '25 Qs', category: 'clinical' },
  { id: 'community_champion', icon: '🌍', name: 'Community Champion', description: 'Answer 100 Community & Public Health questions', condition: '100 Qs', category: 'clinical' },
  { id: 'public_health_pioneer', icon: '🌿', name: 'Public Health Pioneer', description: 'Answer 250 Community & Public Health questions', condition: '250 Qs', category: 'clinical' },
  { id: 'epidemiologist', icon: '🌐', name: 'Epidemiologist', description: 'Answer 500 Community & Public Health questions', condition: '500 Qs', category: 'clinical' },

  // Mental Health & Psychiatric Nursing
  { id: 'mind_seeker', icon: '🕯️', name: 'Mind Seeker', description: 'Answer 25 Mental Health questions', condition: '25 Qs', category: 'clinical' },
  { id: 'mental_health_ally', icon: '🧠', name: 'Mental Health Ally', description: 'Answer 100 Mental Health questions', condition: '100 Qs', category: 'clinical' },
  { id: 'psych_sentinel', icon: '🕊️', name: 'Psychiatric Sentinel', description: 'Answer 250 Mental Health questions', condition: '250 Qs', category: 'clinical' },
  { id: 'master_of_mind', icon: '🧘', name: 'Master of Mind', description: 'Answer 500 Mental Health questions', condition: '500 Qs', category: 'clinical' },

  // Paediatrics & Child Health
  { id: 'paeds_apprentice', icon: '🎈', name: 'Paeds Apprentice', description: 'Answer 25 Paediatric questions', condition: '25 Qs', category: 'clinical' },
  { id: 'paeds_prodigy', icon: '🧸', name: 'Paediatric Prodigy', description: 'Answer 100 Paediatric questions', condition: '100 Qs', category: 'clinical' },
  { id: 'neonatal_guardian', icon: '🐣', name: 'Neonatal Guardian', description: 'Answer 250 Paediatric questions', condition: '250 Qs', category: 'clinical' },
  { id: 'child_health_legend', icon: '🌟', name: 'Child Health Legend', description: 'Answer 500 Paediatric questions', condition: '500 Qs', category: 'clinical' },

  // Critical Care & Emergency
  { id: 'emergency_responder', icon: '🚑', name: 'Emergency Responder', description: 'Answer 25 Critical Care & Emergency questions', condition: '25 Qs', category: 'clinical' },
  { id: 'critical_care_ace', icon: '🩺', name: 'Critical Care Ace', description: 'Answer 50 Critical Care & Emergency questions', condition: '50 Qs', category: 'clinical' },
  { id: 'trauma_resuscitator', icon: '⚡', name: 'Trauma Resuscitator', description: 'Answer 100 Critical Care & Emergency questions', condition: '100 Qs', category: 'clinical' },

  // Ethics, Leadership & Law
  { id: 'ethics_novice', icon: '📜', name: 'Ethics Novice', description: 'Answer 25 Ethics, Leadership & Law questions', condition: '25 Qs', category: 'clinical' },
  { id: 'ethics_sentinel', icon: '⚖️', name: 'Ethics Sentinel', description: 'Answer 50 Ethics, Leadership & Law questions', condition: '50 Qs', category: 'clinical' },
  { id: 'legal_eagle', icon: '🏛️', name: 'Legal & Governance Eagle', description: 'Answer 100 Ethics, Leadership & Law questions', condition: '100 Qs', category: 'clinical' },

  // Infection Prevention & Control (IPC)
  { id: 'clean_hands', icon: '🧼', name: 'Clean Hands', description: 'Answer 25 Infection Prevention & Control questions', condition: '25 Qs', category: 'clinical' },
  { id: 'infection_control', icon: '🧽', name: 'IPC Specialist', description: 'Answer 50 Infection Prevention & Control questions', condition: '50 Qs', category: 'clinical' },
  { id: 'aseptic_champion', icon: '🛡️', name: 'Aseptic Champion', description: 'Answer 100 Infection Prevention & Control questions', condition: '100 Qs', category: 'clinical' },

  // ==========================================
  // 2. Streaks, Habits & Timing (22 Badges)
  // ==========================================
  // Continuous Streaks
  { id: 'streak_spark', icon: '⚡', name: 'Study Spark', description: 'Complete your 1st day study streak', condition: '1 day', category: 'streaks' },
  { id: 'streak_beginner', icon: '🌱', name: 'Getting Started', description: '3-day continuous study streak', condition: '3 days', category: 'streaks' },
  { id: 'streak_5', icon: '🌿', name: '5-Day Momentum', description: '5-day continuous study streak', condition: '5 days', category: 'streaks' },
  { id: 'streak_7', icon: '📅', name: 'Week Warrior', description: '7-day continuous study streak', condition: '7 days', category: 'streaks' },
  { id: 'streak_10', icon: '🧗', name: 'Double Digits', description: '10-day continuous study streak', condition: '10 days', category: 'streaks' },
  { id: 'streak_master', icon: '🔥', name: 'Streak Master', description: '14-day continuous study streak', condition: '14 days', category: 'streaks' },
  { id: 'streak_21', icon: '🎯', name: 'Habit Formed', description: '21-day study streak (habit building milestone)', condition: '21 days', category: 'streaks' },
  { id: 'consistency_king', icon: '👑', name: 'Consistency King', description: '30-day continuous study streak', condition: '30 days', category: 'streaks' },
  { id: 'streak_45', icon: '🛡️', name: 'Fortified Discipline', description: '45-day continuous study streak', condition: '45 days', category: 'streaks' },
  { id: 'streak_60', icon: '💎', name: 'Diamond Dedication', description: '60-day continuous study streak', condition: '60 days', category: 'streaks' },
  { id: 'streak_75', icon: '🌠', name: 'Relentless Grit', description: '75-day continuous study streak', condition: '75 days', category: 'streaks' },
  { id: 'century_club', icon: '🏛️', name: 'Century Club', description: '100-day continuous study streak', condition: '100 days', category: 'streaks' },
  { id: 'streak_180', icon: '🏆', name: 'Half-Year Hero', description: '180-day continuous study streak', condition: '180 days', category: 'streaks' },
  { id: 'year_of_nurse', icon: '🎆', name: 'Year of the Nurse', description: '365-day continuous study streak', condition: '365 days', category: 'streaks' },

  // Study Timing & Circumstances
  { id: 'dawn_patrol', icon: '🌄', name: 'Dawn Patrol', description: 'Answered a question before 6 AM', condition: 'Study < 6 AM', category: 'streaks' },
  { id: 'early_bird', icon: '🌅', name: 'Early Bird', description: 'Answered a question before 8 AM', condition: 'Study < 8 AM', category: 'streaks' },
  { id: 'lunch_learner', icon: '🥪', name: 'Lunch Break Learner', description: 'Answered questions between 12 PM and 2 PM', condition: '12 - 2 PM', category: 'streaks' },
  { id: 'sundown_study', icon: '🌇', name: 'Sundown Study', description: 'Answered questions between 5 PM and 8 PM', condition: '5 - 8 PM', category: 'streaks' },
  { id: 'night_owl', icon: '🦉', name: 'Night Owl', description: 'Answered a question after 10 PM', condition: 'Study > 10 PM', category: 'streaks' },
  { id: 'midnight_ward', icon: '🌙', name: 'Midnight Ward', description: 'Answered questions during night duty hours (12 AM - 4 AM)', condition: '12 - 4 AM', category: 'streaks' },
  { id: 'weekend_warrior', icon: '⚔️', name: 'Weekend Warrior', description: 'Answered 50 questions on a weekend', condition: '50 Qs on Weekend', category: 'streaks' },
  { id: 'super_weekend', icon: '🚀', name: 'Super Weekend', description: 'Answered 150 questions on a single weekend', condition: '150 Qs on Weekend', category: 'streaks' },

  // ==========================================
  // 3. Mock Exams & CBT Precision (19 Badges)
  // ==========================================
  { id: 'first_mock', icon: '📝', name: 'Trial by Fire', description: 'Complete your first 100-question Mock Exam', condition: '1 Exam', category: 'exams' },
  { id: 'mock_two', icon: '✌️', name: 'Double Take', description: 'Complete 2 full Mock Exams', condition: '2 Exams', category: 'exams' },
  { id: 'mock_maestro', icon: '🎓', name: 'Mock Maestro', description: 'Complete 3 Mock Exams', condition: '3 Exams', category: 'exams' },
  { id: 'mock_veteran', icon: '🛡️', name: 'Mock Veteran', description: 'Complete 5 Mock Exams', condition: '5 Exams', category: 'exams' },
  { id: 'exam_conqueror', icon: '⚔️', name: 'Exam Conqueror', description: 'Complete 10 Mock Exams', condition: '10 Exams', category: 'exams' },
  { id: 'exam_centurion', icon: '🏛️', name: 'Exam Centurion', description: 'Complete 25 Mock Exams', condition: '25 Exams', category: 'exams' },
  { id: 'pass_master', icon: '🎖️', name: 'Licensure Ready', description: 'Pass a full Mock Exam with 50%+ score', condition: '50% Score', category: 'exams' },
  { id: 'first_class', icon: '🥈', name: 'Merit Scholar', description: 'Score 70%+ on a completed Mock Exam', condition: '70% Score', category: 'exams' },
  { id: 'clinical_precision', icon: '🎯', name: 'Clinical Precision', description: 'Score 80%+ on a completed Mock Exam', condition: '80% Score', category: 'exams' },
  { id: 'perfect_score', icon: '⭐', name: 'Perfect Score', description: 'Score 90%+ on a completed Mock Exam', condition: '90% Score', category: 'exams' },
  { id: 'flawless_victory', icon: '💯', name: 'Flawless Victory', description: 'Score 100% on a completed Mock Exam', condition: '100% Score', category: 'exams' },
  { id: 'speed_demon', icon: '⚡', name: 'Speed Demon', description: 'Finish a mock exam with 20+ minutes remaining', condition: '-20 mins', category: 'exams' },
  { id: 'supersonic_nurse', icon: '🚀', name: 'Supersonic Clinician', description: 'Finish a mock exam with 40+ minutes remaining', condition: '-40 mins', category: 'exams' },
  { id: 'paper_1_specialist', icon: '📖', name: 'Paper I Champion', description: 'Complete 3 Paper I Mock Exams', condition: '3 Paper I', category: 'exams' },
  { id: 'paper_2_specialist', icon: '📘', name: 'Paper II Champion', description: 'Complete 3 Paper II Mock Exams', condition: '3 Paper II', category: 'exams' },
  { id: 'cadre_specialist', icon: '📚', name: 'Dual Paper Master', description: 'Complete mock exams across both Paper I and Paper II', condition: 'Both Papers', category: 'exams' },
  { id: 'mock_marathon', icon: '🏃', name: 'Exam Marathoner', description: 'Complete 2 full Mock Exams in a single week', condition: '2 in Week', category: 'exams' },
  { id: 'cbt_endurance', icon: '🕰️', name: 'CBT Stamina', description: 'Accumulate 200+ minutes in active mock exam simulations', condition: '200+ mins', category: 'exams' },
  { id: 'pressure_proof', icon: '💎', name: 'Cool Under Pressure', description: 'Pass a mock exam attempted after 8 PM', condition: 'Night Pass', category: 'exams' },

  // ==========================================
  // 4. Milestones, Volume, XP & Ranking (39 Badges)
  // ==========================================
  // Question Volume Milestones
  { id: 'first_answer', icon: '🎯', name: 'First Blood', description: 'Answer your first question on NurseFiti', condition: '1 Q', category: 'milestones' },
  { id: 'bronze_scholar', icon: '🥉', name: 'Bronze Scholar', description: 'Answer 25 questions total', condition: '25 Qs', category: 'milestones' },
  { id: 'warm_up', icon: '🏃', name: 'Warm Up', description: 'Answer 50 questions total', condition: '50 Qs', category: 'milestones' },
  { id: 'silver_scholar', icon: '🥈', name: 'Silver Scholar', description: 'Answer 100 questions total', condition: '100 Qs', category: 'milestones' },
  { id: 'gold_scholar', icon: '🥇', name: 'Gold Scholar', description: 'Answer 250 questions total', condition: '250 Qs', category: 'milestones' },
  { id: 'dedicated_student', icon: '📚', name: 'Dedicated Student', description: 'Answer 500 questions total', condition: '500 Qs', category: 'milestones' },
  { id: 'centurion_1000', icon: '🎖️', name: 'Question Centurion', description: 'Answer 1,000 questions total', condition: '1,000 Qs', category: 'milestones' },
  { id: 'scholar_2000', icon: '🏛️', name: 'Scholar 2K', description: 'Answer 2,000 questions total', condition: '2,000 Qs', category: 'milestones' },
  { id: 'question_titan', icon: '⚡', name: 'Question Titan', description: 'Answer 3,000 questions total', condition: '3,000 Qs', category: 'milestones' },
  { id: 'knowledge_god', icon: '🧠', name: 'Knowledge God', description: 'Answer 5,000 questions total', condition: '5,000 Qs', category: 'milestones' },
  { id: 'infinite_intellect', icon: '🌌', name: 'Infinite Intellect', description: 'Answer 10,000 questions total', condition: '10,000 Qs', category: 'milestones' },

  // Level Progression
  { id: 'first_steps', icon: '👶', name: 'First Steps', description: 'Reach Level 2', condition: 'Level 2', category: 'milestones' },
  { id: 'level_5', icon: '🌱', name: 'Rising Nurse', description: 'Reach Level 5', condition: 'Level 5', category: 'milestones' },
  { id: 'top_10', icon: '🏆', name: 'Top 10%', description: 'Reach Level 10', condition: 'Level 10', category: 'milestones' },
  { id: 'level_15', icon: '🏥', name: 'Charge Nurse', description: 'Reach Level 15', condition: 'Level 15', category: 'milestones' },
  { id: 'level_20', icon: '🌟', name: 'Chief Nurse', description: 'Reach Level 20', condition: 'Level 20', category: 'milestones' },
  { id: 'level_30', icon: '🎖️', name: 'Nursing Officer', description: 'Reach Level 30', condition: 'Level 30', category: 'milestones' },
  { id: 'level_50', icon: '👑', name: 'Director of Nursing', description: 'Reach Level 50', condition: 'Level 50', category: 'milestones' },

  // XP Accumulation
  { id: 'xp_500', icon: '🪙', name: '500 XP Club', description: 'Accumulate 500 total XP', condition: '500 XP', category: 'milestones' },
  { id: 'xp_1k', icon: '💵', name: '1K XP Club', description: 'Accumulate 1,000 total XP', condition: '1,000 XP', category: 'milestones' },
  { id: 'xp_2500', icon: '💳', name: '2.5K XP Club', description: 'Accumulate 2,500 total XP', condition: '2,500 XP', category: 'milestones' },
  { id: 'xp_5k', icon: '💰', name: '5K XP Club', description: 'Accumulate 5,000 total XP', condition: '5,000 XP', category: 'milestones' },
  { id: 'xp_10k', icon: '👑', name: '10K XP Titan', description: 'Accumulate 10,000 total XP', condition: '10,000 XP', category: 'milestones' },
  { id: 'xp_25k', icon: '💎', name: '25K XP Legend', description: 'Accumulate 25,000 total XP', condition: '25,000 XP', category: 'milestones' },
  { id: 'xp_50k', icon: '🌌', name: '50K XP Mythic', description: 'Accumulate 50,000 total XP', condition: '50,000 XP', category: 'milestones' },

  // Accuracy Streaks & Precision
  { id: 'hot_streak_10', icon: '🔥', name: 'Hot Streak', description: 'Answer 10 practice questions correctly in a row', condition: '10 in Row', category: 'milestones' },
  { id: 'clinical_eye', icon: '👁️', name: 'Clinical Eye', description: 'Answer 20 practice questions correctly in a row', condition: '20 in Row', category: 'milestones' },
  { id: 'sharp_diagnostician', icon: '🎯', name: 'Sharp Diagnostician', description: 'Answer 50 practice questions correctly in a row', condition: '50 in Row', category: 'milestones' },
  { id: 'accuracy_80', icon: '🏹', name: 'Accuracy Master', description: 'Achieve 80%+ overall question accuracy (min. 50 Qs)', condition: '80% Acc', category: 'milestones' },
  { id: 'accuracy_90', icon: '🎖️', name: 'Elite Precision', description: 'Achieve 90%+ overall question accuracy (min. 100 Qs)', condition: '90% Acc', category: 'milestones' },

  // Flashcards (SRS Algorithm)
  { id: 'flashcard_novice', icon: '🃏', name: 'Card Novice', description: 'Review 10 flashcards', condition: '10 Cards', category: 'milestones' },
  { id: 'flashcard_newbie', icon: '🎴', name: 'Flashcard Newbie', description: 'Review 50 flashcards', condition: '50 Cards', category: 'milestones' },
  { id: 'flashcard_expert', icon: '🚀', name: 'Flashcard Expert', description: 'Review 100 flashcards', condition: '100 Cards', category: 'milestones' },
  { id: 'flashcard_master', icon: '🤯', name: 'Flashcard Master', description: 'Review 200 flashcards', condition: '200 Cards', category: 'milestones' },
  { id: 'flashcard_addict', icon: '🔥', name: 'Flashcard Addict', description: 'Review 500 flashcards', condition: '500 Cards', category: 'milestones' },
  { id: 'memory_champion', icon: '🧠', name: 'Memory Champion', description: 'Review 1,000 flashcards', condition: '1,000 Cards', category: 'milestones' },

  // Leaderboard Rankings
  { id: 'top_50_ranking', icon: '🎖️', name: 'Top 50', description: 'Reached Top 50 on the Leaderboard', condition: 'Rank <= 50', category: 'milestones' },
  { id: 'top_20_ranking', icon: '🎖️', name: 'Top 20', description: 'Reached Top 20 on the Leaderboard', condition: 'Rank <= 20', category: 'milestones' },
  { id: 'top_10_ranking', icon: '🏅', name: 'Top 10', description: 'Reached Top 10 on the Leaderboard', condition: 'Rank <= 10', category: 'milestones' },
  { id: 'top_5_ranking', icon: '🥇', name: 'Top 5', description: 'Reached Top 5 on the Leaderboard', condition: 'Rank <= 5', category: 'milestones' },
  { id: 'top_3_ranking', icon: '🥉', name: 'Podium Finish', description: 'Reached Top 3 on the Leaderboard', condition: 'Rank <= 3', category: 'milestones' },
  { id: 'number_two_ranking', icon: '🥈', name: 'The Contender', description: 'Reached Rank #2 on the Leaderboard', condition: 'Rank = 2', category: 'milestones' },
  { id: 'number_one_ranking', icon: '👑', name: 'The Best', description: 'Ranked #1 on the Leaderboard', condition: 'Rank = 1', category: 'milestones' },

  // Membership Scholars
  { id: 'daily_member', icon: '🎟️', name: 'Daily Scholar', description: 'Subscribed to Exam Boost Daily', condition: 'Daily Plan', category: 'milestones' },
  { id: 'weekly_member', icon: '🎫', name: 'Weekly Champion', description: 'Subscribed to Exam Boost Weekly', condition: 'Weekly Plan', category: 'milestones' },
  { id: 'standard_member', icon: '🌟', name: 'Success Scholar', description: 'Subscribed to Success Plan (30-day)', condition: 'Standard Plan', category: 'milestones' },
  { id: 'premium_member', icon: '💎', name: 'Elite Scholar', description: 'Subscribed to Elite Prep (90-day)', condition: 'Premium Plan', category: 'milestones' },

  // ==========================================
  // 5. Community, Mentorship & Collaboration (10 Badges)
  // ==========================================
  { id: 'first_post', icon: '👋', name: 'Hello NurseFiti', description: 'Post your first community message', condition: '1 Post', category: 'community' },
  { id: 'social_butterfly', icon: '🦋', name: 'Social Butterfly', description: 'Post 5 Community Messages', condition: '5 Posts', category: 'community' },
  { id: 'knowledge_sharer', icon: '💬', name: 'Active Contributor', description: 'Post 15 Community Messages', condition: '15 Posts', category: 'community' },
  { id: 'community_pillar', icon: '🏛️', name: 'Community Pillar', description: 'Post 50 Community Messages', condition: '50 Posts', category: 'community' },
  { id: 'team_captain', icon: '👑', name: 'Team Captain', description: 'Create and lead a study group', condition: 'Create Group', category: 'community' },
  { id: 'squad_member', icon: '🤝', name: 'Study Squad', description: 'Join and participate in a study group', condition: 'Join Group', category: 'community' },
  { id: 'revision_architect', icon: '🗺️', name: 'Revision Architect', description: 'Generate a personalized AI Revision Plan', condition: '1 Plan', category: 'community' },
  { id: 'mentee_mindset', icon: '🩺', name: 'Mentee Mindset', description: 'Book a 1-on-1 session with a certified nurse tutor', condition: '1 Session', category: 'community' },
  { id: 'mentorship_regular', icon: '🎓', name: 'Tutoring Regular', description: 'Complete 3 sessions with certified nurse tutors', condition: '3 Sessions', category: 'community' },
  { id: 'past_paper_hero', icon: '📤', name: 'Past Paper Hero', description: 'Upload past exam questions to assist fellow students', condition: '1 Upload', category: 'community' },
];

/**
 * Evaluates a student's entire history to determine if new badges should be awarded.
 * This runs client-side using the user's Supabase session.
 * 
 * @returns Array of newly earned BadgeDef objects.
 */
export async function evaluateUserBadges(supabase: SupabaseClient | any, userId: string): Promise<BadgeDef[]> {
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

    // Evaluate Profile Level Badges
    checkAndAward('first_steps', sp.level >= 2);
    checkAndAward('level_5', sp.level >= 5);
    checkAndAward('top_10', sp.level >= 10);
    checkAndAward('level_15', sp.level >= 15);
    checkAndAward('level_20', sp.level >= 20);
    checkAndAward('level_30', sp.level >= 30);
    checkAndAward('level_50', sp.level >= 50);

    // Evaluate XP Badges
    checkAndAward('xp_500', sp.xp >= 500);
    checkAndAward('xp_1k', sp.xp >= 1000);
    checkAndAward('xp_2500', sp.xp >= 2500);
    checkAndAward('xp_5k', sp.xp >= 5000);
    checkAndAward('xp_10k', sp.xp >= 10000);
    checkAndAward('xp_25k', sp.xp >= 25000);
    checkAndAward('xp_50k', sp.xp >= 50000);
    
    // Evaluate Streak Badges
    checkAndAward('streak_spark', sp.streak_count >= 1);
    checkAndAward('streak_beginner', sp.streak_count >= 3);
    checkAndAward('streak_5', sp.streak_count >= 5);
    checkAndAward('streak_7', sp.streak_count >= 7);
    checkAndAward('streak_10', sp.streak_count >= 10);
    checkAndAward('streak_master', sp.streak_count >= 14);
    checkAndAward('streak_21', sp.streak_count >= 21);
    checkAndAward('consistency_king', sp.streak_count >= 30);
    checkAndAward('streak_45', sp.streak_count >= 45);
    checkAndAward('streak_60', sp.streak_count >= 60);
    checkAndAward('streak_75', sp.streak_count >= 75);
    checkAndAward('century_club', sp.streak_count >= 100);
    checkAndAward('streak_180', sp.streak_count >= 180);
    checkAndAward('year_of_nurse', sp.streak_count >= 365);

    // Evaluate Membership Badges
    const tier = effectiveTier(sp.plan_tier, sp.plan_expires_at);
    checkAndAward('daily_member', tier === 'daily');
    checkAndAward('weekly_member', tier === 'weekly');
    checkAndAward('standard_member', tier === 'standard');
    checkAndAward('premium_member', tier === 'premium');

    // Evaluate Leaderboard Ranking Badges
    const needsRanking = !initialEarned.has('number_one_ranking') || !initialEarned.has('number_two_ranking') ||
      !initialEarned.has('top_3_ranking') || !initialEarned.has('top_5_ranking') || 
      !initialEarned.has('top_10_ranking') || !initialEarned.has('top_20_ranking') || !initialEarned.has('top_50_ranking');

    if (needsRanking && sp.xp > 0) {
      const { count, error: rankErr } = await (supabase.from('student_profiles') as any)
        .select('*', { count: 'exact', head: true })
        .gt('xp', sp.xp);
      
      if (!rankErr && count !== null) {
        const rank = count + 1;
        checkAndAward('top_50_ranking', rank <= 50);
        checkAndAward('top_20_ranking', rank <= 20);
        checkAndAward('top_10_ranking', rank <= 10);
        checkAndAward('top_5_ranking', rank <= 5);
        checkAndAward('top_3_ranking', rank <= 3);
        checkAndAward('number_two_ranking', rank <= 2);
        checkAndAward('number_one_ranking', rank === 1);
      }
    }

    // Evaluate Student Answers (Question volume, clinical units, timing & accuracy)
    const { data: answers, count: totalAnswerCount, error: ansError } = await (supabase.from('student_answers') as any)
      .select('answered_at, is_correct, questions(unit)', { count: 'exact' })
      .eq('student_id', userId);
    
    if (!ansError && answers) {
      const totalAnswers = Math.max(totalAnswerCount ?? 0, answers.length);
      
      // Question Volume
      checkAndAward('first_answer', totalAnswers >= 1);
      checkAndAward('bronze_scholar', totalAnswers >= 25);
      checkAndAward('warm_up', totalAnswers >= 50);
      checkAndAward('silver_scholar', totalAnswers >= 100);
      checkAndAward('gold_scholar', totalAnswers >= 250);
      checkAndAward('dedicated_student', totalAnswers >= 500);
      checkAndAward('centurion_1000', totalAnswers >= 1000);
      checkAndAward('scholar_2000', totalAnswers >= 2000);
      checkAndAward('question_titan', totalAnswers >= 3000);
      checkAndAward('knowledge_god', totalAnswers >= 5000);
      checkAndAward('infinite_intellect', totalAnswers >= 10000);
      
      let pharmaCount = 0;
      let medSurgCount = 0;
      let anatomyCount = 0;
      let obgynCount = 0;
      let communityCount = 0;
      let mentalHealthCount = 0;
      let paedsCount = 0;
      let criticalCareCount = 0;
      let ethicsCount = 0;
      let ipcCount = 0;

      let dawnCount = 0;
      let earlyCount = 0;
      let lunchCount = 0;
      let sundownCount = 0;
      let nightCount = 0;
      let midnightCount = 0;
      let weekendCount = 0;

      let correctCount = 0;
      let currentCorrectStreak = 0;
      let maxCorrectStreak = 0;

      for (const ans of answers) {
        // Accuracy & Streak
        if (ans.is_correct) {
          correctCount++;
          currentCorrectStreak++;
          if (currentCorrectStreak > maxCorrectStreak) maxCorrectStreak = currentCorrectStreak;
        } else {
          currentCorrectStreak = 0;
        }

        // Units
        const unit = (ans.questions?.unit || '').toLowerCase();
        if (unit.includes('pharmacology') || unit.includes('pharma')) pharmaCount++;
        if (unit.includes('medical surgical') || unit.includes('med-surg') || unit.includes('surgical')) medSurgCount++;
        if (unit.includes('anatomy') || unit.includes('physiology')) anatomyCount++;
        if (unit.includes('midwifery') || unit.includes('obgyn') || unit.includes('maternal')) obgynCount++;
        if (unit.includes('community') || unit.includes('public health') || unit.includes('environmental')) communityCount++;
        if (unit.includes('mental health') || unit.includes('psychiatric')) mentalHealthCount++;
        if (unit.includes('paediatric') || unit.includes('pediatric') || unit.includes('child')) paedsCount++;
        if (unit.includes('critical care') || unit.includes('emergency') || unit.includes('intensive')) criticalCareCount++;
        if (unit.includes('ethics') || unit.includes('leadership') || unit.includes('management') || unit.includes('law')) ethicsCount++;
        if (unit.includes('infection') || unit.includes('ipc')) ipcCount++;

        // Timing
        if (ans.answered_at) {
          const d = new Date(ans.answered_at);
          const hour = d.getHours();
          const day = d.getDay();
          if (hour < 6) dawnCount++;
          if (hour < 8) earlyCount++;
          if (hour >= 12 && hour < 14) lunchCount++;
          if (hour >= 17 && hour < 20) sundownCount++;
          if (hour >= 22 || hour < 4) nightCount++;
          if (hour >= 0 && hour < 4) midnightCount++;
          if (day === 0 || day === 6) weekendCount++;
        }
      }

      // Unit Specialty Badges
      checkAndAward('pharma_novice', pharmaCount >= 25);
      checkAndAward('pharma_warrior', pharmaCount >= 100);
      checkAndAward('pharma_specialist', pharmaCount >= 250);
      checkAndAward('pharma_legend', pharmaCount >= 500);

      checkAndAward('med_surg_novice', medSurgCount >= 25);
      checkAndAward('med_surg_master', medSurgCount >= 100);
      checkAndAward('med_surg_specialist', medSurgCount >= 250);
      checkAndAward('med_surg_legend', medSurgCount >= 500);

      checkAndAward('anatomy_explorer', anatomyCount >= 25);
      checkAndAward('anatomy_ace', anatomyCount >= 100);
      checkAndAward('anatomy_prodigy', anatomyCount >= 250);
      checkAndAward('anatomy_guru', anatomyCount >= 500);

      checkAndAward('midwife_novice', obgynCount >= 25);
      checkAndAward('obgyn_oracle', obgynCount >= 100);
      checkAndAward('labour_maestro', obgynCount >= 250);
      checkAndAward('master_midwife', obgynCount >= 500);

      checkAndAward('community_novice', communityCount >= 25);
      checkAndAward('community_champion', communityCount >= 100);
      checkAndAward('public_health_pioneer', communityCount >= 250);
      checkAndAward('epidemiologist', communityCount >= 500);

      checkAndAward('mind_seeker', mentalHealthCount >= 25);
      checkAndAward('mental_health_ally', mentalHealthCount >= 100);
      checkAndAward('psych_sentinel', mentalHealthCount >= 250);
      checkAndAward('master_of_mind', mentalHealthCount >= 500);

      checkAndAward('paeds_apprentice', paedsCount >= 25);
      checkAndAward('paeds_prodigy', paedsCount >= 100);
      checkAndAward('neonatal_guardian', paedsCount >= 250);
      checkAndAward('child_health_legend', paedsCount >= 500);

      checkAndAward('emergency_responder', criticalCareCount >= 25);
      checkAndAward('critical_care_ace', criticalCareCount >= 50);
      checkAndAward('trauma_resuscitator', criticalCareCount >= 100);

      checkAndAward('ethics_novice', ethicsCount >= 25);
      checkAndAward('ethics_sentinel', ethicsCount >= 50);
      checkAndAward('legal_eagle', ethicsCount >= 100);

      checkAndAward('clean_hands', ipcCount >= 25);
      checkAndAward('infection_control', ipcCount >= 50);
      checkAndAward('aseptic_champion', ipcCount >= 100);

      // Timing Badges
      checkAndAward('dawn_patrol', dawnCount >= 1);
      checkAndAward('early_bird', earlyCount >= 1);
      checkAndAward('lunch_learner', lunchCount >= 5);
      checkAndAward('sundown_study', sundownCount >= 5);
      checkAndAward('night_owl', nightCount >= 1);
      checkAndAward('midnight_ward', midnightCount >= 5);
      checkAndAward('weekend_warrior', weekendCount >= 50);
      checkAndAward('super_weekend', weekendCount >= 150);

      // Accuracy & In-a-Row Badges
      checkAndAward('hot_streak_10', maxCorrectStreak >= 10);
      checkAndAward('clinical_eye', maxCorrectStreak >= 20);
      checkAndAward('sharp_diagnostician', maxCorrectStreak >= 50);

      if (totalAnswers >= 50) {
        const accuracyPct = Math.round((correctCount / totalAnswers) * 100);
        checkAndAward('accuracy_80', accuracyPct >= 80);
      }
      if (totalAnswers >= 100) {
        const accuracyPct = Math.round((correctCount / totalAnswers) * 100);
        checkAndAward('accuracy_90', accuracyPct >= 90);
      }
    }

    // Evaluate Mock Exam Badges
    const { data: mocks, error: mocksError } = await (supabase.from('mock_exam_results') as any)
      .select('score_percentage, time_used_minutes, total_questions, paper, completed_at')
      .eq('student_id', userId);
      
    if (!mocksError && mocks && mocks.length > 0) {
      const mockCount = mocks.length;
      checkAndAward('first_mock', mockCount >= 1);
      checkAndAward('mock_two', mockCount >= 2);
      checkAndAward('mock_maestro', mockCount >= 3);
      checkAndAward('mock_veteran', mockCount >= 5);
      checkAndAward('exam_conqueror', mockCount >= 10);
      checkAndAward('exam_centurion', mockCount >= 25);

      const maxScore = Math.max(...mocks.map((m: any) => Number(m.score_percentage) || 0));
      checkAndAward('pass_master', maxScore >= 50);
      checkAndAward('first_class', maxScore >= 70);
      checkAndAward('clinical_precision', maxScore >= 80);
      checkAndAward('perfect_score', maxScore >= 90);
      checkAndAward('flawless_victory', maxScore >= 100);

      // Speed Demon check
      checkAndAward('speed_demon', (mocks as any[]).some(m => m.time_used_minutes <= (m.total_questions - 20)));
      checkAndAward('supersonic_nurse', (mocks as any[]).some(m => m.time_used_minutes <= (m.total_questions - 40)));

      // Paper types
      const papers = (mocks as any[]).map(m => (m.paper || '').toLowerCase());
      const p1Count = papers.filter(p => p.includes('paper i') || p.includes('paper 1')).length;
      const p2Count = papers.filter(p => p.includes('paper ii') || p.includes('paper 2')).length;
      checkAndAward('paper_1_specialist', p1Count >= 3);
      checkAndAward('paper_2_specialist', p2Count >= 3);
      checkAndAward('cadre_specialist', p1Count >= 1 && p2Count >= 1);

      // CBT endurance & night passes
      const totalExamMins = mocks.reduce((sum: number, m: any) => sum + (Number(m.time_used_minutes) || 0), 0);
      checkAndAward('cbt_endurance', totalExamMins >= 200);

      const hasNightPass = mocks.some((m: any) => {
        if (!m.completed_at || Number(m.score_percentage) < 50) return false;
        const h = new Date(m.completed_at).getHours();
        return h >= 20 || h < 4;
      });
      checkAndAward('pressure_proof', hasNightPass);
    }
    
    // Evaluate Flashcard Badges
    const { count: flashCount, error: flashError } = await (supabase.from('flashcard_progress') as any)
      .select('*', { count: 'exact', head: true })
      .eq('student_id', userId);
      
    if (!flashError && flashCount !== null) {
      checkAndAward('flashcard_novice', flashCount >= 10);
      checkAndAward('flashcard_newbie', flashCount >= 50);
      checkAndAward('flashcard_expert', flashCount >= 100);
      checkAndAward('flashcard_master', flashCount >= 200);
      checkAndAward('flashcard_addict', flashCount >= 500);
      checkAndAward('memory_champion', flashCount >= 1000);
    }

    // Evaluate Community & Revision Badges
    const { count: commCount, error: commError } = await (supabase.from('community_messages') as any)
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId);
    
    if (!commError && commCount !== null) {
      checkAndAward('first_post', commCount >= 1);
      checkAndAward('social_butterfly', commCount >= 5);
      checkAndAward('knowledge_sharer', commCount >= 15);
      checkAndAward('community_pillar', commCount >= 50);
    }

    // Study Groups
    const [createdGroupsRes, memberGroupsRes] = await Promise.all([
      supabase.from('study_groups').select('*', { count: 'exact', head: true }).eq('creator_id', userId),
      supabase.from('group_members').select('*', { count: 'exact', head: true }).eq('student_id', userId)
    ]);

    if (!createdGroupsRes.error && createdGroupsRes.count !== null) {
      checkAndAward('team_captain', createdGroupsRes.count >= 1);
    }
    if (!memberGroupsRes.error && memberGroupsRes.count !== null) {
      checkAndAward('squad_member', memberGroupsRes.count >= 1);
    }

    // Revision Plans
    const { count: planCount, error: planError } = await (supabase.from('revision_plans') as any)
      .select('*', { count: 'exact', head: true })
      .eq('student_id', userId);
    
    if (!planError && planCount !== null) {
      checkAndAward('revision_architect', planCount >= 1);
    }

    // Tutoring Sessions
    const { count: sessionCount, error: sessionError } = await (supabase.from('sessions') as any)
      .select('*', { count: 'exact', head: true })
      .eq('student_id', userId);
    
    if (!sessionError && sessionCount !== null) {
      checkAndAward('mentee_mindset', sessionCount >= 1);
      checkAndAward('mentorship_regular', sessionCount >= 3);
    }

    // Past Question Uploads
    const { count: uploadCount, error: uploadError } = await (supabase.from('question_uploads') as any)
      .select('*', { count: 'exact', head: true })
      .eq('student_id', userId);
    
    if (!uploadError && uploadCount !== null) {
      checkAndAward('past_paper_hero', uploadCount >= 1);
    }

    // Save newly earned badges to the database
    if (newlyEarnedIds.length > 0) {
      const insertData = newlyEarnedIds.map(b => ({ student_id: userId, badge_id: b }));
      const { error: insertError } = await (supabase.from('student_badges') as any)
        .upsert(insertData, { onConflict: 'student_id,badge_id', ignoreDuplicates: true });
      
      if (insertError) {
        console.error('Failed to save earned badges:', insertError);
      }
    }

  } catch (err) {
    console.error('Error evaluating badges:', err);
  }

  return newlyEarnedDefs;
}
