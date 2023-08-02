/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useCallback, useEffect } from 'react';
import { useInfiniteQuery  } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchVideos, resetTotalResults, VideosResponse, Video } from './YoutubeApi';
import VideoPopup from './VideoPopup'; 

import loadingGif from '../../assets/ball-triangle.svg';

const VideoList: React.FC = () => {
    const [category, setCategory] = useState<string>('러닝');
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null); 
    const [favoriteStatus, setFavoriteStatus] = useState<Record<string, boolean>>({});

    useEffect(() => {
        resetTotalResults(); 
    }, [category]);

    const fetchVideosWrapped = useCallback(async ({ pageParam = null }) => {
        const response = await fetchVideos(pageParam, category);

        await new Promise(resolve => setTimeout(resolve, 1000)); 
        return response;
    }, [category]);

    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<VideosResponse, Error>(
        ['videos', category],
        fetchVideosWrapped,
        {
            getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
            keepPreviousData: true, 
            enabled: category !== '', 
        }
    );

    const handleFetchMore = useCallback(() => {
        if (hasNextPage) fetchNextPage();
    }, [hasNextPage, fetchNextPage]);

    const handleTabClick = useCallback((newCategory: string) => {
        setCategory(''); 
        resetTotalResults(); 
        setCategory(newCategory); 
    }, []);

    // 팝업창 
    const openVideo = useCallback((video: Video) => {
        setSelectedVideo(video);
    }, []);

    const closeVideo = useCallback(() => {
        setSelectedVideo(null);
    }, []);


    //즐겨찾기
    //즐겨찾기 리스트에 관한
    const toggleFavoriteStatus = useCallback((videoId: string) => {
        setFavoriteStatus(prevStatus => ({ 
            ...prevStatus, 
            [videoId]: !prevStatus[videoId]
        }));
    }, []);

    return (
        <VideoListInn>
            <PageTitle>운동 메이트 찾기</PageTitle>
            <BtnTab>
                <button 
                    className={`category01 ${category === '러닝' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('러닝')}
                >
                    러닝
                </button>
                <button 
                    className={`category02 ${category === '등산' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('등산')}
                >
                    등산
                </button>
                <button 
                    className={`category03 ${category === '헬스' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('헬스')}
                >
                    헬스
                </button>                
            </BtnTab>
            <VideoSection>
                <VideoGridContainer>
                        {isLoading ? (
                            <Loading><span className="blind">로딩중입니다...</span></Loading>
                        ) : isError ? (
                            <ErrorMessage>일일 요청 횟수를 초과하여 영상을 불러올 수 없습니다.</ErrorMessage>
                        ) : (
                            <InfiniteScroll
                                dataLength={data?.pages.reduce((acc, page) => acc + page.items.length, 0) || 0}
                                next={handleFetchMore} 
                                hasMore={!!hasNextPage} 
                                // loader={<h4>Loading...</h4>} 
                                loader={<img src={loadingGif} alt="Loading" />} 
                            >
                                {data?.pages.map((page, i) => (
                                    <React.Fragment key={i}>
                                        {page.items.map((video: Video) => (
                                            <VideoThumb key={video.id.videoId} onClick={() => openVideo(video)}>

                                                <h4>
                                                    {video.snippet.title.length > 25 
                                                        ? `${video.snippet.title.substring(0, 25)}...` 
                                                        : video.snippet.title
                                                    }
                                                    <FontAwesomeIcon
                                                        icon={faStar}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            toggleFavoriteStatus(video.id.videoId);
                                                        }}
                                                        className={`star-icon ${favoriteStatus[video.id.videoId] ? 'opened' : ''}`}
                                                    />
                                                </h4>
                                                <img src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url} alt={video.snippet.title} />
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
            </VideoSection>

        </VideoListInn>
    );
    
};

const VideoListInn =styled.div`
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    height: 100%;
    margin: 120px auto 0;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
`;
const VideoSection = styled.section`
    position: relative;
`;

const VideoGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin: 150px auto 0;
    width: 600px;
    text-align: center;
`;
const PageTitle = styled.h2`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 1px;
        color: #000;
        background-color: #000;
    }
    `;
const BtnTab = styled.div`
    position: relative;
    top: 60px;
    
    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #000;
        border-radius: 20px;
        padding: 4px 20px;
        background-color: #fff;     
        
        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    .category03 {
        left: 60%;
        transform: translateX(-60%);
    }
`;

const Loading =styled.p`
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
        font-size: 18px;
        text-align: left;
        padding: 8px;
        border: 1px solid #000;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .star-icon {
        font-size: 20px; 
        color: #fff;
        stroke: black;
        stroke-width: 30px;
    }
    .star-icon.opened {
        color: gold; 
        stroke: gold;
    }
    img {
        width: 100%;
    }
`;
export default VideoList;
