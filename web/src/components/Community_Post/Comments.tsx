import React, { useState } from 'react';

interface Comment {
  id: number;
  content: string;
  replies: Comment[];
}

interface CommentsProps {
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = (parentId: number | null) => {
    if (newComment.trim() !== '') {
      const newCommentObject: Comment = {
        id: Date.now(), // 간단한 예시를 위해 일시적으로 현재 시간을 id로 사용합니다.
        content: newComment,
        replies: [],
      };

      if (parentId !== null) {
        // 대댓글인 경우
        const parentComment = findComment(comments, parentId);
        if (parentComment) {
          parentComment.replies.push(newCommentObject);
        }
      } else {
        // 댓글인 경우
        comments.push(newCommentObject);
      }

      setNewComment('');
    }
  };

  const findComment = (
    comments: Comment[],
    id: number
  ): Comment | undefined => {
    for (const comment of comments) {
      if (comment.id === id) {
        return comment;
      }
      const reply = findComment(comment.replies, id);
      if (reply) {
        return reply;
      }
    }
    return undefined;
  };

  return (
    <>
      {/* 댓글 입력창 */}
      <div>
        <input type="text" value={newComment} onChange={handleInputChange} />
        <button onClick={() => handleAddComment(null)}>입력</button>
      </div>

      {/* 댓글 목록 */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <div style={{ marginLeft: '20px' }}>
            {/* 대댓글 입력 */}
            <input
              type="text"
              value={newComment}
              onChange={handleInputChange}
              placeholder="대댓글을 입력하세요"
            />
            <button onClick={() => handleAddComment(comment.id)}>대댓글</button>
            <Comments comments={comment.replies} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
