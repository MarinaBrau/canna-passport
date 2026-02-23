import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllCountrySlugs, getCountryContent } from "@/lib/countries";
import { Link } from "@/i18n/navigation";
import { ToursSection } from "@/components/ToursSection";
import { HotelsSection } from "@/components/HotelsSection";
import { FaqSection } from "@/components/FaqSection";
import type { Metadata } from "next";

const BASE_URL = "https://www.canna-passport.com";

// ─── Static params ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = getAllCountrySlugs();
  const locales = ["pt", "en"];
  return slugs.flatMap((slug) =>
    locales.map((locale) => ({ slug, locale }))
  );
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const country = getCountryContent(slug, locale);
  if (!country) return {};

  const isPt = locale === "pt";

  // Build title
  const title = isPt
    ? `Cannabis no ${country.name}: Guia para Turistas Brasileiros`
    : `Cannabis in ${country.nameEn}: Complete Tourist Guide`;

  // Build description: use frontmatter field if available, otherwise generate
  const description =
    country.description ??
    (isPt
      ? `Guia completo sobre cannabis no ${country.name} para turistas. Status: ${country.legalStatus}. ${country.touristCanBuy ? "Turistas podem comprar." : "Turistas não podem comprar."} ${country.minAge ? `Idade mínima: ${country.minAge}+.` : ""}`
      : `Complete cannabis guide for tourists in ${country.nameEn}. Status: ${country.legalStatus}. ${country.touristCanBuy ? "Tourists can purchase." : "Tourists cannot purchase."} ${country.minAge ? `Minimum age: ${country.minAge}+.` : ""}`);

  const ogImage = `/og/${slug}.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/countries/${slug}`,
      languages: {
        pt: `/pt/countries/${slug}`,
        en: `/en/countries/${slug}`,
      },
    },
  };
}

// ─── MDX Components ─────────────────────────────────────────────────────────

const STATUS_COLORS = {
  legal: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", dot: "bg-green-500" },
  decriminalized: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200", dot: "bg-yellow-500" },
  medicinal: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", dot: "bg-blue-500" },
};

const STATUS_LABELS = {
  legal: { pt: "Legal", en: "Legal" },
  decriminalized: { pt: "Descriminalizado", en: "Decriminalized" },
  medicinal: { pt: "Medicinal", en: "Medicinal" },
};

// ─── JSON-LD helpers ─────────────────────────────────────────────────────────

function buildBreadcrumbSchema(slug: string, locale: string, countryName: string) {
  const isPt = locale === "pt";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Canna Passport",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isPt ? "Destinos" : "Destinations",
        item: `${BASE_URL}/${locale}/countries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: countryName,
        item: `${BASE_URL}/${locale}/countries/${slug}`,
      },
    ],
  };
}

function buildArticleSchema(
  slug: string,
  locale: string,
  title: string,
  description: string,
  lastUpdated: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified: lastUpdated,
    url: `${BASE_URL}/${locale}/countries/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Canna Passport",
      url: BASE_URL,
    },
    inLanguage: locale === "pt" ? "pt-BR" : "en",
  };
}

