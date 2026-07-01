const fs = require('fs');
const path = require('path');

const migrationsDir = 'c:/Users/rizik/Desktop/NurseFiti/NurseFiti3/supabase/migrations';
const files = fs.readdirSync(migrationsDir)
  .filter(f => f.startsWith('20260628') || f.startsWith('20260701'))
  .filter(f => f.endsWith('.sql'));

let counts = {
  'BScN': { 'Paper I': 0, 'Paper II': 0 },
  'KRCHN': { 'Paper I': 0, 'Paper II': 0 }
};

let total = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  const inserts = content.split('INSERT INTO questions');
  inserts.shift(); // remove the part before the first insert
  
  inserts.forEach(insertStr => {
    // Determine cadre
    let cadre = null;
    if (insertStr.includes("'BScN'")) cadre = 'BScN';
    else if (insertStr.includes("'KRCHN'")) cadre = 'KRCHN';
    
    // Determine paper
    let paper = null;
    if (insertStr.includes("'Paper I'")) paper = 'Paper I';
    else if (insertStr.includes("'Paper II'")) paper = 'Paper II';
    
    if (cadre && paper) {
        counts[cadre][paper]++;
        total++;
    }
  });
});

console.log(`Total questions: ${total}`);
console.log(JSON.stringify(counts, null, 2));
