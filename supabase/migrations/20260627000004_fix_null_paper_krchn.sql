-- =============================================================================
-- FIX: Assign 'Paper I' or 'Paper II' to all 168 KRCHN questions with NULL paper
-- =============================================================================
-- Classification rule: nck-exam-system.md Section 12
-- Paper I  = Medical-Surgical, Pharmacology, Midwifery, Maternal & Child Health,
--            Paediatric Nursing, Anatomy & Physiology, Surgical Nursing
-- Paper II = Community/Public Health, Mental Health, Environmental Health,
--            Nutrition, Research & Statistics, Health Systems & Management,
--            IPC, Communicable Disease/Infection Prevention & Control
-- =============================================================================
-- Also fixes unit='Nursing'/topic='General' to proper values per content.
-- =============================================================================

-- ─── PAPER I: Pharmacology (2018/2019 sets) ───────────────────────────────────
-- Atenolol (beta-blocker), Pharmacokinetics, Penicillins, Plant drug, Bioavailability route
UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Cardiovascular Drugs'
  WHERE id = 'd8e206e3-7f83-48c9-976e-7879e12fa908'; -- Atenolol

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = 'ef913c5e-16c4-4c53-b543-91b8d3a3bcf0'; -- Penicillins

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Sources of Drugs'
  WHERE id = 'b72ac880-7c8a-47b8-9d9b-9d3724f64089'; -- Plant-derived drug

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Pharmacokinetics'
  WHERE id = '15df7049-e9cf-443d-9569-586a6842a716'; -- IV highest bioavailability route

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Opioid Pharmacology'
  WHERE id = 'c85e547c-c826-448a-9429-7e309bb6d8a7'; -- Opioid antagonist (naltrexone)

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Toxicology and Antidotes'
  WHERE id = 'acf147ff-6fa9-4e5a-8a1d-e68c82e06051'; -- Organophosphate antidote (atropine)

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Pharmacokinetics'
  WHERE id = '6fbe3dcd-37fe-45f4-8fea-fb21a49b88c2'; -- Half-life definition

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = '3424d8b0-a03c-4bd3-ae47-11d4fa3e465e'; -- Bacillary dysentery ciprofloxacin

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Family Planning'
  WHERE id = '342b0d53-9d62-488b-ad13-17f56d7ba0b5'; -- Nordette monophasic pill

UPDATE questions SET paper = 'Paper I', unit = 'Microbiology', topic = 'Hospital-Acquired Infections'
  WHERE id = '2d838a65-e562-4fa9-82dd-78192ec60dc4'; -- Nosocomial pneumonia organisms

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Pharmacokinetics'
  WHERE id = 'c0a20ce7-a4a8-45b1-975c-e74f4ac45517'; -- Oral bioavailability factors

UPDATE questions SET paper = 'Paper I', unit = 'Microbiology', topic = 'Immunology'
  WHERE id = 'ac708d67-6c33-4753-9eae-db8c94af878a'; -- IgG secondary antibody response

UPDATE questions SET paper = 'Paper I', unit = 'Microbiology', topic = 'Immunology'
  WHERE id = '02dfd548-8680-4ea0-8927-16abde768596'; -- Cell-mediated immunity

