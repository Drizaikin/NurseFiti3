"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

interface Question {
  id: string;
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  rationale: string;
  unit: string;
  topic: string;
}

interface Answer {
  question_id: string;
  selected_option: string;
  is_correct: boolean;
  time_taken_seconds: number;
}

export default function OnboardingQuizPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [studentCadre, setStudentCadre] = useState<string>('');

  useEffect(() => {
    fetchQuestionsAndProfile();
  }, []);

  const fetchQuestionsAndProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch student profile to get cadre
      const { data: profile, error: profileError } = await supabase
        .from('student_profiles')
        .select('cadre')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        console.error('Error fetching profile:', profileError);
        router.push('/dashboard');
        return;
      }

      setStudentCadre(profile.cadre);

      // Fetch 10 random questions for the student's cadre
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('cadre', profile.cadre)
        .eq('status', 'approved')
        .limit(10);

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        return;
      }

      // Shuffle questions
      const shuffled = questionsData?.sort(() => Math.random() - 0.5) || [];
      setQuestions(shuffled.slice(0, 10));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedOption === currentQuestion.correct_option;

    // Store answer
    const newAnswer: Answer = {
      question_id: currentQuestion.id,
      selected_option: selectedOption,
      is_correct: isCorrect,
      time_taken_seconds: timeTaken,
    };

    setAnswers([...answers, newAnswer]);

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setQuestionStartTime(Date.now());
    } else {
      submitQuiz([...answers, newAnswer]);
    }
  };

  const submitQuiz = async (finalAnswers: Answer[]) => {
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Calculate performance
      const correctCount = finalAnswers.filter(a => a.is_correct).length;
      const scorePercentage = (correctCount / questions.length) * 100;

      // Store all answers in database
      const answersToInsert = finalAnswers.map(answer => ({
        student_id: user.id,
        question_id: answer.question_id,
        selected_option: answer.selected_option,
        is_correct: answer.is_correct,
        time_taken_seconds: answer.time_taken_seconds,
        mode: 'onboarding',
      }));

      const { error: answersError } = await supabase
        .from('student_answers')
        .insert(answersToInsert);

      if (answersError) {
        console.error('Error storing answers:', answersError);
      }

      // Award XP for completing onboarding (50 XP + 5 XP per correct answer)
      const xpEarned = 50 + (correctCount * 5);

      const { error: xpError } = await supabase
        .from('student_profiles')
        .update({
          xp: xpEarned,
          last_study_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', user.id);

      if (xpError) {
        console.error('Error updating XP:', xpError);
      }

      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-cream dark:bg-dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            No Questions Available
          </h2>
          <p className="text-neutral-mid mb-6">
            We couldn&apos;t find any questions for your cadre. Please contact support.
          </p>
          <Button variant="primary" onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const correctCount = answers.filter(a => a.is_correct).length;
    const scorePercentage = (correctCount / questions.length) * 100;
    const xpEarned = 50 + (correctCount * 5);

    return (
      <div className="min-h-screen bg-neutral-cream dark:bg-dark py-8 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <Card>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                Diagnostic Quiz Complete!
              </h1>
              <p className="text-neutral-mid mb-6">
                Great job completing your baseline assessment
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                  <p className="text-sm text-neutral-mid mb-1">Score</p>
                  <p className="text-3xl font-bold text-primary">
                    {scorePercentage.toFixed(0)}%
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                  <p className="text-sm text-neutral-mid mb-1">Correct Answers</p>
                  <p className="text-3xl font-bold text-accent">
                    {correctCount}/{questions.length}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-neutral-mid mb-1">XP Earned</p>
                  <p className="text-3xl font-bold text-success">
                    +{xpEarned}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-primary mb-3">
                  Your Baseline Performance
                </h3>
                <p className="text-sm text-neutral-dark dark:text-neutral-light mb-4">
                  {scorePercentage >= 70
                    ? "Excellent start! You have a strong foundation. Keep practicing to maintain your edge."
                    : scorePercentage >= 50
                    ? "Good effort! You have a decent foundation. Focus on your weak areas to improve."
                    : "Don't worry! Everyone starts somewhere. Use our practice tools to build your knowledge."}
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Next Steps:</strong>
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Review your performance in the Analytics section</li>
                    <li>• Start practicing with topic-specific questions</li>
                    <li>• Use flashcards for quick revision</li>
                    <li>• Consider booking a tutor session for personalized help</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleFinish}
                className="w-full md:w-auto"
              >
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-cream dark:bg-dark py-8 px-4">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary">
                Diagnostic Quiz
              </h1>
              <p className="text-sm text-neutral-mid">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <Badge variant="primary" size="lg">
              {studentCadre}
            </Badge>
          </div>
          <ProgressBar percentage={progress} />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-3">
              {currentQuestion.unit} • {currentQuestion.topic}
            </Badge>
            <h2 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light leading-relaxed">
              {currentQuestion.stem}
            </h2>
          </div>

          <div className="space-y-3">
            {['A', 'B', 'C', 'D'].map((option) => {
              const optionText = currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string;
              const isSelected = selectedOption === option;

              return (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-neutral-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0 ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-neutral-border text-neutral-mid'
                      }`}
                    >
                      {option}
                    </div>
                    <p className="text-neutral-dark dark:text-neutral-light pt-1">
                      {optionText}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-mid">
            {selectedOption ? 'Click Next to continue' : 'Select an answer to continue'}
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!selectedOption || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner size="sm" color="white" className="mr-2" />
                Submitting...
              </>
            ) : currentQuestionIndex === questions.length - 1 ? (
              'Finish Quiz'
            ) : (
              'Next Question →'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
