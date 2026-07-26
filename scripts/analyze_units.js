const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.download' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// NCK Curriculum unit definitions - what topics legitimately belong to each unit
const UNIT_RULES = {
  'Community Health Nursing': {
    desc: 'Community-level health services, home visiting, school health, PHC, community diagnosis, community mobilization, community development',
    keywords: ['community health', 'home visit', 'school health', 'primary health care', 'community diagnosis', 'community development', 'community mobilisation', 'community assessment', 'community participation', 'disaster management', 'community nursing', 'roles of the chn', 'home-based care', 'levels of prevention', 'health systems in kenya', 'health policy', 'vulnerable group', 'disability', 'oral health', 'dental health', 'ageing', 'gerontological', 'community principles', 'social change'],
  },
  'Medical-Surgical Nursing': {
    desc: 'Adult medical and surgical conditions: respiratory, cardiovascular, neurological, renal, GI, endocrine, haematological, musculoskeletal, dermatological, eye, ENT',
    keywords: ['clinical nursing', 'nursing care', 'respiratory', 'cardiovascular', 'neurological', 'renal', 'gastrointestinal', 'endocrine', 'haematological', 'musculoskeletal', 'dermatolog', 'ophthalmolog', 'ophthalmic', 'ear', 'ent', 'thyroid', 'adrenal', 'diabetes', 'fluid and electrolyte', 'pain management', 'medication administration', 'blood transfusion', 'oncology', 'liver', 'vascular', 'pituitary', 'spinal cord', 'cerebrovascular', 'upper gi', 'anatomy and physiology', 'anatomy & physiology', 'nursing procedures', 'rehabilitation', 'cardiac', 'palliative'],
    notKeywords: ['emergency nursing', 'critical care', 'icu', 'mechanical ventilation', 'shock management', 'airway management', 'resuscitation', 'haemodynamic monitoring', 'burns management', 'anaphylactic', 'anaphylaxis']
  },
  'Critical Care Nursing': {
    desc: 'ICU care, mechanical ventilation, haemodynamic monitoring, shock, resuscitation, emergency nursing, burns management, airway management, anaphylaxis',
    keywords: ['mechanical ventilation', 'haemodynamic monitoring', 'icu', 'intensive care', 'critical care', 'shock', 'emergency nursing', 'resuscitation', 'airway management', 'burns management', 'anaphylactic', 'anaphylaxis', 'cardiovascular monitoring', 'emergency and trauma', 'emergency and shock'],
  },
  'Surgical Nursing': {
    desc: 'Pre-operative, intra-operative, post-operative care, wound care, surgical procedures, anaesthesia',
    keywords: ['surgical nursing', 'pre-operative', 'intra-operative', 'post-operative', 'wound care', 'peri-operative', 'anaesthesia', 'operation', 'surgical'],
  },
  'Paediatric Nursing': {
    desc: 'Child health conditions, neonatal nursing, IMNCI, paediatric diseases',
    keywords: ['paediatric', 'pediatric', 'child health', 'neonatal', 'imnci', 'infant', 'childhood', 'child development', 'growth and development', 'neonatal nursing'],
  },
  'Mental Health Nursing': {
    desc: 'Psychiatric conditions, mental disorders, substance abuse, therapeutic communication, mental health legislation',
    keywords: ['mental health', 'psychiatr', 'psychiatric nursing', 'behavioural disorder', 'substance abuse', 'psychosis', 'schizophrenia', 'depression', 'anxiety', 'bipolar', 'dementia', 'therapeutic communication', 'mental disorder'],
  },
  'Midwifery': {
    desc: 'Antenatal care, labour, delivery, postnatal care, obstetric complications, normal and abnormal labour',
    keywords: ['midwifery', 'antenatal', 'labour', 'delivery', 'postnatal', 'obstetric', 'pregnancy', 'puerperium', 'gravid', 'partograph', 'eclampsia', 'antepartum', 'postpartum', 'maternal mortality', 'newborn', 'breastfeeding'],
  },
  'Maternal & Child Health': {
    desc: 'Family planning, reproductive health, immunization programs, MCH services, child health promotion',
    keywords: ['family planning', 'reproductive health', 'maternal and child health', 'maternal & child health', 'child health epidemiology', 'growth monitoring', 'vitamin a supplementation', 'child development', 'imnci guidelines'],
  },
  'Pharmacology': {
    desc: 'Drug mechanisms, pharmacokinetics, drug classifications, dosage, side effects, drug interactions',
    keywords: ['pharmacolog', 'drug', 'medication', 'dosage', 'side effect', 'contraindication', 'antibiotic', 'analgesic', 'antihypertensive', 'antidiabetic', 'antimalarial', 'pharmacokinetic', 'pharmacodynamic'],
  },
  'Infection Prevention & Control': {
    desc: 'Sterilization, disinfection, isolation nursing, PPE, standard precautions, nosocomial infections, hand hygiene',
    keywords: ['sterilisation', 'sterilization', 'disinfection', 'isolation nursing', 'nosocomial', 'standard precautions', 'hand hygiene', 'ppe', 'infection prevention', 'infection control', 'decontamination'],
  },
  'Research & Statistics': {
    desc: 'Research methodology, statistics, evidence-based practice, research designs, data analysis',
    keywords: ['research', 'statistics', 'evidence-based', 'hypothesis', 'sampling', 'variable', 'data collection', 'qualitative', 'quantitative', 'reliability', 'validity'],
  },
  'Nursing Management & Leadership': {
    desc: 'Management theories, leadership styles, nursing administration, staffing, planning, conflict management',
    keywords: ['nursing management', 'management theory', 'leadership', 'management function', 'planning', 'staffing', 'conflict management', 'management principles', 'management roles', 'human resource management', 'nursing process', 'nursing education', 'nursing theory', 'nursing theories', 'professional regulation', 'professional ethics', 'professional practice', 'ethical principles', 'end-of-life care', 'communication in nursing'],
  },
  'Nutrition': {
    desc: 'Nutritional assessment, therapeutic diets, macronutrients, micronutrients, malnutrition',
    keywords: ['nutrition', 'diet', 'malnutrition', 'vitamin', 'mineral', 'macronutrient', 'micronutrient', 'nutritional assessment', 'therapeutic diet', 'calorie', 'protein', 'carbohydrate', 'fat', 'kwashiorkor', 'marasmus'],
  },
  'Epidemiology': {
    desc: 'Epidemiological methods, disease patterns, surveillance, measures of disease frequency, demography',
    keywords: ['epidemiol', 'demograph', 'incidence', 'prevalence', 'surveillance', 'disease pattern', 'vital registration', 'child health epidemiology', 'epidemiology and demography'],
  },
  'Communicable Diseases': {
    desc: 'Specific infectious diseases: TB, Malaria, HIV/AIDS, STIs, trachoma, zoonotic diseases',
    keywords: ['communicable disease', 'tuberculosis', 'malaria', 'hiv', 'aids', 'sti', 'sexually transmitted', 'trachoma', 'zoonotic', 'parasitic disease', 'helminth', 'cholera', 'typhoid'],
  },
  'Environmental Health': {
    desc: 'Water and sanitation, occupational health, environmental hazards, housing, waste management',
    keywords: ['environmental health', 'water and sanitation', 'water purification', 'occupational health', 'occupational and environmental', 'waste management', 'housing', 'zoonotic', 'water and disease', 'sanitation'],
  },
  'Health Education & Sociology': {
    desc: 'Health promotion, health education, medical sociology, social determinants, health behaviour models, cultural health',
    keywords: ['health education', 'health promotion', 'medical sociology', 'social determinants', 'health behaviour', 'cultural', 'transcultural', 'social change', 'communication'],
  },
  'Anatomy & Physiology': {
    desc: 'Basic human anatomy and physiology',
    keywords: ['anatomy', 'physiology', 'anatomy and physiology', 'anatomy & physiology'],
  },
  'Parasitology': {
    desc: 'Parasitic organisms, their life cycles, and related diseases',
    keywords: ['parasitol', 'parasite', 'helminth', 'protozoa', 'plasmodium', 'schistosoma', 'roundworm', 'tapeworm'],
  },
  'Health Systems & Management': {
    desc: 'Kenya health system structure, levels of care, health information systems, health financing, health policy at systems level',
    keywords: ['kenya health system', 'health system structure', 'health information system', 'levels of prevention', 'primary health care', 'disaster management', 'health system'],
  },
  'Microbiology': {
    desc: 'Microorganisms: bacteria, viruses, fungi, prions; laboratory methods; antimicrobial resistance',
    keywords: ['microbiology', 'bacteria', 'virus', 'fungi', 'prion', 'microorganism', 'culture and sensitivity', 'gram stain', 'antibiotic resistance', 'antimicrobial', 'pathogen'],
  }
};

