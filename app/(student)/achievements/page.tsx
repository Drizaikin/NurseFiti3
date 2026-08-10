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



// XP thresholds per level (100 XP per level)
function xpForLevel(level: number) { return (level - 1) * 100; }
function xpToNextLevel(level: number) { return 100; }

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

type BotPersona = 'steady' | 'bursty' | 'late_climber' | 'early_starter' | 'consistent';

const BOT_XP_MODEL_START = new Date('2026-08-10T00:00:00+03:00');
const MAX_DAILY_BOT_XP = 500;
const MAX_WEEKLY_BOT_XP = 3000;
const DAY_MS = 24 * 60 * 60 * 1000;

const BOT_PERSONAS: BotPersona[] = [
  'steady', 'bursty', 'late_climber', 'early_starter', 'consistent'
];

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

function dayKey(date: Date) {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function atStartOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getModelWeek(date: Date) {
  const elapsedDays = Math.max(0, Math.floor((atStartOfDay(date).getTime() - atStartOfDay(BOT_XP_MODEL_START).getTime()) / DAY_MS));
  return Math.floor(elapsedDays / 7);
}

function getWeekStart(date: Date) {
  const elapsedDays = Math.max(0, Math.floor((atStartOfDay(date).getTime() - atStartOfDay(BOT_XP_MODEL_START).getTime()) / DAY_MS));
  const result = atStartOfDay(BOT_XP_MODEL_START);
  result.setDate(result.getDate() + Math.floor(elapsedDays / 7) * 7);
  return result;
}

function getPersonaWeight(persona: BotPersona, dayIndex: number, random: number) {
  const base = 0.35 + random;
  if (persona === 'steady') return base;
  if (persona === 'bursty') return base * (random > 0.68 ? 2.5 : 0.42);
  if (persona === 'late_climber') return base * (dayIndex >= 4 ? 1.9 : 0.58);
  if (persona === 'early_starter') return base * (dayIndex <= 2 ? 1.9 : 0.58);
  return 0.8 + random * 0.45;
}

function getWeeklyTarget(botIndex: number, week: number, persona: BotPersona) {
  const ranges: Record<BotPersona, [number, number]> = {
    steady: [700, 1900], bursty: [250, 2700], late_climber: [500, 3000],
    early_starter: [350, 2500], consistent: [900, 2100],
  };
  const [minimum, maximum] = ranges[persona];
  const random = seededRandom((botIndex + 1) * 100003 + (week + 1) * 7919);
  return Math.min(MAX_WEEKLY_BOT_XP, minimum + Math.floor(random * (maximum - minimum + 1)));
}

// Allocate each week's target across seven changing daily scores. The capped redistribution
// prevents a single day exceeding 500 XP while preserving the planned weekly total.
function getWeeklyDailyGains(botIndex: number, week: number, persona: BotPersona) {
  const target = getWeeklyTarget(botIndex, week, persona);
  const weights = Array.from({ length: 7 }, (_, dayIndex) =>
    getPersonaWeight(persona, dayIndex, seededRandom((botIndex + 1) * 31337 + (week + 1) * 1009 + (dayIndex + 1) * 97))
  );
  const gains = Array<number>(7).fill(0);
  let remaining = target;
  let remainingIndices = Array.from({ length: 7 }, (_, index) => index);

  while (remainingIndices.length > 0 && remaining > 0) {
    const weightTotal = remainingIndices.reduce((sum, index) => sum + weights[index], 0);
    const capped: number[] = [];
    for (const index of remainingIndices) {
      const proposed = Math.floor(remaining * (weights[index] / weightTotal));
      const capacity = MAX_DAILY_BOT_XP - gains[index];
      const assigned = Math.min(capacity, proposed);
      gains[index] += assigned;
      if (assigned === capacity) capped.push(index);
    }
    const assignedTotal = gains.reduce((sum, gain) => sum + gain, 0);
    remaining = target - assignedTotal;
    if (capped.length === 0) {
      for (const index of remainingIndices) {
        if (remaining === 0) break;
        if (gains[index] < MAX_DAILY_BOT_XP) {
          gains[index] += 1;
          remaining -= 1;
        }
      }
      break;
    }
    remainingIndices = remainingIndices.filter(index => !capped.includes(index));
  }
  return gains;
}

function getNewModelDailyGain(botIndex: number, date: Date, now: Date, persona: BotPersona) {
  const weekStart = getWeekStart(date);
  const dayIndex = Math.max(0, Math.min(6, Math.floor((atStartOfDay(date).getTime() - weekStart.getTime()) / DAY_MS)));
  const gain = getWeeklyDailyGains(botIndex, getModelWeek(date), persona)[dayIndex];
  const isToday = dayKey(date) === dayKey(now);
  if (!isToday) return gain;
  const elapsedDay = Math.min(1, Math.max(0, (now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600) / 24));
  return Math.floor(gain * elapsedDay);
}

function getLegacyDailyGain(botIndex: number, date: Date, now: Date) {
  // Match the previous accelerated bot model exactly before the new model starts.
  const daySeed = dayKey(date) + botIndex * 13;
  const dayRng = (daySeed * 9301 + 49297) % 233280;
  const gain = Math.floor((dayRng / 233280) * 901) + 100;
  return dayKey(date) === dayKey(now)
    ? Math.floor(gain * Math.min(1, Math.max(0, (now.getHours() + now.getMinutes() / 60) / 24)))
    : gain;
}

function getDailyBotGain(botIndex: number, date: Date, now: Date, persona: BotPersona) {
  return atStartOfDay(date) >= atStartOfDay(BOT_XP_MODEL_START)
    ? getNewModelDailyGain(botIndex, date, now, persona)
    : getLegacyDailyGain(botIndex, date, now);
}

function getRollingWeeklyXp(botIndex: number, now: Date, persona: BotPersona) {
  let xp = 0;
  const firstDay = atStartOfDay(now);
  firstDay.setDate(firstDay.getDate() - 6);
  for (let index = 0; index < 7; index++) {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + index);
    xp += getDailyBotGain(botIndex, date, now, persona);
  }
  return Math.min(MAX_WEEKLY_BOT_XP, xp);
}

