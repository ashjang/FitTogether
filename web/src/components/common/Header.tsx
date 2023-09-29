/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { canEditInfo, loggedInState, signInInfo } from '../../recoil/AuthState/atoms';

import AlertList from './AlertList';
import LogoImg from './../../assets/logo.png';

import { currentPageState } from '../../recoil/posts/atoms';
import {
    categoryFilterState,
    keywordFilterState,
    hashtagFilterState,
    keywordItemState,
    hashtagItemState,
} from '../../recoil/posts/atoms';
import { categoryRecoil } from '../../recoil/video/atoms';

import axios from 'axios';

// headerMainBar
function Header() {
    const loggedIn = useRecoilValue(loggedInState); // loggedInState 상태 가져오기
    const setLoggedIn = useSetRecoilState(loggedInState); // 상태를 업데이트하는 setLoggedIn 함수 가져오기
    const setcanEditInfo = useSetRecoilState(canEditInfo);
    const setSignInInfo = useSetRecoilState(signInInfo);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const bellPopupRef = useRef<HTMLDivElement | null>(null); //알림창

    const [isScrolled, setScrolled] = useState(false); // 스크롤 내릴때 배경색

    const setCurrentPage = useSetRecoilState(currentPageState);
    const setCategoryFilter = useSetRecoilState<string>(categoryFilterState);
    const setKeywordFilter = useSetRecoilState<string>(keywordFilterState);
    const setHashtagFilter = useSetRecoilState<string>(hashtagFilterState);
    const setVideoCategory = useSetRecoilState<string>(categoryRecoil);

    const setKeywordItem = useSetRecoilState<string>(keywordItemState);
    const setHashtagItem = useSetRecoilState<string>(hashtagItemState);

    const handleScroll = () => {
        const isHeaderScrolled = window.scrollY > 0;
        setScrolled(isHeaderScrolled);
    };

    // icon click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (bellPopupRef.current && !bellPopupRef.current.contains(event.target as Node)) {
                setPopupOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isPopupOpen, bellPopupRef]);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    // 로그아웃일때 로직
    const handleSignOut = async () => {
        const token = sessionStorage.getItem('token');

        if (token) {
            try {
                // 로그아웃 요청 보내기
                const response = await axios.post('/api/users/signout', null, {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                });

                if (response.status === 200) {
                    // 서버에서 로그아웃 처리 완료한 경우
                    console.log('로그아웃 완료');
                }
            } catch (error) {
                console.error('로그아웃 처리 중 오류:', error);
            }

            // 세션 스토리지에서 토큰 삭제
            sessionStorage.removeItem('token');

            // recoil 상태 변경
            setLoggedIn(false);
            setcanEditInfo(false);
            setSignInInfo('');
            window.location.reload();
        }
    };

    // 헤더의 커뮤니티 탭을 눌렀을때는 필터링되지 않은 초기의 postList가 출력되게 하기 위한 함수
    const getInitialPostListData = async () => {
        try {
            setCurrentPage(1);
            setCategoryFilter('');
            setKeywordFilter('');
            setHashtagFilter('');
            setKeywordItem('');
            setHashtagItem('');
        } catch (error) {
            console.error;
        }
    };

    return (
        <HeaderWrap css={[isScrolled && scrolledHeader]}>
            <div css={headerInn}>
                <div css={topBar}>
                    <Logo>
                        <Link to="/">
                            <span className="blind">FitTogether</span>
                            <img src={LogoImg} alt="logo" css={imgLogo} />
                        </Link>
                    </Logo>
                    <IconSection>
                        <IconList>
                            {loggedIn ? (
                                // 로그인 상태일때
                                <>
                                    <li>
                                        <span className="blind">알림창</span>
                                        <BellBtn onClick={handleOpenPopup}>
                                            <FontAwesomeIcon icon={faBell} />
                                        </BellBtn>
                                    </li>
                                    <li>
                                        <span className="blind">DM</span>
                                        <DmBtn to="/messenger">
                                            <FontAwesomeIcon icon={faComment} />
                                        </DmBtn>
                                    </li>
                                    <li>
                                        <span className="blind">즐겨찾기</span>
                                        <LikeBtn to="/bookmark">
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </LikeBtn>
                                    </li>
                                    <li>
                                        <SignOutLink onClick={handleSignOut}>로그아웃</SignOutLink>
                                    </li>
                                </>
                            ) : (
                                //로그인 전 상태
                                <div css={signinSection}>
                                    <SignInLink className="txt" to="/signin">
                                        로그인
                                    </SignInLink>
                                    <span>|</span>
                                    <SignUpLink className="txt" to="/signup">
                                        회원가입
                                    </SignUpLink>
                                </div>
                            )}
                        </IconList>
                        {loggedIn && isPopupOpen && (
                            <BellPop className="popup" ref={bellPopupRef}>
                                <AlertList />
                            </BellPop>
                        )}
                    </IconSection>
                </div>

                <div css={headerMainBar}>
                    <nav>
                        <MenuBtn type="button">
                            <strong className="blind">메뉴 오픈</strong>
                            <span className="open">
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                        </MenuBtn>
                        <ul css={Menu}>
                            <li css={menuLi}>
                                <Link
                                    to="/exerciseInfo"
                                    onClick={() => setVideoCategory('running')}
                                >
                                    <span className="txt">운동 정보</span>
                                </Link>
                            </li>
                            <li css={menuLi}>
                                <Link to="/findMate">
                                    <span className="txt">운동 메이트 찾기</span>
                                </Link>
                            </li>
                            <li css={menuLi}>
                                <Link to="/posts" onClick={() => getInitialPostListData()}>
                                    <span className="txt">커뮤니티</span>
                                </Link>
                            </li>
                            <li css={menuLi}>
                                <Link to="/mypage">
                                    <span className="txt">마이 페이지</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </HeaderWrap>
    );
}

