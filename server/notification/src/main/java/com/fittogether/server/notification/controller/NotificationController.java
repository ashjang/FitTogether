package com.fittogether.server.notification.controller;

import com.fittogether.server.notification.domain.dto.NotificationDto;
import com.fittogether.server.notification.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @ApiOperation(value = "알림 구독")
    @CrossOrigin
    @GetMapping("/subscribe")
    public SseEmitter subscribe(@RequestHeader("X-AUTH-TOKEN") String token) {
        return notificationService.subscribe(token);
    }

    @ApiOperation(value = "알림 목록")
    @GetMapping
    public ResponseEntity<List<NotificationDto>> getNotifications(@RequestHeader("X-AUTH-TOKEN") String token) {
        return ResponseEntity.ok(
                notificationService.getNotifications(token)
        );
    }

    @ApiOperation(value = "알림 읽기")
    @PutMapping
    public void readNotification(@RequestHeader("X-AUTH-TOKEN") String token,
                                              @RequestParam("id") Long notificationId) {
        notificationService.readNotification(token, notificationId);
    }
}
