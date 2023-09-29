/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import BookmarkFolder from '../components/Bookmark/BookmarkFolder';
import { useSetRecoilState } from 'recoil';
import { videoInPlaylistRecoil } from '../recoil/video/atoms';

// 플레이리스트의 각 비디오들의 타입
interface VideoInPlaylist {
    videoId: string;
    videoTitle: string;
    thumbnail: string;
}

const Bookmark: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [newPlaylist, setNewPlaylist] = useState<string>('');
    const setVideosInPlaylist = useSetRecoilState<Record<string, VideoInPlaylist[]> | null>(
        videoInPlaylistRecoil
    );

    // 플레이리스트 전체와 각 플레이리스트의 최근 5개의 동영상을 반환받는 함수 (API: readPlaylist, readVideoInPlaylist)
    const getPlaylists = async () => {
        try {
            // 생성한 플레이리스트 목록을 반환받음
            const responsePlaylist = await axios.get('/api/playlist', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log('responsePlaylist.data', responsePlaylist.data);

            // 각 플레이리스트를 순회하며 최근 5개의 동영상을 받환받음
            // 순서를 보장받기 위해 for of문 사용
            for (const playlist of responsePlaylist.data) {
                try {
                    const responseVideo = await axios.get(
                        `/api/playlist/${playlist.playlistName}?cursorId=-1&size=5`,
                        {
                            headers: {
                                'X-AUTH-TOKEN': token,
                            },
                        }
                    );
                    console.log('responseVideo.data', responseVideo.data);

                    // 플레이리스트 이름을 Key로, 최신 5개의 동영상 정보를 Value로 갖는 videosInPlaylistData 객체 생성
                    const videosInPlaylistData: Record<string, VideoInPlaylist[]> = {
                        [playlist.playlistName]: responseVideo.data.values,
                    };
                    console.log('videosInPlaylistData', videosInPlaylistData);

                    // 생성한 videosInPlaylistData 객체를 상태에 추가
                    setVideosInPlaylist((prevVideosInPlaylist) => ({
                        ...prevVideosInPlaylist,
                        ...videosInPlaylistData,
                    }));
                } catch (error) {
                    console.error('Error fetching data:', error);
                    alert('동영상 불러오기 실패');
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('재생목록 불러오기 실패');
        }
    };

    // 새로운 플레이리스트를 생성하는 함수 (API: createPlaylist)
    const handleCreatePlaylist = async () => {
        // 이름이 없다면 함수 종료
        if (!newPlaylist) {
            alert('플레이리스트의 이름을 작성해 주세요.');
            return;
        }

        // 백엔드로 전달할 데이터 폼
        const newPlaylistForm = {
            playlistName: newPlaylist,
        };

        try {
            const response = await axios.post('/api/playlist', newPlaylistForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });

            // 요청 후 관련 상태 초기화
            setNewPlaylist('');
            setIsPopupOpen(false);
            setVideosInPlaylist(null);

            // getPlaylists 함수를 통해 추가된 플레이리스트를 포함한 값으로 업데이트
            getPlaylists();

            if (response.data) {
                alert('플레이리스트가 생성되었습니다.');
            } else {
                alert('플레이리스트 생성에 실패했습니다.');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('같은 이름의 플레이리스트가 존재합니다.');
            }
            console.error(error);
        }
    };

    // Enter키로 플레이리스트 생성하는 함수
    const handlePressCreateInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCreatePlaylist();
        }
    };

    useEffect(() => {
        getPlaylists();
    }, []);

    return (
        <BookmarkPage>
            <TitleArea>
                <Title>저장된 동영상</Title>
                <IconContainer
                    onClick={() => {
                        setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
                    }}
                >
                    {isPopupOpen ? <FaMinus css={icon} /> : <FaPlus css={icon} />}
                </IconContainer>
                {isPopupOpen && (
                    <AddPlaylistContainer>
                        <AddPlaylistInput
                            type="text"
                            placeholder="새 리스트 추가"
                            value={newPlaylist}
                            onChange={(e) => setNewPlaylist(e.target.value)}
                            onKeyDown={handlePressCreateInput}
                        />
                        <AddPlaylistSummit onClick={() => handleCreatePlaylist()}>
                            저장
                        </AddPlaylistSummit>
                    </AddPlaylistContainer>
                )}
            </TitleArea>
            <BookmarkFolder />
        </BookmarkPage>
    );
};

const BookmarkPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 110px;
    padding: 20px;
    min-height: calc(100vh - 165px);
    overflow: hidden;
`;

const TitleArea = styled.div`
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 50px;
    font-weight: bold;
`;

const Title = styled.h2`
    flex: 1;
    text-align: center;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

const icon = css`
    font-size: 20px;
`;

const AddPlaylistContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 80%;
    right: 5px;
`;

const AddPlaylistInput = styled.input`
    padding-left: 5px;
    outline: none;
`;

const AddPlaylistSummit = styled.button``;

export default Bookmark;
