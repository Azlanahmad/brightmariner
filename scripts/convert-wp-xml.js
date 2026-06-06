import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

// Paths
const xmlFilePath = '/Users/macbookpro2015retina/Desktop/brightmariner/brightmariner.WordPress.2026-06-03.xml';
const outputDir = path.resolve('./src/content/posts');
const pageOutputDir = path.resolve('./src/pages');

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(pageOutputDir)) {
	fs.mkdirSync(pageOutputDir, { recursive: true });
}

console.log('Reading XML file...');
const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

console.log('Parsing XML...');
const parser = new XMLParser({
	ignoreAttributes: false,
	cdataPropName: '__cdata',
	// Make sure we parse target structures as arrays even if they contain a single item
	isArray: (name, jpath, isAppended, isAttribute) => {
		if (['rss.channel.item', 'item.wp:postmeta', 'item.category'].includes(jpath)) {
			return true;
		}
		return false;
	}
});

const jsonObj = parser.parse(xmlData);
const channel = jsonObj.rss?.channel;
if (!channel || !channel.item) {
	console.error('No items found in XML.');
	process.exit(1);
}

const items = channel.item;
console.log(`Found ${items.length} total items in XML.`);

// 1. Build a map of attachments (featured images)
// post_id -> attachment URL
const attachmentMap = new Map();
for (const item of items) {
	const postType = getCdataOrValue(item['wp:post_type']);
	if (postType === 'attachment') {
		const postId = getCdataOrValue(item['wp:post_id']);
		const url = getCdataOrValue(item['wp:attachment_url']) || getCdataOrValue(item.guid);
		if (postId && url) {
			let cleanUrl = url.trim();
			const wpIdx = cleanUrl.indexOf('wp-content/uploads/');
			if (wpIdx !== -1) {
				cleanUrl = '/' + cleanUrl.substring(wpIdx);
			}
			attachmentMap.set(postId.toString().trim(), cleanUrl);
		}
	}
}
console.log(`Indexed ${attachmentMap.size} attachments/images.`);

// Helper function to extract CDATA or direct value
function getCdataOrValue(val) {
	if (!val) return '';
	if (typeof val === 'object' && val['__cdata'] !== undefined) {
		return val['__cdata'];
	}
	return val.toString();
}

// Helper to sanitize slug (fallback if wp:post_name is empty)
function sanitizeSlug(slug, title) {
	let s = getCdataOrValue(slug).trim();
	if (!s) {
		s = getCdataOrValue(title)
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	}
	return s;
}

let postsConverted = 0;
let pagesConverted = 0;

for (const item of items) {
	const postType = getCdataOrValue(item['wp:post_type']);
	const status = getCdataOrValue(item['wp:status']);

	// Process only published posts or pages
	if (status !== 'publish') continue;

	if (postType === 'post' || postType === 'page') {
		const title = getCdataOrValue(item.title);
		const slug = sanitizeSlug(item['wp:post_name'], title);
		const rawDate = getCdataOrValue(item.pubDate) || getCdataOrValue(item['wp:post_date_gmt']);
		const date = rawDate ? new Date(rawDate).toISOString() : new Date().toISOString();
		
		// Content
		let content = getCdataOrValue(item['content:encoded']);
		// Replace absolute URLs pointing to wp-content/uploads/ with relative ones
		content = content.replace(/(?:https?:)?\/\/(?:www\.)?brightmariner\.com\/wp-content\/uploads\//g, '/wp-content/uploads/');
		
		// Categories & Tags
		const tags = [];
		const categories = [];
		const itemCategories = item.category;
		if (Array.isArray(itemCategories)) {
			for (const cat of itemCategories) {
				const domain = cat['@_domain'];
				const catVal = getCdataOrValue(cat);
				if (domain === 'post_tag') {
					tags.push(catVal);
				} else if (domain === 'category') {
					categories.push(catVal);
				}
			}
		} else if (itemCategories) {
			const domain = itemCategories['@_domain'];
			const catVal = getCdataOrValue(itemCategories);
			if (domain === 'post_tag') {
				tags.push(catVal);
			} else if (domain === 'category') {
				categories.push(catVal);
			}
		}

		// Rank Math Metadata
		let seoTitle = '';
		let seoDescription = '';
		let featuredImageId = '';

		const postmeta = item['wp:postmeta'];
		if (Array.isArray(postmeta)) {
			for (const meta of postmeta) {
				const key = getCdataOrValue(meta['wp:meta_key']);
				const val = getCdataOrValue(meta['wp:meta_value']);
				if (key === 'rank_math_description') {
					seoDescription = val;
				} else if (key === 'rank_math_title') {
					seoTitle = val;
				} else if (key === '_thumbnail_id') {
					featuredImageId = val;
				}
			}
		}

		// Resolve Featured Image URL
		let featuredImageUrl = '';
		if (featuredImageId && attachmentMap.has(featuredImageId.toString().trim())) {
			featuredImageUrl = attachmentMap.get(featuredImageId.toString().trim());
		}

		// Clean description strings of quotes to avoid frontmatter parsing syntax issues
		const excerpt = getCdataOrValue(item['excerpt:encoded']).trim();
		const finalDescription = (seoDescription || excerpt || `Read about ${title} on Bright Mariner.`).replace(/"/g, '\\"');

		// Cleanup WordPress block comments
		content = content.replace(/<!-- wp:.*? -->/g, '');
		content = content.replace(/<!-- \/wp:.*? -->/g, '');

		if (postType === 'post') {
			const frontmatter = [
				'---',
				`title: "${title.replace(/"/g, '\\"')}"`,
				`description: "${finalDescription}"`,
				`date: ${date}`,
				tags.length ? `tags: ${JSON.stringify(tags)}` : '',
				categories.length ? `categories: ${JSON.stringify(categories)}` : '',
				featuredImageUrl ? `image: "${featuredImageUrl}"` : '',
				'---',
				'',
				content
			].filter(line => line !== '').join('\n');

			const fileName = `${slug}.md`;
			const filePath = path.join(outputDir, fileName);
			fs.writeFileSync(filePath, frontmatter, 'utf-8');
			postsConverted++;
		} else if (postType === 'page') {
			// Write pages to src/pages/ utilizing the core Layout component
			const frontmatter = [
				'---',
				`layout: "../layouts/Layout.astro"`,
				`title: "${title.replace(/"/g, '\\"')}"`,
				`description: "${finalDescription}"`,
				'---',
				'',
				content
			].join('\n');

			const fileName = `${slug}.md`;
			const filePath = path.join(pageOutputDir, fileName);
			fs.writeFileSync(filePath, frontmatter, 'utf-8');
			pagesConverted++;
		}
	}
}

console.log(`\nMigration completed successfully!`);
console.log(`Converted ${postsConverted} published posts to Markdown in src/content/posts/`);
console.log(`Converted ${pagesConverted} published pages to Markdown in src/pages/`);
