import React, { useState } from "react";
import default_user_image from "../../assets/default-user-image.png";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";

const imageSrc: string = default_user_image;

interface Props {}

interface Data {
  profileImage: string;
  nickname: string;
  postTitle: string;
  postContents: string;
  likeCount: number;
  commentCount: number;
  hitsCount: number;
}

const data: Data = {
  profileImage: imageSrc,
  nickname: "ehhdrud",
  postTitle: "postTitle",
  postContents:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut omnis, perferendis debitis officia exercitationem similique ipsum reiciendis fugiat suscipit quaerat doloremque neque eligendi ad soluta rerum, alias possimus qui hic. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut omnis, perferendis debitis officia exercitationem similique ipsum reiciendis fugiat suscipit quaerat doloremque neque eligendi ad soluta rerum, alias possimus qui hic. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut omnis, perferendis debitis officia exercitationem similique ipsum reiciendis fugiat suscipit quaerat doloremque neque eligendi ad soluta rerum, alias possimus qui hic. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut omnis, perferendis debitis officia exercitationem similique ipsum reiciendis fugiat suscipit quaerat doloremque neque eligendi ad soluta rerum, alias possimus qui hic. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut omnis, perferendis debitis officia exercitationem similique ipsum reiciendis fugiat suscipit quaerat doloremque neque eligendi ad soluta rerum, alias possimus qui hic.",
  likeCount: 99,
  commentCount: 20,
  hitsCount: 500,
};

const {
  profileImage,
  nickname,
  postTitle,
  postContents,
  likeCount,
  commentCount,
  hitsCount,
} = data;

const PostContents: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <PostContentsComponent>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage src={profileImage} />
        </ProfileImageContainer>
        <ProfileNickname>{nickname}</ProfileNickname>
        {/* 해당 포스트의 작성자만 아이콘이 보이도록하는 로직 추가해야!! */}
        <FaEllipsis icon={faEllipsis} onClick={handleToggleModal} />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleToggleModal}
          contentLabel="Example Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "max-content",
              height: "max-content",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              backgroundColor: "transparent",
            },
          }}
        >
          <button>수정하기</button>
          <button>삭제하기</button>
        </Modal>
      </ProfileContainer>
      <Post>
        <h1>{postTitle}</h1>
        <p>{postContents}</p>
      </Post>
      <PostDetail>
        <PostDetailItem>
          <FaThumbsUp icon={faThumbsUp} />
          <span>{likeCount}</span>
        </PostDetailItem>
        <PostDetailItem>
          <FaComment icon={faComment} />
          <span>{commentCount}</span>
        </PostDetailItem>
        <PostDetailItem>
          <span>조회수: {hitsCount}</span>
        </PostDetailItem>
      </PostDetail>
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
  width: 850px;
`;

const PostDetail = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 850px;
`;

const PostDetailItem = styled.div`
  margin-right: 15px;
`;

const FaThumbsUp = styled(FontAwesomeIcon)`
  // position: absolute;
  // margin: 0 30px;
  // right: 0px;
`;

const FaComment = styled(FontAwesomeIcon)`
  // position: absolute;
  // margin: 0 30px;
  // right: 0px;
`;

export default PostContents;
