"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next
import { usePathname, useRouter } from "next/navigation";

// ** Helper
import { getLocalUserData } from "src/helpers/storage/index";

// ** Hook
import { useAuth } from "src/hooks/useAuth";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  // ** props
  const { children, fallback } = props;

  // ** auth
  const authContext = useAuth();

  // ** router
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (getLocalUserData().accessToken && getLocalUserData().userData) {
      router.replace("/");
    }
  }, [pathName]);

  if (
    authContext.loading ||
    (!authContext.loading && authContext.user !== null)
  ) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
