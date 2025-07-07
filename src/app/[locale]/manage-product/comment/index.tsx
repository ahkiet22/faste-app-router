// ** Import Next
import { NextPage } from "next";
import AuthLayoutWrapper from "src/hocs/AuthLayoutWrapper";

// ** views
import CommentListPage from "src/views/pages/manage-product/comment/CommentList";

type TProps = {};

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <CommentListPage />
    </AuthLayoutWrapper>
  );
};

export default Index;
