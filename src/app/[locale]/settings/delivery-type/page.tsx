// ** Import Next
import { NextPage } from "next";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** pages
import DeliveryTypeListPage from "src/views/pages/settings/delivery-type/DeliveryTypeList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <DeliveryTypeListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
