import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	// Load all markdown (.md) and MDX (.mdx) files in src/content/posts
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
	}),
});

export const collections = { posts };
