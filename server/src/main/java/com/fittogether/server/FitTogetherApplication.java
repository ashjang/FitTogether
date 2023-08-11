package com.fittogether.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(
    exclude = {
        org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
        org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
        org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
    }
)
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
@EnableScheduling
public class FitTogetherApplication {
    public static void main(String[] args) {
        SpringApplication.run(FitTogetherApplication.class, args);
    }
}