-- 2018 KRCHN Pharmacology batch
UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = 'df21f15a-0e91-4e8f-82c3-15ed11c1cfbc'; -- Cephalosporins

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Respiratory Drugs'
  WHERE id = 'a1d25f4b-457a-49b1-8fd0-d8f9a0ac95f6'; -- Antitussives

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Respiratory Drugs'
  WHERE id = 'de4c7e56-4eed-4aa1-908a-f1e549a9fa0d'; -- Expectorant client education

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Analgesics'
  WHERE id = '721803f1-f16d-40fb-9ed6-7e92c755c27a'; -- Narcotic analgesics

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'CNS Depressants'
  WHERE id = '45bd1173-1d7f-47f4-852c-fac85c3516a6'; -- Hypnotics induce sleep

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Analgesics'
  WHERE id = 'e69a17e2-d114-48df-b70a-ba34a1e92164'; -- Morphine antidote naloxone

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Pharmacokinetics'
  WHERE id = 'deb815b7-a8ee-460f-b64a-cb58cac24023'; -- Bioavailability definition

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Local Anaesthetics'
  WHERE id = 'ea33ae82-876c-447e-92af-7e1e65323541'; -- Local anaesthetics Na+ channel block

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Drugs in Pregnancy'
  WHERE id = 'b30c419c-b17b-464f-bae0-719fbcd0de6a'; -- Tetracycline in pregnancy

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antivirals'
  WHERE id = '87b900b6-401a-462e-99e6-3fa798d19715'; -- Acyclovir mechanism

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Anti-Allergic Drugs'
  WHERE id = '62925b8c-3ecf-4e31-8df3-0049439db615'; -- Cromolyn mast cell stabiliser

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antidiabetic Drugs'
  WHERE id = '7ca79035-a885-4101-b2aa-44df3916bb11'; -- Sulfonylureas mechanism

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Psychotropic Drugs'
  WHERE id = '5cf45b0c-9311-4013-a673-f1ad9157f43e'; -- Antipsychotic EPS

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = 'bf2e6ca7-f6f3-4f18-aba7-e0b8226b7746'; -- TB combination chemotherapy

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Gastrointestinal Drugs'
  WHERE id = '4b9c0bd1-0ac9-4de6-8d3a-b5c6f76d75f2'; -- Antacids staggering instruction

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Anthelmintics'
  WHERE id = 'bdc1ff98-a057-44a8-ad7c-33d5b9346ad3'; -- Taeniasis praziquantel

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimalarials'
  WHERE id = '8035fb7c-1ef2-40d5-9893-8de95125660f'; -- 4-aminoquinolines

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Cardiovascular Drugs'
  WHERE id = '5c983563-6ffd-4d4b-ac56-858c47e69c82'; -- Diuretics classification

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antineoplastics and Antidotes'
  WHERE id = 'a0fece3c-edc0-4e9a-8ee1-bbd5707d935f'; -- Methotrexate antidote folinic acid

-- 2019 KRCHN Pharmacology batch
UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Anthelmintics'
  WHERE id = 'f3dc0caf-b018-4f21-a9b4-ceb9159b6432'; -- Praziquantel contraindication

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'NSAIDs'
  WHERE id = '2e7cc0ef-7f1d-40e2-bcf0-2b9ea4017d55'; -- Indomethacin CV side effects

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = 'f230a7fc-b660-42eb-a2d4-0aabd69f2461'; -- Sulphonamides

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Toxicology'
  WHERE id = 'ef17ea26-0068-447c-b518-474d65daaaa1'; -- Poisons definition

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Drugs in Pregnancy'
  WHERE id = '94a6b1ea-69bd-49b5-b528-681a7f94fd7a'; -- Teratogenicity definition

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Cardiovascular Drugs'
  WHERE id = 'ffb7687d-92b1-450e-9edf-970ad6595944'; -- Nifedipine calcium channel blocker

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'NSAIDs'
  WHERE id = 'c3ec25e4-63db-407f-97cd-130e770afe00'; -- Diclofenac prostaglandin inhibition

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Gastrointestinal Drugs'
  WHERE id = '783b15fa-d0ad-4f67-9fa7-4c1b719427cb'; -- Antiulcer agents

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Respiratory Drugs'
  WHERE id = '5485fe17-2fbe-44c2-949c-85c54d1f34b6'; -- Salbutamol beta-2 agonist

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Anxiolytics'
  WHERE id = '5f689b65-7cd1-415a-9c9b-4663e21ce57a'; -- Anti-anxiety agents

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Pharmacodynamics'
  WHERE id = '7732fdba-8404-4c58-a09a-63338b844e4f'; -- Drug receptor definition

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = 'c06c4fd1-0b37-4c75-be01-c11ad88dc853'; -- Gentamicin protein synthesis

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Drug Interactions'
  WHERE id = '9acfbca2-4aac-424d-937b-e46f756304cd'; -- Potentiation

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Respiratory Drugs'
  WHERE id = '484c8db0-41b0-40c4-be92-3b82d4cbb18a'; -- Ipratropium bromide

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Routes of Drug Administration'
  WHERE id = '4d3f48dd-028e-496f-bca2-b63135dea230'; -- Oral route highest compliance

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Gastrointestinal Drugs'
  WHERE id = 'f901c217-ee79-40b6-8c62-9b5e67b5e663'; -- Cimetidine libido/impotence

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Gastrointestinal Drugs'
  WHERE id = '8ffd06d9-c5df-47fd-8195-67d01e826637'; -- Bulk-forming laxatives

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'CNS Depressants'
  WHERE id = '72d78985-794a-4487-a54d-756a2e8132f2'; -- Diazepam GABA mechanism

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Cardiovascular Drugs'
  WHERE id = '9b13b85e-126e-4593-9f9d-3582e346c581'; -- Nitroglycerin sublingual first-pass

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Analgesics'
  WHERE id = '1bf7581e-f555-4ef2-922b-594c2628bbf5'; -- Morphine commonest SE constipation

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antiretrovirals'
  WHERE id = 'fe03b446-b9d3-4ac3-b3f9-64d12feac84d'; -- HAART viral RNA decrease

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = '0c25a3c9-e966-41fe-a200-145caa3ae01f'; -- Beta-lactamase ceftriaxone

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Anticoagulants'
  WHERE id = '8ada11a4-d740-435f-a948-d0f460692bb4'; -- Warfarin teratogenic

UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Anti-Asthmatic Drugs'
  WHERE id = '64f7d6a9-89f6-4b8f-8a28-260f6b3ac3fb'; -- Cromolyn histamine suppression

-- Medical-Surgical (2008) — Paper I
UPDATE questions SET paper = 'Paper I', unit = 'Medical-Surgical Nursing', topic = 'Respiratory Disorders'
  WHERE id = '1bd413a8-6e60-40d2-935a-236223d5fd03'; -- Finger clubbing pulmonary causes

UPDATE questions SET paper = 'Paper I', unit = 'Medical-Surgical Nursing', topic = 'Endocrine Disorders'
  WHERE id = 'dcc0b6e3-3be6-4835-a471-18a5b317b929'; -- Phaeochromocytoma features

UPDATE questions SET paper = 'Paper I', unit = 'Medical-Surgical Nursing', topic = 'Dermatological Disorders'
  WHERE id = '2b3070e4-c4f4-4984-895e-e22bd44ce0b0'; -- Pemphigus management

UPDATE questions SET paper = 'Paper I', unit = 'Medical-Surgical Nursing', topic = 'Gastrointestinal Disorders'
  WHERE id = '0eef7408-75e6-439e-acf7-6d9aec684273'; -- Peptic ulcer surgical indications

-- 2025 KRCHN Paper I (surgical/midwifery/paediatric)
UPDATE questions SET paper = 'Paper I', unit = 'Surgical Nursing', topic = 'Post-Operative Nursing Care'
  WHERE id = '76102203-7c9b-416e-842b-295844353d86'; -- Post-gastrectomy semi-Fowlers

UPDATE questions SET paper = 'Paper I', unit = 'Medical-Surgical Nursing', topic = 'Emergency and Trauma Nursing'
  WHERE id = 'fb8a4775-5e22-46df-bee2-0eaa2bcb11e1'; -- Child head/spinal injury triage RED

-- 2006 KRCHN Midwifery/Paediatrics — Paper I
UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Obstetric Emergencies'
  WHERE id = '0e9ceece-13c6-4cac-b189-c1488dc912b7'; -- Cord prolapse emergency CS

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Antenatal Care'
  WHERE id = '95141ba8-a0c1-47f6-91e6-fb1ca4bfbbc2'; -- MSAFP neural tube defects

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Newborn Care'
  WHERE id = 'fb01d254-bea2-421a-ab61-7b833f31f05b'; -- Normal newborn acrocyanosis

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Obstetric Emergencies'
  WHERE id = 'fc956db3-cf3d-43d2-b135-43681a9d452d'; -- Shoulder dystocia McRoberts

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Labour and Delivery'
  WHERE id = 'c62996bd-f384-4aef-bd09-e771d5580e99'; -- Transitional phase husband bedpan

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Family Planning'
  WHERE id = '42809ef4-0d99-4313-b386-f31fdfb11586'; -- Cervical mucus fertile sign

UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'Newborn and Neonatal Care'
  WHERE id = 'd8f8a085-8f6a-40e4-8e02-57a28d3fb204'; -- Apnoea of prematurity 20 seconds

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Antenatal Assessment'
  WHERE id = 'e8f71dac-8b11-48c8-a36a-c05024825f71'; -- Fundal height 20 weeks umbilicus

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Minor Disorders of Pregnancy'
  WHERE id = '315152e0-f36e-4350-a880-f6a457a5ddc8'; -- Morning sickness noxious odours

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Labour Management'
  WHERE id = 'd30f65c4-3380-4337-9c59-0eb720664f62'; -- 8cm dilated panting short breaths

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Complications of Pregnancy'
  WHERE id = '71ccafe0-90da-4bd6-981e-3e7e638f592c'; -- PIH proteinuria + hypertension

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Postnatal Complications'
  WHERE id = '61df1135-bf76-45aa-ad1e-3751c0566d4c'; -- Puerperal mastitis treatment

