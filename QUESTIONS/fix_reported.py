import urllib.request
import json
import urllib.error

SUPABASE_URL = "https://wnfbjyfenvdofvfcxnzk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZmJqeWZlbnZkb2Z2ZmN4bnprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTU4MTYsImV4cCI6MjA5NDc3MTgxNn0.5D2bdWYi2KJ_nb1b44r28WaGZtCrbfT2yYL4bScZbr8"

def update_question(q_id, payload):
    url = f"{SUPABASE_URL}/rest/v1/questions?id=eq.{q_id}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="PATCH")
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status in [200, 204]:
                print(f"Successfully updated question {q_id}")
            else:
                print(f"Failed to update {q_id}: {response.read().decode()}")
    except urllib.error.URLError as e:
        print(f"Error updating {q_id}: {e}")

# Fix Q1
q1_payload = {
    "correct_option": "B",
    "rationale": "Per Kenya MoH/WHO ETAT (Emergency Triage Assessment and Treatment) for paediatrics - EMERGENCY SIGNS require IMMEDIATE intervention: obstructed/absent BREATHING, severe respiratory DISTRESS, central CYANOSIS, shock, COMA/convulsing now (CONVULSIONS), severe DEHYDRATION. PRIORITY SIGNS - need urgent attention: Tiny baby (<2 months), Temperature very high, Trauma/urgent surgical, Pallor (severe), Poisoning, Pain (severe), Respiratory distress, Restless/irritable/lethargic, Referral, Malnutrition, Oedema (of both feet), Burns. Option B - pallor + pain + bilateral foot oedema - are all PRIORITY signs."
}
update_question("ca7c04c0-64c1-46df-bab8-e4cf7a8163db", q1_payload)

# Fix Q2
q2_payload = {
    "correct_option": "C",
    "rationale": "Megaloblastic anaemia results from folate or vitamin B12 deficiency. Vitamin B12 is found almost exclusively in animal products (meat, eggs, dairy, fish), while folate is highly abundant in legumes (beans, peas). A diet relying exclusively on capsicum, sorghum and millet (Option C) lacks both animal protein (B12) AND legumes (folate), carrying the highest risk for megaloblastic anaemia. Option B is protective against folate deficiency. Options A and D include meat/eggs so are protective against B12 deficiency."
}
update_question("b5b0fb35-88c2-4d3c-b155-0737d5803844", q2_payload)

