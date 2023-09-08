import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FaEllipsisV } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { videoInPlaylistRecoil } from '../../recoil/video/atoms';
import VideoPopup from '../ExerciseInfo/VideoPopup';

// 플레이리스트의 각 비디오들의 타입
interface VideoInPlaylist {
    videoId: string;
    videoTitle: string;
    thumbnail: string;
}

const BookmarkFolder: React.FC = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [menuToggleState, setMenuToggleState] = useState<boolean>(false);
    const [menuIndex, setMenuIndex] = useState<number | null>(null);
    const [editingPlaylistInputIndex, setEditingPlaylistInputIndex] = useState<number | null>(null);
    const [editedPlaylist, setEditedPlaylist] = useState<string>('');
    const [videosInPlaylist, setVideosInPlaylist] = useRecoilState<Record<
        string,
        VideoInPlaylist[]
    > | null>(videoInPlaylistRecoil);
    const [clickedVideo, setClidkedVideo] = useState<VideoInPlaylist | null>(null);

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
        } catch (error: any) {
            console.error('Error fetching data:', error);
            alert('재생목록 불러오기 실패');
        }
    };

    // 플레이리스트를 수정할 때 사용하는 함수 (API: updatePlaylist)
    const handleEditPlaylist = async (name: string) => {
        // 이름이 없거나 수정 내용이 없다면 함수 종료
        if (!editedPlaylist) {
            alert('플레이리스트의 이름을 수정해 주세요.');
            return;
        }

        // 백엔드로 전달할 데이터 폼
        const editedPlaylistForm = {
            playlistName: editedPlaylist,
        };

        console.log(editedPlaylist);

        try {
            await axios.put(`/api/playlist/${name}`, editedPlaylistForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': token,
                },
            });

            // 요청 후 관련 상태를 초기화
            setMenuToggleState(false);
            setMenuIndex(null);
            setEditingPlaylistInputIndex(null);
            setVideosInPlaylist(null);

            // getPlaylists 함수를 통해 수정된 플레이리스트로 업데이트
            getPlaylists();
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('같은 이름의 플레이리스트가 존재합니다.');
            }
            console.error(error);
        }
    };

    // 플레이리스트를 삭제할 때 사용하는 함수 (API: deletePlaylist)
    const handleDeletePlaylist = async (name: string) => {
        try {
            await axios.delete(`/api/playlist/${name}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });

            // 요청 후 관련 상태를 초기화
            setMenuToggleState(false);
            setMenuIndex(null);
            setVideosInPlaylist(null);

            // getPlaylists 함수를 통해 삭제된 플레이리스트를 제외한 값으로 업데이트
            getPlaylists();
        } catch (error) {
            alert('재생목록 삭제가 실패하였습니다.');
            console.error(error);
        }
    };

    // '수정하기/삭제하기' 메뉴를 여는 함수
    const handleMenuToggle = (index: number) => {
        setMenuToggleState(!menuToggleState);
        setMenuIndex(index);
    };

    // '수정하기/삭제하기' 메뉴를 닫는 함수
    const resetMenuIndex = () => {
        setMenuIndex(null);
    };

    // 플레이리스트 수정 입력란을 열고 닫기 위한 인덱스를 저장하는 함수
    const showInputForEdit = (index: number) => {
        setEditingPlaylistInputIndex(index);
        setMenuToggleState(!menuToggleState);
    };

    // 해당 재생목록 페이지로 이동하는 함수
    const handlePlaylistClick = (name: string) => {
        navigate(`/playlists?name=${name}`);
    };

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
                                <FaAnglesRight
                                    icon={faFolderOpen}
                                    onClick={() => handlePlaylistClick(key)}
                                />
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
                                {value.length > 0 ? (
                                    value.map((video) => (
                                        <FolderItem
                                            key={video.videoId}
                                            onClick={() => setClidkedVideo(video)}
                                        >
                                            <FolderItemThumbnail
                                                src={video.thumbnail}
                                                width="200"
                                                height="150"
                                                alt="Image"
                                            />
                                            <FolderItemTitle>
                                                {video.videoTitle.length > 12
                                                    ? `${video.videoTitle.slice(0, 12)}...`
                                                    : video.videoTitle}
                                            </FolderItemTitle>
                                        </FolderItem>
                                    ))
                                ) : (
                                    <FolderItemText>저장된 동영상이 없습니다 😢</FolderItemText>
                                )}
                            </FolderItems>
                        </FolderWrapper>
                    ))}
                </FolderListArea>
            ) : (
                <ErrorMessage>생성된 재생목록이 없습니다 😢</ErrorMessage>
            )}
            {clickedVideo && (
                <VideoPopup
                    video={{ videoId: clickedVideo.videoId, title: clickedVideo.videoTitle }}
                    onClose={() => {
                        setClidkedVideo(null);
                    }}
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

const PlaylistItem = styled.p`
    font-size: 20px;
`;

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
    justify-content: center;
    align-items: center;
    gap: 35px;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
`;

const FolderItem = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px 10px;
    width: 200px;
    overflow: hidden;
    background-color: black;
    border-radius: 15px;
    cursor: pointer;
`;

const FolderItemThumbnail = styled.img``;

const FolderItemTitle = styled.p`
    height: 30px;
    background-color: #444;
    padding: 0px 0px 5px 10px;
    color: white;
    overflow: hidden;
`;

const FolderItemText = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(150px + 30px);
    width: 100%;
    margin: 20 auto 10;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 40px;
    right: 10px;
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

const EllipsisIcon = styled(FaEllipsisV)`
    position: relative;
    bottom: 2px;
    font-size: 20px;
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

const FaAnglesRight = styled(FontAwesomeIcon)`
    position: absolute;
    right: 50px;
    top: 11px;
    font-size: 25px;
    cursor: pointer;
`;

export default BookmarkFolder;
