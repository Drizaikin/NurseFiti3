import os
import re

migrations_dir = r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\supabase\migrations'
target_files = [
    "20260713000001_comprehensive_audit_set3.sql",
    "20260713000002_deep_audit_set3_corrections.sql",
    "20260714000001_missed_clinical_errors.sql"
]

all_updates = []

for fname in target_files:
    file_path = os.path.join(migrations_dir, fname)
    if not os.path.exists(file_path): continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split by UPDATE statement
    statements = re.split(r'(?i)\bUPDATE\s+questions\b', content)
    
    for stmt in statements[1:]: # Skip the first chunk before the first UPDATE
        
        # Extract SET block and WHERE block
        set_match = re.search(r'(?i)\bSET\b(.*?)\bWHERE\b', stmt, re.DOTALL)
        where_match = re.search(r'(?i)\bWHERE\b(.*)', stmt, re.DOTALL)
        
        if not set_match or not where_match:
            continue
            
        set_block = set_match.group(1)
        where_block = where_match.group(1).split(';')[0]
        
        # Extract new values
        new_key_match = re.search(r'(?i)correct_option\s*=\s*\'([A-D])\'', set_block)
        new_rat_match = re.search(r'(?i)rationale\s*=\s*\'(.*?)\'', set_block, re.DOTALL)
        
        new_key = new_key_match.group(1) if new_key_match else "N/A"
        new_rat = new_rat_match.group(1) if new_rat_match else "N/A"
        
        # Extract stem
        stem_match = re.search(r'(?i)stem\s*(?:LIKE|=)\s*\'(.*?)\'', where_block)
        stem = stem_match.group(1) if stem_match else "Unknown Stem"
        
        all_updates.append({
            'file': fname,
            'stem': stem.replace('%', ''),
            'new_key': new_key,
            'new_rat': new_rat.replace("''", "'")
        })

out_file = r'C:\Users\rizik\.gemini\antigravity-ide\brain\01496a0c-ec3a-42c6-884b-d773eecd3fa2\clinical_corrections_review.md'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write("# Clinical Corrections Review\n\n")
    f.write(f"Total Corrections Extracted: {len(all_updates)}\n\n")
    
    for i, u in enumerate(all_updates):
        f.write(f"### Q{i+1}. Stem: {u['stem']}\n")
        f.write(f"**New Key:** {u['new_key']}\n")
        f.write(f"**New Rationale:** {u['new_rat']}\n")
        f.write(f"*(Source: {u['file']})*\n\n---\n")

print(f"Extracted {len(all_updates)} updates to {out_file}")
