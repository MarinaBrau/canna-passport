import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getToursForCountry } from "@/lib/tours-data";
import { TourCard } from "@/components/TourCard";

interface Props {
  countrySlug: string;
  locale: string;
}

export async function ToursSection({ countrySlug, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "tours" });

  const allCountryTours = getToursForCountry(countrySlug);
  // Show highlighted tours first, max 3
  const displayTours = allCountryTours
    .filter((tour) => tour.highlighted)
    .slice(0, 3);

  // If no tours at all (shouldn't happen — every country has at least editorial)
  if (allCountryTours.length === 0) return null;

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
          🗺️ {t("title")}
        </h2>
        {allCountryTours.some((tour) => tour.type !== "editorial") && (
          <Link
            href={`/tours?country=${countrySlug}`}
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

      {/* Tour cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}
      >
        {displayTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} locale={locale} compact />
        ))}
      </div>

      {/* Affiliate disclaimer */}
      {allCountryTours.some((tour) => tour.links.length > 0) && (
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
