import type { MetadataRoute } from "next";
import { getAllCountrySlugs, getCountryContent } from "@/lib/countries";

const BASE_URL = "https://cannapassport.com";
const LOCALES = ["pt", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllCountrySlugs();

  const homepageEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt`,
        en: `${BASE_URL}/en`,
      },
    },
  }));

  const countriesListEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/countries`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt/countries`,
        en: `${BASE_URL}/en/countries`,
      },
    },
  }));

  const countryEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) => {
    // Get lastUpdated from content (try pt first, then en)
    const content = getCountryContent(slug, "pt") ?? getCountryContent(slug, "en");
    const lastModified = content?.lastUpdated
      ? new Date(content.lastUpdated)
      : new Date();

    return LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/countries/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          pt: `${BASE_URL}/pt/countries/${slug}`,
          en: `${BASE_URL}/en/countries/${slug}`,
        },
      },
    }));
  });

  return [...homepageEntries, ...countriesListEntries, ...countryEntries];
}
