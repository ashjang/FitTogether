import React from "react";
import imgSrc from "./default-user-image.png";
import styled from "@emotion/styled";

interface Props {}

const PostContents: React.FC<Props> = () => {
  return (
    <PostContentsComponent>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage src={imgSrc} />
        </ProfileImageContainer>
        <ProfileNickname>sports addict</ProfileNickname>
      </ProfileContainer>
      <Post>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        obcaecati consequatur qui temporibus nisi impedit maxime, deleniti
        perspiciatis numquam dicta quas ipsum eveniet debitis eligendi porro
        explicabo, optio, quod corporis?
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        obcaecati consequatur qui temporibus nisi impedit maxime, deleniti
        perspiciatis numquam dicta quas ipsum eveniet debitis eligendi porro
        explicabo, optio, quod corporis?
        <br />
        <br />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
        obcaecati consequatur qui temporibus nisi impedit maxime, deleniti
        perspiciatis numquam dicta quas ipsum eveniet debitis eligendi porro
        explicabo, optio, quod corporis?
      </Post>
    </PostContentsComponent>
  );
};

const PostContentsComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 900px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px transparent solid;
  border-radius: 50%;
  margin: 10px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  display: block;
  padding: 0px;
  width: 35px;
  height: 35px;
`;

const ProfileNickname = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const Post = styled.div`
  width: 900px;
`;

export default PostContents;
