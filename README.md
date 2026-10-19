# SparkyBin Browser website

The website for SparkyBin Browser. Static, built with Astro, published to
GitHub Pages.

## Running it locally

```sh
npm install
npm run dev
```

The site is then on <http://localhost:4321/SparkyBin-site/>. The path
prefix is there because GitHub Pages serves a project site from a subdirectory,
and `astro.config.mjs` sets `base` to match.

To check the build the way CI does:

```sh
npm run build
npm run preview
```

## Layout

```
src/
  pages/        One file per page
  components/   The header, the footer, the channel table
  layouts/      Base.astro, the HTML shell
  lib/          The GitHub API call for the latest release, the product list
  styles/       global.css holds the palette and the type
  assets/       The screenshot and the fonts
public/         Files copied as they are
tools/          fetch-fonts.py
```

The copy lives in the page files. There is no CMS and no content collection,
because there are five pages.

## Projects

`src/lib/products.ts` lists what is under the SparkyBin name. There is one
entry at the moment, the browser. The header menu and the footer are built
from that list, so a second project appears by adding an entry and giving it
a directory of pages.

The browser's pages are at the root of the site, because it is the only
project. When a second one arrives, the browser's pages move under its slug
and the root becomes an index of projects. Moving them is a matter of
changing the `base` on the product entry and moving the files.

## The release version

The download page and the home page show the current version. It is read from
the GitHub API at build time in `src/lib/releases.ts`, so a new release shows
up on the next deploy. If the API cannot be reached, the build falls back to
the version in `FALLBACK_RELEASE` rather than failing, because a build that
cannot reach the network should still produce a site.

## Fonts

Space Grotesk and Public Sans, both under the SIL Open Font License. The
files are committed to the repository so that the site does not ask Google's
servers about anyone who loads it.

To update them:

```sh
python3 tools/fetch-fonts.py
```

The script rewrites `src/styles/fonts.css`. It is generated, so do not edit it
by hand.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages. The repository needs Pages set to use the
GitHub Actions source, and the workflow needs permission to write to the
`github-pages` environment, which the workflow asks for.

The site lives at <https://camroybal.github.io/SparkyBin-site/>.

## The screenshot

`src/assets/screenshot.png` is a real screenshot of the browser, taken by
running it in a container under Xvfb. It should be replaced whenever the
interface changes, and again when there is a real icon to show.

## Licence

The site is part of the SparkyBin Browser project and is under the GNU GPL
v3 or later, like the browser.
