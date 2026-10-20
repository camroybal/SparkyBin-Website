# SparkyBin Browser website

The website for SparkyBin Browser. Static, built with Astro, published to
GitHub Pages.

## Running it locally

```sh
npm install
npm run dev
```

The site is then on <http://localhost:4321/>. The path prefix is there
because GitHub Pages serves a project site from a subdirectory, and
`astro.config.mjs` sets `base` to match.

To check the build the way CI does:

```sh
npm run build
npm run preview
```

## The domain

The site is served from `sparkybin.com`, which is why there is a `CNAME`
file in the root of the repository. GitHub Pages reads it, serves the site
at the domain, and issues the certificate.

`base` and `site` in `astro.config.mjs` can be overridden with `SITE_BASE`
and `SITE_URL`, which is how the site is built for the project path on
`github.io` instead:

```sh
SITE_BASE=/SparkyBin-site SITE_URL=https://camroybal.github.io/SparkyBin-site npm run build
```

### The DNS

| Type | Name | Data |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `camroybal.github.io` |

The A records are kept rather than a single ALIAS, because an ALIAS takes
over the whole domain and would stop an MX record from being added later.

### The certificate

GitHub issues the certificate for the domain some time after the DNS starts
pointing at it, which can be minutes or can be most of a day. Until it does,
the site is served over HTTP with the default `*.github.io` certificate, and
browsers will refuse it.

`tools/wait-for-https.sh` waits for the right certificate to appear and then
turns on the HTTPS redirect:

```sh
tools/wait-for-https.sh sparkybin.com camroybal/SparkyBin-Website
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

The site lives at <https://sparkybin.com>.

## Flathub verification

Flathub checks that a domain belongs to the developer of an app by looking
for a token at `/.well-known/org.flathub.VerifiedApps.txt`. The file is in
`public/.well-known/`, and the token is issued per app in the Flathub
Developer Portal, so it has to be pasted in once it exists. The directory
starts with a dot, which the copy of the public directory skips, so
`tools/copy-static.sh` puts it in the build output.

## The screenshot

`src/assets/screenshot.png` is a real screenshot of the browser, taken by
running it in a container under Xvfb. It should be replaced whenever the
interface changes, and again when there is a real icon to show.

## Licence

The site is part of the SparkyBin Browser project and is under the GNU GPL
v3 or later, like the browser.
