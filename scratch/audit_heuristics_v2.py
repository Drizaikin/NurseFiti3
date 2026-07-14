import os
import re

target_files = [
    "20260701000002_seed_nck_2018_pharmacology_paper1_batch2.sql",
    "20260701000003_seed_nck_2017_paper1_both_cadres.sql",
    "20260701000004_seed_nck_2021_paper2_remaining.sql",
    "20260701000005_seed_undated_compiled_batch_a.sql",
    "20260701000006_seed_undated_compiled_batch_b.sql",
    "20260701000007_seed_undated_compiled_batch_c.sql",
    "20260701000008_seed_undated_psychiatry_batch_a.sql"
]

migrations_dir = r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations'

total_questions = 0
mismatches = []

stop_words = {'the', 'is', 'a', 'an', 'and', 'or', 'of', 'in', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'this', 'that', 'it', 'are', 'be', 'as', 'not', 'but', 'which', 'will', 'can', 'may'}

def get_keywords(text):
    if not text: return set()
    words = re.findall(r'\b[A-Za-z]{4,}\b', text.lower())
    return set([w for w in words if w not in stop_words])

def split_sql_statements(content):
    statements = []
    current = []
    in_quote = False
    i = 0
    while i < len(content):
        c = content[i]
        if c == "'":
            if i + 1 < len(content) and content[i+1] == "'":
                current.append("''")
                i += 1
            else:
                in_quote = not in_quote
                current.append(c)
        elif c == ';' and not in_quote:
            statements.append(''.join(current).strip())
            current = []
        else:
            current.append(c)
        i += 1
    if current:
        statements.append(''.join(current).strip())
    return statements

def parse_sql_values(val_block):
    tuples = []
    current_tuple = []
    in_quote = False
    paren_depth = 0
    i = 0
    while i < len(val_block):
        c = val_block[i]
        if c == "'":
            if i + 1 < len(val_block) and val_block[i+1] == "'":
                current_tuple.append("''")
                i += 1
            else:
                in_quote = not in_quote
                current_tuple.append(c)
        elif not in_quote:
            if c == '(':
                if paren_depth > 0:
                    current_tuple.append(c)
                paren_depth += 1
            elif c == ')':
                paren_depth -= 1
                if paren_depth == 0:
                    tuples.append("".join(current_tuple))
                    current_tuple = []
                else:
                    current_tuple.append(c)
            elif paren_depth > 0:
                current_tuple.append(c)
        else:
            current_tuple.append(c)
        i += 1
    return tuples

def split_tuple_values(t_str):
    vals = []
    current = []
    in_quote = False
    i = 0
    while i < len(t_str):
        c = t_str[i]
        if c == "'":
            if i + 1 < len(t_str) and t_str[i+1] == "'":
                current.append("'")
                i += 1
            else:
                in_quote = not in_quote
        elif c == ',' and not in_quote:
            vals.append(''.join(current).strip())
            current = []
        else:
            current.append(c)
        i += 1
    vals.append(''.join(current).strip())
    
    cleaned = []
    for v in vals:
        if v.upper() == 'NULL':
            cleaned.append(None)
        elif v.startswith("'") and v.endswith("'"):
            cleaned.append(v[1:-1].replace("''", "'"))
        else:
            cleaned.append(v)
    return cleaned

for fname in target_files:
    file_path = os.path.join(migrations_dir, fname)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    statements = split_sql_statements(content)
    for stmt in statements:
        if not stmt.upper().startswith('INSERT INTO QUESTIONS'):
            continue
            
        col_match = re.search(r'INSERT INTO questions\s*\(([^)]+)\)', stmt, re.IGNORECASE)
        if not col_match:
            continue
        columns = [c.strip().lower() for c in col_match.group(1).split(',')]
        
        val_match = re.search(r'VALUES\s*(.*)', stmt, re.DOTALL | re.IGNORECASE)
        if not val_match:
            continue
            
        val_block = val_match.group(1)
        val_block = re.sub(r'(?i)\s*ON CONFLICT.*', '', val_block).strip()
        
        tuples = parse_sql_values(val_block)
        for t_str in tuples:
            vals = split_tuple_values(t_str)
            if len(vals) != len(columns): continue
            
            q_data = dict(zip(columns, vals))
            if 'stem' not in q_data or 'correct_option' not in q_data or 'rationale' not in q_data:
                continue
                
            total_questions += 1
            stem = q_data['stem']
            ans = str(q_data['correct_option']).upper() if q_data['correct_option'] else ''
            rat = str(q_data['rationale']) if q_data['rationale'] else ''
            opts = {
                'A': str(q_data.get('option_a', '')),
                'B': str(q_data.get('option_b', '')),
                'C': str(q_data.get('option_c', '')),
                'D': str(q_data.get('option_d', ''))
            }
            
            # Heuristic 1
            explicit_mentions = re.findall(r'\b(?:Option|Answer)\s+([A-D])\b', rat, re.IGNORECASE)
            explicit_mentions = [x.upper() for x in explicit_mentions]
            if explicit_mentions:
                if ans not in explicit_mentions and len(set(explicit_mentions)) == 1:
                    mismatches.append({
                        'file': fname, 'stem': stem, 'keyed': ans, 'rationale': rat,
                        'reason': f"Explicitly mentions Option {explicit_mentions[0]} but keyed {ans}"
                    })
                    continue
                    
            # Heuristic 2
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
                
            if not overlap_scores: continue
            best_opt = max(overlap_scores, key=overlap_scores.get)
            ans_score = overlap_scores.get(ans, 0)
            
            if best_opt != ans and overlap_scores[best_opt] >= 0.5 and ans_score <= 0.2:
                if overlap_scores[best_opt] > ans_score * 2:
                    mismatches.append({
                        'file': fname, 'stem': stem, 'keyed': ans, 'rationale': rat,
                        'reason': f"Rationale matches Option {best_opt} ({overlap_scores[best_opt]:.2f}) much better than Keyed {ans} ({ans_score:.2f})"
                    })

print(f"Total questions parsed: {total_questions}")
print(f"Found {len(mismatches)} strongly suspected mismatches.")

output_file = r'C:\Users\rizik\.gemini\antigravity-ide\brain\01496a0c-ec3a-42c6-884b-d773eecd3fa2\final_7_migrations_audit_report.md'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("# Final 7 Migrations Audit Report\n\n")
    f.write(f"Scanned {total_questions} questions across 7 migration files.\n")
    f.write(f"Found {len(mismatches)} strongly suspected mismatches.\n\n")
    for i, m in enumerate(mismatches):
        f.write(f"### {i+1}. Question\n")
        f.write(f"**File:** {m['file']}\n")
        f.write(f"**Stem:** {m['stem']}\n")
        f.write(f"**Keyed Answer:** {m['keyed']}\n")
        f.write(f"**Rationale:** {m['rationale']}\n")
        f.write(f"**Flag Reason:** {m['reason']}\n")
        f.write("---\n")
