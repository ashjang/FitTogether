import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { playlistsDataRecoil, videoInPlaylistRecoil } from '../../recoil/video/atoms';
import VideoPopup from '../ExerciseInfo/VideoPopup';

import imgSrc from '../../assets/post_image_example.jpg'; // 썸네일 예시

interface Playlist {
    playlistName: string;
    userId: number;
}

interface VideoInPlaylist {
    videoId: string;
    title: string;
    thumbnail: string;
}

const BookmarkFolder: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [menuToggleState, setMenuToggleState] = useState<boolean>(false);
    const [menuIndex, setMenuIndex] = useState<number | null>(null);
    const [editingPlaylistInputIndex, setEditingPlaylistInputIndex] = useState<number | null>(null);
    const [editedPlaylist, setEditedPlaylist] = useState<string>('');
    const [playlistsData, setPlaylistsData] = useRecoilState<Playlist[] | null>(
        playlistsDataRecoil
    );
    const [videosInPlaylist, setVideosInPlaylist] = useRecoilState<Record<
        string,
        VideoInPlaylist[]
    > | null>(videoInPlaylistRecoil);
    const [clickedVideo, setClidkedVideo] = useState<VideoInPlaylist | null>(null);

    // 플레이리스트 전체를 반환받는 함수 ✅readPlaylist
    const getPlaylists = async () => {
        try {
            const responsePlaylist = await axios.get('/api/playlist', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            console.log(responsePlaylist.data);
            setPlaylistsData(responsePlaylist.data);

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
                    console.log(responseVideo.data);
                    const videosInPlaylistData: Record<string, VideoInPlaylist[]> = {
                        [responsePlaylist.data.playlistName]: responseVideo.data,
                    };
                    console.log(videosInPlaylistData);
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

    // 플레이리스트를 수정할 때 사용하는 함수 ✅updatePlaylist
    const handleEditPlaylist = async (name: string) => {
        // 입력이 없으면 반환
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

        // 백으로 전송할 데이터(= 수정한 이름)
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
            setMenuToggleState(false);
            setMenuIndex(null);
            setEditingPlaylistInputIndex(null);
            setVideosInPlaylist(null);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // 플레이리스트를 삭제할 때 사용하는 함수 ✅deletePlaylist
    const handleDeletePlaylist = async (name: string) => {
        try {
            await axios.delete(`/api/playlist/${name}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setMenuToggleState(false);
            setMenuIndex(null);
            setVideosInPlaylist(null);
        } catch (error) {
            console.error('Error deleting playlist:', error);
            alert('재생목록을 삭제하는데 실패했습니다.');
        }
    };

    const handleMenuToggle = (index: number) => {
        setMenuToggleState(!menuToggleState);
        setMenuIndex(index);
    };

    useEffect(() => {
        if (videosInPlaylist === null) {
            getPlaylists();
        }
    }, [videosInPlaylist]);

    // 플레이리스트 수정 입력란을 열고 닫기 위한 인덱스를 저장하는 함수
    const showInputForEdit = (index: number) => {
        setEditingPlaylistInputIndex(index);
        setMenuToggleState(!menuToggleState);
    };

    // 해당 재생목록 페이지로 이동
    const handlePlaylistClick = (name: string) => {
        navigate(`/playlists?name=${name}`);
    };

    // 메뉴를 닫는 함수
    const resetMenuIndex = () => {
        setMenuIndex(null);
    };

    // 비디오 팝업을 여는 함수
    const openVideo = useCallback((video: VideoInPlaylist) => {
        setClidkedVideo(video);
    }, []);

    // 비디오 팝업을 닫는 함수
    const closeVideo = useCallback(() => {
        setClidkedVideo(null);
    }, []);

    useEffect(() => {
        if (token) {
            getPlaylists();
        }
    }, []);

    return (
        <BookmarkFolderContainer>
            {videosInPlaylist ? (
                <FolderListArea>
                    {Object.entries(videosInPlaylist).map(([key, value], index) => (
                        <FolderWrapper key={index}>
                            <FolderHeader>
                                {index === editingPlaylistInputIndex ? (
                                    <InputField>
                                        <InputArea
                                            type="text"
                                            defaultValue={key}
                                            onChange={(e) => setEditedPlaylist(e.target.value)}
                                            maxLength={15}
                                        />
                                        <SaveButton onClick={() => handleEditPlaylist(key)}>
                                            저장
                                        </SaveButton>
                                        <CancelButton
                                            onClick={() =>
                                                editingPlaylistInputIndex !== null &&
                                                setEditingPlaylistInputIndex(null)
                                            }
                                        >
                                            취소
                                        </CancelButton>
                                    </InputField>
                                ) : (
                                    <PlaylistItem>{key}</PlaylistItem>
                                )}
                                <AllVideos onClick={() => handlePlaylistClick(key)}>
                                    동영상 더보기
                                </AllVideos>
                                <EllipsisIcon onClick={() => handleMenuToggle(index)} />
                                {menuToggleState && menuIndex === index && (
                                    <Menu>
                                        <Overlay onClick={resetMenuIndex} />
                                        <MenuItems>
                                            <EditButton onClick={() => showInputForEdit(index)}>
                                                수정하기
                                            </EditButton>
                                            <DeleteButton onClick={() => handleDeletePlaylist(key)}>
                                                삭제하기
                                            </DeleteButton>
                                        </MenuItems>
                                    </Menu>
                                )}
                            </FolderHeader>
                            <FolderItems>
                                {value.map((video) => (
                                    <FolderItem
                                        key={video.videoId}
                                        onClick={() => openVideo(video)}
                                    >
                                        <img
                                            src={video.thumbnail}
                                            width="200"
                                            height="150"
                                            alt="Image"
                                        />
                                        <p>{video.title}</p>
                                    </FolderItem>
                                ))}
                                <FolderItem>
                                    <img src={imgSrc} width="200" height="150" alt="Image" />
                                    <p>동영상 제목 ...</p>
                                </FolderItem>
                                <FolderItem>
                                    <img src={imgSrc} width="200" height="150" alt="Image" />
                                    <p>동영상 제목 ...</p>
                                </FolderItem>
                                <FolderItem>
                                    <img src={imgSrc} width="200" height="150" alt="Image" />
                                    <p>동영상 제목 ...</p>
                                </FolderItem>
                                <FolderItem>
                                    <img src={imgSrc} width="200" height="150" alt="Image" />
                                    <p>동영상 제목 ...</p>
                                </FolderItem>
                                <FolderItem>
                                    <img src={imgSrc} width="200" height="150" alt="Image" />
                                    <p>동영상 제목 ...</p>
                                </FolderItem>
                            </FolderItems>
                        </FolderWrapper>
                    ))}
                </FolderListArea>
            ) : (
                <ErrorMessage>생성된 재생목록이 없습니다.</ErrorMessage>
            )}
            {clickedVideo && (
                <VideoPopup
                    video={{ videoId: clickedVideo.videoId, title: clickedVideo.title }}
                    onClose={closeVideo}
                />
            )}
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 1200px;
    padding: 20px;
    border-radius: 50px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
    margin: 30px;
    background-color: white;
`;

const FolderHeader = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    height: 50px;
`;

const PlaylistItem = styled.p``;

const InputField = styled.div`
    display: flex;
    width: 300px;
`;

const InputArea = styled.input`
    padding-left: 10px;
    border: none;
    border-bottom: 1px solid #c9c9c9;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
`;

const SaveButton = styled.button`
    position: relative;
    right: 5px;
    padding: 5px 10px;
    font-size: 14px;
    background-color: #c9c9c9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
`;

const CancelButton = styled.button`
    position: relative;
    right: 3px;
    padding: 5px 10px;
    font-size: 14px;
    background-color: #c9c9c9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
`;
const FolderItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
`;

const FolderItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 10px 10px;
`;
const Menu = styled.div`
    position: absolute;
    top: 60px;
    right: 20px;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 99;
`;

const MenuItems = styled.div`
    position: relative;
    left: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 100;
`;
const EditButton = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    background-color: #ffffff;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const DeleteButton = styled.div`
    padding: 10px;
    cursor: pointer;
    border-radius: 0 0 10px 10px;
    background-color: #ffffff;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const AllVideos = styled.button`
    position: absolute;
    right: 75px;
    font-size: 13px;
    color: blue;
    outline: none;
    border: none;
    background-color: transparent;
`;

const EllipsisIcon = styled(FaEllipsisV)`
    position: relative;
    bottom: 2px;
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
