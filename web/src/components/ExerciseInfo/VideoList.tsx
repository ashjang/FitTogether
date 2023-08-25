import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilValue } from 'recoil';
import { categoryRecoil } from '../../recoil/video/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';
import { fetchVideos, resetTotalResults, VideosResponse, Video } from './YoutubeApi';
import VideoPopup from './VideoPopup';
import PlaylistSetting from '../common/PlaylistSetting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import loadingGif from '../../assets/ball-triangle.svg';

const VideoList: React.FC = () => {
    const category = useRecoilValue<string>(categoryRecoil);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

    const isLoggedIn = useRecoilValue(loggedInState);

    useEffect(() => {
        resetTotalResults();
    }, [category]);

    const fetchVideosWrapped = useCallback(
        async ({ pageParam = null }) => {
            const response = await fetchVideos(pageParam, category);

            await new Promise((resolve) => setTimeout(resolve, 800));
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
        <VideoListInn>
            <VideoSection>
                <VideoGridContainer>
                    {isLoading ? (
                        <Loading>
                            <span className="blind">로딩중입니다...</span>
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
                            // loader={<h4>Loading...</h4>}
                            loader={<img src={loadingGif} alt="Loading" />}
                        >
                            {data?.pages.map((page, i) => (
                                <React.Fragment key={i}>
                                    {page.items.map((video: Video) => (
                                        <VideoThumb
                                            key={video.id.videoId}
                                            onClick={() => {
                                                openVideo(video);
                                            }}
                                        >
                                            <h4>
                                                {video.snippet.title.length > 25
                                                    ? `${video.snippet.title.substring(0, 25)}...`
                                                    : video.snippet.title}
                                                <FaFolderPlus
                                                    icon={faFolderPlus}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleIconClick(video);
                                                    }}
                                                />
                                            </h4>
                                            <img
                                                src={
                                                    video.snippet.thumbnails.high?.url ||
                                                    video.snippet.thumbnails.default.url
                                                }
                                                alt={video.snippet.title}
                                            />
                                        </VideoThumb>
                                    ))}
                                </React.Fragment>
                            ))}
                        </InfiniteScroll>
                    )}
                </VideoGridContainer>

                {selectedVideo && (
                    <VideoPopup
                        video={{ id: selectedVideo.id.videoId, title: selectedVideo.snippet.title }}
                        onClose={closeVideo}
                    />
                )}
                {showModal && currentVideo && (
                    <PlaylistSetting video={currentVideo} onClose={() => setShowModal(false)} />
                )}
            </VideoSection>
        </VideoListInn>
    );
};

const VideoListInn = styled.div`
    position: relative;
    height: 100%;
    padding: 20px 60px;
    box-sizing: border-box;
`;
const VideoSection = styled.section`
    position: relative;
`;

const VideoGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin: 150px auto 0;
    max-width: 800px;
    text-align: center;
`;

const Loading = styled.p`
    padding-top: 100px;
    background: url(${loadingGif}) no-repeat center center;
`;
const ErrorMessage = styled.p`
    padding-top: 100px;
`;

const VideoThumb = styled.div`
    cursor: pointer;
    margin-bottom: 50px;

    h4 {
        display: flex;
        justify-content: space-between;
        align-items: center;

        color: #fff;
        text-align: left;
        text-shadow: 2px 2px 4px #000;
        padding: 8px 15px;
        background-color: #888;
    }
    img {
        width: 100%;
    }
`;

const FaFolderPlus = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: #fff;
    stroke-width: 30px;
`;

export default VideoList;
