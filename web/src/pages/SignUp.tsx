import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };
    const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.target.value === 'public');
    };
    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();

        // 폼 유효성 검사
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 백엔드로 전송할 데이터
        const formData = {
            nickname: nickname,
            email: email,
            password: password,
            gender: gender,
            isPublic: isPublic,
        };

        try {
            //   const response = await axios.post('/users/signup', formData);
            //   console.log('회원가입 성공:', response.data);
            //   // 회원 가입 성공 처리 로직 추가
            // } catch (error) {
            //   console.error('회원가입 실패:', error);
            //   // 회원 가입 실패 처리 로직 추가

            // JSON 서버에 회원가입 요청 보내기
            const response = await axios.post('http://localhost:5001/users', formData);
            console.log('회원가입 성공:', response.data);
            // 회원 가입 성공 시 알림을 띄움
            alert('회원가입에 성공했습니다.');
        } catch (error) {
            console.error('회원가입 실패:', error);
            // 회원 가입 실패 시 알림을 띄움
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <Page>
            <Title>가입 정보 입력</Title>
            <Form onSubmit={handleSignUp}>
                <InputTextDiv>
                    <label htmlFor="nickname">아이디(닉네임)</label>
                    <InputText
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                        required
                    />
                    <DuplicateCheckButton>중복 검사</DuplicateCheckButton>
                </InputTextDiv>

                <InputTextDiv>
                    <label htmlFor="email">이메일 주소</label>
                    <InputText
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <DuplicateCheckButton>중복 검사</DuplicateCheckButton>
                </InputTextDiv>

                <InputTextDiv>
                    <label htmlFor="password">비밀번호</label>
                    <InputText
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </InputTextDiv>

                <InputTextDiv>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <InputText
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </InputTextDiv>

                <InputRadioDiv>
                    <span>성별 선택</span>
                    <RadioContainer>
                        <label>
                            남성
                            <InputRadio
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={handleGenderChange}
                            />
                        </label>
                        <label>
                            여성
                            <InputRadio
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={handleGenderChange}
                            />
                        </label>
                    </RadioContainer>
                </InputRadioDiv>

                <InputRadioDiv>
                    <span>정보 공개 여부</span>
                    <RadioContainer>
                        <label>
                            공개
                            <InputRadio
                                type="radio"
                                name="public_info"
                                value="public"
                                checked={isPublic}
                                onChange={handlePublicChange}
                            />
                        </label>
                        <label>
                            비공개
                            <InputRadio
                                type="radio"
                                name="public_info"
                                value="private"
                                checked={!isPublic}
                                onChange={handlePublicChange}
                            />
                        </label>
                    </RadioContainer>
                </InputRadioDiv>
                <SignUpButton type="submit">회원 가입</SignUpButton>
            </Form>
            <BackButton href="">
                <Link to="/signin">
                    <BackButtonText>로그인 화면으로 돌아가기</BackButtonText>
                </Link>
            </BackButton>
        </Page>
    );
};
const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // min-height는 삭제 예정
    min-height: calc(100vh - 300px);
`;
const Title = styled.h1`
    width: 510px;
    margin-bottom: 50px;
`;
const Form = styled.form`
    position: relative;
    width: 510px;
    height: 450px;
`;
const InputTextDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: 30px;
`;
const DuplicateCheckButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    padding: 3px 10px 0px;
    border: 0;
    border-radius: 5px;
    margin-right: 3px;
    outline: none;
    background-color: #C7C7C7;
    font-size: 14px;
`;
const InputText = styled.input`
    width: 350px;
    height: 40px;
    border: 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(222, 222, 222);
`;
const InputRadioDiv = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 30px;
`;
const RadioContainer = styled.div`
    position: absolute;
    left: 160px;
`;
const InputRadio = styled.input`
    margin: 0px 30px 0px 5px;
`;
const SignUpButton = styled.button`
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 170px;
    border: 0;
    border-radius: 5px;
    outline: none;
    padding: 5px 20px;

    background-color: #007BFF;
    color: white;
    ${css`
        &:hover {
            background-color: #0056B3;
        }
    `}
`;
const BackButton = styled.a`
    position: relative;
    left: -172.5px;
    top: -24px;
`;
const BackButtonText = styled.p`
    font-size: 14px;
    border-bottom: 1px solid black;
`;
export default SignUp;
