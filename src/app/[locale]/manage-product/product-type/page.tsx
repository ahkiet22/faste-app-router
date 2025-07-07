// ** Import Next
import { NextPage } from "next";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** pages
import ProductTypeListPage from "src/views/pages/manage-product/product-type/ProductTypeList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <ProductTypeListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
