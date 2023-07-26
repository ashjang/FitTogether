/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';

import VideoPopup from './VideoPopup';
import { fetchVideosFromYoutubeAPI } from './YoutubeApi';

type BtnTabProps = {
    isActive: boolean;
};

type Video = {
    id: string;
    title: string;
    thumbnail: string;
};

function VideoList() {
    const [activeTab, setActiveTab] = useState('러닝');
    const [videoList, setVideoList] = useState<Video[]>([]);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const loadVideos = useCallback(async () => {
        setIsLoading(true);
        try {
            const newVideos = await fetchVideosFromYoutubeAPI(activeTab, page, 4);
            setVideoList((prevVideos) => [...prevVideos, ...newVideos]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab, page]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setVideoList([]);
        setPage(1);
    };

    // 스크롤  (Intersection Observer)
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollObserver = useRef(
        new IntersectionObserver((entries) => {
            if (!isLoading && entries[0].isIntersecting) {
                void loadVideos();
            }
        }, {})
    );

    useEffect(() => {
        const bottomRefCurrent = bottomRef.current;
        const observer = scrollObserver.current;

        if (bottomRefCurrent) {
            observer.observe(bottomRefCurrent);
        }

        return () => {
            if (bottomRefCurrent) {
                observer.unobserve(bottomRefCurrent);
            }
        };
    }, [isLoading, loadVideos]);

    return (
        <>
            <VideoInn>
                <VideoSection className="video-section">
                    <PageTitle>운동 정보</PageTitle>

                    <VideoCategory className="video-category">
                        <dt className="category01">
                            <BtnTab
                                type="button"
                                className="btn btn-menu"
                                isActive={activeTab === '러닝'}
                                onClick={() => handleTabClick('러닝')}
                            >
                                러닝
                            </BtnTab>
                        </dt>
                        {activeTab === '러닝' && (
                            <ContentList>
                                {videoList.map((video) => (
                                    <ContentListItem key={video.id}>
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            onError={(e) => {
                                                e.currentTarget.src = 'default_image_url';
                                            }}
                                        />
                                        <div>{video.title}</div>
                                    </ContentListItem>
                                ))}
                            </ContentList>
                        )}
                        <dt className="category02">
                            <BtnTab
                                type="button"
                                className="btn btn-menu"
                                isActive={activeTab === '등산'}
                                onClick={() => handleTabClick('등산')}
                            >
                                등산
                            </BtnTab>
                        </dt>
                        {activeTab === '등산' && (
                            <ContentList>
                                {videoList.map((video) => (
                                    <ContentListItem key={video.id}>
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            onError={(e) => {
                                                e.currentTarget.src = 'default_image_url';
                                            }}
                                        />
                                        <div>{video.title}</div>
                                    </ContentListItem>
                                ))}
                            </ContentList>
                        )}
                        <dt className="category03">
                            <BtnTab
                                type="button"
                                className="btn btn-menu"
                                isActive={activeTab === '헬스'}
                                onClick={() => handleTabClick('헬스')}
                            >
                                헬스
                            </BtnTab>
                        </dt>
                        {activeTab === '헬스' && (
                            <ContentList>
                                {videoList.map((video) => (
                                    <ContentListItem key={video.id}>
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            onError={(e) => {
                                                e.currentTarget.src = 'default_image_url';
                                            }}
                                        />
                                        <div>{video.title}</div>
                                    </ContentListItem>
                                ))}
                            </ContentList>
                        )}
                    </VideoCategory>
                </VideoSection>
            </VideoInn>
            {currentVideo && <VideoPopup video={currentVideo} onClose={() => setCurrentVideo(null)} />}
            <div ref={bottomRef} />
        </>
    );
}

const VideoInn = styled.div`
    position: relative;
    max-width: 1440px;
    height: 100%;
    margin: 20px auto 0;
    padding: 20px 60px;
    background-color: #f8f8f8;
`;

const VideoSection = styled.section`
    position: relative;
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

const VideoCategory = styled.dl`
    position: relative;
    width: 100%;
    height: 500px;
    margin-bottom: 50px;
    dt {
        position: absolute;
        left: 50%;
        top: -60px;
        transform: translateX(-50%);
    }
    dt.category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    dt.category03 {
        left: 60%;
        transform: translateX(-60%);
    }
`;

const ContentList = styled.dd`
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 100px auto 0;
    border-radius: 10px;
    background-color: #efefef;
`;

// 비디오 목록
const ContentListItem = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 100%;
        height: auto;
    }
`;

const BtnTab = styled.button<BtnTabProps>`
    border: 1px solid #000;
    border-radius: 20px;
    padding: 4px 20px;
    background-color: #fff;

    // 탭 클릭 시
    background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
    color: ${(props) => (props.isActive ? '#fff' : '#000')};
`;

export default VideoList;
