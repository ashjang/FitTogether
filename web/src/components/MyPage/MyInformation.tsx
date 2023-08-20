/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { GiSwordman, GiSwordwoman, GiSnowman } from 'react-icons/gi';

// import { canEditInfo } from '../../recoil/AuthState/atoms';
// import { useRecoilValue } from 'recoil';

// import { LiaWindowClose } from 'react-icons/lia';
// import getGeocodeFromAddress from './getGeocodeFromAddress';
// import DaumPostcode, { Address } from 'react-daum-postcode';

const MyInformation: React.FC = () => {
    // const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    // const [selectedAddress, setSelectedAddress] = useState<string>('');

    const [userData, setUserData] = useState({});
    const [introduction, setIntroduction] = useState<string>(userData.introduction || ''); // 초기 값 설정
    const [gender, setGender] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

    const getUserData = async (token) => {
        try {
            const response = await axios.get('/api/users/my', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });
            setUserData({
                ...response.data,
                gender: response.data.gender === '남성',
            });
            setIntroduction(response.data.introduction || '');
            setGender(response.data.gender === true);
            setProfilePicture(response.data.profilePicture);
            setPublicStatus(response.data.publicInfo === true);
            setFavoriteSports(response.data.exerciseChoice);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('회원정보를 받아오는데 실패했습니다.');
        }
    };

    // 성별 정보
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value === '남성');
    };

    // 프로필 이미지 업로드
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file);
        setImagePreview(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 프로필 이미지
    const handlePictureChange = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await axios.post(
                `/api/users/upload?image=${encodeURIComponent(selectedImage.name)}`,
                formData,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            );
            const uploadedFileURL = response.data;
            setPictureURL(uploadedFileURL);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // 프로필 이미지 삭제
    const handlePictureDelete = () => {
        setSelectedImage(null);
        setImagePreview(null);
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

    // 비밀번호 외의 회원정보 데이터 저장
    const handleSaveClick = () => {
        const userInfo = {
            gender: gender,
            exerciseChoice: favoriteSports,
            introduction: introduction,
            publicInfo: publicStatus,
            profilePicture: selectedImage,
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
                <input
                    type="text"
                    name="username"
                    css={inputStyles}
                    value={userData.nickname}
                    readOnly
                />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>이메일</label>
                <input
                    type="email"
                    name="email"
                    css={inputStyles}
                    value={userData.email}
                    readOnly
                />
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
                    <ImageUploadButton onClick={handlePictureChange}>
                        <span>이미지 저장</span>
                    </ImageUploadButton>
                    <ImageUploadButton onClick={handlePictureDelete}>이미지 삭제</ImageUploadButton>
                </ImageUploadContainer>
            </InputContainer>
            <div css={containerStyles}>
                <p css={labelStyle}>성별</p>
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
            </div>
            <div css={containerStyles}>
                <p css={labelStyle}>주로 하는 운동</p>
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
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

// const AddressPopup = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 9999;
// `;

// const PopupContent = styled.div`
//     width: 500px;
//     background-color: white;
//     padding: 20px;

//     border-radius: 8px;
//     text-align: right;
// `;

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

const IconContainer = css`
    margin-left: 5px;
    font-size: 35px;
    color: #ffaea5;
`;

export default MyInformation;
