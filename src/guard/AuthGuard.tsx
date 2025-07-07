"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next
import { usePathname, useRouter } from "next/navigation";

// ** Helper
import {
  clearLocalUserData,
  clearTemporaryToken,
  getLocalUserData,
  getTemporaryToken,
} from "src/helpers/storage/index";

// ** Hook
import { useAuth } from "src/hooks/useAuth";
import { createUrlQuery } from "src/utils";
import { useTranslation } from "react-i18next";
import { i18nConfig } from "src/app/i18n-config";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  // ** props
  const { children, fallback } = props;

  // ** auth
  const authContext = useAuth();

  // ** router
  const router = useRouter();
  const pathName = usePathname();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const urlDefault =
    currentLang === i18nConfig.defaultLocale ? "/" : `/${currentLang}`;
  const urlLogin =
    currentLang === i18nConfig.defaultLocale
      ? "/logins"
      : `/${currentLang}/login`;
  useEffect(() => {
    if (
      authContext.user === null &&
      !getLocalUserData().accessToken &&
      !getLocalUserData().userData &&
      !getTemporaryToken().temporaryToken
    ) {
      if (pathName !== urlDefault && pathName != urlLogin) {
        router.replace("/login" + "?" + createUrlQuery("returnUrl", pathName));
      } else {
        router.replace("/login");
      }
      authContext.setUser(null);
      clearLocalUserData();
    }
  }, [pathName]);

  useEffect(() => {
    const handleUnload = () => {
      clearTemporaryToken();
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  if (authContext.loading || authContext.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
