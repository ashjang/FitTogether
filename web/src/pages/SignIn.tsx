import React from 'react';
import SignInSetting from '../components/Sign/SignInSetting';
import styled from '@emotion/styled';

const SignIn: React.FC = () => {
    return (
        <Container>
            <SignInSetting />
        </Container>
    );
};

const Container = styled.div`
    margin-top: 120px;
`;

export default SignIn;
