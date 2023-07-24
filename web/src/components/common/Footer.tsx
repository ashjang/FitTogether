/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import styled from '@emotion/styled';

// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// import LogoImg from "./../../assets/logo-footer.png";

function Footer() {
    return (
        <div className="footer-inn">
            <div className="footer-main-bar">
                <h1 className="logo">
                    <a href="../index.html"><img src="../assets/image/logo_footer.png" alt="logo_footer" /></a>
                </h1>
                <div className="footer-info">
                    <div className="company-info-left">
                        <ul>
                            <li className="address">
                                <i className="fa-solid fa-location-dot"></i>
                                <p className="txt">경기도 성남시 핏투게더빌딩 A동 9999호</p>
                            </li>
                            <li className="tel">
                                <ul>
                                    <li className="phone">
                                        <i className="fa-solid fa-phone-volume"></i>
                                        <p className="txt">031-000-0000</p>
                                    </li>
                                    <li>
                                        <span className="bar">|</span>
                                    </li>
                                    <li className="fax">
                                        <i className="fa-solid fa-fax"></i>
                                        <p className="txt">031-000-0000</p>
                                    </li>
                                    <li>
                                        <span className="bar">|</span>
                                    </li>
                                    <li className="service">
                                        <i className="fa-solid fa-headset"></i>
                                        <p className="txt">오전 9:30 ~ 오후 18:30</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="company-info-right">
                        <ul>
                            <li>
                                <p className="txt">등록번호 : 000-00-00000</p>
                            </li>
                            <li className="copyright">
                                <ul>
                                    <li>
                                        <i className="fa-regular fa-copyright"></i>
                                        <p className="txt">Copyright 2023</p>
                                    </li>
                                    <li>
                                        <span className="bar">|</span>
                                    </li>
                                    <li>
                                        <p className="txt">Mong All rights reserved.</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
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

const imgLogoFooter = css`
    width: 261px;
`;







export default Footer;
