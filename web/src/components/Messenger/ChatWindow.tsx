// ChatWindow.tsx
import styled from '@emotion/styled';
import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface UserProfile {
    username: string;
    profileImage: string | null;
}
interface Props {
    chatRoomId: number | null;
    chatMessages: { chatRoomId: number; contents: string; sendDate: Date }[]; // 보낸 시간 정보 추가

    inputMessage: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void; // 메시지 보내기 핸들러
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
                                    <MessageTime>
                                        {new Date(message.sendDate).toLocaleTimeString([], {
                                            // year: 'numeric',
                                            // month: 'short',
                                            // day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </MessageTime>{' '}
                                    <MessageText>{message.contents}</MessageText>
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
    position: absolute;
    top: 0;
    left: 390px;
    width: 1000px;
    height: 600px;
    padding: 20px;
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

    ::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background-color: rgb(91, 75, 56);
    }
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
    font-size: 20px;
    margin-left: 10px;
`;

const TextBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
`;
const MessageArea = styled.div`
    position: relative;
    right: 0px;

    display: flex;
    align-items: flex-end;
    flex-direction: column;

    width: 100%;
    height: 405px;
    margin-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
`;
const MessageBox = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 8px;
    margin-right: 10px;
`;
const MessageText = styled.p`
    position: relative;
    display: block;
    font-size: 18px;

    width: 300px;
    height: 100%;
    word-break: break-all;
    padding: 12px;
    border-radius: 10px;
    background-color: #e7b2b2;

    &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-left-color: #e7b2b2;
        border-right: 0;
        border-top: 0;
        border-radius: 5px;

        margin-top: -10px;
        margin-right: -15px;
    }
`;
const MessageTime = styled.div`
    display: block;
    font-size: 14px;
    margin-right: 10px;
    padding-bottom: 8px;
`;

const SendArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    input {
        width: 800px;
        height: 40px;
        margin-right: 0px;
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
    // background: none;
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
