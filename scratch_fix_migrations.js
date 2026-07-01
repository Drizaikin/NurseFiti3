const fs = require('fs');
const path = require('path');

const migrationsDir = 'c:/Users/rizik/Desktop/NurseFiti/NurseFiti3/supabase/migrations';
const files = fs.readdirSync(migrationsDir)
  .filter(f => f.startsWith('20260628') || f.startsWith('20260701'))
  .filter(f => f.endsWith('.sql'));

let fixCount = 0;

files.forEach(file => {
  const filePath = path.join(migrationsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix 1: ON CONFLICT
  // Many statements might end with `);` instead of `) ON CONFLICT (stem, cadre) DO NOTHING;`
  // Some might be formatted across multiple lines.
  // We can use a regex that matches `)` followed by optional whitespace and `;` at the end of the statement,
  // but we want to make sure we don't accidentally match something inside a string.
  // However, since it's the end of an INSERT statement, it usually looks like `... , NULL);` or `... ,'approved', NULL);`
  
  // A safer approach: split the file by `INSERT INTO questions`, then process each block.
  const blocks = content.split(/(?=INSERT INTO questions)/g);
  
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].startsWith('INSERT INTO questions')) {
      // Check if it already has ON CONFLICT
      if (!blocks[i].includes('ON CONFLICT') && !blocks[i].includes('DO NOTHING')) {
        // Find the last `);` and replace it
        // We can do this by finding the last occurrence of `);`
        const lastIndex = blocks[i].lastIndexOf(');');
        if (lastIndex !== -1) {
          blocks[i] = blocks[i].substring(0, lastIndex) + ') ON CONFLICT (stem, cadre) DO NOTHING;' + blocks[i].substring(lastIndex + 2);
        } else {
            // Maybe there's whitespace between ) and ;
            const lastIndexSpace = blocks[i].lastIndexOf(')');
            const semiIndex = blocks[i].lastIndexOf(';');
            if (lastIndexSpace !== -1 && semiIndex !== -1 && semiIndex > lastIndexSpace) {
                blocks[i] = blocks[i].substring(0, lastIndexSpace) + ') ON CONFLICT (stem, cadre) DO NOTHING;' + blocks[i].substring(semiIndex + 1);
            }
        }
      }

      // Fix 2: exam_year string (e.g. ,'2022', or ,'2010',)
      // We look for patterns like `,'20xx',` and replace with `,20xx,`
      blocks[i] = blocks[i].replace(/,'(20\d\d)',/g, ',$1,');
      blocks[i] = blocks[i].replace(/,'(20\d\d)'\)/g, ',$1)'); // In case it's at the end
    }
  }

  content = blocks.join('');
  
  // Fix 3: status = 'approved'
  // Some rows might literally be missing 'approved' in the VALUES list, but wait, 
  // looking at the columns, it is `status, contributor_id)`. If they just have `,NULL)` at the end 
  // but are missing the status string, they would have one less value.
  // We'll leave structural value count fixes to manual if they exist, but let's check if there are any.
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
    fixCount++;
  }
});

console.log(`Finished fixing ${fixCount} files.`);
