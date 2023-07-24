/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// import { useState } from 'react';
import { Link } from 'react-router-dom';

// import FooterLogoImg from "./../../assets/logo-footer.png";

function Footer() {
    return (
        <div className="footer-inn" css={footerInn}>
            <div className="footer-main-bar">
                <FooterLogo className="logo">
                    <Link to="/">
                        <span>FooterLogo</span>
                        {/* <img src={FooterLogoImg} alt="logo" css={imgFooterLogo}/> */}
                    </Link>
                </FooterLogo>
                <FooterInfo className="footer-info">
                    <FooterInfoLeft className="company-info-left">
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
                                    <li className="bar">
                                        <span>|</span>
                                    </li>
                                    <li className="fax">
                                        <i className="fa-solid fa-fax"></i>
                                        <p className="txt">031-000-0000</p>
                                    </li>
                                    <li className="bar">
                                        <span>|</span>
                                    </li>
                                    <li className="service">
                                        <i className="fa-solid fa-headset"></i>
                                        <p className="txt">오전 9:30 ~ 오후 18:30</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </FooterInfoLeft>
                    <FooterInfoRight className="company-info-right">
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
                                    <li className="bar">
                                        <span >|</span>
                                    </li>
                                    <li>
                                        <p className="txt">Mong All rights reserved.</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </FooterInfoRight>
                </FooterInfo>
            </div>
        </div>
    );
}

// footerInn
const footerInn = css`
    position: relative;
    max-width: 1440px;
    height: 100px;
    margin: 0 auto;
    padding: 10px 60px;
`;
const FooterLogo = styled.h1`
    margin-bottom: 10px;
`;
// const imgFooterLogo = css`
//     width: 261px;
// `;

const FooterInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const FooterInfoLeft =styled.div`
    margin-right: 150px;
    
    ul li.tel ul {
        display: flex;
        align-items: center;  
    }
    ul li.tel ul li.bar span {
        display: inline-block;
        margin: 0 10px
    }
`;

const FooterInfoRight = styled.div`
    ul li.copyright ul {
        display: flex;
        align-items: center;        
    }    
    ul li.copyright ul li.bar span {
        display: inline-block;
        margin: 0 10px
    }

`;

export default Footer;