import zipfile
import xml.etree.ElementTree as ET
import json
import re

def parse_docx_xml(docx_path):
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    paragraphs = []
    for p in tree.findall('.//w:p', ns):
        text_content = ""
        for r in p.findall('.//w:r', ns):
            t_element = r.find('.//w:t', ns)
            if t_element is not None and t_element.text:
                text_content += t_element.text
        text_content = text_content.strip()
        if text_content:
            paragraphs.append(text_content)
    return paragraphs

def build_questions(paragraphs):
    questions = []
    current_q = None
    for text in paragraphs:
        if re.match(r'^Q\d+\.', text) or re.match(r'^\d+\.', text):
            if current_q:
                questions.append(current_q)
            current_q = {
                'question_text': text,
                'options': [],
                'answer': '',
                'rationale': '',
                'source': ''
            }
            continue
            
        if current_q:
            if re.match(r'^[A-Ea-e][\.\)]\s', text):
                current_q['options'].append(text)
            elif text.lower().startswith('answer:'):
                current_q['answer'] = text
            elif text.lower().startswith('rationale:'):
                current_q['rationale'] = text
            elif text.startswith('[Source paper:'):
                current_q['source'] = text
            elif not current_q['options'] and not current_q['answer']:
                current_q['question_text'] += ' ' + text
            elif current_q['rationale'] and not current_q['source']:
                current_q['rationale'] += ' ' + text
                
    if current_q:
        questions.append(current_q)
    return questions

if __name__ == '__main__':
    paras = parse_docx_xml('NCK_MCQ_Compilation_Answers_Rationales.docx')
    qs = build_questions(paras)
    with open('questions_extracted.json', 'w', encoding='utf-8') as f:
        json.dump(qs, f, indent=2)
    print(f"Extracted {len(qs)} questions.")
