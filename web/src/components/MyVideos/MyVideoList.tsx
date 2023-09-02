import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoPopup from '../ExerciseInfo/VideoPopup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash } from 'react-icons/fa';
import styled from '@emotion/styled';
import Spinner from '../../assets/Spinner.svg';

interface Video {
    videoId: string;
    title: string;
    thumbnail: string;
    keyword: string;
}

interface VideoList {
    values: Video[];
    hasNext: boolean;
    lastId: number;
}

const MyVideoList: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [showPopup, setShowPopup] = useState(false);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playlistName: string | null = urlParams.get('name');
    const [clickedVideo, setClidkedVideo] = useState<Video | null>(null);

    // 플레이리스트 내 동영상을 삭제하는 함수
    const handleVideoDelete = async (videoId: string) => {
        try {
            const response = await axios.delete(`/api/playlist/${playlistName}/video/${videoId}`, {
                headers: { 'X-AUTH-TOKEN': token },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert('동영상 삭제 중 오류가 발생하였습니다.');
        }

        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1000);
    };

    const fetchVideos = async (playlistName: string | null, lastId: number): Promise<VideoList> => {
        const response = await axios.get<VideoList>(
            `/api/playlist/${playlistName}?cursorId=${lastId}&size=5`,
            {
                headers: { 'X-AUTH-TOKEN': token },
            }
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(response.data);
        return response.data;
    };

    const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<
        VideoList,
        Error
    >(['videos', playlistName], ({ pageParam = -1 }) => fetchVideos(playlistName, pageParam), {
        getNextPageParam: (lastPage) => {
            // 이전 페이지의 lastId를 반환하여 다음 페이지 요청 시 사용
            if (lastPage.hasNext) {
                // hasNext가 true인 경우에만 다음 페이지 요청
                return lastPage.lastId;
            } else {
                // 더이상 불러올 데이터가 없는 경우 null 반환하여 페이지 요청 중단
                return null;
            }
        },
    });

    let videoList = data?.pages.flatMap((page) => page.values);

    // 비디오 팝업을 여는 함수
    const openVideo = useCallback((video: Video) => {
        setClidkedVideo(video);
    }, []);

    // 비디오 팝업을 닫는 함수
    const closeVideo = useCallback(() => {
        setClidkedVideo(null);
    }, []);

    return (
        <MyVideoListComponent>
            <VideoContainer>
                {isLoading ? (
                    <Loading>
                        <span className="blind">로딩 중입니다.</span>
                    </Loading>
                ) : isError ? (
                    <ErrorMessage>Error</ErrorMessage>
                ) : (
                    <InfiniteScroll
                        dataLength={videoList?.length || 0}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={<img src={Spinner} alt="Loading" />}
                    >
                        {videoList?.map((video) => (
                            <VideoItem
                                key={video.videoId}
                                onClick={() => {
                                    openVideo(video);
                                }}
                            >
                                <VideoTitle>
                                    {video.title.length > 50
                                        ? `${video.title.substring(0, 50)}...`
                                        : video.title}
                                    <TrashIcon onClick={() => handleVideoDelete(video.videoId)} />
                                </VideoTitle>
                                <VideoThumbnail src={video.thumbnail} alt={video.title} />
                            </VideoItem>
                        ))}
                    </InfiniteScroll>
                )}
            </VideoContainer>
            {clickedVideo && (
                <VideoPopup
                    video={{ videoId: clickedVideo.videoId, title: clickedVideo.title }}
                    onClose={closeVideo}
                />
            )}
            {showPopup && <DeletePopup>즐겨찾기에서 해제되었습니다.</DeletePopup>}
        </MyVideoListComponent>
    );
};

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

const MyVideoListComponent = styled.div`
    position: relative;
    padding: 20px 60px;
    box-sizing: border-box;
`;

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin: 150px auto 0;
    max-width: 800px;
    text-align: center;
`;

const Loading = styled.p`
    padding-top: 200px;
    background: url(${Spinner}) no-repeat center center;
`;
const ErrorMessage = styled.p`
    font-size: 40px;
    padding-top: 100px;
`;

const VideoItem = styled.div`
    cursor: pointer;
    margin-bottom: 50px;
    border-radius: 15px;
    overflow: hidden;
`;

const VideoTitle = styled.h4`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d7d7d7;
    text-align: left;
    text-shadow: 2px 2px 4px #000;
    padding: 5px 15px;
    background-color: #444;
`;

const VideoThumbnail = styled.img`
    width: 100%;
    // height: 500px;
`;

const TrashIcon = styled(FaTrash)`
    font-size: 20px;
    color: #fff;
    stroke-width: 30px;
    cursor: pointer;
`;
export default MyVideoList;
