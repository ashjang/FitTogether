import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import KakaoSignIn from '../components/Sign/KakaoSignIn';

const SignIn: React.FC = () => {
    return (
        <Container>
            <KakaoSignIn />
            <Divider>또는</Divider>
            <SignInSetting />
        </Container>
    );
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;

const Container = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Divider = styled.p`
    font-size: 16px;
    color: #888;
    margin: 20px 0px;
`;

export default SignIn;
