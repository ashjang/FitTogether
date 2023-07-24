package com.fittogether.server.user.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode {
    // 회원가입 중복검사
    ALREADY_EXIST_NICKNAME(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임입니다."),
    ALREADY_EXIST_EMAIL(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일입니다."),

    // 로그인
    NOT_FOUND_USER(HttpStatus.BAD_REQUEST, "닉네임과 비밀번호를 다시 확인해주세요");

    private final HttpStatus httpStatus;
    private final String detail;
}
