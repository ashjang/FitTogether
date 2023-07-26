import React from "react";
import styled from "@emotion/styled";

interface Props {}

const CreatePost: React.FC<Props> = () => {
  return (
    <Page>
      <EditorField>게시판 에디터</EditorField>
      <SettingField>
        <SettingItem>
          <About>해시태그</About>
          <input />
        </SettingItem>
        <SettingItem>
          <About>카테고리</About>
          <CategoryTab>
            <button>러닝</button>
            <button>등산</button>
            <button>헬스</button>
          </CategoryTab>
        </SettingItem>
        <SettingItem>
          <About>공개 범위</About>
          <PublicTab>
            <button>전체</button>
            <button>메이트</button>
          </PublicTab>
        </SettingItem>
        <SubmitButton>등록</SubmitButton>
      </SettingField>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // min-height는 추후 삭제
  min-height: 100vh;
`;

const EditorField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 500px;
  margin-bottom: 30px;
  background-color: #d7d7d7;
`;

const SettingField = styled.div`
  position: relative;
  width: 1000px;
`;

const SettingItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const About = styled.p`
  width: 100px;
`;

const CategoryTab = styled.div`
  display: flex;
`;

const PublicTab = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 0;
`;

export default CreatePost;
