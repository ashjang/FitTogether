import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Video } from './YoutubeApi';

interface AddToBookmarkProps {
    video: Video;
    onClose: () => void;
}

interface Playlist {
    playlistName: string;
    userId: number;
}

const AddToBookmark: React.FC<AddToBookmarkProps> = ({ video, onClose }) => {
    const [showInput, setShowInput] = useState<boolean>(false);
    const [playlist, setPlaylist] = useState<string>('');
    const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const token = sessionStorage.getItem('token');

    const getPlayLists = async () => {
        try {
            const response = await axios.get('/api/playlist', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setPlaylists(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('재생목록을 불러오는데 실패했습니다.');
        }
    };

    // 새로운 플레이리스트를 생성하는 함수
    const handleCreatePlaylist = async () => {
        // 이름을 안적었으면 반환
        if (!playlist) {
            alert('플레이 리스트의 이름을 작성해 주세요.');
            return;
        }

        // 같은 이름이 있으면 반환
        const isPlaylistExists = playlists?.some((p) => {
            p.playlistName === playlist;
        });
        if (isPlaylistExists) {
            alert('이미 같은 이름의 플레이리스트가 존재합니다.');
            return;
        }

        const newPlaylistForm = {
            playlistName: playlist,
        };

        try {
            const response = await axios.post('/api/playlist', newPlaylistForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);

            setShowInput(false);

            if (response.data) {
                alert('플레이리스트가 생성되었습니다.');
            } else {
                alert('플레이리스트 생성에 실패했습니다.');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 입력란을 열고 닫기 위한 상태를 토글하는 함수
    const handleShowInput = () => {
        setShowInput(true);
    };

    // 비디오를 플레이 리스트에 추가하는 함수
    const handleAddVideoToPlaylist = async (name: string) => {
        const videoData = {
            title: video.snippet.title,
            videoUrl: video.id.videoId,
        };

        try {
            const response = await axios.post(`/api/playlist/${name}`, videoData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });
            const title = response.data;
            if (title) {
                alert('영상이 저장되었습니다.');
            } else {
                alert('영상 저장이 실패하였습니다.');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 플레이리스트를 삭제할 때 사용하는 함수
    const handleDeletePlaylist = async (name: string) => {
        try {
            const response = await axios.delete(`/api/playlist/${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 마운트 시, onClose 시 실행할 함수 // 수정해야함!
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // 마운트 시 실행할 함수
    useEffect(() => {
        getPlayLists();
    }, []);

    return (
        <ModalWrapper>
            <Overlay onClick={onClose} />
            <BookmarkModal ref={modalRef}>
                <BookmarkModalTitle>즐겨찾기 리스트</BookmarkModalTitle>
                {showInput ? (
                    <div>
                        <input
                            type="text"
                            placeholder="즐겨찾기 리스트명"
                            value={playlist}
                            onChange={(e) => setPlaylist(e.target.value)}
                        />
                        <MakeBtn onClick={() => handleCreatePlaylist()}>생성</MakeBtn>
                    </div>
                ) : (
                    <PlusBtn onClick={handleShowInput}>새 플레이리스트 만들기</PlusBtn>
                )}
                <PlaylistContainer>
                    {playlists?.map((playlist, index) => (
                        <PlaylistItemWrapper key={index}>
                            <PlaylistItem
                                onClick={() => handleAddVideoToPlaylist(playlist.playlistName)}
                            >
                                {playlist.playlistName}
                            </PlaylistItem>
                            <DeleteButton
                                onClick={() => handleDeletePlaylist(playlist.playlistName)}
                            >
                                삭제
                            </DeleteButton>
                        </PlaylistItemWrapper>
                    ))}
                </PlaylistContainer>
            </BookmarkModal>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: relative;
`;
const BookmarkModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 350px;
    height: 350px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
    z-index: 9999;

    input {
        width: 80%;
        margin-bottom: 10px;
        padding: 5px;
        border: none;
        border-bottom: 1px solid black;
        outline: none;
    }
`;
const MakeBtn = styled.button`
    padding: 4px 10px;
    margin-left: 8px;
    border: 1px solid #000;
    border-radius: 10px;
    background: none;
`;
const PlaylistItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const PlusBtn = styled.button`
    padding: 4px 0px;
    margin-left: 10px;
    border: none;
    background: none;
`;

const DeleteButton = styled.button`
    padding: 4px 0px;
    margin-right: 10px;
    border: none;
    background: none;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const BookmarkModalTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const PlaylistContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: 300px;
    height: 210px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
`;

const PlaylistItem = styled.div`
    margin: 5px 0;
    cursor: pointer;
`;

export default AddToBookmark;
