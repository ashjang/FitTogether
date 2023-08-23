import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { FaRegBell } from 'react-icons/fa';
import styled from '@emotion/styled';
import AlertListItem from './AlertListItem';
import MateRequest from './MateRequest';

// interface Alert {
//     message: string;
//     notificationId: number;
//     notificationType: string;
//     read: boolean;
//     sender: string;
//     url: string;
// }

const AlertList: React.FC = ({ alerts }) => {
    const [alert, setAlert] = useState([]); // SSE로 가져온 alert의 state 변수

    const EventSource = EventSourcePolyfill;
    // const EventSource = require('eventsource');
    const token = sessionStorage.getItem('token');

    // SSE 구독하기
    useEffect(() => {
        if (!token) {
            return;
        }

        let eventSource;

        const establishSSEConnection = () => {
            eventSource = new EventSource(`/api/notification/subscribe`, {
                headers: {
                    'X-AUTH-TOKEN': token,
                },
            });

            eventSource.onopen = (event) => {
                console.log('connection opened');
                console.log(alert);
            };

            eventSource.onmessage = (event) => {
                const newAlert = JSON.parse(event.data);
                console.log('result', newAlert);

                setAlert((prevAlert) => [newAlert, ...prevAlert]);
                console.log('prevAlert', alert);
            };

            eventSource.onerror = (event) => {
                console.log(event.target.readyState);
                if (event.target.readyState === EventSource.CONNECTING) {
                    console.log('Reconnecting...');
                    // 연결 시도 중인 상태일 때 재연결 시도
                    setTimeout(establishSSEConnection, 1000);
                } else if (event.target.readyState === EventSource.CLOSED) {
                    console.log('eventsource closed (' + event.target.readyState + ')');
                }
                eventSource.close();
            };
        };

        establishSSEConnection();

        return () => {
            if (eventSource) {
                eventSource.close(); // 컴포넌트 언마운트 시 SSE 연결 닫기
                console.log('eventsource closed');
            }
        };
    }, []);

    return (
        <AlertContainer>
            <AlertArea>
                <AlertTitle>
                    <FaRegBell />
                    <AlertText>알림</AlertText>
                </AlertTitle>
            </AlertArea>
            <AlertContents>
                <AlertListItem alerts={alert} />
                {/* <MateRequest /> */}
            </AlertContents>
        </AlertContainer>
    );
};

const AlertContainer = styled.div`
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
    right: -100px;
    top: -10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 25%);
`;

const AlertArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;
`;

const AlertTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AlertText = styled.div`
    margin-left: 10px;
    font-weight: bold;
`;

const AlertContents = styled.div`
    width: 100%;
    height: 85%;
    border-top: 2px solid #f1f1f1;
    padding: 10px 20px;
    overflow: auto;
`;

export default AlertList;
