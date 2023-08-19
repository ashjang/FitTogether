package com.fittogether.server.posts.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    NOT_FOUND_POST(HttpStatus.BAD_REQUEST, "게시글을 찾을 수 없습니다."),
    NOT_FOUND_REPLY(HttpStatus.BAD_REQUEST, "댓글을 찾을 수 없습니다."),
    NOT_FOUND_IMAGE(HttpStatus.BAD_REQUEST, "이미지를 찾을 수 없습니다."),
    NOT_FOUND_HASHTAG(HttpStatus.BAD_REQUEST, "해시태그를 찾을 수 없습니다."),
    ONLY_AUTHOR_DELETE(HttpStatus.BAD_REQUEST, "작성자 본인만 삭제할 수 있습니다."),
    MATE_ONLY_ACCESS(HttpStatus.BAD_REQUEST, "메이트만 조회할 수 있습니다."),
    NO_PERMISSION_TO_VIEW_POST(HttpStatus.BAD_REQUEST, "접근 권한이 없습니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}
