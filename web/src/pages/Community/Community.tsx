import React from 'react';
import Comments from '../../components/Community_Post/Comments';

const Community: React.FC = () => {
  return (
    <div>
      <header>헤더</header>
      <div>
        Contents
        <Comments />
      </div>
      <footer>푸터</footer>
    </div>
  );
};

export default Community;
