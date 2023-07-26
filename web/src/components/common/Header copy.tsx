import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };
    return (
        <div className="header-inn">
            <div className="top-bar">
                <div className="login-section">
                    <Link to="/login" id="header-btn-login" className="btn btn-login-link">로그인</Link>
                    <span>|</span>
                    <Link to="/signin" id="header-btn-signin" className="btn btn-signin-link">회원가입</Link>
                </div>
                <div className="icon-section">
                    <ul>
                        <li>
                            <span className="blind">알림창</span>
                            <button className="btn bell" onClick={handleOpenPopup}><i className="fas fa-bell"></i></button>
                        </li>
                        <li>
                            <span className="blind">DM</span>
                            <Link to="/" className="btn dm"><i className="fas fa-comment"></i></Link>
                        </li>
                        <li>
                            <span className="blind">즐겨찾기</span>
                            <Link to="/" className="btn like-page"><i className="fas fa-bookmark"></i></Link>
                        </li>
                    </ul>
                    {isPopupOpen && (
                    <div className="popup">
                        <h3 className="pop-bell-title">알림창</h3>
                        {/* 알림 리스트 임시 */}
                        {/* <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul> */}
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, accusantium.</p>
                        <button onClick={handleClosePopup}>
                            <span className="blind">닫기</span>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
                </div>
            </div>

            <div className="header-main-bar">
                <h1 className="logo">
                    <Link to="/"><img src="" alt="logo" /></Link>
                </h1>

                <nav className="nav">
                    <button type="button" className="btn btn-menu">
                        <strong className="blind">메뉴 오픈</strong>
                        <span className="open">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                    </button>
                    <ul className="menu">
                        <li>
                            <p className="menu-title">운동 정보</p>
                            <ul>
                                <li><Link to="/">운동 정보</Link></li>
                            </ul>
                        </li>
                        <li>
                            <p className="menu-title">운동 메이트</p>
                            <ul>
                                <li><Link to="/">운동 메이트</Link></li>
                            </ul>
                        </li>
                        <li>
                            <p className="menu-title">커뮤니티</p>
                            <ul>
                                <li><Link to="/">커뮤니티</Link></li>
                            </ul>
                        </li>
                        <li>
                            <p className="menu-title">마이 페이지</p>
                            <ul>
                                <li><Link to="/">마이 페이지</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default Header;
