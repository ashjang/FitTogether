package com.fittogether.server.notification.service;

import com.fittogether.server.domain.token.JwtProvider;
import com.fittogether.server.domain.token.UserVo;
import com.fittogether.server.notification.domain.dto.NotificationDto;
import com.fittogether.server.notification.domain.dto.NotificationType;
import com.fittogether.server.notification.domain.model.Notification;
import com.fittogether.server.notification.domain.repository.EmitterRepository;
import com.fittogether.server.notification.domain.repository.NotificationRepository;
import com.fittogether.server.notification.exception.NotificationCustomException;
import com.fittogether.server.notification.exception.NotificationErrorCode;
import com.fittogether.server.user.domain.model.User;
import com.fittogether.server.user.domain.repository.UserRepository;
import com.fittogether.server.user.exception.UserCustomException;
import com.fittogether.server.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {
    private final JwtProvider jwtProvider;
    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public SseEmitter subscribe(String token) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }
        UserVo userVo = jwtProvider.getUserVo(token);

        SseEmitter sseEmitter = emitterRepository.get(userVo.getUserId());
        if (sseEmitter == null) {
            SseEmitter emitter = new SseEmitter();
            emitterRepository.save(userVo.getUserId(), emitter);

            try {
                emitter.send(SseEmitter.event().id(String.valueOf(userVo.getUserId())).name("notify").data("Connection completed"));
            } catch (IOException exception) {
                throw new NotificationCustomException(NotificationErrorCode.CONNECTION_ERROR);
            }

            return emitter;
        } else {
            return sseEmitter;
        }
    }

    private void sendToClient(Long id, NotificationDto data) {
        SseEmitter emitter = emitterRepository.get(id);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name("data")
                        .data(data));
                log.info("PostMapping for specific clients SSE Emitters : {}", emitter);
            } catch (IOException exception) {
                emitterRepository.deleteById(id);
                log.info("Exception SSE Emitters : {}", emitter);
            }
        }
    }

    // 알림 목록
    public List<NotificationDto> getNotifications(String token) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }
        UserVo userVo = jwtProvider.getUserVo(token);
        User user = userRepository.findById(userVo.getUserId())
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        return notificationRepository.findByUserAndReadIsFalseOrderByCreatedAtDesc(user)
                .stream().map(NotificationDto::from).collect(Collectors.toList());
    }

    // 알림 읽기
    @Transactional
    public void readNotification(String token, Long notificationId) {
        if (!jwtProvider.validateToken(token)) {
            throw new UserCustomException(UserErrorCode.NEED_TO_SIGNIN);
        }
        UserVo userVo = jwtProvider.getUserVo(token);

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotificationCustomException(NotificationErrorCode.NOT_FOUND_NOTIFICATION));

        if (!notification.getUser().getUserId().equals(userVo.getUserId())) {
            throw new UserCustomException(UserErrorCode.NOT_ALLOW_FOR_USER);
        }

        notification.setRead(true);
    }

    // 알림 생성
    @Transactional
    public void createNotification(String senderNickname, Long receiverId, NotificationType type, String url) {
        String message = senderNickname + "님이 회원님";
        switch (type) {
            case POST_LIKE: message += "의 게시글을 좋아합니다.";  break;
            case POST_REPLY: message += "의 게시글에 댓글을 남겼습니다.";    break;
            case RE_REPLY: message += "의 댓글에 대댓글을 남겼습니다.";      break;
            case MATCHING: message += "에게 운동메이트를 신청했습니다.";      break;
            default:    message = "잘못된 요청입니다.";
        }

        User user = userRepository.findById(receiverId)
                .orElseThrow(() -> new UserCustomException(UserErrorCode.NOT_FOUND_USER));

        if (user.getNickname().equals(senderNickname)) {
            return;
        }

        Notification notification = notificationRepository.findByUserAndSenderAndUrl(user, senderNickname, url);
        if (notification == null) {
            notification = notificationRepository.save(Notification.builder()
                    .message(message)
                    .isRead(false)
                    .notificationType(type)
                    .sender(senderNickname)
                    .url(url)
                    .user(user)
                    .createdAt(LocalDateTime.now())
                    .build());
        } else {
            notification.setCreatedAt(LocalDateTime.now());
        }

        sendToClient(user.getUserId(), NotificationDto.from(notification));
    }
}
