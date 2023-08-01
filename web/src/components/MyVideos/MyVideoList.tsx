import React, { useState } from 'react';
import styled from '@emotion/styled';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { FaStar } from 'react-icons/fa';

const MyVideoList: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isStarClicked, setIsStarClicked] = useState(false);

  const handleStarClick = () => {
    setIsStarClicked(true);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsStarClicked(false);
    }, 1000); // 1초 후 알림 팝업이 사라짐
  };

  return (
    <MyVideoListContainer>
      <VideoListContent>
        <VideoTitleArea>
          <VideoTitle>
            저질 체력도 가능한 설악산 등산 코스! 저질 체력도 가능한 설악산 등산
            코스!
          </VideoTitle>
          <FaStar
            onClick={handleStarClick}
            style={{
              color: isStarClicked ? '#C4C4C4' : '#FF9A62',
            }}
          />
        </VideoTitleArea>
        <img src="http://placehold.it/500x300" alt="예시" />
        {showPopup && <DeletePopup>즐겨찾기에서 해제되었습니다.</DeletePopup>}
      </VideoListContent>
    </MyVideoListContainer>
  );
};

const MyVideoListContainer = styled.div`
  position: relative;
  margin-bottom: 100px;
`;

const VideoListContent = styled.div`
  margin: 15px;
`;

const VideoTitleArea = styled.div`
  width: 500px;
  padding: 4px 9px;
  background-color: #888888;
  color: white;
  text-shadow: 2px 2px 4px #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VideoTitle = styled.div`
  // flex: 1;
  width: 400px;
  padding-left: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeletePopup = styled.div`
  position: absolute;
  bottom: 0;
  right: 50px;
  transform: translate(50%, 50%);
  padding: 10px 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  font-weight: bold;
  z-index: 9999;
`;

export default MyVideoList;
