import json
import re

with open("all_db_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

mismatches = []
for q in questions:
    rationale = q.get('rationale') or ''
    correct_letter = q.get('correct_option', '').upper()
    
    # Check if rationale explicitly names a correct option that contradicts correct_letter
    # e.g., "Option A is correct", "A is the correct answer", "Therefore, B"
    match = re.search(r'\b(Option|Answer)?\s*([A-D])\s+is\s+(the\s+)?(correct|true)\b', rationale, re.IGNORECASE)
    if match:
        implied_letter = match.group(2).upper()
        if implied_letter != correct_letter:
            mismatches.append({
                'id': q['id'],
                'stem': q['stem'],
                'db_correct_option': correct_letter,
                'rationale_implied_option': implied_letter,
                'rationale': rationale
            })
            continue

    match2 = re.search(r'\bTherefore,\s*(option\s*)?([A-D])\b', rationale, re.IGNORECASE)
    if match2:
        implied_letter = match2.group(2).upper()
        if implied_letter != correct_letter:
            mismatches.append({
                'id': q['id'],
                'stem': q['stem'],
                'db_correct_option': correct_letter,
                'rationale_implied_option': implied_letter,
                'rationale': rationale
            })
            continue
            
print(f"Found {len(mismatches)} semantic contradictions.")
for m in mismatches:
    print(f"ID: {m['id']}")
    print(f"Stem: {m['stem']}")
    print(f"DB says: {m['db_correct_option']}, Rationale says: {m['rationale_implied_option']}")
    print(f"Rationale: {m['rationale']}")
    print("-" * 50)
