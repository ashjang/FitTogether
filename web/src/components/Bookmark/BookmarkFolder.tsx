import React, { useState, useEffect, useMemo } from 'react';
import { json, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
// import BookmarkThumb from './BookmarkThumb';
// import VideoList from '../ExerciseInfo/VideoList';

interface Playlist {
    playlistName: string;
    userId: number;
}

const BookmarkFolder: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [editingPlaylistInputIndex, setEditingPlaylistInputIndex] = useState<number | null>(null);
    const [editedPlaylist, setEditedPlaylist] = useState<string>('');
    const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

    // 플레이리스트를 반환받는 함수 ✅readPlaylist
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
            alert('회원정보를 받아오는데 실패했습니다.');
        }
    };

    // 해당 재생목록 페이지로 이동
    const handlePlaylistClick = (name: string) => {
        navigate(`/playlists?name=${name}`);
    };

    // 플레이리스트를 수정할 때 사용하는 함수 ✅updatePlaylist
    const handleEditPlaylist = async (name: string) => {
        if (!editedPlaylist) {
            alert('플레이리스트의 이름을 수정해 주세요.');
            return;
        }

        // 같은 이름이 있으면 반환
        const isPlaylistExists = playlists?.some((playlist) => {
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
    const deletePlaylist = async (name: string) => {
        try {
            await axios.delete(`/api/playlist/${name}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
        } catch (error) {
            console.error('Error deleting playlist:', error);
            alert('재생목록을 삭제하는데 실패했습니다.');
        }
    };

    useEffect(() => {
        if (token) {
            getPlayLists();
        }
    }, []);

    return (
        <BookmarkFolderContainer>
            <FolderListArea>
                {playlists?.map((list, index) => (
                    <FolderWrapper key={index}>
                        <FolderName>
                            <div>
                                <InputArea
                                    type="text"
                                    value={''}
                                    onChange={() => {}}
                                    maxLength={100}
                                />
                                <SaveButton onClick={() => {}}>저장</SaveButton>
                            </div>
                            <div>
                                <MoreIcon onClick={() => {}} />
                            </div>
                        </FolderName>
                        <ContextMenu>
                            <MenuItem>수정하기</MenuItem>
                            <MenuItem>삭제하기</MenuItem>
                        </ContextMenu>

                        <FolderThumbnail onClick={() => handlePlaylistClick}>
                            동영상 썸네일
                        </FolderThumbnail>
                    </FolderWrapper>
                ))}
            </FolderListArea>
            <ErrorMessage>생성된 재생목록이 없습니다.</ErrorMessage>
        </BookmarkFolderContainer>
    );
};

const BookmarkFolderContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FolderListArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
`;

const FolderWrapper = styled.div`
    width: 700px;
    height: 500px;
    margin: 30px;
    border: 1px solid #ccc;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FolderName = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid black;
`;

const InputArea = styled.input`
    width: 80%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
`;

const SaveButton = styled.button`
    padding: 5px 10px;
    font-size: 12px;
    background-color: #c9c9c9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FolderThumbnail = styled.div`
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    background-color: pink;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ContextMenu = styled.div`
    position: absolute;
    top: 55px;
    right: 35px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 100;
`;

const MenuItem = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const MoreIcon = styled(FaEllipsisV)`
    cursor: pointer;
`;

const ErrorMessage = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -150px;
    font-size: 2rem;
    font-weight: bold;
    color: #102c57;
    min-height: 100vh;
`;

export default BookmarkFolder;
