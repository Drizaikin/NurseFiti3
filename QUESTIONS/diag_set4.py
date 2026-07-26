import subprocess, sys
try:
    from docx import Document
    from docx.oxml.ns import qn
except ImportError:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'python-docx'])
    from docx import Document
    from docx.oxml.ns import qn

doc = Document(r'C:\Users\User\Desktop\NurseFiti\NurseFiti3\QUESTIONS\NCK_MCQ_Compilation_Set4_Answers_Rationales.docx')

print("=== Detailed run inspection for paragraphs 20-45 ===")
for i, para in enumerate(doc.paragraphs[20:45], 20):
    text = para.text.strip()
    if not text:
        continue
    print(f"\n[Para {i}] style={para.style.name!r} | text={text[:70]!r}")
    for j, run in enumerate(para.runs):
        if not run.text.strip():
            continue
        bold = run.bold
        try:
            rgb = run.font.color.rgb
        except:
            rgb = "ERROR"
        try:
            color_type = run.font.color.type
        except:
            color_type = "ERROR"
        # Also check raw XML for color
        rpr = run._r.find(qn('w:rPr'))
        color_xml = ""
        if rpr is not None:
            color_el = rpr.find(qn('w:color'))
            if color_el is not None:
                color_xml = color_el.attrib
        print(f"  run[{j}] bold={bold} rgb={rgb} type={color_type} xml_color={color_xml} | {run.text[:50]!r}")
