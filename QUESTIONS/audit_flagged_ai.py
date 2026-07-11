import os
import json
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import time
from dotenv import load_dotenv

load_dotenv('../.env.local')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

SYSTEM_PROMPT = """
You are an expert Kenyan Nursing Council (NCK) Examiner and Auditor.
Your job is to strictly evaluate multiple-choice questions for the NCK licensure examination.
Guidelines:
1. NCK exams test KRCHN and BScN standards.
2. Many NCK questions have multiple defensible answers. This is normal. Your job is NOT to reject them, but to ensure the KEYED ANSWER is the MOST ACCURATE and the RATIONALE perfectly explains why it is the best choice per NCK/MOH Kenya guidelines.
3. If the rationale contradicts the keyed answer, or the keyed answer is wrong, fix it.
4. If the question is completely fundamentally broken, flag it as TO_BE_DELETED.

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
                return None
            data = resp.json()
            text_res = data['candidates'][0]['content']['parts'][0]['text']
            text_res = text_res.strip()
            if text_res.startswith('```json'): text_res = text_res[7:]
            elif text_res.startswith('```'): text_res = text_res[3:]
            if text_res.endswith('```'): text_res = text_res[:-3]
            return json.loads(text_res.strip())
        except Exception as e:
            time.sleep(2 ** attempt)
    return None

import re
def main():
    print("Loading audit_report_set3.md...")
    try:
        with open('audit_report_set3.md', 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print("Error loading file.")
        return

    flagged = []
    parts = content.split('### Flagged Question ')
    for part in parts[1:]:
        q = {}
        stem_match = re.search(r'\*\*Question:\*\* (.*?)\n- A\.', part, re.DOTALL)
        if stem_match: q['stem'] = stem_match.group(1).strip()
        
        opts = []
        for letter in ['A', 'B', 'C', 'D']:
            opt_match = re.search(fr'- {letter}\. (.*?)\n', part)
            if opt_match: opts.append(opt_match.group(1).strip())
        q['options'] = opts
        
        ans_match = re.search(r'\*\*Keyed Answer:\*\* (.*?)\n', part)
        if ans_match: q['correct_option'] = ans_match.group(1).strip()
        
        rat_match = re.search(r'\*\*Rationale:\*\* (.*?)(?:\ns|\n---|$)', part, re.DOTALL)
        if rat_match: q['rationale'] = rat_match.group(1).strip()
        
        cadre_match = re.search(r'\*\*Cadre:\*\* (.*?)\s+\|', part)
        q['cadre'] = cadre_match.group(1).strip() if cadre_match else 'Unknown'
        
        if 'stem' in q:
            flagged.append(q)
            
    print(f"Found {len(flagged)} flagged questions.")
    
    ai_responses = [None] * len(flagged)
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_idx = {}
        for idx, q in enumerate(flagged):
            future_to_idx[executor.submit(call_gemini, q)] = idx
            
        print("Processing flagged questions through AI...")
        for future in as_completed(future_to_idx):
            idx = future_to_idx[future]
            ai_responses[idx] = future.result()
            
    report_lines = ["# AI Audit Report - Flagged Questions\n"]
    updates = 0
    deletes = 0
    
    for i, ai_res in enumerate(ai_responses):
        if not ai_res:
            continue
        q = flagged[i]
        action = ai_res.get('action')
        if action == 'UPDATE' or action == 'KEEP':
            # We just want to output the correct ones to a new clean file maybe, but for now just the report.
            updates += 1
            report_lines.append(f"### 🔄 RESOLVED/UPDATED: {q['stem'][:100]}...")
            report_lines.append(f"**Reason**: {ai_res.get('reason')}")
            report_lines.append(f"**Old Key**: {q['correct_option']} -> **New Key**: {ai_res.get('corrected_option', q['correct_option'])}")
        elif action == 'TO_BE_DELETED':
            deletes += 1
            report_lines.append(f"### ❌ TO BE DELETED: {q['stem'][:100]}...")
            report_lines.append(f"**Reason**: {ai_res.get('reason')}\n")

    with open('ai_audit_flagged_results.md', 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))
        
    print(f"Done flagged. Updates: {updates}, Deletes: {deletes}")

if __name__ == '__main__':
    main()
