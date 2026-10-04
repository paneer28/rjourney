// @ts-check
import { defineConfig } from 'astro/config';

// Static site, deployed to Cloudflare Pages (build: `npm run build`, output: `dist`).
// TODO: set `site` to the real domain once it is known, so Open Graph URLs are absolute.
export default defineConfig({
  output: 'static',
});
