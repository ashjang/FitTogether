package com.fittogether.server.posts.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    NOT_FOUND_POST(HttpStatus.BAD_REQUEST, "게시글을 찾을 수 없습니다."),
    NO_PERMISSION_TO_VIEW_POST(HttpStatus.BAD_REQUEST, "게시글을 볼 권한이 없습니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}
