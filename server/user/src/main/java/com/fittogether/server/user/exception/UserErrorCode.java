package com.fittogether.server.user.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode {
    // 로그인
    NOT_FOUND_USER(HttpStatus.BAD_REQUEST, "일치하는 회원이 없습니다."),
    NOT_FOR_FITTOGETHER(HttpStatus.BAD_REQUEST, "소셜 로그인으로 다시 로그인해주세요."),
    CANNOT_LOGOUT(HttpStatus.BAD_REQUEST, "로그아웃 실패했습니다."),

    NEED_TO_SIGNIN(HttpStatus.BAD_REQUEST, "로그인이 필요합니다."),
    NOT_FOUND_EXERCISE_TYPE(HttpStatus.BAD_REQUEST, "해당 운동종류는 존재하지 않습니다."),

    PRIVATE_USER(HttpStatus.BAD_REQUEST, "비공개 회원입니다."),
    NOT_ALLOW_FOR_USER(HttpStatus.BAD_REQUEST, "접근권한이 없는 사용자입니다.");

    private final HttpStatus httpStatus;
    private final String detail;
}
