import React from 'react';
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

const data: MateData = {
    mate1: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'fittogether',
    },
    mate2: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'ehhdrud',
    },
    mate3: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'emfkdlvnem',
    },
    mate4: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'seonhyo',
    },
    mate5: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'ashjang',
    },
    mate6: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'hg051510',
    },
    mate7: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: '2gigeum',
    },
    mate8: {
        senderProfileImage: imageSrc, // 실제로는 "URL 또는 파일 경로"
        senderNickname: 'woojkk',
    },
};

const MateList: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="MateList Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: '50',
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
                    {Object.entries(data).map(([key, mate]) => (
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
