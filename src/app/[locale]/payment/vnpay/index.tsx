// ** Import Next
import { NextPage } from "next";
import { ReactNode } from "react";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** views
import BlankLayout from "src/views/layouts/BlankLayout";
import PaymentVNPay from "src/views/pages/payment/vnpay";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper
      getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}
    >
      <PaymentVNPay />
    </AuthLayoutWrapper>
  );
};

export default Index;
