import { getAllCountries } from "@/lib/countries";
import { WorldMapClient } from "@/components/WorldMapClient";
import type { CountryMapItem } from "@/components/WorldMapClient";

// ISO 3166-1 numeric code para cada país que temos no conteúdo
const ISO_NUMERIC: Record<string, string> = {
  argentina:        "032",
  "costa-rica":     "188",
  "south-africa":   "710",
  greece:           "300",
  luxembourg:       "442",
  "new-zealand":    "554",
  australia:        "036",
  austria:          "040",
  belgium:          "056",
  brazil:           "076",
  canada:           "124",
  colombia:         "170",
  "czech-republic": "203",
  france:           "250",
  germany:          "276",
  israel:           "376",
  italy:            "380",
  jamaica:          "388",
  malta:            "470",
  mexico:           "484",
  morocco:          "504",
  netherlands:      "528",
  peru:             "604",
  portugal:         "620",
  spain:            "724",
  switzerland:      "756",
  thailand:         "764",
  uruguay:          "858",
  usa:              "840",
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
