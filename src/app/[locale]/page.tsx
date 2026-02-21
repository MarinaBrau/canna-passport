import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  const title = isPt
    ? "Canna Passport — Guia de Turismo de Cannabis Legal"
    : "Canna Passport — Legal Cannabis Travel Guide";
  const description = isPt
    ? "Guia completo para turistas brasileiros: onde o cannabis é legal, como comprar, limites por país e dicas práticas para viajar com segurança."
    : "Complete guide for travelers: where cannabis is legal, how to buy at dispensaries, possession limits by country, and practical tips for safe travel.";

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
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <Hero />
      <MapPlaceholder locale={locale} />
      <FeaturedDestinations locale={locale} />
      <HowItWorks />
      <Footer />
    </>
  );
}
