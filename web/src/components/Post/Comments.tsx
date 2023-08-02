/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import imgSrc from "../../assets/default-user-image.png";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Modal from "react-modal";

interface Comment {
  commentId: string; // 댓글의 고유 ID
  userId: string;
  postedAt: string;
  content: string;
  likes: number;
  replies: Comment[];
}

const Comments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReplyInputs, setShowReplyInputs] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAddComment = () => {
    const newCommentItem: Comment = {
      commentId: nanoid(),
      userId: "ehhdrud",
      postedAt: "23-07-31",
      content: newComment,
      likes: 0,
      replies: [],
    };

    setComments([...comments, newCommentItem]);
    setNewComment("");
  };

  const handleAddReply = (targetCommentId: string) => {
    // 새로운 대댓글 객체 생성
    const newReplyItem: Comment = {
      commentId: nanoid(),
      userId: "ehhdrud",
      postedAt: "23-07-31",
      content: newReply,
      likes: 0,
      replies: [],
    };

    // 대댓글 추가를 위해 기존 댓글 목록을 복사하고, 대상 댓글의 replies 배열에 새로운 대댓글을 추가
    const updatedComments = comments.map((comment) => {
      if (comment.commentId === targetCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReplyItem],
        };
      }
      return comment;
    });

    // 업데이트된 댓글 목록 적용
    setComments(updatedComments);

    // 대댓글 입력창 초기화
    setNewReply("");

    // 대댓글 입력창 숨기기
    setShowReplyInputs({ ...showReplyInputs, [targetCommentId]: false });
  };

  const toggleReplyInput = (commentId: string) => {
    setShowReplyInputs({
      ...showReplyInputs,
      [commentId]: !showReplyInputs[commentId],
    });
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 해당 댓글을 삭제하는 로직 추가해야!!
  const handleDeleteIconClick = () => {};

  return (
    <CommentsComponent>
      <div>
        {comments.map((comment) => (
          <div key={comment.commentId}>
            <CommentContainer>
              <CommentItem>
                <TopDiv>
                  <ProfileImageContainer>
                    <ProfileImage src={imgSrc} />
                  </ProfileImageContainer>
                  <UserId>{comment.userId}</UserId>
                  <PostTime>{comment.postedAt}</PostTime>
                  {/* 해당 댓글의 작성자만 아이콘이 보이도록하는 로직 추가해야!! */}
                  <FaTrashCan icon={faTrashCan} onClick={handleToggleModal} />
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
                    <button onClick={handleDeleteIconClick}>삭제하기</button>
                    <button>취소하기</button>
                  </Modal>
                </TopDiv>
                <Content>{comment.content}</Content>
              </CommentItem>

              <ToggleReplyButton
                onClick={() => toggleReplyInput(comment.commentId)}
              >
                {showReplyInputs[comment.commentId] ? "닫기" : "대댓글 작성"}
              </ToggleReplyButton>
              {showReplyInputs[comment.commentId] && (
                <ReplyInputContainer>
                  <ReplyInput
                    type="text"
                    value={newReply}
                    placeholder="대댓글을 입력하세요"
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <ReplyButton
                    onClick={() => handleAddReply(comment.commentId)}
                  >
                    대댓글입력
                  </ReplyButton>
                </ReplyInputContainer>
              )}
              {comment.replies.map((reply) => (
                <div key={reply.commentId}>
                  <ReplyItem>
                    <TopDiv>
                      <ProfileImageContainer>
                        <ProfileImage src={imgSrc} />
                      </ProfileImageContainer>
                      <UserId>{reply.userId}</UserId>
                      <PostTime>{reply.postedAt}</PostTime>
                      {/* 해당 댓글의 작성자만 아이콘이 보이도록하는 로직 추가해야!! */}
                      <FaTrashCan
                        icon={faTrashCan}
                        onClick={handleToggleModal}
                      />
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
                    </TopDiv>
                    <Content>{reply.content}</Content>
                  </ReplyItem>
                </div>
              ))}
            </CommentContainer>
          </div>
        ))}
      </div>
      <CommentInputContainer>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <CommentButton onClick={handleAddComment}>댓글입력</CommentButton>
      </CommentInputContainer>
    </CommentsComponent>
  );
};

const CommentsComponent = styled.div`
  width: 850px;
  margin: 0 auto;
  margin-top: 50px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px transparent solid;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  display: block;
  padding: 0px;
  width: 35px;
  height: 35px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #d7d7d7;
`;

const CommentItem = styled.div`
  height: 60px;
`;

const ReplyItem = styled.div`
  height: 60px;
  margin-left: 50px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const UserId = styled.p`
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
`;

const PostTime = styled.p`
  margin: 5px 0 0 0;
  font-size: 10px;
`;

const FaTrashCan = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
`;

const Content = styled.p`
  margin: 0;
  font-size: 14px;
  margin-left: 45px;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ReplyInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CommentInput = styled.input`
  border: none;
  outline: none;
  width: 400px;
  padding: 5px;
  margin: 10px 0;
`;
const ReplyInput = styled.input`
  border: none;
  outline: none;
  width: 400px;
  padding: 5px;
  margin-left: 45px;
`;

const CommentButton = styled.button`
  border: none;
  background-color: #d7d7d7;
  padding: 5px 30px;
  cursor: pointer;
`;
const ReplyButton = styled.button`
  border: none;
  background-color: #d7d7d7;
  padding: 5px 30px;
  cursor: pointer;
`;

const ToggleReplyButton = styled.div`
  margin-left: 45px;
  padding: 5px 0;
  cursor: pointer;
  font-size: 0.7rem;
  color: blue;
`;
export default Comments;
