import os
import json
import glob
from fpdf import FPDF

# Absolute paths based on script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)

# Course ID to Name mapping
course_names = {
    'efa': 'Elementary First Aid (EFA)',
    'fpff': 'Fire Prevention & Fire Fighting (FPFF)',
    'pst': 'Personal Survival Techniques (PST)',
    'pssr': 'Personal Safety & Social Responsibilities (PSSR)',
    'stsdsd': 'Security Training for Seafarers (STSDSD)',
    'aff': 'Advanced Fire Fighting (AFF)',
    'pscrb': 'PSCRB (Proficiency in Survival Craft and Rescue Boats)',
    'mfa': 'Medical First Aid (MFA)',
    'tasco': 'Advanced Training for Oil Tanker Cargo Operations (TASCO)',
    'refresher': 'Refresher Course',
    'gsk': 'General Ship Knowledge (GSK)',
    'mek': 'Marine Engineering Knowledge (MEK)'
}

def clean_text(text):
    if not text:
        return ""
    replacements = {
        '\u2013': '-', # en dash
        '\u2014': '-', # em dash
        '\u2018': "'", # left single quote
        '\u2019': "'", # right single quote
        '\u201c': '"', # left double quote
        '\u201d': '"', # right double quote
        '\u2022': '*', # bullet point
        '\u00b0': ' degrees', # degree sign
        '\u25cf': '*', # block circle
        '\uff0c': ',', # fullwidth comma
        '\u200b': '',  # zero-width space
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    }
    for orig, rep in replacements.items():
        text = text.replace(orig, rep)
    return text.encode('latin-1', 'replace').decode('latin-1')

def format_option_text(opt):
    opt_id = opt['id']
    text = opt['text'].strip()
    
    prefixes_to_strip = [
        f"{opt_id})",
        f"{opt_id}.",
        f"{opt_id} -",
        f"{opt_id} "
    ]
    
    for prefix in prefixes_to_strip:
        if text.upper().startswith(prefix.upper()):
            text = text[len(prefix):].strip()
            break
            
    return text

class MaritimePDF(FPDF):
    def __init__(self, course_title):
        super().__init__()
        self.course_title = course_title
        # Set margins: Left=10mm, Top=30mm, Right=10mm
        self.set_margins(10, 30, 10)

    def header(self):
        # Draw logo image (apple-touch-icon.png)
        # Position: top-right of page, x = 185, y = 8, width = 14, height = 14
        # Link: https://brightmariner.com
        logo_path = os.path.join(REPO_ROOT, 'public/apple-touch-icon.png')
        if os.path.exists(logo_path):
            self.image(logo_path, x=185, y=8, w=14, h=14, link="https://brightmariner.com")
            
        # Draw header text and link
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(100, 100, 100)
        
        # Left-aligned header text
        self.set_xy(10, 11)
        self.cell(0, 8, clean_text(f'{self.course_title} Exit Exam Prep'), align='L')
        
        # Right-aligned site link (clickable)
        self.set_xy(10, 11)
        self.set_font('Helvetica', 'B', 8)
        self.set_text_color(26, 54, 93) # primary blue
        self.cell(172, 8, 'brightmariner.com', align='R', link="https://brightmariner.com")
        
        # Header line below text and logo
        self.line(10, 24, 200, 24)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(100, 100, 100)
        self.line(10, 282, 200, 282)
        
        # Right-aligned page number
        self.cell(0, 10, f'Page {self.page_no()}', align='R')
        
        # Left-aligned clickable site domain and watermark
        self.set_x(10)
        self.set_text_color(26, 54, 93)
        self.set_font('Helvetica', 'B', 8)
        self.cell(0, 10, 'brightmariner.com', link="https://brightmariner.com", align='L')
        
        self.set_x(38)
        self.set_font('Helvetica', '', 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, '| Free STCW MCQ Practice Platform', align='L')