-- 2007 KRCHN Obstetric questions — Paper I
UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Minor Disorders of Pregnancy'
  WHERE id = 'aa74880c-b8f1-4a0c-9c00-6ded2a986342'; -- Varicose veins management

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Labour Complications'
  WHERE id = '7d6275b8-b3e6-4505-9c68-068e82a22069'; -- Hypotonic uterine action syntocinon

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Anatomy for Midwifery'
  WHERE id = '77146436-221a-41b6-b094-46b0e42c4347'; -- Well-flexed head diameters

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Antenatal History Taking'
  WHERE id = '114e618a-ccdf-4b07-812b-66014b7dcae4'; -- Past obstetric history i,iv,v

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Anatomy for Midwifery'
  WHERE id = 'f6759d9f-4c01-4dec-b7f0-57e1b3ab9da6'; -- Middle oblique layer living ligatures

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Physiological Changes in Pregnancy'
  WHERE id = 'de25c202-1a0b-415a-ba13-df5aa24bfa1b'; -- 2nd trimester BP falls progesterone

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Nutrition in Pregnancy'
  WHERE id = '728d4bc6-e5fd-41a2-9d09-cba43b1f2a5f'; -- Total weight gain fetus and fat

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Diagnosis of Pregnancy'
  WHERE id = 'e9e5f0cd-6016-4209-986f-e8d002dbabd1'; -- Positive signs of pregnancy EXCEPT

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Minor Disorders of Pregnancy'
  WHERE id = '939cd92f-6acf-4da7-ad28-5aace4f1244b'; -- Minor disorders → major complications

-- 2008 Midwifery/Paediatrics — Paper I
UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Anatomy for Midwifery'
  WHERE id = '1cbd390e-7521-4d4e-8c38-b121a3882240'; -- Uterine muscle fibres increase

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Pelvimetry and Pelvis'
  WHERE id = '0f4903be-5fc0-4954-b25f-75f57dfb699f'; -- Ischial spines narrowest diameter

UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'Neonatal Jaundice'
  WHERE id = '45fa0b29-0435-4bbe-b1af-32a48f38153d'; -- Hyperbilirubinaemia IV dextrose

UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'Neonatal Respiratory Disorders'
  WHERE id = '520162de-b32f-46f6-956d-43b4b1b7c4e0'; -- RDS underdeveloped alveoli

UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'Neonatal Eye Care'
  WHERE id = '131148a7-3582-46a4-b9c0-df677a91a5e9'; -- Ophthalmia neonatorum 1% TEO

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Complications of Pregnancy'
  WHERE id = '1d6ce615-31ed-4a91-aa6b-2faeb971ba58'; -- Blood coagulation disorders DIC

UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'Neonatal Infections'
  WHERE id = 'feb1f5d1-d52b-45c9-b96b-378c143bb493'; -- Omphalitis septicaemia jaundice hepatitis

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Stages of Labour'
  WHERE id = '78aea96a-ace1-4b45-b6c0-58108f1a1aaf'; -- First stage of labour definition

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Labour Assessment'
  WHERE id = '9f3e4fec-2c69-4ab5-9c47-db582517040b'; -- First vaginal examination indications

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Third Stage of Labour'
  WHERE id = '639d8910-e311-46c1-a1cd-65baf43e0fe3'; -- Placental separation signs

-- 2025 KRCHN Paper I (midwifery/paediatric)
UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Pelvimetry and Pelvis'
  WHERE id = '062e8551-f3ab-4d83-9625-ef66435d0c85'; -- Male vs female pelvis

UPDATE questions SET paper = 'Paper I', unit = 'Midwifery', topic = 'Family Planning'
  WHERE id = 'f51fdd37-eca6-40a8-94eb-be8394e0990e'; -- Contraceptive implants Norplant 6 capsules

UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'Neonatal Eye Care'
  WHERE id = '2b700f43-791c-4d1b-aa8f-32d799565d9b'; -- Ophthalmia neonatorum 1% TEO prevention

