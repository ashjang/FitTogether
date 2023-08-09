import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import { User } from './Map';

interface UserProfileProps {
    user: User;
    onClose: () => void;
}
const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleFriendRequest = () => {
        setShowConfirmation(true);
    };

    const handleConfirmationClose = () => {
        setShowConfirmation(false);
    };
    const handleFriendRequestConfirmation = () => {
        // 여기에서 백엔드쪽 니증에 연결될때 친구 신청을 보내고 처리하는 로직 만들기
        // 실제로는 백엔드 API를 호출하여 처리해야 하고, 일단은 alert으로 대체
        alert('신청을 보냈습니다.');
        // 팝업을 닫습니다.
        setShowConfirmation(false);
        onClose();
    };
    return (
        <UserProfileContainer>
            <ProfileBox>
                <h2 className="profile-title">User Profile</h2>
                <p className="userId">닉네임: {user.id}</p>
                <p className="userCategory">주로 하는 운동: {user.category}</p>
            </ProfileBox>

            <CloseButton onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
            <FriendButton onClick={handleFriendRequest}>운동 같이 하실래요?</FriendButton>

            {showConfirmation && (
                <ConfirmationPopup>
                    <h3>운동메이트 신청을 하시겠습니까?</h3>
                    <ConfirmationButtons>
                        <ConfirmButton onClick={handleConfirmationClose}>취소</ConfirmButton>
                        <ConfirmButton onClick={handleFriendRequestConfirmation}>
                            확인
                        </ConfirmButton>
                    </ConfirmationButtons>
                </ConfirmationPopup>
            )}
        </UserProfileContainer>
    );
};
const UserProfileContainer = styled.div`
    position: absolute;
`;
const ProfileBox = styled.div`
    width: 250px;
    height: 250px;
    padding: 30px 20px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #61dafbaa;

    .profile-title {
        margin-bottom: 20px;
    }
    p {
        font-size: 18px;
        font-weight: 700;
        padding-left: 10px;
    }
    .userId {
        margin-bottom: 20px;
    }
`;
const CloseButton = styled.button`
    position: absolute;
    right: 15px;
    top: 10px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #000;
`;
const FriendButton = styled.button`
    position: absolute;
    left: 50%;
    bottom: 20px;
    width: 180px;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transform: translateX(-50%);
    transition: background-color 0.3s ease;
    background-color: #4caf50;

    &:hover {
        background-color: #45a047;
    }
`;
const ConfirmationPopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    z-index: 999;
`;

const ConfirmationButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    margin-left: 10px;
    padding: 6px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;
export default UserProfile;
