import json
import re

with open('questions_extracted.json', 'r', encoding='utf-8') as f:
    qs = json.load(f)

for i, q in enumerate(qs):
    ans_line = q.get('answer', '')
    rat_line = q.get('rationale', '')
    
    m = re.match(r'(?i)answer:\s*([A-E])\)', ans_line.strip())
    ans_letter = m.group(1).upper() if m else None
    
    if not ans_letter:
        # Some might be "Answer: A. "
        m2 = re.match(r'(?i)answer:\s*([A-E])\.', ans_line.strip())
        if m2:
            ans_letter = m2.group(1).upper()
    
    if not ans_letter:
        print(f"\n--- Cannot parse answer letter for Q{i} ---\nAnswer Line: {ans_line}")
        continue
        
    # Look for obvious mismatches
    rat_lower = rat_line.lower()
    
    mismatches = []
    
    # Check if another option is called correct
    for l in ['a', 'b', 'c', 'd']:
        if l == ans_letter.lower(): continue
        # patterns like "option b is correct" or "is b"
        if re.search(r'\b(option|choice)\s+' + l + r'\s+(is|would be) (the )?correct', rat_lower):
            mismatches.append(f"Rationale says Option {l.upper()} is correct")
        elif re.search(rf'therefore, {l}\) is', rat_lower):
            mismatches.append(f"Rationale concludes with {l.upper()}")
            
    # Check if rationale explicitly says the chosen answer is wrong
    if re.search(r'\b(option|choice)\s+' + ans_letter.lower() + r'\s+(is incorrect|is wrong)', rat_lower):
        mismatches.append(f"Rationale says chosen option {ans_letter.upper()} is incorrect")
        
    if mismatches:
        print(f"\n--- POTENTIAL MISMATCH IN Q{i} ---")
        print(f"Question: {q['question_text']}")
        print(f"Answer: {ans_line}")
        print(f"Rationale: {rat_line}")
        print(f"Flags: {', '.join(mismatches)}")

