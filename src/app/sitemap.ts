import type { MetadataRoute } from "next";
import { getAllCountrySlugs, getCountryContent } from "@/lib/countries";

const BASE_URL = "https://www.canna-passport.com";
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

  const toursEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/tours`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt/tours`,
        en: `${BASE_URL}/en/tours`,
      },
    },
  }));

  const hotelsEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/hotels`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt/hotels`,
        en: `${BASE_URL}/en/hotels`,
      },
    },
  }));

  const glossaryEntries: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/glossary`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        pt: `${BASE_URL}/pt/glossary`,
        en: `${BASE_URL}/en/glossary`,
      },
    },
  }));

  const legalEntries: MetadataRoute.Sitemap = (["privacy", "terms"] as const).flatMap(
    (slug) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: new Date("2026-02-21"),
        changeFrequency: "yearly" as const,
        priority: 0.3,
        alternates: {
          languages: {
            pt: `${BASE_URL}/pt/${slug}`,
            en: `${BASE_URL}/en/${slug}`,
          },
        },
      }))
  );

  return [...homepageEntries, ...countriesListEntries, ...toursEntries, ...hotelsEntries, ...glossaryEntries, ...countryEntries, ...legalEntries];
}
