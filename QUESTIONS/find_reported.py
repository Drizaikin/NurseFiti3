import json

with open("all_db_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

print("Looking for question 1...")
for q in questions:
    if "priority signs include:" in q.get('stem', '') or "ETAT" in q.get('rationale', ''):
        print("FOUND Q1:")
        print("ID:", q['id'])
        print("Stem:", q['stem'])
        print("Options: A", q['option_a'], "B", q['option_b'], "C", q['option_c'], "D", q['option_d'])
        print("Correct:", q['correct_option'])
        print("Rationale:", q['rationale'])
        print("-" * 50)

print("Looking for question 2...")
for q in questions:
    if "megaloblastic anaemia if taken exclusively" in q.get('stem', ''):
        print("FOUND Q2:")
        print("ID:", q['id'])
        print("Stem:", q['stem'])
        print("Options: A", q['option_a'], "B", q['option_b'], "C", q['option_c'], "D", q['option_d'])
        print("Correct:", q['correct_option'])
        print("Rationale:", q['rationale'])
        print("-" * 50)
