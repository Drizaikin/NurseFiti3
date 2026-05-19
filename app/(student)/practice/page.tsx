"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { MCQCard } from '@/components/student/MCQCard';

interface Question {
  id: string;
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  rationale: string;
  rationale_a?: string;
  rationale_b?: string;
  rationale_c?: string;
  rationale_d?: string;
  unit: string;
  topic: string;
  difficulty: string;
  cadre: string;
}

interface PracticeSession {
  questionsAnswered: number;
  correctAnswers: number;
  xpEarned: number;
}

export default function PracticePage() {
  const router = useRouter();
  const supabase = createClient();

  const [studentCadre, setStudentCadre] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [session, setSession] = useState<PracticeSession>({
    questionsAnswered: 0,
    correctAnswers: 0,
    xpEarned: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [units, setUnits] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('student_profiles')
        .select('cadre')
        .eq('id', user.id)
        .single();

      if (profile) {
        setStudentCadre(profile.cadre);
        await fetchUnits(profile.cadre);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnits = async (cadre: string) => {
    try {
      const { data } = await supabase
        .from('questions')
        .select('unit')
        .eq('cadre', cadre)
        .eq('status', 'approved');

      if (data) {
        const uniqueUnits = Array.from(new Set(data.map(q => q.unit)));
        setUnits(uniqueUnits);
      }
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const startPractice = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('questions')
        .select('*')
        .eq('cadre', studentCadre)
        .eq('status', 'approved');

      if (selectedUnit !== 'all') {
        query = query.eq('unit', selectedUnit);
      }

      if (selectedDifficulty !== 'all') {
        query = query.eq('difficulty', selectedDifficulty);
      }

      const { data, error } = await query.limit(20);

      if (error) {
        console.error('Error fetching questions:', error);
        return;
      }

      if (!data || data.length === 0) {
        alert('No questions available for the selected filters. Try different filters.');
        return;
      }

      // Shuffle questions
      const shuffled = data.sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setShowFilters(false);
      setSession({
        questionsAnswered: 0,
        correctAnswers: 0,
        xpEarned: 0,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (questionId: string, selectedOption: string, isCorrect: boolean, timeTaken: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Store answer in database
      await supabase.from('student_answers').insert({
        student_id: user.id,
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
        time_taken_seconds: timeTaken,
        mode: 'practice',
      });

      // Update session stats
      const xpGained = isCorrect ? 5 : 0;
      setSession(prev => ({
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        xpEarned: prev.xpEarned + xpGained,
      }));

      // Update student XP and streak
      if (isCorrect) {
        const { data: currentProfile } = await supabase
          .from('student_profiles')
          .select('xp, level, last_study_date, streak_count')
          .eq('id', user.id)
          .single();

        if (currentProfile) {
          const today = new Date().toISOString().split('T')[0];
          const lastStudyDate = currentProfile.last_study_date;
          let newStreak = currentProfile.streak_count;

          // Update streak
          if (lastStudyDate) {
            const daysDiff = Math.floor(
              (new Date(today).getTime() - new Date(lastStudyDate).getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysDiff === 1) {
              newStreak += 1; // Continue streak
            } else if (daysDiff > 1) {
              newStreak = 1; // Reset streak
            }
            // If daysDiff === 0, keep current streak
          } else {
            newStreak = 1; // First study day
          }

          const newXP = currentProfile.xp + xpGained;
          const newLevel = Math.floor(newXP / 100) + 1;

          await supabase
            .from('student_profiles')
            .update({
              xp: newXP,
              level: newLevel,
              streak_count: newStreak,
              last_study_date: today,
            })
            .eq('id', user.id);
        }
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End practice session
      setShowFilters(true);
      setQuestions([]);
    }
  };

  const handleEndSession = () => {
    setShowFilters(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Show filters
  if (showFilters || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-heading font-bold text-primary mb-2">
            Practice Questions
          </h1>
          <p className="text-neutral-mid">
            Select your preferences and start practicing
          </p>
        </div>

        {/* Session Summary (if completed) */}
        {session.questionsAnswered > 0 && (
          <Card className="mb-6 bg-primary/5 dark:bg-primary/10 border-primary/20">
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              Session Complete! 🎉
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{session.questionsAnswered}</p>
                <p className="text-sm text-neutral-mid">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{session.correctAnswers}</p>
                <p className="text-sm text-neutral-mid">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">+{session.xpEarned}</p>
                <p className="text-sm text-neutral-mid">XP Earned</p>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <h2 className="text-xl font-heading font-bold text-primary mb-4">
            Practice Settings
          </h2>

          <div className="space-y-4">
            {/* Cadre Display */}
            <div>
              <label className="block text-sm font-semibold mb-2">Your Cadre</label>
              <Badge variant="primary" size="lg">{studentCadre}</Badge>
            </div>

            {/* Unit Filter */}
            <div>
              <label htmlFor="unit" className="block text-sm font-semibold mb-2">
                Select Unit
              </label>
              <select
                id="unit"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="input"
              >
                <option value="all">All Units</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-semibold mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="input"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Start Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={startPractice}
              className="w-full"
            >
              Start Practice Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show practice session
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary mb-1">
            Practice Session
          </h1>
          <p className="text-sm text-neutral-mid">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <Button variant="ghost" onClick={handleEndSession}>
          End Session
        </Button>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-primary">{session.questionsAnswered}</p>
          <p className="text-xs text-neutral-mid">Answered</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-success">{session.correctAnswers}</p>
          <p className="text-xs text-neutral-mid">Correct</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-accent">+{session.xpEarned}</p>
          <p className="text-xs text-neutral-mid">XP</p>
        </Card>
      </div>

      {/* Question */}
      <MCQCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        showFeedback={true}
      />

      {/* Next Button */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Session'}
        </Button>
      </div>
    </div>
  );
}
