import os
import re
import subprocess
import sys

try:
    from docx import Document
except ImportError:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'python-docx'])
    from docx import Document

DOCX_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "NCK_MCQ_Compilation_Set4_Answers_Rationales.docx")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "supabase", "migrations")
BATCH_SIZE = 500

RED_COLORS = {"C00000", "FF0000", "FF3333", "CC0000"}


def is_red_run(run):
    """Check if a run has red color."""
    try:
        rgb = run.font.color.rgb
        if rgb and str(rgb).upper() in RED_COLORS:
            return True
    except Exception:
        pass
    return False


def get_para_style_name(para):
    """Safely get paragraph style name, handling python-docx enum bugs on Python 3.14."""
    try:
        if para.style:
            return para.style.name
    except Exception:
        pass
    # Fallback: read the style name directly from XML
    try:
        pPr = para._p.pPr
        if pPr is not None:
            pStyle = pPr.find(
                '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pStyle'
            )
            if pStyle is not None:
                val = pStyle.get(
                    '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val'
                )
                if val:
                    return val
    except Exception:
        pass
    return ""


def extract_paragraphs(docx_path):
    doc = Document(docx_path)
    result = []
    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue
        # Bold: ALL non-empty runs are bold
        is_bold = bool(para.runs) and all(r.bold for r in para.runs if r.text.strip())
        # Red: ANY run has a red color
        is_red = any(is_red_run(r) for r in para.runs if r.text.strip())
        # Bold-red: the paragraph has both bold AND red runs (for correct option detection)
        has_bold_red_run = any(r.bold and is_red_run(r) for r in para.runs if r.text.strip())
        result.append({
            "text": text,
            "bold": is_bold,
            "red": is_red,
            "has_bold_red_run": has_bold_red_run,
            "style": get_para_style_name(para),
        })
    return result


UNIT_KW_MAP = [
    ('midwif',       ("Midwifery", "Midwifery")),
    ('obstetric',    ("Midwifery", "Obstetrics")),
    ('labour',       ("Midwifery", "Labour & Delivery")),
    ('antenatal',    ("Midwifery", "Antenatal Care")),
    ('postnatal',    ("Midwifery", "Postnatal Care")),
    ('maternal',     ("Midwifery", "Midwifery")),
    ('paediatric',   ("Paediatric Nursing", "Paediatrics")),
    ('pediatric',    ("Paediatric Nursing", "Paediatrics")),
    ('neonatal',     ("Paediatric Nursing", "Neonatology")),
    ('child health', ("Paediatric Nursing", "Child Health")),
    ('community',    ("Community Health Nursing", "Community Health")),
    ('immunol',      ("Community Health Nursing", "Immunology")),
    ('immuniz',      ("Community Health Nursing", "Immunization")),
    ('vaccin',       ("Community Health Nursing", "Vaccination")),
    ('epidemiol',    ("Community Health Nursing", "Epidemiology")),
    ('mental',       ("Mental Health Nursing", "Mental Health")),
    ('psychiatr',    ("Mental Health Nursing", "Psychiatry")),
    ('pharmacol',    ("Pharmacology", "Pharmacology")),
    ('health system',("Nursing Management & Leadership", "Health Systems")),
    ('management',   ("Nursing Management & Leadership", "Management")),
    ('leadership',   ("Nursing Management & Leadership", "Leadership")),
    ('anatomy',      ("Medical-Surgical Nursing", "Anatomy & Physiology")),
    ('physiology',   ("Medical-Surgical Nursing", "Anatomy & Physiology")),
    ('infection',    ("Infection Prevention & Control", "IPC")),
    ('steriliz',     ("Infection Prevention & Control", "IPC")),
    ('research',     ("Research & Evidence-Based Practice", "Research")),
    ('surgical',     ("Medical-Surgical Nursing", "Surgical Nursing")),
]


def get_unit_topic(section, stem=""):
    combined = (section + " " + stem).lower()
    for kw, val in UNIT_KW_MAP:
        if kw in combined:
            return val
    return ("Medical-Surgical Nursing", "General")


def esc(s):
    return str(s).replace("'", "''")


