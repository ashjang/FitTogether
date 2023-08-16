import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaPlus } from 'react-icons/fa';
import MyVideoList from '../components/MyVideos/MyVideoList';

const MyVideos: React.FC = () => {
    return (
        <>
            <MyVideosContainer>
                <ListTitle>
                    <TitleTextStyle>맘에들어 등산</TitleTextStyle>
                    <Link to="/exerciseInfo">
                        <FaPlus css={[rightAlignedStyle, icon]} />
                    </Link>
                </ListTitle>
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
    justify-content: space-between;
    padding: 8px;
    padding-bottom: 30px;
    margin-top: 70px;
    margin-bottom: 70px;
    // font-size: 3rem;
    // font-weight: bold;
`;

const TitleTextStyle = styled.div`
    flex: 25;
    text-align: center;
    font-size: 3rem;
`;

const rightAlignedStyle = css`
    flex: 1;
    text-align: right;
    // font-size: 16px;
`;

const icon = css`
    cursor: pointer;
`;

const MyVideoContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export default MyVideos;
