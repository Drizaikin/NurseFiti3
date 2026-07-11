# Rebuild supplement from scratch and deduplicate
$migDir    = "c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations"
$docxText  = Get-Content "c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\QUESTIONS\set3_extracted.txt" -Raw -Encoding UTF8
$set3SQL   = Get-Content "$migDir\20260711000001_seed_mcq_compilation_set3.sql" -Raw

# ── Section boundaries ─────────────────────────────────────────────────────
$bscnP1  = $docxText.IndexOf("BScN — Paper I")
$bscnP2  = $docxText.IndexOf("BScN — Paper II")
$krchnP1 = $docxText.IndexOf("KRCHN — Paper I")
$krchnP2 = $docxText.IndexOf("KRCHN — Paper II")
$endPos  = $docxText.Length

$sections = @(
    [PSCustomObject]@{cadre="BScN";  paper="Paper I";  text=$docxText.Substring($bscnP1,  $bscnP2-$bscnP1)},
    [PSCustomObject]@{cadre="BScN";  paper="Paper II"; text=$docxText.Substring($bscnP2,  $krchnP1-$bscnP2)},
    [PSCustomObject]@{cadre="KRCHN"; paper="Paper I";  text=$docxText.Substring($krchnP1, $krchnP2-$krchnP1)},
    [PSCustomObject]@{cadre="KRCHN"; paper="Paper II"; text=$docxText.Substring($krchnP2, $endPos-$krchnP2)}
)

# ── Build existing stem+cadre index from ALL prior migrations ──────────────
$existingWithCadre = [System.Collections.Generic.HashSet[string]]::new()

$allPriorFiles = Get-ChildItem $migDir -Filter "*.sql" | Sort-Object Name |
    Where-Object { $_.Name -notlike "*set3_supplement*" -and $_.Name -notlike "*fix_supplement*" }

foreach ($f in $allPriorFiles) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $ms = [regex]::Matches($c, "VALUES \('(.{10,300}?)',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[ABCD]',\s*'[^']+',\s*'(BScN|KRCHN)'")
    foreach ($m in $ms) {
        $stem  = $m.Groups[1].Value.Trim() -replace "''","'" -replace '\s+',' '
        $cadre = $m.Groups[2].Value
        $key   = $stem.Substring(0,[Math]::Min(80,$stem.Length)).ToLower().Trim() + "|" + $cadre
        [void]$existingWithCadre.Add($key)
    }
}
Write-Host "Existing stem+cadre index size: $($existingWithCadre.Count)"

# ── Extract questions from docx ────────────────────────────────────────────
$pattern = [regex]::new(
    '(\d+)\.\s+(.+?)\s+A\.\s+(.+?)\s+B\.\s+(.+?)\s+C\.\s+(.+?)\s+D\.\s+(.+?)\s+Answer:\s+([A-D])\.\s+(.+?)\s+Rationale:\s+(.+?)(?=\s+\d+\.\s+[A-Z]|$)',
    [System.Text.RegularExpressions.RegexOptions]::Singleline
)

function ESC($s) { return $s -replace "'","''" }

