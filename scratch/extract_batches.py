import os
import re

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

def evaluate_rationale(rationale, options, key):
    flags = []
    if not rationale:
        return ["Missing rationale"]
    
    words = [w for w in re.findall(r'\b\w+\b', rationale) if len(w) > 1]
    if len(words) < 12:
        flags.append(f"Too Brief ({len(words)} words)")
        
    correct_opt_text = options.get(key, "").strip().lower()
    if correct_opt_text and len(correct_opt_text) > 5:
        if correct_opt_text in rationale.lower() and len(words) < len(correct_opt_text.split()) + 5:
            flags.append("Repetitive (Just repeats option text)")
            
    lazy_patterns = [
        r'option [a-d] is correct',
        r'the answer is [a-d]',
        r'the correct option is [a-d]'
    ]
    for p in lazy_patterns:
        if re.search(p, rationale.lower()):
            flags.append("Lazy wording detected")
            
    return flags

migrations_dir = r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations'
target_files = [
    "20260711000001_seed_mcq_compilation_set3.sql",
    "20260711000003_seed_mcq_set3_supplement.sql",
    "20260708000001_seed_mcq_compilation_2026.sql"
]

all_questions = []

for fname in target_files:
    file_path = os.path.join(migrations_dir, fname)
    if not os.path.exists(file_path): continue
    
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
            if 'stem' not in q_data or 'correct_option' not in q_data:
                continue
                
            ans = str(q_data['correct_option']).upper() if q_data['correct_option'] else ''
            opts = {
                'A': str(q_data.get('option_a', '')),
                'B': str(q_data.get('option_b', '')),
                'C': str(q_data.get('option_c', '')),
                'D': str(q_data.get('option_d', ''))
            }
            rat = str(q_data.get('rationale', ''))
            
            flags = evaluate_rationale(rat, opts, ans)
            
            all_questions.append({
                'file': fname,
                'stem': q_data['stem'],
                'options': opts,
                'key': ans,
                'rationale': rat,
                'flags': flags
            })

BATCH_SIZE = 500
total = len(all_questions)
out_dir = r'C:\Users\rizik\.gemini\antigravity-ide\brain\01496a0c-ec3a-42c6-884b-d773eecd3fa2'

for batch_idx in range(0, total, BATCH_SIZE):
    batch_num = (batch_idx // BATCH_SIZE) + 1
    chunk = all_questions[batch_idx:batch_idx+BATCH_SIZE]
    
    out_file = os.path.join(out_dir, f'audit_batch_{batch_num}.md')
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(f"# Audit Batch {batch_num} (Questions {batch_idx+1} - {min(batch_idx+BATCH_SIZE, total)})\n\n")
        
        for i, q in enumerate(chunk):
            f.write(f"### Q{batch_idx + i + 1}. {q['stem']}\n")
            f.write(f"- **A)** {q['options']['A']}\n")
            f.write(f"- **B)** {q['options']['B']}\n")
            f.write(f"- **C)** {q['options']['C']}\n")
            f.write(f"- **D)** {q['options']['D']}\n")
            f.write(f"\n**Keyed Answer:** {q['key']}\n")
            f.write(f"**Rationale:** {q['rationale']}\n")
            
            if q['flags']:
                f.write("\n> [!WARNING]\n")
                f.write(f"> **Rationale Flags:** {', '.join(q['flags'])}\n")
            
            f.write("\n---\n")

print(f"Successfully wrote {total} questions into {(total // BATCH_SIZE) + 1} batches.")
