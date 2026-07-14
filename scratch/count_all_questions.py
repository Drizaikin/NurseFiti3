import os
import glob
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

migrations_dir = r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations'
target_files = [
    "20260711000001_seed_mcq_compilation_set3.sql",
    "20260711000003_seed_mcq_set3_supplement.sql",
    "20260708000001_seed_mcq_compilation_2026.sql"
]
files = [os.path.join(migrations_dir, f) for f in target_files]
total_questions = 0

for file_path in files:
    if not os.path.exists(file_path): continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    statements = split_sql_statements(content)
    file_total = 0
    for stmt in statements:
        if not stmt.upper().startswith('INSERT INTO QUESTIONS'):
            continue
            
        val_match = re.search(r'VALUES\s*(.*)', stmt, re.DOTALL | re.IGNORECASE)
        if not val_match:
            continue
            
        val_block = val_match.group(1)
        val_block = re.sub(r'(?i)\s*ON CONFLICT.*', '', val_block).strip()
        
        tuples = parse_sql_values(val_block)
        file_total += len(tuples)
    print(f"{os.path.basename(file_path)}: {file_total} questions")
    total_questions += file_total

print(f"Total questions seeded across the 3 target migrations: {total_questions}")
