import React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

interface User {
    userId: number;
    nickname: string;
    gender: boolean;
    introduction: string;
    exerciseChoice: string[];
    latitude: number;
    longitude: number;
}

const UserProfile: React.FC<{ selectedUser: User | null }> = (props) => {
    const token = sessionStorage.getItem('token');

    const postMateRequest = async () => {
        try {
            const response = await axios.post(
                `/api/matching/request?receiverNickname=${props.selectedUser?.nickname}`,
                {},
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            );
            console.log(response.data);
            alert('운동 메이트 신청 완료 !');
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('이미 요청한 사용자입니다.');
            }
            console.error(error);
        }
    };
    return (
        <UserProfileComponent>
            <UserNickname> {props.selectedUser?.nickname}</UserNickname>
            <InfoContainer>
                <UserGenderContainer>
                    <UserGender>성별</UserGender>
                    <UserGenderItem>
                        {props.selectedUser?.gender === true ? '남성' : '여성'}
                    </UserGenderItem>
                </UserGenderContainer>
                <UserIntroductionContainer>
                    <UserIntroduction>소개</UserIntroduction>
                    <UserIntroductionItem>
                        {props.selectedUser?.introduction
                            ? props.selectedUser?.introduction
                            : '소개글이 없습니다.'}
                    </UserIntroductionItem>
                </UserIntroductionContainer>
                <UserExerciseChoiceContainer>
                    <UserExerciseChoice>좋아하는 운동</UserExerciseChoice>
                    <UserExerciseChoiceItem>
                        <ExerciseChoiceBox
                            isActive={props.selectedUser?.exerciseChoice.includes('RUNNING')}
                        >
                            러닝
                        </ExerciseChoiceBox>
                        <ExerciseChoiceBox
                            isActive={props.selectedUser?.exerciseChoice.includes('HIKING')}
                        >
                            등산
                        </ExerciseChoiceBox>
                        <ExerciseChoiceBox
                            isActive={props.selectedUser?.exerciseChoice.includes('WEIGHT')}
                        >
                            헬스
                        </ExerciseChoiceBox>
                    </UserExerciseChoiceItem>
                </UserExerciseChoiceContainer>
            </InfoContainer>
            <RequestBtn onClick={postMateRequest}>운동 같이 하실래요?</RequestBtn>
        </UserProfileComponent>
    );
};

const UserProfileComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 200px;
    height: 300px;
    background-color: white;
    border: 2px solid #444;
    border-radius: 30px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
`;

const UserNickname = styled.h2``;

const InfoContainer = styled.div`
    height: 220px;
`;

const UserGenderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;

const UserGender = styled.p`
    color: #aaaaaa;
`;

const UserGenderItem = styled.p`
    font-size: 13px;
`;

const UserIntroductionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
`;

const UserIntroduction = styled.p`
    color: #aaaaaa;
`;

const UserIntroductionItem = styled.p`
    font-size: 13px;
`;

const UserExerciseChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UserExerciseChoice = styled.p`
    color: #aaaaaa;
`;

const UserExerciseChoiceItem = styled.p`
    display: flex;
`;

const RequestBtn = styled.button`
    position: relative;
    bottom: 10px;
    padding: 0px 10px;
    font-size: 14px;
    font-weight: bold;
    border-style: none;
    border-radius: 10px;
    border: 2px solid #666;
    &:hover {
        background-color: #ffffe7;
    }
`;

const ExerciseChoiceBox = styled.div<{ isActive?: boolean }>`
    padding: 0px 5px;
    margin: 3px;
    background-color: ${(props) => (props.isActive ? '#ffffd7' : '#d7d7d7')};
    border: 1px solid #a6a6a6;
    border-radius: 10px;
    font-size: 13px;
    font-weight: ${(props) => (props.isActive ? 'bold' : 'regular')};
    color: #555;
    cursor: pointer;
`;

export default UserProfile;
