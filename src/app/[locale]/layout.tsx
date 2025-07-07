/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TranslationProvider from "@/app/[locale]/TranslationProvider";
import initTranslations from "@/configs/i18n";

const i18nNamespaces = ["translation"];

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      {children}
    </TranslationProvider>
  );
}
