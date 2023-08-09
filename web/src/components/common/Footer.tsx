/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faPhoneVolume,
    faFax,
    faHeadset,
    faCopyright,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import FooterLogoImg from './../../assets/logo-footer.png';

function Footer() {
    return (
        <FooterInn>
            <FooterMainBar>
                <FooterLogo>
                    <Link to="/">
                        <span className="blind">FitTogether</span>
                        <img src={FooterLogoImg} alt="logo" css={imgFooterLogo} />
                    </Link>
                </FooterLogo>
                <FooterInfo>
                    <FooterInfoLeft>
                        <ul>
                            <li className="address">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p className="txt">경기도 성남시 핏투게더빌딩 A동 9999호</p>
                            </li>
                            <li className="tel">
                                <ul>
                                    <li className="phone">
                                        <FontAwesomeIcon icon={faPhoneVolume} />
                                        <p className="txt">031-000-0000</p>
                                    </li>
                                    <li className="bar">
                                        <span>|</span>
                                    </li>
                                    <li className="fax">
                                        <FontAwesomeIcon icon={faFax} />
                                        <p className="txt">031-000-0000</p>
                                    </li>
                                    <li className="bar">
                                        <span>|</span>
                                    </li>
                                    <li className="service">
                                        <FontAwesomeIcon icon={faHeadset} />
                                        <p className="txt">오전 9:30 ~ 오후 18:30</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </FooterInfoLeft>
                    <FooterInfoRight>
                        <ul>
                            <li className="company-number">
                                <p className="txt">등록번호 : 000-00-00000</p>
                            </li>
                            <li className="copyright">
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCopyright} />
                                        <p className="txt">Copyright 2023</p>
                                    </li>
                                    <li className="bar">
                                        <span>|</span>
                                    </li>
                                    <li>
                                        <p className="txt">Mong All rights reserved.</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </FooterInfoRight>
                </FooterInfo>
            </FooterMainBar>
        </FooterInn>
    );
}

// footerInn
const FooterInn = styled.div`
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background-color: #263238;
`;
const FooterMainBar = styled.div`
    position: relative;
    bottom: 0;
    max-width: 1440px;
    margin: 100px auto 0;
    padding: 20px 60px;
`;
const FooterLogo = styled.h1`
    margin-bottom: 10px;
`;
const imgFooterLogo = css`
    width: 250px;
`;

const FooterInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const FooterInfoLeft = styled.div`
    margin-right: 150px;
    color: #fff;

    .address {
        margin-bottom: 10px;
    }
    .address,
    .tel ul,
    .phone,
    .fax,
    .service {
        display: flex;
        align-items: center;
    }
    .txt {
        margin-left: 10px;
    }
    .tel ul li.bar span {
        display: inline-block;
        margin: 0 10px;
    }
`;

const FooterInfoRight = styled.div`
    color: #fff;

    .company-number {
        margin-bottom: 10px;
    }
    .copyright ul,
    .copyright ul li:first-of-type {
        display: flex;
        align-items: center;
    }
    .copyright ul li:first-of-type .txt {
        margin-left: 10px;
    }
    .copyright ul li.bar span {
        display: inline-block;
        margin: 0 10px;
    }
`;

export default Footer;
