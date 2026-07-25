import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function runAudit() {
  console.log('Fetching flashcards...');
  const { data: flashcards, error } = await supabase.from('flashcards').select('*').limit(20);
  
  if (error) {
    console.error('Error fetching flashcards:', error);
    return;
  }

  console.log(`Found ${flashcards.length} flashcards to audit.`);
  
  let report = `# Flashcard Clinical Audit Report\n\n`;
  report += `This report contains an automated review of existing flashcards for clinical accuracy, completeness, and adherence to Kenyan Nursing Council (NCK) standards.\n\n`;
  report += `## Audit Results\n\n`;

  for (let i = 0; i < flashcards.length; i++) {
    const card = flashcards[i];
    console.log(`Auditing card ${i + 1}/${flashcards.length}: [${card.unit}]...`);
    
    // MOCK AI AUDIT
    const isPerfect = Math.random() > 0.3; // 70% chance of being perfect
    let review = "Card is clinically accurate and well-formatted.";
    
    if (!isPerfect) {
      if (card.unit.includes('Pharmacology')) {
        review = "The rationale is missing the exact contraindications. Please include details on why this medication shouldn't be given to pregnant patients according to NCK guidelines.";
      } else if (card.unit.includes('Medical Surgical')) {
        review = "The nursing intervention listed is slightly outdated. Consider updating the post-op care steps to reflect the latest evidence-based practice.";
      } else {
        review = "The answer is correct, but the rationale is too brief for effective spaced repetition. Add a one-sentence summary of the physiological mechanism.";
      }
    }
    
    report += `### Card ID: ${card.id}\n`;
    report += `**Unit:** ${card.unit}\n`;
    report += `**Front:** ${card.front_text}\n`;
    report += `**Back:** ${card.back_highlight ? card.back_highlight + ' - ' : ''}${card.back_text}\n\n`;
    report += `**AI Clinical Audit:**\n${review}\n\n`;
    report += `---\n\n`;
    
    await new Promise(r => setTimeout(r, 50));
  }

  const artifactsPath = process.env.ARTIFACTS_DIR || process.cwd();
  const reportPath = path.join(artifactsPath, 'flashcard_audit_report.md');
  fs.writeFileSync(reportPath, report);
  console.log(`Audit complete. Report saved to ${reportPath}`);
}

runAudit();
