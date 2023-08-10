import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import styled from '@emotion/styled';

import { kakaoAccessTokenState } from '../../recoil/AuthState/atoms';

const KakaoAuth: React.FC = () => {
    const setKakaoAccessToken = useSetRecoilState<string | undefined | null>(kakaoAccessTokenState);
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // 카카오 로그인 성공 시에만 실행
        if (code) {
            const KAKAO_REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;
            const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

            // AccessToken 요청
            fetch('https://kauth.kakao.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                body: queryString.stringify({
                    grant_type: 'authorization_code',
                    client_id: KAKAO_REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code: code,
                    // client_secret: CLIENT_SECRET,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setKakaoAccessToken(data.access_token);
                    localStorage.setItem('token_for_kakaotalk', data.access_token);
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                    setError('카카오 로그인 중 오류가 발생했습니다.');
                });
        }
    }, [setKakaoAccessToken, navigate]);

    if (error) {
        return (
            <MessageContainer>
                <LodingMessage>{error}</LodingMessage>
            </MessageContainer>
        );
    }

    return (
        <MessageContainer>
            <LodingMessage>카카오 계정으로 로그인 중...</LodingMessage>
        </MessageContainer>
    );
};

const MessageContainer = styled.div`
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LodingMessage = styled.p`
    color: #007bff;
    font-weight: bold;
    font-size: 20px;
`;

export default KakaoAuth;
