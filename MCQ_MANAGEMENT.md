# MCQ Management Guide: BrightMariner

This document serves as the official guide for managing, updating, and validating the Multiple Choice Questions (MCQ) on the BrightMariner website.

---

## 1. Directory Structure

Questions are stored as individual JSON files within the `src/content/questions/` directory. They are organized by Course ID and Set number to ensure scalability and easy navigation.

```text
src/content/questions/
├── [course-id]/          # e.g., efa, fpff, aff, tasco
│   ├── set-1/            # Questions grouped into practice sets
│   │   ├── q001.json     # Standardized naming (q + 3-digit padding)
│   │   ├── q002.json
│   │   └── ...
│   └── set-2/
```

---

## 2. JSON Data Schema

Each question file must follow this structure to be recognized by the Astro content loader and the `PracticeRoom` component.

```json
{
  "id": "course-s[set]-q[num]", // Unique identifier
  "text": "The question text content?",
  "options": [
    { "id": "A", "text": "Option A text" },
    { "id": "B", "text": "Option B text" },
    { "id": "C", "text": "Option C text" },
    { "id": "D", "text": "Option D text" }
  ],
  "correctOptionId": "B",       // Must match an ID in the options array
  "courseId": "course-id",      // Must match the parent folder name
  "set": 1,                     // Must match the set folder number
  "explanation": "Optional explanation for the correct answer."
}
```

---

## 3. How to Update MCQs

### Method A: Bulk Import via CSV (Recommended)
This is the fastest way to add new questions.

1.  **Prepare CSV:** Create a CSV file (refer to `mcq-import-sample.csv`) with the following headers:
    `courseId,set,text,optionA,optionB,optionC,optionD,correct,explanation`
2.  **Run Import:** Use the following command:
    ```bash
    npm run mcq:import path/to/your-file.csv
    ```
3.  **Verify:** The script will automatically create the JSON files in the correct folders and assign the next available question numbers.

### Method B: Manual JSON Creation
1.  Create a new `.json` file in the appropriate `src/content/questions/[course]/set-[n]/` folder.
2.  Ensure the filename follows the `q###.json` pattern (e.g., `q031.json`).
3.  Fill in the JSON data following the schema in Section 2.

---

## 4. Management Commands

Run these commands from the `brightmariner/` project root:

| Command | Action |
| :--- | :--- |
| `npm run mcq:validate` | **Mandatory after any update.** Checks for duplicate IDs, missing fields, or incorrect logic (e.g., correct answer not in options). |
| `npm run mcq:import` | Imports questions from a CSV. Usage: `npm run mcq:import filename.csv`. |
| `npm run mcq:reorganize` | Fixes structure and naming if files were added manually or incorrectly. |

---

## 5. Adding New Courses

To add a brand new course module (e.g., "Advanced Navigation"):
1.  Decide on a unique `courseId` (e.g., `adnav`).
2.  Create the folder: `src/content/questions/adnav/set-1/`.
3.  Add the new course mapping to the `courseNames` object in these files:
    *   `src/pages/mcq/index.astro` (For the main list)
    *   `src/pages/mcq/[id].astro` (For the set selection)
    *   `src/pages/mcq/[id]/[set].astro` (For the practice page title)

---

## 6. Tips for AI Assistants
When asked to update MCQs:
1.  **Always** read existing questions in the target course/set to determine the next question number.
2.  **Always** generate unique IDs following the `course-s#-q#` pattern.
3.  **Always** run `npm run mcq:validate` after generating files to ensure compliance.
4.  **Prefer** creating a temporary CSV and using `npm run mcq:import` if adding more than 5 questions.
