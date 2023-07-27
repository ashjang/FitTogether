/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const MyInformation: React.FC = () => {
  const handleSaveClick = () => {
    alert('저장되었습니다.');
  };

  const uploadProfileImage = () => {
    alert('이미지 업로드');
  };

  const duplicationCheck = () => {
    alert('중복검사');
  };

  const [inputIdValue, setInputIdValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const regex = /^[A-Za-z0-9]*$/;

    if (regex.test(value) && value.length <= 10) {
      setInputIdValue(value);
    }
  };

  return (
    <div>
      <InputContainer>
        <label css={labelStyle}>아이디(닉네임)</label>
        <input
          type="text"
          name="username"
          css={inputStyles}
          value={inputIdValue}
          onChange={handleInputChange}
          placeholder="영문 대소문자/숫자중 최대 10자"
        />
        <button onClick={duplicationCheck} css={inputButton}>
          중복검사
        </button>
      </InputContainer>
      <InputContainer>
        <label css={labelStyle}>비밀번호</label>
        <input
          type="password"
          name="password"
          css={inputStyles}
          placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8~16자"
        />
      </InputContainer>
      <InputContainer>
        <label css={labelStyle}>비밀번호 확인</label>
        <input
          type="password"
          name="password"
          css={inputStyles}
          placeholder="다시 한번 입력하세요"
        />
      </InputContainer>
      <InputContainer>
        <label css={labelStyle}>이메일</label>
        <input
          type="email"
          name="email"
          css={inputStyles}
          value={'qwerty1234@gmail.com'}
          readOnly
        />
      </InputContainer>
      <InputContainer>
        <label css={labelStyle}>프로필 이미지</label>
        <input
          type="button"
          name="image"
          onClick={uploadProfileImage}
          css={inputButton}
          value="설정"
        />
      </InputContainer>
      <div css={containerStyles}>
        <p css={labelStyle}>성별</p>
        <label css={radioButtonStyles}>
          <input type="radio" name="gender" value="남성" />
          남성
        </label>
        <label css={radioButtonStyles}>
          <input type="radio" name="gender" value="여성" />
          여성
        </label>
      </div>
      <div css={containerStyles}>
        <p css={labelStyle}>주로 하는 운동</p>
        <label css={radioButtonStyles}>
          <input type="checkbox" name="favorite" value="러닝" />
          러닝
        </label>
        <label css={radioButtonStyles}>
          <input type="checkbox" name="favorite" value="등산" />
          등산
        </label>
        <label>
          <input type="checkbox" name="favorite" value="헬스" />
          헬스
        </label>
      </div>
      <InputContainer>
        <p css={labelStyle}>자기소개</p>
        <input
          type="text"
          css={inputStyles}
          placeholder="최대 100자까지 입력 가능"
          maxLength={100}
        />
      </InputContainer>
      <div css={containerStyles}>
        <p css={labelStyle}>공개 여부 </p>
        <label css={radioButtonStyles}>
          <input type="radio" name="publicStatus" value="공개" />
          공개
        </label>
        <label css={radioButtonStyles}>
          <input type="radio" name="publicStatus" value="비공개" />
          비공개
        </label>
      </div>
      <div css={formArea}>
        <input
          type="button"
          name="save"
          onClick={handleSaveClick}
          css={inputButton}
          value="저장"
        />
      </div>
    </div>
  );
};

const labelStyle = css`
  font-weight: bold;
  width: 108px;
  margin-right: 10px;
`;

const inputStyles = css`
  margin-left: 50px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 350px;
`;

const inputButton = css`
  border: 1px solid black;
  background-color: white;
  text-align: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
  cursor: pointer;
  margin-left: 50px;
`;

const formArea = css`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
`;

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const radioButtonStyles = css`
  margin-right: 70px;
`;

export default MyInformation;
