import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import client from '../utils/websoket';

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
    // chatRoomId: number;
    chatRoomId: number | null;
    contents: string;
    sendDate: Date;
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

        // 새로고침 시에도 서버에서 메시지 가져오기
        if (selectedChatRoom) {
            getChatMessages(selectedChatRoom);
        }
    }, [params]);

    const getChatMessages = (chatRoomId: number) => {
        const token: string | null = sessionStorage.getItem('token');

        axios
            .get(`/api/dm?chatRoomId=${chatRoomId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    const chatMessageList = response.data as unknown as ChatMessage[];
                    console.log('메시지 기록 불러오기:', chatMessageList);
                    // setChatMessages(chatMessageList);
                    // 기존 메시지 목록에 덧붙이기
                    setChatMessages((prevMessages) => {
                        const updatedMessages = prevMessages.filter(
                            (message) => message.chatRoomId !== chatRoomId
                        );
                        return [...updatedMessages, ...chatMessageList];
                    });
                } else {
                    console.error('API 요청이 실패하였습니다.');
                }
            })
            .catch((error) => {
                console.error('메시지 조회 에러:', error);
            });
    };

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
                        console.log('채팅방 리스트 불러오기: ', chatRoomList);
                        setChatRooms(() => [...chatRoomList]);

                        // 각 채팅방에 대해 메시지 가져오기
                        chatRoomList.forEach((room) => {
                            getChatMessages(room.chatRoomId);
                        });

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
        const receiverNickname: string = params.nickname ? params.nickname : '';

        axios
            .post(`/api/dm/${receiverNickname}`, null, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
            .then((response) => {
                const chatRoomId = (response.data as { chatRoomId: number }).chatRoomId;
                setSelectedChatRoom(chatRoomId);
                console.log('채팅방 생성 완료:', response.data);
                console.log('채팅방 ID:', chatRoomId);
                console.log('token넘버:', token);
                console.log('받는사람:', receiverNickname);

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

    const handleChatRoomClick = (chatRoomId: number) => {
        console.log('handleChatRoomCliek', chatRoomId);
        if (chatRoomId) {
            client.unsubscribe(`/sub/dm/room/${chatRoomId}`);
        }

        setSelectedChatRoom(chatRoomId);
        setInputMessage('');
        console.log('선택한 채팅방으로 이동:', chatRoomId);
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
                        (message) => message.chatRoomId === selectedChatRoom
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
`;

const ChatListBox = styled.div``;

const ChatwindowBox = styled.div``;

export default ChatApp;
