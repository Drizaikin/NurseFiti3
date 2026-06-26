-- =============================================================================
-- SEED: NCK MCQ Compilation with Answers & Rationales
-- Batch 4: KRCHN — Paper II (Community Health + Mental Health + Professional Issues)
-- =============================================================================
-- Source: NCK-MCQ-Compilation-Answers-Rationales.docx
-- Cadre: KRCHN
-- Paper: 'Paper II' (Community Health + Mental Health + Research/Statistics +
--                    Health Systems + Environmental Health + Nutrition + IPC)
-- exam_year: Per year stated in document header
-- Status: approved | contributor_id: NULL
-- Conflict: ON CONFLICT (stem, cadre) DO NOTHING
-- Rationale audit: verified against MOH Kenya, Park's, Kenya IMNCI, WHO
-- =============================================================================

-- ─── YEAR 2007 — KRCHN Paper II ───────────────────────────────────────────────

-- Q1 [2007] — Poliomyelitis clinical types
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'The following are clinical types of poliomyelitis: (i) Flaccid poliomyelitis (ii) Abortive poliomyelitis (iii) Non-abortive poliomyelitis (iv) Non-paralytic poliomyelitis',
  'i, iii, iv',
  'i, ii, iv',
  'ii, iv, i',
  'iii, iv, ii',
  'B',
  'The recognised clinical forms of poliomyelitis are: (1) Inapparent/subclinical infection (majority); (2) Abortive poliomyelitis (ii) — minor illness, fever/malaise, no CNS involvement; (3) Non-paralytic poliomyelitis (iv) — aseptic meningitis without paralysis; (4) Paralytic poliomyelitis — further divided into spinal (flaccid/i), bulbar and bulbospinal forms. "Non-abortive" (iii) is not a recognised clinical classification and is the distractor. The correct combination is i, ii, iv. Ref: Park''s Textbook of Preventive and Social Medicine; MOH Kenya EPI programme; NCK Community Health curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2007] — Spacing methods of family planning
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Family Planning',
  'The following are examples of "spacing methods" of family planning:',
  'Natural methods, chemical barriers, vasectomy',
  'Mechanical barriers, tubectomy, chemical barriers',
  'Tubectomy, vasectomy, natural methods',
  'Chemical barriers, natural methods, mechanical barriers',
  'D',
  'Family planning methods are classified as: SPACING (temporary/reversible) — allow couples to delay or space births, including natural/fertility-awareness methods (Billings, LAM, rhythm), chemical barriers (spermicides, vaginal films) and mechanical barriers (male/female condoms, diaphragm, IUCDs). LIMITING (permanent/terminal) — vasectomy and tubectomy (female sterilisation). Any option containing vasectomy or tubectomy cannot be a "spacing method". Option D correctly lists only reversible methods. Ref: MOH Kenya National Family Planning Guidelines; WHO.',
  'easy', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2007] — Water-based diseases definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Environmental Health',
  'In environmental health, water-based diseases are:',
  'Due to the presence of an aquatic host',
  'Caused by vectors that live near aquatic conditions',
  'Caused by poor quality of water',
  'Due to inadequate quantities of water',
  'A',
  'Bradley''s classification of water-related diseases: WATER-BORNE = transmitted via contaminated water (poor quality, e.g. cholera, typhoid); WATER-WASHED = caused by lack of water for hygiene (inadequate quantity, e.g. trachoma, scabies); WATER-BASED = require an aquatic intermediate host to complete the parasite''s life cycle (e.g. schistosomiasis via snails, guinea worm via cyclops); WATER-RELATED VECTOR-BORNE = transmitted by vectors that breed near water (e.g. malaria, onchocerciasis). Option A correctly defines water-BASED diseases. Ref: Park''s Textbook; NCK Community Health curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2007] — Marasmus clinical features
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Nutrition',
  'A child with marasmus will present with the following clinical symptoms:',
  'Oedema of the legs but not the face',
  'Very poor appetite',
  'Diffuse depigmentation',
  'No hepatic enlargement',
  'D',
  'Marasmus is severe acute malnutrition (SAM) primarily from energy deficiency. Features: severe wasting (loss of muscle and fat), "old man" facies, baggy skin, prominent ribs, marked emaciation, BUT: NO OEDEMA (oedema is kwashiorkor), NO hepatomegaly (fatty liver is kwashiorkor), NO skin/hair depigmentation (flag sign/skin changes are kwashiorkor), and the child may retain a relatively good appetite and be alert. Hence "no hepatic enlargement" is correct for marasmus. Ref: Kenya IMNCI; MOH Kenya/WHO management of SAM.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2007] — Focused ANC: birth preparedness
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Maternal and Child Health',
  'In focused antenatal care:',
  'The mother is encouraged to visit the antenatal clinic at least seven times during pregnancy',
  'The mother is encouraged to save some money for buying baby clothes when born',
  'The mother is encouraged to decide on the place of birth when labour begins',
  'The mother is encouraged to make transport arrangements several months before her time of delivery',
  'D',
  'Focused Antenatal Care (FANC) is a goal-directed model emphasising quality over quantity of visits. A key component is BIRTH PREPAREDNESS AND COMPLICATION READINESS (BPCR) — the mother is counselled well in advance to: identify a skilled birth attendant and place of delivery; save money for delivery costs; arrange transport BEFORE labour begins; identify blood donors; recognise danger signs. WHO 2016 guidelines recommend at minimum 8 contacts (previously 4 FANC visits), not 7. Decisions on place of birth should be made during pregnancy, not when labour begins. Ref: MOH Kenya FANC guidelines; WHO ANC model.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2007] — Disease incidence: person-years at risk
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Epidemiology',
  'In determination of disease incidence:',
  'The total population is considered',
  'The ability of disease to recur is not considered',
  'Persons-years time at risk is considered',
  'All the individuals suffering from the disease are considered',
  'C',
  'Incidence measures the rate of occurrence of NEW cases in a population over a defined time period. The incidence rate (density) uses PERSON-TIME at risk (person-years) as the denominator, accounting for the time each individual was actually at risk of developing the disease. This is especially important when the observation period varies between individuals or when the outcome can recur. Prevalence (not incidence) counts all existing cases. Ref: Epidemiology — NCK Community Health Nursing curriculum; Park''s Textbook.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2007] — Kenya demographic trend since 1969: life expectancy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Demography',
  'The demographic trends in Kenya indicate that since 1969 to date:',
  'The crude birth rate has increased',
  'The infant mortality rate has increased',
  'Life expectancy at birth has increased',
  'Total fertility rate has increased',
  'C',
  'Kenya''s long-term demographic transition since 1969 shows: life expectancy at birth has INCREASED (from ~47 years in 1969 to approximately 68–70 years currently per KNBS 2019 census data). The crude birth rate, infant mortality rate (IMR) and total fertility rate (TFR) have all shown a declining trend over this period as part of the demographic transition, though rates of decline have varied. Ref: Kenya National Bureau of Statistics (KNBS); Kenya Demographic and Health Surveys (KDHS) trend analysis.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2007] — FP counselling HIV+ client: drug interactions
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Family Planning',
  'The following should be highly considered when counselling on family planning for an HIV-positive client:',
  'Drug interactions between hormonal methods and anti-tuberculosis drugs',
  'The client''s current stage of AIDS',
  'The client''s nutritional status',
  'The client''s economic status and source of funding',
  'A',
  'Many HIV-positive clients are co-infected with TB and receive rifampicin-based treatment. Rifampicin is a potent inducer of hepatic cytochrome P450 enzymes, significantly accelerating metabolism of combined oral contraceptives, injectables and implants, potentially reducing their efficacy to below contraceptive threshold. This is the MOST critical pharmacological consideration in FP counselling for this group — a barrier method (condom) or IUCD should be offered concurrently. Ref: MOH Kenya National Family Planning Guidelines; WHO Medical Eligibility Criteria for Contraceptive Use (MEC).',
  'hard', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2007] — HIV+ family: de-stigmatisation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'HIV/AIDS Care',
  'When preparing a family for their parents'' changed role due to HIV status, an important aspect to consider is:',
  'Drug therapy instructions',
  'Nutritional and diet preparation',
  'De-stigmatisation of the infected',
  'Exercise schedule for the infected',
  'C',
  'Stigma and discrimination are the primary psychosocial barriers to HIV disclosure, adherence, support-seeking and family adaptation. De-stigmatisation — helping the family understand the illness, challenge stigmatising beliefs, accept the infected member and maintain their dignity — is the foundational psychosocial intervention that enables all other aspects of care (adherence, role adaptation, support). Drug therapy, nutrition and exercise are important but cannot be effectively managed in the context of unaddressed stigma. Ref: NASCOP/MOH Kenya HIV psychosocial care guidelines; UNAIDS.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2007] — Grief resolution: prolonged if love-hate association
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Loss and Grief',
  'The resolution stage of the grief response:',
  'Lasts less than six months',
  'May be prolonged if there has been a love-hate association',
  'May be prolonged by anticipatory grieving',
  'May be of less intensity if the affected has experienced a number of recent losses',
  'B',
  'Resolution of grief is prolonged and complicated when the relationship with the deceased was ambivalent (a love-hate association) because of unresolved guilt, anger and conflicting emotions. Grief resolution has no fixed time limit — it should not be pathologised if lasting beyond six months per contemporary DSM-5 criteria (Prolonged Grief Disorder threshold is 12 months for adults). Anticipatory grieving generally EASES (not prolongs) subsequent bereavement. Multiple recent losses tend to INTENSIFY grief (cumulative loss) rather than reduce its intensity. Ref: Mental Health/Psychiatric Nursing texts; DSM-5 Prolonged Grief Disorder criteria.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2007] — Freudian anal stage: personality traits
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Growth and Development',
  'Mrs. Mama has laid down strict and rigid rules for her baby during toilet training. The characteristics the baby is likely to exhibit in adulthood include: (i) Stubbornness (ii) Malevolence (iii) Disorganisation (iv) Stinginess (v) Miserliness',
  'i, iii and iv',
  'ii, iii and iv',
  'i, iv and v',
  'i, ii and iv',
  'C',
  'According to Freud''s psychosexual theory, the anal stage (ages 1.5–3 years) centres on toilet training. Excessive strictness/over-control during this stage leads to the "anal-retentive" personality: obstinacy/stubbornness (i), orderliness, stinginess (iv) and miserliness (v). These traits stem from the child''s struggle for control over bodily functions being transformed into character traits. Malevolence (ii) and disorganisation (iii) are not features of the anal-retentive character (disorganisation is actually characteristic of the anal-expulsive type — the opposite of anal-retentive). Ref: Psychiatric/Mental Health Nursing; Freud''s psychosexual development.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2007] — Therapeutic communication: open-ended exploration
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Therapeutic Communication',
  'A patient tells a nurse "I felt very bad when my relatives visited me and I refused to talk to them". The nurse''s best response would be:',
  '"Did they make you feel that way?"',
  '"How did you do that?"',
  '"Do you think they came to visit you just to annoy you?"',
  '"Describe what you were feeling just before your relatives visited you"',
  'D',
  'Option D uses the therapeutic communication technique of EXPLORING/SEEKING CLARIFICATION — inviting the patient to describe and elaborate on their feelings. It is open-ended, non-judgmental, non-leading and patient-centred, facilitating deeper self-expression and insight. Option A implies the relatives caused the feeling (leading/suggestion). Option B is closed and literal (focuses on the behaviour not the feeling). Option C is challenging and potentially confrontational, introducing a negative interpretation. Ref: Therapeutic communication — Mental Health Nursing; Townsend; NCK curriculum.',
  'easy', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 [2007] — Organic mental syndrome with sedative abuse: amnestic
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Substance Use Disorders',
  'The organic mental syndrome associated with sedative abuse is:',
  'Dementia',
  'Amnestic syndrome',
  'Organic hallucinosis',
  'Organic mood disorder',
  'B',
  'Chronic sedative (benzodiazepine, barbiturate) and alcohol abuse classically produces an AMNESTIC SYNDROME — persistent impairment of short-term/recent memory (inability to form new memories/anterograde amnesia) with relative preservation of remote memory, attention and other cognitive functions. In alcohol-related disorder this is Korsakoff''s psychosis (associated with Wernicke''s encephalopathy). Dementia involves broader global cognitive decline. Organic hallucinosis involves persistent hallucinations with clear consciousness. Ref: Psychiatric/Mental Health Nursing; DSM-5 Neurocognitive Disorders.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 [2007] — ADHD drug class: CNS stimulants
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Child and Adolescent Mental Health',
  'Mini, a 7-year-old boy, has been diagnosed with Attention Deficit Hyperactivity Disorder (ADHD). The drug group most likely to be used would be:',
  'Central nervous system depressants',
  'Anticonvulsants',
  'Major tranquilizers',
  'Central nervous system stimulants',
  'D',
  'The paradoxical first-line pharmacological treatment for ADHD is CNS STIMULANTS (methylphenidate/Ritalin, amphetamine/dextroamphetamine). These increase dopamine and norepinephrine activity in the prefrontal cortex, improving attention, impulse control and executive function. The mechanism is not fully understood but relates to activating inhibitory control circuits. CNS depressants, antipsychotics (major tranquilisers) and anticonvulsants are not first-line for ADHD, though some non-stimulant agents (atomoxetine) are used second-line. Ref: Child and Adolescent Mental Health Nursing; Pharmacology; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q15 [2007] — Benzhexol (Artane) daily dosage limit
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Psychopharmacology',
  'Benzhexol (Artane):',
  'Should not be administered to patients with parkinsonian syndrome',
  'May be used safely in patients with prostatic hypertrophy',
  'Should never exceed 15 mg daily dosage',
  'Does not cause orthostatic hypotension',
  'C',
  'Benzhexol (trihexyphenidyl, Artane) is an anticholinergic drug used to treat parkinsonism and drug-induced extrapyramidal side effects. The maximum usual daily dose is 15 mg (in divided doses). It IS indicated for parkinsonian syndrome (option A is wrong). It is CONTRAINDICATED in benign prostatic hypertrophy (BPH) because its antimuscarinic effect can precipitate urinary retention (option B is wrong). It can cause orthostatic hypotension among other anticholinergic side effects (option D is wrong). Ref: Pharmacology; British National Formulary (BNF); NCK curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q16 [2007] — Exhibitionism: intensified with stress and free time
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Sexual Disorders',
  'Exhibitionism:',
  'Occurs for less than 6 months',
  'Occurs equally in both men and women',
  'Is intensified when the perpetrator has excess free time and is under significant stress',
  'Is more frequent in men without satisfying sexual relationships',
  'C',
  'Exhibitionistic disorder (DSM-5) is defined by recurrent urges/behaviours lasting at LEAST 6 months, not less (option A is wrong). It is found predominantly in males (not equally distributed — option B is wrong). The urge to expose is characteristically intensified by stress, boredom and having excessive unstructured free time. Many exhibitionists DO have apparently satisfying adult sexual relationships (option D is incorrect). Treatment includes cognitive-behavioural therapy and, in some cases, anti-androgen medication. Ref: Psychiatric/Mental Health Nursing; DSM-5 criteria for paraphilic disorders.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q17 [2007] — Children of divorced parents: less distress after 2 years
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Family Psychiatry',
  'Children of divorced parents:',
  'Experience distress and dysfunction more in the year preceding divorce',
  'Experience less severe distress after two years of divorce as compared with those children remaining in conflictual marriages',
  'Distress and dysfunction are lowest in the year after divorce',
  'Have similar psychological problems with those of non-divorced parents',
  'B',
  'Research (Hetherington, Wallerstein) consistently shows that: initial distress peaks in the year AFTER divorce (not before; option A is wrong); distress and dysfunction are HIGHEST in the first year post-divorce; after approximately 2 years, most children adjust and show LESS distress than children who remain in homes with chronic high parental conflict. Long-term, persistent parental conflict is more psychologically damaging than the divorce itself. Children of divorced parents do have higher rates of adjustment problems than those in low-conflict intact families (option D is wrong). Ref: Child and Family Mental Health.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q18 [2007] — Intimate partner violence: perpetrator background
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Gender-Based Violence',
  'Mr. Moto has been constantly physically abusing his wife. Mr. Moto:',
  'Is likely to have a diagnosable mental disorder',
  'May predispose his anger on his children',
  'May have come from a background in which violence is frequent and tolerated',
  'May predispose himself to homicide',
  'C',
  'The strongest and most consistently supported correlate of perpetrating intimate partner violence (IPV) is a history of witnessing or experiencing violence in the family of origin — a background where violence is frequent and normalised/tolerated (social learning theory, intergenerational transmission of violence). Most IPV perpetrators do NOT have a diagnosable mental disorder. Displacement of violence onto children (option B) can occur but is not the primary explanation. Increased risk of being killed (not perpetrating homicide) is more relevant for victims. Ref: Mental Health Nursing — gender-based violence; SGBV WHO guidelines; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2008 — KRCHN Paper II (Community Health / Mental Health) ─────────────

