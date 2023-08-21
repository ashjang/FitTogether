// ChatList.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import MateList from '../common/MateList';

interface ChatRoom {
    id: string;
    name: string;
    profileImage: string | null;
}

interface Props {
    chatRooms: ChatRoom[];
    onChatRoomClick: (chatRoomId: string) => void;
}

const ChatList: React.FC<Props> = ({ chatRooms, onChatRoomClick }) => {
    const [isMateListOpen, setIsMateListOpen] = useState(false);

    // 클릭시 운동메이트 리스트 모달창
    const handleShowMateListClick = () => {
        setIsMateListOpen(true);
    };
    const handleCloseMateList = () => {
        setIsMateListOpen(false);
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
                        <ListItem key={chatRoom.id} onClick={() => onChatRoomClick(chatRoom.id)}>
                            <ProfileImageWrapper>
                                {chatRoom.profileImage && (
                                    <ProfileImage src={chatRoom.profileImage} alt={chatRoom.name} />
                                )}
                            </ProfileImageWrapper>
                            <UserName>{chatRoom.name}</UserName>
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
// emotion css style
const ChatListBox = styled.div`
    position: absolute;
    top: 0px;
    left: 50px;
    width: 320px;
    height: 600px;
    overflow-y: auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    // z-index: 10;
`;
const TopArea = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    background-color: #ffd4d4;
`;
const MateListButton = styled.button`
    display: inline-block;
    margin-left: 20px;
    font-size: 18px;
    border: none;
    background: none;

    & :hover {
        color: #7f5539;
        transition: all 0.3s;
    }
`;
const MateListTitle = styled.h2``;

const BottomArea = styled.ul`
    position: relative;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: lightblue;
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
`;
const UserName = styled.li`
    font-size: 18px;
    font-weight: 700;
`;

const ProfileImageWrapper = styled.div`
    margin-right: 10px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const NoneChat = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 500;
    text-align: center;
`;
export default ChatList;
