- =============================================================================
-- Flashcard Batch 2 — NCK Exam Prep
-- =============================================================================
-- New decks covering Paediatric Nursing, Community Health, Research & Stats,
-- Mental Health (KRCHN Paper II), BScN Pharmacology & Critical Care,
-- BScN Leadership & Research EBP
-- All cards: original NCK-targeted educational content
-- Deck IDs follow the guide: a2... = KRCHN P1, a3... = KRCHN P2,
--                            a4... = BScN P1, a5... = BScN P2
-- =============================================================================

-- ─── Deck 7: Paediatric Nursing — KRCHN Paper I ──────────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a2000000-0000-0000-0000-000000000001',
  'Paediatric Nursing Essentials',
  'IMNCI, child development milestones, paediatric emergencies and common childhood conditions',
  'KRCHN',
  'Paediatric Nursing',
  20
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a2000000-0000-0000-0000-000000000001',
 'What are the four IMNCI general danger signs in a sick child?',
 'The four IMNCI general danger signs are: (1) Not able to drink or breastfeed. (2) Vomiting everything. (3) Convulsions — current or recent. (4) Abnormally sleepy or unconscious. Any one danger sign means the child needs urgent referral. Ref: Kenya IMNCI guidelines (MOH Division of Child and Adolescent Health).',
 '4 danger signs: No drink · Vomits all · Convulsions · Unconscious',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'Name the IMNCI classification of pneumonia and the cut-off respiratory rates.',
 'IMNCI classifies respiratory illness by age: Under 2 months → fast breathing = ≥60 breaths/min. 2–11 months → fast breathing = ≥50 breaths/min. 1–5 years → fast breathing = ≥40 breaths/min. Pneumonia = fast breathing + no danger signs. Severe pneumonia = stridor in a calm child or any danger sign. Ref: Kenya IMNCI guidelines.',
 '<2m ≥60 · 2–11m ≥50 · 1–5y ≥40 breaths/min',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What are the key developmental milestones at 6 months?',
 'At 6 months: sits with support, no head lag when pulled to sit, transfers objects hand to hand, reaches for objects, babbles (da, ba), smiles socially, turns to sound/voice. Weight should be double birth weight. Ref: MOH Well-Child surveillance; growth and development.',
 '6 months: sits + supports · transfers hand to hand · babbles',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the preferred IM injection site in infants under 1 year and why?',
 'The vastus lateralis (anterolateral thigh) is the preferred IM site in infants. It is well developed at birth, has good muscle mass, and avoids the sciatic nerve (at risk in gluteal injections). The dorsogluteal site is not used in children under 1 year. Ref: Kenya MOH immunization technique guidelines.',
 'Vastus lateralis — anterolateral thigh',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the management of severe dehydration in a child WITHOUT severe malnutrition?',
 'Plan C (severe dehydration, no malnutrition): give Ringer''s lactate (or 0.9% NaCl) 100 mL/kg: <12 months → 30 mL/kg in 1 hour then 70 mL/kg in 5 hours. ≥12 months → 30 mL/kg in 30 minutes then 70 mL/kg in 2.5 hours. Reassess every 30 minutes. Switch to ORS once able to drink. Ref: Kenya Basic Paediatric Protocols.',
 'Plan C: 100 mL/kg RL/NS · <12m: 1hr + 5hr · ≥12m: 30min + 2.5hr',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the clinical presentation of intussusception in an infant?',
 'Classic triad: (1) Colicky abdominal pain — infant draws up legs intermittently, screams then appears well between episodes. (2) Red-currant jelly stools — blood and mucus in stool. (3) Sausage-shaped abdominal mass (usually right upper quadrant). Vomiting is common. Age: typically 3–12 months. Emergency: refer immediately for ultrasound/air enema reduction. Ref: Kenya Basic Paediatric Protocols.',
 'Colicky pain · Red-currant jelly stools · Sausage mass',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What are the features of rickets and what causes it?',
 'Rickets = vitamin D deficiency (or inadequate sunlight). Features: craniotabes (soft skull), delayed fontanelle closure, delayed dentition, frontal bossing, rachitic rosary (costochondral beading), Harrison''s sulcus, bowed legs (genu varum), waddling gait, pathological fractures. Treatment: vitamin D supplementation + adequate sunlight + dietary calcium. Ref: Kenya Basic Paediatric Protocols; nutrition.',
 'Vitamin D deficiency → soft skull · rachitic rosary · bowed legs',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is epiglottitis and what is the PRIORITY nursing action?',
 'Epiglottitis is life-threatening bacterial infection (usually H. influenzae type b) of the epiglottis causing airway obstruction. Presents: sudden onset, high fever, drooling (unable to swallow), tripod position, inspiratory stridor, muffled voice. Priority nursing action: (1) Do NOT examine the throat with a spatula — risks complete obstruction. (2) Give high-concentration oxygen. (3) Keep child calm and upright. (4) Prepare for emergency airway. Ref: Kenya Paediatric Protocols; EPI (Hib vaccine prevents this).',
 'DO NOT examine throat · High O2 · Keep calm · Emergency airway',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'Why does sickle cell disease not present in the first 4–6 months of life?',
 'Fetal haemoglobin (HbF) predominates in the first months of life and does not sickle. As HbF is gradually replaced by adult haemoglobin (HbS in sickle cell disease), sickling episodes begin — usually after 4–6 months when HbF levels fall below 20%. Prophylaxis: daily penicillin V from infancy to age 5, folic acid 5 mg daily, pneumococcal and other vaccines. Ref: Kenya Basic Paediatric Protocols.',
 'HbF does not sickle → symptoms begin at 4–6 months as HbF falls',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'A 9-month-old has SpO2 of 78% with asthma. What is the FIRST action?',
 'SpO2 of 78% is severe, life-threatening hypoxaemia. FIRST action: administer oxygen immediately (high-flow via face mask or nasal prongs) following the ABC principle — airway and breathing before all else. Then notify the physician. Delay in oxygen delivery risks cardiac arrest. SpO2 target in children: >95%. Ref: Emergency paediatric nursing; Kenya Paediatric Protocols.',
 'Administer oxygen FIRST — severe hypoxaemia',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the KRCHN nurse''s role in the Kenya Expanded Programme on Immunisation (KEPI)?',
 'KEPI nurse roles: maintain cold chain (2–8°C), check vaccine vial monitors (VVM) before use, administer correct vaccines at correct ages using correct routes/sites, record in immunization cards and registers, counsel caregivers on side effects and next visit, conduct community outreach, monitor and report adverse events following immunisation (AEFI). Ref: Kenya KEPI guidelines.',
 'Cold chain · VVM · Correct vaccine · Record · Counsel · Outreach',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the classification of dehydration under IMNCI and key signs?',
 'No dehydration: normal eyes, drinks normally, skin pinch returns quickly. Some dehydration (2 of): sunken eyes, thirsty/drinks eagerly, skin pinch returns slowly (1–2 seconds) → Plan B (ORS 75 mL/kg in 4 hours). Severe dehydration (2 of): very sunken eyes, not able to drink, skin pinch returns very slowly (>2 seconds) → Plan C (IV fluids). Ref: Kenya IMNCI.',
 'No · Some (Plan B ORS) · Severe (Plan C IV) — skin pinch is key',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What are the classic features of pyloric stenosis?',
 'Pyloric stenosis typically presents at 3–8 weeks of age with: (1) Non-bilious projectile vomiting shortly after feeds. (2) Hungry infant — wants to feed again immediately after vomiting. (3) Visible peristaltic waves (left to right across abdomen). (4) Palpable olive-shaped mass in the right upper quadrant. (5) Metabolic alkalosis (hypochloraemic, hypokalaemic). Treatment: Ramstedt''s pyloromyotomy. Ref: Kenya Basic Paediatric Protocols.',
 'Non-bilious projectile vomiting · hungry · olive mass RUQ',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the two-finger technique in infant CPR and when is it used?',
 'The two-finger technique (index and middle fingers on lower half of sternum) is used for single-rescuer infant CPR. For two healthcare providers, the two-thumb encircling technique is preferred (both thumbs on lower sternum, hands encircling the chest). Compression to ventilation ratio: single rescuer = 30:2; two healthcare providers = 15:2. Depth: 1/3 of AP diameter (~4 cm). Rate: 100–120/min. Ref: AHA/ERC paediatric CPR guidelines.',
 'Single rescuer: 2 fingers 30:2 · Two providers: 2 thumbs 15:2',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'A 2-year-old has been diagnosed with cerebral palsy. What postnatal cause correlates with this?',
 'Cerebral palsy (CP) is a non-progressive brain injury affecting movement and posture. Postnatal causes include: CNS infections (meningitis/encephalitis — most common postnatal cause), hypoxic-ischaemic injury, severe neonatal jaundice (kernicterus), head trauma. Meningitis at 6 months is a recognised postnatal cause. Management: multidisciplinary — physiotherapy, speech therapy, occupational therapy. Ref: Kenya Basic Paediatric Protocols.',
 'Postnatal CP: meningitis · hypoxia · kernicterus · trauma',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What is the correct sequence for neonatal resuscitation (ABC)?',
 'Neonatal resuscitation (KAAR or ABCD): (A) Airway — dry, warm, position, clear airway, stimulate. Assess breathing within 30 seconds. If not breathing: (B) Breathing — positive pressure ventilation (PPV) with bag-mask, 40–60 breaths/min. If HR <60 after 30 s PPV: (C) Chest compressions — 3:1 ratio (90 compressions + 30 breaths/min). (D) Drugs — adrenaline IV/UVC if HR still <60. Ref: Kenya Newborn Resuscitation guidelines.',
 'A → Warm/dry/stimulate → B → PPV → C → Compressions 3:1 → D → Adrenaline',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What are the warning signs of post-tonsillectomy haemorrhage?',
 'The earliest sign is frequent swallowing (child swallowing trickling blood). Other signs: restlessness, tachycardia, pallor, blood in oropharynx, rising pulse with falling BP (later sign = hypovolaemic shock). Post-tonsillectomy bleeding most commonly occurs Day 1 (primary) or Days 5–10 (secondary, due to eschar separation). Nursing: position on side/prone, monitor swallowing closely. Report immediately to surgeon. Ref: ENT/paediatric surgical nursing.',
 'Frequent swallowing = earliest sign of post-tonsillectomy bleed',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What does the MUAC reading indicate in nutritional assessment?',
 'MUAC (mid-upper arm circumference) measures muscle and fat stores. In children 6–59 months: MUAC <11.5 cm = Severe Acute Malnutrition (SAM) — admit for therapeutic feeding. MUAC 11.5–12.5 cm = Moderate Acute Malnutrition (MAM) — supplementary feeding programme. MUAC ≥12.5 cm = Well nourished. Also used in pregnant/lactating women: <23 cm = at risk. Ref: Kenya IMAM (Integrated Management of Acute Malnutrition) guidelines.',
 '<11.5 cm = SAM · 11.5–12.5 = MAM · ≥12.5 = Normal',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What are three causes of failure to thrive (growth failure) in infancy?',
 'Common causes of failure to thrive in infancy: (1) Malnutrition — inadequate intake (most common in Kenya — poverty, poor breastfeeding technique). (2) Chronic illness — recurrent infections, HIV, TB, congenital heart disease, malabsorption. (3) Psychosocial factors — neglect, maternal depression, poor maternal-infant interaction. Assessment: weight, length, MUAC, plot on growth chart, dietary history, social history. Ref: Kenya Basic Paediatric Protocols.',
 'Malnutrition · Chronic illness · Psychosocial factors',
 'KRCHN', 'Paediatric Nursing'),

