"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { ReactNode, useEffect } from "react";

// ** Next
import { usePathname, useRouter } from "next/navigation";

// ** Types
import BlankLayout from "src/views/layouts/BlankLayout";
import NotAuthorized from "src/views/pages/not-authorized";
import { useAuth } from "src/hooks/useAuth";

// ** Configs
import { PERMISSIONS } from "src/configs/permission";
import { ROUTE_CONFIG } from "src/configs/route";
import { buildAbilityFor, type ACLObj, AppAbility } from "src/configs/acl";
import { AbilityContext } from "src/components/acl/Can";

interface AclGuardProps {
  children: ReactNode;
  authGuard?: boolean;
  guestGuard?: boolean;
  aclAbilities: ACLObj;
  permission: string[];
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const {
    aclAbilities,
    children,
    guestGuard = false,
    authGuard = true,
    permission,
  } = props;

  const auth = useAuth();
  const permissionUser = auth.user?.role?.permissions
    ? auth.user?.role?.permissions?.includes(PERMISSIONS.BASIC)
      ? [PERMISSIONS.DASHBOARD]
      : auth.user?.role?.permissions
    : [];
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/" || pathName === "en/") {
      router.push(ROUTE_CONFIG.HOME);
    }
  }, [pathName]);

  let ability: AppAbility;

  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, permission);
  }

  // if gues guard or no guard is tru or error page
  if (
    guestGuard ||
    pathName === "/500" ||
    pathName === "/404" ||
    pathName === "en/500" ||
    pathName === "en/404" ||
    !authGuard
  ) {
    if (auth.user && ability) {
      return (
        <AbilityContext.Provider value={ability}>
          {children}
        </AbilityContext.Provider>
      );
    } else {
      return children;
    }
  }

  // check the access off current user
  if (
    ability &&
    auth.user &&
    ability.can(aclAbilities.action, aclAbilities.subject)
  ) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
};

export default AclGuard;
