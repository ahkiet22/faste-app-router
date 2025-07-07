// ** Import Next
import { NextPage } from "next";
import { PERMISSIONS } from "src/configs/permission";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";
import ProductListPage from "src/views/pages/manage-product/product/ProductList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW]}>
      <ProductListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
