import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('posts');
	// Sort posts by date in descending order
	const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		title: 'Bright Mariner',
		description: 'A Guide for Marine Engineering, Merchant Navy, DNS',
		site: context.site,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			// Matches the root-level routing structure (/[slug]/)
			link: `/${post.id}/`,
		})),
		customData: `<language>en-US</language>`,
	});
}
