import React from 'react';
import Comments from '../../components/Community_Post/Comments';

const Community: React.FC = () => {
  // 가상의 댓글 데이터
  const commentsData = [
    {
      id: 1,
      content: '첫 번째 댓글.',
      replies: [
        {
          id: 11,
          content: '첫 번째 댓글의 첫 번째 대댓글.',
          replies: [],
        },
        {
          id: 12,
          content: '첫 번째 댓글의 두 번째 대댓글',
          replies: [],
        },
      ],
    },
    {
      id: 2,
      content: '두 번째 댓글입니다.',
      replies: [],
    },
  ];

  return (
    <div>
      <header>헤더</header>
      <div>
        Contents
        <Comments comments={commentsData} />
      </div>
      <footer>푸터</footer>
    </div>
  );
};

export default Community;
