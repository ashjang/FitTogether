package com.fittogether.server.dm.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum DmErrorCode {
    NOT_FOUND_CHATROOM(HttpStatus.BAD_REQUEST,"해당 채팅방이 존재하지 않습니다.");
    private final HttpStatus httpStatus;
    private  final String detail;
}