def parse_questions(paragraphs):
    """
    Parser based on confirmed Set 4 structure:
      - Heading: 'Heading' in style OR (bold, no digit/letter prefix)
      - Question: bold=True, red=False, starts with digit+punct
      - Wrong option: bold=None/False, red=False, starts with A-D + punct
      - CORRECT option: has_bold_red_run=True, starts with A-D + punct
      - Answer line: starts with "Answer:" — use to confirm/set answer if option wasn't caught
      - Rationale: starts with "Rationale:" (mixed bold+plain runs on same paragraph)
    """
    questions = []
    current_cadre = "BScN"
    current_paper = "Paper I"
    current_section = "General"
    q = None

    for p in paragraphs:
        text = p["text"]
        bold = p["bold"]
        red = p["red"]
        has_bold_red = p["has_bold_red_run"]
        style = p.get("style", "")
        upper = text.upper()

        # --- Skip "Answer: X. ..." confirmation lines but use them as fallback ---
        answer_confirm = re.match(r'^Answer\s*:\s*([A-D])[.)]\s*(.*)', text, re.IGNORECASE)
        if answer_confirm and q:
            if not q["answer"]:  # fallback if option line wasn't caught
                q["answer"] = answer_confirm.group(1).upper()
            continue

        # --- Rationale line (starts with "Rationale:") ---
        rat_match = re.match(r'^Rationale\s*:\s*(.*)', text, re.IGNORECASE)
        if rat_match and q:
            q["rationale"] = rat_match.group(1).strip()
            continue

        # --- Section/cadre/paper headings ---
        is_heading = ("Heading" in style or "heading" in style or "Title" in style)
        if not is_heading and bold and not red and not has_bold_red:
            if not re.match(r'^\d+[.)]\s', text) and not re.match(r'^[A-Da-d][.)]\s', text):
                is_heading = True

        if is_heading:
            if "BSCN" in upper or "B.SC" in upper:
                current_cadre = "BScN"
            elif "KRCHN" in upper or "K.R.C" in upper:
                current_cadre = "KRCHN"
            if re.search(r'PAPER\s*II|PAPER\s*2\b', upper):
                current_paper = "Paper II"
            elif re.search(r'PAPER\s*I\b|PAPER\s*1\b', upper):
                current_paper = "Paper I"
            generic = {"NCK", "MCQ", "SET", "COMPILATION", "ANSWERS", "RATIONALE", "BSCN", "KRCHN", "PAPER"}
            if not any(g == upper.strip() for g in generic):
                current_section = text[:100]
            continue

        # --- Question stem: bold, not red, starts with number ---
        q_match = re.match(r'^(\d+)[.)\s]\s+(.*)', text)
        if q_match and bold and not red and not has_bold_red:
            if q:
                questions.append(q)
            q = {
                "stem": q_match.group(2).strip(),
                "options": [],
                "answer": None,
                "rationale": "",
                "cadre": current_cadre,
                "paper": current_paper,
                "section": current_section,
            }
            continue

        # --- Options: start with A-D + punct ---
        opt_match = re.match(r'^([A-Da-d])[.)\s]\s+(.*)', text)
        if opt_match and q:
            letter = opt_match.group(1).upper()
            option_text = opt_match.group(2).strip()
            q["options"].append(option_text)
            if has_bold_red:  # This is the correct answer
                q["answer"] = letter
            continue

    if q:
        questions.append(q)

    return questions


def build_insert(q):
    opts = q["options"][:]
    while len(opts) < 4:
        opts.append("")
    unit, topic = get_unit_topic(q["section"], q["stem"])
    rationale = q["rationale"].strip() if q["rationale"].strip() else f"See {unit} nursing references."
    return (
        f"INSERT INTO questions "
        f"(stem, option_a, option_b, option_c, option_d, correct_option, "
        f"rationale, cadre, paper, unit, topic, difficulty, status) VALUES ("
        f"'{esc(q['stem'])}', '{esc(opts[0])}', '{esc(opts[1])}', "
        f"'{esc(opts[2])}', '{esc(opts[3])}', '{q['answer']}', "
        f"'{esc(rationale)}', '{q['cadre']}', '{q['paper']}', "
        f"'{esc(unit)}', '{esc(topic)}', 'medium', 'approved') "
        f"ON CONFLICT (stem, cadre) DO NOTHING;"
    )


def write_migrations(questions, output_dir, base_timestamp="20260724"):
    os.makedirs(output_dir, exist_ok=True)
    valid = [q for q in questions if q["answer"] and len(q["options"]) >= 4]
    skipped = len(questions) - len(valid)
    print(f"Total parsed:         {len(questions)}")
    print(f"Valid (complete):     {len(valid)}")
    print(f"Skipped (incomplete): {skipped}")

    batch_num = 0
    for i in range(0, len(valid), BATCH_SIZE):
        batch = valid[i:i + BATCH_SIZE]
        batch_num += 1
        filename = f"{base_timestamp}{batch_num:06d}_seed_mcq_compilation_set4_batch{batch_num}.sql"
        filepath = os.path.join(output_dir, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"-- NCK MCQ Compilation Set 4 -- Batch {batch_num}\n")
            f.write(f"-- Questions {i + 1} to {i + len(batch)} of {len(valid)}\n")
            f.write("-- ON CONFLICT (stem, cadre) DO NOTHING ensures safe re-runs.\n\n")
            for q_item in batch:
                f.write(build_insert(q_item) + "\n")
        print(f"  Written: {filename}  ({len(batch)} inserts)")

    print(f"\nDone. {batch_num} migration file(s) written to:\n  {output_dir}")
    return valid


if __name__ == "__main__":
    print(f"Reading: {DOCX_PATH}\n")
    paras = extract_paragraphs(DOCX_PATH)
    print(f"Paragraphs extracted: {len(paras)}\n")

    questions = parse_questions(paras)

    print(f"Questions parsed: {len(questions)}\n")
    for i, qx in enumerate(questions[:5]):
        print(f"--- Q{i+1} ---")
        print(f"  Stem:      {qx['stem'][:80]}")
        print(f"  Options:   {qx['options']}")
        print(f"  Answer:    {qx['answer']}")
        print(f"  Rationale: {(qx['rationale'] or 'EMPTY')[:80]}")
        print(f"  Cadre/Paper: {qx['cadre']} / {qx['paper']}")
        print()

    write_migrations(questions, os.path.abspath(OUTPUT_DIR))
