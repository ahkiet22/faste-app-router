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

  useEffect(() => {
    if (
      authContext.user === null &&
      !getLocalUserData().accessToken &&
      !getLocalUserData().userData &&
      !getTemporaryToken().temporaryToken
    ) {
      if (
        pathName !== "/" &&
        pathName != "/login" &&
        pathName != "en/login" &&
        pathName != "en/"
      ) {
        router.replace("/login");
        // router.replace({
        //   pathname: '/login',
        //   query: { returnUrl: router.asPath }
        // })
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
