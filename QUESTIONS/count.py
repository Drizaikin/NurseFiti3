import os
from dotenv import load_dotenv
from supabase import create_client
from collections import Counter

load_dotenv(dotenv_path='../.env.local')
supabase = create_client(os.environ.get('NEXT_PUBLIC_SUPABASE_URL'), os.environ.get('SUPABASE_SERVICE_ROLE_KEY'))
offset = 0
limit = 1000
all_data = []
while True:
    res = supabase.table('questions').select('cadre,paper').range(offset, offset + limit - 1).execute()
    if not res.data:
        break
    all_data.extend(res.data)
    offset += limit

counts = Counter([f"{r.get('cadre')} - {r.get('paper')}" for r in all_data])
for k, v in counts.items():
    print(f"{k}: {v}")
print(f"Total: {sum(counts.values())}")
