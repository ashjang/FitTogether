import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import MateRequest from './MateRequest';
import { useNavigate } from 'react-router-dom';

interface AlertListItemProps {
    alerts: Array<{ message: string }>; // alerts 배열의 타입에 맞게 수정
}

const AlertListItem: React.FC<AlertListItemProps> = ({ alerts }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [fetchedAlerts, setFetchedAlerts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
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

    console.log(alerts);

    const handleAlertClick = (url) => {
        navigate(url);
        setShowPopup(false);
    };

    // const handleListItemClick = () => {
    //     setShowPopup(!showPopup);
    // };

    return (
        // <AlertListItemBox>
        //     {alerts.map((alert, index) => (
        //         <ListItem
        //             key={index}
        //             onClick={() => handleAlertClick(alert.url)}
        //             // onClick={handleListItemClick}
        //         >
        //             {alert.message} {/* 알림 내용 */}
        //         </ListItem>
        //     ))}
        //     {showPopup && <MateRequest onClose={() => setShowPopup(false)} />}
        // </AlertListItemBox>
        <AlertListItemBox>
            {fetchedAlerts.map((alert, index) => (
                <ListItem
                    key={index}
                    onClick={() => handleAlertClick(alert.url)}
                    // onClick={handleListItemClick}
                >
                    {alert.message} {/* 알림 내용 */}
                </ListItem>
            ))}
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

export default React.memo(AlertListItem);
