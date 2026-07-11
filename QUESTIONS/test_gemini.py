import os
import time
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv('../.env.local')
genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

try:
    start = time.time()
    for i in range(5):
        res = model.generate_content(f"What is 2+{i}? Just answer the number.")
        print(f"Req {i}: {res.text.strip()}")
    print(f"Time taken: {time.time() - start:.2f}s")
except Exception as e:
    print(f"Error: {e}")
