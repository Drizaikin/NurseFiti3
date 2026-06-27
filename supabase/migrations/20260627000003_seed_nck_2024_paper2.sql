-- =============================================================================
-- SEED: NCK 2024 — BScN Paper II + KRCHN Paper II
-- =============================================================================
-- BScN Paper II: Research methods, Leadership, Sociology/Anthropology,
--               Nursing Education Technology, Management levels
-- KRCHN Paper II: Community Health, Mental Health, Home-based care,
--                Psychiatric nursing, Cultural competence
-- exam_year: 2024
-- Dedup: ON CONFLICT (stem, cadre) DO NOTHING
-- NOTE: Sociology/anthropology questions are classified BScN Paper II
--       (Research & evidence-based practice domain per nck-exam-system.md)
-- =============================================================================

-- ─── BScN Paper II — 2024: Leadership ────────────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Roles',
  'A nurse manager communicates the unit''s needs and priorities to the hospital administration and advocates for additional resources to improve patient care. What role is the nurse manager primarily fulfilling?',
  'Liaison',
  'Coordinator',
  'Mediator',
  'Negotiator',
  'A',
  'A liaison role (Mintzberg''s managerial roles) involves facilitating communication, cooperation and the flow of information between different groups, units or hierarchical levels within or outside the organisation. Communicating the unit''s needs upward to administration and advocating for resources is the classic liaison function. A coordinator organises resources within the unit. A mediator resolves conflicts. A negotiator bargains for specific outcomes. Ref: Nursing Management and Leadership — Mintzberg''s managerial roles; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager is implementing a change in the scheduling system to improve staff allocation in a busy surgical unit. What type of leadership role is the nurse manager demonstrating?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Autocratic leadership',
  'A',
  'Transformational leadership focuses on inspiring and motivating followers to embrace change, innovation and a shared vision for improvement. Implementing a scheduling change to improve staff allocation is an act of transformational leadership — it drives positive organisational change and innovation. Transactional leadership manages through rewards/penalties for meeting targets. Laissez-faire is hands-off. Autocratic is directive and controlling. Ref: Nursing Leadership and Management — transformational leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager adopts a hands-off approach, allowing the nursing staff to make decisions and manage their work independently. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Democratic leadership',
  'C',
  'Laissez-faire (free-rein) leadership is characterised by a hands-off, non-directive style in which leaders give maximum autonomy to staff to make decisions and manage their own work, with minimal guidance or intervention. While it can work in highly skilled/self-motivated teams, it can also lead to lack of direction and accountability if team members require supervision. Ref: Nursing Leadership and Management — leadership styles; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'During a staff meeting, a nurse manager discusses the unit''s performance metrics, sets clear expectations, and offers rewards for achieving specific targets. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Servant leadership',
  'B',
  'Transactional leadership operates on an exchange basis: the leader sets clear expectations, monitors performance and uses a system of rewards (contingent reinforcement) for goal achievement and penalties/management-by-exception for failure. Discussing performance metrics and offering rewards for specific targets is the classic transactional framework. Ref: Nursing Leadership and Management — transactional leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager seeks input from the nursing staff when making decisions related to the unit''s policies and procedures. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Democratic leadership',
  'D',
  'Democratic (participative) leadership involves actively seeking and incorporating input from team members in decision-making processes. It promotes shared governance, increases staff satisfaction and ownership of decisions, and improves outcomes through collective wisdom. This contrasts with autocratic (top-down) leadership and is distinct from laissez-faire (no guidance given). Ref: Nursing Leadership and Management — democratic leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager frequently monitors the nursing staff''s activities, enforces strict rules, and expects compliance with policies and procedures. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Autocratic leadership',
  'D',
  'Autocratic (authoritarian) leadership is characterised by centralised control: the leader makes decisions unilaterally, enforces strict rules, expects obedience/compliance with minimal staff input, and closely supervises activities. It is effective in emergencies or with unskilled workers but decreases morale and creativity over time. Transactional leadership also uses monitoring but includes the exchange of rewards/penalties. Ref: Nursing Leadership and Management — autocratic leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager fosters an environment where the nursing staff feels empowered to suggest and implement improvements in patient care processes. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Servant leadership',
  'A',
  'Transformational leadership empowers followers to challenge the status quo, propose innovations and implement change. By creating an environment where staff are encouraged to suggest and implement improvements, the nurse manager is inspiring intrinsic motivation and building a culture of continuous quality improvement — hallmarks of transformational leadership. Ref: Nursing Leadership and Management — transformational leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager takes on the role of a mentor and provides guidance and support to junior nurses to help them develop their skills and knowledge. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Servant leadership',
  'D',
  'Servant leadership prioritises the growth, development and well-being of followers. The servant leader puts the team''s needs first, mentors and coaches staff, removes barriers to their success and fosters their personal and professional development. Acting as a mentor providing guidance to develop junior nurses'' skills is a defining characteristic of servant leadership. Ref: Nursing Leadership and Management — servant leadership (Greenleaf); NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'During a crisis situation in the healthcare facility, a nurse manager takes charge, makes quick decisions, and provides clear instructions to the nursing staff. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Autocratic leadership',
  'D',
  'Autocratic leadership is contextually appropriate and effective in crisis situations requiring rapid, decisive action. The leader takes charge, makes quick unilateral decisions and provides clear directives to ensure a swift, coordinated response. In non-crisis settings this style can be demoralising, but in emergencies it prevents decision paralysis. Ref: Nursing Leadership and Management — situational/autocratic leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Styles',
  'A nurse manager is known for being approachable, empathetic, and supportive of the nursing staff''s well-being. What leadership style is being demonstrated?',
  'Transformational leadership',
  'Transactional leadership',
  'Laissez-faire leadership',
  'Servant leadership',
  'D',
  'Servant leadership is distinguished by emotional intelligence attributes — approachability, empathy and genuine concern for followers'' well-being. The servant leader builds trust through human-centred care for staff, which in turn motivates staff to provide better patient care. These qualities are the cornerstone of the servant leadership model. Ref: Nursing Leadership and Management — servant leadership; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── BScN Paper II — 2024: Management Roles ──────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Roles',
  'A nurse manager provides regular feedback and coaching to nursing staff, offering guidance to help them improve their performance. What leadership role is the nurse manager demonstrating?',
  'Coach',
  'Mentor',
  'Advocate',
  'Monitor',
  'A',
  'Coaching involves providing regular, structured feedback and guidance focused on improving specific performance behaviours and developing skills in the short term. The coach observes performance, identifies gaps, provides corrective and positive feedback, and supports development plans. Mentoring is a longer-term, career-oriented relationship. Advocacy is speaking on behalf of others. Monitoring is oversight of compliance. Ref: Nursing Leadership and Management — leadership roles; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Roles',
  'A nurse manager advocates for the nursing staff''s needs, ensuring they have the necessary resources to provide quality patient care. What leadership role is the nurse manager demonstrating?',
  'Coach',
  'Mentor',
  'Advocate',
  'Monitor',
  'C',
  'The advocate role involves championing and speaking on behalf of others — in this case, the nurse manager is advocating upward to administration on behalf of nursing staff, ensuring they have the resources, support and working conditions needed to provide safe, quality care. This is a key managerial role protecting both staff and patients. Ref: Nursing Leadership and Management — leadership roles; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Roles',
  'A nurse manager regularly monitors and assesses the performance and compliance of the nursing staff with established policies and procedures. What leadership role is the nurse manager demonstrating?',
  'Coach',
  'Mentor',
  'Advocate',
  'Monitor',
  'D',
  'The monitor role involves systematic observation, measurement and evaluation of staff performance, adherence to standards, and compliance with policies/procedures. Monitoring is essential for quality assurance, early identification of problems and maintaining safe practice standards on the unit. Ref: Nursing Leadership and Management — leadership roles; Mintzberg''s informational roles; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Roles',
  'A nurse manager provides guidance and support to a newly hired nurse, helping them adjust to the unit''s routines and practices. What leadership role is the nurse manager demonstrating?',
  'Coach',
  'Mentor',
  'Advocate',
  'Monitor',
  'B',
  'Mentoring involves a longer-term, supportive developmental relationship in which an experienced professional helps a less experienced colleague (mentee/protégé) navigate organisational culture, develop professional identity, build confidence and adjust to the workplace. Helping a newly hired nurse adjust to routines and practices is the socialisation and guidance aspect of mentoring. Coaching is more short-term and performance-focused. Ref: Nursing Leadership and Management — mentoring; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Management Levels',
  'A nurse manager oversees a team of charge nurses and ensures that they effectively manage patient care within their units. What level of management is the nurse manager representing?',
  'Top-level management',
  'Middle-level management',
  'Frontline management',
  'Operational management',
  'B',
  'Middle-level (mid-level) management occupies the organisational tier between top-level (executive/director) and frontline (unit/charge nurse) management. Middle managers oversee departmental operations, manage charge nurses and ensure that unit-level operations align with organisational goals. They translate strategic objectives into operational plans. Ref: Nursing Leadership and Management — levels of management; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Management and Leadership', 'Leadership Roles',
  'A nurse manager is responsible for coordinating the staffing schedule, ensuring that the unit is adequately staffed to provide patient care. What role is the nurse manager primarily fulfilling?',
  'Liaison',
  'Coordinator',
  'Mediator',
  'Negotiator',
  'B',
  'The coordinator role involves organising and arranging resources — including personnel, time and equipment — to ensure smooth operations and goal achievement. Managing the staffing schedule to ensure adequate coverage is a classic coordination function. A liaison communicates between groups. A mediator resolves conflicts. A negotiator bargains for outcomes. Ref: Nursing Leadership and Management — Mintzberg''s managerial roles; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── BScN Paper II — 2024: Research Methods ──────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse is conducting a study to investigate the effectiveness of a new pain management technique. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Qualitative research',
  'Exploratory research',
  'B',
  'Experimental research (including randomised controlled trials) is used to test the effectiveness of interventions or treatments by manipulating the independent variable (the pain management technique) and measuring its effect on the dependent variable (pain outcomes), with randomisation and control groups. Testing effectiveness implies a cause-and-effect question, which requires an experimental design. Ref: Nursing Research — research designs; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse is conducting a study to explore the experiences of patients living with chronic illness through in-depth interviews. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Qualitative research',
  'Survey research',
  'C',
  'Qualitative research explores the meaning, experience, perspectives and lived realities of participants. In-depth interviews are the hallmark qualitative data collection method, generating rich narrative data. The purpose here is to understand the subjective experience of chronic illness — a phenomenological or interpretive question. Descriptive research summarises frequencies/distributions. Experimental research tests interventions. Ref: Nursing Research — qualitative methods; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse is reviewing existing medical records to gather information about the prevalence of a specific medical condition within a hospital''s patient population. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Qualitative research',
  'Exploratory research',
  'A',
  'Descriptive research collects and summarises data to describe the characteristics, distribution or prevalence of a phenomenon in a defined population — without manipulation or hypothesis testing. Reviewing medical records to determine the prevalence of a condition is a classic example of descriptive/epidemiological research. Ref: Nursing Research — descriptive research design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse is conducting a research study to investigate the factors associated with medication noncompliance among elderly patients. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Correlational research',
  'Qualitative research',
  'C',
  'Correlational research examines the relationships and associations between variables without manipulation. Investigating factors ASSOCIATED with (correlated with) medication non-compliance — without altering any variable — is correlational. It identifies predictors and relationships but cannot establish causation. Experimental research requires manipulation. Descriptive research does not examine relationships between variables. Ref: Nursing Research — correlational design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'In a nursing research study, the researcher collects data through structured questionnaires with closed-ended questions to examine the prevalence of stress among intensive care unit (ICU) nurses. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Grounded theory research',
  'Survey research',
  'D',
  'Survey research uses structured questionnaires (with closed-ended or Likert-scale items) administered to a defined sample to describe the distribution or prevalence of variables — in this case, stress among ICU nurses. It is cross-sectional, non-experimental and produces quantitative data. While it has descriptive elements, the specific methodology of structured questionnaires defines it as survey research. Ref: Nursing Research — survey design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse researcher is conducting a study to investigate the relationship between nurse-patient communication and patient satisfaction in a hospital setting. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Correlational research',
  'Grounded theory research',
  'C',
  'Correlational research examines the statistical relationship between two or more variables (nurse-patient communication and patient satisfaction) without manipulating either. It determines whether and to what degree variables are related. Because the researcher does not manipulate communication (no intervention), this is not experimental. Ref: Nursing Research — correlational design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'In a nursing research study, the researcher conducts a literature review to identify gaps in existing knowledge related to pain management in pediatric patients. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Exploratory research',
  'Grounded theory research',
  'C',
  'Exploratory research is conducted when little is known about a topic, or to identify gaps, generate hypotheses, and explore new areas of enquiry. Conducting a literature review specifically to identify gaps in existing knowledge about paediatric pain management is an exploratory activity — it guides future research rather than testing hypotheses or collecting primary data. Ref: Nursing Research — exploratory design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse is conducting a research study to investigate the frequency and causes of workplace injuries among healthcare workers. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Causal-comparative research',
  'Survey research',
  'A',
  'Descriptive research describes the frequency, nature and distribution of a phenomenon as it naturally occurs. Investigating the frequency and causes of workplace injuries (without manipulation) — to characterise the problem — is descriptive epidemiological research. This is the first step before analytic research. Causal-comparative research compares groups. Survey research is a method, not a separate design type. Ref: Nursing Research — descriptive design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'In a nursing research study, the researcher collects data on the number of falls in a hospital before and after implementing a fall prevention program. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Causal-comparative research',
  'Correlational research',
  'C',
  'Causal-comparative (ex post facto) research compares outcomes in groups defined by a pre-existing or naturally occurring event — in this case, before and after an intervention was implemented — to infer cause-and-effect. Because the researcher did not randomly assign participants, it is quasi-experimental/causal-comparative, not a true experiment. The before-and-after comparison is designed to attribute the change in falls to the programme. Ref: Nursing Research — causal-comparative design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A nurse is conducting a research study to investigate the factors contributing to medication errors in a hospital setting by analyzing incident reports and conducting interviews with healthcare providers. What type of research is this most likely an example of?',
  'Descriptive research',
  'Experimental research',
  'Grounded theory research',
  'Qualitative research',
  'C',
  'Grounded theory is a qualitative research methodology (Glaser and Strauss) in which theories or conceptual frameworks are systematically generated (grounded) from data collected through interviews and document analysis. Using incident reports and interviews to generate a theory about the factors contributing to medication errors is the grounded theory approach. It differs from generic qualitative research in its explicit goal of theory generation. Ref: Nursing Research — grounded theory; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── BScN Paper II — 2024: Nursing Education Technology ───────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'A nursing educator organizes group discussions and problem-solving activities during class, encouraging students to actively participate and collaborate. What type of learning approach is this?',
  'Gamified learning',
  'Experiential learning',
  'Flipped learning',
  'Active learning',
  'D',
  'Active learning encompasses any instructional method that engages students in the learning process through purposeful activities — group discussions, problem-solving, case studies, debates and peer teaching. The defining characteristic is that students are actively constructing knowledge rather than passively receiving it. Flipped learning specifically involves pre-class content consumption and in-class application. Experiential learning focuses on learning through direct experience. Ref: Nursing Education — active learning; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'A nursing educator incorporates virtual reality simulations to train students in critical care scenarios. What type of technology-enhanced learning is this?',
  'Blended learning',
  'E-learning',
  'Virtual classroom',
  'Simulated learning',
  'D',
  'Simulated learning uses realistic replicas of clinical environments, mannequins or virtual reality to give students immersive, risk-free practice experiences. Virtual reality simulations for critical care training are a form of simulated learning, providing high-fidelity, interactive practice before students encounter real patients. Blended learning combines online and face-to-face. E-learning delivers content digitally. A virtual classroom is live online instruction. Ref: Nursing Education — simulation and technology; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'A nursing instructor uses a learning management system to deliver course content, assignments, and assessments online. What type of technology-enhanced learning is this?',
  'Blended learning',
  'E-learning',
  'Virtual classroom',
  'Simulated learning',
  'B',
  'E-learning (electronic learning) involves delivering educational content and activities via digital technologies — including learning management systems (LMS such as Moodle, Canvas or Blackboard) that host course materials, assignments, quizzes and assessments online. Students access content asynchronously and independently. Blended learning combines online and face-to-face components. A virtual classroom involves live, synchronous online sessions. Ref: Nursing Education — e-learning; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'In a nursing program, students attend in-person lectures and labs, but they also access course materials and participate in discussions through an online platform. What type of learning model is being used?',
  'Blended learning',
  'E-learning',
  'Virtual classroom',
  'Simulated learning',
  'A',
  'Blended (hybrid) learning intentionally combines face-to-face instruction (in-person lectures and labs) with online learning components (accessing materials, participating in discussions via an online platform). It leverages the strengths of both modalities. This is distinct from fully online (e-learning) or fully face-to-face learning. Ref: Nursing Education — blended/hybrid learning; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'A nursing educator conducts live, real-time lectures with students through a web conferencing platform. What type of technology-enhanced learning is this?',
  'Blended learning',
  'E-learning',
  'Virtual classroom',
  'Simulated learning',
  'C',
  'A virtual classroom is a synchronous, real-time online learning environment in which instructor and students interact live via web conferencing technology (e.g. Zoom, Teams, Google Meet). Students attend class virtually, participate in discussions and ask questions in real time, replicating the classroom experience online. This contrasts with asynchronous e-learning where students access content at their own pace. Ref: Nursing Education — virtual classroom/synchronous learning; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'In a nursing course, students are given pre-recorded videos and materials to review before attending interactive in-class sessions. What type of learning model is being used?',
  'Gamified learning',
  'Experiential learning',
  'Flipped learning',
  'Active learning',
  'C',
  'Flipped learning (inverted classroom) reverses the traditional model: students access instructional content (lectures, videos) independently before class (homework becomes content consumption), and class time is then used for active, applied, higher-order learning activities with the instructor''s facilitation. This maximises classroom time for problem-solving and collaboration. Ref: Nursing Education — flipped classroom; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Education', 'Technology-Enhanced Learning',
  'A nursing educator uses gamification techniques to create engaging and interactive learning experiences for students. What type of technology-enhanced learning is this?',
  'Gamified learning',
  'Experiential learning',
  'Flipped learning',
  'Active learning',
  'A',
  'Gamified learning incorporates game design elements — points, badges, leaderboards, levels, challenges and rewards — into educational contexts to increase engagement, motivation and participation. It is distinct from serious gaming (using actual games for learning) and active learning (which is broader). The explicit use of gamification mechanics to enhance engagement defines this as gamified learning. Ref: Nursing Education — gamification; NCK BScN curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── BScN Paper II — 2024: Sociology / Research approaches ───────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A sociologist is conducting research on the impact of social media on interpersonal relationships. What research method would be most appropriate for this study?',
  'Surveys and questionnaires',
  'Observational research',
  'Historical analysis',
  'Ethnographic research',
  'A',
  'Surveys and questionnaires are the most appropriate method for studying attitudes, behaviours and self-reported experiences (such as social media use and its perceived impact on relationships) across large, diverse populations. They allow standardised, quantifiable data collection enabling statistical analysis. Observational research and ethnography are suited to in-depth, contextual study of small groups. Historical analysis examines past records/events. Ref: Nursing Research — quantitative methods/survey design; Polit & Beck; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Research Methods',
  'A cultural anthropologist is studying a remote indigenous tribe''s belief systems and practices. What research method is likely to yield the most in-depth insights?',
  'Historical analysis',
  'Surveys and questionnaires',
  'Participant observation',
  'Comparative analysis',
  'C',
  'Participant observation — the researcher lives within and participates in the community being studied — is the method that yields the deepest, most contextual and authentic insights into belief systems and cultural practices. It is the foundational method of ethnographic fieldwork, allowing the researcher to observe behaviour in its natural context. Surveys cannot capture the richness and context. Ref: Nursing Research/Anthropology — participant observation; qualitative methods; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Sociology and Health',
  'A sociologist is researching the impact of income inequality on access to healthcare. What theoretical perspective is most likely to guide this research?',
  'Conflict theory',
  'Functionalism',
  'Symbolic interactionism',
  'Feminist theory',
  'A',
  'Conflict theory (Marx, Weber) examines how power differentials, economic inequality and competition for scarce resources shape social structures and outcomes. Income inequality and differential access to healthcare are central concerns of conflict theory — unequal distribution of resources reflects power struggles and systemic inequities. Functionalism examines social stability. Symbolic interactionism examines micro-level meaning-making. Feminist theory focuses on gender inequalities. Ref: Sociology — conflict theory; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'BScN', 'Nursing Research', 'Sociology and Health',
  'A sociologist is examining the impact of globalization on cultural diversity. What theoretical perspective is most likely to guide this research?',
  'Conflict theory',
  'Functionalism',
  'Symbolic interactionism',
  'World systems theory',
  'D',
  'World systems theory (Wallerstein) examines how the global capitalist economy — divided into core, semi-periphery and periphery nations — shapes economic, political and cultural relationships. It is specifically designed to analyse globalisation''s impact on societies, including cultural homogenisation or disruption of local cultural diversity. Ref: Sociology — world systems theory; NCK BScN curriculum.',
  'hard', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── KRCHN Paper II — 2024: Community Health ──────────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Older Adult Health',
  'A community health nurse is working with a group of older adults, and many have reported feeling socially isolated. What intervention should the nurse prioritize to address this issue?',
  'Providing medication for anxiety',
  'Encouraging physical activity',
  'Organizing group outings',
  'Administering vaccines',
  'C',
  'Social isolation in older adults is a major health risk, associated with depression, cognitive decline, increased mortality and poor quality of life. The priority nursing intervention is to address the root cause — social isolation — by organising group outings and social activities. This directly promotes social engagement, reduces loneliness and improves mental well-being. Medication for anxiety treats a symptom, not the cause. Vaccines and physical activity are health promotion but do not address social isolation directly. Ref: Community Health Nursing — gerontology; MOH Kenya health of the elderly.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Environmental Health',
  'In a community with concerns about the health impact of air pollution, what is the primary health issue associated with long-term exposure to ground-level ozone?',
  'Gastrointestinal infections',
  'Cardiovascular diseases',
  'Skin cancer',
  'Respiratory diseases',
  'D',
  'Ground-level (tropospheric) ozone is a secondary air pollutant formed by photochemical reactions of NOx and VOCs in sunlight. Long-term exposure primarily damages the respiratory system: it causes airway inflammation, reduction in lung function, aggravation of asthma and bronchitis, and increased susceptibility to respiratory infections. While cardiovascular effects occur, respiratory disease is the PRIMARY and most direct health impact. Ref: WHO/UNEP air quality guidelines; Environmental health — community nursing.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'HIV/AIDS Prevention',
  'A community health nurse is conducting an assessment of a population with a high incidence of HIV/AIDS. What intervention is most effective for preventing the sexual transmission of HIV?',
  'Routine vaccination',
  'Condom use',
  'Social isolation',
  'Quarantine measures',
  'B',
  'Consistent and correct use of condoms (male and female) is the most effective primary prevention strategy for reducing sexual transmission of HIV/STIs. It provides a physical barrier preventing contact between mucous membranes and infectious secretions. There is currently no licensed HIV vaccine. Social isolation and quarantine are not appropriate or effective for preventing sexual transmission and violate human rights. Ref: NASCOP/MOH Kenya HIV prevention guidelines; WHO HIV prevention.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'TB Control',
  'A community health nurse is conducting an assessment of a population with a high incidence of tuberculosis (TB). What intervention is most effective for preventing the transmission of TB to close contacts?',
  'Quarantine measures',
  'Social isolation',
  'Routine vaccination',
  'Contact tracing and testing',
  'D',
  'Contact tracing and testing identifies individuals exposed to an infectious TB case, tests them for latent or active TB infection and initiates preventive therapy (isoniazid preventive therapy/IPT) or treatment for active disease. This breaks the chain of transmission. BCG vaccination prevents severe disease in children but does not prevent transmission in adults. Quarantine/isolation applies to the index case, not contact prevention. Ref: MOH Kenya National TB Programme (NTLP); WHO End TB strategy; DOTS.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Home-Based Care',
  'A home health nurse is providing care to an older adult who has difficulty managing daily activities like bathing, dressing, and eating. What is the most appropriate care goal for this individual?',
  'Promoting independence in daily activities',
  'Assisting with all activities to minimize exertion',
  'Encouraging complete bed rest',
  'Recommending transfer to a long-term care facility',
  'A',
  'The primary goal of home-based care for an older adult with functional limitations is to promote maximum independence in activities of daily living (ADLs), thereby preserving dignity, self-esteem and quality of life. Rehabilitation, assistive devices, environmental modifications and graded activity are used. Total dependence and bed rest lead to deconditioning and complications. Transfer to a facility is a last resort. Ref: Community Health Nursing — home-based care; gerontological nursing; MOH Kenya KEPH.',
  'medium', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Home-Based Care',
  'A home health nurse is caring for a patient recovering from surgery. What is a crucial aspect of wound care in a home setting?',
  'Frequent wound exposure to open air',
  'Frequent dressing changes',
  'Maintaining a moist wound environment',
  'Applying topical antibiotics to the wound',
  'C',
  'Evidence-based wound care (moist wound healing theory — Winter, 1962) demonstrates that maintaining a moist wound environment optimises healing by promoting epithelial cell migration, reducing pain and preventing crust/scab formation that impedes healing. Frequent wound exposure to air causes desiccation. Frequent dressing changes are not evidence-based unless the wound requires it clinically. Routine topical antibiotics increase resistance and are not standard. Ref: Brunner & Suddarth — wound care; evidence-based nursing.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Home-Based Care',
  'A home health nurse is caring for a patient with diabetes. What self-care practice should the nurse emphasize to prevent foot complications?',
  'Keeping feet elevated at all times',
  'Avoiding any weight-bearing activities',
  'Regularly inspecting and moisturizing the feet',
  'Wearing tight-fitting shoes and socks',
  'C',
  'Diabetic foot complications (ulcers, infections, amputations) are prevented by daily foot inspection (detecting cuts, blisters, sores) and regular moisturising (preventing dry skin and fissures that become portals of entry). Patients should also wear well-fitting (not tight) shoes, trim nails correctly and avoid walking barefoot. Keeping feet elevated at all times is not recommended. Avoiding weight-bearing is not a standard recommendation for uncomplicated diabetes. Ref: Brunner & Suddarth — diabetic foot care; MOH Kenya diabetes guidelines.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Antibiotic Resistance',
  'In a community with concerns about the spread of antibiotic-resistant superbugs, what intervention should be emphasized to reduce the development of antibiotic resistance?',
  'Encouraging the use of broad-spectrum antibiotics',
  'Administering antibiotics to individuals with viral infections',
  'Completing the full course of antibiotics as prescribed',
  'Sharing antibiotics with family members',
  'C',
  'Completing the full prescribed course of antibiotics eliminates all susceptible bacteria, preventing the selection and multiplication of resistant mutants that survive sub-therapeutic concentrations. Stopping early or using incomplete courses are major drivers of antibiotic resistance. Broad-spectrum antibiotics, treating viral infections with antibiotics and sharing antibiotics all promote resistance. Ref: MOH Kenya Antimicrobial Stewardship; WHO Global Action Plan on Antimicrobial Resistance.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── KRCHN Paper II — 2024: Psychiatric Nursing ───────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Psychotic Disorders',
  'A psychiatric nurse is caring for a patient with schizophrenia who is experiencing auditory hallucinations. What is the priority intervention?',
  'Engaging in therapeutic conversation',
  'Administering antipsychotic medication',
  'Recommending relaxation techniques',
  'Providing a quiet and isolated environment',
  'B',
  'In a patient with active auditory hallucinations in schizophrenia, the priority pharmacological intervention is to administer prescribed antipsychotic medication to reduce the intensity and distress of hallucinations. Antipsychotics (e.g. haloperidol, olanzapine, risperidone) target dopamine dysregulation and reduce positive symptoms. Therapeutic conversation, relaxation and environmental modification are adjunct interventions that follow medication. Isolating the patient may increase distress. Ref: Psychiatric/Mental Health Nursing; pharmacotherapy of schizophrenia.',
  'medium', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Eating Disorders',
  'A psychiatric nurse is assessing a patient with an eating disorder who has lost a significant amount of weight and experiences body dysmorphia. What is the priority concern?',
  'Encouraging further weight loss',
  'Addressing body image concerns',
  'Monitoring electrolyte imbalances and physical complications',
  'Recommending intense exercise routines',
  'C',
  'In severe eating disorders (anorexia nervosa/bulimia), the immediate priority is to assess and manage life-threatening physical complications — particularly electrolyte imbalances (hypokalaemia, hyponatraemia, hypophosphataemia), cardiac arrhythmias, and severe malnutrition. These can be fatal. Addressing body image concerns is important psychologically but is not the immediate priority when physical safety is compromised. Encouraging weight loss or intense exercise is absolutely contraindicated. Ref: Mental Health Nursing — eating disorders; Brunner & Suddarth.',
  'medium', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Anxiety Disorders',
  'A psychiatric nurse is assessing a patient with generalized anxiety disorder (GAD) who reports excessive worrying and physical symptoms like muscle tension and restlessness. What is the first-line treatment for GAD?',
  'Antipsychotic medications',
  'Benzodiazepines',
  'Cognitive-behavioral therapy (CBT)',
  'Electroconvulsive therapy (ECT)',
  'C',
  'Cognitive-Behavioural Therapy (CBT) is the first-line evidence-based psychological treatment for Generalised Anxiety Disorder. It addresses maladaptive thought patterns and behaviours maintaining anxiety. Pharmacotherapy with SSRIs/SNRIs is also first-line. Benzodiazepines are second-line due to dependence risk and are used short-term only. Antipsychotics and ECT are not indicated for uncomplicated GAD. Ref: Mental Health Nursing — GAD management; DSM-5; NICE guidelines.',
  'medium', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Substance Use Disorders',
  'A psychiatric nurse is caring for a patient with alcohol use disorder who is experiencing alcohol withdrawal. What medication is commonly used to manage alcohol withdrawal symptoms?',
  'Antipsychotic medications',
  'Antidepressant medications',
  'Benzodiazepines',
  'Antihypertensive medications',
  'C',
  'Benzodiazepines (e.g. diazepam, chlordiazepoxide, lorazepam) are the gold-standard pharmacological treatment for alcohol withdrawal syndrome. They act on GABA-A receptors (like alcohol), preventing withdrawal seizures, delirium tremens, and reducing autonomic hyperactivity (tachycardia, hypertension, tremor). The Clinical Institute Withdrawal Assessment (CIWA) scale guides dosing. Antipsychotics lower the seizure threshold and are contraindicated in withdrawal. Ref: Mental Health Nursing — alcohol withdrawal; WHO/MOH Kenya substance use.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Bipolar Disorder',
  'A psychiatric nurse is caring for a patient with bipolar disorder in the manic phase who exhibits impulsivity and excessive spending. What is the priority intervention?',
  'Encouraging the patient to continue impulsive spending',
  'Allowing the patient to make financial decisions without restrictions',
  'Setting strict limits on financial transactions',
  'Isolating the patient from financial activities',
  'C',
  'In the manic phase of bipolar disorder, impaired judgement and impulsivity lead to potentially destructive financial decisions (excessive spending, unwise investments, debt). The priority nursing intervention is to set clear, firm limits on financial transactions to prevent financial harm. This is done collaboratively, non-punitively and with explanation. Complete isolation from financial activities is not therapeutic but clear limits protect the patient. Ref: Mental Health Nursing — bipolar disorder/manic phase management; Townsend.',
  'medium', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Suicidal Ideation',
  'A psychiatric nurse is caring for a patient with bipolar disorder in the depressive phase who expresses feelings of worthlessness and suicidal thoughts. What is the immediate intervention?',
  'Administering antipsychotic medication',
  'Encouraging the patient to embrace the depressive phase',
  'Assessing for safety, removing access to lethal means, and initiating crisis intervention',
  'Isolating the patient to prevent self-harm',
  'C',
  'Active suicidal ideation is a psychiatric emergency. The IMMEDIATE priorities are: (1) SAFETY ASSESSMENT (risk/lethality assessment — plan, intent, means); (2) REMOVING ACCESS TO LETHAL MEANS (medications, sharp objects, cords); (3) INITIATING CRISIS INTERVENTION (one-to-one supervision, calling the psychiatric team, implementing suicide precautions). Antipsychotics are not the immediate intervention for depression with suicidal ideation. Isolation increases risk. Encouraging embracing depression is harmful. Ref: Mental Health Nursing — suicidal crisis management; MOH Kenya mental health protocols.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'PTSD',
  'A psychiatric nurse is caring for a patient with post-traumatic stress disorder (PTSD) who experiences flashbacks and nightmares. What is the therapeutic approach for managing these symptoms?',
  'Exposure therapy',
  'Isolation and minimal stimuli',
  'Avoiding discussions of the trauma',
  'Encouraging substance use',
  'A',
  'Trauma-focused cognitive-behavioural therapy (TF-CBT), including prolonged exposure therapy, is the first-line evidence-based treatment for PTSD. Exposure therapy involves systematic, structured confrontation of trauma memories and triggers in a safe therapeutic environment, extinguishing the conditioned fear response. Avoidance of trauma-related stimuli maintains and worsens PTSD. Substance use is a common maladaptive coping strategy that worsens outcomes. Ref: Mental Health Nursing — PTSD management; NICE guidelines; DSM-5.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Depressive Disorders',
  'A psychiatric nurse is caring for a patient with major depressive disorder who is experiencing severe sadness, loss of interest, and changes in sleep and appetite. What is the initial treatment approach?',
  'Administering electroconvulsive therapy (ECT)',
  'Recommending lifestyle changes and exercise',
  'Prescribing antipsychotic medications',
  'Initiating antidepressant medication and therapy',
  'D',
  'The initial standard treatment for major depressive disorder (MDD) is the combination of antidepressant pharmacotherapy (SSRIs/SNRIs as first-line agents) and psychotherapy (CBT or interpersonal therapy). This evidence-based combined approach is more effective than either modality alone for moderate-to-severe MDD. ECT is reserved for treatment-resistant or severe/psychotic depression. Antipsychotics are for psychotic features. Lifestyle changes are adjuncts, not initial treatment for severe MDD. Ref: Mental Health Nursing — MDD management; WHO mhGAP; MOH Kenya.',
  'medium', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Mental Health Nursing', 'Grief and Bereavement',
  'A client visits the clinic after the death of a parent. Which statement made by the client''s sister signifies abnormal grieving?',
  'My sister still has episodes of crying, and it''s been three months since Daddy died',
  'Sally seems to have forgotten the bad things that Daddy did in his lifetime',
  'She really had a hard time after Daddy''s funeral; she said she had a sense of longing',
  'She has not been saddened at all by Daddy''s death; she acts like nothing has happened',
  'D',
  'Complete absence of sadness and grief reaction following the death of a parent — "acts like nothing has happened" — is a sign of absent/inhibited grief (maladaptive/abnormal grieving), where the bereaved person has not processed the loss. Normal grief includes crying, sadness, sense of loss, longing and idealisation of the deceased. The other statements describe normal grief responses. Absent grief may be associated with complicated grief disorder or denial. Ref: Mental Health Nursing — grief and loss; DSM-5 Prolonged Grief Disorder.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

