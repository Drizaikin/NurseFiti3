import docx

def inspect_docx(file_path):
    doc = docx.Document(file_path)
    for i, para in enumerate(doc.paragraphs[:50]):
        text = para.text.strip()
        if not text: continue
        colors = []
        for run in para.runs:
            if run.font.color and run.font.color.rgb:
                colors.append(str(run.font.color.rgb))
            else:
                colors.append('None')
        print(f"P{i}: {text} [Colors: {colors}]")

if __name__ == '__main__':
    inspect_docx('NCK_MCQ_Compilation_Answers_Rationales.docx')
