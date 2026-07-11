import os
import requests
import json
from dotenv import load_dotenv

load_dotenv('../.env.local')
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key={GEMINI_API_KEY}"
payload = {
    "contents": [{"role": "user", "parts": [{"text": "Respond with JSON: {'test': 'ok'}"}]}],
    "generationConfig": {"responseMimeType": "application/json"}
}

resp = requests.post(url, json=payload)
print(f"Status: {resp.status_code}")
if resp.status_code != 200:
    print(resp.text)
else:
    print(resp.json())
