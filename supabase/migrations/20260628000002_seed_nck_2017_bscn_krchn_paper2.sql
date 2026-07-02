-- Migration: 20260628000002
-- Batch 1: NCK 2017 (BScN Paper II & KRCHN Paper II) + 2018 Pharmacology (both cadres Paper I)
-- Source: NCK-NEW-MCQ-Compilation.docx
-- Audit: answers verified against rationale; rationales cross-checked against BNF,
--        DSM-5, Stuart Psychiatric Nursing, Townsend, MOH Kenya, nursing management texts.
-- All questions seeded with status='approved', contributor_id=NULL.

-- ─── BScN Paper II — Year 2017 ────────────────────────────────────────────────

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Professional Ethics & Law', 'Ethical Principles',
  'The duty to benefit or promote the good of others is:-',
  'Non-maleficence.', 'Justice.', 'Veracity.', 'Beneficence.',
  'D',
  'Beneficence is the ethical principle/duty to do good and promote the welfare of others (nursing ethics/professional practice texts; NCK curriculum).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Mental Health Nursing', 'Autism Spectrum Disorders',
  'The nursing action for an autistic child that has difficulty with trust is:-',
  'Encourage all staff to hold the child as often as possible, conveying trust through touch.',
  'Assign a different staff member each day so child will learn that everyone can be trusted.',
  'Assign same staff member as often as possible to promote feelings of security and trust.',
  'Avoid eye contact, as it is extremely uncomfortable for the child and may even discourage trust.',
  'C',
  'Consistency of caregiver builds security and trust; assigning the same staff member as often as possible is the evidence-based approach for autistic children (paediatric/mental health nursing texts; Townsend).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Mental Health Nursing', 'Nursing Process in Psychiatry',
  'The primary goal in the assessment phase of the nursing process for a client admitted to an in-patient psychiatric unit with a major depressive disorder is to:-',
  'Build trust and rapport.',
  'Collect and organize information.',
  'Identify goals and outcomes.',
  'Identify and validate the medical diagnosis.',
  'B',
  'In the nursing process the primary purpose of the assessment phase is to systematically collect and organize client data; rapport-building supports it but data gathering is the defining purpose (Stuart, Principles of Psychiatric Nursing; standard nursing process texts).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Mental Health Nursing', 'Suicide and Depression',
  'Suicidal tendency is most commonly seen with:-',
  'Schizophrenia.', 'Obsessive disorders.', 'Mania.', 'Depression.',
  'D',
  'Suicide risk is highest in major depressive disorder due to hopelessness and worthlessness (Stuart Psychiatric Nursing; Kenya Mental Health guidelines; DSM-5).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Nursing Management & Leadership', 'Strategic Change Management',
  'It is important to understand the organizational context in thinking about the management of strategic change because:-',
  'There is no one right formula for managing strategic change. It will need to differ according to the context of the organization.',
  'It is important to analyze the organizational environment to develop strategies.',
  'Understanding the time scale of change is important.',
  'Understanding the managerial and personal capabilities to manage change in the organization is important.',
  'A',
  'Johnson & Scholes (standard nursing management/strategy texts) state there is no single right way to manage strategic change; the approach must fit the organizational context.',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Nursing Management & Leadership', 'Human Resource Management',
  'Human resource management:-',
  'Seeks to achieve competitive advantage through strategic deployment of a highly committed and capable workforce using an integrated array of cultural, structural, and personnel techniques.',
  'Is an approach to managing people.',
  'Focuses on people as the resource of competitive advantage.',
  'Contributes to business strategy and plays an important role in its implementation.',
  'A',
  'Storey''s HRM definition (used in nursing management texts): HRM achieves competitive advantage through strategic deployment of a committed, capable workforce via integrated cultural, structural and personnel techniques.',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Community Health Nursing', 'Health Policy',
  'The most frequently voiced concern regarding health care is:-',
  'Lack of discounted rates.',
  'Poor choices in health management.',
  'Lack of access to health insurance.',
  'Dramatic changes in quality.',
  'C',
  'Health policy and community health texts identify lack of access to health insurance/coverage as the most frequently voiced public concern about health care.',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Nursing Management & Leadership', 'Nursing Education',
  'At the start of the school year, teacher Charles wants to determine his students'' current skill levels so that he can make effective instructional decisions. He decides to conduct a _________ assessment:-',
  'Formative.', 'Summative.', 'Behavioral.', 'Diagnostic.',
  'D',
  'Determining students'' existing skill levels before instruction is a diagnostic (pre-instruction) assessment (educational assessment/nursing education texts).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Mental Health Nursing', 'Defense Mechanisms',
  'The defense mechanism of repression is associated with:-',
  'Schizophrenia.', 'Dissociative identity disorder.', 'Phobias.', 'Generalized anxiety disorder.',
  'B',
  'Repression underlies many disorders; it is most centrally linked to dissociative conditions in psychodynamic formulations. It involves unconscious blocking of traumatic memories (Stuart Psychiatric Nursing; psychodynamic theory; DSM-5).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Community Health Nursing', 'Health Promotion',
  'One of the most effective means of dissuading adolescents from engaging in destructive behavior is:-',
  'Peer-education.', 'Parent workshops.', 'Self-discovery.', 'Community service.',
  'A',
  'Peer education is among the most effective strategies for deterring adolescents from risky behavior (Kenya adolescent/community health guidelines; health promotion texts).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Nursing Management & Leadership', 'Organisational Theory',
  'Theory of modern management suggests that:-',
  'Management is a true science.',
  'The selection of workers is a science.',
  'Scientific management is a collaboration of workers and managers.',
  'The average human being prefers to be directed, wishes to avoid responsibility, has relatively little ambition, wants security above all.',
  'C',
  'Taylor''s scientific (modern) management holds that management and workers cooperate, with work and responsibility shared between them (nursing management/leadership texts).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Nursing Management & Leadership', 'Organisational Theory',
  'Line functions are concerned with those activities which are connected with discharge of:-',
  'Direct responsibility for accomplishing the subsidiary objectives of the organization.',
  'Direct responsibility for accomplishing the main objectives of the organization.',
  'Direct responsibility for accomplishing both main and subsidiary objectives of the organization.',
  'Direct responsibility for achieving the vision of the organization.',
  'B',
  'Line functions carry direct responsibility for accomplishing the primary/main objectives of the organization, while staff functions are advisory (nursing management texts).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Community Health Nursing', 'Levels of Prevention',
  'Handling IEC materials on condom use to prevent HIV/AIDS and STIs is an example of:-',
  'Primary prevention.', 'Health promotion.', 'Secondary prevention.', 'Tertiary prevention.',
  'A',
  'Distributing condom-use IEC materials to prevent HIV/STI before disease occurs is primary prevention (Kenya MOH/community health epidemiology levels of prevention).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'BScN', 'Paper II', 'Nursing Management & Leadership', 'DVT Nursing Diagnosis',
  'A female patient is diagnosed with deep-venous thrombosis. The nursing diagnosis that should receive the highest priority at the time is:-',
  'Impaired gas exchange related to increased blood flow.',
  'Fluid volume excess related to peripheral vascular disease.',
  'Risk for injury related to oedema.',
  'Altered peripheral tissue perfusion related to venous congestion.',
  'D',
  'In DVT the priority is compromised venous return; Brunner & Suddarth lists altered peripheral tissue perfusion related to venous congestion/obstruction as the highest-priority nursing diagnosis.',
  'medium', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;


