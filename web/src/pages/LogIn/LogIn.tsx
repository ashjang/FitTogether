import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import KakaoTalk_logo from "./KakaoTalk_logo.png";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // min-height: calc(100vh - 300px);
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 300px;
`;

const KakaoTalkLogIn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 318px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  background-color: #f9e000;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;

const Divider = styled.p`
  font-size: 16px;
  color: #888;
  margin: 20px 0px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.div`
  margin-bottom: 10px;
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
    font-size: 14px;
  }
`;

const LoginButton = styled.button`
  width: 318px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  ${css`
    &:hover {
      background-color: #0056b3;
    }
  `}
`;

interface Props {}

const LogIn: React.FC<Props> = () => {
  return (
    <Page>
      <Container>
        <KakaoTalkLogIn>
          <img src={KakaoTalk_logo} alt="KakaoTalk Logo" />
          카카오톡 로그인
        </KakaoTalkLogIn>
        <Divider>또는</Divider>
        <FormContainer>
          <InputField>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="이메일 주소를 입력하세요"
            />
          </InputField>
          <InputField>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
            />
          </InputField>
          <LoginButton type="submit">로그인</LoginButton>
        </FormContainer>
      </Container>
    </Page>
  );
};

export default LogIn;
