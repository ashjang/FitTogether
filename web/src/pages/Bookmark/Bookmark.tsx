/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import BookmarkFolder from '../../components/Bookmark/BookmarkFolder';
import BookmarkSetting from '../../components/Bookmark/BookmarkSetting';

const Bookmark: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [folders, setFolders] = useState<string[]>([]);

  const togglePopup = () => {
    setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
  };

  const addFolder = (folderName: string) => {
    setFolders((prevFolders) => [...prevFolders, folderName]);
  };

  return (
    <div>
      <header>헤더</header>
      <div css={Container}>
        <TitleArea>
          <p css={centeredTextStyle}>즐겨찾기</p>
          {isPopupOpen ? (
            <>
              <BookmarkSetting addFolder={addFolder} />
              <FaMinus css={rightAlignedStyle} onClick={togglePopup} />
            </>
          ) : (
            <FaPlus css={rightAlignedStyle} onClick={togglePopup} />
          )}
        </TitleArea>
      </div>
      <div css={Container}>
        <BookmarkFolder folders={folders} />
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
  font-size: 26px;
  font-weight: 700;
`;

const rightAlignedStyle = css`
  flex: 1;
  text-align: right;
  cursor: pointer;
`;

export default Bookmark;
