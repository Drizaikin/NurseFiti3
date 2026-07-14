import glob

files = glob.glob(r'C:\Users\rizik\.gemini\antigravity-ide\brain\01496a0c-ec3a-42c6-884b-d773eecd3fa2\audit_batch_*.md')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    questions = content.split('---')
    for q in questions:
        if 'Rationale Flags' in q:
            print("====================================")
            print(f"File: {f.split(chr(92))[-1]}")
            print(q.strip())
            print("====================================\n")
