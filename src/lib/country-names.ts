/** Static slug → localized country name map, safe for client and server use. */
export const COUNTRY_NAMES: Record<string, { pt: string; en: string }> = {
  canada:      { pt: "Canadá",          en: "Canada" },
  colombia:    { pt: "Colômbia",         en: "Colombia" },
  germany:     { pt: "Alemanha",         en: "Germany" },
  malta:       { pt: "Malta",            en: "Malta" },
  netherlands: { pt: "Holanda",          en: "Netherlands" },
  portugal:    { pt: "Portugal",         en: "Portugal" },
  spain:       { pt: "Espanha",          en: "Spain" },
  thailand:    { pt: "Tailândia",        en: "Thailand" },
  uruguay:     { pt: "Uruguai",          en: "Uruguay" },
  usa:         { pt: "Estados Unidos",   en: "United States" },
};

export function getCountryName(slug: string, locale: string): string {
  const entry = COUNTRY_NAMES[slug];
  if (!entry) return slug;
  return locale === "en" ? entry.en : entry.pt;
}
