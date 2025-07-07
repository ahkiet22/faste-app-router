// ** Import Next
import { NextPage } from "next";
import { ReactNode } from "react";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// * views
import BlankLayout from "src/views/layouts/BlankLayout";
import LoginPage from "src/views/pages/login";

type TProps = {};

const Login: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper
      getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}
      guestGuard = {true}
    >
      <LoginPage />
    </AuthLayoutWrapper>
  );
};

export default Login;
