/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import styled from '@emotion/styled';
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
        <img src="http://placehold.it/60x60" alt="프로필 이미지" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
      </NewCommentInput>
      <NewCommentArea>
        <button onClick={handleAddComment}>취소</button>
        <button onClick={handleAddComment}>댓글</button>
      </NewCommentArea>

      {/* 댓글 목록 */}
      <div></div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <img src="http://placehold.it/60x60" alt="프로필 이미지" />
          <p>{comment.id}</p>
          <p>{comment.content}</p>
          <button onClick={() => comment.likes++}>
            좋아요 {comment.likes}
          </button>
          <button onClick={() => comment.dislikes++}>
            싫어요 {comment.dislikes}
          </button>
          <br />

          {/* 대댓글 입력창 */}
          <input type="text" placeholder="대댓글을 입력하세요" />
          <button>대댓글 추가</button>

          {/* 대댓글 목록 */}
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <p>{reply.content}</p>
              <button onClick={() => reply.likes++}>
                좋아요 {reply.likes}
              </button>
              <button onClick={() => reply.dislikes++}>
                싫어요 {reply.dislikes}
              </button>
            </div>
          ))}
        </div>
      ))}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
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

export default Comments;
