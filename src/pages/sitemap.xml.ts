// The sitemap search engines read (linked from public/robots.txt).
// Lists every page automatically; add a path to `skip` to leave a page out.
import type { APIRoute } from 'astro';

const skip = ['/activities', '/menu']; // a redirect, and a list of links

export const GET: APIRoute = ({ site }) => {
  const paths = Object.keys(import.meta.glob('./**/*.astro'))
    .map((file) => file.replace(/^\./, '').replace(/\.astro$/, '').replace(/\/index$/, '/'))
    .filter((path) => !skip.includes(path))
    .sort();
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
