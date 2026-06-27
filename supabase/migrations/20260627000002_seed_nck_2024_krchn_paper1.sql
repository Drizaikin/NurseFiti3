-- SEED: NCK 2024 — KRCHN Paper I (Medical-Surgical, Paediatrics, Midwifery)
-- exam_year: 2024 | cadre: KRCHN | paper: 'Paper I'
-- Dedup: ON CONFLICT (stem, cadre) DO NOTHING
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Infection Prevention and Control',
  'Which of the following roommates would be best for the client newly admitted with gastric resection?',
  'A client with Crohn''s disease',
  'A client with pneumonia',
  'A client with gastritis',
  'A client with phlebitis',
  'D',
  'A fresh post-operative client is highly susceptible to infection. The safest roommate poses the least cross-infection risk. Phlebitis (vein inflammation) is non-infectious. Pneumonia is a respiratory infection transmitted by droplets — contraindicated. Crohn''s disease involves bowel inflammation/potential enteric organisms. Gastritis is not directly infectious but shares GI concerns. The client with phlebitis is the best choice. Ref: IPC standard precautions; Brunner & Suddarth.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Breast Assessment',
  'The nurse is preparing a client for mammography. To prepare the client for a mammogram, the nurse should tell the client:',
  'To restrict her fat intake for 1 week before the test',
  'To omit creams, powders, or deodorants before the exam',
  'That mammography replaces the need for self-breast exams',
  'That mammography requires a higher dose of radiation than x-rays',
  'B',
  'Creams, powders, deodorants and antiperspirants contain metallic particles (aluminium, zinc) that appear as artefacts on the mammogram, mimicking calcifications and obscuring pathology. They must be omitted on the day of the examination. Mammography does not replace breast self-examination or clinical breast examination. It uses low-dose radiation (much less than a chest X-ray). No dietary restriction is required. Ref: Brunner & Suddarth — breast assessment and diagnostic imaging.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Jaundice',
  'The nurse is assigned to care for an infant with physiologic jaundice. Which action by the nurse would facilitate elimination of the bilirubin?',
  'Increasing the infant''s fluid intake',
  'Maintaining the infant''s body temperature at 98.6 degrees F',
  'Minimizing tactile stimulation',
  'Decreasing caloric intake',
  'A',
  'Adequate hydration promotes bilirubin excretion through the GI tract (stool) and kidneys (urine). Increasing fluid intake (breastfeeding on demand or supplemental feeds) reduces enterohepatic circulation of bilirubin and enhances its elimination. Maintaining temperature and minimising stimulation do not directly facilitate bilirubin excretion. Decreasing caloric intake worsens jaundice by reducing gut motility and increasing enterohepatic recycling. Ref: MOH Kenya Basic Paediatric Protocols — neonatal jaundice; phototherapy guidelines.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Pharmacology', 'Routes of Drug Administration',
  'The nurse has an order for medication to be administered intrathecally. The nurse is aware that medications will be administered by which method?',
  'Intravenously',
  'Rectally',
  'Intramuscularly',
  'Into the cerebrospinal fluid',
  'D',
  'Intrathecal (spinal) administration means injection directly into the subarachnoid space, where the medication mixes with cerebrospinal fluid (CSF). This route is used for spinal anaesthesia, intrathecal chemotherapy and spinal analgesia. It bypasses the blood-brain barrier, achieving high drug concentrations in the CNS. Ref: Pharmacology — routes of drug administration; Brunner & Suddarth.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Post-Operative Wound Care',
  'The client is admitted to the unit after a cholecystectomy. Montgomery straps are utilized with this client. The nurse is aware that Montgomery straps are utilized on this client because:',
  'The client is at risk for evisceration',
  'The client will require frequent dressing changes',
  'The straps provide support for drains that are inserted into the incision',
  'No sutures or clips are used to secure the incision',
  'B',
  'Montgomery straps (tie tapes) are adhesive strips with ties that are applied to the skin on either side of a wound. They allow the dressing to be changed frequently without repeatedly removing and reapplying adhesive tape — preventing skin breakdown from tape trauma. They are indicated when frequent dressing changes are anticipated, such as in infected or draining wounds. They do not prevent evisceration or support drains. Ref: Brunner & Suddarth — wound care/dressing techniques.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
  'A client with pancreatitis has been transferred to the intensive care unit. Which order would the nurse anticipate?',
  'Blood pressure every 15 minutes',
  'Insertion of a Levine tube',
  'Cardiac monitoring',
  'Dressing changes two times per day',
  'B',
  'In acute pancreatitis, the pancreas must be rested completely. Nasogastric (Levine tube) decompression with NPO status reduces pancreatic enzyme secretion (by eliminating the gastric acid stimulus for CCK release), relieves nausea/vomiting and abdominal distension. This is the anticipated standard order on ICU admission for acute pancreatitis. Continuous BP monitoring and cardiac monitoring are supportive but the NG tube is the specific therapeutic priority. Ref: Brunner & Suddarth — acute pancreatitis management.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Liver Disorders',
  'The nurse is caring for a client with a diagnosis of hepatitis who is experiencing pruritis. Which would be the most appropriate nursing intervention?',
  'Suggest that the client take warm showers two times per day',
  'Add baby oil to the client''s bath water',
  'Apply powder to the client''s skin',
  'Suggest a hot-water rinse after bathing',
  'B',
  'Pruritus in hepatitis results from bile salt deposition in the skin. Management includes keeping the skin moist to relieve dryness and itching: adding a bath emollient (baby oil) to the bath water provides lubrication without irritation. Hot water causes vasodilation and worsens itching. Warm showers twice daily increase skin dryness. Powder further dries skin and can cause irritation. Ref: Brunner & Suddarth — liver disorders/pruritus management.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Infection Prevention and Control',
  'The nurse recognizes that which of the following would be most appropriate to wear when providing direct care to a client with a cough?',
  'Mask',
  'Gown',
  'Gloves',
  'Shoe covers',
  'A',
  'A client with a cough transmits infection primarily via respiratory droplets (large droplets > 5 microns) or potentially airborne particles. A surgical/medical mask (or respirator for airborne pathogens) placed on the nurse is the most appropriate PPE for protecting against respiratory transmission when providing direct care. Gloves protect against contact transmission but not droplet/airborne. A gown protects against splashes to clothing. Ref: IPC — transmission-based precautions; MOH Kenya IPC guidelines; WHO standard precautions.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolyte Balance',
  'The nurse is obtaining a history on an 80-year-old client. Which statement made by the client might indicate a potential for fluid and electrolyte imbalance?',
  'My skin is always so dry',
  'I often use laxatives',
  'I have always liked to drink a lot of ice tea',
  'I sometimes have a problem with dribbling urine',
  'B',
  'Frequent laxative use causes loss of water, potassium, sodium and other electrolytes through excessive stool output, predisposing the elderly client to hypovolaemia, hypokalaemia and metabolic alkalosis. This is especially concerning in the elderly, who have reduced physiological reserves. Dry skin is a normal finding of ageing. Iced tea provides hydration. Urinary dribbling (stress incontinence) does not directly cause electrolyte imbalance. Ref: Brunner & Suddarth — fluid and electrolyte balance; geriatric nursing.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolyte Balance',
  'A client is admitted to the acute care unit. Initial laboratory values reveal serum sodium of 170 meq/L. What behavior changes would be most common for this client?',
  'Anger',
  'Mania',
  'Depression',
  'Psychosis',
  'B',
  'Severe hypernatraemia (Na+ 170 mEq/L; normal 135–145 mEq/L) causes neurological excitability due to cellular dehydration of brain neurons. Clinically this presents as agitation, restlessness, manic-type behaviour, irritability and, in severe cases, seizures, coma and death. Depression and psychosis are not the characteristic acute neurological manifestations of hypernatraemia. Ref: Brunner & Suddarth — hypernatraemia/fluid and electrolytes.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
  'When assessing a client for risk of hyperphosphatemia, which piece of information is most important for the nurse to obtain?',
  'A history of radiation treatment in the neck region',
  'Any history of recent orthopedic surgery',
  'A history of minimal physical activity',
  'A history of the client''s food intake',
  'A',
  'Radiation to the neck region can damage the parathyroid glands, leading to hypoparathyroidism. Parathyroid hormone (PTH) normally promotes phosphate excretion by the kidneys; deficient PTH causes phosphate retention (hyperphosphataemia) and hypocalcaemia. This is the most direct cause of hyperphosphataemia in this clinical context. Recent orthopaedic surgery and diet are less specific predictors. Ref: Brunner & Suddarth — parathyroid disorders/electrolyte balance.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Informed Consent',
  'The nurse on the 3-11 shift is assessing the chart of a client with an abdominal aneurysm scheduled for surgery in the morning and finds that the consent form has been signed, but the client is unclear about the surgery and possible complications. Which is the most appropriate action?',
  'Call the surgeon and ask him or her to see the client to clarify the information',
  'Explain the procedure and complications to the client',
  'Check in the physician''s progress notes to see if understanding has been documented',
  'Check with the client''s family to see if they understand the procedure fully',
  'A',
  'Informed consent is the legal and ethical responsibility of the surgeon/physician performing the procedure — they must ensure the patient understands the nature, risks, benefits and alternatives. If the client is unclear after signing, the nurse must notify the surgeon to return and clarify the information before proceeding. The nurse may witness consent but may not provide the clinical information. Explaining the procedure independently is outside the nurse''s role in this context. Ref: Professional ethics and law — informed consent; Brunner & Suddarth.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Peri-Operative Nursing',
  'The nurse is preparing a client for surgery. Which item is most important to remove before sending the client to surgery?',
  'Hearing aid',
  'Contact lenses',
  'Wedding ring',
  'Artificial eye',
  'B',
  'Contact lenses must be removed before surgery because general anaesthesia abolishes the blink reflex and reduces tear production, causing corneal drying and potential abrasion/ulceration if lenses remain in situ. Hearing aids may be left in during local/regional procedures if communication is needed. A wedding ring is usually taped. An artificial eye should be noted in documentation but its removal is less urgent than contact lenses. Ref: Peri-operative nursing — pre-operative preparation; Brunner & Suddarth.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Post-Operative Complications',
  'A client is 2 days post-operative colon resection. After a coughing episode, the client''s wound eviscerates. Which nursing action is most appropriate?',
  'Reinsert the protruding organ and cover with 4x4s',
  'Cover the wound with a sterile 4x4 and ABD dressing',
  'Cover the wound with a sterile saline-soaked dressing',
  'Apply an abdominal binder and manual pressure to the wound',
  'C',
  'Evisceration (protrusion of abdominal viscera through the wound) requires: covering the exposed organs immediately with a sterile saline-soaked dressing to keep them moist and prevent desiccation; positioning the patient supine with knees flexed to reduce abdominal tension; notifying the surgeon for emergency return to theatre. The organ must NEVER be reinserted (contamination risk). Dry dressings desiccate exposed bowel. Manual pressure and abdominal binders are contraindicated. Ref: Brunner & Suddarth — post-operative wound complications.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
  'The nurse is caring for a client with a malignancy. The classification of the primary tumor is Tis. The nurse should plan care for a tumor:',
  'That cannot be assessed',
  'That is in situ',
  'With increasing lymph node involvement',
  'With distant metastasis',
  'B',
  'In the TNM (Tumour-Node-Metastasis) staging system: Tis = tumour in situ (confined entirely to the epithelium of origin, no invasion through the basement membrane). T0 = no evidence of primary tumour. TX = cannot be assessed. N categories describe lymph node involvement. M1 = distant metastasis. Tis carries the best prognosis as it is pre-invasive. Ref: Brunner & Suddarth — oncology; TNM classification.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Diagnostic Procedures',
  'A client with cancer is to undergo an intravenous pyelogram. The nurse should:',
  'Force fluids 24 hours before the procedure',
  'Ask the client to void immediately before the study',
  'Hold medication that affects the central nervous system for 12 hours pre- and post-test',
  'Cover the client''s reproductive organs with an x-ray shield',
  'B',
  'An intravenous pyelogram (IVP) uses contrast dye injected IV to visualise the urinary tract. The client should void immediately before the procedure so the bladder is empty for clear imaging of the ureters and bladder. The nurse also assesses for iodine/contrast allergy. Forcing fluids dilutes contrast. CNS medications are not routinely held. Gonadal shielding is not standard in IVP (though ALARA applies). Ref: Brunner & Suddarth — urological diagnostics/IVP preparation.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Trauma',
  'A client arrives in the emergency room with a possible fractured femur. The nurse should anticipate an order for:',
  'Trendelenburg position',
  'Ice to the entire extremity',
  'Buck''s traction',
  'An abduction pillow',
  'C',
  'Buck''s skin traction is the standard pre-operative management for fractured femur: it immobilises the fracture, reduces muscle spasm, relieves pain and maintains alignment while awaiting surgery. Trendelenburg position is for shock/venous procedures, not fractures. Ice is applied locally to a specific swollen area, not the entire extremity. Abduction pillows are used post-hip replacement surgery. Ref: Brunner & Suddarth — musculoskeletal trauma/fracture management.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Haematological Disorders',
  'The nurse is performing an assessment on a client with possible pernicious anemia. Which data would support this diagnosis?',
  'A weight loss of 10 pounds in 2 weeks',
  'Complaints of numbness and tingling in the extremities',
  'A red, beefy tongue',
  'A hemoglobin level of 12.0 gm/dL',
  'B',
  'Pernicious anaemia (vitamin B12 deficiency from intrinsic factor deficiency) is distinguished from other anaemias by its neurological manifestations: numbness, tingling and paraesthesia in the extremities due to posterior column degeneration (subacute combined degeneration of the spinal cord). A red beefy tongue (glossitis) also occurs but is not unique to B12 deficiency. Weight loss is non-specific. A Hgb of 12.0 g/dL is borderline low but non-specific. The neurological finding is the most specific for pernicious anaemia. Ref: Brunner & Suddarth — haematological disorders.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Renal Diagnostics',
  'A client with suspected renal disease is to undergo a renal biopsy. The nurse plans to include which statement in the teaching session?',
  'You will be sitting for the examination procedure',
  'Portions of the procedure will cause pain or discomfort',
  'You will be asleep during the procedure',
  'You will not be able to drink fluids for 24 hours following the study',
  'B',
  'A percutaneous renal biopsy is performed under local anaesthesia with the client prone and awake. The client will feel pressure and possibly a sharp pain during needle insertion and core sampling — this should be communicated honestly to prepare the client. The client is not asleep. The procedure is performed prone (not sitting). Fluids are encouraged post-procedure to flush the kidney and monitor for haematuria. Ref: Brunner & Suddarth — renal biopsy; diagnostic procedures.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Respiratory and Airway Management',
  'A client in the cardiac step-down unit requires suctioning for excess mucous secretions. The dysrhythmia most commonly seen during suctioning is:',
  'Bradycardia',
  'Tachycardia',
  'Premature ventricular beats',
  'Heart block',
  'A',
  'Endotracheal/nasopharyngeal suctioning stimulates the vagus nerve (via pharyngeal and tracheal irritation), producing a vasovagal response — bradycardia and hypotension. This is the most commonly observed cardiac dysrhythmia during suctioning. Prevention includes pre-oxygenating with 100% O2 for 30–60 seconds and limiting suction time to < 10–15 seconds. Ref: Brunner & Suddarth — airway suctioning; respiratory nursing.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Cardiac Devices',
  'The nurse is performing discharge instruction to a client with an implantable defibrillator. What discharge instruction is essential?',
  'You cannot eat food prepared in a microwave',
  'You should avoid moving the shoulder on the side of the pacemaker site for 6 weeks',
  'You should use your cell phone on your right side',
  'You will not be able to fly on a commercial airliner with the defibrillator in place',
  'B',
  'After ICD/pacemaker implantation, lead dislodgement is the primary early complication. Clients must avoid raising the arm above shoulder level and avoid vigorous movements of the shoulder on the implant side for approximately 4–6 weeks to allow leads to become securely anchored. Modern household microwave ovens are safe. Commercial air travel is permitted. Using the mobile phone on the opposite side (away from the device) is the recommendation. Ref: Brunner & Suddarth — cardiac devices/ICD patient education.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Neonatal Assessment',
  'Six hours after birth, the infant is found to have an area of swelling over the right parietal area that does not cross the suture line. The nurse should chart this finding as:',
  'A cephalhematoma',
  'Molding',
  'Subdural hematoma',
  'Caput succedaneum',
  'A',
  'A cephalhaematoma is a subperiosteal collection of blood between the skull bone and its periosteum. Because the periosteum is firmly attached at the suture lines, the swelling is CONFINED within suture lines and does not cross them. It is caused by rupture of periosteal blood vessels during labour and may take weeks to resolve. Caput succedaneum is subcutaneous oedema that DOES cross suture lines. Subdural haematoma is intracranial. Moulding is skull bone overlap without swelling. Ref: Myles Textbook for Midwives — the newborn.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Thoracic Surgery',
  'A removal of the left lower lobe of the lung is performed on a client with lung cancer. Which post-operative measure would usually be included in the plan?',
  'Closed chest drainage',
  'A tracheostomy',
  'A Swan Ganz Monitor',
  'Percussion vibration and drainage',
  'A',
  'After a pulmonary lobectomy, closed chest (underwater-seal) drainage is standard to drain air and blood from the pleural space, allow re-expansion of the remaining lung lobes and monitor for haemorrhage or air leak. A tracheostomy is not routinely required. Swan-Ganz monitoring is used in complex cardiac/haemodynamic cases. Percussion, vibration and drainage (physiotherapy) may be used post-operatively but closed chest drainage is the immediate mandatory measure. Ref: Brunner & Suddarth — thoracic surgery.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Head and Neck Cancer',
  'The nurse is caring for a client with laryngeal cancer. Which finding ascertained in the health history would not be common for this diagnosis?',
  'Foul breath',
  'Dysphagia',
  'Diarrhea',
  'Chronic hiccups',
  'C',
  'Laryngeal cancer typically presents with: progressive hoarseness (earliest sign), dysphagia (difficulty swallowing — from involvement of hypopharynx), foul/fetor breath (from necrotic tumour), a persistent lump or sore throat, chronic cough, haemoptysis, and occasionally chronic hiccups (from vagus nerve irritation). Diarrhoea is not a recognised feature of laryngeal cancer — it is unrelated to the head and neck. Ref: Brunner & Suddarth — head and neck cancer.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Newborn Care',
  'The nurse is caring for a new mother. The mother asks why her baby has lost weight since he was born. The best explanation of the weight loss is:',
  'The baby is dehydrated',
  'The baby is hypoglycemic',
  'The baby is allergic to the formula the mother is giving him',
  'A loss of 10% is normal in the first week due to meconium stools',
  'D',
  'A physiological weight loss of 5–10% of birth weight in the first 3–5 days of life is normal and expected. It results from: passage of meconium; loss of vernix and dried cord; insensible water losses; and limited intake while breastfeeding is being established. Birth weight is typically regained by days 10–14. Weight loss >10% or failure to regain by day 14 requires investigation. Ref: Myles Textbook for Midwives — newborn assessment; MOH Kenya newborn care.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
  'The nurse is performing discharge teaching on a client with diverticulitis who has been placed on a low-roughage diet. Which food would have to be eliminated from this client''s diet?',
  'Roasted chicken',
  'Noodles',
  'Cooked broccoli',
  'Custard',
  'C',
  'A low-roughage (low-residue) diet is prescribed during acute diverticulitis to rest the inflamed bowel. High-fibre foods must be eliminated. Cooked broccoli, despite cooking, retains significant fibre content and must be avoided. Roasted chicken (lean protein), noodles (refined carbohydrate) and custard (dairy-based, low fibre) are all low-residue and permitted. Ref: Brunner & Suddarth — diverticulitis/nutrition; MOH Kenya dietary guidelines.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Gastrointestinal Disorders',
  'The nurse is assisting a client with diverticulosis to select appropriate foods. Which food should be avoided?',
  'Bran',
  'Fresh peaches',
  'Cucumber salad',
  'Yeast rolls',
  'C',
  'Diverticulosis (uncomplicated diverticula without inflammation) is managed with a HIGH-fibre diet to reduce intraluminal pressure. However, foods with small seeds, skins or nuts that can lodge in diverticula and precipitate diverticulitis are typically avoided: cucumber seeds and skins are classic examples. Bran (high fibre), fresh peaches (high fibre/water) and yeast rolls are generally permitted in diverticulosis. Note: evidence on specific food restriction in diverticulosis has evolved, but clinical tradition and many textbooks still recommend avoiding seeds/skins. Ref: Brunner & Suddarth — diverticulosis/nutrition.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Gastrointestinal Disorders',
  'A 6-month-old client is admitted with possible intussusception. Which question during the nursing history is least helpful in obtaining information regarding this diagnosis?',
  'Tell me about his pain',
  'What does his vomit look like',
  'Describe his usual diet',
  'Have you noticed changes in his abdominal size',
  'C',
  'Intussusception presents with: episodic colicky abdominal pain (child draws up knees, screams); bilious or non-bilious vomiting; red-currant jelly (blood-stained, mucoid) stools; and a sausage-shaped abdominal mass. Asking about pain (A), vomit character (B) and abdominal changes (D) are directly relevant to the diagnosis. The usual diet of a 6-month-old is the least helpful — dietary history does not assist in diagnosing intussusception. Ref: MOH Kenya Basic Paediatric Protocols — intussusception; Kenya IMNCI.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Orthopaedic Oncology',
  'A client is admitted with a Ewing''s sarcoma. Which symptoms would be expected due to this tumor''s location?',
  'Hemiplegia',
  'Aphasia',
  'Nausea',
  'Bone pain',
  'D',
  'Ewing''s sarcoma is a malignant primary bone tumour arising most commonly in the diaphysis of long bones (femur, tibia, humerus) and flat bones (pelvis, ribs). The hallmark presenting symptom is localised bone pain, often with swelling and tenderness at the tumour site, frequently accompanied by fever and elevated ESR. Hemiplegia and aphasia suggest intracranial lesions. Nausea alone is non-specific. Ref: Brunner & Suddarth — musculoskeletal malignancies; orthopaedic oncology.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Growth and Development',
  'An infant weighs 7 pounds at birth. The expected weight by 1 year should be:',
  '10 pounds',
  '12 pounds',
  '18 pounds',
  '21 pounds',
  'D',
  'A normal infant''s weight triples (×3) by 12 months of age. 7 pounds × 3 = 21 pounds. This growth pattern is a well-established developmental standard: birth weight doubles by 4–6 months, triples by 12 months. A weight of 21 pounds (approximately 9.5 kg) is the expected target. Ref: MOH Kenya Child Health — growth monitoring; WHO Child Growth Standards.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Spinal Cord Injury',
  'The nurse is making initial rounds on a client with a C5 fracture and Crutchfield tongs. Which equipment should be kept at the bedside?',
  'A pair of forceps',
  'A torque wrench',
  'A pair of wire cutters',
  'A screwdriver',
  'B',
  'Crutchfield tongs are a form of skeletal cervical traction applied to the skull via metal pins. A torque wrench is kept at the bedside to tighten or adjust the pins/nuts securing the tongs if they loosen, and to verify correct torque. A screwdriver is used for halo vests. Wire cutters are for halo vest emergency removal. Forceps are not relevant to tong management. Ref: Brunner & Suddarth — spinal cord injury/cervical traction.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Surgical Nursing', 'Peri-Operative Nursing',
  'A 24-year-old female client is scheduled for surgery in the morning. Which of the following is the primary responsibility of the nurse?',
  'Taking the vital signs',
  'Obtaining the permit',
  'Explaining the procedure',
  'Checking the lab work',
  'D',
  'The nurse''s primary pre-operative responsibility is to review and check the laboratory results (blood tests, ECG, urinalysis) and report any abnormal values to the surgeon/anaesthesiologist — this is a patient safety function. Obtaining the consent form (permit) is the surgeon''s responsibility (the nurse witnesses). Explaining the surgical procedure is the surgeon''s responsibility. Taking vital signs is an important nursing task but not the PRIMARY responsibility the morning before surgery. Ref: Peri-operative nursing; Brunner & Suddarth.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Fluid and Electrolyte Balance',
  'A client with cancer is admitted to the oncology unit. Stat lab values reveal Hgb 12.6, WBC 6500, K+ 1.9, uric acid 7.0, Na+ 136, and platelets 178,000. The nurse evaluates that the client is experiencing which of the following?',
  'Hypernatremia',
  'Hypokalemia',
  'Myelosuppression',
  'Leukocytosis',
  'B',
  'K+ 1.9 mEq/L is severe hypokalaemia (normal range 3.5–5.0 mEq/L). This is a potentially life-threatening electrolyte abnormality requiring immediate intervention (risk of cardiac arrhythmias and muscle weakness). Na+ 136 is within normal range (no hypernatraemia). WBC 6500 is normal (no leucocytosis/myelosuppression indicated). Platelets 178,000 and Hgb 12.6 are near-normal. Ref: Brunner & Suddarth — fluid and electrolyte balance/hypokalaemia.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
  'The nurse is caring for a client scheduled for removal of the pituitary gland. The nurse should be particularly alert for:',
  'Nasal congestion',
  'Abdominal tenderness',
  'Muscle tetany',
  'Oliguria',
  'A',
  'After transsphenoidal hypophysectomy (pituitary surgery via the nasal/sphenoidal approach), the nurse watches for: CSF leakage presenting as persistent clear nasal drainage (which may be mistaken for nasal congestion or rhinorrhoea — the glucose test differentiates CSF from mucus); and diabetes insipidus (polyuria, not oliguria). Nasal congestion/clear drainage from the nose is the key early warning sign of CSF leak. Muscle tetany suggests hypocalcaemia (parathyroid complication). Ref: Brunner & Suddarth — pituitary surgery/endocrine nursing.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Liver Disorders',
  'The nurse is caring for a client with ascites. Which is the best method to use for determining early ascites?',
  'Inspection of the abdomen for enlargement',
  'Bimanual palpation for hepatomegaly',
  'Daily measurement of abdominal girth',
  'Assessment for a fluid wave',
  'C',
  'Daily measurement of abdominal girth (circumference) at a marked consistent level (e.g. umbilicus) is the most sensitive and reliable method for detecting early and progressive fluid accumulation in ascites. It detects small changes before they are clinically visible or palpable. Inspection detects only gross ascites. A fluid wave (shifting dullness) requires > 1–2 litres of fluid. Hepatomegaly assessment is separate from ascites. Ref: Brunner & Suddarth — hepatic disorders/ascites assessment.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Oncology Nursing',
  'The nurse on oncology is caring for a client with a white blood count of 600. During evening visitation, a visitor brings a potted plant. What action should the nurse take?',
  'Allow the client to keep the plant',
  'Place the plant by the window',
  'Water the plant for the client',
  'Tell the family members to take the plant home',
  'D',
  'A WBC of 600/mm³ indicates severe neutropenia (normal 4,500–11,000/mm³). Live/potted plants and fresh flowers harbour moulds (Aspergillus), bacteria (Pseudomonas) and other opportunistic pathogens in soil and water. Neutropenic precautions strictly prohibit these in the patient''s room. The family must take the plant home. Cut or dried flowers (without soil/standing water) may be permitted in some units. Ref: Brunner & Suddarth — oncology/neutropenic precautions; MOH Kenya IPC guidelines.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Endocrine Disorders',
  'The nurse is caring for the client following a thyroidectomy when suddenly the client becomes nonresponsive and pale, with a BP of 60 systolic. The nurse''s initial action should be to:',
  'Lower the head of the bed',
  'Increase the infusion of normal saline',
  'Administer atropine IV',
  'Obtain a crash cart',
  'B',
  'Systolic BP of 60 mmHg with pallor and loss of responsiveness indicates haemorrhagic or vasovagal shock post-thyroidectomy. The immediate nursing action is to increase IV fluid (normal saline) rate to restore circulating volume and improve perfusion while simultaneously calling for help. Lowering the head (Trendelenburg) may be considered but increasing IV fluids is the most direct action. Atropine treats bradycardia, not haemorrhagic shock. Obtaining a crash cart is secondary to initiating resuscitation. Ref: Brunner & Suddarth — thyroidectomy post-operative complications; shock management.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Pharmacology', 'Anticoagulants',
  'A client being treated with sodium warfarin has an INR of 8.0. Which intervention would be most important to include in the nursing care plan?',
  'Assess for signs of abnormal bleeding',
  'Anticipate an increase in the Coumadin dosage',
  'Instruct the client regarding the drug therapy',
  'Increase the frequency of neurological assessments',
  'A',
  'A therapeutic INR for warfarin (for most indications) is 2.0–3.0. An INR of 8.0 represents supratherapeutic anticoagulation with a greatly elevated risk of serious haemorrhage (intracranial, GI, soft tissue). The priority nursing intervention is to assess for signs of bleeding (haematuria, melena, bruising, neurological changes). The warfarin dose would be withheld (not increased) and vitamin K ± fresh frozen plasma may be needed. Ref: Pharmacology — anticoagulants; Brunner & Suddarth.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Midwifery', 'Complications of Pregnancy',
  'The client with preeclampsia is admitted to the unit with an order for magnesium sulfate IV. Which action by the nurse indicates a lack of understanding of magnesium sulfate?',
  'The nurse places a sign over the bed not to check blood pressures in the left arm',
  'The nurse obtains an IV controller',
  'The nurse inserts a Foley catheter',
  'The nurse darkens the room',
  'A',
  'Blood pressure monitoring is essential during magnesium sulphate therapy — BP must be checked frequently (every 15 minutes initially) to monitor for hypertensive crisis and magnesium toxicity effects on vasodilation. Placing a sign prohibiting BP checks shows a fundamental misunderstanding. Using an IV controller (for precise rate control) is correct. Inserting a Foley catheter (urine output < 30 mL/hr = early sign of magnesium toxicity — kidneys excrete magnesium) is correct. Darkening the room (reducing sensory stimuli to prevent eclamptic seizures) is correct. Ref: Myles Textbook for Midwives; MOH Kenya pre-eclampsia/eclampsia management.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Professional Ethics',
  'The nurse is caring for a 12-year-old client with appendicitis. The client''s mother is a Jehovah''s Witness and refuses to sign the blood permit. What nursing action is most appropriate?',
  'Give the blood without permission',
  'Encourage the mother to reconsider',
  'Explain the consequences without treatment',
  'Notify the physician of the mother''s refusal',
  'D',
  'The nurse must respect the mother''s decision and report the refusal through the chain of command by notifying the physician immediately. For a minor (child) in a life-threatening situation where a parent refuses life-saving treatment, the physician/hospital can seek a court order to authorise transfusion. Administering blood without consent is assault. The nurse should not coerce or pressure the parent. Explaining consequences is part of the physician''s informed consent discussion. Ref: Professional ethics and law — consent, patient rights, minors; NCK standards.',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Burns Management',
  'A client is admitted 2 hours after an injury with second-degree burns to the face, trunk, and head. The nurse would be most concerned with the client developing what?',
  'Hypovolemia',
  'Laryngeal edema',
  'Hypernatremia',
  'Hyperkalemia',
  'B',
  'Burns to the face, head and neck carry the highest risk of inhalation injury — heat damages supraglottic structures causing progressive laryngeal and glottic oedema, which can completely obstruct the airway within hours. This is the most immediate life-threatening concern and takes priority over fluid shifts. Early intubation before oedema progresses is the intervention. Hypovolaemia is important but develops over 4–24 hours; airway obstruction can be fatal within minutes. Ref: Brunner & Suddarth — burns management; MOH Kenya emergency care.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Musculoskeletal Nursing',
  'The client is admitted following repair of a fractured tibia and cast application. Which nursing assessment should be reported to the doctor?',
  'Pain beneath the cast',
  'Warm toes',
  'Pedal pulses weak and rapid',
  'Paresthesia of the toes',
  'D',
  'Paraesthesia (numbness/tingling) of the toes after cast application is an early warning sign of neurovascular compromise — potentially compartment syndrome, which if untreated causes permanent nerve damage and muscle necrosis. This must be reported immediately. Warm toes indicate good perfusion — a normal finding. Some pain at the fracture site is expected. Pedal pulses may be a concern if absent, but weak and rapid alone is less specific than paraesthesia. Ref: Brunner & Suddarth — cast care; neurovascular assessment (6 Ps).',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Cardiovascular Diagnostics',
  'The client is having a cardiac catheterization. During the procedure, the client tells the nurse, ''I''m feeling really hot.'' Which response would be best?',
  'You are having an allergic reaction; I will get an order for Benadryl',
  'That feeling of warmth is normal when the dye is injected',
  'That feeling of warmth indicates that the clots in the coronary vessels are dissolving',
  'I will tell your doctor and let him explain the reason for the hot feeling',
  'B',
  'A transient sensation of warmth, flushing or a "hot flash" is a normal, expected and common response when iodinated contrast dye is injected during cardiac catheterisation. It results from vasodilation and histamine release from the contrast. Reassuring the client with factual, calming information is the appropriate nursing response. It is NOT an allergic reaction unless accompanied by urticaria, dyspnoea or hypotension. Telling the client clots are dissolving is inaccurate. Ref: Brunner & Suddarth — cardiac catheterisation; patient education.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Infection Prevention and Control',
  'Which action by the healthcare worker indicates a need for further teaching?',
  'The nursing assistant wears gloves while giving the client a bath',
  'The nurse wears goggles while drawing blood from the client',
  'The doctor washes his hands before examining the client',
  'The nurse wears gloves to take the client''s vital signs',
  'D',
  'Wearing gloves to take a patient''s vital signs (measuring blood pressure, pulse, temperature, SPO2) is unnecessary and inappropriate because this non-invasive procedure does not involve contact with blood, body fluids, mucous membranes or non-intact skin. Routine glove use for such tasks wastes PPE and does not improve safety. The other actions are all correct standard precautions. Ref: IPC — standard precautions (WHO; MOH Kenya IPC Manual).',
  'medium', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Parasitology',
  'The 5-year-old is being tested for enterobiasis (pinworms). To collect a specimen for assessment of pinworms, the nurse should teach the mother to:',
  'Place tape on the child''s perianal area before putting the child to bed',
  'Scrape the skin with a piece of cardboard and bring it to the clinic',
  'Obtain a stool specimen in the afternoon',
  'Bring a hair sample to the clinic for evaluation',
  'A',
  'The cellophane-tape (sticky-tape) test (Graham''s test) is the standard method for diagnosing enterobiasis (Enterobius vermicularis/pinworm). The female worm migrates to the perianal area at night to lay eggs. Transparent adhesive tape is pressed firmly against the perianal skin in the early morning before bathing or defaecation, then placed on a glass slide for microscopic examination of eggs. Stool specimens have low sensitivity. Hair samples are irrelevant. Ref: MOH Kenya — parasitology/deworming; paediatric nursing.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Parasitology',
  'The nurse is teaching the mother regarding treatment for enterobiasis. Which instruction should be given regarding the medication?',
  'Treatment is not recommended for children less than 10 years of age',
  'The entire family should be treated',
  'Medication therapy will continue for 1 year',
  'Intravenous antibiotic therapy will be ordered',
  'B',
  'Pinworms spread easily within households through auto-reinfection and hand-to-mouth transmission of eggs from contaminated surfaces and fomites. The entire household/family should be treated simultaneously with a single oral dose of mebendazole or albendazole, repeated after 2 weeks to eliminate newly hatched worms. Treatment is safe in children ≥ 2 years. IV antibiotics are irrelevant — pinworm is a helminthic infection treated with oral anthelmintics. Ref: MOH Kenya deworming guidelines; paediatric pharmacology.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Nursing Management and Leadership', 'Professional Ethics and Law',
  'The nurse caring for a client in the neonatal intensive care unit administers adult-strength Digitalis to the 3-pound infant. As a result of her actions, the baby suffers permanent heart and brain damage. The nurse can be charged with:',
  'Negligence',
  'Tort',
  'Assault',
  'Malpractice',
  'D',
  'Malpractice is professional (negligence) by a licensed professional who, in the course of their duties, fails to meet the standard of care expected of a reasonably competent professional, causing harm. Administering an adult dose of digoxin to a 3-pound neonate (when weight-based paediatric dosing is the standard of care) causing permanent injury is malpractice. Simple negligence applies to any person. A tort is a civil wrong (malpractice IS a tort, but the specific answer is malpractice). Assault involves threat without contact. Ref: Professional ethics and law — NCK; malpractice and negligence.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Pharmacology', 'Antidotes and Toxicology',
  'Which medication is used to treat iron toxicity?',
  'Narcan (naloxone)',
  'Digibind (digoxin immune Fab)',
  'Desferal (deferoxamine)',
  'Zinecard (dexrazoxane)',
  'C',
  'Deferoxamine (Desferal) is an iron-chelating agent — it binds free iron in the blood and tissues, forming a water-soluble complex (ferrioxamine) that is excreted in the urine (which turns orange/red). It is the specific antidote for acute iron poisoning/overdose. Naloxone reverses opioid toxicity. Digibind neutralises digoxin toxicity. Dexrazoxane (Zinecard) is a cardioprotective agent used with anthracycline chemotherapy, not an antidote for iron. Ref: Pharmacology — antidotes; MOH Kenya poisoning management.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Nursing Management and Leadership', 'Professional Ethics and Law',
  'The nurse is suspected of charting medication administration that he did not give. The nurse can be charged with:',
  'Fraud',
  'Malpractice',
  'Negligence',
  'Tort',
  'A',
  'Fraud is the intentional falsification or misrepresentation of facts (such as documenting that a medication was given when it was not) for gain or to deceive. This is a deliberate, intentional act, distinguishing it from negligence (failure of care without intent) or malpractice (substandard professional practice). Falsifying medical records is both professional misconduct (subject to NCK disciplinary action) and potentially a criminal fraud charge. Ref: Professional ethics and law — documentation, fraud, NCK standards.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Paediatric Nursing', 'Eye Care',
  'The nurse is caring for a 6-year-old client admitted with the diagnosis of conjunctivitis. Before administering eyedrops, the nurse should recognize that it is essential to consider which of the following?',
  'The eye should be cleansed with warm water, removing any exudate, before instilling the eyedrops',
  'The child should be allowed to instill his own eyedrops',
  'Allow the mother to instill the eyedrops',
  'If the eye is clear from any redness or edema, the eyedrops should be held',
  'A',
  'Before instilling eye drops for conjunctivitis, the eye must be cleansed with warm water or saline using a clean swab, wiping from the inner canthus to the outer canthus, to remove crusting and exudate. This ensures medication absorption and prevents reintroduction of infectious material. Eyedrops should be continued as prescribed regardless of apparent improvement (to complete the course). A 6-year-old requires nurse/parent assistance for correct administration. Ref: Paediatric nursing — eye care/IPC; MOH Kenya.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Vascular surgery: preop assessment for AAA repair — peripheral pulses
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Medical-Surgical Nursing', 'Vascular Surgery',
  'The nurse is caring for a client scheduled for a surgical repair of a saccular abdominal aortic aneurysm. Which assessment is most crucial during the preoperative period?',
  'Assessment of the client''s level of anxiety',
  'Evaluation of the client''s exercise tolerance',
  'Identification of peripheral pulses',
  'Assessment of bowel sounds and activity',
  'C',
  'Baseline peripheral pulse assessment (femoral, popliteal, posterior tibial and dorsalis pedis) is the most crucial pre-operative assessment before AAA repair. Post-operatively, these baseline values are the reference for detecting graft occlusion, embolisation or ischaemia of the lower limbs — the major vascular complications. Anxiety and bowel sounds are assessed but are not the critical surgical safety parameter. Exercise tolerance is limited by aneurysm risk. Ref: Brunner & Suddarth — vascular surgery/pre-operative care.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Carbamazepine toxicity: WBC 2000
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Pharmacology', 'Anticonvulsants',
  'The nurse is caring for a client with epilepsy who is being treated with carbamazepine (Tegretol). Which laboratory value might indicate a serious side effect of this drug?',
  'Uric acid of 5 mg/dL',
  'The hematocrit of 33%',
  'WBC 2000 per cubic millimeter',
  'Platelets 150,000 per cubic millimeter',
  'C',
  'Carbamazepine can cause serious haematological toxicity including aplastic anaemia, agranulocytosis and leucopenia. A WBC of 2,000/mm³ (normal 4,500–11,000/mm³) indicates severe leucopenia/agranulocytosis — a potentially life-threatening bone-marrow suppressive side effect requiring immediate drug discontinuation and medical intervention. A uric acid of 5 mg/dL is normal. A haematocrit of 33% is mildly low. Platelets of 150,000 are normal. Ref: Pharmacology — carbamazepine side effects; Brunner & Suddarth.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Alendronate instruction: water only
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Pharmacology', 'Musculoskeletal Drugs',
  'The nurse is visiting a home health client with osteoporosis who has a new prescription for alendronate (Fosamax). Which instruction should be given to the client?',
  'Rest in bed after taking the medication for at least 30 minutes',
  'Avoid rapid movements after taking the medication',
  'Take the medication with water only',
  'Allow at least 1 hour between taking the medicine and taking other medications',
  'C',
  'Alendronate (a bisphosphonate) must be taken on an empty stomach with a full glass of PLAIN WATER ONLY (no other drinks, food or medications) and the client must remain UPRIGHT (sitting or standing — not lying down) for at least 30 minutes after taking it. This prevents oesophageal irritation, erosion and oesophagitis caused by reflux of the undissolved tablet. Bed rest after taking is incorrect (causes reflux). Ref: Pharmacology — bisphosphonates; patient education.',
  'easy', 'approved', 2024, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;
