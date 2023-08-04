import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

// interface ScrollTopButtonProps {}

const ScrollTopButton: React.FC = () => {
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTopButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showScrollTopButton && (
                <ButtonWrapper onClick={handleScrollTopButtonClick}>
                    <i className="fa-solid fa-circle-up"></i>
                </ButtonWrapper>
            )}
        </>
    );
};

const ButtonWrapper = styled.button`
    position: fixed;
    right: 20px;
    bottom: 50px;
    width: 35px;
    height: 35px;
    font-size: 35px;
    border: none;
    border-radius: 50%;
    transition: opacity 0.3s, visibility 0.3s;
    background: none;
    z-index: 101;
    cursor: pointer;
    color: #7f5539;
`;

export default ScrollTopButton;
