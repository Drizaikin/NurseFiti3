-- Migration: 20260701000008
-- Source: NCK-NEW-MCQ-Compilation.docx — Psychiatric/Mental Health MCQ revision set (undated)
-- exam_year = NULL per §13.1 (no year stated)
-- Per §12: Mental Health Nursing → Paper II for BOTH KRCHN and BScN
-- Audit: verified against DSM-5, Stuart Psychiatric Nursing, Townsend,
--        Videbeck, Kenya Mental Health Act (Cap 248) per §14.3.
-- ON CONFLICT (stem, cadre) DO NOTHING on every INSERT.
-- Note: many of these stems appeared in 2021/2022/2023 dated sections and were
--       already seeded — ON CONFLICT handles all duplicates silently.

-- ── Thought echo — disorder of thought content ───────────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Mental Status Examination','A disorder of thought content is:','Word salad','Thought echo','Waxy flexibility','Catatonic stupor','B','Thought echo (écho de la pensée) is a Schneiderian first-rank symptom of thought content disturbance where the patient hears their own thoughts spoken aloud; word salad is a disorder of thought form; waxy flexibility and stupor are motor signs (DSM-5; Stuart Psychiatric Nursing).','easy',NULL,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Mental Status Examination','A disorder of thought content is:','Word salad','Thought echo','Waxy flexibility','Catatonic stupor','B','Thought content disorders (thought echo, thought insertion, thought withdrawal, thought broadcasting) are Schneiderian FRS indicating loss of ego boundaries; BScN nurses document them precisely in MSE and include in psychiatric referral letters (DSM-5; Stuart Psychiatric Nursing).','easy',NULL,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Oculogyric crisis — fixed upward gaze on Largactil ───────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Psychopharmacology','A fixed upward gaze in a client on chlorpromazine (Largactil) is known as:','Dystonia','Oculogyric crisis','Tardive dyskinesia','Akinesia','B','Oculogyric crisis is an acute dystonic reaction involving sustained involuntary upward gaze deviation caused by antipsychotic-induced dopamine blockade; managed with benztropine IM/IV (Townsend; Stuart Psychiatric Nursing).','easy',NULL,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Psychopharmacology','A fixed upward gaze in a client on chlorpromazine (Largactil) is known as:','Dystonia','Oculogyric crisis','Tardive dyskinesia','Akinesia','B','Oculogyric crisis is an acute dystonic EPSE; BScN nurses administer benztropine 1–2 mg IM stat, reassure the patient, document the reaction and report to prescriber for antipsychotic review. Distinguish from tardive dyskinesia (late onset, irreversible) (Townsend; Stuart; BNF).','easy',NULL,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

-- ── Oral stage — sexual satisfaction through mouth ───────────────────────────
INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('KRCHN','Paper II','Mental Health Nursing','Growth and Development','Sexual satisfaction is obtained through the mouth in the:','Phallic stage','Oral stage','Biting stage','Genital stage','B','In Freud''s psychosexual stages, the oral stage (birth to 18 months) is characterised by libidinal pleasure centred on oral activities — feeding, sucking; fixation may lead to dependency or orally-focused behaviours (Videbeck; DSM-5 psychodynamic concepts).','easy',NULL,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;

INSERT INTO questions (cadre,paper,unit,topic,stem,option_a,option_b,option_c,option_d,correct_option,rationale,difficulty,exam_year,status,contributor_id)
VALUES('BScN','Paper II','Mental Health Nursing','Growth and Development','Sexual satisfaction is obtained through the mouth in the:','Phallic stage','Oral stage','Biting stage','Genital stage','B','Freud''s stages (oral → anal → phallic → latency → genital) are applied in psychodynamic formulation; BScN nurses use developmental assessment to identify age-appropriate milestones and flag regression as a sign of psychopathology (Videbeck; Stuart Psychiatric Nursing).','easy',NULL,'approved',NULL)ON CONFLICT(stem,cadre)DO NOTHING;
