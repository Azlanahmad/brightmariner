import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../src/content/posts');
const questionsDir = path.join(__dirname, '../src/content/questions');

if (!fs.existsSync(questionsDir)) {
    fs.mkdirSync(questionsDir, { recursive: true });
}

const files = fs.readdirSync(postsDir);

files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    
    // Extract courseId from filename (e.g., fpff-exit-exam-set-2.md -> fpff)
    const courseIdMatch = file.match(/^([a-z0-9]+)/);
    const courseId = courseIdMatch ? courseIdMatch[1] : 'unknown';
    
    // Extract set number
    const setMatch = file.match(/set-?(\d+)/i);
    const setNum = setMatch ? parseInt(setMatch[1]) : 1;

    // Regex to find question blocks
    // Pattern: <div id="q(\d+)" class="question-container.*?>\s*<h2>Question \d+: (.*?)</h2>\s*<ul class="answers">(.*?)</ul>
    const questionRegex = /<div id="q(\d+)" class="question-container.*?>\s*<h2>Question \d+: (.*?)<\/h2>\s*<ul class="answers">(.*?)<\/ul>/gs;
    
    let match;
    let questionsFound = 0;

    while ((match = questionRegex.exec(content)) !== null) {
        const qId = match[1];
        const qText = match[2].trim();
        const answersHtml = match[3];

        // Parse options
        const optionRegex = /<li><input type="radio" id=".*?" name=".*?"( data-correct="true")?><label for=".*?">(.*?)<\/label><\/li>/g;
        let optMatch;
        const options = [];
        let correctOptionId = '';
        let optIdx = 0;

        while ((optMatch = optionRegex.exec(answersHtml)) !== null) {
            const isCorrect = optMatch[1] !== undefined;
            const optText = optMatch[2].trim();
            const optId = String.fromCharCode(65 + optIdx); // A, B, C, D

            options.push({ id: optId, text: optText });
            if (isCorrect) correctOptionId = optId;
            optIdx++;
        }

        if (options.length > 0) {
            const questionData = {
                id: `${courseId}-s${setNum}-q${qId}`,
                text: qText,
                options,
                correctOptionId: correctOptionId || 'A', // Fallback
                courseId,
                set: setNum
            };

            const fileName = `${courseId}-s${setNum}-q${qId}.json`;
            fs.writeFileSync(path.join(questionsDir, fileName), JSON.stringify(questionData, null, 2));
            questionsFound++;
        }
    }

    if (questionsFound > 0) {
        console.log(`Extracted ${questionsFound} questions from ${file}`);
    }
});
