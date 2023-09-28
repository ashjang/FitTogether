import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import MyVideoList from '../components/MyVideos/MyVideoList';

const MyVideos: React.FC = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playlistName = urlParams.get('name');

    return (
        <MyVideosComponent>
            <MyVideosContainer>
                <ListTitle>
                    <TitleTextStyle>{playlistName}</TitleTextStyle>
                    <Link to="/exerciseInfo">
                        <LinkText>모든 동영상</LinkText>
                    </Link>
                </ListTitle>
            </MyVideosContainer>
            <MyVideoContent>
                <MyVideoList />
            </MyVideoContent>
        </MyVideosComponent>
    );
};

const MyVideosComponent = styled.div`
    min-height: calc(100vh - 200px);

    overflow: hidden;
`;

const MyVideosContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 110px;
`;

const ListTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 1200px;
    padding: 8px;
    margin-top: 70px;
    margin-bottom: 70px;
`;

const TitleTextStyle = styled.h2`
    flex: 25;
    text-align: center;
    font-size: 3rem;
`;

const LinkText = styled.p`
    position: absolute;
    right: 0;
    color: blue;
    font-size: 14px;
`;

const MyVideoContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export default MyVideos;
