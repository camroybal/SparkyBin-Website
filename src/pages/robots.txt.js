/*
 * The robots file for the site.
 *
 * This is JavaScript rather than TypeScript on purpose, for the reason
 * given in sitemap.xml.js.
 */

export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const origin = site ?? new URL("https://sparkybin.com");
  const sitemap = new URL(`${base}/sitemap.xml`, origin).href;

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