('a2000000-0000-0000-0000-000000000001',
 'What are the signs of acute stridor and the immediate nursing management?',
 'Stridor is a high-pitched inspiratory sound from upper airway obstruction. Causes in children: croup (viral — barking cough, low-grade fever), epiglottitis (bacterial — high fever, drooling, toxic), foreign body (sudden onset, no fever). Immediate management: (1) Keep child calm — crying worsens obstruction. (2) Upright position (tripod if needed). (3) High-flow humidified oxygen. (4) Do NOT examine throat unless airway secured. (5) Nebulised adrenaline for croup. (6) Emergency referral. Ref: Kenya Paediatric Protocols.',
 'Calm child · Upright · O2 · No throat exam · Emergency referral',
 'KRCHN', 'Paediatric Nursing');


-- ─── Deck 8: Community Health & Epidemiology — KRCHN Paper II ────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a3000000-0000-0000-0000-000000000001',
  'Community Health & Epidemiology',
  'Primary health care, disease prevention, immunisation, epidemiology and family planning',
  'KRCHN',
  'Community Health Nursing',
  20
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a3000000-0000-0000-0000-000000000001',
 'What are the eight elements of primary health care (Alma-Ata 1978) plus Kenya''s two additions?',
 'Eight Alma-Ata PHC elements: (1) Health education. (2) Nutrition/food supply. (3) Safe water/sanitation. (4) MCH including family planning. (5) Immunisation. (6) Prevention/control of endemic diseases. (7) Treatment of common diseases. (8) Provision of essential drugs. Kenya added: Dental health and Mental health. Ref: Kenya National Health Policy; MOH PHC framework.',
 '8 Alma-Ata elements + Kenya adds: Dental health + Mental health',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'Differentiate incidence rate from prevalence.',
 'Incidence rate = number of NEW cases of disease in a defined population over a defined time period. Measures the RATE of disease occurrence/risk. Used to study aetiology. Prevalence = total existing cases (new + old) at a point in time or over a period. Measures disease BURDEN. Used for health service planning. Incidence is better for acute disease; prevalence for chronic disease planning. Ref: Epidemiology.',
 'Incidence = NEW cases (risk) · Prevalence = ALL existing cases (burden)',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the three levels of disease prevention with examples?',
 'Primary prevention (before disease): immunisation, health education, condom use, sanitation, balanced diet. Secondary prevention (early disease): screening (Pap smear, BP check), case finding, early diagnosis and treatment. Tertiary prevention (established disease): rehabilitation, physiotherapy after stroke, support groups, calipers after polio. Ref: Leavell and Clark; levels of prevention.',
 'Primary: prevent · Secondary: screen/treat early · Tertiary: rehabilitate',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What is the Kenya EPI schedule — list the vaccines given at birth, 6 weeks, 10 weeks, 14 weeks, 9 months.',
 'Birth: BCG (intradermal, right shoulder), OPV 0. 6 weeks: OPV 1, Pentavalent 1 (DPT-HepB-Hib), PCV 1, Rotavirus 1. 10 weeks: OPV 2, Pentavalent 2, PCV 2, Rotavirus 2. 14 weeks: OPV 3, Pentavalent 3, PCV 3, IPV. 9 months: Measles/Rubella (MR). 18 months: MR booster. Ref: Kenya KEPI schedule 2022.',
 'Birth: BCG+OPV0 · 6/10/14wks: OPV+Penta+PCV · 14wks: +IPV · 9m: MR',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What is the cold chain and which vaccines are most sensitive to heat vs freezing?',
 'Cold chain: system maintaining vaccines at 2–8°C from manufacture to administration. Heat-sensitive (most sensitive): BCG, measles/rubella, OPV, yellow fever — keep coldest (+2°C). Freeze-sensitive (must NOT freeze): DPT/pentavalent, TT, Hep B, PCV, IPV — forming crystals on freezing that destroy the vaccine. OPV can be frozen. Check vaccine vial monitors (VVM) — if inner square is darker than outer circle, discard. Ref: Kenya KEPI cold chain guidelines.',
 'Freeze-sensitive: DPT, TT, HepB, PCV, IPV · Heat-sensitive: BCG, measles',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the WHO classification of water-associated diseases with one example each?',
 'Four types: (1) Water-borne — pathogens in water, swallowed: cholera, typhoid, hepatitis A. (2) Water-washed (water-scarce) — poor hygiene due to lack of water: trachoma, scabies, skin/eye infections. Prevented by increasing QUANTITY of water. (3) Water-based — vector/host lives in water: schistosomiasis, dracunculosis. (4) Water-related/vector — vector breeds near water: malaria, dengue, onchocerciasis. Ref: Environmental health; MOH WASH guidelines.',
 'Borne=cholera · Washed=trachoma · Based=bilharzia · Related=malaria',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the LAM (Lactational Amenorrhoea Method) criteria?',
 'LAM is effective contraception ONLY when ALL THREE conditions are simultaneously met: (1) Infant is exclusively/fully breastfeeding (day and night, no other feeds). (2) Infant is less than 6 months old. (3) Mother''s menstruation has not returned (amenorrhoea). If any one condition is not met, another contraceptive method must be added immediately. Effectiveness >98% when all three conditions met. Ref: MOH Kenya Family Planning Guidelines.',
 'All 3: Exclusive BF + <6 months + No menses',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What is the correct sequence for community diagnosis?',
 'Community diagnosis sequence: (1) Community entry — establish rapport, identify and meet community leaders, explain purpose, gain acceptance. (2) Exploration/familiarisation — initial reconnaissance of the community. (3) Planning — formulate objectives, select methodology, design tools. (4) Data collection — implement the survey. (5) Data analysis. (6) Feedback — give preliminary and final reports to community. Ref: Community health practice.',
 'Entry → Exploration → Planning → Data → Analysis → Feedback',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What is WHO HIV Clinical Staging? Give one condition for each stage.',
 'WHO HIV staging guides treatment decisions: Stage 1 — Asymptomatic or persistent generalised lymphadenopathy (PGL). Stage 2 — Herpes zoster, recurrent URTI, oral ulcers, seborrhoeic dermatitis. Stage 3 — Oral candidiasis, unexplained weight loss >10%, chronic diarrhoea, pulmonary TB, severe bacterial infections. Stage 4 (AIDS) — Pneumocystis pneumonia (PCP), CMV retinitis, extrapulmonary TB, Kaposi sarcoma, HIV encephalopathy. Stage ≥3 = start ART. Ref: WHO/MOH Kenya HIV Clinical Staging.',
 'Stage 1=PGL · 2=Herpes zoster · 3=Oral candida · 4=PCP/Kaposi',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the three pillars of TB control (STOP TB strategy)?',
 'The WHO Stop TB / End TB approach has three pillars: (1) Integrated, patient-centred TB care and prevention — DOTS (Directly Observed Therapy, Short Course): supervised medication, sputum monitoring, contact tracing. (2) Bold policies and supportive systems — TB/HIV collaboration, MDR-TB management. (3) Research and innovation. Kenya-specific: NTLP (National TB & Leprosy Programme) runs the 6-month DOTS regimen: 2RHZE/4RH. Ref: Kenya NTLP guidelines.',
 'DOTS: supervised therapy · 2RHZE/4RH · Contact tracing',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'Name the main vectors for malaria, filariasis, sleeping sickness and leishmaniasis.',
 'Malaria → Anopheles mosquito (female). Lymphatic filariasis (Wuchereria bancrofti) → Culex and Aedes mosquitoes. African sleeping sickness (trypanosomiasis) → Tsetse fly (Glossina). Leishmaniasis (kala-azar) → Sandfly (Phlebotomus). Plague → Flea (Xenopsylla cheopis from rats). Yellow fever/dengue → Aedes aegypti. Ref: Parasitology/medical entomology.',
 'Malaria=Anopheles · Filaria=Culex · Sleeping sick=Tsetse · Leish=Sandfly',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the minimum requirements for a pit latrine siting?',
 'Kenya MOH environmental health siting rules for pit latrines: (1) Pit bottom at least 1.5–3 metres above the highest water table (prevents groundwater contamination). (2) At least 6 metres from any building (odour, flies). (3) Downhill and at least 30 metres from any water source (well, spring, stream). (4) Pit depth: 2–3 metres. Cover the slab, add a vent pipe, and fit a fly-screen on the vent to control flies (VIP latrine). Ref: Kenya Public Health Act; MOH Environmental Health.',
 '1.5–3m above water table · ≥30m from water source · downhill',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the recommended methods of safe refuse disposal in rural vs urban settings?',
 'Rural: Composting (converts organic waste to manure — cheap, hygienic, eco-friendly). Urban: Controlled tipping/sanitary landfill (engineered, layered refuse covered with soil daily). Other methods: Incineration (best for medical/hospital waste — destroys pathogens). Crude dumping = NOT recommended (attracts vectors, pollutes groundwater). Burning of household waste is not recommended due to air pollution. Ref: MOH Kenya Environmental Health guidelines.',
 'Rural = Composting · Urban = Controlled tipping · Hospital = Incineration',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'Explain the difference between natural and artificial passive immunity with examples.',
 'Natural passive immunity: ready-made antibodies transferred naturally — mother to infant via placenta (IgG, lasts 3–6 months) or breast milk (IgA). No active immune response by the recipient. Artificial passive immunity: ready-made antibodies administered by injection — antisera, immunoglobulins (e.g. tetanus immunoglobulin TIG, anti-rabies serum ARS, hepatitis B immunoglobulin HBIG). Provides immediate but temporary protection. Ref: Immunology; Kenya KEPI.',
 'Natural passive = placental/breast milk · Artificial passive = antiserum/Ig',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What is the role of the community health nurse in home-based care (HBC)?',
 'Community health nurse in HBC: (1) Clinical assessment and monitoring of the patient at home. (2) Wound care, medication administration, pain management. (3) Training family caregivers in basic nursing skills. (4) Psychosocial support and counselling. (5) Referral for complications or deterioration. (6) Coordination with community health workers (CHWs) and the facility team. (7) Nutritional assessment and support. Ref: Kenya HBC guidelines; MOH.',
 'Assess · Treat · Train caregivers · Refer · Coordinate · Nutrition',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the secondary prevention strategies for tuberculosis in the community?',
 'TB secondary prevention (early detection and treatment): (1) Active case finding — contact tracing of TB cases, screening symptomatic household contacts. (2) Sputum smear microscopy and GeneXpert for diagnosis. (3) DOTS — directly observed therapy to ensure completion and prevent resistance. (4) Isoniazid preventive therapy (IPT) for PLHIV and close contacts. BCG immunisation = primary prevention. Ref: MOH Kenya NTLP; levels of prevention.',
 'Contact tracing · GeneXpert · DOTS · Isoniazid IPT',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the personal protective measures against malaria in Kenya?',
 'Personal protection: (1) Insecticide-treated nets (ITNs/LLINs) — sleep under them every night. (2) Indoor residual spraying (IRS) — spray walls with long-lasting insecticide. (3) Repellents (DEET) on exposed skin. (4) Wear long-sleeved clothing at dusk/dawn. (5) Chemoprophylaxis for travellers and intermittent preventive treatment in pregnancy (IPTp with SP). (6) Prompt treatment of fever. Ref: Kenya National Malaria Guidelines.',
 'ITNs · IRS · Repellents · Cover up · IPTp in pregnancy',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'Describe the epidemiological triad and give an example using malaria.',
 'The epidemiological triad: HOST (the person who gets infected — e.g. non-immune child, pregnant woman), AGENT (the cause of disease — e.g. Plasmodium falciparum), ENVIRONMENT (conditions that favour transmission — e.g. stagnant water near homes, rainy season). All three must interact for disease to occur. Interventions target each point of the triad. Ref: Epidemiology fundamentals.',
 'Triad: Host · Agent · Environment — all three must interact',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What is the Yuzpe method for emergency contraception and the dose when using Microgynon?',
 'Yuzpe method: using combined oral contraceptive pills (COCPs) for emergency contraception. Using Microgynon (30 mcg EE + 150 mcg LNG): take 4 tablets as the first dose within 72 hours of unprotected sex, then 4 more tablets 12 hours later. Total: 8 tablets. Alternatively: levonorgestrel 1.5 mg (e.g. Postinor-2) — 1 tablet as a single dose within 72 hours (more effective, fewer side effects). Ref: MOH Kenya Emergency Contraception guidelines.',
 'Microgynon Yuzpe: 4 tabs now + 4 tabs 12hr later (within 72hr)',
 'KRCHN', 'Community Health Nursing'),

