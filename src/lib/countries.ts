import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

// ─── Schema ────────────────────────────────────────────────────────────────

export const CountryFrontmatterSchema = z.object({
  slug: z.string(),
  name: z.string(),             // Nome no idioma do arquivo (pt/en)
  nameEn: z.string(),           // Nome em inglês (para ordenação e SEO)
  flag: z.string(),             // Emoji de bandeira
  continent: z.enum([
    "americas",
    "europe",
    "oceania",
    "asia",
    "africa",
    "middleeast",
  ]),
  legalStatus: z.enum(["legal", "decriminalized", "medicinal"]),
  legalSince: z.number().optional(),
  purchaseLimit: z.string().optional(),   // ex: "30g"
  possessionLimit: z.string().optional(), // ex: "30g em público"
  minAge: z.number().optional(),
  countryCode: z.string().length(2).optional(), // ISO 3166-1 alpha-2 (ex: "ca", "nl")
  touristCanBuy: z.boolean(),
  touristNote: z.string().optional(),     // nota curta para o card
  lastUpdated: z.string(),                // ISO date string "2026-02-19"
  description: z.string().optional(),     // meta description única (140-155 chars)
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })).optional(),                         // FAQ para rich snippets
});

export type CountryFrontmatter = z.infer<typeof CountryFrontmatterSchema>;

export interface CountryMeta extends CountryFrontmatter {
  // frontmatter completo — sem conteúdo MDX
}

export interface CountryContent extends CountryMeta {
  content: string; // MDX raw string
}

// ─── Paths ─────────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "countries");

function mdxPath(slug: string, locale: string) {
  return path.join(CONTENT_DIR, slug, `${locale}.mdx`);
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function parseFrontmatter(slug: string, locale: string): CountryMeta | null {
  const filePath = mdxPath(slug, locale);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  const parsed = CountryFrontmatterSchema.safeParse({ slug, ...data });
  if (!parsed.success) {
    console.warn(`[countries] Invalid frontmatter in ${filePath}:`, parsed.error.issues);
    return null;
  }

  return parsed.data;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Returns metadata for all countries that have a guide for the given locale.
 * Falls back to "en" if the locale file doesn't exist.
 */
export function getAllCountries(locale: string = "pt"): CountryMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const slugs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const countries: CountryMeta[] = [];

  for (const slug of slugs) {
    const meta = parseFrontmatter(slug, locale) ?? parseFrontmatter(slug, "en");
    if (meta) countries.push(meta);
  }

  // Sort: legal first, then alphabetical by nameEn
  return countries.sort((a, b) => {
    const statusOrder = { legal: 0, decriminalized: 1, medicinal: 2 };
    const diff = statusOrder[a.legalStatus] - statusOrder[b.legalStatus];
    if (diff !== 0) return diff;
    return a.nameEn.localeCompare(b.nameEn);
  });
}

/**
 * Returns the full MDX content + metadata for a specific country.
 */
export function getCountryContent(
  slug: string,
  locale: string = "pt"
): CountryContent | null {
  // Try requested locale first, fall back to "en"
  for (const loc of [locale, "en", "pt"]) {
    const filePath = mdxPath(slug, loc);
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const parsed = CountryFrontmatterSchema.safeParse({ slug, ...data });
    if (!parsed.success) continue;

    return { ...parsed.data, content };
  }

  return null;
}

/**
 * Returns all slugs that have at least one MDX file (for generateStaticParams).
 */
export function getAllCountrySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}
