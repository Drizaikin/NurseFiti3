"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Spinner } from '@/components/ui/Spinner';

interface DashboardData {
  student: {
    full_name: string;
    cadre: string;
    specialty?: string;
    exam_date: string;
    exam_cycle: string;
    xp: number;
    level: number;
    streak_count: number;
    last_study_date?: string;
  };
  stats: {
    total_questions_answered: number;
    correct_answers: number;
    accuracy_percentage: number;
    total_study_time_minutes: number;
    mock_exams_taken: number;
    flashcards_reviewed: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
  upcomingSessions: Array<{
    id: string;
    tutor_name: string;
    session_date: string;
    start_time: string;
    topic: string;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch student profile
      const { data: profileDataRaw } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      const profileData = profileDataRaw as { full_name: string } | null;

      const { data: studentDataRaw } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const studentData = studentDataRaw as {
        cadre: string;
        specialty?: string;
        exam_date: string;
        exam_cycle: string;
        xp: number;
        level: number;
        streak_count: number;
        last_study_date?: string;
      } | null;

      if (!studentData) {
        router.push('/onboarding');
        return;
      }

      // Fetch answer statistics
      const { data: answersDataRaw } = await supabase
        .from('student_answers')
        .select('is_correct, time_taken_seconds')
        .eq('student_id', user.id);

      const answersData = answersDataRaw as Array<{ is_correct: boolean; time_taken_seconds: number | null }> | null;

      const totalAnswers = answersData?.length || 0;
      const correctAnswers = answersData?.filter(a => a.is_correct).length || 0;
      const accuracyPercentage = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
      const totalStudyTime = answersData?.reduce((sum, a) => sum + (a.time_taken_seconds || 0), 0) || 0;

      // Fetch mock exam count
      const { data: mockExamsDataRaw } = await supabase
        .from('mock_exam_results')
        .select('id')
        .eq('student_id', user.id);

      const mockExamsData = mockExamsDataRaw as Array<{ id: string }> | null;

      // Fetch flashcard progress count
      const { data: flashcardsDataRaw } = await supabase
        .from('flashcard_progress')
        .select('id')
        .eq('student_id', user.id);

      const flashcardsData = flashcardsDataRaw as Array<{ id: string }> | null;

      // Fetch upcoming sessions
      const { data: sessionsDataRaw } = await supabase
        .from('sessions')
        .select(`
          id,
          session_date,
          start_time,
          topic,
          tutor:tutor_id (
            full_name
          )
        `)
        .eq('student_id', user.id)
        .eq('status', 'confirmed')
        .gte('session_date', new Date().toISOString().split('T')[0])
        .order('session_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(3);

      const sessionsData = sessionsDataRaw as Array<{
        id: string;
        session_date: string;
        start_time: string;
        topic: string | null;
        tutor: { full_name: string } | null;
      }> | null;

      const dashboardData: DashboardData = {
        student: {
          full_name: profileData?.full_name || '',
          cadre: studentData.cadre,
          specialty: studentData.specialty,
          exam_date: studentData.exam_date,
          exam_cycle: studentData.exam_cycle,
          xp: studentData.xp || 0,
          level: studentData.level || 1,
          streak_count: studentData.streak_count || 0,
          last_study_date: studentData.last_study_date,
        },
        stats: {
          total_questions_answered: totalAnswers,
          correct_answers: correctAnswers,
          accuracy_percentage: accuracyPercentage,
          total_study_time_minutes: Math.floor(totalStudyTime / 60),
          mock_exams_taken: mockExamsData?.length || 0,
          flashcards_reviewed: flashcardsData?.length || 0,
        },
        recentActivity: [],
        upcomingSessions: sessionsData?.map(s => ({
          id: s.id,
          tutor_name: s.tutor?.full_name || 'Unknown',
          session_date: s.session_date,
          start_time: s.start_time,
          topic: s.topic || 'General Session',
        })) || [],
      };

      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <p className="text-error mb-4">Failed to load dashboard data</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  const daysUntilExam = Math.ceil(
    (new Date(data.student.exam_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const xpToNextLevel = data.student.level * 100;
  const xpProgress = (data.student.xp % 100) / xpToNextLevel * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          Welcome back, {data.student.full_name.split(' ')[0]}! 👋
        </h1>
        <p className="text-neutral-mid">
          {daysUntilExam > 0
            ? `${daysUntilExam} days until your ${data.student.exam_cycle} NCK exam`
            : 'Your exam is coming up soon!'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-teal-200 dark:border-teal-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-mid mb-1">Level</p>
              <p className="text-3xl font-bold text-primary">{data.student.level}</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
          <div className="mt-3">
            <ProgressBar percentage={xpProgress} size="sm" />
            <p className="text-xs text-neutral-mid mt-1">
              {data.student.xp % 100} / {xpToNextLevel} XP
            </p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-mid mb-1">Streak</p>
              <p className="text-3xl font-bold text-accent">{data.student.streak_count}</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
          <p className="text-xs text-neutral-mid mt-3">
            {data.student.streak_count > 0 ? 'Keep it going!' : 'Start your streak today!'}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-mid mb-1">Accuracy</p>
              <p className="text-3xl font-bold text-success">
                {data.stats.accuracy_percentage.toFixed(0)}%
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
          <p className="text-xs text-neutral-mid mt-3">
            {data.stats.correct_answers} / {data.stats.total_questions_answered} correct
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-mid mb-1">Study Time</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {data.stats.total_study_time_minutes}
              </p>
            </div>
            <div className="text-4xl">⏱️</div>
          </div>
          <p className="text-xs text-neutral-mid mt-3">minutes total</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/practice">
                <Button variant="primary" className="w-full justify-start">
                  <span className="text-xl mr-3">📝</span>
                  Practice Questions
                </Button>
              </Link>
              <Link href="/mock-exam">
                <Button variant="secondary" className="w-full justify-start">
                  <span className="text-xl mr-3">⏱️</span>
                  Take Mock Exam
                </Button>
              </Link>
              <Link href="/flashcards">
                <Button variant="outline" className="w-full justify-start">
                  <span className="text-xl mr-3">🎴</span>
                  Review Flashcards
                </Button>
              </Link>
              <Link href="/tutors">
                <Button variant="outline" className="w-full justify-start">
                  <span className="text-xl mr-3">👨‍🏫</span>
                  Find a Tutor
                </Button>
              </Link>
            </div>
          </Card>

          {/* Progress Overview */}
          <Card>
            <h2 className="text-xl font-heading font-bold text-primary mb-4">
              Your Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Questions Answered</span>
                  <span className="text-sm text-neutral-mid">
                    {data.stats.total_questions_answered}
                  </span>
                </div>
                <ProgressBar
                  percentage={Math.min((data.stats.total_questions_answered / 500) * 100, 100)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Mock Exams Completed</span>
                  <span className="text-sm text-neutral-mid">
                    {data.stats.mock_exams_taken}
                  </span>
                </div>
                <ProgressBar
                  percentage={Math.min((data.stats.mock_exams_taken / 10) * 100, 100)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Flashcards Reviewed</span>
                  <span className="text-sm text-neutral-mid">
                    {data.stats.flashcards_reviewed}
                  </span>
                </div>
                <ProgressBar
                  percentage={Math.min((data.stats.flashcards_reviewed / 200) * 100, 100)}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Exam Info */}
          <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
            <h3 className="font-heading font-bold text-primary mb-3">
              Exam Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-mid">Cadre:</span>
                <Badge variant="primary">{data.student.cadre}</Badge>
              </div>
              {data.student.specialty && (
                <div className="flex justify-between">
                  <span className="text-neutral-mid">Specialty:</span>
                  <span className="font-semibold">{data.student.specialty}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-mid">Exam Date:</span>
                <span className="font-semibold">
                  {new Date(data.student.exam_date).toLocaleDateString('en-KE', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-mid">Cycle:</span>
                <span className="font-semibold">{data.student.exam_cycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-mid">Days Left:</span>
                <span className="font-bold text-primary">{daysUntilExam}</span>
              </div>
            </div>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <h3 className="font-heading font-bold text-primary mb-3">
              Upcoming Sessions
            </h3>
            {data.upcomingSessions.length > 0 ? (
              <div className="space-y-3">
                {data.upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 bg-neutral-cream dark:bg-dark rounded-lg"
                  >
                    <p className="font-semibold text-sm mb-1">{session.tutor_name}</p>
                    <p className="text-xs text-neutral-mid mb-1">{session.topic}</p>
                    <p className="text-xs text-neutral-light">
                      {new Date(session.session_date).toLocaleDateString('en-KE', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      at {session.start_time}
                    </p>
                  </div>
                ))}
                <Link href="/bookings">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Bookings
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-neutral-mid mb-3">
                  No upcoming sessions
                </p>
                <Link href="/tutors">
                  <Button variant="primary" size="sm">
                    Book a Tutor
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