('a3000000-0000-0000-0000-000000000001',
 'What are the health education principles the community nurse must apply?',
 'Principles of health education: (1) Start where the community is (their felt needs and existing knowledge). (2) Use simple, clear language. (3) Involve the community (participation). (4) Reinforce messages (repetition). (5) Use appropriate methods and media for the audience. (6) Evaluate effectiveness. (7) Be culturally sensitive. (8) One message per session (avoid information overload). Ref: Health education methodology; community health nursing.',
 'Felt needs · Simple language · Participation · Repetition · Evaluate',
 'KRCHN', 'Community Health Nursing');


-- ─── Deck 9: Research Methods & Biostatistics — KRCHN Paper II ───────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a3000000-0000-0000-0000-000000000002',
  'Research Methods & Biostatistics',
  'Research designs, sampling, data collection, ethics and statistical concepts for NCK Paper II',
  'KRCHN',
  'Research & Statistics',
  18
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a3000000-0000-0000-0000-000000000002',
 'What is the correct order of a research report?',
 'Standard research report structure: (1) Title. (2) Abstract — summary of the whole study. (3) Introduction — background and problem statement. (4) Literature review. (5) Methodology — study design, sampling, data collection, analysis. (6) Results/Findings — presented without interpretation. (7) Discussion — interpretation, comparison with other studies, limitations. (8) Conclusion and recommendations. (9) References. Results always come before discussion. Ref: Research methods.',
 'Title → Abstract → Introduction → Lit Review → Methods → Results → Discussion',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'Differentiate probability from non-probability sampling with two examples each.',
 'Probability sampling (random — every element has a known chance): Simple random, Systematic, Stratified, Cluster. Results can be generalised to the population. Non-probability sampling (non-random — selection is based on availability or judgement): Convenience, Purposive, Quota, Snowball. Results cannot be generalised — prone to selection bias. Ref: Research methods (sampling).',
 'Probability: random, systematic, stratified, cluster · Non-probability: convenience, quota',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the difference between reliability and validity in research?',
 'Reliability = consistency/repeatability — the instrument gives the same result on repeated measurement under the same conditions. Validity = accuracy — the instrument measures what it is intended to measure. A reliable instrument is not necessarily valid. Example: a weighing scale that consistently reads 2 kg too heavy is reliable but not valid. Ref: Research methods (measurement properties).',
 'Reliability = consistent results · Validity = measures what it should',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the purpose of a pilot study?',
 'A pilot study is a small-scale trial run before the main study. Purposes: (1) Test feasibility of the study design. (2) Identify problems with data collection instruments (ambiguous/vague questions). (3) Estimate time and resources required. (4) Train research assistants. (5) Assess response rate. (6) Refine the questionnaire/interview guide. Pilot results are NOT included in the main study analysis. Ref: Research methods.',
 'Pilot = test feasibility + refine instruments before main study',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What are the key ethical principles in research involving human subjects?',
 'Research ethics (Belmont Report): (1) Respect for persons — informed consent, autonomy, right to withdraw. (2) Beneficence — maximise benefits, minimise harm. (3) Non-maleficence — do no harm. (4) Justice — fair selection of participants, equitable distribution of benefits/burdens. Additionally: anonymity (cannot link data to individual), confidentiality (data protected), truth-telling, and ethical review board approval. Ref: Research ethics; Belmont Report.',
 'Respect (consent) · Beneficence · Non-maleficence · Justice',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is a hypothesis and what are the characteristics of a good hypothesis?',
 'A hypothesis is a tentative, testable statement of the expected relationship between two or more variables, derived from theory or prior evidence. Characteristics of a good hypothesis: (1) Clear and concise (not a paragraph). (2) Testable within a reasonable time. (3) Consistent with known facts and common sense. (4) States a specific relationship. (5) Based on sound theoretical rationale. Ref: Research methods.',
 'Hypothesis = tentative testable statement of expected variable relationship',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the difference between qualitative and quantitative research?',
 'Quantitative research: deductive, confirmatory, tests hypotheses, uses numerical data and statistical analysis, aims to generalise, controlled conditions, researcher is detached/objective. Qualitative research: inductive, exploratory, generates theory, uses non-numerical data (words, narratives), small purposive samples, researcher is immersed, explores meanings/experiences/perceptions. Mixed methods combines both. Ref: Research methods.',
 'Quantitative = numbers + confirms hypotheses · Qualitative = words + explores meanings',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the difference between a cross-sectional, cohort and case-control study?',
 'Cross-sectional: data collected at ONE point in time — measures prevalence, identifies associations but not causation. Cohort: group followed FORWARD over time — measures incidence, can establish causation, expensive. Case-control: starts with cases (have disease) vs controls (do not) then looks BACKWARD at exposure — good for rare diseases, efficient, but recall bias. Ref: Epidemiology/research methods.',
 'Cross-sectional=snapshot · Cohort=forward · Case-control=backward',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What are the components of the methodology chapter in a research proposal?',
 'Methodology chapter contains: (1) Study design (descriptive, experimental, etc). (2) Study site and population. (3) Inclusion and exclusion criteria. (4) Sampling method and sample size calculation. (5) Data collection instruments (questionnaire, interview guide). (6) Data collection procedure. (7) Data analysis plan. (8) Ethical considerations. (9) Limitations. Ref: Research methods; proposal writing.',
 'Design · Population · Sampling · Instruments · Procedure · Analysis · Ethics',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is action research and why is it used by nurses?',
 'Action research is practical, participatory research carried out by practitioners to solve immediate local/workplace problems and improve practice. Cycle: Plan → Act → Observe → Reflect → re-plan. Used by nurses to improve patient care quality, solve ward-based problems, and implement evidence-based changes. It empowers frontline staff as co-researchers. Ref: Research methods; nursing research.',
 'Action research = practitioners solve local problems → Plan→Act→Observe→Reflect',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the Hawthorne effect and how does it affect research findings?',
 'The Hawthorne effect is the tendency for people to change or improve their behaviour when they know they are being observed or studied. It is a source of bias in research — participants may perform better or behave differently than they would naturally, making results less representative of real-world behaviour. Controlled by: blinding, naturalistic observation, allowing habituation period. Ref: Research methods.',
 'Hawthorne effect = behaviour changes because people know they are watched',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is snowball sampling and when is it most useful?',
 'Snowball (chain-referral) sampling: initial participants are asked to refer further participants from their social networks, who in turn refer more — snowballing the sample. Most useful for: hidden/hard-to-reach populations (e.g. drug users, undocumented migrants, sex workers, people with rare conditions). Limitation: the sample is self-selected and not representative of the general population. Non-probability method. Ref: Research methods.',
 'Snowball = participants recruit further participants · hard-to-reach populations',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What are the measures of central tendency and when is each used?',
 'Mean (average): sum ÷ number of values. Best for normally distributed numerical data. Sensitive to outliers. Median: middle value of ordered data. Best for skewed data or ordinal data — not affected by outliers. Mode: most frequently occurring value. Best for categorical/nominal data or bimodal distributions. In a normal distribution: mean = median = mode. Ref: Biostatistics.',
 'Mean = average (normal data) · Median = middle (skewed) · Mode = most frequent',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the chi-square test used for?',
 'The chi-square (χ²) test is used to test for association/independence between two categorical variables. It compares OBSERVED frequencies to EXPECTED frequencies. Example: Is there a relationship between smoking (yes/no) and lung cancer (yes/no)? If χ² is large and p < 0.05, the association is statistically significant. NOT used for continuous numerical data (use t-test or ANOVA for those). Ref: Biostatistics.',
 'Chi-square = association between categorical variables (p <0.05 = significant)',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is the difference between anonymity and confidentiality in research?',
 'Anonymity: the researcher CANNOT identify/link data back to a specific participant — no names or identifiers collected. Protects source completely. Confidentiality: data may be identifiable (researcher knows who said what) but is PROTECTED from disclosure to others — kept private and secure. Both are ethical obligations. Anonymity is stronger than confidentiality. Online surveys can be anonymous; face-to-face interviews generally cannot. Ref: Research ethics.',
 'Anonymity = cannot identify respondent · Confidentiality = data protected from others',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What are non-biased purpose statement verbs and which verbs should be avoided?',
 'Use NEUTRAL (non-biased) verbs in purpose statements: determine, describe, explore, compare, examine, test, identify, assess, evaluate, analyse. AVOID biased verbs that imply a predetermined outcome: prove, show, demonstrate (implies you already know the result). A purpose statement should be objective and open. Ref: Research methods; research proposal writing.',
 'Use: determine, compare, test, explore · Avoid: prove, show',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is a control group in a clinical trial and what do they receive?',
 'The control group is the comparison group in an experiment that does NOT receive the experimental treatment. They receive: (1) A placebo (inert substance — e.g., sugar pill) in blinded trials. (2) The current standard treatment (active control) in ethical trials where withholding treatment would be harmful. (3) No intervention (waitlist control). The control group allows researchers to distinguish the treatment effect from natural recovery or placebo response. Ref: Research methods (clinical trials).',
 'Control group = placebo or standard treatment — for comparison',
 'KRCHN', 'Research & Statistics'),

