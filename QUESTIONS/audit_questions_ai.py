import os
import sys
import json
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
from dotenv import load_dotenv
from supabase import create_client

# Load env
load_dotenv('../.env.local')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Prepare prompt
SYSTEM_PROMPT = """
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
"""

def call_gemini(question_data):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={GEMINI_API_KEY}"
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": SYSTEM_PROMPT},
                    {"text": json.dumps(question_data, indent=2)}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.1
        }
    }
    for attempt in range(5):
        try:
            resp = requests.post(url, json=payload)
            if resp.status_code == 429:
                time.sleep(2 ** attempt)
                continue
            if resp.status_code != 200:
                print(f"API Error {resp.status_code}: {resp.text}")
                return None
            data = resp.json()
            text_res = data['candidates'][0]['content']['parts'][0]['text']
            # Clean markdown code blocks
            text_res = text_res.strip()
            if text_res.startswith('```json'): text_res = text_res[7:]
            elif text_res.startswith('```'): text_res = text_res[3:]
            if text_res.endswith('```'): text_res = text_res[:-3]
            return json.loads(text_res.strip())
        except Exception as e:
            time.sleep(2 ** attempt)
    return None

def main():
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

    sample = seeded
    
    ai_responses = [None] * len(sample)
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_idx = {}
        for idx, q in enumerate(sample):
            q_data = {
                "stem": q['stem'],
                "options": [q['option_a'], q['option_b'], q['option_c'], q['option_d']],
                "correct_option": q['correct_option'],
                "rationale": q['rationale'],
                "cadre": q['cadre']
            }
            future_to_idx[executor.submit(call_gemini, q_data)] = idx
            
        print(f"Processing {len(sample)} questions through AI...")
        for future in as_completed(future_to_idx):
            idx = future_to_idx[future]
            ai_responses[idx] = future.result()
        
    # Process results
    updates = 0
    deletes = 0
    keeps = 0
    
    report_lines = ["# AI Audit Report\n"]
    report_lines.append(f"Evaluated {len(sample)} questions.\n")
    
    for i, ai_res in enumerate(ai_responses):
        if not ai_res:
            continue
            
        q = sample[i]
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
            # NOT actually deleting as per user request to highlight first.
            
    print(f"Done! Kept: {keeps}, Updated: {updates}, Flagged for Delete: {deletes}")
    
    with open('ai_audit_results_final.md', 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))

if __name__ == '__main__':
    main()