-- ─── PAPER I: Pharmacology — body actions on drug = pharmacokinetics ─────────
UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Basic Pharmacology Principles'
  WHERE id = '9043ef88-5db6-46c3-91ea-15a0ccee66d5'; -- Actions of body on drug = pharmacokinetics

-- ─── PAPER I: Community health drug for gonorrhoea (Pharmacology/STI tx) ─────
UPDATE questions SET paper = 'Paper I', unit = 'Pharmacology', topic = 'Antimicrobials'
  WHERE id = '4c6d3b49-3c35-4d30-a237-8adb71d64007'; -- WHO group A gonorrhoea ceftriaxone 250mg

-- ─── PAPER I: 2008 severe diarrhoea IV fluids (IMNCI/Paediatric) ─────────────
UPDATE questions SET paper = 'Paper I', unit = 'Paediatric Nursing', topic = 'IMNCI'
  WHERE id = 'a134dc46-bb30-47aa-8ed9-8f496d7cea14'; -- Severe diarrhoea sunken eyes IV fluids

-- ─── PAPER I: Trypanosomiasis vector (Communicable Disease → Paper II) ───────
-- NOTE: Trypanosomiasis vector is Communicable Disease → Paper II
UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Communicable Diseases'
  WHERE id = 'e67ba918-83ea-4b74-8bdb-d4d6fcd826a2'; -- Tsetse fly trypanosomiasis

-- ─── PAPER II: Research & Statistics (2007/2008 sets) ────────────────────────
UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'History of Nursing Research'
  WHERE id = '7d69876c-25e5-4b51-b1fd-db07780ce1a8'; -- First scientific paper Florence Nightingale

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Roles'
  WHERE id = '73c6c777-1ec3-4443-9250-9f963b3b1238'; -- Graduate nurse role in research

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Design'
  WHERE id = 'f444eaea-8174-4c5f-b32c-2aa386d8385d'; -- Hypothesis dependent variable

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Concepts'
  WHERE id = '15df6902-1834-4889-9426-3b81c392eb0a'; -- Theoretical framework Roys adaptation

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Management and Leadership', topic = 'Leadership Theories'
  WHERE id = '2f42944d-2b84-4f90-b6d8-e9e85d8a44ee'; -- Trait leadership theories

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Dissemination'
  WHERE id = 'b00895c1-cd97-44f8-bce3-78e8435ad4eb'; -- Main purpose of publishing research

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Ethics'
  WHERE id = '367233a3-7b70-470d-bba9-0a3e9e8bb103'; -- Research with psychiatric patients

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Education', topic = 'Teaching and Learning Methods'
  WHERE id = '7444870b-3834-4d79-a69a-2120ec35cd1a'; -- Discovery learning approach

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Education', topic = 'Evaluation in Teaching'
  WHERE id = 'c0de556c-d504-4dfc-a7e3-82cf6e583a14'; -- Micro-evaluation

-- Leadership/Management (2008)
UPDATE questions SET paper = 'Paper II', unit = 'Nursing Management and Leadership', topic = 'Leadership Theories'
  WHERE id = 'c90b39b0-38cf-4294-940b-ffb38d9ed173'; -- Transactional leader day-to-day

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Management and Leadership', topic = 'Financial Management'
  WHERE id = '2cf4245f-2028-42f6-bc91-9c5baac54e96'; -- Zero-based budgeting

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Management and Leadership', topic = 'Staff Development'
  WHERE id = 'dc9e7efb-abaa-46d9-bcdb-dab997d7d729'; -- Mentors vs preceptors

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Management and Leadership', topic = 'Delegation'
  WHERE id = '16e5ba6c-2a18-4c46-bb3f-6998b3bedc96'; -- Over-delegation

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Biostatistics'
  WHERE id = '1b3bd664-086f-4a8c-a28d-ab25e8b0e5b7'; -- Categorical variables discrete values

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Publication and Peer Review'
  WHERE id = 'ecda1a13-5f58-4c39-973d-d79a48c95747'; -- Blind reviews double-blind

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Ethics'
  WHERE id = 'c79848fa-36d5-450d-bdd5-13a6831c786e'; -- Process consent qualitative research

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Research Design'
  WHERE id = '32cea38f-1006-48a0-b8db-780558831a71'; -- Random assignment definition

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Evidence-Based Practice'
  WHERE id = '5839512b-2bc6-4a58-8393-34d02f52e80e'; -- Research critique skills utility

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Education', topic = 'Critical Thinking'
  WHERE id = 'b1216e93-b68d-42f6-9421-325d240e15fc'; -- Reflective scepticism

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Education', topic = 'Teaching and Learning Methods'
  WHERE id = '52d150f0-be90-4555-b03b-51cd734ac7e2'; -- Problem-based learning

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Research', topic = 'Measurement and Evaluation'
  WHERE id = '8d285e54-5885-4970-9c51-62291120e9c8'; -- Validity assessment tool

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Education', topic = 'Teaching Methods'
  WHERE id = '6bf2c287-a322-485f-ac25-ac9de34fc549'; -- Demonstration psychomotor skills

