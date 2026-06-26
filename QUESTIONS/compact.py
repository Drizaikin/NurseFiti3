import json
import re

with open('questions_extracted.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

with open('questions_compact.txt', 'w', encoding='utf-8') as f:
    for i, q in enumerate(qs):
        f.write(f"ID:{i} | Q:{q['question_text']}\n")
        opts = ' | '.join(q['options'])
        f.write(f"OPT:{opts}\n")
        
        ans_line = q.get('answer', '').replace('\n', ' ')
        m = re.match(r'(?i)answer:\s*([A-E])\)', ans_line.strip())
        ans_letter = m.group(1).upper() if m else '?'
        
        f.write(f"ANS:{ans_letter} | {ans_line}\n")
        f.write(f"RAT:{q.get('rationale', '').replace(chr(10), ' ')}\n")
