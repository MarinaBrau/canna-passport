"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import type { AbstractIntlMessages } from "next-intl";

function LocaleSetter({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleSetter locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
