package com.fittogether.server.user.client;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "mailgun", url = "https://api.mailgun.net/v2/")
@Qualifier("mailgun")
public interface MailgunClient {
    @PostMapping("${mailgun.post.link}")
    ResponseEntity<String> sendEmail(@SpringQueryMap SendMailForm form);
}