import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllCountries } from "@/lib/countries";
import { Link } from "@/i18n/navigation";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  const title = isPt
    ? "Destinos com Cannabis Legal | Guia para Turistas"
    : "Legal Cannabis Destinations | Tourist Guide";
  const description = isPt
    ? "5 países com cannabis legal explicados para turistas brasileiros: Canadá, Holanda, Alemanha, EUA e Uruguai. Leis, onde comprar e dicas práticas por destino."
    : "5 countries with legal cannabis explained for tourists: Canada, Netherlands, Germany, USA, and Uruguay. Laws, where to buy, and practical tips per destination.";

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
      canonical: `/${locale}/countries`,
      languages: {
        pt: "/pt/countries",
        en: "/en/countries",
      },
    },
  };
}

const STATUS_COLORS = {
  legal: "bg-green-100 text-green-800 border-green-200",
  decriminalized: "bg-yellow-100 text-yellow-800 border-yellow-200",
  medicinal: "bg-blue-100 text-blue-800 border-blue-200",
} as const;

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "countries" });
  const tLegal = await getTranslations({ locale, namespace: "legal" });

  const countries = getAllCountries(locale);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-700 mb-4 inline-block"
          >
            ← Canna Passport
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">
            {t("title")}
          </h1>
          <p className="text-zinc-500">{t("subtitle")}</p>
        </div>

        {/* Country Grid */}
        {countries.length === 0 ? (
          <p className="text-center text-zinc-400 py-20">
            Guias sendo preparados...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/countries/${country.slug}`}
                className="group bg-white rounded-xl border border-zinc-200 p-5 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{country.flag}</span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${STATUS_COLORS[country.legalStatus]}`}
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
                <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
                  {country.minAge && (
                    <span>{country.minAge}+ anos</span>
                  )}
                  {country.purchaseLimit && (
                    <span>Até {country.purchaseLimit}</span>
                  )}
                  {country.touristCanBuy ? (
                    <span className="text-green-600">✓ Turista pode comprar</span>
                  ) : (
                    <span className="text-red-500">✗ Turista não pode comprar</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
