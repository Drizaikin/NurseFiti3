"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Spinner } from '@/components/ui/Spinner';
import toast from 'react-hot-toast';
import { BADGE_DEFS } from '@/lib/badges';



// XP thresholds per level
function xpForLevel(level: number) { return level <= 1 ? 0 : (level - 1) * 200 + (level - 2) * 100; }
function xpToNextLevel(level: number) { return level * 200 + (level - 1) * 100; }

interface StudentData {
  full_name: string;
  xp: number;
  level: number;
  streak_count: number;
  last_study_date: string | null;
}

interface LeaderboardEntry {
  id: string;
  full_name: string;
  xp: number;
  level: number;
  cadre: string;
  isMe?: boolean;
}

const KENYAN_NAMES = [
  "Brian Kamau", "Faith Wanjiru", "Kevin Ochieng", "Mercy Akinyi", 
  "Dennis Mutua", "Grace Muthoni", "Collins Kipkorir", "Cynthia Nekesa", 
  "Victor Omondi", "Diana Wanjiku", "Evans Njoroge", "Irene Nyambura",
  "Felix Odhiambo", "Sharon Njeri", "Ian Mwangi", "Joy Achieng",
  "Kelvin Otieno", "Christine Atieno", "Martin Maina", "Purity Awino",
  "Emmanuel Kipkemboi", "Gladys Ouma", "Eric Wamalwa", "Lilian Moraa",
  "Antony Kariuki", "Ruth Wawira", "Caleb Kiprop", "Dorcas Chebet",
  "Moses Omondi", "Susan Nduta", "Samuel Karanja", "Esther Wambui"
];

function generateSimulatedBots(leaderTab: 'alltime' | 'weekly'): LeaderboardEntry[] {
  const bots: LeaderboardEntry[] = [];
  const today = new Date();
  
  // Weekly simulation: resets on Monday
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; 
  
  // Create a seed based on the week number
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const diff = today.getTime() - startOfYear.getTime();
  const weekNumber = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  
  for (let i = 0; i < 15; i++) {
    // Deterministic random using weekNumber + i
    const seed = weekNumber * 100 + i;
    const rng = (seed * 9301 + 49297) % 233280; // Simple LCG PRNG
    const randomFloat = rng / 233280;
    
    const nameIndex = Math.floor(randomFloat * KENYAN_NAMES.length);
    const fullName = KENYAN_NAMES[nameIndex];
    
    // --- EXACTLY SYNCED WEEKLY XP CALCULATION ---
    let weeklyXp = rng % 30; // Start with a small baseline for the week
    for (let d = 0; d < daysSinceMonday; d++) {
      const daySeed = (seed * 13) + d * 97;
      const dayRng = (daySeed * 9301 + 49297) % 233280;
      const dayGain = Math.floor((dayRng / 233280) * 131) + 20; // 20-150 XP
      weeklyXp += dayGain;
    }
    
    // Today's fractional gain
    const todaySeed = (seed * 13) + daysSinceMonday * 97;
    const todayRng = (todaySeed * 9301 + 49297) % 233280;
    const todayMaxGain = Math.floor((todayRng / 233280) * 131) + 20;
    weeklyXp += Math.floor(today.getHours() * (todayMaxGain / 24));
    
    let xp = 0;
    let level = 1;
    
    if (leaderTab === 'weekly') {
      xp = weeklyXp;
      level = Math.floor(xp / 100) + 1; 
    } else {
      // All time
      // Realistic base scale (0 to 1200), plus incremental growth week over week
      const baseProgression = (weekNumber - 26) * 150; 
      const historicalXp = (rng % 1200) + Math.max(0, baseProgression);
      xp = historicalXp + weeklyXp;
      level = Math.floor(Math.sqrt(xp / 10)); 
    }
    
    bots.push({
      id: `bot-${i}`,
      full_name: fullName,
      xp,
      level: Math.max(1, level),
      cadre: (rng % 2 === 0) ? 'KRCHN' : 'BScN',
      isMe: false
    });
  }
  return bots;
}


