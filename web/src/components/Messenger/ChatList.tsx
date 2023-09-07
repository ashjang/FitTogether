// import axios from 'axios';

import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import MateList from '../common/MateList';
import default_user_image from '../../assets/default-user-image.png';

interface ChatRoom {
    chatRoomId: number;
    senderId: null;
    receiverId: null;
    senderNickname: string;
    receiverNickname: string;
    chatRoomDate: string;
}

interface Props {
    chatRooms: ChatRoom[];
    onChatRoomClick: (chatRoomId: number) => void;
    mateModalOpen: boolean;
    setMateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    createChatRoom: () => void;
    currentUserNickname: string;
}
const ChatList: React.FC<Props> = ({
    chatRooms,
    onChatRoomClick,
    mateModalOpen,
    setMateModalOpen,
    createChatRoom,
    currentUserNickname,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleShowMateListClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // 이벤트 버블링 x
        console.log('운동메이트 리스트 버튼 클릭 열림', isLoading);

        if (!isLoading) {
            setMateModalOpen(true);
        }
    };

    const handleCloseMateList = () => {
        console.log('운동 메이트 리스트 모달창 닫기');
        setMateModalOpen(false);
        setIsLoading(false);
    };

    const handleCreateChatRoom = (chatRoomId: number) => {
        console.log('chatRoolId 리스트 클릭하기:', chatRoomId);
        onChatRoomClick(chatRoomId);
    };

    return (
        <ChatListBox>
            <TopArea>
                <MateListTitle>운동 메이트 리스트</MateListTitle>

                <MateListButton onClick={handleShowMateListClick}>
                    <span className="blind">운동 메이트 리스트 버튼</span>
                    <FontAwesomeIcon icon={faUserGroup} />
                </MateListButton>
                {mateModalOpen && (
                    <MateList
                        isOpen={mateModalOpen}
                        onClose={handleCloseMateList}
                        createChatRoom={createChatRoom}
                        onChatRoomClick={onChatRoomClick}
                    />
                )}
            </TopArea>

            <BottomArea>
                {chatRooms.length > 0 ? (
                    chatRooms.map((chatRoom) => (
                        <ListItem
                            key={chatRoom.chatRoomId}
                            onClick={() => handleCreateChatRoom(chatRoom.chatRoomId)}
                        >
                            <ChatListItem>
                                <img
                                    src={default_user_image}
                                    alt="프로필 이미지"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                                {/* <ChatListItemName>{chatRoom.receiverNickname}</ChatListItemName> */}
                                <ChatListItemName>
                                    {
                                        currentUserNickname === chatRoom.receiverNickname
                                            ? chatRoom.senderNickname // 현재 사용자가 receiver인 경우
                                            : chatRoom.receiverNickname // 현재 사용자가 sender인 경우
                                    }
                                </ChatListItemName>
                            </ChatListItem>
                        </ListItem>
                    ))
                ) : (
                    <NoneChat>
                        리스트가
                        <br />
                        비어있습니다.
                    </NoneChat>
                )}
            </BottomArea>
        </ChatListBox>
    );
};

const ChatListBox = styled.div`
    position: absolute;
    top: 0px;
    left: 50px;
    width: 320px;
    height: 600px;
    overflow-y: auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const TopArea = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    background-color: #ffd4d4;
    z-index: 1;
`;

const MateListButton = styled.button`
    display: inline-block;
    margin-left: 20px;
    font-size: 18px;
    border: none;
    background: none;

    &:hover {
        color: #7f5539;
        transition: all 0.3s;
    }
`;

const MateListTitle = styled.h2``;

const BottomArea = styled.ul`
    position: relative;
    top: 0px;
    width: 100%;
`;

const ListItem = styled.li`
    cursor: pointer;
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 80px;
    padding-left: 30px;
    border-bottom: 1px solid #fff;

    &:hover {
        background-color: lightblue;
    }
`;
const ChatListItem = styled.div`
    display: flex;
    align-items: center;
`;
const ChatListItemName = styled.div`
    margin-left: 15px;
`;
const NoneChat = styled.p`
    position: absolute;
    left: 50%;
    top: 170px;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;

export default ChatList;