// emotion css style
const HeaderWrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 30;
    background-color: #f7f7f7;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);

    .txt {
        white-space: nowrap;
    }
`;

// headerInn
const headerInn = css`
    max-width: 1440px;
    height: 110px;
    margin: 0 auto;
    padding: 10px 60px;
`;

const scrolledHeader = css``;

// topBar
const topBar = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
const Logo = styled.h1`
    flex: 3;
`;
const imgLogo = css`
    width: 250px;
`;

const IconSection = styled.div`
    position: relative;
`;
const IconList = styled.ul`
    display: flex;
    justify-content: space-between;

    li {
        padding: 0 5px;
    }
`;

const BellBtn = styled.button`
    border: none;
    background: none;
`;
const DmBtn = styled(Link)``;
const LikeBtn = styled(Link)``;

const signinSection = css`
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-left: 10px;

    span {
        display: inline-block;
        margin: 0 5px;
    }
`;
const SignInLink = styled(Link)`
    display: block;
`;
const SignUpLink = styled(Link)`
    display: block;
`;
const SignOutLink = styled.button`
    border: none;
    background: none;
    margin-left: 10px;
    white-space: nowrap;
`;
// bellBtn 클릭 시 팝업
const BellPop = styled.div`
    position: absolute;
    right: 100px;
    top: 40px;
`;

// headerMainBar
const headerMainBar = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const Menu = css`
    display: flex;
    align-items: center;
`;
const menuLi = css`
    margin-bottom: 15px;

    & a {
        display: inline-block;
        font-weight: 500;
        padding: 5px 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    & a:hover {
        display: inline-block;
        color: #fff;
        background-color: #7f5539;
        transition: all 0.3s;
    }
`;
const MenuBtn = styled.button`
    // display: none;
    opacity: 0;
    position: absolute;
    right: 0;
    background: none;
    border: 0;
    width: 70px;
`;

export default Header;
