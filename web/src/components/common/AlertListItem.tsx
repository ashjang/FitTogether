import React, { useState } from 'react';
import styled from '@emotion/styled';

import MateRequest from './MateRequest';

const AlertListItem: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleListItemClick = () => {
        setShowPopup(!showPopup);
        // console.log('click');
    };

    return (
        <AlertListItemBox>
            <ListItem onClick={handleListItemClick}>새로운 메이트 요청이 도착했습니다.</ListItem>
            <ListItem>새로운 메이트 요청이 도착했습니다.</ListItem>
            <ListItem>새로운 메이트 요청이 도착했습니다.</ListItem>
            <ListItem>새로운 메이트 요청이 도착했습니다.</ListItem>
            <ListItem>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus quidem et
                asperiores odit cupiditate unde nisi ad, nostrum qui soluta reprehenderit! Impedit
                dolorem ad veniam consectetur similique at beatae architecto.
            </ListItem>
            <ListItem>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus quidem et
                asperiores odit cupiditate unde nisi ad, nostrum qui soluta reprehenderit! Impedit
                dolorem ad veniam consectetur similique at beatae architecto.
            </ListItem>
            {showPopup && <MateRequest onClose={() => setShowPopup(false)} />}
        </AlertListItemBox>
    );
};

const AlertListItemBox = styled.div``;

const ListItem = styled.div`
    padding: 10px;
    border-bottom: 0.5px solid #d2d2d2;
    cursor: pointer;
`;

export default AlertListItem;
