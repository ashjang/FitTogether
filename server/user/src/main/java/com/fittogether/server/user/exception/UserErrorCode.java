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
    NOT_FOUND_USER(HttpStatus.BAD_REQUEST, "일치하는 회원이 없습니다."),
    NOT_FOR_FITTOGETHER(HttpStatus.BAD_REQUEST, "소셜 로그인으로 다시 로그인해주세요."),

    NEED_TO_SIGNIN(HttpStatus.BAD_REQUEST, "로그인이 필요합니다."),
    NOT_FOUND_EXERCISE_TYPE(HttpStatus.BAD_REQUEST, "해당 운동종류는 존재하지 않습니다."),

    PRIVATE_USER(HttpStatus.BAD_REQUEST, "비공개 회원입니다.");;

    private final HttpStatus httpStatus;
    private final String detail;
}
