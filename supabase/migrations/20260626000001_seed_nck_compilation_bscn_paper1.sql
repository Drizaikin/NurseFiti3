-- =============================================================================
-- SEED: NCK MCQ Compilation with Answers & Rationales
-- Batch 1: BScN — Paper I (Microbiology/Pharmacology/Anatomy & Physiology)
-- =============================================================================
-- Source: NCK-MCQ-Compilation-Answers-Rationales.docx
-- Cadre: BScN
-- Paper: 'Paper I' (Advanced Adult Health + Pharmacology + Specialised Nursing)
-- exam_year: Set per year stated in document header for each question
-- Status: approved | contributor_id: NULL (platform-owned)
-- Conflict: ON CONFLICT (stem, cadre) DO NOTHING
-- Rationale audit: verified against Brunner & Suddarth, MOH Kenya, NCK curriculum
-- =============================================================================
-- YEARS IN THIS DOCUMENT: 2008, 2018, 2019, 2025 (BScN Paper I)
-- Already-seeded check: 2018 BScN Paper II seeded; these are 2008/2018/2019 BScN Paper I — NEW.
-- =============================================================================

-- ─── YEAR 2008 — BScN Paper I ─────────────────────────────────────────────────

-- Q1 [2008] — Nosocomial pneumonia organisms
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Microbiology', 'Hospital-Acquired Infections',
  'Micro-organisms responsible for hospital-acquired pneumonia are:',
  'Streptococcus pneumoniae, Haemophilus influenzae, Legionella pneumophila',
  'Chlamydia pneumoniae, Mycoplasma, parainfluenza virus',
  'Pseudomonas aeruginosa, Staphylococcus aureus, Klebsiella pneumoniae',
  'Pneumocystis carinii, cytomegalovirus, Aspergillus fumigatus',
  'C',
  'Hospital-acquired (nosocomial) pneumonia is caused primarily by Gram-negative bacilli and Staphylococcus aureus — classically Pseudomonas aeruginosa, Klebsiella pneumoniae and S. aureus, which colonise hospital environments and are frequently multidrug-resistant. Streptococcus pneumoniae and Mycoplasma cause community-acquired pneumonia. Pneumocystis jirovecii, CMV and Aspergillus cause opportunistic infections in immunocompromised patients. Ref: Brunner & Suddarth''s Medical-Surgical Nursing; NCK Microbiology curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2008] — Oral bioavailability factors
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Pharmacokinetics',
  'Bioavailability of drugs taken by mouth is affected by:',
  'Water-solubility, blood flow through the kidneys, normal liver function',
  'Capacity of liver enzymes to metabolise, age of the patient, extent of protein binding',
  'Distribution volume, weight of the patient, ability of drug to cross membranes',
  'Acidity of the stomach, transit time through the digestive tract, presence of food',
  'D',
  'Oral bioavailability is the fraction of an oral dose that reaches systemic circulation unchanged. It is principally governed by GIT absorption, which is influenced by gastric acidity (pH affects ionisation and solubility), GI transit time/motility, and the presence of food (which can enhance or reduce absorption). First-pass hepatic metabolism also contributes, but options A–C describe distribution/excretion parameters, not the primary determinants of oral absorption. Ref: Pharmacology — pharmacokinetics (Kenya nursing curriculum); Brunner & Suddarth.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2008] — IgG immunoglobulin
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Microbiology', 'Immunology',
  'Immunoglobulin G (IgG) is:',
  'Responsible for secondary antibody response',
  'Produced when an antigen is encountered for the first time',
  'Responsible for defence against invasion of micro-organisms through the body''s mucous membranes',
  'The mediator of immediate reactions',
  'A',
  'IgG is the most abundant serum immunoglobulin and the principal antibody of the secondary (memory) immune response; it is produced in large quantities on re-exposure to an antigen and confers long-lasting immunity. It also crosses the placenta to provide passive neonatal immunity. IgM is the dominant antibody of the primary (first-exposure) response. IgA protects mucous membrane surfaces. IgE mediates immediate (Type I) hypersensitivity/allergic reactions. Ref: Microbiology and Immunology — NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2008] — Cell-mediated immunity components
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Microbiology', 'Immunology',
  'The cell-mediated immune system is made up of:',
  'T-lymphocytes and macrophages',
  'T-lymphocytes and antibodies',
  'Macrophages and B-lymphocytes',
  'B-lymphocytes and T-lymphocytes',
  'A',
  'Cell-mediated immunity is effected by T-lymphocytes (cytotoxic T cells, helper T cells) working together with antigen-presenting phagocytic cells — principally macrophages and dendritic cells. Macrophages process and present antigens to T cells and are activated by T-cell cytokines (e.g. IFN-γ). Antibodies and B-lymphocytes are the mediators of humoral (antibody-mediated) immunity, not cell-mediated immunity. Ref: Microbiology and Immunology — NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2018 — BScN Paper I (Pharmacology) ─────────────────────────────────

