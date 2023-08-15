import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { playlistState } from '../../recoil/BookMark/atoms';
import { Video } from './YoutubeApi';

type AddToBookmarkProps = {
    video: Video;
    onClose: () => void;
};

type UserDataResponse = {
    id: number;
    name: string;
    email: string;
};

type ApiResponse = {
    success: boolean;
    message?: string;
};

const AddToBookmark: React.FC<AddToBookmarkProps> = ({ video, onClose }) => {
    const [playlists, setPlaylists] = useRecoilState(playlistState);
    const [playlist, setPlaylist] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserDataResponse | null>(null);
    // const [userData, setUserData] = useState({});
    const modalRef = useRef<HTMLDivElement | null>(null);

    const token = sessionStorage.getItem('token');

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

    // useEffect(() => {
    //     getUserData().catch((error) => {
    //         console.error('Error fetching user data:', error);
    //     });
    // }, []);

    // const getUserData = async () => {
    //     try {
    //         const response = await axios.get<UserDataResponse>('/api/users/my', {
    //             headers: {
    //                 'X-AUTH-TOKEN': token,
    //                 // 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5aHlNWDVSVnlSSmVnNG4wVGpJSS9BPT0iLCJpYXQiOjE2OTIwMjM5ODIsImV4cCI6MTY5MjExMDM4Mn0.0ZCbDvNSxwfBNXZmbl-087kjyo0xi7lPz9ZrmSuWtUc', // 실제 토큰 값을 넣어야 함
    //             },
    //         });
    //         setUserData(response.data);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }
    // };

    useEffect(() => {
        if (token) {
            getUserData(token);
        }
    }, []);
    const getUserData = async (token) => {
        try {
            const response = await axios.get('/api/users/my', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setUserData(response.data); // 응답값을 userData 상태에 저장
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('회원정보를 받아오는데 실패했습니다.');
        }
    };

    const createPlaylistAndAddVideo = async (): Promise<void> => {
        if (!playlist) {
            alert('플레이 리스트의 이름을 작성해 주세요.');
            return;
        }

        const isPlaylistExists = playlists.some((p) => p === playlist);

        if (isPlaylistExists) {
            alert('이미 같은 이름의 플레이리스트가 존재합니다.');
            return;
        }

        setPlaylists((oldPlaylists) => [...oldPlaylists, playlist]);
        console.log(`Created playlist: ${playlist}`);
        setPlaylist('');
        setShowInput(false);

        const dataToSend = {
            playlistName: playlist,
        };
        try {
            const response = await axios.post<ApiResponse>(
                '/api/playlist', // 실제 플레이리스트 생성 엔드포인트
                // { playlistName: playlist },
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-AUTH-TOKEN': token,
                        // 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5aHlNWDVSVnlSSmVnNG4wVGpJSS9BPT0iLCJpYXQiOjE2OTIwMjM5ODIsImV4cCI6MTY5MjExMDM4Mn0.0ZCbDvNSxwfBNXZmbl-087kjyo0xi7lPz9ZrmSuWtUc',
                    },
                }
            );
            const { success, message } = response.data;
            if (success) {
                alert('플레이리스트가 생성되었습니다.');
            } else {
                alert('에러 발생: ' + (message || '알 수 없는 에러'));
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const handleCreateNewPlaylist = async () => {
        await createPlaylistAndAddVideo();
    };
    const handleShowInput = () => {
        setShowInput(true);
    };

    const handleAddVideoToPlaylist = async (name: string): Promise<void> => {
        const token = sessionStorage.getItem('token');

        const videoData = {
            videoUrl: video.id.videoId, // 동영상 URL (videoId)
            title: video.snippet.title, // 동영상 제목
        };
        console.log(`Adding video to playlist: ${name}`); // 영상 저장 로그

        try {
            const response = await axios.post<ApiResponse>(
                `/api/playlist/${name}`, // 실제 영상을 플레이리스트에 추가 엔드포인트로 변경
                videoData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-AUTH-TOKEN': token,
                        // 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5aHlNWDVSVnlSSmVnNG4wVGpJSS9BPT0iLCJpYXQiOjE2OTIwMjM5ODIsImV4cCI6MTY5MjExMDM4Mn0.0ZCbDvNSxwfBNXZmbl-087kjyo0xi7lPz9ZrmSuWtUc',
                    },
                }
            );
            const { success, message } = response.data;
            if (success) {
                alert('영상이 저장되었습니다.');
            } else {
                alert('에러 발생: ' + (message || '알 수 없는 에러'));
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <ModalWrapper>
            <Overlay onClick={onClose} />
            <BookmarkModal ref={modalRef}>
                <BookmarkModalTitle>즐겨찾기 리스트</BookmarkModalTitle>
                {showInput ? (
                    <>
                        <input
                            type="text"
                            placeholder="즐겨찾기 리스트명"
                            value={playlist}
                            onChange={(e) => setPlaylist(e.target.value)}
                        />
                        <MakeBtn onClick={() => void handleCreateNewPlaylist()}>생성</MakeBtn>
                    </>
                ) : (
                    <PlusBtn onClick={handleShowInput}>새 플래이리스트 만들기</PlusBtn>
                )}
                <PlaylistContainer>
                    {playlists.map((name, index) => (
                        <PlaylistItemWrapper key={index}>
                            <PlaylistItem onClick={() => void handleAddVideoToPlaylist(name)}>
                                {name}
                            </PlaylistItem>

                            {/* <DeleteButton onClick={() => handleDeletePlaylist(listName)}>
                                삭제
                            </DeleteButton> */}
                        </PlaylistItemWrapper>
                    ))}
                </PlaylistContainer>
            </BookmarkModal>
            {userData && (
                <div>
                    User ID: {userData.id}
                    User Name: {userData.name}
                    User Email: {userData.email}
                </div>
            )}
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
    margin-left: 10px;
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
// const DeleteButton = styled.button`
//     padding: 4px 0px;
//     margin-right: 10px;
//     border: none;
//     background: none;
// `;

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
