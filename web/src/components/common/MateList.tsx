import React, { useEffect, useState } from 'react';

import MateListItem from './MateListitem';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import default_user_image from '../../assets/default-user-image.png';

const imageSrc: string = default_user_image;

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
interface MateDateItem {
    senderProfileImage: string;
    senderNickname: string;
}
interface MateData {
    [key: string]: MateDateItem;
}
interface UserProfile {
    username: string;
    profileImage: string | null;
}

interface UsersProfileData {
    usersInfo: UserProfile[];
}

const MateList: React.FC<Props> = ({ isOpen, onClose }) => {
    const [mateData, setMateData] = useState<MateData>({});

    useEffect(() => {
        fetch('/data/usersProfile.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data: UsersProfileData) => {
                const mateData: MateData = {};
                data.usersInfo.forEach((user) => {
                    mateData[user.username] = {
                        senderProfileImage: user.profileImage || imageSrc,
                        senderNickname: user.username,
                    };
                });
                setMateData(mateData);
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="MateList Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 50,
                },
                content: {
                    width: 'max-content',
                    height: 'max-content',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                },
            }}
        >
            <MateListComponent>
                <Title>운동 메이트 리스트</Title>
                <MateListItems>
                    {Object.entries(mateData).map(([key, mate]) => (
                        <MateListItem key={key} {...mate} />
                    ))}
                </MateListItems>
            </MateListComponent>
        </Modal>
    );
};

const MateListComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 450px;
    margin: 0 auto;
    background-color: white;
    border-radius: 15px;
`;

const Title = styled.h2``;

const MateListItems = styled.div`
    width: 300px;
    height: 380px;
    overflow-y: auto;
`;

export default MateList;
