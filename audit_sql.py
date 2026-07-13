import re
import sqlite3
import os

db = sqlite3.connect(':memory:')
c = db.cursor()
c.execute('''CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stem TEXT, option_a TEXT, option_b TEXT, option_c TEXT, option_d TEXT,
    correct_option TEXT, rationale TEXT, cadre TEXT, paper TEXT,
    unit TEXT, topic TEXT, difficulty TEXT, status TEXT
)''')

files = [
    r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations\20260711000001_seed_mcq_compilation_set3.sql',
    r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations\20260711000002_fix_mcq_set3_audit.sql',
    r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations\20260711000003_seed_mcq_set3_supplement.sql',
    r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations\20260711000004_fix_supplement_audit.sql'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        statements = content.split(';')
        for stmt in statements:
            stmt = stmt.strip()
            if not stmt: continue
            
            clean_lines = [line for line in stmt.split('\n') if not line.strip().startswith('--')]
            clean_stmt = ' '.join(clean_lines).strip()
            
            if clean_stmt.upper().startswith('INSERT') or clean_stmt.upper().startswith('UPDATE') or clean_stmt.upper().startswith('DELETE'):
                # Handle Postgres ON CONFLICT DO NOTHING -> SQLite INSERT OR IGNORE
                if clean_stmt.upper().startswith('INSERT'):
                    if 'ON CONFLICT' in clean_stmt:
                        clean_stmt = clean_stmt.replace('INSERT INTO', 'INSERT OR IGNORE INTO')
                        clean_stmt = clean_stmt.split('ON CONFLICT')[0]
                try:
                    c.execute(clean_stmt)
                except Exception as e:
                    print(f"Error executing: {clean_stmt[:50]}... Error: {e}")

db.commit()

# Run the verifications
c.execute("SELECT COUNT(*) FROM questions")
print("Total questions:", c.fetchone()[0])

c.execute("SELECT COUNT(*) FROM questions WHERE topic = 'General' OR unit = 'Nursing'")
print("Topic General or Unit Nursing:", c.fetchone()[0])

c.execute("SELECT COUNT(*) FROM questions WHERE paper NOT IN ('Paper I', 'Paper II')")
print("Invalid papers:", c.fetchone()[0])

c.execute("SELECT COUNT(*) FROM questions WHERE cadre NOT IN ('BScN', 'KRCHN')")
print("Invalid cadres:", c.fetchone()[0])

c.execute("SELECT COUNT(*) FROM questions WHERE status != 'approved'")
print("Invalid status:", c.fetchone()[0])

c.execute("SELECT stem FROM questions WHERE topic = 'General' OR unit = 'Nursing'")
bad = c.fetchall()
if bad:
    print("Some bad topics/units stems:")
    for b in bad[:5]:
        print(" -", b[0])
