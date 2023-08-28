import axios from 'axios';
import React, { useEffect, useState } from 'react';

import MateListItem from './MateListitem';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import default_user_image from '../../assets/default-user-image.png';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    createChatRoom: () => void;
}

interface MateDateItem {
    senderProfileImage: string;
    senderNickname: string;
    nickname: string;
}

interface MateData {
    [key: string]: MateDateItem;
}

interface UserData {
    senderProfileImage: string;
    senderNickname: string;
}

const MateList: React.FC<Props> = ({ isOpen, onClose, createChatRoom }) => {
    const [mateData, setMateData] = useState<MateData>({});
    const token: string | null = sessionStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios
                .get<UserData[]>('/api/matching/requests/lists', {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const processedData = processResponseData(response.data);
                        setMateData(processedData);
                    } else {
                        console.error('API 요청이 실패하였습니다.');
                        alert('친구 리스트를 가져오는데 실패했습니다.');
                    }
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                    alert('친구 리스트를 가져오는데 실패했습니다.');
                });
        }
    }, [token]);

    const processResponseData = (responseData: UserData[]) => {
        const processedData: MateData = {};

        responseData.forEach((user) => {
            if (typeof user.senderNickname === 'string') {
                processedData[user.senderNickname] = {
                    senderProfileImage: user.senderProfileImage || default_user_image,
                    senderNickname: user.senderNickname,
                    nickname: '',
                };
            }
        });

        return processedData;
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="MateList Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 50,
                },
                content: {
                    width: 'max-content',
                    height: 'max-content',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                },
            }}
        >
            <MateListComponent>
                <Title>운동 메이트 리스트</Title>
                <MateListItems>
                    {Object.entries(mateData).map(([key, mate]) => (
                        <MateListItem
                            key={key}
                            {...mate}
                            onChatRoomClick={(chatRoomId: number) => {
                                // 채팅방 생성 및 열기 동작 시뮬레이션
                                console.log(
                                    `Chat room with ${mate.senderNickname} opened. Room ID: ${chatRoomId}`
                                );
                                createChatRoom();
                            }}
                            showButton={true}
                        />
                    ))}
                </MateListItems>
            </MateListComponent>
        </Modal>
    );
};

const MateListComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 450px;
    margin: 0 auto;
    background-color: white;
    border-radius: 15px;
`;

const Title = styled.h2``;

const MateListItems = styled.div`
    width: 300px;
    height: 380px;
    padding: 0 4px;
    overflow-y: auto;
`;

export default MateList;
