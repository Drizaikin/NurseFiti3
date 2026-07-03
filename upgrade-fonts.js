const fs = require('fs');
let code = fs.readFileSync('lib/email.ts', 'utf8');

// Replace all Arial with Nunito first
code = code.replace(/font-family:Arial,Helvetica,sans-serif;/g, "font-family:'Nunito',sans-serif;");

// Promote specific weights/sizes to Syne (headers, labels, tags)
code = code.replace(/font-family:'Nunito',sans-serif;(font-size:(?:10|11|13|20|24|28|13\.5)px;font-weight:(?:700|800))/g, "font-family:'Syne',sans-serif;$1");

fs.writeFileSync('lib/email.ts', code);
console.log('Typography upgraded successfully!');
