"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { HotelCard } from "@/components/HotelCard";
import type { Hotel } from "@/lib/hotels-data";

interface CountryOption {
  slug: string;
  name: string;
  flag: string;
}

interface Props {
  allHotels: Hotel[];
  locale: string;
  countries: CountryOption[];
}

export function HotelsPageClient({ allHotels, locale, countries }: Props) {
  const t = useTranslations("hotels");
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCountry = searchParams.get("country") ?? "";

  const filteredHotels = selectedCountry
    ? allHotels.filter((hotel) => hotel.countrySlug === selectedCountry)
    : allHotels;

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("country", value);
    } else {
      params.delete("country");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <style>{`
        .hotels-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(0,217,122,0.55)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px !important;
          cursor: pointer;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .hotels-select:hover, .hotels-select:focus {
          border-color: rgba(0,217,122,0.38) !important;
          background-color: rgba(0,217,122,0.05) !important;
          outline: none;
        }
        .hotels-select option {
          background: #04090a;
          color: #dff0e8;
        }
      `}</style>

      {/* Filter */}
      <div style={{ marginBottom: "32px" }}>
        <select
          className="hotels-select"
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{
            background: "rgba(8,18,10,0.85)",
            border: "1px solid rgba(0,217,122,0.15)",
            borderRadius: "10px",
            color: selectedCountry ? "#dff0e8" : "rgba(160,200,176,0.55)",
            fontSize: "14px",
            padding: "10px 14px",
            minWidth: "220px",
          }}
          aria-label={t("filterAll")}
        >
          <option value="">{t("filterAll")}</option>
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hotel grid */}
      {filteredHotels.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "rgba(160,200,176,0.45)",
            fontSize: "15px",
          }}
        >
          {t("noHotels")}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} locale={locale} />
          ))}
        </div>
      )}
    </>
  );
}