function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const country = getCountryContent(slug, locale);
  if (!country) notFound();

  const colors = STATUS_COLORS[country.legalStatus];
  const statusLabel = STATUS_LABELS[country.legalStatus][locale as "pt" | "en"] ?? country.legalStatus;
  const isPt = locale === "pt";

  // Build strings for JSON-LD
  const title = isPt
    ? `Cannabis no ${country.name}: Guia para Turistas Brasileiros`
    : `Cannabis in ${country.nameEn}: Complete Tourist Guide`;
  const description =
    country.description ??
    (isPt
      ? `Guia completo sobre cannabis no ${country.name} para turistas.`
      : `Complete cannabis guide for tourists in ${country.nameEn}.`);

  const breadcrumbSchema = buildBreadcrumbSchema(slug, locale, country.name);
  const articleSchema = buildArticleSchema(slug, locale, title, description, country.lastUpdated);
  const faqSchema = country.faqs && country.faqs.length > 0
    ? buildFaqSchema(country.faqs)
    : null;

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Top bar */}
      <div className="bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-900">Canna Passport</Link>
          <span>/</span>
          <Link href="/countries" className="hover:text-zinc-900">
            {isPt ? "Destinos" : "Destinations"}
          </Link>
          <span>/</span>
          <span className="text-zinc-900">{country.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">

          {/* ── Main content ── */}
          <article>
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                {country.countryCode ? (
                  <img
                    src={`https://flagcdn.com/w80/${country.countryCode}.png`}
                    srcSet={`https://flagcdn.com/w160/${country.countryCode}.png 2x`}
                    width={56}
                    height={42}
                    alt={`Bandeira de ${country.name}`}
                    style={{ borderRadius: "5px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
                  />
                ) : (
                  <span className="text-5xl" role="img" aria-label={`Bandeira de ${country.name}`}>
                    {country.flag}
                  </span>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-zinc-900">{country.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      {statusLabel}
                      {country.legalSince && ` desde ${country.legalSince}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MDX body */}
            <div className="prose prose-zinc prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h3:text-base prose-a:text-green-700 prose-strong:text-zinc-900 prose-blockquote:border-l-green-500 prose-blockquote:bg-green-50 prose-blockquote:py-1 prose-blockquote:not-italic prose-table:text-sm max-w-none">
              <MDXRemote source={country.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            </div>

            {/* Structured FAQ section — visual accordion (JSON-LD already injected above) */}
            {country.faqs && country.faqs.length > 0 && (
              <FaqSection
                faqs={country.faqs.map(({ q, a }) => ({ question: q, answer: a }))}
                title={isPt ? "Perguntas Frequentes" : "Frequently Asked Questions"}
                injectJsonLd={false}
              />
            )}

            {/* Tours section */}
            <ToursSection countrySlug={slug} locale={locale} />

            {/* Hotels section */}
            <HotelsSection countrySlug={slug} locale={locale} />

            {/* Footer note */}
            <div className="mt-10 pt-6 border-t border-zinc-100 text-xs text-zinc-400">
              {isPt
                ? `Última atualização: ${country.lastUpdated}. As leis mudam — verifique sempre fontes oficiais antes de viajar.`
                : `Last updated: ${country.lastUpdated}. Laws change — always verify official sources before traveling.`}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 space-y-4">
              {/* Quick facts card */}
              <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-5">
                <h3 className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wide">
                  {isPt ? "Resumo Rápido" : "Quick Facts"}
                </h3>
                <dl className="space-y-3 text-sm">
                  {country.minAge && (
                    <div>
                      <dt className="text-zinc-500 text-xs">{isPt ? "Idade mínima" : "Minimum age"}</dt>
                      <dd className="font-medium text-zinc-900">{country.minAge}+</dd>
                    </div>
                  )}
                  {country.purchaseLimit && (
                    <div>
                      <dt className="text-zinc-500 text-xs">{isPt ? "Limite de compra" : "Purchase limit"}</dt>
                      <dd className="font-medium text-zinc-900">{country.purchaseLimit}</dd>
                    </div>
                  )}
                  {country.possessionLimit && (
                    <div>
                      <dt className="text-zinc-500 text-xs">{isPt ? "Posse máxima" : "Possession limit"}</dt>
                      <dd className="font-medium text-zinc-900">{country.possessionLimit}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-zinc-500 text-xs">{isPt ? "Turistas podem comprar?" : "Tourists can purchase?"}</dt>
                    <dd className={`font-medium ${country.touristCanBuy ? "text-green-700" : "text-red-600"}`}>
                      {country.touristCanBuy
                        ? (isPt ? "✅ Sim" : "✅ Yes")
                        : (isPt ? "❌ Não" : "❌ No")}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Warning card */}
              <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                <p className="text-xs text-red-700 leading-relaxed">
                  <strong className="block mb-1">⚠️ {isPt ? "Nunca cruze fronteiras" : "Never cross borders"}</strong>
                  {isPt
                    ? "Carregar cannabis ao cruzar fronteiras internacionais é crime, mesmo que ambos os países tenham cannabis legal."
                    : "Carrying cannabis across international borders is a crime, even if both countries have legal cannabis."}
                </p>
              </div>

              {/* Back link */}
              <Link
                href="/countries"
                className="block text-center text-sm text-zinc-500 hover:text-zinc-900 py-2"
              >
                ← {isPt ? "Ver todos os destinos" : "All destinations"}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
