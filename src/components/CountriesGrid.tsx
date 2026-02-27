"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CountryMeta } from "@/lib/countries";

type LegalStatus = "legal" | "decriminalized" | "medicinal" | "all";
type Continent =
  | "all"
  | "americas"
  | "europe"
  | "oceania"
  | "asia"
  | "africa"
  | "middleeast";

const STATUS_COLORS: Record<
  "legal" | "decriminalized" | "medicinal",
  { badge: string; glow: string; active: string }
> = {
  legal: {
    badge: "bg-green-100 text-green-800 border-green-200",
    glow: "hover:border-green-300 hover:shadow-green-100",
    active: "bg-green-600 text-white border-green-600",
  },
  decriminalized: {
    badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
    glow: "hover:border-yellow-300 hover:shadow-yellow-100",
    active: "bg-yellow-500 text-white border-yellow-500",
  },
  medicinal: {
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    glow: "hover:border-blue-300 hover:shadow-blue-100",
    active: "bg-blue-600 text-white border-blue-600",
  },
};

const CONTINENT_KEYS: Continent[] = [
  "all",
  "americas",
  "europe",
  "asia",
  "oceania",
  "africa",
  "middleeast",
];

export function CountriesGrid({ countries }: { countries: CountryMeta[] }) {
  const t = useTranslations("countries");
  const tLegal = useTranslations("legal");

  const [statusFilter, setStatusFilter] = useState<LegalStatus>("all");
  const [continentFilter, setContinentFilter] = useState<Continent>("all");
  const [touristOnly, setTouristOnly] = useState(false);

  // Only show continents that have at least one country
  const availableContinents = useMemo(() => {
    const present = new Set(countries.map((c) => c.continent));
    return CONTINENT_KEYS.filter((k) => k === "all" || present.has(k));
  }, [countries]);

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      if (statusFilter !== "all" && c.legalStatus !== statusFilter) return false;
      if (continentFilter !== "all" && c.continent !== continentFilter)
        return false;
      if (touristOnly && !c.touristCanBuy) return false;
      return true;
    });
  }, [countries, statusFilter, continentFilter, touristOnly]);

  const continentLabel = (key: Continent) => {
    if (key === "all") return t("continentAll");
    const k = `continent${key.charAt(0).toUpperCase()}${key.slice(1)}` as
      | "continentAmericas"
      | "continentEurope"
      | "continentAsia"
      | "continentOceania"
      | "continentAfrica"
      | "continentMiddleeast";
    return t(k);
  };

  const isFiltered =
    statusFilter !== "all" || continentFilter !== "all" || touristOnly;

  function resetFilters() {
    setStatusFilter("all");
    setContinentFilter("all");
    setTouristOnly(false);
  }

  return (
    <div>
      {/* ── Filter bar ───────────────────────────────────────── */}
      <div className="mb-8 space-y-3">
        {/* Status pills */}
        <div className="flex flex-wrap gap-2">
          {(["all", "legal", "decriminalized", "medicinal"] as LegalStatus[]).map(
            (s) => {
              const isActive = statusFilter === s;
              const colors = s !== "all" ? STATUS_COLORS[s] : null;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                    isActive
                      ? colors
                        ? colors.active
                        : "bg-zinc-800 text-white border-zinc-800"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  {s === "all" ? t("filterAll") : tLegal(s)}
                </button>
              );
            }
          )}
        </div>

        {/* Continent + tourist row */}
        <div className="flex flex-wrap items-center gap-2">
          {availableContinents.map((c) => (
            <button
              key={c}
              onClick={() => setContinentFilter(c)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                continentFilter === c
                  ? "bg-zinc-800 text-white border-zinc-800"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {continentLabel(c)}
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-zinc-200 mx-1" />

          {/* Tourist toggle */}
          <button
            onClick={() => setTouristOnly((v) => !v)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
              touristOnly
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <span className="text-[10px]">✓</span>
            {t("filterTourist")}
          </button>

          {/* Clear */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors ml-1"
            >
              {t("filterClear")}
            </button>
          )}
        </div>
      </div>

      {/* ── Results count ─────────────────────────────────────── */}
      {isFiltered && (
        <p className="text-xs text-zinc-400 mb-4">
          {filtered.length} / {countries.length} destinos
        </p>
      )}

      {/* ── Grid ─────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-zinc-400 mb-3">{t("noResults")}</p>
          <button
            onClick={resetFilters}
            className="text-sm text-green-700 underline underline-offset-2 hover:text-green-800 transition-colors"
          >
            {t("filterAll")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((country) => {
            const colors = STATUS_COLORS[country.legalStatus];
            return (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className={`group bg-white rounded-xl border border-zinc-200 p-5 hover:shadow-md transition-all ${colors.glow}`}
              >
                <div className="flex items-start justify-between mb-3">
                  {country.countryCode ? (
                    <Image
                      src={`https://flagcdn.com/48x36/${country.countryCode}.png`}
                      width={48}
                      height={36}
                      alt={`Bandeira ${country.name}`}
                      className="rounded-sm object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-4xl">{country.flag}</span>
                  )}
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${colors.badge}`}
                  >
                    {tLegal(country.legalStatus)}
                  </span>
                </div>

                <h2 className="font-semibold text-zinc-900 group-hover:text-green-700 transition-colors">
                  {country.name}
                </h2>

                {country.touristNote && (
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    {country.touristNote}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
                  {country.minAge && (
                    <span>
                      {country.minAge}+ {t("yearsOld")}
                    </span>
                  )}
                  {country.purchaseLimit && (
                    <span>
                      {t("upTo")} {country.purchaseLimit}
                    </span>
                  )}
                  {country.touristCanBuy ? (
                    <span className="text-green-600">{t("touristCanBuy")}</span>
                  ) : (
                    <span className="text-red-500">{t("touristCantBuy")}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
