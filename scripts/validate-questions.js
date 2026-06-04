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
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath));
        } else if (file.endsWith('.json')) {
            results.push(fullPath);
        }
    });
    return results;
}

const allFiles = getFiles(questionsDir);
console.log(`Validating ${allFiles.length} questions...\n`);

let errors = 0;
let warnings = 0;
const ids = new Set();

allFiles.forEach(filePath => {
    const relativePath = path.relative(questionsDir, filePath);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const { id, text, options, correctOptionId, courseId, set } = content;

        // Check required fields
        const required = ['id', 'text', 'options', 'correctOptionId', 'courseId'];
        required.forEach(field => {
            if (!content[field]) {
                console.error(`[ERROR] ${relativePath}: Missing required field "${field}"`);
                errors++;
            }
        });

        if (!id) return; // Can't continue checking without ID

        // Check for duplicate IDs
        if (ids.has(id)) {
            console.error(`[ERROR] ${relativePath}: Duplicate ID "${id}" detected.`);
            errors++;
        }
        ids.add(id);

        // Check options
        if (options && Array.isArray(options)) {
            if (options.length < 2) {
                console.error(`[ERROR] ${relativePath}: Too few options (${options.length}).`);
                errors++;
            }

            const optionIds = options.map(o => o.id);
            if (!optionIds.includes(correctOptionId)) {
                console.error(`[ERROR] ${relativePath}: correctOptionId "${correctOptionId}" not found in options [${optionIds.join(', ')}].`);
                errors++;
            }
            
            // Check for empty option text
            options.forEach(opt => {
                if (!opt.text || opt.text.trim() === '') {
                    console.error(`[ERROR] ${relativePath}: Option "${opt.id}" has empty text.`);
                    errors++;
                }
            });
        }

        // Check directory consistency
        const pathParts = relativePath.split(path.sep);
        // Path should be {courseId}/set-{setNum}/q{num}.json
        if (pathParts.length === 3) {
            const dirCourseId = pathParts[0];
            const dirSetName = pathParts[1];
            
            if (dirCourseId !== courseId) {
                console.warn(`[WARN] ${relativePath}: Folder "${dirCourseId}" does not match courseId "${courseId}"`);
                warnings++;
            }
            
            if (dirSetName !== `set-${set}`) {
                console.warn(`[WARN] ${relativePath}: Folder "${dirSetName}" does not match set "${set}"`);
                warnings++;
            }
        }

        // Check for missing explanation
        if (!content.explanation) {
            // This is just a warning as it's optional in schema
            // console.warn(`[WARN] ${relativePath}: Missing explanation.`);
            // warnings++;
        }

    } catch (err) {
        console.error(`[ERROR] ${relativePath}: Invalid JSON format - ${err.message}`);
        errors++;
    }
});

console.log(`\nValidation complete: ${errors} errors, ${warnings} warnings.`);
if (errors > 0) {
    process.exit(1);
}
