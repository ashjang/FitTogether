declare module 'ws' {
    class WebSocket {
        constructor(url: string);
        on(event: string, callback: (...args: any[]) => void): void;
        send(data: any): void;
    }
}
