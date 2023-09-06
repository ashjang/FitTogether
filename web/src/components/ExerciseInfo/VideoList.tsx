import React, { useState, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { categoryRecoil } from '../../recoil/video/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';
import VideoPopup from './VideoPopup';
import PlaylistSetting from './PlaylistSetting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
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

const VideoList: React.FC = () => {
    const isLoggedIn = useRecoilValue(loggedInState);
    const category = useRecoilValue<string>(categoryRecoil);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [clickedVideo, setClidkedVideo] = useState<Video | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const fetchVideos = async (category: string, lastId: number): Promise<VideoList> => {
        const response = await axios.get<VideoList>(
            `/api/video/${category}?cursorId=${lastId}&size=5`
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(response.data);
        return response.data;
    };

    const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<
        VideoList,
        Error
    >(['videos', category], ({ pageParam = -1 }) => fetchVideos(category, pageParam), {
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

    // 동영상을 저장하는 함수
    const handleIconClick = useCallback(
        (video: Video) => {
            if (!isLoggedIn) {
                alert('로그인 후 이용해주세요.');
                return;
            }
            setSelectedVideo(video);
            setShowModal(true);
        },
        [isLoggedIn]
    );

    return (
        <VideoListComponent>
            <VideoContainer>
                {isLoading ? (
                    <Loading>
                        <img src={Spinner} alt="Loading" />
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
                                    <FaFolderPlus
                                        icon={faFolderPlus}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleIconClick(video);
                                        }}
                                    />
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
            {showModal && selectedVideo && (
                <PlaylistSetting video={selectedVideo} onClose={() => setShowModal(false)} />
            )}
        </VideoListComponent>
    );
};

const VideoListComponent = styled.div`
    position: relative;
    padding: 20px 60px;
    box-sizing: border-box;
`;

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin: 50px auto 0;
    text-align: center;
`;

const Loading = styled.p`
    padding-top: 200px;
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
    width: 700px;
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
`;

const FaFolderPlus = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: #fff;
    stroke-width: 30px;
`;

export default VideoList;
