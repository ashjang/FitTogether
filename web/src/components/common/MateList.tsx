import axios from 'axios';
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
    nickname: string;
}
interface MateData {
    [key: string]: MateDateItem;
}
interface UserProfile {
    username: string;
    profileImage: string | null;
}

interface ApiResponse {
    data: User[];
}
interface User {
    id: number;
    nickname: string;
}

// interface UsersProfileData {
//     usersInfo: UserProfile[];
// }

const MateList: React.FC<Props> = ({ isOpen, onClose }) => {
    const [mateData, setMateData] = useState<MateData>({});

    // useEffect(() => {
    //     fetch('/data/usersProfile.json')
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }
    //             return response.json();
    //         })
    //         .then((data: UsersProfileData) => {
    //             const mateData: MateData = {};
    //             data.usersInfo.forEach((user) => {
    //                 mateData[user.username] = {
    //                     senderProfileImage: user.profileImage || imageSrc,
    //                     senderNickname: user.username,
    //                 };
    //             });
    //             setMateData(mateData);
    //         })
    //         .catch((error) => {
    //             console.error('An error occurred:', error);
    //         });
    // }, []);

    // useEffect(() => {
    //     if (token) {
    //         getUserData(token)
    //             .then(() => {
    //                 // 데이터를 처리
    //             })
    //             .catch((error) => {
    //                 console.error('데이터를 불러오는 중 오류 발생:', error);
    //                 alert('회원정보를 받아오는데 실패했습니다.');
    //             });
    //     }
    // }, []);

    // const getUserData = async (token: string) => {
    //     try {
    //         const response = await axios.get<ApiResponse>('/api/users/my', {
    //             headers: {
    //                 'X-AUTH-TOKEN': token,
    //             },
    //         });
    //         // setUserData(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         alert('회원정보를 받아오는데 실패했습니다.');
    //     }
    // };

    // const userId = sessionStorage.getItem('userId');

    // useEffect(() => {
    //     if (userId) {
    //         axios
    //             .get(`/api/users?id=${userId}`, {
    //                 headers: {
    //                     'X-AUTH-TOKEN': token,
    //                 },
    //             })
    //             .then((response) => {
    //                 const data: UserProfile[] = response.data.usersInfo;
    //                 const mateData: MateData = {};
    //                 data.forEach((user) => {
    //                     mateData[user.username] = {
    //                         senderProfileImage: user.profileImage || imageSrc,
    //                         senderNickname: user.nickname,
    //                     };
    //                 });
    //                 setMateData(mateData);
    //             })
    //             .catch((error) => {
    //                 console.error('An error occurred:', error);
    //             });
    //     }
    // }, [userId]);

    const token: string = sessionStorage.getItem('token') || '';

    useEffect(() => {
        if (token) {
            getUserData(token)
                .then(() => {
                    // 데이터를 처리
                })
                .catch((error) => {
                    console.error('데이터를 불러오는 중 오류 발생:', error);
                    alert('회원정보를 받아오는데 실패했습니다.');
                });
        }
    }, []);

    const getUserData = async (token: string, userId: number) => {
        try {
            const response = await axios.get<ApiResponse>(`/api/users?id=${userId}`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            const data: UserProfile[] = response.data.data.usersInfo; // Corrected data extraction
            const mateData: MateData = {};
            data.forEach((user) => {
                mateData[user.username] = {
                    senderProfileImage: user.profileImage || imageSrc,
                    senderNickname: user.nickname,
                };
            });
            setMateData(mateData);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('회원정보를 받아오는데 실패했습니다.');
        }
    };

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
