package com.fittogether.server.notification.domain.dto;

import com.fittogether.server.notification.domain.model.Notification;
import com.fittogether.server.user.domain.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationDto {
    private Long notificationId;
    private String message;
    private boolean isRead;
    private NotificationType notificationType;
    private String url;
    private String sender;
    private LocalDateTime createdAt;

    public static NotificationDto from(Notification notification) {
        return NotificationDto.builder()
                .notificationId(notification.getNotificationId())
                .message(notification.getMessage())
                .isRead(notification.isRead())
                .notificationType(notification.getNotificationType())
                .url(notification.getUrl())
                .sender(notification.getSender())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
