// import axios from 'axios';

import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import MateList from '../common/MateList';
import MateListItem from '../common/MateListitem';

import default_user_image from '../../assets/default-user-image.png';

interface ChatRoom {
    id: string;
    name: string;
    profileImage: string | null;
    receiverNickname: string;
}

interface Props {
    chatRooms: ChatRoom[];
    onChatRoomClick: (chatRoomId: string) => void;
}

const ChatList: React.FC<Props> = ({ chatRooms, onChatRoomClick }) => {
    console.log('Received chatRooms:', chatRooms);

    const [isMateListOpen, setIsMateListOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 클릭시 운동메이트 리스트 모달창
    const handleShowMateListClick = () => {
        if (!isLoading) {
            setIsLoading(true);
            setIsMateListOpen(true);
        }
    };
    const handleCloseMateList = () => {
        setIsMateListOpen(false);
        setIsLoading(false);
    };

    const handleCreateChatRoom = (chatRoomId: string) => {
        console.log('Chat room clicked:', chatRoomId);

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
                {isMateListOpen && <MateList isOpen={true} onClose={handleCloseMateList} />}
            </TopArea>

            <BottomArea>
                {chatRooms.length > 0 ? (
                    chatRooms.map((chatRoom) => (
                        <ListItem
                            key={chatRoom.id}
                            onClick={() => handleCreateChatRoom(chatRoom.id)}
                        >
                            <MateListItem
                                senderProfileImage={default_user_image}
                                senderNickname={chatRoom.receiverNickname}
                                showButton={false}
                                onChatRoomClick={() => onChatRoomClick(chatRoom.id)}
                            />
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