('a3000000-0000-0000-0000-000000000002',
 'What is plagiarism and how is it avoided in academic writing?',
 'Plagiarism = presenting another person''s words, ideas, data or work as your own without proper acknowledgement or citation. Forms: direct copying, paraphrasing without citation, using ideas without attribution. How to avoid: (1) Always cite sources — in-text citation + reference list. (2) Use quotation marks for direct quotes. (3) Paraphrase and then cite. (4) Use plagiarism detection tools. (5) Keep accurate notes of all sources. Ref: Research ethics; academic integrity.',
 'Plagiarism = using others'' work without acknowledgement',
 'KRCHN', 'Research & Statistics');


-- ─── Deck 10: Mental Health Nursing — KRCHN Paper II ─────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a3000000-0000-0000-0000-000000000003',
  'Mental Health Nursing — KRCHN',
  'Psychiatric conditions, psychopharmacology, therapeutic communication and legal framework for KRCHN Paper II',
  'KRCHN',
  'Mental Health Nursing',
  18
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a3000000-0000-0000-0000-000000000003',
 'What are the three cardinal symptoms of major depressive disorder?',
 'The three core (cardinal) symptoms of depression (ICD-10/ICD-11): (1) Persistently depressed mood — most of the day, nearly every day. (2) Anhedonia — loss of interest or pleasure in previously enjoyable activities. (3) Reduced energy/fatigue. Additional features: poor concentration, low self-esteem, guilt, sleep disturbance, appetite changes, psychomotor retardation/agitation, suicidal ideation. First-line treatment: SSRIs (e.g. fluoxetine) + psychotherapy. Ref: Psychiatric nursing; ICD-10.',
 'Depressed mood · Anhedonia · Fatigue — the three core symptoms',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are the extrapyramidal side effects (EPS) of typical antipsychotics and how are they managed?',
 'EPS caused by dopamine D2 blockade in the nigrostriatal pathway: (1) Acute dystonia — painful muscle spasms (neck, eyes, tongue) within hours to days. Treat with benztropine or procyclidine IM. (2) Akathisia — motor restlessness, inability to sit still. Treat with propranolol or benzodiazepines. (3) Drug-induced parkinsonism — tremor, rigidity, bradykinesia. Treat with anticholinergics. (4) Tardive dyskinesia — late-onset involuntary movements (tongue, lips). Prevention: use lowest effective dose, atypical antipsychotics. Ref: Psychopharmacology.',
 'EPS: Dystonia · Akathisia · Parkinsonism · Tardive dyskinesia',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'A patient on an antipsychotic develops high fever, muscle rigidity and altered consciousness. What is this and what is the FIRST action?',
 'This is Neuroleptic Malignant Syndrome (NMS) — a rare but life-threatening reaction to antipsychotics. Classic tetrad: Hyperthermia (>38°C), Muscle rigidity (lead-pipe), Altered consciousness, Autonomic instability (labile BP, tachycardia, diaphoresis). FIRST action: STOP the antipsychotic IMMEDIATELY. Call emergency team. Active cooling. IV fluids. Dantrolene (muscle relaxant). Bromocriptine (dopamine agonist). ICU admission. Ref: Psychiatric emergency nursing.',
 'NMS = Fever + Rigidity + Confusion + Autonomic instability → STOP antipsychotic NOW',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is the difference between delirium and dementia?',
 'Delirium: ACUTE onset (hours to days), FLUCTUATING consciousness, inattention, disorganised thinking, altered arousal. Caused by physical illness (infection, hypoxia, drugs, metabolic). REVERSIBLE. Dementia: GRADUAL onset (months to years), STABLE (day to day), progressive memory loss with preserved consciousness (until late). Chronic and usually IRREVERSIBLE. Key memory aid: Delirium = Delirious/acute/fluctuating. Dementia = Declining/gradual/stable. Ref: Psychiatric nursing.',
 'Delirium = ACUTE fluctuating · Dementia = GRADUAL stable progressive',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are the stages of alcohol withdrawal and what drug class is used to manage it?',
 'Alcohol withdrawal timeline: 6–12 hours: tremor, anxiety, diaphoresis, tachycardia, hypertension. 12–24 hours: visual/auditory hallucinations (with clear consciousness). 24–48 hours: seizures (withdrawal seizures). 48–72 hours: Delirium Tremens (DTs) — confusion, agitation, hyperthermia, autonomic storm. DTs carry 5–15% mortality if untreated. Management: BENZODIAZEPINES (diazepam, lorazepam, chlordiazepoxide) — GABA agonists that cross-react with alcohol receptors. Thiamine (B1) to prevent Wernicke''s encephalopathy. Ref: Substance-use nursing; Kenya NACADA.',
 'DTs at 48–72hrs → Benzodiazepines + Thiamine',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is the difference between a delusion and a hallucination?',
 'Delusion: a FIXED FALSE BELIEF held with absolute conviction, inconsistent with cultural background, not amenable to logical argument. Types: persecutory, grandiose, reference, nihilistic, somatic. Hallucination: a FALSE SENSORY PERCEPTION without an external stimulus — the patient experiences it as real. Types: auditory (most common in schizophrenia), visual (more common in organic disorders), olfactory, tactile, gustatory. Both are positive symptoms of psychosis. Ref: Mental state examination; psychiatric nursing.',
 'Delusion = false fixed belief · Hallucination = false sensory perception',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'Name the classes of SSRIs and give three drug examples.',
 'SSRIs (Selective Serotonin Reuptake Inhibitors): selectively block reuptake of serotonin at the presynaptic terminal, increasing serotonin in the synapse. First-line for depression, anxiety, OCD, PTSD, panic disorder. Examples: Fluoxetine (Prozac), Sertraline (Zoloft), Paroxetine (Paxil), Citalopram, Escitalopram. Side effects: nausea (usually transient), sexual dysfunction, insomnia, serotonin syndrome (if combined with other serotonergic drugs — MAOI interaction is dangerous). Ref: Psychopharmacology.',
 'SSRIs: Fluoxetine · Sertraline · Paroxetine — first-line antidepressants',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are the therapeutic communication techniques and which responses are non-therapeutic?',
 'Therapeutic: (1) Active listening. (2) Open-ended questions ("Tell me more..."). (3) Reflecting feelings. (4) Clarifying. (5) Silence (comfortable presence). (6) Summarising. (7) Offering self/presence. Non-therapeutic (AVOID): (1) False reassurance ("Everything will be fine"). (2) Giving advice ("You should..."). (3) Minimising feelings ("Others have it worse"). (4) Changing subject. (5) Probing for personal curiosity. (6) Closed questions only. Ref: Mental health nursing; therapeutic communication.',
 'Therapeutic: listen · open questions · reflect · clarify · silence',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is dysthymia (persistent depressive disorder) and how does it differ from major depression?',
 'Dysthymia (Persistent Depressive Disorder): a CHRONIC, LESS SEVERE form of depression. Diagnostic criteria: depressed mood for most of the day, more days than not, for at least 2 YEARS in adults (1 year in children), plus two or more of: poor appetite/overeating, insomnia/hypersomnia, low energy, low self-esteem, poor concentration, hopelessness. Differs from MDD: less severe, more chronic, does not meet full MDD episode criteria. Treatment: SSRIs + psychotherapy. Ref: Psychiatric nursing; DSM-5.',
 'Dysthymia = chronic mild depression ≥2 years · less severe than MDD',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is the nursing priority for a patient with moderate-stage dementia?',
 'The priority nursing concern in moderate dementia is SAFETY. The patient has memory loss, confusion, impaired judgment and is at high risk of: wandering (elopement), falls and injury, inability to recognise hazards, self-neglect, medication errors. Nursing interventions: safe, secure environment with limited exits, fall prevention, consistent routines, reality orientation, supervision at all times during ADLs. Secondary priorities: nutrition, social engagement, family support. Ref: Psychogeriatric nursing.',
 'Priority = SAFETY — wandering · falls · impaired judgment',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are the key patient education points when discharging a patient on lithium?',
 'Lithium safety education: (1) Take lithium at the SAME TIME EACH DAY with food to reduce GI side effects. (2) Maintain ADEQUATE SODIUM AND FLUID INTAKE — sodium depletion causes lithium retention and toxicity. (3) Know the signs of TOXICITY: coarse tremor, ataxia, vomiting, diarrhoea, slurred speech, confusion → STOP and seek emergency care. (4) Regular serum lithium levels (therapeutic range 0.6–1.2 mEq/L). (5) Avoid NSAIDs, thiazides, ACE inhibitors (increase lithium levels). (6) Inform other prescribers you are on lithium. Ref: Psychopharmacology.',
 'Lithium: steady sodium/fluids · know toxicity signs · monitor levels',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are the four phases of the therapeutic nurse-patient relationship?',
 'Peplau''s four phases: (1) Pre-interaction phase — nurse prepares (reviews history, manages own feelings/biases) before meeting patient. (2) Orientation phase — nurse and patient meet, establish rapport and trust, assess problems, clarify roles and expectations. (3) Working phase — patient examines issues, nurse facilitates problem-solving, provides education, uses therapeutic techniques. (4) Termination/resolution phase — goals reviewed, achievements acknowledged, relationship ends professionally. Ref: Mental health nursing (Peplau''s interpersonal model).',
 'Peplau: Pre-interaction → Orientation → Working → Termination',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is malingering and how does it differ from conversion (functional neurological) disorder?',
 'Malingering: CONSCIOUS, deliberate fabrication of symptoms for EXTERNAL GAIN (financial compensation, avoiding jail/military duty). The person knows they are faking. Conversion (Functional Neurological Symptom) Disorder: neurological symptoms (e.g. pseudoseizures, limb paralysis) caused by PSYCHOLOGICAL DISTRESS — symptoms are real to the patient, NOT consciously produced, no external gain sought. Key: malingering = intentional; conversion = unconscious. Ref: Psychiatric nursing; DSM-5.',
 'Malingering = conscious + external gain · Conversion = unconscious + no gain',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are the Cluster A, B and C personality disorders?',
 'Cluster A (odd/eccentric): Paranoid (suspicious, mistrustful), Schizoid (detached, emotionally cold), Schizotypal (odd beliefs, magical thinking). Cluster B (dramatic/emotional): Antisocial (disregard for others, no remorse), Borderline (unstable relationships, self-harm, impulsivity), Histrionic (attention-seeking), Narcissistic (grandiosity, lack of empathy). Cluster C (anxious/fearful): Avoidant (social inhibition, fear of rejection), Dependent (clinging, submissive), Obsessive-Compulsive (perfectionism, control). Ref: Psychiatric nursing; DSM-5.',
 'A=Odd · B=Dramatic · C=Anxious — remember ABC',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is the drug of choice for acute opioid overdose and how does it work?',
 'Naloxone (Narcan) is the specific opioid antagonist for acute opioid overdose. It competitively blocks opioid receptors, rapidly reversing respiratory depression, sedation and coma. Classic opioid OD signs: needle tracks, stupor/unconsciousness, pinpoint pupils (miosis), respiratory depression (rate <12/min). Dose: 0.4–2 mg IV/IM/SC every 2–3 minutes as needed (max 10 mg). Half-life is shorter than most opioids — monitor for re-sedation; may need repeated doses. Ref: Emergency nursing; Kenya NACADA.',
 'Naloxone = opioid antagonist · pinpoint pupils + respiratory depression',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is ECT (electroconvulsive therapy) — its indications and what indicates it was effective?',
 'ECT delivers an electrical stimulus to the brain under general anaesthesia and muscle relaxant, inducing a controlled generalised seizure. Indications: severe major depression (especially with psychotic features, high suicide risk, or treatment resistance), severe mania, catatonia. A grand mal (generalised tonic-clonic) seizure of adequate duration is the THERAPEUTIC ENDPOINT — this is what indicates ECT was effective, not loss of consciousness (which is from the anaesthetic). Side effect: transient memory loss, usually recovering in 2–3 weeks. Ref: Mental health nursing; ECT.',
 'ECT effective = grand mal seizure produced · Memory loss resolves in 2–3 weeks',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What is the IQ classification for intellectual disability?',
 'IQ classification: Mild ID: 50–70 — can achieve 6th grade academic level, semi-independent living. Moderate ID: 35–50 — can achieve 2nd grade level, supervised daily living. Severe ID: 20–35 — limited self-care, needs continuous support. Profound ID: <20 — minimal self-care, requires full-time nursing care. Normal intelligence: IQ 70–130. Assess with standardised IQ tests and adaptive functioning. Ref: Psychiatric nursing; DSM-5/ICD-11.',
 'Mild 50–70 · Moderate 35–50 · Severe 20–35 · Profound <20',
 'KRCHN', 'Mental Health Nursing'),

