import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import KakaoTalk_logo from '../../assets/KakaoTalk_logo.png';
import { loggedInState, signInState } from '../../recoil/AuthState/atoms';

// interface Props {}

const SignInSetting: React.FC = () => {
    // const [nickname, setnickName] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const [token, setToken] = useState<string>('');
    const navigate = useNavigate();
    const [signInData, setSignInData] = useRecoilState(signInState);
    const setToken = useSetRecoilState(loggedInState);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const KAKAO_REST_API_KEY = `${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
    const REDIRECT_URI = `${import.meta.env.VITE_APP_REDIRECT_URI}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL;
    };

    // const handleSignIn = async (event: React.FormEvent) => {
    //     event.preventDefault();

    //     const formData = {
    //         nickname: nickname,
    //         password: password,
    //     };

    //     try {
    //         const response = await axios.post<{ token: string }>('/users/signin', formData);

    //         if (response.status === 200) {
    //             setToken(response.data.token);
    //             localStorage.setItem('token', token);
    //             // 로그인 성공 처리
    //         } else {
    //             // 로그인 실패 처리
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();

        // try {
        //     const response = await axios.post<{ token: string }>('/users/signin', signInData);

        //     if (response.status === 200) {
        //         const token = response.data.token;
        //         setToken(token);
        //         localStorage.setItem('token', token);

        //         // 로그인 성공 처리: 메인페이지로 이동
        //         navigate('/');
        //     } else {
        //         // 로그인 실패 처리
        //         if (response.status === 401) {
        //             // 인증 실패 (예: 아이디 또는 비밀번호 불일치)
        //             console.log('로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.');
        //         } else {
        //             // 기타 다른 실패 상황 처리
        //             console.log('로그인 실패: 서버 응답에 문제가 발생했습니다.');
        //         }
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        try {
            // 서버 대신에 users.json에서 대조하는 로직
            const response = await axios.get('/users.json');
            const users = response.data.users; // users.json 파일에서 users 배열만 가져오도록 수정

            const user = users.find(
                (u: any) => u.nickname === signInData.nickname && u.password === signInData.password
            );

            if (user) {
                const token = signInData.nickname; // 임시 토큰: 닉네임 사용
                setToken(token);
                localStorage.setItem('token', token);

                // 로그인 성공 처리: 메인페이지로 이동
                navigate('/');
            } else {
                // 로그인 실패 처리
                if (!users.some((u: any) => u.nickname === signInData.nickname)) {
                    setErrorMessage('아이디가 존재하지 않습니다.');
                } else {
                    setErrorMessage('비밀번호가 일치하지 않습니다.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Page>
            <Container>
                <KakaoTalkSignIn onClick={handleKakaoLogin}>
                    <img src={KakaoTalk_logo} alt="KakaoTalk Logo" />
                    카카오톡 로그인
                </KakaoTalkSignIn>
                <Divider>또는</Divider>
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
                            value={signInData.password}
                            onChange={(e) =>
                                setSignInData({ ...signInData, password: e.target.value })
                            }
                            placeholder="비밀번호를 입력하세요"
                        />
                    </InputField>
                    <SignInButton type="submit">로그인</SignInButton>
                </FormContainer>
            </Container>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}{' '}
            {/* 추가: 에러 메시지 표시 */}
        </Page>
    );
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // min-height는 삭제 예정
    // min-height: calc(100vh - 300px);
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 300px;
`;

const KakaoTalkSignIn = styled.button`
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

const SignInButton = styled.button`
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

const ErrorMessage = styled.div`
    color: #007bff;
    font-weight: bold;
    font-size: 14px;
`;

export default SignInSetting;