def generate_pdf(course_id):
    # Fetch course full name
    course_name = course_names.get(course_id, course_id.upper())
    
    # Load all questions for this course
    questions_path = os.path.join(REPO_ROOT, f'src/content/questions/{course_id}/**/*.json')
    question_files = glob.glob(questions_path, recursive=True)
    questions = []
    
    for f in question_files:
        with open(f, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
            questions.append(data)
            
    if not questions:
        print(f"Skipping {course_id}: no questions found.")
        return
        
    # Sort questions by set and question number
    def get_sort_key(q):
        parts = q['id'].split('-')
        set_num = 1
        q_num = 1
        for p in parts:
            if p.startswith('s') and p[1:].isdigit():
                set_num = int(p[1:])
            elif p.startswith('q') and p[1:].isdigit():
                q_num = int(p[1:])
        return (set_num, q_num)
        
    questions.sort(key=get_sort_key)
    questions = questions[:30]
    
    pdf = MaritimePDF(course_name)
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()
    
    # Title / Header
    pdf.set_font('Helvetica', 'B', 18)
    pdf.set_text_color(26, 54, 93) # primary blue
    pdf.cell(0, 15, clean_text(f'{course_name} Exit Exam Questions & Answers PDF'), new_x="LMARGIN", new_y="NEXT", align='C')
    
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(74, 85, 104)
    pdf.cell(0, 8, clean_text(course_name), new_x="LMARGIN", new_y="NEXT", align='C')
    pdf.cell(0, 8, clean_text(f'{len(questions)} Practice Questions and Answers for STCW Exams'), new_x="LMARGIN", new_y="NEXT", align='C')
    
    pdf.set_font('Helvetica', 'I', 10)
    pdf.set_text_color(113, 128, 150)
    pdf.cell(0, 10, clean_text('Updated for DG Shipping India Exams | Source: brightmariner.com'), new_x="LMARGIN", new_y="NEXT", align='C')
    pdf.ln(2)
    
    # Draw line dynamically at current Y
    line_y = pdf.get_y()
    pdf.line(10, line_y, 200, line_y)
    pdf.ln(5)
    
    current_set = None
    
    for idx, q in enumerate(questions):
        set_num, q_num = get_sort_key(q)
        if current_set != set_num:
            current_set = set_num
            pdf.ln(5)
            pdf.set_font('Helvetica', 'B', 14)
            pdf.set_text_color(45, 55, 72)
            pdf.cell(0, 10, clean_text(f'Practice Set {set_num}'), new_x="LMARGIN", new_y="NEXT", align='L')
            pdf.line(10, pdf.get_y(), 60, pdf.get_y())
            pdf.ln(4)
            
        # Prevent orphans
        if pdf.get_y() > 240:
            pdf.add_page()
            
        pdf.set_x(10)
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(26, 32, 44)
        
        # Question header
        pdf.multi_cell(0, 6, clean_text(f"Q{q_num}. {q['text']}"), align='L')
        pdf.ln(1.5)
        
        # Options
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(74, 85, 104)
        
        correct_txt = ""
        for opt in q['options']:
            cleaned_opt_text = format_option_text(opt)
            pdf.set_x(10)
            pdf.multi_cell(0, 5.5, clean_text(f"   {opt['id']}) {cleaned_opt_text}"), align='L')
            if opt['id'] == q['correctOptionId']:
                correct_txt = cleaned_opt_text
            
        pdf.ln(1.5)
        
        # Correct answer
        pdf.set_x(10)
        pdf.set_font('Helvetica', 'B', 10)
        pdf.set_text_color(34, 139, 34) # forest green
        pdf.cell(0, 6, clean_text(f"   Correct Answer: {q['correctOptionId']} ({correct_txt})"), new_x="LMARGIN", new_y="NEXT", align='L')
        
        # Explanation
        if q.get('explanation') and q['explanation'].strip():
            pdf.set_x(10)
            pdf.set_font('Helvetica', 'I', 9)
            pdf.set_text_color(113, 128, 150)
            pdf.multi_cell(0, 5, clean_text(f"   Explanation: {q['explanation'].strip()}"), align='L')
            
        pdf.ln(5)
        
    output_dir = os.path.join(REPO_ROOT, 'public')
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, f'{course_id}-exit-exam-questions-answers.pdf')
    pdf.output(output_path)
    print(f"PDF successfully generated for {course_id} at: {output_path}")

import sys

def main():
    # To prevent updates to the downloadable PDF files, generation is disabled by default.
    # To force regeneration, run: python3 scripts/generate-all-pdfs.py --force
    if '--force' not in sys.argv:
        print("PDF generation is disabled by default to keep the 30-question download PDFs static.")
        print("To override and regenerate all PDFs, run with: python3 scripts/generate-all-pdfs.py --force")
        sys.exit(0)

    for course_id in course_names.keys():
        generate_pdf(course_id)

if __name__ == '__main__':
    main()
