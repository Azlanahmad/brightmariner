import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

const xmlFilePath = '/Users/macbookpro2015retina/Desktop/brightmariner/brightmariner.WordPress.2026-06-03.xml';

console.log('Reading XML...');
const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

console.log('Parsing XML...');
const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '__cdata',
  isArray: (name, jpath) => ['rss.channel.item', 'item.wp:postmeta'].includes(jpath)
});

const jsonObj = parser.parse(xmlData);
const items = jsonObj.rss?.channel?.item || [];
console.log(`Total items found: ${items.length}`);

const postTypes = {};
for (const item of items) {
  const type = item['wp:post_type'];
  const typeStr = typeof type === 'object' ? type['__cdata'] : type;
  postTypes[typeStr] = (postTypes[typeStr] || 0) + 1;
}

console.log('Post types:');
console.log(JSON.stringify(postTypes, null, 2));

// Let's print a sample of different post types to see if quizzes are stored as post type or in postmeta
console.log('\nSample items:');
const sampleTypes = new Set();
for (const item of items) {
  const type = item['wp:post_type'];
  const typeStr = typeof type === 'object' ? type['__cdata'] : type;
  if (!sampleTypes.has(typeStr)) {
    sampleTypes.add(typeStr);
    console.log(`\n--- Type: ${typeStr} ---`);
    console.log(`Title: ${item.title}`);
    console.log(`Link: ${item.link}`);
    if (item['content:encoded']) {
      const content = typeof item['content:encoded'] === 'object' ? item['content:encoded']['__cdata'] : item['content:encoded'];
      console.log(`Content length: ${content ? content.length : 0}`);
      console.log(`Snippet: ${content ? content.substring(0, 300) : ''}`);
    }
  }
}
