import React from "react";
import { Link } from "react-router-dom";
import PostFilter from "../components/Community/PostFilter";
import PostList from "../components/Community/PostList";
import styled from "@emotion/styled";

interface Props {}

const Community: React.FC<Props> = () => {
  return (
    <Page>
      <Title>커뮤니티</Title>
      <PostFilter />
      <PostList />
      <NewPost to="/community/createpost">게시글 작성</NewPost>
    </Page>
  );
};

const Title = styled.h1`
  width: 750px;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 750px;
  margin: 0 auto;
  // // min-height는 삭제 예정
  // min-height: calc(100vh - 300px);
`;

const NewPost = styled(Link)`
  width: 750px;
  display: flex;
  justify-content: flex-end;
`;
export default Community;
