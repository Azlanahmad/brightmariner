import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.join(__dirname, '../src/content/questions');
const gskPath = '/Users/macbookpro2015retina/Downloads/gsk_mcqs_all_15_parts.txt';
const mekPath = '/Users/macbookpro2015retina/Downloads/mek.txt';

function cleanOptionText(id, text) {
    let clean = text.trim();
    const prefixes = [
        `${id})`,
        `${id}.`,
        `${id} -`,
        `${id} `
    ];
    for (const prefix of prefixes) {
        if (clean.toUpperCase().startsWith(prefix)) {
            clean = clean.substring(prefix.length).trim();
            break;
        }
    }
    return clean;
}

function parseQuestions(fileContent, courseId) {
    const lines = fileContent.split(/\r?\n/);
    const sections = [];
    let currentSectionNum = 0;
    let currentSectionQuestions = [];
    
    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();
        
        // Skip summary table in GSK
        if (line.includes('|')) {
            i++;
            continue;
        }
        
        // Check for section header
        let sectionMatch = null;
        if (courseId === 'gsk') {
            sectionMatch = line.match(/^chapter\s+(\d+)\b/i);
        } else if (courseId === 'mek') {
            sectionMatch = line.match(/^Part\s+(\d+)\b/i);
        }
        
        if (sectionMatch) {
            if (currentSectionNum > 0 && currentSectionQuestions.length > 0) {
                sections.push({
                    number: currentSectionNum,
                    questions: currentSectionQuestions
                });
            }
            currentSectionNum = parseInt(sectionMatch[1]);
            currentSectionQuestions = [];
            i++;
            continue;
        }
        
        // Check for question start
        let qMatch = line.match(/^(\d+)\.\s+(.+)$/);
        if (qMatch) {
            const qNum = parseInt(qMatch[1]);
            let qText = qMatch[2].trim();
            
            let options = [];
            let correctOptionId = '';
            
            i++;
            while (i < lines.length) {
                const nextLine = lines[i].trim();
                
                // If we hit another question, section, or delimiter, stop
                if (nextLine.match(/^(\d+)\.\s+/) || 
                    (courseId === 'gsk' && nextLine.match(/^chapter\s+(\d+)/i) && !nextLine.includes('|')) ||
                    (courseId === 'mek' && nextLine.match(/^Part\s+(\d+)/i)) ||
                    nextLine.startsWith('====') ||
                    nextLine.startsWith('----')) {
                    i--;
                    break;
                }
                
                // Check for option
                let optMatch = nextLine.match(/^([A-D])\)\s*(.*)$/i) || nextLine.match(/^([A-D])\.\s*(.*)$/i);
                if (optMatch && !nextLine.toLowerCase().startsWith('correct answer')) {
                    const optId = optMatch[1].toUpperCase();
                    options.push({
                        id: optId,
                        text: cleanOptionText(optId, optMatch[2])
                    });
                }
                
                // Check for correct answer
                let ansMatch = nextLine.match(/correct answer:\s*([A-D])/i);
                if (ansMatch) {
                    correctOptionId = ansMatch[1].toUpperCase();
                }
                
                i++;
            }
            
            if (qText && options.length >= 2 && correctOptionId) {
                currentSectionQuestions.push({
                    text: qText,
                    options,
                    correctOptionId
                });
            } else {
                console.log(`Warning: failed to parse question ${qNum} in section ${currentSectionNum}: qText="${qText}", options count=${options.length}, correctOptionId="${correctOptionId}"`);
            }
        }
        
        i++;
    }
    
    if (currentSectionNum > 0 && currentSectionQuestions.length > 0) {
        sections.push({
            number: currentSectionNum,
            questions: currentSectionQuestions
        });
    }
    
    return sections;
}

function writeQuestions(sections, courseId) {
    let count = 0;
    sections.forEach(sec => {
        const setNum = sec.number;
        const targetDir = path.join(questionsDir, courseId, `set-${setNum}`);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        sec.questions.forEach((q, idx) => {
            const qNum = idx + 1;
            const paddedNum = String(qNum).padStart(3, '0');
            const targetFile = path.join(targetDir, `q${paddedNum}.json`);
            
            const questionData = {
                id: `${courseId}-s${setNum}-q${qNum}`,
                text: q.text,
                options: q.options,
                correctOptionId: q.correctOptionId,
                courseId: courseId,
                set: setNum,
                explanation: ""
            };
            
            fs.writeFileSync(targetFile, JSON.stringify(questionData, null, 2));
            count++;
        });
    });
    console.log(`Successfully wrote ${count} questions to src/content/questions/${courseId}/`);
}

function main() {
    if (fs.existsSync(gskPath)) {
        const gskContent = fs.readFileSync(gskPath, 'utf-8');
        const gskSections = parseQuestions(gskContent, 'gsk');
        writeQuestions(gskSections, 'gsk');
    } else {
        console.error('GSK file not found at:', gskPath);
    }
    
    if (fs.existsSync(mekPath)) {
        const mekContent = fs.readFileSync(mekPath, 'utf-8');
        const mekSections = parseQuestions(mekContent, 'mek');
        writeQuestions(mekSections, 'mek');
    } else {
        console.error('MEK file not found at:', mekPath);
    }
}

main();
