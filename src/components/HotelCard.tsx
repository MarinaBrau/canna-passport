import { useTranslations } from "next-intl";
import type { Hotel, HotelType, HotelPlatform } from "@/lib/hotels-data";
import { getCountryName } from "@/lib/country-names";

const TYPE_COLORS: Record<HotelType, string> = {
  hotel: "#00d97a",
  hostel: "#60a5fa",
  bnb: "#f59e0b",
  apartment: "#a78bfa",
  resort: "#34d399",
  editorial: "rgba(180,220,200,0.4)",
};

const PLATFORM_STYLES: Record<
  HotelPlatform,
  { bg: string; color: string; border: string }
> = {
  booking: {
    bg: "rgba(0,53,128,0.85)",
    color: "#fff",
    border: "transparent",
  },
  direct: {
    bg: "transparent",
    color: "rgba(160,200,176,0.75)",
    border: "rgba(160,200,176,0.25)",
  },
};

interface Props {
  hotel: Hotel;
  locale: string;
  compact?: boolean;
}

export function HotelCard({ hotel, locale, compact = false }: Props) {
  const t = useTranslations("hotels");

  const name = hotel.name[locale as "pt" | "en"] ?? hotel.name.pt;
  const description =
    hotel.description[locale as "pt" | "en"] ?? hotel.description.pt;
  const warning = hotel.warning
    ? (hotel.warning[locale as "pt" | "en"] ?? hotel.warning.pt)
    : null;
  const typeLabel =
    (t.raw(`types.${hotel.type}`) as string | undefined) ?? hotel.type;

  const typeColor = TYPE_COLORS[hotel.type];
  const isEditorial = hotel.type === "editorial";

  return (
    <div
      style={{
        background: "rgba(8,18,10,0.85)",
        border: `1px solid rgba(0,217,122,0.08)`,
        borderRadius: "16px",
        padding: compact ? "14px 16px" : "20px",
        display: "flex",
        flexDirection: "column",
        gap: compact ? "10px" : "14px",
        opacity: isEditorial ? 0.85 : 1,
      }}
    >
      {/* Warning banner */}
      {warning && (
        <div
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.28)",
            borderRadius: "8px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            fontSize: "12px",
            color: "rgba(251,191,36,0.9)",
            lineHeight: "1.45",
          }}
        >
          <span style={{ flexShrink: 0 }}>⚠️</span>
          <span>{warning}</span>
        </div>
      )}

      {/* Header: type badge + city */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: isEditorial
              ? TYPE_COLORS.editorial
              : `${typeColor}18`,
            border: `1px solid ${typeColor}40`,
            color: isEditorial ? "rgba(160,200,176,0.65)" : typeColor,
            borderRadius: "999px",
            padding: "3px 10px",
          }}
        >
          {typeLabel}
        </span>

        <span
          style={{
            fontSize: "11px",
            color: "rgba(180,220,200,0.72)",
          }}
        >
          📍 {hotel.city ? `${hotel.city}, ` : ""}{getCountryName(hotel.countrySlug, locale)}
        </span>
      </div>

      {/* Hotel name */}
      <h3
        style={{
          margin: 0,
          fontSize: compact ? "14px" : "16px",
          fontWeight: 600,
          color: "#dff0e8",
          lineHeight: 1.35,
        }}
      >
        {name}
      </h3>

      {/* Description — hidden in compact mode (non-editorial) */}
      {!compact && !isEditorial && (
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "rgba(210,235,220,0.88)",
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>
      )}

      {/* Editorial description — always shown */}
      {isEditorial && (
        <p
          style={{
            margin: 0,
            fontSize: compact ? "12px" : "13px",
            color: "rgba(200,228,212,0.82)",
            lineHeight: "1.6",
            fontStyle: "italic",
          }}
        >
          {description}
        </p>
      )}

      {/* Price range */}
      {!isEditorial && hotel.priceRange && (
        <div>
          <span style={{ fontSize: "12px", color: "rgba(180,220,200,0.75)" }}>
            💳 {hotel.priceRange}
          </span>
        </div>
      )}

      {/* Booking links — only for real hotels */}
      {!isEditorial && hotel.links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {hotel.links.map((link) => {
            const style = PLATFORM_STYLES[link.platform];
            return (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  background: style.bg,
                  color: style.color,
                  border: `1px solid ${style.border}`,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
              >
                {t("bookOn")} {link.label ?? link.platform}
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
