-- Fix for two inaccurately keyed MCQs based on clinical and mathematical rules

UPDATE questions
SET correct_option = 'C',
    rationale = 'Drops/min = (Volume in mL x drop factor) divided by (Time in minutes). = (500 x 20) divided by (6 x 60) = 10,000 divided by 360 = 27.77. Standard rounding rules require rounding to the nearest whole number, which is 28 drops/min.'
WHERE stem = 'To administer Normal saline 500 ml for 6 hours using an IV administration set with a drop factor of 20, the flow rate will be regulated to:';

UPDATE questions
SET correct_option = 'B',
    rationale = 'The Pritchard IM loading regimen for magnesium sulphate is 10 g total IM, given as a divided dose of 5 g deep into each buttock (concurrently with 4 g IV loading). Option B accurately reflects the 10 g total dose divided into each buttock. Per Kenya EmONC/pre-eclampsia-eclampsia guidelines.'
WHERE stem = 'The correct regimen for administering magnesium Sulphate loading dose intramuscularly is:-';
