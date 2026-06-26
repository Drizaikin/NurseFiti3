import json
import re

with open("all_db_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

suspicious = []

for q in questions:
    rationale = q.get('rationale') or ''
    correct_letter = q.get('correct_option', '').upper()
    
    if not correct_letter or not rationale:
        continue
        
    other_letters = [l for l in ['A', 'B', 'C', 'D'] if l != correct_letter]
    found_suspicious = False
    
    for ol in other_letters:
        # Check if rationale explicitly claims another option is the answer
        patterns = [
            rf"\bOption\s*{ol}\s*is\s*correct\b",
            rf"\bOption\s*{ol}\s*is\s*true\b",
            rf"\b{ol}\s*is\s*the\s*correct\b",
            rf"\b{ol}\s*is\s*the\s*answer\b",
            rf"\bTherefore,\s*{ol}\b",
            rf"\bThe\s*correct\s*option\s*is\s*{ol}\b",
            rf"\bThe\s*correct\s*answer\s*is\s*{ol}\b"
        ]
        
        for p in patterns:
            if re.search(p, rationale, re.IGNORECASE):
                suspicious.append({
                    'id': q['id'],
                    'stem': q['stem'],
                    'db_correct': correct_letter,
                    'rationale_match': p,
                    'rationale': rationale
                })
                found_suspicious = True
                break
                
        if found_suspicious:
            break

print(f"Found {len(suspicious)} suspicious questions via regex.")
with open("regex_suspicious.json", "w", encoding="utf-8") as f:
    json.dump(suspicious, f, indent=2)

