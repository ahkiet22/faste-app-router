import FallbackSpinner from "src/components/fall-back";
import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";
import NoGuard from "./NoGuard";
import { ReactNode } from "react";

type GuardProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  children: ReactNode;
};

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<FallbackSpinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <NoGuard fallback={<FallbackSpinner />}>{children}</NoGuard>;
  } else {
    return <AuthGuard fallback={<FallbackSpinner />}>{children}</AuthGuard>;
  }
};

export default Guard;
