-- =============================================================================
-- SEED: NCK MCQ Compilation with Answers & Rationales
-- Batch 2: BScN — Paper II (Research, Leadership, Nursing Education)
-- =============================================================================
-- Source: NCK-MCQ-Compilation-Answers-Rationales.docx
-- Cadre: BScN
-- Paper: 'Paper II' (Community/Public Health + Research + Leadership + Mental Health)
-- exam_year: Per year stated in document header
-- Status: approved | contributor_id: NULL
-- Conflict: ON CONFLICT (stem, cadre) DO NOTHING
-- =============================================================================

-- ─── YEAR 2007 — BScN Paper II ────────────────────────────────────────────────

-- Q1 [2007] — First scientific paper in nursing
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'History of Nursing Research',
  'The first scientific paper in nursing was published by:',
  'Anna Benkingham',
  'Florence Nightingale',
  'Isabella Hampton',
  'Margaret Mylos',
  'B',
  'Florence Nightingale (1820–1910) is recognised as the founder of modern evidence-based nursing practice and the first nurse researcher. Her meticulous statistical analyses during the Crimean War (1854–1856), documented in "Notes on Matters Affecting the Health, Efficiency, and Hospital Administration of the British Army" (1858) and "Notes on Nursing" (1859), constitute the first scientific writing in nursing. She used polar area diagrams (coxcomb charts) to demonstrate that preventable disease caused more deaths than battle wounds. Ref: Nursing Research — history; Kenya nursing curriculum.',
  'easy', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2007] — Graduate nurse role in research
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Roles',
  'The graduate nurse''s role in research is:',
  'Intelligent consumption of research findings',
  'Research assistant',
  'Funding of research',
  'Data analysis and cleaning',
  'A',
  'The expected competency for a graduate (basic degree) nurse is to be an intelligent CONSUMER of research — the ability to critically appraise, interpret and apply research findings to clinical practice (evidence-based practice/EBP). Designing and leading research studies, data analysis and fundraising are roles associated with nurses who have advanced (master''s or doctoral) preparation. Serving as a research assistant may occur but is not the primary defined role. Ref: Nursing Research — research roles; Polit & Beck; NCK BScN curriculum.',
  'easy', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2007] — Research hypothesis: dependent variable
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Design',
  'A nurse researcher formulated the following hypothesis: "There is a relationship between self-concept and suicidal behaviour". This implies that:',
  'The independent variable is suicidal behaviour',
  'The hypothesis is directional',
  'The type of design suggested would be experimental',
  'The dependent variable is suicidal behaviour',
  'D',
  'Self-concept is the presumed influencing (independent/predictor) variable and suicidal behaviour is the outcome (dependent/criterion) variable. The hypothesis states only that "a relationship exists" without specifying its direction (positive or negative), making it NON-directional. A relationship hypothesis suggests a correlational or descriptive/correlational design, not an experimental design (which tests cause and effect via manipulation and randomisation). Ref: Nursing Research — variables and hypotheses; Polit & Beck; NCK curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2007] — Theoretical framework definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Concepts',
  'Theoretical framework refers to:',
  'A comprehensive list of all the relevant previous research work done in an area of interest',
  'Roy''s adaptation theory',
  'A pictorial presentation of relationships between variables',
  'An examination of both the depth and breadth of literature review',
  'B',
  'A theoretical framework is the underpinning structure of a research study built on an established, tested theory that provides a lens through which the research problem is viewed. Roy''s Adaptation Model is a classic example of a nursing theory used to frame research. Option A describes a literature review. Option C describes a conceptual model or schematic diagram. Option D describes the process of critiquing the literature. Ref: Nursing Research — theoretical and conceptual frameworks; Polit & Beck; NCK BScN curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2007] — Trait leadership theories
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Theories',
  'Trait leadership theories in nursing:',
  'Focus on what leaders do in relational and contextual terms',
  'Emphasise the degrees of trust and respect between leaders and followers',
  'Are independent of personal characteristics of followers',
  'Emphasise that physical and emotional characteristics are critical in inspiring others toward a common goal',
  'D',
  'Trait (Great Man) theory of leadership holds that effective leaders possess innate personal characteristics — physical attributes, intellectual capacity, drive, self-confidence, integrity and emotional maturity — that enable them to inspire others and achieve goals. These traits are considered inherent rather than learned. Behavioural theories focus on what leaders DO (A). Transformational/relational leadership theory emphasises trust, respect and mutual influence (B). Ref: Nursing Leadership and Management — leadership theories; NCK BScN curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2007] — Purpose of publishing research
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Dissemination',
  'The main purpose of publishing research findings is to:',
  'Meet the requirements of the sponsor',
  'Solicit for more funds for future research',
  'Get recognition in the profession',
  'Contribute to scientific literature',
  'D',
  'The primary purpose of publishing research findings is to contribute to the body of scientific and professional knowledge by adding to the accumulated evidence base. This allows other researchers, practitioners and educators to utilise, replicate, critique and build upon the findings, ultimately advancing evidence-based practice. Meeting sponsor requirements, soliciting funds and gaining recognition are secondary considerations. Ref: Nursing Research — dissemination and publication; NCK BScN curriculum.',
  'easy', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2007] — Research with psychiatric patients
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Ethics',
  'While conducting research among psychiatric patients, the nurse researcher:',
  'Uses key-informant approach only',
  'May interview the patients directly if they attain a specified mental health status',
  'Must get consent from relatives and guardians only',
  'May use experimental approach',
  'B',
  'Psychiatric patients are a vulnerable group in research; however, they retain the right to participate in research and give their own informed consent when they have sufficient decision-making capacity. The researcher may interview them directly provided their mental status is assessed and they demonstrate capacity to understand and consent. Consent from relatives/guardians alone (without the patient''s consent where capable) would violate autonomy. The data collection approach is not restricted to key informants. Ref: Research ethics — protection of vulnerable groups; Nursing Research; NCK BScN curriculum.',
  'hard', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2007] — Discovery learning approach
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Teaching and Learning Methods',
  'Discovery learning approach:',
  'Is more effective than expounding the principles then engaging the students in learning',
  'Takes less time than the exposition learning approach',
  'Helps students attain higher-level (life-skill) or methodological objectives as opposed to being passive receivers',
  'Is best applied when students need to grasp a few basic concepts',
  'C',
  'Discovery (inquiry-based) learning is a constructivist, student-centred approach in which learners actively investigate and discover concepts for themselves. It is best suited to achieving higher-order (methodological, critical thinking, problem-solving, life-skill) objectives because learners construct meaning actively rather than passively receiving information. It typically requires MORE time than exposition/direct instruction and is less efficient for teaching a few straightforward factual concepts. Ref: Nursing Education — principles of teaching and learning; NCK BScN curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2007] — Micro-evaluation
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Evaluation in Teaching',
  'Micro-evaluation:',
  'Enables the teacher to launch into new lines of argument when the students seem unconvinced',
  'Enables students to benefit in some future learning situations',
  'Should be minimal and limited if students are working together',
  'Comprises absolute evaluation',
  'A',
  'Micro-evaluation is the moment-to-moment, ongoing formative feedback a teacher gathers DURING a lesson by reading learner reactions, body language, responses and questions. It allows the teacher to make immediate adjustments — such as introducing new lines of explanation or examples when students appear confused or unconvinced. This real-time responsiveness distinguishes micro-evaluation from summative (end-of-course) or macro-evaluation. Ref: Nursing Education — evaluation in teaching; NCK BScN curriculum.',
  'medium', 'approved', 2007, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── YEAR 2008 — BScN Paper II (Leadership, Research, Education) ──────────────

