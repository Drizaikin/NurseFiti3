import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv(dotenv_path="../.env.local")

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("Missing Supabase credentials")
    exit(1)

supabase: Client = create_client(url, key)

with open("questions_extracted.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

import re

# The questions in questions_extracted.json have fields: question_text, options, answer, rationale, source
db_ready_questions = []
for q in questions:
    if not q.get("question_text"): continue
    
    opts = q.get("options", [])
    opt_a = opts[0] if len(opts) > 0 else ""
    opt_b = opts[1] if len(opts) > 1 else ""
    opt_c = opts[2] if len(opts) > 2 else ""
    opt_d = opts[3] if len(opts) > 3 else ""
    
    # Strip leading "a) ", "A. " from options for clean insertion if desired, but let's just insert as is.
    # We must extract A, B, C, or D from `answer`
    ans_text = q.get("answer", "").upper()
    match = re.search(r'ANSWER:\s*([A-D])', ans_text)
    if not match:
        match = re.search(r'\b([A-D])\b', ans_text.replace(")", " "))
    correct = match.group(1) if match else "A"
    
    # Clean the rationale by removing the leading "Rationale: "
    rat = q.get("rationale", "")
    if rat.startswith("Rationale: "):
        rat = rat[11:]
        
    db_ready_questions.append({
        "stem": q.get("question_text"),
        "option_a": opt_a,
        "option_b": opt_b,
        "option_c": opt_c,
        "option_d": opt_d,
        "correct_option": correct,
        "rationale": rat,
        "unit": "Nursing",
        "topic": "General",
        "difficulty": "medium",
        "cadre": "KRCHN" # Defaulting based on earlier prompt
    })

batch_size = 50
inserted_count = 0

for i in range(0, len(db_ready_questions), batch_size):
    batch = db_ready_questions[i:i+batch_size]
    try:
        response = supabase.table("questions").insert(batch).execute()
        inserted_count += len(response.data)
        print(f"Inserted {inserted_count}/{len(db_ready_questions)}")
    except Exception as e:
        print(f"Error inserting batch: {e}")

print(f"Seeding complete! Successfully inserted {inserted_count} questions.")
