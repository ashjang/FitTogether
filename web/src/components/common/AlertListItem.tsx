import React, { useEffect, useState } from 'react';
// import { EventSourcePolyfill } from 'event-source-polyfill';
import styled from '@emotion/styled';

import MateRequest from './MateRequest';
import { useNavigate } from 'react-router-dom';

interface AlertListItemProps {
    alerts: Array<{
        message: string;
        notificationId: number;
        notificationType: string;
        read: boolean;
        sender: string;
        url: string;
    }>;
}

const AlertListItem: React.FC<AlertListItemProps> = ({ alerts }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [fetchedAlerts, setFetchedAlerts] = useState([]);
    const [senderNickname, setSenderNickname] = useState('');
    // const [realtimeAlerts, setRealtimeAlerts] = useState([]);
    // const [clickedAlert, setClickedAlert] = useState(null);

    // const EventSource = EventSourcePolyfill;
    // const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

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

    // useEffect(() => {
    //     const eventSource = new EventSource(`/api/notification/subscribe`, {
    //         headers: {
    //             'X-AUTH-TOKEN': token,
    //         },
    //     });

    //     eventSource.addEventListener('data', function (event) {
    //         const newAlert = JSON.parse(event.data);
    //         setRealtimeAlerts((prevRealtimeAlerts) => [newAlert, ...prevRealtimeAlerts]);
    //     });

    //     return () => {
    //         eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 닫기
    //     };
    // }, [realtimeAlerts]);

    // const handleAlertClick = (event) => {
    //     console.log(event);
    //     const postIdPattern = /\/posts\/(\d+)/;
    //     const match = alerts.url.match(postIdPattern);

    //     if (match) {
    //         const postId = match[1];
    //         const processedUrl = `/posts/${postId}`;
    //         navigate(processedUrl);
    //         setShowPopup(false);
    //     } else {
    //         // postIdPattern이 유효하지 않을 경우 팝업 열기
    //         setShowPopup(true);
    //     }
    // };

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
            navigate(processedUrl);
            setShowPopup(false);
        }
    };

    return (
        <AlertListItemBox>
            {[...alerts, ...fetchedAlerts].map((alert, index) => (
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
