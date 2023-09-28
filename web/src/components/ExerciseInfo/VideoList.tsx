import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { categoryRecoil } from '../../recoil/video/atoms';
import { loggedInState } from '../../recoil/AuthState/atoms';
import VideoPopup from './VideoPopup';
import PlaylistSetting from './PlaylistSetting';
import Spinner from '../../assets/Spinner.svg';

// 각 비디오의 데이터 타입
interface Video {
    videoId: string;
    title: string;
    thumbnail: string;
    keyword: string;
}

// 각 비디오 리스트(5개)의 데이터 타입
interface VideoList {
    values: Video[];
    hasNext: boolean;
    lastId: number;
}

const VideoList: React.FC = () => {
    const isLoggedIn = useRecoilValue(loggedInState);
    const category = useRecoilValue<string>(categoryRecoil);
    const [showSetting, setShowSetting] = useState<boolean>(false);
    const [clickedVideo, setClidkedVideo] = useState<Video | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    // 비디오리스트를 불러오는 함수 (API: getVideos)
    const fetchVideos = async (category: string, lastId: number): Promise<VideoList> => {
        const response = await axios.get(`/api/video/${category}?cursorId=${lastId}&size=5`);
        console.log(response.data);

        // 로딩스피너를 적절히 보여주기 위한 의도적 딜레이
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // useInfiniteQuery 사용하기 위해 응답값 return
        return response.data;
    };

    // useInfiniteQuery를 이용해 무한스크롤 구현
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

    // flatMap 메서드를 통해 중첩 배열을 평탄화하여 무한스크롤에 적합한 형식으로 반환
    let videoList = data?.pages.flatMap((page) => page.values);

    // 동영상을 저장하는 함수
    const handleIconClick = (video: Video) => {
        if (!isLoggedIn) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }
        // 동영상을 상태에 저장
        setSelectedVideo(video);
        // PlaylistSetting 팝업을 열기 위한 상태 업데이트
        setShowSetting(true);
    };

    // 마운트 시 페이지 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <VideoListComponent>
            <VideoContainer>
                {isLoading ? (
                    <Loading>
                        <img src={Spinner} alt="Loading" />
                    </Loading>
                ) : isError ? (
                    <ErrorMessage>동영상을 불러올 수 없습니다 😢</ErrorMessage>
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
                                    setClidkedVideo(video);
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
                    onClose={() => setClidkedVideo(null)}
                />
            )}
            {showSetting && selectedVideo && (
                <PlaylistSetting video={selectedVideo} onClose={() => setShowSetting(false)} />
            )}
        </VideoListComponent>
    );
};

const VideoListComponent = styled.div``;

const VideoContainer = styled.div`
    margin: 25px auto 0;
    text-align: center;
`;

const Loading = styled.p`
    padding-top: 200px;
`;
const ErrorMessage = styled.p`
    padding-top: 100px;
    font-size: 2rem;
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
