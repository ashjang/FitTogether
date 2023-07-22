function Header() {
    return (
        <div className="header-inn">
            <div className="top-bar">
                <div className="login-section">
                    <a href="#" id="header-btn-login" className="btn btn-login-link">로그인</a>
                    <span>|</span>
                    <a href="#" id="header-btn-signin" className="btn btn-signin-link">회원가입</a>
                </div>
            </div>

            <div className="header-main-bar">
                <h1 className="logo">
                    {/* <a href="/"><img src="" alt="logo" /></a> */}
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
                                <li><a href="#">운동 정보</a></li>
                            </ul>
                        </li>
                        <li>
                            <p className="menu-title">운동 메이트</p>
                            <ul>
                                <li><a href="#">운동 메이트</a></li>
                            </ul>
                        </li>
                        <li>
                            <p className="menu-title">커뮤니티</p>
                            <ul>
                                <li><a href="#">커뮤니티</a></li>
                            </ul>
                        </li>
                        <li>
                            <p className="menu-title">마이 페이지</p>
                            <ul>
                                <li><a href="#">마이 페이지</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    )
}

export default Header;
