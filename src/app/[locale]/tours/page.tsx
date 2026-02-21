import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { getAllTours } from "@/lib/tours-data";
import { getAllCountries } from "@/lib/countries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToursPageClient } from "@/components/ToursPageClient";

// ─── Static params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  const title = isPt
    ? "Passeios de Cannabis por País | Canna Passport"
    : "Cannabis Tours by Country | Canna Passport";
  const description = isPt
    ? "Descubra passeios e experiências de cannabis disponíveis para turistas em cada destino: Amsterdam, Denver, Bangkok, Medellín e mais."
    : "Discover cannabis tours and experiences available for tourists in each destination: Amsterdam, Denver, Bangkok, Medellín and more.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/tours`,
      languages: {
        pt: "/pt/tours",
        en: "/en/tours",
      },
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "tours" });

  const allTours = getAllTours();
  const allCountries = getAllCountries(locale);

  // Build the country list for the dropdown — only countries that have tours
  const countriesWithTours = allCountries
    .filter((c) => allTours.some((tour) => tour.countrySlug === c.slug))
    .map((c) => ({ slug: c.slug, name: c.name, flag: c.flag }));

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen"
        style={{ background: "var(--cp-bg, #04090a)", paddingTop: "80px" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* Page header */}
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,217,122,0.7)",
                marginBottom: "8px",
              }}
            >
              Canna Passport
            </p>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "#dff0e8",
                lineHeight: 1.2,
                marginBottom: "10px",
              }}
            >
              {t("title")}
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "rgba(160,200,176,0.65)",
                marginBottom: "12px",
              }}
            >
              {t("subtitle")}
            </p>
            {/* Affiliate disclaimer */}
            <p
              style={{
                fontSize: "12px",
                color: "rgba(160,200,176,0.38)",
                fontStyle: "italic",
              }}
            >
              ℹ️ {t("disclaimer")}
            </p>
          </div>

          {/* Client component with filter + grid */}
          <Suspense fallback={null}>
            <ToursPageClient
              allTours={allTours}
              locale={locale}
              countries={countriesWithTours}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
