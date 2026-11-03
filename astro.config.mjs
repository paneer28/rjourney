// @ts-check
import { defineConfig } from 'astro/config';

// Static site, deployed to GitHub Pages (.github/workflows/astro.yml; output: `dist`).
// `site` makes canonical, Open Graph, and sitemap URLs absolute.
export default defineConfig({
  site: 'https://rjourney.org',
  output: 'static',
});