-- Q1 [2018] — Cephalosporins classification
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'The drugs that are classified as cephalosporins include:',
  'Cefixime, Loracarbef',
  'Cephradine, Laroxyl',
  'Ceftriaxone, Lasix',
  'Cefaclor, Clonazepam',
  'A',
  'Cephalosporins are beta-lactam antibiotics. Cefixime (3rd generation oral) and loracarbef (a carbacephem related to 2nd-gen cephalosporins) both belong to this class. Options B–D each incorrectly pair a cephalosporin with a non-antibiotic: Laroxyl = amitriptyline (tricyclic antidepressant); Lasix = furosemide (loop diuretic); clonazepam = benzodiazepine anticonvulsant. Ref: Pharmacology — antimicrobials; NCK KRCHN-B Pharmacology 2018.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2018] — Antitussives indication
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Respiratory Drugs',
  'The antitussive agents are indicated for:',
  'Removing excess mucus from the airway',
  'Relieving rhinitis',
  'Controlling a productive cough',
  'Relieving a dry (non-productive) cough',
  'D',
  'Antitussives (cough suppressants, e.g. codeine, dextromethorphan) act centrally to suppress the cough reflex. They are indicated for a dry, irritating, non-productive cough where the cough serves no useful purpose. They are contraindicated for productive cough because coughing is necessary to clear secretions from the airways. Mucolytics/expectorants remove excess mucus; antihistamines relieve rhinitis. Ref: Pharmacology — respiratory drugs; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2018] — Expectorant client education
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Respiratory Drugs',
  'The nurse should instruct a client who is taking an expectorant to:',
  'Restrict fluids',
  'Increase fluid intake',
  'Avoid vaporizers',
  'Take antihistamines',
  'B',
  'Expectorants (e.g. guaifenesin) increase respiratory tract secretions to liquefy and loosen tenacious mucus, facilitating expectoration. Adequate hydration (increased fluid intake) is essential to maximise this effect and maintain mucosal moisture. Restricting fluids would thicken secretions and counteract the drug. Antihistamines dry secretions and are counterproductive. Humidified air (vaporisers) complements, not opposes, expectorant therapy. Ref: Pharmacology — respiratory drugs; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2018] — Narcotic analgesics
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Analgesics',
  'The drugs that are classified as narcotic analgesics include:',
  'Acetylsalicylic acid, Indomethacin',
  'Acetaminophen, Ibuprofen',
  'Codeine, Morphine',
  'Morphine, Diclofenac',
  'C',
  'Narcotic (opioid) analgesics bind opioid receptors in the CNS to produce analgesia, euphoria and respiratory depression. Codeine and morphine are both opioid agonists. Options A and B contain NSAIDs (acetylsalicylic acid/aspirin, indomethacin, ibuprofen) and acetaminophen — non-opioid analgesics. Option D incorrectly pairs morphine with diclofenac (an NSAID). Ref: Pharmacology — opioid analgesics; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2018] — Hypnotic drugs action
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'CNS Depressants',
  'The action of hypnotic drugs is to induce:',
  'Vomiting',
  'Appetite',
  'Sleep',
  'Calmness',
  'C',
  'Hypnotic drugs (e.g. benzodiazepines at higher doses, non-benzodiazepine z-drugs like zolpidem, barbiturates) act on the CNS to induce and sustain sleep. Sedatives at lower doses produce calmness/anxiolysis; in higher hypnotic doses they cause sleep. Emetics induce vomiting; appetite stimulants increase appetite. Ref: Pharmacology — CNS depressants; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2018] — Morphine toxicity antidote
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Analgesics',
  'The antidote for morphine toxicity is:',
  'Methadone',
  'Fentanyl',
  'Amphetamine',
  'Naloxone',
  'D',
  'Naloxone (Narcan) is a competitive pure opioid antagonist that binds opioid receptors with high affinity, rapidly reversing opioid-induced respiratory depression, sedation and miosis. It is the specific antidote for morphine and all opioid overdose. Methadone and fentanyl are themselves opioid agonists; amphetamine is a CNS stimulant but is not the antidote for opioid overdose. Ref: Pharmacology; MOH Kenya Emergency Management of Poisoning guidelines.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2018] — Drug bioavailability definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Pharmacokinetics',
  'The extent to which a drug is absorbed and transported to the target tissue is known as:',
  'Steady-state accumulation',
  'Half-life',
  'Bioavailability',
  'Distribution',
  'C',
  'Bioavailability (F) is the fraction (proportion) of an administered dose that reaches the systemic circulation in active/unchanged form and is thus available to exert its pharmacological effect at the target tissue. An IV dose has 100% bioavailability. Half-life is the time for plasma concentration to fall by 50%. Distribution refers to drug movement from blood into tissues. Ref: Pharmacology — pharmacokinetics; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2018] — Pharmacokinetics definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Basic Pharmacology Principles',
  'The actions of the body on the drug are referred to as:',
  'Pharmacodynamics',
  'Pharmacokinetics',
  'Pharmacognosy',
  'Pharmacogenomics',
  'B',
  'Pharmacokinetics describes what the BODY does to the drug — encompassing Absorption, Distribution, Metabolism and Excretion (ADME). Pharmacodynamics describes what the DRUG does to the body (mechanism of action, receptor binding, physiological effects). Pharmacognosy is the study of natural/plant sources of drugs. Pharmacogenomics studies how genetic variation affects drug response. Ref: Pharmacology — basic principles; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2018] — Atenolol drug class
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Cardiovascular Drugs',
  'Atenolol is a/an:',
  'Beta-2 agonist',
  'Beta-blocker',
  'ACE inhibitor',
  'Calcium channel blocker',
  'B',
  'Atenolol is a cardioselective beta-1 adrenergic receptor blocker (beta-blocker). It reduces heart rate and myocardial contractility (negative chronotropy and inotropy) and lowers blood pressure. It is used in hypertension, angina and post-myocardial infarction. Beta-2 agonists (e.g. salbutamol) cause bronchodilation; ACE inhibitors (e.g. enalapril) block angiotensin converting enzyme; calcium channel blockers (e.g. nifedipine) block calcium influx. Ref: Pharmacology — cardiovascular drugs; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2018] — Penicillins classification
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'The drugs that are classified as penicillins include:',
  'Methicillin sodium, Nafcillin sodium',
  'Penicillin V, Ciprofloxacin',
  'Ampicillin, Doxycycline',
  'Erythromycin, Sotalol',
  'A',
  'Methicillin and nafcillin are both penicillinase-resistant (anti-staphylococcal) penicillins of the beta-lactam class. Options B–D each incorrectly pair a penicillin with a non-penicillin antibiotic or non-antibiotic: ciprofloxacin is a fluoroquinolone; doxycycline is a tetracycline; erythromycin is a macrolide; sotalol is an antiarrhythmic beta-blocker. Ref: Pharmacology — antimicrobials; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2018] — Plant-derived drug
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Sources of Drugs',
  'An example of a drug derived from a plant is:',
  'Glibenclamide',
  'Quinine',
  'Mechlorethamine',
  'Rifapentine',
  'B',
  'Quinine is an alkaloid extracted from the bark of the cinchona tree (Cinchona officinalis) — a classical example of a plant-derived (botanical) drug used as an antimalarial. Glibenclamide is a synthetic sulfonylurea; mechlorethamine is a synthetic nitrogen mustard alkylating agent; rifapentine is a semi-synthetic rifamycin. Ref: Pharmacology — sources of drugs; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2018] — Highest bioavailability route
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Routes of Drug Administration',
  'The route of drug administration with the highest drug bioavailability is:',
  'Oral',
  'Intramuscular',
  'Intradermal',
  'Intravenous',
  'D',
  'The intravenous (IV) route delivers drug directly into the systemic circulation, bypassing all absorption barriers and first-pass hepatic metabolism, thus achieving 100% bioavailability. All other routes involve some degree of absorption barrier or pre-systemic metabolism that reduces bioavailability. Ref: Pharmacology — pharmacokinetics and routes of administration; NCK curriculum.',
  'easy', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 [2018] — Opioid antagonist
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Opioid Pharmacology',
  'The following is an opioid antagonist:',
  'Flumazenil',
  'Naltrexone',
  'Sufentanil',
  'Methadone',
  'B',
  'Naltrexone is a long-acting pure opioid receptor antagonist used in the management of opioid dependence (and alcohol dependence). It blocks opioid receptors without activating them. Flumazenil is a benzodiazepine receptor antagonist (not opioid). Sufentanil is a potent opioid agonist (fentanyl derivative). Methadone is a long-acting opioid agonist used in opioid substitution therapy. Ref: Pharmacology — opioids and antagonists; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 [2018] — Organophosphate poisoning antidote
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Toxicology and Antidotes',
  'The drug used for organophosphate poisoning is:',
  'Atropine',
  'Pilocarpine',
  'Propranolol',
  'Edrophonium',
  'A',
  'Organophosphates inhibit acetylcholinesterase, causing accumulation of acetylcholine and excessive muscarinic (and nicotinic) stimulation — SLUDGE syndrome (Salivation, Lacrimation, Urination, Defaecation, GI distress, Emesis). Atropine (an antimuscarinic) competitively blocks muscarinic receptors and is the primary antidote, used together with pralidoxime (2-PAM) to reactivate acetylcholinesterase. Pilocarpine is a muscarinic agonist (would worsen toxicity). Edrophonium is a reversible anticholinesterase. Ref: Pharmacology; MOH Kenya Management of Poisoning.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q15 [2018] — Local anaesthetic mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Local Anaesthetics',
  'Local anaesthetics work by:',
  'Blocking calcium ion channels to prevent depolarization',
  'Blocking potassium ion channels to prevent depolarization',
  'Blocking sodium ion channels to prevent depolarization',
  'Blocking impulse at the neuromuscular junction',
  'C',
  'Local anaesthetics (e.g. lignocaine/lidocaine, bupivacaine) block voltage-gated sodium (Na+) channels in the nerve axon membrane. By preventing the rapid Na+ influx required for depolarisation, they stop the generation and propagation of the action potential, producing reversible loss of sensation. Calcium channel blockade is the mechanism of calcium channel blockers (e.g. nifedipine). Neuromuscular junction blockade is the mechanism of neuromuscular blocking agents. Ref: Pharmacology — local anaesthetics; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q16 [2018] — Tetracycline in pregnancy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Drugs in Pregnancy',
  'Pregnant women should be advised not to take tetracycline because it has been associated with:',
  'Gray baby syndrome',
  'Tooth and bone defects in the neonate',
  'Acne',
  'Excessive bleeding',
  'B',
  'Tetracyclines chelate calcium and are deposited in developing teeth and bones, causing permanent yellow-brown discolouration of deciduous teeth and impaired bone growth in the foetus/young child. They are therefore contraindicated during pregnancy (Category D) and in children under 8 years. Gray baby syndrome is caused by chloramphenicol (impaired glucuronidation in neonates). Excessive bleeding is not a recognised tetracycline effect in pregnancy. Ref: Pharmacology — drugs in pregnancy; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q17 [2018] — Acyclovir mechanism of action
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antivirals',
  'Acyclovir is a drug of choice for treatment of herpes virus. Its mode of action is to:',
  'Inhibit viral RNA synthesis',
  'Inhibit viral DNA synthesis',
  'Inhibit viral protein synthesis',
  'Inhibit viral capsule formation',
  'B',
  'Acyclovir (aciclovir) is a nucleoside analogue antiviral. It is phosphorylated by viral thymidine kinase (first phosphorylation is virus-specific, conferring selectivity) to acyclovir triphosphate, which then competitively inhibits viral DNA polymerase, thereby halting viral DNA synthesis and replication. Herpes viruses are DNA viruses. Viral RNA synthesis inhibition is the mechanism of drugs targeting RNA viruses. Ref: Pharmacology — antiviral drugs; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q18 [2018] — Cromolyn mast cell stabiliser
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Anti-Allergic Drugs',
  'A drug that prevents the release of histamine from mast cells is:',
  'Cromolyn',
  'Cetirizine',
  'Aminophylline',
  'Montelukast',
  'A',
  'Cromolyn sodium (sodium cromoglicate) is a mast cell stabiliser that prevents degranulation of sensitised mast cells and basophils, thereby inhibiting the release of histamine, leukotrienes and other inflammatory mediators. It is used prophylactically in asthma and allergic rhinitis. Cetirizine is an H1-antihistamine (blocks histamine receptor after release). Aminophylline is a methylxanthine bronchodilator. Montelukast is a cysteinyl leukotriene-receptor antagonist. Ref: Pharmacology — anti-allergic and anti-asthmatic drugs; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q19 [2018] — Sulfonylureas mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antidiabetic Drugs',
  'Oral antidiabetics that work by stimulating beta cells to secrete more insulin and increasing receptor sites in the tissues are classified as:',
  'Alpha-glucosidase inhibitors',
  'Biguanides',
  'Sulfonylureas',
  'Thiazolidinediones',
  'C',
  'Sulfonylureas (e.g. glibenclamide, glipizide, gliclazide) lower blood glucose primarily by stimulating insulin secretion from pancreatic beta cells via closure of ATP-sensitive K+ channels. They also increase peripheral insulin receptor sensitivity. Biguanides (metformin) reduce hepatic glucose output without stimulating insulin secretion. Alpha-glucosidase inhibitors delay carbohydrate absorption. Thiazolidinediones are PPAR-gamma agonists that improve insulin sensitivity. Ref: Pharmacology — oral hypoglycaemics; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q20 [2018] — Antipsychotic extrapyramidal side effects
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Psychotropic Drugs',
  'The extrapyramidal side effects of antipsychotic drugs include:',
  'Tardive dyskinesia, opisthotonus, hallucinations',
  'Parkinsonism, tardive dyskinesia, opisthotonus',
  'Hallucinations, excessive appetite, akinesia',
  'Impotence, echolalia, opisthotonus',
  'B',
  'Extrapyramidal side effects (EPS) of antipsychotics result from dopamine D2 receptor blockade in the nigrostriatal pathway. They include: drug-induced parkinsonism (rigidity, bradykinesia, tremor), acute dystonias (sustained muscle contractions including opisthotonus — sustained spasm of back muscles in hyperextension), akathisia (motor restlessness) and tardive dyskinesia (late-onset, often irreversible involuntary movements). Hallucinations are a symptom of the psychotic illness, not an EPS. Ref: Pharmacology — antipsychotics; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q21 [2018] — TB combination chemotherapy rationale
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'Combined chemotherapy of tuberculosis is used to:',
  'Decrease mycobacterial drug resistance',
  'Increase mycobacterial drug resistance',
  'Decrease the antimicrobial activity',
  'Decrease the onset of antimycobacterial drug biotransformation',
  'A',
  'Mycobacterium tuberculosis has a high rate of spontaneous mutations conferring resistance to individual drugs. Combination therapy with multiple anti-TB drugs (e.g. RHZE — rifampicin, isoniazid, pyrazinamide, ethambutol) prevents the selection and emergence of drug-resistant mutants: the probability of a bacillus being resistant to two or more unrelated drugs simultaneously is extremely low. This is the cornerstone principle of DOTS therapy. Ref: MOH Kenya National TB and Leprosy Programme (NTLP) guidelines; WHO TB treatment guidelines.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q22 [2018] — Antacid administration instructions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Gastrointestinal Drugs',
  'When teaching about the proper use of antacids, a nurse should instruct the client to:',
  'Stagger the administration of antacids with other medications',
  'Take the antacids with all other medications',
  'Take other medications in the daytime and antacids at night',
  'Drink a glass of water immediately after taking the antacids',
  'A',
  'Antacids raise gastric pH and can adsorb or chelate many co-administered drugs, reducing their oral bioavailability. Separating (staggering) antacid intake from other oral medications by at least 1–2 hours prevents these drug-antacid interactions. For example, antacids reduce absorption of fluoroquinolones, tetracyclines and iron. Taking them simultaneously (option B) would cause this interaction. Ref: Pharmacology — GI drugs/drug interactions; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q23 [2018] — Taeniasis treatment
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Anthelmintics',
  'A 9-year-old schoolgirl has been diagnosed with taeniasis. The drug of choice in this case would be:',
  'Ivermectin',
  'Praziquantel',
  'Diethylcarbamazine',
  'Albendazole',
  'B',
  'Praziquantel is the drug of choice for taeniasis (intestinal tapeworm infection — Taenia solium or T. saginata). It causes spastic paralysis of the parasite and disrupts the tegument, leading to immune-mediated death. A single oral dose is highly effective. Ivermectin is used for onchocerciasis and strongyloidiasis. Diethylcarbamazine (DEC) is used for lymphatic filariasis. Albendazole is an alternative for taeniasis but is second-line. Ref: Pharmacology — anthelmintics; MOH Kenya/WHO antiparasitic guidelines.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q24 [2018] — 4-aminoquinoline antimalarials
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimalarials',
  '4-aminoquinoline derivative antimalarial drugs include:',
  'Quinine, amodiaquine, chloroquine',
  'Halofantrine, fansidar, hydroxychloroquine',
  'Amodiaquine, chloroquine, hydroxychloroquine',
  'Mefloquine, artesunate, artemether',
  'C',
  '4-aminoquinolines are a subclass of quinoline antimalarials characterised by a 4-amino substituent on the quinoline ring. The class includes chloroquine, amodiaquine and hydroxychloroquine. Quinine is a quinoline-methanol (different subclass). Mefloquine is a 4-quinoline-methanol. Artesunate and artemether are artemisinin sesquiterpene derivatives (endoperoxides), structurally unrelated to quinolines. Halofantrine is a phenanthrene-methanol. Ref: Pharmacology — antimalarial drugs; NCK curriculum.',
  'hard', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q25 [2018] — Diuretics classification
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Cardiovascular Drugs',
  'The drugs that are classified as diuretics include:',
  'Mannitol, Acetazolamide',
  'Chlorothiazide, Digoxin',
  'Theophylline, Bumetanide',
  'Furosemide, Amytal',
  'A',
  'Mannitol is an osmotic diuretic; acetazolamide is a carbonic anhydrase inhibitor diuretic — both are established diuretic drug classes. Options B–D each pair a diuretic with a non-diuretic: digoxin is a cardiac glycoside; theophylline is a methylxanthine bronchodilator (with weak diuretic properties but not classified as a diuretic); amytal (amobarbital) is a barbiturate. Ref: Pharmacology — diuretics; NCK curriculum.',
  'medium', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q26 [2018] — Methotrexate toxicity antidote
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antineoplastics and Antidotes',
  'The drug used to treat methotrexate toxicity is:',
  'Folic acid',
  'Folinic acid',
  'Vitamin B6',
  'Scopolamine',
  'B',
  'Folinic acid (leucovorin/calcium folinate) is the "rescue" agent for methotrexate toxicity. Methotrexate inhibits dihydrofolate reductase (DHFR), blocking production of tetrahydrofolate (the active reduced form). Folinic acid (5-formyl THF) bypasses the DHFR block by providing reduced folate directly, rescuing normal cells from methotrexate toxicity. Folic acid (dihydrofolate) cannot bypass the DHFR block and is ineffective as an antidote. Ref: Pharmacology — antineoplastics/antidotes; NCK curriculum.',
  'hard', 'approved', 2018, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2019 — BScN Paper I (Pharmacology) ─────────────────────────────────

