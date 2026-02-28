export interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string;
  description: string | null;
  source: string;
}

const COUNTRY_NAME_MAP: Record<string, string> = {
  argentina:         "Argentina",
  australia:         "Australia",
  austria:           "Austria",
  belgium:           "Belgium",
  brazil:            "Brazil",
  canada:            "Canada",
  colombia:          "Colombia",
  "costa-rica":      "Costa Rica",
  "czech-republic":  "Czech Republic",
  france:            "France",
  germany:           "Germany",
  greece:            "Greece",
  israel:            "Israel",
  italy:             "Italy",
  jamaica:           "Jamaica",
  luxembourg:        "Luxembourg",
  malta:             "Malta",
  mexico:            "Mexico",
  morocco:           "Morocco",
  netherlands:       "Netherlands",
  peru:              "Peru",
  portugal:          "Portugal",
  spain:             "Spain",
  switzerland:       "Switzerland",
  thailand:          "Thailand",
  uruguay:           "Uruguay",
  usa:               "United States",
};

export async function fetchCountryNews(slug: string): Promise<NewsArticle[]> {
  const countryName = COUNTRY_NAME_MAP[slug] ?? slug;
  const query = encodeURIComponent(`cannabis ${countryName}`);
  const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    return items.slice(0, 5).flatMap((item) => {
      const titleMatch =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ??
        item.match(/<title>(.*?)<\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/);

      const rawTitle = titleMatch?.[1] ?? "";
      const link = linkMatch?.[1] ?? "";
      if (!rawTitle || !link) return [];

      // Google News title format: "Article title - Source Name"
      const sourceFromTitle = rawTitle.match(/ - ([^-]+)$/)?.[1]?.trim() ?? "";
      const title = rawTitle.replace(/ - [^-]+$/, "").trim();
      const source = sourceMatch?.[1]?.trim() || sourceFromTitle || "Google News";
      const pubDate = pubDateMatch?.[1]
        ? new Date(pubDateMatch[1]).toISOString()
        : new Date().toISOString();

      return [{ title, url: link, publishedAt: pubDate, description: null, source }];
    });
  } catch {
    return [];
  }
}
