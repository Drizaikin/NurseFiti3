const fs = require('fs');

const files = [
  'c:\\Users\\rizik\\Desktop\\NurseFiti\\NurseFiti3\\lib\\email.ts',
  'c:\\Users\\rizik\\Desktop\\NurseFiti\\NurseFiti3\\email templates\\nursefiti_email_design_system.html',
  'c:\\Users\\rizik\\Desktop\\NurseFiti\\NurseFiti3\\email templates\\nursefiti_general_email_templates.html'
];

const replacements = [
  { bad: /ðŸŽ‰/g, good: '🎉' },
  { bad: /â€”/g, good: '—' },
  { bad: /â °/g, good: '⏰' },
  { bad: /âœ…/g, good: '✅' },
  { bad: /â”€/g, good: '─' },
  { bad: /â€™/g, good: '’' },
  { bad: /âldquo;/g, good: '“' },
  { bad: /ârdquo;/g, good: '”' },
  { bad: /â€˜/g, good: '‘' }
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const {bad, good} of replacements) {
    if (bad.test(content)) {
      content = content.replace(bad, good);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed mojibake in ' + file);
  }
}