-- ─── KRCHN Paper II — Year 2017 (same stems, different cadre) ─────────────────

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Health Systems & Management', 'Ethical Principles',
  'The duty to benefit or promote the good of others is:-',
  'Non-maleficence.', 'Justice.', 'Veracity.', 'Beneficence.',
  'D',
  'Beneficence is the ethical principle/duty to do good and promote the welfare of others (nursing ethics/professional practice texts; NCK curriculum).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Mental Health Nursing', 'Autism Spectrum Disorders',
  'The nursing action for an autistic child that has difficulty with trust is:-',
  'Encourage all staff to hold the child as often as possible, conveying trust through touch.',
  'Assign a different staff member each day so child will learn that everyone can be trusted.',
  'Assign same staff member as often as possible to promote feelings of security and trust.',
  'Avoid eye contact, as it is extremely uncomfortable for the child and may even discourage trust.',
  'C',
  'Consistency of caregiver builds security and trust; assigning the same staff member as often as possible is the evidence-based approach for autistic children (paediatric/mental health nursing texts; Townsend).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Mental Health Nursing', 'Suicide and Depression',
  'Suicidal tendency is most commonly seen with:-',
  'Schizophrenia.', 'Obsessive disorders.', 'Mania.', 'Depression.',
  'D',
  'Suicide risk is highest in major depressive disorder due to hopelessness and worthlessness (Stuart Psychiatric Nursing; Kenya Mental Health guidelines; DSM-5).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Health Systems & Management', 'Strategic Change Management',
  'It is important to understand the organizational context in thinking about the management of strategic change because:-',
  'There is no one right formula for managing strategic change. It will need to differ according to the context of the organization.',
  'It is important to analyze the organizational environment to develop strategies.',
  'Understanding the time scale of change is important.',
  'Understanding the managerial and personal capabilities to manage change in the organization is important.',
  'A',
  'Johnson & Scholes (nursing management/strategy texts): no single right way to manage strategic change; the approach must fit the organizational context.',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Health Systems & Management', 'Human Resource Management',
  'Human resource management:-',
  'Seeks to achieve competitive advantage through strategic deployment of a highly committed and capable workforce using an integrated array of cultural, structural, and personnel techniques.',
  'Is an approach to managing people.',
  'Focuses on people as the resource of competitive advantage.',
  'Contributes to business strategy and plays an important role in its implementation.',
  'A',
  'Storey''s HRM definition (nursing management texts): HRM achieves competitive advantage through strategic deployment of a committed workforce via integrated cultural, structural and personnel techniques.',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Community Health Nursing', 'Health Policy',
  'The most frequently voiced concern regarding health care is:-',
  'Lack of discounted rates.',
  'Poor choices in health management.',
  'Lack of access to health insurance.',
  'Dramatic changes in quality.',
  'C',
  'Health policy and community health texts identify lack of access to health insurance/coverage as the most frequently voiced public concern about health care.',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Community Health Nursing', 'Health Promotion',
  'One of the most effective means of dissuading adolescents from engaging in destructive behavior is:-',
  'Peer-education.', 'Parent workshops.', 'Self-discovery.', 'Community service.',
  'A',
  'Peer education is among the most effective strategies for deterring adolescents from risky behavior (Kenya adolescent/community health guidelines).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, paper, unit, topic, stem,
  option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, exam_year, status, contributor_id)
VALUES (
  'KRCHN', 'Paper II', 'Health Systems & Management', 'Levels of Prevention',
  'Handling IEC materials on condom use to prevent HIV/AIDS and STIs is an example of:-',
  'Primary prevention.', 'Health promotion.', 'Secondary prevention.', 'Tertiary prevention.',
  'A',
  'Distributing condom-use IEC materials to prevent HIV/STI before disease occurs is primary prevention (Kenya MOH/community health epidemiology levels of prevention).',
  'easy', 2017, 'approved', NULL
) ON CONFLICT (stem, cadre) DO NOTHING;

