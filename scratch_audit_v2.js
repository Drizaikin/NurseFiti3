const fs = require('fs');
const path = require('path');

const migrationsDir = 'c:/Users/rizik/Desktop/NurseFiti/NurseFiti3/supabase/migrations';
const files = fs.readdirSync(migrationsDir)
  .filter(f => f.startsWith('20260628') || f.startsWith('20260701'))
  .filter(f => f.endsWith('.sql'));

let hasErrors = false;
let report = "# Migration Audit Report\n\n";

files.forEach(file => {
  const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  const inserts = content.split('INSERT INTO questions');
  inserts.shift(); // remove the part before the first insert

  let fileErrors = [];
  
  inserts.forEach((insertStr, index) => {
    const blockNum = index + 1;
    const block = insertStr.trim();
    
    // Check ON CONFLICT
    if (!block.includes('ON CONFLICT (stem, cadre) DO NOTHING')) {
      fileErrors.push(`Block ${blockNum}: Missing or incorrect 'ON CONFLICT (stem, cadre) DO NOTHING'`);
    }

    if (block.includes("'Paper 1'") || block.includes("'Paper 2'") || block.includes("'Paper 3'")) {
      fileErrors.push(`Block ${blockNum}: Uses Arabic numerals for paper (e.g., 'Paper 1')`);
    }

    if (!block.includes("'Paper I'") && !block.includes("'Paper II'")) {
      fileErrors.push(`Block ${blockNum}: Missing valid roman numeral paper`);
    }

    if (block.includes("'Nursing'")) {
      fileErrors.push(`Block ${blockNum}: Uses 'Nursing' for unit`);
    }

    if (block.includes("'General'")) {
      fileErrors.push(`Block ${blockNum}: Uses 'General' for topic`);
    }

    if (!block.includes("'approved'")) {
      fileErrors.push(`Block ${blockNum}: Missing 'approved' status`);
    }

    if (!block.includes("'BScN'") && !block.includes("'KRCHN'")) {
      fileErrors.push(`Block ${blockNum}: Missing valid cadre ('BScN' or 'KRCHN')`);
    }

    // Checking for string exam_year like '2014' or '2021'
    const stringYearRegex = /'(20\d\d)'/;
    if (stringYearRegex.test(block)) {
      fileErrors.push(`Block ${blockNum}: Uses string for exam_year instead of integer`);
    }
  });

  if (fileErrors.length > 0) {
    hasErrors = true;
    report += `## ${file}\n`;
    fileErrors.forEach(err => report += `- ${err}\n`);
    report += '\n';
  }
});

if (!hasErrors) {
  report += "Audit complete: No standard violations found.\n";
}

fs.writeFileSync('c:/Users/rizik/Desktop/NurseFiti/NurseFiti3/scratch_audit_report.md', report);
console.log("Report generated at scratch_audit_report.md");
