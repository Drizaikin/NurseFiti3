import { createClient } from '@supabase/supabase-js';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateFlashcards() {
  const updates = [
    {
      id: '2cf0275e-416c-48c0-9434-069eed72351c',
      back_text: 'Yellow-green visual disturbances (xanthopsia), bradycardia, nausea/vomiting, arrhythmias. Therapeutic range: 0.5–2.0 ng/mL. Note on Pregnancy: While Digoxin crosses the placenta, it is generally considered safe (Category C) but should only be used if maternal benefit strictly outweighs fetal risk per NCK guidelines.'
    },
    {
      id: 'cb8020eb-b805-45a2-b362-c6bb17bc619a',
      back_text: 'Amoxicillin and other penicillins are contraindicated due to cross-hypersensitivity. Use erythromycin or azithromycin as alternatives. 10% cross-reactivity with cephalosporins — use with caution. Note on Pregnancy: Amoxicillin is Category B and generally safe, but must be strictly avoided if any hypersensitivity history exists to prevent maternal anaphylaxis.'
    },
    {
      id: 'fa0e6a11-cd87-4157-b23a-1e95d55a6d1b',
      back_text: 'R – Rifampicin: red/orange urine, hepatotoxicity. I – Isoniazid: peripheral neuropathy (give pyridoxine). P – Pyrazinamide: hyperuricaemia, hepatotoxicity. E – Ethambutol: optic neuritis (check visual acuity). Pregnancy Contraindication: Streptomycin (an aminoglycoside sometimes used in TB) is strictly contraindicated in pregnancy due to irreversible fetal ototoxicity and nephrotoxicity.'
    }
  ];

  for (const update of updates) {
    const { error } = await supabase
      .from('flashcards')
      .update({ back_text: update.back_text })
      .eq('id', update.id);
      
    if (error) {
      console.error(`Error updating card ${update.id}:`, error);
    } else {
      console.log(`Successfully updated card ${update.id}`);
    }
  }
}

updateFlashcards();
