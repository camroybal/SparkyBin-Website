export const REPO = "camroybal/SparkyBin-Browser";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const ISSUES_URL = `${REPO_URL}/issues`;
export const UPSTREAM_URL = "https://gitlab.gnome.org/GNOME/epiphany";

export interface Release {
  tag: string;
  version: string;
  url: string;
  published: string | null;
  prerelease: boolean;
  assets: { name: string; url: string; size: number }[];
}

/*
 * What to show when the GitHub API cannot be reached, which happens on
 * builds without a network or when the rate limit is hit.
 */
export const FALLBACK_RELEASE: Release = {
  tag: "v0.1",
  version: "0.1",
  url: `${RELEASES_URL}/tag/v0.1`,
  published: null,
  prerelease: false,
  assets: [],
};

export async function latestRelease(): Promise<Release> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "sparkybin-website",
        },
        // A slow API should not hold up the build for long.
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) {
      return FALLBACK_RELEASE;
    }

    const data = (await response.json()) as {
      tag_name?: string;
      html_url?: string;
      published_at?: string | null;
      prerelease?: boolean;
      assets?: {
        name: string;
        browser_download_url: string;
        size?: number;
      }[];
    };

    return {
      tag: data.tag_name ?? FALLBACK_RELEASE.tag,
      version: String(data.tag_name ?? "").replace(/^v/, ""),
      url: data.html_url ?? FALLBACK_RELEASE.url,
      published: data.published_at ?? null,
      prerelease: Boolean(data.prerelease),
      assets: (data.assets ?? []).map((asset) => ({
        name: asset.name,
        url: asset.browser_download_url,
        size: asset.size ?? 0,
      })),
    };
  } catch {
    return FALLBACK_RELEASE;
  }
}
