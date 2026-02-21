import { getAllCountries } from "@/lib/countries";
import { WorldMapClient } from "@/components/WorldMapClient";
import type { CountryMapItem } from "@/components/WorldMapClient";

// ISO 3166-1 numeric code para cada país que temos no conteúdo
const ISO_NUMERIC: Record<string, string> = {
  canada:      "124",
  netherlands: "528",
  germany:     "276",
  uruguay:     "858",
  usa:         "840",
  portugal:    "620",
  spain:       "724",
  malta:       "470",
  colombia:    "170",
  thailand:    "764",
};

interface MapPlaceholderProps {
  locale: string;
}

export function MapPlaceholder({ locale }: MapPlaceholderProps) {
  const countries = getAllCountries(locale);

  const mapItems: CountryMapItem[] = countries
    .filter((c) => ISO_NUMERIC[c.slug])
    .map((c) => ({
      isoNumeric: ISO_NUMERIC[c.slug],
      slug:       c.slug,
      name:       c.name,
      status:     c.legalStatus,
    }));

  return <WorldMapClient countries={mapItems} />;
}
