/** Static slug → localized country name map, safe for client and server use. */
export const COUNTRY_NAMES: Record<string, { pt: string; en: string }> = {
  argentina:        { pt: "Argentina",         en: "Argentina" },
  "costa-rica":     { pt: "Costa Rica",        en: "Costa Rica" },
  "south-africa":   { pt: "África do Sul",     en: "South Africa" },
  greece:           { pt: "Grécia",            en: "Greece" },
  luxembourg:       { pt: "Luxemburgo",        en: "Luxembourg" },
  "new-zealand":    { pt: "Nova Zelândia",     en: "New Zealand" },
  australia:        { pt: "Austrália",         en: "Australia" },
  austria:          { pt: "Áustria",           en: "Austria" },
  belgium:          { pt: "Bélgica",           en: "Belgium" },
  brazil:           { pt: "Brasil",            en: "Brazil" },
  canada:           { pt: "Canadá",           en: "Canada" },
  colombia:    { pt: "Colômbia",         en: "Colombia" },
  "czech-republic": { pt: "República Tcheca",  en: "Czech Republic" },
  germany:          { pt: "Alemanha",          en: "Germany" },
  israel:           { pt: "Israel",            en: "Israel" },
  jamaica:          { pt: "Jamaica",           en: "Jamaica" },
  malta:            { pt: "Malta",             en: "Malta" },
  mexico:           { pt: "México",            en: "Mexico" },
  morocco:          { pt: "Marrocos",          en: "Morocco" },
  france:           { pt: "França",             en: "France" },
  italy:            { pt: "Itália",             en: "Italy" },
  netherlands:      { pt: "Holanda",           en: "Netherlands" },
  peru:             { pt: "Peru",               en: "Peru" },
  portugal:         { pt: "Portugal",          en: "Portugal" },
  spain:            { pt: "Espanha",           en: "Spain" },
  switzerland:      { pt: "Suíça",             en: "Switzerland" },
  thailand:         { pt: "Tailândia",         en: "Thailand" },
  uruguay:          { pt: "Uruguai",           en: "Uruguay" },
  usa:              { pt: "Estados Unidos",    en: "United States" },
};

export function getCountryName(slug: string, locale: string): string {
  const entry = COUNTRY_NAMES[slug];
  if (!entry) return slug;
  return locale === "en" ? entry.en : entry.pt;
}
