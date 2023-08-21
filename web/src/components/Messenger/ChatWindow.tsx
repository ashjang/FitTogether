// ChatWindow.tsx
import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface UserProfile {
    username: string;
    profileImage: string | null;
}
interface Props {
    chatRoomId: string | null;
    chatMessages: { roomId: string; message: string; sentAt: Date }[]; // 보낸 시간 정보 추가

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
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSendMessage(); // 엔터키를 누르면 메시지 전송
        }
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
                        <MessageArea>
                            {chatMessages.map((message, index) => (
                                <MessageBox key={index}>
                                    <MessageText>{message.message}</MessageText>
                                    <MessageTime>
                                        {message.sentAt.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </MessageTime>{' '}
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
                            <SendBtn onClick={onSendMessage}>
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
    height: 100px;

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
// 프로필 이미지를 감싸는 스타일 컴포넌트
const ProfileWrapper = styled.div`
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
`;

// 프로필 이미지 스타일 컴포넌트
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
    // background-color: rgb(91, 75, 56);
`;
const MessageArea = styled.div`
    width: 100%;
    height: 405px;
    margin-left: 50px;
    overflow-y: auto;
`;
const MessageBox = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 8px;
`;
const MessageText = styled.div`
    display: block;
    font-size: 18px;
`;
const MessageTime = styled.div`
    display: block;
    font-size: 14px;
    margin-left: 10px;
`;

const SendArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;

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