function GetUnitTopic($stem, $paper) {
    $s = $stem.ToLower()
    if ($paper -eq "Paper II") {
        if ($s -match "epidemi|incidence|prevalence|morbid|mortal|outbreak|endemic|pandemic") { return "Community Health Nursing","Epidemiology" }
        if ($s -match "immuniz|vaccine|bcg|dpt|opv|kepi|vaccination") { return "Community Health Nursing","Immunization" }
        if ($s -match "malaria|plasmodium|anopheles|chloroquine|quinine|blackwater") { return "Community Health Nursing","Malaria" }
        if ($s -match "filaria|onchocerci|trachoma|schistosom|leishmania|trypanosoma|sandfly|blackfly") { return "Community Health Nursing","Communicable Diseases" }
        if ($s -match "hiv|aids|art |nascop|antiretrovir|cd4|viral load|acyclovir|zovirax") { return "Community Health Nursing","HIV and AIDS" }
        if ($s -match "tuberculosis| tb |rifampicin|isoniazid|ntlp|sputum|afb") { return "Community Health Nursing","Tuberculosis" }
        if ($s -match "cholera|typhoid|dysentery|shigella|vibrio|oral rehydrat") { return "Community Health Nursing","Communicable Diseases" }
        if ($s -match "phc|primary health care|alma.ata|ottawa charter|health promot") { return "Community Health Nursing","Primary Health Care" }
        if ($s -match "mental|psychiatr|psychos|schizophren|depression|anxiety|bipolar|delusion|hallucin|dementia|alzheimer") { return "Mental Health Nursing","Mental Health Nursing" }
        if ($s -match "research|hypothesis|variable|qualitat|quantitat|evidence.based|study design|randomized|cohort") { return "Research & Evidence-Based Practice","Research Methodology" }
        if ($s -match "statistic|mean |median|mode |standard deviation|biostatistic") { return "Research & Evidence-Based Practice","Biostatistics" }
        if ($s -match "management|leadership|delegat|organiz|staffing|budget|plann|motivat|fayol|taylor|herzberg") { return "Nursing Management & Leadership","Nursing Management" }
        if ($s -match "ethics|nck|nurses act|scope of practice|negligence|malpractice|autonomy|informed consent") { return "Professional Ethics & Law","Professional Practice" }
        if ($s -match "nutrition|diet|vitamin|mineral|protein|carbohydrate|calorie|malnutrition|marasmus|kwashiorkor|iron.rich|food rich") { return "Nutrition","Nutrition" }
        if ($s -match "water|sanitation|sewage|refuse|environmental|noise|occupational|radiation|pollution") { return "Environmental Health","Environmental Health" }
        if ($s -match "infection control|steriliz|disinfect|aseptic|ppe|hand.wash|isolation|barrier nursing") { return "Infection Prevention & Control","Infection Prevention" }
        if ($s -match "family planning|contraception|oral contraceptive|iud |rhythm method|implant|steriliz") { return "Community Health Nursing","Family Planning" }
        if ($s -match "health system|nhif|hospital level|devolution|sdg |millennium|level iv|level v") { return "Health Systems in Kenya","Health Systems" }
        if ($s -match "teach|learn|curriculum|bloom|affective domain|psychomotor|cognitive domain|lesson plan") { return "Nursing Management & Leadership","Nursing Education" }
        if ($s -match "home.based care|hbc |community action|community organiz|community diagnosis") { return "Community Health Nursing","Community Health" }
        if ($s -match "disaster|vulnerability|preparedness|hazard") { return "Community Health Nursing","Disaster Management" }
        if ($s -match "addiction|alcohol|substance|drug abuse|delirium tremens") { return "Mental Health Nursing","Substance Use Disorders" }
        if ($s -match "thought disorder|stream of thought|psychomotor|catatonia|frotteur|sexual object|paraphilia") { return "Mental Health Nursing","Mental Health Nursing" }
        return "Community Health Nursing","Community Health"
    }
    # Paper I
    if ($s -match "thyroid|hyperthyroid|hypothyroid|goiter|synthroid|propylthiouracil|thyroid storm") { return "Medical-Surgical Nursing","Thyroid Disorders" }
    if ($s -match "adrenal|cushing|addison|aldosteron|pheochromocytoma|cortisol|corticosteroid") { return "Medical-Surgical Nursing","Adrenal Disorders" }
    if ($s -match "parathyroid|hypercalcem|hypocalcem|tetany|sulkowitch") { return "Medical-Surgical Nursing","Parathyroid Disorders" }
    if ($s -match "diabetes insipidus|vasopressin|pituitary") { return "Medical-Surgical Nursing","Pituitary Disorders" }
    if ($s -match "gestational diabetes|diabetic mother|diabetes mellitus|insulin|nph insulin|hyperglycemia|hypoglycemia") { return "Medical-Surgical Nursing","Diabetes Mellitus" }
    if ($s -match "cardiac|heart fail|coronary|myocardial|angina|pacemaker|atrial|ventricular|mitral|aortic|valve disease|bypass|angioplasty") { return "Medical-Surgical Nursing","Cardiovascular Nursing" }
    if ($s -match "respiratory|asthma|copd|emphysema|bronch|pneumo|pleural|lung|biot.s|kussmaul|tracheostomy|tracheotomy|fev1|ventilat") { return "Medical-Surgical Nursing","Respiratory Nursing" }
    if ($s -match "renal|kidney|nephro|oliguria|anuria|gfr |dialysis|urolithiasis|urinary|bladder|enuresis") { return "Medical-Surgical Nursing","Renal Disorders" }
    if ($s -match "gastro| gi |liver|hepatic|esophag|stomach|bowel|colon|intestin|celiac|appendic|pancreat|barium|stoma|colostomy") { return "Medical-Surgical Nursing","GI Disorders" }
    if ($s -match "neuro|stroke|cva |cerebrovascular|parkinson|multiple sclerosis|guillain|myasthenia|seizure|epilepsy|meningitis|intracranial pressure|aphasia|demyelination|ataxia|craniotomy") { return "Medical-Surgical Nursing","Neurological Nursing" }
    if ($s -match "fracture|cast|traction|arthritis|rheumatoid|amputation|phantom limb|musculo|bone|joint") { return "Medical-Surgical Nursing","Musculoskeletal Nursing" }
    if ($s -match "leukemia|lymphoma|anemia|anaemia|platelet|thrombocyt|sickle cell|hemophilia|haematolog|oncolog|aplastic") { return "Medical-Surgical Nursing","Oncology and Haematology" }
    if ($s -match "burn|gangrene|wound|pressure ulcer|derma|psoriasis|gingiva|dental|caries") { return "Medical-Surgical Nursing","Surgical Nursing" }
    if ($s -match "eye|ophthalm|cataract|glaucoma|vision|visual") { return "Medical-Surgical Nursing","Ophthalmic Nursing" }
    if ($s -match "drug |pharma|medication|dose |antibiotic|antifungal|antiviral|analgesic|opioid|morphine|aspirin|heparin|warfarin|digoxin") { return "Pharmacology","Drug Therapy" }
    if ($s -match "pregnancy|antenatal|prenatal|gestation|trimester|edd |naegele|quickening|fetus|fetal|placenta|preeclampsia|eclampsia|hellp|labour|labor|delivery|cesarean|pph |postpartum|lochia|breastfeed|lactation|puerperi|uterus|uterine|midwif|perineum|episiotomy|obstetric") { return "Midwifery","Midwifery Care" }
    if ($s -match "malaria in pregnancy|severe malaria.*pregnan|drug.*choice.*malaria.*pregnan") { return "Midwifery","Obstetric Complications" }
    if ($s -match "newborn|neonate|neonatal|apgar |caput |phototherapy|jaundice.*neonate|meconium.*lung|infant reflex|konakion|preterm|prematurity|intrauterine growth") { return "Paediatric Nursing","Neonatal Care" }
    if ($s -match "child|paediatric|pediatric|imnci|growth.*child|infant.*develop|toddler|mileston|marasmus|kwashiorkor|failure to thrive|fontanelle|autism|meningitis.*child|wilm") { return "Paediatric Nursing","Paediatric Nursing" }
    if ($s -match "fluid|electrolyte|acid.base|sodium|potassium|calcium|magnesium|bicarbonate|ph |acidosis|alkalosis") { return "Medical-Surgical Nursing","Fluid and Electrolyte Balance" }
    if ($s -match "aging|elderly|geriatric|gerontol|sarcopenia|osteopenia") { return "Medical-Surgical Nursing","Gerontological Nursing" }
    if ($s -match "anatomy|physiol|cell|gland|artery|vein|hormone|endocrine") { return "Anatomy & Physiology","Anatomy and Physiology" }
    if ($s -match "safe motherhood|antenatal care|family planning.*pregnancy") { return "Midwifery","Antenatal Care" }
    return "Medical-Surgical Nursing","Medical-Surgical Nursing"
}

