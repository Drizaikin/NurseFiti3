import os
import sys
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv
from supabase import create_client
import google.generativeai as genai

# Load env
load_dotenv('../.env.local')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash', system_instruction="""
You are an expert Kenyan Nursing Council (NCK) Examiner and Auditor.
Your job is to strictly evaluate multiple-choice questions for the NCK licensure examination.
Guidelines:
1. NCK exams test KRCHN (safe bedside nursing, procedural, recall/application) and BScN (leadership, clinical reasoning, independent judgment, systems thinking).
2. Many NCK questions have multiple defensible answers. This is normal. Your job is NOT to reject them, but to ensure the KEYED ANSWER is the MOST ACCURATE and the RATIONALE perfectly explains why it is the best choice per NCK/MOH Kenya guidelines.
3. If the rationale contradicts the keyed answer, or the keyed answer is wrong, fix it.
4. If the question is completely fundamentally broken (e.g., asking for an Apgar score of 0/1 but giving all 'score 1' options), flag it as TO_BE_DELETED.

Respond strictly in JSON:
{
  "action": "KEEP" | "UPDATE" | "TO_BE_DELETED",
  "reason": "Your analysis of the question.",
  "corrected_option": "A" | "B" | "C" | "D" | null,
  "corrected_rationale": "New rationale if UPDATE, else null."
}
""")

def call_gemini(question_data):
    for attempt in range(5):
        try:
            response = model.generate_content(
                json.dumps(question_data, indent=2),
                generation_config=genai.types.GenerationConfig(
                    temperature=0.1,
                    response_mime_type="application/json"
                )
            )
            text_res = response.text.strip()
            if text_res.startswith('```json'): text_res = text_res[7:]
            elif text_res.startswith('```'): text_res = text_res[3:]
            if text_res.endswith('```'): text_res = text_res[:-3]
            return json.loads(text_res.strip())
        except Exception as e:
            time.sleep(2 ** attempt)
            print(f"Retry {attempt+1} due to error: {e}")
    return None

def main():
    BATCH_SIZE = 50
    PROGRESS_FILE = 'audit_progress.json'
    
    audited_ids = []
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            audited_ids = json.load(f)
            
    print(f"Already audited {len(audited_ids)} questions.")

    print("Fetching seeded questions from Supabase...")
    offset = 0
    limit = 1000
    seeded = []
    while True:
        res = supabase.table('questions').select('*').gte('created_at', '2026-07-11T00:00:00Z').range(offset, offset + limit - 1).execute()
        if not res.data:
            break
        seeded.extend(res.data)
        offset += limit
    print(f"Found {len(seeded)} seeded questions.")

    unaudited = [q for q in seeded if q['id'] not in audited_ids]
    
    if not unaudited:
        print("All questions have been audited!")
        return
        
    sample = unaudited[:BATCH_SIZE]
    print(f"Taking a batch of {len(sample)} questions...")
    
    ai_responses = [None] * len(sample)
    
    # Process sequentially to avoid rate limiting issues since we failed earlier with threads
    print(f"Processing {len(sample)} questions through AI sequentially...")
    for idx, q in enumerate(sample):
        print(f"Processing {idx+1}/{len(sample)}: {q['id']}")
        q_data = {
            "stem": q['stem'],
            "options": [q['option_a'], q['option_b'], q['option_c'], q['option_d']],
            "correct_option": q['correct_option'],
            "rationale": q['rationale'],
            "cadre": q['cadre']
        }
        ai_responses[idx] = call_gemini(q_data)
        time.sleep(1) # Add a small delay between requests to help with rate limits
        
    # Process results
    updates = 0
    deletes = 0
    keeps = 0
    
    batch_num = (len(audited_ids) // BATCH_SIZE) + 1
    report_file = f'ai_audit_results_batch_{batch_num}.md'
    
    report_lines = [f"# AI Audit Report - Batch {batch_num}\n"]
    report_lines.append(f"Evaluated {len(sample)} questions.\n")
    
    new_audited_ids = []
    
    for i, ai_res in enumerate(ai_responses):
        q = sample[i]
        
        if not ai_res:
            print(f"Failed to get AI response for question {q['id']}")
            continue
            
        new_audited_ids.append(q['id'])
        action = ai_res.get('action')
        
        if action == 'KEEP':
            keeps += 1
        elif action == 'UPDATE':
            updates += 1
            # Update supabase
            try:
                supabase.table('questions').update({
                    'correct_option': ai_res.get('corrected_option', q['correct_option']),
                    'rationale': ai_res.get('corrected_rationale', q['rationale'])
                }).eq('id', q['id']).execute()
                
                report_lines.append(f"### 🔄 UPDATED: {q['stem'][:100]}...")
                report_lines.append(f"**Reason**: {ai_res.get('reason')}")
                report_lines.append(f"**Old Key**: {q['correct_option']} -> **New Key**: {ai_res.get('corrected_option')}")
                report_lines.append(f"**Old Rationale**: {q['rationale']}")
                report_lines.append(f"**New Rationale**: {ai_res.get('corrected_rationale')}\n")
            except Exception as e:
                print(f"Error updating {q['id']}: {e}")
                
        elif action == 'TO_BE_DELETED':
            deletes += 1
            report_lines.append(f"### ❌ TO BE DELETED: {q['stem'][:100]}...")
            report_lines.append(f"**Reason**: {ai_res.get('reason')}\n")
            
    print(f"Done! Kept: {keeps}, Updated: {updates}, Flagged for Delete: {deletes}")
    
    # Save progress
    audited_ids.extend(new_audited_ids)
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(audited_ids, f)
        
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))
        
    print(f"Report saved to {report_file}")

if __name__ == '__main__':
    main()
