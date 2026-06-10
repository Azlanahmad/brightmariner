// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://brightmariner.com',
	integrations: [sitemap(), react()],
	vite: {
		plugins: [tailwindcss()],
	},
	redirects: {
		'/refresher-fpff-exit-exam-questions-and-answers-rfpff/': '/mcq/rfpff-exit-exam-questions-answers/1/'
	}
});
