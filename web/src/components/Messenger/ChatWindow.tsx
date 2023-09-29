// ChatWindow.tsx
import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import defaultUserImage from '../../assets/default-user-image.png';

interface UserProfile {
    username: string;
    profileImage: string | null;
}
interface ChatMessage {
    chatRoomId: number | null;
    contents: string;
    sendDate: Date;
    senderNickname?: string;
}

interface Props {
    chatRoomId: number | null;
    chatMessages: ChatMessage[];
    inputMessage: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    username: string;
    onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    chatRoomName: string | undefined;
    userProfile: UserProfile | null;
}
const ChatWindow: React.FC<Props> = ({
    chatRoomId,
    chatMessages,
    inputMessage,
    onInputChange,
    onSendMessage,
    username,
    chatRoomName,
    userProfile,
}) => {
    const messageAreaRef = useRef<HTMLDivElement | null>(null);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

    const scrollToBottom = () => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        if (shouldScrollToBottom) {
            scrollToBottom();
        }
    }, [chatMessages, shouldScrollToBottom]);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('엔터키로 메세지 보내기');
            event.preventDefault();
            onSendMessage();
            setShouldScrollToBottom(true); // 엔터키 입력 시에는 스크롤 다시 아래로
        } else {
            setShouldScrollToBottom(false); // 다른 키 입력 시에는 스크롤 유지
        }
    };
    const handleSendMessage = () => {
        onSendMessage();
        setShouldScrollToBottom(true); // 보내기 버튼 클릭 시에는 스크롤 다시 아래로
    };
    return (
        <ChatWindowBox>
            {chatRoomId ? (
                <>
                    <TopArea>
                        <ProfileWrapper>
                            {userProfile?.profileImage && (
                                <ProfileImage src={userProfile.profileImage} alt={username} />
                            )}
                            <NickNameTitle>{chatRoomName}</NickNameTitle>
                        </ProfileWrapper>
                    </TopArea>
                    <TextBox>
                        <MessageArea ref={messageAreaRef}>
                            {chatMessages.map((message, index) => (
                                <MessageBox key={index}>
                                    <SenderProfile>
                                        <SenderImage
                                            src={userProfile?.profileImage || defaultUserImage}
                                            alt={username}
                                        />
                                    </SenderProfile>
                                    <TextBoxArea>
                                        <MessageTop>
                                            <SenderNickname>
                                                {message.senderNickname}
                                            </SenderNickname>
                                            <MessageTime>
                                                {new Date(message.sendDate).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}
                                            </MessageTime>{' '}
                                        </MessageTop>
                                        <MessageText>{message.contents}</MessageText>
                                    </TextBoxArea>
                                </MessageBox>
                            ))}
                        </MessageArea>
                        <SendArea>
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={onInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <SendBtn onClick={handleSendMessage}>
                                <span className="blind">보내기</span>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </SendBtn>
                        </SendArea>
                    </TextBox>
                </>
            ) : (
                <DefalutWindow>운동 메이트와 함께 채팅을 시작해 보세요!</DefalutWindow>
            )}
        </ChatWindowBox>
    );
};
const ChatWindowBox = styled.div`
    position: relative;
    width: 1000px;
    height: 600px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background-color: #d9d9d9;
`;

const TopArea = styled.div`
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 80px;
    background-color: #aaa;
`;

const ProfileWrapper = styled.div`
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const NickNameTitle = styled.strong`
    font-size: 24px;
    font-weight: bold;
`;

const TextBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const MessageArea = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 460px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }

    padding: 10px 0;
`;

const SenderProfile = styled.div`
    margin-right: 10px;
`;
const SenderImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10px;
`;
const TextBoxArea = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;
`;

const MessageBox = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
    width: 100%;
`;
const MessageTop = styled.div`
    display: flex;
    align-items: flex-end;
`;
const SenderNickname = styled.p`
    font-size: 20px;
    font-weight: 700;
`;

const MessageText = styled.p`
    position: relative;
    display: block;
    font-size: 18px;
    max-width: 100%;
    height: 100%;
    word-break: break-all;
    padding: 12px;
    border-radius: 10px;
`;
const MessageTime = styled.div`
    display: block;
    font-size: 14px;
    margin-left: 10px;
`;

const SendArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    background-color: #bbb;

    input {
        width: 800px;
        height: 40px;
        border: 1px solid #fff;
        border-radius: 5px;
        outline: none;
        font-size: 20px;
    }
`;
const SendBtn = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    margin-left: 4px;
`;

const DefalutWindow = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;
export default ChatWindow;
