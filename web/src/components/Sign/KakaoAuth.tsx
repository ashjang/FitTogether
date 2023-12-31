/* eslint-disable @typescript-eslint/no-unsafe-assignment, 
@typescript-eslint/no-unsafe-argument,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-misused-promises,
@typescript-eslint/no-unused-vars,
@typescript-eslint/restrict-template-expressions,
@typescript-eslint/no-floating-promises */

import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from '@emotion/styled';

import { canEditInfo, loggedInState } from '../../recoil/AuthState/atoms';

const KakaoAuth: React.FC = () => {
    const setCanEditUserInfo = useSetRecoilState(canEditInfo);
    const setLoggedIn = useSetRecoilState(loggedInState);
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    useEffect(() => {
        const kakaoLogin = async () => {
            const code = new URL(window.location.href).searchParams.get('code');
            try {
                console.log(code);
                const response = await axios.get(`/api/users/signin/kakao?code=${code}`);
                const kakaoToken = response.data;
                sessionStorage.setItem('token', kakaoToken);

                // 토큰이 발급되면 로그인 상태로 변경
                setLoggedIn(true);
                setCanEditUserInfo(false);
                // navigate('/');
                window.location.replace('/');
            } catch (error) {
                console.error(error);
                setError('서버 토큰 발급 중 오류가 발생했습니다.');
            }
        };

        kakaoLogin();
    }, [setLoggedIn, setCanEditUserInfo, navigate]);

    if (error) {
        return (
            <MessageContainer>
                <LoadingMessage>{error}</LoadingMessage>
            </MessageContainer>
        );
    }

    return (
        <MessageContainer>
            <LoadingMessage>카카오 계정으로 로그인 중...</LoadingMessage>
        </MessageContainer>
    );
};

const MessageContainer = styled.div`
    margin-top: 150px;
    width: 100%;
    // height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoadingMessage = styled.p`
    color: #007bff;
    font-weight: bold;
    font-size: 18px;
`;

export default KakaoAuth;
