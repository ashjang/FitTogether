declare module 'stompjs' {
    namespace Stomp {
        interface Client {
            // Define Stomp Client methods and properties here
        }

        function over(ws: WebSocket): Client;
    }

    export = Stomp;
}
