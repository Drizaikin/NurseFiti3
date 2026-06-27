import os
import json
import time
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv(dotenv_path="../.env.local")

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("ERROR: GEMINI_API_KEY is not set in .env.local")
    exit(1)

genai.configure(api_key=api_key)

# We use flash because of free tier rate limits, while still being very capable
model = genai.GenerativeModel('gemini-flash-latest')

with open("all_db_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Optional: To test quickly, you can slice the questions: questions = questions[:10]

print(f"Loaded {len(questions)} questions for AI audit.")

SYSTEM_PROMPT = """
You are an expert nursing clinical reviewer auditing a database of NCK (Nursing Council of Kenya) past paper questions.
Your goal is to strictly find questions where the provided 'Rationale' CONTRADICTS the marked 'Correct Option', or where the marked correct option is blatantly medically inaccurate according to standard Kenyan/WHO protocols (e.g. MoH Kenya, ETAT, IMNCI).

You will be provided with a Question Stem, 4 Options, the Marked Correct Option, and the Rationale.

Evaluate the question. Answer with a JSON object in exactly this format:
{
  "is_contradiction": true or false,
  "reason": "Brief explanation of why it contradicts or why it's correct",
  "suggested_correct_option": "A, B, C, or D (if applicable)"
}

Only mark "is_contradiction": true IF:
1. The rationale clearly explains why a DIFFERENT option is correct.
2. The rationale explains why the marked correct option is WRONG.
3. The marked correct option is an obvious medical error per standard guidelines, even if the rationale tries to justify it poorly.

Do NOT flag minor typos. Do NOT flag questions just because the rationale is short. Be highly precise to avoid false positives.
"""

flagged_by_ai = []
output_file = "ai_audit_results.json"

# Process in batches to avoid rate limits
batch_size = 50
delay_between_requests = 4.5 # seconds (Free tier is 15 RPM for flash)

for i, q in enumerate(questions):
    prompt = f"""
{SYSTEM_PROMPT}

---
Question ID: {q['id']}
Stem: {q['stem']}
Options:
A: {q['option_a']}
B: {q['option_b']}
C: {q['option_c']}
D: {q['option_d']}

Marked Correct Option: {q['correct_option']}
Rationale: {q['rationale']}
"""
    try:
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json",
            )
        )
        
        result = json.loads(response.text)
        
        if result.get("is_contradiction") is True:
            print(f"🚨 FLAG: {q['id']} - {result.get('reason')}")
            flagged_by_ai.append({
                "id": q['id'],
                "stem": q['stem'],
                "db_correct": q['correct_option'],
                "rationale": q['rationale'],
                "ai_reason": result.get("reason"),
                "ai_suggested": result.get("suggested_correct_option")
            })
            
            # Save incrementally
            with open(output_file, "w", encoding="utf-8") as out_f:
                json.dump(flagged_by_ai, out_f, indent=2)
        else:
            if i % 10 == 0:
                print(f"Processed {i}/{len(questions)}... OK")
                
    except Exception as e:
        print(f"Error processing {q['id']}: {e}")
        time.sleep(10) # wait longer on error (e.g. rate limit)
        
    time.sleep(delay_between_requests)

print(f"\nAudit complete. Found {len(flagged_by_ai)} contradictions. Saved to {output_file}")
