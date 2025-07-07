import React from "react";
import TranslationProvider from "src/app/[locale]/TranslationProvider";
import initTranslations from "src/configs/i18n";
import { StoreWrapper } from "src/hocs/StoreWrapper";

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
      <StoreWrapper>{children}</StoreWrapper>
    </TranslationProvider>
  );
}
