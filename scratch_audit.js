const fs = require('fs');
const path = require('path');

const migrationsDir = 'c:/Users/rizik/Desktop/NurseFiti/NurseFiti3/supabase/migrations';
const files = fs.readdirSync(migrationsDir)
  .filter(f => f.startsWith('20260628') || f.startsWith('20260701'))
  .filter(f => f.endsWith('.sql'));

let hasErrors = false;

files.forEach(file => {
  const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  const lines = content.split('\n');

  // Regex to extract INSERT blocks
  const insertRegex = /INSERT INTO questions \((.*?)\)\s+VALUES\s*\(([\s\S]*?)\)(?:\s*ON CONFLICT (.*?))?;/g;
  let match;
  let insertCount = 0;

  while ((match = insertRegex.exec(content)) !== null) {
    insertCount++;
    const [fullMatch, cols, vals, conflict] = match;
    
    // Check ON CONFLICT
    if (!conflict || !conflict.includes('DO NOTHING') || !conflict.includes('(stem, cadre)')) {
      console.log(`[!] ${file}: Missing or incorrect ON CONFLICT clause in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    // Checking for unescaped quotes inside string values is tricky with regex, 
    // but we can check if it parses as valid SQL by looking for common mistakes or just doing a basic check.
    // Instead, let's just check the required fields.

    // Let's use simple string matching to check the presence of bad values
    if (fullMatch.includes("'Paper 1'") || fullMatch.includes("'Paper 2'") || fullMatch.includes("'Paper 3'")) {
      console.log(`[!] ${file}: Uses Arabic numerals for paper (e.g., 'Paper 1') in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    if (!fullMatch.includes("'Paper I'") && !fullMatch.includes("'Paper II'")) {
      console.log(`[!] ${file}: Missing valid roman numeral paper in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    if (fullMatch.includes("'Nursing'")) {
      console.log(`[!] ${file}: Uses 'Nursing' for unit in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    if (fullMatch.includes("'General'")) {
      console.log(`[!] ${file}: Uses 'General' for topic in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    if (!fullMatch.includes("'approved'")) {
      console.log(`[!] ${file}: Missing 'approved' status in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    // Check for cadre
    if (!fullMatch.includes("'BScN'") && !fullMatch.includes("'KRCHN'")) {
      console.log(`[!] ${file}: Missing valid cadre ('BScN' or 'KRCHN') in INSERT block ${insertCount}`);
      hasErrors = true;
    }

    // Check for string exam_year like '2014' or '2021'
    const stringYearRegex = /'(20\d\d)'/;
    const yearMatch = vals.match(stringYearRegex);
    if (yearMatch) {
      console.log(`[!] ${file}: Uses string for exam_year ('${yearMatch[1]}') instead of integer in INSERT block ${insertCount}`);
      hasErrors = true;
    }
  }

  if (insertCount === 0) {
    console.log(`[-] ${file}: No standard INSERT statements found. Checking for syntax or formatting issues...`);
    // Check if there are any INSERTs that didn't match the regex (possibly syntax errors)
    if (content.includes('INSERT INTO')) {
      console.log(`[!] ${file}: Has INSERT INTO but failed to parse. Check for syntax errors like unescaped quotes, missing semicolons, or multiple values in one INSERT.`);
      hasErrors = true;
    }
  }
});

if (!hasErrors) {
  console.log("Audit complete: No obvious standard violations found.");
} else {
  console.log("Audit complete: Found violations.");
}
