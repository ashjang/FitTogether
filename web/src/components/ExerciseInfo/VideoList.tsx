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
function VideoList() {
    const [activeTab, setActiveTab] = useState('러닝');
    return (
        <VideoInn>
            <VideoSection className="video-section">
                <PageTitle>운동 정보</PageTitle>

                <VideoCategory className="video-category">
                    <dt className="category01">
                        <BtnTab type="button" className="btn btn-menu" isActive={activeTab === '러닝'} onClick={() => setActiveTab('러닝')}>러닝</BtnTab>
                    </dt>
                    {activeTab === '러닝' && (
                        <ContentList>
                            <ContentListItem>
                                러닝 유튜브 목록 페이지
                            </ContentListItem>
                        </ContentList>
                    )}
                    <dt className="category02">
                        <BtnTab type="button" className="btn btn-menu" isActive={activeTab === '등산'} onClick={() => setActiveTab('등산')}>등산</BtnTab>
                    </dt>
                    {activeTab === '등산' && (
                        <ContentList>
                            <ContentListItem>등산 유튜브 목록 페이지</ContentListItem>
                        </ContentList>
                    )}
                    <dt className="category03">
                        <BtnTab type="button" className="btn btn-menu" isActive={activeTab === '헬스'} onClick={() => setActiveTab('헬스')}>헬스</BtnTab>
                    </dt>
                    {activeTab === '헬스' && (
                        <ContentList>
                            <ContentListItem>헬스 유튜브 목록 페이지</ContentListItem>
                        </ContentList>
                    )}
                </VideoCategory>
            </VideoSection>
        </VideoInn>
    );
}

const VideoInn = styled.div`
    position: relative;
    max-width: 1440px;
    height: 100%;
    margin: 20px auto 0;
    padding: 20px 60px;

    background-color: #f8f8f8;
`;

const VideoSection = styled.section`
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

const VideoCategory = styled.dl`
    position: relative;
    width: 100%;
    height:500px;
    margin-bottom: 50px;    

    dt {
        position: absolute;
        left: 50%;
        top: -60px;
        transform: translateX(-50%);
    }
    dt.category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    dt.category03 {
        left: 60%;
        transform: translateX(-60%);
    }


`;
const ContentList = styled.dd`
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 100px auto 0;
    border-radius: 10px;
    background-color: #efefef;
    font-size : 40px;
    text-align: center;
`;
//비디오 목록
const ContentListItem = styled.div`

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




export default VideoList;