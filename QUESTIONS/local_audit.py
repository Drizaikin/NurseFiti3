import re
import json

with open('supabase/migrations/20260711000001_seed_mcq_compilation_set3.sql', 'r', encoding='utf-8') as f:
    lines = f.readlines()

flagged = []

for i, line in enumerate(lines):
    if not line.startswith('INSERT INTO questions'): continue
    
    # Extract fields
    match = re.search(r"VALUES \((.*)\) ON CONFLICT", line)
    if not match: continue
    
    # Crude split by `', '`
    values_str = match.group(1)
    parts = values_str.split("', '")
    if len(parts) < 13: continue
    
    stem = parts[0].strip("'")
    opt_a = parts[1]
    opt_b = parts[2]
    opt_c = parts[3]
    opt_d = parts[4]
    correct = parts[5].strip("'")
    rationale = parts[6].lower()
    
    # Check if rationale contradicts the correct option
    # E.g., if correct is A, but rationale says "option b is correct"
    contradictions = []
    letters = ['a', 'b', 'c', 'd']
    for l in letters:
        if l != correct.lower():
            if f"option {l} is correct" in rationale or f"option {l} is the correct" in rationale or f"therefore {l}" in rationale:
                contradictions.append(f"Mentions Option {l.upper()} as correct but key is {correct}")
                
    if contradictions:
        flagged.append({'line': i+1, 'stem': stem, 'correct': correct, 'rationale': rationale, 'issues': contradictions})

print(f"Found {len(flagged)} structurally contradictory questions.")
for f in flagged[:10]:
    print(f)
