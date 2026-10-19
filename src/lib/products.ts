/*
 * The projects under the SparkyBin name.
 *
 * There is one at the moment. When a second one appears it goes in this
 * list, and the header menu and the footer pick it up. The pages of a
 * project that is not the default one live under its slug, so a second
 * project would be at /whatever-it-is/ rather than at the root.
 */

export interface Product {
  name: string;
  slug: string;
  tagline: string;
  status: "available" | "in development";
  /** Where the product's own pages live, relative to the site root. */
  base: string;
}

export const PRODUCTS: Product[] = [
  {
    name: "Browser",
    slug: "browser",
    tagline: "A web browser for Linux desktops",
    status: "available",
    base: "/",
  },
];

export const DEFAULT_PRODUCT = PRODUCTS[0];
