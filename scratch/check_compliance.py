import os
import re

migrations_dir = r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations'
files = [f for f in os.listdir(migrations_dir) if f.endswith('.sql')]

compliance_errors = {
    'invalid_paper': [],
    'invalid_unit': [],
    'invalid_topic': [],
    'invalid_cadre': []
}

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

total_checked = 0

for fname in files:
    file_path = os.path.join(migrations_dir, fname)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    statements = split_sql_statements(content)
    for stmt in statements:
        if stmt.upper().startswith('INSERT INTO QUESTIONS'):
            col_match = re.search(r'INSERT INTO questions\s*\(([^)]+)\)', stmt, re.IGNORECASE)
            if not col_match: continue
            columns = [c.strip().lower() for c in col_match.group(1).split(',')]
            
            val_match = re.search(r'VALUES\s*(.*)', stmt, re.DOTALL | re.IGNORECASE)
            if not val_match: continue
            
            val_block = val_match.group(1)
            val_block = re.sub(r'(?i)\s*ON CONFLICT.*', '', val_block).strip()
            
            tuples = parse_sql_values(val_block)
            for t_str in tuples:
                vals = split_tuple_values(t_str)
                if len(vals) != len(columns): continue
                q_data = dict(zip(columns, vals))
                total_checked += 1
                
                paper = str(q_data.get('paper', ''))
                unit = str(q_data.get('unit', ''))
                topic = str(q_data.get('topic', ''))
                cadre = str(q_data.get('cadre', ''))
                
                if paper not in ['Paper I', 'Paper II']:
                    compliance_errors['invalid_paper'].append(f"{fname}: {q_data.get('stem', '')[:30]}... ({paper})")
                if unit.lower() == 'nursing':
                    compliance_errors['invalid_unit'].append(f"{fname}: {q_data.get('stem', '')[:30]}... ({unit})")
                if topic.lower() == 'general':
                    compliance_errors['invalid_topic'].append(f"{fname}: {q_data.get('stem', '')[:30]}... ({topic})")
                if cadre not in ['BScN', 'KRCHN']:
                    compliance_errors['invalid_cadre'].append(f"{fname}: {q_data.get('stem', '')[:30]}... ({cadre})")

        elif stmt.upper().startswith('UPDATE QUESTIONS'):
            # Also check UPDATE statements for compliance if they SET paper, unit, etc.
            set_match = re.search(r'(?i)\bSET\b(.*?)\bWHERE\b', stmt, re.DOTALL)
            if not set_match: continue
            set_block = set_match.group(1)
            
            paper_m = re.search(r'(?i)paper\s*=\s*\'(.*?)\'', set_block)
            unit_m = re.search(r'(?i)unit\s*=\s*\'(.*?)\'', set_block)
            topic_m = re.search(r'(?i)topic\s*=\s*\'(.*?)\'', set_block)
            cadre_m = re.search(r'(?i)cadre\s*=\s*\'(.*?)\'', set_block)
            
            if paper_m and paper_m.group(1) not in ['Paper I', 'Paper II']:
                compliance_errors['invalid_paper'].append(f"{fname}: UPDATE statement set paper to {paper_m.group(1)}")
            if unit_m and unit_m.group(1).lower() == 'nursing':
                compliance_errors['invalid_unit'].append(f"{fname}: UPDATE statement set unit to Nursing")
            if topic_m and topic_m.group(1).lower() == 'general':
                compliance_errors['invalid_topic'].append(f"{fname}: UPDATE statement set topic to General")
            if cadre_m and cadre_m.group(1) not in ['BScN', 'KRCHN']:
                compliance_errors['invalid_cadre'].append(f"{fname}: UPDATE statement set cadre to {cadre_m.group(1)}")

print(f"Total Questions Checked: {total_checked}")
for k, v in compliance_errors.items():
    print(f"{k}: {len(v)} errors")
    if v:
        print(f"  Examples: {v[:3]}")