export default function AchievementsPage() {
  const router = useRouter();
  const supabase = createClient();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderTab, setLeaderTab] = useState<'weekly' | 'alltime'>('alltime');
  const [isLoading, setIsLoading] = useState(true);
  const [streakDays, setStreakDays] = useState<Record<string, 'done' | 'missed' | 'today'>>({});

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [profileRes, studentRes, badgesRes] = await Promise.all([
        supabase.from('profiles').select('full_name').eq('id', user.id).single(),
        supabase.from('student_profiles').select('xp, level, streak_count, last_study_date, cadre').eq('id', user.id).single(),
        supabase.from('student_badges').select('badge_id').eq('student_id', user.id),
      ]);

      const profile = profileRes.data as { full_name: string } | null;
      const sp = studentRes.data as (StudentData & { cadre: string }) | null;
      if (!sp || !profile) { setIsLoading(false); return; }

      setStudent({ ...sp, full_name: profile.full_name });
      const initialEarned = new Set<string>((badgesRes.data ?? []).map((b: { badge_id: string }) => b.badge_id));
      setEarnedBadges(initialEarned);

      // Build streak calendar (last 31 days)
      const today = new Date().toISOString().split('T')[0];
      const { data: answerDays } = await supabase.from('student_answers')
        .select('answered_at').eq('student_id', user.id)
        .gte('answered_at', new Date(Date.now() - 31 * 86400000).toISOString());
      const studiedDays = new Set((answerDays ?? []).map((a: { answered_at: string }) => a.answered_at.split('T')[0]));
      const calendar: Record<string, 'done' | 'missed' | 'today'> = {};
      for (let i = 30; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = d.toISOString().split('T')[0];
        calendar[ds] = ds === today ? 'today' : studiedDays.has(ds) ? 'done' : 'missed';
      }
      setStreakDays(calendar);

      // Leaderboard
      await fetchLeaderboard('alltime');
      
      setIsLoading(false);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeaderboard = async (tab: 'alltime' | 'weekly') => {
    // Real users
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    let realUsers: LeaderboardEntry[] = [];
    
    if (tab === 'alltime') {
      const { data: lb } = await supabase.from('student_profiles')
        .select('id, xp, level, cadre').order('xp', { ascending: false }).limit(20);
      if (lb) {
        const ids = (lb as Array<any>).map(r => r.id);
        const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', ids);
        const nameMap = new Map((names ?? []).map((n: any) => [n.id, n.full_name]));
        realUsers = (lb as Array<any>).map((r) => ({
          id: r.id, full_name: nameMap.get(r.id) ?? 'Student', xp: r.xp, level: r.level, cadre: r.cadre,
          isMe: r.id === user.id,
        }));
      }
    } else {
      // Weekly leaderboard using the accurate RPC
      const { data: lb } = await supabase.rpc('get_weekly_leaderboard');
      if (lb) {
        realUsers = (lb as Array<any>).map((r) => ({
          id: r.id, 
          full_name: r.full_name ?? 'Student', 
          xp: Number(r.xp), 
          level: r.level, 
          cadre: r.cadre,
          isMe: r.id === user.id,
        }));
      }
    }

    // Blend with bots
    const simulatedBots = generateSimulatedBots(tab);
    
    // Merge, sort, and take top 20
    const combined = [...realUsers, ...simulatedBots];
    combined.sort((a, b) => b.xp - a.xp);
    
    setLeaderboard(combined.slice(0, 20));
  };

  const handleLeaderTabChange = (t: 'alltime' | 'weekly') => {
    setLeaderTab(t);
    fetchLeaderboard(t);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Spinner size="lg" color="primary" /></div>;
  if (!student) return null;

  const currentLevelXP = xpForLevel(student.level);
  const nextLevelXP = xpToNextLevel(student.level);
  const xpInLevel = student.xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const levelProgress = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold text-primary">Achievements</h1>

      {/* XP & Level card */}
      <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-dark font-heading font-bold text-3xl flex-shrink-0">
            {student.level}
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <p className="text-sm text-neutral-mid mb-1">Level {student.level}</p>
            <p className="text-2xl font-heading font-bold text-[var(--color-text)] mb-2">{student.xp.toLocaleString()} XP</p>
            <ProgressBar value={levelProgress} color="amber" showLabel={false} />
            <p className="text-xs text-neutral-mid mt-1">{xpInLevel} / {xpNeeded} XP to Level {student.level + 1}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl">🔥</p>
            <p className="text-2xl font-heading font-bold text-accent">{student.streak_count}</p>
            <p className="text-xs text-neutral-mid">day streak</p>
          </div>
        </div>
      </Card>

      {/* Streak calendar */}
      <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Study Streak — Last 31 Days</h2>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(streakDays).map(([day, status]) => (
            <div key={day} title={day}
              className={`w-7 h-7 rounded-md flex items-center justify-center text-xs transition-all ${
                status === 'today' ? 'bg-accent text-dark font-bold ring-2 ring-accent/50' :
                status === 'done'  ? 'bg-primary text-white' :
                'bg-neutral-border text-neutral-mid'
              }`}>
              {status === 'done' ? '✓' : status === 'today' ? '★' : ''}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-mid">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Studied</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent inline-block" /> Today</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-neutral-border inline-block" /> Missed</span>
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGE_DEFS.map(b => {
            const earned = earnedBadges.has(b.id);
            return (
              <div key={b.id} className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all ${earned ? 'border-accent bg-accent/5' : 'border-[var(--color-border)] opacity-50 grayscale'}`}>
                <span className="text-4xl mb-2">{b.icon}</span>
                <p className="font-semibold text-sm text-[var(--color-text)]">{b.name}</p>
                <p className="text-xs text-neutral-mid mt-1">{b.description}</p>
                {earned && <Badge variant="amber" size="sm" className="mt-2">Earned</Badge>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold">Leaderboard</h2>
          <div className="flex gap-1 bg-neutral-border rounded-lg p-1">
            {(['alltime', 'weekly'] as const).map(t => (
              <button key={t} onClick={() => handleLeaderTabChange(t)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${leaderTab === t ? 'bg-[var(--color-card)] text-primary shadow-sm' : 'text-neutral-mid'}`}>
                {t === 'alltime' ? 'All Time' : 'Weekly'}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {leaderboard.map((entry, i) => (
            <div key={entry.id} className={`flex items-center gap-3 p-3 rounded-xl ${entry.isMe ? 'bg-accent/10 border-2 border-accent/30' : 'bg-[var(--color-bg)]'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${i === 0 ? 'bg-accent text-dark' : i === 1 ? 'bg-neutral-mid text-white' : i === 2 ? 'bg-amber-700 text-white' : 'bg-neutral-border text-neutral-mid'}`}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--color-text)] truncate">{entry.full_name}{entry.isMe && ' (You)'}</p>
                <p className="text-xs text-neutral-mid">Level {entry.level} · {entry.cadre}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-accent">{entry.xp.toLocaleString()} XP</p>
              </div>
            </div>
          ))}
          {leaderboard.length === 0 && <p className="text-neutral-mid text-sm text-center py-6">No leaderboard data yet.</p>}
        </div>
      </Card>
    </div>
  );
}
