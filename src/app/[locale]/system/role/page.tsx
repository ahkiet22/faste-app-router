// ** Import Next
import { NextPage } from "next";
import { PERMISSIONS } from "src/configs/permission";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// pages
import RoleListPage from "src/views/pages/system/role/RoleList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.SYSTEM.ROLE.VIEW]}>
      <RoleListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
