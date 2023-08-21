import axios from 'axios';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane as paperPlaneRegular } from '@fortawesome/free-regular-svg-icons';

import { Link } from 'react-router-dom';

interface Props {
    senderProfileImage: string;
    senderNickname: string;
    onChatRoomClick: (chatRoomId: string) => void;
}

const MateListItem: React.FC<Props> = ({ senderProfileImage, senderNickname, onChatRoomClick }) => {
    const token: string | null = sessionStorage.getItem('token');

    const handleDMIconClick = () => {
        try {
            axios
                .post(`/api/dm/${encodeURIComponent(senderNickname)}`, null, {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                })
                .then((response) => {
                    console.log('채팅방 생성 완료:', response.data);
                    const chatRoomId = response.data.id;
                    onChatRoomClick(chatRoomId); // 여기서 채팅방 열기 이벤트를 호출
                })
                .catch((error) => {
                    console.error('채팅방 생성 에러:', error);
                });
        } catch (error) {
            console.error('채팅방 생성 에러:', error);
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
                <Link to={`/messenger/${encodeURIComponent(senderNickname)}`}>
                    <FaMessage
                        icon={paperPlaneRegular}
                        onClick={handleDMIconClick} // 아이콘 클릭 시 채팅방 생성 및 열기 이벤트
                    />
                </Link>

                <UnfollowButton>unfollow</UnfollowButton>
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

const UnfollowButton = styled.button`
    padding: 0 10px;
    border-style: none;
    border-radius: 15px;
    margin: 5px;
    background-color: #b7b7b7;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
`;

export default MateListItem;
