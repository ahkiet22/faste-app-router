// ** Import Next
import { NextPage } from "next";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** pages
import PaymentTypeListPage from "src/views/pages/settings/payment-type/PaymentTypeList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <PaymentTypeListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
