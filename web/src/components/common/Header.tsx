/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import LogoImg from "./../../assets/logo.png";

// headerMainBar
function Header() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div className="header-inn" css={headerInn}>
            <div className="top-bar" css={topBar}>
                <Logo className="logo">
                    <Link to="/"><img src={LogoImg} alt="logo" css={imgLogo}/></Link>
                </Logo>
                <div className="icon-section">
                    <ul css={iconList}>
                        <li>
                            <span className="blind">알림창</span>
                            <BellBtn className="btn bell" onClick={handleOpenPopup}><i className="fas fa-bell"></i></BellBtn>
                        </li>
                        <li>
                            <span className="blind">DM</span>
                            <DmBtn to="/" className="btn dm"><i className="fas fa-comment"></i></DmBtn>
                        </li>
                        <li>
                            <span className="blind">즐겨찾기</span>
                            <LikeBtn to="/" className="btn like-page"><i className="fas fa-bookmark"></i></LikeBtn>
                        </li>
                    </ul>
                    {isPopupOpen && (
                        <BellPop className="popup">
                            <h3 className="pop-bell-title">알림창</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, accusantium.</p>
                            <button onClick={handleClosePopup}>
                                <span className="blind">닫기</span>
                                <i className="fas fa-times"></i>
                            </button>
                        </BellPop>
                    )}
                </div>
                <div className="login-section" css={loginSection}>
                    <LoginLink to="/login" id="header-btn-login" className="btn btn-login-link">로그인</LoginLink>
                    <span>|</span>
                    <SignInLink to="/signin" id="header-btn-signin" className="btn btn-signin-link">회원가입</SignInLink>
                </div>
            </div>

            <div className="header-main-bar" css={headerMainBar}>
                <nav className="nav">
                    <MenuBtn type="button" className="btn btn-menu">
                        <strong className="blind">메뉴 오픈</strong>
                        <span className="open">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                    </MenuBtn>
                    <ul className="menu" css={Menu}>
                        <li css={menuLi}>
                            <Link to="/"><span>운동 정보</span></Link>
                        </li>
                        <li css={menuLi}>
                            <Link to="/"><span>운동 메이트 찾기</span></Link>
                        </li>
                        <li css={menuLi}>
                            <Link to="/"><span>커뮤니티</span></Link>
                        </li>
                        <li css={menuLi}>
                            <Link to="/"><span>마이 페이지</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

// headerInn
const headerInn = css`
    position: relative;
    max-width: 1440px;
    height: 100px;
    margin: 0 auto;
    padding: 10px 60px;
`;

// topBar
const topBar = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
const Logo = styled.h1`
    flex:3;
`;
const imgLogo = css`
    width: 300px;
`;
const iconList = css`
    display: flex;
    justify-content: space-between;
`;
const BellBtn = styled.button`
    border: none;
`;
const DmBtn = styled(Link)`

`;
const LikeBtn = styled(Link)`

`;


const loginSection = css`
    display: flex;
    justify-content: space-between;
    text-align: center;
`;
const LoginLink = styled(Link)`
    display: block;
    width: 70px;
`;
const SignInLink = styled(Link)`
    display: block;
    width: 70px;
`;
// bellBtn 클릭 시 팝업
const BellPop = styled.div`
    position: absolute;
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
    padding: 0 20px
    &:first-child {
        padding: 0 30px;
    }
`;
const MenuBtn = styled.button`
    // display: none;
    opacity:0;
    position: absolute;
    right: 0;
    background: none;
    border: 0;
    width: 70px;
`;

export default Header;
