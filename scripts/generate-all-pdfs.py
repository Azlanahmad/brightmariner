import os
import json
import glob
from fpdf import FPDF

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
    'refresher': 'Refresher Course'
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

    def header(self):
        if self.page_no() > 1:
            self.set_font('Helvetica', 'I', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 10, f'{self.course_title} Exit Exam Questions & Answers - Bright Mariner', new_x="LMARGIN", new_y="NEXT", align='L')
            self.line(10, 17, 200, 17)
            self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(100, 100, 100)
        self.line(10, 282, 200, 282)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

def generate_pdf(course_id):
    # Fetch course full name
    course_name = course_names.get(course_id, course_id.upper())
    
    # Load all questions for this course
    question_files = glob.glob(f'brightmariner/src/content/questions/{course_id}/**/*.json', recursive=True)
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
    pdf.cell(0, 10, clean_text('Updated for DG Shipping India (Ship 07 Portal) | Source: brightmariner.com'), new_x="LMARGIN", new_y="NEXT", align='C')
    pdf.ln(10)
    
    pdf.line(10, 55, 200, 55)
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
        
    output_dir = 'brightmariner/public'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, f'{course_id}-exit-exam-questions-answers.pdf')
    pdf.output(output_path)
    print(f"PDF successfully generated for {course_id} at: {output_path}")

def main():
    for course_id in course_names.keys():
        generate_pdf(course_id)

if __name__ == '__main__':
    main()