('a3000000-0000-0000-0000-000000000003',
 'What are precipitating, predisposing and perpetuating factors in psychiatric illness — give examples for anxiety.',
 'Three Ps framework: Predisposing factors (vulnerability — pre-existing): genetics, childhood trauma, anxious temperament, early attachment problems. Precipitating factors (triggers — immediate): recent relationship breakdown, job loss, bereavement, exam stress. Perpetuating factors (maintaining): avoidance behaviour, ongoing stressor, poor sleep, substance use, lack of social support. Treatment targets all three. Example: anxiety disorder develops in a person with anxious temperament (predisposed), triggered by a car accident (precipitating), maintained by avoidance of driving (perpetuating). Ref: Psychiatric nursing; aetiology framework.',
 'Predispose = vulnerability · Precipitate = trigger · Perpetuate = maintain',
 'KRCHN', 'Mental Health Nursing');


-- ─── Deck 11: BScN Advanced Pharmacology — Paper I ───────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a4000000-0000-0000-0000-000000000001',
  'BScN Advanced Pharmacology',
  'High-yield pharmacology: drug interactions, toxicity management, antibiotic stewardship and complex calculations',
  'BScN',
  'Pharmacology',
  18
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a4000000-0000-0000-0000-000000000001',
 'A patient on warfarin has an INR of 5.8 with no active bleeding. What is the correct nursing management?',
 'INR 5.8 with no bleeding: (1) HOLD the warfarin dose. (2) Notify the physician immediately. (3) Physician will determine: if INR 5–8 no bleeding → hold dose, recheck INR 24h. If INR >8 or minor bleeding → hold + oral vitamin K 1–5 mg. Major/life-threatening bleeding → IV vitamin K 10 mg + prothrombin complex concentrate (PCC) or FFP. The nurse never independently administers vitamin K without a medical order. (4) Document and monitor. Ref: MOH Kenya anticoagulation guidelines; pharmacology.',
 'INR >5 + no bleeding → hold dose + notify physician',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What are the key nursing considerations before administering penicillin to any patient?',
 'Before giving penicillin: (1) Ask about ALLERGY to penicillin AND cephalosporins (10% cross-reactivity). This is the PRIORITY safety check. (2) If allergic: withhold, document, notify prescriber — alternative: macrolide (azithromycin) or clindamycin. (3) Check renal function for dose adjustment in renal impairment. (4) Can be given on empty stomach (except amoxicillin — better absorbed with food). (5) Monitor for anaphylaxis for 30 minutes after first dose. Ref: Pharmacology; drug administration safety.',
 'PRIORITY: ask allergy history before any penicillin',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What are the ACE inhibitor side effects and who should NOT receive them?',
 'ACE inhibitors (enalapril, lisinopril, ramipril): Mechanism = block ACE → reduce angiotensin II → vasodilation + reduced aldosterone. Side effects: (1) Dry persistent cough (bradykinin accumulation — 10–15% of patients). (2) Hyperkalaemia (reduced aldosterone). (3) First-dose hypotension. (4) Angioedema (rare, potentially fatal — stop immediately). Contraindications: PREGNANCY (teratogenic — causes fetal renal agenesis), bilateral renal artery stenosis, hyperkalaemia >5.5 mEq/L. Switch to ARB if cough is intolerable. Ref: Pharmacology.',
 'ACE inhibitor: cough + hyperkalaemia · Contraindicated in pregnancy',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is the management of digoxin toxicity?',
 'Digoxin toxicity signs: nausea/vomiting, yellow-green visual disturbances (xanthopsia), bradycardia, heart block, arrhythmias. Therapeutic range: 0.5–2.0 ng/mL. Management: (1) Withhold digoxin. (2) Check serum digoxin level and electrolytes — HYPOKALAEMIA potentiates toxicity. (3) Correct hypokalaemia (IV/oral KCl). (4) Cardiac monitoring. (5) Treat arrhythmias as needed. (6) Severe toxicity: Digibind (digoxin-specific antibody fragments) — each vial neutralises 0.5 mg digoxin. (7) Atropine for bradycardia. Ref: Pharmacology; medical-surgical nursing.',
 'Toxicity: yellow vision + bradycardia → Withhold + Digibind',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is the correct technique when mixing regular and NPH insulin in the same syringe?',
 'Mnemonic "Clear before cloudy": (1) Inject air into NPH (cloudy) vial first. (2) Inject air into regular (clear) vial. (3) Draw up REGULAR (clear) insulin FIRST. (4) Then draw up NPH (cloudy) insulin. Rationale: prevents NPH contaminating the regular vial — protamine/zinc in NPH would alter the rapid-onset action of regular insulin. Never shake vials — roll gently to mix NPH. Never mix insulin glargine (Lantus) or detemir with any other insulin. Ref: Pharmacology; insulin administration.',
 'Clear before cloudy — regular FIRST, then NPH',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'A patient on morphine post-op has RR of 8 and is difficult to rouse. What drug is given and how?',
 'Opioid-induced respiratory depression (RR <12 + decreased LOC) is a medical emergency. Drug: NALOXONE (Narcan) 0.4–2 mg IV/IM/SC. Repeat every 2–3 minutes as needed. Maximum 10 mg. Mechanism: competitive opioid receptor antagonist — rapidly reverses respiratory depression, sedation and analgesia. Important: naloxone has a SHORTER HALF-LIFE than most opioids — re-sedation can occur. Monitor closely for 2–4 hours. Notify physician. Withhold further opioids until reassessed. Ref: Emergency nursing; pharmacology.',
 'Naloxone 0.4–2 mg IV — monitor for re-sedation (shorter half-life than opioids)',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is first-pass metabolism and how does it affect drug bioavailability?',
 'First-pass (presystemic) metabolism: oral drugs are absorbed from the GI tract into the portal circulation and pass through the LIVER before reaching systemic circulation. The liver metabolises a portion of the drug, reducing the amount reaching the target organ. High first-pass drugs (low oral bioavailability): morphine, propranolol, GTN (given sublingually to bypass), lidocaine (given IV only), aspirin. Implication: oral dose must be much higher than IV dose for equivalent effect. Ref: Pharmacology (pharmacokinetics).',
 'First-pass = liver metabolises oral drug before systemic circulation',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is the Kenya first-line ART regimen and the key monitoring parameters?',
 'Kenya MOH 2022 first-line ART: TDF + 3TC + DTG (Tenofovir disoproxil fumarate 300 mg + Lamivudine 300 mg + Dolutegravir 50 mg) — fixed-dose combination, once daily. Monitoring: CD4 count (baseline and 6 monthly), viral load (3 months after starting, then 6–12 monthly — target <200 copies/mL), renal function (TDF is nephrotoxic — check creatinine/eGFR), bone density (long-term TDF). Adherence counselling is essential — missed doses cause resistance. Ref: Kenya MOH ART guidelines 2022.',
 'TDF + 3TC + DTG once daily · Monitor viral load + renal function',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is the mechanism and key monitoring for magnesium sulphate in eclampsia?',
 'MgSO4 prevents and treats eclamptic seizures by blocking NMDA glutamate receptors and reducing neuromuscular excitability. Loading dose: 4 g IV over 15–20 minutes. Maintenance: 1–2 g/hour IV infusion. Monitor for TOXICITY (therapeutic range 2–3.5 mmol/L): (1) Respiratory rate — must be ≥12/min (first sign of toxicity is respiratory depression). (2) Urine output — must be ≥25 mL/hour. (3) Patellar reflexes — must be PRESENT (loss indicates toxicity). Antidote: CALCIUM GLUCONATE 10 mL of 10% IV over 3–5 minutes. Ref: Kenya MOH obstetric emergency guidelines.',
 'MgSO4: RR ≥12 · Urine ≥25 mL/hr · Reflexes present · Antidote = CaGluconate',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What are the TB drug side effects remembered by RIPE?',
 'RIPE (Kenya first-line TB regimen 2RHZE/4RH): R — Rifampicin: red/orange urine and body fluids (expected — warn patient), hepatotoxicity (monitor LFTs), drug interactions (induces CYP450 — reduces efficacy of OCP, warfarin, ARTs). I — Isoniazid (INH): peripheral neuropathy (give pyridoxine/vitamin B6 to prevent), hepatotoxicity. P — Pyrazinamide: hyperuricaemia (gout), hepatotoxicity. E — Ethambutol: optic neuritis (check visual acuity monthly — ask about blurred vision/colour blindness). Ref: Kenya NTLP guidelines.',
 'R=Red urine · I=Neuropathy (B6) · P=Gout · E=Eye (optic neuritis)',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is antibiotic stewardship and why is it important in nursing practice?',
 'Antibiotic stewardship: the coordinated effort to optimise antibiotic use — prescribing the right drug, dose, route and duration for the right indication. Nursing role: (1) Administer antibiotics on time (maintain therapeutic levels). (2) Take cultures BEFORE starting antibiotics. (3) Monitor for allergy and adverse reactions. (4) Educate patients to complete the full course. (5) Report poor response. (6) Avoid over-the-counter antibiotic pressure on prescribers. Importance: prevents antimicrobial resistance (AMR) — a global public health crisis. Ref: Infection prevention; pharmacology.',
 'Right drug · Right dose · Right duration · Culture first · Complete course',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What drug interactions must a MAOI patient absolutely avoid and why?',
 'MAOIs (e.g. phenelzine, tranylcypromine) inhibit monoamine oxidase, which normally breaks down tyramine, serotonin and catecholamines. Dangerous interactions: (1) Tyramine-rich foods (aged cheese, cured meats, red wine, fermented foods) → hypertensive crisis. (2) OTC cold/decongestant preparations containing pseudoephedrine or phenylephrine → sympathomimetic crisis. (3) SSRIs, TCAs, pethidine, tramadol → serotonin syndrome (hyperthermia, agitation, myoclonus — fatal). Allow 14-day washout between MAOI and other serotonergic drugs. Ref: Psychopharmacology.',
 'MAOIs: avoid tyramine foods + OTC decongestants + SSRIs/pethidine',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What are the criteria for withholding digoxin before administration?',
 'Withhold digoxin and notify the physician if: (1) Apical pulse <60 bpm in adults (or <100 bpm in infants, <70 in older children). (2) Signs of toxicity: nausea, vomiting, yellow-green visual disturbances, arrhythmias. (3) Serum potassium <3.5 mEq/L (hypokalaemia potentiates toxicity — check K+ before each dose). (4) Serum digoxin level >2.0 ng/mL. (5) Patient recently had cardiac monitoring showing new arrhythmias. Always count apical pulse for a full 60 seconds before administering. Ref: Pharmacology; cardiac nursing.',
 'Hold digoxin if: pulse <60 · K+ <3.5 · Toxicity signs · Level >2.0 ng/mL',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is metformin''s mechanism, and in which two clinical scenarios must it be STOPPED?',
 'Metformin (biguanide): reduces hepatic gluconeogenesis and improves peripheral insulin sensitivity. Does NOT cause hypoglycaemia alone. Must be STOPPED before: (1) IV contrast/iodinated dye administration (risk of contrast-induced nephropathy causing metformin accumulation → lactic acidosis — hold 48h before and restart only when renal function confirmed normal). (2) Surgery/general anaesthesia (hold morning of surgery — risk of tissue hypoxia). Also stop if eGFR <30 mL/min/1.73m². Ref: Pharmacology; diabetes management.',
 'Stop metformin before: IV contrast + surgery · also if eGFR <30',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What are the steps of the WHO analgesic pain ladder and the drugs at each step?',
 'WHO Analgesic Pain Ladder (1986, updated): Step 1 (mild pain, VAS 1–3): Non-opioids — Paracetamol 500mg–1g QID, NSAIDs (ibuprofen, diclofenac) ± adjuvants. Step 2 (moderate pain, VAS 4–6): Mild opioids — Codeine 30–60 mg QID, Tramadol 50–100 mg QID ± non-opioids ± adjuvants. Step 3 (severe pain, VAS 7–10): Strong opioids — Morphine (oral/IV), Pethidine (short-acting) ± non-opioids ± adjuvants. Adjuvants: antidepressants (neuropathic pain), corticosteroids (bone pain), anticonvulsants. Ref: WHO analgesic guidelines; pain management.',
 'Step 1: Paracetamol/NSAIDs → Step 2: Codeine/Tramadol → Step 3: Morphine',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is the mechanism of action of typical vs atypical antipsychotics?',
 'Typical (first-generation) antipsychotics (haloperidol, chlorpromazine): primarily block dopamine D2 receptors. Effective for positive symptoms (hallucinations, delusions). High EPS risk. Atypical (second-generation) antipsychotics (risperidone, olanzapine, quetiapine, clozapine): block D2 AND serotonin 5-HT2A receptors. Effective for positive AND negative symptoms. Lower EPS risk but metabolic side effects (weight gain, diabetes, dyslipidaemia). Clozapine: most effective for treatment-resistant schizophrenia but causes agranulocytosis (requires FBC monitoring). Ref: Psychopharmacology.',
 'Typical = D2 block only · Atypical = D2 + 5HT2A block (less EPS, more metabolic)',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What is the 15–15 rule for managing hypoglycaemia and when should IV dextrose be used instead?',
 'The 15–15 rule for symptomatic hypoglycaemia (BG <3.9 mmol/L with symptoms) in a CONSCIOUS patient who can swallow: Give 15 g of fast-acting carbohydrate (4 glucose tablets, OR 150 mL fruit juice, OR 3 teaspoons sugar). Recheck blood glucose in 15 minutes. Repeat if still <4.0 mmol/L. Once normalised, give a snack. When to use IV dextrose instead: patient is unconscious, confused, or cannot swallow safely → 50 mL 50% dextrose IV (adults) or 10% dextrose 2 mL/kg (children), OR glucagon 1 mg IM/SC. Ref: Diabetes nursing; Kenya MOH guidelines.',
 '15-15 rule: 15g carb → 15min → recheck · Unconscious = IV dextrose/glucagon',
 'BScN', 'Pharmacology'),

