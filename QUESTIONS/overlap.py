import json
import re
from collections import Counter

def get_words(text):
    return set(re.findall(r'\b[a-zA-Z]{4,}\b', text.lower()))

with open('questions_extracted.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

mismatches = []

for i, q in enumerate(qs):
    ans_line = q.get('answer', '')
    rat_line = q.get('rationale', '')
    opts = q.get('options', [])
    
    m = re.match(r'(?i)answer:\s*([A-E])\)', ans_line.strip())
    if not m:
        m = re.match(r'(?i)answer:\s*([A-E])\.', ans_line.strip())
    ans_letter = m.group(1).upper() if m else None
    
    if not ans_letter or not opts:
        continue
        
    rat_words = get_words(rat_line)
    
    # Check overlap with each option
    overlaps = []
    for opt in opts:
        opt_m = re.match(r'(?i)^([A-E])[\.\)]\s*(.*)', opt.strip())
        if opt_m:
            letter = opt_m.group(1).upper()
            text = opt_m.group(2)
            opt_words = get_words(text)
            overlap = len(rat_words.intersection(opt_words))
            overlaps.append((letter, overlap, text))
            
    if not overlaps:
        continue
        
    overlaps.sort(key=lambda x: x[1], reverse=True)
    best_match_letter, best_match_score, best_match_text = overlaps[0]
    
    # Also find the score of the indicated answer
    ans_score = 0
    ans_text = ""
    for l, score, txt in overlaps:
        if l == ans_letter:
            ans_score = score
            ans_text = txt
            break
            
    # If another option has a much higher overlap, flag it
    if best_match_letter != ans_letter and best_match_score > ans_score + 1 and best_match_score >= 2:
        mismatches.append({
            'id': i,
            'question': q['question_text'],
            'indicated_answer': ans_letter,
            'indicated_text': ans_text,
            'best_match_letter': best_match_letter,
            'best_match_score': best_match_score,
            'indicated_score': ans_score,
            'rationale': rat_line
        })

with open('overlap_mismatches.json', 'w', encoding='utf-8') as f:
    json.dump(mismatches, f, indent=2)

print(f"Found {len(mismatches)} potential mismatches based on word overlap.")
