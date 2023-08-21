// src/utils/websocket.ts
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:8080/ws');

const stompClient: Stomp.Client = Stomp.over(socket);

export { socket, stompClient };