# ── Extract and deduplicate ────────────────────────────────────────────────
$newQuestions = [System.Collections.Generic.List[PSCustomObject]]::new()

foreach ($sec in $sections) {
    $ms = $pattern.Matches($sec.text)
    foreach ($qm in $ms) {
        $stemRaw = ($qm.Groups[2].Value.Trim() -replace '\s+',' ')
        $rat     = ($qm.Groups[9].Value.Trim() -replace '\s+',' ')
        $correct = $qm.Groups[7].Value.Trim()
        $cadre   = $sec.cadre
        $paper   = $sec.paper

        # Skip garbled / too short
        if ($stemRaw.Length -lt 15) { continue }

        # Key: first 80 chars + cadre (must be unique per §14.5)
        $key80 = $stemRaw.Substring(0,[Math]::Min(80,$stemRaw.Length)).ToLower().Trim()
        $dupKey = $key80 + "|" + $cadre

        # Check: already in prior migrations?
        if ($existingWithCadre.Contains($dupKey)) { continue }
        # Check: already in set3 main migration?
        $set3check = $key80.Substring(0,[Math]::Min(50,$key80.Length))
        if ($set3SQL.ToLower().Contains($set3check)) { continue }

        $newQuestions.Add([PSCustomObject]@{
            stem    = $stemRaw
            a       = ($qm.Groups[3].Value.Trim() -replace '\s+',' ')
            b       = ($qm.Groups[4].Value.Trim() -replace '\s+',' ')
            c       = ($qm.Groups[5].Value.Trim() -replace '\s+',' ')
            d       = ($qm.Groups[6].Value.Trim() -replace '\s+',' ')
            correct = $correct
            rat     = $rat
            cadre   = $cadre
            paper   = $paper
        })
    }
}

