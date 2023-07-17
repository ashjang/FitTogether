package com.fittogether.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.fittogether.server.user"
})
public class FitTogetherApplication {
    public static void main(String[] args) {
        SpringApplication.run(FitTogetherApplication.class, args);
    }
}
