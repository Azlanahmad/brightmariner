import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.join(__dirname, '../src/content/questions');

function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            if (file.endsWith('.json')) results.push(file);
        }
    });
    return results;
}

const allFiles = getFiles(questionsDir);
console.log(`Found ${allFiles.length} question files.`);

allFiles.forEach(filePath => {
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const { courseId, set } = content;
        
        if (!courseId) {
            console.warn(`Skipping ${path.basename(filePath)}: No courseId found.`);
            return;
        }

        const setNum = set || 1;
        const targetDir = path.join(questionsDir, courseId, `set-${setNum}`);
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Extract question number from current ID or filename
        // current id format: e.g., "aff-s1-q1"
        const idMatch = content.id.match(/q(\d+)$/);
        let qNum = idMatch ? parseInt(idMatch[1]) : 0;
        
        if (qNum === 0) {
            const fileMatch = path.basename(filePath).match(/q(\d+)/);
            qNum = fileMatch ? parseInt(fileMatch[1]) : 0;
        }

        const paddedNum = String(qNum).padStart(3, '0');
        const targetFile = path.join(targetDir, `q${paddedNum}.json`);

        // Only move if the path is different
        if (filePath !== targetFile) {
            console.log(`Moving: ${path.relative(questionsDir, filePath)} -> ${path.relative(questionsDir, targetFile)}`);
            fs.renameSync(filePath, targetFile);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
    }
});

// Cleanup empty directories (optional)
function cleanup(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            cleanup(fullPath);
            if (fs.readdirSync(fullPath).length === 0) {
                console.log(`Removing empty directory: ${path.relative(questionsDir, fullPath)}`);
                fs.rmdirSync(fullPath);
            }
        }
    });
}

// Don't cleanup the root questionsDir
cleanup(questionsDir);

console.log('Reorganization complete.');
