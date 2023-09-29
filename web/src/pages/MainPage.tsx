/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useState, useEffect } from 'react';

import writing from '../assets/writing.png';
import posts from '../assets/post.png';
import findMate from '../assets/findMate.png';
import chat from '../assets/dm_chat.png';
import exerciseInfo from '../assets/exerciseInfo.png';
import bookmark from '../assets/bookmark.png';

import slideImage01 from '../assets/youtube.jpg';
import slideImage02 from '../assets/running.jpg';
import slideImage03 from '../assets/phone.jpg';

type BtnTabProps = {
    isActive: boolean;
};

const MainPage: React.FC = () => {
    //slide
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = 3;
    const slideDuration = 3000;

    //tab
    const [activeTab, setActiveTab] = useState('커뮤니티');

    //slide
    useEffect(() => {
        const autoSlideTimer = setInterval(() => {
            goToSlide((activeSlide + 1) % totalSlides);
        }, slideDuration);

        return () => clearInterval(autoSlideTimer);
    }, [activeSlide]);

    const goToSlide = (index: number) => {
        setActiveSlide(index);
    };

    const prevSlide = () => {
        goToSlide((activeSlide - 1 + totalSlides) % totalSlides);
    };
    const nextSlide = () => {
        goToSlide((activeSlide + 1) % totalSlides);
    };
    const handleIndicatorClick = (index: number) => {
        goToSlide(index);
    };

    // 탭 클릭
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <Container>
                <Carousel>
                    <SlideArea>
                        <Slide className={`slide ${activeSlide === 0 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">러닝, 등산, 헬스 다양한 유튜브 영상 제공!</h2>
                                <p className="txt">
                                    다양한 유튜브 영상을
                                    <br />
                                    플레이 리스트에 담을 수 있어요 😎
                                </p>
                            </SlideContent>
                        </Slide>
                        <Slide className={`slide ${activeSlide === 1 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">운동메이트 매칭!</h2>
                                <p className="txt">
                                    내 주변에서 함께 할
                                    <br />
                                    운동메이트를 찾아보세요 🤼‍♂️
                                </p>
                            </SlideContent>
                        </Slide>
                        <Slide className={`slide ${activeSlide === 2 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">채팅을 통해 대화해요!</h2>
                                <p className="txt">
                                    매칭된 운동메이트와
                                    <br />
                                    채팅을 통해 운동계획을 세워보세요 👩‍💻
                                </p>
                            </SlideContent>
                        </Slide>
                    </SlideArea>
                    <IndicatorArea>
                        {Array.from({ length: totalSlides }, (_, index) => (
                            <span
                                key={index}
                                className={`indicator ${activeSlide === index ? 'active' : ''}`}
                                onClick={() => handleIndicatorClick(index)}
                            ></span>
                        ))}
                    </IndicatorArea>
                    <BtnCarousel>
                        <button type="button" className="btn prev" onClick={prevSlide}>
                            <i className="fa-solid fa-chevron-left"></i>
                            <span className="blind">이전</span>
                        </button>
                        <button type="button" className="btn next" onClick={nextSlide}>
                            <i className="fa-solid fa-chevron-right"></i>
                            <span className="blind">다음</span>
                        </button>
                    </BtnCarousel>
                </Carousel>

                <MainTabSection>
                    <h2 className="main-title">다양한 콘텐츠를 즐기세요!</h2>
                    <CategoryContainer>
                        <CategoryBtnContainer>
                            <Category01>
                                <BtnTab
                                    type="button"
                                    className="btn btn-menu"
                                    isActive={activeTab === '운동 정보'}
                                    onClick={() => handleTabClick('운동 정보')}
                                >
                                    운동 정보
                                </BtnTab>
                            </Category01>
                            <Category02>
                                <BtnTab
                                    type="button"
                                    className="btn btn-menu"
                                    isActive={activeTab === '커뮤니티'}
                                    onClick={() => handleTabClick('커뮤니티')}
                                >
                                    커뮤니티
                                </BtnTab>
                            </Category02>
                            <Category03>
                                <BtnTab
                                    type="button"
                                    className="btn btn-menu"
                                    isActive={activeTab === '운동 메이트'}
                                    onClick={() => handleTabClick('운동 메이트')}
                                >
                                    운동 메이트
                                </BtnTab>
                            </Category03>
                        </CategoryBtnContainer>

                        {activeTab === '운동 정보' && (
                            <TabSectionList>
                                <ul className="section-content one">
                                    <li>
                                        <div className="thumb">
                                            <img
                                                className="first-img"
                                                src={exerciseInfo}
                                                alt="exercise info"
                                            />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">정보 제공</h3>
                                            <p className="txt">
                                                관심있는 운동의 정보를
                                                <br />
                                                동영상으로 확인하세요!
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="thumb">
                                            <img
                                                className="second-img"
                                                src={bookmark}
                                                alt="bookmark"
                                            />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">북마크</h3>
                                            <p className="txt">
                                                마음에 드는 동영상을
                                                <br />
                                                북마크에 저장할 수 있어요!
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </TabSectionList>
                        )}
                        {activeTab === '커뮤니티' && (
                            <TabSectionList>
                                <ul className="section-content two">
                                    <li>
                                        <div className="thumb">
                                            <img
                                                className="first-img"
                                                src={writing}
                                                alt="writing"
                                            />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">글쓰기</h3>
                                            <p className="txt">
                                                러닝, 등산, 헬스 다양한 종목으로
                                                <br />
                                                운동후기를 남겨보세요!
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="thumb">
                                            <img className="second-img" src={posts} alt="posts" />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">정보공유</h3>
                                            <p className="txt">
                                                회원들과 다양한
                                                <br />
                                                운동 정보를 공유할 수 있어요!
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </TabSectionList>
                        )}
                        {activeTab === '운동 메이트' && (
                            <TabSectionList>
                                <ul className="section-content three">
                                    <li>
                                        <div className="thumb">
                                            <img
                                                className="first-img"
                                                src={findMate}
                                                alt="find mate"
                                            />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">운동메이트 찾기</h3>
                                            <p className="txt">
                                                지도에서 내 주변 <br />
                                                운동메이트를 찾아보세요!
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="thumb">
                                            <img className="second-img" src={chat} alt="chat" />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">채팅</h3>
                                            <p className="txt">
                                                매칭된 운동메이트와 채팅으로
                                                <br />
                                                운동플랜을 만들어보세요!
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </TabSectionList>
                        )}
                    </CategoryContainer>
                </MainTabSection>
            </Container>
        </>
    );
};

// emotion css style
const Container = styled.div`
    position: relative;
    margin-top: 110px;
    .txt {
        white-space: nowrap;
    }
`;

// 캐러셀 슬라이드
const Carousel = styled.div`
    position: relative;
    overflow: hidden;
`;
const SlideArea = styled.div`
    display: flex;
    height: 500px;
    overflow: hidden;
`;

const Slide = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.5s ease-in-out;

    &.slide.active:nth-of-type(1) {
        background: url(${slideImage01}) no-repeat center 0 / cover;
    }
    &.slide.active:nth-of-type(2) {
        background: url(${slideImage02}) no-repeat center 0 / cover;
    }
    &.slide.active:nth-of-type(3) {
        background: url(${slideImage03}) no-repeat center 0 / cover;
    }

    &.active {
        opacity: 1;
    }
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(34, 34, 34, 0.4);
    }
`;
const SlideContent = styled.div`
    position: absolute;
    top: 50%;
    left: 120px;
    transform: translateY(-50%);
    color: #fff;

    .title {
        font-size: 18px;
        margin-bottom: 5px;
    }
    .txt {
        font-size: 32px;
        font-weight: 700;
        line-height: 1.2;
    }
`;

const IndicatorArea = styled.div`
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    z-index: 1;

    .indicator {
        width: 10px;
        height: 10px;
        margin: 0 5px;
        border-radius: 50%;
        cursor: pointer;
        background-color: #c4c4c4;
    }
    .indicator:hover {
        transition: all 0.3s;
        background-color: #fff;
    }

    .indicator.active {
        background-color: #1877f2;
    }
`;
const BtnCarousel = styled.div`
    .btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font-size: 40px;
        padding: 0 20px;
        opacity: 0.7;
        border: none;
        background: none;
        z-index: 1;
    }
    .btn.prev {
        left: 0;
    }
    .btn.next {
        right: 0;
    }
    .btn:hover {
        color: #7f5539;
        opacity: 1;
        transition: all 0.3s;
    }
`;

// MainTabSection
const MainTabSection = styled.section`
    position: relative;
    max-width: 1440px;
    padding: 24px;
    margin: 60px auto 0;
    background-color: #f1f1f1;
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    overflow: hidden;

    .main-title {
        text-align: center;
        margin-bottom: 20px;
        white-space: nowrap;
    }
`;

const CategoryContainer = styled.dl`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CategoryBtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
    white-space: nowrap;
`;

const Category01 = styled.dt``;
const Category02 = styled.dt``;
const Category03 = styled.dt``;

const BtnTab = styled.button<BtnTabProps>`
    border: none;
    border-radius: 10px;
    padding: 6px 20px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

    // 탭 클릭 시
    background-color: ${(props) => (props.isActive ? '#666' : '#f4f4f4')};
    color: ${(props) => (props.isActive ? '#fff' : '#000')};

    &:hover {
        animation: shake 0.3s;
        animation-iteration-count: 1;
    }
`;

const TabSectionList = styled.dd`
    position: relative;

    ul.section-content {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 25px;
        min-width: max-content;
    }

    ul.section-content.one .thumb img {
        width: 80%;
        height: 80%;
        margin: 5px;
    }

    ul.section-content.two .thumb .first-img {
        width: 65%;
        height: 100%;
    }

    ul.section-content.two .thumb .second-img {
        width: 50%;
        height: 100%;
    }

    ul.section-content.three .thumb .first-img {
        width: 90%;
        height: 100%;
    }

    ul.section-content.three .thumb .second-img {
        width: 100%;
        height: 80%;
    }

    li {
        width: 300px;
        height: 300px;
        margin: 0 50px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        border-radius: 15px;
        overflow: hidden;
        background-color: #fff;
    }

    .thumb {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 180px;
        margin: 0 auto;
        text-align: center;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }

    .thumb img {
        width: 100%;
        height: 100%;
    }

    .content {
        padding: 12px;
    }

    .content .title {
        margin-bottom: 10px;
    }
`;
export default MainPage;
