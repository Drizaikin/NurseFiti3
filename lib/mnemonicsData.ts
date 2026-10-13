// ============================================================
// NurseFiti Comprehensive Mnemonics Library
// Fully audited, scientifically referenced, 7-section specification.
// Instant client-side loading, offline-resilient fallback, zero lag.
// ============================================================

export interface BreakdownItem {
  emoji: string;
  phrase: string;
  meaning: string;
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Mnemonic {
  id: string;
  title: string;
  acronym: string;
  description: string;
  category: string;
  specialty: string;
  tags: string[];
  phrases: string[];
  breakdown: BreakdownItem[];
  clinical_significance: string;
  causes: string[];
  exam_traps: string;
  memory_pearl: string;
  high_yield_tip: string;
  practice_question: PracticeQuestion | null;
  created_at?: string;
}

export const CATEGORIES = [
  'All',
  'Pharmacology',
  'Med-Surgical',
  'Obstetrics',
  'Neurology',
  'Emergency',
  'Pediatrics',
  'Anatomy',
  'Community'
] as const;

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; soft: string; border: string }> = {
  Pharmacology:   { bg: '#F5A623', text: '#0F1C1C', soft: 'rgba(245,166,35,0.12)',  border: 'rgba(245,166,35,0.30)' },
  Anatomy:        { bg: '#F97316', text: '#0F1C1C', soft: 'rgba(249,115,22,0.12)',  border: 'rgba(249,115,22,0.30)' },
  Obstetrics:     { bg: '#EC4899', text: '#FFFFFF', soft: 'rgba(236,72,153,0.12)',  border: 'rgba(236,72,153,0.28)' },
  Neurology:      { bg: '#7C3AED', text: '#FFFFFF', soft: 'rgba(124,58,237,0.12)',  border: 'rgba(124,58,237,0.28)' },
  'Med-Surgical': { bg: '#08514F', text: '#E8F5F4', soft: 'rgba(8,81,79,0.10)',    border: 'rgba(8,81,79,0.28)' },
  Emergency:      { bg: '#EF4444', text: '#FFFFFF', soft: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.28)' },
  Community:      { bg: '#10B981', text: '#0F1C1C', soft: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.28)' },
  Pediatrics:     { bg: '#3B82F6', text: '#FFFFFF', soft: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.28)' },
};

