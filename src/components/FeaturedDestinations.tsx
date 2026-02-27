import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllCountries } from "@/lib/countries";

const STATUS_CONFIG = {
  legal: {
    borderColor: "#00d97a",
    badgeBg: "rgba(0, 217, 122, 0.08)",
    badgeBorder: "rgba(0, 217, 122, 0.22)",
    badgeText: "#00d97a",
    cardClass: "dest-card-legal",
  },
  decriminalized: {
    borderColor: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.08)",
    badgeBorder: "rgba(245, 158, 11, 0.25)",
    badgeText: "#fbbf24",
    cardClass: "dest-card-decriminalized",
  },
  medicinal: {
    borderColor: "#60a5fa",
    badgeBg: "rgba(96, 165, 250, 0.08)",
    badgeBorder: "rgba(96, 165, 250, 0.25)",
    badgeText: "#93c5fd",
    cardClass: "dest-card-medicinal",
  },
};

interface Props {
  locale: string;
}

export function FeaturedDestinations({ locale }: Props) {
  const t = useTranslations("home.featured");
  const tLegal = useTranslations("legal");
  const tCountries = useTranslations("countries");
  const countries = getAllCountries(locale).slice(0, 8);

  return (
    <>
      <style>{`
        /* Base card */
        .dest-card {
          background: rgba(8, 18, 10, 0.85);
          border: 1px solid rgba(0, 217, 122, 0.08);
          transition:
            transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.24s ease,
            background 0.22s,
            border-color 0.22s;
        }
        .dest-card:hover {
          transform: translateY(-6px) scale(1.015);
          background: rgba(10, 22, 13, 0.96);
        }

        /* Per-status hover glow */
        .dest-card-legal:hover {
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), -4px 0 28px rgba(0, 217, 122, 0.28);
          border-color: rgba(0, 217, 122, 0.32);
        }
        .dest-card-decriminalized:hover {
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), -4px 0 28px rgba(245, 158, 11, 0.25);
          border-color: rgba(245, 158, 11, 0.30);
        }
        .dest-card-medicinal:hover {
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), -4px 0 28px rgba(96, 165, 250, 0.25);
          border-color: rgba(96, 165, 250, 0.28);
        }

        /* Flag */
        .dest-flag {
          transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.22s ease;
          display: inline-block;
        }
        .dest-card:hover .dest-flag {
          transform: scale(1.15) translateY(-2px);
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.4));
        }

        /* Arrow */
        .dest-arrow {
          transition: transform 0.2s ease, opacity 0.2s;
          opacity: 0.3;
        }
        .dest-card:hover .dest-arrow {
          transform: translateX(5px);
          opacity: 1;
        }

        /* Staggered entrance */
        .dest-card { animation: cp-fade-in 0.5s ease both; }
        .dest-card:nth-child(1) { animation-delay: 0.05s; }
        .dest-card:nth-child(2) { animation-delay: 0.10s; }
        .dest-card:nth-child(3) { animation-delay: 0.15s; }
        .dest-card:nth-child(4) { animation-delay: 0.20s; }
        .dest-card:nth-child(5) { animation-delay: 0.25s; }
        .dest-card:nth-child(6) { animation-delay: 0.30s; }
        .dest-card:nth-child(7) { animation-delay: 0.35s; }
        .dest-card:nth-child(8) { animation-delay: 0.40s; }
      `}</style>

      <section
        className="py-20 px-4 relative"
        style={{ background: "var(--cp-bg)" }}
      >
        {/* Gradient bridge from map section above */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, var(--cp-bg-surface), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
                style={{ color: "rgba(0, 217, 122, 0.7)" }}
              >
                Destinos
              </p>
              <h2
                className="font-display font-bold mb-1"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
                  color: "#dff0e8",
                }}
              >
                {t("title")}
              </h2>
              <p className="text-base" style={{ color: "rgba(160, 200, 176, 0.65)" }}>
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/countries"
              className="inline-flex items-center gap-1.5 text-base font-semibold whitespace-nowrap"
              style={{ color: "#00d97a", minHeight: "44px" }}
            >
              {locale === "pt" ? "Ver todos" : "See all"}
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {countries.map((country) => {
              const cfg = STATUS_CONFIG[country.legalStatus];
              return (
                <Link
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                  className={`dest-card ${cfg.cardClass} relative flex flex-col rounded-2xl p-5 overflow-hidden`}
                  style={{ borderLeft: `2px solid ${cfg.borderColor}` }}
                  aria-label={`Ver guia de cannabis no ${country.name}`}
                >
                  {/* Flag + status badge */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="dest-flag leading-none" style={{ fontSize: 0 }}>
                      {country.countryCode ? (
                        <Image
                          src={`https://flagcdn.com/w80/${country.countryCode}.png`}
                          width={48}
                          height={36}
                          alt={`Bandeira de ${country.name}`}
                          style={{ borderRadius: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                          loading="lazy"
                        />
                      ) : (
                        <span
                          role="img"
                          aria-label={`Bandeira de ${country.name}`}
                          style={{ fontSize: "3rem" }}
                        >
                          {country.flag}
                        </span>
                      )}
                    </span>
                    <span
                      className="text-[11px] font-bold px-2 py-1 rounded-full uppercase tracking-wide"
                      style={{
                        background: cfg.badgeBg,
                        border: `1px solid ${cfg.badgeBorder}`,
                        color: cfg.badgeText,
                      }}
                    >
                      {tLegal(country.legalStatus)}
                    </span>
                  </div>

                  {/* Country name */}
                  <h3
                    className="font-semibold text-lg leading-snug"
                    style={{ color: "#dff0e8" }}
                  >
                    {country.name}
                  </h3>

                  {/* Quick info */}
                  <div className="mt-2.5 space-y-1.5 flex-1">
                    {country.minAge && (
                      <p className="text-sm" style={{ color: "rgba(160, 200, 176, 0.65)" }}>
                        {tCountries("minAge")}{" "}
                        <span className="font-semibold" style={{ color: "rgba(223,240,232,0.88)" }}>
                          {country.minAge}+
                        </span>
                      </p>
                    )}
                    {country.touristCanBuy ? (
                      <p
                        className="text-sm font-medium flex items-center gap-1.5"
                        style={{ color: "#00d97a" }}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(0,217,122,0.12)" }}
                          aria-hidden="true"
                        >
                          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#00d97a" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {tCountries("touristCanBuyLabel")}
                      </p>
                    ) : (
                      <p
                        className="text-sm font-medium flex items-center gap-1.5"
                        style={{ color: "rgba(248, 113, 113, 0.85)" }}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(248,113,113,0.10)" }}
                          aria-hidden="true"
                        >
                          <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                            <path d="M3 3l6 6M9 3l-6 6"
                              stroke="rgba(248,113,113,0.85)" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                        {tCountries("touristCantBuyLabel")}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex justify-end">
                    <span className="dest-arrow" aria-hidden="true" style={{ color: cfg.borderColor }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
