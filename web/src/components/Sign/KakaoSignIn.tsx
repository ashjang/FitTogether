import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { kakaoAccessTokenState } from '../../recoil/AuthState/atoms';
import KakaoTalk_logo from '../../assets/KakaoTalk_logo.png';

const KakaoSignIn: React.FC = () => {
    const setKakaoAccessToken = useSetRecoilState<string | undefined | null>(kakaoAccessTokenState);

    const KAKAO_REST_API_KEY = `${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
    const REDIRECT_URI = `${import.meta.env.VITE_APP_REDIRECT_URI}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL;
    };

    const code = new URL(window.location.href).searchParams.get('code');

    useEffect(() => {
        if (code) {
            console.log('kakaoAccessToken', code);
            localStorage.setItem('kakaoAccessToken', code);
            setKakaoAccessToken(code); //kakaoAccessTokenState 값을 업데이트
            // window.location.reload();
        }
    }, []);

    // const getKakaoAccessToken = async (code: string) => {
    //     try {
    //         const response = await fetch('https://kauth.kakao.com/oauth/token', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //             },
    //             body: new URLSearchParams({
    //                 grant_type: 'authorization_code',
    //                 client_id: KAKAO_REST_API_KEY,
    //                 redirect_uri: REDIRECT_URI,
    //                 code: code,
    //             }).toString(),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setKakaoAccessToken(data.access_token);
    //             localStorage.setItem('kakaoAccessToken', data.access_token);
    //         } else {
    //             console.error('Failed to obtain Kakao access token');
    //             alert('카카오 액세스 토큰을 얻는 데 실패했습니다.');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // useEffect(() => {
    //     const url = new URL(window.location.href);
    //     const code = url.searchParams.get('code');

    //     if (code) {
    //         getKakaoAccessToken(code);
    //     }
    // }, []);

    //  useEffect(() => {
    //      console.log(process.env.REACT_APP_URL);
    //      axios.post().then((r) => {
    //          console.log(r.data);

    //          // 토큰을 받아서 localStorage에 저장하는 코드
    //          localStorage.setItem('name', r.data.user_name);

    //          navigate('/loginSuccess');
    //      });
    //  }, []);

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
