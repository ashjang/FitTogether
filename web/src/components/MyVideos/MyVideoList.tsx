import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Videos {
    playlistName: string; // 필요없음
    videoTitle: string;
}

const MyVideoList: React.FC = () => {
    const token = sessionStorage.getItem('token');

    const [showPopup, setShowPopup] = useState(false);
    const [videos, setVideos] = useState<Videos[] | null>(null);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playlistName = urlParams.get('name');

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const response = await axios.get(`/api/playlist/${playlistName}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setVideos(response.data); // 응답값을 userData 상태에 저장
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('재생목록 정보를 받아오는데 실패했습니다.');
        }
    };

    // 플레이리스트 내 동영상을 삭제하는 함수
    // ❗ 삭제 요청을 포함한 비동기 함수로 변경해야함
    const handleVideoDelete = () => {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1000);
    };

    return (
        <MyVideoListContainer>
            {videos?.map((video) => {
                return (
                    <VideoListItem>
                        <VideoTitleArea>
                            <VideoTitle>{video.videoTitle}</VideoTitle>
                            <FaTrash onClick={() => handleVideoDelete()} />
                        </VideoTitleArea>
                        <img src="http://placehold.it/500x300" alt="예시" />
                    </VideoListItem>
                );
            })}
            {showPopup && <DeletePopup>즐겨찾기에서 해제되었습니다.</DeletePopup>}
        </MyVideoListContainer>
    );
};

const MyVideoListContainer = styled.div`
    position: relative;
`;

const VideoListItem = styled.div`
    margin-bottom: 50px;
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
    position: fixed;
    top: 50%;
    left: 44%;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    font-weight: bold;
    z-index: 9999;
`;

export default MyVideoList;
