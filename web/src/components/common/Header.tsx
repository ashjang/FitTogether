/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// import AlertList from 'AlertList'
import LogoImg from './../../assets/logo.png';

// headerMainBar
function Header() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const bellPopupRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellPopupRef.current && !bellPopupRef.current.contains(event.target as Node)) {
        setPopupOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen, bellPopupRef]);

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
          <Link to="/">
            <span className="blind">FitTogether</span>
            <img src={LogoImg} alt="logo" css={imgLogo} />
          </Link>
        </Logo>
        <IconSection className="icon-section">
          <IconList className="icon-list">
            <ThemeLi isDarkMode={isDarkMode}>
              <span className="blind">다크 라이트 스위치</span>
              <ThemeBtn className="btn theme" onClick={handleToggleDarkMode} isDarkMode={isDarkMode}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </ThemeBtn>
            </ThemeLi>
            <li>
              <span className="blind">알림창</span>
              <BellBtn className="btn bell" onClick={handleOpenPopup}>
                <i className="fas fa-bell"></i>
              </BellBtn>
            </li>
            <li>
              <span className="blind">DM</span>
              <DmBtn to="/" className="btn dm">
                <i className="fas fa-comment"></i>
              </DmBtn>
            </li>
            <li>
              <span className="blind">즐겨찾기</span>
              <LikeBtn to="/" className="btn like-page">
                <i className="fas fa-bookmark"></i>
              </LikeBtn>
            </li>
          </IconList>
          {isPopupOpen && (
            <BellPop className="popup" ref={bellPopupRef}>
              <h3 className="pop-bell-title">알림창</h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quaerat, accusantium.
              </p>
              <button onClick={handleClosePopup}>
                <span className="blind">닫기</span>
                <i className="fas fa-times"></i>
              </button>
            </BellPop>
          )}
          {/* {isPopupOpen && (
            <BellPop className="popup">
              <AlertList />
            </BellPop>
          )} */}
        </IconSection>
        <div className="login-section" css={loginSection}>
          <LoginLink
            to="/login"
            id="header-btn-login"
            className="btn btn-login-link"
          >
            로그인
          </LoginLink>
          <span>|</span>
          <SignInLink
            to="/signin"
            id="header-btn-signin"
            className="btn btn-signin-link"
          >
            회원가입
          </SignInLink>
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
              <Link to="/exerciseInfo">
                <span>운동 정보</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

// emotion css style

// headerInn
const headerInn = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 1440px;
  height: 110px;
  margin: 0 auto;
  padding: 10px 60px;
  z-index: 2;
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
    padding: 0 5px
  }
`;
const BellBtn = styled.button`
  border: none;
  background: none;
`;
const DmBtn = styled(Link)``;
const LikeBtn = styled(Link)``;

const loginSection = css`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-left: 10px;

  span {
    display: inline-block;
    margin: 0 5px
  }
`;
const LoginLink = styled(Link)`
  display: block;
`;
const SignInLink = styled(Link)`
  display: block;
`;

// bellBtn 클릭 시 팝업
const BellPop = styled.div`
  position: absolute;
  right: 10px;
  top: 40px;
  width: 300px;
  height: 500px;
  padding: 15px;
  border-radius: 10px;
  background-color: rgb(243, 218, 209);
  z-index: 5;

  &::before {
    position: absolute;
    left: 85%;
    top: -10px;
    transform: translateX(-85%);
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgb(243, 218, 209);
    background-color: red;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    font-size: 20px;
    border: none;
    background: none;    
  }
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
      background-color: #7F5539;
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
const ThemeLi = styled.li<{ isDarkMode: boolean }>`  
  position: relative;
  width: 50px;
  margin-right: 10px;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => (props.isDarkMode ? '#fff' : '#181f38')};
`;
const ThemeBtn = styled.button<{ isDarkMode: boolean }>`  
  position: absolute;
  top:1px;
  right:5px;
  text-align: center;
  padding: 0 5px;
  border: none;
  background: none;
  transition: transform 0.3s ease;
  
  /* 다크모드일 때 버튼 위치 */
  transform: ${(props) => (props.isDarkMode ? 'translateX(-18px)' : 'translateX(3px)')};
  /* 다크모드일 때 아이콘 색상 변경 */
  color: ${(props) => (props.isDarkMode ? '#ffdd55' : '#ffdd55')};
`;

export default Header;
