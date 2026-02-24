import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllCountries } from "@/lib/countries";
import { Link } from "@/i18n/navigation";
import { CountriesGrid } from "@/components/CountriesGrid";

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
    ? "29 países com cannabis legal ou descriminalizado explicados para turistas: Canadá, Holanda, Alemanha, França, Itália, Luxemburgo, Argentina, Nova Zelândia e muito mais."
    : "29 countries with legal or decriminalized cannabis explained for tourists: Canada, Netherlands, Germany, France, Italy, Luxembourg, Argentina, New Zealand, and more.";

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

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "countries" });

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

        {/* Filterable grid */}
        {countries.length === 0 ? (
          <p className="text-center text-zinc-400 py-20">
            Guias sendo preparados...
          </p>
        ) : (
          <CountriesGrid countries={countries} />
        )}
      </div>
    </main>
  );
}
