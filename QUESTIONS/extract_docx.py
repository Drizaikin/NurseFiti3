import sys
import subprocess

try:
    import docx
except ImportError:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'python-docx'])
    import docx

doc = docx.Document(r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\QUESTIONS\NCK_MCQ_Compilation_Set3_Answers_Rationales.docx')
with open(r'c:\Users\rizik\Desktop\NurseFiti\NurseFiti3\QUESTIONS\set3_extracted.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join([p.text for p in doc.paragraphs]))
print('Extraction complete')
