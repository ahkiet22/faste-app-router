// ** Import Next
import { NextPage } from "next";

// ** Config
import { PERMISSIONS } from "src/configs/permission";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** views
import UserListPage from "src/views/pages/system/user/UserList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.SYSTEM.USER.VIEW]}>
      <UserListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
