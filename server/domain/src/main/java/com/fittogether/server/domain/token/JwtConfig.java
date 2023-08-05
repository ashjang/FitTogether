package com.fittogether.server.domain.token;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Bean
    public JwtProvider jwtAuthenticationProvider() {
        return new JwtProvider();
    }
}
