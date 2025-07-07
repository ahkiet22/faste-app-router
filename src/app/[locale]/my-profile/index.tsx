// ** Import Next
import { NextPage } from "next";
import { ReactNode } from "react";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// * views
import LayoutNotApp from "src/views/layouts/LayoutNotApp";
import MyProfilePage from "src/views/pages/my-profile";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <MyProfilePage />
    </AuthLayoutWrapper>
  );
};

export default Index;
