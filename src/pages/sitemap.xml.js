/*
 * The sitemap for the site.
 *
 * This is JavaScript rather than TypeScript on purpose. Astro gives a
 * page file with a dot in its name, such as sitemap.xml.ts, a route of
 * its own, and the build then hands the file to esbuild as something
 * other than TypeScript, which fails on the first type annotation. The
 * same sitemap written in plain JavaScript builds without trouble.
 */

const PAGES = ["/", "/download", "/source", "/about"];

export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const origin = site ?? new URL("https://sparkybin.com");

  const urls = PAGES.map((path) => {
    const location = new URL(`${base}${path === "/" ? "/" : path}`, origin).href;

    return `  <url>\n    <loc>${location}</loc>\n  </url>`;
  }).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
