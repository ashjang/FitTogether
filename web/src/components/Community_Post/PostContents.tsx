import React, { useState } from "react";
import imgSrc from "./default-user-image.png";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

interface Props {}

const PostContents: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen); // isModalOpen 상태를 반대로 토글합니다.
  };

  return (
    <PostContentsComponent>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage src={imgSrc} />
        </ProfileImageContainer>
        <ProfileNickname>sports addict</ProfileNickname>
        <FaEllipsis icon={faEllipsis} onClick={handleToggleModal} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleToggleModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
            content: {
              width: "max-content",
              height: "max-content",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            },
          }}
        >
          <button>수정하기</button>
          <button>삭제하기</button>
        </Modal>
      </ProfileContainer>
      <Post>
        <h1>Title</h1>
        <p>
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
        </p>
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
  position: relative;
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

const FaEllipsis = styled(FontAwesomeIcon)`
  position: absolute;
  margin: 0 30px;
  right: 0px;
`;

const Post = styled.div`
  width: 900px;
`;

export default PostContents;