UPDATE questions SET paper = 'Paper II', unit = 'Nursing Management and Leadership', topic = 'Organisational Structure'
  WHERE id = '4b65f69a-351e-4779-ab92-e4f5b262ed70'; -- Scalar chain decision-making hierarchy

-- ─── PAPER II: Community Health (2007 KRCHN) ─────────────────────────────────
UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Communicable Diseases'
  WHERE id = '83b0d6da-c419-402b-bbdc-f7b6381c43c4'; -- Poliomyelitis clinical types

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Family Planning'
  WHERE id = '314ecfe5-1690-4e43-a08f-d0b4ee27309d'; -- Spacing methods family planning

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Environmental Health'
  WHERE id = 'f25f4fee-5162-46d4-96e7-42ee39289569'; -- Water-based diseases aquatic host

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Nutrition'
  WHERE id = 'e6e5f842-12ce-4d56-9f20-2e3aa7c9d43a'; -- Marasmus no hepatomegaly

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Maternal and Child Health'
  WHERE id = '1669faab-4ecb-4598-9aff-06a700b93975'; -- Focused ANC birth preparedness

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Epidemiology'
  WHERE id = 'e3ac081f-a3c8-4030-a54d-2e880b6eaca5'; -- Disease incidence person-years

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Demography'
  WHERE id = 'c37bf03a-5d7c-4a13-af6d-72166603a22d'; -- Kenya demographic trends life expectancy

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Family Planning'
  WHERE id = 'e077c192-dc6b-4224-ba37-47f1a2ede324'; -- FP HIV+ client rifampicin interaction

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'HIV/AIDS Care'
  WHERE id = '466ba08f-dac8-449c-85a2-b4edb93ae347'; -- HIV family de-stigmatisation

-- Mental Health (2007 KRCHN)
UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Loss and Grief'
  WHERE id = '25fbde06-c517-45db-a8f7-681346f29cbf'; -- Grief resolution love-hate association

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Growth and Development'
  WHERE id = 'a96ba434-bf68-4508-9517-2331109678aa'; -- Freudian anal stage toilet training

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Therapeutic Communication'
  WHERE id = 'ab74c9ce-02b3-4884-989b-65290f77847f'; -- Patient nurse open-ended therapeutic communication

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Substance Use Disorders'
  WHERE id = '7dbe294e-3c19-4ecb-82f5-a7d814b0f6bb'; -- Amnestic syndrome sedative abuse

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Child and Adolescent Mental Health'
  WHERE id = '7861809a-1412-4e3b-bfb8-2830d8449ce3'; -- ADHD CNS stimulants methylphenidate

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Psychopharmacology'
  WHERE id = '7998948b-3162-41f9-a4e4-1e1ddc50da29'; -- Benzhexol Artane 15mg max dose

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Sexual Disorders'
  WHERE id = '76e90d8c-e36e-4fd0-a9a4-1d49e3cd1a19'; -- Exhibitionism stress free time

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Family Psychiatry'
  WHERE id = '65467b1e-6c81-48b7-9787-b8e952478a79'; -- Children divorced parents 2 years

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Gender-Based Violence'
  WHERE id = '1dcc1d2a-6f56-4aa9-af84-c812d0b6b2fa'; -- Mr Moto domestic violence background