-- ─── KRCHN Paper II — 2024: Cultural Competence ──────────────────────────────

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Cultural Competence',
  'A nurse working in a diverse community is respectful of various cultural beliefs and practices. What concept is she demonstrating in her approach to patient care?',
  'Cultural relativism',
  'Ethnocentrism',
  'Cultural diffusion',
  'Assimilation',
  'A',
  'Cultural relativism is the principle of understanding and evaluating cultural beliefs and practices within their own cultural context, without imposing external (including one''s own) value judgements. A nurse who respects various cultural beliefs and practices without judging them against her own culture''s standards is demonstrating cultural relativism. This is distinct from cultural competence (which includes skills) but is a foundational value within it. Ethnocentrism is judging other cultures by one''s own culture as the standard. Ref: Community Health Nursing — cultural relativism; cross-cultural care.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Cultural Competence',
  'In a healthcare setting, what is the purpose of cultural competence training for healthcare providers?',
  'To promote ethnocentrism',
  'To eliminate cultural diversity',
  'To provide standardized care for all patients',
  'To improve care for diverse patient populations',
  'D',
  'Cultural competence training equips healthcare providers with the knowledge, skills and attitudes to effectively assess and respond to the culturally and linguistically diverse needs of patients, thereby improving health outcomes and reducing health disparities. It does NOT aim to standardise care (which ignores individual/cultural needs) or eliminate diversity. Promoting ethnocentrism would harm care quality. Ref: Community Health Nursing — cultural competence; WHO/MOH Kenya diversity in healthcare.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Social Determinants of Health',
  'A nursing student is studying the impact of socioeconomic status on health outcomes. What aspect of sociology is the student exploring?',
  'Cultural beliefs',
  'Ethnocentrism',
  'Social determinants of health',
  'Cultural competence',
  'C',
  'Social determinants of health (SDH) are the non-medical social, economic, political and environmental conditions in which people are born, grow, live, work and age. Socioeconomic status (income, education, employment, housing) is a core social determinant that profoundly influences health outcomes, disease risk, healthcare access and health behaviours. Ref: WHO Commission on Social Determinants of Health; MOH Kenya Health Equity; NCK curriculum.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Home-Based Care',
  'A home health nurse is caring for a patient with heart failure. What should be a key component of the patient''s care plan?',
  'Limiting fluid intake',
  'Promoting physical activity and exercise',
  'Encouraging a high-sodium diet',
  'Discontinuing all medications',
  'B',
  'Cardiac rehabilitation including graded physical activity and exercise is a key evidence-based component of heart failure management at home. It improves exercise capacity, reduces symptoms, decreases hospitalisation rates and improves quality of life. Other key components include: sodium restriction (not high-sodium), fluid restriction in fluid-overloaded patients, medication adherence (never discontinue), daily weight monitoring and symptom recognition. Ref: Brunner & Suddarth — heart failure management; MOH Kenya cardiovascular guidelines.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;

INSERT INTO questions (cadre, unit, topic, stem, option_a, option_b, option_c, option_d,
  correct_option, rationale, difficulty, status, exam_year, paper)
VALUES (
  'KRCHN', 'Community Health Nursing', 'Home-Based Care',
  'A home health nurse is providing care for a patient with a history of falls. What should be emphasized in the care plan to reduce the risk of falls at home?',
  'Encouraging the use of slippery rugs',
  'Promoting poor lighting conditions',
  'Recommending the use of assistive devices',
  'Discouraging exercise and mobility',
  'C',
  'Falls prevention in the home requires a multi-factorial approach. Recommending and providing appropriate assistive devices (canes, walkers, grab bars, raised toilet seats) is a primary intervention that improves stability and reduces fall risk. Other key interventions include: adequate lighting, removing trip hazards (loose rugs, clutter), reviewing medications for orthostatic hypotension, and supervised exercise for strength/balance. Slippery rugs and poor lighting INCREASE fall risk. Reducing mobility worsens deconditioning. Ref: Community Health Nursing — falls prevention; MOH Kenya; WHO.',
  'easy', 'approved', 2024, 'Paper II'
) ON CONFLICT (stem, cadre) DO NOTHING;
