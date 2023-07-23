/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
      <div>
        <label css={labelFontStyle}>아이디(닉네임)</label>
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
      </div>
      <div>
        <label css={labelFontStyle}>비밀번호</label>
        <input
          type="password"
          name="password"
          css={inputStyles}
          placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8~16자"
        />
        <br />
        <input
          type="password"
          name="password"
          css={inputStyles}
          placeholder="다시 한번 입력하세요"
        />
      </div>
      <p css={labelFontStyle}>이메일</p>
      <div>
        <span css={labelFontStyle}>프로필 이미지</span>
        <button type="button" onClick={uploadProfileImage} css={inputButton}>
          설정
        </button>
      </div>
      <div css={containerStyles}>
        <p css={[labelStyles, labelFontStyle]}>성별</p>
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
        <p css={[labelStyles, labelFontStyle]}>주로 하는 운동</p>
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
      <div>
        <p css={labelFontStyle}>자기소개</p>
        <input type="text" css={inputStyles}></input>
      </div>
      <div css={containerStyles}>
        <p css={[labelStyles, labelFontStyle]}>공개 여부 </p>
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
        <button type="button" onClick={handleSaveClick} css={saveButton}>
          저장
        </button>
      </div>
    </div>
  );
};

const labelFontStyle = css`
  font-weight: bold;
`;

const inputStyles = css`
  margin-left: 50px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  width: 300px;
`;

const inputButton = css`
  border: 1px solid black;
  background-color: white;
  text-align: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
  cursor: pointer;
`;

const formArea = css`
  display: flex;
  flex-direction: row-reverse;
`;

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const labelStyles = css`
  margin-right: 10px;
`;

const radioButtonStyles = css`
  margin-right: 70px;
`;

const saveButton = css`
  border: 1px solid black;
  background-color: white;
  text-align: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
  cursor: pointer;
`;

export default MyInformation;
