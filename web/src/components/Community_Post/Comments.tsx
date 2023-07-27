/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BsHandThumbsUp } from 'react-icons/bs';
interface Comment {
  id: number;
  content: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObject: Comment = {
        id: Date.now(), // 간단한 예시를 위해 일시적으로 현재 시간을 id로 사용
        content: newComment,
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      setComments([...comments, newCommentObject]);
      setNewComment('');
    }
  };

  return (
    <CommentContainer>
      <NewCommentInput>
        {/* 댓글 입력창 */}
        <CommentProfile>
          <img src="http://placehold.it/60x60" alt="프로필 이미지" />
        </CommentProfile>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
      </NewCommentInput>
      <NewCommentArea>
        <CommentBtn onClick={handleAddComment}>취소</CommentBtn>
        <CommentBtn onClick={handleAddComment}>댓글</CommentBtn>
      </NewCommentArea>

      {/* 댓글 목록 */}
      <div>
        {comments.map((comment) => (
          <>
            <div>
              <CommentList key={comment.id}>
                <CommentProfile>
                  <img src="http://placehold.it/60x60" alt="프로필 이미지" />
                </CommentProfile>
                <CommentView>
                  <CommentId>{comment.id}</CommentId>
                  <CommentContent>{comment.content}</CommentContent>
                </CommentView>
              </CommentList>
              <LikeArea>
                <LikeBtn>
                  <BsHandThumbsUp onClick={() => comment.likes++} />
                </LikeBtn>
                <LikeCount>{comment.likes}</LikeCount>
                {/* <CommentBtn onClick={() => comment.dislikes++}>
                  싫어요 {comment.dislikes}
                </CommentBtn> */}
                <OpenReplyArea>댓글달기</OpenReplyArea>
              </LikeArea>
              <ReplyCount>댓글 1개</ReplyCount>
            </div>
            <div>
              {/* 대댓글 입력창 */}
              <CommentInput type="text" placeholder="대댓글을 입력하세요" />
              <NewCommentArea>
                <CommentBtn>취소</CommentBtn>
                <CommentBtn>댓글</CommentBtn>
              </NewCommentArea>

              {/* 대댓글 목록 */}
              {comment.replies.map((reply) => (
                <div key={reply.id}>
                  <img src="http://placehold.it/60x60" alt="프로필 이미지" />
                  <p>{reply.content}</p>
                  <LikeArea>
                    <LikeBtn>
                      <BsHandThumbsUp onClick={() => comment.likes++} />
                    </LikeBtn>
                    <LikeCount>{comment.likes}</LikeCount>
                    {/* <CommentBtn onClick={() => comment.dislikes++}>
                    싫어요 {comment.dislikes}
                    </CommentBtn> */}
                  </LikeArea>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
`;

const CommentProfile = styled.div`
  width: 60px;
  height: 60px;
`;

const NewCommentInput = styled.div`
  display: flex;
  align-items: center;
`;

const NewCommentArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const CommentBtn = styled.button`
  border: none;
  background-color: white;
  padding: 10px 30px;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 25px;
  }
`;

const CommentList = styled.div`
  display: flex;
`;

const CommentView = styled.div`
  height: 60px;
`;

const CommentId = styled.p`
  margin: 0;
  margin-left: 10px;
  padding: 5px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CommentContent = styled.p`
  margin: 0;
  margin-left: 10px;
  padding: 5px;
`;

const CommentInput = styled.input`
  margin-left: 10px;
  border: none;
  outline: none;
  width: 80%;
  padding: 5px;
`;

const LikeArea = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  margin-top: 5px;
`;

const LikeBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 25px;
  height: 25px;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 25px;
`;

const LikeCount = styled.div`
  margin: 0 10px;
`;

const OpenReplyArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  padding: 5px;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 25px;
  }
`;

const ReplyCount = styled.div`
  color: #3771c8;
  font-size: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  width: 70px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #a5c0e8;
    border-radius: 25px;
  }
`;

export default Comments;
