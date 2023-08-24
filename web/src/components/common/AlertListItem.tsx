import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
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
    }>; // alerts 배열의 타입에 맞게 수정
}

const AlertListItem: React.FC<AlertListItemProps> = ({ alerts }) => {
    const [showPopup, setShowPopup] = useState(false);
    // const [fetchedAlerts, setFetchedAlerts] = useState([]);
    const [realtimeAlerts, setRealtimeAlerts] = useState([]);

    const EventSource = EventSourcePolyfill;
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log('useEffect is running');
    //     // 알림 목록을 가져오는 GET 요청을 보내고 fetchedAlerts 상태를 업데이트
    //     const token = sessionStorage.getItem('token');
    //     if (token) {
    //         fetch('/api/notification', {
    //             headers: {
    //                 'X-AUTH-TOKEN': token,
    //             },
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 setFetchedAlerts(data);
    //                 console.log(data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //     }
    // }, []);

    useEffect(() => {
        const eventSource = new EventSource(`/api/notification/subscribe`, {
            headers: {
                'X-AUTH-TOKEN': token,
            },
        });

        eventSource.addEventListener('data', function (event) {
            const newAlert = JSON.parse(event.data);
            setRealtimeAlerts((prevRealtimeAlerts) => [newAlert, ...prevRealtimeAlerts]);
        });

        return () => {
            eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 닫기
        };
    }, [realtimeAlerts]);

    // console.log(alerts);

    const handleAlertClick = (url) => {
        const postIdPattern = /\/posts\/(\d+)/;
        const match = url.match(postIdPattern);

        if (match) {
            const postId = match[1];
            const processedUrl = `/posts/${postId}`;
            navigate(processedUrl);
            setShowPopup(false);
        } else {
            console.log('Invalid URL format');
        }
    };

    // const handleListItemClick = () => {
    //     setShowPopup(!showPopup);
    // };

    return (
        <AlertListItemBox>
            {[...alerts, ...realtimeAlerts].map((alert, index) => (
                <ListItem key={index} onClick={() => handleAlertClick(alert.url)}>
                    {alert.message}
                </ListItem>
            ))}
            {showPopup && <MateRequest onClose={() => setShowPopup(false)} />}
        </AlertListItemBox>
        // <AlertListItemBox>
        //     {showPopup && <MateRequest onClose={() => setShowPopup(false)} />}
        // </AlertListItemBox>
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
