const fs = require('fs');
const files = [
  'c:\\Users\\rizik\\Desktop\\NurseFiti\\NurseFiti3\\lib\\email.ts',
  'c:\\Users\\rizik\\Desktop\\NurseFiti\\NurseFiti3\\email templates\\nursefiti_email_design_system.html',
  'c:\\Users\\rizik\\Desktop\\NurseFiti\\NurseFiti3\\email templates\\nursefiti_general_email_templates.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log('File not found: ' + file);
    continue;
  }
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace base64 logo with absolute URL
  // We use ${LOGO_BASE64} in the TS file, and raw base64 string in HTML files
  // This regex matches both cases.
  content = content.replace(/<img src="data:image\/png;base64,[^"]+"/g, '<img src="https://nursefiti.co.ke/logo.png"');
  
  // Replace simple charset with the strict Content-Type meta required for emails
  content = content.replace(/<meta charset="[Uu][Tt][Ff]-8"\s*\/?>/g, '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>');
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
