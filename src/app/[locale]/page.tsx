"use client";

import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { i18nConfig } from "../i18n-config";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";
import LayoutNotApp from "src/views/layouts/LayoutNotApp";

export default function Home() {
  return (
    <AuthLayoutWrapper
      authGuard={false}
      guestGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <h1>Home</h1>
    </AuthLayoutWrapper>
  );
}
