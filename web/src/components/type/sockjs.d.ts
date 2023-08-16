// src/types/stomp.d.ts
declare module 'stompjs' {
    interface Client {
        connect: (
            headers: any,
            connectCallback: (frame: any) => void,
            errorCallback?: (error: any) => void
        ) => void;
        // 여기에 다른 메서드의 타입 정의도 추가
    }

    const Stomp: {
        over: (ws: any) => Client;
    };

    export = Stomp;
}
