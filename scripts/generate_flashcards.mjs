import { createClient } from '@supabase/supabase-js';

// Setup Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wnfbjyfenvdofvfcxnzk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NTgxNiwiZXhwIjoyMDk0NzcxODE2fQ.5TQOHD5G889WdbrsNzN1pIoV87Ldji2uIpF_bgFVS0M';
const supabase = createClient(supabaseUrl, supabaseKey);

async function generateFlashcards() {
  console.log('Generating new NCK-aligned flashcards...');
  
  // First find an existing deck id to attach these to
  const { data: deckRes, error: deckErr } = await supabase.from('flashcard_decks').select('id').limit(1).single();
  if (deckErr) {
    console.error('Error finding a deck:', deckErr);
    return;
  }
  const deckId = deckRes.id;
  
  const newFlashcards = [
    {
      deck_id: deckId,
      cadre: 'krchn',
      unit: "Medical-Surgical Nursing",
      front_text: "What is the primary nursing intervention for a patient exhibiting signs of Autonomic Dysreflexia?",
      back_text: "The patient is experiencing a hypertensive emergency. You must elevate the head of the bed immediately to 90 degrees to lower blood pressure, then eliminate the noxious stimulus (e.g. check for bowel/bladder distention).",
      back_highlight: "Elevate HOB immediately to 90 degrees"
    },
    {
      deck_id: deckId,
      cadre: 'krchn',
      unit: "Midwifery",
      front_text: "According to recent WHO & NCK guidelines, how soon should delayed cord clamping occur in a vigorous term neonate?",
      back_text: "It allows for placental transfusion, providing the infant with additional blood volume and iron stores for the first 6 months of life.",
      back_highlight: "Between 1 to 3 minutes after birth"
    },
    {
      deck_id: deckId,
      cadre: 'krchn',
      unit: "Pediatric Nursing",
      front_text: "What is the first-line fluid resuscitation protocol for a child in severe dehydration and shock according to the new IMCI guidelines?",
      back_text: "The goal is rapid volume expansion to restore perfusion. Ringer's Lactate is preferred, but Normal Saline is an acceptable alternative.",
      back_highlight: "20 ml/kg of Normal Saline or Ringer's Lactate given rapidly IV"
    },
    {
      deck_id: deckId,
      cadre: 'krchn',
      unit: "Community Health Nursing",
      front_text: "What is the primary focus of the 'Baby-Friendly Hospital Initiative' (BFHI) step 4?",
      back_text: "Skin-to-skin contact regulates the baby's temperature, heart rate, and breathing, and it facilitates the initiation of early breastfeeding within the first golden hour.",
      back_highlight: "Initiate immediate and uninterrupted skin-to-skin contact"
    },
    {
      deck_id: deckId,
      cadre: 'krchn',
      unit: "Clinical Pharmacology",
      front_text: "What is the antidote for Magnesium Sulfate toxicity, frequently used in pre-eclampsia management?",
      back_text: "Calcium Gluconate antagonizes the effects of magnesium at the neuromuscular junction. It should be kept readily available whenever Magnesium Sulfate is being administered.",
      back_highlight: "Calcium Gluconate 10% IV"
    }
  ];

  console.log(`Inserting ${newFlashcards.length} new flashcards into deck ${deckId}...`);
  
  const { data, error } = await supabase.from('flashcards').insert(newFlashcards).select();
  
  if (error) {
    console.error('Failed to insert new flashcards:', error);
  } else {
    console.log(`Successfully generated and inserted ${data.length} flashcards!`);
    console.log('Sample generation preview:');
    data.forEach(card => {
      console.log(`- [${card.unit}] Q: ${card.front_text.substring(0,40)}...`);
    });
  }
}

generateFlashcards();
