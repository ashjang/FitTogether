/* eslint-disable @typescript-eslint/no-unsafe-call,
@typescript-eslint/restrict-plus-operands,
@typescript-eslint/no-explicit-any,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-assignment,
@typescript-eslint/no-unsafe-argument */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const FindUserId: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [foundId, setFoundId] = useState(null);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleFindId = (event: any) => {
        event.preventDefault();

        if (email.trim() === '') {
            alert('이메일을 입력해주세요.');
        } else {
            const url = `/api/users/findID?email=${encodeURIComponent(email)}`;
            console.log('Request URL:', url);
            axios
                .get(url)
                .then((response) => {
                    // 서버 응답 처리
                    const foundId = response.data;
                    console.log('Found ID:', foundId);
                    setFoundId(foundId);
                })
                .catch((error) => {
                    console.error('Error fetching ID:', error);
                    alert('존재하지 않는 이메일입니다.');
                });
        }
    };

    const maskedId = foundId ? foundId.slice(0, -2) + '**' : ''; // ID 일부 *표기

    return (
        <Container>
            <Title>ID 찾기</Title>
            <Form onSubmit={handleFindId}>
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
                    <FindBtn type="submit">ID 찾기</FindBtn>
                </InputTextDiv>
                {foundId !== null && (
                    <MessageBox>
                        <FoundId>회원님의 ID는 {maskedId} 입니다.</FoundId>
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

const FoundId = styled.div`
    margin: 10px;
    margin-left: 90px;
    font-weight: bold;
    color: #007bff;
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

export default FindUserId;
