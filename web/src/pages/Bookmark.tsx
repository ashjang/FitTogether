/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import BookmarkFolder from '../components/Bookmark/BookmarkFolder';
// import BookmarkSetting from '../components/Bookmark/BookmarkSetting';
import PlaylistSetting from '../components/common/PlaylistSetting';

const Bookmark: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const togglePopup = () => {
        setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
        console.log(isPopupOpen);
    };

    return (
        <BookmarkPage>
            <div css={Container}>
                <TitleArea>
                    <p css={centeredTextStyle}>저장된 동영상</p>
                    {isPopupOpen ? (
                        <FaMinus css={[rightAlignedStyle, icon]} onClick={togglePopup} />
                    ) : (
                        <FaPlus css={[rightAlignedStyle, icon]} onClick={togglePopup} />
                    )}
                    {isPopupOpen && (
                        <PlaylistSetting video={null} onClose={() => setIsPopupOpen(false)} />
                    )}
                </TitleArea>
            </div>
            <div css={Container}>
                <BookmarkFolder />
            </div>
        </BookmarkPage>
    );
};

const BookmarkPage = styled.div`
    margin-top: 150px;
    min-height: calc(100vh - 200px);
`;

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
    padding-bottom: 30px;
    margin-bottom: 50px;
    font-weight: bold;
`;

const centeredTextStyle = css`
    flex: 25;
    text-align: center;
    font-size: 3rem;
`;

const rightAlignedStyle = css`
    flex: 1;
    text-align: right;
`;

const icon = css`
    cursor: pointer;
`;

export default Bookmark;
