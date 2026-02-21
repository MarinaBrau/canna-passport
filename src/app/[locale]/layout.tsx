import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleProvider } from "./locale-provider";
import { CookieBanner } from "@/components/CookieBanner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  // Enable static rendering for all locale routes
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <LocaleProvider locale={locale} messages={messages}>
      {children}
      <CookieBanner />
    </LocaleProvider>
  );
}