async function run() {
  const { data, error } = await supabase
    .from('questions')
    .select('id, unit, topic, stem, cadre, paper, exam_year, status')
    .order('unit');

  if (error) { console.error(error); return; }

  console.log(`Total questions fetched: ${data.length}\n`);

  const misclassified = [];
  const correctlyClassified = [];
  const unitStats = {};

  for (const q of data) {
    const assignedUnit = q.unit || 'UNASSIGNED';
    const topic = (q.topic || '').toLowerCase();
    const stem = (q.stem || '').toLowerCase();
    const combined = `${topic} ${stem}`;

    if (!unitStats[assignedUnit]) unitStats[assignedUnit] = { total: 0, correct: 0, wrong: 0 };
    unitStats[assignedUnit].total++;

    // Get the rules for the assigned unit
    const rules = UNIT_RULES[assignedUnit];
    if (!rules) {
      // Unknown unit — flag it
      misclassified.push({
        id: q.id, unit: assignedUnit, topic: q.topic, cadre: q.cadre,
        stem: q.stem?.substring(0, 80),
        reason: `Unknown unit: "${assignedUnit}" is not a recognised NCK curriculum unit`
      });
      unitStats[assignedUnit].wrong++;
      continue;
    }

    // Check if the topic/stem matches the assigned unit's keywords
    const matchesOwn = rules.keywords.some(k => combined.includes(k));

    // Check if it actually belongs to a DIFFERENT unit
    let correctUnit = null;
    if (!matchesOwn) {
      // Find which unit this actually belongs to
      for (const [unit, unitRules] of Object.entries(UNIT_RULES)) {
        if (unit === assignedUnit) continue;
        if (unitRules.keywords.some(k => combined.includes(k))) {
          correctUnit = unit;
          break;
        }
      }
    }

    // Special: check notKeywords (things that should NOT be in Medical-Surgical)
    let violatesNotKeyword = false;
    if (rules.notKeywords) {
      violatesNotKeyword = rules.notKeywords.some(k => combined.includes(k));
    }

    if (!matchesOwn || violatesNotKeyword) {
      misclassified.push({
        id: q.id,
        unit: assignedUnit,
        topic: q.topic,
        cadre: q.cadre,
        stem: q.stem?.substring(0, 100),
        reason: violatesNotKeyword
          ? `Topic/stem contains critical care keywords but is in ${assignedUnit}`
          : `Topic "${q.topic}" does not match ${assignedUnit} curriculum. Possible correct unit: ${correctUnit || 'unclear'}`,
        suggestedUnit: correctUnit
      });
      unitStats[assignedUnit].wrong++;
    } else {
      correctlyClassified.push(q);
      unitStats[assignedUnit].correct++;
    }
  }

  // Print Summary
  console.log("=".repeat(80));
  console.log("UNIT CLASSIFICATION AUDIT REPORT");
  console.log("=".repeat(80));
  console.log(`\nTotal questions audited: ${data.length}`);
  console.log(`Correctly classified:   ${correctlyClassified.length}`);
  console.log(`Potentially misclassified: ${misclassified.length}`);
  console.log(`\n${"=".repeat(80)}`);
  console.log("UNIT-BY-UNIT BREAKDOWN");
  console.log("=".repeat(80));
  
  Object.entries(unitStats)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([unit, stats]) => {
      const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      console.log(`\n  ${unit}`);
      console.log(`    Total: ${stats.total} | Correct: ${stats.correct} | Flagged: ${stats.wrong} | Accuracy: ${pct}%`);
    });

  console.log(`\n${"=".repeat(80)}`);
  console.log("MISCLASSIFIED QUESTIONS (SAMPLE — First 50)");
  console.log("=".repeat(80));
  
  misclassified.slice(0, 50).forEach((q, i) => {
    console.log(`\n[${i+1}] ID: ${q.id}`);
    console.log(`    Assigned Unit:  ${q.unit}`);
    console.log(`    Topic:          ${q.topic}`);
    console.log(`    Cadre:          ${q.cadre}`);
    console.log(`    Stem:           ${q.stem}`);
    console.log(`    Issue:          ${q.reason}`);
    if (q.suggestedUnit) console.log(`    Suggested Unit: ${q.suggestedUnit}`);
  });

  if (misclassified.length > 50) {
    console.log(`\n... and ${misclassified.length - 50} more misclassified questions.`);
  }

  // Save full misclassified list to JSON for review
  const fs = require('fs');
  fs.writeFileSync('scripts/unit_audit_results.json', JSON.stringify({
    total: data.length,
    correct: correctlyClassified.length,
    misclassified: misclassified.length,
    unitStats,
    misclassifiedQuestions: misclassified
  }, null, 2));
  console.log(`\n\nFull results saved to: scripts/unit_audit_results.json`);
}

run();
