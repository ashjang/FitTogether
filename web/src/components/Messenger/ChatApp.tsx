// ChatApp.tsx
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
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
    const [chatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userProfile] = useState<UserProfile | null>(null);

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

    const handleChatRoomClick = (chatRoomId: string) => {
        if (selectedChatRoom) {
            client.unsubscribe(`/sub/dm/room/${selectedChatRoom}`);
        }

        setSelectedChatRoom(chatRoomId);
        setInputMessage('');

        if (chatRoomId) {
            const stompSubscription = client.subscribe(`/sub/dm/room/${chatRoomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body) as ChatMessage;
                setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });

            return () => {
                stompSubscription.unsubscribe();
            };
        }
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

export default ChatApp;