-- Q1 [2019] — Praziquantel contraindication
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Anthelmintics',
  'The major contraindication of Praziquantel is its use in patients with:',
  'Hepatic dysfunction',
  'Ocular cysticercosis',
  'Lymphadenopathy',
  'Peptic ulcer disease',
  'B',
  'Praziquantel is contraindicated in ocular cysticercosis (cysticerci lodged in the eye). Killing the parasite within the eye triggers a local inflammatory response to dying cyst antigens, which can cause irreversible damage to the retina, choroid or other ocular structures, potentially leading to blindness. In neurocysticercosis, praziquantel is used cautiously with corticosteroids. Hepatic dysfunction requires dose reduction but is not an absolute contraindication. Ref: Pharmacology — anthelmintics; WHO model formulary.',
  'hard', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2019] — Indomethacin cardiovascular side effects
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'NSAIDs',
  'The major side effects of Indomethacin on the cardiovascular system are:',
  'Venous thrombosis, bleeding',
  'Angina pectoris, hypotension',
  'Endocarditis, atrial fibrillation',
  'Hypertension, oedema',
  'D',
  'Indomethacin is a potent non-selective NSAID. By inhibiting COX-1 and COX-2, it reduces prostaglandin synthesis, leading to sodium and water retention (by the kidneys) with resulting peripheral oedema and raised blood pressure (hypertension). This is a class effect of NSAIDs, more pronounced with indomethacin. NSAIDs do not cause angina, endocarditis or atrial fibrillation as direct CVS effects. Ref: Pharmacology — NSAIDs; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2019] — Drug half-life definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Pharmacokinetics',
  'The time that is required to reduce the concentration of a drug in the body by one half is called:',
  'Time course',
  'Time period',
  'Half-life',
  'Half lifespan',
  'C',
  'The plasma half-life (t½) of a drug is the time required for the drug concentration in plasma (or the total amount in the body) to decrease by 50%. It determines dosing frequency: drugs with short half-lives require more frequent dosing. After 4–5 half-lives, the drug is essentially eliminated. Ref: Pharmacology — pharmacokinetics; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2019] — Sulphonamides classification
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'The drugs that are classified as sulphonamides include:',
  'Cotrimoxazole, Sulfamethoxazole, Sulfasalazine',
  'Sulfadiazine, Sulfisoxazole, Spironolactone',
  'Sulfinpyrazone, Sulfasalazine, Sulfamethoxazole',
  'Cefpodoxime proxetil, Cotrimoxazole, Sulfadiazine',
  'A',
  'True sulphonamides include sulfamethoxazole (component of cotrimoxazole/co-trimoxazole), sulfasalazine (used in inflammatory bowel disease and rheumatoid arthritis) and cotrimoxazole (sulfamethoxazole + trimethoprim combination). Option B incorrectly includes spironolactone (a potassium-sparing diuretic). Option C includes sulfinpyrazone (a uricosuric, not an antibiotic). Option D includes cefpodoxime (a 3rd-gen cephalosporin). Ref: Pharmacology — antimicrobials; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2019] — Poisons definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Toxicology',
  'The drugs that have almost exclusively harmful effects in the body are known as:',
  'Elixirs',
  'Xenobiotics',
  'Toxins',
  'Poisons',
  'D',
  'Poisons are substances whose predominant and almost exclusive biological effect on the body is harmful. This distinguishes them from drugs (which have therapeutic effects at appropriate doses) and xenobiotics (any substance foreign to an organism, which may be harmless or harmful). Elixirs are sweetened hydroalcoholic pharmaceutical preparations. Toxins are specifically biologically produced poisons (from living organisms), a subset of poisons. Ref: Pharmacology and toxicology — basic concepts; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2019] — Teratogenicity definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Drugs in Pregnancy',
  'The possibility of harmful effects on the foetus during the formative stages of development is referred to as:',
  'Tetralogy',
  'Teratogenicity',
  'Mutation',
  'Regeneration',
  'B',
  'Teratogenicity is the capacity of a physical, chemical or biological agent to cause structural or functional abnormalities in the developing embryo or foetus, particularly during organogenesis (weeks 3–8). Teratogens include certain drugs (thalidomide, valproate, warfarin), alcohol, infections (rubella, CMV) and radiation. Mutation is a change in DNA sequence. Tetralogy refers to a group of four related defects. Regeneration is tissue repair/regrowth. Ref: Pharmacology — drugs in pregnancy; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2019] — Nifedipine mode of action
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Cardiovascular Drugs',
  'The mode of action of Nifedipine (Adalat) is that it:',
  'Inhibits calcium ion influx across cardiac and smooth muscle cells, decreasing myocardial contractility and oxygen demand',
  'Stabilizes the neuronal membrane and limits seizure activity',
  'Depresses monosynaptic and polysynaptic transmission in the CNS',
  'Increases the amount of noradrenaline or serotonin in the central nervous system',
  'A',
  'Nifedipine is a dihydropyridine calcium channel blocker. It blocks L-type voltage-gated calcium channels in vascular smooth muscle and cardiac muscle cells, reducing Ca2+ influx, causing vasodilation (reduces afterload and blood pressure) and decreased myocardial contractility and oxygen demand. It is used for hypertension and angina. Options B and C describe anticonvulsant mechanisms; option D describes antidepressant mechanisms. Ref: Pharmacology — cardiovascular drugs; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2019] — Diclofenac mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'NSAIDs',
  'Diclofenac sodium produces anti-inflammatory, analgesic and antipyretic effects possibly by inhibiting the synthesis of:',
  'Dopamine',
  'Prostaglandin',
  'Serotonin',
  'Monoamine oxidase',
  'B',
  'Diclofenac sodium is a non-selective NSAID that inhibits cyclooxygenase-1 (COX-1) and COX-2 enzymes, blocking the conversion of arachidonic acid to prostaglandins and thromboxanes. Prostaglandins mediate inflammation, sensitise nociceptors (pain) and raise the hypothalamic set-point (fever). By reducing prostaglandin synthesis, diclofenac produces anti-inflammatory, analgesic and antipyretic effects. Ref: Pharmacology — NSAIDs; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2019] — Antiulcer agents
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Gastrointestinal Drugs',
  'The antiulcer agents include:',
  'Cimetidine, Laroxyl',
  'Omeprazole, Tramadol',
  'Famotidine, Sucralfate',
  'Praziquantel, Ranitidine hydrochloride',
  'C',
  'Famotidine is an H2-receptor antagonist (reduces gastric acid secretion) and sucralfate is a mucosal protective agent (polymerises in acidic pH to coat ulcer base) — both are anti-ulcer drugs. Options A, B and D each pair an anti-ulcer agent with an unrelated drug: Laroxyl (amitriptyline, tricyclic antidepressant); tramadol (opioid analgesic); praziquantel (anthelmintic). Ref: Pharmacology — drugs for peptic ulcer disease; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2019] — Salbutamol mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Respiratory Drugs',
  'The mode of action of salbutamol sulphate is that it:',
  'Inhibits phosphodiesterase, relaxing bronchial smooth muscle and pulmonary blood vessels',
  'Relaxes bronchial and uterine smooth muscle by acting on beta-adrenergic receptors',
  'Stimulates alpha and beta adrenergic receptors within the sympathetic nervous system',
  'Inhibits vagally mediated reflexes by antagonising acetylcholine',
  'B',
  'Salbutamol (albuterol) is a selective beta-2 adrenergic agonist. Activation of beta-2 receptors in bronchial smooth muscle causes relaxation and bronchodilation (therapeutic use in asthma/COPD). Activation of beta-2 receptors in uterine smooth muscle also causes relaxation (tocolysis — used to delay premature labour). Phosphodiesterase inhibition is the mechanism of theophylline. Anticholinergics (e.g. ipratropium) inhibit vagally mediated bronchoconstriction. Ref: Pharmacology — respiratory drugs; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2019] — Anti-anxiety agents
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Anxiolytics',
  'The anti-anxiety agents include:',
  'Aminophylline, Halazepam',
  'Ranitidine, Buspirone',
  'Meprobamate, Chlordiazepoxide',
  'Parzepam, Simethicone',
  'C',
  'Meprobamate is a carbamate anxiolytic and chlordiazepoxide is a classic benzodiazepine anxiolytic — both are established anti-anxiety (anxiolytic) agents. Options A, B and D each pair one anxiolytic with an unrelated drug: aminophylline is a bronchodilator; ranitidine is an H2-receptor antagonist (anti-ulcer); simethicone is an anti-flatulent/defoaming agent. Ref: Pharmacology — anxiolytics/sedatives; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2019] — Drug receptor definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Pharmacodynamics',
  'The component of a cell or organism that interacts with a drug and initiates the chain of events leading to the drug''s observed effects is called:',
  'An agonist',
  'An antagonist',
  'An effector',
  'A receptor',
  'D',
  'A receptor is the specific cellular macromolecule (typically a protein) with which a drug or endogenous ligand interacts to initiate a pharmacological effect. Binding to the receptor triggers a cascade of intracellular events leading to the observed biological response. An agonist is a drug that binds and activates a receptor. An antagonist binds but does not activate it (blocks agonist action). An effector is the downstream component that produces the biological response. Ref: Pharmacology — pharmacodynamics; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 [2019] — Gentamicin mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'The mode of action of gentamicin sulphate is:',
  'Inhibition of bacterial cell wall synthesis',
  'Inhibition of protein synthesis',
  'Inhibition of DNA synthesis',
  'Inhibition of folic acid (DHF reductase)',
  'B',
  'Gentamicin is an aminoglycoside antibiotic that binds irreversibly to the 30S ribosomal subunit of bacteria, causing misreading of mRNA and inhibiting protein synthesis. This ultimately leads to bactericidal cell death. Beta-lactams inhibit cell wall synthesis. Fluoroquinolones inhibit DNA gyrase/topoisomerase (DNA synthesis). Sulphonamides and trimethoprim inhibit folate synthesis (DHFR). Ref: Pharmacology — antimicrobials; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 [2019] — Potentiation drug interaction
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Drug Interactions',
  'The effect of combining drugs, where one drug which has no effect increases the effects of another drug, is termed:',
  'Potentiation',
  'Antagonism',
  'Addition',
  'Agonism',
  'A',
  'Potentiation (or supra-additive synergism) occurs when a drug that has little or no pharmacological effect of its own nevertheless increases (potentiates) the effect of another pharmacologically active drug, producing an effect greater than would be expected from the active drug alone. Antagonism occurs when one drug reduces the effect of another. Additive (summation) effect is when two active drugs together produce an effect equal to the sum of their individual effects. Agonism refers to receptor activation. Ref: Pharmacology — drug interactions; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q15 [2019] — Ipratropium bromide classification and use
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Respiratory Drugs',
  'Ipratropium bromide is:',
  'A cholinergic agent used for perennial rhinitis',
  'An anticholinergic used for allergic rhinitis and colds',
  'Only used in patients with asthma',
  'Inappropriate for use in allergic rhinitis',
  'B',
  'Ipratropium bromide is an anticholinergic (antimuscarinic) drug. Inhaled, it blocks muscarinic receptors in bronchial smooth muscle and glands. As a bronchodilator it is used in asthma and COPD. As a nasal spray (Atrovent nasal) it reduces watery secretions in allergic rhinitis, non-allergic rhinitis and the common cold — so it is appropriate for rhinitis (option D is wrong). It is not a cholinergic agent. It is not limited to asthma only. Ref: Pharmacology — respiratory/autonomic drugs; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q16 [2019] — Route with highest patient compliance
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Routes of Drug Administration',
  'The route of drug administration with the highest compliance from patients is:',
  'Intramuscular',
  'Intravenous',
  'Oral',
  'Intrathecal',
  'C',
  'The oral (per os) route achieves the highest patient compliance because it is non-invasive, painless, convenient, does not require a healthcare professional to administer, and allows self-medication. Parenteral routes (IM, IV, intrathecal) require needles, trained personnel and aseptic technique, which reduce patient comfort and compliance. The IV route gives 100% bioavailability but the lowest compliance. Ref: Pharmacology — routes of drug administration; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q17 [2019] — Cimetidine: reduced libido/impotence
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Gastrointestinal Drugs',
  'A patient on anti-ulcer therapy complains of reduced libido and impotence. The nurse informs him that it may be associated with:',
  'Nizatidine',
  'Cimetidine',
  'Ranitidine',
  'Famotidine',
  'B',
  'Cimetidine (the first H2-receptor antagonist) has anti-androgenic properties; it blocks androgen (testosterone/dihydrotestosterone) receptors and inhibits hepatic cytochrome P450 enzymes, raising oestrogen levels. This causes gynaecomastia, reduced libido and impotence/sexual dysfunction in men. Ranitidine, famotidine and nizatidine have negligible anti-androgenic activity and do not cause these effects. Ref: Pharmacology — H2-receptor antagonists; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q18 [2019] — Bulk-forming laxatives
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Gastrointestinal Drugs',
  'Bulk-forming laxatives:',
  'Function like dietary fibre',
  'Act within 2 to 6 hours',
  'Produce a semi-fluid stool',
  'Are used to prepare the bowel for diagnostic procedures',
  'A',
  'Bulk-forming laxatives (e.g. psyllium/ispaghula husk, methylcellulose) are hydrophilic polysaccharides that absorb water in the GIT, swell to form a soft gel, increase stool bulk and stimulate peristalsis — mimicking the action of dietary fibre. They take 1–3 days to act (not 2–6 hours — that describes stimulant laxatives). They produce formed/semi-solid stools, not semi-fluid. Bowel preparation for endoscopy requires osmotic or stimulant agents (e.g. polyethylene glycol, bisacodyl). Ref: Pharmacology — GI drugs; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q19 [2019] — Diazepam mechanism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'CNS Depressants',
  'Diazepam exerts its effects by:',
  'Binding on GABA receptors in the brain',
  'Inhibiting serotonin action',
  'Blocking acetylcholine at the synaptic cleft',
  'Increasing the influx of sodium into neurons',
  'A',
  'Diazepam is a benzodiazepine that binds to the benzodiazepine site on the GABA-A receptor complex, a ligand-gated chloride channel. This enhances the frequency of chloride channel opening in response to GABA (gamma-aminobutyric acid — the main inhibitory CNS neurotransmitter), increasing Cl- influx, hyperpolarising the neuron and producing anxiolytic, sedative, anticonvulsant and muscle-relaxant effects. Sodium influx increases depolarisation (opposite effect). Ref: Pharmacology — CNS depressants/benzodiazepines; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q20 [2019] — Sublingual nitroglycerin rationale
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Cardiovascular Drugs',
  'In a patient suffering from angina, nitroglycerin may be given sublingually because this mode of administration:',
  'Bypasses the coronary circulation',
  'Causes less reflex tachycardia than oral administration',
  'Improves patient compliance',
  'Avoids first-pass hepatic metabolism',
  'D',
  'Sublingual (SL) nitroglycerin is absorbed directly through the highly vascular oral mucosa into the systemic venous drainage, bypassing the portal circulation and thus avoiding extensive first-pass hepatic metabolism (which destroys >90% of orally ingested nitroglycerin). This ensures rapid, high systemic bioavailability within 1–3 minutes for rapid relief of acute angina. Oral nitroglycerin has very low bioavailability due to first-pass metabolism. Ref: Pharmacology — antianginal/nitrate drugs; NCK curriculum.',
  'hard', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q21 [2019] — Bacillary dysentery treatment in adults
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'The most appropriate drug for treatment of bacillary dysentery in adults is:',
  'Ciprofloxacin',
  'Amoxycillin',
  'Erythromycin',
  'Gentamicin',
  'A',
  'Bacillary dysentery (shigellosis, caused by Shigella spp.) in adults is treated with ciprofloxacin (a fluoroquinolone) as the first-line agent per WHO and MOH Kenya STI/diarrhoeal disease guidelines, owing to widespread resistance to ampicillin, amoxicillin and cotrimoxazole. Erythromycin is an alternative for children where quinolones are avoided. Gentamicin is for serious systemic infections and not first-line for dysentery. Ref: MOH Kenya National Guidelines for Diarrhoeal Diseases; WHO.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q22 [2019] — Most common morphine side effect
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Analgesics',
  'The commonest side effect associated with morphine is:',
  'Development of gastric ulcers',
  'Nausea and vomiting',
  'Constipation',
  'Tachypnoea',
  'C',
  'Constipation is the most common and persistent adverse effect of morphine and all opioid analgesics. Opioids reduce GI motility by binding mu-opioid receptors in the gut wall, decreasing peristalsis and increasing sphincter tone. Unlike other opioid side effects (nausea, sedation, respiratory depression), tolerance to constipation does NOT develop with prolonged use, necessitating concurrent laxative prescription. Nausea and vomiting are common initially but tolerance develops. Tachypnoea is opposite to the expected respiratory depression. Ref: Pharmacology — opioid analgesics; NCK curriculum.',
  'easy', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q23 [2019] — HAART effects
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antiretrovirals',
  'Highly active antiretroviral therapy (HAART) in HIV infection is associated with:',
  'An increase in the rate of emergence of drug resistance',
  'A decrease in CD4 count',
  'A decrease in viral RNA in the blood',
  'An increased incidence of opportunistic infections',
  'C',
  'Effective HAART suppresses HIV replication to undetectable levels, producing: a decrease in plasma viral RNA (viral load); an increase in CD4+ T-lymphocyte count (immune reconstitution); and a marked reduction in opportunistic infections and AIDS-related mortality. The rationale for combination antiretroviral therapy is precisely to PREVENT the emergence of drug resistance, not increase it. Ref: NASCOP/MOH Kenya ART guidelines (current edition); WHO consolidated ARV guidelines.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q24 [2019] — Beta-lactamase resistance: ceftriaxone
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Antimicrobials',
  'Beta-lactamase production is a mechanism of resistance among strains of Haemophilus influenzae and Neisseria gonorrhoeae. Which of the following drugs is effective against the above organisms?',
  'Amoxicillin',
  'Ceftriaxone',
  'Clindamycin',
  'Ticarcillin',
  'B',
  'Beta-lactamases hydrolyse the beta-lactam ring, inactivating penicillins and some cephalosporins. Ceftriaxone (a 3rd-generation cephalosporin) is stable to most beta-lactamases produced by H. influenzae and N. gonorrhoeae and is effective as treatment. Amoxicillin and ticarcillin are penicillins readily hydrolysed by beta-lactamases from these organisms. Clindamycin is a lincosamide with limited activity against H. influenzae and no activity against N. gonorrhoeae. Ref: Pharmacology — antimicrobials; MOH Kenya STI guidelines.',
  'hard', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q25 [2019] — Warfarin properties
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Anticoagulants',
  'Regarding warfarin:',
  'It is a rapid-acting anticoagulant',
  'It has poor absorption across membranes',
  'It has teratogenic effects when administered in pregnancy',
  'It is administered through the intravenous route',
  'C',
  'Warfarin is teratogenic (causes fetal warfarin syndrome — nasal hypoplasia, stippled epiphyses, optic atrophy, CNS abnormalities) and is contraindicated throughout pregnancy. Warfarin is a SLOW-acting anticoagulant (onset 24–72 hours; full effect after 5–7 days, as it depletes existing vitamin K-dependent clotting factors). It is administered ORALLY and is well absorbed from the GIT. Heparin is the rapid-acting, parenteral anticoagulant used in pregnancy when anticoagulation is needed. Ref: Pharmacology — anticoagulants; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q26 [2019] — Cromolyn mechanism in asthma
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Pharmacology', 'Anti-Asthmatic Drugs',
  'Cromolyn is useful in asthma because it:',
  'Suppresses the release of histamine',
  'Blocks adenosine receptors in the smooth muscles of bronchioles',
  'Decreases bronchial hyperreactivity directly',
  'Decreases bacterial load in the bronchioles',
  'A',
  'Cromolyn sodium (sodium cromoglicate) is a mast cell stabiliser used for prophylaxis of asthma. It prevents degranulation of sensitised mast cells, suppressing the release of histamine, leukotrienes, prostaglandins and other inflammatory mediators triggered by allergen exposure or exercise. It does not bronchodilate, does not block adenosine receptors (that is theophylline''s partial mechanism) and has no antibacterial activity. It must be used preventively, not for acute relief. Ref: Pharmacology — anti-asthmatic drugs; NCK curriculum.',
  'medium', 'approved', 2019, 'Paper I'
) ON CONFLICT (stem, cadre) DO NOTHING;
