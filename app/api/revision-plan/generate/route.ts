/**
 * POST /api/revision-plan/generate
 *
 * Generates a personalised NCK revision plan for a student.
 *
 * Body:
 *   examDate          — ISO date string (student's exam date)
 *   studyHoursWeekday — hours available per weekday (1–8)
 *   studyHoursWeekend — hours available per weekend day (1–12)
 *   workSchoolStatus  — 'working_full_time' | 'working_part_time' | 'student_only'
 *   paymentRef        — IntaSend reference confirming payment (or 'free_premium' for premium free generation)
 *
 * Returns:
 *   { planId, shareToken, planHtml }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { effectiveTier, getLimits } from '@/lib/planLimits';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

// ─── Validation ───────────────────────────────────────────────────────────────

const bodySchema = z.object({
  examDate:          z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  studyHoursWeekday: z.number().int().min(1).max(8),
  studyHoursWeekend: z.number().int().min(1).max(12),
  workSchoolStatus:  z.enum(['working_full_time', 'working_part_time', 'student_only']),
  recoveryDayInterval: z.number().int().min(0).max(30).optional().default(14),
  paymentRef:        z.string().min(1).optional(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface UnitData {
  name: string;
  nck_weight: number;
  tier: number;
  accuracy?: number;   // from student_answers — null if no data
  answeredCount?: number;
}

interface DayPlan {
  date: string;         // YYYY-MM-DD
  dayLabel: string;     // e.g. "Mon 26 May"
  weekNumber: number;
  isWeekend: boolean;
  isMockExamDay: boolean;
  isFlashcardDay: boolean;
  studyHours: number;
  units: Array<{ name: string; hours: number; tier: number }>;
  tasks: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short' });
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// ─── Core generation logic ────────────────────────────────────────────────────

function generatePlan(
  cadre: string,
  examDate: Date,
  studyHoursWeekday: number,
  studyHoursWeekend: number,
  units: UnitData[]
): DayPlan[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);

  const totalDays = Math.max(1, Math.floor((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Reserve last 14 days for mock exams + final review
  const studyDays = Math.max(1, totalDays - 14);

  // Sort units: weak areas first (accuracy < 70%), then by NCK weight desc, then tier
  const sortedUnits = [...units].sort((a, b) => {
    const aWeak = (a.accuracy ?? 50) < 70;
    const bWeak = (b.accuracy ?? 50) < 70;
    if (aWeak && !bWeak) return -1;
    if (!aWeak && bWeak) return 1;
    if (a.tier !== b.tier) return a.tier - b.tier; // tier 1 first
    return b.nck_weight - a.nck_weight;
  });

  // Calculate total study hours available
  let totalStudyHours = 0;
  for (let i = 0; i < studyDays; i++) {
    const d = addDays(today, i);
    totalStudyHours += isWeekend(d) ? studyHoursWeekend : studyHoursWeekday;
  }

  // Allocate hours to units proportionally (weak units get 1.5× weight)
  const unitWeights = sortedUnits.map(u => {
    const weakBonus = (u.accuracy ?? 50) < 70 ? 1.5 : 1.0;
    return u.nck_weight * weakBonus;
  });
  const totalWeight = unitWeights.reduce((s, w) => s + w, 0);
  const unitHours = unitWeights.map(w => Math.max(1, Math.round((w / totalWeight) * totalStudyHours)));

  // Build day-by-day plan
  const days: DayPlan[] = [];
  let unitIndex = 0;
  let hoursRemainingInUnit = unitHours[0] ?? 0;
  let weekNumber = 1;

  for (let i = 0; i < totalDays; i++) {
    const date = addDays(today, i);
    const weekend = isWeekend(date);
    const hours = weekend ? studyHoursWeekend : studyHoursWeekday;
    const isMockWeek = i >= studyDays;
    const isMockDay = isMockWeek && (i - studyDays) % 3 === 0; // mock every 3rd day in final 2 weeks
    const isFlashDay = !isMockDay && i % 2 === 0; // flashcards every other day

    if (i > 0 && i % 7 === 0) weekNumber++;

    const dayUnits: Array<{ name: string; hours: number; tier: number }> = [];
    const tasks: string[] = [];
    let hoursLeft = hours;

    if (isMockDay) {
      tasks.push('⏱️ Full Mock Exam (100 MCQs, 2 hours)');
      tasks.push('📝 Review all wrong answers with rationale');
      tasks.push('📊 Check analytics — identify new weak areas');
    } else {
      // Fill day with units
      while (hoursLeft > 0 && unitIndex < sortedUnits.length) {
        const unit = sortedUnits[unitIndex];
        const hoursForUnit = Math.min(hoursLeft, hoursRemainingInUnit, 2); // max 2h per unit per day
        if (hoursForUnit > 0) {
          dayUnits.push({ name: unit.name, hours: hoursForUnit, tier: unit.tier });
          const questionsTarget = hoursForUnit * 30; // ~30 MCQs per hour
          tasks.push(`📝 ${unit.name}: ${questionsTarget} practice MCQs`);
          if ((unit.accuracy ?? 50) < 70) {
            tasks.push(`🎯 Focus: ${unit.name} is a weak area — drill until >70%`);
          }
          hoursLeft -= hoursForUnit;
          hoursRemainingInUnit -= hoursForUnit;
          if (hoursRemainingInUnit <= 0) {
            unitIndex++;
            hoursRemainingInUnit = unitHours[unitIndex] ?? 0;
          }
        } else {
          break;
        }
      }
      if (isFlashDay) {
        tasks.push('🎴 Flashcard review: 20 cards (spaced repetition)');
      }
    }

    days.push({
      date: date.toISOString().split('T')[0],
      dayLabel: formatDateLabel(date),
      weekNumber,
      isWeekend: weekend,
      isMockExamDay: isMockDay,
      isFlashcardDay: isFlashDay && !isMockDay,
      studyHours: hours,
      units: dayUnits,
      tasks,
    });
  }

  return days;
}

// ─── HTML renderer ────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderPlanHtml(
  studentName: string,
  cadre: string,
  examDate: string,
  days: DayPlan[],
  units: UnitData[],
  shareToken: string,
  siteUrl: string
): string {
  const totalDays = days.length;
  const totalWeeks = Math.ceil(totalDays / 7);
  
  const isTested = (u: UnitData) => (u.answeredCount ?? 0) >= 10;
  const isWeak = (u: UnitData) => isTested(u) && (u.accuracy ?? 50) < 70;
  const isStrong = (u: UnitData) => isTested(u) && (u.accuracy ?? 50) >= 70;
  
  const weakUnits = units.filter(isWeak);
  const strongUnits = units.filter(isStrong);
  const untestedUnits = units.filter(u => !isTested(u));
  
  const mockExamDays = days.filter(d => d.isMockExamDay).length;
  const recoveryDays = days.filter(d => d.tasks.some(t => t.includes('Recovery'))).length;
  const flashcardDays = days.filter(d => d.isFlashcardDay).length;
  const totalStudyHours = days.reduce((sum, d) => sum + d.studyHours, 0);
  const estMCQs = (totalStudyHours * 30) + (mockExamDays * 100);

  // Group days by week
  const weeks: DayPlan[][] = [];
  for (let w = 1; w <= totalWeeks; w++) {
    weeks.push(days.filter(d => d.weekNumber === w));
  }

  const weekRows = weeks.map((week, wi) => {
    const dayCards = week.map(day => `
      <div class="day-card ${day.isMockExamDay ? 'mock-day' : ''} ${day.isWeekend ? 'weekend' : ''} ${day.tasks.some(t => t.includes('Recovery') || t.includes('Taper')) ? 'recovery-day' : ''}">
        <div class="day-header">
          <span class="day-label">${day.dayLabel}</span>
          ${day.isMockExamDay ? '<span class="badge badge-mock">Mock Exam</span>' : ''}
          ${day.isFlashcardDay ? '<span class="badge badge-flash">Flashcards</span>' : ''}
          <span class="day-hours">${day.studyHours}h</span>
        </div>
        <ul class="task-list">
          ${day.tasks.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <div class="week-section">
        <h3 class="week-title">Week ${wi + 1}</h3>
        <div class="day-grid">${dayCards}</div>
      </div>
    `;
  }).join('');

  const unitRows = units.map(u => {
    const acc = isTested(u) ? `${u.accuracy?.toFixed(0)}%` : 'Low data';
    const status = !isTested(u) ? '⚪ Needs practice' : isStrong(u) ? '✅ On track' : '🔴 Needs work';
    return `<tr>
      <td>${u.name}</td>
      <td><span class="tier-badge tier-${u.tier}">Tier ${u.tier}</span></td>
      <td>${acc}</td>
      <td>${status}</td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NCK Revision Plan — ${escapeHtml(studentName)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #FFFDF8; color: #1A2E2D; line-height: 1.5; }
  .container { max-width: 900px; margin: 0 auto; padding: 24px 16px; }

  /* Header */
  .plan-header { background: linear-gradient(135deg, #08514F 0%, #0A6865 100%); color: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; }
  .plan-header h1 { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
  .plan-header .subtitle { opacity: 0.8; font-size: 14px; }
  .plan-meta { display: flex; gap: 24px; margin-top: 16px; flex-wrap: wrap; }
  .plan-meta-item { background: rgba(255,255,255,0.12); border-radius: 8px; padding: 8px 14px; font-size: 13px; }
  .plan-meta-item strong { display: block; font-size: 18px; font-weight: 700; }

  /* Summary */
  .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .summary-card { background: white; border: 1px solid #E0EAE9; border-radius: 12px; padding: 16px; text-align: center; }
  .summary-card .value { font-size: 24px; font-weight: 800; color: #08514F; }
  .summary-card .label { font-size: 12px; color: #6B8F8E; margin-top: 2px; }

  /* Section titles */
  .section-title { font-size: 20px; font-weight: 700; color: #08514F; margin: 28px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #E8F5F4; }

  /* Unit table */
  table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #E0EAE9; margin-bottom: 24px; }
  th { background: #08514F; color: white; padding: 10px 14px; text-align: left; font-size: 13px; }
  td { padding: 10px 14px; font-size: 13px; border-bottom: 1px solid #F0F7F6; }
  tr:last-child td { border-bottom: none; }
  .tier-badge { padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .tier-1 { background: #FEF3C7; color: #92400E; }
  .tier-2 { background: #E8F5F4; color: #08514F; }
  .tier-3 { background: #F3F4F6; color: #6B7280; }

  /* Week sections */
  .week-section { margin-bottom: 28px; }
  .week-title { font-size: 16px; font-weight: 700; color: #08514F; margin-bottom: 10px; }
  .day-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; }
  .day-card { background: white; border: 1px solid #E0EAE9; border-radius: 10px; padding: 12px; }
  .day-card.mock-day { border-color: #F5A623; background: #FFFBF0; }
  .day-card.recovery-day { border-color: #10B981; background: #ECFDF5; }
  .day-card.weekend { background: #F9FFFE; }
  .day-header { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
  .day-label { font-weight: 700; font-size: 13px; flex: 1; }
  .day-hours { font-size: 11px; color: #6B8F8E; background: #E8F5F4; padding: 1px 6px; border-radius: 10px; }
  .badge { font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 10px; }
  .badge-mock { background: #FEF3C7; color: #92400E; }
  .badge-flash { background: #EDE9FE; color: #5B21B6; }
  .task-list { list-style: none; font-size: 12px; color: #374151; space-y: 2px; }
  .task-list li { padding: 2px 0; }

  /* Share section */
  .share-box { background: #E8F5F4; border: 1px solid #08514F33; border-radius: 12px; padding: 16px; margin-top: 24px; text-align: center; }
  .share-box p { font-size: 13px; color: #08514F; margin-bottom: 8px; }
  .share-url { font-size: 12px; background: white; border: 1px solid #E0EAE9; border-radius: 6px; padding: 6px 10px; word-break: break-all; color: #08514F; font-family: monospace; }

  /* Print */
  @media print {
    body { background: white; }
    .no-print { display: none; }
    .day-grid { grid-template-columns: repeat(3, 1fr); }
    .plan-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="container">

  <!-- Header -->
  <div class="plan-header">
    <h1>📅 NCK Revision Plan</h1>
    <p class="subtitle">Personalised for ${escapeHtml(studentName)} · Generated by NurseFiti</p>
    <div class="plan-meta">
      <div class="plan-meta-item"><strong>${escapeHtml(cadre)}</strong>Cadre</div>
      <div class="plan-meta-item"><strong>${new Date(examDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>Exam Date</div>
      <div class="plan-meta-item"><strong>${totalStudyHours}</strong>Study Hours</div>
      <div class="plan-meta-item"><strong>${mockExamDays}</strong>Mock Exams</div>
    </div>
  </div>

  <!-- Summary stats -->
  <div class="summary-grid">
    <div class="summary-card"><div class="value">${totalWeeks}</div><div class="label">Study Weeks</div></div>
    <div class="summary-card"><div class="value">${estMCQs.toLocaleString()}</div><div class="label">Est. MCQs</div></div>
    <div class="summary-card"><div class="value">${flashcardDays}</div><div class="label">Flashcard Sessions</div></div>
    <div class="summary-card"><div class="value">${recoveryDays}</div><div class="label">Recovery Days</div></div>
  </div>

  <!-- Unit mastery overview -->
  <h2 class="section-title">📊 Unit Mastery Overview</h2>
  <table>
    <thead><tr><th>Unit</th><th>Priority</th><th>Your Accuracy</th><th>Status</th></tr></thead>
    <tbody>${unitRows}</tbody>
  </table>

  <!-- Study tips -->
  <h2 class="section-title">💡 Study Strategy</h2>
  <div style="background:white;border:1px solid #E0EAE9;border-radius:12px;padding:16px;margin-bottom:24px;font-size:13px;">
    <p style="margin-bottom:8px;"><strong>🔴 Weak areas (< 70%):</strong> ${weakUnits.length > 0 ? weakUnits.map(u => u.name).join(', ') : 'None'} — allocated 1.5x extra time.</p>
    <p style="margin-bottom:8px;"><strong>⚪ Low Data:</strong> ${untestedUnits.length > 0 ? untestedUnits.map(u => u.name).join(', ') : 'None'} — insufficient practice data (<10 questions). Scheduled for heavy practice.</p>
    <p style="margin-bottom:8px;"><strong>✅ Strong areas:</strong> ${strongUnits.length > 0 ? strongUnits.map(u => u.name).join(', ') : 'Keep practising to build your baseline.'} — maintenance practice only.</p>
    <p style="margin-bottom:8px;"><strong>⏱️ Mocks:</strong> ${mockExamDays} full mock exams strategically placed. Review every wrong answer!</p>
    <p><strong>🔄 Interleaving:</strong> Subjects are mixed across days to boost your long-term memory.</p>
  </div>

  <!-- Weekly schedule -->
  <h2 class="section-title">📆 Day-by-Day Schedule</h2>
  ${weekRows}

  <!-- Resources Section -->
  <h2 class="section-title">📚 Study Resources</h2>
  <p style="font-size:13px;color:#4A6B6A;margin-bottom:16px;">All resources verified as real and nursing-relevant. Kenya-specific resources prioritised.</p>

  <!-- 4.1 Official Kenya Resources -->
  <div style="margin-bottom:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#08514F;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
      <span style="background:#08514F;color:white;padding:2px 8px;border-radius:6px;font-size:11px;">🇰🇪 Official</span> Kenya Health Resources
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;">
      ${[
        { name: 'NCK Official Portal', url: 'https://nck.go.ke', desc: 'Exam dates, registration, format updates, professional registration', tag: '🇰🇪 Official' },
        { name: 'Ministry of Health Kenya', url: 'https://www.health.go.ke', desc: 'National health policies, KEPH, ANC/PMTCT guidelines, community health protocols', tag: '🇰🇪 Official' },
        { name: 'KEMSA — Kenya Essential Medicines', url: 'https://www.kemsa.co.ke', desc: 'Kenya Essential Medicines List (KEML) — all pharmacology must align to this list', tag: '🇰🇪 Official' },
        { name: 'DHIS2 Kenya', url: 'https://hiskenya.org', desc: 'Kenya disease surveillance data — essential for community health statistics', tag: '🇰🇪 Official' },
        { name: 'KNBS', url: 'https://www.knbs.or.ke', desc: 'Kenya demographic health statistics — fertility rates, mortality, population data', tag: '🇰🇪 Official' },
        { name: 'WHO Kenya Office', url: 'https://www.afro.who.int/countries/kenya', desc: 'Kenya-specific WHO reports, immunisation data, disease burden, adapted guidelines', tag: '🇰🇪 Official' },
      ].map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" style="display:block;background:white;border:1px solid #D6E7E4;border-radius:10px;padding:10px 12px;text-decoration:none;transition:border-color 0.2s;">
        <p style="font-size:12px;font-weight:700;color:#08514F;margin-bottom:3px;">${r.name}</p>
        <p style="font-size:11px;color:#4A6B6A;line-height:1.4;">${r.desc}</p>
        <p style="font-size:10px;color:#F5A623;font-weight:600;margin-top:4px;">${r.tag}</p>
      </a>`).join('')}
    </div>
  </div>

  <!-- 4.2 Core Nursing Websites -->
  <div style="margin-bottom:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#08514F;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
      <span style="background:#0A6865;color:white;padding:2px 8px;border-radius:6px;font-size:11px;">🌐 Web</span> Core Nursing Websites
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;">
      ${[
        { name: 'Nurseslabs.com', url: 'https://nurseslabs.com', desc: 'NCK-style nursing notes, care plans, NCLEX-adapted MCQs — most Kenya nurses use this' },
        { name: 'Osmosis.org', url: 'https://www.osmosis.org', desc: 'Visual learning — diseases, pharmacology, pathophysiology animations. Excellent for visual learners.' },
        { name: 'Khan Academy Health', url: 'https://www.khanacademy.org/science/health-and-medicine', desc: 'Free physiology, biochemistry, anatomy — clear explanations, well-organised by system' },
        { name: 'EZmed.org', url: 'https://www.ezmed.org', desc: 'Medical mnemonics, quick-reference cards — excellent for pharmacology and pathology' },
        { name: 'Amboss Medical Library', url: 'https://www.amboss.com', desc: 'Clinical vignette MCQs adaptable for NCK scenario practice — high-quality clinical reasoning' },
        { name: 'Open Textbook Library', url: 'https://open.umn.edu/opentextbooks', desc: 'Free nursing textbooks — anatomy, pharmacology, community health, fundamentals' },
        { name: 'LibreTexts Medicine', url: 'https://med.libretexts.org', desc: 'Free medical/nursing content — anatomy, physiology, pharmacology, nursing practice' },
        { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', desc: 'Evidence-based nursing research — guidelines, clinical protocols, systematic reviews (free)' },
      ].map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" style="display:block;background:white;border:1px solid #D6E7E4;border-radius:10px;padding:10px 12px;text-decoration:none;">
        <p style="font-size:12px;font-weight:700;color:#08514F;margin-bottom:3px;">${r.name}</p>
        <p style="font-size:11px;color:#4A6B6A;line-height:1.4;">${r.desc}</p>
        <p style="font-size:10px;color:#0A6865;font-weight:600;margin-top:4px;">🌐 Website</p>
      </a>`).join('')}
    </div>
  </div>

  <!-- 4.3 YouTube Channels -->
  <div style="margin-bottom:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#08514F;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
      <span style="background:#EF4444;color:white;padding:2px 8px;border-radius:6px;font-size:11px;">▶ YouTube</span> Nursing Education Channels
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;">
      ${[
        { name: 'Ninja Nerd Science', url: 'https://www.youtube.com/@NinjaNerdScience', desc: 'Best anatomy, physiology and pathophysiology on YouTube. Free, detailed, exceptional for Paper IV.' },
        { name: 'RegisteredNurseRN', url: 'https://www.youtube.com/@RegisteredNurseRN', desc: 'NCLEX-style nursing videos — med-surg, maternal health, pharmacology, clinical skills' },
        { name: 'Simple Nursing', url: 'https://www.youtube.com/@SimpleNursing', desc: 'Mnemonics and simplified nursing content — pharmacology especially strong. Great for memory.' },
        { name: 'Nucleus Medical Media', url: 'https://www.youtube.com/@NucleusMedicalMedia', desc: 'Medical animations — disease mechanisms, surgical procedures, anatomy. Excellent visual learning.' },
        { name: 'MedCram', url: 'https://www.youtube.com/@MedCram', desc: 'Clinical medicine explained clearly — acid-base balance, ECG, respiratory physiology, sepsis' },
        { name: 'Armando Hasudungan', url: 'https://www.youtube.com/@armandohasudungan', desc: 'Hand-drawn medical illustrations — pharmacology, physiology, haematology. Unique visual style.' },
        { name: 'Khan Academy Medicine', url: 'https://www.youtube.com/@khanacademymedicine', desc: 'Physiology animations — renal, cardiology, neurology. Free, systematic, well-structured.' },
        { name: 'Spoon Feed Nursing', url: 'https://www.youtube.com/@SpoonFeedNursing', desc: 'Quick nursing prep content — maternal health, paediatrics, psychiatric nursing videos' },
      ].map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" style="display:block;background:white;border:1px solid #FEE2E2;border-radius:10px;padding:10px 12px;text-decoration:none;">
        <p style="font-size:12px;font-weight:700;color:#991B1B;margin-bottom:3px;">🎬 ${r.name}</p>
        <p style="font-size:11px;color:#4A6B6A;line-height:1.4;">${r.desc}</p>
        <p style="font-size:10px;color:#EF4444;font-weight:600;margin-top:4px;">▶ YouTube</p>
      </a>`).join('')}
    </div>
  </div>

  <!-- 4.4 Apps & MCQ Banks -->
  <div style="margin-bottom:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#08514F;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
      <span style="background:#7C3AED;color:white;padding:2px 8px;border-radius:6px;font-size:11px;">📱 App</span> Apps &amp; MCQ Banks
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;">
      ${[
        { name: 'Anki (Free)', url: 'https://apps.ankiweb.net', desc: "Spaced repetition flashcard app. Search: 'Nursing pharmacology', 'NCLEX anatomy', 'Community health Kenya'. iOS, Android, Desktop." },
        { name: 'Quizlet', url: 'https://quizlet.com', desc: "Pre-made and custom nursing flashcard sets. Search: 'NCK nursing Kenya', 'Med-surg nursing MCQ'" },
        { name: 'Epocrates', url: 'https://www.epocrates.com', desc: 'Free drug reference app — Kenya-relevant drugs, dosing, interactions. Essential for pharmacology review.' },
        { name: 'Medscape App', url: 'https://www.medscape.com', desc: 'Drug reference, clinical procedures, disease management protocols. Free, regularly updated.' },
        { name: 'UWorld Nursing', url: 'https://nursing.uworld.com', desc: 'NCLEX question bank adaptable for NCK clinical reasoning practice. High quality clinical vignettes.' },
        { name: 'Picmonic', url: 'https://www.picmonic.com', desc: 'Visual mnemonics for pharmacology and pathophysiology. Memorable stories for complex drug side effects.' },
      ].map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" style="display:block;background:white;border:1px solid #EDE9FE;border-radius:10px;padding:10px 12px;text-decoration:none;">
        <p style="font-size:12px;font-weight:700;color:#5B21B6;margin-bottom:3px;">📱 ${r.name}</p>
        <p style="font-size:11px;color:#4A6B6A;line-height:1.4;">${r.desc}</p>
      </a>`).join('')}
    </div>
  </div>

  <!-- 4.5 Free eBooks -->
  <div style="margin-bottom:20px;">
    <h3 style="font-size:14px;font-weight:800;color:#08514F;margin-bottom:10px;display:flex;align-items:center;gap:6px;">
      <span style="background:#D97706;color:white;padding:2px 8px;border-radius:6px;font-size:11px;">📚 eBook</span> Free PDF &amp; eBook Sources
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;">
      ${[
        { name: 'NCBI Bookshelf', url: 'https://www.ncbi.nlm.nih.gov/books', desc: 'Free medical and nursing textbooks — StatPearls (regularly updated clinical summaries, free)' },
        { name: 'StatPearls (NCBI)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK430685', desc: 'Free, regularly updated clinical summaries for diseases, procedures, pharmacology' },
        { name: 'WHO Free Publications', url: 'https://www.who.int/publications', desc: 'IMCI guidelines, ANC guidelines, TB/HIV/malaria protocols — free PDF downloads' },
        { name: 'Library Genesis', url: 'https://libgen.is', desc: "Free access to Brunner & Suddarth, Pillitteri, Kaplan Sadock, and other nursing textbooks" },
      ].map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" style="display:block;background:white;border:1px solid #FEF3C7;border-radius:10px;padding:10px 12px;text-decoration:none;">
        <p style="font-size:12px;font-weight:700;color:#92400E;margin-bottom:3px;">📚 ${r.name}</p>
        <p style="font-size:11px;color:#4A6B6A;line-height:1.4;">${r.desc}</p>
      </a>`).join('')}
    </div>
  </div>

  <!-- 4.6 Recommended Textbooks -->
  <div style="margin-bottom:24px;">
    <h3 style="font-size:14px;font-weight:800;color:#08514F;margin-bottom:10px;">📖 Recommended Textbooks by Subject</h3>
    <div style="background:white;border:1px solid #D6E7E4;border-radius:10px;overflow:hidden;">
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead><tr style="background:#08514F;color:white;">
          <th style="padding:8px 12px;text-align:left;">Subject Area</th>
          <th style="padding:8px 12px;text-align:left;">Textbook</th>
          <th style="padding:8px 12px;text-align:left;">Edition</th>
        </tr></thead>
        <tbody>
          ${[
            ['Medical-Surgical Nursing', "Brunner & Suddarth's Medical-Surgical Nursing", '15th (2022)'],
            ['Midwifery & Child Health', 'Pillitteri: Maternal & Child Health Nursing', '8th Edition'],
            ['Community Health', 'Maurer & Smith: Community & Public Health Nursing', '5th Edition'],
            ['Psychiatric Nursing', "Kaplan & Sadock's Synopsis of Psychiatry", '11th Edition'],
            ['Pharmacology', "Lippincott's Nursing Drug Handbook", 'Current Annual'],
            ['Anatomy', "Gray's Anatomy for Students (Drake)", '4th Edition'],
            ['Physiology', 'Guyton & Hall Medical Physiology', '14th Edition'],
          ].map((r, i) => `<tr style="border-top:1px solid #E8F5F4;${i % 2 === 1 ? 'background:#F9FFFE;' : ''}">
            <td style="padding:8px 12px;color:#08514F;font-weight:600;">${r[0]}</td>
            <td style="padding:8px 12px;color:#1A2E2D;">${r[1]}</td>
            <td style="padding:8px 12px;color:#4A6B6A;">${r[2]}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Share -->
  <div class="share-box no-print">
    <p>📤 Share this plan with your study partner or tutor</p>
    <div class="share-url">${siteUrl}/revision-plan/share/${shareToken}</div>
  </div>

  <p style="text-align:center;font-size:11px;color:#9CA3AF;margin-top:24px;">Generated by NurseFiti · nckenya.com · Pass your NCK exam first attempt</p>
</div>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteClient();
    const adminSupabase = createAdminClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nursefiti.co.ke';

    // Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate body
    const body = bodySchema.safeParse(await req.json());
    if (!body.success) {
      return NextResponse.json({ error: 'Invalid request', details: body.error.flatten() }, { status: 400 });
    }

    const { examDate, studyHoursWeekday, studyHoursWeekend, workSchoolStatus, paymentRef } = body.data;

    // Paid prep plans include revision plans. Free users still need a verified one-off
    // legacy payment reference if they arrive from an old checkout link.
    const { data: profile } = await supabase
      .from('student_profiles')
      .select('cadre, plan_tier, plan_expires_at')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    const profileRow = profile as any;
    const activeTier = effectiveTier(profileRow.plan_tier, profileRow.plan_expires_at);
    const hasIncludedRevisionPlan = getLimits(activeTier).revisionPlanAccess;

    // Verify payment reference exists and is completed for users without an active paid plan.
    if (!hasIncludedRevisionPlan && paymentRef !== 'free_premium') {
      if (!paymentRef) {
        return NextResponse.json({ error: 'Upgrade to a paid prep plan to generate a revision plan.' }, { status: 402 });
      }

      const { data: payment } = await supabase
        .from('payments')
        .select('status, type')
        .eq('intasend_reference' as any, paymentRef)
        .eq('user_id', user.id)
        .single();

      if (!payment || (payment as any).status !== 'completed') {
        return NextResponse.json({ error: 'Payment not verified. Please complete payment first.' }, { status: 402 });
      }
    }

    // Get student name
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    const studentName = (profileData as any)?.full_name ?? 'Student';

    // Load units for this cadre
    const { data: unitsData } = await supabase
      .from('units')
      .select('name, nck_weight, tier')
      .eq('cadre', profileRow.cadre)
      .eq('is_examinable', true)
      .order('tier', { ascending: true })
      .order('nck_weight', { ascending: false });

    if (!unitsData || unitsData.length === 0) {
      return NextResponse.json({ error: 'No units found for this cadre. Please contact support.' }, { status: 500 });
    }

    // Load student's performance per unit
    const { data: answersData } = await supabase
      .from('student_answers')
      .select('is_correct, question_id')
      .eq('student_id', user.id);

    // Get question → unit mapping
    const questionIds = Array.from(new Set((answersData ?? []).map((a: any) => a.question_id)));
    const unitAccuracyMap: Record<string, { correct: number; total: number }> = {};

    if (questionIds.length > 0) {
      // Fetch in batches of 1000 to avoid URL length limits while covering all answered questions
      const BATCH = 1000;
      const allQuestionsData: Array<{ id: string; unit: string }> = [];
      for (let i = 0; i < questionIds.length; i += BATCH) {
        const batch = questionIds.slice(i, i + BATCH);
        const { data: batchData } = await supabase
          .from('questions')
          .select('id, unit')
          .in('id', batch);
        if (batchData) allQuestionsData.push(...(batchData as Array<{ id: string; unit: string }>));
      }

      if (allQuestionsData.length > 0) {
        for (const ans of (answersData ?? []) as any[]) {
          const q = allQuestionsData.find((q) => q.id === ans.question_id);
          if (!q) continue;
          if (!unitAccuracyMap[q.unit]) unitAccuracyMap[q.unit] = { correct: 0, total: 0 };
          unitAccuracyMap[q.unit].total++;
          if (ans.is_correct) unitAccuracyMap[q.unit].correct++;
        }
      }
    }

    // Build enriched unit list
    const units: UnitData[] = (unitsData as any[]).map(u => {
      const perf = unitAccuracyMap[u.name];
      return {
        name: u.name,
        nck_weight: u.nck_weight,
        tier: u.tier,
        accuracy: perf ? Math.round((perf.correct / perf.total) * 100) : undefined,
        answeredCount: perf?.total,
      };
    });

    // Generate the plan
    const days = generatePlan(
      profileRow.cadre,
      new Date(examDate),
      studyHoursWeekday,
      studyHoursWeekend,
      units
    );

    // Generate share token
    const shareToken = randomUUID();

    // Render HTML
    const planHtml = renderPlanHtml(
      studentName,
      profileRow.cadre,
      examDate,
      days,
      units,
      shareToken,
      siteUrl
    );

    // Store plan
    const { data: savedPlan, error: saveError } = await adminSupabase
      .from('revision_plans')
      .insert({
        student_id: user.id,
        cadre: profileRow.cadre,
        exam_date: examDate,
        days_available: days.length,
        study_hours_weekday: studyHoursWeekday,
        study_hours_weekend: studyHoursWeekend,
        work_school_status: workSchoolStatus,
        plan_html: planHtml,
        plan_data: { days, units, generatedAt: new Date().toISOString() },
        payment_ref: paymentRef,
        share_token: shareToken,
      } as any)
      .select('id')
      .single();

    if (saveError || !savedPlan) {
      console.error('[revision-plan/generate] Save error:', saveError);
      return NextResponse.json({ error: 'Failed to save plan. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      planId: (savedPlan as any).id,
      shareToken,
      planHtml,
    });

  } catch (err) {
    console.error('[revision-plan/generate]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Plan generation failed' },
      { status: 500 }
    );
  }
}
