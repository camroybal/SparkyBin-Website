import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/*
 * The site is served from the domain root once the CNAME file is in place.
 * Until then it is served from the project path on github.io, so the two
 * are configurable from the environment.
 */
const site = process.env.SITE_URL ?? "https://sparkybin.com";
const base = process.env.SITE_BASE ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "never",
  build: {
    // One file per page, so that the URLs have no trailing slash and
    // GitHub Pages serves them without a redirect.
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
