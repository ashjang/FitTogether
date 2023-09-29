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
                    <TitleText>{playlistName}</TitleText>
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
    max-width: 840px;
    min-height: calc(100vh - 165px);
    margin: 110px auto 0;
    padding: 20px;
    overflow: hidden;
`;

const MyVideosContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ListTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 800px;
    margin-bottom: 70px;
`;

const TitleText = styled.h2``;

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
