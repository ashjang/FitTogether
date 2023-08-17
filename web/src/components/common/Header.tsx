/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // faSun,
    // faMoon,
    faUserGroup,
    faBell,
    faComment,
    faBookmark,
    faBars,
    // faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/AuthState/atoms';

import AlertList from './AlertList';
import MateList from './MateList';
import LogoImg from './../../assets/logo.png';

// interface Props {}
// type HeaderProps = {
//     onToggleDarkMode: () => void;
// };

// headerMainBar
function Header() {
    // function Header({ onToggleDarkMode }: HeaderProps) {
    const loggedIn = useRecoilValue(loggedInState); // loggedInState 상태 가져오기
    const setLoggedIn = useSetRecoilState(loggedInState); // 상태를 업데이트하는 setLoggedIn 함수 가져오기

    // const [isDarkMode, setDarkMode] = useState(false);
    const [isMateListOpen, setIsMateListOpen] = useState(false); // 메이트리스트창

    const [isPopupOpen, setPopupOpen] = useState(false);
    const bellPopupRef = useRef<HTMLDivElement | null>(null); //알림창

    const [isScrolled, setScrolled] = useState(false); // 스크롤 내릴때 배경색

    // dark light Mode
    // const handleToggleDarkMode = () => {
    //     setDarkMode((prevMode) => !prevMode);
    //     onToggleDarkMode();
    // };

    // 스크롤 내렸을때 배경색 #fff
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
    // const handleClosePopup = () => {
    //     setPopupOpen(false);
    // };

    //운동메이트 리스트
    const handleShowMateListClick = () => {
        setIsMateListOpen(true);
    };
    const handleCloseMateList = () => {
        setIsMateListOpen(false);
    };

    // 로그아웃일때 로직
    const handleSignOut = () => {
        setLoggedIn(false);
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
                            {/* <ThemeLi isDarkMode={isDarkMode}>
                                <span className="blind">다크 라이트 스위치</span>
                                <ThemeBtn onClick={handleToggleDarkMode} isDarkMode={isDarkMode}>
                                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                                </ThemeBtn>
                            </ThemeLi> */}
                            {loggedIn ? (
                                // 로그인 상태일때
                                <>
                                    <li>
                                        <MateBtn onClick={handleShowMateListClick}>
                                            <span className="blind">운동 메이트 리스트</span>
                                            <FontAwesomeIcon icon={faUserGroup} />
                                        </MateBtn>
                                        {isMateListOpen && (
                                            <MateList isOpen={true} onClose={handleCloseMateList} />
                                        )}
                                    </li>
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
                                    <SignInLink to="/signin">로그인</SignInLink>
                                    <span>|</span>
                                    <SignUpLink to="/signup">회원가입</SignUpLink>
                                </div>
                            )}
                        </IconList>
                        {loggedIn && isPopupOpen && (
                            <BellPop className="popup" ref={bellPopupRef}>
                                <AlertList />
                                {/* <BellPopBtn onClick={handleClosePopup}>
                                    <span className="blind">닫기</span>
                                    <FontAwesomeIcon icon={faTimes} />
                                </BellPopBtn> */}
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
                                <Link to="/exerciseInfo">
                                    <span>운동 정보</span>
                                </Link>
                            </li>
                            <li css={menuLi}>
                                <Link to="/findMate">
                                    <span>운동 메이트 찾기</span>
                                </Link>
                            </li>
                            <li css={menuLi}>
                                <Link to="/posts">
                                    <span>커뮤니티</span>
                                </Link>
                            </li>
                            <li css={menuLi}>
                                <Link to="/mypage">
                                    <span>마이 페이지</span>
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
    left: 0;
    right: 0;
    top: 0;
    z-index: 30;
`;
// headerInn
const headerInn = css`
    max-width: 1440px;
    height: 110px;
    margin: 0 auto;
    padding: 10px 60px;
`;
const scrolledHeader = css`
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

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
const MateBtn = styled.button`
    border: none;
    background: none;
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
`;
// bellBtn 클릭 시 팝업
const BellPop = styled.div`
    position: absolute;
    right: 100px;
    top: 40px;
`;

// const BellPopBtn = styled.button`
//     position: absolute;
//     top: 16px;
//     right: -100px;
//     width: 30px;
//     height: 30px;
//     font-size: 20px;
//     border: none;
//     background: none;
// `;

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
    &:first-of-type {
        // padding: 0 30px;
    }

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

//dark mode
// const ThemeLi = styled.li<{ isDarkMode: boolean }>`
//     position: relative;
//     width: 50px;
//     margin-right: 10px;
//     border-radius: 20px;
//     box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
//     background-color: ${(props) => (props.isDarkMode ? '#fff' : '#181f38')};
// `;
// const ThemeBtn = styled.button<{ isDarkMode: boolean }>`
//     position: absolute;
//     top: 1px;
//     right: 5px;
//     text-align: center;
//     padding: 0 5px;
//     border: none;
//     background: none;
//     transition: transform 0.3s ease;

//     /* 다크모드일 때 버튼 위치 */
//     transform: ${(props) => (props.isDarkMode ? 'translateX(-18px)' : 'translateX(3px)')};
//     /* 다크모드일 때 아이콘 색상 변경 */
//     color: ${(props) => (props.isDarkMode ? '#ffdd55' : '#ffdd55')};
// `;

export default Header;
