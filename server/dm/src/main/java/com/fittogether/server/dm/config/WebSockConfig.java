package com.fittogether.server.dm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //메세지 받을때 관련 경로 설정
        config.enableSimpleBroker("/sub");

        //메세지 보낼때 관련 경로 설정
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        /*
         클라이언트에서 websocket연결할때 사용할 api 경로 설정
         Ex) ws://localhost:8080/ws  <- spring 기준 프론트측 포트는 다를수있음.
         */
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }
}





