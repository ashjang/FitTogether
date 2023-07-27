import React from "react";
import PostFilter from "../components/Community/PostFilter";
import PostList from "../components/Community/PostList";
import styled from "@emotion/styled";

interface Props {}

const Community: React.FC<Props> = () => {
  return (
    <Page>
      <PostFilter />
      <PostList />
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // min-height는 삭제 예정
  min-height: calc(100vh - 300px);
`;
export default Community;
