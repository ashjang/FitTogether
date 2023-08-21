/** @jsxImportSour/ce @emotion/react */

import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import SignInSetting from '../components/Sign/SignInSetting';
import KakaoSignIn from '../components/Sign/KakaoSignIn';

const SignIn: React.FC = () => {
    return (
        <Container>
            <KakaoSignIn />
            <Divider>또는</Divider>
            <SignInSetting />
            <GuideBox>
                <p>아직 회원이 아니신가요?</p>
                <Link to="/signup">
                    <GuideBtn>가입하러 가기</GuideBtn>
                </Link>
            </GuideBox>
            <GuideBox>
                <p>ID/비밀번호를 잊으셨나요?</p>
                <GuideBtn>
                    <Link to="/finduserid">
                        <p>ID 찾기 /</p>
                    </Link>
                    <Link to="/finduserpassword">
                        <p>&nbsp;비밀번호 찾기</p>
                    </Link>
                </GuideBtn>
            </GuideBox>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 150px);
    margin-top: 150px;
`;

const Divider = styled.p`
    font-size: 16px;
    color: #888;
    margin: 20px 0px;
`;

const GuideBox = styled.div`
    width: 300px;
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: bold;
    color: #007bff;
`;

const GuideBtn = styled.div`
    display: flex;
    // flex-direction: column;
    align-items: center;
    color: black;
    // font-weight: normal;
    font-size: 1.1rem;
    cursor: pointer;
`;

export default SignIn;
