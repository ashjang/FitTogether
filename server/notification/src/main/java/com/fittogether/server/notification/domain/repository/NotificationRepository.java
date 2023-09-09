package com.fittogether.server.notification.domain.repository;

import com.fittogether.server.notification.domain.model.Notification;
import com.fittogether.server.user.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);

    Notification findByUserAndSenderAndUrl(User user, String sender, String url);
}
