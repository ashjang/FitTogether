import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import client from '../utils/websoket';

interface ChatRoom {
    id: string;
    name: string;
    profileImage: string | null;
    receiverNickname: string;
}
interface UserProfile {
    username: string;
    profileImage: string | null;
}
interface ChatMessage {
    roomId: string;
    message: string;
    sentAt: Date;
}

const ChatApp: React.FC = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
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
                        setChatRooms(response.data as unknown as ChatRoom[]);
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
    }, []);

    useEffect(() => {
        if (!selectedChatRoom) return;

        const stompSubscription = client.subscribe(
            `/sub/dm/room/${selectedChatRoom}`,
            (message) => {
                const receivedMessage = JSON.parse(message.body) as ChatMessage;
                setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
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

    const handleChatRoomClick = (chatRoomId: string) => {
        if (selectedChatRoom) {
            client.unsubscribe(`/sub/dm/room/${selectedChatRoom}`);
        }

        setSelectedChatRoom(chatRoomId);
        setInputMessage('');
        console.log('Selected Chat Room:', chatRoomId); // 수정된 위치로 이동
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '' || username.trim() === '' || !selectedChatRoom) return;

        const newMessage = {
            roomId: selectedChatRoom,
            message: inputMessage,
            sentAt: new Date(),
        };

        client.publish({ destination: '/pub/dm/message', body: JSON.stringify(newMessage) });

        setInputMessage('');
    };

    return (
        <ChatAppWrapper>
            <ChatListBox>
                <ChatList chatRooms={chatRooms} onChatRoomClick={handleChatRoomClick} />
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
                    chatRoomName={chatRooms.find((room) => room.id === selectedChatRoom)?.name}
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
    position: absolute;
    top: 0;
    left: 390px;
    width: 1000px;
    height: 600px;
    padding: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background-color: #d9d9d9;
    overflow-y: auto;
`;

export default ChatApp;
