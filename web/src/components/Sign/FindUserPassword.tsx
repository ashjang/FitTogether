import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const FindUserPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [foundPassword, setFoundPassword] = useState(null);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleFindPassword = () => {
        if (email.trim() === '') {
            alert('이메일을 입력해주세요.');
        } else {
            const url = `/api/users/findPW?email=${encodeURIComponent(email)}`;

            axios
                .put(url)
                .then((response) => {
                    // 서버 응답 처리
                    const foundPassword = response.data;
                    console.log('Found ID:', foundPassword);
                    setFoundPassword(foundPassword);
                })
                .catch((error) => {
                    console.error('Error fetching ID:', error);
                    alert('존재하지 않는 이메일입니다.');
                });
        }
    };

    return (
        <Container>
            <Title>비밀번호 찾기</Title>
            <Form onSubmit={handleFindPassword}>
                <MessageBox>
                    <GuideMessage>가입 시 입력한 이메일을 적어주세요.</GuideMessage>
                </MessageBox>
                <InputTextDiv>
                    <label htmlFor="email">이메일</label>
                    <InputText
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <FindBtn type="submit">비밀번호 찾기</FindBtn>
                </InputTextDiv>
                {foundPassword !== null && (
                    <MessageBox>
                        <GuideMessage>{foundPassword}</GuideMessage>
                    </MessageBox>
                )}
            </Form>
        </Container>
    );
};

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 50px);
`;

const Form = styled.form`
    // width: 510px;
`;

const Title = styled.h1`
    width: 510px;
    margin-bottom: 100px;
    text-align: center;
`;

const MessageBox = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -30px;
    margin-bottom: 14px;
`;

const GuideMessage = styled.div`
    font-size: 1rem;
    color: #007bff;
    margin-left: -80px;
    margin-bottom: -10px;
`;

const InputTextDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
`;

const InputText = styled.input`
    width: 350px;
    height: 40px;
    border: 0;
    border-radius: 10px;
    outline: none;
    margin-left: 50px;
    padding-left: 10px;
    background-color: rgb(222, 222, 222);
`;

const FindBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    padding: 3px 10px 0px;
    border: 0;
    border-radius: 5px;
    margin-right: 5px;
    outline: none;
    background-color: white;
    font-size: 14px;
    &:hover {
        background-color: darkgray;
        color: white;
    }
`;

export default FindUserPassword;
