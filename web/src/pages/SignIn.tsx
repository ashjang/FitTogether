import React from 'react';
import SignInSetting from '../components/Sign/SignInSetting';
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