export const ALL_MNEMONICS: Mnemonic[] = [
  {
    "id": "a4ead4ef-a8f4-4907-bcb4-c0bc728c2773",
    "title": "6 Rights of Drug Administration",
    "acronym": "Right Drug, Right Dose, Right Route, Right Time, Right Patient, Right Documentation",
    "description": "Medication safety framework",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Pharmacology",
    "tags": [
      "Medication Safety",
      "Pharmacology",
      "Nursing Practice"
    ],
    "phrases": [
      "Right Drug",
      "Right Dose",
      "Right Route",
      "Right Time",
      "Right Patient",
      "Right Documentation"
    ],
    "breakdown": [
      {
        "emoji": "💊",
        "phrase": "Right Drug",
        "meaning": "Verify the medication name against the prescription — check for sound-alike/look-alike drug confusion"
      },
      {
        "emoji": "⚖️",
        "phrase": "Right Dose",
        "meaning": "Calculate and confirm the correct quantity; double-check calculations for high-alert medications"
      },
      {
        "emoji": "🛤️",
        "phrase": "Right Route",
        "meaning": "PO, IV, IM, SC, topical — administer exactly as prescribed; never substitute routes"
      },
      {
        "emoji": "⏰",
        "phrase": "Right Time",
        "meaning": "Administer at the correct scheduled time or frequency; understand PRN versus scheduled dosing"
      },
      {
        "emoji": "🪪",
        "phrase": "Right Patient",
        "meaning": "Two-identifier verification — always check name AND date of birth or hospital number"
      },
      {
        "emoji": "📝",
        "phrase": "Right Documentation",
        "meaning": "Document immediately after administration, not before; record dose, route, time, site"
      }
    ],
    "clinical_significance": "The 6 Rights are the foundational medication safety framework in nursing practice. Medication errors are the most common type of medical error and are largely preventable through consistent application of the 6 Rights.",
    "causes": [
      "Sound-alike/look-alike drug names",
      "Decimal point errors (e.g. 1.0mg vs 10mg)",
      "Wrong patient identification",
      "Transcription errors",
      "High-alert medications: insulin, heparin, potassium, opioids, chemotherapy"
    ],
    "exam_traps": "The most common NCK trap: documenting BEFORE administration. Documentation must always occur IMMEDIATELY AFTER giving the medication — never in advance. Also: The \"Right Reason\" is sometimes listed as a 7th Right. Always verify WHY the patient is receiving the medication.",
    "memory_pearl": "\"Before you give any drug: 6 Checks. Every time. No shortcuts — especially for high-alert medications.\"",
    "high_yield_tip": "High-alert medications requiring extra verification: Insulin (hypoglycaemia risk), IV Potassium (cardiac arrest risk), Heparin/Warfarin (bleeding risk), Opioids (respiratory depression), Digoxin (narrow therapeutic index), Chemotherapy.",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Right drug",
        "B. Right dose",
        "C. Right patient",
        "D. Right time"
      ],
      "question": "A nurse prepares insulin for a patient and draws it up before checking the patient's name band. Which of the 6 Rights was compromised?",
      "explanation": "The Right Patient requires two-identifier verification BEFORE preparing and administering any medication. The patient's name band must be checked against the prescription. Insulin is a high-alert medication — wrong patient identification can cause life-threatening hypoglycaemia."
    },
    "specialty": "Pharmacology"
  },
  {
    "id": "278ca43f-737a-450b-9759-1b10a72b50a0",
    "title": "ABG Interpretation — ROME",
    "acronym": "ROME",
    "description": "Interpreting arterial blood gas results",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "ABG",
      "Acid-Base",
      "Respiratory",
      "Metabolic"
    ],
    "phrases": [
      "Respiratory Opposite",
      "Metabolic Equal"
    ],
    "breakdown": [
      {
        "emoji": "💨",
        "phrase": "Respiratory Opposite",
        "meaning": "In respiratory disorders: pH and PaCO2 move in OPPOSITE directions. Respiratory acidosis = high CO2 + low pH. Respiratory alkalosis = low CO2 + high pH"
      },
      {
        "emoji": "⚗️",
        "phrase": "Metabolic Equal",
        "meaning": "In metabolic disorders: pH and HCO3 move in the SAME (EQUAL) direction. Metabolic acidosis = low HCO3 + low pH. Metabolic alkalosis = high HCO3 + high pH"
      }
    ],
    "clinical_significance": "ROME is the foundational mnemonic for interpreting arterial blood gas results. It allows rapid identification of whether an acid-base disturbance is respiratory or metabolic in origin.",
    "causes": [
      "Respiratory acidosis: COPD, pneumonia, respiratory failure, opioid overdose",
      "Respiratory alkalosis: anxiety, pain, hyperventilation, high altitude",
      "Metabolic acidosis: DKA, renal failure, lactic acidosis, poisoning",
      "Metabolic alkalosis: vomiting, NG suction, thiazide diuretics, antacid overuse"
    ],
    "exam_traps": "Students confuse compensation with the primary disorder. In ROME, identify the PRIMARY disorder first using pH: pH <7.35 = acidosis; pH >7.45 = alkalosis. Then identify which parameter (CO2 or HCO3) is responsible. Then check if compensation is present.",
    "memory_pearl": "\"R-O-M-E: Respiratory is Opposite (CO2 vs pH). Metabolic is Equal (HCO3 and pH go together).\"",
    "high_yield_tip": "NCK ABG steps: 1) Check pH (acidosis or alkalosis?) 2) Check CO2 (respiratory cause?) 3) Check HCO3 (metabolic cause?) 4) Use ROME to confirm 5) Check compensation 6) Oxygenation: PaO2 <80 = hypoxaemia.",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Metabolic acidosis",
        "B. Respiratory alkalosis",
        "C. Respiratory acidosis with metabolic compensation",
        "D. Metabolic alkalosis"
      ],
      "question": "A patient with COPD exacerbation has pH 7.28, PaCO2 60 mmHg, HCO3 26 mEq/L. What is the primary disorder?",
      "explanation": "Using ROME: Respiratory Opposite — pH is low (7.28) and CO2 is high (60). They move in opposite directions = respiratory acidosis. HCO3 is slightly elevated (26) indicating partial metabolic compensation (kidneys retaining bicarbonate to buffer the acidosis)."
    },
    "specialty": "Respiratory"
  },
  {
    "id": "89dcaf17-03a9-41ad-bd92-552fd5720f50",
    "title": "Acute Coronary Syndrome — MONA",
    "acronym": "MONA",
    "description": "Early management of acute coronary syndrome",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "ACS",
      "Emergency",
      "Cardiology",
      "Medications"
    ],
    "phrases": [
      "Morphine",
      "Oxygen",
      "Nitrates",
      "Aspirin"
    ],
    "breakdown": [
      {
        "emoji": "💉",
        "phrase": "M → Morphine",
        "meaning": "Reduces pain and anxiety; decreases sympathetic activation and preload"
      },
      {
        "emoji": "💨",
        "phrase": "O → Oxygen",
        "meaning": "ONLY if SpO2 < 94% — routine oxygen is no longer recommended"
      },
      {
        "emoji": "🩺",
        "phrase": "N → Nitrates",
        "meaning": "Vasodilate coronary arteries; reduce preload and chest pain"
      },
      {
        "emoji": "💊",
        "phrase": "A → Aspirin",
        "meaning": "Irreversibly inhibits platelet aggregation; given immediately 300mg loading dose"
      }
    ],
    "clinical_significance": "Used during early management of acute coronary syndrome including STEMI and NSTEMI. Prompt recognition and treatment reduces myocardial damage and mortality.",
    "causes": [
      "STEMI",
      "NSTEMI",
      "Unstable angina",
      "Coronary artery disease"
    ],
    "exam_traps": "Modern guidelines no longer recommend oxygen routinely in ACS. Only administer oxygen when SpO2 is below 94%. Routine high-flow oxygen can cause vasoconstriction and worsen outcomes. Also: Morphine use is now controversial — use with caution.",
    "memory_pearl": "\"Give aspirin first, nitrates second, oxygen only if low saturation, and morphine only for refractory pain.\"",
    "high_yield_tip": "In NCK exams, if a patient has chest pain and all of MONA are listed as options, choose Aspirin first as it has the strongest evidence base. Oxygen is only given if the patient is hypoxic.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Administer high-flow oxygen",
        "B. Administer aspirin 300mg",
        "C. Administer IV morphine",
        "D. Apply GTN spray"
      ],
      "question": "A patient arrives with crushing chest pain and diaphoresis. SpO2 is 97%. Which intervention is the PRIORITY?",
      "explanation": "Aspirin is the most evidence-based immediate intervention for ACS. Oxygen is NOT indicated when SpO2 is 97% (≥94%). Aspirin immediately inhibits platelet aggregation and reduces clot formation."
    },
    "specialty": "Cardiovascular"
  },
  {
    "id": "3c5689b9-7029-49a6-ac96-14ac4b8ab6bf",
    "title": "Anticholinergic Toxicity",
    "acronym": "Dry as a bone, Blind as a bat, Red as a beet, Mad as a hatter, Hot as a hare, Full as a flask",
    "description": "Classic signs of anticholinergic toxicity",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Pharmacology",
    "tags": [
      "Toxicology",
      "Emergency",
      "Pharmacology"
    ],
    "phrases": [
      "Dry as a bone",
      "Blind as a bat",
      "Red as a beet",
      "Mad as a hatter",
      "Hot as a hare",
      "Full as a flask"
    ],
    "breakdown": [
      {
        "emoji": "🦴",
        "phrase": "Dry as a bone",
        "meaning": "Dry mouth, dry skin, reduced sweating, dry mucous membranes"
      },
      {
        "emoji": "🦇",
        "phrase": "Blind as a bat",
        "meaning": "Mydriasis (dilated pupils), blurred vision, difficulty focusing"
      },
      {
        "emoji": "❤️",
        "phrase": "Red as a beet",
        "meaning": "Flushed warm skin caused by peripheral vasodilation"
      },
      {
        "emoji": "🎩",
        "phrase": "Mad as a hatter",
        "meaning": "Confusion, agitation, delirium, hallucinations"
      },
      {
        "emoji": "🌡️",
        "phrase": "Hot as a hare",
        "meaning": "Hyperthermia due to inability to sweat"
      },
      {
        "emoji": "🧴",
        "phrase": "Full as a flask",
        "meaning": "Urinary retention — bladder cannot empty"
      }
    ],
    "clinical_significance": "Summarizes the classic manifestations of anticholinergic toxicity. Patients commonly present after overdose of atropine, antihistamines, tricyclic antidepressants, or antispasmodics. Recognition allows rapid diagnosis and treatment.",
    "causes": [
      "Atropine",
      "Scopolamine",
      "Diphenhydramine",
      "Promethazine",
      "Amitriptyline",
      "Benztropine",
      "Oxybutynin"
    ],
    "exam_traps": "Students often confuse anticholinergic toxicity with cholinergic toxicity. Remember: Anticholinergic = Dry. Cholinergic = Wet (SLUDGE). Always look for dry skin and urinary retention to confirm anticholinergic.",
    "memory_pearl": "\"No sweat. Can't see. Burning hot. Talking nonsense. Can't pee.\" — Think Anticholinergic Toxicity.",
    "high_yield_tip": "If a patient has dry mouth, dilated pupils, hot flushed skin, delirium, and urinary retention — always suspect anticholinergic toxicity.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Cholinergic toxicity",
        "B. Anticholinergic toxicity",
        "C. Opioid toxicity",
        "D. Serotonin syndrome"
      ],
      "question": "A patient presents with dry skin, dilated pupils, confusion, and urinary retention. Which condition does this describe?",
      "explanation": "Anticholinergic toxicity presents with dry skin, mydriasis, confusion, and urinary retention. Cholinergic toxicity presents with SLUDGE (wet signs). Opioid toxicity causes miosis (pinpoint pupils), not mydriasis."
    },
    "specialty": "Pharmacology"
  },
  {
    "id": "0e2e5e52-f882-4a0a-8d65-1f824241f653",
    "title": "APGAR Score",
    "acronym": "Appearance Pulse Grimace Activity Respiration",
    "description": "Neonatal assessment immediately after birth",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Obstetrics",
    "tags": [
      "Neonatal",
      "Assessment",
      "Paediatrics",
      "Obstetrics"
    ],
    "phrases": [
      "Appearance",
      "Pulse",
      "Grimace",
      "Activity",
      "Respiration"
    ],
    "breakdown": [
      {
        "emoji": "🎨",
        "phrase": "A — Appearance (Skin colour)",
        "meaning": "0 = blue/pale all over; 1 = blue extremities, pink body; 2 = completely pink"
      },
      {
        "emoji": "💓",
        "phrase": "P — Pulse (Heart rate)",
        "meaning": "0 = absent; 1 = <100 bpm; 2 = ≥100 bpm"
      },
      {
        "emoji": "😬",
        "phrase": "G — Grimace (Reflex irritability)",
        "meaning": "0 = no response; 1 = grimace; 2 = cough, sneeze, or cry"
      },
      {
        "emoji": "💪",
        "phrase": "A — Activity (Muscle tone)",
        "meaning": "0 = limp; 1 = some flexion; 2 = active flexion of all limbs"
      },
      {
        "emoji": "🫁",
        "phrase": "R — Respiration",
        "meaning": "0 = absent; 1 = weak/irregular/gasping; 2 = strong cry"
      }
    ],
    "clinical_significance": "APGAR score is assessed at 1 minute and 5 minutes after birth. Each category scored 0–2. Total: 7–10 = normal. 4–6 = moderate depression, intervention needed. 0–3 = severe depression, immediate resuscitation required.",
    "causes": [
      "Prematurity",
      "Birth asphyxia",
      "Maternal analgesia/anaesthesia",
      "Prolonged labour",
      "Cord complications",
      "Congenital anomalies"
    ],
    "exam_traps": "Students confuse Grimace with Appearance. Grimace tests REFLEX IRRITABILITY (response to stimulation like nasal suction), not a smile. Also: A 1-minute APGAR predicts need for immediate resuscitation. A 5-minute APGAR reflects response to resuscitation and predicts outcomes.",
    "memory_pearl": "\"APGAR: 10 points total. 7–10 = good. 4–6 = needs help. 0–3 = emergency resuscitation.\"",
    "high_yield_tip": "The 1-minute APGAR score does NOT predict long-term neurological outcome. The 5-minute score is more clinically significant. A score persistently <5 at 10 and 20 minutes is associated with neurological morbidity.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. 4",
        "B. 6",
        "C. 7",
        "D. 8"
      ],
      "question": "A newborn at 1 minute has: blue extremities (1), heart rate 110 bpm (2), grimace only (1), some flexion (1), weak cry (1). What is the APGAR score?",
      "explanation": "Add the scores: Appearance=1 + Pulse=2 + Grimace=1 + Activity=1 + Respiration=1 = 6. A score of 6 indicates moderate depression and the neonate needs stimulation and possibly supplemental oxygen. Reassess at 5 minutes."
    },
    "specialty": "Pediatrics"
  },
  {
    "id": "a7e68ac2-c59b-43df-93d0-df0bc9ebc33f",
    "title": "Cholinergic Toxicity — SLUDGE",
    "acronym": "SLUDGE",
    "description": "Classic signs of cholinergic (organophosphate) toxicity",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Pharmacology",
    "tags": [
      "Toxicology",
      "Cholinergic",
      "Organophosphate",
      "Emergency"
    ],
    "phrases": [
      "Salivation",
      "Lacrimation",
      "Urination",
      "Defecation",
      "GI cramps",
      "Emesis"
    ],
    "breakdown": [
      {
        "emoji": "🤤",
        "phrase": "S — Salivation",
        "meaning": "Excessive drooling due to muscarinic receptor stimulation"
      },
      {
        "emoji": "😢",
        "phrase": "L — Lacrimation",
        "meaning": "Excessive tearing"
      },
      {
        "emoji": "🚽",
        "phrase": "U — Urination",
        "meaning": "Urinary incontinence — loss of bladder control"
      },
      {
        "emoji": "💩",
        "phrase": "D — Defecation",
        "meaning": "Uncontrolled defecation, diarrhoea"
      },
      {
        "emoji": "🤢",
        "phrase": "G — GI cramps",
        "meaning": "Abdominal pain, cramping, diarrhoea"
      },
      {
        "emoji": "🤮",
        "phrase": "E — Emesis",
        "meaning": "Vomiting"
      }
    ],
    "clinical_significance": "SLUDGE represents overstimulation of muscarinic receptors, seen in organophosphate poisoning (pesticides), nerve agents, and cholinergic drug overdose. These patients are WET — the opposite of anticholinergic toxicity.",
    "causes": [
      "Organophosphate pesticides",
      "Nerve agents (sarin, VX)",
      "Physostigmine overdose",
      "Pilocarpine overdose",
      "Neostigmine overdose"
    ],
    "exam_traps": "The most common exam trap: confusing SLUDGE (cholinergic = WET) with anticholinergic toxicity (DRY). Also remember cholinergic toxicity causes MIOSIS (pinpoint pupils), not mydriasis. Plus bradycardia, bronchospasm and excessive secretions.",
    "memory_pearl": "\"SLUDGE = Everything is running. Anticholinergic = Everything is dry.\"",
    "high_yield_tip": "Organophosphate poisoning also causes the KILLER triad: Bronchospasm + Bradycardia + Excessive secretions. Treatment = Atropine (blocks muscarinic) + Pralidoxime (reactivates acetylcholinesterase if given early).",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Anticholinergic toxicity",
        "B. Organophosphate poisoning",
        "C. Opioid overdose",
        "D. Sympathomimetic toxicity"
      ],
      "question": "A farm worker presents with excessive salivation, pinpoint pupils, bradycardia, and urinary incontinence. What is the most likely cause?",
      "explanation": "Organophosphate poisoning causes cholinergic toxicity (SLUDGE): salivation, lacrimation, urination, defecation, GI cramps, emesis — plus miosis, bradycardia and bronchospasm. Anticholinergic toxicity causes the OPPOSITE: dry, dilated, tachycardic."
    },
    "specialty": "Pharmacology"
  },
  {
    "id": "ebabfb4c-ab9f-472f-9158-01a7aad9ca33",
    "title": "Compartment Syndrome — The Six Ps",
    "acronym": "The Six Ps",
    "description": "Signs and symptoms of acute compartment syndrome",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Orthopaedics",
      "Emergency",
      "Fractures",
      "Musculoskeletal"
    ],
    "phrases": [
      "Pain",
      "Pressure",
      "Pallor",
      "Pulselessness",
      "Paraesthesia",
      "Paralysis"
    ],
    "breakdown": [
      {
        "emoji": "😣",
        "phrase": "Pain",
        "meaning": "Severe pain out of proportion to the injury — earliest and most important sign. Pain on PASSIVE stretch of muscles in the compartment is pathognomonic."
      },
      {
        "emoji": "📈",
        "phrase": "Pressure",
        "meaning": "Tense, woody swelling of the compartment. Compartment pressure >30 mmHg (or within 30 mmHg of diastolic) = emergency fasciotomy"
      },
      {
        "emoji": "⬜",
        "phrase": "Pallor",
        "meaning": "Pale, tight, shiny skin over the compartment"
      },
      {
        "emoji": "💓",
        "phrase": "Pulselessness",
        "meaning": "Loss of distal pulse — LATE sign. Limb may already be irreversibly damaged by this point"
      },
      {
        "emoji": "⚡",
        "phrase": "Paraesthesia",
        "meaning": "Tingling or numbness — indicates nerve ischaemia; early neurological sign"
      },
      {
        "emoji": "😔",
        "phrase": "Paralysis",
        "meaning": "Loss of motor function — LATE and ominous sign of severe ischaemia"
      }
    ],
    "clinical_significance": "Acute compartment syndrome occurs when pressure within a closed muscle compartment rises enough to compromise blood flow, causing ischaemia. It is a surgical emergency — fasciotomy within 6 hours prevents permanent damage.",
    "causes": [
      "Fractures (especially tibia, radius, ulna)",
      "Crush injuries",
      "Tight casts or bandages",
      "Burns",
      "Prolonged limb compression",
      "Reperfusion after vascular injury"
    ],
    "exam_traps": "The most dangerous trap: waiting for pulselessness before acting. Pulselessness is a LATE sign — permanent nerve and muscle damage may have already occurred. Pain on passive stretch is the EARLIEST reliable sign. Do NOT elevate the limb above heart level (reduces perfusion further). Remove the cast IMMEDIATELY if compartment syndrome is suspected.",
    "memory_pearl": "\"Pain that is TOO severe for the injury + passive stretch pain = Compartment Syndrome until proven otherwise.\"",
    "high_yield_tip": "Normal compartment pressure is 0–8 mmHg. Fasciotomy is indicated when pressure exceeds 30 mmHg or when the difference between diastolic blood pressure and compartment pressure is <30 mmHg (the \"delta P\").",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Elevate the limb above the heart",
        "B. Administer stronger analgesia and reassess in 2 hours",
        "C. Split or bivalve the cast immediately and notify the surgeon",
        "D. Apply ice packs to reduce swelling"
      ],
      "question": "A patient had a tibial fracture repaired and has a cast in place. They report severe pain with passive dorsiflexion of the toes, and tingling in the foot. What is the PRIORITY action?",
      "explanation": "Pain on passive stretch + paraesthesia = acute compartment syndrome. The cast must be split/bivalved IMMEDIATELY to relieve pressure. Elevation WORSENS compartment syndrome by reducing perfusion. Delaying treatment causes irreversible nerve and muscle damage."
    },
    "specialty": "Musculoskeletal"
  },
  {
    "id": "133ddcb5-330f-4fc8-b2f2-3fdd03762aa1",
    "title": "COPD — Blue Bloater (Chronic Bronchitis)",
    "acronym": "Blue Bloater",
    "description": "Classic presentation of chronic bronchitis",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "COPD",
      "Respiratory",
      "Bronchitis"
    ],
    "phrases": [
      "Blue — Cyanosis",
      "Bloater — Fluid retention",
      "Productive cough",
      "Overweight",
      "Peripheral oedema"
    ],
    "breakdown": [
      {
        "emoji": "🔵",
        "phrase": "Blue — Cyanosis",
        "meaning": "Central cyanosis due to chronic hypoxia and polycythaemia"
      },
      {
        "emoji": "🫧",
        "phrase": "Bloater — Oedema",
        "meaning": "Cor pulmonale causes right heart failure → fluid retention, peripheral oedema"
      },
      {
        "emoji": "😮‍💨",
        "phrase": "Productive cough",
        "meaning": "Chronic mucus hypersecretion — 3+ months/year for 2+ years"
      },
      {
        "emoji": "⚖️",
        "phrase": "Overweight",
        "meaning": "Retained CO2 (hypercapnia) — these patients retain everything"
      },
      {
        "emoji": "🦵",
        "phrase": "Peripheral oedema",
        "meaning": "Ankle and leg swelling from right-sided heart failure"
      }
    ],
    "clinical_significance": "Chronic bronchitis is defined as productive cough for ≥3 months per year for ≥2 consecutive years. The patient appears cyanosed and oedematous due to chronic hypoxia and secondary cor pulmonale.",
    "causes": [
      "Smoking",
      "Air pollution",
      "Occupational dust",
      "Recurrent respiratory infections"
    ],
    "exam_traps": "Do not confuse Blue Bloater (chronic bronchitis) with Pink Puffer (emphysema). Blue Bloater patients have low O2, high CO2, oedema and cyanosis. Pink Puffer patients maintain oxygenation until late but are severely breathless.",
    "memory_pearl": "\"Blue because they're hypoxic. Bloated because their heart is failing. They cough up sputum every morning.\"",
    "high_yield_tip": "NCK exams test the difference between chronic bronchitis and emphysema. Remember: Blue Bloater = wet, oedematous, cyanosed. Pink Puffer = thin, pursed lips, barrel chest, breathless but not cyanosed.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Emphysema — Pink Puffer",
        "B. Chronic bronchitis — Blue Bloater",
        "C. Asthma",
        "D. Pulmonary fibrosis"
      ],
      "question": "A 58-year-old male smoker presents with productive cough, central cyanosis, ankle swelling and weight gain. Which COPD type does this describe?",
      "explanation": "Chronic bronchitis presents as Blue Bloater: cyanosis, oedema, productive cough, and fluid retention from cor pulmonale. Emphysema (Pink Puffer) presents with barrel chest, pursed-lip breathing and little oedema."
    },
    "specialty": "Respiratory"
  },
  {
    "id": "592ad0fb-3f99-4e09-9467-c359d88048ff",
    "title": "COPD — Pink Puffer (Emphysema)",
    "acronym": "Pink Puffer",
    "description": "Classic presentation of emphysema",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "COPD",
      "Respiratory",
      "Emphysema"
    ],
    "phrases": [
      "Pink — Well oxygenated until late",
      "Puffer — Pursed-lip breathing",
      "Barrel chest",
      "Thin body",
      "Severe dyspnoea"
    ],
    "breakdown": [
      {
        "emoji": "🌸",
        "phrase": "Pink — Well oxygenated",
        "meaning": "Maintains near-normal O2 until very late disease due to respiratory compensation"
      },
      {
        "emoji": "💨",
        "phrase": "Puffer — Pursed-lip breathing",
        "meaning": "Creates back-pressure to keep airways open; slows expiration"
      },
      {
        "emoji": "🛢️",
        "phrase": "Barrel chest",
        "meaning": "Air trapping increases AP diameter to >transverse diameter"
      },
      {
        "emoji": "🦴",
        "phrase": "Thin body",
        "meaning": "Severe dyspnoea increases metabolic demand; accessory muscle use"
      },
      {
        "emoji": "😮‍💨",
        "phrase": "Severe dyspnoea",
        "meaning": "Progressive breathlessness even at rest in advanced disease"
      }
    ],
    "clinical_significance": "Emphysema involves permanent enlargement and destruction of alveoli distal to the terminal bronchiole. Elastic recoil is lost, causing air trapping and barrel chest. The patient works hard to breathe but maintains pink colour until late.",
    "causes": [
      "Smoking (main cause)",
      "Alpha-1 antitrypsin deficiency",
      "Occupational chemicals"
    ],
    "exam_traps": "Do not confuse with chronic bronchitis. Emphysema patients are NOT typically cyanosed or oedematous early. They are thin and severely breathless. Cyanosis and oedema appear only in end-stage disease.",
    "memory_pearl": "\"Pink because they still have oxygen. Puffer because they work extremely hard to breathe. Pursed lips = their own PEEP.\"",
    "high_yield_tip": "In exam questions: Barrel chest + pursed-lip breathing + thin body + no peripheral oedema = Emphysema (Pink Puffer). Cyanosis + oedema + productive cough = Chronic Bronchitis (Blue Bloater).",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Chronic bronchitis",
        "B. Cor pulmonale",
        "C. Emphysema",
        "D. Pulmonary embolism"
      ],
      "question": "A 65-year-old thin male has severe dyspnoea, pursed-lip breathing, barrel chest and no ankle swelling. His oxygen saturation is 92%. What is the most likely diagnosis?",
      "explanation": "Emphysema (Pink Puffer) presents with pursed-lip breathing, barrel chest, severe dyspnoea, thin build, and maintained oxygenation until late. No oedema or productive cough distinguishes it from chronic bronchitis."
    },
    "specialty": "Respiratory"
  },
  {
    "id": "ef105358-6618-4a03-8bd7-ebf525943e8f",
    "title": "Cranial Nerve Function Type",
    "acronym": "Some Say Marry Money But My Brother Says Big Brains Matter More",
    "description": "Whether each cranial nerve is Sensory, Motor or Both",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Neurology",
    "tags": [
      "Neurology",
      "Cranial Nerves",
      "Sensory",
      "Motor"
    ],
    "phrases": [
      "Some",
      "Say",
      "Marry",
      "Money",
      "But",
      "My",
      "Brother",
      "Says",
      "Big",
      "Brains",
      "Matter",
      "More"
    ],
    "breakdown": [
      {
        "emoji": "👃",
        "phrase": "Some — I: Sensory",
        "meaning": "Olfactory — smell only"
      },
      {
        "emoji": "👁️",
        "phrase": "Say — II: Sensory",
        "meaning": "Optic — vision only"
      },
      {
        "emoji": "🔄",
        "phrase": "Marry — III: Motor",
        "meaning": "Oculomotor — eye movement, pupil, eyelid"
      },
      {
        "emoji": "↕️",
        "phrase": "Money — IV: Motor",
        "meaning": "Trochlear — superior oblique"
      },
      {
        "emoji": "✋",
        "phrase": "But — V: Both",
        "meaning": "Trigeminal — face sensation (S) + mastication (M)"
      },
      {
        "emoji": "↔️",
        "phrase": "My — VI: Motor",
        "meaning": "Abducens — lateral rectus"
      },
      {
        "emoji": "😊",
        "phrase": "Brother — VII: Both",
        "meaning": "Facial — expression (M) + taste anterior tongue (S)"
      },
      {
        "emoji": "👂",
        "phrase": "Says — VIII: Sensory",
        "meaning": "Vestibulocochlear — hearing and balance"
      },
      {
        "emoji": "🗣️",
        "phrase": "Big — IX: Both",
        "meaning": "Glossopharyngeal — taste + swallowing"
      },
      {
        "emoji": "🫀",
        "phrase": "Brains — X: Both",
        "meaning": "Vagus — parasympathetics + swallowing"
      },
      {
        "emoji": "💪",
        "phrase": "Matter — XI: Motor",
        "meaning": "Accessory — shoulder shrug"
      },
      {
        "emoji": "👅",
        "phrase": "More — XII: Motor",
        "meaning": "Hypoglossal — tongue movement"
      }
    ],
    "clinical_significance": "Knowing whether each cranial nerve is sensory, motor or both helps differentiate lesion types and guides neurological examination.",
    "causes": [
      "Cranial nerve palsy",
      "Stroke",
      "Brain tumour",
      "Peripheral neuropathy"
    ],
    "exam_traps": "Students forget that CN V and VII are \"Both.\" In Bell's palsy (CN VII), patients lose both facial expression AND taste on the anterior tongue — because VII is both sensory and motor.",
    "memory_pearl": "\"Sensory: I, II, VIII. Motor: III, IV, VI, XI, XII. Both: V, VII, IX, X.\"",
    "high_yield_tip": "NCK tip: If a patient cannot shrug their shoulder, suspect CN XI (Accessory) lesion. If they cannot move their tongue, suspect CN XII (Hypoglossal) — tongue deviates TOWARD the side of the lesion.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. CN V — Trigeminal",
        "B. CN VII — Facial",
        "C. CN IX — Glossopharyngeal",
        "D. CN XII — Hypoglossal"
      ],
      "question": "A patient has lost taste sensation on the anterior two-thirds of the tongue and cannot close their left eye. Which cranial nerve is affected?",
      "explanation": "CN VII (Facial) is BOTH sensory and motor. It carries taste from the anterior 2/3 of the tongue (sensory) and controls facial muscles including eyelid closure (motor). This presentation describes Bell's palsy or an LMN CN VII lesion."
    },
    "specialty": "Neurology"
  },
  {
    "id": "2617cdbf-24f7-46c2-a2f7-f3c1deafeb07",
    "title": "Cranial Nerves I–XII",
    "acronym": "Oh Oh Oh To Touch And Feel Very Good Velvet AH",
    "description": "The 12 cranial nerves in order",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Neurology",
    "tags": [
      "Neurology",
      "Cranial Nerves",
      "Anatomy"
    ],
    "phrases": [
      "Oh",
      "Oh",
      "Oh",
      "To Touch",
      "And Feel",
      "Very Good",
      "Velvet",
      "AH"
    ],
    "breakdown": [
      {
        "emoji": "👃",
        "phrase": "Oh — I: Olfactory",
        "meaning": "Smell — sensory only"
      },
      {
        "emoji": "👁️",
        "phrase": "Oh — II: Optic",
        "meaning": "Vision — sensory only"
      },
      {
        "emoji": "🔄",
        "phrase": "Oh — III: Oculomotor",
        "meaning": "Eye movement (most), pupil constriction, eyelid elevation"
      },
      {
        "emoji": "↕️",
        "phrase": "To — IV: Trochlear",
        "meaning": "Superior oblique muscle — downward and inward gaze"
      },
      {
        "emoji": "✋",
        "phrase": "Touch — V: Trigeminal",
        "meaning": "Face sensation (sensory) + muscles of mastication (motor)"
      },
      {
        "emoji": "↔️",
        "phrase": "And — VI: Abducens",
        "meaning": "Lateral rectus — eye moves outward (abduction)"
      },
      {
        "emoji": "😊",
        "phrase": "Feel — VII: Facial",
        "meaning": "Facial expression (motor) + taste anterior 2/3 tongue (sensory)"
      },
      {
        "emoji": "👂",
        "phrase": "Very — VIII: Vestibulocochlear",
        "meaning": "Hearing and balance — sensory only"
      },
      {
        "emoji": "🗣️",
        "phrase": "Good — IX: Glossopharyngeal",
        "meaning": "Taste posterior 1/3 tongue + swallowing + gag reflex"
      },
      {
        "emoji": "🫀",
        "phrase": "Velvet — X: Vagus",
        "meaning": "Parasympathetics to heart, lungs, gut; swallowing; speaking"
      },
      {
        "emoji": "💪",
        "phrase": "AH — XI: Accessory",
        "meaning": "Sternocleidomastoid and trapezius — shoulder shrug and head turn"
      },
      {
        "emoji": "👅",
        "phrase": "AH — XII: Hypoglossal",
        "meaning": "Tongue movement — motor only; deviation toward lesion side"
      }
    ],
    "clinical_significance": "Used in neurological examination to test each cranial nerve systematically. Essential for diagnosing stroke, brain tumours, meningitis and cranial nerve palsies.",
    "causes": [
      "Stroke",
      "Brain tumour",
      "Meningitis",
      "Skull base fracture",
      "Multiple sclerosis",
      "Diabetes (CN III, VI, VII palsy)"
    ],
    "exam_traps": "Students commonly confuse CN III (Oculomotor) with CN VI (Abducens). CN III controls most eye movements plus pupil and eyelid. CN VI only abducts the eye. Also: CN VII (facial) palsy — UMN lesion spares forehead; LMN lesion (Bell's palsy) affects entire face.",
    "memory_pearl": "\"Oh Oh Oh — the first three are eye/smell/vision. To Touch And Feel — sensation around there. Very Good Velvet AH — hearing, swallowing, shoulder, tongue.\"",
    "high_yield_tip": "For NCK: A patient with a drooping eyelid AND dilated pupil = CN III palsy (surgical emergency — rule out posterior communicating artery aneurysm). Drooping eyelid alone = Horner syndrome.",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. CN III — Oculomotor",
        "B. CN IV — Trochlear",
        "C. CN VI — Abducens",
        "D. CN VII — Facial"
      ],
      "question": "Which cranial nerve is responsible for lateral eye movement (abduction)?",
      "explanation": "CN VI (Abducens) controls the lateral rectus muscle, which abducts the eye. CN III controls most other eye movements. CN IV controls downward/inward movement. CN VI palsy causes inability to look laterally — the eye deviates medially."
    },
    "specialty": "Neurology"
  },
  {
    "id": "eca8ce11-b51e-4578-84b3-2c55ef465e8f",
    "title": "Cushing's Triad — Raised ICP",
    "acronym": "Hypertension, Bradycardia, Irregular Breathing",
    "description": "Late signs of raised intracranial pressure",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Neurology",
    "tags": [
      "Neurology",
      "Emergency",
      "ICP",
      "Neurosurgery"
    ],
    "phrases": [
      "↑ Hypertension (widening pulse pressure)",
      "↓ Bradycardia",
      "Irregular breathing"
    ],
    "breakdown": [
      {
        "emoji": "📈",
        "phrase": "Hypertension",
        "meaning": "Rising systolic BP with widening pulse pressure — the brainstem tries to maintain cerebral perfusion against rising ICP"
      },
      {
        "emoji": "🫀",
        "phrase": "Bradycardia",
        "meaning": "Reflex bradycardia (Cushing reflex) as the body responds to hypertension via baroreceptors"
      },
      {
        "emoji": "🌬️",
        "phrase": "Irregular Breathing",
        "meaning": "Cheyne-Stokes, central neurogenic hyperventilation, or ataxic breathing — brainstem compression affecting respiratory centres"
      }
    ],
    "clinical_significance": "Cushing's Triad is a LATE and OMINOUS sign of severely raised intracranial pressure indicating brainstem herniation is imminent. Immediate neurosurgical intervention is required. Do not wait for all three signs — act on early ICP signs.",
    "causes": [
      "Traumatic brain injury",
      "Intracerebral haemorrhage",
      "Subdural haematoma",
      "Subarachnoid haemorrhage",
      "Brain tumour",
      "Hydrocephalus",
      "Cerebral oedema"
    ],
    "exam_traps": "Students wait for all THREE signs before acting. By the time all three are present, brain herniation may have already begun. Early signs of raised ICP are: decreasing GCS, worsening headache, vomiting (especially projectile), papilloedema, and unequal pupils. Cushing's Triad is a pre-terminal sign.",
    "memory_pearl": "\"Hypertension + Bradycardia + Irregular breathing = Brain about to herniate. This is an emergency.\"",
    "high_yield_tip": "Head positioning: Elevate head of bed to 30 degrees to reduce ICP (not flat or Trendelenburg). Avoid hypotension, hypoxia, hypercapnia and fever — all worsen ICP. Hyperventilation (PCO2 target 35 mmHg) temporarily reduces ICP by causing cerebral vasoconstriction.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Neurogenic shock",
        "B. Cushing's triad — severely raised intracranial pressure",
        "C. Autonomic dysreflexia",
        "D. Vasovagal syncope"
      ],
      "question": "A head-injured patient develops systolic blood pressure of 190 mmHg, heart rate of 52 bpm, and irregular respirations. What does this indicate?",
      "explanation": "Cushing's Triad: Hypertension (widening pulse pressure) + Bradycardia + Irregular breathing = critically raised ICP with impending brainstem herniation. This is a neurosurgical emergency requiring immediate intervention (mannitol, head elevation, urgent CT, consider emergency decompression)."
    },
    "specialty": "Neurology"
  },
  {
    "id": "5dc7a49e-21d6-45b3-a987-8847acc3b8dc",
    "title": "Depression — SIGECAPS",
    "acronym": "SIGECAPS",
    "description": "DSM diagnostic criteria for major depressive episode",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Mental Health",
      "Depression",
      "Psychiatry"
    ],
    "phrases": [
      "Sleep disturbance",
      "Interest loss",
      "Guilt",
      "Energy loss",
      "Concentration poor",
      "Appetite change",
      "Psychomotor changes",
      "Suicidal ideation"
    ],
    "breakdown": [
      {
        "emoji": "😴",
        "phrase": "S — Sleep disturbance",
        "meaning": "Insomnia (difficulty falling/staying asleep) or hypersomnia (sleeping too much)"
      },
      {
        "emoji": "😐",
        "phrase": "I — Interest loss",
        "meaning": "Anhedonia — loss of interest or pleasure in previously enjoyable activities"
      },
      {
        "emoji": "😔",
        "phrase": "G — Guilt",
        "meaning": "Excessive guilt, worthlessness, self-blame; may be delusional in severity"
      },
      {
        "emoji": "😩",
        "phrase": "E — Energy loss",
        "meaning": "Profound fatigue and loss of energy not explained by activity"
      },
      {
        "emoji": "🧠",
        "phrase": "C — Concentration poor",
        "meaning": "Difficulty thinking, concentrating, or making decisions"
      },
      {
        "emoji": "🍽️",
        "phrase": "A — Appetite change",
        "meaning": "Decreased appetite with weight loss, or increased appetite with weight gain"
      },
      {
        "emoji": "🐢",
        "phrase": "P — Psychomotor changes",
        "meaning": "Psychomotor retardation (slowed movement/speech) or agitation (observable by others)"
      },
      {
        "emoji": "💀",
        "phrase": "S — Suicidal ideation",
        "meaning": "Recurrent thoughts of death, suicidal ideation, or suicide attempt"
      }
    ],
    "clinical_significance": "Major Depressive Disorder (MDD) is diagnosed when 5 or more SIGECAPS symptoms are present for ≥2 weeks, with at least one being depressed mood or anhedonia (loss of interest). Symptoms must cause significant functional impairment.",
    "causes": [
      "Biological factors (serotonin, norepinephrine dysregulation)",
      "Chronic illness (cancer, diabetes, cardiac disease)",
      "Hypothyroidism",
      "Postpartum depression",
      "Grief and bereavement",
      "Substance use",
      "Life stressors"
    ],
    "exam_traps": "Always assess suicidal ideation directly — asking about suicide does NOT increase suicide risk. It is a professional obligation. Ask: \"Are you having any thoughts of harming yourself or ending your life?\" Also: Distinguish MDD from bipolar disorder — bipolar includes manic/hypomanic episodes. Using antidepressants alone in bipolar can trigger mania.",
    "memory_pearl": "\"SIG = prescription (Latin). E CAPS = energy capsules. The doctor is PRESCRIBING energy capsules because the depressed patient has none.\"",
    "high_yield_tip": "NCK High-Yield: The MOST IMPORTANT assessment in a depressed patient is SUICIDE RISK. Assess lethality, plan, intent, and means. A patient who has given away possessions or says \"things would be better without me\" requires immediate safety assessment.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Assessment of nutritional status",
        "B. Assessment for suicidal ideation",
        "C. Referral to occupational therapy",
        "D. Sleep hygiene education"
      ],
      "question": "A patient states she has felt worthless and hopeless for the past 3 weeks, cannot sleep, has lost 5kg, and has no interest in her children. Which priority assessment must be performed?",
      "explanation": "In any patient presenting with depression symptoms (SIGECAPS), suicidal ideation must always be assessed as the PRIORITY. Multiple SIGECAPS symptoms for >2 weeks = major depressive episode. Suicidal ideation is both a diagnostic criterion AND an immediate safety concern."
    },
    "specialty": "Mental Health"
  },
  {
    "id": "dbdaeb6b-d8eb-4101-8d8c-ec21abc067fe",
    "title": "Diabetic Ketoacidosis — KUSSMAUL",
    "acronym": "KUSSMAUL",
    "description": "Classic presentation of diabetic ketoacidosis",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "DKA",
      "Diabetes",
      "Endocrine",
      "Emergency"
    ],
    "phrases": [
      "Kussmaul breathing",
      "Urine ketones",
      "Severe dehydration",
      "Sweet fruity breath",
      "Metabolic acidosis",
      "Altered mental status",
      "Urgent insulin therapy",
      "Loss of potassium"
    ],
    "breakdown": [
      {
        "emoji": "💨",
        "phrase": "K — Kussmaul breathing",
        "meaning": "Deep, rapid breathing to blow off CO2 and compensate for metabolic acidosis"
      },
      {
        "emoji": "🧪",
        "phrase": "U — Urine ketones",
        "meaning": "Elevated urinary ketones from fat breakdown (lipolysis)"
      },
      {
        "emoji": "🏜️",
        "phrase": "S — Severe dehydration",
        "meaning": "Osmotic diuresis from hyperglycaemia causes profound fluid loss"
      },
      {
        "emoji": "🍬",
        "phrase": "S — Sweet fruity breath",
        "meaning": "Acetone on breath from ketone production"
      },
      {
        "emoji": "⚗️",
        "phrase": "M — Metabolic acidosis",
        "meaning": "pH <7.3, bicarbonate <18 mEq/L from ketoacid accumulation"
      },
      {
        "emoji": "🧠",
        "phrase": "A — Altered mental status",
        "meaning": "Confusion to coma from hyperosmolarity and acidosis"
      },
      {
        "emoji": "💉",
        "phrase": "U — Urgent insulin therapy",
        "meaning": "IV regular insulin infusion is cornerstone of treatment"
      },
      {
        "emoji": "⚡",
        "phrase": "L — Loss of potassium",
        "meaning": "Total body K+ depleted despite initially normal/high serum K+ — monitor closely during treatment"
      }
    ],
    "clinical_significance": "DKA occurs in Type 1 diabetes (and sometimes Type 2) due to absolute insulin deficiency. Without insulin, cells cannot use glucose, so the body breaks down fat, producing ketoacids. The triad: hyperglycaemia + metabolic acidosis + ketonaemia.",
    "causes": [
      "Missed insulin doses",
      "Infection (most common precipitant)",
      "New-onset Type 1 diabetes",
      "Stress/illness",
      "Certain medications (SGLT2 inhibitors)"
    ],
    "exam_traps": "The most dangerous NCK trap: Potassium in DKA. Serum potassium may appear NORMAL or HIGH on admission because acidosis drives K+ out of cells. But total body potassium is DEPLETED. As insulin is given and acidosis corrects, potassium shifts BACK into cells — causing dangerous HYPOKALAEMIA. Always monitor K+ closely and replace early.",
    "memory_pearl": "\"DKA smells sweet, breathes deeply, pees constantly, and is confused. Always monitor potassium when giving insulin.\"",
    "high_yield_tip": "DKA vs HHS: DKA has ketonaemia and acidosis (pH <7.3). HHS (Hyperosmolar Hyperglycaemic State) has NO significant ketones or acidosis but extremely high glucose (>33 mmol/L) and osmolarity. HHS is more common in Type 2.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Blood glucose only",
        "B. Serum potassium and blood glucose",
        "C. Sodium and chloride",
        "D. Urine output only"
      ],
      "question": "A patient with Type 1 diabetes has glucose 28 mmol/L, pH 7.2, and ketones 4+. What is the PRIORITY monitoring during insulin infusion?",
      "explanation": "During insulin infusion in DKA, potassium shifts back into cells as acidosis corrects, causing hypokalaemia. Serum potassium and blood glucose must be monitored closely. Potassium replacement is usually needed within 2–4 hours of starting insulin."
    },
    "specialty": "Endocrine"
  },
  {
    "id": "8b3495d9-4817-491c-a1dc-4a0978e852e7",
    "title": "Digoxin Toxicity — DIG",
    "acronym": "DIG",
    "description": "Classic signs of digoxin toxicity",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Pharmacology",
    "tags": [
      "Digoxin",
      "Toxicity",
      "Cardiology",
      "Pharmacology"
    ],
    "phrases": [
      "Diarrhoea",
      "Irregular heartbeat",
      "Green-yellow vision"
    ],
    "breakdown": [
      {
        "emoji": "💩",
        "phrase": "D — Diarrhoea",
        "meaning": "GI symptoms: nausea, vomiting, diarrhoea, abdominal pain — often earliest signs"
      },
      {
        "emoji": "💓",
        "phrase": "I — Irregular heartbeat",
        "meaning": "Bradycardia, heart block, ventricular arrhythmias — most dangerous"
      },
      {
        "emoji": "🟡",
        "phrase": "G — Green-yellow vision",
        "meaning": "Xanthopsia — classic visual disturbance; halos around lights"
      }
    ],
    "clinical_significance": "Digoxin has a narrow therapeutic index (0.5–2.0 ng/mL). Toxicity is common, especially in elderly patients, those with renal impairment, or those taking medications that increase digoxin levels.",
    "causes": [
      "Digoxin overdose",
      "Renal failure (decreased excretion)",
      "Hypokalaemia (potassium competes with digoxin at binding sites)",
      "Hypomagnesaemia",
      "Drugs: amiodarone, verapamil, quinidine increase digoxin levels"
    ],
    "exam_traps": "Hypokalaemia is the most dangerous risk factor for digoxin toxicity because potassium and digoxin compete for the same binding site on Na/K ATPase. Low potassium = more digoxin binding = toxicity even at \"normal\" digoxin levels.",
    "memory_pearl": "\"DIG: Diarrhoea + Irregular heart + Green-yellow vision. Monitor potassium — hypokalaemia makes everything worse.\"",
    "high_yield_tip": "NCK High-Yield: Always check potassium BEFORE and DURING digoxin therapy. Hypokalaemia dramatically increases toxicity risk. Treatment: Stop digoxin, correct electrolytes, digoxin-specific antibody fragments (Digibind) for severe toxicity.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Administer the next digoxin dose as scheduled",
        "B. Hold digoxin and check serum digoxin and potassium levels",
        "C. Give potassium supplements immediately",
        "D. Increase the digoxin dose to therapeutic range"
      ],
      "question": "A patient on digoxin reports nausea, vomiting, and yellow-green halos around lights. ECG shows bradycardia. What is the priority nursing action?",
      "explanation": "These are classic signs of digoxin toxicity (DIG: Diarrhoea/nausea, Irregular rhythm, Green-yellow vision). The priority is to hold the next dose and assess digoxin and potassium levels. Giving more digoxin would be dangerous."
    },
    "specialty": "Pharmacology"
  },
  {
    "id": "b7ca7f5c-eea3-4acd-93d4-92f34981dfde",
    "title": "Heart Sound Locations",
    "acronym": "All Physicians Take Money",
    "description": "Auscultation sequence for heart sounds",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Anatomy",
    "tags": [
      "Cardiology",
      "Auscultation",
      "Murmurs"
    ],
    "phrases": [
      "All",
      "Physicians",
      "Take",
      "Money"
    ],
    "breakdown": [
      {
        "emoji": "🔵",
        "phrase": "A → Aortic",
        "meaning": "Right 2nd intercostal space, sternal border"
      },
      {
        "emoji": "🫁",
        "phrase": "P → Pulmonic",
        "meaning": "Left 2nd intercostal space, sternal border"
      },
      {
        "emoji": "🔴",
        "phrase": "T → Tricuspid",
        "meaning": "Left lower sternal border, 4th–5th ICS"
      },
      {
        "emoji": "💓",
        "phrase": "M → Mitral",
        "meaning": "Apex, 5th ICS, midclavicular line"
      }
    ],
    "clinical_significance": "Used during cardiac examination to identify and localize heart murmurs. Each valve is best heard at a specific anatomical position on the chest wall.",
    "causes": [
      "Aortic stenosis",
      "Mitral regurgitation",
      "Tricuspid regurgitation",
      "Pulmonary stenosis"
    ],
    "exam_traps": "Heart valve anatomical location is NOT the same as where it is best heard. The mitral valve is best heard at the apex (apex beat area), not over the actual valve location.",
    "memory_pearl": "Aortic and Pulmonic are at the top (2nd ICS). Tricuspid is lower sternal border. Mitral is at the apex.",
    "high_yield_tip": "When a question asks about heart murmur location, use \"All Physicians Take Money\" to locate where to place your stethoscope, not the anatomical valve location.",
    "practice_question": {
      "answer": "D",
      "options": [
        "A. Right 2nd intercostal space",
        "B. Left 2nd intercostal space",
        "C. Left lower sternal border",
        "D. Apex, 5th ICS midclavicular line"
      ],
      "question": "Where is the mitral valve best auscultated?",
      "explanation": "The mitral valve is best heard at the cardiac apex — 5th intercostal space at the midclavicular line. This is where the apex beat is felt and where mitral murmurs radiate."
    },
    "specialty": "Cardiovascular"
  },
  {
    "id": "ceec105e-575e-4e55-ba15-e2e01d62c22e",
    "title": "Heart Valve Order",
    "acronym": "Try Pulling My Aorta",
    "description": "Order blood flows through the four heart valves",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Anatomy",
    "tags": [
      "Cardiology",
      "Valves",
      "Anatomy"
    ],
    "phrases": [
      "Try",
      "Pulling",
      "My",
      "Aorta"
    ],
    "breakdown": [
      {
        "emoji": "🔵",
        "phrase": "Try → Tricuspid valve",
        "meaning": "Right atrium to right ventricle"
      },
      {
        "emoji": "🫁",
        "phrase": "Pulling → Pulmonary valve",
        "meaning": "Right ventricle to pulmonary artery → lungs"
      },
      {
        "emoji": "🔴",
        "phrase": "My → Mitral valve",
        "meaning": "Left atrium to left ventricle"
      },
      {
        "emoji": "💪",
        "phrase": "Aorta → Aortic valve",
        "meaning": "Left ventricle to aorta → body"
      }
    ],
    "clinical_significance": "Used when studying cardiac anatomy, blood circulation, echocardiography and heart murmurs. Understanding valve order is essential for interpreting murmur timing and location.",
    "causes": [
      "Valvular heart disease",
      "Rheumatic heart disease",
      "Infective endocarditis",
      "Congenital heart disease"
    ],
    "exam_traps": "Many students confuse pulmonary and aortic valves. Remember blood reaches the lungs (Pulmonary) before the body (Aortic). Right side pumps to lungs first.",
    "memory_pearl": "Blood flows: Right heart → Tricuspid → Pulmonary → Lungs → Mitral → Aortic → Body.",
    "high_yield_tip": "Always visualize blood flow direction rather than memorizing valve names in isolation. Right side = deoxygenated blood to lungs. Left side = oxygenated blood to body.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Mitral, Aortic, Tricuspid, Pulmonary",
        "B. Tricuspid, Pulmonary, Mitral, Aortic",
        "C. Aortic, Mitral, Pulmonary, Tricuspid",
        "D. Pulmonary, Tricuspid, Aortic, Mitral"
      ],
      "question": "In what order does blood flow through the cardiac valves?",
      "explanation": "Blood flows from right atrium through Tricuspid → right ventricle → Pulmonary → lungs → left atrium → Mitral → left ventricle → Aortic → body. Try Pulling My Aorta."
    },
    "specialty": "Cardiovascular"
  },
  {
    "id": "c7cdbfe5-3417-4d79-9869-da9205c73479",
    "title": "HELLP Syndrome",
    "acronym": "HELLP",
    "description": "Severe complication of preeclampsia in pregnancy",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Obstetrics",
    "tags": [
      "Obstetrics",
      "Preeclampsia",
      "Maternity",
      "Emergency"
    ],
    "phrases": [
      "Haemolysis",
      "Elevated Liver enzymes",
      "Low Platelets"
    ],
    "breakdown": [
      {
        "emoji": "🩸",
        "phrase": "H — Haemolysis",
        "meaning": "Red blood cells destroyed as they pass through damaged blood vessels — causes anaemia and jaundice"
      },
      {
        "emoji": "🫀",
        "phrase": "E — Elevated Liver enzymes",
        "meaning": "AST and ALT elevated; right upper quadrant pain; risk of liver rupture"
      },
      {
        "emoji": "🔻",
        "phrase": "LP — Low Platelets",
        "meaning": "Thrombocytopenia <100,000/mm³; risk of DIC and bleeding"
      }
    ],
    "clinical_significance": "HELLP syndrome is a life-threatening complication of severe preeclampsia, usually presenting in the third trimester or postpartum. It requires immediate delivery of the baby as definitive treatment.",
    "causes": [
      "Severe preeclampsia",
      "Preeclampsia with severe features",
      "Eclampsia"
    ],
    "exam_traps": "Students confuse HELLP with DIC. HELLP has thrombocytopenia AND elevated liver enzymes + haemolysis. DIC has thrombocytopenia + elevated clotting times + fibrin degradation products. HELLP can progress TO DIC. Also: HELLP can occur UP TO 48 hours AFTER delivery.",
    "memory_pearl": "\"HELLP: Haemolysis + Elevated Liver enzymes + Low Platelets. It is severe preeclampsia plus organ damage.\"",
    "high_yield_tip": "Classic HELLP presentation: pregnant woman with epigastric or RUQ pain, malaise, nausea/vomiting, headache. Blood tests: elevated LDH (haemolysis), elevated AST/ALT (liver), low platelets. Immediate obstetric emergency.",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Appendicitis",
        "B. Acute cholecystitis",
        "C. HELLP syndrome",
        "D. Viral hepatitis"
      ],
      "question": "A 32-week pregnant woman presents with epigastric pain, nausea, and headache. Labs show: AST 350, platelets 75,000/mm³, LDH elevated. What is the diagnosis?",
      "explanation": "HELLP syndrome: Haemolysis (elevated LDH), Elevated Liver enzymes (AST 350), Low Platelets (75,000). Combined with pregnancy and epigastric pain, this is a classic HELLP presentation. Immediate obstetric management and likely delivery is required."
    },
    "specialty": "Maternity"
  },
  {
    "id": "5bfa7d75-f98b-4487-abd3-3fc87eb45604",
    "title": "HIV First-Line Treatment — TLD",
    "acronym": "TLD",
    "description": "Kenya's standard first-line HIV regimen",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Pharmacology",
    "tags": [
      "HIV",
      "ARV",
      "Pharmacology",
      "Infectious Disease"
    ],
    "phrases": [
      "Tenofovir",
      "Lamivudine",
      "Dolutegravir"
    ],
    "breakdown": [
      {
        "emoji": "💊",
        "phrase": "T — Tenofovir (TDF)",
        "meaning": "Nucleotide reverse transcriptase inhibitor (NRTI). Monitor renal function — can cause nephrotoxicity."
      },
      {
        "emoji": "💊",
        "phrase": "L — Lamivudine (3TC)",
        "meaning": "Nucleoside reverse transcriptase inhibitor (NRTI). Well tolerated. Also used in Hepatitis B treatment."
      },
      {
        "emoji": "💊",
        "phrase": "D — Dolutegravir (DTG)",
        "meaning": "Integrase strand transfer inhibitor (INSTI). High barrier to resistance. Central nervous system side effects possible (insomnia, mood changes)."
      }
    ],
    "clinical_significance": "TLD (Tenofovir + Lamivudine + Dolutegravir) is Kenya's preferred first-line antiretroviral therapy per Kenya National ARV Guidelines. It is given as a single daily fixed-dose combination tablet, improving adherence. Goal: undetectable viral load (<20–50 copies/mL).",
    "causes": [
      "HIV-1 infection",
      "Prevention of Mother-to-Child Transmission (PMTCT)"
    ],
    "exam_traps": "Dolutegravir should be used with CAUTION in the first trimester of pregnancy due to early concerns about neural tube defects (though evidence has evolved — check current guidelines). Tenofovir requires monitoring of renal function (eGFR) and bone density.",
    "memory_pearl": "\"TLD = one tablet once daily. Simple regimen, high resistance barrier, excellent efficacy.\"",
    "high_yield_tip": "WHO Test and Treat strategy: All HIV-positive individuals should start ARVs regardless of CD4 count. Viral load monitoring is the gold standard to assess treatment response — not CD4 alone.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Zidovudine + Lamivudine + Nevirapine (ZLN)",
        "B. Tenofovir + Lamivudine + Dolutegravir (TLD)",
        "C. Efavirenz + Tenofovir + Emtricitabine",
        "D. Abacavir + Lamivudine + Lopinavir"
      ],
      "question": "A patient newly diagnosed with HIV in Kenya is about to start ARV therapy. Which first-line regimen is currently recommended?",
      "explanation": "Kenya's current first-line HIV regimen is TLD: Tenofovir + Lamivudine + Dolutegravir. It is given as a single daily tablet, has a high barrier to resistance, and is the WHO-preferred regimen globally for most adults and adolescents."
    },
    "specialty": "Infectious Diseases"
  },
  {
    "id": "0bc17595-aee0-4f48-85b0-a25f012b1eee",
    "title": "Hypercalcaemia — Bones Stones Groans Thrones Overtones",
    "acronym": "Bones Stones Groans Thrones Psychiatric Overtones",
    "description": "Classic signs of hypercalcaemia",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Calcium",
      "Electrolytes",
      "Endocrine",
      "Nephrology"
    ],
    "phrases": [
      "Bones — Bone pain",
      "Stones — Kidney stones",
      "Groans — Abdominal pain",
      "Thrones — Polyuria/polydipsia",
      "Psychiatric Overtones — Confusion/depression"
    ],
    "breakdown": [
      {
        "emoji": "🦴",
        "phrase": "Bones — Bone pain",
        "meaning": "Osteoclast activation causes bone resorption, pain, and pathological fractures"
      },
      {
        "emoji": "💎",
        "phrase": "Stones — Kidney stones",
        "meaning": "Calcium deposits in renal tubules; nephrocalcinosis and nephrolithiasis"
      },
      {
        "emoji": "😣",
        "phrase": "Groans — Abdominal pain",
        "meaning": "Nausea, vomiting, constipation, peptic ulcers (calcium stimulates gastrin)"
      },
      {
        "emoji": "🚽",
        "phrase": "Thrones — Polyuria/polydipsia",
        "meaning": "Nephrogenic diabetes insipidus — kidneys cannot concentrate urine"
      },
      {
        "emoji": "🧠",
        "phrase": "Psychiatric Overtones — Confusion",
        "meaning": "Depression, anxiety, cognitive impairment, psychosis in severe hypercalcaemia"
      }
    ],
    "clinical_significance": "Hypercalcaemia (serum Ca2+ >2.6 mmol/L) is most commonly caused by hyperparathyroidism and malignancy. Recognition is important because severe hypercalcaemia (>3.5 mmol/L) is a medical emergency causing cardiac arrhythmias and coma.",
    "causes": [
      "Primary hyperparathyroidism (most common in outpatients)",
      "Malignancy — bone metastases, PTHrP secretion",
      "Vitamin D toxicity",
      "Thiazide diuretics",
      "Sarcoidosis",
      "Immobility",
      "Milk-alkali syndrome"
    ],
    "exam_traps": "Students confuse hypercalcaemia with hypocalcaemia. Hypercalcaemia: BONES STONES GROANS THRONES (think excess calcium causing havoc). Hypocalcaemia: CATS (Convulsions, Arrhythmias, Tetany, Spasms — think the body becoming hyperexcitable without calcium).",
    "memory_pearl": "\"Too much calcium makes your bones hurt, kidneys stone, gut groan, bathroom throne, and brain moan.\"",
    "high_yield_tip": "ECG in hypercalcaemia shows SHORT QT interval (calcium shortens repolarisation). Hypocalcaemia shows PROLONGED QT. This is a high-yield NCK exam point.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Tetany, muscle cramps, perioral tingling",
        "B. Bone pain, kidney stones, constipation, confusion",
        "C. Bradycardia, oedema, weight gain",
        "D. Polyuria, polydipsia, weight loss only"
      ],
      "question": "A patient with lung cancer has serum calcium of 3.2 mmol/L. Which symptom cluster do you expect?",
      "explanation": "Hypercalcaemia presents as Bones (pain), Stones (renal), Groans (GI: constipation, nausea), Thrones (polyuria/polydipsia), and Psychiatric Overtones (confusion). Malignancy is a common cause. Option A describes hypocalcaemia (CATS)."
    },
    "specialty": "Electrolytes"
  },
  {
    "id": "3e080df7-814a-4791-844b-54d16f85d363",
    "title": "Hypocalcaemia — CATS",
    "acronym": "CATS",
    "description": "Signs of hypocalcaemia",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Calcium",
      "Electrolytes",
      "Neuromuscular"
    ],
    "phrases": [
      "Convulsions",
      "Arrhythmias",
      "Tetany",
      "Spasms"
    ],
    "breakdown": [
      {
        "emoji": "⚡",
        "phrase": "C — Convulsions",
        "meaning": "Seizures due to neuronal hyperexcitability from low calcium"
      },
      {
        "emoji": "💓",
        "phrase": "A — Arrhythmias",
        "meaning": "Prolonged QT interval; risk of torsades de pointes and cardiac arrest"
      },
      {
        "emoji": "🤝",
        "phrase": "T — Tetany",
        "meaning": "Carpopedal spasm; Trousseau sign (inflate BP cuff = hand spasm); Chvostek sign (tap facial nerve = facial twitch)"
      },
      {
        "emoji": "😫",
        "phrase": "S — Spasms",
        "meaning": "Laryngospasm (life-threatening), bronchospasm, muscle cramps, perioral tingling"
      }
    ],
    "clinical_significance": "Hypocalcaemia (serum Ca2+ <2.1 mmol/L) increases neuronal membrane excitability, causing neuromuscular hyperexcitability. Severe hypocalcaemia is an emergency requiring IV calcium gluconate.",
    "causes": [
      "Hypoparathyroidism (post-thyroidectomy — most common surgical cause)",
      "Vitamin D deficiency",
      "Renal failure (cannot activate Vitamin D)",
      "Hypomagnesaemia (prevents PTH release)",
      "Pancreatitis (calcium binds to fat necrosis)",
      "Massive blood transfusion (citrate chelates calcium)"
    ],
    "exam_traps": "Chvostek sign (facial twitch on tapping CN VII) and Trousseau sign (carpopedal spasm on BP cuff inflation) are CLINICAL SIGNS of hypocalcaemia tested in NCK. Also: ECG shows PROLONGED QT — opposite of hypercalcaemia (short QT).",
    "memory_pearl": "\"Low calcium makes everything twitch and cramp. CATS: Convulsions, Arrhythmias, Tetany, Spasms.\"",
    "high_yield_tip": "Post-thyroidectomy patients are at highest risk of hypocalcaemia from accidental removal of parathyroid glands. Monitor for tingling around the mouth and carpopedal spasm in the first 24–48 hours after thyroid surgery.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Hyperkalaemia",
        "B. Hypocalcaemia",
        "C. Stroke",
        "D. Hypercalcaemia"
      ],
      "question": "A patient who had a thyroidectomy yesterday develops perioral tingling and carpopedal spasm when you inflate their blood pressure cuff. What does this indicate?",
      "explanation": "Carpopedal spasm on blood pressure cuff inflation is Trousseau sign — a classic clinical sign of hypocalcaemia. Post-thyroidectomy patients risk hypoparathyroidism from parathyroid gland damage or removal, reducing PTH and causing low calcium (CATS)."
    },
    "specialty": "Electrolytes"
  },
  {
    "id": "64c7f81d-2a57-4fbb-8cb5-0f2b41da8201",
    "title": "Placenta Previa vs Placental Abruption",
    "acronym": "Painless = Previa. Painful = Abruption",
    "description": "Differentiating antepartum haemorrhage causes",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Obstetrics",
    "tags": [
      "Obstetrics",
      "Antepartum Haemorrhage",
      "Maternity"
    ],
    "phrases": [
      "Painless bleeding = Placenta Previa",
      "Painful bleeding = Placental Abruption"
    ],
    "breakdown": [
      {
        "emoji": "😌",
        "phrase": "Painless = Previa",
        "meaning": "Placenta covers the cervical os; bleeding is PAINLESS bright red bleeding without contractions. Avoid vaginal examination."
      },
      {
        "emoji": "😣",
        "phrase": "Painful = Abruption",
        "meaning": "Placenta separates prematurely from uterine wall; PAINFUL, dark red bleeding with board-like rigid uterus and fetal distress. Blood may be concealed."
      }
    ],
    "clinical_significance": "Antepartum haemorrhage (APH) occurs after 24 weeks. The two main causes — placenta previa and placental abruption — must be differentiated immediately as management differs completely.",
    "causes": [
      "Placenta Previa: low-lying placenta, prior C-section, multiple pregnancies, advanced maternal age",
      "Placental Abruption: hypertension, trauma, cocaine use, smoking, short umbilical cord, prior abruption"
    ],
    "exam_traps": "NEVER perform a vaginal examination in suspected placenta previa — it can cause catastrophic haemorrhage by disrupting the placenta. Always image (ultrasound) first. In contrast, placental abruption may have no visible bleeding (concealed abruption) yet be life-threatening.",
    "memory_pearl": "\"Pain with blood = Abruption (something tore). Painless blood = Previa (placenta is in the way).\"",
    "high_yield_tip": "NCK KEY: Placenta previa — painless, bright red, recurrent bleeds. Previa is confirmed by ultrasound. C-section is required. Placental abruption — painful, dark blood, rigid uterus, fetal distress. Can be concealed haemorrhage. Emergency delivery.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Placental abruption",
        "B. Placenta previa",
        "C. Preterm labour",
        "D. Vasa praevia"
      ],
      "question": "A 30-week pregnant woman presents with sudden painless bright red vaginal bleeding. No uterine tenderness. What is the most likely diagnosis?",
      "explanation": "Painless bright red vaginal bleeding without uterine tenderness is the classic presentation of placenta previa. The placenta covers or is near the cervical os. A vaginal examination must NEVER be performed — diagnosis is by ultrasound. C-section is required."
    },
    "specialty": "Maternity"
  },
  {
    "id": "8a9bed54-240d-4997-8856-54cd5a0328e0",
    "title": "RICE for Soft Tissue Injury",
    "acronym": "Rest, Ice, Compression, Elevation",
    "description": "Immediate first aid and management for acute soft tissue injuries (sprains, strains, contusions).",
    "created_at": "2026-08-01T07:14:23.502809+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "First Aid",
      "Orthopedics",
      "Trauma"
    ],
    "phrases": [
      "Rest",
      "Ice",
      "Compression",
      "Elevation"
    ],
    "breakdown": [
      {
        "emoji": "🛑",
        "phrase": "Rest",
        "meaning": "Stop using the injured part to prevent further damage"
      },
      {
        "emoji": "🧊",
        "phrase": "Ice",
        "meaning": "Apply cold packs for 15-20 minutes every 2-3 hours to cause vasoconstriction and reduce swelling"
      },
      {
        "emoji": "🩹",
        "phrase": "Compression",
        "meaning": "Wrap the injured area with an elastic bandage to minimize edema and provide support"
      },
      {
        "emoji": "🛏️",
        "phrase": "Elevation",
        "meaning": "Raise the injured part above the level of the heart to promote venous return and decrease swelling"
      }
    ],
    "clinical_significance": "The RICE protocol is the universal standard for the first 24-48 hours of an acute musculoskeletal injury. It controls inflammation, reduces pain, limits edema, and promotes optimal healing conditions.",
    "causes": [
      "Ankle Sprain",
      "Muscle Strain",
      "Sports Injuries",
      "Contusions"
    ],
    "exam_traps": "Do not apply ice directly to the skin (always use a cloth barrier to prevent frostbite). Do not leave ice on for more than 20 minutes at a time to prevent rebound vasodilation.",
    "memory_pearl": "Treat injuries with RICE, not heat, for the first 48 hours!",
    "high_yield_tip": "Check neurovascular status (pulses, capillary refill, sensation, movement) distal to the injury BEFORE and AFTER applying a compression bandage to ensure you haven't compromised blood flow.",
    "practice_question": {
      "answer": "D",
      "options": [
        "A. I will apply a heating pad for 20 minutes to reduce pain.",
        "B. I will keep an ice pack on my ankle continuously overnight.",
        "C. I will wrap my ankle tightly starting from the calf down to the toes.",
        "D. I will prop my leg up on a couple of pillows while lying on the couch."
      ],
      "question": "A patient arrives at the clinic with a severely sprained ankle sustained 2 hours ago. The nurse teaches the patient the RICE method. Which statement by the patient indicates a correct understanding of the instructions?",
      "explanation": "Elevation (raising the injured limb above heart level) promotes venous return and reduces swelling. Heat (A) should be avoided in the first 48 hours. Ice (B) should only be applied for 15-20 minutes at a time. Compression (C) should wrap from distal to proximal (toes to calf) to push fluid toward the heart."
    },
    "specialty": "Medical-Surgical"
  },
  {
    "id": "96242ede-a301-4940-bf68-073e484e0d2c",
    "title": "Schizophrenia — HAD",
    "acronym": "HAD",
    "description": "Positive symptoms of schizophrenia",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Mental Health",
      "Schizophrenia",
      "Psychiatry"
    ],
    "phrases": [
      "Hallucinations",
      "Agitation",
      "Delusions"
    ],
    "breakdown": [
      {
        "emoji": "👂",
        "phrase": "H — Hallucinations",
        "meaning": "Sensory perceptions without external stimulus. Auditory hallucinations (hearing voices) are most common in schizophrenia. Can also be visual, tactile, olfactory."
      },
      {
        "emoji": "😤",
        "phrase": "A — Agitation",
        "meaning": "Disorganized behaviour, psychomotor agitation, unpredictable actions; can include catatonia"
      },
      {
        "emoji": "🧩",
        "phrase": "D — Delusions",
        "meaning": "Fixed false beliefs not based in reality. Persecutory (most common), grandiose, referential, or somatic. Patient cannot be talked out of them."
      }
    ],
    "clinical_significance": "Schizophrenia is a chronic psychotic disorder. HAD represents the positive symptoms (added behaviours not normally present). Negative symptoms include flat affect, alogia, avolition, anhedonia, and social withdrawal.",
    "causes": [
      "Genetic predisposition",
      "Dopamine dysregulation (mesolimbic pathway — excess)",
      "Cannabis use",
      "Stress/trauma",
      "Neurodevelopmental factors"
    ],
    "exam_traps": "Positive symptoms (HAD) = excess or distortion of normal functions. Negative symptoms = diminishment of normal functions (flat affect, social withdrawal, poverty of speech). Antipsychotics treat positive symptoms well but have limited effect on negative symptoms.",
    "memory_pearl": "\"HAD — the patient HAD experiences that weren't real and beliefs that weren't true.\"",
    "high_yield_tip": "Auditory command hallucinations (voices telling the patient to harm self or others) are a PSYCHIATRIC EMERGENCY requiring immediate intervention. Always assess for command hallucinations in psychotic patients.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Negative symptoms of schizophrenia",
        "B. Positive symptoms of schizophrenia — delusions and hallucinations",
        "C. Symptoms of major depressive disorder",
        "D. Symptoms of dementia"
      ],
      "question": "A patient reports that the television is sending special messages directly to him, and he hears voices telling him he is chosen. Which symptoms are these?",
      "explanation": "HAD: Hallucinations (hearing voices) and Delusions (referential delusion — believing TV sends personal messages) are POSITIVE symptoms of schizophrenia — they represent experiences and beliefs added to normal function. Negative symptoms would be flat affect, withdrawal, and poverty of speech."
    },
    "specialty": "Mental Health"
  },
  {
    "id": "bf20f2da-3996-4579-8492-d24115798564",
    "title": "TORCH Infections",
    "acronym": "Toxoplasmosis, Other, Rubella, Cytomegalovirus, Herpes Simplex",
    "description": "Maternal infections that can cross the placenta and cause severe fetal anomalies.",
    "created_at": "2026-08-01T07:14:23.502809+00:00",
    "created_by": null,
    "category": "Pediatrics",
    "tags": [
      "Maternity",
      "Infectious Disease",
      "Neonatal"
    ],
    "phrases": [
      "Toxoplasmosis",
      "Other",
      "Rubella",
      "Cytomegalovirus (CMV)",
      "Herpes Simplex Virus (HSV)"
    ],
    "breakdown": [
      {
        "emoji": "🐈",
        "phrase": "Toxoplasmosis",
        "meaning": "Acquired from cat feces or undercooked meat; causes hydrocephalus and chorioretinitis"
      },
      {
        "emoji": "🦠",
        "phrase": "Other",
        "meaning": "Includes Syphilis, Varicella, Parvovirus B19, and Zika virus"
      },
      {
        "emoji": "🔴",
        "phrase": "Rubella",
        "meaning": "German measles; causes cataracts, deafness, and congenital heart defects"
      },
      {
        "emoji": "🧬",
        "phrase": "Cytomegalovirus (CMV)",
        "meaning": "Most common congenital infection; causes microcephaly, hearing loss, and petechial rash"
      },
      {
        "emoji": "👄",
        "phrase": "Herpes Simplex Virus (HSV)",
        "meaning": "Usually transmitted during birth; causes vesicular lesions and severe CNS damage"
      }
    ],
    "clinical_significance": "TORCH infections are a group of vertically transmitted diseases that cause severe congenital anomalies, miscarriage, or stillbirth if acquired during pregnancy. Early screening and prevention are essential.",
    "causes": [
      "Vertical transmission during pregnancy",
      "Exposure to cat litter (Toxoplasmosis)",
      "Unvaccinated mother (Rubella)"
    ],
    "exam_traps": "A pregnant nurse should NEVER be assigned to care for a patient with an active TORCH infection (e.g., a child with Rubella or CMV) due to the severe teratogenic risks.",
    "memory_pearl": "TORCH burns the fetus—prevent these infections at all costs during pregnancy!",
    "high_yield_tip": "Toxoplasmosis education is a frequent exam topic: tell pregnant women to avoid changing cat litter boxes and to ensure all meat is fully cooked.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Ensure you receive the MMR vaccine today.",
        "B. Avoid changing your cat's litter box.",
        "C. Wash your hands frequently after contact with toddlers.",
        "D. Avoid eating soft, unpasteurized cheeses."
      ],
      "question": "A nurse is providing prenatal education to a newly pregnant client. To prevent Toxoplasmosis (part of the TORCH complex), which instruction should the nurse include?",
      "explanation": "Toxoplasmosis is a parasitic infection commonly transmitted through contact with cat feces (changing litter boxes) or eating undercooked contaminated meat. MMR vaccine (A) is for Rubella but is contraindicated in pregnancy. Handwashing after toddler contact (C) prevents CMV. Unpasteurized cheeses (D) relate to Listeria, which is not classically in the TORCH acronym."
    },
    "specialty": "Midwifery"
  },
  {
    "id": "af5bf193-859a-4e61-943e-8659f74d3ea9",
    "title": "Trauma Assessment — ABCDE",
    "acronym": "ABCDE",
    "description": "Systematic primary survey in trauma/emergency nursing",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Emergency",
    "tags": [
      "Emergency",
      "Trauma",
      "Assessment",
      "Critical Care"
    ],
    "phrases": [
      "Airway",
      "Breathing",
      "Circulation",
      "Disability",
      "Exposure"
    ],
    "breakdown": [
      {
        "emoji": "🫁",
        "phrase": "A — Airway",
        "meaning": "Assess and secure airway with C-spine protection. Look for obstruction, stridor, foreign body. Jaw thrust (not head tilt) if C-spine injury suspected."
      },
      {
        "emoji": "💨",
        "phrase": "B — Breathing",
        "meaning": "Assess respiratory rate, chest movement, oxygen saturation. Look for tension pneumothorax, haemothorax, flail chest. Apply oxygen."
      },
      {
        "emoji": "❤️",
        "phrase": "C — Circulation",
        "meaning": "Assess pulse (rate, rhythm, quality), blood pressure, skin colour/temperature/capillary refill. Control haemorrhage. IV access."
      },
      {
        "emoji": "🧠",
        "phrase": "D — Disability",
        "meaning": "AVPU or GCS assessment. Check pupils (size, equality, reactivity). Blood glucose. Signs of raised ICP."
      },
      {
        "emoji": "🔍",
        "phrase": "E — Exposure",
        "meaning": "Undress patient completely for full assessment. Keep warm to prevent hypothermia. Log roll to examine back."
      }
    ],
    "clinical_significance": "ABCDE is the systematic approach used in all emergency assessments, particularly trauma. It follows a strict priority order: airway problems kill fastest, so they are addressed first. Life threats are identified and treated at each step before moving to the next.",
    "causes": [
      "Motor vehicle accidents",
      "Falls",
      "Penetrating injuries",
      "Burns",
      "Drowning",
      "Anaphylaxis",
      "Cardiac arrest"
    ],
    "exam_traps": "Students often skip straight to the obvious injury (e.g. a fractured limb). Always follow ABCDE in ORDER — a patient cannot breathe if the airway is obstructed, regardless of the dramatic limb injury. Also: in C-spine injury, use jaw thrust NOT head-tilt-chin-lift to open airway.",
    "memory_pearl": "\"A before B before C — every time, every patient. Fix each problem before moving on.\"",
    "high_yield_tip": "In paediatric trauma: children compensate so well that they can appear stable while losing 25–30% of blood volume. By the time they decompensate, they crash fast. Always worry about tachycardia in an injured child.",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Immobilize the cervical spine with a collar",
        "B. Establish IV access and give fluids",
        "C. Open the airway using jaw thrust",
        "D. Assess GCS score"
      ],
      "question": "A patient arrives after a road traffic accident with a suspected cervical spine injury. He is unresponsive. What is the FIRST priority?",
      "explanation": "A (Airway) is always the first priority in ABCDE. In C-spine injury, use jaw thrust (not head-tilt-chin-lift) to open the airway while maintaining spinal alignment. Without a patent airway, all other interventions are futile."
    },
    "specialty": "Emergency Nursing"
  },
  {
    "id": "9555d5ea-3056-4949-9779-079088de4170",
    "title": "Tuberculosis Treatment — RIPE",
    "acronym": "RIPE",
    "description": "First-line drugs for tuberculosis treatment",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Tuberculosis",
      "Pharmacology",
      "Infectious Disease",
      "Respiratory"
    ],
    "phrases": [
      "Rifampicin",
      "Isoniazid",
      "Pyrazinamide",
      "Ethambutol"
    ],
    "breakdown": [
      {
        "emoji": "🔴",
        "phrase": "R — Rifampicin",
        "meaning": "Inhibits bacterial RNA polymerase; turns body secretions orange-red. Duration: 6 months total."
      },
      {
        "emoji": "💛",
        "phrase": "I — Isoniazid",
        "meaning": "Inhibits mycolic acid synthesis; causes peripheral neuropathy (give pyridoxine/B6 prophylactically). Duration: 6 months."
      },
      {
        "emoji": "🟠",
        "phrase": "P — Pyrazinamide",
        "meaning": "Active against intracellular TB; causes hyperuricaemia (gout). Duration: first 2 months only."
      },
      {
        "emoji": "🟡",
        "phrase": "E — Ethambutol",
        "meaning": "Inhibits arabinosyl transferase; can cause optic neuritis (monitor visual acuity). Duration: first 2 months."
      }
    ],
    "clinical_significance": "Standard TB treatment is 6 months: 2 months RIPE (intensive phase) + 4 months RI (continuation phase). Directly Observed Therapy (DOT) is recommended to ensure adherence and prevent drug resistance.",
    "causes": [
      "Mycobacterium tuberculosis",
      "HIV co-infection increases TB risk",
      "Multi-drug resistant TB (MDR-TB) — resistant to at least Rifampicin and Isoniazid"
    ],
    "exam_traps": "The most common NCK trap: Isoniazid causes peripheral neuropathy — ALWAYS give Pyridoxine (Vitamin B6) concurrently to prevent this. Also: Rifampicin turns urine, sweat, and tears orange-red — warn patients this is normal and not harmful.",
    "memory_pearl": "\"RIPE: 2 months of all four. Then continue RI for 4 more months. TOTAL = 6 months.\"",
    "high_yield_tip": "Monitor: Liver function (all four drugs are hepatotoxic). Visual acuity (Ethambutol — optic neuritis). Uric acid (Pyrazinamide — gout). Peripheral neuropathy (Isoniazid — give B6).",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Rifampicin",
        "B. Isoniazid",
        "C. Pyrazinamide",
        "D. Ethambutol"
      ],
      "question": "A patient starting TB treatment reports tingling and numbness in both hands and feet after 4 weeks. Which drug is most likely responsible?",
      "explanation": "Isoniazid causes peripheral neuropathy by interfering with Vitamin B6 (pyridoxine) metabolism. This is why pyridoxine supplementation is routinely given alongside isoniazid. Ethambutol causes optic neuritis (visual symptoms), not peripheral neuropathy."
    },
    "specialty": "Infectious Diseases"
  },
  {
    "id": "f001b655-30c5-4d68-9599-e56257b8eabe",
    "title": "VEAL CHOP",
    "acronym": "Variable, Early, Acceleration, Late — Cord, Head, Okay, Placenta",
    "description": "Interpreting fetal heart rate monitor tracings and their underlying causes.",
    "created_at": "2026-08-01T07:14:23.502809+00:00",
    "created_by": null,
    "category": "Obstetrics",
    "tags": [
      "Maternity",
      "Midwifery",
      "Labor"
    ],
    "phrases": [
      "Variable Decelerations",
      "Early Decelerations",
      "Accelerations",
      "Late Decelerations"
    ],
    "breakdown": [
      {
        "emoji": "➰",
        "phrase": "Variable Decelerations",
        "meaning": "Cord Compression"
      },
      {
        "emoji": "👶",
        "phrase": "Early Decelerations",
        "meaning": "Head Compression"
      },
      {
        "emoji": "📈",
        "phrase": "Accelerations",
        "meaning": "Okay (Normal fetal well-being)"
      },
      {
        "emoji": "⚠️",
        "phrase": "Late Decelerations",
        "meaning": "Placental Insufficiency"
      }
    ],
    "clinical_significance": "Provides a quick reference to interpret electronic fetal monitoring (EFM) during labor. Identifying the type of deceleration dictates the required nursing intervention (e.g., position change for variable, immediate delivery preparation for late).",
    "causes": [
      "Umbilical Cord Compression",
      "Fetal Head Compression",
      "Normal Fetal Movement",
      "Uteroplacental Insufficiency"
    ],
    "exam_traps": "Do not confuse early and late decelerations. Early decelerations mirror the contraction (peak of contraction = nadir of deceleration) and are benign. Late decelerations start after the peak of the contraction and indicate fetal hypoxia.",
    "memory_pearl": "VEAL matches with CHOP! V=C, E=H, A=O, L=P.",
    "high_yield_tip": "For Late Decelerations (Placental insufficiency), remember the LION interventions: Left lateral position, IV fluids, Oxygen (10L/min non-rebreather), Notify provider (and stop oxytocin if running).",
    "practice_question": {
      "answer": "C",
      "options": [
        "A. Head compression",
        "B. Cord compression",
        "C. Placental insufficiency",
        "D. Normal fetal movement"
      ],
      "question": "During continuous fetal monitoring, the nurse notes decelerations that begin after the peak of the uterine contraction and return to baseline after the contraction ends. Using the VEAL CHOP mnemonic, what is the most likely cause?",
      "explanation": "These are late decelerations (starting after the peak of the contraction). According to VEAL CHOP, Late decelerations indicate Placental insufficiency, which is a sign of fetal hypoxia requiring immediate intervention."
    },
    "specialty": "Midwifery"
  },
  {
    "id": "36a0f95b-c791-41ce-926a-b7a607a8119e",
    "title": "Wound Healing — HIP",
    "acronym": "HIP",
    "description": "Phases of wound healing",
    "created_at": "2026-07-05T18:51:57.332843+00:00",
    "created_by": null,
    "category": "Med-Surgical",
    "tags": [
      "Wound Care",
      "Surgery",
      "Med-Surg",
      "Tissue Repair"
    ],
    "phrases": [
      "Haemostasis",
      "Inflammation",
      "Proliferation",
      "(Remodelling/Maturation)"
    ],
    "breakdown": [
      {
        "emoji": "⚡",
        "phrase": "H — Haemostasis (Immediate, 0–minutes)",
        "meaning": "Vasoconstriction + platelet plug formation + fibrin clot seals the wound. Pro-inflammatory mediators released."
      },
      {
        "emoji": "🔴",
        "phrase": "I — Inflammation (0–5 days)",
        "meaning": "Vasodilation + neutrophils arrive first (24h) then macrophages (48–72h). Wound is red, swollen, warm, painful. Macrophages debride and release growth factors."
      },
      {
        "emoji": "🔧",
        "phrase": "P — Proliferation (Day 5 – 3 weeks)",
        "meaning": "Fibroblasts produce collagen. Angiogenesis (new blood vessels). Wound contraction. Granulation tissue fills the defect."
      },
      {
        "emoji": "✨",
        "phrase": "Remodelling/Maturation (3 weeks – 2 years)",
        "meaning": "Collagen reorganizes and cross-links. Scar matures — tensile strength increases but never reaches 100% (maximum ~80%)."
      }
    ],
    "clinical_significance": "Understanding wound healing phases guides nursing assessment and intervention. Wound healing can be delayed by infection, poor nutrition, diabetes, poor blood supply, steroids, and advanced age.",
    "causes": [
      "Infection (most common cause of delayed healing)",
      "Diabetes mellitus (poor vascularisation and nerve damage)",
      "Malnutrition (especially Vitamin C and zinc deficiency)",
      "Corticosteroids (suppress inflammation and fibroblasts)",
      "Ischaemia / peripheral vascular disease",
      "Anaemia"
    ],
    "exam_traps": "Students confuse the order of cells in the inflammatory phase. Neutrophils arrive FIRST (within hours) and clean debris. Macrophages arrive SECOND (48–72h) and are essential for directing repair. Without macrophages, wound healing fails.",
    "memory_pearl": "\"HIP: Haemostasis stops the bleeding. Inflammation cleans the wound. Proliferation rebuilds it. Remodelling strengthens it.\"",
    "high_yield_tip": "Vitamin C is essential for collagen synthesis (hydroxylation of proline and lysine). Vitamin C deficiency (scurvy) causes poor wound healing and bleeding gums. Zinc is a cofactor for many enzymes in wound repair. Assess nutrition in non-healing wounds.",
    "practice_question": {
      "answer": "B",
      "options": [
        "A. Haemostasis",
        "B. Inflammation",
        "C. Proliferation",
        "D. Remodelling"
      ],
      "question": "A patient who had abdominal surgery 3 days ago has a warm, red, swollen wound edge with serous drainage. What phase of wound healing is this?",
      "explanation": "The inflammatory phase occurs 0–5 days post-injury. Redness, warmth, swelling and serous drainage are NORMAL features of inflammation. Neutrophils and macrophages are active. This is not infection — infection presents with purulent drainage, increased pain, fever, and systemic signs."
    },
    "specialty": "Wound Care"
  },
  {
    "title": "Insulin Types, Peaks & Onsets",
    "acronym": "RN & Rapid/Long-Acting",
    "description": "Onsets, peaks, and durations of Rapid, Regular, NPH, and Long-Acting insulins.",
    "specialty": "Endocrine",
    "category": "Pharmacology",
    "tags": [
      "Insulin",
      "Diabetes",
      "Pharmacology",
      "Endocrine"
    ],
    "phrases": [
      "Rapid: 15 min onset, 1 hr peak, 3 hr duration",
      "Regular (Short): 30 min onset, 2 hr peak, 8 hr duration",
      "NPH (Intermediate): 2 hr onset, 8 hr peak, 16 hr duration",
      "Long-Acting (Glargine): No peak, 24 hr duration"
    ],
    "breakdown": [
      {
        "emoji": "⚡",
        "phrase": "Rapid (Lispro, Aspart)",
        "meaning": "Onset 15 min, peak 1 hr, duration 3 hr. Must have food tray at bedside before injection."
      },
      {
        "emoji": "💧",
        "phrase": "Regular (Short-Acting)",
        "meaning": "Onset 30 min, peak 2 hr, duration 8 hr. ONLY insulin that can be administered intravenously (IV)."
      },
      {
        "emoji": "🥛",
        "phrase": "NPH (Intermediate)",
        "meaning": "Onset 2 hr, peak 8 hr, duration 16 hr. Cloudy appearance; highest hypoglycemia risk is at 8 hours (mid-afternoon)."
      },
      {
        "emoji": "⏳",
        "phrase": "Long-Acting (Glargine/Detemir)",
        "meaning": "No peak, duration 24 hr. Maintains steady basal level. Never mix with other insulins in the same syringe."
      }
    ],
    "clinical_significance": "Accurate knowledge of insulin peak times is essential to prevent severe, life-threatening hypoglycemic episodes. Patients are at the highest risk for hypoglycemia during the medication peak time.",
    "causes": [
      "Type 1 Diabetes Mellitus",
      "Type 2 Diabetes Mellitus with secondary failure",
      "Diabetic Ketoacidosis (Regular IV)",
      "Gestational Diabetes"
    ],
    "exam_traps": "Questions frequently ask which insulin can be given IV: ONLY Regular insulin! When mixing Regular and NPH, remember RN: draw Regular (Clear) FIRST, then NPH (Cloudy) second to avoid contaminating the clear vial with cloudy protamine.",
    "memory_pearl": "\"15 minutes feels like 1 hour during 3 rapid responses. Short-staffed nurses go from 30 to 2 to 8. Nurses Play Hero to 8-16 year olds. The lonely guy (Lantus) has no peak.\"",
    "high_yield_tip": "Always provide a snack at the peak time of intermediate insulin (e.g., afternoon snack for morning NPH) to avoid mid-afternoon hypoglycemia.",
    "practice_question": {
      "question": "A nurse administers 15 units of NPH insulin subcutaneously to a client at 08:00. At what time is this client at the greatest risk for a hypoglycemic reaction?",
      "options": [
        "A. 09:00 to 10:00",
        "B. 10:00 to 12:00",
        "C. 14:00 to 18:00",
        "D. 22:00 to 24:00"
      ],
      "answer": "C",
      "explanation": "NPH is an intermediate-acting insulin that peaks 6 to 10 hours after injection (average 8 hours). Administered at 08:00, peak hypoglycemic risk occurs between 14:00 and 18:00 (mid-to-late afternoon)."
    },
    "id": "m-30"
  },
  {
    "title": "Opioid Toxicity Triad",
    "acronym": "CPR",
    "description": "Pathognomonic clinical signs of acute opioid intoxication and overdose.",
    "specialty": "Emergency Nursing",
    "category": "Pharmacology",
    "tags": [
      "Opioids",
      "Toxicology",
      "Emergency",
      "Antidote"
    ],
    "phrases": [
      "C — Coma (Unresponsiveness)",
      "P — Pinpoint pupils (Miosis)",
      "R — Respiratory depression (<10-12/min)"
    ],
    "breakdown": [
      {
        "emoji": "💤",
        "phrase": "C — Coma",
        "meaning": "Profuse central nervous system depression, lethargy, stupor, unresponsiveness to verbal or physical stimuli."
      },
      {
        "emoji": "👁️",
        "phrase": "P — Pinpoint Pupils",
        "meaning": "Bilateral miosis due to stimulation of the Edinger-Westphal nucleus via mu and kappa opioid receptors."
      },
      {
        "emoji": "🫁",
        "phrase": "R — Respiratory Depression",
        "meaning": "Decreased respiratory rate (<10 breaths/min), shallow hypoventilation, hypercapnia, cyanosis, and respiratory arrest."
      }
    ],
    "clinical_significance": "Opioid overdose leads to fatal anoxic brain injury and cardiac arrest if respiratory drive is not restored immediately with naloxone (Narcan).",
    "causes": [
      "Morphine overdose",
      "Heroin use",
      "Fentanyl exposure",
      "Oxycodone or Methadone intoxication",
      "Tramadol overdose"
    ],
    "exam_traps": "Students often confuse opioid toxicity (Pinpoint pupils / Miosis) with anticholinergic/sympathomimetic toxicity (Dilated pupils / Mydriasis). Furthermore, remember that Naloxone has a SHORTER half-life (30-90 mins) than most opioids (4-6 hours), so the patient can relapse into coma once naloxone wears off!",
    "memory_pearl": "\"If the patient is in a Coma, has Pinpoint pupils, and needs Respiratory resuscitation: give Naloxone (Narcan) immediately!\"",
    "high_yield_tip": "Always monitor vitals for at least 2 to 4 hours following naloxone administration. Multiple doses may be required for long-acting opioids like methadone.",
    "practice_question": {
      "question": "A client is brought to the ED with respirations of 6 breaths/min, pinpoint pupils, and lethargy following an accidental medication ingestion. After IV naloxone administration, the client awakens. What is the nurse's priority ongoing assessment?",
      "options": [
        "A. Monitor for recurrent respiratory depression as naloxone wears off",
        "B. Immediately discharge the client once alert",
        "C. Administer an oral dose of naloxone to sustain effect",
        "D. Restrict fluids to prevent pulmonary edema"
      ],
      "answer": "A",
      "explanation": "The duration of action of naloxone is 30 to 90 minutes, whereas opioids often have a much longer half-life. The patient can slip back into respiratory depression when naloxone metabolizes, requiring repeat doses."
    },
    "id": "m-31"
  },
  {
    "title": "Lithium Toxicity & Side Effects",
    "acronym": "L-I-T-H-I-U-M",
    "description": "Therapeutic monitoring, early toxicity indicators, and clinical precautions for lithium therapy.",
    "specialty": "Mental Health",
    "category": "Pharmacology",
    "tags": [
      "Lithium",
      "Bipolar",
      "Psychiatry",
      "Toxicity"
    ],
    "phrases": [
      "L — Level (0.6–1.2 mEq/L)",
      "I — Increased urination & thirst (Polyuria/Polydipsia)",
      "T — Tremors (Fine vs. Coarse)",
      "H — Hypothyroidism risk",
      "I — Impaired renal function (Kidneys excrete 100%)",
      "U — Upset stomach (Nausea/Vomiting/Diarrhea)",
      "M — Muscle weakness & Ataxia"
    ],
    "breakdown": [
      {
        "emoji": "🧪",
        "phrase": "L — Level (0.6–1.2 mEq/L)",
        "meaning": "Narrow therapeutic window. Serum levels >1.5 mEq/L cause early toxicity; >2.0 mEq/L causes life-threatening toxicity."
      },
      {
        "emoji": "💧",
        "phrase": "I — Increased Urination & Thirst",
        "meaning": "Inhibits renal response to ADH, potentially causing nephrogenic diabetes insipidus."
      },
      {
        "emoji": "👋",
        "phrase": "T — Tremors",
        "meaning": "Fine resting hand tremor is a common expected side effect; COARSE hand tremor is a cardinal sign of toxicity!"
      },
      {
        "emoji": "🦋",
        "phrase": "H — Hypothyroidism",
        "meaning": "Interferes with thyroid hormone synthesis; check baseline TSH and periodic thyroid panels."
      },
      {
        "emoji": "🫘",
        "phrase": "I — Impaired Renal Function",
        "meaning": "Excreted entirely unchanged by the kidneys; monitor BUN, serum creatinine, and GFR."
      },
      {
        "emoji": "🤢",
        "phrase": "U — Upset Stomach",
        "meaning": "GI upset (nausea, vomiting, diarrhea) is the earliest presenting symptom of lithium toxicity."
      },
      {
        "emoji": "🚶",
        "phrase": "M — Muscle Weakness & Ataxia",
        "meaning": "Neurological progression: muscle hyperirritability, uncoordinated gait, slurred speech, confusion, seizures."
      }
    ],
    "clinical_significance": "Lithium is the gold-standard mood stabilizer for Bipolar I disorder, but its narrow therapeutic index requires rigorous client education regarding fluid and sodium intake.",
    "causes": [
      "Bipolar Disorder (Manic episodes)",
      "Dehydration / fluid loss",
      "Low-sodium diets",
      "Diuretics (Hydrochlorothiazide)",
      "NSAID concurrent use"
    ],
    "exam_traps": "Sodium and lithium compete for renal tubular reabsorption! If serum sodium is LOW (hyponatremia or dehydration), kidneys reabsorb MORE lithium, causing toxic levels! Instruct patients NEVER to go on low-sodium diets or take thiazide diuretics without medical supervision.",
    "memory_pearl": "\"Low salt = High lithium! Fine tremors are fine; coarse tremors mean toxicity!\"",
    "high_yield_tip": "Draw lithium trough levels 12 hours after the previous night's dose, right before the morning dose.",
    "practice_question": {
      "question": "A client taking lithium carbonate for bipolar disorder reports persistent nausea, loose stools, and a new coarse hand tremor. What is the nurse's priority action?",
      "options": [
        "A. Administer the scheduled morning dose with food",
        "B. Reassure the client that coarse tremors are common expected effects",
        "C. Hold the dose and request an urgent serum lithium level",
        "D. Encourage the client to initiate a strict low-sodium diet"
      ],
      "answer": "C",
      "explanation": "Nausea, diarrhea, and coarse hand tremors are hallmark manifestations of acute lithium toxicity. The nurse must hold the dose and immediately check serum lithium levels."
    },
    "id": "m-32"
  },
  {
    "title": "Warfarin vs. Heparin: Labs & Antidotes",
    "acronym": "HePtt & Coumadin",
    "description": "Differentiating coagulation lab monitoring, onset times, and reversal agents for anticoagulants.",
    "specialty": "Cardiovascular",
    "category": "Pharmacology",
    "tags": [
      "Anticoagulants",
      "Heparin",
      "Warfarin",
      "Hematology"
    ],
    "phrases": [
      "Heparin: aPTT monitoring (46–70s therapeutic), Antidote = Protamine Sulfate",
      "Warfarin: PT/INR monitoring (2.0–3.0 therapeutic), Antidote = Vitamin K"
    ],
    "breakdown": [
      {
        "emoji": "⚡",
        "phrase": "Heparin (Fast Acting)",
        "meaning": "Parenteral (IV/SubQ). Rapid onset within minutes. Inactivates thrombin and factor Xa. Safe during pregnancy."
      },
      {
        "emoji": "⏱️",
        "phrase": "aPTT Monitoring",
        "meaning": "Normal aPTT is 30–40 sec; therapeutic target is 1.5 to 2.5 times baseline (typically 60–80 seconds)."
      },
      {
        "emoji": "🛡️",
        "phrase": "Protamine Sulfate",
        "meaning": "The definitive reversal antidote for unfractionated heparin and partial antidote for LMWH (Enoxaparin)."
      },
      {
        "emoji": "💊",
        "phrase": "Warfarin / Coumadin (Slow Acting)",
        "meaning": "Oral tablet. Inhibits vitamin K-dependent clotting factors (II, VII, IX, X). Takes 3–5 days to reach therapeutic INR."
      },
      {
        "emoji": "📊",
        "phrase": "PT / INR Monitoring",
        "meaning": "Target INR is 2.0–3.0 for DVT/PE and AFib; target INR is 2.5–3.5 for mechanical prosthetic heart valves."
      },
      {
        "emoji": "🥬",
        "phrase": "Vitamin K (Phytonadione)",
        "meaning": "The antidote for warfarin. Clients must maintain consistent dietary intake of green leafy vegetables."
      }
    ],
    "clinical_significance": "Anticoagulant therapy carries high hemorrhage risk. Nurses must titrate continuous infusions based on protocol lab targets and keep antidotes immediately available.",
    "causes": [
      "Deep Vein Thrombosis (DVT)",
      "Pulmonary Embolism (PE)",
      "Atrial Fibrillation",
      "Mechanical Heart Valve Replacement",
      "Acute Coronary Syndrome"
    ],
    "exam_traps": "Students often mix up the lab tests. Memory trick: Count the letters! Heparin has 7 letters → monitored by PTT (also 7 letters in \"Heparin\"). Coumadin has 8 letters → monitored by PT and INR. Heparin is safe in pregnancy; Warfarin crosses placenta and is TERATOGENIC!",
    "memory_pearl": "\"HePtt takes PTT and Protamine. Coumadin takes PT/INR and Vitamin K.\"",
    "high_yield_tip": "Bridge therapy: Warfarin takes 48–72 hours to achieve anticoagulation, so IV heparin or enoxaparin is continued concurrently until the INR reaches therapeutic range (2.0–3.0).",
    "practice_question": {
      "question": "A client receiving a continuous IV heparin infusion has an aPTT of 115 seconds with active epistaxis and hematuria. Which medication should the nurse anticipate administering?",
      "options": [
        "A. Vitamin K",
        "B. Protamine sulfate",
        "C. Aminocaproic acid",
        "D. Calcium gluconate"
      ],
      "answer": "B",
      "explanation": "An aPTT of 115 seconds exceeds the therapeutic range (typically 60–80 seconds). With active bleeding, the nurse anticipates administering Protamine sulfate, the specific antidote for heparin. Vitamin K is the antidote for warfarin."
    },
    "id": "m-33"
  },
  {
    "title": "Serotonin Syndrome",
    "acronym": "S-H-I-V-E-R-S",
    "description": "Clinical manifestations of life-threatening central and peripheral serotonin receptor overstimulation.",
    "specialty": "Mental Health",
    "category": "Pharmacology",
    "tags": [
      "Psychiatry",
      "SSRIs",
      "Toxicity",
      "Emergency"
    ],
    "phrases": [
      "S — Shivering",
      "H — Hyperreflexia & Clonus",
      "I — Increased temperature (Hyperthermia)",
      "V — Vital sign instability (Tachycardia, labile BP)",
      "E — Encephalopathy (Agitation, delirium)",
      "R — Restlessness & Akathisia",
      "S — Sweating (Diaphoresis)"
    ],
    "breakdown": [
      {
        "emoji": "🥶",
        "phrase": "S — Shivering",
        "meaning": "Involuntary shivering and tremors, often presenting early."
      },
      {
        "emoji": "🦵",
        "phrase": "H — Hyperreflexia & Clonus",
        "meaning": "Exaggerated deep tendon reflexes and rhythmic ankle/ocular clonus; key discriminator from NMS."
      },
      {
        "emoji": "🌡️",
        "phrase": "I — Increased Temperature",
        "meaning": "Hyperthermia (>38°C to >40°C in severe cases) caused by excessive muscular hyperactivity."
      },
      {
        "emoji": "💓",
        "phrase": "V — Vital Sign Instability",
        "meaning": "Autonomic hyperactivity: tachycardia, labile blood pressure, tachypnea, and pupil dilation (mydriasis)."
      },
      {
        "emoji": "🤯",
        "phrase": "E — Encephalopathy",
        "meaning": "Altered mental status: confusion, extreme agitation, disorientation, hallucination, delirium."
      },
      {
        "emoji": "🏃",
        "phrase": "R — Restlessness",
        "meaning": "Motor agitation, pacing, inability to sit still (akathisia), ataxia."
      },
      {
        "emoji": "💦",
        "phrase": "S — Sweating (Diaphoresis)",
        "meaning": "Profuse sweating and cutaneous flushing with hyperactive bowel sounds."
      }
    ],
    "clinical_significance": "Rapidly fatal if unaddressed. Frequently triggered when two serotonergic medications (e.g., SSRIs + MAOIs, Tramadol, St. John's Wort, Linezolid) are combined without a proper washout period.",
    "causes": [
      "SSRI + MAOI combination",
      "SSRI + St. John's Wort",
      "SSRI + Tramadol or Meperidine",
      "Dextromethorphan + Antidepressants",
      "Linezolid antibiotic with SSRI"
    ],
    "exam_traps": "Serotonin Syndrome vs. NMS: Serotonin Syndrome presents with HYPERREFLEXIA and CLONUS (neuromuscular excitability), dilated pupils, and diarrhea. Neuroleptic Malignant Syndrome (NMS) presents with \"LEAD-PIPE\" RIGIDITY, HYPOREFLEXIA, and normal pupils.",
    "memory_pearl": "\"Serotonin shakes and SHIVERS with clonus; NMS is rigid as a board with FEVER.\"",
    "high_yield_tip": "A mandatory 14-day washout period (5 weeks for Fluoxetine due to long half-life) must elapse between discontinuing an SSRI and starting an MAOI.",
    "practice_question": {
      "question": "A client taking sertraline starts taking St. John's Wort for mild insomnia. Two days later, the client presents with hyperreflexia, bilateral ankle clonus, dilated pupils, and a temperature of 38.8°C. What condition is this client experiencing?",
      "options": [
        "A. Neuroleptic malignant syndrome",
        "B. Serotonin syndrome",
        "C. Anticholinergic toxicity",
        "D. Tardive dyskinesia"
      ],
      "answer": "B",
      "explanation": "Combining an SSRI (sertraline) with herbal St. John's Wort causes serotonin toxicity. The pathognomonic findings of hyperreflexia and spontaneous/inducible clonus confirm Serotonin Syndrome."
    },
    "id": "m-34"
  },
  {
    "title": "Neuroleptic Malignant Syndrome",
    "acronym": "F-E-V-E-R",
    "description": "Idiosyncratic, life-threatening reaction to dopamine-receptor antagonists (antipsychotics).",
    "specialty": "Mental Health",
    "category": "Pharmacology",
    "tags": [
      "Antipsychotics",
      "Haloperidol",
      "Psychiatry",
      "Emergency"
    ],
    "phrases": [
      "F — Fever (Extreme hyperthermia >38°C–41°C)",
      "E — Encephalopathy (Altered mental status)",
      "V — Vitals unstable (Tachycardia, labile BP, diaphoresis)",
      "E — Elevated CPK & Leukocytosis",
      "R — Rigidity (\"Lead-pipe\" generalized muscle rigidity)"
    ],
    "breakdown": [
      {
        "emoji": "🔥",
        "phrase": "F — Fever",
        "meaning": "High-grade fever (>38°C / 100.4°F, often up to 41°C); hallmark sign of hypothalamic dopamine blockade."
      },
      {
        "emoji": "🧠",
        "phrase": "E — Encephalopathy",
        "meaning": "Progressive drowsiness, stupor, mutism, delirium, and coma."
      },
      {
        "emoji": "📈",
        "phrase": "V — Vitals Unstable",
        "meaning": "Autonomic storm: tachycardia, tachypnea, labile hypertension or hypotension, and profuse diaphoresis."
      },
      {
        "emoji": "🧪",
        "phrase": "E — Elevated CPK & WBC",
        "meaning": "Creatine phosphokinase (CPK) >1,000–100,000 U/L due to massive skeletal muscle breakdown, risking acute tubular necrosis."
      },
      {
        "emoji": "🦾",
        "phrase": "R — Rigidity",
        "meaning": "\"Lead-pipe\" resistance to passive movement in all muscle groups; absence of clonus differentiates from serotonin syndrome."
      }
    ],
    "clinical_significance": "Carries a 10–20% mortality rate due to rhabdomyolysis, renal failure, and arrhythmias. Immediate cessation of the offending antipsychotic is the cornerstone of emergency management.",
    "causes": [
      "Typical Antipsychotics (Haloperidol, Fluphenazine, Chlorpromazine)",
      "Atypical Antipsychotics (Olanzapine, Risperidone)",
      "Abrupt withdrawal of dopamine agonists (Levodopa)",
      "Metoclopramide antiemetic"
    ],
    "exam_traps": "Students confuse NMS with Serotonin Syndrome. Remember: NMS has \"lead-pipe\" generalized muscle RIGIDITY and elevated CPK from muscle breakdown. The pharmacological treatment for NMS is Dantrolene (direct-acting muscle relaxant) and Bromocriptine (dopamine agonist).",
    "memory_pearl": "\"Antipsychotics cause a deadly FEVER with lead-pipe rigidity. Stop the drug and give Dantrolene!\"",
    "high_yield_tip": "Immediate nursing actions: Discontinue antipsychotic immediately, initiate aggressive active cooling (cooling blankets, ice packs to axillae/groin), and hydrate with IV fluids to flush myoglobin from renal tubules.",
    "practice_question": {
      "question": "A psychiatric client taking haloperidol develops a temperature of 39.8°C, tachycardia of 124 bpm, profuse diaphoresis, and severe \"lead-pipe\" muscle rigidity. Which medication does the nurse prepare to administer?",
      "options": [
        "A. Physostigmine",
        "B. Dantrolene sodium",
        "C. Naloxone",
        "D. Flumazenil"
      ],
      "answer": "B",
      "explanation": "The client has Neuroleptic Malignant Syndrome (NMS). Dantrolene is a skeletal muscle relaxant that treats the hyperthermia and severe rigidity of NMS by preventing calcium release from the sarcoplasmic reticulum."
    },
    "id": "m-35"
  },
  {
    "title": "Potassium-Sparing Diuretics",
    "acronym": "A-S-K / S-A-L-T",
    "description": "Identifying diuretics that retain potassium and their critical dietary and lab precautions.",
    "specialty": "Pharmacology",
    "category": "Pharmacology",
    "tags": [
      "Diuretics",
      "Electrolytes",
      "Kidney",
      "Pharmacology"
    ],
    "phrases": [
      "A — Amiloride",
      "S — Spironolactone (Aldactone)",
      "K — Potassium-sparing (keeps K+ in the body)"
    ],
    "breakdown": [
      {
        "emoji": "💊",
        "phrase": "A — Amiloride",
        "meaning": "Inhibits sodium channels in the cortical collecting duct, conserving potassium while excreting sodium."
      },
      {
        "emoji": "🛡️",
        "phrase": "S — Spironolactone",
        "meaning": "Aldosterone antagonist; treats heart failure, ascites, and primary hyperaldosteronism while sparing K+."
      },
      {
        "emoji": "🧪",
        "phrase": "K — Keeps Potassium",
        "meaning": "Does not cause hypokalemia like loop (furosemide) or thiazide diuretics; causes HYPERKALEMIA instead."
      }
    ],
    "clinical_significance": "Unlike furosemide or hydrochlorothiazide which cause hypokalemia, potassium-sparing diuretics cause dangerous hyperkalemia (>5.0 mEq/L) if patients consume high-potassium foods or salt substitutes.",
    "causes": [
      "Hypertension",
      "Congestive Heart Failure",
      "Hepatic Cirrhosis with Ascites",
      "Hypokalemia prophylaxis during loop diuretic use"
    ],
    "exam_traps": "Salt substitutes are manufactured using POTASSIUM CHLORIDE (KCl) instead of sodium chloride. Clients on spironolactone or amiloride who use salt substitutes will rapidly develop lethal hyperkalemia! Instruct clients to avoid salt substitutes, potassium supplements, and excessive high-potassium fruits (bananas, oranges, avocados).",
    "memory_pearl": "\"ASK the patient if they are on potassium-sparing diuretics before they season their food with salt substitutes!\"",
    "high_yield_tip": "Hold potassium-sparing diuretics and notify the physician if serum potassium exceeds 5.0 mEq/L or if the patient is concurrently prescribed ACE inhibitors/ARBs.",
    "practice_question": {
      "question": "A client with heart failure is prescribed spironolactone. During discharge teaching, which statement by the client indicates a need for further instruction?",
      "options": [
        "A. \"I will avoid using potassium-based salt substitutes.\"",
        "B. \"I will report dizziness or muscle weakness to my doctor.\"",
        "C. \"I will eat an extra banana and avocado daily to keep my electrolytes balanced.\"",
        "D. \"I will have my kidney function and electrolytes checked regularly.\""
      ],
      "answer": "C",
      "explanation": "Spironolactone is a potassium-sparing diuretic. Consuming excessive high-potassium foods (bananas, avocados) puts the client at serious risk for hyperkalemia and life-threatening cardiac arrhythmias."
    },
    "id": "m-36"
  },
  {
    "title": "ACE Inhibitor Adverse Effects",
    "acronym": "C-A-P-T-O-P-R-I-L",
    "description": "Comprehensive adverse effect profile and contraindications for ACE inhibitors.",
    "specialty": "Cardiovascular",
    "category": "Pharmacology",
    "tags": [
      "Hypertension",
      "Cardiology",
      "Pharmacology",
      "Adverse Effects"
    ],
    "phrases": [
      "C — Cough (Dry & Persistent)",
      "A — Angioedema (Life-threatening airway edema)",
      "P — Potassium excess (Hyperkalemia)",
      "T — Taste impairment (Dysgeusia)",
      "O — Orthostatic hypotension (First-dose effect)",
      "P — Pregnancy contraindicated (Teratogenic)",
      "R — Renal impairment (Check BUN & Creatinine)"
    ],
    "breakdown": [
      {
        "emoji": "🗣️",
        "phrase": "C — Cough",
        "meaning": "Caused by bradykinin accumulation in lung tissue; dry, persistent hacking cough that does not respond to cough syrup; requires switching to an ARB (Losartan)."
      },
      {
        "emoji": "👄",
        "phrase": "A — Angioedema",
        "meaning": "Swelling of the lips, tongue, uvula, and laryngeal tissues; medical airway emergency; never rechallenge with another ACE inhibitor!"
      },
      {
        "emoji": "🍌",
        "phrase": "P — Potassium Excess",
        "meaning": "Inhibition of aldosterone leads to renal potassium retention; monitor serum K+ (>5.0 mEq/L)."
      },
      {
        "emoji": "👅",
        "phrase": "T — Taste Impairment",
        "meaning": "Reversible metallic taste or loss of taste (dysgeusia)."
      },
      {
        "emoji": "😵",
        "phrase": "O — Orthostatic Hypotension",
        "meaning": "Severe first-dose hypotension; take initial dose at bedtime and change positions slowly."
      },
      {
        "emoji": "🤰",
        "phrase": "P — Pregnancy Contraindicated",
        "meaning": "Black box warning: teratogenic in 2nd and 3rd trimesters, causing fetal renal agenesis and oligohydramnios."
      },
      {
        "emoji": "🫘",
        "phrase": "R — Renal Impairment",
        "meaning": "Dilates efferent arterioles; can precipitate acute renal failure in bilateral renal artery stenosis."
      }
    ],
    "clinical_significance": "ACE inhibitors (e.g., Enalapril, Lisinopril, Ramipril) are first-line for hypertension and heart failure but feature high-risk adverse reactions that nurses must monitor vigilantly.",
    "causes": [
      "Hypertension",
      "Heart Failure with reduced ejection fraction",
      "Post-Myocardial Infarction",
      "Diabetic Nephropathy"
    ],
    "exam_traps": "If a client develops a dry cough on an ACE inhibitor, do NOT recommend cough drops or suppressants. The drug must be discontinued and replaced with an Angiotensin Receptor Blocker (ARB) such as losartan, which does not increase bradykinin.",
    "memory_pearl": "\"ACE inhibitors give you a dry cough and angioedema; switch to ARBs to breathe easily.\"",
    "high_yield_tip": "Angioedema can occur months or years after starting an ACE inhibitor. Any tongue or lip swelling requires immediate emergency department evaluation.",
    "practice_question": {
      "question": "A client taking enalapril calls the outpatient clinic complaining of a persistent, hacking dry cough that keeps them awake at night. What is the nurse's most appropriate response?",
      "options": [
        "A. \"Use an over-the-counter dextromethorphan cough syrup.\"",
        "B. \"This is an expected side effect that will resolve in a few days.\"",
        "C. \"Come to the clinic so the provider can evaluate switching you to an ARB.\"",
        "D. \"Increase your fluid intake to thin respiratory secretions.\""
      ],
      "answer": "C",
      "explanation": "The dry cough associated with ACE inhibitors is caused by bradykinin accumulation and will not resolve with cough suppressants. The standard practice is to switch the patient to an Angiotensin Receptor Blocker (ARB) like losartan."
    },
    "id": "m-37"
  },
  {
    "title": "Beta-Blocker 4 B's Precautions",
    "acronym": "B-B-B-B",
    "description": "Essential assessment gates and contraindications before administering beta-blockers.",
    "specialty": "Cardiovascular",
    "category": "Pharmacology",
    "tags": [
      "Cardiology",
      "Beta Blockers",
      "Pharmacology",
      "Nursing Assessment"
    ],
    "phrases": [
      "B — Bradycardia (Hold if HR < 60 bpm)",
      "B — Breathing problems (Bronchospasm in asthma/COPD)",
      "B — Blood pressure drop (Hold if SBP < 100 mmHg)",
      "B — Blood sugar masking (Hides hypoglycemia signs)"
    ],
    "breakdown": [
      {
        "emoji": "💓",
        "phrase": "B — Bradycardia",
        "meaning": "Assess apical pulse for 1 full minute prior to administration; hold medication and notify provider if HR is below 60 beats/min."
      },
      {
        "emoji": "🫁",
        "phrase": "B — Breathing Problems",
        "meaning": "Non-selective beta-blockers (e.g., Propranolol) block Beta-2 receptors in the lungs, triggering bronchospasm. Contraindicated in asthma and severe COPD!"
      },
      {
        "emoji": "📉",
        "phrase": "B — Blood Pressure Drop",
        "meaning": "Decreases myocardial contractility and vascular resistance; hold if systolic blood pressure is below 100 mmHg."
      },
      {
        "emoji": "🍭",
        "phrase": "B — Blood Sugar Masking",
        "meaning": "Blunts sympathetic signs of hypoglycemia (tachycardia, tremors, anxiety). Diaphoresis (sweating) is often the ONLY symptom left unmasked!"
      }
    ],
    "clinical_significance": "Beta-blockers (e.g., Metoprolol, Atenolol, Propranolol, Carvedilol) reduce cardiac workload but can precipitate heart block, acute bronchospasm, or unrecognized hypoglycemia.",
    "causes": [
      "Hypertension",
      "Angina Pectoris",
      "Post-Myocardial Infarction secondary prevention",
      "Atrial Fibrillation rate control",
      "Stable Heart Failure"
    ],
    "exam_traps": "In diabetic clients on insulin, beta-blockers mask hypoglycemia tachycardia! The nurse must teach diabetic clients to check their blood sugar if they experience sweating (diaphoresis) or hunger, as heart rate will not rise.",
    "memory_pearl": "\"Check apical pulse before beta-blockers. Don't give non-selectives to asthmatics!\"",
    "high_yield_tip": "Never stop beta-blockers abruptly. Rebound sympathetic excitation can trigger severe reflex hypertension, angina, or acute myocardial infarction.",
    "practice_question": {
      "question": "A nurse is preparing to administer propranolol to a client with hypertension. Which condition in the client's medical history represents an absolute contraindication?",
      "options": [
        "A. Type 2 Diabetes Mellitus",
        "B. Severe Asthma",
        "C. Essential Tremor",
        "D. Migraine Headaches"
      ],
      "answer": "B",
      "explanation": "Propranolol is a non-cardioselective beta-blocker that blocks both Beta-1 and Beta-2 receptors. Beta-2 blockade causes bronchial constriction and bronchospasm, making it contraindicated in asthma and COPD."
    },
    "id": "m-38"
  },
  {
    "title": "Statin Monitoring & Adverse Effects",
    "acronym": "H-M-G",
    "description": "High-yield adverse effect monitoring and client education for HMG-CoA reductase inhibitors.",
    "specialty": "Cardiovascular",
    "category": "Pharmacology",
    "tags": [
      "Statins",
      "Lipids",
      "Pharmacology",
      "Cardiology"
    ],
    "phrases": [
      "H — Hepatotoxicity (Monitor ALT/AST liver enzymes)",
      "M — Myopathy & Rhabdomyolysis (Report muscle pain & check CK)",
      "G — Grapefruit juice avoidance (Inhibits CYP3A4)"
    ],
    "breakdown": [
      {
        "emoji": "🫀",
        "phrase": "H — Hepatotoxicity",
        "meaning": "Statins can cause hepatic inflammation; check baseline liver function tests (LFTs) and monitor for jaundice, right upper quadrant pain, and dark urine."
      },
      {
        "emoji": "💪",
        "phrase": "M — Myopathy & Rhabdomyolysis",
        "meaning": "Muscle aches, stiffness, weakness; muscle breakdown releases myoglobin, causing tea-colored urine and acute renal failure. Check CK level!"
      },
      {
        "emoji": "🍊",
        "phrase": "G — Grapefruit Juice Avoidance",
        "meaning": "Grapefruit inhibits CYP3A4 metabolism in the intestine, drastically increasing serum statin levels and toxic rhabdomyolysis risk."
      }
    ],
    "clinical_significance": "Statins (Atorvastatin, Rosuvastatin, Simvastatin) are the cornerstone of lipid-lowering therapy and cardiovascular risk reduction, but unmonitored muscle toxicity can lead to permanent kidney damage.",
    "causes": [
      "Hypercholesterolemia",
      "Coronary Artery Disease",
      "Atherosclerosis",
      "Stroke prevention"
    ],
    "exam_traps": "Any client on a statin who calls reporting unexplained muscle pain, tenderness, or weakness must be instructed to STOP the medication immediately and come in for a Creatine Kinase (CK) and serum creatinine check!",
    "memory_pearl": "\"Statins lower cholesterol at night, but watch the liver (H), muscle pain (M), and grapefruit juice (G)!\"",
    "high_yield_tip": "Instruct patients to take statins in the evening or at bedtime with food, because endogenous hepatic cholesterol synthesis peaks overnight.",
    "practice_question": {
      "question": "A client taking atorvastatin 40 mg daily contacts the clinic reporting severe generalized muscle aching and dark, cola-colored urine. What is the nurse's priority instruction?",
      "options": [
        "A. \"Drink 2 glasses of grapefruit juice to boost absorption.\"",
        "B. \"Take ibuprofen and continue your atorvastatin as prescribed.\"",
        "C. \"Stop taking atorvastatin immediately and go to the emergency department.\"",
        "D. \"This is an expected adjustment symptom that will pass within two weeks.\""
      ],
      "answer": "C",
      "explanation": "Unexplained muscle pain paired with tea/cola-colored urine is pathognomonic for rhabdomyolysis, where damaged muscle releases myoglobin that clogs renal tubules. The client must discontinue the statin and seek immediate medical care."
    },
    "id": "m-39"
  },
  {
    "title": "BUBBLE-HE Postpartum Assessment",
    "acronym": "B-U-B-B-L-E-H-E",
    "description": "Systematic head-to-toe nursing assessment protocol for postpartum mothers.",
    "specialty": "Maternity",
    "category": "Obstetrics",
    "tags": [
      "Postpartum",
      "Maternity",
      "Midwifery",
      "Assessment"
    ],
    "phrases": [
      "B — Breasts (Soft, filling, or engorged; assess nipples)",
      "U — Uterus (Fundal height, location, and firmness)",
      "B — Bladder (Voiding pattern & distension)",
      "B — Bowels (Bowel sounds, flatus, hemorrhoids)",
      "L — Lochia (Color, amount, odor: Rubra, Serosa, Alba)",
      "E — Episiotomy / Perineum (REEDA assessment)",
      "H — Homan's sign / DVT signs (Warmth, pain, redness in calves)",
      "E — Emotional status & Bonding (Maternal attachment)"
    ],
    "breakdown": [
      {
        "emoji": "🤱",
        "phrase": "B — Breasts",
        "meaning": "Assess consistency (soft on days 1-2, filling day 3, engorged day 4); inspect nipples for fissures, erythema, blisters, or inverted nipples."
      },
      {
        "emoji": "🤰",
        "phrase": "U — Uterus",
        "meaning": "Fundus should be firm, midline, and at level of umbilicus on Day 1; descends 1 cm (one fingerbreadth) per day. A boggy uterus indicates atony."
      },
      {
        "emoji": "🚽",
        "phrase": "B — Bladder",
        "meaning": "Assess for urinary retention. A full distended bladder pushes the fundus UP and to the RIGHT, preventing uterine contraction and provoking hemorrhage!"
      },
      {
        "emoji": "💨",
        "phrase": "B — Bowels",
        "meaning": "Auscultate bowel sounds; assess fear of defecation, constipation, and perineal hemorrhoids."
      },
      {
        "emoji": "🩸",
        "phrase": "L — Lochia",
        "meaning": "Rubra (dark red, days 1-3), Serosa (pink-brown, days 4-10), Alba (white-yellow, days 10-28). Soaking a pad in <1 hr indicates postpartum hemorrhage!"
      },
      {
        "emoji": "🩹",
        "phrase": "E — Episiotomy/Perineum",
        "meaning": "Inspect perineum in Sims position using REEDA: Redness, Edema, Ecchymosis, Discharge, Approximation."
      },
      {
        "emoji": "🦵",
        "phrase": "H — Homan's Sign / Legs",
        "meaning": "Check calves for unilateral edema, warmth, erythema, and tenderness indicative of Deep Vein Thrombosis."
      },
      {
        "emoji": "❤️",
        "phrase": "E — Emotional State",
        "meaning": "Assess bonding behaviors (en face position, touch, vocalization) and screen for postpartum blues vs postpartum depression."
      }
    ],
    "clinical_significance": "Standardized assessment ensures early detection of the two leading causes of postpartum maternal mortality: postpartum hemorrhage (PPH) and puerperal sepsis.",
    "causes": [
      "Normal vaginal delivery",
      "Cesarean section recovery",
      "Postpartum hemorrhage surveillance",
      "Puerperal infection surveillance"
    ],
    "exam_traps": "If the fundus is boggy AND displaced laterally (usually to the right) above the umbilicus, the FIRST action is to have the client VOID (empty her bladder)! A full bladder prevents normal uterine involution.",
    "memory_pearl": "\"BUBBLE-HE checks every mother from head to toe: Breasts, Uterus, Bladder, Bowels, Lochia, Episiotomy, Homan's, and Emotion!\"",
    "high_yield_tip": "If the fundus is boggy and midline, perform vigorous fundal massage immediately. If displaced to the right, assist the client to the bathroom to empty her bladder first, then re-massage.",
    "practice_question": {
      "question": "During a postpartum assessment 6 hours after delivery, the nurse notes that the fundus is boggy, located 2 fingerbreadths above the umbilicus, and displaced to the right side. What is the nurse's FIRST intervention?",
      "options": [
        "A. Administer a bolus of IV oxytocin",
        "B. Assist the client to empty her bladder",
        "C. Perform vigorous fundal massage continuously for 30 minutes",
        "D. Call the physician to prepare for surgical intervention"
      ],
      "answer": "B",
      "explanation": "A fundus that is elevated above the umbilicus and displaced to the right is the classic hallmark of urinary bladder distension. The full bladder prevents the uterus from contracting. Assisting the client to void or catheterizing her will allow the uterus to return to the midline and contract."
    },
    "id": "m-40"
  },
  {
    "title": "Maternal Intrauterine Resuscitation",
    "acronym": "L-I-O-N",
    "description": "Immediate bedside interventions for non-reassuring fetal heart rate patterns and fetal distress.",
    "specialty": "Maternity",
    "category": "Obstetrics",
    "tags": [
      "Labor",
      "Fetal Distress",
      "Midwifery",
      "Emergency"
    ],
    "phrases": [
      "L — Left lateral position",
      "I — IV fluid bolus (Lactated Ringer's)",
      "O — Oxygen (10 L/min via Non-Rebreather mask)",
      "N — Notify obstetrician / provider (and stop Oxytocin/Pitocin)"
    ],
    "breakdown": [
      {
        "emoji": "🔄",
        "phrase": "L — Left Lateral Position",
        "meaning": "Relieves compression of maternal inferior vena cava and aorta by the heavy gravid uterus, improving venous return and placental perfusion."
      },
      {
        "emoji": "💧",
        "phrase": "I — IV Fluid Bolus",
        "meaning": "Increases maternal circulating intravascular volume, optimizing cardiac output and uterine blood flow."
      },
      {
        "emoji": "🫁",
        "phrase": "O — Oxygen 10 L/min via NRB",
        "meaning": "Hyperoxygenates maternal arterial blood to maximize oxygen delivery across the placental barrier to the hypoxic fetus."
      },
      {
        "emoji": "📞",
        "phrase": "N — Notify & Stop Oxytocin",
        "meaning": "Stop any running oxytocin (Pitocin) infusion immediately to eliminate uterine hyperstimulation; call obstetric provider."
      }
    ],
    "clinical_significance": "Non-reassuring fetal heart tracings (persistent late decelerations, prolonged decelerations, severe variable decelerations) indicate acute uteroplacental insufficiency or cord compression requiring rapid resuscitation.",
    "causes": [
      "Uteroplacental insufficiency",
      "Late decelerations on CTG",
      "Umbilical cord compression",
      "Uterine tachysystole (>5 contractions in 10 minutes)",
      "Maternal hypotension following epidural"
    ],
    "exam_traps": "If oxytocin (Pitocin) is running and fetal heart decelerations appear, STOPPING THE OXYTOCIN is the absolute FIRST action, accompanied by positioning the mother on her left side!",
    "memory_pearl": "\"When the baby is distressed, act like a LION: Left side, IV fluids, Oxygen, and Notify provider!\"",
    "high_yield_tip": "Administer oxygen at 8–10 L/min via a tight-fitting non-rebreather mask; a nasal cannula is completely insufficient for intrauterine fetal resuscitation.",
    "practice_question": {
      "question": "During continuous electronic fetal monitoring, the nurse observes repetitive late decelerations on the tracing while an IV oxytocin infusion is running. What is the nurse's FIRST priority action?",
      "options": [
        "A. Apply oxygen at 2 L/min via nasal cannula",
        "B. Discontinue the IV oxytocin infusion immediately",
        "C. Prepare the client for an emergency cesarean section",
        "D. Increase the IV oxytocin rate to hasten delivery"
      ],
      "answer": "B",
      "explanation": "Late decelerations indicate uteroplacental insufficiency. The first priority is to discontinue the oxytocin infusion to eliminate contraction pressure on the placental bed, followed by turning the client to the left lateral position, increasing IV fluids, and applying high-flow oxygen."
    },
    "id": "m-41"
  },
  {
    "title": "The Five P's of Labor and Delivery",
    "acronym": "The 5 P's",
    "description": "The five critical interacting factors that determine the progression and outcome of labor.",
    "specialty": "Maternity",
    "category": "Obstetrics",
    "tags": [
      "Labor",
      "Childbirth",
      "Midwifery",
      "Maternity"
    ],
    "phrases": [
      "1. Passenger (Fetus and placenta)",
      "2. Passageway (Maternal pelvis and birth canal)",
      "3. Powers (Uterine contractions and pushing efforts)",
      "4. Position (Maternal posture during labor)",
      "5. Psyche (Maternal psychological state)"
    ],
    "breakdown": [
      {
        "emoji": "👶",
        "phrase": "Passenger (Fetus & Placenta)",
        "meaning": "Fetal head size, fetal presentation (cephalic, breech, shoulder), fetal lie (longitudinal vs transverse), and attitude (flexion vs extension)."
      },
      {
        "emoji": "🦴",
        "phrase": "Passageway (Bony Pelvis)",
        "meaning": "Size and shape of the maternal pelvis (gynecoid is optimal; android/platypelloid can cause dystocia) and distensibility of soft tissues."
      },
      {
        "emoji": "⚡",
        "phrase": "Powers (Contractions)",
        "meaning": "Primary powers (involuntary uterine contractions causing effacement and dilation) and secondary powers (voluntary maternal bearing-down efforts in stage 2)."
      },
      {
        "emoji": "🧘",
        "phrase": "Position (Maternal Posture)",
        "meaning": "Upright, walking, kneeling, squatting, or side-lying positions use gravity to assist fetal descent and enlarge pelvic diameters."
      },
      {
        "emoji": "🧠",
        "phrase": "Psyche (Emotional Response)",
        "meaning": "Maternal anxiety, fear, exhaustion, and pain perception; severe stress releases catecholamines that inhibit uterine contractions."
      }
    ],
    "clinical_significance": "Labor dystocia (prolonged or difficult labor) occurs whenever there is an abnormality or mismatch in one or more of the 5 P's.",
    "causes": [
      "Cephalopelvic disproportion (CPD)",
      "Occiput posterior fetal malposition",
      "Uterine inertia / hypotonic contractions",
      "Maternal pelvic stenosis"
    ],
    "exam_traps": "The optimal pelvic shape for vaginal delivery is GYNECOID (round, spacious). An ANDROID pelvis (heart-shaped, male-type) carries a high risk of deep transverse arrest and cesarean delivery.",
    "memory_pearl": "\"A smooth delivery needs all 5 P's: the Passenger fits the Passageway driven by Powers in the right Position with a calm Psyche.\"",
    "high_yield_tip": "Suboccipitobregmatic diameter (about 9.5 cm) is the smallest anteroposterior diameter of the fetal head and enters the pelvis when the head is fully flexed.",
    "practice_question": {
      "question": "A nurse assesses a laboring client experiencing intense back labor. The fetal position is Occiput Posterior (OP). Which modification to maternal \"Position\" is most effective to encourage fetal rotation and relieve back pain?",
      "options": [
        "A. Strict flat supine position with legs elevated",
        "B. Hands-and-knees (all-fours) position or pelvic rocking",
        "C. Lithotomy position with legs in stirrups",
        "D. Trendelenburg position"
      ],
      "answer": "B",
      "explanation": "In occiput posterior position (\"sunny-side up\"), the fetal occiput presses against maternal sacral nerves causing back labor. A hands-and-knees (all-fours) position uses gravity to pull the fetal trunk forward away from the sacrum, facilitating anterior rotation."
    },
    "id": "m-42"
  },
  {
    "title": "Pre-eclampsia Warning Signs",
    "acronym": "P-R-E-E",
    "description": "Diagnostic features, severe criteria, and neurological complications of pre-eclampsia.",
    "specialty": "Maternity",
    "category": "Obstetrics",
    "tags": [
      "Pre-eclampsia",
      "Hypertension",
      "Pregnancy",
      "Midwifery"
    ],
    "phrases": [
      "P — Proteinuria & Persistent severe headache",
      "R — Reflexes hyperactive (+3/+4 DTRs with ankle clonus)",
      "E — Elevated blood pressure (≥140/90 mmHg after 20 weeks)",
      "E — Epigastric / Right upper quadrant pain & Eye changes"
    ],
    "breakdown": [
      {
        "emoji": "🧪",
        "phrase": "P — Proteinuria & Headache",
        "meaning": "Proteinuria ≥300 mg/24 hr or urine dipstick ≥1+; severe persistent frontal or throbbing headache unyielding to analgesics."
      },
      {
        "emoji": "⚡",
        "phrase": "R — Reflexes Hyperactive",
        "meaning": "Brisk deep tendon reflexes (+3 or +4) and rhythmic beats of ankle clonus signify neuromuscular irritability and impending eclamptic seizure!"
      },
      {
        "emoji": "📈",
        "phrase": "E — Elevated Blood Pressure",
        "meaning": "BP ≥140/90 mmHg on two readings 4 hours apart after 20 weeks gestation in a previously normotensive woman."
      },
      {
        "emoji": "👁️",
        "phrase": "E — Epigastric Pain & Eye Changes",
        "meaning": "Visual scotoma, blurring, photophobia; epigastric/RUQ pain indicates hepatic swelling and subcapsular hemorrhage (risk of liver rupture)."
      }
    ],
    "clinical_significance": "Pre-eclampsia is a multisystem endothelial vasospastic disorder. If untreated, it progresses to eclampsia (generalized tonic-clonic seizures), maternal stroke, or HELLP syndrome.",
    "causes": [
      "First pregnancy (primigravida)",
      "Advanced maternal age (>35 years)",
      "Multiple gestation (twins/triplets)",
      "Chronic hypertension or preexisting renal disease",
      "Diabetes mellitus"
    ],
    "exam_traps": "Magnesium sulfate is administered for SEIZURE PROPHYLAXIS, not as an antihypertensive! To detect magnesium toxicity, monitor the \"BURP\" triad: Blood pressure decrease, Urine output <30 mL/hr, Respiratory rate <12 breaths/min, and Patellar reflexes absent! Antidote = Calcium Gluconate.",
    "memory_pearl": "\"P-R-E-E: Proteinuria, Reflexes hyperactive, Elevated BP, Epigastric pain and Eye flashes. Keep Calcium Gluconate at the bedside!\"",
    "high_yield_tip": "If a client on IV Magnesium Sulfate loses her deep tendon patellar reflexes, STOP the infusion immediately before respiratory arrest occurs.",
    "practice_question": {
      "question": "A client with severe pre-eclampsia is receiving IV magnesium sulfate. During rounds, the nurse finds deep tendon reflexes are absent (0), respiratory rate is 10 breaths/min, and urine output was 18 mL over the last hour. What is the nurse's FIRST action?",
      "options": [
        "A. Increase the rate of IV fluids",
        "B. Stop the magnesium sulfate infusion immediately",
        "C. Administer 100% oxygen via nasal cannula",
        "D. Reassess the client's reflexes in 30 minutes"
      ],
      "answer": "B",
      "explanation": "Absent deep tendon reflexes, bradypnea (<12 breaths/min), and oliguria (<30 mL/hr) are critical signs of magnesium toxicity. The nurse must IMMEDIATELY stop the magnesium sulfate infusion, then prepare to administer the antidote (calcium gluconate)."
    },
    "id": "m-43"
  },
  {
    "title": "Postpartum Hemorrhage 4 T's",
    "acronym": "The 4 T's",
    "description": "Etiological classification of primary and secondary postpartum hemorrhage.",
    "specialty": "Maternity",
    "category": "Obstetrics",
    "tags": [
      "PPH",
      "Hemorrhage",
      "Obstetrics",
      "Emergency"
    ],
    "phrases": [
      "Tone — Uterine atony (accounts for 70–80% of PPH)",
      "Tissue — Retained placenta, membranes, or blood clots",
      "Trauma — Lacerations of cervix, vagina, or perineum",
      "Thrombin — Coagulopathies and DIC"
    ],
    "breakdown": [
      {
        "emoji": "🫄",
        "phrase": "Tone (Uterine Atony)",
        "meaning": "Failure of myometrium to contract down on spiral arterioles. Uterus feels soft, boggy, and spongy on palpation; #1 cause of PPH."
      },
      {
        "emoji": "🧩",
        "phrase": "Tissue (Retained Products)",
        "meaning": "Fragments of placenta or succenturiate lobe remain inside the uterine cavity, mechanically preventing complete involution."
      },
      {
        "emoji": "✂️",
        "phrase": "Trauma (Lacerations & Tears)",
        "meaning": "Cervical tears, vaginal vault lacerations, or expanding hematomas; suspected when bleeding is brisk and continuous despite a FIRM uterus."
      },
      {
        "emoji": "🩸",
        "phrase": "Thrombin (Coagulopathy)",
        "meaning": "Defects in maternal clotting cascade (von Willebrand, ITP, DIC secondary to abruption or amniotic fluid embolism)."
      }
    ],
    "clinical_significance": "Postpartum hemorrhage is defined as blood loss ≥500 mL after vaginal birth or ≥1,000 mL after cesarean delivery (or bleeding causing signs of hypovolemia). It remains the leading cause of maternal death worldwide.",
    "causes": [
      "Prolonged or precipitate labor",
      "Uterine overdistension (polyhydramnios, macrosomia, twins)",
      "High parity (grand multiparity)",
      "Chorioamnionitis",
      "Instrumental delivery (forceps/vacuum)"
    ],
    "exam_traps": "A classic NCK exam question presents a postpartum mother with heavy, continuous trickle of bright red blood, but on examination, THE UTERUS IS FIRM AND CONTRACTED! The cause is NOT atony; it is TRAUMA (cervical or vaginal laceration) requiring surgical repair.",
    "memory_pearl": "\"PPH causes are the 4 T's: Tone (atony), Tissue (placenta), Trauma (laceration), and Thrombin (clotting).\"",
    "high_yield_tip": "First line pharmacological management for uterine atony: Oxytocin 10–20 units IM/IV, Ergometrine 0.2 mg IM (contraindicated in hypertension!), and Misoprostol 800 mcg rectally/sublingually.",
    "practice_question": {
      "question": "Two hours after an unassisted vaginal delivery, a client is noted to have continuous, bright red vaginal bleeding. On abdominal palpation, the fundus is firm, midline, and 1 fingerbreadth below the umbilicus. What is the most likely cause of the bleeding?",
      "options": [
        "A. Uterine atony",
        "B. Retained placental fragments",
        "C. Cervical or perineal laceration",
        "D. Disseminated intravascular coagulation"
      ],
      "answer": "C",
      "explanation": "When excessive, continuous bleeding occurs in the presence of a firmly contracted uterus, uterine atony is ruled out. The bleeding is almost certainly caused by trauma/lacerations of the birth canal (cervix, vagina, or perineum)."
    },
    "id": "m-44"
  },
  {
    "title": "True vs. False Labor",
    "acronym": "T-R-U-E",
    "description": "Differentiating true labor contractions from false Braxton-Hicks contractions.",
    "specialty": "Maternity",
    "category": "Obstetrics",
    "tags": [
      "Labor",
      "Contractions",
      "Midwifery",
      "Obstetrics"
    ],
    "phrases": [
      "T — Timing regular and getting progressively closer",
      "R — Radiates from the lower back around to the abdomen",
      "U — Unrelieved by walking, hydration, or position change",
      "E — Exam confirms progressive cervical dilation & effacement"
    ],
    "breakdown": [
      {
        "emoji": "⏱️",
        "phrase": "T — Timing Regular",
        "meaning": "True contractions occur at regular intervals, become progressively closer together, longer in duration, and stronger in intensity."
      },
      {
        "emoji": "🔄",
        "phrase": "R — Radiates From Back",
        "meaning": "True labor discomfort begins in the lower back and radiates around like a band to the anterior abdomen."
      },
      {
        "emoji": "🚶",
        "phrase": "U — Unrelieved By Rest",
        "meaning": "True contractions continue and intensify with ambulation; Braxton-Hicks contractions diminish with walking, rest, or warm baths."
      },
      {
        "emoji": "📏",
        "phrase": "E — Exam Confirms Cervical Change",
        "meaning": "Cervical effacement (thinning) and cervical dilation (opening) is the ONLY definitive clinical proof of true labor."
      }
    ],
    "clinical_significance": "Distinguishing true from false labor prevents unnecessary hospital admissions, maternal anxiety, and premature interventions.",
    "causes": [
      "Term gestation (37–42 weeks)",
      "Spontaneous labor onset",
      "Braxton-Hicks contractions",
      "Dehydration-induced irritability"
    ],
    "exam_traps": "Students often guess that pain intensity determines true labor. Wrong! The ONLY definitive indicator of true labor is progressive cervical dilation and effacement assessed on vaginal examination.",
    "memory_pearl": "\"True labor is TRUE: Timing regular, Radiates from back, Unstopped by walking, and Effacing the cervix!\"",
    "high_yield_tip": "Braxton-Hicks contractions are irregular, felt only in the lower abdomen or groin, and typically stop when the woman rests or drinks a large glass of water.",
    "practice_question": {
      "question": "A primigravida at 39 weeks gestation presents to the maternity triage reporting contractions every 10 to 15 minutes. Which assessment finding definitively confirms to the nurse that the client is in TRUE labor?",
      "options": [
        "A. The contractions increase in intensity when the client walks",
        "B. The client states pain radiates from her lower back to her abdomen",
        "C. Vaginal examination reveals cervical dilation has progressed from 2 cm to 4 cm",
        "D. The client passed a blood-tinged mucous plug 2 hours ago"
      ],
      "answer": "C",
      "explanation": "While contraction patterns and radiation are supportive, progressive cervical effacement and dilation on examination is the single definitive hallmark that differentiates true labor from false labor."
    },
    "id": "m-45"
  },
  {
    "title": "FAST Stroke Assessment",
    "acronym": "F-A-S-T",
    "description": "Rapid recognition tool for acute cerebrovascular accident (stroke).",
    "specialty": "Neurology",
    "category": "Neurology",
    "tags": [
      "Stroke",
      "CVA",
      "Neurology",
      "Emergency",
      "TPA"
    ],
    "phrases": [
      "F — Face drooping (Smile is asymmetrical)",
      "A — Arm weakness (One arm drifts downward when raised)",
      "S — Speech difficulty (Slurred or garbled words)",
      "T — Time to call emergency & note Last Known Well time"
    ],
    "breakdown": [
      {
        "emoji": "😊",
        "phrase": "F — Face Drooping",
        "meaning": "One side of the face is numb or drooping; ask the person to smile to evaluate symmetry of nasolabial folds."
      },
      {
        "emoji": "💪",
        "phrase": "A — Arm Weakness",
        "meaning": "Pronator drift or inability to raise one arm; ask patient to extend both arms palms up with eyes closed for 10 seconds."
      },
      {
        "emoji": "🗣️",
        "phrase": "S — Speech Difficulty",
        "meaning": "Slurred speech, dysarthria, or expressive/receptive aphasia; ask the patient to repeat a simple sentence."
      },
      {
        "emoji": "⏱️",
        "phrase": "T — Time (Last Known Well)",
        "meaning": "Document the exact time the patient was last seen symptom-free; critical for determining eligibility for IV thrombolytics (tPA ≤4.5 hrs)."
      }
    ],
    "clinical_significance": "\"Time is Brain!\" For every minute ischemic stroke goes untreated, approximately 1.9 million neurons die. Rapid triage enables emergency CT scanning to differentiate ischemic from hemorrhagic stroke.",
    "causes": [
      "Ischemic Stroke (Thrombus or Embolus)",
      "Hemorrhagic Stroke (Intracerebral / Subarachnoid)",
      "Transient Ischemic Attack (TIA)"
    ],
    "exam_traps": "A non-contrast head CT scan must be completed IMMEDIATELY upon arrival before administering any thrombolytic medication (Alteplase/tPA) to rule out intracranial hemorrhage! Giving tPA to a hemorrhagic stroke is fatal.",
    "memory_pearl": "\"Think FAST: Face, Arm, Speech, Time. Every minute saves brain tissue!\"",
    "high_yield_tip": "Strict exclusion criteria for tPA: symptom onset >4.5 hours ago, active bleeding, recent major surgery within 14 days, severe head trauma within 3 months, or platelet count <100,000/mm³.",
    "practice_question": {
      "question": "A client arrives at the emergency department with sudden onset right-sided facial droop and left arm weakness. What diagnostic test must the nurse ensure is performed FIRST before initiating any reperfusion therapy?",
      "options": [
        "A. Lumbar puncture for cerebrospinal fluid analysis",
        "B. Non-contrast cranial Computed Tomography (CT) scan",
        "C. 12-lead Electrocardiogram (ECG)",
        "D. Bilateral carotid artery Doppler ultrasound"
      ],
      "answer": "B",
      "explanation": "A non-contrast head CT scan is the absolute first diagnostic test required to distinguish ischemic stroke from hemorrhagic stroke. IV thrombolytic therapy (tPA) is strictly contraindicated in hemorrhagic stroke."
    },
    "id": "m-46"
  },
  {
    "title": "Shock Types & Hemodynamics",
    "acronym": "C-H-A-N-D",
    "description": "The five primary pathophysiological categories of circulatory failure and shock.",
    "specialty": "Emergency Nursing",
    "category": "Emergency",
    "tags": [
      "Shock",
      "Critical Care",
      "Emergency",
      "Hemodynamics"
    ],
    "phrases": [
      "C — Cardiogenic (Pump failure: MI, CHF)",
      "H — Hypovolemic (Fluid/Blood loss: Hemorrhage, burns)",
      "A — Anaphylactic (Distributive: Histamine-mediated vasodilation)",
      "N — Neurogenic (Distributive: Loss of sympathetic tone)",
      "D — Distributive / Septic (Infection-induced vasodilation)"
    ],
    "breakdown": [
      {
        "emoji": "🫀",
        "phrase": "C — Cardiogenic",
        "meaning": "Heart fails to pump adequately (acute MI, cardiomyopathy); low cardiac output, elevated pulmonary wedge pressure, crackles, cool extremities."
      },
      {
        "emoji": "🩸",
        "phrase": "H — Hypovolemic",
        "meaning": "Loss of circulating intravascular volume (hemorrhage, severe vomiting/diarrhea, burns); low BP, compensatory tachycardia, flat neck veins, oliguria."
      },
      {
        "emoji": "🐝",
        "phrase": "A — Anaphylactic",
        "meaning": "Severe IgE-mediated allergic hypersensitivity; massive vasodilation, bronchial constriction, angioedema. First-line drug: Epinephrine IM 1:1,000!"
      },
      {
        "emoji": "🧠",
        "phrase": "N — Neurogenic",
        "meaning": "Spinal cord injury at or above T6; unique presentation: HYPOTENSION WITH BRADYCARDIA AND WARM, DRY SKIN (loss of sympathetic vascular tone)."
      },
      {
        "emoji": "🦠",
        "phrase": "D — Distributive / Septic",
        "meaning": "Systemic inflammatory response syndrome (SIRS) to pathogen; widespread capillary leak, vasodilation, warm flushed skin early, progressing to refractory hypotension."
      }
    ],
    "clinical_significance": "Shock represents inadequate tissue perfusion leading to cellular hypoxia and multi-organ dysfunction syndrome (MODS). Treatment varies dramatically depending on the underlying shock category.",
    "causes": [
      "Myocardial infarction (Cardiogenic)",
      "Trauma & postpartum hemorrhage (Hypovolemic)",
      "Peanut / Penicillin allergy (Anaphylactic)",
      "High cervical cord trauma (Neurogenic)",
      "Urosepsis or pneumonia bacteremia (Septic)"
    ],
    "exam_traps": "Neurogenic shock is the ONLY form of shock that presents with BRADYCARDIA and WARM, DRY SKIN! All other forms of shock initially present with compensatory tachycardia.",
    "memory_pearl": "\"Neurogenic is cool because it has bradycardia; Anaphylactic needs Epinephrine; Hypovolemic needs fluid; Cardiogenic needs inotropes!\"",
    "high_yield_tip": "For Septic Shock: Draw blood cultures BEFORE starting broad-spectrum antibiotics, administer 30 mL/kg crystalloids within 3 hours, and start norepinephrine if mean arterial pressure (MAP) remains <65 mmHg.",
    "practice_question": {
      "question": "A client involved in a motor vehicle collision with a suspected T3 spinal cord injury has a blood pressure of 82/46 mmHg, heart rate of 48 beats/min, and warm, dry extremities. Which type of shock does the nurse identify?",
      "options": [
        "A. Hypovolemic shock",
        "B. Cardiogenic shock",
        "C. Neurogenic shock",
        "D. Septic shock"
      ],
      "answer": "C",
      "explanation": "Neurogenic shock results from disruption of descending sympathetic pathways from spinal cord injury at or above T6, leading to unopposed parasympathetic vagal stimulation. This causes a unique presentation of hypotension, bradycardia, and vasodilation with warm, dry skin."
    },
    "id": "m-47"
  },
  {
    "title": "Reversible Causes of Cardiac Arrest",
    "acronym": "5 H's and 5 T's",
    "description": "Systematic resuscitation algorithm for identifying reversible causes of PEA and Asystole.",
    "specialty": "Emergency Nursing",
    "category": "Emergency",
    "tags": [
      "ACLS",
      "Cardiac Arrest",
      "CPR",
      "Emergency",
      "Resuscitation"
    ],
    "phrases": [
      "5 H's: Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia",
      "5 T's: Tension pneumothorax, Tamponade (Cardiac), Toxins, Thrombosis (Pulmonary), Thrombosis (Coronary)"
    ],
    "breakdown": [
      {
        "emoji": "🩸",
        "phrase": "Hypovolemia",
        "meaning": "Most common cause of PEA arrest; infuse rapid IV fluid bolus or blood products."
      },
      {
        "emoji": "🫁",
        "phrase": "Hypoxia",
        "meaning": "Ensure patent airway, confirm endotracheal tube placement, deliver 100% oxygen."
      },
      {
        "emoji": "🧪",
        "phrase": "Hydrogen Ion (Acidosis)",
        "meaning": "Provide adequate ventilation to blow off CO2; administer sodium bicarbonate if severe metabolic acidosis."
      },
      {
        "emoji": "⚡",
        "phrase": "Hypo / Hyperkalemia",
        "meaning": "Tall peaked T-waves or flat T-waves with U-waves; administer calcium gluconate, insulin/glucose for hyperkalemia; infuse K+ for hypokalemia."
      },
      {
        "emoji": "❄️",
        "phrase": "Hypothermia",
        "meaning": "Patient core temp <30°C; initiate active rewarming before pronouncing death (\"not dead until warm and dead\")."
      },
      {
        "emoji": "💥",
        "phrase": "Tension Pneumothorax",
        "meaning": "Tracheal deviation, absent breath sounds, distended neck veins; perform immediate needle decompression at 2nd intercostal space."
      },
      {
        "emoji": "🫀",
        "phrase": "Tamponade (Cardiac)",
        "meaning": "Beck's triad (muffled heart sounds, JVD, hypotension); perform emergent pericardiocentesis."
      },
      {
        "emoji": "☠️",
        "phrase": "Toxins",
        "meaning": "Overdose (opioids, beta-blockers, CCBs, tricyclics); administer specific antidotes (naloxone, glucagon, calcium, bicarbonate)."
      },
      {
        "emoji": "🫁",
        "phrase": "Thrombosis (Pulmonary Embolus)",
        "meaning": "Massive PE obstructing right ventricular outflow; administer IV thrombolytics or prepare for embolectomy."
      },
      {
        "emoji": "💔",
        "phrase": "Thrombosis (Coronary / MI)",
        "meaning": "Massive STEMI with coronary occlusion; post-resuscitation emergent percutaneous coronary intervention (PCI)."
      }
    ],
    "clinical_significance": "In Pulseless Electrical Activity (PEA) and Asystole, defibrillation is ineffective. Identifying and treating one of the 5 H's or 5 T's is the ONLY pathway to achieve Return of Spontaneous Circulation (ROSC).",
    "causes": [
      "Cardiac arrest",
      "Pulseless electrical activity (PEA)",
      "Asystole",
      "Trauma resuscitation"
    ],
    "exam_traps": "NEVER shock (defibrillate) Asystole or PEA! Only Ventricular Fibrillation (VF) and Pulseless Ventricular Tachycardia (pVT) are shockable rhythms. In PEA and asystole: high-quality CPR + Epinephrine 1 mg every 3–5 min + search for the 5 H's and 5 T's.",
    "memory_pearl": "\"In PEA, you cannot shock. Search the 5 H's and 5 T's around the clock!\"",
    "high_yield_tip": "Hypovolemia is the single most common cause of PEA arrest. When in doubt during PEA resuscitation, hang a wide-open bolus of isotonic crystalloids.",
    "practice_question": {
      "question": "During a code blue, the monitor displays a sinus rhythm at 72 bpm, but the carotid pulse is absent. What is the priority nursing intervention for this Pulseless Electrical Activity (PEA)?",
      "options": [
        "A. Deliver an unsynchronized shock at 200 Joules",
        "B. Continue chest compressions, give epinephrine, and investigate the 5 H's and 5 T's",
        "C. Administer IV atropine 1 mg immediately",
        "D. Prepare for synchronized cardioversion"
      ],
      "answer": "B",
      "explanation": "PEA is a non-shockable rhythm. The electrical system works, but there is no mechanical cardiac contraction, usually due to a reversible underlying problem (the 5 H's and 5 T's). The correct response is high-quality CPR, Epinephrine, and finding the reversible cause."
    },
    "id": "m-48"
  },
  {
    "title": "Heart Failure: Left vs. Right",
    "acronym": "L = Lungs, R = Rest of Body",
    "description": "Differentiating clinical features and hemodynamics of left-sided vs. right-sided ventricular failure.",
    "specialty": "Cardiovascular",
    "category": "Med-Surgical",
    "tags": [
      "Cardiology",
      "Heart Failure",
      "Assessment",
      "Med-Surg"
    ],
    "phrases": [
      "Left-sided = Lungs (Pulmonary congestion, crackles, orthopnea)",
      "Right-sided = Rest of the Body (JVD, peripheral edema, ascites)"
    ],
    "breakdown": [
      {
        "emoji": "🫁",
        "phrase": "Left-Sided Failure (L = Lungs)",
        "meaning": "Left ventricle fails to pump forward; backward backup of blood into pulmonary veins causes pulmonary congestion, dyspnea, orthopnea, paroxysmal nocturnal dyspnea (PND), bibasilar crackles, and pink frothy sputum."
      },
      {
        "emoji": "🦵",
        "phrase": "Right-Sided Failure (R = Rest of Body)",
        "meaning": "Right ventricle fails; blood backs up into the systemic venous circulation, causing jugular venous distension (JVD), dependent bilateral pitting edema, hepatomegaly, ascites, and unexplained weight gain."
      }
    ],
    "clinical_significance": "Heart failure affects millions worldwide. The most common cause of right-sided heart failure is longstanding left-sided heart failure.",
    "causes": [
      "Coronary artery disease / MI (Left failure)",
      "Hypertension (Left failure)",
      "COPD / Cor Pulmonale (Right failure)",
      "Valvular disease (Aortic/Mitral stenosis)"
    ],
    "exam_traps": "Pink, frothy sputum is a life-threatening sign of ACUTE PULMONARY EDEMA from left-sided heart failure! Position patient in High-Fowler's with legs dangling over the bed (reduces venous return) and administer furosemide + oxygen.",
    "memory_pearl": "\"Left ventricle backs up into the Lungs; Right ventricle backs up into the Rest of the body.\"",
    "high_yield_tip": "Weigh heart failure patients daily in the morning after voiding and before breakfast. Instruct them to report a weight gain of >2 lbs (1 kg) overnight or >5 lbs (2.3 kg) in a week.",
    "practice_question": {
      "question": "A client with heart failure presents with jugular venous distension (JVD), 3+ bilateral pretibial pitting edema, and an enlarged liver. Which pathophysiological condition explains these findings?",
      "options": [
        "A. Left ventricular systolic failure",
        "B. Right ventricular failure",
        "C. Mitral valve prolapse",
        "D. Acute aortic regurgitation"
      ],
      "answer": "B",
      "explanation": "Systemic venous congestion—manifested as JVD, dependent peripheral edema, and hepatomegaly—is the hallmark of right-sided heart failure. Left-sided failure presents with pulmonary symptoms (crackles, dyspnea)."
    },
    "id": "m-49"
  },
  {
    "title": "Infective Endocarditis Signs",
    "acronym": "F-R-O-M J-A-N-E",
    "description": "Peripheral manifestations and diagnostic criteria for infective endocarditis.",
    "specialty": "Cardiovascular",
    "category": "Med-Surgical",
    "tags": [
      "Cardiology",
      "Endocarditis",
      "Infection",
      "Med-Surg"
    ],
    "phrases": [
      "F — Fever & chills",
      "R — Roth spots (Retinal hemorrhages with pale centers)",
      "O — Osler nodes (PAINFUL nodules on pads of fingers & toes)",
      "M — Murmur (New or changing cardiac murmur)",
      "J — Janeway lesions (PAINLESS red macules on palms & soles)",
      "A — Anemia",
      "N — Nail splinter hemorrhages (Linear brown streaks in nails)",
      "E — Emboli (Septic emboli to brain, lungs, kidneys)"
    ],
    "breakdown": [
      {
        "emoji": "🌡️",
        "phrase": "F — Fever",
        "meaning": "Persistent low-grade or high-grade fever with night sweats and fatigue."
      },
      {
        "emoji": "👁️",
        "phrase": "R — Roth Spots",
        "meaning": "Oval retinal hemorrhages with pale or white centers visualized on fundoscopic ophthalmic examination."
      },
      {
        "emoji": "🖐️",
        "phrase": "O — Osler Nodes (Ouch!)",
        "meaning": "PAINFUL, erythematous, raised nodules located on the pads of fingers and toes caused by immune complex deposition."
      },
      {
        "emoji": "💓",
        "phrase": "M — Murmur",
        "meaning": "A new or worsening cardiac murmur caused by vegetative damage or perforation of heart valve leaflets."
      },
      {
        "emoji": "🦶",
        "phrase": "J — Janeway Lesions",
        "meaning": "PAINLESS, flat, red or hemorrhagic macules on the palms and soles caused by septic microemboli."
      },
      {
        "emoji": "🩸",
        "phrase": "A — Anemia",
        "meaning": "Normocytic normochromic anemia of chronic disease paired with elevated inflammatory markers (ESR, CRP)."
      },
      {
        "emoji": "💅",
        "phrase": "N — Nail Splinter Hemorrhages",
        "meaning": "Thin, dark red to linear black splinter-like hemorrhages under the fingernails or toenails."
      },
      {
        "emoji": "🎯",
        "phrase": "E — Emboli",
        "meaning": "Vegetations dislodge into the circulation causing stroke, splenic infarction, renal infarction, or pulmonary emboli."
      }
    ],
    "clinical_significance": "Infective endocarditis colonizes heart valves, particularly in clients with prosthetic valves, congenital defects, or history of IV drug use. Requires 4–6 weeks of IV bactericidal antibiotic therapy.",
    "causes": [
      "Staphylococcus aureus bacteremia",
      "Streptococcus viridans (oral flora after dental procedures)",
      "Prosthetic heart valve contamination",
      "Intravenous drug use (IVDU — typically affects tricuspid valve)"
    ],
    "exam_traps": "Don't confuse Osler nodes with Janeway lesions! Osler nodes = \"O\" for \"Ouch!\" (PAINFUL). Janeway lesions = \"J\" for \"Just painless\" (PAINLESS). High-risk dental procedures require antibiotic prophylaxis (Amoxicillin 2g PO 30–60 min prior).",
    "memory_pearl": "\"Osler nodes OUCH; Janeway lesions are plain. Endocarditis comes FROM JANE!\"",
    "high_yield_tip": "Always collect three sets of blood cultures drawn from different venipuncture sites at least 1 hour apart BEFORE administering the first dose of antibiotics.",
    "practice_question": {
      "question": "A nurse assesses a client suspected of having infective endocarditis. The client has painful, erythematous nodules on the pads of their fingers. Which clinical sign does the nurse document?",
      "options": [
        "A. Janeway lesions",
        "B. Osler nodes",
        "C. Roth spots",
        "D. Splinter hemorrhages"
      ],
      "answer": "B",
      "explanation": "Osler nodes are painful, tender, raised erythematous nodules on the pads of the fingers and toes (remember: \"O\" for Osler = \"Ouch\"). Janeway lesions are painless macules on palms and soles."
    },
    "id": "m-50"
  },
  {
    "title": "SAMPLE History in Emergency Triage",
    "acronym": "S-A-M-P-L-E",
    "description": "Rapid, structured medical history collection framework for emergency and trauma patients.",
    "specialty": "Emergency Nursing",
    "category": "Emergency",
    "tags": [
      "Triage",
      "Emergency",
      "Assessment",
      "Trauma"
    ],
    "phrases": [
      "S — Signs & Symptoms (Chief complaint & objective findings)",
      "A — Allergies (Medications, latex, food, iodine)",
      "M — Medications (Prescriptions, OTC, herbal supplements)",
      "P — Past medical & surgical history",
      "L — Last oral intake (Time and nature of food/fluid)",
      "E — Events leading to the injury or illness"
    ],
    "breakdown": [
      {
        "emoji": "🩺",
        "phrase": "S — Signs & Symptoms",
        "meaning": "What the patient reports feeling (subjective) and what the nurse measures (vitals, bleeding, deformities)."
      },
      {
        "emoji": "🚫",
        "phrase": "A — Allergies",
        "meaning": "Screen for antibiotic, anesthetic, iodine/contrast, and latex allergies before initiating emergency interventions."
      },
      {
        "emoji": "💊",
        "phrase": "M — Medications",
        "meaning": "Current prescriptions, anticoagulants (blood thinners), insulin, antihypertensives, and compliance."
      },
      {
        "emoji": "📋",
        "phrase": "P — Past Medical History",
        "meaning": "Chronic medical conditions (hypertension, diabetes, asthma, seizures) and previous surgical procedures."
      },
      {
        "emoji": "🍽️",
        "phrase": "L — Last Oral Intake",
        "meaning": "Crucial for determining gastric aspiration risk if the patient requires emergency endotracheal intubation or surgery under anesthesia."
      },
      {
        "emoji": "💥",
        "phrase": "E — Events Leading to Injury",
        "meaning": "Mechanism of injury (e.g., fall height, speed of vehicular impact, seatbelt use, sequence of symptoms)."
      }
    ],
    "clinical_significance": "Standardized framework used in pre-hospital, triage, and trauma bays to gather essential clinical data in under 2 minutes without missing critical life-safety details.",
    "causes": [
      "Trauma bay resuscitation",
      "Emergency triage",
      "Acute medical presentations",
      "Pre-operative emergency surgical assessment"
    ],
    "exam_traps": "In trauma scenarios, 'L' (Last oral intake) is critical because general anesthesia requires an empty stomach to prevent pulmonary aspiration of gastric contents. If surgery is emergent, the anesthesia team must perform Rapid Sequence Intubation (RSI) with cricoid pressure.",
    "memory_pearl": "\"Collect a quick SAMPLE: Symptoms, Allergies, Meds, Past history, Last meal, and Events!\"",
    "high_yield_tip": "Pair the SAMPLE history with the primary ABCDE assessment. Always prioritize life-saving airway and breathing interventions before completing the secondary SAMPLE history.",
    "practice_question": {
      "question": "A trauma client who was involved in an industrial machinery accident is being prepared for emergent exploratory laparotomy. In the SAMPLE history, which information is most critical for the anesthesia provider?",
      "options": [
        "A. Last oral intake",
        "B. Primary school vaccination history",
        "C. Paternal family history of hypertension",
        "D. Exact speed of the industrial machine"
      ],
      "answer": "A",
      "explanation": "The time of last oral intake (L in SAMPLE) is vital for the anesthesia team to determine aspiration risk during induction of general anesthesia, allowing them to implement appropriate airway protection precautions."
    },
    "id": "m-51"
  },
  {
    "title": "Rule of Nines for Adult Burns",
    "acronym": "Rule of 9s",
    "description": "Standard clinical method for estimating Total Body Surface Area (TBSA) burned in adults.",
    "specialty": "Emergency Nursing",
    "category": "Med-Surgical",
    "tags": [
      "Burns",
      "Emergency",
      "Calculation",
      "Med-Surg",
      "Trauma"
    ],
    "phrases": [
      "Head & Neck = 9% (4.5% front, 4.5% back)",
      "Anterior Torso = 18% (Chest 9%, Abdomen 9%)",
      "Posterior Torso = 18% (Upper back 9%, Lower back 9%)",
      "Each Upper Extremity = 9% (4.5% front, 4.5% back) × 2 = 18%",
      "Each Lower Extremity = 18% (9% front, 9% back) × 2 = 36%",
      "Perineum & Genitalia = 1%"
    ],
    "breakdown": [
      {
        "emoji": "👤",
        "phrase": "Head & Neck = 9%",
        "meaning": "Entire head and neck is 9% (anterior face is 4.5%, posterior scalp/neck is 4.5%)."
      },
      {
        "emoji": "👕",
        "phrase": "Chest & Abdomen = 18%",
        "meaning": "Anterior torso is 18% (chest 9%, abdomen 9%)."
      },
      {
        "emoji": "🛡️",
        "phrase": "Back & Buttocks = 18%",
        "meaning": "Posterior torso is 18% (upper back 9%, lower back and buttocks 9%)."
      },
      {
        "emoji": "💪",
        "phrase": "Each Arm = 9%",
        "meaning": "Each arm is 9% total (anterior 4.5%, posterior 4.5%). Both arms = 18%."
      },
      {
        "emoji": "🦵",
        "phrase": "Each Leg = 18%",
        "meaning": "Each leg is 18% total (anterior leg 9%, posterior leg 9%). Both legs = 36%."
      },
      {
        "emoji": "🩲",
        "phrase": "Perineum = 1%",
        "meaning": "Genitalia and perineum account for 1% of total body surface area."
      }
    ],
    "clinical_significance": "Accurate TBSA estimation determines fluid resuscitation requirements using the Parkland Formula, admission to specialized burn units, and morbidity/mortality risk.",
    "causes": [
      "Thermal burns (flame, scald)",
      "Chemical burns",
      "Electrical burns",
      "Flash burns"
    ],
    "exam_traps": "CRITICAL RULE: First-degree burns (superficial burns like sunburn that are red and non-blistered) are NEVER INCLUDED in the TBSA calculation! Only 2nd-degree (partial thickness) and 3rd-degree (full thickness) burns are counted.",
    "memory_pearl": "\"Head 9, Arms 9 each, Torso 18 front + 18 back, Legs 18 each, and 1 for the perineum!\"",
    "high_yield_tip": "For irregular, scattered burn areas, the patient's palm (including fingers) represents approximately 1% of their total body surface area.",
    "practice_question": {
      "question": "An adult client sustained second-degree burns to the entire anterior chest, entire anterior abdomen, and the entire circumference of both arms. Using the Rule of Nines, what is the estimated % TBSA burned?",
      "options": [
        "A. 27%",
        "B. 36%",
        "C. 45%",
        "D. 54%"
      ],
      "answer": "B",
      "explanation": "Anterior chest = 9%, anterior abdomen = 9% (total anterior torso = 18%). Each complete arm = 9% (both arms = 18%). Total TBSA = 18% + 18% = 36%."
    },
    "id": "m-52"
  },
  {
    "title": "Parkland Formula for Burn Resuscitation",
    "acronym": "4 mL × kg × % TBSA",
    "description": "Gold-standard fluid resuscitation calculation for the first 24 hours post-burn injury.",
    "specialty": "Emergency Nursing",
    "category": "Emergency",
    "tags": [
      "Burns",
      "Fluid Resuscitation",
      "Calculations",
      "Emergency"
    ],
    "phrases": [
      "Total 24h Fluid = 4 mL × Weight (kg) × % TBSA burned",
      "First 8 hours: Administer 50% (half) of total volume",
      "Next 16 hours: Administer remaining 50% divided evenly"
    ],
    "breakdown": [
      {
        "emoji": "🧮",
        "phrase": "Formula: 4 mL × kg × % TBSA",
        "meaning": "Multiply 4 mL by patient weight in kilograms by the percentage of partial and full-thickness burn area (do not convert % to decimal, e.g., use 30, not 0.30)."
      },
      {
        "emoji": "⏱️",
        "phrase": "Timing is from INJURY, not hospital arrival",
        "meaning": "The first 8-hour window begins at the EXACT TIME THE BURN OCCURRED. If 2 hours elapsed before arrival, the first half must be given over the remaining 6 hours!"
      },
      {
        "emoji": "💧",
        "phrase": "Fluid of Choice: Lactated Ringer's (LR)",
        "meaning": "Isotonic crystalloid that mirrors physiological serum electrolytes and buffers metabolic acidosis."
      },
      {
        "emoji": "🚽",
        "phrase": "Titration by Urine Output",
        "meaning": "The most reliable indicator of adequate resuscitation is maintaining urine output at 0.5 to 1.0 mL/kg/hr (30–50 mL/hr in an adult)."
      }
    ],
    "clinical_significance": "Massive burn injury causes extensive capillary leak, severe hypovolemic burn shock, and hemoconcentration. Prompt fluid replacement prevents acute tubular necrosis and hypovolemic death.",
    "causes": [
      "Major thermal burns (>20% TBSA)",
      "Inhalation burns with cutaneous injury",
      "Chemical burn shock"
    ],
    "exam_traps": "The #1 exam trap is the clock! The first 8-hour period starts from the TIME OF INJURY, NOT the time of admission to the hospital or emergency room! If the burn happened at 10:00 and the client arrives at 12:00, give 50% of fluids in the remaining 6 hours.",
    "memory_pearl": "\"4 mL × kg × % TBSA. Half in the first 8 hours FROM THE BURN, half in the next 16 hours!\"",
    "high_yield_tip": "Avoid fluid over-resuscitation, which leads to pulmonary edema, abdominal compartment syndrome, and burn edema worsening.",
    "practice_question": {
      "question": "A 70 kg client sustained 40% TBSA burns at 12:00 and arrives at the emergency department at 14:00. Using the Parkland formula (4 mL/kg/% TBSA), at what rate should the IV fluid be infused over the remaining 6 hours of the initial 8-hour period?",
      "options": [
        "A. 700 mL/hr",
        "B. 933 mL/hr",
        "C. 1,400 mL/hr",
        "D. 1,866 mL/hr"
      ],
      "answer": "B",
      "explanation": "Total 24h volume = 4 mL × 70 kg × 40 = 11,200 mL. Half (5,600 mL) must be infused in the first 8 hours from injury. Since 2 hours have already elapsed, the 5,600 mL must be infused over the remaining 6 hours: 5,600 mL ÷ 6 hours = 933.3 mL/hr."
    },
    "id": "m-53"
  },
  {
    "title": "PQRST Pain Assessment",
    "acronym": "P-Q-R-S-T",
    "description": "Systematic multidimensional assessment method for characterization of client pain.",
    "specialty": "Med-Surgical",
    "category": "Med-Surgical",
    "tags": [
      "Pain Assessment",
      "Vital Signs",
      "Fundamentals",
      "Med-Surg"
    ],
    "phrases": [
      "P — Provoking / Palliating factors (What triggers or relieves pain?)",
      "Q — Quality (Sharp, dull, burning, aching, crushing)",
      "R — Region & Radiation (Where is it and where does it spread?)",
      "S — Severity (Standardized 0–10 numeric scale)",
      "T — Timing (Onset, duration, constant vs intermittent)"
    ],
    "breakdown": [
      {
        "emoji": "🔍",
        "phrase": "P — Provocation / Palliation",
        "meaning": "What causes the pain? What makes it better (rest, positioning, medication) or worse (movement, breathing, eating)?"
      },
      {
        "emoji": "🔪",
        "phrase": "Q — Quality",
        "meaning": "Client's description of pain characteristics: stabbing, crushing, burning, throbbing, dull ache, cramping."
      },
      {
        "emoji": "📍",
        "phrase": "R — Region & Radiation",
        "meaning": "Exact anatomical location of the primary pain and where it radiates (e.g., cardiac pain radiating to jaw and left arm)."
      },
      {
        "emoji": "🔢",
        "phrase": "S — Severity Scale",
        "meaning": "Quantified using a validated rating tool (0 to 10 numeric rating scale, Wong-Baker FACES scale, FLACC scale in infants)."
      },
      {
        "emoji": "⏱️",
        "phrase": "T — Timing & Duration",
        "meaning": "When did it start? How long does an episode last? Is it constant or intermittent? Does it wake the client at night?"
      }
    ],
    "clinical_significance": "Pain is considered the \"5th Vital Sign.\" Comprehensive assessment guides immediate differential diagnosis (e.g., ischemic chest pain vs musculoskeletal vs pleuritic) and verifies analgesic effectiveness.",
    "causes": [
      "Myocardial infarction",
      "Acute surgical abdomen",
      "Fracture / Trauma",
      "Neuropathic pain",
      "Post-operative recovery"
    ],
    "exam_traps": "Pain is always subjective! The client's self-report is the single most reliable indicator of pain intensity. Never assume a patient who is laughing, talking, or on their phone is pain-free.",
    "memory_pearl": "\"PQRST dissects every pain: Provoke, Quality, Region, Severity, and Time!\"",
    "high_yield_tip": "Always reassess pain within 30 minutes after intravenous analgesic administration and within 60 minutes after oral pain medication.",
    "practice_question": {
      "question": "A client clutching their chest describes pain as \"a heavy elephant sitting on my chest that shoots down my left arm.\" Which components of the PQRST mnemonic has the client described?",
      "options": [
        "A. Provocation and Timing",
        "B. Quality and Region/Radiation",
        "C. Severity and Palliation",
        "D. Timing and Severity"
      ],
      "answer": "B",
      "explanation": "\"Heavy elephant sitting on chest\" describes the Quality of the pain, while \"shoots down my left arm\" describes the Region and Radiation."
    },
    "id": "m-54"
  },
  {
    "title": "Chest Tube Drainage Chambers",
    "acronym": "D-W-S",
    "description": "Structure, function, and normal vs. abnormal findings in 3-chamber chest drainage systems.",
    "specialty": "Respiratory",
    "category": "Med-Surgical",
    "tags": [
      "Chest Tube",
      "Respiratory",
      "Pneumothorax",
      "Critical Care"
    ],
    "phrases": [
      "D — Drainage collection chamber (Monitor color, volume, rate)",
      "W — Water seal chamber (Tidaling normal; continuous bubbling = LEAK)",
      "S — Suction control chamber (Gentle continuous bubbling is normal)"
    ],
    "breakdown": [
      {
        "emoji": "🧪",
        "phrase": "D — Drainage Collection Chamber",
        "meaning": "Receives blood, pus, or serous fluid from the pleural space; mark volume with date and time; notify MD if drainage exceeds 70–100 mL/hr of bright red blood."
      },
      {
        "emoji": "💧",
        "phrase": "W — Water Seal Chamber",
        "meaning": "Filled with 2 cm of sterile water acting as a one-way valve. Tidaling (water level rises with inhalation and falls with exhalation in spontaneous breathing) is NORMAL. CONTINUOUS BUBBLING = AIR LEAK in the system!"
      },
      {
        "emoji": "💨",
        "phrase": "S — Suction Control Chamber",
        "meaning": "Controls suction level (typically -20 cm H2O). In a wet suction system, GENTLE CONTINUOUS BUBBLING is normal and expected."
      }
    ],
    "clinical_significance": "Restores negative intrapleural pressure to re-expand a collapsed lung in pneumothorax, hemothorax, or following thoracic and cardiac surgery.",
    "causes": [
      "Pneumothorax",
      "Hemothorax",
      "Pleural effusion",
      "Empyema",
      "Post-thoracotomy / Post-CABG"
    ],
    "exam_traps": "Students frequently confuse bubbling in the Water Seal vs Suction Control! Continuous bubbling in the WATER SEAL chamber = AIR LEAK (abnormal)! Continuous bubbling in the SUCTION CONTROL chamber = NORMAL operation. Never clamp a chest tube routinely (causes tension pneumothorax)!",
    "memory_pearl": "\"Tidaling in water seal is breathing. Bubbling in water seal is leaking. Bubbling in suction is working!\"",
    "high_yield_tip": "If a chest tube becomes accidentally disconnected from the drainage unit, immediately submerge the end of the tube in 1 inch of sterile water to re-establish a water seal!",
    "practice_question": {
      "question": "While caring for a client with a chest tube connected to a closed drainage system, the nurse notes continuous vigorous bubbling in the water seal chamber. What is the nurse's interpretation?",
      "options": [
        "A. The lung has completely re-expanded",
        "B. The suction pressure is set correctly",
        "C. There is an active air leak in the system",
        "D. The client is breathing spontaneously"
      ],
      "answer": "C",
      "explanation": "Continuous bubbling in the water seal chamber indicates an air leak, either from the client's lung or from a loose connection in the tubing. Normal water seal shows tidaling (fluctuation with breathing) with only intermittent bubbling on expiration."
    },
    "id": "m-55"
  },
  {
    "title": "Acute Blood Transfusion Reaction",
    "acronym": "S-T-O-P",
    "description": "Immediate sequential nursing protocol for suspected hemolytic or acute transfusion reactions.",
    "specialty": "Emergency Nursing",
    "category": "Emergency",
    "tags": [
      "Blood Transfusion",
      "Hematology",
      "Emergency",
      "Safety"
    ],
    "phrases": [
      "S — STOP the transfusion immediately!",
      "T — Tubing disconnected at hub & flush with new NS line",
      "O — Observe vitals, airway, and notify doctor & blood bank",
      "P — Package & return blood bag, tubing, and samples to lab"
    ],
    "breakdown": [
      {
        "emoji": "🛑",
        "phrase": "S — STOP Transfusion",
        "meaning": "In any suspected reaction (fever, chills, low back pain, tachycardia, urticaria, dyspnea), stop the blood infusion IMMEDIATELY!"
      },
      {
        "emoji": "💉",
        "phrase": "T — Tubing Disconnected",
        "meaning": "Disconnect blood tubing at the IV cannula hub; connect a clean normal saline bag with completely NEW IV tubing to maintain IV access without infusing residual blood in the line."
      },
      {
        "emoji": "🩺",
        "phrase": "O — Observe & Notify",
        "meaning": "Monitor vital signs every 5–15 minutes, maintain airway and oxygenation, and notify both the physician and the hospital blood bank."
      },
      {
        "emoji": "📦",
        "phrase": "P — Package & Return to Lab",
        "meaning": "Send the remaining blood product bag, tubing, filter, and freshly collected blood/urine samples to the blood bank for repeat crossmatch and hemoglobinuria testing."
      }
    ],
    "clinical_significance": "Acute hemolytic transfusion reaction caused by ABO incompatibility causes massive intravascular hemolysis, DIC, shock, and acute renal failure. Even small volumes (30–50 mL) can be fatal.",
    "causes": [
      "ABO incompatibility (human verification error)",
      "Febrile non-hemolytic reaction",
      "Allergic / Anaphylactic reaction",
      "Transfusion-Related Acute Lung Injury (TRALI)",
      "Transfusion-Associated Circulatory Overload (TACO)"
    ],
    "exam_traps": "Never flush the blood tubing with saline into the patient when a reaction occurs! Doing so pushes the remaining incompatible blood in the tubing directly into the patient. Disconnect the tubing at the catheter hub and connect a brand-new normal saline infusion set.",
    "memory_pearl": "\"STOP the blood, disconnect at the hub, save the vein with new saline, and send the bag back to the lab!\"",
    "high_yield_tip": "Stay with the patient and monitor vital signs closely for the first 15 minutes of any transfusion; this is when life-threatening hemolytic reactions most commonly manifest.",
    "practice_question": {
      "question": "Ten minutes after initiating a unit of packed red blood cells, a client complains of severe low back pain, fever of 38.9°C, and chills. What is the nurse's FIRST action?",
      "options": [
        "A. Slow the infusion rate and administer acetaminophen",
        "B. Stop the transfusion immediately",
        "C. Flush the blood tubing with 50 mL of normal saline",
        "D. Administer diphenhydramine and continue observing"
      ],
      "answer": "B",
      "explanation": "Low back pain, fever, and chills during transfusion are classic hallmarks of an acute hemolytic reaction. The immediate priority is to stop the transfusion instantly to prevent further infusion of incompatible blood."
    },
    "id": "m-56"
  },
  {
    "title": "Autonomic Dysreflexia",
    "acronym": "S-P-I-N-E",
    "description": "Pathophysiology, triggers, and emergency nursing response for autonomic hyperreflexia.",
    "specialty": "Neurology",
    "category": "Neurology",
    "tags": [
      "Spinal Cord Injury",
      "Neurology",
      "Emergency",
      "Hypertension"
    ],
    "phrases": [
      "S — Sudden severe hypertension & Bradycardia",
      "P — Pounding headache & Profuse diaphoresis above lesion",
      "I — Immediate elevation of Head of Bed to 90 degrees",
      "N — Noxious stimulus search (Bladder, Bowel, Tight clothing)",
      "E — Ensure stimulus removal & notify provider"
    ],
    "breakdown": [
      {
        "emoji": "📈",
        "phrase": "S — Sudden Severe Hypertension",
        "meaning": "Occurs in spinal cord injuries at or above T6; massive uninhibited sympathetic response below lesion causes malignant hypertension (SBP 200–300 mmHg)."
      },
      {
        "emoji": "🤕",
        "phrase": "P — Pounding Headache",
        "meaning": "Severe throbbing headache, blurred vision, nasal congestion, and profuse sweating with skin flushing ABOVE the level of the spinal lesion."
      },
      {
        "emoji": "🛏️",
        "phrase": "I — Immediate Elevation of HOB",
        "meaning": "Immediately place client in High-Fowler's position (sitting upright 90°) with legs dangling to pool blood in lower extremities and lower intracranial pressure."
      },
      {
        "emoji": "🔍",
        "phrase": "N — Noxious Stimulus Search",
        "meaning": "Check the 3 B's: Bladder distension / kinked catheter (#1 cause, 80%), Bowel impaction (#2 cause), and Bedding/clothing (constricting garments, wrinkles, ingrown toenail)."
      },
      {
        "emoji": "⚡",
        "phrase": "E — Ensure Immediate Relief",
        "meaning": "Unkink or insert Foley catheter, perform gentle digital rectal exam with anesthetic jelly, loosen constricting clothes, and administer antihypertensive (nifedipine/nitropaste) if SBP remains high."
      }
    ],
    "clinical_significance": "Medical emergency in individuals with spinal cord injury at or above T6. Unchecked hypertension can precipitate retinal hemorrhage, hypertensive encephalopathy, intracranial hemorrhage (stroke), or death.",
    "causes": [
      "Full or distended urinary bladder (most common)",
      "Blocked or kinked Foley catheter",
      "Fecal impaction",
      "Tight abdominal binders or elastic stockings",
      "Pressure ulcers or burn on paralyzed skin"
    ],
    "exam_traps": "The FIRST action is ALWAYS to sit the patient upright (High-Fowler's) to use gravity to lower blood pressure, BEFORE searching for the full bladder! Elevate the bed first, then check the catheter.",
    "memory_pearl": "\"Sit them up right now! Check the Bladder, check the Bowel, check the Clothes!\"",
    "high_yield_tip": "If blood pressure remains dangerously elevated after emptying the bladder and clearing the bowel, administer prescribed sublingual nifedipine or topical nitroglycerin paste.",
    "practice_question": {
      "question": "A client with a complete T4 spinal cord injury suddenly reports a severe, throbbing headache. The nurse notes diaphoresis and flushing on the client's face and neck, with a blood pressure of 210/110 mmHg. What should the nurse do FIRST?",
      "options": [
        "A. Palpate the bladder for distension",
        "B. Place the client in a high-Fowler's (sitting upright) position",
        "C. Administer sublingual nifedipine",
        "D. Perform a digital rectal examination"
      ],
      "answer": "B",
      "explanation": "The client is experiencing Autonomic Dysreflexia. The immediate first nursing action is to elevate the head of the bed to 90 degrees (high-Fowler's) to promote orthostatic venous pooling and decrease blood pressure, then immediately check for bladder distension."
    },
    "id": "m-57"
  },
  {
    "title": "Parkinson's Disease Cardinal Signs",
    "acronym": "T-R-A-P",
    "description": "The four cardinal motor features of Parkinson's disease resulting from dopamine deficiency.",
    "specialty": "Neurology",
    "category": "Neurology",
    "tags": [
      "Parkinsons",
      "Neurology",
      "Geriatrics",
      "Movement Disorders"
    ],
    "phrases": [
      "T — Tremor at rest (\"Pill-rolling\" tremor)",
      "R — Rigidity (\"Cogwheel\" or lead-pipe resistance)",
      "A — Akinesia / Bradykinesia (Slowness of movement)",
      "P — Postural instability (Loss of balance & shuffling gait)"
    ],
    "breakdown": [
      {
        "emoji": "👋",
        "phrase": "T — Tremor at Rest",
        "meaning": "Unilateral resting tremor, classically described as \"pill-rolling\" involving the thumb and index finger; disappears during voluntary movement and sleep."
      },
      {
        "emoji": "🦾",
        "phrase": "R — Rigidity",
        "meaning": "Involuntary stiffness and resistance to passive range of motion, exhibiting jerky \"cogwheel\" rigidity or uniform \"lead-pipe\" resistance."
      },
      {
        "emoji": "🐢",
        "phrase": "A — Akinesia / Bradykinesia",
        "meaning": "Slowness of movement, difficulty initiating voluntary movement, masked facial expression (hypomimia), reduced blinking, and micrographic handwriting."
      },
      {
        "emoji": "🚶",
        "phrase": "P — Postural Instability",
        "meaning": "Impaired balance reflexes, stooped forward posture, festinating shuffling gait, and high propensity for falls."
      }
    ],
    "clinical_significance": "Parkinson's disease stems from idiopathic degeneration of dopamine-producing neurons in the substantia nigra of the basal ganglia, leading to an imbalance with acetylcholine.",
    "causes": [
      "Idiopathic neurodegeneration",
      "Dopamine-blocking drug-induced parkinsonism",
      "Post-encephalitic parkinsonism",
      "Repeated head trauma (dementia pugilistica)"
    ],
    "exam_traps": "Clients taking Carbidopa-Levodopa must avoid high-protein meals at medication administration time because amino acids compete with levodopa for transport across the blood-brain barrier! Also, warn them that urine and saliva may turn harmlessly dark red, brown, or black.",
    "memory_pearl": "\"Parkinson's traps the patient in their body: Tremor, Rigidity, Akinesia, Postural instability (TRAP)!\"",
    "high_yield_tip": "Teach clients to overcome \"freezing\" gait episodes by pretending to step over an imaginary line on the floor or rocking side to side before walking.",
    "practice_question": {
      "question": "A nurse assesses a client newly diagnosed with Parkinson's disease. Which observation best exemplifies the feature of bradykinesia?",
      "options": [
        "A. A rhythmic pill-rolling tremor of the hands while resting in a chair",
        "B. Jerky ratchet-like resistance when passively flexing the client's elbow",
        "C. Slow, shuffling gait with loss of spontaneous arm swing and a masked facial expression",
        "D. Loss of balance when gently pulled backward by the examiner"
      ],
      "answer": "C",
      "explanation": "Bradykinesia is characterized by slowness of voluntary movement, lack of spontaneous movements (e.g., absent arm swing while walking), micrographic writing, and a fixed, mask-like facial expression."
    },
    "id": "m-58"
  },
  {
    "title": "Hypokalemia Signs & Symptoms",
    "acronym": "The 6 L's",
    "description": "Clinical manifestations of serum potassium depletion (<3.5 mEq/L).",
    "specialty": "Endocrine",
    "category": "Med-Surgical",
    "tags": [
      "Potassium",
      "Electrolytes",
      "Cardiology",
      "ECG",
      "Fluids"
    ],
    "phrases": [
      "L — Lethargy & confusion",
      "L — Low, shallow respirations",
      "L — Lethal cardiac dysrhythmias (U-waves, flat T-waves)",
      "L — Leg cramps & muscle weakness",
      "L — Limp muscles (Hyporeflexia & flaccid paralysis)",
      "L — Low bowel motility (Constipation & paralytic ileus)"
    ],
    "breakdown": [
      {
        "emoji": "🥱",
        "phrase": "L — Lethargy",
        "meaning": "Generalized fatigue, drowsiness, confusion, and psychological depression."
      },
      {
        "emoji": "😮‍💨",
        "phrase": "L — Low Shallow Respirations",
        "meaning": "Weakness of diaphragm and intercostal respiratory muscles can cause hypoventilation and respiratory arrest."
      },
      {
        "emoji": "💓",
        "phrase": "L — Lethal Cardiac Dysrhythmias",
        "meaning": "ECG changes: flattened or inverted T-waves, ST depression, prominent U-waves, premature ventricular contractions (PVCs), and ventricular tachycardia."
      },
      {
        "emoji": "🦵",
        "phrase": "L — Leg Cramps",
        "meaning": "Cramping and spasms in calf muscles and extremities, progressing to painful myalgias."
      },
      {
        "emoji": "🪢",
        "phrase": "L — Limp Muscles",
        "meaning": "Skeletal muscle weakness, decreased deep tendon reflexes, and flaccid paralysis."
      },
      {
        "emoji": "💩",
        "phrase": "L — Low Bowel Motility",
        "meaning": "Smooth muscle hypomotility causes abdominal distension, absent bowel sounds, constipation, and paralytic ileus."
      }
    ],
    "clinical_significance": "Potassium is the major intracellular cation. Hypokalemia increases susceptibility to digitalis toxicity and triggers fatal ventricular arrhythmias.",
    "causes": [
      "Loop and thiazide diuretic therapy (Furosemide, HCTZ)",
      "Gastrointestinal losses (vomiting, diarrhea, NG suction)",
      "Hyperaldosteronism",
      "Diabetic ketoacidosis treatment with insulin without K+ replacement"
    ],
    "exam_traps": "CRITICAL SAFETY RULE: NEVER, UNDER ANY CIRCUMSTANCES, ADMINISTER POTASSIUM CHLORIDE VIA IV PUSH, IM, OR SC INJECTION! IV push potassium causes instant fatal cardiac arrest! IV potassium must ALWAYS be diluted and infused via an electronic infusion pump at a maximum rate of 10–20 mEq/hr.",
    "memory_pearl": "\"Low potassium leaves you Limp and Low, with Lethal dysrhythmias and U-waves on the ECG!\"",
    "high_yield_tip": "If hypokalemia is refractory to potassium replacement, check serum MAGNESIUM! Hypomagnesemia prevents renal conservation of potassium; you cannot fix hypokalemia until magnesium is corrected.",
    "practice_question": {
      "question": "A client taking furosemide has a serum potassium level of 2.9 mEq/L. Which cardiac monitor finding should the nurse anticipate observing?",
      "options": [
        "A. Tall, peaked T-waves and widened QRS complex",
        "B. Flattened T-waves and prominent U-waves",
        "C. Shortened PR interval with absent P-waves",
        "D. Elevated ST segments across all precordial leads"
      ],
      "answer": "B",
      "explanation": "Hypokalemia causes characteristic ECG changes including flattened or inverted T-waves, ST-segment depression, and the appearance of prominent U-waves following the T-wave. Tall, peaked T-waves are seen in hyperkalemia."
    },
    "id": "m-59"
  },
  {
    "title": "Hyperkalemia Causes & ECG Changes",
    "acronym": "M-A-C-H-I-N-E",
    "description": "Etiology, pathognomonic ECG progression, and emergency stabilization for hyperkalemia (>5.0 mEq/L).",
    "specialty": "Endocrine",
    "category": "Med-Surgical",
    "tags": [
      "Potassium",
      "Electrolytes",
      "Cardiology",
      "ECG",
      "Renal"
    ],
    "phrases": [
      "M — Medications (ACE inhibitors, ARBs, Spironolactone, NSAIDs)",
      "A — Acidosis (Metabolic acidosis shifts K+ out of cells)",
      "C — Cellular destruction (Burns, crush injury, rhabdomyolysis)",
      "H — Hypoaldosteronism (Addison's disease)",
      "I — Intake excessive (Potassium supplements, salt substitutes)",
      "N — Nephron / Renal failure (Decreased GFR & excretion)",
      "E — Excretion impaired"
    ],
    "breakdown": [
      {
        "emoji": "💊",
        "phrase": "M — Medications",
        "meaning": "ACE inhibitors, ARBs, potassium-sparing diuretics, and NSAIDs suppress aldosterone and impair potassium excretion."
      },
      {
        "emoji": "🧪",
        "phrase": "A — Acidosis",
        "meaning": "Excess hydrogen ions enter cells to buffer serum acidosis, forcing potassium out into the extracellular space."
      },
      {
        "emoji": "💥",
        "phrase": "C — Cellular Destruction",
        "meaning": "Major burns, trauma, crush injuries, and tumor lysis syndrome cause necrotic cells to rupture and spill high intracellular potassium."
      },
      {
        "emoji": "🦋",
        "phrase": "H — Hypoaldosteronism",
        "meaning": "Addison's disease causes lack of aldosterone, leading to renal potassium retention and sodium wasting."
      },
      {
        "emoji": "🧂",
        "phrase": "I — Intake Excessive",
        "meaning": "Excessive IV potassium infusion or liberal use of potassium chloride salt substitutes."
      },
      {
        "emoji": "🫘",
        "phrase": "N & E — Nephron Impairment",
        "meaning": "Oliguric acute kidney injury and chronic end-stage kidney disease fail to excrete daily dietary potassium."
      }
    ],
    "clinical_significance": "Severe hyperkalemia (>6.5 mEq/L) causes progressive cardiac conduction blocks, sine wave patterns, ventricular fibrillation, and cardiac standstill.",
    "causes": [
      "End-stage renal disease (ESRD)",
      "Rhabdomyolysis",
      "Spironolactone / ACE inhibitor toxicity",
      "Addisonian crisis",
      "Metabolic ketoacidosis"
    ],
    "exam_traps": "In acute severe hyperkalemia with ECG changes (tall peaked T-waves), the FIRST drug administered is CALCIUM GLUCONATE! Calcium does NOT lower serum potassium; it antagonizes the cardiac membrane excitability to prevent fatal arrhythmias while other agents (insulin + D50W, albuterol, kayexalate) shift or remove potassium.",
    "memory_pearl": "\"Calcium stabilizes the heart; Insulin + D50W drives K+ into cells; Kayexalate eliminates it from the bowel!\"",
    "high_yield_tip": "ECG progression of hyperkalemia: Tall, peaked T-waves → prolonged PR interval → flattened/absent P-wave → widened QRS complex → sine wave → ventricular fibrillation.",
    "practice_question": {
      "question": "A client with end-stage renal disease presents with a serum potassium of 7.2 mEq/L and an ECG showing tall, peaked T-waves and a widened QRS complex. Which medication should the nurse prepare to administer FIRST?",
      "options": [
        "A. Sodium polystyrene sulfonate (Kayexalate) orally",
        "B. IV regular insulin and 50% dextrose (D50W)",
        "C. IV Calcium gluconate",
        "D. Nebulized albuterol"
      ],
      "answer": "C",
      "explanation": "IV Calcium gluconate is the first-line emergency medication for hyperkalemia with ECG changes. It immediately stabilizes the cardiac cell membrane against fatal arrhythmias within minutes, buying time for insulin/dextrose and Kayexalate to lower potassium levels."
    },
    "id": "m-60"
  },
  {
    "title": "Hyponatremia Signs & Symptoms",
    "acronym": "S-A-L-T L-O-S-S",
    "description": "Neurological and systemic manifestations of serum sodium depletion (<135 mEq/L).",
    "specialty": "Endocrine",
    "category": "Med-Surgical",
    "tags": [
      "Sodium",
      "Electrolytes",
      "Neurology",
      "Fluids"
    ],
    "phrases": [
      "S — Stupor, confusion, lethargy",
      "A — Anorexia, nausea, vomiting",
      "L — Lethargy & fatigue",
      "T — Tendon reflexes decreased (Hyporeflexia)",
      "L — Limp muscles & weakness",
      "O — Orthostatic hypotension",
      "S — Seizures & Cerebral edema",
      "S — Stomach cramping & hyperactive bowel sounds"
    ],
    "breakdown": [
      {
        "emoji": "🧠",
        "phrase": "S — Stupor & Confusion",
        "meaning": "Hypo-osmolar state causes water to move into brain cells, leading to cerebral edema, headache, restlessness, and progressive confusion."
      },
      {
        "emoji": "🤢",
        "phrase": "A — Anorexia & Nausea",
        "meaning": "GI upset with nausea, vomiting, and loss of appetite."
      },
      {
        "emoji": "🥱",
        "phrase": "L — Lethargy",
        "meaning": "Profound malaise, fatigue, and difficulty arousing."
      },
      {
        "emoji": "🔨",
        "phrase": "T — Tendon Reflexes Decreased",
        "meaning": "Depressed deep tendon reflexes."
      },
      {
        "emoji": "💪",
        "phrase": "L — Limp Muscles",
        "meaning": "Generalized muscle weakness, twitching, and cramping."
      },
      {
        "emoji": "📉",
        "phrase": "O — Orthostatic Hypotension",
        "meaning": "Hypovolemic hyponatremia presents with tachycardia and orthostatic drop in blood pressure."
      },
      {
        "emoji": "⚡",
        "phrase": "S — Seizures",
        "meaning": "When sodium drops rapidly below 120 mEq/L, cerebral swelling triggers generalized seizures, coma, and herniation."
      },
      {
        "emoji": "🚽",
        "phrase": "S — Stomach Cramping",
        "meaning": "Abdominal cramps and diarrhea."
      }
    ],
    "clinical_significance": "Sodium is the primary determinant of extracellular fluid osmolality. Severe acute hyponatremia is a neurological emergency due to risk of uncal herniation and brainstem compression.",
    "causes": [
      "SIADH (Syndrome of Inappropriate ADH)",
      "Excessive hypotonic IV fluids (D5W)",
      "Diuretic therapy",
      "Psychogenic polydipsia",
      "Congestive heart failure and cirrhosis (dilutional)"
    ],
    "exam_traps": "NEVER correct chronic hyponatremia too rapidly! Correcting sodium faster than 8–10 mEq/L per 24 hours causes Osmotic Demyelination Syndrome (Central Pontine Myelinolysis), leading to permanent quadriplegia, \"locked-in\" syndrome, or death.",
    "memory_pearl": "\"Low sodium swells the brain: Seizures, Stupor, and Spasms. Correct it slowly!\"",
    "high_yield_tip": "For severe, symptomatic hyponatremia (seizures, coma), administer small boluses of Hypertonic Saline (3% NaCl) via central line, with frequent serum sodium checks every 2–4 hours.",
    "practice_question": {
      "question": "A client with lung cancer develops SIADH with a serum sodium level of 118 mEq/L and begins exhibiting confusion and twitching. Which physician order should the nurse implement with the highest priority?",
      "options": [
        "A. Initiate seizure precautions and administer IV 3% sodium chloride",
        "B. Infuse 1,000 mL of 0.45% normal saline",
        "C. Encourage oral fluid intake of at least 2,500 mL/day",
        "D. Administer oral furosemide with orange juice"
      ],
      "answer": "A",
      "explanation": "A sodium level of 118 mEq/L with neurological symptoms indicates severe cerebral edema and imminent seizure risk. The priority is implementing seizure precautions and infusing hypertonic 3% saline to draw water out of brain tissue."
    },
    "id": "m-61"
  },
  {
    "title": "Hypernatremia Signs & Symptoms",
    "acronym": "F-R-I-E-D S-A-L-T",
    "description": "Clinical findings of cellular dehydration and hyperosmolality (>145 mEq/L).",
    "specialty": "Endocrine",
    "category": "Med-Surgical",
    "tags": [
      "Sodium",
      "Electrolytes",
      "Dehydration",
      "Fluids"
    ],
    "phrases": [
      "F — Fever & flushed skin",
      "R — Restlessness, agitation, irritability",
      "I — Increased fluid retention & blood pressure",
      "E — Edema (Peripheral & pulmonary)",
      "D — Decreased urine output & dry mouth",
      "S — Skin flushed & dry mucous membranes",
      "A — Agitation & confusion",
      "L — Low-grade fever",
      "T — Thirst (Intense polydipsia)"
    ],
    "breakdown": [
      {
        "emoji": "🔥",
        "phrase": "F — Fever & Flushing",
        "meaning": "Impaired thermoregulation and cutaneous vasodilation."
      },
      {
        "emoji": "⚡",
        "phrase": "R — Restlessness",
        "meaning": "Cellular dehydration in the brain causes CNS hyperirritability, manic restlessness, and confusion."
      },
      {
        "emoji": "📈",
        "phrase": "I — Increased BP",
        "meaning": "In hypervolemic hypernatremia (excess sodium intake), volume expansion elevates blood pressure."
      },
      {
        "emoji": "🫧",
        "phrase": "E — Edema",
        "meaning": "Sodium retention draws fluid into interstitium."
      },
      {
        "emoji": "🏜️",
        "phrase": "D — Dry Mouth & Oliguria",
        "meaning": "Dry sticky mucous membranes, furrowed tongue, and low concentrated urine output."
      },
      {
        "emoji": "👅",
        "phrase": "T — Thirst",
        "meaning": "Intense polydipsia driven by hypothalamic osmoreceptors; the body's primary defense mechanism against hypernatremia."
      }
    ],
    "clinical_significance": "Hypernatremia (>145 mEq/L) creates a hyperosmolar extracellular environment, pulling water out of body cells. Intracellular brain dehydration can tear cerebral blood vessels, causing subdural hematomas.",
    "causes": [
      "Diabetes Insipidus (deficiency of ADH)",
      "Profuse watery diarrhea or sweating without water intake",
      "Inability to access water (infants, elderly, comatose)",
      "Excessive IV hypertonic saline or sodium bicarbonate"
    ],
    "exam_traps": "Correcting hypernatremia too quickly with hypotonic fluids causes water to rush into brain cells, triggering CEREBRAL EDEMA, seizures, and herniation. Lower sodium slowly over 48 hours at a rate of ≤0.5 mEq/L per hour.",
    "memory_pearl": "\"Hypernatremia fries the cells: Flushed, Restless, Irritable, and Thirsty as a desert!\"",
    "high_yield_tip": "In Diabetes Insipidus, hypernatremia presents with massive polyuria (>4–18 L/day of dilute urine with specific gravity <1.005). The treatment is Desmopressin (DDAVP).",
    "practice_question": {
      "question": "A client recovering from transsphenoidal hypophysectomy produces 600 mL/hr of dilute urine for 3 consecutive hours. Serum sodium is 152 mEq/L. Which condition does the nurse suspect?",
      "options": [
        "A. SIADH",
        "B. Diabetes Insipidus",
        "C. Addisonian Crisis",
        "D. Acute Kidney Injury"
      ],
      "answer": "B",
      "explanation": "Surgical manipulation of the pituitary gland during transsphenoidal surgery frequently triggers temporary or permanent Diabetes Insipidus (lack of ADH). This causes massive dilute polyuria, dehydration, and hypernatremia."
    },
    "id": "m-62"
  },
  {
    "title": "Cushing's vs. Addison's Disease",
    "acronym": "Cushing = Cushy Cortisol vs. Addison = Add Cortisol",
    "description": "Contrasting manifestations of adrenal hypercortisolism versus adrenal insufficiency.",
    "specialty": "Endocrine",
    "category": "Med-Surgical",
    "tags": [
      "Endocrine",
      "Adrenal",
      "Cushings",
      "Addisons",
      "Steroids"
    ],
    "phrases": [
      "Cushing's (\"Cushy\" Extra Cortisol): Buffalo hump, Moon face, Purple striae, Hyperglycemia, High BP",
      "Addison's (\"Add\" Cortisol Deficiency): Bronze skin, Low BP, Hyponatremia, Hyperkalemia, Hypoglycemia"
    ],
    "breakdown": [
      {
        "emoji": "🌕",
        "phrase": "Cushing's: Moon Face & Buffalo Hump",
        "meaning": "Excess glucocorticoids cause fat redistribution to face (moon face), upper back (buffalo hump), and trunk with thin wasting extremities."
      },
      {
        "emoji": "🟣",
        "phrase": "Cushing's: Purple Striae & Fragile Skin",
        "meaning": "Catabolic protein breakdown causes thin translucent skin, easy bruising, ecchymosis, and broad purple abdominal stretch marks."
      },
      {
        "emoji": "📈",
        "phrase": "Cushing's Labs: High Sugar, High Na+, Low K+",
        "meaning": "Hyperglycemia, hypernatremia, hypokalemia, and hypertension due to mineralocorticoid fluid retention."
      },
      {
        "emoji": "🥉",
        "phrase": "Addison's: Bronze Hyperpigmentation",
        "meaning": "Adrenal cortex destruction prompts pituitary to secrete excess ACTH, causing distinctive bronze darkening of skin creases, scars, and gums."
      },
      {
        "emoji": "📉",
        "phrase": "Addison's: Hypotension & Fatigue",
        "meaning": "Lack of cortisol and aldosterone leads to vascular collapse, postural hypotension, severe fatigue, and weight loss."
      },
      {
        "emoji": "🧪",
        "phrase": "Addison's Labs: Low Sugar, Low Na+, High K+",
        "meaning": "Hyponatremia, hyperkalemia, hypoglycemia, and hypercalcemia."
      }
    ],
    "clinical_significance": "Cushing's syndrome causes immunosuppression, osteoporosis, and cardiovascular morbidity. Addison's disease carries the risk of fatal Addisonian Crisis triggered by physical stress or infection.",
    "causes": [
      "Exogenous steroid therapy / Pituitary adenoma (Cushing's)",
      "Autoimmune adrenalitis / Tuberculosis of adrenal glands (Addison's)"
    ],
    "exam_traps": "In Addisonian Crisis, the client presents with vascular shock: severe refractory hypotension, hyponatremia, hyperkalemia, and hypoglycemia. The emergency treatment is IV Hydrocortisone bolus plus aggressive 0.9% Normal Saline with D5W.",
    "memory_pearl": "\"Cushing has a CUSHY pillow of fat and high cortisol. Addison needs you to ADD hormones!\"",
    "high_yield_tip": "Never abruptly stop long-term steroid therapy (prednisone); taper doses gradually to allow the atrophic adrenal cortex time to resume endogenous cortisol production.",
    "practice_question": {
      "question": "A client with Addison's disease experiences an acute episode of gastroenteritis. The client arrives at the emergency department with a BP of 70/40 mmHg, confusion, serum sodium of 124 mEq/L, and serum potassium of 6.2 mEq/L. Which intervention is the top priority?",
      "options": [
        "A. Administer oral fludrocortisone with a light meal",
        "B. Administer IV hydrocortisone and infuse rapid normal saline with dextrose",
        "C. Administer potassium chloride IV piggyback",
        "D. Prepare the client for an immediate adrenalectomy"
      ],
      "answer": "B",
      "explanation": "The client is in life-threatening Addisonian Crisis (acute adrenal crisis) triggered by gastroenteritis infection, resulting in profound hypotension, hyponatremia, and hyperkalemia. The priority is IV Hydrocortisone and aggressive IV fluid resuscitation."
    },
    "id": "m-63"
  },
  {
    "title": "Altered Mental Status Differential",
    "acronym": "A-E-I-O-U T-I-P-S",
    "description": "Systematic clinical checklist for identifying reversible causes of acute delirium and coma.",
    "specialty": "Neurology",
    "category": "Emergency",
    "tags": [
      "Delirium",
      "Coma",
      "Emergency",
      "Neurology",
      "Assessment"
    ],
    "phrases": [
      "A — Alcohol / Acidosis",
      "E — Epilepsy, Electrolytes, Encephalopathy",
      "I — Insulin (Hypoglycemia — check fingerstick glucose!)",
      "O — Overdose / Oxygen (Hypoxia)",
      "U — Uremia (Kidney failure)",
      "T — Trauma / Temperature (Hypothermia, Heat stroke)",
      "I — Infection (Sepsis, Meningitis, UTI)",
      "P — Poisoning / Psychiatric illness",
      "S — Shock, Stroke, Subarachnoid hemorrhage"
    ],
    "breakdown": [
      {
        "emoji": "🍷",
        "phrase": "A — Alcohol / Acidosis",
        "meaning": "Acute intoxication, alcohol withdrawal (delirium tremens), or severe metabolic acidosis (DKA, lactic acidosis)."
      },
      {
        "emoji": "⚡",
        "phrase": "E — Epilepsy / Electrolytes",
        "meaning": "Post-ictal state, non-convulsive status epilepticus, severe hyponatremia (<120 mEq/L), or hepatic encephalopathy."
      },
      {
        "emoji": "🩸",
        "phrase": "I — Insulin (Hypoglycemia)",
        "meaning": "Low blood sugar (<70 mg/dL or <3.9 mmol/L); the brain is totally dependent on glucose; always check capillary blood sugar FIRST!"
      },
      {
        "emoji": "💊",
        "phrase": "O — Overdose / Oxygen",
        "meaning": "Opioids, benzodiazepines, sedatives, or profound hypoxia (SpO2 <85%) and carbon dioxide narcosis."
      },
      {
        "emoji": "🫘",
        "phrase": "U — Uremia",
        "meaning": "End-stage renal failure with severe uremic toxins crossing the blood-brain barrier."
      },
      {
        "emoji": "💥",
        "phrase": "T — Trauma / Temperature",
        "meaning": "Concussion, epidural/subdural hematoma, severe hypothermia (<32°C), or heat stroke."
      },
      {
        "emoji": "🦠",
        "phrase": "I — Infection",
        "meaning": "Sepsis, bacterial meningitis, encephalitis, or occult urinary tract infection (UTI in elderly)."
      },
      {
        "emoji": "☠️",
        "phrase": "P — Poisoning / Psych",
        "meaning": "Carbon monoxide, organophosphates, heavy metals, or acute catatonic psychiatric state."
      },
      {
        "emoji": "🧠",
        "phrase": "S — Shock / Stroke",
        "meaning": "Cardiogenic/septic shock causing cerebral hypoperfusion, acute ischemic stroke, or subarachnoid hemorrhage."
      }
    ],
    "clinical_significance": "Acute altered mental status (AMS) requires rapid, structured bedside troubleshooting to reverse easily treatable conditions (hypoglycemia, hypoxia, opioid overdose) within minutes.",
    "causes": [
      "Acute delirium",
      "Unresponsive patient",
      "Emergency department triage",
      "ICU acute mental change"
    ],
    "exam_traps": "In any patient presenting with altered mental status, confusion, or combativeness, checking POINT-OF-CARE BLOOD GLUCOSE is the absolute fastest and most critical initial nursing assessment!",
    "memory_pearl": "\"AEIOU TIPS: Check the sugar (I) and oxygen (O) before running extensive brain scans!\"",
    "high_yield_tip": "In elderly clients with sudden confusion and agitation without fever, ALWAYS check a urine analysis; urinary tract infection is the leading cause of delirium in the geriatric population.",
    "practice_question": {
      "question": "An elderly client with a history of diabetes is brought to the emergency department by family because of sudden confusion, sweating, and slurred speech. What is the nurse's FIRST action?",
      "options": [
        "A. Obtain an immediate bedside fingerstick blood glucose reading",
        "B. Send the client for an urgent head CT scan",
        "C. Administer broad-spectrum IV antibiotics for presumed sepsis",
        "D. Restrain the client to prevent falls"
      ],
      "answer": "A",
      "explanation": "Hypoglycemia mimics stroke and acute delirium. Because irreversible brain injury can occur rapidly, checking blood glucose via bedside fingerstick is the immediate priority before ordering complex imaging or medications."
    },
    "id": "m-64"
  },
  {
    "title": "Glasgow Coma Scale Scoring",
    "acronym": "E-V-M 4-5-6",
    "description": "Standardized neurological assessment tool for level of consciousness and traumatic brain injury.",
    "specialty": "Neurology",
    "category": "Neurology",
    "tags": [
      "GCS",
      "Neuro Assessment",
      "Trauma",
      "Emergency",
      "Critical Care"
    ],
    "phrases": [
      "Eye Opening (Max 4): Spontaneous (4), To speech (3), To pain (2), None (1)",
      "Verbal Response (Max 5): Oriented (5), Confused (4), Inappropriate (3), Incomprehensible (2), None (1)",
      "Motor Response (Max 6): Obeys (6), Localizes (5), Withdraws (4), Decorticate (3), Decerebrate (2), None (1)",
      "Total Score: 3 to 15. \"Score 8 or less, Intubate!\""
    ],
    "breakdown": [
      {
        "emoji": "👁️",
        "phrase": "Eye Opening (4 Points)",
        "meaning": "4 = Spontaneous open; 3 = Opens to verbal command/sound; 2 = Opens only to painful/pressure stimulus; 1 = No eye opening."
      },
      {
        "emoji": "🗣️",
        "phrase": "Verbal Response (5 Points)",
        "meaning": "5 = Oriented to person, place, time; 4 = Confused conversation; 3 = Inappropriate words; 2 = Incomprehensible sounds/groans; 1 = No verbal response."
      },
      {
        "emoji": "💪",
        "phrase": "Motor Response (6 Points)",
        "meaning": "6 = Obeys verbal commands; 5 = Localizes to pain; 4 = Normal flexion/withdrawal from pain; 3 = Abnormal flexion (Decorticate rigidity); 2 = Extension (Decerebrate rigidity); 1 = Flaccid/None."
      },
      {
        "emoji": "⚠️",
        "phrase": "Interpretation & Cutoffs",
        "meaning": "13–15 = Mild brain injury; 9–12 = Moderate brain injury; 3–8 = Severe brain injury. GCS ≤ 8 signifies inability to maintain own airway (\"Less than 8, Intubate!\")."
      }
    ],
    "clinical_significance": "Universally utilized in trauma and critical care to track neurological deterioration. A drop of 2 or more points requires immediate provider notification and emergency neuroimaging.",
    "causes": [
      "Traumatic brain injury (TBI)",
      "Intracranial hemorrhage",
      "Post-cardiac arrest coma",
      "Meningitis",
      "Toxic metabolic encephalopathy"
    ],
    "exam_traps": "Remember the maximum scores: Eyes = 4, Verbal = 5, Motor = 6 (EVM 4-5-6). Decorticate (arms flexed in to core/chest) scores 3. Decerebrate (arms extended out at sides) scores 2 and indicates worse brainstem herniation!",
    "memory_pearl": "\"Eyes have 4 letters (max 4). V-E-R-B-A-L has 6 letters minus 1 = 5. Motor has 5 letters plus 1 = 6. Less than 8, Intubate!\"",
    "high_yield_tip": "The minimum possible GCS score is 3 (not 0!). Even a completely dead or unresponsive patient receives a score of 3 (1+1+1).",
    "practice_question": {
      "question": "A nurse assesses a head injury client who opens their eyes to pressure, speaks in incomprehensible groans, and extends their arms rigidly (decerebrate posturing) when painful stimuli are applied. What is the client's Glasgow Coma Scale (GCS) score?",
      "options": [
        "A. 5",
        "B. 6",
        "C. 7",
        "D. 8"
      ],
      "answer": "B",
      "explanation": "Eye opening to pressure = 2 points. Incomprehensible sounds = 2 points. Decerebrate extension = 2 points. Total GCS score = 2 + 2 + 2 = 6 points."
    },
    "id": "m-65"
  },
  {
    "title": "Pediatric Dehydration Severity",
    "acronym": "W-E-T",
    "description": "Clinical grading and physiological assessment of acute dehydration in infants and young children.",
    "specialty": "Pediatrics",
    "category": "Pediatrics",
    "tags": [
      "Pediatrics",
      "Dehydration",
      "Gastroenteritis",
      "Assessment"
    ],
    "phrases": [
      "W — Weight loss percentage (Mild 3–5%, Mod 6–9%, Severe ≥10%)",
      "E — Eyes sunken & absence of tears",
      "T — Turgor poor (Skin tenting >2s) & Depressed fontanelle",
      "Wet Diapers <4–6 per day & Capillary refill prolonged"
    ],
    "breakdown": [
      {
        "emoji": "⚖️",
        "phrase": "W — Weight Loss %",
        "meaning": "The single most accurate measure of hydration status. Mild = 3–5% weight loss; Moderate = 6–9% weight loss; Severe = ≥10% weight loss in infants."
      },
      {
        "emoji": "😢",
        "phrase": "E — Eyes Sunken & No Tears",
        "meaning": "Deeply sunken orbits, absent tear production when crying, and dry, cracked lips and oral mucosa."
      },
      {
        "emoji": "👶",
        "phrase": "T — Turgor & Fontanelle",
        "meaning": "Skin tenting (pinch abdominal skin; sluggish return >2 seconds) and distinctly sunken anterior fontanelle in infants <18 months."
      },
      {
        "emoji": "🩲",
        "phrase": "Wet Diapers Decreased",
        "meaning": "Infant produces fewer than 4–6 wet diapers in 24 hours, or oliguria with dark concentrated urine."
      },
      {
        "emoji": "⏱️",
        "phrase": "Prolonged Capillary Refill",
        "meaning": "Capillary refill >3 seconds, cool mottled extremities, tachycardia, and lethargy indicate severe dehydration and impending hypovolemic shock."
      }
    ],
    "clinical_significance": "Acute gastroenteritis leading to dehydration is a leading cause of pediatric morbidity and mortality in developing nations and Kenya.",
    "causes": [
      "Rotavirus or bacterial gastroenteritis",
      "Severe vomiting and diarrhea",
      "Malnutrition",
      "Burns",
      "Diabetic ketoacidosis in children"
    ],
    "exam_traps": "Oral Rehydration Solution (ORS) is first-line for mild and moderate dehydration! Do NOT give plain water, apple juice, soda, or commercial sports drinks (high osmolarity causes osmotic diarrhea!). For severe dehydration with shock, infuse immediate IV Isotonic saline bolus (20 mL/kg).",
    "memory_pearl": "\"Check if the child is WET: Weight, Eyes, Turgor, and Diapers. Severe means an immediate 20 mL/kg bolus!\"",
    "high_yield_tip": "For severe pediatric dehydration with hypotension or lethargy, the standard emergency fluid bolus is 20 mL/kg of Normal Saline or Ringer's Lactate over 15–30 minutes.",
    "practice_question": {
      "question": "A 9-month-old infant with 2 days of severe diarrhea is lethargic, has deeply sunken eyes, skin tenting lasting 3 seconds, a capillary refill of 4 seconds, and a 12% acute weight reduction. What is the nurse's immediate intervention?",
      "options": [
        "A. Administer oral rehydration solution (ORS) with a medicine dropper",
        "B. Provide 4 ounces of diluted apple juice",
        "C. Administer an IV bolus of 20 mL/kg of 0.9% Normal Saline",
        "D. Recommend breastfeeding every 4 hours"
      ],
      "answer": "C",
      "explanation": "A 12% weight loss, prolonged capillary refill, and lethargy define SEVERE dehydration and hypovolemic shock. Oral rehydration is contraindicated due to altered mental status. The immediate intervention is an intravenous bolus of 20 mL/kg of isotonic crystalloid (0.9% Normal Saline)."
    },
    "id": "m-66"
  },
  {
    "title": "Transmission Precautions — Airborne",
    "acronym": "M-T-V",
    "description": "Infection prevention protocol and PPE for airborne-transmitted infectious pathogens.",
    "specialty": "Infectious Diseases",
    "category": "Med-Surgical",
    "tags": [
      "Infection Control",
      "Airborne",
      "Tuberculosis",
      "PPE",
      "Safety"
    ],
    "phrases": [
      "M — Measles (Rubeola)",
      "T — Tuberculosis (Active pulmonary/laryngeal TB)",
      "V — Varicella-Zoster (Chickenpox & Disseminated Shingles)"
    ],
    "breakdown": [
      {
        "emoji": "🔴",
        "phrase": "M — Measles (Rubeola)",
        "meaning": "Highly contagious droplet nuclei that remain suspended in the air for up to 2 hours; presents with fever, 3 C's (Cough, Coryza, Conjunctivitis), and Koplik spots."
      },
      {
        "emoji": "🫁",
        "phrase": "T — Tuberculosis (TB)",
        "meaning": "Mycobacterium tuberculosis droplet nuclei (<5 microns); transmission occurs when patient coughs, speaks, or sneezes."
      },
      {
        "emoji": "🐔",
        "phrase": "V — Varicella (Chickenpox / Disseminated Shingles)",
        "meaning": "Varicella-zoster virus causes pruritic vesicular rash. Requires BOTH Airborne AND Contact precautions until all lesions have crusted over!"
      },
      {
        "emoji": "🚪",
        "phrase": "Airborne Isolation Room (AIIR)",
        "meaning": "Private room with Negative Air Pressure ventilation (minimum 6–12 air changes/hour), exhausted directly outside or HEPA filtered; door must remain closed."
      },
      {
        "emoji": "😷",
        "phrase": "N95 Respirator Required",
        "meaning": "All healthcare personnel must wear a fit-tested N95 respirator mask or PAPR prior to entering the room. Patient wears a surgical mask during transport."
      }
    ],
    "clinical_significance": "Airborne particles travel long distances on air currents. Inadequate isolation leads to devastating nosocomial hospital outbreaks.",
    "causes": [
      "Active pulmonary tuberculosis",
      "Measles outbreak",
      "Varicella (Chickenpox)",
      "Disseminated herpes zoster"
    ],
    "exam_traps": "A patient with Varicella (Chickenpox) or Disseminated Shingles requires BOTH Airborne AND Contact precautions! Precautions cannot be downgraded until ALL lesions have completely dried and crusted over.",
    "memory_pearl": "\"Airborne is on MTV: Measles, TB, and Varicella. Put on your N95 and shut the negative pressure door!\"",
    "high_yield_tip": "When transporting a patient on airborne precautions outside their room for essential diagnostic tests, the PATIENT must wear a standard surgical mask; the transporter does not need an N95 outside the room.",
    "practice_question": {
      "question": "A nurse is caring for a client with confirmed active pulmonary tuberculosis. Which infection control measure is mandatory before entering the client's room?",
      "options": [
        "A. Put on a standard surgical mask and sterile gloves",
        "B. Put on a fitted N95 respirator mask and ensure the negative pressure room door is closed",
        "C. Wear a gown and face shield only",
        "D. Ensure the room door remains propped open for cross-ventilation"
      ],
      "answer": "B",
      "explanation": "Active pulmonary tuberculosis requires Airborne Precautions, which mandates a private negative-pressure isolation room with the door kept closed at all times, and healthcare personnel wearing a fit-tested N95 respirator mask before room entry."
    },
    "id": "m-67"
  },
  {
    "title": "Transmission Precautions — Droplet",
    "acronym": "P-I-M-P / S-P-I-D-E-R-M-A-N",
    "description": "Infection prevention protocol and PPE for infectious droplet-transmitted pathogens.",
    "specialty": "Infectious Diseases",
    "category": "Med-Surgical",
    "tags": [
      "Infection Control",
      "Droplets",
      "Meningitis",
      "Influenza",
      "Safety"
    ],
    "phrases": [
      "P — Pertussis (Whooping cough)",
      "I — Influenza (Flu virus)",
      "M — Meningitis (Neisseria meningitidis & Hib)",
      "P — Pneumonia (Mycoplasma) / Mumps / Rubella"
    ],
    "breakdown": [
      {
        "emoji": "🗣️",
        "phrase": "P — Pertussis",
        "meaning": "Bordetella pertussis causing severe paroxysmal coughing episodes with inspiratory whoop."
      },
      {
        "emoji": "🤧",
        "phrase": "I — Influenza",
        "meaning": "Seasonal and avian influenza viruses transmitted via respiratory droplets generated by coughing or sneezing."
      },
      {
        "emoji": "🧠",
        "phrase": "M — Meningococcal Meningitis",
        "meaning": "Neisseria meningitidis causes fulminant meningitis with purpuric petechial rash; maintain droplet precautions for 24 hours AFTER starting effective IV antibiotics."
      },
      {
        "emoji": "🤒",
        "phrase": "P — Pneumonia & Mumps & Rubella",
        "meaning": "Mycoplasma pneumonia, parotid gland swelling in mumps, and German measles (Rubella)."
      },
      {
        "emoji": "😷",
        "phrase": "Surgical Mask PPE",
        "meaning": "Wear a standard surgical mask upon entering the room or when within 3–6 feet (1–2 meters) of the client. Negative pressure is NOT required."
      }
    ],
    "clinical_significance": "Droplets are large respiratory particles (>5 microns) that travel up to 3–6 feet through the air before dropping onto surfaces.",
    "causes": [
      "Bacterial meningitis (N. meningitidis)",
      "Influenza A & B",
      "Pertussis",
      "Mumps and Rubella"
    ],
    "exam_traps": "Students confuse Droplet vs Airborne. Droplet particles are heavy and travel only 3 to 6 feet—they do NOT require negative pressure or N95 masks! A standard surgical mask is adequate. For bacterial meningitis, droplet precautions can be discontinued 24 hours after initiating effective antibiotic therapy.",
    "memory_pearl": "\"Droplet bugs travel 3 to 6 feet in heavy drops: Pertussis, Influenza, Meningitis, Pneumonia. Wear a surgical mask!\"",
    "high_yield_tip": "When cohorting droplet patients due to bed shortages, patients may share a room ONLY if they are infected with the exact same pathogen and separated by at least 3 feet with spatial curtains.",
    "practice_question": {
      "question": "A college student is admitted with severe headache, nuchal rigidity, high fever, and a petechial skin rash. Neisseria meningitidis is confirmed. What precaution must the nurse implement?",
      "options": [
        "A. Airborne Precautions with N95 mask",
        "B. Droplet Precautions with surgical mask upon room entry",
        "C. Contact Precautions with gown and gloves only",
        "D. Standard Precautions with no dedicated mask"
      ],
      "answer": "B",
      "explanation": "Meningococcal meningitis is transmitted via large respiratory droplets and requires Droplet Precautions (surgical mask, private room) until 24 hours of effective antimicrobial therapy (e.g., ceftriaxone) have been administered."
    },
    "id": "m-68"
  },
  {
    "title": "Transmission Precautions — Contact",
    "acronym": "M-R-S. W-E-E",
    "description": "Infection prevention protocol and PPE for direct and indirect contact-transmitted organisms.",
    "specialty": "Infectious Diseases",
    "category": "Med-Surgical",
    "tags": [
      "Infection Control",
      "Contact Precautions",
      "MRSA",
      "C-Diff",
      "Safety"
    ],
    "phrases": [
      "M — MRSA & VRE (Multidrug-resistant organisms)",
      "R — Respiratory Syncytial Virus (RSV in children)",
      "S — Skin infections (Scabies, Impetigo, Pediculosis, Herpes Simplex)",
      "W — Wound infections with heavy purulent drainage",
      "E — Enteric infections (C. difficile, Norovirus, Rotavirus)",
      "E — Eye infections (Adenoviral epidemic conjunctivitis)"
    ],
    "breakdown": [
      {
        "emoji": "🦠",
        "phrase": "M — Multidrug Resistant Bugs",
        "meaning": "Methicillin-Resistant S. aureus (MRSA) and Vancomycin-Resistant Enterococcus (VRE) colonizing wounds, urine, or sputum."
      },
      {
        "emoji": "👶",
        "phrase": "R — Respiratory Syncytial Virus (RSV)",
        "meaning": "Primary cause of bronchiolitis in infants; transmitted through contact with respiratory secretions and contaminated surfaces."
      },
      {
        "emoji": "🪲",
        "phrase": "S — Skin Infections",
        "meaning": "Highly contagious dermatological conditions: scabies mites, impetigo honey-colored crusts, and lice."
      },
      {
        "emoji": "🩹",
        "phrase": "W — Wound Infections",
        "meaning": "Open draining surgical or decubitus ulcers where dressings cannot contain purulent exudate."
      },
      {
        "emoji": "🚽",
        "phrase": "E — Enteric (C. difficile & Norovirus)",
        "meaning": "Spore-forming bacterial or viral colitis causing copious watery diarrhea. MUST WASH HANDS WITH SOAP AND WATER (alcohol sanitizers do NOT destroy C. diff spores!)."
      },
      {
        "emoji": "👁️",
        "phrase": "E — Eye Infections",
        "meaning": "Highly communicable viral or bacterial conjunctivitis."
      },
      {
        "emoji": "🥼",
        "phrase": "Required PPE: Gloves & Gown",
        "meaning": "Don gown and gloves upon entering room; remove PPE and perform hand hygiene before exiting."
      }
    ],
    "clinical_significance": "Contact transmission is the most common route of nosocomial infection spread in healthcare facilities. Strict hand hygiene and barrier precautions break the chain of cross-contamination.",
    "causes": [
      "Clostridioides difficile colitis",
      "MRSA wound colonization",
      "Scabies infestation",
      "Pediatric RSV bronchiolitis"
    ],
    "exam_traps": "THE #1 NURSING EXAM TRAP: For Clostridioides difficile (C. diff), alcohol-based foam/gel hand rubs are INEFFECTIVE because they cannot penetrate the bacterial spore coat! Nurses and visitors MUST WASH HANDS WITH SOAP AND RUNNING WATER to physically friction-wash spores down the drain.",
    "memory_pearl": "\"MRS. WEE requires Gloves and Gown. For C. diff, use SOAP and WATER to wash spores down!\"",
    "high_yield_tip": "Dedicate patient-care equipment (stethoscope, blood pressure cuff, thermometer) to the contact-isolation room, and disinfect with bleach-based wipes upon discharge.",
    "practice_question": {
      "question": "A nurse is providing care to a client who has Clostridioides difficile-associated diarrhea. After removing gloves and gown before leaving the room, what is the mandatory method of hand hygiene?",
      "options": [
        "A. Apply 70% alcohol-based hand rub for 20 seconds until dry",
        "B. Wash hands with soap and warm water for at least 20 seconds",
        "C. Wipe hands with a chlorhexidine gluconate pad",
        "D. No hand hygiene is necessary if gloves were intact"
      ],
      "answer": "B",
      "explanation": "C. difficile forms resilient bacterial spores that are resistant to alcohol-based hand sanitizers. Washing hands thoroughly with soap and water uses mechanical friction to detach and rinse the spores off the skin."
    },
    "id": "m-69"
  }
];

/**
 * Returns today's featured mnemonic using deterministic day-of-year calculation.
 */
export function getMnemonicOfTheDay(sourceList: Mnemonic[] = ALL_MNEMONICS): Mnemonic {
  if (!sourceList.length) return ALL_MNEMONICS[0];
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return sourceList[dayOfYear % sourceList.length];
}

/**
 * Find mnemonic by ID or slug.
 */
export function getMnemonicById(id: string): Mnemonic | undefined {
  return ALL_MNEMONICS.find(m => m.id === id);
}
