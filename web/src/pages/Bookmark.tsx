/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import BookmarkFolder from '../components/Bookmark/BookmarkFolder';
import { useRecoilState } from 'recoil';
import { playlistsDataRecoil } from '../recoil/video/atoms';

// import BookmarkSetting from '../components/Bookmark/BookmarkSetting';
// import PlaylistSetting from '../components/ExerciseInfo/PlaylistSetting';

interface Playlist {
    playlistName: string;
    userId: number;
}

const Bookmark: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [newPlaylist, setNewPlaylist] = useState<string>('');
    const [playlistsData, setPlaylistsData] = useRecoilState<Playlist[] | null>(
        playlistsDataRecoil
    );

    const togglePopup = () => {
        setIsPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
        console.log(isPopupOpen);
    };

    // // 플레이리스트를 반환받는 함수 ✅readPlaylist
    const getPlayLists = async () => {
        try {
            const response = await axios.get('/api/playlist', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setPlaylistsData(response.data);
            console.log(response.data);
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

        // 같은 이름이 있으면 반환
        const isPlaylistExists = playlistsData?.some((playlist) => {
            playlist.playlistName === newPlaylist;
        });
        if (isPlaylistExists) {
            alert('이미 같은 이름의 플레이리스트가 존재합니다.');
            return;
        }

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
            console.log(response.data);
            setNewPlaylist('');
            setIsPopupOpen(false);

            if (response.data) {
                alert('플레이리스트가 생성되었습니다.');
            } else {
                alert('플레이리스트 생성에 실패했습니다.');
            }

            getPlayLists();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <BookmarkPage>
            <div css={Container}>
                <TitleArea>
                    <p css={centeredTextStyle}>저장된 동영상</p>
                    {isPopupOpen ? (
                        <FaMinus css={[rightAlignedStyle, icon]} onClick={togglePopup} />
                    ) : (
                        <FaPlus css={[rightAlignedStyle, icon]} onClick={togglePopup} />
                    )}
                    {isPopupOpen && (
                        // <PlaylistSetting video={null} onClose={() => setIsPopupOpen(false)} />
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
            </div>
            <div css={Container}>
                <BookmarkFolder />
            </div>
        </BookmarkPage>
    );
};

const BookmarkPage = styled.div`
    margin-top: 150px;
    min-height: calc(100vh - 200px);
`;

const Container = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleArea = styled.div`
    width: 1200px;
    border-bottom: 1px solid black;
    display: flex;
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
