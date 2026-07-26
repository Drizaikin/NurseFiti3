-- Fix the incorrectly flagged "Cardiac disease in pregnancy" question for BScN
UPDATE questions
SET
    correct_option = 'B',
    rationale = 'In pregnant women with cardiac disease, the physiological stress of pushing during the second stage of labour (Valsalva manoeuvre) can precipitate cardiac failure. Standard midwifery and obstetric management (per Myles) is to minimize maternal effort by shortening the second stage with assisted instrumental delivery (vacuum extraction or forceps). Ergometrine (Option D) is strictly contraindicated as it causes severe vasoconstriction and increases cardiac workload.'
WHERE stem = 'In Cardiac disease in pregnancy'
  AND cadre = 'BScN';

-- Fix the incorrectly flagged "Cardiac disease in pregnancy" question for KRCHN
UPDATE questions
SET
    correct_option = 'B',
    rationale = 'In pregnant women with cardiac disease, the physiological stress of pushing during the second stage of labour (Valsalva manoeuvre) can precipitate cardiac failure. Standard midwifery and obstetric management (per Myles) is to minimize maternal effort by shortening the second stage with assisted instrumental delivery (vacuum extraction or forceps). Ergometrine (Option D) is strictly contraindicated as it causes severe vasoconstriction and increases cardiac workload.'
WHERE stem = 'In Cardiac disease in pregnancy'
  AND cadre = 'KRCHN';

-- Fix the genuinely flawed "Live vaccine" question for BScN
UPDATE questions
SET
    option_a = 'BCG',
    correct_option = 'A',
    rationale = 'BCG (Bacillus Calmette-Guérin) is a live-attenuated vaccine given at birth to protect against tuberculosis. The other options are not live vaccines: Tetanus and Diphtheria are toxoids, Pertussis is an inactivated whole-cell or acellular vaccine, and Hepatitis B is a recombinant subunit vaccine.'
WHERE stem = 'The following vaccine is a live vaccine:'
  AND cadre = 'BScN';

-- Fix the genuinely flawed "Live vaccine" question for KRCHN
UPDATE questions
SET
    option_a = 'BCG',
    correct_option = 'A',
    rationale = 'BCG (Bacillus Calmette-Guérin) is a live-attenuated vaccine given at birth to protect against tuberculosis. The other options are not live vaccines: Tetanus and Diphtheria are toxoids, Pertussis is an inactivated whole-cell or acellular vaccine, and Hepatitis B is a recombinant subunit vaccine.'
WHERE stem = 'The following vaccine is a live vaccine:'
  AND cadre = 'KRCHN';
