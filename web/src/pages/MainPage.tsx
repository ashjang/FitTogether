/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type BtnTabProps = {
    isActive: boolean;
};

const MainPage: React.FC = () => {
    //slide
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = 3;
    const slideDuration = 3000;

    //tab
    const [activeTab, setActiveTab] = useState('동영상');

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
                                {/* <Link
                                    to={`/slide${((activeSlide + 1) % totalSlides) + 1}`}
                                    className="btn btn-more"
                                > */}
                                <Link to="/" className="btn btn-more">
                                    <span>More</span>
                                </Link>
                            </SlideContent>
                        </Slide>
                        <Slide className={`slide ${activeSlide === 1 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">운동메이트 매칭!</h2>
                                <p className="txt">
                                    내 주변에서 함께할
                                    <br />
                                    운동메이트를 찾아보세요 🤼‍♂️
                                </p>
                                {/* <Link
                                    to={`/slide${((activeSlide + 2) % totalSlides) + 1}`}
                                    className="btn btn-more"
                                > */}
                                <Link to="/" className="btn btn-more">
                                    <span>More</span>
                                </Link>
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
                                {/* <Link to={`/slide${activeSlide + 1}`} className="btn btn-more"> */}
                                <Link to="/" className="btn btn-more">
                                    <span>More</span>
                                </Link>
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
                    <dl className="tab-category">
                        <Category01>
                            <BtnTab
                                type="button"
                                className="btn btn-menu"
                                isActive={activeTab === '동영상'}
                                onClick={() => handleTabClick('동영상')}
                            >
                                동영상
                            </BtnTab>
                        </Category01>
                        {activeTab === '동영상' && (
                            <TabSectionList>
                                <div className="link-move">
                                    <Link to="/" className="btn btn-more">
                                        <span>더보기</span>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </Link>
                                </div>
                                <ul className="section-content">
                                    <li>
                                        <div className="thumb">
                                            {/* <img src="" alt="이미지" /> */}
                                        </div>
                                        <div className="content">
                                            <h3 className="title">운동 종류별 영상 시청</h3>
                                            <p className="txt">
                                                러닝, 등산, 헬스 다양한 종목으로 <br />
                                                운동 관련영상들을 시청하세요!
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="thumb">
                                            {/* <img src="" alt="이미지" /> */}
                                        </div>
                                        <div className="content">
                                            <h3 className="title">나만의 플레이리스트</h3>
                                            <p className="txt">
                                                맘에드는 영상들은
                                                <br />
                                                즐겨찾기에 담을 수 있어요 📘
                                            </p>
                                        </div>
                                    </li>
                                    {/* <li>
                                        <div className="thumb">
                                            <img src="" alt="이미지" />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">타이틀 넣기</h3>
                                            <p className="txt">텍스트 넣기</p>
                                        </div>
                                    </li> */}
                                </ul>
                            </TabSectionList>
                        )}

                        <Category02>
                            <BtnTab
                                type="button"
                                className="btn btn-menu"
                                isActive={activeTab === '운동 메이트'}
                                onClick={() => handleTabClick('운동 메이트')}
                            >
                                운동 메이트
                            </BtnTab>
                        </Category02>
                        {activeTab === '운동 메이트' && (
                            <TabSectionList>
                                <div className="link-move">
                                    <Link to="/" className="btn btn-more">
                                        <span>더보기</span>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </Link>
                                </div>
                                <ul className="section-content">
                                    <li>
                                        <div className="thumb">
                                            {/* <img src="" alt="이미지" /> */}
                                        </div>
                                        <div className="content">
                                            <h3 className="title">운동메이트 찾기</h3>
                                            <p className="txt">
                                                지도에서 내 주변 <br />
                                                운동메이트를 찾아보세요
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="thumb">
                                            {/* <img src="" alt="이미지" /> */}
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
                                    {/* <li>
                                        <div className="thumb">
                                            <img src="" alt="이미지" />
                                        </div>
                                        <div className="content">
                                            <h3 className="title">타이틀 넣기</h3>
                                            <p className="txt">텍스트 넣기</p>
                                        </div>
                                    </li> */}
                                </ul>
                            </TabSectionList>
                        )}
                    </dl>
                </MainTabSection>

                {/* <section className="sectionTwo" css={sectionTwo}>
                    <h2 className="main-title">섹션 타이틀 넣기</h2>
                    <div className="content">
                        <div className="inn">
                            <h3 className="title">타이틀 내용 넣기</h3>
                            <p className="txt">
                                내용 넣기
                                <br />
                                내용 미정
                            </p>
                            <Link to="/" className="btn btn-more">
                                <span>More</span>
                            </Link>
                        </div>
                    </div>
                </section> */}
            </Container>
        </>
    );
};

// emotion css style
const Container = styled.div`
    position: relative;
    margin-top: 110px;
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
    .btn-more {
        display: inline-block;
        padding: 8px 20px;
        margin-top: 20px;
        color: #000;
        font-size: 18px;
        font-weight: 700;
        border-radius: 7px;
        background-color: #fff;
    }
    .btn-more:hover {
        color: #fff;
        background-color: #7f5539;
        transition: all 0.3s;
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
    margin: 60px auto 0;
    padding: 24px;

    .main-title {
        text-align: center;
        margin-bottom: 20px;
    }
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;
const Category01 = styled.dt`
    position: absolute;
    top: 80px;
    left: 43%;
    transform: translateX(-43%);
`;
const Category02 = styled.dt`
    position: absolute;
    top: 80px;
    right: 43%;
    transform: translateX(43%);
`;
const BtnTab = styled.button<BtnTabProps>`
    border: none;
    border-radius: 5px;
    padding: 6px 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

    // 탭 클릭 시
    background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
    color: ${(props) => (props.isActive ? '#fff' : '#000')};
`;
const TabSectionList = styled.dd`
    position: relative;

    .link-move {
        position: absolute;
        top: -50px;
        right: 100px;
    }
    ul.section-content {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 120px;
    }
    li {
        width: 260px;
        height: 300px;
        margin: 0 50px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        overflow: hidden;
        background-color: #fff;
    }
    .thumb {
        width: 280px;
        height: 180px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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

// const sectionTwo = css`
//     position: relative;
//     max-width: 1440px;
//     margin: 60px auto 0;
//     padding: 24px;

//     .main-title {
//         text-align: center;
//         margin-bottom: 20px;
//     }
//     box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
// `;
export default MainPage;