-- Q1 [2008] — Transactional leader
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Theories',
  'A leader who is mainly concerned with the day-to-day operations of an organisation with little regard to the future is called a:',
  'Charismatic leader',
  'Transactional leader',
  'Transformational leader',
  'Traditional leader',
  'B',
  'Transactional leadership focuses on day-to-day supervision, management of routine tasks, exchange relationships (rewards for compliance, penalties for non-compliance) and maintaining the status quo. It is task-oriented and reactive, with minimal long-term vision. Transformational leadership, by contrast, focuses on inspiring change, vision, innovation and future goals. Charismatic leaders inspire through personal magnetism. Traditional leaders derive authority from custom. Ref: Nursing Leadership and Management; NCK BScN curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q2 [2008] — Zero-based budgeting
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Financial Management',
  'Zero-based budgeting means:',
  'Multiplying current year expenses by a certain figure',
  'Budgeting for purchase of major equipment',
  'Use of a decision-making package to justify the current budget needs',
  'Budget where accountability, efficiency and economy is emphasized',
  'C',
  'Zero-based budgeting (ZBB) requires managers to start from a "zero base" each budget period — no budget is carried forward automatically from the previous year. Every programme and expenditure must be justified afresh through decision packages that demonstrate need, purpose, cost and alternatives. This forces rigorous accountability. Multiplying current expenses is incremental budgeting. Budgeting for equipment is capital budgeting. Option D describes the principles of ZBB broadly but does not define what it is. Ref: Nursing Leadership and Management — budgeting; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q3 [2008] — Mentors vs preceptors
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Staff Development',
  'Mentors differ from preceptors in that mentors:',
  'Passively model new staff',
  'Choose whom to mentor',
  'Have a short relationship with the novice staff',
  'Do not assist the novice staff in career development',
  'B',
  'Mentoring is a voluntary, mutually chosen, long-term developmental relationship: the mentor CHOOSES the protégé (and vice versa) based on compatibility, shared interests and goals, and actively supports career development, professional socialisation and personal growth. A preceptor is typically ASSIGNED to a new nurse for a defined, structured orientation period with specific clinical competency objectives. Mentoring is longer-term, less structured and more career-focused. Ref: Nursing Leadership and Management / Education — mentorship and preceptorship; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q4 [2008] — Over-delegation definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Delegation',
  'Over-delegation involves:',
  'Delegating at the wrong time, to the wrong person, for the wrong reasons',
  'Delegating to exceptionally competent employees',
  'Transferring too many roles from the manager to the subordinates',
  'Delegating authority and responsibility',
  'C',
  'Over-delegation occurs when a manager delegates excessively — transferring too many tasks or responsibilities (including those the manager should retain, such as sensitive evaluations or disciplinary actions) to subordinates, potentially overloading them. This leads to loss of managerial control. Improper delegation (wrong task/wrong person/wrong time) is a different error. Under-delegation is the failure to delegate sufficiently. Properly delegating authority and responsibility is correct management practice. Ref: Nursing Leadership and Management — delegation principles; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q5 [2008] — Categorical variables
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Biostatistics',
  'Variables that take only a few discrete values are called:',
  'Outcome',
  'Continuous',
  'Extraneous',
  'Categorical',
  'D',
  'Categorical (discrete) variables take a limited number of distinct values or categories rather than any value along a continuum. Examples include sex (male/female), blood group (A/B/AB/O), marital status. Categorical variables may be nominal (no order) or ordinal (ordered). Continuous variables can take any value within a range (e.g. weight, blood pressure, temperature). Extraneous variables are confounders that may affect results. Outcome variables are dependent variables. Ref: Nursing Research / Biostatistics; NCK BScN curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q6 [2008] — Blind review definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Publication and Peer Review',
  'In research journal articles, "blind reviews" means reviewers:',
  'Are told the names of the researchers and the researchers are not told the identity of the reviewers',
  'Are not told the names of the researchers and the researchers are told the identity of the reviewers',
  'Are not told the names of the researchers and the researchers are not told the identity of the reviewers',
  'Know the names of the researchers and vice versa',
  'C',
  'A double-blind peer review (the gold standard) is one in which: (1) the reviewers do not know the identities of the authors, and (2) the authors do not know the identities of the reviewers. This bidirectional anonymity minimises bias — reviewers cannot be influenced by the authors'' reputation or institution, and authors cannot target reviewers they know. Single-blind review (option A) only hides authors from reviewers. Ref: Nursing Research — publication process; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q7 [2008] — Process consent in qualitative research
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Ethics',
  'It is difficult to obtain meaningful informed consent in qualitative research because the researcher does not know in advance how the study will evolve. This kind of consent gotten by qualitative research is called:',
  'Process consent',
  'Uninformed consent',
  'Implied consent',
  'Incomplete consent',
  'A',
  'In qualitative research (particularly ethnography, grounded theory and phenomenology), the study design is emergent and the researcher cannot fully describe all aspects of the study at the outset. Consent is therefore treated as an ONGOING PROCESS — "process consent" — in which participants are repeatedly asked to affirm their continued willingness to participate as new data collection activities emerge. This respects autonomy throughout. Uninformed consent is ethically unacceptable. Ref: Nursing Research — qualitative methods and ethics; Polit & Beck; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q8 [2008] — Random assignment definition
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Design',
  'Random assignment means:',
  'Probability sampling where each subject has an equal and independent chance of participating in the study',
  'Assigning subjects to the control and experimental group without predetermined criteria',
  'Assigning subjects to the control group and experimental group such that each has an equal chance of being selected for each group',
  'Random sampling method of assigning subjects to control group and experimental group',
  'C',
  'Random assignment (randomisation) is the process of allocating study participants to experimental and control groups such that each participant has an equal and independent probability of being assigned to EITHER group. It is the hallmark of true experimental designs and controls for confounding by distributing known and unknown extraneous variables equally across groups. It is distinct from random sampling (which concerns selection of subjects from the population into the study). Option A describes random sampling. Ref: Nursing Research — experimental design; Polit & Beck; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q9 [2008] — Purpose of research critique skills
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Evidence-Based Practice',
  'Practising nurses need to develop research-critique skills to:',
  'Challenge fellow nurses doing research-report presentations',
  'Be able to do literature review when doing their research studies',
  'Participate fully in journal clubs',
  'Judge the utility of research findings',
  'D',
  'The primary purpose of developing research appraisal (critique) skills is to enable nurses to critically evaluate the quality, validity, reliability and applicability of research findings, so they can make informed decisions about whether and how to apply the evidence to their clinical practice (evidence-based practice). Journal clubs and literature reviewing are uses of critique skills, but the overriding purpose is to judge utility for practice. Ref: Nursing Research — EBP; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q10 [2008] — Reflective scepticism
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Critical Thinking',
  'Reflective scepticism, a characteristic of critical thinkers, means:',
  'Asking awkward questions to challenge assumptions',
  'Ability to imagine and explore alternatives',
  'Taking a critical view of established dogmas and practices, scrutinizing them and questioning their current validity',
  'Reflecting on past events and questioning them',
  'C',
  'Reflective scepticism is a disposition of critical thinkers characterised by the refusal to accept established dogmas, traditions and practices at face value. It involves scrutinising them systematically, questioning their evidence base and current validity, and being open to revising beliefs in light of evidence. It differs from negative/cynical scepticism in being constructive and evidence-driven. Ref: Nursing Education — critical thinking; NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q11 [2008] — Problem-based learning
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Teaching and Learning Methods',
  'Problem-based learning means:',
  'Learning that results from the process of working towards the resolution of a problem',
  'A situation where students learn without any assistance from the teacher',
  'Learning that results after the learner gets the solution',
  'Learning where teachers use questions only',
  'A',
  'Problem-based learning (PBL) is a student-centred constructivist pedagogical approach in which learning arises from the active PROCESS of working collaboratively to understand, analyse and attempt to resolve a real or simulated complex problem. The teacher acts as a facilitator, not an instructor. Learning occurs during the problem-solving process, not after it. PBL develops self-directed learning, clinical reasoning and teamwork skills. Ref: Nursing Education — teaching methods; NCK BScN curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q12 [2008] — Validity of assessment tool
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Measurement and Evaluation',
  'When an assessment tool measures what it is supposed to measure, it is said to have:',
  'Validity',
  'Reliability',
  'Consistency',
  'Discrimination',
  'A',
  'Validity is the degree to which an instrument actually measures the construct or attribute it is intended to measure — content validity (covers the domain), criterion validity (correlates with a gold standard), and construct validity (measures the theoretical construct). Reliability/consistency refers to the reproducibility and stability of measurements across time, raters or items. Discrimination refers to the ability of a test to distinguish between high and low performers. A valid test is not necessarily reliable, and vice versa. Ref: Nursing Research — measurement; NCK BScN curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q13 [2008] — Teaching psychomotor skills
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Teaching Methods',
  'An appropriate method that can be used to teach the acquisition of psychomotor skills is:',
  'Case studies',
  'Demonstration',
  'Micro-teaching',
  'Brainstorming',
  'B',
  'Psychomotor (practical/manual) skills — such as IV insertion, wound dressing, injections and catheterisation — are best taught through demonstration followed by return demonstration (supervised practice). Demonstration provides a visual and kinaesthetic model of the correct procedure, sequence and technique. Case studies target cognitive analysis; brainstorming targets creative/affective thinking; micro-teaching is a training technique for developing teaching skills. Ref: Nursing Education — teaching methods for psychomotor domain; NCK BScN curriculum.',
  'easy', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- Q14 [2008] — Scalar chain / decision-making hierarchy
INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Organisational Structure',
  'The decision-making hierarchy is called:',
  'Scalar chain',
  'Span of control',
  'Decentralized decision making',
  'Centralized decision making',
  'A',
  'The scalar chain (also called the chain of command) is the formal line of authority running from the top to the bottom of an organisational hierarchy — the vertical levels through which decisions, instructions and information flow. It defines reporting relationships and lines of authority. Span of control refers to the number of subordinates a manager directly supervises. Centralised/decentralised decision making refers to where authority to make decisions is concentrated, not the structural hierarchy itself. Ref: Nursing Leadership and Management — organisational structure (Fayol''s principles); NCK BScN curriculum.',
  'medium', 'approved', 2008, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;