function getLegacyAllTimeXpAtModelStart(botIndex: number) {
  // Preserve exactly the existing all-time model through 9 August 2026.
  const snapshot = new Date(BOT_XP_MODEL_START);
  snapshot.setDate(snapshot.getDate() - 1);
  snapshot.setHours(23, 59, 59, 999);
  const seed = 25 * 100 + botIndex;
  const rng = (seed * 9301 + 49297) % 233280;
  const startOfYear = new Date(snapshot.getFullYear(), 0, 1);
  const exactWeeks = (snapshot.getTime() - startOfYear.getTime()) / (7 * DAY_MS);
  const boostDate = new Date('2026-08-01T00:00:00+03:00');
  const cutoffWeeks = (boostDate.getTime() - startOfYear.getTime()) / (7 * DAY_MS);
  const weeksBeforeCutoff = Math.max(0, Math.min(exactWeeks, cutoffWeeks) - 25);
  const weeksAfterCutoff = Math.max(0, exactWeeks - Math.max(25, cutoffWeeks));
  const smoothProgression = weeksBeforeCutoff * 150 + weeksAfterCutoff * 2500;
  let weeklyXp = rng % 30;
  for (let offset = 6; offset > 0; offset--) {
    const date = new Date(snapshot);
    date.setDate(snapshot.getDate() - offset);
    weeklyXp += getLegacyDailyGain(botIndex, date, snapshot);
  }
  weeklyXp += getLegacyDailyGain(botIndex, snapshot, snapshot);
  return Math.floor((rng % 1200) + smoothProgression + weeklyXp);
}

function getAllTimeBotXp(botIndex: number, now: Date, persona: BotPersona) {
  const baseline = getLegacyAllTimeXpAtModelStart(botIndex);
  let newModelXp = 0;
  for (let date = atStartOfDay(BOT_XP_MODEL_START); date <= atStartOfDay(now); date.setDate(date.getDate() + 1)) {
    newModelXp += getNewModelDailyGain(botIndex, date, now, persona);
  }
  return baseline + newModelXp;
}

function generateSimulatedBots(leaderTab: 'alltime' | 'weekly'): LeaderboardEntry[] {
  const now = new Date();
  const fixedWeekNumber = 25;
  return Array.from({ length: 15 }, (_, index) => {
    const seed = fixedWeekNumber * 100 + index;
    const rng = (seed * 9301 + 49297) % 233280;
    const persona = BOT_PERSONAS[index % BOT_PERSONAS.length];
    const weeklyXp = getRollingWeeklyXp(index, now, persona);
    const xp = leaderTab === 'weekly' ? weeklyXp : getAllTimeBotXp(index, now, persona);
    return {
      id: `bot-${index}`,
      full_name: KENYAN_NAMES[Math.floor((rng / 233280) * KENYAN_NAMES.length)],
      xp,
      level: Math.max(1, Math.floor(xp / 100) + 1),
      cadre: rng % 2 === 0 ? 'KRCHN' : 'BScN',
      isMe: false,
    };
  });
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
      const studiedDays = new Set((answerDays ?? []).map((a: { answered_at: string }) => {
        if (!a.answered_at) return null;
        return a.answered_at.split('T')[0];
      }).filter(Boolean));
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
      if (lb && (lb as Array<any>).length > 0) {
        const ids = (lb as Array<any>).map(r => r.id);
        const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', ids);
        const nameMap = new Map((names ?? []).map((n: any) => [n.id, n.full_name]));
        realUsers = (lb as Array<any>).map((r) => ({
          id: r.id, full_name: nameMap.get(r.id) ?? 'Student', xp: Number(r.xp || 0), level: r.level, cadre: r.cadre,
          isMe: r.id === user.id,
        }));
      }
    } else {
      // Weekly leaderboard using the accurate RPC
      const { data: lb } = await supabase.rpc('get_weekly_leaderboard');
      if (lb && (lb as Array<any>).length > 0) {
        const ids = (lb as Array<any>).map(r => r.id);
        const { data: names } = await supabase.from('profiles').select('id, full_name').in('id', ids);
        const nameMap = new Map((names ?? []).map((n: any) => [n.id, n.full_name]));
        realUsers = (lb as Array<any>).map((r) => ({
          id: r.id, 
          full_name: nameMap.get(r.id) ?? 'Student', 
          xp: Number(r.xp || 0), 
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

  const currentLevelXP = student.xp % 100;
  const nextLevelXP = 100;
  const levelProgress = Math.min(100, Math.max(0, (currentLevelXP / nextLevelXP) * 100));

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
            <p className="text-xs text-neutral-mid mt-1">{currentLevelXP} / {nextLevelXP} XP to Level {student.level + 1}</p>
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
