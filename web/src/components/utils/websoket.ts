// src/utils/websocket.ts
import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });

const client: Client = new Client({
    brokerURL: 'ws://43.201.171.7:8080/ws',
    onConnect: () => {
        console.log('WebSocket 연결 성공');
    },
    onStompError: (frame) => {
        console.error('WebSocket 연결 실패', frame);
    },
});

client.activate();

export default client;
