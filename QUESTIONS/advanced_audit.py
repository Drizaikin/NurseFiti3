import json
import re

with open("all_db_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

def get_words(text):
    if not text: return set()
    # exclude common stop words to improve heuristic
    stopwords = {"the", "and", "a", "to", "of", "in", "is", "that", "for", "on", "with", "as", "by", "are", "this", "it", "be", "or"}
    words = set(re.findall(r'\b[a-zA-Z]{3,}\b', text.lower()))
    return words - stopwords

suspicious = []

for q in questions:
    rationale = q.get('rationale') or ''
    correct_letter = q.get('correct_option', '').upper()
    
    if not correct_letter or not rationale:
        continue
        
    opts = {
        'A': q.get('option_a', ''),
        'B': q.get('option_b', ''),
        'C': q.get('option_c', ''),
        'D': q.get('option_d', '')
    }
    
    correct_text = opts.get(correct_letter, '')
    rat_words = get_words(rationale)
    
    # Check 1: Rationale explicitly says the correct option is wrong
    wrong_pattern = rf"\b(option\s*)?{correct_letter}\s+is\s+(incorrect|wrong|false)\b"
    if re.search(wrong_pattern, rationale, re.IGNORECASE):
        suspicious.append({
            'id': q['id'],
            'stem': q['stem'],
            'reason': f"Rationale explicitly states {correct_letter} is incorrect",
            'db_correct': f"{correct_letter}: {correct_text}",
            'rationale': rationale
        })
        continue
        
    # Check 2: Rationale explicitly says another option is correct
    other_letters = [l for l in ['A', 'B', 'C', 'D'] if l != correct_letter]
    found_other_correct = False
    for ol in other_letters:
        correct_pattern = rf"\b(option\s*)?{ol}\s+is\s+(correct|true|the right answer)\b"
        if re.search(correct_pattern, rationale, re.IGNORECASE):
            suspicious.append({
                'id': q['id'],
                'stem': q['stem'],
                'reason': f"Rationale explicitly states {ol} is correct (but DB says {correct_letter})",
                'db_correct': f"{correct_letter}: {correct_text}",
                'rationale': rationale
            })
            found_other_correct = True
            break
            
    if found_other_correct:
        continue
        
    # Check 3: Overlap heuristics
    overlaps = {}
    for letter, text in opts.items():
        if text:
            overlaps[letter] = len(rat_words.intersection(get_words(text)))
            
    if overlaps.get(correct_letter, 0) == 0:
        best_other = max([overlaps[l] for l in other_letters if l in overlaps], default=0)
        if best_other >= 3:
            best_letter = [l for l in other_letters if overlaps.get(l) == best_other][0]
            suspicious.append({
                'id': q['id'],
                'stem': q['stem'],
                'reason': f"0 overlap with correct answer {correct_letter}, but {best_other} overlap with {best_letter}",
                'db_correct': f"{correct_letter}: {correct_text}",
                'rationale': rationale
            })

print(f"Found {len(suspicious)} suspicious questions.")
with open("suspicious_report.json", "w", encoding="utf-8") as f:
    json.dump(suspicious, f, indent=2)
