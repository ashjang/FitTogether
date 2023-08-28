import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilValue } from 'recoil';
import { categoryRecoil } from '../../recoil/video/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';
import { fetchVideos, resetTotalResults, VideosResponse, Video } from './YoutubeApi';
import VideoPopup from './VideoPopup';
import PlaylistSetting from './PlaylistSetting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../assets/Spinner.svg';

const VideoList: React.FC = () => {
    const isLoggedIn = useRecoilValue(loggedInState);
    const category = useRecoilValue<string>(categoryRecoil);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

    useEffect(() => {
        resetTotalResults();
    }, [category]);

    const fetchVideosWrapped = useCallback(
        async ({ pageParam = null }) => {
            const response = await fetchVideos(pageParam, category);
            return response;
        },
        [category]
    );

    const { data, isError, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
        VideosResponse,
        Error
    >(['videos', category], fetchVideosWrapped, {
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
        keepPreviousData: true,
        enabled: category !== '',
    });

    const handleFetchMore = useCallback(async () => {
        if (hasNextPage) {
            try {
                await fetchNextPage();
            } catch (error) {
                console.error('Error fetching next page:', error);
            }
        }
    }, [hasNextPage, fetchNextPage]);

    // 팝업창
    const openVideo = useCallback((video: Video) => {
        setSelectedVideo(video);
    }, []);

    const closeVideo = useCallback(() => {
        setSelectedVideo(null);
    }, []);

    //즐겨찾기
    const handleIconClick = useCallback(
        (video: Video) => {
            if (!isLoggedIn) {
                alert('로그인 후 이용해주세요.');
                return;
            }

            setCurrentVideo(video);
            setShowModal(true);
        },
        // []
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
                    <ErrorMessage>
                        일일 요청 횟수를 초과하여 영상을 불러올 수 없습니다.
                    </ErrorMessage>
                ) : (
                    <InfiniteScroll
                        dataLength={
                            data?.pages.reduce((acc, page) => acc + page.items.length, 0) || 0
                        }
                        next={handleFetchMore}
                        hasMore={!!hasNextPage}
                        loader={<img src={Spinner} alt="Loading" />}
                    >
                        {data?.pages.map((page, i) => (
                            <React.Fragment key={i}>
                                {page.items.map((video: Video) => (
                                    <VideoItem
                                        key={video.id.videoId}
                                        onClick={() => {
                                            openVideo(video);
                                        }}
                                    >
                                        <VideoTitle>
                                            {video.snippet.title.length > 50
                                                ? `${video.snippet.title.substring(0, 50)}...`
                                                : video.snippet.title}
                                            <FaFolderPlus
                                                icon={faFolderPlus}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleIconClick(video);
                                                }}
                                            />
                                        </VideoTitle>
                                        <VideoThumbnail
                                            src={
                                                video.snippet.thumbnails.high?.url ||
                                                video.snippet.thumbnails.default.url
                                            }
                                            alt={video.snippet.title}
                                        />
                                    </VideoItem>
                                ))}
                            </React.Fragment>
                        ))}
                    </InfiniteScroll>
                )}
            </VideoContainer>

            {selectedVideo && (
                <VideoPopup
                    video={{ id: selectedVideo.id.videoId, title: selectedVideo.snippet.title }}
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
