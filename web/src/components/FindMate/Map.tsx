/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import  from '';


// import LogoImg from "./../../assets/logo.png";

type BtnTabProps = {
    isActive: boolean;
};
// type ProfileProps = {
//     profile: {
//         // photo: string;
//         nickname: string;
//         gender: string;
//         intro: string;
//         favoriteSport: string;
//     };
//     onClose: () => void;
// }
function Map() {
    const [activeTab, setActiveTab] = useState('러닝');
    return (
        <MapInn>
            <MapSection className="map-section">
                <PageTitle>운동 메이트 찾기</PageTitle>

                <MateCategory className="mate-category">
                    <dt className="category01">
                        <BtnTab type="button" className="btn btn-menu" isActive={activeTab === '러닝'} onClick={() => setActiveTab('러닝')}>러닝</BtnTab>
                    </dt>
                    {activeTab === '러닝' && (
                        <dd>
                            <div>러닝 지도1 페이지</div>
                        </dd>
                    )}
                    <dt className="category02">
                        <BtnTab type="button" className="btn btn-menu" isActive={activeTab === '등산'} onClick={() => setActiveTab('등산')}>등산</BtnTab>
                    </dt>
                    {activeTab === '등산' && (
                        <dd>
                            <div>등산 지도2 페이지</div>
                        </dd>
                    )}
                    <dt className="category03">
                        <BtnTab type="button" className="btn btn-menu" isActive={activeTab === '헬스'} onClick={() => setActiveTab('헬스')}>헬스</BtnTab>
                    </dt>
                    {activeTab === '헬스' && (
                        <dd>
                            <div>헬스 지도3 페이지</div>
                        </dd>
                    )}
                </MateCategory>
            </MapSection>
            {/* <PopupContainer>
                <CloseButton onClick={onClose}>X</CloseButton>
                <ProfileImage src={profile.photo} alt="Profile" />
                <Nickname>{profile.nickname}</Nickname>
                <Gender>{profile.gender === 'M' ? '남자' : '여자'}</Gender>
                <Intro>{profile.intro}</Intro>
                <FavoriteSport>{profile.favoriteSport}</FavoriteSport>
                <BtnFriend>친구 신청</BtnFriend>
            </PopupContainer> */}

        </MapInn>
    );
}

const MapInn = styled.div`
    position: relative;
    max-width: 1440px;
    height: 100%;
    margin: 20px auto 0;
    padding: 20px 60px;

    background-color: #f8f8f8;
`;

const MapSection = styled.section`
    position: relative;
`;

const PageTitle = styled.h2`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 1px;
        color: #000;
        background-color: #000;
    }
`;

const MateCategory = styled.dl`
    position: relative;
    width: 100%;
    height:500px;
    margin-bottom: 50px;    

    dt {
        position: absolute;
        left: 0;
        top: -60px;
    }
    dt.category02 {
        left: 85px;
    }
    dt.category03 {
        left: 170px;
    }
    dd {
        width: 80%;
        height: 500px;
        padding: 10px;
        margin: 100px auto 0;
        border: 1px solid #000;
        border-radius: 10px;
    }

    // 지도 부분
    dd  {
        font-size : 40px;
        text-align: center;
    }
`;

const BtnTab = styled.button<BtnTabProps>`
    border: 1px solid #000;
    border-radius: 20px;
    padding: 4px 20px;
    background-color: #fff;

    // 탭 클릭 시 
    background-color: ${props => (props.isActive ? '#000' : '#fff')};
    color: ${props => (props.isActive ? '#fff' : '#000')};
`;



//profile
// const PopupContainer = styled.div`
// `;

// const CloseButton = styled.button`
// `;

// const ProfileImage = styled.img`
// `;

// const Nickname = styled.h2`
// `;

// const Gender = styled.p`
// `;

// const Intro = styled.p`
// `;

// const FavoriteSport = styled.p`
// `;

// const BtnFriend = styled.button`
// `;
export default Map;