('a4000000-0000-0000-0000-000000000001',
 'What are the core principles of safe medication administration (the 10 Rights)?',
 'The 10 Rights of medication administration: Right Patient (check 2 identifiers), Right Drug, Right Dose, Right Route, Right Time, Right Documentation, Right Reason/Indication, Right to Refuse (patient autonomy), Right Education (explain to patient), Right Evaluation (monitor response/side effects). Historical "5 Rights" only covers the first five — the expanded 10 Rights reflects modern patient-centred safe care. Always check allergies before any medication. Ref: Nursing pharmacology; patient safety.',
 '10 Rights: Patient · Drug · Dose · Route · Time · Document · Reason · Refuse · Educate · Evaluate',
 'BScN', 'Pharmacology');


-- ─── Deck 12: BScN Nursing Leadership & Management — Paper II ────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a5000000-0000-0000-0000-000000000001',
  'BScN Nursing Leadership & Management',
  'Management theories, leadership styles, conflict resolution, staffing and quality improvement for BScN Paper II',
  'BScN',
  'Nursing Management & Leadership',
  18
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a5000000-0000-0000-0000-000000000001',
 'Compare transformational vs transactional leadership.',
 'Transformational leadership (Bass/Burns): leader inspires followers to transcend self-interest, creates visionary change. The 4 I''s: Idealised influence (charisma), Inspirational motivation, Intellectual stimulation, Individualised consideration. Transactional leadership: based on reward and punishment — "I will reward you if you meet targets; I will penalise you if you do not." Transactional maintains the status quo; transformational drives innovation and growth. Ref: Nursing management; leadership theory.',
 'Transformational = inspire/change · Transactional = reward/punish',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What are Fayol''s 14 principles of management? Name at least 6.',
 'Fayol''s 14 principles: (1) Division of labour. (2) Authority and responsibility. (3) Discipline. (4) Unity of command — one employee, one superior. (5) Unity of direction — one head, one plan for same-objective activities. (6) Subordination of individual to general interest. (7) Remuneration. (8) Centralisation. (9) Scalar chain (chain of command). (10) Order. (11) Equity. (12) Stability of tenure. (13) Initiative. (14) Esprit de corps (team unity). Ref: Management theory (Fayol).',
 'Unity of command · Unity of direction · Scalar chain · Esprit de corps',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is the difference between unity of command and unity of direction?',
 'Unity of command (Fayol): each employee should receive orders from ONLY ONE superior. Prevents conflicting instructions and maintains clear accountability. Unity of direction: there should be ONE HEAD and ONE PLAN for a group of activities with the same objective. Ensures coordination of all efforts toward common goals. Memory: Command = who you report to (one boss). Direction = where you''re heading (one plan). Ref: Fayol''s 14 management principles.',
 'Command = one boss · Direction = one plan for same objective',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What are Katz''s three essential managerial skills and when is each most important?',
 'Katz''s three skills: (1) Technical skills — specific knowledge and procedures for the job. Most important for FIRST-LINE managers (ward in-charges, team leaders) who supervise day-to-day clinical work. (2) Human/interpersonal skills — ability to work effectively with people. Important at ALL levels. (3) Conceptual skills — ability to see the organisation as a whole, strategic thinking, long-term planning. Most important for TOP management (CNO, medical directors). Ref: Management theory (Katz).',
 'Technical (frontline) · Human (all levels) · Conceptual (top management)',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What are the Thomas-Kilmann conflict resolution strategies and when is each used?',
 'Five strategies: (1) Competing (Win-Lose): assertive, uncooperative — best for emergencies or when right must prevail. (2) Collaborating (Win-Win): assertive + cooperative — best for complex issues, builds relationships. (3) Compromising (Lose-Lose partial): moderate — quick temporary solution when time pressure. (4) Accommodating (Lose-Win): unassertive, cooperative — one party gives way to preserve relationship. (5) Avoiding: unassertive, uncooperative — when issue is trivial or cooling off is needed. Ref: Conflict management; nursing management.',
 'Win-Win=collaborate · Win-Lose=compete · Lose-Lose=compromise · Give in=accommodate',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is the difference between strategic, tactical and operational plans?',
 'Strategic plans: Long-range (3–10+ years), set by TOP management. Define organisational vision, mission and major goals. Broad in scope. Tactical plans: Intermediate-range (1–3 years), set by MIDDLE management. Translate strategic goals into departmental objectives. Annual work plans. Operational plans: Short-range (daily, weekly, monthly), set by FRONTLINE management. Specific activities, staffing rosters, shift schedules. Each level flows from the level above. Ref: Management functions (planning types).',
 'Strategic=long/top · Tactical=medium/middle · Operational=short/frontline',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What are the common errors in performance appraisal and how are they prevented?',
 'Performance appraisal errors: (1) Halo effect — one positive trait influences all ratings upward. (2) Horn effect — one negative trait pulls all ratings down. (3) Central tendency — rating everyone as average (often when appraiser lacks data). (4) Leniency/strictness bias — consistently rating too high or too low. (5) Recency bias — only recent events influence the rating. (6) Similar-to-me bias — favouring those like the appraiser. Prevention: use structured rating tools (BARS), collect ongoing data, train appraisers, use 360-degree feedback. Ref: Nursing management.',
 'Halo · Horn · Central tendency · Recency bias — use structured tools',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'Describe Max Weber''s bureaucratic model and its application in nursing.',
 'Weber''s bureaucracy: formal rules and regulations applied uniformly, clear hierarchy of authority, division of labour, impersonality (decisions based on rules, not personal relationships), merit-based appointment and promotion, written records. Application in nursing: job descriptions, nursing standards, policies and procedures, nursing council licensure, grade structures. Advantage: consistency, accountability. Disadvantage: inflexibility, slow to adapt to change. Ref: Management theory (Weber).',
 'Weber bureaucracy: uniform rules · hierarchy · impersonality · merit',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is the staffing process and how does it differ from scheduling?',
 'Staffing: the management function of filling organisational positions with competent people. Includes: manpower planning, recruitment, selection, placement, orientation/induction, retention. Scheduling: the specific process of assigning staff to work shifts — determining who works which hours, days and locations. Staffing = who fills the positions; Scheduling = when they work. Both are functions of the nurse manager. Ref: Nursing management.',
 'Staffing = filling positions · Scheduling = assigning shifts',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is quality improvement in nursing and what is the PDSA cycle?',
 'Quality improvement (QI): systematic approach to improving patient care processes and outcomes. PDSA cycle (Deming/Shewhart): Plan — identify the problem, set aims, develop a change. Do — implement the change on a small scale. Study — collect data, analyse results, compare to baseline. Act — adopt, adapt or abandon the change. Repeat the cycle. Other QI tools: fishbone/Ishikawa diagram (root cause analysis), run charts, audit and feedback. Ref: Nursing management; quality improvement.',
 'PDSA: Plan → Do → Study → Act — repeat the cycle',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What are the roles of the nurse manager according to Mintzberg''s managerial roles?',
 'Mintzberg''s 10 roles grouped in 3 categories: Interpersonal: Figurehead (ceremonial duties), Leader (motivating staff), Liaison (networking outside the unit). Informational: Monitor (collecting information), Disseminator (sharing information to staff), Spokesperson (representing unit externally). Decisional: Entrepreneur (initiating improvements), Disturbance handler (resolving crises), Resource allocator (budgeting/staffing), Negotiator (negotiations). Nurse managers most frequently use: Leader, Monitor, Disturbance handler, Resource allocator. Ref: Management theory (Mintzberg).',
 'Interpersonal · Informational · Decisional — Mintzberg''s 10 roles',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is delegation in nursing and what cannot be delegated?',
 'Delegation: assigning a task to a less experienced/qualified person while retaining accountability for the outcome. Key principle: AUTHORITY is delegated; ACCOUNTABILITY is retained by the delegating nurse. Cannot be delegated: (1) Nursing assessment and clinical judgment. (2) Nursing diagnosis formulation. (3) Development of the care plan. (4) Evaluation of patient outcomes. (5) Medication administration (to untrained staff). The 5 Rights of delegation: right task, right circumstance, right person, right direction/communication, right supervision. Ref: Nursing management.',
 'Delegate authority · Retain accountability · Never delegate assessment/judgment',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is an incident report and what is its purpose in risk management?',
 'An incident (occurrence) report is a formal documentation of any unexpected event that could harm or has harmed a patient, visitor or staff member (e.g. medication errors, falls, equipment failure, wrong patient). Purpose: (1) Document the facts objectively. (2) Identify patterns for risk reduction. (3) Trigger investigation and corrective action. (4) Protect staff and the institution legally. NOT placed in the patient''s medical record. NOT used punitively in a safety culture. The nurse who discovered/was involved completes the report. Ref: Nursing management; risk management.',
 'Incident report = risk management tool · Document facts · NOT in medical record',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What are the advantages and disadvantages of decentralisation in nursing management?',
 'Decentralisation: decision-making authority is distributed to lower levels (ward in-charges, team leaders). Advantages: (1) Decisions made closer to the point of care — faster response. (2) Increases staff participation and morale. (3) Promotes better interpersonal relationships. (4) Develops leadership skills at all levels. (5) Reduces burden on top management. Disadvantages: (1) Risk of inconsistency across units. (2) Requires higher competence at lower levels. (3) May reduce central control. Ref: Nursing management.',
 'Decentralisation: faster decisions · staff morale · BUT inconsistency risk',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is the purpose of a budget in nursing management and what are the two main types?',
 'A budget is a financial plan that estimates income and expenditure for a defined period, guiding resource allocation. Types: (1) Operating budget — covers day-to-day expenses: salaries, medications, consumables (syringes, dressings), utilities. Recurrent items. (2) Capital budget — covers major, durable items with long life expectancy: beds, ventilators, X-ray machines, building renovations. One-off purchases. Nursing managers are responsible for variance analysis (monitoring actual vs. budgeted spend) and justifying variances. Ref: Nursing management (budgeting).',
 'Operating budget = recurrent · Capital budget = major equipment/buildings',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is the span of control in management and what factors affect it?',
 'Span of control: the number of subordinates a manager can directly and effectively supervise. A WIDE span (many subordinates) = flat organisation structure, less supervisory oversight. A NARROW span (few subordinates) = tall organisation, more control. Factors that allow a wider span: standardised work, experienced competent staff, good communication systems, physical proximity of staff. Factors requiring narrower span: complex tasks, inexperienced staff, geographically dispersed staff. Ref: Fayol; management principles.',
 'Span of control = number of direct reports a manager effectively supervises',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is McGregor''s Theory X and Theory Y and their implications for nursing leadership?',
 'Douglas McGregor''s Theory X: assumes workers are inherently lazy, dislike work, avoid responsibility, need close supervision and control to perform. Leadership style: autocratic/directive. Theory Y: assumes workers are self-motivated, enjoy meaningful work, seek responsibility, exercise self-direction when committed. Leadership style: participative/democratic. Implication for nursing: Theory Y managers empower nurses, encourage initiative and innovation, resulting in higher job satisfaction and retention. Most modern nursing leadership espouses Theory Y principles. Ref: Management theory (McGregor).',
 'Theory X = lazy workers need control · Theory Y = self-motivated workers',
 'BScN', 'Nursing Management & Leadership'),

