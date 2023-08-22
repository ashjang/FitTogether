package com.fittogether.server.notification.domain.model;

import com.fittogether.server.notification.domain.dto.NotificationType;
import com.fittogether.server.user.domain.model.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private String message;
    private boolean isRead;
    private NotificationType notificationType;
    private String sender;
    private String url;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
