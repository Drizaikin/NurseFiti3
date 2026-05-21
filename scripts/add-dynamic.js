const fs = require('fs');
const path = require('path');

const pages = [
  'app/(student)/dashboard/page.tsx',
  'app/(student)/practice/page.tsx',
  'app/(student)/onboarding/page.tsx',
  'app/(student)/settings/page.tsx',
  'app/(student)/mock-exam/page.tsx',
  'app/(student)/flashcards/page.tsx',
  'app/(student)/analytics/page.tsx',
  'app/(student)/achievements/page.tsx',
  'app/(student)/groups/page.tsx',
  'app/(student)/revision-plan/page.tsx',
  'app/(student)/tutors/page.tsx',
  'app/(student)/bookings/page.tsx',
  'app/(auth)/login/page.tsx',
  'app/(auth)/signup/page.tsx',
  'app/(auth)/signup-tutor/page.tsx',
];

const marker = "export const dynamic = 'force-dynamic';";

for (const rel of pages) {
  const full = path.join(__dirname, '..', rel);
  if (!fs.existsSync(full)) { console.log('SKIP (not found):', rel); continue; }
  let content = fs.readFileSync(full, 'utf8');
  if (content.includes(marker)) { console.log('ALREADY HAS:', rel); continue; }
  // Insert after the first "use client"; line
  content = content.replace(/^"use client";\n/, `"use client";\n\n${marker}\n`);
  fs.writeFileSync(full, content, 'utf8');
  console.log('PATCHED:', rel);
}
console.log('Done.');
