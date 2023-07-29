package com.fittogether.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.fittogether.server.user",
    "com.fittogether.server.posts",
    "com.fittogether.server.dm",
    "com.fittogether.server.video",
    "com.fittogether.server.domain",
    "com.fittogether.server.config"
})
@EnableCaching
@EnableJpaAuditing
public class FitTogetherApplication {
    public static void main(String[] args) {
        SpringApplication.run(FitTogetherApplication.class, args);
    }
}
