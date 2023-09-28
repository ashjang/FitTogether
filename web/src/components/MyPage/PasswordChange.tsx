/** @jsxImportSource @emotion/react */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, 
@typescript-eslint/no-unsafe-argument,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-misused-promises,
@typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { canEditInfo } from '../../recoil/AuthState/atoms';
import { useRecoilValue } from 'recoil';

const PasswordChange: React.FC = () => {
    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmInputRef = useRef<HTMLInputElement | null>(null);

    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [savedPassword, setSavedPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const canInfoEdit = useRecoilValue(canEditInfo);

    const token = sessionStorage.getItem('token');

    // 비밀번호 일치 여부 검사
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordsMatch(newPassword === passwordConfirm);
        setIsPasswordValid(checkPasswordValidity(newPassword));
    };

    const handlePasswordConfirmChange = (event: any) => {
        const newConfirmPassword = event.target.value;
        setPasswordConfirm(newConfirmPassword);
        setPasswordsMatch(password === newConfirmPassword);
    };

    // 비밀번호 유효성 검사
    const checkPasswordValidity = (password: any) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/;
        // const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        return regex.test(password);
    };

    // 비밀번호 저장
    const handleSavePassword = () => {
        if (password !== '') {
            const isPasswordComplex = checkPasswordValidity(password);
            setIsPasswordValid(isPasswordComplex);

            if (!isPasswordComplex || password !== '') {
                alert('비밀번호가 조건을 만족하지 않습니다.');
                return;
            }
        }

        if (!isPasswordValid || password !== '') {
            return;
        }

        setSavedPassword(password !== '' ? password : savedPassword); // 기존 비밀번호 저장

        const newPasswordData = {
            password: password, // 변경된 비밀번호를 사용
        };

        axios
            .put('/api/users/my/password', newPasswordData, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
            .then((response) => {
                console.log('업데이트 성공:', response.data);
                alert('비밀번호가 변경되었습니다.');
            })
            .catch((error) => {
                console.error('저장 실패:', error);
                alert('비밀번호의 변경에 실패했습니다.');
            });
    };

    const isSaveEnabled = isPasswordValid && passwordsMatch;

    useEffect(() => {
        setTimeout(() => {
            passwordInputRef.current?.focus();
        }, 0);
    }, []);

    return (
        <PasswordBox>
            <Title>비밀번호 변경</Title>
            <InputContainer>
                <label css={labelStyle} htmlFor="passwordInput">
                    비밀번호
                </label>
                <input
                    type="password"
                    id="passwordInput"
                    name="password"
                    ref={passwordInputRef}
                    value={password || savedPassword} // 비밀번호 값이 비어있을 때 기존 비밀번호 사용
                    css={inputStyles}
                    placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8~16자"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$"
                    title="올바른 형식을 입력하세요."
                    disabled={!canInfoEdit}
                    minLength={8}
                    maxLength={16}
                    onChange={handlePasswordChange}
                    // autoFocus
                />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle} htmlFor="passwordConfirmInput">
                    비밀번호 확인
                </label>
                <input
                    type="password"
                    id="passwordConfirmInput"
                    name="password"
                    ref={passwordConfirmInputRef}
                    css={inputStyles}
                    value={passwordConfirm}
                    placeholder="다시 한번 입력하세요"
                    disabled={!canInfoEdit}
                    minLength={8}
                    maxLength={16}
                    onChange={handlePasswordConfirmChange}
                />
            </InputContainer>
            <MessageContainer>
                {!passwordsMatch && (
                    <MessageBox>
                        <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                    </MessageBox>
                )}
                {!isPasswordValid && (
                    <MessageBox>
                        <ErrorMessage>비밀번호가 조건을 만족하지 않습니다.</ErrorMessage>
                    </MessageBox>
                )}
            </MessageContainer>
            <div css={formArea}>
                <input
                    type="button"
                    name="savePassword"
                    // onClick={handleSavePassword}
                    onClick={() => {
                        if (!isSaveEnabled) {
                            if (!isPasswordValid) {
                                passwordInputRef.current?.focus();
                            } else if (!passwordsMatch) {
                                passwordConfirmInputRef.current?.focus();
                            }
                        } else {
                            handleSavePassword();
                        }
                    }}
                    css={inputButton}
                    value="비밀번호 변경"
                    disabled={!isSaveEnabled}
                />
            </div>
        </PasswordBox>
    );
};

const PasswordBox = styled.div`
    margin-top: 110px;
    min-height: calc(100vh - 160px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h2`
    margin-left: -500px;
    margin-bottom: 50px;
`;

const labelStyle = css`
    width: 108px;
    margin-right: 10px;
`;

const inputStyles = css`
    margin: 10px;
    margin-left: 50px;
    padding: 8px;
    padding-left: 10px;
    border: none;
    outline: none;
    width: 430px;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(222, 222, 222);
`;

const inputButton = css`
    border: 0.5px solid #d2d2d2;
    background-color: white;
    text-align: center;
    cursor: pointer;
    margin: 10px;
    margin-right: -295px;
    padding: 2px 10px;
    border-radius: 10px;

    :hover {
        background-color: #c7c7c7c7;
    }
`;

const formArea = css`
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const MessageContainer = styled.div`
    display: flex;
    width: 410px;
    margin-left: 130px;
`;

const MessageBox = styled.div`
    display: flex;
    justify-content: center;
    width: 430px;
    margin-left: 25px;
    margin-top: -20px;
    margin-bottom: 4px;
`;

const ErrorMessage = styled.div`
    font-size: 0.5rem;
    color: red;
`;

export default PasswordChange;
