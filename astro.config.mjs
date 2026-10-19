import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://camroybal.github.io/SparkyBin-site",
  base: "/SparkyBin-site",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
