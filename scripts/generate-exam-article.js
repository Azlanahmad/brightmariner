import fs from 'node:fs';
import path from 'node:path';
import { argv, env, loadEnvFile } from 'node:process';

// 1. Try to load environment variables from .env file
try {
  loadEnvFile();
} catch (e) {
  // Ignore error if .env file is missing
}

const apiKey = env.GEMINI_API_KEY;

// 2. Validate Command Line Arguments
const examName = argv[2];
if (!examName) {
  console.error('\x1b[31mError: Exam name is required.\x1b[0m');
  console.log('Usage: npm run article:generate "<Exam Name>"');
  console.log('Example: npm run article:generate "Great Eastern Cadet Sponsorship Exam"');
  process.exit(1);
}

// 3. Validate API Key
if (!apiKey) {
  console.error('\x1b[31mError: GEMINI_API_KEY environment variable is not set.\x1b[0m');
  console.log('\nPlease set it in your .env file:');
  console.log('  GEMINI_API_KEY=your_api_key_here');
  console.log('\nOr run with the key in the command line:');
  console.log('  GEMINI_API_KEY=your_api_key npm run article:generate "Exam Name"\n');
  process.exit(1);
}

// Helper to generate a URL-friendly slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Gemini API URL for gemini-2.5-flash
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

console.log(`Generating article for: "${examName}"...`);

const prompt = `
You are an expert maritime content writer and SEO specialist for BrightMariner (brightmariner.com).
Write a comprehensive, highly detailed, and SEO-optimized guide about the following maritime exam: "${examName}".

The article should target maritime candidates, deck/engine cadets, or aspiring seafarers, providing actionable information to help them pass the exam.

Please output a JSON object with the following fields:
1. "title": A catchy, SEO-optimized title (50-60 characters).
2. "description": A compelling meta description (150-160 characters). To maintain consistency with other posts on the site, it should describe the exam guide concisely.
3. "tags": An array of 3-5 relevant SEO tags/keywords.
4. "category": A single category name (e.g., "Exam Preparation", "Merchant Navy", "Marine Engineering").
5. "faqs": An array of 3-5 frequently asked questions and short, direct answers about the exam.
6. "content": The body of the article in high-quality Markdown (do NOT use HTML tags like <p>, <h2>, etc. Use standard Markdown headings, lists, bold text, and tables).

The markdown content MUST contain:
- An engaging introduction explaining what the exam is.
- Detailed Eligibility Criteria (academic qualifications, age limits, medical fitness).
- Complete Exam Pattern (subjects covered, number of questions, duration, marking scheme/negative marking, online/offline mode).
- Comprehensive Syllabus (major topics to study).
- Sponsorship and Selection Process (if applicable for company exams).
- How to Prepare (step-by-step prep tips, recommended books, revision advice, and taking mock tests).
- A final section with "Frequently Asked Questions" matching the FAQs provided in the JSON metadata.

Ensure that the output matches the required JSON schema.
`;

const requestBody = {
  contents: [
    {
      parts: [
        { text: prompt }
      ]
    }
  ],
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "OBJECT",
      properties: {
        title: { type: "STRING" },
        description: { type: "STRING" },
        tags: {
          type: "ARRAY",
          items: { type: "STRING" }
        },
        category: { type: "STRING" },
        faqs: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              question: { type: "STRING" },
              answer: { type: "STRING" }
            },
            required: ["question", "answer"]
          }
        },
        content: { type: "STRING" }
      },
      required: ["title", "description", "tags", "category", "faqs", "content"]
    }
  }
};

// Helper to perform fetch with retries on transient errors (503, 429)
async function fetchWithRetry(url, options, maxRetries = 4, initialDelay = 3000) {
  let delay = initialDelay;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 503 || response.status === 429) {
        if (i === maxRetries - 1) return response; // return last response if out of retries
        console.warn(`[Warning] Received status ${response.status}. Retrying in ${delay / 1000}s... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
        continue;
      }
      return response;
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      console.warn(`[Warning] Fetch failed: ${err.message}. Retrying in ${delay / 1000}s... (Attempt ${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

try {
  const response = await fetchWithRetry(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  
  if (!result.candidates || result.candidates.length === 0 || !result.candidates[0].content.parts[0].text) {
    throw new Error("Invalid response format received from Gemini API.");
  }

  const jsonResponse = JSON.parse(result.candidates[0].content.parts[0].text);
  
  const { title, description, tags, category, faqs, content } = jsonResponse;
  const slug = slugify(examName);
  const date = new Date().toISOString();

  // Construct Yaml Frontmatter
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `date: ${date}`,
    tags && tags.length ? `tags: ${JSON.stringify(tags)}` : '',
    category ? `category: "${category}"` : '',
    faqs && faqs.length ? 'faqs:' : '',
    ...(faqs && faqs.length ? faqs.map(faq => `  - question: "${faq.question.replace(/"/g, '\\"')}"\n    answer: "${faq.answer.replace(/"/g, '\\"')}"`) : []),
    '---',
    '',
    content
  ].filter(line => line !== '').join('\n');

  const outputDir = path.resolve('./src/content/posts');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${slug}.md`);
  fs.writeFileSync(outputPath, frontmatter, 'utf-8');

  console.log('\n\x1b[32mSuccess! Article generated successfully.\x1b[0m');
  console.log(`Saved to: \x1b[34m${outputPath}\x1b[0m`);
  console.log(`URL Slug: ${slug}\n`);

} catch (error) {
  console.error('\x1b[31mError generating article:\x1b[0m', error.message);
  process.exit(1);
}