('a5000000-0000-0000-0000-000000000001',
 'What is Kurt Lewin''s change model and how is it applied in nursing?',
 'Lewin''s three-stage change model: (1) Unfreezing — create readiness and motivation for change; challenge the current equilibrium (present data, create dissatisfaction with status quo). (2) Moving/Changing — implement the change; new behaviours, processes or structures are introduced with support and guidance. (3) Refreezing — stabilise and institutionalise the new state; reinforce through policies, training, reward systems. Application: implementing new infection control protocols, introducing electronic health records, changing medication administration procedures. Ref: Change management theory.',
 'Lewin: Unfreeze → Move/Change → Refreeze',
 'BScN', 'Nursing Management & Leadership');


-- ─── Deck 13: BScN Research & Evidence-Based Practice — Paper II ──────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a5000000-0000-0000-0000-000000000002',
  'BScN Research & Evidence-Based Practice',
  'Advanced research designs, EBP frameworks, critical appraisal and knowledge translation for BScN Paper II',
  'BScN',
  'Research & Evidence-Based Practice',
  15
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a5000000-0000-0000-0000-000000000002',
 'What is evidence-based practice (EBP) and what are its three components?',
 'EBP is the conscientious integration of the best available research evidence with clinical expertise and patient values/preferences to make patient care decisions. Three components (Sackett): (1) Best research evidence — highest quality applicable research. (2) Clinical expertise — practitioner''s accumulated knowledge and skill. (3) Patient values and circumstances — patient preferences, culture, beliefs, resources. EBP improves patient outcomes, reduces variation in care, and promotes safe, cost-effective practice. Ref: Research & EBP; Sackett et al.',
 'EBP = Best evidence + Clinical expertise + Patient values',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is the hierarchy of evidence and which study design provides the strongest evidence?',
 'Evidence hierarchy (from strongest to weakest): (1) Systematic review and meta-analysis of RCTs — highest level. (2) Well-designed RCT. (3) Quasi-experimental study. (4) Cohort study. (5) Case-control study. (6) Cross-sectional study. (7) Case series/case report. (8) Expert opinion/editorials — lowest. Level 1 evidence (systematic review/meta-analysis) is used to develop clinical guidelines. Ref: Research methods; evidence hierarchy.',
 'Strongest: Systematic review/meta-analysis → RCT → Cohort → Case-control',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is a randomised controlled trial (RCT) and what are its key features?',
 'An RCT is a true experimental design where: (1) Participants are RANDOMLY ALLOCATED to treatment or control groups (eliminates selection bias). (2) An INTERVENTION is applied to the treatment group. (3) Outcomes are compared between groups. (4) Ideally DOUBLE-BLINDED (neither participant nor researcher knows group allocation — reduces performance and detection bias). Key strength: random allocation controls for known AND unknown confounders. Considered the gold standard for evaluating the effectiveness of interventions. Ref: Research methods.',
 'RCT = random allocation + intervention + comparison + ideally blinded',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is the PICO framework and how is it used to formulate a clinical question?',
 'PICO helps formulate a searchable, answerable clinical question: P — Patient/Population (who are your patients? what is the condition?). I — Intervention (what treatment/test/exposure?). C — Comparison (what is the alternative? — placebo, standard care, no intervention). O — Outcome (what are you hoping to measure? — mortality, pain, infection rate). Example: In adult patients with type 2 diabetes (P), does metformin (I) compared to lifestyle modification alone (C) reduce HbA1c at 6 months (O)? Ref: EBP; clinical question formulation.',
 'PICO: Population · Intervention · Comparison · Outcome',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What are the Iowa Model and ACE Star Model used for in nursing EBP?',
 'Iowa Model of EBP (Titler): a practice-change framework that begins with a trigger (problem-focused or knowledge-focused), followed by: form a team, assemble/appraise/synthesise evidence, pilot the change, evaluate outcomes, and disseminate results. Used in hospital-based quality improvement. ACE Star Model of Knowledge Transformation (Stevens): five stages — Discovery (primary research), Evidence Summary (systematic review), Translation (clinical guidelines), Integration (practice change), Evaluation (outcomes). Both guide the translation of research into clinical practice change. Ref: EBP frameworks.',
 'Iowa Model: trigger → team → evidence → pilot → evaluate. ACE Star: 5 stages',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is the difference between internal and external validity in research?',
 'Internal validity: the degree to which a study accurately measures what it claims — the results are due to the intervention, not other factors (confounders, bias). Threats: selection bias, history, maturation, instrumentation, attrition (drop-outs). External validity (generalisability): the degree to which findings can be applied to other populations, settings and times. A study can be internally valid but not generalisable (narrow sample). RCTs maximise internal validity; large representative surveys maximise external validity. Ref: Research methods.',
 'Internal = results are accurate · External = results are generalisable',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is grounded theory and when is it used?',
 'Grounded theory (Glaser and Strauss): a qualitative research methodology that generates theory INDUCTIVELY from data collected in the field — theory emerges from ("is grounded in") the data. It does not start with a pre-existing hypothesis. Methods: theoretical sampling, constant comparative analysis, saturation (data collection stops when no new themes emerge), coding (open → axial → selective). Used when little existing theory exists about a phenomenon. Example: developing a theory of how nurses cope with moral distress. Ref: Qualitative research methods.',
 'Grounded theory = theory emerges from data · inductive · saturation',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is triangulation in research and why is it used?',
 'Triangulation: the use of MULTIPLE methods, data sources, investigators or theories to study the same phenomenon, increasing the credibility and validity of findings. Types: (1) Data triangulation — multiple data sources (e.g. patients + nurses + records). (2) Methodological triangulation — using both quantitative and qualitative methods (mixed methods). (3) Investigator triangulation — multiple researchers independently analysing the same data. (4) Theoretical triangulation — using multiple theories to interpret data. Purpose: reduce the limitations of any single method and increase confidence in findings. Ref: Research methods.',
 'Triangulation = multiple methods/sources to increase credibility',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is a systematic review and how does it differ from a narrative/traditional literature review?',
 'Systematic review: follows a rigorous, transparent, pre-specified protocol. Includes: clear PICO question, exhaustive database search, predefined inclusion/exclusion criteria, quality appraisal of each study (using tools like CASP, Cochrane RoB), data extraction, synthesis (narrative or meta-analysis). Minimises bias. Narrative review: author selects studies based on their judgement — no defined protocol, prone to selection bias, not reproducible. Systematic reviews are the gold standard source for clinical guidelines. Ref: Research methods; EBP.',
 'Systematic review = protocol-driven + quality appraisal + reproducible (vs narrative)',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is a confidence interval (CI) and how is it interpreted?',
 'A confidence interval is a range of values within which the true population parameter is likely to fall, with a specified level of certainty. A 95% CI means: if you repeated the study 100 times, 95 of the resulting CIs would contain the true value. Wide CI = imprecise estimate (small sample). Narrow CI = precise estimate (large sample). Key: if a 95% CI for a relative risk or odds ratio INCLUDES 1.0, the result is NOT statistically significant. Example: RR 1.5 (95% CI 0.9–2.2) — not significant; RR 1.5 (95% CI 1.1–2.0) — significant. Ref: Biostatistics; research methods.',
 '95% CI includes 1.0 → NOT significant · Narrow CI = more precise',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is a Type I error and a Type II error in hypothesis testing?',
 'Type I error (alpha error — false positive): Rejecting the null hypothesis when it is actually TRUE. Concluding there is an effect when there isn''t one. Controlled by setting alpha (significance level) — usually 0.05. Type II error (beta error — false negative): Failing to reject the null hypothesis when it is actually FALSE. Missing a real effect. Controlled by increasing sample size (increases statistical power). Power = 1 − beta (usually set at 80%). Mnemonic: Type I = claiming innocent person guilty; Type II = letting guilty person go free. Ref: Biostatistics.',
 'Type I = false positive (wrong rejection) · Type II = false negative (missed effect)',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is informed consent in research and what are its four elements?',
 'Informed consent in research (Belmont Report): voluntary agreement to participate after full disclosure. Four elements: (1) Disclosure — full information about the study purpose, procedures, risks, benefits, alternatives, and right to withdraw. (2) Comprehension — participant understands the information (use plain language, check understanding). (3) Voluntariness — free from coercion, undue influence or pressure. (4) Competence/capacity — participant is able to make the decision (adults, no cognitive impairment; children need parent/guardian + assent). Documented by signature. Ref: Research ethics.',
 'Consent: Disclosure + Comprehension + Voluntariness + Competence',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is the difference between sensitivity and specificity in screening tests?',
 'Sensitivity (True Positive Rate): ability of a test to correctly identify people WITH the disease. High sensitivity = few false negatives. Ideal for RULING OUT disease (mnemonic: SnNout — Sensitive test, Negative result, rules OUT). Specificity (True Negative Rate): ability of a test to correctly identify people WITHOUT the disease. High specificity = few false positives. Ideal for RULING IN disease (SpPin — Specific test, Positive result, rules IN). Example: HIV rapid test — high sensitivity to screen; western blot — high specificity to confirm. Ref: Epidemiology; research methods.',
 'Sensitivity = rule OUT (SnNout) · Specificity = rule IN (SpPin)',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What is saturation in qualitative research?',
 'Data saturation (theoretical saturation) in qualitative research: the point at which no NEW themes, categories or patterns emerge from continued data collection — additional participants/data would only replicate existing findings. Saturation is the criterion used to decide sample size in qualitative research (not a pre-set number). Ensures comprehensiveness of the findings. Typically reached with 8–20 participants in phenomenology; 20–30 in grounded theory (varies by study). Ref: Qualitative research methods.',
 'Saturation = no new themes emerging — stop data collection here',
 'BScN', 'Research & Evidence-Based Practice'),

