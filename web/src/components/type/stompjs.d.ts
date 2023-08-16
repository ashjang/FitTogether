// stomp.d.ts
declare module 'stompjs' {
    namespace Stomp {
        interface Client {
            connected: boolean;
            connect(headers: any, connectCallback: (frame: any) => void): void;
            disconnect(disconnectCallback?: () => void): void;
            subscribe(
                destination: string,
                callback: (message: any) => void,
                headers?: any
            ): Subscription;
            send(destination: string, headers?: any, body?: string): void;
        }

        interface Subscription {
            id: string;
            unsubscribe(): void;
        }

        function over(ws: WebSocket): Client;
    }

    const Stomp: {
        over: (ws: any) => Stomp.Client;
    };

    export = Stomp;
}

// websocket.ts
// import SockJS from ‘sockjs-client’;
// import Stomp from ‘stompjs’;

// const socket = new SockJS(‘http://localhost:8080/ws’);

// const stompClient: Stomp.Client = Stomp.over(socket);

// export { socket, stompClient };
