import React, { useState } from 'react';
import styled from '@emotion/styled';

const MateRequest: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [isRejected, setIsRejected] = useState(false);

  const [introduction, setIntroduction] = useState<string>(
    '안녕하세요. 헬스를 좋아하는 30대 입니다.😊'
  );

  const handleBtnClick = (index: number) => {
    setActiveBtn(index);
  };

  const handleRejectBtnClick = () => {
    setIsRejected(true); // 거절 버튼을 누르면 isRejected 상태를 true로 설정
  };

  const handleIntroductionChange = (
    event: React.ChangeEvent<HTMLDivElement>
  ) => {
    const value = event.target.textContent || '';
    if (value.length <= 100) {
      setIntroduction(value);
    }
  };

  return (
    <>
      {!isRejected && ( // isRejected 상태가 false인 경우에만 MateRequestContainer를 렌더링
        <MateRequestWrapper>
          <MateRequestContainer>
            <MateRequestTitle>
              <MateRequestImg>
                <img src="http://placehold.it/35x35" alt="프로필이미지" />
              </MateRequestImg>
              <MateRequestName>운동할수있을까</MateRequestName>
            </MateRequestTitle>
            <MateRequestContent>
              <UserGenderInfo>
                <RequestContentTitle>성별 :</RequestContentTitle>
                <RequestGender>&nbsp;남자</RequestGender>
              </UserGenderInfo>
              <UserIntroduction>
                <RequestContentTitle>자기소개</RequestContentTitle>
                <RequestIntroduction
                  contentEditable={true}
                  onInput={handleIntroductionChange}
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              </UserIntroduction>
              <UserExercise>
                <RequestContentTitle>주로 하는 운동</RequestContentTitle>
                <RequestExercise>
                  <ExercixeContent className="running">러닝</ExercixeContent>
                  <ExercixeContent className="hiking">등산</ExercixeContent>
                  <ExercixeContent className="fitness">헬스</ExercixeContent>
                </RequestExercise>
              </UserExercise>
            </MateRequestContent>
            <RequestBtnArea>
              <RequestBtn
                active={activeBtn === 0}
                onClick={() => handleBtnClick(0)}
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
  }
`;

const MateRequestName = styled.div`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const MateRequestContent = styled.div`
  flex: 1;
  border-top: 1px solid #d7d7d7;
  padding: 15px 30px;
`;

const RequestContentTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UserGenderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const RequestGender = styled.div`
  font-size: 18px;
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

const ExercixeContent = styled.div`
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
  &.fitness {
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
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: 0.5px solid white;
  border-radius: 100px;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  &:hover {
    padding: 2px;
    border: 0.5px solid darkgray;
    height: 30px;
  }
`;

export default MateRequest;
