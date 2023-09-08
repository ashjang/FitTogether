/* eslint-disable @typescript-eslint/no-unsafe-assignment, 
@typescript-eslint/no-unsafe-argument,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-misused-promises,
@typescript-eslint/no-unused-vars,
react-hooks/exhaustive-deps,
@typescript-eslint/no-unsafe-call */

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import styled from '@emotion/styled';

interface MateRequestProps {
    sender: string;
    onClose: () => void;
}

const MateRequest: React.FC<MateRequestProps> = ({ sender, onClose }) => {
    const [activeBtn, setActiveBtn] = useState<number | null>(null);
    const [isRejected, setIsRejected] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const senderNickname = sender;

    const token = sessionStorage.getItem('token');
    const mateRequestRef = useRef(null);

    // 팝업 외부 영역 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mateRequestRef.current && !mateRequestRef.current.contains(event.target as Node)) {
                setIsClosed(true); // 팝업이 열려 있을 때 외부 영역 클릭 시 팝업 닫기
                setIsRejected(false); // 팝업 닫을 때 거절 상태 초기화
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleBtnClick = (index: number) => {
        setActiveBtn(index);
    };

    const handleRejectBtnClick = () => {
        // 거절 버튼을 누르면 알림을 표시하고 창을 닫음
        window.alert('요청을 거절하였습니다.');
        setIsClosed(true);
        onClose();
    };

    const handleAcceptBtnClick = () => {
        // 수락 버튼을 누르면 요청을 보내고 창을 닫음
        axios
            .put(`/api/matching/accept?senderNickname=${senderNickname}`, null, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
            .then((response) => {
                window.alert('요청을 수락하였습니다.');
                setIsClosed(true); // axios 요청이 성공하면 창을 닫음
            })
            .catch((error) => {
                window.alert('에러가 발생하였습니다.');
                console.error(error);
            });
        onClose();
    };

    return (
        <>
            {!isRejected && ( // isRejected 상태가 false인 경우에만 MateRequestContainer를 렌더링
                <MateRequestWrapper>
                    <MateRequestContainer ref={mateRequestRef}>
                        <MateRequestTitle>
                            <MateRequestName>
                                {senderNickname}님이 운동메이트를 신청하였습니다.
                            </MateRequestName>
                        </MateRequestTitle>
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

    width: 450px;
    height: 150px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);

    z-index: 9999;
`;

const MateRequestTitle = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

// const MateRequestImg = styled.div`
//     width: 45px;
//     height: 45px;
//     border-radius: 50%;
//     margin: 0 10px;
//     img {
//         border-radius: 50%;
//         // max-width: 100%;
//         max-height: 100%;
//         object-fit: contain;
//     }
// `;

const MateRequestName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

// const CloseBtn = styled.div`
//     top: 10px;
//     right: 10px;
//     position: fixed;
//     cursor: pointer;
// `;

// const MateRequestContent = styled.div`
//     flex: 1;
//     border-top: 1px solid #d7d7d7;
//     padding: 15px 30px;
// `;

// const RequestContentTitle = styled.div`
//     font-size: 18px;
//     font-weight: bold;
//     margin-bottom: 5px;
// `;

// const UserGenderInfo = styled.div`
//     display: flex;
//     align-items: flex-start;
//     margin-bottom: 15px;
// `;

// const RequestGender = styled.div`
//     // font-size: 18px;
// `;

// const UserIntroduction = styled.div`
//     margin-bottom: 15px;
// `;

// const RequestIntroduction = styled.div`
//     width: 100%;
//     font-size: 14px;
//     height: 100px;
//     overflow: auto;
//     outline: none;
// `;

// const UserExercise = styled.div`
//     margin-bottom: 15px;
// `;

// const RequestExercise = styled.div`
//     display: flex;
//     align-items: center;
// `;

// const ExerciseContent = styled.div`
//     width: 60px;
//     height: 30px;
//     margin: 2px 5px;
//     padding: 5px;
//     background-color: #e6a87f;
//     font-size: 14px;
//     font-weight: bold;
//     text-align: center;
//     border-radius: 20px;

//     &.running {
//         background-color: #e6a87f;
//     }
//     &.hiking {
//         background-color: #55acee;
//     }
//     &.weight {
//         background-color: #29cc7a;
//     }
// `;

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
