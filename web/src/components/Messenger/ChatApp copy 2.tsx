// ChatApp.tsx
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { stompClient } from '../utils/websoket';

interface ChatRoom {
    id: string;
    name: string;
    profileImage: string | null;
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

interface ReceivedMessage {
    message: string;
    sentAt: string;
}

const ChatApp: React.FC = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const connectWebSocket = () => {
            stompClient.connect(
                {},
                (frame) => {
                    console.log('웹소켓 연결됨');
                    console.log('연결된 프레임:', frame);

                    stompClient.subscribe('/sub/dm/room/roomId', (message) => {
                        const receivedMessage = JSON.parse(message.body) as ReceivedMessage;
                        console.log('받은 메세지:', receivedMessage);
                        // 웹소켓으로 받은 메시지를 처리하는 로직 추가
                    });
                },
                (errorFrame: any, error: any) => {
                    console.error('웹소켓 연결 에러:', error);
                }
            );
        };

        const cleanupWebSocket = () => {
            if (stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log('웹소켓 연결 종료됨');
                });
            }
        };

        connectWebSocket();
        return cleanupWebSocket;
    }, []);

    const handleChatRoomClick = (chatRoomId: string) => {
        setSelectedChatRoom(chatRoomId);
        setInputMessage('');
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '' || username.trim() === '') return;

        const newMessage = `${username}: ${inputMessage}`;
        const currentTime = new Date();

        const messageObject = {
            roomId: selectedChatRoom!,
            message: newMessage,
            sentAt: currentTime,
        };

        setChatMessages((prevMessages) => [...prevMessages, messageObject]);
        // stompClient.send('/dm/message', {}, JSON.stringify(messageObject));
        setInputMessage('');
    };

    return (
        <ChatAppWrapper>
            <WebsoketTxt>웹소켓 연결 테스트중입니다.</WebsoketTxt>
            <ChatListBox>
                <ChatList chatRooms={chatRooms} onChatRoomClick={handleChatRoomClick} />
            </ChatListBox>

            <ChatWindow
                chatRoomId={selectedChatRoom}
                chatMessages={chatMessages.filter((message) => message.roomId === selectedChatRoom)}
                onSendMessage={handleSendMessage}
                inputMessage={inputMessage}
                onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputMessage(e.target.value)
                }
                username={username}
                onUsernameChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                chatRoomName={chatRooms.find((room) => room.id === selectedChatRoom)?.name}
                userProfile={userProfile}
            />
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

const WebsoketTxt = styled.p`
    position: absolute;
    top: 100px;
    left: 550px;
    font-size: 30px;
    z-index: 50;
`;

export default ChatApp;
