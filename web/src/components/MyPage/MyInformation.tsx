/** @jsxImportSource @emotion/react */

import React, { useState, useRef } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { LiaWindowClose } from 'react-icons/lia';

const MyInformation: React.FC = () => {
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [inputIdValue, setInputIdValue] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleAddressModalToggle = () => {
        if (!isAddressModalOpen) {
            // setSelectedAddress(''); // 주소찾기 모달이 닫힐 때 주소 입력 값을 초기화
        }
        setAddressModalOpen((prev) => !prev); // 모달 상태를 토글
    };

    const handleComplete = (data: Address) => {
        // console.log(data); // Address data 확인
        const userAddress =
            data.address.length > 3 ? data.address.split(' ').splice(0, 3).join(' ') : data.address;
        setSelectedAddress(userAddress);
        handleAddressModalToggle(); //
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveClick = () => {
        alert('저장되었습니다.');
    };

    const duplicationCheck = () => {
        alert('중복검사');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputIdValue(event.target.value);

        const value = event.target.value;

        const regex = /^[A-Za-z0-9]*$/;

        if (regex.test(value) && value.length <= 10) {
            setInputIdValue(value);
        }
    };

    return (
        <div>
            <InputContainer>
                <label css={labelStyle}>아이디(닉네임)</label>
                <input
                    type="text"
                    name="username"
                    css={inputStyles}
                    value={inputIdValue}
                    onChange={handleInputChange}
                    placeholder="영문 대소문자/숫자중 최대 10자"
                    // disabled={isKakaoLoggedIn}
                />
                <button onClick={duplicationCheck} css={inputButton}>
                    중복검사
                </button>
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>비밀번호</label>
                <input
                    type="password"
                    name="password"
                    css={inputStyles}
                    placeholder="영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8~16자"
                    // disabled={isKakaoLoggedIn}
                />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>비밀번호 확인</label>
                <input
                    type="password"
                    name="password"
                    css={inputStyles}
                    placeholder="다시 한번 입력하세요"
                    // disabled={isKakaoLoggedIn}
                />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>이메일</label>
                <input
                    type="email"
                    name="email"
                    css={inputStyles}
                    value={'qwerty1234@gmail.com'}
                    readOnly
                />
            </InputContainer>
            <InputContainer>
                <label css={labelStyle}>거주지역</label>
                <input
                    type="text"
                    name="address"
                    css={inputStyles}
                    value={selectedAddress}
                    onChange={handleInputChange}
                    // disabled={isKakaoLoggedIn}
                />
                <button onClick={handleAddressModalToggle} css={inputButton}>
                    주소찾기
                </button>
            </InputContainer>
            {isAddressModalOpen && (
                <AddressPopup>
                    <PopupContent>
                        <DaumPostcode onComplete={handleComplete} />
                        <LiaWindowClose onClick={handleAddressModalToggle} />
                    </PopupContent>
                </AddressPopup>
            )}
            <InputContainer>
                <label css={labelStyle}>프로필 이미지</label>
                <ImageUploadContainer>
                    <ImagePreviewContainer>
                        {imagePreview ? (
                            <img src={imagePreview} alt="프로필 이미지 미리보기" />
                        ) : null}
                    </ImagePreviewContainer>
                    <ImageUploadButton>
                        <span>사진선택</span>
                        <input
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </ImageUploadButton>
                </ImageUploadContainer>
            </InputContainer>
            <div css={containerStyles}>
                <p css={labelStyle}>성별</p>
                <label css={radioButtonStyles}>
                    <input type="radio" name="gender" value="남성" />
                    남성
                </label>
                <label css={radioButtonStyles}>
                    <input type="radio" name="gender" value="여성" />
                    여성
                </label>
            </div>
            <div css={containerStyles}>
                <p css={labelStyle}>주로 하는 운동</p>
                <label css={radioButtonStyles}>
                    <input type="checkbox" name="favorite" value="러닝" />
                    러닝
                </label>
                <label css={radioButtonStyles}>
                    <input type="checkbox" name="favorite" value="등산" />
                    등산
                </label>
                <label>
                    <input type="checkbox" name="favorite" value="헬스" />
                    헬스
                </label>
            </div>
            <InputContainer>
                <p css={labelStyle}>자기소개</p>
                <input
                    type="text"
                    css={inputStyles}
                    placeholder="최대 100자까지 입력 가능"
                    maxLength={100}
                />
            </InputContainer>
            <div css={containerStyles}>
                <p css={labelStyle}>공개 여부 </p>
                <label css={radioButtonStyles}>
                    <input type="radio" name="publicStatus" value="공개" />
                    공개
                </label>
                <label css={radioButtonStyles}>
                    <input type="radio" name="publicStatus" value="비공개" />
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
    font-weight: bold;
    width: 108px;
    margin-right: 10px;
`;

const inputStyles = css`
    margin: 10px;
    margin-left: 50px;
    padding: 8px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    width: 430px;
    background-color: rgba(0, 0, 0, 0);
`;

const inputButton = css`
    border: 0.5px solid #d2d2d2;
    background-color: white;
    text-align: center;
    cursor: pointer;
    margin: 10px;
    margin-left: 50px;
    padding: 3px 8px;
    border-radius: 4px;

    :hover {
        background-color: #d2d2d2;
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

const AddressPopup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const PopupContent = styled.div`
    width: 500px;
    background-color: white;
    padding: 20px;

    border-radius: 8px;
    text-align: right;
`;

const ImageUploadContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
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
    margin-left: 50px;
    padding: 3px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
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

const radioButtonStyles = css`
    margin-right: 70px;
`;

export default MyInformation;
