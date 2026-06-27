-- =============================================================================
-- Flashcard Batch 3 — NCK Exam Prep
-- =============================================================================
-- New decks covering Midwifery and Anatomy & Physiology (KRCHN Paper I)
-- All cards: original NCK-targeted educational content
-- =============================================================================

-- ─── Deck 11: Midwifery Essentials — KRCHN Paper I ───────────────────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a2000000-0000-0000-0000-000000000002',
  'Midwifery Essentials',
  'Antenatal care, normal labour, obstetric emergencies and postpartum care',
  'KRCHN',
  'Midwifery',
  15
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a2000000-0000-0000-0000-000000000002',
 'What is the definition of postpartum haemorrhage (PPH)?',
 'PPH is defined as blood loss of 500 mL or more within 24 hours after a vaginal birth, or 1000 mL or more after a caesarean section. Primary PPH occurs within the first 24 hours; secondary PPH occurs from 24 hours up to 6 weeks postpartum. The most common cause is uterine atony. Ref: WHO/MOH Kenya guidelines.',
 '≥500 mL vaginal · ≥1000 mL CS · Primary <24h',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What are the four ''T''s that cause postpartum haemorrhage?',
 'The causes of PPH are categorised into 4 Ts: Tone (uterine atony - most common), Tissue (retained placenta or clots), Trauma (vaginal, cervical, or uterine lacerations), and Thrombin (coagulopathy). Initial management focuses on massaging the fundus and administering uterotonics to address Tone. Ref: Obstetric emergencies.',
 'Tone · Tissue · Trauma · Thrombin',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'Describe the management of eclampsia (a convulsion in a pregnant woman).',
 'Eclampsia is an obstetric emergency. Immediate action: ABCs, position on left side to prevent aspiration and improve uteroplacental blood flow, give Magnesium Sulphate (loading dose 4g IV over 5-15 mins, followed by 10g IM or IV maintenance) to stop convulsions. Administer antihypertensives (e.g., Hydralazine) if BP >160/110. Plan for delivery once stabilised. Ref: MOH Kenya Emergency Obstetric Care.',
 'Left lateral · Magnesium Sulphate · Control BP · Deliver',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What are the signs of placental separation in the third stage of labour?',
 'Classic signs of placental separation include: (1) A sudden gush of blood from the vagina. (2) Lengthening of the umbilical cord at the vulva. (3) The uterus becomes globular and firmer (hard mass). (4) The uterus rises in the abdomen. Active management (AMTSL) is standard practice to prevent PPH. Ref: Midwifery practice.',
 'Gush of blood · Cord lengthens · Globular uterus · Uterus rises',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is Active Management of the Third Stage of Labour (AMTSL)?',
 'AMTSL involves three interventions to prevent PPH: (1) Administration of a uterotonic (e.g., IM Oxytocin 10 IU) within 1 minute of birth. (2) Controlled cord traction with counter-traction on the uterus to deliver the placenta. (3) Uterine massage immediately after placental delivery to ensure it is contracted. Ref: WHO/MOH Kenya AMTSL guidelines.',
 'Oxytocin 10 IU · Controlled cord traction · Uterine massage',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is the diagnostic criteria for pre-eclampsia?',
 'Pre-eclampsia is diagnosed when a pregnant woman (usually >20 weeks gestation) presents with new-onset hypertension (BP ≥140/90 mmHg on two occasions at least 4 hours apart) AND proteinuria (≥300 mg/24 hours or ≥1+ on dipstick). Severe pre-eclampsia involves BP ≥160/110 mmHg or signs of end-organ damage. Ref: Obstetric complications.',
 'BP ≥140/90 + Proteinuria (>20 weeks)',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'Calculate the Estimated Date of Delivery (EDD) using Naegele’s rule for an LMP of 10th May 2026.',
 'Naegele’s rule: Add 7 days to the first day of the Last Menstrual Period (LMP), then subtract 3 months (and add 1 year if necessary). LMP = 10 May 2026. +7 days = 17. May (month 5) - 3 months = February (month 2) of the next year. EDD = 17th February 2027. Ref: Antenatal care.',
 '+7 days, -3 months (LMP + 9 months + 7 days)',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is the normal fetal heart rate (FHR) range and when should it be measured during labour?',
 'The normal FHR is 110–160 beats per minute. Tachycardia >160; Bradycardia <110. In the first stage of labour, listen to the FHR every 30 minutes immediately after a contraction for a full minute. In the second stage, listen every 5 minutes. Decelerations, especially late decelerations, indicate fetal distress. Ref: Partograph guidelines.',
 '110–160 bpm · Measure post-contraction',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'Describe the mechanism of normal labour (cardinal movements).',
 'The cardinal movements of the fetal head during normal birth (LOA position): (1) Engagement (2) Descent (3) Flexion (4) Internal rotation (to bring the sagittal suture into the anteroposterior diameter) (5) Extension (delivery of the head) (6) Restitution (untwisting of the neck) (7) External rotation (shoulders rotating into the AP diameter) (8) Expulsion (delivery of shoulders and body). Ref: Midwifery.',
 'Engagement → Descent → Flexion → Internal rotation → Extension → Restitution → External rotation → Expulsion',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What are the components of the APGAR score?',
 'The APGAR score evaluates a newborn at 1 and 5 minutes after birth. Five components (0-2 points each): Appearance (skin colour), Pulse (heart rate), Grimace (reflex irritability), Activity (muscle tone), and Respiration (breathing effort). Score 7-10 is normal; 4-6 indicates moderate depression; 0-3 indicates severe asphyxia requiring immediate resuscitation. Ref: Neonatal care.',
 'Appearance · Pulse · Grimace · Activity · Respiration',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is the presentation of placenta praevia vs placental abruption?',
 'Placenta praevia presents as PAINLESS, bright red vaginal bleeding in the 3rd trimester. Abdomen is soft and non-tender. DO NOT perform digital vaginal exam. Placental abruption presents as PAINFUL, dark red vaginal bleeding (or concealed), with a tense, woody, tender uterus and signs of fetal distress. Both are emergencies. Ref: Antepartum haemorrhage.',
 'Praevia = Painless, bright red, soft · Abruption = Painful, dark, woody',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is the Bishop score and what is its purpose?',
 'The Bishop score is used to assess cervical readiness (favourability) for the induction of labour. It evaluates 5 parameters: Cervical dilation, effacement, consistency, position, and fetal station. A score of 8 or more indicates a favourable cervix (induction likely successful). A score <6 indicates an unfavourable cervix requiring cervical ripening (e.g., misoprostol). Ref: Obstetric protocols.',
 'Assess cervical readiness for induction (Dilation, Effacement, Station, Consistency, Position)',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'How is a prolapsed umbilical cord managed?',
 'Cord prolapse is an acute obstetric emergency where the cord descends before the presenting part. Immediate actions: Call for help! Relieve pressure on the cord by elevating the fetal presenting part manually (keep hand in vagina). Position mother in knee-chest or exaggerated Sims position. Do NOT push the cord back in. Administer oxygen. Prepare for emergency Caesarean section. Ref: Emergency Obstetric Care.',
 'Relieve cord pressure · Knee-chest position · Emergency CS',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is the action and side effect of Misoprostol in obstetrics?',
 'Misoprostol (a prostaglandin E1 analogue) is used for medical abortion, cervical ripening for induction of labour, and prevention/treatment of postpartum haemorrhage (PPH). Common side effects include shivering, hyperpyrexia (fever), diarrhoea, and nausea. Caution: can cause uterine hyperstimulation and rupture. Ref: Essential medicines in obstetrics.',
 'Action: Ripens cervix, contracts uterus · SE: Shivering, fever, diarrhoea',
 'KRCHN', 'Midwifery'),

