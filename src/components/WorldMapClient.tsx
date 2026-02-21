"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const GEO_URL = "/world-110m.json";

type LegalStatus = "legal" | "decriminalized" | "medicinal";

export interface CountryMapItem {
  isoNumeric: string;
  slug: string;
  name: string;
  status: LegalStatus;
}

const STATUS_COLORS: Record<LegalStatus, { fill: string; hover: string; glow: string }> = {
  legal:          { fill: "#00d97a", hover: "#00ff95", glow: "rgba(0,217,122,0.45)" },
  decriminalized: { fill: "#f59e0b", hover: "#fbbf24", glow: "rgba(245,158,11,0.45)" },
  medicinal:      { fill: "#60a5fa", hover: "#93c5fd", glow: "rgba(96,165,250,0.45)" },
};

export function WorldMapClient({ countries }: { countries: CountryMapItem[] }) {
  const t = useTranslations("home.map");
  const tLegal = useTranslations("legal");
  const router = useRouter();

  const [hovered, setHovered] = useState<CountryMapItem | null>(null);

  const countryByIso: Record<string, CountryMapItem> = {};
  for (const c of countries) {
    countryByIso[c.isoNumeric] = c;
  }

  return (
    <section className="py-20 px-4" style={{ background: "var(--cp-bg-surface)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: "rgba(0,217,122,0.6)" }}
          >
            {t("globalView")}
          </p>
          <h2
            className="font-display font-bold mb-2"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              background: "linear-gradient(135deg, #dff0e8 0%, #00d97a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title")}
          </h2>
          <p className="text-sm" style={{ color: "rgba(160,200,176,0.55)" }}>
            {t("subtitle")}
          </p>
        </div>

        {/* Map card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "#081508",
            border: "1px solid rgba(0,217,122,0.1)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,217,122,0.07)",
            height: "clamp(280px, 44vw, 420px)",
          }}
        >
          <ComposableMap
            projection="geoEquirectangular"
            projectionConfig={{ scale: 147, center: [10, 5] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Sphere fill="#0a1a0a" stroke="rgba(0,217,122,0.06)" strokeWidth={0.5} />
            <Graticule stroke="rgba(0,217,122,0.04)" strokeWidth={0.5} />
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = countryByIso[String(geo.id)];
                  const colors = country ? STATUS_COLORS[country.status] : null;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (country) router.push(`/countries/${country.slug}`);
                      }}
                      onMouseEnter={() => setHovered(country ?? null)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        default: {
                          fill: colors ? colors.fill : "#172317",
                          stroke: "#0a1a0a",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: country ? "pointer" : "default",
                          transition: "fill 0.15s ease",
                        },
                        hover: {
                          fill: colors ? colors.hover : "#1e2e1e",
                          stroke: "#0a1a0a",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: country ? "pointer" : "default",
                        },
                        pressed: {
                          fill: colors ? colors.fill : "#172317",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Tooltip centrado no topo */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.15s ease" }}
          >
            {hovered && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
                style={{
                  background: "rgba(4,9,10,0.92)",
                  border: `1px solid ${STATUS_COLORS[hovered.status].fill}55`,
                  color: STATUS_COLORS[hovered.status].fill,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: STATUS_COLORS[hovered.status].fill }}
                />
                {hovered.name} · {tLegal(hovered.status)}
              </div>
            )}
          </div>

          {/* Legend */}
          <div
            className="absolute bottom-4 left-4 flex flex-col gap-2 p-3 rounded-xl text-xs"
            style={{
              background: "rgba(4,9,10,0.90)",
              border: "1px solid rgba(0,217,122,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            {(["legal", "decriminalized", "medicinal"] as LegalStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: STATUS_COLORS[status].fill,
                    boxShadow: `0 0 7px ${STATUS_COLORS[status].glow}`,
                  }}
                />
                <span style={{ color: "rgba(180,218,196,0.72)" }}>
                  {tLegal(status)}
                </span>
              </div>
            ))}
          </div>

          {/* Hint */}
          <div
            className="absolute bottom-4 right-4 text-[10px]"
            style={{ color: "rgba(160,200,176,0.3)" }}
          >
            {t("clickHint")}
          </div>
        </div>
      </div>
    </section>
  );
}
