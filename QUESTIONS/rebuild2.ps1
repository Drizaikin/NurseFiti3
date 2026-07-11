param()
$migDir    = "c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations"
$docxText  = [System.IO.File]::ReadAllText("c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\QUESTIONS\set3_extracted.txt", [System.Text.Encoding]::UTF8)
$set3SQL   = [System.IO.File]::ReadAllText("$migDir\20260711000001_seed_mcq_compilation_set3.sql")

$em = [char]0x2014
$bscnP1  = $docxText.IndexOf("BScN " + $em + " Paper I")
$bscnP2  = $docxText.IndexOf("BScN " + $em + " Paper II")
$krchnP1 = $docxText.IndexOf("KRCHN " + $em + " Paper I")
$krchnP2 = $docxText.IndexOf("KRCHN " + $em + " Paper II")
$endPos  = $docxText.Length
Write-Host "Section positions: BScN-P1=$bscnP1 BScN-P2=$bscnP2 KRCHN-P1=$krchnP1 KRCHN-P2=$krchnP2"

$sections = @(
    [PSCustomObject]@{cadre="BScN";  paper="Paper I";  text=$docxText.Substring($bscnP1,  $bscnP2-$bscnP1)},
    [PSCustomObject]@{cadre="BScN";  paper="Paper II"; text=$docxText.Substring($bscnP2,  $krchnP1-$bscnP2)},
    [PSCustomObject]@{cadre="KRCHN"; paper="Paper I";  text=$docxText.Substring($krchnP1, $krchnP2-$krchnP1)},
    [PSCustomObject]@{cadre="KRCHN"; paper="Paper II"; text=$docxText.Substring($krchnP2, $endPos-$krchnP2)}
)

# Build existing stem+cadre index from ALL prior migrations
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
Write-Host "Existing stem+cadre index: $($existingWithCadre.Count)"