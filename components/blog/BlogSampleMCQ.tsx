"use client";

import { useState } from 'react';
import Link from 'next/link';

/**
 * BlogSampleMCQ — An interactive, standalone MCQ card rendered inside blog posts.
 * Mirrors the exact look & feel of NurseFiti's MCQCard component but does NOT
 * require authentication. When a reader tries to use the "Ask AI" feature it
 * nudges them to create a free account.
 */

interface SampleQuestion {
  stem: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  rationale: string;
  unit: string;
  topic: string;
  difficulty: string;
}

// ── Hard-coded sample questions keyed by blog slug ─────────────────────────
const SAMPLE_QUESTIONS: Record<string, SampleQuestion> = {
  'generating-nursing-care-plans-sample': {
    stem: 'A student nurse is asked to prepare an individualised nursing care plan for a patient. Which action should come FIRST?',
    option_a: 'Select interventions from a generic care-plan template',
    option_b: 'Set a measurable outcome for the next shift',
    option_c: 'Collect and validate current assessment data',
    option_d: 'Document that the goal has been achieved',
    correct_option: 'C',
    rationale: 'Care planning starts with current, validated assessment data. That information supports the nursing problem, guides a realistic outcome and helps the student select relevant interventions. Choosing a template, setting an outcome or evaluating the plan before assessment risks producing generic care that does not match the patient. This is an educational nursing-process question; students must follow their placement facility’s documentation process and supervisor guidance.',
    unit: 'Fundamentals of Nursing',
    topic: 'Nursing Process',
    difficulty: 'easy',
  },
  'nck-june-2026-update-sample': {
    stem: 'A 28-year-old female patient presents with a blood pressure of 160/100 mmHg at 34 weeks gestation. She complains of a severe headache and blurred vision. Which of the following is the PRIORITY nursing intervention?',
    option_a: 'Administer prescribed antihypertensive medication and monitor BP every 15 minutes',
    option_b: 'Encourage the patient to rest on her left lateral side and reassess after 1 hour',
    option_c: 'Prepare for emergency delivery and alert the obstetrician immediately',
    option_d: 'Obtain a urine sample for protein analysis and record the results',
    correct_option: 'A',
    rationale: 'With a BP of 160/100 mmHg at 34 weeks gestation accompanied by severe headache and blurred vision, this patient likely has severe pre-eclampsia. The PRIORITY is to administer the prescribed antihypertensive (commonly IV labetalol or oral nifedipine per Kenya MOH guidelines) to lower the dangerously elevated blood pressure and prevent complications such as eclamptic seizures or stroke. While left lateral positioning (B), preparing for delivery (C), and urine protein testing (D) are all appropriate, controlling the acute hypertension is the most immediate life-saving intervention. This aligns with WHO and Kenya Ministry of Health maternal health guidelines for severe pre-eclampsia management.',
    unit: 'Midwifery',
    topic: 'Pre-eclampsia Management',
    difficulty: 'medium',
  },
  'nursefiti-undergrad-sample': {
    stem: 'A nurse is preparing to administer an intramuscular injection to an adult patient. Which of the following sites is recommended as the PREFERRED site for IM injections in adults according to current evidence-based practice?',
    option_a: 'Deltoid muscle of the upper arm',
    option_b: 'Ventrogluteal site (gluteus medius)',
    option_c: 'Dorsogluteal site (upper outer quadrant of the buttock)',
    option_d: 'Vastus lateralis (anterolateral thigh)',
    correct_option: 'B',
    rationale: 'The ventrogluteal site (gluteus medius) is currently recommended as the PREFERRED site for IM injections in adults. This site is free of major blood vessels and nerves, has a well-defined anatomical landmark, has a thicker muscle mass, and is less likely to result in accidental subcutaneous injection. The dorsogluteal site (C) was traditionally used but is no longer recommended as a first choice due to the risk of sciatic nerve injury and proximity to the superior gluteal artery. The deltoid (A) is appropriate for vaccines and small-volume injections. The vastus lateralis (D) is preferred in infants and small children.',
    unit: 'Fundamentals of Nursing',
    topic: 'Parenteral Medication Administration',
    difficulty: 'easy',
  },
  'nck-exam-centres-kenya-sample': {
    stem: 'During an NCK clinical examination simulation, a candidate is asked to demonstrate the proper sequence for removing personal protective equipment (PPE) after caring for a patient in isolation. According to WHO and Kenya Ministry of Health guidelines, which of the following represents the CORRECT order of doffing?',
    option_a: 'Gloves, Goggles/Shield, Gown, Mask, Hand hygiene',
    option_b: 'Gown, Gloves, Mask, Goggles/Shield, Hand hygiene',
    option_c: 'Mask, Gloves, Gown, Goggles/Shield, Hand hygiene',
    option_d: 'Gloves, Gown, Goggles/Shield, Mask, Hand hygiene',
    correct_option: 'D',
    rationale: 'According to WHO and Kenya Ministry of Health infection prevention and control (IPC) standards, the correct order of doffing (removing) PPE is: 1. Gloves (most contaminated), 2. Gown, 3. Goggles or Face Shield, 4. Mask/Respirator, 5. Perform Hand Hygiene. Gloves are removed first because they have the highest risk of heavy pathogen contamination. The gown is removed next, followed by goggles/shield which protect the eyes from splash during gown removal. The mask is removed last (outside the patient room if it is a respirator) to protect the airway until all other contaminated items are discarded. Hand hygiene must be performed immediately after doffing to clean any contamination that occurred during the removal process.',
    unit: 'Infection Prevention & Control',
    topic: 'Personal Protective Equipment',
    difficulty: 'medium',
  },
  'nck-exam-foreign-trained-nurses-kenya-sample': {
    stem: 'A foreign-trained nurse who has completed their clinical adaptation placement in Kenya is preparing to administer medications to a patient in the medical ward. Which of the following references is the PRIMARY source for determining approved medications and clinical guidelines in the Kenyan public healthcare system?',
    option_a: 'British National Formulary (BNF)',
    option_b: 'Kenya Essential Medicines List (KEML)',
    option_c: 'United States Pharmacopeia (USP)',
    option_d: 'WHO Model List of Essential Medicines',
    correct_option: 'B',
    rationale: 'The Kenya Essential Medicines List (KEML), published by the Ministry of Health, is the primary national reference directing the selection, procurement, distribution, and clinical administration of medicines in Kenyan public and private healthcare facilities. While foreign-trained nurses may be accustomed to international databases like the BNF (A) or USP (C), they must adhere to local KEML and MOH clinical guidelines when practicing and testing in Kenya. The WHO Model List (D) serves as a global template but is not the country-specific legal document.',
    unit: 'Pharmacology & Drug Administration',
    topic: 'Clinical Reference Guidelines',
    difficulty: 'medium',
  },
  'community-health-nursing-kenya-sample': {
    stem: 'During a Malezi Bora outreach, a community health nurse reviews the immunization card of a healthy 9-month-old infant who has received all vaccines on schedule so far. According to the Kenya national immunization (KEPI) schedule, which vaccine is due at this 9-month visit?',
    option_a: 'Third dose of pentavalent (DPT-HepB-Hib)',
    option_b: 'First dose of Measles-Rubella (MR) vaccine',
    option_c: 'BCG vaccine',
    option_d: 'Second dose of Measles-Rubella (MR) vaccine',
    correct_option: 'B',
    rationale: 'Under Kenya’s routine childhood immunization schedule, the FIRST dose of the Measles-Rubella (MR) vaccine is given at 9 months of age, and the SECOND dose at 18 months. BCG (C) is given at birth, and the three pentavalent doses (A) are completed by 14 weeks, so none of those are due at 9 months. Option D (MR second dose) comes later, at 18 months. A community health nurse running growth-monitoring and immunization outreaches such as Malezi Bora must know this schedule precisely to catch defaulters and prevent measles outbreaks. This aligns with the Kenya Expanded Programme on Immunization (KEPI) and WHO guidance.',
    unit: 'Community Health Nursing',
    topic: 'Immunization & KEPI Schedule',
    difficulty: 'easy',
  },
};

