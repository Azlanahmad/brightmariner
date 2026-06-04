import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.join(__dirname, '../src/content/questions');
const importFile = process.argv[2] || path.join(__dirname, '../mcq-import.csv');

if (!fs.existsSync(importFile)) {
    console.error(`Import file not found: ${importFile}`);
    console.log('\nUsage: npm run mcq:import [path/to/file.csv]');
    console.log('Expected CSV columns: courseId, set, text, optionA, optionB, optionC, optionD, correct, explanation');
    process.exit(1);
}

const fileContent = fs.readFileSync(importFile, 'utf-8');
const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
});

console.log(`Found ${records.length} records in CSV. Starting import...\n`);

let imported = 0;
let skipped = 0;

records.forEach((row, index) => {
    try {
        const { courseId, set, text, optionA, optionB, optionC, optionD, correct, explanation } = row;

        if (!courseId || !text || !correct) {
            console.warn(`[SKIP] Row ${index + 2}: Missing required data (courseId, text, or correct).`);
            skipped++;
            return;
        }

        const setNum = parseInt(set) || 1;
        const targetDir = path.join(questionsDir, courseId, `set-${setNum}`);
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Generate ID and filename
        // Find the next available number in that directory to avoid overwriting
        const existingFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.json'));
        const nextNum = existingFiles.length + 1;
        const paddedNum = String(nextNum).padStart(3, '0');
        
        const qId = `${courseId}-s${setNum}-q${nextNum}`;
        const targetFile = path.join(targetDir, `q${paddedNum}.json`);

        const questionData = {
            id: qId,
            text,
            options: [
                { id: 'A', text: optionA },
                { id: 'B', text: optionB },
                { id: 'C', text: optionC },
                { id: 'D', text: optionD }
            ].filter(o => o.text), // Only include options that have text
            correctOptionId: correct.toUpperCase(),
            courseId,
            set: setNum,
            explanation: explanation || ""
        };

        fs.writeFileSync(targetFile, JSON.stringify(questionData, null, 2));
        console.log(`[OK] Imported: ${courseId} Set ${setNum} -> ${path.basename(targetFile)}`);
        imported++;

    } catch (err) {
        console.error(`[ERROR] Row ${index + 2}: ${err.message}`);
        skipped++;
    }
});

console.log(`\nImport complete: ${imported} imported, ${skipped} skipped.`);
console.log('Recommendation: Run "npm run mcq:validate" to verify the new questions.');
