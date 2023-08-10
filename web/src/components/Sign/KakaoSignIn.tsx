import React from 'react';

import styled from '@emotion/styled';
import KakaoTalk_logo from '../../assets/KakaoTalk_logo.png';

const KakaoSignIn: React.FC = () => {
    const KAKAO_REST_API_KEY = `${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
    const REDIRECT_URI = `${import.meta.env.VITE_APP_REDIRECT_URI}`;
    const kakaoURL =
        // `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`; // 로그인할때마다 계정 입력
        `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`; // 기존에 로그인된 카카오 계정으로 진행

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <div>
            <KakaoTalkSignIn onClick={handleKakaoLogin}>
                <img src={KakaoTalk_logo} alt="KakaoTalk Logo" />
                카카오톡 로그인
            </KakaoTalkSignIn>
        </div>
    );
};

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

export default KakaoSignIn;
