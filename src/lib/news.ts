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
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return [];

  const countryName = COUNTRY_NAME_MAP[slug] ?? slug;
  const url = `https://gnews.io/api/v4/search?q=cannabis+${encodeURIComponent(countryName)}&lang=en&max=5&sortby=publishedAt&apikey=${apiKey}`;

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
      source: a.source?.name ?? "GNews",
    }));
  } catch {
    return [];
  }
}
