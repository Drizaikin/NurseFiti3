import urllib.request
import urllib.error
import json
import re

SUPABASE_URL = "https://wnfbjyfenvdofvfcxnzk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTU4MTYsImV4cCI6MjA5NDc3MTgxNn0.5D2bdWYi2KJ_nb1b44r28WaGZtCrbfT2yYL4bScZbr8"

all_questions = []
limit = 1000
offset = 0

print("Fetching all questions from Supabase...")
while True:
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Range-Unit": "items",
        "Range": f"{offset}-{offset+limit-1}"
    }

    url = f"{SUPABASE_URL}/rest/v1/questions?select=id,stem,option_a,option_b,option_c,option_d,correct_option,rationale"
    req = urllib.request.Request(url, headers=headers)

    try:
        with urllib.request.urlopen(req) as response:
            if response.status != 200:
                print("Error fetching questions:", response.read().decode())
                exit(1)
            data = json.loads(response.read().decode())
            all_questions.extend(data)
            if len(data) < limit:
                break
            offset += limit
    except urllib.error.URLError as e:
        print("Error fetching questions:", e.reason)
        exit(1)

print(f"Total fetched: {len(all_questions)} questions.")

with open("all_db_questions.json", "w", encoding="utf-8") as f:
    json.dump(all_questions, f, indent=2)

def get_words(text):
    if not text: return set()
    return set(re.findall(r'\b[a-zA-Z]{4,}\b', text.lower()))

mismatches = []
for q in all_questions:
    rationale = q.get('rationale') or ''
    rat_words = get_words(rationale)
    
    opts = [
        ('A', q.get('option_a', '')),
        ('B', q.get('option_b', '')),
        ('C', q.get('option_c', '')),
        ('D', q.get('option_d', ''))
    ]
    correct_letter = q.get('correct_option', '').upper()
    
    if not correct_letter or not rationale:
        continue
        
    overlaps = []
    for letter, text in opts:
        if not text: continue
        opt_words = get_words(text)
        # Avoid counting words that are in the rationale only to refute an option
        overlap = len(rat_words.intersection(opt_words))
        overlaps.append({
            'letter': letter,
            'text': text,
            'overlap': overlap,
            'is_correct': letter == correct_letter
        })
        
    if not overlaps: continue
    
    overlaps.sort(key=lambda x: x['overlap'], reverse=True)
    best_match = overlaps[0]
    
    correct_overlap = next((o['overlap'] for o in overlaps if o['is_correct']), 0)
    correct_text = next((o['text'] for o in overlaps if o['is_correct']), '')
    
    # We use a stricter heuristic: The correct option shares ZERO words with rationale,
    # but an incorrect option shares 3+ words. This usually means the rationale 
    # might actually support the wrong option and completely ignore the correct option.
    if correct_overlap == 0 and best_match['overlap'] >= 3 and not best_match['is_correct']:
        mismatches.append({
            'id': q['id'],
            'stem': q['stem'],
            'indicated_letter': correct_letter,
            'indicated_text': correct_text,
            'best_match_letter': best_match['letter'],
            'best_match_text': best_match['text'],
            'rationale': rationale
        })

print(f"Found {len(mismatches)} highly suspicious mismatches.")
with open("suspicious_db_mismatches.json", "w", encoding="utf-8") as f:
    json.dump(mismatches, f, indent=2)

