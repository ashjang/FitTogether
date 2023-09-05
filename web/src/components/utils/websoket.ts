// src/utils/websocket.ts
import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });

const client: Client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    onConnect: () => {
        console.log('WebSocket연결되었쥬짝짝^^');
    },
    onStompError: (frame) => {
        console.error('STOMP 에러입니다ㅜㅜ:', frame);
    },
});

client.activate();

export default client;
