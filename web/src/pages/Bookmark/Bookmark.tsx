/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaPlus } from 'react-icons/fa';

import BookmarkFolder from '../../components/Bookmark/BookmarkFolder';
import BookmarkSetting from '../../components/Bookmark/BookmarkSetting';

const Bookmark: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <header>헤더</header>
      <div css={Container}>
        <TitleArea>
          <p css={centeredTextStyle}>즐겨찾기</p>
          <FaPlus css={[rightAlignedStyle, plusIcon]} onClick={openPopup} />
          {isPopupOpen && (
            <div css={popupStyle}>
              <BookmarkSetting />
              <button onClick={closePopup}>닫기</button>
            </div>
          )}
        </TitleArea>
      </div>
      <div css={Container}>
        <BookmarkFolder />
      </div>
      <footer>푸터</footer>
    </div>
  );
};

const Container = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleArea = styled.div`
  width: 1200px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-top: 70px;
  margin-bottom: 70px;
`;

const centeredTextStyle = css`
  flex: 25;
  text-align: center;
`;

const rightAlignedStyle = css`
  flex: 1;
  text-align: right;
`;

const plusIcon = css`
  cursor: pointer;
`;

const popupStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: solid 1px black;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
`;

export default Bookmark;
