import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { IoMdClose } from 'react-icons/io';

import {
    // kakaoAccessTokenState,
    signUpInfo,
} from '../../recoil/AuthState/atoms';

const MateRequest: React.FC = () => {
    const [activeBtn, setActiveBtn] = useState<number | null>(null);
    const [isRejected, setIsRejected] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const { nickname, profilePicture, exerciseChoice, gender, introduction } =
        useRecoilValue(signUpInfo);
    // const userTypeKakao = useRecoilValue(kakaoAccessTokenState);

    const handleBtnClick = (index: number) => {
        setActiveBtn(index);
    };

    const handleRejectBtnClick = () => {
        // 거절 버튼을 누르면 알림을 표시하고 창을 닫음
        window.alert('요청을 거절하였습니다.');
        setIsClosed(true);
    };

    const handleAcceptBtnClick = () => {
        // 수락 버튼을 누르면 요청을 보내고 창을 닫음
        // axios
        //     .put(`/matching/accept?senderId={senderId}`, null, {
        //         headers: { token: userToken }, // userToken을 적절한 값으로 설정해야 합니다
        //     })
        //     .then((response) => {
        window.alert('요청을 수락하였습니다.');
        setIsClosed(true); // axios 요청이 성공하면 창을 닫음
        // })
        // .catch((error) => {
        //     window.alert('에러가 발생하였습니다.');
        //     console.error('Error accepting request:', error);
        // });
    };

    const handleCloseBtn = () => {
        setIsClosed(true);
    };

    if (exerciseChoice.length === 0 || isClosed) {
        return null; // 빈 배열이거나 창이 닫힌 경우 아무것도 출력하지 않음
    }

    return (
        <>
            {!isRejected && ( // isRejected 상태가 false인 경우에만 MateRequestContainer를 렌더링
                <MateRequestWrapper>
                    <MateRequestContainer>
                        <MateRequestTitle>
                            <MateRequestImg>
                                <img src={profilePicture} alt="프로필이미지" />
                            </MateRequestImg>
                            <MateRequestName>{nickname}</MateRequestName>
                            <CloseBtn onClick={() => handleCloseBtn()}>
                                <IoMdClose />
                            </CloseBtn>
                        </MateRequestTitle>
                        <MateRequestContent>
                            <UserGenderInfo>
                                <RequestContentTitle>성별 </RequestContentTitle>
                                <RequestGender>&nbsp;{gender ? '남자' : '여자'}</RequestGender>
                            </UserGenderInfo>
                            <UserIntroduction>
                                <RequestContentTitle>자기소개</RequestContentTitle>
                                <RequestIntroduction
                                    contentEditable={false}
                                    dangerouslySetInnerHTML={{ __html: introduction }}
                                />
                            </UserIntroduction>
                            <UserExercise>
                                <RequestContentTitle>주로 하는 운동</RequestContentTitle>
                                <RequestExercise>
                                    {exerciseChoice.includes('RUNNING') && (
                                        <ExerciseContent className="running">러닝</ExerciseContent>
                                    )}
                                    {exerciseChoice.includes('HIKING') && (
                                        <ExerciseContent className="hiking">등산</ExerciseContent>
                                    )}
                                    {exerciseChoice.includes('WEIGHT') && (
                                        <ExerciseContent className="weight">헬스</ExerciseContent>
                                    )}
                                </RequestExercise>
                            </UserExercise>
                        </MateRequestContent>
                        <RequestBtnArea>
                            <RequestBtn
                                active={activeBtn === 0}
                                onClick={() => {
                                    handleBtnClick(0);
                                    handleAcceptBtnClick();
                                }}
                            >
                                수락
                            </RequestBtn>
                            <RequestBtn
                                active={activeBtn === 1}
                                onClick={() => {
                                    handleBtnClick(1);
                                    handleRejectBtnClick();
                                }}
                            >
                                거절
                            </RequestBtn>
                        </RequestBtnArea>
                    </MateRequestContainer>
                </MateRequestWrapper>
            )}
        </>
    );
};

const MateRequestWrapper = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 8888;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const MateRequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 350px;
    height: 450px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);

    z-index: 9999;
`;

const MateRequestTitle = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
`;

const MateRequestImg = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    img {
        border-radius: 50%;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
`;

const MateRequestName = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-left: 15px;
`;

const CloseBtn = styled.div`
    top: 10px;
    right: 10px;
    position: fixed;
    cursor: pointer;
`;

const MateRequestContent = styled.div`
    flex: 1;
    border-top: 1px solid #d7d7d7;
    padding: 15px 30px;
`;

const RequestContentTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const UserGenderInfo = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
`;

const RequestGender = styled.div`
    // font-size: 18px;
`;

const UserIntroduction = styled.div`
    margin-bottom: 15px;
`;

const RequestIntroduction = styled.div`
    width: 100%;
    font-size: 14px;
    height: 100px;
    overflow: auto;
    outline: none;
`;

const UserExercise = styled.div`
    margin-bottom: 15px;
`;

const RequestExercise = styled.div`
    display: flex;
    align-items: center;
`;

const ExerciseContent = styled.div`
    width: 60px;
    height: 30px;
    margin: 2px 5px;
    padding: 5px;
    background-color: #e6a87f;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    border-radius: 20px;

    &.running {
        background-color: #e6a87f;
    }
    &.hiking {
        background-color: #55acee;
    }
    &.weight {
        background-color: #29cc7a;
    }
`;

const RequestBtnArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RequestBtn = styled.button<{ active: boolean }>`
    margin: 25px;
    padding: 2px;
    width: 70px;
    height: 30px;
    background-color: ${({ active }) => (active ? 'darkgray' : 'white')};
    color: black;
    border: 0.5px solid white;
    border-radius: 100px;
    font-weight: bold;
    outline: none;
    cursor: pointer;

    &:hover {
        padding: 2px;
        border: 0.5px solid darkgray;
        background-color: darkgray;
        color: white;
        height: 30px;
    }
`;

export default MateRequest;
