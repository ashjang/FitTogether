// src/utils/websocket.ts
// import { Client, StompConfig } from '@stomp/stompjs';

// const stompConfig: StompConfig = {
//     brokerURL: 'ws://localhost:8080/ws',
//     reconnectDelay: 5000,
// };

// const stompClient: Client = new Client(stompConfig) as any;

// export default stompClient;

// src/utils/websocket.ts
import { Client } from '@stomp/stompjs';
import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });

const client: Client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    onConnect: () => {
        console.log('WebSocket연결되셨어요^^');
    },
    onStompError: (frame) => {
        console.error('STOMP 에러입니다ㅜㅜ:', frame);
    },
});

client.activate();

export default client;
