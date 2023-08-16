/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react';
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
    const [profilePicture, setProfilePicture] = useState('');
    const [publicStatus, setPublicStatus] = useState(true);
    const [favoriteSports, setFavoriteSports] = useState<string[]>([]);

    // const [latitude, setLatitude] = useState<number | null>(null);
    // const [longitude, setLongitude] = useState<number | null>(null);

    // const canInfoEdit = useRecoilValue(canEditInfo);

    // const kakaoToken = sessionStorage.getItem('token_for_kakaotalk');

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

    // 주소찾기 모달 토글
    // const handleAddressModalToggle = () => {
    //     if (!isAddressModalOpen) {
    //         setSelectedAddress(''); // 주소찾기 모달이 닫힐 때 주소 입력 값을 초기화
    //         // setSelectedAddress(''); // 주소찾기 모달이 닫힐 때 주소 입력 값을 초기화
    //     }
    //     setAddressModalOpen((prev) => !prev); // 모달 상태를 토글
    // };

    // 찾은 주소를 거주지 Value값으로 입력
    // const handleComplete = (data: Address): void => {
    //     const userAddress = data.address;
    //     setSelectedAddress(userAddress);
    //     handleAddressModalToggle();

    // 주소를 좌표로 변환해서 값 얻어내기
    //     getGeocodeFromAddress(userAddress)
    //         .then((geocode) => {
    //             if (geocode) {
    //                 const { lat, long } = geocode;

    //                 console.log('위도:', lat);
    //                 console.log('경도:', long);

    //                 // 위도와 경도 값을 숫자로 변환하여 상태에 저장
    //                 setLatitude(Number(lat));
    //                 setLongitude(Number(long));

    //                 // 위도와 경도 값을 서버에 PUT 요청
    //                 axios
    //                     .put(
    //                         `/api/location?lat=${lat}&long=${long}`,
    //                         {},
    //                         {
    //                             headers: {
    //                                 // 'X-AUTH-TOKEN': canInfoEdit ? token : kakaoToken,
    //                                 'X-AUTH-TOKEN': token,
    //                             },
    //                         }
    //                     )
    //                     .then((response) => {
    //                         console.log('위도 경도 업데이트 성공:', response.data);
    //                     })
    //                     .catch((error) => {
    //                         console.error('위도 경도 업데이트 실패:', error);
    //                     });
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Geocoding API 호출 오류:', error);
    //         });
    // };

    // 성별 정보
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value === '남성');
    };

    // 프로필 아이콘 선택
    const handlePictureChange = (event) => {
        setProfilePicture(event.target.value);
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
            profilePicture: profilePicture,
        };

        axios
            .put('/api/users/my', userInfo, {
                headers: {
                    // 'X-AUTH-TOKEN': canInfoEdit ? token : kakaoToken,
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

            {/* <InputContainer>
                <label css={labelStyle}>거주지역</label>
                <input
                    type="text"
                    name="address"
                    css={inputStyles}
                    defaultValue={selectedAddress}
                    readOnly
                />
                <button onClick={handleAddressModalToggle} css={inputButton}>
                    주소찾기
                </button>
            </InputContainer> */}
            {/* {isAddressModalOpen && (
                <AddressPopup>
                    <PopupContent>
                        <DaumPostcode onComplete={handleComplete} />
                        <LiaWindowClose onClick={handleAddressModalToggle} />
                    </PopupContent>
                </AddressPopup>
            )} */}
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
                <p css={labelStyle}>프로필 아이콘</p>
                <label css={radioButtonStyles}>
                    <input
                        type="radio"
                        name="profilePicture"
                        value="GiSwordman"
                        checked={profilePicture === 'GiSwordman'}
                        onChange={handlePictureChange}
                    />
                    <div css={IconContainer}>
                        <GiSwordman />
                    </div>
                </label>
                <label css={radioButtonStyles}>
                    <input
                        type="radio"
                        name="profilePicture"
                        value="GiSwordwoman"
                        checked={profilePicture === 'GiSwordwoman'}
                        onChange={handlePictureChange}
                    />
                    <div css={IconContainer}>
                        <GiSwordwoman />
                    </div>
                </label>
                <label css={radioButtonStyles}>
                    <input
                        type="radio"
                        name="profilePicture"
                        value="GiSnowman"
                        checked={profilePicture === 'GiSnowman'}
                        onChange={handlePictureChange}
                    />
                    <div css={IconContainer}>
                        <GiSnowman />
                    </div>
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

const IconContainer = css`
    margin-left: 5px;
    font-size: 35px;
    color: #ffaea5;
`;

export default MyInformation;
