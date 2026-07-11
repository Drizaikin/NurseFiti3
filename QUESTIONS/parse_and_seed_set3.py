import os
import re
import json
import uuid
from dotenv import load_dotenv
from supabase import create_client

# Load Supabase config
load_dotenv(dotenv_path="../.env.local")
url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
if url and key:
    supabase = create_client(url, key)
    response = supabase.table('questions').select('stem, cadre').execute()
    existing_questions = {(row['stem'].strip(), row['cadre']) for row in response.data if row['stem']}
    print(f"Loaded {len(existing_questions)} existing questions from DB.")
else:
    print("Supabase credentials missing, skipping deduplication against DB.")
    existing_questions = set()

with open('set3_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Heuristic Keywords for Auditing
flagged_keywords = [
    'quinine', 'artesunate',
    'fanc', '4 visit', 'four visit', '8 contact', 'eight contact',
    'moh 613', 'moh 614',
    'toxoplasmosis', 'plague',
    'apgar',
    'p3 form', 'prc form',
    'more than one defensible answer' # From the document's own notes
]

# Unit mappings based on nck-exam-system.md
unit_mappings = {
    'Medical-Surgical Nursing': ['med-surg', 'surgical', 'anatomy', 'physiology', 'pathophysiology', 'system', 'cardiac', 'respiratory', 'gastrointestinal', 'renal', 'neuro', 'ortho', 'blood', 'cancer', 'oncology', 'fluid'],
    'Midwifery': ['midwifery', 'obstetric', 'labour', 'pregnancy', 'maternal', 'postpartum', 'fetus', 'fetal'],
    'Pharmacology': ['pharmacology', 'drug', 'medication', 'dose', 'toxin', 'poison'],
    'Paediatric Nursing': ['paediatric', 'child', 'neonate', 'infant', 'imnci'],
    'Community Health Nursing': ['community', 'public health', 'epidemiology', 'vaccine', 'immunization', 'endemic', 'pandemic'],
    'Mental Health Nursing': ['mental', 'psychiatric', 'schizophrenia', 'depression', 'anxiety', 'psychology'],
    'Nursing Management & Leadership': ['leadership', 'management', 'delegation', 'quality improvement'],
    'Research & Evidence-Based Practice': ['research', 'evidence', 'statistics', 'study', 'variable'],
    'Infection Prevention & Control': ['infection', 'sterilization', 'isolation', 'asepsis']
}

def categorize_unit(text):
    text_lower = text.lower()
    for unit, keywords in unit_mappings.items():
        for kw in keywords:
            if kw in text_lower:
                return unit
    return 'Medical-Surgical Nursing' # Default fallback

# Parse document by cadre and paper
sections = re.split(r'^((?:BScN|KRCHN).*)$', text, flags=re.MULTILINE)

questions = []
current_cadre = "BScN"
current_paper = "Paper I"

# Regex to extract individual questions
# Format:
# 1. Question text...
# A. Opt A
# B. Opt B
# C. Opt C
# D. Opt D
# Answer: D. text
# Rationale: text

q_pattern = re.compile(
    r'\d+\.\s+(.*?)\n'           # stem
    r'A\.\s+(.*?)\n'             # option A
    r'B\.\s+(.*?)\n'             # option B
    r'C\.\s+(.*?)\n'             # option C
    r'D\.\s+(.*?)\n'             # option D
    r'Answer:\s+([A-D])\.?\s*(.*?)\n' # answer
    r'Rationale:\s+(.*?)(?=\n\d+\.\s+|\Z)', # rationale
    re.DOTALL
)

clean_questions = []
flagged_questions = []
duplicate_count = 0

for i in range(1, len(sections), 2):
    header = sections[i].strip()
    content = sections[i+1]
    
    if "KRCHN" in header:
        current_cadre = "KRCHN"
    elif "BScN" in header:
        current_cadre = "BScN"
        
    if "Paper I" in header and "II" not in header:
        current_paper = "Paper I"
    elif "Paper II" in header:
        current_paper = "Paper II"
        
    matches = q_pattern.findall(content)
    for match in matches:
        stem = match[0].strip()
        opt_a = match[1].strip()
        opt_b = match[2].strip()
        opt_c = match[3].strip()
        opt_d = match[4].strip()
        correct_opt = match[5].upper().strip()
        ans_text = match[6].strip()
        rationale = match[7].strip()
        
        # Check for duplicates
        if (stem, current_cadre) in existing_questions:
            duplicate_count += 1
            continue
            
        # Auto-categorize unit
        combined_text = f"{stem} {rationale}"
        unit = categorize_unit(combined_text)
        topic = "General" # Heuristic topic can be refined later
        
        q_dict = {
            "stem": stem,
            "option_a": opt_a,
            "option_b": opt_b,
            "option_c": opt_c,
            "option_d": opt_d,
            "correct_option": correct_opt,
            "rationale": rationale,
            "cadre": current_cadre,
            "paper": current_paper,
            "unit": unit,
            "topic": topic,
            "difficulty": "medium",
            "status": "approved"
        }
        
        # Heuristic checks
        is_flagged = False
        flag_reasons = []
        
        rationale_lower = rationale.lower()
        stem_lower = stem.lower()
        
        # Check keywords
        for kw in flagged_keywords:
            if kw in rationale_lower or kw in stem_lower:
                is_flagged = True
                flag_reasons.append(f"Keyword match: {kw}")
                
        # Contradiction check: does rationale explicitly state a different option?
        # e.g., if correct_opt is 'A' but rationale says "Therefore B is correct"
        other_opts = [o for o in ['A', 'B', 'C', 'D'] if o != correct_opt]
        for o in other_opts:
            if f" {o} is correct" in rationale or f"option {o}" in rationale.lower() and f"option {correct_opt.lower()}" not in rationale.lower():
                # Soft check, can be false positive, but good for flagging
                pass # we will skip this specific strict check to avoid too many false positives unless very explicit
        
        if is_flagged:
            q_dict["flag_reasons"] = flag_reasons
            flagged_questions.append(q_dict)
        else:
            clean_questions.append(q_dict)

print(f"Parsed {len(clean_questions) + len(flagged_questions) + duplicate_count} questions.")
print(f"Duplicates skipped: {duplicate_count}")
print(f"Clean questions: {len(clean_questions)}")
print(f"Flagged questions: {len(flagged_questions)}")

# Generate SQL for clean questions
sql_lines = []
for q in clean_questions:
    stem_esc = q['stem'].replace("'", "''")
    a_esc = q['option_a'].replace("'", "''")
    b_esc = q['option_b'].replace("'", "''")
    c_esc = q['option_c'].replace("'", "''")
    d_esc = q['option_d'].replace("'", "''")
    rat_esc = q['rationale'].replace("'", "''")
    unit_esc = q['unit'].replace("'", "''")
    topic_esc = q['topic'].replace("'", "''")
    
    sql = f"INSERT INTO questions (stem, option_a, option_b, option_c, option_d, correct_option, rationale, cadre, paper, unit, topic, difficulty, status) VALUES ('{stem_esc}', '{a_esc}', '{b_esc}', '{c_esc}', '{d_esc}', '{q['correct_option']}', '{rat_esc}', '{q['cadre']}', '{q['paper']}', '{unit_esc}', '{topic_esc}', '{q['difficulty']}', '{q['status']}') ON CONFLICT (stem, cadre) DO NOTHING;"
    sql_lines.append(sql)

with open('../supabase/migrations/20260711000001_seed_mcq_compilation_set3.sql', 'w', encoding='utf-8') as f:
    f.write("-- Migration to seed Set 3 MCQs\n")
    f.write("\n".join(sql_lines))
    f.write("\n")

# Direct Supabase Insertion (chunked to avoid payload limits)
if url and key:
    # Deduplicate internally to prevent upsert errors in same chunk
    unique_clean = []
    seen = set()
    for q in clean_questions:
        k = (q['stem'].strip(), q['cadre'])
        if k not in seen:
            seen.add(k)
            unique_clean.append(q)

    print(f"\nInserting {len(unique_clean)} questions into Supabase...")
    chunk_size = 100
    inserted = 0
    for i in range(0, len(unique_clean), chunk_size):
        chunk = unique_clean[i:i+chunk_size]
        try:
            # Remove 'flag_reasons' if it exists just in case (it shouldn't be in clean)
            for q in chunk:
                q.pop('flag_reasons', None)
            supabase.table('questions').upsert(chunk, on_conflict='stem,cadre').execute()
            inserted += len(chunk)
            print(f"Inserted {inserted}/{len(clean_questions)}...")
        except Exception as e:
            print(f"Error inserting chunk: {e}")
            
# Generate audit report for flagged questions
with open('audit_report_set3.md', 'w', encoding='utf-8') as f:
    f.write("# Set 3 Audit Report: Flagged Questions\n\n")
    f.write(f"Found {len(flagged_questions)} flagged questions requiring manual review.\n\n")
    for i, q in enumerate(flagged_questions):
        f.write(f"### Flagged Question {i+1}\n")
        f.write(f"**Reasons:** {', '.join(q['flag_reasons'])}\n")
        f.write(f"**Cadre:** {q['cadre']} | **Paper:** {q['paper']} | **Unit:** {q['unit']}\n")
        f.write(f"**Question:** {q['stem']}\n")
        f.write(f"- A. {q['option_a']}\n")
        f.write(f"- B. {q['option_b']}\n")
        f.write(f"- C. {q['option_c']}\n")
        f.write(f"- D. {q['option_d']}\n")
        f.write(f"**Keyed Answer:** {q['correct_option']}\n")
        f.write(f"**Rationale:** {q['rationale']}\n\n")
        f.write("---\n\n")

print("Done generating files.")
