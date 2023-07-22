import React, { useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import KakaoTalk_logo from "./KakaoTalk_logo.png";

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  // min-height는 삭제 예정
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
  width: 300px;
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

const LogInButton = styled.button`
  width: 300px;
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post<{ token: string }>(
        "/users/signin",
        formData
      );

      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", token);
        // 로그인 성공 처리
      } else {
        // 로그인 실패 처리
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Page>
      <Container>
        <KakaoTalkLogIn>
          <img src={KakaoTalk_logo} alt="KakaoTalk Logo" />
          카카오톡 로그인
        </KakaoTalkLogIn>
        <Divider>또는</Divider>
        <FormContainer onSubmit={handleLogIn}>
          <InputField>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력하세요"
            />
          </InputField>
          <InputField>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </InputField>
          <LogInButton type="submit">로그인</LogInButton>
        </FormContainer>
      </Container>
    </Page>
  );
};

export default LogIn;
