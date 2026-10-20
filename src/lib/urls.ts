/*
 * The pages of the site are built one file per page, so the address of a
 * built page ends in .html and the front page is called index.html.
 * Neither is the address a reader types, so both are taken off before a
 * path is compared with the links in the header or put in a canonical
 * address.
 */
export function routeOf(pathname: string): string {
  const route = pathname.replace(/\.html$/, "").replace(/\/index$/, "/");

  return route.length > 1 ? route.replace(/\/+$/, "") : route;
}

/*
 * The path of the page being built, with the base path taken off, so
 * that it can be compared with the paths in the header.
 */
export function currentRoute(pathname: string, base: string): string {
  const route = routeOf(pathname);
  const prefix = base.replace(/\/+$/, "");

  return (prefix && route.startsWith(prefix) ? route.slice(prefix.length) : route) || "/";
}

/*
 * The address of a page of this site. The base path goes in front of it,
 * so that the links still work when the site is served from a
 * subdirectory, as it is on github.io.
 */
export function siteUrl(path: string): string {
  const prefix = import.meta.env.BASE_URL.replace(/\/+$/, "");

  return `${prefix}${path}`;
}
