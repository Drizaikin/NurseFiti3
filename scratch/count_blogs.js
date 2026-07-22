const fs = require('fs');
const content = fs.readFileSync('app/blog/[slug]/page.tsx', 'utf-8');
const regex = /slug:\s*['"]([^'"]+)['"]/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
}
console.log('Total slugs in page.tsx: ' + count);
