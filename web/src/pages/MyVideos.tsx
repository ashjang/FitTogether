import React from 'react';

import styled from '@emotion/styled';
import MyVideoList from '../components/MyVideos/MyVideoList';

const MyVideos: React.FC = () => {

  return (
    <>
      <MyVideosContainer>
        <ListTitle>맘에들어 등산</ListTitle>
      </MyVideosContainer>
      <MyVideoContent>
        <MyVideoList />
      </MyVideoContent>
    </>
  );
};

const MyVideosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListTitle = styled.div`
  width: 1200px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  padding-bottom: 30px;
  margin-top: 70px;
  margin-bottom: 70px;
  font-size: 3rem;
  font-weight: bold;
`;

const MyVideoContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default MyVideos;