-- ─── PAPER II: Community Health (2008 KRCHN) ─────────────────────────────────
UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Primary Health Care'
  WHERE id = '2e0a5937-fb6e-49d1-af73-0c0b99b2bca7'; -- PHC community participation Alma Ata

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Epidemiology'
  WHERE id = '950bb57f-b6bc-4745-8e71-d13e38d57e87'; -- Descriptive epidemiology demographic data

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Communicable Diseases'
  WHERE id = 'a64f1a99-9403-4625-9aa8-56adcfa20df6'; -- Endemic malaria LLINs health education

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'The Home Visit'
  WHERE id = 'f9dbf394-0c9c-44ff-b057-4a2458d3fae6'; -- Home visit preparatory phase referral

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Communicable Diseases'
  WHERE id = '5dab8dfa-3b60-413e-bdce-9c87b7554346'; -- Contact bacterial disease impetigo

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Nutrition'
  WHERE id = '80310c1a-cf8a-47f9-8005-c6654a65e429'; -- Calorie needs children 100 kcal/kg/day

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Communicable Diseases'
  WHERE id = 'f3e578e6-134f-456e-92ac-08bfb021f67b'; -- Tinea capitis ringworm scalp

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Occupational and Environmental Health'
  WHERE id = '712ebb10-1f07-4192-a7b3-e041b62ade72'; -- Agricultural hazards zoonotic toxic

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Health Systems'
  WHERE id = '3299e47c-fe53-48b4-9b40-d79c08ab7200'; -- Bamako Initiative WHO UNICEF

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Occupational and Environmental Health'
  WHERE id = '952b7786-7bbe-4313-bfaf-4a91fac9eff8'; -- Safe noise 85 dB

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Occupational Health Nursing'
  WHERE id = '4837984d-49c4-487c-9d7c-167c13e4e818'; -- Occupational health nurse clinician administrator

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Family Planning'
  WHERE id = 'c6e7abc4-c102-42da-af53-547d672033c3'; -- Drugs reducing contraceptive efficacy phenytoin griseofulvin

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Gerontological Nursing'
  WHERE id = 'f28f8ef7-3406-4b0d-aa9a-7d9b3986cdd3'; -- Elderly health improvement home safety

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Epidemiology'
  WHERE id = 'e45658d9-0751-4af3-ac3e-a876137d3d21'; -- Prevalence rate old and new cases

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Family Health'
  WHERE id = 'bb0147b8-840c-4ece-912d-fdd8578dbc88'; -- Beginning family developmental tasks Duvall

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Roles of the CHN'
  WHERE id = 'fad2469a-e382-44d2-bdc3-40c0d76c9133'; -- Indirect CHN services record keeping

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Environmental Health'
  WHERE id = 'f0c382c4-a88f-41c8-94f5-54390fd0513a'; -- Biological environment water food

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Community as a System'
  WHERE id = '91a418bf-6074-48b1-bf86-8536de1f6c80'; -- Major community service system economic

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Community Diagnosis'
  WHERE id = '756dbe70-a002-4eda-9d74-c4e1a06d71f6'; -- Demographic parameters distribution morbidity

UPDATE questions SET paper = 'Paper II', unit = 'Community Health Nursing', topic = 'Communicable Diseases'
  WHERE id = '82359475-5274-4c8e-89d1-ef8eee5b7eb3'; -- Vector-borne diseases plague leishmaniasis

-- Mental Health (2008 KRCHN Paper IV)
UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Psychotic Disorders'
  WHERE id = 'a8e53717-9fe7-4d72-be06-ab93977b34c6'; -- Paranoid schizophrenia persecutory delusions

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Perinatal Mental Health'
  WHERE id = '847ca271-1b67-429c-b2f4-916e076369da'; -- Postpartum blues 3rd 4th day

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Neurological Conditions in Psychiatry'
  WHERE id = '1adc0a23-14fe-46ee-8ba7-80e987ec79eb'; -- Temporal lobe epilepsy psychological features

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Behaviour Therapy'
  WHERE id = '20381035-cf7b-4016-a405-6c8338088fa9'; -- Reciprocal inhibition behaviour therapy

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Sexual Disorders'
  WHERE id = '6205b801-9e49-4c7a-8744-283cc724940a'; -- Sensate focus sexual aversion disorder

UPDATE questions SET paper = 'Paper II', unit = 'Mental Health Nursing', topic = 'Substance Use Disorders'
  WHERE id = 'aeaef1f8-53d4-4d95-a4c0-3fe3a8d8da74'; -- Co-dependence family chemically dependent

-- ─── VERIFY: count should now be 0 null paper KRCHN ─────────────────────────
-- (This is a comment — run the audit script after to confirm)
