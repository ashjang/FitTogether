// ParentComponent.tsx
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ParentComponent: React.FC = () => {
    const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(null);

    const handleChatRoomClick = (chatRoomId: string) => {
        setSelectedChatRoomId(chatRoomId);
    };

    // Sample data for demonstration purposes
    const sampleChatMessages = [
        { roomId: '1', message: 'Hello!', sentAt: new Date() },
        // ... other messages
    ];

    return (
        <div>
            <ChatList chatRooms={[]} onChatRoomClick={handleChatRoomClick} />
            {selectedChatRoomId && (
                <ChatWindow
                    chatRoomId={selectedChatRoomId}
                    chatMessages={sampleChatMessages}
                    inputMessage=""
                    onInputChange={() => {}}
                    onSendMessage={() => {}}
                    username="JohnDoe"
                    onUsernameChange={() => {}}
                    chatRoomName="Sample Chat Room"
                    userProfile={{ username: 'JohnDoe', profileImage: null }}
                />
            )}
        </div>
    );
};

export default ParentComponent;
