import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const FindUserPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState(null);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleFindPassword = (event) => {
        event.preventDefault();

        if (email.trim() === '') {
            alert('이메일을 입력해주세요.');
        } else {
            const url = `/api/users/findPW?email=${encodeURIComponent(email)}`;
            axios
                .put(url)
                .then((response) => {
                    // 서버 응답 처리
                    const responseData = response.data;

                    if (responseData.status === 200) {
                        // 이메일 전송 성공
                        console.log('Success:', responseData.message);
                        setResponseMessage(responseData.message);
                    } else if (responseData.status === 400) {
                        // 일치하는 회원 없음
                        console.log('Error:', responseData.message);
                        setResponseMessage(responseData.message);
                    } else {
                        // 다른 상태 코드 처리
                        console.log('Unexpected Response:', responseData);
                        alert('알 수 없는 오류가 발생했습니다.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching ID:', error);

                    if (error.response && error.response.data && error.response.data.message) {
                        setResponseMessage(error.response.data.message); // 오류 응답 데이터의 message 사용
                    } else {
                        setResponseMessage('서버 요청 중 오류가 발생했습니다.');
                    }
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
                {responseMessage !== null && (
                    <MessageBox>
                        <ResponseMessage>{responseMessage}</ResponseMessage>
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

const ResponseMessage = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff;
    margin-top: 10px;
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
