package com.fittogether.server.notification.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum NotificationErrorCode {
    NOT_FOUND_NOTIFICATION(HttpStatus.BAD_REQUEST, "일치하는 알림이 없습니다."),
    CONNECTION_ERROR(HttpStatus.BAD_REQUEST, "연결이 불안정합니다.");

    private final HttpStatus httpStatus;
    private final String detail;
}
