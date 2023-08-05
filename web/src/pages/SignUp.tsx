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
    margin-top: 120px;
`;

export default SignUp;
