package com.fittogether.server.user.config;

import feign.auth.BasicAuthRequestInterceptor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignClient {
    @Value("${mailgun.key}")
    private String mailgunKey;

    @Qualifier(value = "mailgun")
    public BasicAuthRequestInterceptor basicAuthRequestInterceptor() {
        return new BasicAuthRequestInterceptor("api", mailgunKey);
    }
}
