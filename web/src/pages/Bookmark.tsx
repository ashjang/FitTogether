/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import BookmarkFolder from '../components/Bookmark/BookmarkFolder';
import { useRecoilState } from 'recoil';
import { /* playlistsDataRecoil, */ videoInPlaylistRecoil } from '../recoil/video/atoms';

interface Playlist {
    playlistName: string;
    userId: number;
}

interface VideoInPlaylist {
    videoId: string;
    videoTitle: string;
    thumbnail: string;
}

const Bookmark: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [newPlaylist, setNewPlaylist] = useState<string>('');
    // const [playlistsData, setPlaylistsData] = useRecoilState<Playlist[] | null>(
    //     playlistsDataRecoil
    // );
    const [videosInPlaylist, setVideosInPlaylist] = useRecoilState<Record<
        string,
        VideoInPlaylist[]
    > | null>(videoInPlaylistRecoil);

    const togglePopup = () => {
        setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
        console.log(isPopupOpen);
    };

    // 플레이리스트 전체를 반환받는 함수 ✅readPlaylist
    const getPlaylists = async () => {
        try {
            const responsePlaylist = await axios.get('/api/playlist', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log('responsePlaylist.data', responsePlaylist.data);

            responsePlaylist.data.map(async (playlist: Playlist) => {
                try {
                    const responseVideo = await axios.get(
                        `/api/playlist/${playlist.playlistName}?cursorId=-1&size=5`,
                        {
                            headers: {
                                'X-AUTH-TOKEN': token,
                            },
                        }
                    );
                    console.log('playlist.playlistName', playlist.playlistName);
                    console.log('responseVideo.data', responseVideo.data);
                    const videosInPlaylistData: Record<string, VideoInPlaylist[]> = {
                        [playlist.playlistName]: responseVideo.data.values,
                    };
                    console.log('videosInPlaylistData', videosInPlaylistData);
                    setVideosInPlaylist((prevVideosInPlaylist) => ({
                        ...prevVideosInPlaylist,
                        ...videosInPlaylistData,
                    }));
                } catch (error) {
                    console.error('Error fetching data:', error);
                    alert('재생목록을 불러오는데 실패했습니다.');
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('재생목록을 불러오는데 실패했습니다.');
        }
    };

    // 새로운 플레이리스트를 생성하는 함수 ✅createPlaylist
    const handleCreatePlaylist = async () => {
        // 이름을 안적었으면 반환
        if (!newPlaylist) {
            alert('플레이리스트의 이름을 작성해 주세요.');
            return;
        }

        // // 같은 이름이 있으면 반환
        // const isPlaylistExists = playlistsData?.some((playlist) => {
        //     playlist.playlistName === newPlaylist;
        // });
        // if (isPlaylistExists) {
        //     alert('이미 같은 이름의 플레이리스트가 존재합니다.');
        //     return;
        // }

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
            setNewPlaylist('');
            setIsPopupOpen(false);

            if (response.data) {
                alert('플레이리스트가 생성되었습니다.');
            } else {
                alert('플레이리스트 생성에 실패했습니다.');
            }
            setVideosInPlaylist(null);
            getPlaylists();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // // videosInPlaylist 상태가 null로 바꿔었을 때 다시 받아옴.
    // useEffect(() => {
    //     if (videosInPlaylist === null) {
    //         getPlaylists();
    //     }
    // }, [videosInPlaylist]);

    // playlistsData 상태가 바뀌면(이 때 videosInPlaylist가 초기화됨) 다시 받아옴.
    useEffect(() => {
        console.log('렌더링!!!');
        getPlaylists();
    }, []);

    useEffect(() => {
        console.log('변경변경!!!');
        console.log('videosInPlaylist', videosInPlaylist);
    }, [videosInPlaylist]);

    return (
        <BookmarkPage>
            <TitleArea>
                <p css={centeredTextStyle}>저장된 동영상</p>
                {isPopupOpen ? (
                    <FaMinus css={[rightAlignedStyle, icon]} onClick={togglePopup} />
                ) : (
                    <FaPlus css={[rightAlignedStyle, icon]} onClick={togglePopup} />
                )}
                {isPopupOpen && (
                    <AddPlaylistContainer>
                        <AddPlaylistInput
                            type="text"
                            placeholder="새 리스트 추가"
                            value={newPlaylist}
                            onChange={(e) => setNewPlaylist(e.target.value)}
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
    margin-top: 150px;
    min-height: calc(100vh - 200px);
`;

const TitleArea = styled.div`
    width: 1200px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-bottom: 30px;
    margin-bottom: 50px;
    font-weight: bold;
`;

const centeredTextStyle = css`
    flex: 25;
    text-align: center;
    font-size: 3rem;
`;

const rightAlignedStyle = css`
    flex: 1;
    text-align: right;
`;

const icon = css`
    cursor: pointer;
`;

const AddPlaylistContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 55%;
    right: 5px;
`;

const AddPlaylistInput = styled.input`
    padding-left: 5px;
    outline: none;
`;

const AddPlaylistSummit = styled.button``;

export default Bookmark;
