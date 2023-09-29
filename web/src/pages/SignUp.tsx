import React from 'react';
import SignUpSetting from '../components/Sign/SignUpSetting';
import styled from '@emotion/styled';

const SignUp: React.FC = () => {
    return (
        <Container>
            <SignUpSetting />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 225px);
    margin-top: 175px;
    overflow: hidden;
`;

export default SignUp;
