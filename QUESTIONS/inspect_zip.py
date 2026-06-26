import zipfile
import xml.etree.ElementTree as ET
import re

def parse_docx_xml(docx_path):
    # Namespaces
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    }
    
    with zipfile.ZipFile(docx_path) as z:
        xml_content = z.read('word/document.xml')
        
    tree = ET.fromstring(xml_content)
    
    paragraphs = []
    
    for p in tree.findall('.//w:p', ns):
        text_content = ""
        is_red = False
        
        # Check all runs in the paragraph
        for r in p.findall('.//w:r', ns):
            # Check color in run properties
            color_element = r.find('.//w:rPr/w:color', ns)
            if color_element is not None:
                val = color_element.get(f"{{{ns['w']}}}val")
                if val and val.upper() in ['FF0000', 'RED']:
                    is_red = True
            
            # Extract text
            t_element = r.find('.//w:t', ns)
            if t_element is not None and t_element.text:
                text_content += t_element.text
                
        text_content = text_content.strip()
        if text_content:
            paragraphs.append({'text': text_content, 'is_red': is_red})
            
    return paragraphs

if __name__ == '__main__':
    paras = parse_docx_xml('NCK_MCQ_Compilation_Answers_Rationales.docx')
    for i, p in enumerate(paras[:50]):
        print(f"P{i}: [RED: {p['is_red']}] {p['text']}")
