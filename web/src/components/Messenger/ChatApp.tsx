import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import client from '../utils/websoket';
import { GiToken } from 'react-icons/gi';

interface ChatRoom {
    chatRoomId: number;
    senderId: null;
    receiverId: null;
    senderNickname: string;
    receiverNickname: string;
    chatRoomDate: string;
}
interface UserProfile {
    username: string;
    profileImage: string | null;
}
interface ChatMessage {
    roomId: number;
    message: string;
    sentAt: Date;
}

const ChatApp: React.FC = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState<number | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userProfile] = useState<UserProfile | null>(null);
    const [mateModalOpen, setMateModalOpen] = useState(false);
    const params = useParams();

    useEffect(() => {
        setMateModalOpen(false);

        getChatRoomList();
    }, [params]);

    const getChatRoomList = () => {
        const token: string | null = sessionStorage.getItem('token');

        if (token) {
            axios
                .get('/api/dm/lists', {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const chatRoomList = response.data as unknown as ChatRoom[];
                        console.log('채팅방 리스트 불러와졌쥬 ^^: ', chatRoomList);
                        setChatRooms(() => [...chatRoomList]);

                        console.log('params', params);
                        const paramsNickname: string | undefined = params.nickname
                            ? params.nickname
                            : '';

                        if (
                            chatRoomList.filter((room) => room.receiverNickname === paramsNickname)
                                .length === 0 &&
                            paramsNickname !== ''
                        ) {
                            createChatRoom();
                        }
                    } else {
                        console.error('API 요청이 실패하였습니다.');
                        alert('채팅 리스트를 가져오는데 실패했습니다.');
                    }
                })
                .catch((error) => {
                    console.error('채팅방 리스트 조회 에러:', error);
                    alert('채팅 리스트를 가져오는데 실패했습니다.');
                });
        }
    };

    const createChatRoom = () => {
        const token: string | null = sessionStorage.getItem('token');
        const senderNickname: string = params.nickname ? params.nickname : '';

        axios
            .post(`/api/dm/${senderNickname}`, null, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
            .then((response) => {
                // 타입 단언을 통해 response.data의 형식을 ResponseData로 강제 변환
                const chatRoomId = (response.data as ResponseData).chatRoomId;
                setSelectedChatRoom(chatRoomId);
                console.log('채팅방 생성 완료:', response.data);
                console.log('채팅방 ID:', chatRoomId);
                console.log('chattt token:', token);
                console.log('chattt 세닉:', senderNickname);

                getChatRoomList();
            })
            .catch((error) => {
                console.error('채팅방 생성 에러:', error);
            });
    };

    useEffect(() => {
        if (!selectedChatRoom) return;

        const stompSubscription = client.subscribe(
            `/sub/dm/room/${selectedChatRoom}`,
            (message) => {
                const receivedMessage = JSON.parse(message.body) as ChatMessage;
                setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
                console.log('receivedMessage', receivedMessage);
            }
        );

        return () => {
            stompSubscription.unsubscribe();
        };
    }, [selectedChatRoom]);

    // const handleChatRoomClick = (chatRoomId: string) => {
    //     if (selectedChatRoom) {
    //         client.unsubscribe(`/sub/dm/room/${selectedChatRoom}`);
    //     }

    //     setSelectedChatRoom(chatRoomId);
    //     setInputMessage('');

    //     if (chatRoomId) {
    //         const stompSubscription = client.subscribe(`/sub/dm/room/${chatRoomId}`, (message) => {
    //             const receivedMessage = JSON.parse(message.body) as ChatMessage;
    //             setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
    //         });

    //         return () => {
    //             stompSubscription.unsubscribe();
    //         };
    //     }
    // };

    const handleChatRoomClick = (chatRoomId: number) => {
        console.log('handleChatRoomCliek', chatRoomId);
        if (chatRoomId) {
            client.unsubscribe(`/sub/dm/room/${chatRoomId}`);
        }

        setSelectedChatRoom(chatRoomId);
        setInputMessage('');
        console.log('Selected Chat Room:', chatRoomId); // 수정된 위치로 이동
    };

    const handleSendMessage = () => {
        console.log('handleSendMessage-inputMessage', inputMessage);
        console.log('handleSendMessage-username', username);
        console.log('handleSendMessage-selectedChatRoom', selectedChatRoom);
        if (inputMessage.trim() === '' || !selectedChatRoom) return;

        const newMessage = {
            chatRoomId: selectedChatRoom,
            contents: inputMessage,
            token: sessionStorage.getItem('token'),
        };
        console.log('handleSendMessage02');
        client.publish({ destination: '/pub/dm/message', body: JSON.stringify(newMessage) });

        setInputMessage('');
    };

    return (
        <ChatAppWrapper>
            <ChatListBox>
                <ChatList
                    chatRooms={chatRooms}
                    onChatRoomClick={handleChatRoomClick}
                    mateModalOpen={mateModalOpen}
                    setMateModalOpen={setMateModalOpen}
                    createChatRoom={createChatRoom}
                />
            </ChatListBox>

            <ChatwindowBox>
                <ChatWindow
                    chatRoomId={selectedChatRoom}
                    chatMessages={chatMessages.filter(
                        (message) => message.roomId === selectedChatRoom
                    )}
                    onSendMessage={handleSendMessage}
                    inputMessage={inputMessage}
                    onInputChange={(e) => setInputMessage(e.target.value)}
                    username={username}
                    onUsernameChange={(e) => setUsername(e.target.value)}
                    chatRoomName={
                        chatRooms.find((room) => room.chatRoomId === selectedChatRoom)
                            ?.receiverNickname
                    }
                    userProfile={userProfile}
                />
            </ChatwindowBox>
        </ChatAppWrapper>
    );
};

const ChatAppWrapper = styled.div`
    display: flex;
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    margin: 180px auto 0;
`;

const ChatListBox = styled.div`
    overflow-y: auto;
`;
const ChatwindowBox = styled.div`
    // position: absolute;
    // top: 0;
    // left: 390px;
    // width: 1000px;
    // height: 600px;
    // padding: 20px;
    // width: 100%;
    // height: 100%;
    // box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    // background-color: #d9d9d9;
    overflow-y: auto;
`;

export default ChatApp;
