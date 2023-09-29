import React, { useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaTrash } from 'react-icons/fa';
import styled from '@emotion/styled';
import VideoPopup from '../ExerciseInfo/VideoPopup';
import Spinner from '../../assets/Spinner.svg';

// 각 비디오의 데이터 타입
interface Video {
    videoId: string;
    videoTitle: string;
    thumbnail: string;
}

// 각 비디오 리스트(5개)의 데이터 타입
interface VideoList {
    values: Video[];
    hasNext: boolean;
    lastId: number;
}

const MyVideoList: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playlistName = urlParams.get('name');
    const [showPopup, setShowPopup] = useState(false);
    const [clickedVideo, setClidkedVideo] = useState<Video | null>(null);

    // 플레이리스트에 저장된 비디오리스트를 불러오는 함수 (API: readVideoInPlaylist)
    const fetchVideos = async (playlistName: string | null, lastId: number): Promise<VideoList> => {
        const response = await axios.get<VideoList>(
            `/api/playlist/${playlistName}?cursorId=${lastId}&size=5`,
            {
                headers: { 'X-AUTH-TOKEN': token },
            }
        );
        console.log(response.data);

        // 로딩스피너를 적절히 보여주기 위한 의도적 딜레이
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // useInfiniteQuery 사용하기 위해 응답값 return
        return response.data;
    };

    // useInfiniteQuery를 이용해 무한스크롤 구현
    const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<
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

    // flatMap 메서드를 통해 중첩 배열을 평탄화하여 무한스크롤에 적합한 형식으로 반환
    let videoList = data?.pages.flatMap((page) => page.values);

    // 플레이리스트 내 동영상을 삭제하는 함수 (API: deleteVideoInPlaylist)
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

        // 동영상 삭제 후 리패치
        refetch();

        // 삭제 완료 팝업 1초간 출력
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1000);
    };

    return (
        <MyVideoListComponent>
            <VideoContainer>
                {isLoading ? (
                    <Loading>
                        <img src={Spinner} alt="Loading" />
                    </Loading>
                ) : (
                    <InfiniteScroll
                        dataLength={videoList?.length || 0}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={<img src={Spinner} alt="Loading" />}
                    >
                        {videoList && videoList.length > 0 ? (
                            videoList.map((video) => (
                                <VideoItem key={video.videoId}>
                                    <VideoTitle>
                                        {video.videoTitle.length > 50
                                            ? `${video.videoTitle.substring(0, 50)}...`
                                            : video.videoTitle}
                                        <TrashIcon
                                            onClick={() => handleVideoDelete(video.videoId)}
                                        />
                                    </VideoTitle>
                                    <VideoThumbnail
                                        src={video.thumbnail}
                                        alt={video.videoTitle}
                                        onClick={() => setClidkedVideo(video)}
                                    />
                                </VideoItem>
                            ))
                        ) : (
                            <EmptyText>저장된 동영상이 없습니다 😢</EmptyText>
                        )}
                    </InfiniteScroll>
                )}
            </VideoContainer>
            {clickedVideo && (
                <VideoPopup
                    video={{ videoId: clickedVideo.videoId, title: clickedVideo.videoTitle }}
                    onClose={() => setClidkedVideo(null)}
                />
            )}
            {showPopup && <DeletePopup>플레이리스트에서 삭제되었습니다 😊</DeletePopup>}
        </MyVideoListComponent>
    );
};

const MyVideoListComponent = styled.div`
    position: relative;
    padding: 20px;
`;

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin: 0 auto;
    max-width: 800px;
    overflow: hidden;
    text-align: center;
`;

const Loading = styled.p`
    margin-top: 100px;
`;

const VideoItem = styled.div`
    cursor: pointer;
    margin-bottom: 50px;
    border-radius: 15px;
    overflow: hidden;
    width: 800px;
    background-color: black;
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
    width: 80%;
`;

const TrashIcon = styled(FaTrash)`
    font-size: 20px;
    color: #fff;
    stroke-width: 30px;
    cursor: pointer;
`;

const EmptyText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 175px;
    font-size: 18px;
`;

const DeletePopup = styled.div`
    position: fixed;
    top: 50%;
    left: 44%;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid black;
    border-radius: 10px;
    font-weight: bold;
    z-index: 9999;
`;

export default MyVideoList;
