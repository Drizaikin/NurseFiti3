import os
import glob
import sqlite3
import re

migrations_dir = r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations'
sql_files = sorted(glob.glob(os.path.join(migrations_dir, '*.sql')))

db = sqlite3.connect(':memory:')
c = db.cursor()
c.execute('''CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file TEXT,
    stem TEXT, option_a TEXT, option_b TEXT, option_c TEXT, option_d TEXT,
    correct_option TEXT, rationale TEXT
)''')

for file in sql_files:
    fname = os.path.basename(file)
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        statements = content.split(';')
        for stmt in statements:
            stmt = stmt.strip()
            if not stmt: continue
            
            clean_lines = [line for line in stmt.split('\n') if not line.strip().startswith('--')]
            clean_stmt = ' '.join(clean_lines).strip()
            
            if clean_stmt.upper().startswith('INSERT INTO QUESTIONS'):
                # SQLite workaround for ON CONFLICT
                if 'ON CONFLICT' in clean_stmt.upper():
                    clean_stmt = re.sub(r'(?i)ON CONFLICT.*', '', clean_stmt)
                
                # Replace INSERT INTO questions with INSERT INTO questions (stem, option_a, ...)
                # But since the columns might differ, let's just do regex extraction of the VALUES
                match = re.search(r'VALUES\s*\((.*)\)', clean_stmt, re.DOTALL | re.IGNORECASE)
                if match:
                    val_str = match.group(1)
                    # We will just insert it as a raw string to sqlite by wrapping it
                    # But sqlite expects proper escaping. Let's just execute the statement directly.
                    # Wait, the columns in the file are stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, year, status, difficulty, unit, topic
                    # Too complex to guess columns.
                    pass

# Instead of SQLite, let's just use a better regex
total_questions = 0
mismatches = []

stop_words = {'the', 'is', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'this', 'that', 'it', 'are', 'be', 'as', 'not', 'but', 'which', 'will', 'can', 'may'}

def get_keywords(text):
    words = re.findall(r'\b[A-Za-z]{4,}\b', text.lower())
    return set([w for w in words if w not in stop_words])

for file in sql_files:
    fname = os.path.basename(file)
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find all tuples inside VALUES (...)
        matches = re.finditer(r"VALUES\s*\(\s*'((?:[^']|'')*)'\s*,\s*'((?:[^']|'')*)'\s*,\s*'((?:[^']|'')*)'\s*,\s*'((?:[^']|'')*)'\s*,\s*'((?:[^']|'')*)'\s*,\s*'([A-D])'\s*,\s*'((?:[^']|'')*)'", content, re.IGNORECASE)
        for match in matches:
            total_questions += 1
            stem = match.group(1).replace("''", "'")
            opts = {
                'A': match.group(2).replace("''", "'"),
                'B': match.group(3).replace("''", "'"),
                'C': match.group(4).replace("''", "'"),
                'D': match.group(5).replace("''", "'")
            }
            ans = match.group(6).upper()
            rat = match.group(7).replace("''", "'")
            
            # Heuristic 1: Explicit mention of a different option letter
            # e.g. "The correct answer is B" or "Option C is correct"
            explicit_mentions = re.findall(r'\b(?:Option|Answer)\s+([A-D])\b', rat, re.IGNORECASE)
            explicit_mentions = [x.upper() for x in explicit_mentions]
            if explicit_mentions:
                # If they explicitly mention options, but the key is not in them
                if ans not in explicit_mentions and len(set(explicit_mentions)) == 1:
                    mismatches.append({
                        'file': fname, 'stem': stem, 'keyed': ans, 'rationale': rat,
                        'reason': f"Explicitly mentions Option {explicit_mentions[0]} but keyed {ans}"
                    })
                    continue
                    
            # Heuristic 2: Keyword overlap
            rat_keywords = get_keywords(rat)
            if not rat_keywords: continue
            
            overlap_scores = {}
            for k, v in opts.items():
                opt_kw = get_keywords(v)
                if not opt_kw:
                    overlap_scores[k] = 0
                    continue
                overlap = len(opt_kw.intersection(rat_keywords))
                overlap_scores[k] = overlap / len(opt_kw)
                
            best_opt = max(overlap_scores, key=overlap_scores.get)
            ans_score = overlap_scores.get(ans, 0)
            
            # If the best matching option is NOT the keyed answer, and it has high overlap while the keyed answer has low
            if best_opt != ans and overlap_scores[best_opt] >= 0.5 and ans_score <= 0.2:
                # Only flag if the best option is significantly better
                if overlap_scores[best_opt] > ans_score * 2:
                    mismatches.append({
                        'file': fname, 'stem': stem, 'keyed': ans, 'rationale': rat,
                        'reason': f"Rationale matches Option {best_opt} ({overlap_scores[best_opt]:.2f}) much better than Keyed {ans} ({ans_score:.2f})"
                    })

print(f"Total questions parsed: {total_questions}")
print(f"Found {len(mismatches)} strongly suspected mismatches.")

with open('heuristic_mismatches.md', 'w', encoding='utf-8') as f:
    f.write("# Heuristic Audit Mismatches\n\n")
    for i, m in enumerate(mismatches):
        f.write(f"### {i+1}. Question from {m['file']}\n")
        f.write(f"**Stem:** {m['stem']}\n")
        f.write(f"**Keyed Answer:** {m['keyed']}\n")
        f.write(f"**Rationale:** {m['rationale']}\n")
        f.write(f"**Flag Reason:** {m['reason']}\n")
        f.write("---\n")
