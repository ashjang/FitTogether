/* eslint-disable @typescript-eslint/no-unsafe-assignment, 
@typescript-eslint/no-unsafe-argument,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-misused-promises,
@typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

const SignUpSetting: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
    const [gender, setGender] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean>(true);
    const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
    const [_isReadyForSignUp, setIsReadyForSignUp] = useState<boolean>(false);
    const [_isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isNicknameAvailable && isEmailAvailable) {
            setIsReadyForSignUp(true);
        } else {
            setIsReadyForSignUp(false);
        }
    }, [isNicknameAvailable, isEmailAvailable]);

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // 아이디(닉네임) 입력 조건
        const regex = /^[A-Za-z0-9]*$/;

        if (regex.test(value) && value.length <= 10) {
            setNickname(value);
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    // 비밀번호 입력 조건
    const validatePassword = (value: string) => {
        const regex =
            /^(?:(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[@$!%*#?&])|(?=.*\d)(?=.*[@$!%*#?&]))[A-Za-z\d@$!%*#?&]{8,16}$/;
        return regex.test(value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
        setIsPasswordMatch(value === confirmPassword || (value === '' && confirmPassword === ''));
        setIsPasswordValid(validatePassword(value));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConfirmPassword(value);
        setIsPasswordMatch(password === value || (password === '' && value === ''));
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value === 'male');
    };

    const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.target.value === 'public');
    };

    // 아이디 및 이메일 중복검사
    const checkDuplicate = async (type: 'nickname' | 'email', value: string): Promise<void> => {
        try {
            const response = await axios.get(`/api/users/signup/check/${type}?${type}=${value}`);
            if (response.data.isDuplicate) {
                if (type === 'nickname') {
                    setIsNicknameAvailable(false);
                } else {
                    setIsEmailAvailable(false);
                }
                alert(`이미 사용 중인 ${type === 'nickname' ? '아이디' : '이메일'}입니다.`);
            } else {
                if (type === 'nickname') {
                    setIsNicknameAvailable(true);
                } else {
                    setIsEmailAvailable(true);
                }
                alert(`사용 가능한 ${type === 'nickname' ? '아이디' : '이메일'}입니다.`);
            }
        } catch (error) {
            console.error('중복 검사 실패:', error);
            // 중복 검사 실패 시 오류 팝업
            if (type === 'nickname') {
                setIsNicknameAvailable(false);
            } else {
                setIsEmailAvailable(false);
            }
        }
    };

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();

        // 중복 검사를 통과한 후에 폼 유효성 검사
        if (isNicknameAvailable && isEmailAvailable && isPasswordMatch) {
            // 비밀번호 유효성 검사
            if (!validatePassword(password)) {
                alert(
                    '비밀번호는 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합되고 8~16자여야 합니다.'
                );
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
                const response = await axios.post('/api/users/signup', formData);
                console.log('회원가입 성공:', response.data);
                navigate('/');
            } catch (error) {
                console.error('회원가입 실패:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        } else {
            // 중복 검사를 통과하지 않았을 경우의 경고 또는 처리를 추가할 수 있습니다.
            alert('중복 검사를 통과하세요.');
        }
    };

    return (
        <Page>
            <Title>가입 정보 입력</Title>
            <Form onSubmit={handleSignUp}>
                <MessageBox>
                    <GuideMessage>영어/숫자만 입력 가능합니다.</GuideMessage>
                </MessageBox>
                <InputTextDiv>
                    <label htmlFor="nickname">아이디(닉네임)</label>
                    <InputText
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={nickname}
                        pattern="[a-zA-Z0-9]*"
                        onChange={handleNicknameChange}
                        required
                    />
                    <DuplicateCheckButton onClick={() => checkDuplicate('nickname', nickname)}>
                        중복 검사
                    </DuplicateCheckButton>
                </InputTextDiv>
                <MessageBox>
                    {!isNicknameAvailable && (
                        <ErrorMessage>이미 사용 중인 아이디입니다.</ErrorMessage>
                    )}
                </MessageBox>

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
                    <DuplicateCheckButton onClick={() => checkDuplicate('email', email)}>
                        중복 검사
                    </DuplicateCheckButton>
                </InputTextDiv>
                <MessageBox>
                    {!isEmailAvailable && <ErrorMessage>이미 사용 중인 이메일입니다.</ErrorMessage>}
                </MessageBox>

                <InputTextDiv>
                    <label htmlFor="password">비밀번호</label>
                    <InputText
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        minLength={8}
                        maxLength={16}
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
                        minLength={8}
                        maxLength={16}
                        required
                    />
                </InputTextDiv>
                {!isPasswordMatch && (
                    <MessageBox>
                        <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                    </MessageBox>
                )}

                <InputRadioDiv>
                    <span>성별 선택</span>
                    <RadioContainer>
                        <label>
                            남성
                            <InputRadio
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleGenderChange}
                            />
                        </label>
                        <label>
                            여성
                            <InputRadio
                                type="radio"
                                name="gender"
                                value="female"
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
`;

const Title = styled.h1`
    width: 510px;
    margin-bottom: 50px;
    font-size: 22px;
`;

const MessageBox = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -30px;
    margin-bottom: 14px;
`;

const ErrorMessage = styled.div`
    font-size: 0.5rem;
    color: red;
`;

const GuideMessage = styled.div`
    font-size: 1rem;
    color: #007bff;
    margin-left: -50px;
    margin-bottom: -15px;
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
    background-color: #c7c7c7;
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

    background-color: #007bff;
    color: white;
    ${css`
        &:hover {
            background-color: #0056b3;
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
export default SignUpSetting;
