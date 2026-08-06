-- TITLE: SEED NEW HIGH YIELD NURSING MNEMONICS

INSERT INTO public.mnemonics (title, acronym, description, specialty, category, tags, phrases, breakdown, clinical_significance, causes, exam_traps, memory_pearl, high_yield_tip, practice_question) VALUES 
(
  'MONA for Myocardial Infarction',
  'Morphine, Oxygen, Nitroglycerin, Aspirin',
  'Immediate initial management of suspected myocardial infarction or acute coronary syndrome.',
  'Medical-Surgical',
  'Cardiology',
  ARRAY['Cardiology','Emergency','Pharmacology'],
  ARRAY['Morphine','Oxygen','Nitroglycerin','Aspirin'],
  '[
    {"emoji":"💉","phrase":"Morphine","meaning":"Relieves pain, reduces anxiety, and causes venodilation reducing preload"},
    {"emoji":"💨","phrase":"Oxygen","meaning":"Provided if O2 saturation < 94% or if patient is dyspneic"},
    {"emoji":"💊","phrase":"Nitroglycerin","meaning":"Vasodilator that reduces preload, afterload, and myocardial oxygen demand (given sublingually)"},
    {"emoji":"🛡️","phrase":"Aspirin","meaning":"Antiplatelet that prevents further platelet aggregation at the site of plaque rupture"}
  ]'::jsonb,
  'MONA outlines the immediate initial pharmacological management of a patient presenting with an acute coronary syndrome (ACS). It improves oxygenation, relieves ischemic pain, reduces myocardial oxygen demand, and prevents further clot formation.',
  ARRAY['Myocardial Infarction','Acute Coronary Syndrome','Unstable Angina'],
  'Students often think MONA must be administered in that exact order. The actual order of administration is usually OANM: Oxygen (if needed), Aspirin, Nitroglycerin, then Morphine (if pain not relieved by nitro).',
  'MONA greets every patient with chest pain at the door!',
  'Always check blood pressure before giving Nitroglycerin or Morphine, as both can cause profound hypotension. Avoid Nitroglycerin if the patient has taken sildenafil (Viagra) recently or has a right ventricular infarction.',
  '{"question":"A patient arrives at the emergency department with severe chest pain radiating to the left arm. Which of the following medications in the MONA protocol should the nurse ensure is administered FIRST to prevent further clot formation?","options":["A. Morphine","B. Oxygen","C. Nitroglycerin","D. Aspirin"],"answer":"D","explanation":"Aspirin is the most critical early intervention to prevent further platelet aggregation and clot enlargement in acute coronary syndrome. While oxygen is given early if saturation is low, aspirin should be given immediately to all ACS patients without contraindications."}'::jsonb
),
(
  'VEAL CHOP',
  'Variable, Early, Acceleration, Late — Cord, Head, Okay, Placenta',
  'Interpreting fetal heart rate monitor tracings and their underlying causes.',
  'Midwifery',
  'Maternity',
  ARRAY['Maternity','Midwifery','Labor'],
  ARRAY['Variable Decelerations','Early Decelerations','Accelerations','Late Decelerations'],
  '[
    {"emoji":"➰","phrase":"Variable Decelerations","meaning":"Cord Compression"},
    {"emoji":"👶","phrase":"Early Decelerations","meaning":"Head Compression"},
    {"emoji":"📈","phrase":"Accelerations","meaning":"Okay (Normal fetal well-being)"},
    {"emoji":"⚠️","phrase":"Late Decelerations","meaning":"Placental Insufficiency"}
  ]'::jsonb,
  'Provides a quick reference to interpret electronic fetal monitoring (EFM) during labor. Identifying the type of deceleration dictates the required nursing intervention (e.g., position change for variable, immediate delivery preparation for late).',
  ARRAY['Umbilical Cord Compression','Fetal Head Compression','Normal Fetal Movement','Uteroplacental Insufficiency'],
  'Do not confuse early and late decelerations. Early decelerations mirror the contraction (peak of contraction = nadir of deceleration) and are benign. Late decelerations start after the peak of the contraction and indicate fetal hypoxia.',
  'VEAL matches with CHOP! V=C, E=H, A=O, L=P.',
  'For Late Decelerations (Placental insufficiency), remember the LION interventions: Left lateral position, IV fluids, Oxygen (10L/min non-rebreather), Notify provider (and stop oxytocin if running).',
  '{"question":"During continuous fetal monitoring, the nurse notes decelerations that begin after the peak of the uterine contraction and return to baseline after the contraction ends. Using the VEAL CHOP mnemonic, what is the most likely cause?","options":["A. Head compression","B. Cord compression","C. Placental insufficiency","D. Normal fetal movement"],"answer":"C","explanation":"These are late decelerations (starting after the peak of the contraction). According to VEAL CHOP, Late decelerations indicate Placental insufficiency, which is a sign of fetal hypoxia requiring immediate intervention."}'::jsonb
),
(
  'SLUDGE Syndrome',
  'Salivation, Lacrimation, Urination, Defecation, Gastrointestinal distress, Emesis',
  'Classic signs of cholinergic toxicity (parasympathetic overstimulation).',
  'Pharmacology',
  'Pharmacology',
  ARRAY['Toxicology','Emergency','Pharmacology'],
  ARRAY['Salivation','Lacrimation','Urination','Defecation','Gastrointestinal distress','Emesis'],
  '[
    {"emoji":"🤤","phrase":"Salivation","meaning":"Excessive drooling and saliva production"},
    {"emoji":"😢","phrase":"Lacrimation","meaning":"Excessive tearing"},
    {"emoji":"🚽","phrase":"Urination","meaning":"Incontinence of urine"},
    {"emoji":"💩","phrase":"Defecation","meaning":"Fecal incontinence or diarrhea"},
    {"emoji":"🤢","phrase":"Gastrointestinal distress","meaning":"Abdominal cramping and hyperactive bowel sounds"},
    {"emoji":"🤮","phrase":"Emesis","meaning":"Vomiting"}
  ]'::jsonb,
  'Characterizes the toxidrome of cholinergic crisis due to acetylcholinesterase inhibitors, such as organophosphate poisoning (pesticides, nerve agents). Indicates profound parasympathetic nervous system overstimulation.',
  ARRAY['Organophosphate Poisoning','Nerve Gas Exposure','Myasthenia Gravis overtreatment (Pyridostigmine)','Pilocarpine toxicity'],
  'Students often confuse cholinergic (SLUDGE) with anticholinergic (Dry as a bone) toxidromes. Remember that cholinergic is WET (everything is leaking out), while anticholinergic is DRY (everything is retained).',
  'In a cholinergic crisis, the patient is leaking from everywhere—they turn into SLUDGE.',
  'The antidote for SLUDGE (muscarinic cholinergic toxicity) is Atropine. Pralidoxime (2-PAM) is also given in organophosphate poisoning to reactivate the acetylcholinesterase enzyme.',
  '{"question":"A farmer is brought to the ED after accidental exposure to agricultural pesticides. The patient has profound bradycardia, excessive drooling, diarrhea, and pinpoint pupils. Which medication should the nurse anticipate administering immediately?","options":["A. Physostigmine","B. Atropine sulfate","C. Epinephrine","D. Naloxone"],"answer":"B","explanation":"The patient is exhibiting a cholinergic toxidrome (SLUDGE syndrome) from organophosphate pesticide poisoning. The primary antidote for the muscarinic effects of cholinergic toxicity is Atropine."}'::jsonb
),
(
  'RICE for Soft Tissue Injury',
  'Rest, Ice, Compression, Elevation',
  'Immediate first aid and management for acute soft tissue injuries (sprains, strains, contusions).',
  'Medical-Surgical',
  'Orthopedics',
  ARRAY['First Aid','Orthopedics','Trauma'],
  ARRAY['Rest','Ice','Compression','Elevation'],
  '[
    {"emoji":"🛑","phrase":"Rest","meaning":"Stop using the injured part to prevent further damage"},
    {"emoji":"🧊","phrase":"Ice","meaning":"Apply cold packs for 15-20 minutes every 2-3 hours to cause vasoconstriction and reduce swelling"},
    {"emoji":"🩹","phrase":"Compression","meaning":"Wrap the injured area with an elastic bandage to minimize edema and provide support"},
    {"emoji":"🛏️","phrase":"Elevation","meaning":"Raise the injured part above the level of the heart to promote venous return and decrease swelling"}
  ]'::jsonb,
  'The RICE protocol is the universal standard for the first 24-48 hours of an acute musculoskeletal injury. It controls inflammation, reduces pain, limits edema, and promotes optimal healing conditions.',
  ARRAY['Ankle Sprain','Muscle Strain','Sports Injuries','Contusions'],
  'Do not apply ice directly to the skin (always use a cloth barrier to prevent frostbite). Do not leave ice on for more than 20 minutes at a time to prevent rebound vasodilation.',
  'Treat injuries with RICE, not heat, for the first 48 hours!',
  'Check neurovascular status (pulses, capillary refill, sensation, movement) distal to the injury BEFORE and AFTER applying a compression bandage to ensure you haven''t compromised blood flow.',
  '{"question":"A patient arrives at the clinic with a severely sprained ankle sustained 2 hours ago. The nurse teaches the patient the RICE method. Which statement by the patient indicates a correct understanding of the instructions?","options":["A. I will apply a heating pad for 20 minutes to reduce pain.","B. I will keep an ice pack on my ankle continuously overnight.","C. I will wrap my ankle tightly starting from the calf down to the toes.","D. I will prop my leg up on a couple of pillows while lying on the couch."],"answer":"D","explanation":"Elevation (raising the injured limb above heart level) promotes venous return and reduces swelling. Heat (A) should be avoided in the first 48 hours. Ice (B) should only be applied for 15-20 minutes at a time. Compression (C) should wrap from distal to proximal (toes to calf) to push fluid toward the heart."}'::jsonb
),
(
  'TORCH Infections',
  'Toxoplasmosis, Other, Rubella, Cytomegalovirus, Herpes Simplex',
  'Maternal infections that can cross the placenta and cause severe fetal anomalies.',
  'Midwifery',
  'Pediatrics',
  ARRAY['Maternity','Infectious Disease','Neonatal'],
  ARRAY['Toxoplasmosis','Other','Rubella','Cytomegalovirus (CMV)','Herpes Simplex Virus (HSV)'],
  '[
    {"emoji":"🐈","phrase":"Toxoplasmosis","meaning":"Acquired from cat feces or undercooked meat; causes hydrocephalus and chorioretinitis"},
    {"emoji":"🦠","phrase":"Other","meaning":"Includes Syphilis, Varicella, Parvovirus B19, and Zika virus"},
    {"emoji":"🔴","phrase":"Rubella","meaning":"German measles; causes cataracts, deafness, and congenital heart defects"},
    {"emoji":"🧬","phrase":"Cytomegalovirus (CMV)","meaning":"Most common congenital infection; causes microcephaly, hearing loss, and petechial rash"},
    {"emoji":"👄","phrase":"Herpes Simplex Virus (HSV)","meaning":"Usually transmitted during birth; causes vesicular lesions and severe CNS damage"}
  ]'::jsonb,
  'TORCH infections are a group of vertically transmitted diseases that cause severe congenital anomalies, miscarriage, or stillbirth if acquired during pregnancy. Early screening and prevention are essential.',
  ARRAY['Vertical transmission during pregnancy','Exposure to cat litter (Toxoplasmosis)','Unvaccinated mother (Rubella)'],
  'A pregnant nurse should NEVER be assigned to care for a patient with an active TORCH infection (e.g., a child with Rubella or CMV) due to the severe teratogenic risks.',
  'TORCH burns the fetus—prevent these infections at all costs during pregnancy!',
  'Toxoplasmosis education is a frequent exam topic: tell pregnant women to avoid changing cat litter boxes and to ensure all meat is fully cooked.',
  '{"question":"A nurse is providing prenatal education to a newly pregnant client. To prevent Toxoplasmosis (part of the TORCH complex), which instruction should the nurse include?","options":["A. Ensure you receive the MMR vaccine today.","B. Avoid changing your cat''s litter box.","C. Wash your hands frequently after contact with toddlers.","D. Avoid eating soft, unpasteurized cheeses."],"answer":"B","explanation":"Toxoplasmosis is a parasitic infection commonly transmitted through contact with cat feces (changing litter boxes) or eating undercooked contaminated meat. MMR vaccine (A) is for Rubella but is contraindicated in pregnancy. Handwashing after toddler contact (C) prevents CMV. Unpasteurized cheeses (D) relate to Listeria, which is not classically in the TORCH acronym."}'::jsonb
);