('a2000000-0000-0000-0000-000000000002',
 'What is the partograph and when do you cross the action line?',
 'The partograph is a graphical record of the progress of labour and maternal/fetal condition. It has an Alert line and an Action line (4 hours to the right of the alert line). If cervical dilation crosses the Alert line, labour is slower than normal. If it crosses the Action line, immediate intervention is required (e.g., artificial rupture of membranes, oxytocin augmentation, or Caesarean section). Ref: WHO Partograph guidelines.',
 'Action line crossed = immediate intervention required',
 'KRCHN', 'Midwifery');

-- ─── Deck 12: Anatomy & Physiology Quick Review — KRCHN Paper I ──────────────
INSERT INTO flashcard_decks (id, name, description, cadre, unit, card_count)
VALUES (
  'a2000000-0000-0000-0000-000000000003',
  'Anatomy & Physiology Quick Review',
  'Essential systems, normal values, and physiological processes for NCK Paper I',
  'KRCHN',
  'Anatomy & Physiology',
  15
) ON CONFLICT (id) DO NOTHING;

INSERT INTO flashcards (deck_id, front_text, back_text, back_highlight, cadre, unit) VALUES

('a2000000-0000-0000-0000-000000000003',
 'What is the normal pathway of electrical conduction in the heart?',
 'The cardiac conduction system coordinates the heart beat. The pathway is: Sinoatrial (SA) Node (the pacemaker) → Atrioventricular (AV) Node (delays the impulse to allow ventricular filling) → Bundle of His → Right and Left Bundle Branches → Purkinje fibers (causes ventricular contraction). Ref: Cardiovascular physiology.',
 'SA Node → AV Node → Bundle of His → Purkinje fibers',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'Which cranial nerve is responsible for facial expression and which for facial sensation?',
 'Cranial Nerve VII (Facial Nerve) controls the muscles of facial expression (motor) and taste on the anterior 2/3 of the tongue. Cranial Nerve V (Trigeminal Nerve) is responsible for facial sensation (sensory) and the muscles of mastication (motor). Ref: Neuroanatomy.',
 'Facial expression = CN VII (Facial) · Facial sensation = CN V (Trigeminal)',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What is the function of the loop of Henle in the nephron?',
 'The loop of Henle creates a concentration gradient in the medulla of the kidney through a countercurrent multiplier system. The descending limb is permeable to water but not salts, while the ascending limb is permeable to salts but not water. This mechanism allows the collecting ducts to concentrate urine and conserve water when needed (under the influence of ADH). Ref: Renal physiology.',
 'Creates medullary concentration gradient to conserve water',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What are the main functions of the liver?',
 'The liver has multiple vital functions: (1) Metabolism of carbohydrates (glycogenesis, gluconeogenesis), proteins (deamination, urea formation), and fats. (2) Synthesis of plasma proteins (albumin, clotting factors). (3) Detoxification of drugs and toxins. (4) Storage of vitamins (A, D, E, K, B12), iron, and glycogen. (5) Production and secretion of bile (for fat emulsification). Ref: Gastrointestinal physiology.',
 'Metabolism · Detoxification · Protein synthesis · Bile production · Storage',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What hormones are secreted by the posterior pituitary gland?',
 'The posterior pituitary gland (neurohypophysis) does not synthesize hormones itself; it stores and secretes two hormones produced by the hypothalamus: (1) Antidiuretic Hormone (ADH or Vasopressin) — regulates water retention by the kidneys. (2) Oxytocin — stimulates uterine contractions during labour and milk ejection (let-down reflex) during breastfeeding. Ref: Endocrine physiology.',
 'ADH (Vasopressin) and Oxytocin',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'Explain the difference between sympathetic and parasympathetic nervous system actions.',
 'Sympathetic nervous system mediates the "fight or flight" response: increases heart rate, dilates pupils, dilates bronchioles, inhibits digestion, stimulates glycogenolysis. Neurotransmitters: Noradrenaline/Adrenaline. Parasympathetic nervous system mediates the "rest and digest" response: decreases heart rate, constricts pupils, stimulates digestion, promotes urination/defecation. Neurotransmitter: Acetylcholine. Ref: Autonomic nervous system.',
 'Sympathetic = Fight or flight · Parasympathetic = Rest and digest',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What is the role of surfactant in the lungs?',
 'Surfactant is a lipoprotein complex produced by Type II alveolar cells. Its main function is to reduce the surface tension of the fluid lining the alveoli, preventing alveolar collapse (atelectasis) during expiration and reducing the work of breathing. Lack of surfactant in premature infants causes Respiratory Distress Syndrome (RDS). Ref: Respiratory physiology.',
 'Reduces surface tension to prevent alveolar collapse',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'Where does fertilization of the ovum typically occur?',
 'Fertilization normally occurs in the ampulla, which is the widest part of the Fallopian tube (uterine tube). The fertilized ovum (zygote) then travels down the tube to implant in the endometrium of the uterus about 6-7 days later. Ectopic pregnancy often occurs if implantation happens in the tube. Ref: Reproductive anatomy.',
 'Ampulla of the Fallopian tube',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What are the normal ranges for blood pH, PaCO2, and HCO3?',
 'Normal arterial blood gas (ABG) values: pH = 7.35 – 7.45. PaCO2 (carbon dioxide, respiratory component) = 35 – 45 mmHg. HCO3 (bicarbonate, metabolic component) = 22 – 26 mEq/L. PaO2 (oxygen) = 80 – 100 mmHg. Deviations indicate respiratory or metabolic acidosis/alkalosis. Ref: Acid-base balance.',
 'pH: 7.35-7.45 · PaCO2: 35-45 · HCO3: 22-26',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What is the function of the cerebellum?',
 'The cerebellum (located at the back of the brain, under the cerebrum) is responsible for coordinating voluntary muscle movements, maintaining posture, and regulating balance and equilibrium. Lesions to the cerebellum cause ataxia, intention tremor, and lack of coordination (dysmetria). Ref: Neurophysiology.',
 'Coordination of movement · Posture · Balance',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'How is oxygen transported in the blood?',
 'About 97-98% of oxygen in the blood is transported bound to haemoglobin (Hb) inside red blood cells, forming oxyhaemoglobin. A very small amount (2-3%) is dissolved directly in the blood plasma (this dissolved portion determines the PaO2). Ref: Respiratory physiology.',
 '97% bound to haemoglobin (oxyhaemoglobin) · 3% dissolved in plasma',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What are the main layers of the skin from superficial to deep?',
 'The skin has three main layers: (1) Epidermis: outermost, avascular layer containing keratinocytes and melanocytes. (2) Dermis: middle layer containing blood vessels, nerves, hair follicles, sweat glands, and collagen. (3) Hypodermis (subcutaneous layer): deepest layer composed of adipose (fat) tissue and connective tissue, which insulates and cushions. Ref: Integumentary system.',
 'Epidermis → Dermis → Hypodermis (Subcutaneous)',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What hormone regulates blood calcium levels when they drop too low?',
 'Parathyroid hormone (PTH), secreted by the parathyroid glands, is released when blood calcium levels fall. It raises calcium by: (1) Stimulating osteoclasts to release calcium from bone. (2) Increasing calcium reabsorption in the kidneys. (3) Promoting active vitamin D formation, which increases intestinal calcium absorption. Calcitonin does the opposite (lowers calcium). Ref: Endocrine physiology.',
 'Parathyroid hormone (PTH) raises blood calcium',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'Which blood type is the universal donor and which is the universal recipient?',
 'Blood type O negative (O-) is the universal donor because it lacks A, B, and Rh antigens, so it will not trigger an immune response in the recipient. Blood type AB positive (AB+) is the universal recipient because it has no anti-A, anti-B, or anti-Rh antibodies in the plasma, so it can receive any blood type safely. Ref: Haematology.',
 'Universal donor: O negative · Universal recipient: AB positive',
 'KRCHN', 'Anatomy & Physiology'),

('a2000000-0000-0000-0000-000000000003',
 'What is the primary function of the small intestine and its three parts?',
 'The small intestine is the primary site of chemical digestion and nutrient absorption. Its three parts (from proximal to distal) are: (1) Duodenum (receives chyme, bile, and pancreatic enzymes). (2) Jejunum (main site of nutrient absorption). (3) Ileum (absorbs vitamin B12 and bile salts, connects to large intestine at ileocecal valve). Ref: Gastrointestinal anatomy.',
 'Function: Digestion & Absorption. Parts: Duodenum → Jejunum → Ileum',
 'KRCHN', 'Anatomy & Physiology');
