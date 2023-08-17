import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaPlus } from 'react-icons/fa';
import MyVideoList from '../components/MyVideos/MyVideoList';

const MyVideos: React.FC = () => {
    const token = sessionStorage.getItem('token');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playlistName = urlParams.get('name');

    const [userData, setUserData] = useState([]);
    const [videoTitles, setVideoTitles] = useState<string[]>([]);

    useEffect(() => {
        if (token) {
            getUserData(token);
        }
    }, []);
    const getUserData = async (token) => {
        try {
            const response = await axios.get(`/api/playlist/${playlistName}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setUserData(response.data); // 응답값을 userData 상태에 저장
            setVideoTitles(response.data.map((item) => item.videoTitle));
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('재생목록 정보를 받아오는데 실패했습니다.');
        }
    };

    return (
        <>
            <MyVideosContainer>
                <ListTitle>
                    <TitleTextStyle>{playlistName}</TitleTextStyle>
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
    margin-top: 120px;
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