('a5000000-0000-0000-0000-000000000002',
 'What are the key differences between basic research, applied research and action research?',
 'Basic (pure/fundamental) research: generates NEW knowledge and theory for its own sake — no immediate practical application. Goal: advance science. Applied research: uses existing knowledge to solve a SPECIFIC PRACTICAL PROBLEM in a real-world setting. Goal: direct usefulness. Action research: carried out BY practitioners TO solve an IMMEDIATE LOCAL problem in their own practice setting. Participatory and cyclical (Plan-Act-Observe-Reflect). Goal: immediate improvement. Used by nurses, teachers, managers. Ref: Research methods.',
 'Basic = theory · Applied = practical problem · Action = practitioners fix own practice',
 'BScN', 'Research & Evidence-Based Practice');

-- ─── Final: update all card_count columns to actual counts ───────────────────
UPDATE flashcard_decks SET card_count = (
  SELECT COUNT(*) FROM flashcards WHERE flashcards.deck_id = flashcard_decks.id
) WHERE id IN (
  'a2000000-0000-0000-0000-000000000001',
  'a3000000-0000-0000-0000-000000000001',
  'a3000000-0000-0000-0000-000000000002',
  'a3000000-0000-0000-0000-000000000003',
  'a4000000-0000-0000-0000-000000000001',
  'a5000000-0000-0000-0000-000000000001',
  'a5000000-0000-0000-0000-000000000002'
);
