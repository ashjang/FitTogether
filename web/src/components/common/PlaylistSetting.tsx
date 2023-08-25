import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Video } from '../ExerciseInfo/YoutubeApi';
import { useRecoilState } from 'recoil';
import { playlistsDataRecoil } from '../../recoil/video/atoms';

interface Props {
    video: Video | null;
    onClose: () => void;
}

interface Playlist {
    playlistName: string;
    userId: number;
}

const PlaylistSetting: React.FC<Props> = ({ video, onClose }) => {
    const token = sessionStorage.getItem('token');
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [creatingPlaylistInput, setCreatingPlaylistInput] = useState<boolean>(false);
    const [editingPlaylistInputIndex, setEditingPlaylistInputIndex] = useState<number | null>(null);
    const [newPlaylist, setNewPlaylist] = useState<string>('');
    const [editedPlaylist, setEditedPlaylist] = useState<string>('');
    const [playlistsData, setPlaylistsData] = useRecoilState<Playlist[] | null>(
        playlistsDataRecoil
    );

    // 플레이리스트를 반환받는 함수 ✅readPlaylist
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
            setCreatingPlaylistInput(false);

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

    // 플레이리스트를 수정할 때 사용하는 함수 ✅updatePlaylist
    const handleEditPlaylist = async (name: string) => {
        if (!editedPlaylist) {
            alert('플레이리스트의 이름을 수정해 주세요.');
            return;
        }

        // 같은 이름이 있으면 반환
        const isPlaylistExists = playlistsData?.some((playlist) => {
            playlist.playlistName === editedPlaylist;
        });
        if (isPlaylistExists) {
            alert('이미 같은 이름의 플레이리스트가 존재합니다.');
            return;
        }

        const editedPlaylistForm = {
            playlistName: editedPlaylist,
        };

        console.log(editedPlaylist);

        try {
            const response = await axios.put(`/api/playlist/${name}`, editedPlaylistForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);
            setEditingPlaylistInputIndex(null);
            getPlayLists();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 플레이리스트를 삭제할 때 사용하는 함수 ✅deletePlaylist
    const handleDeletePlaylist = async (name: string) => {
        try {
            const response = await axios.delete(`/api/playlist/${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(response.data);
            getPlayLists();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 비디오를 플레이 리스트에 추가하는 함수 ✅addVideoToPlaylist
    const handleAddVideoToPlaylist = async (name: string) => {
        if (video === null) {
            return;
        }
        const videoData = {
            title: video?.snippet.title,
            videoUrl: video?.id.videoId,
        };

        try {
            const response = await axios.post(`/api/playlist/${name}`, videoData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });
            if (response.data) {
                alert('영상이 저장되었습니다.');
            } else {
                alert('영상 저장이 실패하였습니다.');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 플레이리스트 생성 입력란을 열고 닫기 위한 상태를 토글하는 함수
    const handleCreatingPlaylistInput = () => {
        setCreatingPlaylistInput(true);
    };

    // 플레이리스트 수정 입력란을 열고 닫기 위한 인덱스를 저장하는 함수
    const showInputForEdit = (index: number) => {
        setEditingPlaylistInputIndex(index);
    };

    // 마운트 시, onClose 시 실행할 함수
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
                {creatingPlaylistInput ? (
                    <InputField>
                        <CreatingPlaylistInput
                            type="text"
                            placeholder="즐겨찾기 리스트명"
                            value={newPlaylist}
                            onChange={(e) => setNewPlaylist(e.target.value)}
                        />
                        <CreateButton onClick={() => handleCreatePlaylist()}>생성</CreateButton>
                    </InputField>
                ) : (
                    <PlusBtn onClick={handleCreatingPlaylistInput}>새 리스트 만들기</PlusBtn>
                )}
                <PlaylistContainer>
                    {playlistsData?.map((playlist, index) => (
                        <PlaylistItemWrapper key={index}>
                            {editingPlaylistInputIndex === index ? (
                                <EditingPlaylistInput
                                    type="text"
                                    placeholder={playlist.playlistName}
                                    defaultValue={playlist.playlistName}
                                    onChange={(event) => setEditedPlaylist(event.target.value)}
                                />
                            ) : (
                                <PlaylistItem
                                    onClick={() => handleAddVideoToPlaylist(playlist.playlistName)}
                                >
                                    {playlist.playlistName}
                                </PlaylistItem>
                            )}
                            {editingPlaylistInputIndex === index ? (
                                <SubmitButton
                                    onClick={() => handleEditPlaylist(playlist.playlistName)}
                                >
                                    저장
                                </SubmitButton>
                            ) : (
                                <EditButton onClick={() => showInputForEdit(index)}>
                                    수정
                                </EditButton>
                            )}

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

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
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
`;

const BookmarkModalTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const InputField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const CreatingPlaylistInput = styled.input``;

const CreateButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -2px;
    right: 4px;
    height: 30px;
    padding: 0px 5px;
    border-radius: 5px;
    border-style: none;
    background-color: #d7d7d7;
    color: white;
`;

const PlusBtn = styled.button`
    padding: 5px 0px;
    margin-left: 10px;
    border: none;
    background: none;
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

const PlaylistItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const PlaylistItem = styled.div`
    margin: 5px 0;
    cursor: pointer;
    border: 1px solid transparent;
`;

const EditingPlaylistInput = styled.input`
    width: 60%;
    padding: 5px;
    border: 1px solid #d7d7d7;
    border-radius: 5px;
    outline: none;
`;

const EditButton = styled.button`
    position: absolute;
    right: 42.5px;
    padding: 4px 0px;
    margin-right: 10px;
    border: none;
    background: none;
`;

const SubmitButton = styled.button`
    position: absolute;
    right: 42.5px;
    padding: 4px 0px;
    margin-right: 10px;
    border: none;
    background: none;
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 0;
    padding: 4px 0px;
    margin-right: 10px;
    border: none;
    background: none;
`;

export default PlaylistSetting;
