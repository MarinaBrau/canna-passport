import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHotelsForCountry } from "@/lib/hotels-data";
import { HotelCard } from "@/components/HotelCard";

interface Props {
  countrySlug: string;
  locale: string;
}

export async function HotelsSection({ countrySlug, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "hotels" });

  const allCountryHotels = getHotelsForCountry(countrySlug);
  // Show highlighted hotels first, max 3
  const displayHotels = allCountryHotels
    .filter((hotel) => hotel.highlighted)
    .slice(0, 3);

  // If no hotels at all (shouldn't happen — every country has at least editorial)
  if (allCountryHotels.length === 0) return null;

  return (
    <section
      style={{
        marginTop: "40px",
        paddingTop: "32px",
        borderTop: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#18271d",
            margin: 0,
          }}
        >
          🏨 {t("title")}
        </h2>
        {allCountryHotels.some((hotel) => hotel.type !== "editorial") && (
          <Link
            href={`/hotels?country=${countrySlug}`}
            style={{
              fontSize: "13px",
              color: "#00a85e",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t("viewAll")} →
          </Link>
        )}
      </div>

      {/* Hotel cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}
      >
        {displayHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} locale={locale} compact />
        ))}
      </div>

      {/* Affiliate disclaimer */}
      {allCountryHotels.some((hotel) => hotel.links.length > 0) && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "11px",
            color: "rgba(0,0,0,0.35)",
            fontStyle: "italic",
          }}
        >
          ℹ️ {t("disclaimer")}
        </p>
      )}
    </section>
  );
}
