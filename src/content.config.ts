import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
		category: z.string().optional(),
	}),
});

const questions = defineCollection({
	loader: glob({ pattern: '**/*.json', base: "./src/content/questions" }),
	schema: z.object({
		id: z.string(),
		text: z.string(),
		options: z.array(z.object({
			id: z.string(),
			text: z.string(),
		})),
		correctOptionId: z.string(),
		explanation: z.string().optional(),
		courseId: z.string(),
		set: z.number().optional(),
		difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
	}),
});

export const collections = { posts, questions };
