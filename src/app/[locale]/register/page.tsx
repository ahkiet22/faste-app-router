// ** Import Next
import { NextPage } from "next";
import { ReactNode } from "react";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// * views
import BlankLayout from "src/views/layouts/BlankLayout";
import RegisterPage from "src/views/pages/register";

type TProps = {};

const Register: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper
      getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}
      guestGuard={true}
    >
      <RegisterPage />
    </AuthLayoutWrapper>
  );
};

export default Register;
