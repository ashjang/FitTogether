// import axios from 'axios';
import React, { useState } from 'react';

import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane as paperPlaneRegular } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

interface Props {
    senderProfileImage: string;
    senderNickname: string;
    showButton: boolean;
    createChatRoom: (senderNickname: string) => void;

    onChatRoomClick: (chatRoomId: number) => void;
}
const MateListItem: React.FC<Props> = ({ senderProfileImage, senderNickname, showButton }) => {
    const [chatRoomCreated, setChatRoomCreated] = useState(false);

    const handleChatRoomClick = () => {
        if (!chatRoomCreated) {
            console.log(`${senderNickname}님과 채팅방이 열렸습니다.`);
            setChatRoomCreated(true);
        } else {
            console.log(`${senderNickname}님과의 채팅방은 이미 존재합니다.`);
        }
    };

    return (
        <MateListItemComponent>
            <MateListItemComponentElement>
                <ProfileImageContainer>
                    <ProfileImage src={senderProfileImage} />
                </ProfileImageContainer>
                <SenderNickname>{senderNickname}</SenderNickname>
            </MateListItemComponentElement>
            <MateListItemComponentElement>
                {showButton && (
                    <>
                        <Link to={`/messenger/${encodeURIComponent(senderNickname)}`}>
                            <FaMessage icon={paperPlaneRegular} onClick={handleChatRoomClick} />
                        </Link>
                    </>
                )}
            </MateListItemComponentElement>
        </MateListItemComponent>
    );
};

const MateListItemComponent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MateListItemComponentElement = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 1px transparent solid;
    border-radius: 50%;
    margin: 10px;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    display: block;
    padding: 0px;
    width: 35px;
    height: 35px;
`;

const SenderNickname = styled.p`
    font-size: 14px;
`;

const FaMessage = styled(FontAwesomeIcon)`
    margin: 5px;
    cursor: pointer;
`;

export default MateListItem;
