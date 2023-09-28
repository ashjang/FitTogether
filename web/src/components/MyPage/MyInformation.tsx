/** @jsxImportSource @emotion/react */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, 
@typescript-eslint/no-unsafe-argument,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-misused-promises,
@typescript-eslint/no-floating-promises,
react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const MyInformation: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [introduction, setIntroduction] = useState<string>(''); // 초기 값 설정
    const [gender, setGender] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [pictureURL, setPictureURL] = useState<string | null>(null);
    const [publicStatus, setPublicStatus] = useState(true);
    const [favoriteSports, setFavoriteSports] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (token) {
            getUserData(token);
        }
    }, []);

    const getUserData = async (token: string) => {
        try {
            const response = await axios.get('/api/users/my', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setNickname(response.data.nickname);
            setEmail(response.data.email);
            setIntroduction(response.data.introduction || '');
            setGender(response.data.gender === true);
            setPictureURL(response.data.profilePicture);
            setPublicStatus(response.data.publicInfo === true);
            setFavoriteSports(response.data.exerciseChoice);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('회원정보를 받아오는데 실패했습니다.');
        }
    };

    // 성별 정보
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value === '남성');
    };

    // 정보 공개 여부
    const handlePublicStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPublicStatus(event.target.value === '공개');
    };

    // 주로 하는 운동
    const handleFavoriteSportsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const sport = event.target.value;

        // 마지막에 체크된 값만 유지되도록 favoriteSports 배열을 업데이트
        setFavoriteSports((prevSports) => {
            if (event.target.checked) {
                return [...prevSports, sport];
            } else {
                return prevSports.filter((s) => s !== sport);
            }
        });
    };

    // 자기소개
    const handleIntroductionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue.length <= 100) {
            // 글자 수 제한 검사
            setIntroduction(newValue);
        }
    };

    const introductionLength = introduction.length;

    // 이미지 미리보기 설정
    useEffect(() => {
        if (pictureURL) {
            setImagePreview(pictureURL);
        }
    }, [pictureURL]);

    // 프로필 이미지 업로드
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(
                    `/api/users/upload?image=${encodeURIComponent(file.name)}`,
                    formData,
                    {
                        headers: {
                            'X-AUTH-TOKEN': token,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                const uploadedFileURL = response.data;
                setPictureURL(uploadedFileURL);
                setImagePreview(URL.createObjectURL(file));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // 프로필 이미지 삭제
    const handlePictureDelete = () => {
        setPictureURL(null);
    };

    // 비밀번호 외의 회원정보 데이터 저장
    const handleSaveClick = () => {
        const userInfo = {
            gender: gender,
            exerciseChoice: favoriteSports,
            introduction: introduction,
            publicInfo: publicStatus,
            profilePicture: pictureURL,
        };

        axios
            .put('/api/users/my', userInfo, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
            .then((response) => {
                console.log('업데이트 성공:', response.data);
                alert('입력하신 정보가 저장되었습니다.');
            })
            .catch((error) => {
                console.error('저장 실패:', error);
                alert('입력하신 정보의 저장에 실패했습니다.');
            });
    };

    return (
        <div>
            <InputContainer>
                <label css={labelStyle}>아이디</label>
                <input type="text" name="username" css={inputStyles} value={nickname} readOnly />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>이메일</label>
                <input type="email" name="email" css={inputStyles} value={email} readOnly />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>프로필 이미지</label>
                <ImageUploadContainer>
                    <ImagePreviewContainer>
                        {imagePreview ? (
                            <img src={imagePreview} alt="프로필 이미지 미리보기" />
                        ) : null}
                    </ImagePreviewContainer>
                    <ImageUploadButton>
                        <span>이미지 선택</span>
                        <input
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </ImageUploadButton>
                    <ImageUploadButton onClick={handlePictureDelete}>이미지 삭제</ImageUploadButton>
                </ImageUploadContainer>
            </InputContainer>
            <div css={containerStyles}>
                <p css={labelStyle}>성별</p>
                <RadioButtonContainer>
                    <label css={radioButtonStyles}>
                        <input
                            type="radio"
                            name="gender"
                            value="남성"
                            checked={gender === true}
                            onChange={handleGenderChange}
                        />
                        남성
                    </label>
                    <label css={radioButtonStyles}>
                        <input
                            type="radio"
                            name="gender"
                            value="여성"
                            checked={gender === false}
                            onChange={handleGenderChange}
                        />
                        여성
                    </label>
                </RadioButtonContainer>
            </div>
            <div css={containerStyles}>
                <p css={labelStyle}>주로 하는 운동</p>
                <RadioButtonContainer>
                    <label css={radioButtonStyles}>
                        <input
                            type="checkbox"
                            name="favorite"
                            value="RUNNING"
                            checked={favoriteSports.includes('RUNNING')}
                            onChange={handleFavoriteSportsChange}
                        />
                        러닝
                    </label>
                    <label css={radioButtonStyles}>
                        <input
                            type="checkbox"
                            name="favorite"
                            value="HIKING"
                            checked={favoriteSports.includes('HIKING')}
                            onChange={handleFavoriteSportsChange}
                        />
                        등산
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="favorite"
                            value="WEIGHT"
                            checked={favoriteSports.includes('WEIGHT')}
                            onChange={handleFavoriteSportsChange}
                        />
                        헬스
                    </label>
                </RadioButtonContainer>
            </div>
            <InputContainer>
                <p css={labelStyle}>자기소개</p>
                <input
                    type="text"
                    css={inputStyles}
                    value={introduction}
                    onChange={handleIntroductionChange}
                    placeholder="최대 100자까지 입력 가능"
                    maxLength={100}
                />
            </InputContainer>
            <MessageBox>
                <ErrorMessage>입력된 글자 수: {introductionLength} / 100</ErrorMessage>
            </MessageBox>
            <div css={containerStyles}>
                <p css={labelStyle}>공개 여부 </p>
                <RadioButtonContainer>
                    <label css={radioButtonStyles}>
                        <input
                            type="radio"
                            name="publicStatus"
                            value="공개"
                            checked={publicStatus === true}
                            onChange={handlePublicStatusChange}
                        />
                        공개
                    </label>
                    <label css={radioButtonStyles}>
                        <input
                            type="radio"
                            name="publicStatus"
                            value="비공개"
                            checked={publicStatus === false}
                            onChange={handlePublicStatusChange}
                        />
                        비공개
                    </label>
                </RadioButtonContainer>
            </div>
            <div css={formArea}>
                <input
                    type="button"
                    name="save"
                    onClick={handleSaveClick}
                    css={inputButton}
                    value="저장"
                />
            </div>
        </div>
    );
};

const labelStyle = css`
    width: 108px;
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
    margin-left: -100px;
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

const containerStyles = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const RadioButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 50px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const MessageBox = styled.div`
    display: flex;
    justify-content: center;
    width: 430px;
    margin-left: 15px;
    margin-top: -20px;
    margin-bottom: 4px;
`;

const ErrorMessage = styled.div`
    font-size: 0.5rem;
    color: red;
`;

const radioButtonStyles = css`
    display: flex;
    margin-right: 70px;
`;

const ImageUploadContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
`;

const ImagePreviewContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px;
    margin-left: 50px;
    margin-right: 10px;
    pointer-events: none;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ImageUploadButton = styled.label`
    border: 0.5px solid #d2d2d2;
    background-color: white;
    text-align: center;
    cursor: pointer;
    margin: 10px;
    padding: 3px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    min-width: 80px;
    height: 35px;

    span {
        pointer-events: none; // 클릭 이벤트가 버튼으로 전달되지 않도록 막음
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        pointer-events: none;
    }

    :hover {
        background-color: #d2d2d2;
    }
`;

export default MyInformation;
