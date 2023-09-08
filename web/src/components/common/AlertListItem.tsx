/* eslint-disable @typescript-eslint/no-unsafe-assignment, 
@typescript-eslint/no-unsafe-argument,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-misused-promises,
@typescript-eslint/no-unsafe-call,
@typescript-eslint/restrict-template-expressions */

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import MateRequest from './MateRequest';

const AlertListItem: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [fetchedAlerts, setFetchedAlerts] = useState([]);
    const [senderNickname, setSenderNickname] = useState('');

    useEffect(() => {
        console.log('useEffect is running');
        // 알림 목록을 가져오는 GET 요청을 보내고 fetchedAlerts 상태를 업데이트
        const token = sessionStorage.getItem('token');
        if (token) {
            fetch('/api/notification', {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setFetchedAlerts(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    const handleAlertClick = (alert) => {
        const postIdPattern = /\/posts\/(\d+)/;

        if (alert.notificationType === 'MATCHING') {
            // MATCHING 알림인 경우 MateRequest 팝업 열기
            setShowPopup(true);
            console.log(alert.sender);
            setSenderNickname(alert.sender); // senderNickname 설정
        } else if (alert.url.match(postIdPattern)) {
            // postIdPattern이 유효한 경우 해당 URL로 이동
            const postId = alert.url.match(postIdPattern)[1];
            const processedUrl = `/posts/${postId}`;
            window.location.replace(processedUrl);
            setShowPopup(false);
        }
    };

    return (
        <AlertListItemBox>
            {[...fetchedAlerts].map((alert, index) => (
                <ListItem key={index} onClick={() => handleAlertClick(alert)}>
                    {alert.message}
                </ListItem>
            ))}
            {showPopup && (
                <MateRequest sender={senderNickname} onClose={() => setShowPopup(false)} />
            )}
        </AlertListItemBox>
    );
};

const AlertListItemBox = styled.div``;

const ListItem = styled.div`
    padding: 10px;
    border-bottom: 0.5px solid #d2d2d2;
    cursor: pointer;
    font-size: 1.3rem;
`;

export default AlertListItem;
