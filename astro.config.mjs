import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://camroybal.github.io/SparkyBin-Website",
  base: "/SparkyBin-Website",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