Write-Host "Questions to seed after full deduplication: $($newQuestions.Count)"

# ── Generate SQL ───────────────────────────────────────────────────────────
$outFile = "$migDir\20260711000003_seed_mcq_set3_supplement.sql"
$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine("-- ============================================================")
[void]$sb.AppendLine("-- Set 3 Supplement: questions in docx not yet seeded")
[void]$sb.AppendLine("-- Fully deduplicated: no same-stem+same-cadre repeats")
[void]$sb.AppendLine("-- Per nck-exam-system.md §14.5 deduplication rules")
[void]$sb.AppendLine("-- ============================================================")
[void]$sb.AppendLine("")

foreach ($q in $newQuestions) {
    if ($q.a.Length -lt 2 -or $q.b.Length -lt 2) { continue }
    $ut = GetUnitTopic $q.stem $q.paper
    $unit  = $ut[0]; $topic = $ut[1]
    $diff  = "medium"
    $sl    = $q.stem.ToLower()
    if ($sl -match "define|meaning of|refers to|known as|called|which of the following is a") { $diff = "easy" }
    if ($sl -match "prior|first action|most appropriate|most important|analyze|interpret|most likely cause") { $diff = "hard" }

    $se = (ESC $q.stem); $ae = (ESC $q.a); $be = (ESC $q.b)
    $ce = (ESC $q.c);    $de = (ESC $q.d); $re = (ESC $q.rat)
    $ue = (ESC $unit);   $te = (ESC $topic)

    $sql = "INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status) VALUES ('$se', '$ae', '$be', '$ce', '$de', '$($q.correct)', '$re', '$($q.cadre)', '$($q.paper)', '$ue', '$te', '$diff', 'approved') ON CONFLICT (stem, cadre) DO NOTHING;"
    [void]$sb.AppendLine($sql)
}

[System.IO.File]::WriteAllText($outFile, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Written: $outFile"

# ── Count by cadre/paper ──────────────────────────────────────────────────
$content = [System.IO.File]::ReadAllText($outFile)
$bp1  = ([regex]::Matches($content,"'BScN', 'Paper I'")).Count
$bp2  = ([regex]::Matches($content,"'BScN', 'Paper II'")).Count
$kp1  = ([regex]::Matches($content,"'KRCHN', 'Paper I'")).Count
$kp2  = ([regex]::Matches($content,"'KRCHN', 'Paper II'")).Count
$genC = ([regex]::Matches($content,"'General'")).Count
Write-Host "BScN  Paper I : $bp1"
Write-Host "BScN  Paper II: $bp2"
Write-Host "KRCHN Paper I : $kp1"
Write-Host "KRCHN Paper II: $kp2"
Write-Host "TOTAL: $($bp1+$bp2+$kp1+$kp2)"
Write-Host "topic='General' occurrences: $genC  (must be 0)"
