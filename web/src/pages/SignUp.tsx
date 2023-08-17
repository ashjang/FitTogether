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
    margin-top: 250px;
    min-height: calc(100vh - 200px);
`;

export default SignUp;
