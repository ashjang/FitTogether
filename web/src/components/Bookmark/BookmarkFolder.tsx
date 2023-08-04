import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

const BookmarkFolder: React.FC = () => {
  return (
    <BookmarkFolderContainer>
      <div>
        <Link to="/mypage/myvideos/playlistId1">맘에들어 등산</Link>
      </div>
      <div>
        <Link to="/mypage/myvideos/playlistId2">친구랑 같이할거</Link>
      </div>
    </BookmarkFolderContainer>
  );
};

const BookmarkFolderContainer = styled.div``;

export default BookmarkFolder;
