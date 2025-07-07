// ** Import Next
import { NextPage } from "next";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** views
import CityListPage from "src/views/pages/settings/city/CityList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <CityListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
