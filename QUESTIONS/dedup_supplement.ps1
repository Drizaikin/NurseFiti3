# Deduplication script for set3 supplement
$migDir = "c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations"

# Build index of existing stem+cadre from ALL migrations except the supplement
$allPriorFiles = Get-ChildItem $migDir -Filter "*.sql" | Sort-Object Name | 
    Where-Object { $_.Name -notlike "*set3_supplement*" -and $_.Name -notlike "*fix_supplement*" }

$existingWithCadre = @{}
foreach ($f in $allPriorFiles) {
    $content = Get-Content $f.FullName -Raw
    $ms = [regex]::Matches($content, "VALUES \('(.{10,300}?)',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[^']+',\s*'[ABCD]',\s*'[^']+',\s*'(BScN|KRCHN)'")
    foreach ($m in $ms) {
        $stem = $m.Groups[1].Value.Trim() -replace "''","'" -replace '\s+',' '
        $cadre = $m.Groups[2].Value
        $key = $stem.Substring(0, [Math]::Min(80, $stem.Length)).ToLower().Trim() + "|" + $cadre
        if (-not $existingWithCadre.ContainsKey($key)) {
            $existingWithCadre[$key] = $true
        }
    }
}
Write-Host "Existing stem+cadre combos indexed: $($existingWithCadre.Count)"

# Read supplement
$suppFile = "$migDir\20260711000003_seed_mcq_set3_supplement.sql"
$allLines = Get-Content $suppFile -Encoding UTF8
$headerLines = $allLines | Where-Object { $_ -notmatch "^INSERT" }
$insertLines  = $allLines | Where-Object { $_ -match "^INSERT" }
Write-Host "Supplement INSERT lines before dedup: $($insertLines.Count)"

$kept    = [System.Collections.Generic.List[string]]::new()
$removed = [System.Collections.Generic.List[string]]::new()

foreach ($line in $insertLines) {
    $isDup = $false
    $cadreMatch = [regex]::Match($line, "'(BScN|KRCHN)',\s*'Paper")
    if ($cadreMatch.Success) {
        $cadre = $cadreMatch.Groups[1].Value
        $stemMatch = [regex]::Match($line, "VALUES \('(.{10,300}?)',\s*'")
        if ($stemMatch.Success) {
            $stem = $stemMatch.Groups[1].Value.Trim() -replace "''","'" -replace '\s+',' '
            $key = $stem.Substring(0, [Math]::Min(80, $stem.Length)).ToLower().Trim() + "|" + $cadre
            if ($existingWithCadre.ContainsKey($key)) {
                $isDup = $true
            }
        }
    }
    if ($isDup) {
        $removed.Add($line.Substring(0, [Math]::Min(120, $line.Length)))
    } else {
        $kept.Add($line)
    }
}

Write-Host "Lines removed (true duplicates): $($removed.Count)"
Write-Host "Lines kept (unique): $($kept.Count)"
Write-Host ""
Write-Host "Removed stems:"
foreach ($r in $removed) { Write-Host "  >> $($r.Substring(0,[Math]::Min(100,$r.Length)))" }

# Write cleaned file
$output = [System.Collections.Generic.List[string]]::new()
foreach ($h in $headerLines) { $output.Add($h) }
foreach ($k in $kept) { $output.Add($k) }
[System.IO.File]::WriteAllLines($suppFile, $output, [System.Text.Encoding]::UTF8)
Write-Host ""
Write-Host "Supplement file rebuilt with $($kept.Count) questions."