export function BlogSampleMCQ({ questionSlug }: { questionSlug: string }) {
  const question = SAMPLE_QUESTIONS[questionSlug];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  if (!question) return null;

  const handleSubmit = () => {
    if (!selectedOption || hasAnswered) return;
    setHasAnswered(true);
  };

  const getOptionClass = (option: string) => {
    if (!hasAnswered) {
      return selectedOption === option
        ? 'border-[#08514F] bg-[#08514F]/5'
        : 'border-[var(--color-border)] hover:border-[#08514F]/50';
    }
    if (option === question.correct_option) {
      return 'border-[#22c55e] bg-[#22c55e]/10';
    }
    if (option === selectedOption && option !== question.correct_option) {
      return 'border-[#ef4444] bg-[#ef4444]/10';
    }
    return 'border-[var(--color-border)] opacity-50';
  };

  const getOptionBadgeClass = (option: string) => {
    if (!hasAnswered) {
      return selectedOption === option
        ? 'bg-[#08514F] text-white'
        : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]';
    }
    if (option === question.correct_option) {
      return 'bg-[#22c55e] text-white';
    }
    if (option === selectedOption && option !== question.correct_option) {
      return 'bg-[#ef4444] text-white';
    }
    return 'bg-[var(--color-border)] text-[var(--color-text-secondary)]';
  };

  const difficultyColor = question.difficulty === 'easy'
    ? 'bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/25'
    : question.difficulty === 'hard'
    ? 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/25'
    : 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/25';

  return (
    <div className="my-8 rounded-2xl border-2 border-[#08514F]/20 bg-[var(--color-card)] shadow-lg overflow-hidden">
      {/* Header badge */}
      <div className="bg-[#08514F]/5 px-5 py-3 border-b border-[#08514F]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📝</span>
          <span className="text-sm font-bold text-[#08514F]">Sample NurseFiti Question</span>
        </div>
        <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Try it free
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#08514F]/10 text-[#08514F] border border-[#08514F]/20">
            {question.unit}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#08514F]/15 text-[#08514F] border border-[#08514F]/25">
            {question.topic}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${difficultyColor}`}>
            {question.difficulty}
          </span>
        </div>

        {/* Stem */}
        <h3 className="text-lg font-semibold text-[var(--color-text)] leading-relaxed mb-6">
          {question.stem}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {(['A', 'B', 'C', 'D'] as const).map((option) => {
            const optionText = question[`option_${option.toLowerCase()}` as keyof SampleQuestion] as string;
            return (
              <button
                key={option}
                onClick={() => !hasAnswered && setSelectedOption(option)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${getOptionClass(option)} ${
                  hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0 ${getOptionBadgeClass(option)}`}
                  >
                    {option}
                  </div>
                  <p className="text-[var(--color-text)] pt-1">{optionText}</p>
                  {hasAnswered && option === question.correct_option && (
                    <span className="ml-auto text-[#22c55e] text-xl flex-shrink-0">✓</span>
                  )}
                  {hasAnswered && option === selectedOption && option !== question.correct_option && (
                    <span className="ml-auto text-[#ef4444] text-xl flex-shrink-0">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit button */}
        {!hasAnswered && (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              selectedOption
                ? 'bg-[#08514F] hover:bg-[#0A6865] cursor-pointer'
                : 'bg-[#08514F]/40 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        )}

        {/* Feedback */}
        {hasAnswered && (
          <div className="mt-6 space-y-4">
            {/* Result badge */}
            <div className="flex items-center justify-center">
              {selectedOption === question.correct_option ? (
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/25">
                  ✓ Correct!
                </span>
              ) : (
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/25">
                  ✗ Incorrect
                </span>
              )}
            </div>

            {/* Rationale */}
            <div className="bg-[#08514F]/5 border border-[#08514F]/15 rounded-lg p-4">
              <h4 className="font-semibold text-[#08514F] mb-2">Explanation:</h4>
              <p className="text-sm text-[var(--color-text)] leading-relaxed">
                {question.rationale}
              </p>
            </div>

            {/* Ask AI mock — prompts signup */}
            {!showAIPrompt ? (
              <button
                onClick={() => setShowAIPrompt(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full border border-dashed border-[#08514F]/40 text-[#08514F] text-sm font-semibold hover:bg-[#08514F]/5 hover:border-[#08514F]/60 transition-all duration-200"
              >
                <span className="text-base">✨</span>
                Ask NurseFiti AI for a deeper explanation
              </button>
            ) : (
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(8,81,79,0.25)', background: 'var(--color-card)' }}>
                <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(8,81,79,0.06)', borderBottom: '1px solid rgba(8,81,79,0.12)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">✨</span>
                    <span className="text-sm font-bold text-[#08514F]">NurseFiti AI</span>
                  </div>
                  <button
                    onClick={() => setShowAIPrompt(false)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-lg leading-none"
                    aria-label="Close AI panel"
                  >
                    ×
                  </button>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-[var(--color-text)] mb-3">
                    NurseFiti AI provides deeper clinical explanations, answers follow-up questions,
                    and connects concepts to real Kenyan nursing practice.
                  </p>
                  <p className="text-sm font-semibold text-[#08514F] mb-4">
                    Create a free account to unlock NurseFiti AI — plus thousands more practice questions.
                  </p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 px-6 py-2.5 font-bold rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #08514F 0%, #0A6865 100%)' }}
                  >
                    Start Free on NurseFiti →
                  </Link>
                  <p className="mt-3 text-[10px] text-[var(--color-text-secondary)]">
                    No credit card required · Free plan includes AI explanations
                  </p>
                </div>
              </div>
            )}

            {/* CTA for more questions */}
            <div className="text-center pt-2">
              <Link
                href="/signup"
                className="text-sm font-semibold text-[#08514F] hover:underline underline-offset-2"
              >
                Want more questions like this? Start free on NurseFiti →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
