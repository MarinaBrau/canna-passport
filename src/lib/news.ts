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
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  const countryName = COUNTRY_NAME_MAP[slug] ?? slug;
  const url = `https://newsapi.org/v2/everything?q=cannabis+${encodeURIComponent(countryName)}&language=en&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles ?? []).map((a: {
      title: string;
      url: string;
      publishedAt: string;
      description: string | null;
      source: { name?: string };
    }) => ({
      title: a.title,
      url: a.url,
      publishedAt: a.publishedAt,
      description: a.description,
      source: a.source?.name ?? "NewsAPI",
    }));
  } catch {
    return [];
  }
}
