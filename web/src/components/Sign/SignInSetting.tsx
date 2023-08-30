import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { loggedInState, canEditInfo, signInInfo } from '../../recoil/AuthState/atoms';

const SignInSetting: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [signInData, setSignInData] = useRecoilState(signInInfo); // 값을 받아와서 변경하고 싶으면 useRecoilState
    const setLoggedIn = useSetRecoilState(loggedInState); // 값을 변경하고 싶으면 useSetRecoilState
    const setCanEditInfo = useSetRecoilState(canEditInfo);
    // const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.redirectedFrom || '/';

    const [passwordForRequest, setPasswordForRequest] = useState<string>('');

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const signInRequestData = {
                nickname: signInData.nickname,
                password: passwordForRequest,
            };

            const response = await axios.post('/api/users/signin', signInRequestData);

            if (response.status === 200) {
                const token = response.data;
                setLoggedIn(true);
                setCanEditInfo(true);
                // window.location.reload();
                sessionStorage.setItem('token', token);
                // navigate(from);
                window.location.replace(from);
            } else if (response.status === 400) {
                // 에러 메시지 출력
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message;
                setErrorMessage(errorMessage); // 에러 메시지를 상태로 설정하여 화면에 표시
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Page>
            <Container>
                <FormContainer onSubmit={handleSignIn}>
                    <InputField>
                        <input
                            type="text"
                            value={signInData.nickname}
                            onChange={(e) =>
                                setSignInData({ ...signInData, nickname: e.target.value })
                            }
                            placeholder="아이디(닉네임)를 입력하세요"
                        />
                    </InputField>
                    <InputField>
                        <input
                            type="password"
                            value={passwordForRequest}
                            onChange={(e) => setPasswordForRequest(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </InputField>
                    <SignInButton type="submit">로그인</SignInButton>
                </FormContainer>
            </Container>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    // height: 300px;
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

const SignInButton = styled.button`
    width: 300px;
    margin-bottom: 20px;
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

const ErrorMessage = styled.div`
    color: #007bff;
    font-weight: bold;
    font-size: 14px;
`;

export default SignInSetting;
