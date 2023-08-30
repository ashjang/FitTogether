import React, { useState, useCallback, useEffect } from 'react';
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

const VideoList: React.FC = () => {
    const isLoggedIn = useRecoilValue(loggedInState);
    const category = useRecoilValue<string>(categoryRecoil);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [page, setPage] = useState<number>(1);

    const fetchVideos = async (category: string, page: number = 1): Promise<Video[]> => {
        // const response = await axios.get<Video>(`/api/video/${category}/${page}`);
        const response = await axios.get<Video[]>(
            `http://localhost:4000/video-${category}-${page}`
        );
        setPage(page + 1);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return response.data;
    };

    const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery<
        Video[],
        Error
    >('videos', ({ pageParam = page }) => fetchVideos(category, pageParam), {
        getNextPageParam: () => {
            return page;
        },
    });

    const allVideos = data?.pages.flatMap((page) => page);

    // 비디오 팝업을 여는 함수
    const openVideo = useCallback((video: Video) => {
        setSelectedVideo(video);
    }, []);

    // 비디오 팝업을 닫는 함수
    const closeVideo = useCallback(() => {
        setSelectedVideo(null);
    }, []);

    // 동영상을 저장하는 함수
    const handleIconClick = useCallback(
        (video: Video) => {
            if (!isLoggedIn) {
                alert('로그인 후 이용해주세요.');
                return;
            }
            setCurrentVideo(video);
            setShowModal(true);
        },
        [isLoggedIn]
    );

    return (
        <VideoListComponent>
            <VideoContainer>
                {isLoading ? (
                    <Loading>
                        <span className="blind">로딩 중입니다.</span>
                    </Loading>
                ) : isError ? (
                    <ErrorMessage>Error</ErrorMessage>
                ) : (
                    <InfiniteScroll
                        dataLength={allVideos?.length || 0}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={<img src={Spinner} alt="Loading" />}
                    >
                        {allVideos?.map((video) => (
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
            {selectedVideo && (
                <VideoPopup
                    video={{ id: selectedVideo.videoId, title: selectedVideo.title }}
                    onClose={closeVideo}
                />
            )}
            {showModal && currentVideo && (
                <PlaylistSetting video={currentVideo} onClose={() => setShowModal(false)} />
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
`;

const VideoTitle = styled.h4`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    text-align: left;
    text-shadow: 2px 2px 4px #000;
    padding: 5px 15px;
    background-color: #888;
`;

const VideoThumbnail = styled.img`
    width: 100%;
    // height: 500px;
`;

const FaFolderPlus = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: #fff;
    stroke-width: 30px;
`;

export default VideoList;