-- Q1 [2008] — PHC community participation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Primary Health Care',
  'Community participation in primary health care (PHC) means the:',
  'Community must build their health facilities',
  'Community assumes responsibility for its health services',
  'Leaders of the community should participate in health care',
  'Members of the community should engage in health visits',
  'B',
  'Community participation is one of the eight essential components of Primary Health Care as declared at Alma-Ata (1978). It means the community is actively engaged in planning, implementing, evaluating and taking OWNERSHIP/RESPONSIBILITY for its health and health services, making decisions about healthcare priorities, not merely being passive recipients. Simply building facilities, leadership participation or attending health visits are narrower interpretations; the full concept is community assuming responsibility. Ref: Alma-Ata Declaration 1978; MOH Kenya KEPH framework; NCK Community Health curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2008] — Descriptive epidemiology important characteristics
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Epidemiology',
  'In descriptive epidemiology the important characteristics of study are:',
  'Demographic data',
  'Mortality rates',
  'Disease prevalence',
  'Disease incidence',
  'A',
  'Descriptive epidemiology characterises disease occurrence by PERSON (who?), PLACE (where?) and TIME (when?) — the three axes of descriptive epidemiology. The key data required are demographic data describing the population characteristics (age, sex, occupation, socioeconomic status, geography, time period). Mortality rates, prevalence and incidence are frequency measures USED in descriptive epidemiology, but DEMOGRAPHIC DATA is the overarching "characteristics" that define the axes of description. Ref: Epidemiology — NCK Community Health Nursing curriculum; Park''s Textbook.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2008] — WHO group A drug for gonorrhoea: ceftriaxone
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'The group A drugs recommended by WHO for the treatment of gonorrhoea include:',
  'I.M Spectinomycin 2 g',
  'I.M Ceftriaxone 250 mg',
  'Amoxycillin 3 g with 1 g of Probenecid orally',
  'I.M Kanamycin 2 g',
  'B',
  'Ceftriaxone 250 mg IM single dose is the WHO/MOH Kenya first-line (Group A) recommended treatment for uncomplicated gonorrhoea (urethral, cervical, rectal). It is a 3rd-generation cephalosporin stable against beta-lactamases produced by N. gonorrhoeae. Per current MOH Kenya STI guidelines it is combined with azithromycin 1 g oral single dose for empirical chlamydia co-coverage. Spectinomycin, kanamycin and amoxicillin+probenecid are alternative/second-line agents. Ref: MOH Kenya National STI Management Guidelines; WHO STI treatment guidelines (2016).',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2008] — Combating endemic malaria
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'To effectively combat endemic malaria, health workers should:',
  'Distribute insecticide-treated mosquito nets and intensify health education',
  'Spray larvicides and cut grass',
  'Give more chemoprophylaxis and treat all cases',
  'Provide mosquito nets and clear vegetation',
  'A',
  'The most effective and sustainable approach to combating endemic malaria combines two evidence-based interventions: (1) Long-Lasting Insecticide-Treated Nets (LLINs) — which provide both personal protection and mass killing effect on Anopheles vectors; and (2) Health education — which ensures community understanding of malaria prevention, early treatment-seeking and correct LLIN use. This integrated approach is the cornerstone of Kenya''s National Malaria Control Programme. Blanket chemoprophylaxis is reserved for specific high-risk groups (pregnant women, children under 5 in high-transmission areas). Ref: MOH Kenya National Malaria Control Programme guidelines.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2008] — Severe diarrhoea with sunken eyes/fontanelle: IV fluids
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Child Health (IMNCI)',
  'The immediate treatment for an infant with severe diarrhoea and sunken eyes and fontanelles includes:',
  'Giving an anti-diarrhoeal drug and admit immediately',
  'Taking a blood slide for malarial parasites and then admit',
  'Giving intravenous fluids and then admit',
  'Giving oral rehydration solution plus an antibiotic',
  'C',
  'Sunken eyes and a sunken anterior fontanelle indicate SEVERE dehydration (IMNCI Plan C). Per Kenya IMNCI and WHO guidelines, severe dehydration requires URGENT intravenous rehydration: Ringer''s lactate (or normal saline) 100 ml/kg given over 3 hours (infants) or 3.5 hours (older children) as the Dhaka regimen, followed by reassessment and admission. Anti-diarrhoeal drugs (e.g. loperamide) are ABSOLUTELY CONTRAINDICATED in children. ORS alone is insufficient for severe dehydration. IV access and fluid resuscitation must be the immediate action. Ref: Kenya IMNCI chart booklet; MOH Kenya Basic Paediatric Protocols.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2008] — Home visit preparatory phase: clarifying referral source
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'The Home Visit',
  'The activities the nurse engages in during the preparatory phase of a home visit include:',
  'Location of the house',
  'Clarifying the source of the referral',
  'Recording and reporting',
  'Analysing community references',
  'B',
  'The home visit has three phases: PRE-VISIT (preparatory), IN-HOME, and POST-VISIT. The preparatory phase (conducted before leaving the health facility) involves: reviewing the client''s records; clarifying the source and purpose of the referral; gathering relevant background information; preparing equipment/supplies; planning the visit and notifying the client. Locating the house occurs during the visit. Recording and reporting occurs in the post-visit phase. Ref: Community Health Nursing — the home visit process; NCK curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q18 [2008] — Contact bacterial skin disease: impetigo
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'A contact disease caused by bacteria is:',
  'Scabies',
  'Impetigo',
  'Trachoma',
  'Pediculosis',
  'B',
  'Impetigo is a highly contagious superficial bacterial skin infection caused by Staphylococcus aureus and/or Streptococcus pyogenes (Group A strep), spread by direct contact with infected lesions or contaminated fomites. It is the classic "contact disease caused by bacteria." Scabies is caused by the mite Sarcoptes scabiei (a parasite, not bacteria). Pediculosis is a louse infestation (ectoparasite). Trachoma is a bacterial infection (Chlamydia trachomatis) but presents as an eye disease — the question asks about skin/contact disease. Ref: Communicable disease — NCK Community Health curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q19 [2008] — Normal walking age milestone
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Child Development',
  'A child growing within the normal developmental milestones will be able to walk at the age of:',
  '3-6 months',
  '6-9 months',
  '12-18 months',
  '20-24 months',
  'C',
  'Independent walking is normally achieved between approximately 12 and 18 months. Most children take their first steps around 12 months (range 9–15 months) and walk confidently by 15–18 months. By 18 months the ability to walk is expected; delay beyond 18 months warrants developmental evaluation. At 3–6 months children hold head up and roll; at 6–9 months they sit with support and crawl. Walking at 20–24 months would indicate a developmental delay. Ref: Kenya IMNCI developmental milestones; MOH Kenya Well-Child surveillance; WHO Growth Standards.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q20 [2008] — Calorie needs under 5 years: 100 kcal/kg/day
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Nutrition',
  'The approximate calorie needs for young children under five years are:',
  '500 calories/kg/day',
  '200 calories/kg/day',
  '300 calories/kg/day',
  '100 calories/kg/day',
  'D',
  'Young children under 5 years require approximately 100 kilocalories (kcal) per kilogram of body weight per day for maintenance, growth and physical activity. This is derived from the Holliday-Segar formula basis (100 ml/kg fluid = ~100 kcal/kg for the first 10 kg). For reference: an adult requires approximately 25–35 kcal/kg/day. Children have proportionally higher caloric needs per kg due to rapid growth and higher metabolic rate. Ref: MOH Kenya/WHO Nutrition guidelines; Paediatric Nutritional support (Nelson Paediatrics).',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q21 [2008] — Ringworm of scalp: tinea capitis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'The scientific name for ringworm of the scalp is:',
  'Tinea corporis',
  'Tinea pedis',
  'Tinea capitis',
  'Tinea versicolor',
  'C',
  'Dermatophyte (ringworm) infections are named by anatomical site: Tinea CAPITIS = scalp/head (caput = head); Tinea CORPORIS = body trunk; Tinea PEDIS = feet (athlete''s foot); Tinea UNGUIUM = nails (onychomycosis); Tinea CRURIS = groin (jock itch); Tinea VERSICOLOR (Pityriasis versicolor) = trunk discolouration caused by Malassezia furfur. These are important differential diagnoses in community/school health. Ref: Communicable disease — dermatology; NCK Community Health curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q22 [2008] — Agricultural occupational hazards
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Occupational and Environmental Health',
  'Diseases of agricultural hazards include:',
  'Zoonotic diseases, psychological changes',
  'Zoonotic diseases, toxic hazards',
  'Toxic hazards, psychological changes',
  'Ionizing radiation, toxic hazards',
  'B',
  'Agricultural workers face two major categories of occupational hazard: (1) ZOONOTIC DISEASES — infections transmitted from animals to humans, e.g. brucellosis (from cattle), anthrax (from livestock), rabies, leptospirosis; and (2) TOXIC CHEMICAL HAZARDS — exposure to pesticides, herbicides and fertilisers (organophosphates, carbamates, chlorinated compounds). Ionising radiation is primarily a hazard in healthcare, nuclear industry and mining, not agriculture. Psychological changes are non-specific and not a classic agricultural occupational hazard category. Ref: Occupational/Environmental Health — NCK Community Health curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q23 [2008] — Bamako Initiative founders: WHO and UNICEF
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Health Systems',
  'The international health agencies that were instrumental in starting the Bamako Initiative are:',
  'WHO, CARE',
  'WHO, FAO',
  'UNICEF, UNDP',
  'WHO, UNICEF',
  'D',
  'The Bamako Initiative was launched in September 1987 in Bamako, Mali, jointly by WHO and UNICEF at a conference of African Health Ministers. Its goal was to revitalise and sustain primary health care services in sub-Saharan Africa through community financing, drug revolving funds (cost-sharing) and decentralisation of health service management, thereby improving essential drug availability and utilisation. CARE and FAO are development organisations not primarily involved in health systems reform. UNDP had a secondary supporting role. Ref: Community Health Nursing — history of PHC and health financing; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q24 [2008] — Safe noise exposure level
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Occupational and Environmental Health',
  'The safe noise exposure level that does not cause damage to the tympanic membrane is:',
  '120 dB',
  '125 dB',
  '85 dB',
  '118 dB',
  'C',
  'The recommended occupational noise exposure limit is 85 decibels (dB) time-weighted average over an 8-hour working day (per NIOSH, ILO, Kenya Occupational Health and Safety Act). Prolonged exposure above 85 dB causes progressive noise-induced sensorineural hearing loss (NIHL) due to damage to the cochlear hair cells. Exposure at 120 dB or above can cause immediate acute acoustic trauma (rupture of the tympanic membrane or ossicular damage). Ref: Occupational Health — NCK Community Health Nursing curriculum; Kenya Occupational Safety and Health Act 2007.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q25 [2008] — Occupational health nurse major practice roles
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Occupational Health Nursing',
  'The major practice roles of the occupational health nurse include:',
  'Clinician, administrator',
  'Clinician, professional',
  'Administrator, environmental modifier',
  'Professional, environmental modifier',
  'A',
  'The two MAJOR/PRIMARY practice roles of the occupational health nurse are: (1) CLINICIAN — providing direct clinical services (first aid, health surveillance, pre-employment medicals, management of work-related illness/injury, chronic disease management at the worksite); and (2) ADMINISTRATOR/MANAGER — managing the occupational health unit, planning health programmes, coordinating services, maintaining records. Other recognised roles include educator, consultant, researcher and case manager. Ref: Occupational Health Nursing — NCK Community Health curriculum; AAOHN standards.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q26 [2008] — Drugs reducing hormonal contraceptive efficacy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Family Planning',
  'The drugs that may reduce the efficacy of hormonal contraceptives include:',
  'Rifampicin, ibuprofen',
  'Phenytoin, Griseofulvin',
  'Griseofulvin, digoxin',
  'Rifampicin, chlorpheniramine',
  'B',
  'Hepatic enzyme-inducing drugs accelerate the metabolism of contraceptive steroids (oestrogen and progestogen) by CYP450 enzymes, reducing plasma levels and contraceptive efficacy. Both phenytoin (anticonvulsant) and griseofulvin (antifungal) are enzyme inducers that reduce hormonal contraceptive effectiveness. This is the only option where BOTH drugs are enzyme inducers. Rifampicin is also a potent enzyme inducer but is paired here with ibuprofen/chlorpheniramine (non-inducers). Digoxin, ibuprofen and chlorpheniramine do not reduce contraceptive efficacy. Ref: Pharmacology; MOH Kenya National Family Planning Guidelines; WHO MEC.',
  'hard', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q27 [2008] — Trypanosomiasis vector: tsetse fly
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'The vector that carries the causative organism for trypanosomiasis is:',
  'Fleas',
  'Sand flies',
  'Black flies',
  'Tsetse flies',
  'D',
  'African trypanosomiasis (sleeping sickness) is caused by Trypanosoma brucei gambiense (West/Central Africa) and T. b. rhodesiense (East Africa, including Kenya) and is transmitted by the bite of the TSETSE FLY (Glossina species). American trypanosomiasis (Chagas disease) is transmitted by triatomine bugs. Sand flies transmit leishmaniasis (kala-azar, cutaneous and mucocutaneous). Black flies (Simulium) transmit onchocerciasis (river blindness). Fleas transmit plague (Yersinia pestis) and murine typhus. Ref: Communicable disease — NCK Community Health Nursing curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q28 [2008] — Elderly health improvement measures
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Gerontological Nursing',
  'The measures that would appropriately improve the health of the elderly include:',
  'Mental health services, STI services',
  'Immunization, violence prevention programmes',
  'Home safety programmes, home-based services',
  'STI services, lead-poisoning prevention',
  'C',
  'Health promotion for the elderly focuses on maintaining independence, preventing accidents/falls and supporting ageing-in-place. The most appropriate and specific measures for the elderly are: HOME SAFETY PROGRAMMES (fall prevention — removing hazards, installing grab bars, improving lighting; falls are the leading cause of injury in the elderly); and HOME-BASED CARE SERVICES (domiciliary care, community nursing visits, palliative care). STI services and lead poisoning prevention are more relevant to other age groups. Immunisation is relevant but less specific to elderly health improvement than falls prevention. Ref: Gerontological/Community Health Nursing; NCK curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q29 [2008] — Prevalence rate definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Epidemiology',
  'Prevalence rate is defined as the number of:',
  'Old and new cases of a specified disease existing at a given time',
  'New cases of a disease in a population over a period of time',
  'Old cases of a specified disease existing at a given time',
  'Deaths from a specified disease or condition at a given time',
  'A',
  'PREVALENCE is the proportion (or number) of individuals in a defined population who have a specific disease or condition at a GIVEN POINT IN TIME (point prevalence) or DURING a period (period prevalence). It includes BOTH existing (old) cases and newly diagnosed (new) cases present at the time of measurement. Incidence (option B) measures only new cases over a time period. Mortality rate (option D) counts deaths. Ref: Epidemiology — NCK Community Health Nursing curriculum; Park''s Textbook.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q30 [2008] — Beginning family developmental tasks
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Family Health',
  'Some of the developmental tasks of a beginning family are:',
  'Family planning, stabilizing the family unit',
  'Family planning, relating to kin network',
  'Relating to kin network, maintaining a stable marriage',
  'Stabilizing the family unit, socializing children',
  'B',
  'Per Duvall''s Family Life-Cycle Model, Stage I (Beginning/Married-Couple Family, before children) developmental tasks include: (1) Establishing a mutually satisfying marriage; (2) RELATING TO KIN NETWORKS — developing relationships with in-laws and extended family; (3) FAMILY PLANNING — deciding if, when and how many children to have. Socialising children belongs to Stages II–IV (families with young children). Stabilising the family unit is too broad for Stage I. Ref: Family Health Nursing — Duvall''s developmental tasks; NCK Community Health curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q31 [2008] — Indirect community health nurse services
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Roles of the CHN',
  'Some of the indirect client services provided by the community health nurse include:',
  'Supervising the care provided, teaching',
  'Teaching, health planning with consumers',
  'Record keeping, bed-side care',
  'Record keeping, supervising the care provided',
  'D',
  'INDIRECT care services are actions performed on behalf of clients that do not involve direct face-to-face interaction: record keeping/documentation, supervising care provided by others (e.g. community health workers, auxiliaries), case management, referral coordination and staff supervision. DIRECT care services involve face-to-face contact: bedside care, physical assessment, teaching/health education, counselling, treatment. Teaching and health planning with consumers are direct services. Ref: Community Health Nursing — roles and functions of the CHN; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q32 [2008] — Biological environment components
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Environmental Health',
  'The components of the biological environment include:',
  'Toxic substances, natural resources',
  'Water supplies, food',
  'Natural resources, geographical features',
  'Food, geographical features',
  'B',
  'The environment is classified as physical (non-living: climate, geography, soil, air, toxic substances, radiation) and biological (living organisms and products of living things: plants, animals, micro-organisms, food sources, water supporting biological life). Water supplies and food are both biological/biotic environmental components. Toxic substances, natural resources and geographical features belong to the physical/abiotic environment. Ref: Environmental Health — NCK Community Health Nursing curriculum; Ecologic model of health.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q33 [2008] — Major community service system focus: economic system
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Community as a System',
  'The major service system of the community that is usually the focus of the citizen and the leadership of the community is:',
  'Health system',
  'Social welfare system',
  'Economic system',
  'Religious system',
  'C',
  'In community systems theory, the ECONOMIC system (production, employment, income generation, trade, business and resource allocation) is the service subsystem that most preoccupies the daily concern of community members and their leaders. Livelihoods, economic security and income determine the community''s capacity to invest in all other systems including health, education and social welfare. The economic system is therefore the central focus of citizens and governance. Ref: Community Health Nursing — community as a system/social systems framework; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q34 [2008] — Community diagnosis demographic parameters
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Community Diagnosis',
  'The demographic parameters the community health nurse will examine while conducting a community diagnosis include:',
  'Distribution, morbidity',
  'Distribution, genetics',
  'Genetics, morbidity',
  'Genetics, transport services',
  'A',
  'Demographic parameters describe the population characteristics: SIZE, DISTRIBUTION (geographical and sociodemographic composition — age, sex, density, density distribution), vital statistics including MORBIDITY (disease burden) and MORTALITY rates, population growth rate and dependency ratios. Genetics is a biological parameter, not primarily a demographic one. Transport services are an infrastructure/service parameter. Ref: Community Health Nursing — community diagnosis methodology; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q35 [2008] — Vector-borne diseases: plague and leishmaniasis
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Communicable Diseases',
  'Vector-borne diseases include:',
  'Plague, dysentery',
  'Plague, rubella',
  'Rubella, leishmaniasis',
  'Plague, leishmaniasis',
  'D',
  'Vector-borne diseases require an arthropod vector for transmission. PLAGUE (Yersinia pestis) is transmitted by fleas (Xenopsylla cheopis) from rodents. LEISHMANIASIS (Leishmania spp.) is transmitted by sandflies (Phlebotomus in Old World, Lutzomyia in Americas). DYSENTERY (Shigella/amoeba) is transmitted by the faecal-oral route (contaminated food/water). RUBELLA is transmitted by respiratory droplets. Option D correctly identifies both diseases as vector-borne. Ref: Communicable disease — epidemiology; NCK Community Health Nursing curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q36 [2008] — Paranoid schizophrenia features
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Psychotic Disorders',
  'A type of schizophrenia characterised mainly by delusions of persecution and auditory hallucinations is:',
  'Disorganized',
  'Paranoid',
  'Catatonic',
  'Undifferentiated',
  'B',
  'Paranoid schizophrenia (DSM-IV subtype, retained in many textbooks) is dominated by PERSECUTORY DELUSIONS (belief of being followed, monitored, harassed) and AUDITORY HALLUCINATIONS (typically commanding or commenting voices), with relatively preserved cognitive function and emotional expression. Disorganised (hebephrenic) type shows disorganised speech/behaviour and flat/inappropriate affect. Catatonic type shows prominent psychomotor disturbance (stupor, rigidity, posturing, echopraxia). Undifferentiated type meets criteria but does not fit any subtype. Ref: Psychiatric/Mental Health Nursing; DSM-5/ICD-10; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q37 [2008] — Postpartum blues: 3rd and 4th day
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Perinatal Mental Health',
  'Postpartum depression (early postnatal mood disturbance) typically appears on:',
  'The 3rd and 4th day',
  'The 4th and 5th day',
  'The 1st and 2nd day',
  'The 5th and 6th day',
  'A',
  'The early transient postnatal mood disturbance, commonly called "baby blues" or "maternity blues" (a mild, self-limiting mood change distinct from postpartum depression), typically peaks around DAYS 3–4 postpartum, coinciding with the hormonal upheaval of progesterone/oestrogen withdrawal and the physiological onset of lactation (engorgement). It usually resolves spontaneously within 10 days without treatment. True postpartum depression has a more gradual onset over weeks. Note: the question uses the term "early postnatal mood disturbance" — this refers to the blues, not major PPD. Ref: Myles Textbook for Midwives; Mental Health Nursing — perinatal mental health; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q38 [2008] — Epilepsy with psychological features: temporal lobe
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Neurological Conditions in Psychiatry',
  'A type of epilepsy in which psychological features are common is:',
  'Occipital lobe epilepsy',
  'Parietal lobe epilepsy',
  'Frontal lobe epilepsy',
  'Temporal lobe epilepsy',
  'D',
  'Temporal lobe epilepsy (complex partial seizures/focal impaired awareness seizures) is characteristically associated with a rich variety of psychological/psychic phenomena: déjà vu, jamais vu, depersonalisation, vivid emotional auras (fear, panic, ecstasy), olfactory/gustatory hallucinations, automatisms and post-ictal behavioural/memory disturbance. The temporal lobe houses the hippocampus and amygdala (emotion, memory). Occipital lobe seizures produce visual phenomena. Parietal lobe seizures cause somatosensory disturbance. Frontal lobe seizures cause motor symptoms and complex automatisms. Ref: Psychiatric/Mental Health Nursing; Neurology; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q39 [2008] — Reciprocal inhibition in behaviour therapy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Behaviour Therapy',
  'Reciprocal inhibition involves:',
  'Continuous presentation of the phobic stimulus',
  'Hierarchical introduction of anxiety-producing stimuli',
  'Elimination of behaviour by introduction of a more adaptive behaviour which is incompatible with the unacceptable behaviour',
  'Punishment during which the patient is removed from the environment where the unacceptable behaviour is being exhibited',
  'C',
  'Reciprocal inhibition (Wolpe, 1958) is the principle underlying systematic desensitisation: an anxious/maladaptive response (e.g. anxiety, phobia) is eliminated by simultaneously evoking an incompatible adaptive response (e.g. deep muscle relaxation) to the same stimulus. The adaptive behaviour inhibits the maladaptive one because they cannot coexist. Flooding involves continuous presentation. Hierarchical desensitisation uses a graded hierarchy. Time-out involves removal from a reinforcing environment. Ref: Psychiatric/Mental Health Nursing — behaviour therapy; Wolpe''s principle.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q40 [2008] — Sensate focus for sexual aversion
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Sexual Disorders',
  'A behaviour-therapy technique used in the treatment of sexual aversion disorder is:',
  'Sensate focus',
  'Systematic desensitization',
  'Squeeze technique',
  'Modeling',
  'A',
  'Sensate focus (Masters and Johnson) is a graded, non-demand, non-performance pleasuring exercise programme used for sexual aversion disorder and other sexual dysfunctions (e.g. vaginismus, erectile dysfunction). It systematically removes performance anxiety by initially banning intercourse and focusing on non-genital pleasuring, gradually progressing. The squeeze technique (Masters and Johnson) is specifically for premature ejaculation. Systematic desensitisation uses a formal anxiety hierarchy. Modelling is observational learning. Ref: Psychiatric/Mental Health Nursing — sexual disorders; Masters & Johnson; NCK curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q41 [2008] — Co-dependence definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Substance Use Disorders',
  'Co-dependence means:',
  'Dysfunctional behaviour evident among members of the family of a chemically dependent person',
  'Dysfunctional behaviour evident among members of a social group that abuse the same chemical substances',
  'Two or more people portray dependence on the same substance',
  'Dysfunctional behaviour evident among members of the social group of a chemically dependent person',
  'A',
  'Co-dependence is the pattern of dysfunctional behaviours, attitudes and emotional responses that develop in FAMILY MEMBERS of a chemically dependent (substance-use-disordered) person. They become excessively focused on the addict''s behaviour, enabling the addiction, neglecting their own needs and losing their own identity. Co-dependency is characterised by denial, poor boundaries, caretaking and low self-esteem. It affects FAMILY members specifically, not just any social group member. Ref: Psychiatric/Mental Health Nursing — substance use disorders; Co-Dependents Anonymous (CoDA).',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;
